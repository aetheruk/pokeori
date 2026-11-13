import { IMAGE_CACHE_NAME } from './image-cache'
import { notificationServiceWorker } from './notifications/service-worker'

export function createImageServiceWorker(version: string) {
  return `${notificationServiceWorker}
// Client release: ${version}
const CACHE = ${JSON.stringify(IMAGE_CACHE_NAME)}
const META_CACHE = 'pokeori-image-manifests-v1'
const manifestKey = '/api/game-images?release=' + ${JSON.stringify(version)}
let manifest
let imagesByPath
const getImages = () => {
  if (!manifest) manifest = (async () => {
    const cache = await caches.open(META_CACHE)
    let response = await cache.match(manifestKey)
    if (!response) {
      response = await fetch('/api/game-images', { cache: 'no-store' })
      if (!response.ok) throw new Error('Image manifest unavailable')
      await cache.put(manifestKey, response.clone())
    }
    const images = new Map((await response.json()).map(image => [image.url, image.revision]))
    imagesByPath = images
    return images
  })().catch(error => { manifest = undefined; throw error })
  return manifest
}
const keyFor = (path, revision) => path + '?revision=' + revision

self.addEventListener('install', (event) => {
  // Install and activate without downloading the large image manifest. The
  // page asks the worker to prepare its image cache after the initial load.
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

const prepareImageCache = async () => {
  const images = await getImages()
  const cache = await caches.open(CACHE)
  // Preserve previously downloaded sprites when their bytes still match.
  for (const name of await caches.keys()) {
    if (!name.startsWith('pokeori-sprites-')) continue
    const legacy = await caches.open(name)
    for (const request of await legacy.keys()) {
      const path = new URL(request.url).pathname
      const revision = images.get(path)
      if (!revision || await cache.match(keyFor(path, revision))) continue
      const response = await legacy.match(request)
      if (!response) continue
      const digest = await crypto.subtle.digest('SHA-256', await response.clone().arrayBuffer())
      const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
      if (hash === revision) await cache.put(keyFor(path, revision), response)
    }
    await caches.delete(name)
  }
  for (const request of await cache.keys()) {
    const url = new URL(request.url)
    if (images.get(url.pathname) !== url.searchParams.get('revision')) await cache.delete(request)
  }
  const metadata = await caches.open(META_CACHE)
  for (const request of await metadata.keys()) {
    if (new URL(request.url).pathname + new URL(request.url).search !== manifestKey) await metadata.delete(request)
  }
}

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'PREPARE_IMAGE_CACHE') return
  event.waitUntil(prepareImageCache().catch(() => {
    /* Restricted storage must not block page interaction. */
  }))
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return
  // Explicit downloads are verified and stored by the settings client.
  if (url.searchParams.has('revision')) return
  let path = url.pathname
  const optimized = path === '/_next/image'
  if (optimized) {
    const source = new URL(url.searchParams.get('url') || '/', self.location.origin)
    if (source.origin !== self.location.origin) return
    path = source.pathname
  }
  // Only public artwork and the Next image endpoint are candidates.
  if (!optimized && !/\\.(avif|webp|png|jpe?g|gif|svg|ico)$/i.test(path)) return
  event.respondWith((async () => {
    // Before the page schedules cache preparation, let uncached artwork use
    // the normal network path without waiting for a manifest fetch or digest.
    const images = imagesByPath
    if (images) {
      try {
        const revision = images.get(path)
        if (revision) {
          const cache = await caches.open(CACHE)
          const cached = await cache.match(keyFor(path, revision))
          if (cached) return cached
        }
      } catch { /* Storage restrictions must not block online play. */ }
    }
    return fetch(event.request)
  })())
})
`
}
