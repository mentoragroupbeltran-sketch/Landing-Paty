# Landing VSL — Mentora

Landing de conversión (título + video + formulario) para campañas de Meta Ads y TikTok Ads.
Cada registro se guarda en Google Sheets mediante un backend seguro.

**👉 Guía paso a paso: [docs/GUIA-DESPLIEGUE.md](docs/GUIA-DESPLIEGUE.md)**

## Arquitectura

```
Navegador ──POST /api/leads──▶ Vercel (Next.js, servidor) ──firmado HMAC──▶ Google Apps Script ──▶ Google Sheets
   │                              │                                           │
   │ validación inmediata         │ origen, tamaño, rate limit, honeypot,     │ firma + expiración 5 min,
   │ UTM en sessionStorage        │ tiempo mínimo, Turnstile (opcional),      │ revalidación, duplicados por ID
   │ ID de envío para reintentos  │ validación completa, anti-fórmulas        │ y por WhatsApp (6 h), límite
   │                              │ secretos solo en el servidor              │ global/min, anti-fórmulas, lock
   ◀── éxito SOLO si Sheets confirma ─────────────────────────────────────────┘
```

## Stack
Next.js 16 · React 19 · Tailwind CSS 4 · Zod · Vercel · Google Apps Script · Google Sheets.
Fuentes Poppins y DM Sans autoalojadas (sin llamadas a Google Fonts).

## Estructura
```
app/page.tsx                 Landing (encabezado, Paso 1 video, Paso 2 formulario)
app/api/leads/route.ts       Backend seguro del formulario
app/privacidad/page.tsx      Política de Privacidad (BORRADOR para revisión legal)
components/                  Logo, VideoPlayer, LeadForm, Turnstile, Tracking (pixels)
lib/site.ts                  Textos, logo, versión del consentimiento ← editar aquí
lib/fields.ts                Validaciones compartidas y anti-inyección de fórmulas
lib/lead.ts                  Esquema, construcción del lead, origen
lib/sheets.ts                Envío firmado a Apps Script
apps-script/Code.gs          Código para pegar en Google Apps Script
scripts/test-lead.mjs        Prueba contra la landing publicada
scripts/mock-apps-script.mjs Simulador local de Apps Script (desarrollo)
tests/                       Pruebas unitarias (npm test)
```

## Desarrollo local
```bash
npm install
cp .env.example .env.local     # completa GOOGLE_APPS_SCRIPT_URL y _SECRET
npm run dev                    # http://localhost:3000
npm test                       # pruebas unitarias
```
Sin cuenta de Google, puedes probar todo con el simulador:
```bash
SECRET=$(openssl rand -hex 32)
MOCK_SECRET=$SECRET node scripts/mock-apps-script.mjs &
# en .env.local: GOOGLE_APPS_SCRIPT_URL=http://localhost:4100/exec y GOOGLE_APPS_SCRIPT_SECRET=$SECRET
```

## Configuración sin tocar código (Vercel → Environment Variables)
Video, portada, antispam Turnstile, pixels y dominio: ver `.env.example`.
