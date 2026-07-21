import Image from 'next/image'
import type { CSSProperties } from 'react'
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
  const resolvedRarity = resolvePokemonRarity({
    rarity,
    shiny,
    isShadow,
    isRadiant,
  })
  const effect = getPokemonRarityEffect(resolvedRarity)
  const isHomeSprite = view === 'home'
  const monochromeImageStyle: CSSProperties | undefined =
    resolvedRarity === 'black'
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
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes}
        style={monochromeImageStyle}
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
