// Cache version v10.5a (icon link tags + maskable)
const CACHE = 'strap-log-v10_5a';
const ASSETS = ['./','./index.html?v=10.5a','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE && caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const req = e.request; const url = new URL(req.url);
  if (req.mode === 'navigate') { e.respondWith(caches.match('./index.html?v=10.5a').then(r => r || fetch('./index.html?v=10.5a'))); return; }
  e.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
    try { if (req.method==='GET' && url.origin===self.location.origin) { caches.open(CACHE).then(c => c.put(req, res.clone())); } } catch(e){}
    return res;
  }).catch(() => caches.match('./index.html?v=10.5a'))));
});
