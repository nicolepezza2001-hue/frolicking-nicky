/* Frolicking Nicky: offline support.
   Pages: fetched fresh when online (so updates show straight away), with a copy kept for when there's no signal.
   Everything else (styles, scripts, photos, fonts): served from the saved copy if there is one, refreshed in the background.
   The "Save for offline" button on itinerary pages stores a whole trip in the "fn-saved" cache, which is never cleared here. */
const RUNTIME = 'fn-runtime-v1', SAVED = 'fn-saved';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('fn-runtime-') && k !== RUNTIME) await caches.delete(k);
  await self.clients.claim();
})()));

const fonts = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url), same = url.origin === location.origin;
  if (!same && !fonts.test(req.url) && !/upload\.wikimedia\.org/.test(url.host)) return;

  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) (await caches.open(RUNTIME)).put(req, res.clone());
        return res;
      } catch (_) {
        return (await caches.match(req, { ignoreSearch: true })) ||
               (await caches.match(url.pathname.replace(/\/?$/, '/'), { ignoreSearch: true })) ||
               new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline</title><body style="font-family:Georgia,serif;background:#E4F5E0;color:#000;padding:40px 24px;max-width:520px;margin:auto"><h1 style="color:#86324A">You’re offline</h1><p>This page hasn’t been saved on this device yet. Itineraries you’ve opened or saved with “Save for offline” still work without a connection.</p><p><a href="/" style="color:#86324A">Back to the journal</a></p>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const cached = await caches.match(req);
    const refresh = fetch(req).then(async res => {
      if (res.ok || res.type === 'opaque') (await caches.open(RUNTIME)).put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || refresh;
  })());
});
