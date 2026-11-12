/**
 * Límite de solicitudes por IP (ventana deslizante, en memoria).
 *
 * En Vercel cada instancia tiene su propia memoria, así que este límite es la
 * PRIMERA capa. Las otras capas son:
 *  - Límite global por minuto dentro de Google Apps Script (compartido por todas las instancias).
 *  - (Recomendado) Regla de "Rate Limiting" del Firewall de Vercel sobre /api/leads.
 */

type Bucket = number[];
const store = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
  now = Date.now(),
): { allowed: boolean; retryAfterSec: number } {
  const since = now - windowMs;
  const hits = (store.get(key) ?? []).filter((t) => t > since);

  if (hits.length >= limit) {
    store.set(key, hits);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)) };
  }

  hits.push(now);
  store.set(key, hits);

  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      if (!v.length || v[v.length - 1] <= since) store.delete(k);
    }
    if (store.size > MAX_KEYS) store.clear();
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function _resetRateLimit() {
  store.clear();
}
