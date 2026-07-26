import { APP_VERSION } from '@/utilities/app-version'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const serviceWorker = `
const SPRITE_CACHE_NAME = ${JSON.stringify(`pokeori-sprites-${APP_VERSION}`)}

const isImmutableSpriteRequest = (request) => {
  const url = new URL(request.url)
  return (
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/sprites/pokemon/') ||
      url.pathname.startsWith('/sprites/items/'))
  )
}

const cacheFirst = async (request) => {
  const cache = await caches.open(SPRITE_CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) await cache.put(request, response.clone())
  return response
}

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('pokeori-') && key !== SPRITE_CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
      clients.claim(),
    ]),
  )
})
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET' && isImmutableSpriteRequest(event.request)) {
    event.respondWith(cacheFirst(event.request))
  }
})
`

export function GET() {
  return new Response(serviceWorker, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
      'Content-Type': 'application/javascript; charset=utf-8',
      'Service-Worker-Allowed': '/',
    },
  })
}
