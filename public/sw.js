/// <reference lib="webworker" />
/// <reference types="serviceworker" />

const CACHE_NAME = 'tamkinly-v1';
const OFFLINE_URL = '/offline';

// Resources to cache immediately on install
const PRECACHE_RESOURCES = [
  '/',
  '/offline',
  '/manifest.json',
  '/logo-icon.png',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  // Critical CSS and JS will be cached dynamically
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core resources');
      return cache.addAll(PRECACHE_RESOURCES);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip API requests - always fetch fresh
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // For navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response for caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, return offline page
            return caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // For other requests - stale-while-revalidate strategy
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Start fetching from network in parallel
      const fetchPromise = fetch(request).then((networkResponse) => {
        // Update cache with fresh response
        if (networkResponse.ok) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed, we already have cached response
        return cachedResponse;
      });

      // Return cached response immediately, or wait for network
      return cachedResponse || fetchPromise;
    })
  );
});

// Handle background sync for forms
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/logo-icon.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/',
      },
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'close', title: 'Close' },
      ],
    };
    event.waitUntil(
      self.registration.showNotification(data.title || 'Tamkinly', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url)
    );
  }
});

// Background sync function for contact form
async function syncContactForm() {
  try {
    const cache = await caches.open('contact-form-queue');
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

console.log('[SW] Service worker loaded');
