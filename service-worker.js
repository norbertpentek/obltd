const CACHE_NAME = "static-cache-v8.12";
const STATIC_ASSETS = [
  "/kepek/tree.webp",
  "/kepek/ko.webp",
  "/kepek/sky.webp",
  // Hero assets
  "/kepek/bv-poster.webp",
  "/video/bv-mobile.mp4",
  "/video/bv-desktop.mp4",
  // Above-the-fold images
  "/kepek/whiteobltd2-239.webp",
  "/kepek/whiteobltd2-478.webp",
  "/kepek/cu3.webp",
  "/kepek/pg3.webp",
  // Critical CSS
  "/css/syliesgoko.css",
];

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
  // Cache-first for hero video and poster
  if (
    requestUrl.includes("/video/bv-mobile.mp4") ||
    requestUrl.includes("/video/bv-desktop.mp4") ||
    requestUrl.includes("/kepek/bv-poster.webp")
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const respClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, respClone));
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
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
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
