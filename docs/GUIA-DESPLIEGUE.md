# Guía de puesta en marcha: Landing VSL Mentora

Orden recomendado (≈ 45 minutos la primera vez):

1. Google Sheets + Apps Script → obtienes **URL** y **secreto**
2. Subir el código a GitHub
3. Publicar en Vercel con la URL y el secreto
4. Probar que los leads llegan a la hoja
5. Conectar el subdominio
6. Cargar video, logo y (opcional) antispam y pixels

> 🔐 **Regla de oro:** el secreto y la URL de Apps Script solo se pegan en **Vercel**. No los envíes por chat, correo ni WhatsApp, y no los subas a GitHub.

---

## PASO 1 · Google Sheets + Apps Script

Usa de preferencia una **cuenta de Google corporativa** de Mentora (no personal), porque esa cuenta será la dueña de los datos.

1. Entra a [sheets.google.com](https://sheets.google.com) → **En blanco**. Nómbrala `Leads Mentora — Landing VSL`.
2. Menú **Extensiones → Apps Script**. Se abre el editor.
3. Borra todo el contenido de `Código.gs` y pega el contenido completo de **`apps-script/Code.gs`** de este proyecto. Guarda (💾 o Ctrl+S).
4. Arriba, en el selector de funciones, elige **`configurar`** → **▶ Ejecutar**.
   - Google pedirá permisos: **Revisar permisos** → elige tu cuenta → si aparece "Google no verificó esta app", haz clic en **Configuración avanzada → Ir a … (no seguro)** → **Permitir**. Es normal: el script es tuyo y solo accede a esta hoja.
   - Resultado: aparece la pestaña **Leads** con 19 columnas y la lista desplegable de estados comerciales.
5. Elige la función **`pruebaInterna`** → **▶ Ejecutar**. En la hoja debe aparecer una fila "PRUEBA Interna". ✅ Bórrala.
6. Elige **`verSecreto`** → **▶ Ejecutar**. Abajo, en **Registro de ejecución**, aparece un texto largo (64 caracteres). Ese es tu **secreto**. Lo usarás en el paso 3.
7. **Implementar → Nueva implementación** → ⚙️ **Tipo: Aplicación web**:
   - Descripción: `Landing VSL v1`
   - **Ejecutar como: Yo**
   - **Quién tiene acceso: Cualquier persona**
   - **Implementar** → copia la **URL de la aplicación web** (termina en `/exec`). Esa es tu **URL**.

> ¿Por qué "Cualquier persona"? Es la única forma de que el servidor de Vercel pueda llamarlo. Está protegido: solo acepta envíos firmados con el secreto, de menos de 5 minutos de antigüedad. Si alguien visita la URL, solo ve `{"ok":true,"service":"mentora-leads"}`.

**Si más adelante cambias el código del script:** Implementar → **Administrar implementaciones** → ✏️ → Versión: **Nueva versión** → Implementar. Así la URL no cambia.

### Proteger la hoja (acceso restringido)
- **Compartir**: solo con las personas del equipo comercial, por correo. **Nunca** "Cualquier persona con el enlace".
- Dale rol **Editor** solo a quien gestione leads; los demás, **Lector**.
- Opcional: selecciona columnas **A:O** → clic derecho → **Proteger rango** → solo tú puedes editarlas. El equipo podrá editar P–S (Estado, Asesor, Notas, Fecha de contacto).
- No descargues la hoja a computadoras personales ni la reenvíes por WhatsApp.

### Estructura de la hoja "Leads"

| Col | Campo | Lo llena |
|---|---|---|
| A | ID Lead (`MEN-XXXXXXXXXX`) | Sistema |
| B | Fecha y hora (Perú) | Sistema |
| C | Nombre completo | Formulario |
| D | WhatsApp (`+51…`) | Formulario |
| E | Ciudad | Formulario |
| F | Origen (Meta Ads, TikTok Ads, Directo…) | Sistema (según UTM) |
| G | Campaña | utm_campaign |
| H–L | utm_source, utm_medium, utm_campaign, utm_content, utm_term | URL del anuncio |
| M | Consentimiento (SÍ) | Formulario |
| N | Fecha consentimiento (Perú) | Sistema |
| O | Versión consentimiento | Sistema |
| P | Estado comercial (inicia en **NUEVO**) | Equipo comercial |
| Q | Asesor asignado | Equipo comercial |
| R | Notas comerciales | Equipo comercial |
| S | Fecha último contacto | Equipo comercial |

Estados disponibles: NUEVO, CONTACTADO, NO CONTESTA, INTERESADO, MATRICULADO, NO INTERESADO, DATOS ERRÓNEOS (edítalos en `ESTADOS` dentro de Code.gs y vuelve a ejecutar `configurar`).

---

## PASO 2 · Subir el código a GitHub

Repositorio: `https://github.com/mentoragroupbeltran-sketch/Landing-Paty`

### Opción A: desde la web (sin instalar nada)
1. Descomprime `landing-mentora.zip` en tu computadora.
2. Abre el repositorio en GitHub → **Add file → Upload files**.
3. Arrastra **el contenido** de la carpeta (no la carpeta en sí): `app`, `components`, `lib`, `apps-script`, `docs`, `scripts`, `tests`, `public`, y los archivos `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.mts`, `vercel.json`, `.env.example`, `.gitignore`, `README.md`.
   - Los archivos que empiezan con punto (`.gitignore`, `.env.example`) a veces no se ven en Mac/Windows. En Mac: `Cmd + Shift + .` para mostrarlos.
4. Mensaje: `Landing VSL Mentora v1` → **Commit changes**.

### Opción B: con Git (terminal)
```bash
cd landing-mentora
git init
git add .
git commit -m "Landing VSL Mentora v1"
git branch -M main
git remote add origin https://github.com/mentoragroupbeltran-sketch/Landing-Paty.git
git push -u origin main
```
Si el repositorio ya tenía archivos (por ejemplo un README), usa antes `git pull origin main --allow-unrelated-histories`.

> ✅ Verifica que en GitHub **no** exista ningún archivo `.env` ni `.env.local`.

---

## PASO 3 · Publicar en Vercel

1. Entra a [vercel.com](https://vercel.com) → **Sign up / Log in with GitHub** (con la cuenta `mentoragroupbeltran-sketch`).
2. **Add New… → Project** → busca `Landing-Paty` → **Import**. (Si no aparece: **Adjust GitHub App Permissions** y autoriza ese repositorio.)
3. Framework: **Next.js** (se detecta solo). No cambies los comandos de build.
4. Abre **Environment Variables** y agrega:

| Nombre | Valor |
|---|---|
| `GOOGLE_APPS_SCRIPT_URL` | la URL `/exec` del paso 1.7 |
| `GOOGLE_APPS_SCRIPT_SECRET` | el secreto del paso 1.6 |
| `NEXT_PUBLIC_SITE_URL` | por ahora `https://landing-paty.vercel.app` (luego tu subdominio) |
| `NEXT_PUBLIC_TRACKING_ENABLED` | `false` |

5. **Deploy**. En 1–2 minutos tendrás una URL tipo `https://landing-paty.vercel.app`.

> Cada vez que cambies una variable de entorno: **Deployments → ⋯ → Redeploy**. Las variables `NEXT_PUBLIC_*` solo se aplican tras redeploy.

**Recomendado (capa extra antispam):** Project → **Firewall → Rate Limiting** → nueva regla: ruta `/api/leads`, 10 solicitudes por minuto por IP → acción *Deny*.

---

## PASO 4 · Probar que los leads llegan a Google Sheets

### 4.1 Prueba técnica automática
Con Node.js instalado, desde la carpeta del proyecto:
```bash
node scripts/test-lead.mjs https://landing-paty.vercel.app
```
Debe responder `HTTP 200 → {"ok":true}` y en la hoja aparecer **"PRUEBA Automática"**. Bórrala.

### 4.2 Prueba manual con UTM (simula un anuncio)
Abre en el celular:
```
https://landing-paty.vercel.app/?utm_source=facebook&utm_medium=paid&utm_campaign=prueba-meta&utm_content=video-a
```
Llena el formulario → debe aparecer *"¡Listo! Recibimos tus datos…"* y en la hoja: Origen **Meta Ads**, Campaña **prueba-meta**, Estado **NUEVO**.

### 4.3 Checklist completo
- [ ] Sin marcar la casilla, no deja enviar.
- [ ] Número inválido (ej. `12345`) muestra error.
- [ ] Prueba desde el navegador interno de **Instagram**, **Facebook** y **TikTok** (pega el enlace en un mensaje directo y ábrelo ahí).
- [ ] Prueba sin UTM: Origen debe decir **Directo**.
- [ ] Enviar dos veces el mismo número dentro de 6 horas: no crea fila duplicada.
- [ ] Error simulado: en Vercel cambia temporalmente `GOOGLE_APPS_SCRIPT_SECRET` por `x` + Redeploy → el formulario debe mostrar error y **conservar los datos**. Restaura el valor correcto y haz Redeploy.
- [ ] Borra todas las filas de prueba.

---

## PASO 5 · Conectar el subdominio

Ejemplo: `vsl.mentora.pe` (confirma el nombre definitivo).

1. Vercel → Project → **Settings → Domains → Add** → escribe `vsl.mentora.pe` → **Add**.
2. Vercel mostrará un registro **CNAME** con un valor (por ejemplo `cname.vercel-dns.com` o uno específico de tu proyecto). **Usa exactamente el valor que muestre Vercel.**
3. Entra donde se administra el DNS de `mentora.pe` (quien gestiona la web actual: Hostinger, Cloudflare, GoDaddy, Punto.pe, Wix, etc.) → zona DNS → **Agregar registro**:
   - Tipo: `CNAME`
   - Nombre/Host: `vsl`
   - Valor/Destino: el valor de Vercel
   - TTL: automático
   - Si usas **Cloudflare**: deja la nube en **gris (DNS only)**.
4. Espera de 5 minutos a unas horas. En Vercel el dominio pasará a **Valid Configuration** y el certificado HTTPS se emite solo.
5. Actualiza en Vercel `NEXT_PUBLIC_SITE_URL=https://vsl.mentora.pe` → **Redeploy**.
6. Repite la prueba del paso 4.1 con la nueva URL.
7. Usa esa URL en los anuncios de Meta y TikTok.

> ⚠️ No toques los registros existentes de `mentora.pe` (raíz, `www`, correo/MX). Solo agrega el nuevo `CNAME`.

---

## PASO 6 · Contenido y extras

### Video
En Vercel → Environment Variables:
- **YouTube** (lo más simple): sube el video como *No listado* y pega el enlace en `NEXT_PUBLIC_VIDEO_URL`.
- **MP4 propio**: súbelo a un servicio de hosting de video o almacenamiento (Vercel Blob, Bunny, Cloudflare R2…) y pega la URL `.mp4`. Recomendado: H.264, 1080p, < 50 MB.
- Portada opcional: guarda una imagen 1280×720 en `public/video-portada.jpg` y pon `NEXT_PUBLIC_VIDEO_POSTER=/video-portada.jpg`.
- Redeploy. Si la variable está vacía, se ve la portada provisional.

### Logo oficial
Copia el archivo a `public/logo-mentora.svg` (o `.png`) y en `lib/site.ts` cambia `logoSrc: null` por `logoSrc: "/logo-mentora.svg"` (ajusta `logoWidth`/`logoHeight`). Sube el cambio a GitHub: Vercel publica solo.

### Antispam reforzado: Cloudflare Turnstile (gratis, recomendado antes de escalar pauta)
1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile → Add widget** → dominio `vsl.mentora.pe` (y `landing-paty.vercel.app`) → modo **Managed**.
2. Copia **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; **Secret Key** → `TURNSTILE_SECRET_KEY`. Redeploy.
3. La mayoría de personas no verá nada; solo se muestra una casilla si el tráfico parece sospechoso.

### Pixels de Meta y TikTok (apagados hasta revisión legal)
Cuando legal apruebe el texto de cookies y la política:
1. `NEXT_PUBLIC_META_PIXEL_ID` = ID del Pixel (Administrador de eventos de Meta).
2. `NEXT_PUBLIC_TIKTOK_PIXEL_ID` = ID del Pixel (TikTok Ads Manager → Assets → Events).
3. `NEXT_PUBLIC_TRACKING_ENABLED=true` → Redeploy.

Comportamiento: aparece un aviso "Aceptar / Rechazar". Solo si aceptan se cargan los pixels, se registra `PageView`, `Lead` (Meta) / `SubmitForm` (TikTok) **después** de que Google Sheets confirma el registro, y `VideoPlay`. **Nunca** se envía nombre, número ni ciudad a Meta o TikTok.

---

## Pendientes de aprobación 🟡

| Ítem | Dónde | Quién |
|---|---|---|
| Texto de la casilla de consentimiento | `lib/site.ts` | Legal + Isamar |
| Política de Privacidad (RUC, dirección, n.º de banco de datos ANPD, correo ARCO, plazo de conservación, países de transferencia) | `app/privacidad/page.tsx` | Legal + Isamar |
| Inscripción del banco de datos de prospectos ante la ANPD (MINJUSDH) | Trámite | Legal |
| Declaración de flujo transfronterizo (Google y Vercel almacenan fuera del Perú) | Trámite | Legal |
| Texto del aviso de cookies (si se activan pixels) | `components/Tracking.tsx` | Legal |
| Logo oficial y video | `public/` + Vercel | Marketing |
| Copy del título/subtítulo | `lib/site.ts` | Isamar |

Al aprobar el texto legal: cambia `CONSENT_VERSION` en `lib/site.ts` (ej. `v1.0-2026-12-01`) para que cada lead registre qué versión aceptó.

---

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| El formulario siempre muestra error | Variables mal copiadas | Revisa URL (`/exec`) y secreto en Vercel, sin espacios. Redeploy. |
| Logs de Vercel: `Apps Script no devolvió JSON` | El Web App no está con acceso "Cualquier persona" | Paso 1.7 |
| Logs: `rechazó el registro: unauthorized` | Secreto distinto o reloj desfasado | Ejecuta `verSecreto`, copia de nuevo a Vercel |
| Logs: `not_configured` | Falta ejecutar `configurar` | Paso 1.4 |
| Cambié Code.gs y no se refleja | No se publicó nueva versión | Administrar implementaciones → Nueva versión |
| Dominio "Invalid Configuration" | DNS aún propagando o CNAME incorrecto | Revisa el valor exacto; espera hasta 24 h |

Logs: Vercel → Project → **Logs** → filtra por `[leads]`. Apps Script → **Ejecuciones**.
