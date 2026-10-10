/* Service worker de Cuentos Cortitos - cache offline (40 cuentos) */
const CACHE = "cuentos-cortitos-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./cuentos-data.js",
  "./ads-config.js",
  "./privacidad.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg",
  "./img/cuento-01.jpg",
  "./img/cuento-02.jpg",
  "./img/cuento-03.jpg",
  "./img/cuento-04.jpg",
  "./img/cuento-05.jpg",
  "./img/cuento-06.jpg",
  "./img/cuento-07.jpg",
  "./img/cuento-08.jpg",
  "./img/cuento-09.jpg",
  "./img/cuento-10.jpg",
  "./img/cuento-11.jpg",
  "./img/cuento-12.jpg",
  "./img/cuento-13.jpg",
  "./img/cuento-14.jpg",
  "./img/cuento-15.jpg",
  "./img/cuento-16.jpg",
  "./img/cuento-17.jpg",
  "./img/cuento-18.jpg",
  "./img/cuento-19.jpg",
  "./img/cuento-20.jpg",
  "./img/cuento-21.jpg",
  "./img/cuento-22.jpg",
  "./img/cuento-23.jpg",
  "./img/cuento-24.jpg",
  "./img/cuento-25.jpg",
  "./img/cuento-26.jpg",
  "./img/cuento-27.jpg",
  "./img/cuento-28.jpg",
  "./img/cuento-29.jpg",
  "./img/cuento-30.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  // Nunca cachear anuncios: siempre red
  const h = url.hostname;
  if (h.indexOf("hilltopads") > -1 || h.indexOf("google") > -1 || h.indexOf("doubleclick") > -1 || h.indexOf("googlesyndication") > -1) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
