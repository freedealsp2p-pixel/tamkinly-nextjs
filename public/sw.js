// Tamkinly Service Worker v3 - PWA with stale-while-revalidate
const CACHE_NAME = 'tamkinly-v3';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline',
];

// Install: cache static assets, skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches, claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: stale-while-revalidate for same-origin GET requests
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Only handle same-origin requests (let CDN handle external)
  if (url.origin !== self.location.origin) return;
  
  // Skip API + auth + admin + payment routes
  if (url.pathname.startsWith('/api/') || 
      url.pathname.startsWith('/auth/') ||
      url.pathname.startsWith('/admin/') ||
      url.pathname.startsWith('/payment/') ||
      url.pathname.startsWith('/checkout/')) {
    return;
  }
  
  // Network-first for navigation requests (always get fresh HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match('/offline')))
    );
    return;
  }
  
  // Stale-while-revalidate for static assets
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
