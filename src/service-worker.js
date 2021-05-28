import { precacheAndRoute } from "workbox-precaching";

import { registerRoute } from "workbox-routing";

import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from "workbox-strategies";

import { ExpirationPlugin } from "workbox-expiration";

import { CacheableResponsePlugin } from "workbox-cacheable-response";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
        cacheName: "pages",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

registerRoute(
    ({ request }) =>
        request.destination === "style" || request.destination === "script" || request.destination === "worker",
    new StaleWhileRevalidate({
        cacheName: "assets",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

registerRoute(
    ({ request }) =>
        request.destination === "style" || request.destination === "script" || request.destination === "worker",
    new StaleWhileRevalidate({
        cacheName: "assets",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

registerRoute(
    ({ request }) => request.destination === "image" || request.destination === "font",
    new CacheFirst({
        cacheName: "images",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
            }),
        ],
    }),
);
