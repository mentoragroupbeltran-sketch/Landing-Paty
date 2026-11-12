/**
 * Reglas de validación compartidas entre el navegador (feedback inmediato)
 * y el servidor (validación definitiva). El servidor SIEMPRE vuelve a validar.
 */

export const LIMITS = {
  nameMin: 3,
  nameMax: 80,
  cityMin: 2,
  cityMax: 60,
  utmMax: 150,
} as const;

// Caracteres de control e invisibles (incluye separadores de línea Unicode y marcas bidi).
// Se construye con RegExp (string escapado) para evitar separadores de línea literales en el código.
const CONTROL_CHARS = new RegExp(
  "[\\u0000-\\u001F\\u007F-\\u009F\\u200B-\\u200F\\u2028-\\u202E\\u2060-\\u206F\\uFEFF]",
  "g",
);

/** Elimina caracteres de control, colapsa espacios y recorta. */
export function cleanText(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(CONTROL_CHARS, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const NAME_RE = /^\p{L}[\p{L}\p{M} .'’-]*$/u;

export function validateName(raw: string): string | null {
  const v = cleanText(raw, 200);
  if (!v) return "Escribe tu nombre completo.";
  if (v.length < LIMITS.nameMin) return "Tu nombre parece muy corto.";
  if (v.length > LIMITS.nameMax) return `Máximo ${LIMITS.nameMax} caracteres.`;
  if (!NAME_RE.test(v)) return "Usa solo letras en tu nombre.";
  return null;
}

export function validateCity(raw: string): string | null {
  const v = cleanText(raw, 200);
  if (!v) return "Escribe tu ciudad.";
  if (v.length < LIMITS.cityMin) return "Escribe el nombre de tu ciudad.";
  if (v.length > LIMITS.cityMax) return `Máximo ${LIMITS.cityMax} caracteres.`;
  if (!NAME_RE.test(v)) return "Usa solo letras en la ciudad.";
  return null;
}

/**
 * Normaliza un número de WhatsApp.
 * - Perú: acepta "987654321", "987 654 321", "+51 987654321", "51987654321" → "+51987654321"
 * - Otros países: debe empezar con "+" y el código de país (ej. +593 99 123 4567).
 * Devuelve null si no es válido.
 */
export function normalizePhone(raw: string): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[\s\-().]/g, "").replace(/^\+/, "");
  if (!/^\d+$/.test(digits)) return null;

  if (/^9\d{8}$/.test(digits)) return `+51${digits}`;
  if (/^519\d{8}$/.test(digits)) return `+${digits}`;
  if (hasPlus && !digits.startsWith("51") && /^[1-9]\d{7,14}$/.test(digits)) {
    return `+${digits}`;
  }
  return null;
}

export function validatePhone(raw: string): string | null {
  if (!raw || !raw.trim()) return "Escribe tu número de WhatsApp.";
  if (!normalizePhone(raw)) {
    return "Revisa tu número: en Perú son 9 dígitos y empiezan con 9. Si es de otro país, empieza con + y el código (ej. +593).";
  }
  return null;
}

/**
 * Protección contra inyección de fórmulas en hojas de cálculo (CSV/Formula injection).
 * Si el valor empieza con = + - @ tab o retorno, se antepone un apóstrofo para
 * que Google Sheets lo guarde como texto. Se aplica también en Apps Script.
 */
export function escapeFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}
