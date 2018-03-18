importScripts('workbox-sw.prod.js');
const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true,
});
workboxSW.precache([
  {
    "url": "app.915d8cf8a8b9164691a8.js",
    "revision": "6a4a544b49f590bfcbf204d11e659173"
  },
  {
    "url": "dist/bundle.css",
    "revision": "c94f417c8d9daf3a773f17f4461a07bc"
  },
  {
    "url": "index.html",
    "revision": "05b26496be1a9da3e7d0311c8f4d1366"
  },
  {
    "url": "vendor.915d8cf8a8b9164691a8.js",
    "revision": "34d7d0d22412ecb18e815db6afa7b2d5"
  },
  {
    "url": "workbox-sw.prod.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  }
]);
workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 20,
    },
    cacheableResponse: { statuses: [0, 200] },
  })
);
// We want no more than 50 images in the cache. We check using a cache first strategy
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
  workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
      maxEntries: 50,
    },
  })
);
workboxSW.router.registerRoute(/index.html/, workboxSW.strategies.staleWhileRevalidate());
