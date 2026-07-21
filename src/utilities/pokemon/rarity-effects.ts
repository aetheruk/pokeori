export type PokemonRarityGroup = 'reference' | 'cosmetic'
export type PokemonRaritySourcePalette = 'normal' | 'shiny'

export const POKEMON_RARITY_EFFECTS = [
  {
    id: 'normal',
    label: 'Normal',
    description: 'Unmodified local sprite reference.',
    group: 'reference',
    sourcePalette: 'normal',
  },
  {
    id: 'shiny',
    label: 'Shiny',
    description: 'Existing alternate sprite palette reference.',
    group: 'reference',
    sourcePalette: 'shiny',
  },
  {
    id: 'shadow',
    label: 'Shadow',
    description: 'Existing violet battle-aura reference.',
    group: 'reference',
    sourcePalette: 'normal',
  },
  {
    id: 'radiant',
    label: 'Radiant',
    description: 'Existing bright blue battle-aura reference.',
    group: 'reference',
    sourcePalette: 'normal',
  },
  {
    id: 'silver',
    label: 'Silver',
    description: 'Cool metallic finish with a soft steel gleam.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'gold',
    label: 'Gold',
    description: 'Warm gilt colouring with a restrained polished sheen.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    description: 'Deep green gemstone tint with faceted highlights.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'ruby',
    label: 'Ruby',
    description: 'Rich red gem tone with a warm inner glow.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'sapphire',
    label: 'Sapphire',
    description: 'Blue crystal treatment with cold reflective glints.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'crystal',
    label: 'Crystal',
    description: 'Icy white-blue crystal with bright frosted facets.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'retro',
    label: 'Retro',
    description: 'Limited-palette pixel treatment with CRT scanlines.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'galactic',
    label: 'Galactic',
    description: 'Deep navy starfield with a sparse cosmic halo.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'levin',
    label: 'Levin',
    description: 'Pale-blue lightning with sharp electric flashes.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'inferno',
    label: 'Inferno',
    description: 'Deep furnace fire with a fierce molten glow.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'prism',
    label: 'Prism',
    description: 'Spectral colour separation with refracted highlights.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'rainbow',
    label: 'Rainbow',
    description: 'A flowing spectrum wash with bright prismatic flashes.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'celestial',
    label: 'Celestial',
    description: 'Angelic white-gold light with soft radiant sunrays.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'black',
    label: 'Black',
    description: 'Deep, high-contrast monochrome treatment.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'white',
    label: 'White',
    description: 'Bright, high-contrast monochrome treatment.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'void',
    label: 'Void',
    description: 'Monochrome silhouette over a spinning deep-purple void.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'glitch',
    label: 'Glitch',
    description: 'The original palette interrupted by unstable RGB scan fragments.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'ancient',
    label: 'Ancient',
    description: 'Weathered fossil stone with worn mineral veins and fine cracks.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'toxic',
    label: 'Toxic',
    description: 'Corrosive lime colouring with unstable violet poison bubbles.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'pixelated',
    label: 'Pixelated',
    description: 'Chunky reduced-detail colour blocks with a crisp pixel grid.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
] as const satisfies readonly {
  id: string
  label: string
  description: string
  group: PokemonRarityGroup
  sourcePalette: PokemonRaritySourcePalette
}[]

export type PokemonRarityId = (typeof POKEMON_RARITY_EFFECTS)[number]['id']
export type PokemonRarityEffect = (typeof POKEMON_RARITY_EFFECTS)[number]

export const POKEMON_RARITY_IDS = POKEMON_RARITY_EFFECTS.map(
  (effect) => effect.id,
) as PokemonRarityId[]

export const POKEMON_RARITY_OPTIONS = POKEMON_RARITY_EFFECTS.map((effect) => ({
  label: effect.label,
  value: effect.id,
}))

export interface PokemonRaritySource {
  rarity?: string | null
  shiny?: boolean | null
  isShadow?: boolean | null
  isRadiant?: boolean | null
}

export function isPokemonRarityId(value: unknown): value is PokemonRarityId {
  return typeof value === 'string' && POKEMON_RARITY_IDS.includes(value as PokemonRarityId)
}

export function resolvePokemonRarity(source: PokemonRaritySource): PokemonRarityId {
  if (isPokemonRarityId(source.rarity)) return source.rarity
  if (source.isShadow) return 'shadow'
  if (source.isRadiant) return 'radiant'
  if (source.shiny) return 'shiny'
  return 'normal'
}

export function getPokemonRarityLegacyFields(rarity: PokemonRarityId) {
  return {
    shiny: rarity === 'shiny',
    isShadow: rarity === 'shadow',
    isRadiant: rarity === 'radiant',
  }
}

export function getPokemonRarityEffect(
  rarity: PokemonRarityId,
): PokemonRarityEffect {
  const effect = POKEMON_RARITY_EFFECTS.find((entry) => entry.id === rarity)

  if (!effect) {
    throw new Error(`Unknown Pokemon rarity effect: ${rarity}`)
  }

  return effect
}
