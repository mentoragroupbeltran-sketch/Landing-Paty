/**
 * MENTORA — Receptor de leads de la landing VSL → Google Sheets
 * ----------------------------------------------------------------
 * Compatible con la plantilla oficial de MENTORA:
 * Col A: ID
 * Col B: Fecha registro
 * Col C: Nombre completo
 * Col D: WhatsApp
 * Col E: Chat (Enlace directo a WhatsApp)
 * Col F: Ciudad
 * Col G: Autoriza datos (Sí)
 * Col H: Origen (Facebook Ads, Instagram Ads, TikTok Ads, Google Ads, etc.)
 * Col I: Campaña / anuncio (ej. Paty)
 * Col J: Estado (Nuevo)
 * Col K: Asesor
 * Col L: Intentos de contacto
 * Col M: Último contacto
 * Col N: Próximo seguimiento
 * Col O: Motivo de pérdida
 * Col P: Notas
 *
 * Pégalo en: Hoja de cálculo → Extensiones → Apps Script → Código.gs
 */

var TIMEZONE = 'America/Lima';
var MAX_PER_MINUTE = 60;          // tope de seguridad de registros por minuto
var MAX_AGE_MS = 5 * 60 * 1000;   // validez de la firma (5 minutos)
var PHONE_DEDUPE_SECONDS = 21600; // 6 horas sin duplicar el mismo número

/* ============================ ENTRADA ============================ */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json_({ ok: false, error: 'invalid' });
    if (e.postData.contents.length > 10000) return json_({ ok: false, error: 'invalid' });

    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET') || 'AKfycby_r0jDcsaUHEesLJp7L8El7JgV8023djXbgfxwtFmFIxYUSSYWCf1RErTiYcZwaaT92g';
    if (!secret || secret.length < 32) return json_({ ok: false, error: 'not_configured' });

    var env;
    try { env = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'invalid' }); }
    if (!env || typeof env.payload !== 'string' || typeof env.ts !== 'number' || typeof env.sig !== 'string') {
      return json_({ ok: false, error: 'invalid' });
    }
    if (Math.abs(Date.now() - env.ts) > MAX_AGE_MS) return json_({ ok: false, error: 'unauthorized' });

    var expected = hmacHex_(env.ts + '.' + env.payload, secret);
    if (!safeEqual_(expected, env.sig)) return json_({ ok: false, error: 'unauthorized' });

    var lead;
    try { lead = JSON.parse(env.payload); } catch (err2) { return json_({ ok: false, error: 'invalid' }); }
    var problem = validate_(lead);
    if (problem) return json_({ ok: false, error: 'invalid', detail: problem });

    return saveLead_(lead);
  } catch (err3) {
    console.error('doPost error: ' + (err3 && err3.stack ? err3.stack : err3));
    return json_({ ok: false, error: 'server_error' });
  }
}

/** Comprueba en el navegador que el Web App está activo. */
function doGet() {
  return json_({ ok: true, service: 'mentora-leads', note: 'Servicio activo. Requiere POST firmado.' });
}

/* ============================ GUARDADO ============================ */

function saveLead_(lead) {
  var cache = CacheService.getScriptCache();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return json_({ ok: false, error: 'busy' });

  try {
    var sheet = getSheet_();

    // 1) Duplicado por ID de lead (reintentos de red)
    if (cache.get('id:' + lead.lead_id)) return json_({ ok: true, duplicate: true, lead_id: lead.lead_id });

    // 2) Mismo WhatsApp en las últimas 6 horas → evitar duplicado accidental
    var cleanDigits = (lead.whatsapp || '').replace(/\D/g, '');
    var phoneKey = 'ph:' + cleanDigits;
    if (cache.get(phoneKey)) return json_({ ok: true, duplicate: true, lead_id: lead.lead_id });

    // 3) Límite de envíos por minuto
    var bucket = 'rate:' + Math.floor(Date.now() / 60000);
    var count = Number(cache.get(bucket) || 0);
    if (count >= MAX_PER_MINUTE) return json_({ ok: false, error: 'rate_limited' });
    cache.put(bucket, String(count + 1), 120);

    var now = new Date();
    var fechaStr = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd HH:mm');

    // Enlace de WhatsApp directo con código de país
    var waLink = cleanDigits ? ('=HYPERLINK("https://wa.me/' + cleanDigits + '", "Abrir chat")') : '';

    // Detectar fila de encabezados en la plantilla de Mentora
    var headerRow = findHeaderRow_(sheet);
    var nextRow = sheet.getLastRow() + 1;
    if (nextRow <= headerRow) nextRow = headerRow + 1;

    // Calcular ID incremental (1, 2, 3...)
    var nextId = 1;
    if (nextRow > headerRow + 1) {
      var prevIdVal = sheet.getRange(nextRow - 1, 1).getValue();
      if (!isNaN(prevIdVal) && prevIdVal > 0) {
        nextId = Number(prevIdVal) + 1;
      } else {
        nextId = nextRow - headerRow;
      }
    }

    // Datos correspondientes a las columnas A hasta P
    var rowValues = [
      [
        nextId,                              // Col A: ID
        fechaStr,                            // Col B: Fecha registro
        lead.nombre,                         // Col C: Nombre completo
        lead.whatsapp,                       // Col D: WhatsApp
        waLink,                              // Col E: Chat
        lead.ciudad,                         // Col F: Ciudad
        'Sí',                                // Col G: Autoriza datos
        lead.origen || 'Web directa',        // Col H: Origen (Facebook Ads, TikTok Ads, etc.)
        lead.campana || '(sin campaña)',     // Col I: Campaña / anuncio
        'Nuevo',                             // Col J: Estado
        '',                                  // Col K: Asesor
        '',                                  // Col L: Intentos de contacto
        '',                                  // Col M: Último contacto
        '',                                  // Col N: Próximo seguimiento
        '',                                  // Col O: Motivo de pérdida
        ''                                   // Col P: Notas
      ]
    ];

    sheet.getRange(nextRow, 1, 1, 16).setValues(rowValues);
    SpreadsheetApp.flush();

    cache.put('id:' + lead.lead_id, '1', PHONE_DEDUPE_SECONDS);
    cache.put(phoneKey, '1', PHONE_DEDUPE_SECONDS);

    return json_({ ok: true, duplicate: false, lead_id: lead.lead_id });
  } finally {
    lock.releaseLock();
  }
}

