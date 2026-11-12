/**
 * MENTORA — Receptor de leads de la landing VSL → Google Sheets
 * ----------------------------------------------------------------
 * Pégalo en: Hoja de cálculo → Extensiones → Apps Script → Code.gs
 * Guía completa: docs/GUIA-DESPLIEGUE.md (paso 1).
 *
 * Seguridad:
 *  - Solo acepta envíos firmados con HMAC-SHA256 usando SHARED_SECRET
 *    (Propiedades del script — nunca se escribe en este código).
 *  - Rechaza envíos con más de 5 minutos de antigüedad (anti-repetición).
 *  - Vuelve a validar todos los campos.
 *  - Evita duplicados: por ID de lead (reintentos) y por WhatsApp (6 horas).
 *  - Límite global de registros por minuto.
 *  - Neutraliza fórmulas (= + - @) para evitar inyección en la hoja.
 *  - No guarda IP, navegador ni ningún dato extra (minimización de datos).
 */

var SHEET_NAME = 'Leads';
var TIMEZONE = 'America/Lima';
var MAX_PER_MINUTE = 60;          // tope global de registros por minuto
var MAX_AGE_MS = 5 * 60 * 1000;   // validez de la firma
var PHONE_DEDUPE_SECONDS = 21600; // 6 horas (máximo de CacheService)

var HEADERS = [
  'ID Lead',
  'Fecha y hora (Perú)',
  'Nombre completo',
  'WhatsApp',
  'Ciudad',
  'Origen',
  'Campaña',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'Consentimiento',
  'Fecha consentimiento (Perú)',
  'Versión consentimiento',
  'Estado comercial',
  'Asesor asignado',
  'Notas comerciales',
  'Fecha último contacto'
];

var ESTADOS = ['NUEVO', 'CONTACTADO', 'NO CONTESTA', 'INTERESADO', 'MATRICULADO', 'NO INTERESADO', 'DATOS ERRÓNEOS'];

/* ============================ ENTRADA ============================ */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json_({ ok: false, error: 'invalid' });
    if (e.postData.contents.length > 10000) return json_({ ok: false, error: 'invalid' });

    var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
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

/** Una visita con el navegador a la URL solo confirma que el servicio está activo. */
function doGet() {
  return json_({ ok: true, service: 'mentora-leads', note: 'Usa POST firmado.' });
}

/* ============================ GUARDADO ============================ */

function saveLead_(lead) {
  var cache = CacheService.getScriptCache();
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return json_({ ok: false, error: 'busy' });

  try {
    var sheet = getSheet_();

    // 1) Duplicado por reintento (mismo ID de lead)
    if (cache.get('id:' + lead.lead_id)) return json_({ ok: true, duplicate: true, lead_id: lead.lead_id });
    var found = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1)
      .createTextFinder(lead.lead_id).matchEntireCell(true).findNext();
    if (found) {
      cache.put('id:' + lead.lead_id, '1', PHONE_DEDUPE_SECONDS);
      return json_({ ok: true, duplicate: true, lead_id: lead.lead_id });
    }

    // 2) Mismo WhatsApp en las últimas 6 horas → no se duplica la fila
    var phoneKey = 'ph:' + lead.whatsapp;
    if (cache.get(phoneKey)) return json_({ ok: true, duplicate: true, lead_id: lead.lead_id });

    // 3) Límite global por minuto
    var bucket = 'rate:' + Math.floor(Date.now() / 60000);
    var count = Number(cache.get(bucket) || 0);
    if (count >= MAX_PER_MINUTE) return json_({ ok: false, error: 'rate_limited' });
    cache.put(bucket, String(count + 1), 120);

    var now = new Date();
    var consentDate = new Date(lead.consentimiento_fecha_iso);
    if (isNaN(consentDate.getTime())) consentDate = now;

    var row = [
      lead.lead_id,
      fmt_(now),
      lead.nombre,
      lead.whatsapp,
      lead.ciudad,
      lead.origen,
      lead.campana,
      lead.utm_source,
      lead.utm_medium,
      lead.utm_campaign,
      lead.utm_content,
      lead.utm_term,
      'SÍ',
      fmt_(consentDate),
      lead.consentimiento_version,
      'NUEVO',
      '',
      '',
      ''
    ].map(safeCell_);

    sheet.appendRow(row);
    SpreadsheetApp.flush();

    cache.put('id:' + lead.lead_id, '1', PHONE_DEDUPE_SECONDS);
    cache.put(phoneKey, '1', PHONE_DEDUPE_SECONDS);

    return json_({ ok: true, duplicate: false, lead_id: lead.lead_id });
  } finally {
    lock.releaseLock();
  }
}

