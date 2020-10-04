const CACHE_NAME = "onespace-v1.03";
const urlsToCache=[
    "/css/materialize.min.css",
    "/css/style.css",
    "/css/responsive.css",
    "/img/404.png",
    "/img/bg.jpg",
    "/img/card-img.jpg",
    "/img/comet.png",
    "/img/earth.png",
    "/img/jupiter.png",
    "/img/logo-brand.png",
    "/img/logo.png",
    "/img/mars.png",
    "/img/mercury.png",
    "/img/moon.png",
    "/img/neptune.png",
    "/img/saturnus.png",
    "/img/sun.png",
    "/img/venus.png",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/pages/contact.html",
    "/pages/home.html",
    "/pages/object.html",
    "/pages/planets.html",
    "/index.html",
    "/nav.html",
    "/service-worker.js",
    "/manifest.json"
];

// simpan hasil cache
self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            return cache.addAll(urlsToCache);
        })
    );
});

// menggunakan hasil cache
self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches
            .match(event.request, {cacheName:CACHE_NAME})
            .then((response)=>{
                if(response){
                    console.log("ServiceWorker : Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ", event.request.url
                );

                return fetch(event.request);
            })
    );
});

// menghapus cache lama
self.addEventListener("activate", (event)=>{
    event.waitUntil(
        caches.keys().then((cachesNames)=>{
            return Promise.all(
                cachesNames.map((cacheName)=>{
                    if(cacheName != CACHE_NAME){
                        console.log(`ServiceWorker: cache${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
