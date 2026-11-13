import path from 'node:path'
import { getPublicAssetDirectory } from './public-assets'

export type GameImage = { url: string; revision: string; bytes: number }

export async function scanGameImages(root: string): Promise<GameImage[]> {
  const files: string[] = []
  for await (const file of new Bun.Glob('**/*').scan({
    cwd: root,
    onlyFiles: true,
  })) {
    if (/\.(avif|webp|png|jpe?g|gif|svg|ico)$/i.test(file)) files.push(file)
  }
  files.sort()
  const images: GameImage[] = []
  for (let offset = 0; offset < files.length; offset += 32) {
    images.push(
      ...(await Promise.all(
        files.slice(offset, offset + 32).map(async (filePath) => {
          const contents = new Uint8Array(
            await Bun.file(path.join(root, filePath)).arrayBuffer(),
          )
          return {
            url: `/${filePath.split('/').map(encodeURIComponent).join('/')}`,
            revision: new Bun.CryptoHasher('sha256')
              .update(contents)
              .digest('hex'),
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
    return scanGameImages(getPublicAssetDirectory())
  const publicPath = getPublicAssetDirectory()
  const manifestPath = path.join(publicPath, 'game-image-manifest.json')
  manifest ??= Bun.file(manifestPath)
    .exists()
    .then((exists) =>
      exists
        ? Bun.file(manifestPath).json() as Promise<GameImage[]>
        : scanGameImages(publicPath),
    )
    .catch((error) => {
      manifest = undefined
      throw error
    })
  return manifest
}
