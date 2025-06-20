self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fitness-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'app.js',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
