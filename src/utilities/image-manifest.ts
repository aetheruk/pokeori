import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export type GameImage = { url: string; revision: string; bytes: number }

export async function scanGameImages(root: string): Promise<GameImage[]> {
  const files = (await readdir(root, { recursive: true, withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isFile() &&
        /\.(avif|webp|png|jpe?g|gif|svg|ico)$/i.test(entry.name),
    )
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort()
  const images: GameImage[] = []
  for (let offset = 0; offset < files.length; offset += 32) {
    images.push(
      ...(await Promise.all(
        files.slice(offset, offset + 32).map(async (file) => {
          const contents = await readFile(file)
          return {
            url: `/${path.relative(root, file).split(path.sep).map(encodeURIComponent).join('/')}`,
            revision: createHash('sha256').update(contents).digest('hex'),
            bytes: contents.length,
          }
        }),
      )),
    )
  }
  return images
}

let manifest: Promise<GameImage[]> | undefined
export function getGameImages() {
  // Public assets are immutable for the lifetime of a production container.
  if (process.env.NODE_ENV !== 'production')
    return scanGameImages(path.join(process.cwd(), 'public'))
  manifest ??= scanGameImages(path.join(process.cwd(), 'public')).catch(
    (error) => {
      manifest = undefined
      throw error
    },
  )
  return manifest
}
