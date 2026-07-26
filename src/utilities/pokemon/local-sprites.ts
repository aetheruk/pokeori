import {
  pokemonSpriteAvailability,
  POKEMON_SPRITE_FALLBACK_FORM_ID,
} from '@/data/pokemon-sprite-availability'

export type LocalPokemonSpriteFamily = 'home' | 'gen-v'
export type LocalPokemonSpriteDirection = 'front' | 'back'
export type LocalPokemonSpritePalette = 'normal' | 'shiny'

export interface LocalPokemonSpriteOptions {
  formId: string | number
  family?: LocalPokemonSpriteFamily
  direction?: LocalPokemonSpriteDirection
  shiny?: boolean
  female?: boolean
}

export const UNOWN_FALLBACK_FORM_ID = POKEMON_SPRITE_FALLBACK_FORM_ID

function getVariant(
  shiny: boolean,
  female: boolean,
): 'normal' | 'shiny' | 'female' | 'shiny-female' {
  if (shiny && female) return 'shiny-female'
  if (shiny) return 'shiny'
  if (female) return 'female'
  return 'normal'
}

function getVariantBit(
  family: LocalPokemonSpriteFamily,
  direction: LocalPokemonSpriteDirection,
  shiny: boolean,
  female: boolean,
) {
  const variantOffset = shiny ? (female ? 3 : 1) : female ? 2 : 0
  if (family === 'home') return variantOffset
  return (direction === 'back' ? 8 : 4) + variantOffset
}

function hasSprite(
  formId: string,
  family: LocalPokemonSpriteFamily,
  direction: LocalPokemonSpriteDirection,
  shiny: boolean,
  female: boolean,
) {
  const mask = pokemonSpriteAvailability[formId] || 0
  return (
    (mask & (1 << getVariantBit(family, direction, shiny, female))) !== 0
  )
}

function buildSpriteUrl(
  formId: string,
  family: LocalPokemonSpriteFamily,
  direction: LocalPokemonSpriteDirection,
  shiny: boolean,
  female: boolean,
) {
  const variant = getVariant(shiny, female)
  return family === 'home'
    ? `/sprites/pokemon/home/${variant}/${formId}.avif`
    : `/sprites/pokemon/gen-v/${direction}/${variant}/${formId}.avif`
}

export function getExactBundledPokemonSpriteUrl({
  formId,
  family = 'home',
  direction = 'front',
  shiny = false,
  female = false,
}: LocalPokemonSpriteOptions): string | null {
  const normalizedFormId = String(formId)
  const resolvedFemale =
    female && hasSprite(normalizedFormId, family, direction, shiny, true)
  if (
    !hasSprite(normalizedFormId, family, direction, shiny, resolvedFemale)
  ) {
    return null
  }
  return buildSpriteUrl(
    normalizedFormId,
    family,
    direction,
    shiny,
    resolvedFemale,
  )
}

function getBundledUnownFallbackUrl(
  family: LocalPokemonSpriteFamily,
  direction: LocalPokemonSpriteDirection,
  shiny: boolean,
): string {
  const fallbacks: LocalPokemonSpriteOptions[] = [
    { formId: UNOWN_FALLBACK_FORM_ID, family, direction, shiny },
    { formId: UNOWN_FALLBACK_FORM_ID, family, direction },
    { formId: UNOWN_FALLBACK_FORM_ID, family, direction: 'front', shiny },
    { formId: UNOWN_FALLBACK_FORM_ID, family, direction: 'front' },
    { formId: UNOWN_FALLBACK_FORM_ID, family: 'home', shiny },
    { formId: UNOWN_FALLBACK_FORM_ID, family: 'home' },
  ]
  for (const fallback of fallbacks) {
    const source = getExactBundledPokemonSpriteUrl(fallback)
    if (source) return source
  }
  return `/sprites/pokemon/home/normal/${UNOWN_FALLBACK_FORM_ID}.avif`
}

export function getBundledPokemonSpriteUrl(
  options: LocalPokemonSpriteOptions,
): string {
  return (
    getExactBundledPokemonSpriteUrl(options) ||
    getBundledUnownFallbackUrl(
      options.family || 'home',
      options.direction || 'front',
      !!options.shiny,
    )
  )
}

export function getFieldObservationPokemonSpriteSources(
  formId: string | number,
  shiny = false,
  female = false,
): string[] {
  if (!shiny) {
    return [getBundledPokemonSpriteUrl({ formId, family: 'home', female })]
  }
  return [
    getExactBundledPokemonSpriteUrl({
      formId,
      family: 'home',
      shiny: true,
      female,
    }),
    getExactBundledPokemonSpriteUrl({
      formId,
      family: 'gen-v',
      direction: 'front',
      shiny: true,
      female,
    }),
    getBundledUnownFallbackUrl('home', 'front', true),
  ]
    .filter((source): source is string => Boolean(source))
    .filter((source, index, sources) => sources.indexOf(source) === index)
}