/* ============================ VALIDACIÓN ============================ */

function validate_(l) {
  if (!l || typeof l !== 'object') return 'payload';
  var str = function (v, max) { return typeof v === 'string' && v.length <= max; };
  if (!/^MEN-[0-9A-F]{10}$/.test(l.lead_id || '')) return 'lead_id';
  if (!str(l.nombre, 90) || l.nombre.replace(/^'/, '').length < 3) return 'nombre';
  if (!/^\+\d{9,15}$/.test(l.whatsapp || '')) return 'whatsapp';
  if (!str(l.ciudad, 70) || l.ciudad.replace(/^'/, '').length < 2) return 'ciudad';
  var opt = ['origen', 'campana', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'consentimiento_version'];
  for (var i = 0; i < opt.length; i++) {
    if (l[opt[i]] != null && !str(l[opt[i]], 160)) return opt[i];
  }
  if (l.consentimiento !== 'SÍ') return 'consentimiento';
  if (!str(l.consentimiento_version, 60) || !l.consentimiento_version) return 'consentimiento_version';
  return null;
}

/* ============================ UTILIDADES ============================ */

/** Anti-inyección de fórmulas: todo lo que empiece con = + - @ se guarda como texto. */
function safeCell_(v) {
  var s = v == null ? '' : String(v);
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s.slice(0, 200);
}

function fmt_(d) {
  return Utilities.formatDate(d, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
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

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = prepararHoja_(ss);
  return sheet;
}

/* ============================ CONFIGURACIÓN (ejecutar a mano) ============================ */

/**
 * PASO A — Ejecuta esta función UNA vez desde el editor (botón ▶ Ejecutar).
 * Crea la pestaña "Leads" con encabezados, formatos y la lista de estados comerciales,
 * y genera un SHARED_SECRET aleatorio si todavía no existe.
 */
function configurar() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  var sheet = ss.getSheetByName(SHEET_NAME) || prepararHoja_(ss);

  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SHARED_SECRET')) {
    props.setProperty('SHARED_SECRET', Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, ''));
  }
  console.log('Hoja lista: "' + sheet.getName() + '".');
  console.log('Ahora ejecuta la función verSecreto para copiar el secreto a Vercel.');
}

/**
 * PASO B — Muestra el secreto en el registro de ejecución para copiarlo
 * a la variable GOOGLE_APPS_SCRIPT_SECRET de Vercel. No lo compartas por chat ni correo.
 */
function verSecreto() {
  console.log(PropertiesService.getScriptProperties().getProperty('SHARED_SECRET'));
}

/** Genera un secreto nuevo (si crees que se filtró). Recuerda actualizarlo en Vercel. */
function rotarSecreto() {
  PropertiesService.getScriptProperties().setProperty(
    'SHARED_SECRET', Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, ''));
  console.log('Secreto rotado. Ejecuta verSecreto y actualiza Vercel.');
}

function prepararHoja_(ss) {
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#101B2E');
  sheet.setFrozenRows(1);
  var estado = SpreadsheetApp.newDataValidation().requireValueInList(ESTADOS, true).setAllowInvalid(false).build();
  sheet.getRange(2, 16, sheet.getMaxRows() - 1, 1).setDataValidation(estado);
  sheet.setColumnWidths(1, HEADERS.length, 150);
  sheet.setColumnWidth(3, 220);
  return sheet;
}

/**
 * PRUEBA INTERNA — simula un envío firmado tal como lo hará Vercel.
 * Ejecútala después de configurar(): debe aparecer una fila "PRUEBA Interna" en la hoja.
 * Bórrala después.
 */
function pruebaInterna() {
  var secret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
  var id = 'MEN-' + Utilities.getUuid().replace(/-/g, '').slice(0, 10).toUpperCase();
  var payload = JSON.stringify({
    lead_id: id, nombre: 'PRUEBA Interna', whatsapp: '+51900000000', ciudad: 'Lima',
    origen: 'Prueba', campana: '(sin campaña)', utm_source: '', utm_medium: '', utm_campaign: '',
    utm_content: '', utm_term: '', consentimiento: 'SÍ',
    consentimiento_fecha_iso: new Date().toISOString(), consentimiento_version: 'prueba', estado: 'NUEVO'
  });
  var ts = Date.now();
  var res = doPost({ postData: { contents: JSON.stringify({ payload: payload, ts: ts, sig: hmacHex_(ts + '.' + payload, secret) }) } });
  console.log(res.getContent());
}
