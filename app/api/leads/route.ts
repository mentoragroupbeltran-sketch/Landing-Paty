import { NextResponse } from "next/server";
import { LeadRequestSchema, buildLead } from "@/lib/lead";
import { rateLimit } from "@/lib/rate-limit";
import { sendLeadToSheets } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;
const MIN_FILL_MS = 1500; // menos de 1,5 s para llenar 3 campos = casi seguro un bot

type ApiBody = { ok: boolean; error?: string; message?: string; fields?: Record<string, string> };

function json(body: ApiBody, status: number, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Solo se aceptan envíos desde la propia landing (o dominios listados en ALLOWED_ORIGINS). */
function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (!origin) return req.headers.get("sec-fetch-site") === "same-origin";
  let host: string;
  try {
    host = new URL(origin).host.toLowerCase();
  } catch {
    return false;
  }
  if (allowed.some((a) => a === origin.toLowerCase() || a === host)) return true;
  const reqHost = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").toLowerCase();
  return host === reqHost;
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile no configurado
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  // 1) Origen
  if (!isAllowedOrigin(req)) {
    return json({ ok: false, error: "forbidden", message: "Solicitud no permitida." }, 403);
  }

  // 2) Tipo y tamaño
  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return json({ ok: false, error: "unsupported" }, 415);
  }
  const raw = await req.text();
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  // 3) Límite por IP: 5 envíos cada 10 minutos
  const ip = clientIp(req);
  const rl = rateLimit(`ip:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return json(
      {
        ok: false,
        error: "rate_limited",
        message: "Hiciste varios intentos seguidos. Espera unos minutos y vuelve a intentarlo.",
      },
      429,
      { "Retry-After": String(rl.retryAfterSec) },
    );
  }

  // 4) Estructura
  let parsed;
  try {
    parsed = LeadRequestSchema.safeParse(JSON.parse(raw));
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }
  if (!parsed.success) {
    const consentIssue = parsed.error.issues.some((i) => i.path[0] === "consent");
    return json(
      {
        ok: false,
        error: "invalid",
        message: consentIssue
          ? "Marca la casilla de autorización para continuar."
          : "Revisa los datos del formulario.",
        ...(consentIssue ? { fields: { consent: "Necesitamos tu autorización para poder contactarte." } } : {}),
      },
      400,
    );
  }
  const data = parsed.data;

  // 5) Antispam: honeypot y tiempo mínimo de llenado.
  //    A un bot que cae en la trampa se le responde "ok" sin guardar nada (no aprende a evadirla).
  if (data.website && data.website.trim() !== "") {
    return json({ ok: true }, 200);
  }
  if (typeof data.elapsed_ms === "number" && data.elapsed_ms < MIN_FILL_MS) {
    return json(
      { ok: false, error: "too_fast", message: "Revisa tus datos y vuelve a presionar el botón." },
      400,
    );
  }
  if (!(await verifyTurnstile(data.turnstile_token, ip))) {
    return json(
      { ok: false, error: "bot_check", message: "No pudimos verificar que no eres un robot. Vuelve a intentarlo." },
      400,
    );
  }

  // 6) Validación de campos (servidor = fuente de verdad)
  const built = buildLead(data);
  if (!built.ok) {
    return json({ ok: false, error: "invalid", message: "Revisa los campos marcados.", fields: built.fields }, 400);
  }

  // 7) Registro en Google Sheets. Éxito SOLO si Apps Script confirma.
  const result = await sendLeadToSheets(built.lead);
  if (result.ok) {
    return json({ ok: true }, 200);
  }
  if (result.reason === "rate_limited") {
    return json(
      { ok: false, error: "busy", message: "Estamos recibiendo muchos registros. Vuelve a intentarlo en un minuto." },
      503,
    );
  }
  return json(
    {
      ok: false,
      error: "storage_failed",
      message: "No pudimos registrar tus datos en este momento. Tus datos siguen aquí: vuelve a intentarlo.",
    },
    502,
  );
}

export function GET() {
  return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
}
