/* Service worker de Cuentos Cortitos - cache offline (40 cuentos) */
const CACHE = "cuentos-cortitos-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./cuentos-data.js",
  "./ads-config.js",
  "./privacidad.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg",
  "./cuentos-images.js"
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
