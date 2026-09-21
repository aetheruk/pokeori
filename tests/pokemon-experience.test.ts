import { describe, expect, test } from 'bun:test'
import {
  BASE_POKEMON_LEVEL_CAP,
  getPokemonBattleExperience,
  getPokemonExperienceCap,
  getPokemonExperienceProgress,
  getPokemonLevelCap,
  getPokemonLevelFromExperience,
  getTotalPokemonExperienceForLevel,
} from '@/utilities/pokemon/experience'

describe('Pokemon battle experience', () => {
  test('uses the official growth curves', () => {
    expect(getTotalPokemonExperienceForLevel('medium', 20)).toBe(8000)
    expect(getTotalPokemonExperienceForLevel('medium-slow', 20)).toBe(5460)
    expect(getTotalPokemonExperienceForLevel('fast', 20)).toBe(6400)
    expect(getTotalPokemonExperienceForLevel('slow', 20)).toBe(10000)
    expect(getTotalPokemonExperienceForLevel('medium-slow', 1)).toBe(0)
  })

  test('resolves levels from cumulative experience', () => {
    expect(getPokemonLevelFromExperience('medium-slow', 0)).toBe(1)
    expect(getPokemonLevelFromExperience('medium-slow', 5459)).toBe(19)
    expect(getPokemonLevelFromExperience('medium-slow', 5460)).toBe(20)
    expect(getPokemonLevelFromExperience('medium-slow', 1_059_860)).toBe(100)
  })

  test('awards base experience multiplied by the receiving level and divided by seven', () => {
    expect(getPokemonBattleExperience(178, 20)).toBe(508)
    expect(getPokemonBattleExperience(50, 10)).toBe(71)
    expect(getPokemonBattleExperience(0, 1)).toBe(1)
  })

  test('raises the persistent cap by five for each Kanto or Johto badge', () => {
    expect(getPokemonLevelCap({})).toBe(BASE_POKEMON_LEVEL_CAP)
    expect(
      getPokemonLevelCap({
        'badge-kanto-boulder': 1,
        'badge-kanto-cascade': 1,
        'badge-johto-zephyr': 1,
      }),
    ).toBe(35)
    const allBadges = Object.fromEntries(
      [
        'badge-kanto-boulder',
        'badge-kanto-cascade',
        'badge-kanto-thunder',
        'badge-kanto-rainbow',
        'badge-kanto-soul',
        'badge-kanto-marsh',
        'badge-kanto-volcano',
        'badge-kanto-earth',
        'badge-johto-zephyr',
        'badge-johto-hive',
        'badge-johto-plain',
        'badge-johto-fog',
        'badge-johto-storm',
        'badge-johto-mineral',
        'badge-johto-glacier',
        'badge-johto-rising',
      ].map((badgeId) => [badgeId, 1]),
    )
    expect(getPokemonLevelCap(allBadges)).toBe(100)
  })

  test('holds capped experience just below the next threshold', () => {
    expect(getPokemonExperienceCap('medium-slow', 20)).toBe(
      getTotalPokemonExperienceForLevel('medium-slow', 21) - 1,
    )
    const progress = getPokemonExperienceProgress('medium-slow', 20, 5459, 20)
    expect(progress.current).toBe(0)
    expect(progress.required).toBeGreaterThan(0)
    expect(progress.percent).toBe(0)
  })
})
