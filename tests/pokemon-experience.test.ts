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

  test('uses the Generation V level-scaled battle formula', () => {
    expect(
      getPokemonBattleExperience(51, {
        opponentLevel: 5,
        participantLevel: 41,
      }),
    ).toBe(4)
    expect(
      getPokemonBattleExperience(51, {
        opponentLevel: 5,
        participantLevel: 7,
      }),
    ).toBe(41)
    expect(
      getPokemonBattleExperience(178, {
        opponentLevel: 20,
        participantLevel: 50,
        isTrainerBattle: true,
      }),
    ).toBe(330)
    expect(
      getPokemonBattleExperience(0, {
        opponentLevel: 1,
        participantLevel: 1,
      }),
    ).toBe(1)
  })

  test('applies Lucky Egg, Exp. Share, and point-power multipliers', () => {
    const options = {
      opponentLevel: 20,
      participantLevel: 50,
      isTrainerBattle: true,
    }
    expect(getPokemonBattleExperience(178, { ...options, luckyEgg: true })).toBe(495)
    expect(getPokemonBattleExperience(178, { ...options, expShare: true })).toBe(165)
    expect(
      getPokemonBattleExperience(178, {
        ...options,
        pointPowerMultiplier: 1.2,
      }),
    ).toBe(396)
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
    const experienceCap = getPokemonExperienceCap('medium-slow', 20)
    expect(experienceCap).toBe(
      getTotalPokemonExperienceForLevel('medium-slow', 21) - 1,
    )
    expect(getPokemonLevelFromExperience('medium-slow', experienceCap)).toBe(20)
    expect(
      getPokemonLevelFromExperience('medium-slow', experienceCap + 1),
    ).toBe(21)
    const progress = getPokemonExperienceProgress(
      'medium-slow',
      20,
      experienceCap,
      20,
    )
    expect(progress.current).toBe(progress.required)
    expect(progress.required).toBeGreaterThan(0)
    expect(progress.percent).toBe(100)
  })
})
