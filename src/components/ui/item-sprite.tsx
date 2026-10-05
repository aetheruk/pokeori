'use client'

import { type CSSProperties, type SyntheticEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { getItemHueRotate, getItemSpriteUrl } from '@/data/items'
import { getVisibleBoundsImageStyle } from '@/utilities/visible-image-bounds'

interface ItemSpriteProps {
  itemId: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  style?: React.CSSProperties
  normalizeVisibleBounds?: boolean
  onLoad?: React.ReactEventHandler<HTMLImageElement>
}

export function ItemSprite({
  itemId,
  alt,
  width = 32,
  height = 32,
  className = '',
  priority = false,
  style,
  normalizeVisibleBounds = false,
  onLoad,
}: ItemSpriteProps) {
  const hueRotate = getItemHueRotate(itemId)
  const hueRotateFilter = hueRotate ? `hue-rotate(${hueRotate}deg)` : ''
  const mergedStyle: React.CSSProperties = {
    ...style,
    filter: [hueRotateFilter, style?.filter].filter(Boolean).join(' ') || undefined,
  }

  const [hasError, setHasError] = useState(false)
  const [visibleBoundsStyle, setVisibleBoundsStyle] =
    useState<CSSProperties>()

  useEffect(() => {
    setVisibleBoundsStyle(undefined)
  }, [itemId, normalizeVisibleBounds])

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (normalizeVisibleBounds) {
      const normalizedStyle = getVisibleBoundsImageStyle(event.currentTarget)
      if (normalizedStyle) setVisibleBoundsStyle(normalizedStyle)
    }
    onLoad?.(event)
  }

  if (hasError) {
    // Image failed to load - show a placeholder
    return (
      <div
        className={`flex items-center justify-center rounded border border-game-border bg-game-surface-raised ${className}`}
        style={{ width, height }}
      >
        <span className="text-xs text-game-muted">?</span>
      </div>
    )
  }

  const src = getItemSpriteUrl(itemId)

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`pixelated ${className}`}
      style={{ ...mergedStyle, ...visibleBoundsStyle }}
      priority={priority}
      onLoad={handleImageLoad}
      onError={() => setHasError(true)}
    />
  )
}
