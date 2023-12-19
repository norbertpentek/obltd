const CACHE_NAME = 'static-cache-v8.7';
const STATIC_ASSETS = [
  // Add paths to all of your static files here
     '/css/syliesgoko.css',
    '/kepek/ht.webp',
     '/kepek/pg1.webp',
     '/kepek/contactus1.webp',
    // '/kepek/kepgoco.webp',
     '/kepek/logo3.webp',
    // // '/kepek/mybuilder.webp',
    // '/kepek/fb.webp',
    // // '/kepek/bark.webp',
    // // '/kepek/checkatrade.webp',
    // //'/kepek/David.webp',
    // //'/kepek/Otto.webp',
    '/kepek/htvilagos.webp',
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
    // '/script.js',
];

// Install event - caching static assets
self.addEventListener('install', function(event) {
  // Itt vannak az erőforrások cache-elési logikái
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(STATIC_ASSETS);
      })
  );
  // Skip waiting parancs
  self.skipWaiting();
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch event - serving up the static files (if in cache)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).then(function(networkResponse) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }))
  );
});

// const CACHE_NAME = 'static-cache-v3.6';
// const STATIC_ASSETS = [
//   // Add paths to all of your static files here
//   '/video/mesure5.mp4',
//   '/css/syliesgoko.css?v=1',
//   '/kepek/ht.webp',
//   '/kepek/kepgoco.webp',
//   '/kepek/logo2.webp',
//   '/kepek/mybuilder.webp',
//   '/kepek/fb22.webp',
//   '/kepek/bark.webp',
//   '/kepek/checkatrade.webp',
//   '/kepek/daomodd.webp',
//   '/kepek/davidottoo.webp',
//   '/kepek/htvilagos.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/1.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/2.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/3.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/4.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/5.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/6.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/7.webp',
//   '/kepek/Projects Gallery/Back & Side Extension3/8.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/1.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/2.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/3.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/4.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/5.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/6.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/7.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/8.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/9.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/10.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/11.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/12.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/13.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/14.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/15.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/16.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/17.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/18.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/19.webp',
//   '/kepek/Projects Gallery/Back & Side Extension/20.webp',
//   '/script.js',
//   // Include additional static assets
// ];
// // Install event - caching static assets
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(STATIC_ASSETS))
//   );
// });
// // Activate event - cleaning up old caches
// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys()
//       .then(keys => Promise.all(
//         keys.map(key => {
//           if (key !== CACHE_NAME) {
//             return caches.delete(key);
//           }
//         })
//       ))
//   );
// });
// // Fetch event - serving up the static files (if in cache)
// //  self.addEventListener('fetch', event => {
// //   event.respondWith(
// //     caches.match(event.request)
// //       .then(response => response || fetch(event.request))
// //   );});
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('my-cache-name').then(function(cache) {
//       return cache.match(event.request).then(function(response) {
//         return response || fetch(event.request).then(function(networkResponse) {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         });
//       });
//     })
//   );
// });

