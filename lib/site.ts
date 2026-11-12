/**
 * Configuración central de la landing VSL de Mentora.
 * Todo lo que el equipo de marketing quiera cambiar sin tocar componentes vive aquí
 * o en las variables de entorno (ver .env.example).
 */

export const site = {
  brand: "Mentora",
  legalEntity: "Mentora Group Beltrán S.A.C.",

  /**
   * LOGO: todavía no tenemos el archivo oficial en el repositorio.
   * Para usarlo: copia el logo a /public (por ejemplo /public/logo-mentora.svg)
   * y escribe aquí la ruta. Mientras sea null se muestra un logotipo de texto provisional.
   */
  logoSrc: null as string | null,
  logoWidth: 180,
  logoHeight: 48,

  headline: {
    lead: "Tu inglés no tiene por qué",
    highlight: "seguir esperando.",
  },
  subheadline:
    "Aprende inglés online, a tu ritmo y desde donde estés. Avanza por niveles alineados al MCER.",

  step1: "PASO 1: DESCUBRE MENTORA",
  step2: "PASO 2: RECIBE INFORMACIÓN DE MENTORA",
  cta: "QUIERO RECIBIR INFORMACIÓN",
  successMessage:
    "¡Listo! Recibimos tus datos. Un especialista de Mentora se comunicará contigo.",

  /** Sugerencias del campo Ciudad (el usuario puede escribir cualquier otra). */
  citySuggestions: [
    "Lima",
    "Arequipa",
    "Trujillo",
    "Chiclayo",
    "Piura",
    "Huancayo",
    "Cusco",
    "Tarapoto",
    "Iquitos",
    "Ica",
    "Callao",
  ],
} as const;

/**
 * ⚠️ BORRADOR LEGAL — pendiente de revisión por asesoría legal y aprobación de Isamar.
 * Si cambias el texto del consentimiento, SUBE la versión: queda registrada en cada lead.
 */
export const CONSENT_VERSION = "v0.1-borrador-2026-11";

export const consentText =
  "He leído la Política de Privacidad y autorizo a Mentora Group Beltrán S.A.C. a tratar mis datos para contactarme por WhatsApp o llamada con información sobre sus programas de inglés.";
