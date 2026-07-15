import spriteManifest from '@/data/pokemon-sprite-manifest.json'

export type LocalPokemonSpriteFamily = 'home' | 'gen-v'
export type LocalPokemonSpriteDirection = 'front' | 'back'
export type LocalPokemonSpritePalette = 'normal' | 'shiny'

interface SpriteDirectionManifest {
  normal?: string
  shiny?: string
  female?: string
  shinyFemale?: string
}

interface SpriteManifestEntry {
  home?: SpriteDirectionManifest
  genV?: {
    front?: SpriteDirectionManifest
    back?: SpriteDirectionManifest
  }
}

interface PokemonSpriteManifest {
  fallbackFormId?: string | null
  sprites?: Record<string, SpriteManifestEntry | undefined>
}

export interface LocalPokemonSpriteOptions {
  formId: string | number
  family?: LocalPokemonSpriteFamily
  direction?: LocalPokemonSpriteDirection
  shiny?: boolean
  female?: boolean
}

const manifest = spriteManifest as PokemonSpriteManifest
export const UNOWN_FALLBACK_FORM_ID = manifest.fallbackFormId || '201'

function normalizeFormId(formId: string | number): string {
  return String(formId)
}

function getDirectionManifest(
  formId: string,
  family: LocalPokemonSpriteFamily,
  direction: LocalPokemonSpriteDirection,
): SpriteDirectionManifest | undefined {
  const entry = manifest.sprites?.[formId]
  if (family === 'home') return entry?.home
  return entry?.genV?.[direction]
}

function pickFromDirection(
  directionManifest: SpriteDirectionManifest | undefined,
  palette: LocalPokemonSpritePalette,
  female: boolean,
): string | null {
  if (!directionManifest) return null
  if (female && palette === 'shiny' && directionManifest.shinyFemale) {
    return directionManifest.shinyFemale
  }
  if (female && palette === 'normal' && directionManifest.female) {
    return directionManifest.female
  }
  return palette === 'shiny'
    ? directionManifest.shiny || null
    : directionManifest.normal || null
}

export function getExactBundledPokemonSpriteUrl({
  formId,
  family = 'home',
  direction = 'front',
  shiny = false,
  female = false,
}: LocalPokemonSpriteOptions): string | null {
  const normalizedFormId = normalizeFormId(formId)
  return pickFromDirection(
    getDirectionManifest(normalizedFormId, family, direction),
    shiny ? 'shiny' : 'normal',
    female,
  )
}

function getBundledUnownFallbackUrl(
  family: LocalPokemonSpriteFamily,
  direction: LocalPokemonSpriteDirection,
  shiny: boolean,
): string {
  const fallbackDirection = getDirectionManifest(UNOWN_FALLBACK_FORM_ID, family, direction)
  const fallbackFront = getDirectionManifest(UNOWN_FALLBACK_FORM_ID, family, 'front')
  const fallbackHome = getDirectionManifest(UNOWN_FALLBACK_FORM_ID, 'home', 'front')

  return (
    pickFromDirection(fallbackDirection, shiny ? 'shiny' : 'normal', false) ||
    pickFromDirection(fallbackDirection, 'normal', false) ||
    pickFromDirection(fallbackFront, shiny ? 'shiny' : 'normal', false) ||
    pickFromDirection(fallbackFront, 'normal', false) ||
    pickFromDirection(fallbackHome, shiny ? 'shiny' : 'normal', false) ||
    pickFromDirection(fallbackHome, 'normal', false) ||
    `/sprites/pokemon/home/normal/${UNOWN_FALLBACK_FORM_ID}.avif`
  )
}

export function getBundledPokemonSpriteUrl(options: LocalPokemonSpriteOptions): string {
  const exact = getExactBundledPokemonSpriteUrl(options)
  if (exact) return exact

  return getBundledUnownFallbackUrl(
    options.family || 'home',
    options.direction || 'front',
    !!options.shiny,
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

  const exactSources = [
    getExactBundledPokemonSpriteUrl({ formId, family: 'home', shiny: true, female }),
    getExactBundledPokemonSpriteUrl({
      formId,
      family: 'gen-v',
      direction: 'front',
      shiny: true,
      female,
    }),
  ].filter((source): source is string => Boolean(source))

  return [
    ...exactSources,
    getBundledUnownFallbackUrl('home', 'front', true),
  ].filter((source, index, sources) => sources.indexOf(source) === index)
}
