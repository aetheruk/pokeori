'use client'

import Image from 'next/image'
import { type CSSProperties, useId } from 'react'
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
  const pixelateFilterId = `pokemon-rarity-egg-pixelate-${useId().replaceAll(':', '')}`
  const resolvedRarity = resolvePokemonRarity({ rarity })
  const imageStyle: CSSProperties | undefined =
    resolvedRarity === 'pixelated'
      ? { filter: `url(#${pixelateFilterId})` }
      : undefined

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
      {resolvedRarity === 'pixelated' && (
        <PixelateSvgFilter id={pixelateFilterId} />
      )}
      <Image
        src={EGG_SPRITE_URL}
        alt={alt}
        fill
        sizes={sizes}
        style={imageStyle}
        className={cn(
          'pokemon-rarity-sprite__image object-contain',
          imageClassName,
        )}
      />
      <span className="pokemon-rarity-sprite__overlay" aria-hidden="true" />
    </div>
  )
}

function PixelateSvgFilter({ id }: { id: string }) {
  return (
    <svg
      className="absolute h-0 w-0 overflow-hidden"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={id} x="0" y="0" width="1" height="1">
          <feConvolveMatrix
            kernelMatrix="1 1 1 1 1 1 1 1 1"
            result="pixel-average"
          />
          <feFlood x="1" y="1" width="1" height="1" result="pixel-cell" />
          <feComposite
            in2="pixel-cell"
            operator="arithmetic"
            k2="1"
            width="8"
            height="8"
          />
          <feTile result="pixel-grid" />
          <feComposite
            in="pixel-average"
            in2="pixel-grid"
            operator="in"
            result="pixel-samples"
          />
          <feMorphology in="pixel-samples" operator="dilate" radius="4" />
        </filter>
      </defs>
    </svg>
  )
}
