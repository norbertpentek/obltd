const CACHE_NAME = "static-cache-v8.3";
const STATIC_ASSETS = [
  "/css/stylesgoko.css"
  "/css/syliesgoko.css"
  "/stylesgoko.css"
  // Add paths to all of your static files here
  "/kepek/cu3.webp",
  "/kepek/pg3.webp",
  "/kepek/tree.webp",
  "/kepek/ko.webp",
  //"/kepek/contactus1.webp",
  "/kepek/.whiteobltd2.webp",
  //"/kepek/logo3.webp",
  // // '/kepek/mybuilder.webp',
  // '/kepek/fb.webp',
  // // '/kepek/bark.webp',
  // // '/kepek/checkatrade.webp',
  // //'/kepek/David.webp',
  "/kepek/Otto.webp",
  //"/kepek/htvilagos.webp",
  // // '/kepek/Projects Gallery/Back & Side Extension3/1.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/2.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/3.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/4.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/5.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/6.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/7.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension3/8.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/1.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/2.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/3.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/4.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/5.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/6.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/7.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/8.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/9.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/10.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/11.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/12.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/13.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/14.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/15.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/16.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/17.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/18.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/19.webp',
  // // '/kepek/Projects Gallery/Back & Side Extension/20.webp',
  "/script.js",
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
