import { describe, expect, test } from 'bun:test'
import { EVOLUTIONS } from '@/data/evolutions'
import {
  getEvolutionConditionGender,
  getEvolutionTimeOfDayForRegion,
  getEvolutionTimeOfDay,
  matchesEvolutionTimeOfDayForRegion,
  matchesEvolutionTimeOfDay,
  matchesEvolutionGender,
  resolveEvolutionTimeRegion,
} from '@/utilities/pokemon/evolution-conditions'

describe('evolution gender conditions', () => {
  test('maps generated evolution gender ids to owned Pokemon genders', () => {
    expect(getEvolutionConditionGender({ gender: 1 })).toBe('female')
    expect(getEvolutionConditionGender({ gender: 2 })).toBe('male')
    expect(getEvolutionConditionGender({})).toBeUndefined()
  })

  test('filters Burmy split evolutions by gender', () => {
    const wormadam = EVOLUTIONS[412]?.find(
      (evolution) => evolution.speciesId === 413,
    )
    const mothim = EVOLUTIONS[412]?.find(
      (evolution) => evolution.speciesId === 414,
    )

    expect(wormadam).toBeTruthy()
    expect(mothim).toBeTruthy()
    expect(matchesEvolutionGender(wormadam!.conditions, 'female')).toBe(true)
    expect(matchesEvolutionGender(wormadam!.conditions, 'male')).toBe(false)
    expect(matchesEvolutionGender(mothim!.conditions, 'male')).toBe(true)
    expect(matchesEvolutionGender(mothim!.conditions, 'female')).toBe(false)
  })

  test('filters Combee to Vespiquen by female gender only', () => {
    const vespiquen = EVOLUTIONS[415]?.find(
      (evolution) => evolution.speciesId === 416,
    )

    expect(vespiquen).toBeTruthy()
    expect(matchesEvolutionGender(vespiquen!.conditions, 'female')).toBe(true)
    expect(matchesEvolutionGender(vespiquen!.conditions, 'male')).toBe(false)
  })

  test('filters Dawn Stone gender evolutions by gender', () => {
    const gallade = EVOLUTIONS[281]?.find(
      (evolution) => evolution.speciesId === 475,
    )
    const froslass = EVOLUTIONS[361]?.find(
      (evolution) => evolution.speciesId === 478,
    )

    expect(gallade).toBeTruthy()
    expect(froslass).toBeTruthy()
    expect(matchesEvolutionGender(gallade!.conditions, 'male')).toBe(true)
    expect(matchesEvolutionGender(gallade!.conditions, 'female')).toBe(false)
    expect(matchesEvolutionGender(froslass!.conditions, 'female')).toBe(true)
    expect(matchesEvolutionGender(froslass!.conditions, 'male')).toBe(false)
  })

  test('filters Salandit to Salazzle by female gender only', () => {
    const salazzle = EVOLUTIONS[757]?.find(
      (evolution) => evolution.speciesId === 758,
    )

    expect(salazzle).toBeTruthy()
    expect(matchesEvolutionGender(salazzle!.conditions, 'female')).toBe(true)
    expect(matchesEvolutionGender(salazzle!.conditions, 'male')).toBe(false)
  })

  test('matches evolution time windows including dusk', () => {
    expect(getEvolutionTimeOfDay(6)).toBe('day')
    expect(getEvolutionTimeOfDay(16)).toBe('day')
    expect(getEvolutionTimeOfDay(17)).toBe('dusk')
    expect(getEvolutionTimeOfDay(18)).toBe('night')
    expect(getEvolutionTimeOfDay(5)).toBe('night')

    expect(matchesEvolutionTimeOfDay({ timeOfDay: 'day' }, 16)).toBe(true)
    expect(matchesEvolutionTimeOfDay({ timeOfDay: 'day' }, 17)).toBe(false)
    expect(matchesEvolutionTimeOfDay({ timeOfDay: 'dusk' }, 17)).toBe(true)
    expect(matchesEvolutionTimeOfDay({ timeOfDay: 'night' }, 18)).toBe(true)
  })

  test('matches evolution time windows using the Pokemon region timezone', () => {
    const timestamp = '2026-05-12T08:30:00.000Z'

    expect(getEvolutionTimeOfDayForRegion('Kanto', timestamp)).toBe('dusk')
    expect(getEvolutionTimeOfDayForRegion('Alola', timestamp)).toBe('night')
    expect(
      matchesEvolutionTimeOfDayForRegion(
        { timeOfDay: 'night' },
        'Alola',
        timestamp,
      ),
    ).toBe(true)
    expect(
      matchesEvolutionTimeOfDayForRegion(
        { timeOfDay: 'night' },
        'Kanto',
        timestamp,
      ),
    ).toBe(false)
  })

  test('falls back to Kanto time for Pokemon without a valid region', () => {
    expect(resolveEvolutionTimeRegion({ obtainedRegion: 'Alola' })).toBe(
      'Alola',
    )
    expect(resolveEvolutionTimeRegion({ obtainedRegion: null })).toBe('Kanto')
    expect(resolveEvolutionTimeRegion({ obtainedRegion: 'Unknown' })).toBe(
      'Kanto',
    )
  })
})
