/**
 * SIMULADOR LOCAL de Google Apps Script — SOLO PARA DESARROLLO Y PRUEBAS.
 * Reproduce el comportamiento de apps-script/Code.gs (firma HMAC, expiración, duplicados,
 * redirección 302 como Google) y escribe las filas en scripts/.mock-leads.csv.
 *
 * Uso:
 *   MOCK_SECRET=<secreto> node scripts/mock-apps-script.mjs   (puerto 4100)
 *   y en .env.local: GOOGLE_APPS_SCRIPT_URL=http://localhost:4100/exec
 */
import http from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.MOCK_PORT || 4100);
const SECRET = process.env.MOCK_SECRET || "";
const CSV = path.join(path.dirname(fileURLToPath(import.meta.url)), ".mock-leads.csv");
const pending = new Map(); // token → respuesta (para simular la redirección de Google)
const phones = new Set();

if (SECRET.length < 32) {
  console.error("MOCK_SECRET debe tener al menos 32 caracteres");
  process.exit(1);
}
if (!existsSync(CSV)) writeFileSync(CSV, "lead_id,fecha_peru,nombre,whatsapp,ciudad,origen,campana,utm_source,utm_medium,utm_campaign,utm_content,utm_term,consentimiento,consent_fecha,consent_version,estado\n");

const fmt = (d) => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Lima", dateStyle: "short", timeStyle: "medium" }).format(d);
const safe = (v) => { let s = String(v ?? ""); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return `"${s.replace(/"/g, '""')}"`; };

function handle(raw) {
  let env;
  try { env = JSON.parse(raw); } catch { return { ok: false, error: "invalid" }; }
  if (typeof env.payload !== "string" || typeof env.ts !== "number" || typeof env.sig !== "string") return { ok: false, error: "invalid" };
  if (Math.abs(Date.now() - env.ts) > 5 * 60 * 1000) return { ok: false, error: "unauthorized" };
  const exp = createHmac("sha256", SECRET).update(`${env.ts}.${env.payload}`).digest("hex");
  if (exp.length !== env.sig.length || !timingSafeEqual(Buffer.from(exp), Buffer.from(env.sig))) return { ok: false, error: "unauthorized" };
  const l = JSON.parse(env.payload);
  if (!/^MEN-[0-9A-F]{10}$/.test(l.lead_id) || !/^\+\d{9,15}$/.test(l.whatsapp)) return { ok: false, error: "invalid" };
  const csv = readFileSync(CSV, "utf8");
  if (csv.includes(`"${l.lead_id}"`) || phones.has(l.whatsapp)) return { ok: true, duplicate: true, lead_id: l.lead_id };
  const row = [l.lead_id, fmt(new Date()), l.nombre, l.whatsapp, l.ciudad, l.origen, l.campana, l.utm_source, l.utm_medium, l.utm_campaign, l.utm_content, l.utm_term, "SÍ", fmt(new Date(l.consentimiento_fecha_iso)), l.consentimiento_version, "NUEVO"];
  appendFileSync(CSV, row.map(safe).join(",") + "\n");
  phones.add(l.whatsapp);
  return { ok: true, duplicate: false, lead_id: l.lead_id };
}

http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/exec") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const token = Math.random().toString(36).slice(2);
      pending.set(token, handle(raw));
      res.writeHead(302, { Location: `http://localhost:${PORT}/echo?t=${token}` }).end();
    });
    return;
  }
  if (req.url?.startsWith("/echo")) {
    const t = new URL(req.url, "http://x").searchParams.get("t");
    const body = pending.get(t) ?? { ok: false, error: "server_error" };
    pending.delete(t);
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(body));
    return;
  }
  res.writeHead(404).end();
}).listen(PORT, () => console.log(`Mock Apps Script en http://localhost:${PORT}/exec → ${CSV}`));
