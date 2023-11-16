const CACHE_NAME = "SW-001";
const toCache = [
  "/",
  "manifest.json",
  "css/style.scss",
  "fonts/fontawesome-webfront.ttf",
  "fonts/fontawesome-webfront.woff",
  "fonts/fontawesome-webfront.woff2",
  "css/bootstrap.css",
  "css/style.css.map",
  "css/styles.css",
  "css/responsive.css",
  "css/font-awesome.min.css",
  "images/Laundry.png",
  "images/Laundry-143.png",
  "images/Clothes.png",
  "images/s1.png",
  "images/s2.png",
  "images/s3.png",
  "images/People.png",
  "images/WashingM.png",
  "js/bootstrap.js",
  "js/custom.js",
  "js/jquery-3.4.1.min.js",
  "js/script.js",
  "service-worker.js",
  "index.html",
  "images/Bedcover.png",
  "images/Selimut.png",
  "images/Karpet.png",
  "images/Sepatu.png",
  "images/Pakaian.png",
];

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Hapus cache lama", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});