import Image from 'next/image'
import { useId, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import {
  getPokemonRarityEffect,
  resolvePokemonRarity,
  type PokemonRarityId,
} from '@/utilities/pokemon/rarity-effects'
import { getBundledPokemonSpriteUrl } from '@/utilities/pokemon/local-sprites'

export type PokemonRaritySpriteView = 'front' | 'back' | 'home'

interface PokemonRaritySpriteProps {
  formId: string | number
  view: PokemonRaritySpriteView
  rarity?: PokemonRarityId | string | null
  shiny?: boolean | null
  isShadow?: boolean | null
  isRadiant?: boolean | null
  female?: boolean
  alt: string
  className?: string
  imageClassName?: string
  sizes?: string
}

export function PokemonRaritySprite({
  formId,
  view,
  rarity,
  shiny,
  isShadow,
  isRadiant,
  female = false,
  alt,
  className,
  imageClassName,
  sizes = '128px',
}: PokemonRaritySpriteProps) {
  const pixelateFilterId = `pokemon-rarity-pixelate-${useId().replaceAll(':', '')}`
  const resolvedRarity = resolvePokemonRarity({
    rarity,
    shiny,
    isShadow,
    isRadiant,
  })
  const effect = getPokemonRarityEffect(resolvedRarity)
  const isHomeSprite = view === 'home'
  const imageStyle: CSSProperties | undefined =
    resolvedRarity === 'pixelated'
      ? { filter: `url(#${pixelateFilterId})` }
      : resolvedRarity === 'black'
      ? { filter: 'grayscale(1) brightness(0.48) contrast(1.72)' }
      : resolvedRarity === 'white'
        ? { filter: 'grayscale(1) brightness(1.38) contrast(1.68)' }
        : undefined
  const imageUrl = getBundledPokemonSpriteUrl({
    formId,
    family: isHomeSprite ? 'home' : 'gen-v',
    direction: view === 'back' ? 'back' : 'front',
    shiny: effect.sourcePalette === 'shiny',
    female,
  })

  return (
    <div
      className={cn(
        'pokemon-rarity-sprite',
        `pokemon-rarity-sprite--${resolvedRarity}`,
        className,
      )}
      data-rarity={resolvedRarity}
      style={
        {
          position: 'relative',
          '--pokemon-rarity-sprite-mask': `url("${imageUrl}")`,
        } as CSSProperties
      }
    >
      <span className="pokemon-rarity-sprite__aura" aria-hidden="true" />
      {resolvedRarity === 'pixelated' && (
        <PixelateSvgFilter id={pixelateFilterId} />
      )}
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes}
        style={imageStyle}
        className={cn(
          'pokemon-rarity-sprite__image object-contain',
          !isHomeSprite && 'pixelated',
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
          <feMorphology
            in="pixel-samples"
            operator="dilate"
            radius="4"
          />
        </filter>
      </defs>
    </svg>
  )
}
