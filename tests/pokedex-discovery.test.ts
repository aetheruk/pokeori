import { describe, expect, test } from 'bun:test'
import {
  getPokedexDiscoveryAccess,
  matchesPokedexDiscoveryFilters,
} from '@/app/(frontend)/game/pokedex/pokedex-discovery'

const record = {
  speciesId: 38,
  name: 'Ninetales',
  types: ['fire'],
  discoveryFilter: 'all' as const,
  selectedType: 'all',
}

describe('Pokédex discovery-safe presentation', () => {
  test('unseen records cannot be found by hidden name or type', () => {
    expect(
      matchesPokedexDiscoveryFilters({
        ...record,
        progress: undefined,
        searchQuery: 'Ninetales',
      }),
    ).toBe(false)
    expect(
      matchesPokedexDiscoveryFilters({
        ...record,
        progress: undefined,
        searchQuery: '',
        selectedType: 'fire',
      }),
    ).toBe(false)
  })

  test('Pokédex number search is exact and remains available when unseen', () => {
    expect(
      matchesPokedexDiscoveryFilters({
        ...record,
        progress: undefined,
        searchQuery: '#38',
      }),
    ).toBe(true)
    expect(
      matchesPokedexDiscoveryFilters({
        ...record,
        progress: undefined,
        searchQuery: '3',
      }),
    ).toBe(false)
  })

  test('seen and caught states unlock information progressively', () => {
    expect(getPokedexDiscoveryAccess()).toEqual({
      identity: false,
      type: false,
      measurements: false,
      stats: false,
      research: false,
      variants: false,
    })
    expect(getPokedexDiscoveryAccess({ seen: true })).toEqual({
      identity: true,
      type: true,
      measurements: false,
      stats: false,
      research: false,
      variants: false,
    })
    expect(getPokedexDiscoveryAccess({ caught: true })).toEqual({
      identity: true,
      type: true,
      measurements: true,
      stats: true,
      research: true,
      variants: true,
    })
  })
})
