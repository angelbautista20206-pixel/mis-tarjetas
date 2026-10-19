// Caché aislada por aplicación y ruta; no elimina cachés de otras aplicaciones.
const PREFIX = 'lba-mis-tarjetas-' + new URL(self.registration.scope).pathname;
const VERSION = PREFIX + '-v3';
const SHELL = ['./', 'index.html', 'privacidad.html', 'manifest.webmanifest', 'assets/lba-logo.png'];
const localURL = path => new URL(path, self.registration.scope).href;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL.map(localURL))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if(request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  if(request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const response = await fetch(request);
        if(response.ok) await cache.put(request, response.clone());
        return response;
      } catch(error) {
        const exact = await cache.match(request, {ignoreSearch:true});
        if(exact) return exact;
        if(url.pathname === new URL(self.registration.scope).pathname || url.pathname.endsWith('/index.html')) return await cache.match(localURL('index.html'));
        return new Response('Esta página no está disponible sin conexión.', {status:503, headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }
  if(!SHELL.map(localURL).includes(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION), hit = await cache.match(request);
    if(hit) return hit;
    const response = await fetch(request);
    if(response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
