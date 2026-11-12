/**
 * Captura de parámetros de campaña (UTM) en el navegador.
 * Se guardan solo durante la sesión (sessionStorage) para no perderlos si la persona
 * navega a la Política de Privacidad y vuelve. No se usan cookies.
 * De fbclid / ttclid solo se guarda SI EXISTEN (true/false), no el identificador.
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = Partial<Record<UtmKey, string>> & {
  has_fbclid?: boolean;
  has_ttclid?: boolean;
  referrer_host?: string;
  landing_path?: string;
};

const KEY = "mentora_attribution_v1";
let memory: Attribution | null = null;

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : memory;
  } catch {
    return memory;
  }
}

function write(a: Attribution) {
  memory = a;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    /* sin almacenamiento: queda en memoria */
  }
}

export function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fresh[k] = v.slice(0, 150);
  }
  if (params.has("fbclid")) fresh.has_fbclid = true;
  if (params.has("ttclid")) fresh.has_ttclid = true;

  const isCampaignHit = Object.keys(fresh).length > 0;
  const existing = read();

  if (isCampaignHit || !existing) {
    let referrerHost = "";
    try {
      if (document.referrer) {
        const h = new URL(document.referrer).hostname;
        if (h !== window.location.hostname) referrerHost = h;
      }
    } catch {
      /* referrer inválido */
    }
    const a: Attribution = { ...fresh, referrer_host: referrerHost, landing_path: window.location.pathname };
    write(a);
    return a;
  }
  return existing;
}

export function getAttribution(): Attribution {
  return read() ?? captureAttribution();
}
