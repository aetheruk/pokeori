import { describe, expect, test } from 'bun:test'
import {
  getAvailablePokemonPowerOptions,
  normalizeSelectedPokemonPower,
  validateSelectedPokemonPower,
} from '@/utilities/pokemon/pokemon-powers'

describe('pokemon power assignment helpers', () => {
  test('normalizes valid selected powers only', () => {
    expect(normalizeSelectedPokemonPower('tera')).toBe('tera')
    expect(normalizeSelectedPokemonPower('weather')).toBe('weather')
    expect(normalizeSelectedPokemonPower('dimensional-shift')).toBe('dimensional-shift')
    expect(normalizeSelectedPokemonPower('not-a-power')).toBeNull()
    expect(normalizeSelectedPokemonPower(null)).toBeNull()
  })

  test('returns only unlocked powers for the Pokemon and inventory', () => {
    const options = getAvailablePokemonPowerOptions({
      pokemonFormId: '6',
      inventory: {
        'tera-orb': 1,
        'mega-bracelet': 1,
        'charizardite-x': 1,
        'z-ring': 1,
        'dynamax-band': 1,
      },
    })

    expect(options.map((option) => option.id)).toEqual([
      'tera',
      'mega',
      'z-move',
      'dynamax',
    ])
  })

  test('returns Weather Control when a Weather Orb and Weather Core are owned', () => {
    const options = getAvailablePokemonPowerOptions({
      pokemonFormId: '25',
      inventory: {
        'weather-orb': 1,
        'weather-core-rain': 1,
      },
      trainerLevel: 65,
    })

    expect(options.map((option) => option.id)).toEqual(['weather'])
  })

  test('rejects using a power that is not selected', () => {
    expect(
      validateSelectedPokemonPower({
        selectedPokemonPower: 'tera',
        requiredPower: 'mega',
        pokemonName: 'Charizard',
      }),
    ).toBe('Charizard must have Mega Evolution selected to use this power')

    expect(
      validateSelectedPokemonPower({
        selectedPokemonPower: 'mega',
        requiredPower: 'mega',
        pokemonName: 'Charizard',
      }),
    ).toBeNull()
  })
})
