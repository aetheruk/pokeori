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

export function getPokemonPokedexBackground(habitat?: string) {
  const key = habitat?.trim().toLowerCase()
  return key
    ? POKEDEX_HABITAT_BACKGROUNDS[key] || '/backgrounds/pokedex.avif'
    : '/backgrounds/pokedex.avif'
}
