import { IMAGE_CACHE_NAME } from './image-cache'
import { notificationServiceWorker } from './notifications/service-worker'

export function createImageServiceWorker(version: string) {
  return `${notificationServiceWorker}
// Client release: ${version}
const CACHE = ${JSON.stringify(IMAGE_CACHE_NAME)}
const META_CACHE = 'pokeori-image-manifests-v1'
const manifestKey = '/api/game-images?release=' + ${JSON.stringify(version)}
let manifest
const getImages = () => {
  if (!manifest) manifest = (async () => {
    const cache = await caches.open(META_CACHE)
    let response = await cache.match(manifestKey)
    if (!response) {
      response = await fetch('/api/game-images', { cache: 'no-store' })
      if (!response.ok) throw new Error('Image manifest unavailable')
      await cache.put(manifestKey, response.clone())
    }
    return new Map((await response.json()).map(image => [image.url, image.revision]))
  })().catch(error => { manifest = undefined; throw error })
  return manifest
}
const keyFor = (path, revision) => path + '?revision=' + revision

self.addEventListener('install', (event) => {
  // Artwork availability must not prevent notification registration.
  event.waitUntil(getImages().catch(() => undefined).then(() => self.skipWaiting()))
})
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
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
  })().catch(() => { /* Restricted storage must not prevent activation. */ }).then(() => clients.claim()))
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
    let images
    try { images = await getImages() } catch { return fetch(event.request) }
    const revision = images.get(path)
    if (!revision) return fetch(event.request)
    const key = keyFor(path, revision)
    let cache
    try {
      cache = await caches.open(CACHE)
      const cached = await cache.match(key)
      if (cached) return cached
    } catch { /* Storage restrictions must not block online play. */ }
    // Share original bytes across CSS, sprites, and Next image variants.
    // The fingerprint bypasses stale HTTP/CDN entries after artwork changes.
    const response = await fetch(key, { cache: 'reload' })
    if (response.ok && response.headers.get('Content-Type')?.startsWith('image/')) {
      try {
        const digest = await crypto.subtle.digest('SHA-256', await response.clone().arrayBuffer())
        const hash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
        if (hash === revision && cache) await cache.put(key, response.clone())
      } catch { /* A full cache must not block online play. */ }
    }
    return response
  })())
})
`
}
