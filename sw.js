const CACHE = 'dashboard-servidores-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./index.html','./manifest.json'])));
});
self.addEventListener('fetch', e => {
  // Dados da planilha sempre da rede, nunca do cache
  if (e.request.url.includes('docs.google.com')) { return; }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
