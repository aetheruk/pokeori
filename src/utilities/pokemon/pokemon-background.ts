const POKEDEX_HABITAT_BACKGROUNDS: Record<string, string> = {
  cave: '/backgrounds/cave.avif',
  forest: '/backgrounds/forest.avif',
  grassland: '/backgrounds/grassy-route.avif',
  mountain: '/backgrounds/mountain-sky.avif',
  rare: '/backgrounds/crystal-stadium.avif',
  'rough terrain': '/backgrounds/rocky-path.avif',
  sea: '/backgrounds/epic-ocean.avif',
  urban: '/backgrounds/modern-city.avif',
  "water's edge": '/backgrounds/pond.avif',
}

const POKEDEX_TYPE_BACKGROUNDS: Record<string, string> = {
  bug: '/backgrounds/forest.avif',
  dark: '/backgrounds/crystal-stadium.avif',
  dragon: '/backgrounds/mountain-sky.avif',
  electric: '/backgrounds/modern-city.avif',
  fairy: '/backgrounds/crystal-stadium.avif',
  fighting: '/backgrounds/grassy-route.avif',
  fire: '/backgrounds/mountain-sky.avif',
  flying: '/backgrounds/mountain-sky.avif',
  ghost: '/backgrounds/cave.avif',
  grass: '/backgrounds/forest.avif',
  ground: '/backgrounds/rocky-path.avif',
  ice: '/backgrounds/mountain-sky.avif',
  normal: '/backgrounds/grassy-route.avif',
  poison: '/backgrounds/cave.avif',
  psychic: '/backgrounds/crystal-stadium.avif',
  rock: '/backgrounds/rocky-path.avif',
  steel: '/backgrounds/modern-city.avif',
  water: '/backgrounds/epic-ocean.avif',
}

export type PokemonPokedexBackgroundSource = {
  habitat?: string
  is_legendary?: boolean
  is_mythical?: boolean
  types?: string[]
}

export function getPokemonPokedexBackground(
  source?: string | PokemonPokedexBackgroundSource,
) {
  if (!source) return '/backgrounds/pokedex.avif'

  if (typeof source === 'string') {
    const key = source.trim().toLowerCase()
    return POKEDEX_HABITAT_BACKGROUNDS[key] || '/backgrounds/pokedex.avif'
  }

  const habitatKey = source.habitat?.trim().toLowerCase()
  if (habitatKey && POKEDEX_HABITAT_BACKGROUNDS[habitatKey]) {
    return POKEDEX_HABITAT_BACKGROUNDS[habitatKey]
  }

  if (source.is_legendary || source.is_mythical) {
    return POKEDEX_HABITAT_BACKGROUNDS.rare
  }

  for (const type of source.types ?? []) {
    const background = POKEDEX_TYPE_BACKGROUNDS[type.trim().toLowerCase()]
    if (background) return background
  }

  return '/backgrounds/pokedex.avif'
}
