'use client'

import { getCurrency } from '@/data/currencies'
import { ItemSprite } from './item-sprite'

interface CurrencySpriteProps {
  currencyId: string
  alt?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  normalizeVisibleBounds?: boolean
}

export function CurrencySprite({
  currencyId,
  alt,
  width = 32,
  height = 32,
  className = '',
  priority = false,
  normalizeVisibleBounds = false,
}: CurrencySpriteProps) {
  const currency = getCurrency(currencyId)
  if (!currency) return null

  return (
    <ItemSprite
      itemId={currency.iconId}
      alt={alt || currency.name}
      width={width}
      height={height}
      className={className}
      priority={priority}
      normalizeVisibleBounds={normalizeVisibleBounds}
      style={
        currency.iconHueRotate
          ? { filter: `hue-rotate(${currency.iconHueRotate}deg)` }
          : undefined
      }
    />
  )
}
