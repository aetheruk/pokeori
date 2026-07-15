import { describe, expect, test } from 'bun:test'
import { getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import {
  getDefaultPokemonGender,
  getOwnedPokemonGender,
  rollPokemonGender,
} from '@/utilities/pokemon/gender'

describe('Pokemon gender data', () => {
  test('loads gender rates from source species data', () => {
    expect(getPokemonSpecies(1)?.gender_rate).toBe(1)
    expect(getPokemonSpecies(1)?.has_gender_differences).toBe(false)
    expect(getPokemonSpecies(3)?.has_gender_differences).toBe(true)
    expect(getPokemonSpecies(120)?.gender_rate).toBe(-1)
    expect(getPokemonSpecies(29)?.gender_rate).toBe(8)
    expect(getPokemonSpecies(32)?.gender_rate).toBe(0)
  })

  test('rolls legal genders from source gender rates', () => {
    expect(rollPokemonGender(120)).toBe('genderless')
    expect(rollPokemonGender(29)).toBe('female')
    expect(rollPokemonGender(32)).toBe('male')
    expect(rollPokemonGender(1, () => 0)).toBe('female')
    expect(rollPokemonGender(1, () => 0.999)).toBe('male')
  })

  test('defaults missing owned Pokemon gender to male for legacy records', () => {
    expect(getOwnedPokemonGender({})).toBe('male')
    expect(getDefaultPokemonGender(120)).toBe('genderless')
  })
})
