const CACHE_NAME = "toy-haven-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./products.html",
  "./cart.html",
  "./checkout.html",
  "./wishlist.html",
  "./feedback.html",
  "./terms.html",
  "./privacy.html",
  "./css/style.css",
  "./css/enhancements.css",
  "./js/products.js",
  "./js/main.js",
  "./js/cart.js",
  "./js/checkout.js",
  "./js/wishlist.js",
  "./js/feedback.js",
  "./manifest.json",
  "./images/favicon.svg",
  "./images/logo.png",
  "./images/icons/icon-192.png",
  "./images/icons/icon-512.png",
  "./images/products/teddy.svg",
  "./images/products/astronaut.svg",
  "./images/products/board-game.svg",
  "./images/products/sports-car.svg",
  "./images/products/robot.svg",
  "./images/products/blocks.svg",
  "./images/products/card-game.svg",
  "./images/products/racing-car.svg",
  "./images/products/teddy-photo.png",
  "./images/products/astronaut-photo.png",
  "./images/products/strategy-game-photo.png",
  "./images/products/sports-car-photo.png",
  "./images/products/robot-photo.png",
  "./images/products/blocks-photo.png",
  "./images/products/card-game-photo.png",
  "./images/products/racing-car-photo.png",
  "./images/products/honey-bunny.png",
  "./images/products/solar-puzzle.png",
  "./images/products/dinosaur-set.png",
  "./images/products/shape-sorter.png",
  "./images/products/city-bus.png",
  "./images/products/art-studio.png",
  "./images/products/doctor-playset.png",
  "./images/products/ocean-memory.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches
      .match(event.request)
      .then(
        (cached) =>
          cached ||
          fetch(event.request).catch(() => caches.match("./index.html")),
      ),
  );
});
