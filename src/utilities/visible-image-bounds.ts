import type { CSSProperties } from 'react'

export interface VisibleImageBounds {
  left: number
  top: number
  width: number
  height: number
}

export function getVisibleImageBounds(
  image: HTMLImageElement,
): VisibleImageBounds | null {
  const naturalWidth = image.naturalWidth
  const naturalHeight = image.naturalHeight
  if (!naturalWidth || !naturalHeight) return null

  const canvas = document.createElement('canvas')
  canvas.width = naturalWidth
  canvas.height = naturalHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  try {
    context.drawImage(image, 0, 0)
    const pixels = context.getImageData(0, 0, naturalWidth, naturalHeight).data
    let left = naturalWidth
    let top = naturalHeight
    let right = -1
    let bottom = -1

    for (let y = 0; y < naturalHeight; y += 1) {
      for (let x = 0; x < naturalWidth; x += 1) {
        if (pixels[(y * naturalWidth + x) * 4 + 3]! <= 16) continue
        left = Math.min(left, x)
        top = Math.min(top, y)
        right = Math.max(right, x)
        bottom = Math.max(bottom, y)
      }
    }

    if (right < left || bottom < top) return null
    return {
      left,
      top,
      width: right - left + 1,
      height: bottom - top + 1,
    }
  } catch {
    return null
  }
}

export function getVisibleBoundsImageStyle(
  image: HTMLImageElement,
): CSSProperties | undefined {
  const viewWidth = image.clientWidth
  const viewHeight = image.clientHeight
  const bounds = getVisibleImageBounds(image)
  if (!bounds || !viewWidth || !viewHeight) return undefined

  const imageScale = Math.min(
    viewWidth / image.naturalWidth,
    viewHeight / image.naturalHeight,
  )
  const renderedWidth = image.naturalWidth * imageScale
  const renderedHeight = image.naturalHeight * imageScale
  const contentWidth = bounds.width * imageScale
  const contentHeight = bounds.height * imageScale
  const targetSize = Math.min(viewWidth, viewHeight) * 0.92
  const scale = targetSize / Math.max(contentWidth, contentHeight)
  const contentCenterX =
    (viewWidth - renderedWidth) / 2 +
    (bounds.left + bounds.width / 2) * imageScale
  const contentCenterY =
    (viewHeight - renderedHeight) / 2 +
    (bounds.top + bounds.height / 2) * imageScale

  return {
    transform: `translate(${(viewWidth / 2 - contentCenterX) * scale}px, ${(viewHeight / 2 - contentCenterY) * scale}px) scale(${scale})`,
    transformOrigin: 'center',
  }
}
