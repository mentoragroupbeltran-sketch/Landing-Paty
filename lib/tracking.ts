/**
 * Meta Pixel y TikTok Pixel — PREPARADOS pero DESACTIVADOS por defecto.
 *
 * Se activan solo si se cumplen las tres condiciones:
 *   1. NEXT_PUBLIC_TRACKING_ENABLED="true" (decisión explícita del equipo tras revisión legal)
 *   2. Hay al menos un ID: NEXT_PUBLIC_META_PIXEL_ID y/o NEXT_PUBLIC_TIKTOK_PIXEL_ID
 *   3. La persona aceptó la medición publicitaria en el aviso de cookies.
 *
 * Nunca se envían datos personales (nombre, WhatsApp, ciudad) a los pixels.
 */

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
    ttq?: { load: (id: string) => void; page: () => void; track: (e: string, p?: object) => void } & Record<string, unknown>;
    TiktokAnalyticsObject?: string;
  }
}

const META_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
const TIKTOK_ID = (process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "").trim();

export const TRACKING_ENABLED =
  process.env.NEXT_PUBLIC_TRACKING_ENABLED === "true" && Boolean(META_ID || TIKTOK_ID);

const CONSENT_KEY = "mentora_tracking_consent_v1";
let loaded = false;

export type TrackingConsent = "granted" | "denied" | null;

export function getTrackingConsent(): TrackingConsent {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setTrackingConsent(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* almacenamiento no disponible (algunos navegadores in-app): se pregunta en cada visita */
  }
}

function injectScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadMeta(id: string) {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const f = fbq as any;
    if (f.callMethod) f.callMethod(...args);
    else f.queue.push(args);
  } as NonNullable<Window["fbq"]> & Record<string, unknown>;
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  injectScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function loadTikTok(id: string) {
  if (window.ttq) return;
  window.TiktokAnalyticsObject = "ttq";
  const queue: unknown[][] = [];
  const methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
  const ttq: Record<string, unknown> = { _q: queue };
  methods.forEach((m) => {
    ttq[m] = (...args: unknown[]) => queue.push([m, ...args]);
  });
  ttq.load = (pid: string) => {
    ttq._i = { [pid]: [] };
    ttq._t = { [pid]: Date.now() };
    ttq._o = { [pid]: {} };
    injectScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(pid)}&lib=ttq`);
  };
  window.ttq = ttq as unknown as Window["ttq"];
  window.ttq!.load(id);
  window.ttq!.page();
}

/** Carga los pixels. Solo se llama si TRACKING_ENABLED y hay consentimiento. */
export function loadPixels() {
  if (loaded || !TRACKING_ENABLED) return;
  if (getTrackingConsent() !== "granted") return;
  loaded = true;
  if (META_ID) loadMeta(META_ID);
  if (TIKTOK_ID) loadTikTok(TIKTOK_ID);
}

type EventName = "Lead" | "VideoPlay";

/** Envía un evento sin datos personales. No hace nada si los pixels no están cargados. */
export function trackEvent(name: EventName) {
  if (!loaded) return;
  try {
    if (name === "Lead") {
      window.fbq?.("track", "Lead");
      window.ttq?.track("SubmitForm");
    } else if (name === "VideoPlay") {
      window.fbq?.("trackCustom", "VideoPlay");
      window.ttq?.track("ViewContent");
    }
  } catch {
    /* un fallo de medición nunca debe romper la landing */
  }
}
