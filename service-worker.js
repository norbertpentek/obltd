const CACHE_NAME = "static-cache-v7.1";
const STATIC_ASSETS = [
  // Add paths to all of your static files here
  "/css/syliesgoko.css",
  "/kepek/cu3.webp",
  "/kepek/pg3.webp",
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
self.addEventListener("install", function (event) {
  // Itt vannak az erőforrások cache-elési logikái
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Skip waiting parancs
  self.skipWaiting();
});

// Activate event - cleaning up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  // Csak GET kérések gyorsítótárazása
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Ha van gyorsítótárazott válasz, adjuk vissza azt
        if (response) {
          return response;
        }

        return fetch(event.request).then(function (networkResponse) {
          // Ellenőrizd, hogy a válasz nem részleges-e (206-os válaszok kizárása)
          if (
            !networkResponse ||
            networkResponse.status === 206 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          // Másold és tárold a választ a gyorsítótárban
          var responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        });
      })
      .catch((error) => {
        console.error("Fetching failed:", error);
        throw error;
      })
  );
});
