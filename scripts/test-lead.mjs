/**
 * PRUEBA EN PRODUCCIÓN: envía un lead de prueba a la landing publicada
 * y confirma que el servidor responde ok (= Google Sheets confirmó el registro).
 *
 * Uso:
 *   node scripts/test-lead.mjs https://tu-landing.vercel.app
 *
 * Luego revisa la hoja: debe aparecer "PRUEBA Automática" con utm_campaign "prueba-tecnica".
 * Bórrala después. (Cada prueba usa un número distinto para no chocar con el control de duplicados.)
 */
import { randomUUID } from "node:crypto";

const base = (process.argv[2] || "").replace(/\/$/, "");
if (!/^https?:\/\//.test(base)) {
  console.error("Uso: node scripts/test-lead.mjs https://tu-landing.vercel.app");
  process.exit(1);
}

const phone = "9" + String(Math.floor(Math.random() * 1e8)).padStart(8, "0");
const res = await fetch(`${base}/api/leads`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: base },
  body: JSON.stringify({
    submission_id: randomUUID(),
    nombre: "PRUEBA Automática",
    whatsapp: phone,
    ciudad: "Lima",
    consent: true,
    attribution: { utm_source: "prueba", utm_medium: "test", utm_campaign: "prueba-tecnica" },
    website: "",
    elapsed_ms: 5000,
  }),
});

const body = await res.text();
console.log(`HTTP ${res.status} → ${body}`);
if (res.ok && JSON.parse(body).ok === true) {
  console.log(`✅ OK: revisa la hoja, debe haber una fila "PRUEBA Automática" con WhatsApp +51${phone}.`);
} else {
  console.log("❌ Falló. Revisa los logs en Vercel (Project → Logs) buscando '[leads]'.");
  process.exit(1);
}
