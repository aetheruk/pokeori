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
import { getVisibleBoundsImageStyle } from '@/utilities/visible-image-bounds'

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
      const style = getVisibleBoundsImageStyle(image)
      if (style) setVisibleImageStyle(style)
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
          normalizeVisibleBounds={normalizeVisibleBounds}
          className="w-full h-full object-contain pixelated"
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
