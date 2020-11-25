self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('HereNow').then(function(cache) {
            return cache.addAll([
                '.',
                '/',
                '../index.html',
                '../app.js',
                '../manifest.json',
                '../css/style.css',
                'js/weatherApp.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
