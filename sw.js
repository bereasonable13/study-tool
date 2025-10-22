// Simple service worker to cache the app shell + CDN libs for reliability
const CACHE = 'pdf-quiz-search-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Network-first for CDN libs to pick up updates, fallback to cache
  if (url.origin.includes('cdnjs.cloudflare.com')) {
    event.respondWith(
      fetch(event.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c=>c.put(event.request, copy));
        return resp;
      }).catch(()=> caches.match(event.request))
    );
    return;
  }
  // Cache-first for our static assets
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
