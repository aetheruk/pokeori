export class CollisionMask {
  width: number
  height: number
  data: Uint8ClampedArray

  constructor(img: HTMLImageElement) {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get context')
    ctx.drawImage(img, 0, 0)
    // We store the full pixel data
    this.width = img.width
    this.height = img.height
    this.data = ctx.getImageData(0, 0, img.width, img.height).data
  }

  // Check opacity at specific pixel in the sheet (x, y are absolute pixels in the image)
  isOpaque(x: number, y: number): boolean {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return false
    const index = (Math.floor(y) * this.width + Math.floor(x)) * 4 + 3
    return this.data[index] > 10 // Alpha threshold
  }
}

const maskCache: Record<string, CollisionMask> = {}

export async function getCollisionMask(url: string): Promise<CollisionMask> {
  if (maskCache[url]) return maskCache[url]

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      try {
        const mask = new CollisionMask(img)
        maskCache[url] = mask
        resolve(mask)
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = reject
  })
}
