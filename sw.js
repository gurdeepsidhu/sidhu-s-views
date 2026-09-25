const CACHE_NAME = "sidhus-views-cache-v3";
const urlsToCache = [
  "./",
  "index.html",
  "explore.html",
  "journal.html",
  "article-beginners-guide-crochet.html",
  "article-budget-room-decor.html",
  "article-slow-morning-ritual.html",
  "article-sunday-samosa-memory.html",
  "article-sainj-valley.html",
  "style.css",
  "script.js",
  "manifest.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old PWA cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
