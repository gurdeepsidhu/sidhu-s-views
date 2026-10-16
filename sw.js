const CACHE_NAME = "sidhus-views-cache-v9";
const urlsToCache = [
  "./",
  "index.html",
  "about.html",
  "explore.html",
  "journal.html",
  "article-budget-balcony-chai-corner.html",
  "article-highway-dhaba.html",
  "article-handmade-yarn-coasters.html",
  "article-beginners-guide-crochet.html",
  "article-budget-room-decor.html",
  "article-reading-nook-guide.html",
  "article-sainj-valley.html",
  "article-slow-morning-ritual.html",
  "article-sunday-samosa-memory.html",
  "images/balcony_chai_details_v2.jpg",
  "style.css",
  "script.js",
  "manifest.json"
];

// Install: Cache initial assets and immediately take over
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Delete old caches and claim clients immediately
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

// Fetch: NETWORK FIRST strategy for HTML pages so new articles appear instantly!
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  const isHtml = event.request.mode === "navigate" || 
                (event.request.headers.get("accept") && event.request.headers.get("accept").includes("text/html"));

  if (isHtml) {
    // Network First with Cache Fallback for all HTML/navigation
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Network First with Cache Fallback for CSS, JS, and assets so edits appear immediately
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
