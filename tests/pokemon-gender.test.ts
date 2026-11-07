import { describe, expect, test } from 'bun:test'
import { isGenderCompatibleFormAbility, isNaturalFormAbilityForForm } from '@/data/abilities'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import {
  formatPokemonGenderLabel,
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

  test('formats stored genders as display labels', () => {
    expect(formatPokemonGenderLabel('male')).toBe('Male')
    expect(formatPokemonGenderLabel('female')).toBe('Female')
    expect(formatPokemonGenderLabel('genderless')).toBe('Genderless')
  })

  test('supports Meowstic gender-specific abilities while retaining shared base stats', () => {
    expect(isNaturalFormAbilityForForm('678', 'prankster', 'male')).toBe(true)
    expect(isNaturalFormAbilityForForm('678', 'prankster', 'female')).toBe(false)
    expect(isNaturalFormAbilityForForm('678', 'competitive', 'female')).toBe(true)
    expect(isNaturalFormAbilityForForm('678', 'competitive', 'male')).toBe(false)

    expect(isGenderCompatibleFormAbility('678', 'prankster', 'male')).toBe(true)
    expect(isGenderCompatibleFormAbility('678', 'prankster', 'female')).toBe(false)
    expect(isGenderCompatibleFormAbility('678', 'competitive', 'female')).toBe(true)
    expect(isGenderCompatibleFormAbility('678', 'competitive', 'male')).toBe(false)

    const male = getPokemonForm('678', 'male')
    const female = getPokemonForm('678', 'female')
    expect(male?.stats).toEqual(female?.stats)
    expect(male?.stats).toEqual({
      hp: 74,
      attack: 48,
      defense: 76,
      'special-attack': 83,
      'special-defense': 81,
      speed: 104,
    })
  })

  test('applies source gender-specific stats to forms that differ', () => {
    const maleIndeedee = getPokemonForm('876', 'male')
    const femaleIndeedee = getPokemonForm('876', 'female')

    expect(maleIndeedee?.stats).not.toEqual(femaleIndeedee?.stats)
    expect(femaleIndeedee?.stats).toEqual({
      hp: 70,
      attack: 55,
      defense: 65,
      'special-attack': 95,
      'special-defense': 105,
      speed: 85,
    })
  })
})
