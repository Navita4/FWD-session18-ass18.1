// Use a cacheName for cache versioning
var cacheName='v1:static';
// During the installation phase , you'll usually want to cache static assets
self.addEventListener('install',function(e){
    // onces the service worker is installed ,go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(cacheName).then (function(cache){
            return cache.addAll([
                './',
                './css/style.css',
                './js/build/script.min.js',
                './js/build/vendor.min.js',
                './css/fonts/roboto.woff',
                './offline.html',
            ]).then(function(){
                self.skipWaiting();
            });

        })
    );
});

// when the browser fetches a URL 
self.addEventListener('fetch',function(event){
    // either respond with the catched object or go ahead and fetch the actual url
    event.respondWith(
        catches.match(event.request).then(function(response){
            if(response){
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);

            
        })
    );
});