export const IMAGE_CACHE_NAME = 'pokeori-images-v1'

export type DownloadImage = { url: string; revision: string; bytes: number }

export function imageCacheKey(image: DownloadImage) {
  return `${image.url}?revision=${image.revision}`
}

export async function downloadGameImages(
  images: DownloadImage[],
  signal: AbortSignal,
  onProgress: (completed: number) => void,
) {
  const cache = await caches.open(IMAGE_CACHE_NAME)
  const present = new Set((await cache.keys()).map((key) => key.url))
  let index = 0
  let completed = 0
  let failure: unknown
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (index < images.length && !signal.aborted && !failure) {
        const image = images[index++]
        try {
          const key = imageCacheKey(image)
          if (!present.has(new URL(key, location.origin).href)) {
            const response = await fetch(key, { signal, cache: 'reload' })
            if (
              !response.ok ||
              !response.headers.get('Content-Type')?.startsWith('image/')
            ) {
              throw new Error(
                'An image could not be downloaded. Please try again.',
              )
            }
            // A deployment can replace artwork during an active download.
            const digest = await crypto.subtle.digest(
              'SHA-256',
              await response.clone().arrayBuffer(),
            )
            const revision = Array.from(new Uint8Array(digest), (byte) =>
              byte.toString(16).padStart(2, '0'),
            ).join('')
            if (revision !== image.revision)
              throw new Error(
                'Artwork has been updated. Reload the page and try again.',
              )
            signal.throwIfAborted()
            await cache.put(key, response)
          }
          onProgress(++completed)
        } catch (error) {
          failure = error
        }
      }
    }),
  )
  signal.throwIfAborted()
  if (failure) throw failure
}
