/* CaribbeanFreedomArena · minimal PWA shell (website stays the source of truth) */
const CACHE = "cfa-app-v2";
const SHELL = ["/palm-tree.png", "/trinidad-tobago-flag-map.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isDocument = event.request.mode === "navigate" || url.pathname === "/";
  const isNextAsset = url.pathname.startsWith("/_next/");

  /* HTML + Next chunks must be network-first so CSS never 404s from stale cache */
  if (isDocument || isNextAsset) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request).then((cached) => cached ?? Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
