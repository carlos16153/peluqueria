const CACHE_PREFIX = 'vibra-pwa-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
// Keep the app shell available when the device is offline.
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/app.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

const cacheResponse = (request, response) =>
  caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, response.clone()))
    .catch((error) => {
      console.error(`No se pudo guardar en caché ${request.url}:`, error);
    });

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET' || requestUrl.origin !== self.location.origin) {
    return;
  }

  const isStaticAsset = ['style', 'script', 'image', 'font', 'manifest'].includes(request.destination);

  if (isStaticAsset) {
    // Static assets are read from cache first, then cached after a network fetch.
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          if (!response.ok) {
            return response;
          }

          return cacheResponse(request, response).then(() => response);
        }),
      }),
    );
    return;
  }

  // Same-origin pages and dynamic requests prefer fresh network data.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          return cacheResponse(request, response).then(() => response);
        }

        return response;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        if (request.mode === 'navigate') {
          const cachedPage = await caches.match('./index.html');
          if (cachedPage) {
            return cachedPage;
          }
        }

        throw new Error(`No hay respuesta de red ni caché para ${request.url}`);
      }),
  );
});
