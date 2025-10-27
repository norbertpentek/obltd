const CACHE_NAME = "static-cache-v8.14";
const STATIC_ASSETS = ["/kepek/tree.webp", "/kepek/ko.webp", "/kepek/sky.webp"];

// Install event - caching static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleaning up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  const requestUrl = event.request.url;
  if (requestUrl.includes("/Projects%20Gallery/")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Ha sikeres hálózati válasz, tegyük cache-be
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      })
      .catch(() => {
        // Ha nem érhető el hálózat, a cache-ből szolgáljuk ki
        return caches.match(event.request);
      })
  );
});
