import { createHash } from "node:crypto";
import { z } from "zod";
import { CONSENT_VERSION } from "@/lib/site";
import {
  LIMITS,
  cleanText,
  escapeFormula,
  normalizePhone,
  validateCity,
  validateName,
} from "@/lib/fields";

/** Lo que el navegador envía a /api/leads. Todo se vuelve a validar aquí. */
export const LeadRequestSchema = z.object({
  submission_id: z.string().uuid(),
  nombre: z.string().max(200),
  whatsapp: z.string().max(40),
  ciudad: z.string().max(200),
  consent: z.literal(true),
  attribution: z
    .object({
      utm_source: z.string().max(300).optional(),
      utm_medium: z.string().max(300).optional(),
      utm_campaign: z.string().max(300).optional(),
      utm_content: z.string().max(300).optional(),
      utm_term: z.string().max(300).optional(),
      has_fbclid: z.boolean().optional(),
      has_ttclid: z.boolean().optional(),
      referrer_host: z.string().max(300).optional(),
      landing_path: z.string().max(300).optional(),
    })
    .partial()
    .optional()
    .default({}),
  website: z.string().max(500).optional().default(""), // honeypot
  elapsed_ms: z.number().int().nonnegative().optional(),
  turnstile_token: z.string().max(4096).optional(),
});

export type LeadRequest = z.infer<typeof LeadRequestSchema>;

/** Registro que se envía a Google Apps Script (una fila de la hoja). */
export type LeadRecord = {
  lead_id: string;
  nombre: string;
  whatsapp: string;
  ciudad: string;
  origen: string;
  campana: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  consentimiento: "SÍ";
  consentimiento_fecha_iso: string;
  consentimiento_version: string;
  estado: "NUEVO";
};

export type FieldErrors = Partial<Record<"nombre" | "whatsapp" | "ciudad" | "consent", string>>;

/** ID estable derivado del submission_id: los reintentos generan el mismo ID. */
export function leadIdFrom(submissionId: string): string {
  const h = createHash("sha256").update(submissionId).digest("hex").slice(0, 10).toUpperCase();
  return `MEN-${h}`;
}

const utm = (v?: string) => escapeFormula(cleanText(v ?? "", LIMITS.utmMax));

export function deriveOrigin(a: LeadRequest["attribution"]): string {
  const src = (a?.utm_source || "").toLowerCase();
  if (/(instagram|^ig$)/.test(src)) return "Instagram Ads";
  if (/(facebook|^fb$|meta|messenger)/.test(src)) return "Facebook Ads";
  if (/tiktok|^tt$/.test(src)) return "TikTok Ads";
  if (/(google|gads|adwords)/.test(src)) return "Google Ads";
  if (a?.has_fbclid) return "Facebook Ads";
  if (a?.has_ttclid) return "TikTok Ads";
  const ref = (a?.referrer_host || "").toLowerCase();
  if (/instagram/.test(ref)) return "Instagram orgánico";
  if (/facebook/.test(ref)) return "Facebook orgánico";
  if (/tiktok/.test(ref)) return "TikTok orgánico";
  if (/google\./.test(ref)) return "Google Ads";
  if (ref) return "Referido";
  if (src) return "Otro";
  return "Web directa";
}

/** Valida los campos y construye el registro. Devuelve errores por campo si algo falla. */
export function buildLead(
  req: LeadRequest,
  now = new Date(),
): { ok: true; lead: LeadRecord } | { ok: false; fields: FieldErrors } {
  const fields: FieldErrors = {};
  const nameErr = validateName(req.nombre);
  const cityErr = validateCity(req.ciudad);
  const phone = normalizePhone(req.whatsapp);
  if (nameErr) fields.nombre = nameErr;
  if (cityErr) fields.ciudad = cityErr;
  if (!phone) fields.whatsapp = "Revisa tu número de WhatsApp.";
  if (req.consent !== true) fields.consent = "Necesitamos tu autorización para poder contactarte.";
  if (Object.keys(fields).length || !phone) return { ok: false, fields };

  const a = req.attribution ?? {};
  return {
    ok: true,
    lead: {
      lead_id: leadIdFrom(req.submission_id),
      nombre: escapeFormula(cleanText(req.nombre, LIMITS.nameMax)),
      whatsapp: phone, // ya normalizado (+51...). Apps Script lo guarda como texto.
      ciudad: escapeFormula(cleanText(req.ciudad, LIMITS.cityMax)),
      origen: escapeFormula(deriveOrigin(a)),
      campana: utm(a.utm_campaign) || "(sin campaña)",
      utm_source: utm(a.utm_source),
      utm_medium: utm(a.utm_medium),
      utm_campaign: utm(a.utm_campaign),
      utm_content: utm(a.utm_content),
      utm_term: utm(a.utm_term),
      consentimiento: "SÍ",
      consentimiento_fecha_iso: now.toISOString(),
      consentimiento_version: CONSENT_VERSION,
      estado: "NUEVO",
    },
  };
}
