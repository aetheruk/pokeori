'use client'

import Image from 'next/image'
import { type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import {
  type PokemonRarityId,
  resolvePokemonRarity,
} from '@/utilities/pokemon/rarity-effects'

const EGG_SPRITE_URL = '/sprites/items/egg.png'

interface PokemonRarityEggSpriteProps {
  rarity?: PokemonRarityId | string | null
  alt: string
  className?: string
  imageClassName?: string
  sizes?: string
}

/**
 * Uses the same rarity classes as PokemonRaritySprite, so every authored rarity
 * treatment automatically applies to its corresponding egg.
 */
export function PokemonRarityEggSprite({
  rarity,
  alt,
  className,
  imageClassName,
  sizes = '128px',
}: PokemonRarityEggSpriteProps) {
  const resolvedRarity = resolvePokemonRarity({ rarity })

  return (
    <div
      className={cn(
        'pokemon-rarity-egg pokemon-rarity-sprite',
        `pokemon-rarity-sprite--${resolvedRarity}`,
        className,
      )}
      data-rarity={resolvedRarity}
      style={
        {
          '--pokemon-rarity-sprite-mask': `url("${EGG_SPRITE_URL}")`,
        } as CSSProperties
      }
    >
      <span className="pokemon-rarity-sprite__aura" aria-hidden="true" />
      <Image
        src={EGG_SPRITE_URL}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          'pokemon-rarity-sprite__image object-contain',
          imageClassName,
        )}
      />
      <span className="pokemon-rarity-sprite__overlay" aria-hidden="true" />
    </div>
  )
}
