import Image from 'next/image'
import {
  type CSSProperties,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { getBundledPokemonSpriteUrl } from '@/utilities/pokemon/local-sprites'
import {
  getPokemonRarityEffect,
  type PokemonRarityId,
  resolvePokemonRarity,
} from '@/utilities/pokemon/rarity-effects'
import { PixelatedSpriteCanvas } from './PixelatedSpriteCanvas'
import { getVisibleBoundsImageStyle } from '@/utilities/visible-image-bounds'

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
  normalizeVisibleBounds?: boolean
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
  normalizeVisibleBounds = false,
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
  const imageStyle: CSSProperties | undefined =
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
  const [visibleBoundsStyle, setVisibleBoundsStyle] = useState<CSSProperties>()

  useEffect(() => {
    setVisibleBoundsStyle(undefined)
  }, [imageUrl, normalizeVisibleBounds])

  const handleImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      if (!normalizeVisibleBounds) return
      const style = getVisibleBoundsImageStyle(event.currentTarget)
      if (style) setVisibleBoundsStyle(style)
    },
    [normalizeVisibleBounds],
  )

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
      {resolvedRarity === 'pixelated' ? (
        <PixelatedSpriteCanvas
          src={imageUrl}
          alt={alt}
          className={imageClassName}
          normalizeVisibleBounds={normalizeVisibleBounds}
        />
      ) : (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes={sizes}
          onLoad={normalizeVisibleBounds ? handleImageLoad : undefined}
          style={{ ...imageStyle, ...visibleBoundsStyle }}
          className={cn(
            'pokemon-rarity-sprite__image object-contain',
            !isHomeSprite && 'pixelated',
            imageClassName,
          )}
        />
      )}
      <span className="pokemon-rarity-sprite__overlay" aria-hidden="true" />
    </div>
  )
}
