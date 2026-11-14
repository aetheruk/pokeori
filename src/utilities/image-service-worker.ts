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
const verifyAndStore = async (path, revision, response) => {
  if (!response.ok || !response.headers.get('Content-Type')?.startsWith('image/')) return
  const digest = await crypto.subtle.digest('SHA-256', await response.clone().arrayBuffer())
  const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
  if (hash !== revision) return
  const cache = await caches.open(CACHE)
  await cache.put(keyFor(path, revision), response.clone())
}

self.addEventListener('install', (event) => {
  // Install and activate without downloading the large image manifest. The
  // page asks the worker to prepare its image cache after the initial load.
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'PREPARE_IMAGE_CACHE') return
  // Cache preparation is manifest-only: never enumerate image caches here.
  event.waitUntil(getImages().then(() => undefined).catch(() => undefined))
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
  const imagesAtRequest = imagesByPath
  let bundledAssetPromise
  const getBundledAsset = () => {
    if (!bundledAssetPromise) bundledAssetPromise = (async () => {
      const revision = imagesAtRequest?.get(path)
      if (!revision) return null
      const cache = await caches.open(CACHE)
      const key = keyFor(path, revision)
      const cached = await cache.match(key)
      if (cached) return { response: cached, store: Promise.resolve() }
      const response = await fetch(key, { cache: 'reload' })
      const store = verifyAndStore(path, revision, response)
      return { response, store }
    })()
    return bundledAssetPromise
  }

  // Do not fetch the manifest or touch CacheStorage during the first screen.
  // The page prepares the manifest after load and browser idle; later requests
  // warm their cache entries in the background.
  const cacheWork = imagesAtRequest
    ? getBundledAsset().then(asset => asset?.store)
    : Promise.resolve()
  event.waitUntil(cacheWork.catch(() => { /* Online images must not depend on storage. */ }))

  event.respondWith((async () => {
    // Cached bundled art is instant. On a miss, return verified-revision
    // bytes as soon as they arrive, while digesting and storing a clone in the
    // event's background lifetime.
    if (imagesAtRequest) {
      try {
        const asset = await getBundledAsset()
        if (asset) return asset.response
      } catch { /* Storage restrictions must not block online play. */ }
    }
    return fetch(event.request)
  })())
})
`
}