/* ============================ UTILIDADES ============================ */

function findHeaderRow_(sheet) {
  var maxSearch = Math.min(sheet.getLastRow(), 10);
  for (var r = 1; r <= maxSearch; r++) {
    var val = String(sheet.getRange(r, 3).getValue()).toLowerCase(); // Columna C (Nombre completo)
    if (val.indexOf('nombre') !== -1) return r;
    var valA = String(sheet.getRange(r, 1).getValue()).toLowerCase(); // Columna A (ID)
    if (valA === 'id') return r;
  }
  return 4; // Por defecto fila 4 en la plantilla de Mentora
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Busca por los nombres comunes de la pestaña
  var names = ['Leads', 'Gestión de leads', 'Gestion de leads', 'LEADS'];
  for (var i = 0; i < names.length; i++) {
    var s = ss.getSheetByName(names[i]);
    if (s) return s;
  }
  // Si no encuentra por nombre, toma la primera pestaña
  return ss.getSheets()[0];
}

function validate_(l) {
  if (!l || typeof l !== 'object') return 'payload';
  if (!l.nombre || String(l.nombre).trim().length < 2) return 'nombre';
  if (!l.whatsapp || String(l.whatsapp).trim().length < 8) return 'whatsapp';
  if (!l.ciudad || String(l.ciudad).trim().length < 2) return 'ciudad';
  return null;
}

function hmacHex_(message, secret) {
  var bytes = Utilities.computeHmacSha256Signature(message, secret, Utilities.Charset.UTF_8);
  return bytes.map(function (b) { var h = (b & 0xff).toString(16); return h.length === 1 ? '0' + h : h; }).join('');
}

function safeEqual_(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ============================ FUNCIONES PARA EJECUTAR A MANO ============================ */

/**
 * PASO 1: Ejecuta esta función UNA vez para inicializar el secreto y permisos.
 */
function configurar() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  var sheet = getSheet_();

  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SHARED_SECRET')) {
    props.setProperty('SHARED_SECRET', Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, ''));
  }
  console.log('✅ Hoja vinculada correctamente: "' + sheet.getName() + '"');
  console.log('Ahora ejecuta la función "verSecreto" para copiar el secreto a Vercel.');
}

/**
 * PASO 2: Muestra tu secreto para pegarlo en Vercel (GOOGLE_APPS_SCRIPT_SECRET).
 */
function verSecreto() {
  console.log('🔑 TU SECRETO DE VERCEL (Copia exactamente esto):');
  console.log(PropertiesService.getScriptProperties().getProperty('SHARED_SECRET'));
}

/**
 * PASO 3 (Opcional): Inserta un lead de prueba para comprobar que se escribe en tu hoja.
 */
function pruebaInterna() {
  var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  var id = 'MEN-' + Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
  var payload = JSON.stringify({
    lead_id: id,
    nombre: 'PRUEBA Automática',
    whatsapp: '+51987654321',
    ciudad: 'Lima',
    origen: 'Facebook Ads',
    campana: 'Paty',
    consentimiento: 'SÍ'
  });
  var ts = Date.now();
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        payload: payload,
        ts: ts,
        sig: hmacHex_(ts + '.' + payload, secret)
      })
    }
  });
  console.log('Resultado:', res.getContent());
}
