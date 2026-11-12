import { createHmac } from "node:crypto";
import type { LeadRecord } from "@/lib/lead";

/**
 * Envío seguro del lead a Google Apps Script → Google Sheets.
 *
 * - La URL del Web App y el secreto SOLO existen en el servidor (variables de entorno de Vercel).
 * - Cada envío va firmado con HMAC-SHA256 (secreto compartido) + marca de tiempo,
 *   así nadie que descubra la URL del Apps Script puede escribir en la hoja ni repetir envíos viejos.
 * - Solo se considera éxito si Apps Script responde {"ok": true}.
 */

export type SheetsResult =
  | { ok: true; duplicate: boolean; lead_id: string }
  | { ok: false; reason: string; retryable: boolean };

export function signPayload(payload: string, ts: number, secret: string): string {
  return createHmac("sha256", secret).update(`${ts}.${payload}`).digest("hex");
}

export async function sendLeadToSheets(lead: LeadRecord): Promise<SheetsResult> {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!url || !secret) {
    console.error("[leads] Falta GOOGLE_APPS_SCRIPT_URL o GOOGLE_APPS_SCRIPT_SECRET");
    return { ok: false, reason: "not_configured", retryable: false };
  }

  const payload = JSON.stringify(lead);
  const ts = Date.now();
  const body = JSON.stringify({ payload, ts, sig: signPayload(payload, ts, secret) });

  let res: Response;
  try {
    // Apps Script responde con una redirección 302 a googleusercontent.com;
    // fetch la sigue con GET y ahí está la respuesta JSON real.
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
  } catch (err) {
    console.error("[leads] Error de red con Apps Script:", (err as Error).name);
    return { ok: false, reason: "network", retryable: true };
  }

  const text = await res.text();
  let data: { ok?: boolean; duplicate?: boolean; lead_id?: string; error?: string } = {};
  try {
    data = JSON.parse(text);
  } catch {
    // Normalmente significa que el Web App no está publicado con acceso "Cualquier persona".
    console.error("[leads] Apps Script no devolvió JSON. HTTP", res.status);
    return { ok: false, reason: "bad_response", retryable: true };
  }

  if (data.ok === true && data.lead_id === lead.lead_id) {
    return { ok: true, duplicate: Boolean(data.duplicate), lead_id: data.lead_id };
  }

  console.error("[leads] Apps Script rechazó el registro:", data.error ?? "desconocido");
  return {
    ok: false,
    reason: data.error ?? "rejected",
    retryable: !["unauthorized", "invalid", "not_configured"].includes(data.error ?? ""),
  };
}
