const cacheName = "dev-apps";
const preCache = ["/", "/style.css", "/script.js", "/offline.html", "/manifest.json"];

self.addEventListener("install", (e) => {
    console.log("Service Worker: Installed");
    e.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(preCache))
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request).then((fetchRes) => {
                return caches.open(cacheName).then((cache) => {
                    cache.put(e.request, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => caches.match("/offline.html"))
    );
});
