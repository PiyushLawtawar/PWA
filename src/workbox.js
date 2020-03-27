importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
const WEEK = 60 * 60 * 24 * 7;


workbox.routing.registerRoute(
  new RegExp('(?:getFooter\??(?:&?[^=&]*=[^=&]*)*|getCategory\??(?:&?[^=&]*=[^=&]*)*|getCarouselContent\??(?:&?[^=&]*=[^=&]*)*)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pageAssets',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: WEEK
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('([^\)]+?\.(woff|eot|woff2|ttf|svg)[^"]*)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'fontsAsset',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: WEEK,
        maxEntries: 30,
      })
    ]
  })
);



workbox.precaching.precacheAndRoute([]);

