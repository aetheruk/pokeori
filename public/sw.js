const CACHE_NAME = 'pokeori-v1'
const SPRITE_CACHE_NAME = 'pokeori-sprites-v3'

const isSpriteRequest = (request) => {
  const url = new URL(request.url)
  return (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/sprites/pokemon/') ||
      url.pathname.startsWith('/sprites/items/') ||
      url.pathname === '/api/pokemon-sprite' ||
      url.pathname.startsWith('/api/pokemon-sprite/'))
  )
}

const cacheFirst = async (request) => {
  const cache = await caches.open(SPRITE_CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response.ok) {
    cache.put(request, response.clone())
  }

  return response
}

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== SPRITE_CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
      clients.claim(),
    ]),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET' && isSpriteRequest(event.request)) {
    event.respondWith(cacheFirst(event.request))
    return
  }

  event.respondWith(fetch(event.request))
})
