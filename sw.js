const CACHE = "gq-58953304";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "data/rules-1.json", "data/u-01.json", "data/u-02.json", "data/u-03.json", "data/u-04.json", "data/u-05.json", "data/u-06.json", "data/u-07.json", "data/u-08.json", "data/u-09.json", "data/u-10.json", "data/u-11.json", "data/u-12.json", "data/u-13.json", "data/u-14.json", "data/u-15.json", "data/v-01.json", "data/v-02.json", "data/v-03.json", "data/v-04.json", "data/v-05.json", "data/v-06.json", "data/v-07.json", "data/v-08.json", "data/v-09.json", "data/v-10.json"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
    if (res && (res.ok || res.type === "opaque") && (req.url.startsWith(self.location.origin) || /fonts\.(googleapis|gstatic)\.com/.test(req.url))) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  }).catch(() => caches.match("index.html"))));
});
