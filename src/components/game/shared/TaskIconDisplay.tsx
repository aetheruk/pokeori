'use client'

import {
  Banknote,
  CalendarDays,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  Coins,
  CreditCard,
  Droplets,
  Flame,
  HelpCircle,
  Leaf,
  MapPin,
  Swords,
  ShoppingBag,
  Search,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties, SyntheticEvent } from 'react'
import { ItemSprite } from '@/components/ui/item-sprite'
import { TaskIcon } from '@/data/tasks/types'
import { getTrainerSpriteUrl } from '@/data/trainers'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

const LUCIDE_ICONS: Record<string, any> = {
  MapPin,
  Swords,
  ShoppingBag,
  Search,
  Star,
  CalendarDays,
  ChevronsUp,
  ChevronsDown,
  ChevronsRight,
  HelpCircle,
  Coins,
  Banknote,
  CreditCard,
  Flame,
  Droplets,
  Leaf,
}

interface TaskIconDisplayProps {
  icon: TaskIcon
  className?: string
  priority?: boolean
  normalizeVisibleBounds?: boolean
  outlineVisiblePixels?: boolean
}

export function TaskIconDisplay({
  icon,
  className,
  priority = false,
  normalizeVisibleBounds = false,
  outlineVisiblePixels = false,
}: TaskIconDisplayProps) {
  const [visibleImageStyle, setVisibleImageStyle] = useState<CSSProperties>()
  const visiblePixelOutlineStyle: CSSProperties | undefined = outlineVisiblePixels
    ? { filter: 'drop-shadow(0 0 1px rgb(41 53 50 / 0.9))' }
    : undefined

  useEffect(() => {
    setVisibleImageStyle(undefined)
  }, [icon.type, icon.id])

  const handleImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      if (!normalizeVisibleBounds) return

      const image = event.currentTarget
      const naturalWidth = image.naturalWidth
      const naturalHeight = image.naturalHeight
      const viewWidth = image.clientWidth
      const viewHeight = image.clientHeight
      if (!naturalWidth || !naturalHeight || !viewWidth || !viewHeight) return

      const canvas = document.createElement('canvas')
      canvas.width = naturalWidth
      canvas.height = naturalHeight
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) return

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

        if (right < left || bottom < top) return

        const imageScale = Math.min(viewWidth / naturalWidth, viewHeight / naturalHeight)
        const renderedWidth = naturalWidth * imageScale
        const renderedHeight = naturalHeight * imageScale
        const contentWidth = (right - left + 1) * imageScale
        const contentHeight = (bottom - top + 1) * imageScale
        const targetSize = Math.min(viewWidth, viewHeight) * 0.92
        const scale = targetSize / Math.max(contentWidth, contentHeight)
        const contentCenterX =
          (viewWidth - renderedWidth) / 2 + ((left + right + 1) / 2) * imageScale
        const contentCenterY =
          (viewHeight - renderedHeight) / 2 + ((top + bottom + 1) / 2) * imageScale

        setVisibleImageStyle({
          transform: `translate(${(viewWidth / 2 - contentCenterX) * scale}px, ${(viewHeight / 2 - contentCenterY) * scale}px) scale(${scale})`,
          transformOrigin: 'center',
        })
      } catch {
        // Keep the source image at its default size if the browser cannot read its pixels.
      }
    },
    [normalizeVisibleBounds],
  )

  const imageStyle = normalizeVisibleBounds ? visibleImageStyle : undefined

  if (icon.type === 'item') {
    return (
      <div
        className={cn('relative flex-shrink-0', className || 'w-12 h-12')}
        style={visiblePixelOutlineStyle}
      >
        <ItemSprite
          itemId={icon.id}
          alt="Icon"
          width={48}
          height={48}
          priority={priority}
          onLoad={handleImageLoad}
          className="w-full h-full object-contain pixelated"
          style={imageStyle}
        />
      </div>
    )
  } else if (icon.type === 'pokemon') {
    return (
      <div
        className={cn('relative flex-shrink-0', className || 'w-12 h-12')}
        style={visiblePixelOutlineStyle}
      >
        <Image
          src={getPokemonImageUrl(icon.id, 'sprite')}
          alt="Icon"
          width={48}
          height={48}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleImageLoad}
          style={imageStyle}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'trainer') {
    return (
      <div
        className={cn('relative flex-shrink-0', className || 'w-12 h-12')}
        style={visiblePixelOutlineStyle}
      >
        <Image
          src={getTrainerSpriteUrl(icon.id)}
          alt="Icon"
          width={48}
          height={48}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleImageLoad}
          style={imageStyle}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'local') {
    const src = icon.id.startsWith('/') ? icon.id : `/${icon.id}`
    return (
      <div
        className={cn('relative flex-shrink-0', className || 'w-12 h-12')}
        style={visiblePixelOutlineStyle}
      >
        <Image
          src={src}
          alt="Icon"
          width={48}
          height={48}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleImageLoad}
          style={imageStyle}
          className="w-full h-full object-contain pixelated"
        />
      </div>
    )
  } else if (icon.type === 'lucide') {
    const LucideIcon = LUCIDE_ICONS[icon.id] || HelpCircle
    return (
      <div
        className={cn(
          'relative flex-shrink-0 flex items-center justify-center text-game-moss-strong',
          className || 'w-12 h-12',
        )}
        style={visiblePixelOutlineStyle}
      >
        <LucideIcon className={normalizeVisibleBounds ? 'h-full w-full' : 'w-[80%] h-[80%]'} />
      </div>
    )
  }

  return null
}
