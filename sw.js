
self.importScripts('js/inter.js');

// Files to cache
var cacheName = 'HereNow-v1.5';
var cacheFiles = [
'/HereNow/',
'/HereNow/index.html',
'/HereNow/style.css',
'/HereNow/js/weatherApp.js',
'/HereNow/js/interactive.js'
];

// Installing Service Worker
self.addEventListener('install', function(e) {
console.log('[Service Worker] Install');
e.waitUntil(
  caches.open(cacheName).then(function(cache) {
    console.log('[Service Worker] Caching all: app shell and content');
    return cache.addAll(cacheFiles);
  })
);
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
e.respondWith(
  caches.match(e.request).then(function(r) {
    console.log('[Service Worker] Fetching resource: '+e.request.url);
    return r || fetch(e.request).then(function(response) {
      return caches.open(cacheName).then(function(cache) {
        console.log('[Service Worker] Caching new resource: ' + e.request.url);
        cache.put(e.request, response.clone());
        return response;
      });
    });
  })
);
});
