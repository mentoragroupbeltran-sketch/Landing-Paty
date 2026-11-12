"use client";

import { useEffect, useState } from "react";
import {
  TRACKING_ENABLED,
  getTrackingConsent,
  loadPixels,
  setTrackingConsent,
} from "@/lib/tracking";
import { captureAttribution } from "@/lib/attribution";

/**
 * - Captura los UTM al entrar (siempre, no requiere cookies de terceros).
 * - Si la medición publicitaria está habilitada, muestra un aviso discreto
 *   y solo carga Meta/TikTok Pixel cuando la persona acepta.
 */
export default function Tracking() {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    captureAttribution();
    if (!TRACKING_ENABLED) return;
    const c = getTrackingConsent();
    if (c === "granted") loadPixels();
    else if (c === null) setAsk(true);
  }, []);

  if (!ask) return null;

  const decide = (v: "granted" | "denied") => {
    setTrackingConsent(v);
    setAsk(false);
    if (v === "granted") loadPixels();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/10 bg-oxford-800/95 p-4 text-sm text-columbia shadow-2xl backdrop-blur sm:inset-x-6"
    >
      {/* ⚠️ BORRADOR — texto pendiente de revisión legal */}
      <p>
        Usamos cookies de medición de Meta y TikTok para saber qué anuncios funcionan. Solo se
        activan si aceptas.{" "}
        <a href="/privacidad#cookies" className="text-tiffany underline underline-offset-2">
          Más información
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="rounded-lg bg-indigo px-4 py-2 font-bold text-white hover:bg-indigo-600"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="rounded-lg border border-white/20 px-4 py-2 font-bold text-white hover:bg-white/5"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
