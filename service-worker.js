
const CACHE_NAME = 'static-cache-v2.7';
const STATIC_ASSETS = [
  // Add paths to all of your static files here
  '/video/mesure5.mp4',
  '/css/syliesgoko.css',
  '/script.js',
  '/stylesgoko.css',
  '/stylesgallery.css',
  '/kepek/ht.webp',
  '/kepek/kepgoco.webp',
  '/kepek/logo2.webp',
  '/kepek/mybuilder.webp',
  '/kepek/fb22.webp',
  '/kepek/bark.webp',
  '/kepek/checkatrade.webp',
  '/kepek/daomodd.webp',
  '/kepek/davidottoo.webp',
  '/kepek/htvilagos.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/1.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/2.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/3.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/4.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/5.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/6.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/7.webp',
  '/kepek/Projects Gallery/Back & Side Extension3/8.webp',
  '/kepek/Projects Gallery/Back & Side Extension/1.webp',
  '/kepek/Projects Gallery/Back & Side Extension/2.webp',
  '/kepek/Projects Gallery/Back & Side Extension/3.webp',
  '/kepek/Projects Gallery/Back & Side Extension/4.webp',
  '/kepek/Projects Gallery/Back & Side Extension/5.webp',
  '/kepek/Projects Gallery/Back & Side Extension/6.webp',
  '/kepek/Projects Gallery/Back & Side Extension/7.webp',
  '/kepek/Projects Gallery/Back & Side Extension/8.webp',
  '/kepek/Projects Gallery/Back & Side Extension/9.webp',
  '/kepek/Projects Gallery/Back & Side Extension/10.webp',
  '/kepek/Projects Gallery/Back & Side Extension/11.webp',
  '/kepek/Projects Gallery/Back & Side Extension/12.webp',
  '/kepek/Projects Gallery/Back & Side Extension/13.webp',
  '/kepek/Projects Gallery/Back & Side Extension/14.webp',
  '/kepek/Projects Gallery/Back & Side Extension/15.webp',
  '/kepek/Projects Gallery/Back & Side Extension/16.webp',
  '/kepek/Projects Gallery/Back & Side Extension/17.webp',
  '/kepek/Projects Gallery/Back & Side Extension/18.webp',
  '/kepek/Projects Gallery/Back & Side Extension/19.webp',
  '/kepek/Projects Gallery/Back & Side Extension/20.webp',
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
//  self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => response || fetch(event.request))
//   );});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('my-cache-name').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});