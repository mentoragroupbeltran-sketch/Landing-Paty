"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site, consentText } from "@/lib/site";
import { validateCity, validateName, validatePhone } from "@/lib/fields";
import { getAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/tracking";
import Turnstile, { TURNSTILE_ENABLED, type TurnstileHandle } from "@/components/Turnstile";

type Fields = { nombre: string; whatsapp: string; ciudad: string };
type FieldErrors = Partial<Record<keyof Fields | "consent", string>>;
type Status = "idle" | "sending" | "success" | "error";

const [consentBefore, consentAfter = ""] = consentText.split("Política de Privacidad");

function newSubmissionId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* contexto no seguro */
  }
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export default function LeadForm() {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ nombre: "", whatsapp: "", ciudad: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  // Un ID por intento de registro: los reintentos reutilizan el mismo ID,
  // así Google Sheets nunca guarda el mismo lead dos veces.
  const submissionId = useRef<string>("");
  const mountedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    submissionId.current = newSubmissionId();
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const ids = {
    nombre: `${uid}-nombre`,
    whatsapp: `${uid}-whatsapp`,
    ciudad: `${uid}-ciudad`,
    consent: `${uid}-consent`,
    cities: `${uid}-cities`,
  };

  function validateAll(): FieldErrors {
    const e: FieldErrors = {};
    const n = validateName(fields.nombre);
    const w = validatePhone(fields.whatsapp);
    const c = validateCity(fields.ciudad);
    if (n) e.nombre = n;
    if (w) e.whatsapp = w;
    if (c) e.ciudad = c;
    if (!consent) e.consent = "Necesitamos tu autorización para poder contactarte.";
    return e;
  }

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (status === "sending") return;

    const e = validateAll();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = (["nombre", "whatsapp", "ciudad", "consent"] as const).find((k) => e[k]);
      if (first) document.getElementById(ids[first])?.focus();
      return;
    }
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setFormError("Estamos verificando que no eres un robot. Espera un segundo y vuelve a intentarlo.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setFormError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId.current,
          nombre: fields.nombre,
          whatsapp: fields.whatsapp,
          ciudad: fields.ciudad,
          consent: true,
          attribution: getAttribution(),
          website: honeypot.current?.value ?? "",
          elapsed_ms: Date.now() - mountedAt.current,
          turnstile_token: turnstileToken || undefined,
        }),
        signal: AbortSignal.timeout(30000),
      });

      let data: { ok?: boolean; error?: string; message?: string; fields?: FieldErrors } = {};
      try {
        data = await res.json();
      } catch {
        /* respuesta no JSON */
      }

      if (res.ok && data.ok === true) {
        setStatus("success");
        trackEvent("Lead");
        return;
      }

      if (data.fields) setErrors(data.fields);
      setFormError(
        data.message ||
          (res.status === 429
            ? "Hiciste varios intentos seguidos. Espera unos minutos y vuelve a intentarlo."
            : "No pudimos registrar tus datos en este momento. Tus datos siguen aquí: vuelve a intentarlo."),
      );
      setStatus("error");
    } catch {
      setFormError(
        "No pudimos conectar con nuestro servidor. Revisa tu conexión a internet y vuelve a intentarlo. Tus datos siguen aquí.",
      );
      setStatus("error");
    } finally {
      if (TURNSTILE_ENABLED) {
        setTurnstileToken("");
        turnstileRef.current?.reset();
      }
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-tiffany/40 bg-oxford-800/80 p-7 text-center shadow-2xl shadow-indigo/10 outline-none sm:p-9"
      >
        <span
          aria-hidden
          className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-shamrock text-white"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={3}>
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-display mt-4 text-xl font-bold text-white sm:text-2xl">{site.successMessage}</p>
      </div>
    );
  }

  const inputBase =
    "mt-1.5 block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-oxford placeholder:text-oxford/40 shadow-sm transition focus:outline-none focus:ring-4 disabled:opacity-60";
  const inputOk = "border-transparent focus:ring-indigo/40";
  const inputBad = "border-error ring-2 ring-error/60 focus:ring-error/40";
  const sending = status === "sending";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={sending}
      className="rounded-2xl border border-white/10 bg-oxford-800/70 p-5 shadow-2xl shadow-indigo/10 backdrop-blur sm:p-8"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor={ids.nombre} className="text-sm font-bold text-white">
            Nombre completo
          </label>
          <input
            id={ids.nombre}
            name="nombre"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            maxLength={80}
            required
            placeholder="Ej. María López"
            value={fields.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? `${ids.nombre}-err` : undefined}
            disabled={sending}
            className={`${inputBase} ${errors.nombre ? inputBad : inputOk}`}
          />
          {errors.nombre && (
            <p id={`${ids.nombre}-err`} className="mt-1.5 text-sm text-error-soft">
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.whatsapp} className="text-sm font-bold text-white">
            Número de WhatsApp
          </label>
          <input
            id={ids.whatsapp}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            required
            placeholder="Ej. 987 654 321"
            value={fields.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={`${ids.whatsapp}-hint${errors.whatsapp ? ` ${ids.whatsapp}-err` : ""}`}
            disabled={sending}
            className={`${inputBase} ${errors.whatsapp ? inputBad : inputOk}`}
          />
          <p id={`${ids.whatsapp}-hint`} className="mt-1.5 text-xs text-columbia/70">
            Si no es de Perú, escribe el código de país (ej. +593).
          </p>
          {errors.whatsapp && (
            <p id={`${ids.whatsapp}-err`} className="mt-1 text-sm text-error-soft">
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={ids.ciudad} className="text-sm font-bold text-white">
            Ciudad
          </label>
          <input
            id={ids.ciudad}
            name="ciudad"
            type="text"
            autoComplete="address-level2"
            autoCapitalize="words"
            maxLength={60}
            required
            list={ids.cities}
            placeholder="Ej. Arequipa"
            value={fields.ciudad}
            onChange={(e) => update("ciudad", e.target.value)}
            aria-invalid={Boolean(errors.ciudad)}
            aria-describedby={errors.ciudad ? `${ids.ciudad}-err` : undefined}
            disabled={sending}
            className={`${inputBase} ${errors.ciudad ? inputBad : inputOk}`}
          />
          <datalist id={ids.cities}>
            {site.citySuggestions.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          {errors.ciudad && (
            <p id={`${ids.ciudad}-err`} className="mt-1.5 text-sm text-error-soft">
              {errors.ciudad}
            </p>
          )}
        </div>

        {/* Trampa antispam: invisible para personas, los bots suelen llenarla. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            No llenar este campo
            <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <div className="pt-1">
          <div className="flex items-start gap-3">
            <input
              id={ids.consent}
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errors.consent) setErrors((x) => ({ ...x, consent: undefined }));
              }}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? `${ids.consent}-err` : undefined}
              disabled={sending}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-indigo"
            />
            <label htmlFor={ids.consent} className="cursor-pointer text-sm leading-snug text-columbia/90">
              {consentBefore}
              <a
                href="/privacidad"
                target="_blank"
                rel="noopener"
                className="font-bold text-tiffany underline underline-offset-2"
              >
                Política de Privacidad
              </a>
              {consentAfter}
            </label>
          </div>
          {errors.consent && (
            <p id={`${ids.consent}-err`} className="mt-1.5 text-sm text-error-soft">
              {errors.consent}
            </p>
          )}
        </div>

        {TURNSTILE_ENABLED && (
          <Turnstile ref={turnstileRef} onToken={setTurnstileToken} />
        )}

        {status === "error" && formError && (
          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="rounded-xl border border-error-soft/40 bg-error/20 px-4 py-3 text-sm text-white outline-none"
          >
            {formError}
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="font-display relative flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-indigo px-6 py-4 text-base font-bold tracking-wide text-white shadow-lg shadow-indigo/40 transition hover:bg-indigo-600 hover:shadow-indigo/60 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 sm:text-lg"
        >
          {sending ? (
            <>
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".3" strokeWidth="4" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              ENVIANDO…
            </>
          ) : status === "error" ? (
            "VOLVER A INTENTAR"
          ) : (
            site.cta
          )}
        </button>
      </div>
    </form>
  );
}
