import { describe, expect, test } from 'bun:test'
import { getPokemonPokedexBackground } from '@/utilities/pokemon/pokemon-background'

describe('getPokemonPokedexBackground', () => {
  test('prefers an authored habitat background', () => {
    expect(
      getPokemonPokedexBackground({ habitat: 'water\'s edge', types: ['water'] }),
    ).toBe('/backgrounds/pond.avif')
  })

  test('uses a type background when later species have no habitat', () => {
    expect(getPokemonPokedexBackground({ types: ['water'] })).toBe(
      '/backgrounds/epic-ocean.avif',
    )
    expect(getPokemonPokedexBackground({ types: ['electric'] })).toBe(
      '/backgrounds/modern-city.avif',
    )
  })

  test('uses the rare background for legendary and mythical species', () => {
    expect(
      getPokemonPokedexBackground({ is_legendary: true, types: ['psychic'] }),
    ).toBe('/backgrounds/crystal-stadium.avif')
  })
})
