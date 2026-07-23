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
    description: 'Cool metallic finish; starts battle with 10% more HP.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'gold',
    label: 'Gold',
    description: 'Warm gilt colouring; starts battle with 10% more HP.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    description: 'Deep green gemstone tint; starts battle with Shield and clears weather.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'ruby',
    label: 'Ruby',
    description: 'Rich red gem tone; starts battle with Shield and Harsh Sunlight.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'sapphire',
    label: 'Sapphire',
    description: 'Blue crystal treatment; starts battle with Shield and Rain.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'crystal',
    label: 'Crystal',
    description: 'Icy facets; +2 Attack/Sp. Atk and -2 Defense/Sp. Def on entry.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'retro',
    label: 'Retro',
    description: 'CRT scanlines; gains a random +3 stage and a distinct -3 stage on entry.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'galactic',
    label: 'Galactic',
    description: 'Deep navy starfield; starts battle with Mystic Veil.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'levin',
    label: 'Levin',
    description: 'Pale-blue lightning; adds Electric type and 20% Paralysis on attacks.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'inferno',
    label: 'Inferno',
    description: 'Deep furnace fire; adds Fire type and 20% Burn on attacks.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'prism',
    label: 'Prism',
    description: 'Spectral refraction; gains one random extra type on entry.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'rainbow',
    label: 'Rainbow',
    description: 'Flowing spectrum; its random extra type changes each active turn.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'celestial',
    label: 'Celestial',
    description: 'Angelic white-gold light; starts battle with Regeneration.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'black',
    label: 'Black',
    description: 'Deep monochrome treatment; becomes Dark type only.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'white',
    label: 'White',
    description: 'Bright monochrome treatment; becomes Normal type only.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'void',
    label: 'Void',
    description: 'Deep-purple void; attacks have a 5% chance to make the user Vanish.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'glitch',
    label: 'Glitch',
    description: 'Unstable RGB fragments; shuffles its non-HP combat stats every active turn.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'ancient',
    label: 'Ancient',
    description: 'Weathered fossil stone; +15% Defense and adds Rock type.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'toxic',
    label: 'Toxic',
    description: 'Corrosive lime colouring; adds Poison type and 20% Poison on attacks.',
    group: 'cosmetic',
    sourcePalette: 'normal',
  },
  {
    id: 'pixelated',
    label: 'Pixelated',
    description: 'Chunky colour blocks; starts battle at +1 Evasion.',
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
