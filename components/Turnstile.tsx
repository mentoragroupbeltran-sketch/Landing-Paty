"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/**
 * Cloudflare Turnstile (verificación anti-bots, gratuita y sin acertijos de imágenes).
 * OPCIONAL: se activa solo si existe NEXT_PUBLIC_TURNSTILE_SITE_KEY.
 * El servidor verifica el token con TURNSTILE_SECRET_KEY.
 */

const SITE_KEY = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "").trim();
export const TURNSTILE_ENABLED = Boolean(SITE_KEY);

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = { reset: () => void };

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("turnstile"));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

const Turnstile = forwardRef<TurnstileHandle, { onToken: (t: string) => void }>(function Turnstile(
  { onToken },
  ref,
) {
  const el = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    reset: () => window.turnstile?.reset(widgetId.current),
  }));

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !el.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(el.current, {
          sitekey: SITE_KEY,
          language: "es",
          theme: "dark",
          appearance: "interaction-only",
          callback: (t: string) => onToken(t),
          "expired-callback": () => onToken(""),
          "error-callback": () => onToken(""),
        });
      })
      .catch(() => onToken(""));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
  }, [onToken]);

  return <div ref={el} className="flex justify-center" />;
});

export default Turnstile;
