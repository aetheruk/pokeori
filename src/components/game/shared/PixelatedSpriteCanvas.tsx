'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { getVisibleImageBounds } from '@/utilities/visible-image-bounds'

const PIXEL_SIZE = 4

interface PixelatedSpriteCanvasProps {
  src: string
  alt: string
  className?: string
  normalizeVisibleBounds?: boolean
}

/**
 * Draws through a small offscreen canvas before scaling back up with smoothing
 * disabled. This produces true block pixels in Safari/iOS without SVG filters.
 */
export function PixelatedSpriteCanvas({
  src,
  alt,
  className,
  normalizeVisibleBounds = false,
}: PixelatedSpriteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const image = new window.Image()
    image.decoding = 'async'
    let resizeObserver: ResizeObserver | null = null
    let visibleBounds: ReturnType<typeof getVisibleImageBounds> = null

    const draw = () => {
      const context = canvas.getContext('2d')
      if (!context || !image.complete || !image.naturalWidth) return

      const bounds = canvas.getBoundingClientRect()
      const devicePixelRatio = window.devicePixelRatio || 1
      const width = Math.max(1, Math.round(bounds.width * devicePixelRatio))
      const height = Math.max(1, Math.round(bounds.height * devicePixelRatio))

      if (normalizeVisibleBounds && !visibleBounds) {
        visibleBounds = getVisibleImageBounds(image)
      }
      const sourceLeft = visibleBounds?.left ?? 0
      const sourceTop = visibleBounds?.top ?? 0
      const sourceWidth = visibleBounds?.width ?? image.naturalWidth
      const sourceHeight = visibleBounds?.height ?? image.naturalHeight

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      const imageRatio = sourceWidth / sourceHeight
      const canvasRatio = width / height
      const drawWidth = Math.round(
        imageRatio > canvasRatio ? width : height * imageRatio,
      )
      const drawHeight = Math.round(
        imageRatio > canvasRatio ? width / imageRatio : height,
      )
      const drawX = Math.round((width - drawWidth) / 2)
      const drawY = Math.round((height - drawHeight) / 2)
      const sampleWidth = Math.max(
        1,
        Math.round(drawWidth / (PIXEL_SIZE * devicePixelRatio)),
      )
      const sampleHeight = Math.max(
        1,
        Math.round(drawHeight / (PIXEL_SIZE * devicePixelRatio)),
      )

      const sampleCanvas = document.createElement('canvas')
      sampleCanvas.width = sampleWidth
      sampleCanvas.height = sampleHeight
      const sampleContext = sampleCanvas.getContext('2d')
      if (!sampleContext) return

      sampleContext.imageSmoothingEnabled = false
      sampleContext.drawImage(
        image,
        sourceLeft,
        sourceTop,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sampleWidth,
        sampleHeight,
      )
      context.clearRect(0, 0, width, height)
      context.imageSmoothingEnabled = false
      context.drawImage(
        sampleCanvas,
        0,
        0,
        sampleWidth,
        sampleHeight,
        drawX,
        drawY,
        drawWidth,
        drawHeight,
      )
    }

    image.addEventListener('load', draw)
    image.src = src
    if (image.complete) draw()

    const ResizeObserverConstructor = window.ResizeObserver
    if (ResizeObserverConstructor) {
      resizeObserver = new ResizeObserverConstructor(draw)
      resizeObserver.observe(canvas)
    } else {
      window.addEventListener('resize', draw)
    }

    return () => {
      image.removeEventListener('load', draw)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', draw)
    }
  }, [normalizeVisibleBounds, src])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={cn('pokemon-rarity-sprite__image h-full w-full', className)}
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}
