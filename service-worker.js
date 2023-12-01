const CACHE_NAME = 'static-cache-v1';
const STATIC_ASSETS = [
  // Add paths to all of your static files here
  '/css/styles.css',
  '/images/logo.png',
  // Include additional static assets
];

// Install event - caching static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
  );
});

// Fetch event - serving up the static files (if in cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});