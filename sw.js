importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

const { registerRoute } = workbox.routing;
const { setCatchHandler } = workbox.routing;
const { precacheAndRoute } = workbox.precaching;
const { StaleWhileRevalidate } = workbox.strategies;

precacheAndRoute([
  { url: '/index.html', revision: null},
  { url: '/fallback.html', revision: null},
  { url: '/assets/images/icon.png', revision: null},
  { url: '/assets/javascript/script.js', revision: null},
  { url: '/assets/javascript/navbar.js', revision: null},
  { url: '/assets/javascript/player.js', revision: null},
  { url: '/assets/css/style.css', revision: null},
  { url: '/assets/css/player.css', revision: null},
])

registerRoute(({ url }) => url.pathname.startsWith("/"), new StaleWhileRevalidate());

setCatchHandler(({ url, event, params }) => {
  if (event.request.destination == 'document') {
    return caches.match('/fallback.html');
  } else {
    return Response.error();
  }
})

let cacheName = "static-cache-v1";
let filesToCache = [
  '/',
  '/index.html',
  '/fallback.html',
  '/assets/images/icon.png',
  '/assets/javascript/script.js',
  '/assets/javascript/navbar.js',
  '/assets/javascript/player.js',
  '/assets/css/style.css',
  '/assets/css/player.css'
]

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
    console.log('Service Worker installed successfully')
});

self.addEventListener('activate', function(event) {
    console.log('activate', event)
});

self.addEventListener("fetch", function (event) {
    console.log("fetch", event);
    event.respondWith(
      caches.open(cacheName).then(function (cache) {
        return cache
          .match(event.request)
          .then(function (response) {
            return (
              response ||
              fetch(event.request).then(function (response) {
                cache.put(event.request, response.clone());
                return response;
              })
            );
          })
          .catch(function () {
            return caches.match("/fallback.html");
          });
      })
    );
});