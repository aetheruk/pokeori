import { describe, expect, test } from 'bun:test'
import {
  buildVsSeekerBattleConfig,
  formatVsSeekerCooldown,
  getVsSeekerAiProfile,
  getVsSeekerBadgeCount,
  getVsSeekerCandyRewards,
  getVsSeekerCooldownRemaining,
  getVsSeekerDifficultyMultiplier,
  getVsSeekerDifficultyOptions,
  getVsSeekerLeagueTicketReward,
  getVsSeekerPayout,
  getVsSeekerTrainerHealingItemId,
  getVsSeekerTrainerLevel,
  hasVsSeeker,
  VS_SEEKER_BADGE_LEVELS,
  VS_SEEKER_HELD_BERRY_CHANCE,
  VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE,
} from '@/utilities/vs-seeker'

describe('VS Seeker battle generation', () => {
  test('scales trainer level from Kanto badges', () => {
    expect(getVsSeekerTrainerLevel({})).toBe(20)
    expect(getVsSeekerTrainerLevel({ 'badge-kanto-cascade': 1 })).toBe(25)
    expect(getVsSeekerTrainerLevel({ 'badge-kanto-earth': 1 })).toBe(25)
    expect(
      getVsSeekerTrainerLevel({
        ...Object.fromEntries(
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
        ),
      }),
    ).toBe(100)
  })

  test('offers five-point rematch levels and five difficulty settings', () => {
    expect(getVsSeekerDifficultyOptions()).toEqual([1, 2, 3, 4, 5])
    expect(getVsSeekerDifficultyMultiplier(1)).toBe(1)
    expect(getVsSeekerDifficultyMultiplier(5)).toBe(3)
    expect(getVsSeekerLeagueTicketReward(1)).toBe(1)
    expect(getVsSeekerLeagueTicketReward(5)).toBe(5)
    expect(getVsSeekerPayout(20)).toBe(350)
    expect(getVsSeekerPayout(30)).toBe(650)
    expect(getVsSeekerPayout(30, 5)).toBe(1950)
  })

  test('scales trainer healing item pool from Kanto badge count', () => {
    const rngSequence = (rolls: number[]) => () => rolls.shift() ?? 0

    expect(getVsSeekerBadgeCount({})).toBe(0)
    expect(
      getVsSeekerBadgeCount({
        'badge-kanto-boulder': 1,
        'badge-kanto-cascade': 1,
      }),
    ).toBe(2)

    expect(
      getVsSeekerTrainerHealingItemId({
        inventory: {},
        rng: rngSequence([0, 0.99]),
      }),
    ).toBe('battle-potion')

    expect(
      getVsSeekerTrainerHealingItemId({
        inventory: {
          'badge-kanto-boulder': 1,
          'badge-kanto-cascade': 1,
        },
        rng: rngSequence([0, 0.99]),
      }),
    ).toBe('battle-potion')

    expect(
      getVsSeekerTrainerHealingItemId({
        inventory: {
          'badge-kanto-boulder': 1,
          'badge-kanto-cascade': 1,
          'badge-kanto-thunder': 1,
          'badge-kanto-rainbow': 1,
        },
        rng: rngSequence([0, 0.99]),
      }),
    ).toBe('battle-super-potion')

    expect(
      getVsSeekerTrainerHealingItemId({
        inventory: {
          'badge-kanto-boulder': 1,
          'badge-kanto-cascade': 1,
          'badge-kanto-thunder': 1,
          'badge-kanto-rainbow': 1,
          'badge-kanto-soul': 1,
          'badge-kanto-marsh': 1,
        },
        rng: rngSequence([0, 0.99]),
      }),
    ).toBe('battle-hyper-potion')

    const eightBadgeInventory = Object.fromEntries(
      VS_SEEKER_BADGE_LEVELS.map((badge) => [badge.badgeId, 1]),
    )
    expect(
      getVsSeekerTrainerHealingItemId({
        inventory: eightBadgeInventory,
        rng: rngSequence([0, 0.99]),
      }),
    ).toBe('battle-full-restore')

    expect(
      getVsSeekerTrainerHealingItemId({
        inventory: eightBadgeInventory,
        rng: () => VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE,
      }),
    ).toBeNull()
  })

  test('uses lighter AI until all Kanto badges are earned', () => {
    expect(getVsSeekerAiProfile({})).toBe('trainer')

    const sevenBadgeInventory = Object.fromEntries(
      VS_SEEKER_BADGE_LEVELS.slice(0, 7).map((badge) => [badge.badgeId, 1]),
    )
    expect(getVsSeekerAiProfile(sevenBadgeInventory)).toBe('trainer')

    const eightBadgeInventory = Object.fromEntries(
      VS_SEEKER_BADGE_LEVELS.map((badge) => [badge.badgeId, 1]),
    )
    expect(getVsSeekerAiProfile(eightBadgeInventory)).toBe('advanced')
  })

  test('requires the VS Seeker item to be owned', () => {
    expect(hasVsSeeker({})).toBe(false)
    expect(hasVsSeeker({ 'vs-seeker': 0 })).toBe(false)
    expect(hasVsSeeker({ 'vs-seeker': 1 })).toBe(true)
  })

  test('builds a 3v3 trainer battle from seen Pokemon', () => {
    const config = buildVsSeekerBattleConfig({
      inventory: { 'badge-kanto-cascade': 1 },
      pokedex: {
        '1': { '1': { seen: true } },
        '4': { '4': { seen: true } },
        '7': { '7': { seen: true } },
        '25': { '25': { seen: true } },
      },
      rng: () => 0,
      now: new Date('2026-05-14T12:00:00.000Z'),
    })

    expect(config).not.toBeNull()
    expect(config?.maxPokemon).toBe(3)
    expect(config?.trainerClassId).toBe('beauty')
    expect(config?.trainerName).toBe('Mira')
    expect(config?.name).toBe('Beauty Mira')
    expect(config?.icon).toEqual({ type: 'trainer', id: 'beauty' })
    expect(config?.aiProfile).toBe('trainer')
    expect(config?.levelCap).toBe(25)
    expect(config?.enemyTeam.every((enemy) => enemy.level === 25)).toBe(true)
    expect(config?.enemyDifficulty).toBe(1)
    expect(config?.enemyTeam).toHaveLength(3)
    expect(config?.enemyTeam.every((enemy) => enemy.heldItemId)).toBe(true)
    expect(config?.trainerItems).toEqual([
      {
        itemId: 'battle-potion',
        quantity: 1,
      },
    ])
    expect(config?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 500,
      dropChance: 100,
    })
    expect(config?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'league-ticket',
      quantity: 1,
      dropChance: 100,
    })
    expect(config?.disableCandyRewards).toBe(true)
    expect(config?.disableLossPayout).toBe(true)
    expect(config?.rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-m',
      quantity: 1,
      dropChance: 100,
    })
    expect(config?.rewards).toContainEqual({
      type: 'item',
      targetId: 'poke-powder-s',
      quantity: 5,
      dropChance: 100,
    })
  })

  test('returns one level-matched candy and five level-matched PokePowder', () => {
    expect(getVsSeekerCandyRewards(30)).toEqual([
      {
        type: 'item',
        targetId: 'rare-candy-m',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'poke-powder-s',
        quantity: 5,
        dropChance: 100,
      },
    ])
  })

  test('accepts a badge-capped level and difficulty selection', () => {
    const config = buildVsSeekerBattleConfig({
      inventory: {
        'badge-kanto-boulder': 1,
        'badge-kanto-cascade': 1,
      },
      requestedLevel: 35,
      requestedDifficulty: 5,
      pokedex: {
        '1': { '1': { seen: true } },
        '4': { '4': { seen: true } },
        '7': { '7': { seen: true } },
      },
      rng: () => 0,
    })

    expect(config).toBeNull()

    const allowedConfig = buildVsSeekerBattleConfig({
      inventory: {
        'badge-kanto-boulder': 1,
        'badge-kanto-cascade': 1,
      },
      requestedLevel: 30,
      requestedDifficulty: 5,
      pokedex: {
        '1': { '1': { seen: true } },
        '4': { '4': { seen: true } },
        '7': { '7': { seen: true } },
      },
      rng: () => 0,
    })

    expect(allowedConfig).not.toBeNull()
    expect(allowedConfig?.levelCap).toBe(30)
    expect(allowedConfig?.enemyDifficulty).toBe(5)
    expect(allowedConfig?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 1950,
      dropChance: 100,
    })
    expect(allowedConfig?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'league-ticket',
      quantity: 5,
      dropChance: 100,
    })
  })

  test('requires at least 3 seen Pokemon', () => {
    const config = buildVsSeekerBattleConfig({
      inventory: {},
      pokedex: {
        '1': { '1': { seen: true } },
        '4': { '4': { seen: true } },
      },
      rng: () => 0,
    })

    expect(config).toBeNull()
  })

  test('excludes legendary and mythical Pokemon from trainer teams', () => {
    const config = buildVsSeekerBattleConfig({
      inventory: {},
      pokedex: {
        '1': { '1': { seen: true } },
        '4': { '4': { seen: true } },
        '7': { '7': { seen: true } },
        '150': { '150': { seen: true } },
        '151': { '151': { seen: true } },
      },
      rng: () => 0,
    })

    expect(config?.enemyTeam.map((enemy) => enemy.speciesId).sort()).toEqual([
      1, 4, 7,
    ])
  })

  test('rolls VS Seeker held berries and trainer potion independently', () => {
    const rolls = [
      0, // trainer class
      0, // trainer name
      0, // pokemon 1
      0, // pokemon 2
      0, // pokemon 3
      VS_SEEKER_HELD_BERRY_CHANCE + 0.01,
      VS_SEEKER_HELD_BERRY_CHANCE - 0.01,
      0,
      VS_SEEKER_HELD_BERRY_CHANCE + 0.01,
      VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE + 0.01,
    ]
    const config = buildVsSeekerBattleConfig({
      inventory: {},
      pokedex: {
        '1': { '1': { seen: true } },
        '4': { '4': { seen: true } },
        '7': { '7': { seen: true } },
      },
      rng: () => rolls.shift() ?? 0,
    })

    expect(config?.enemyTeam.filter((enemy) => enemy.heldItemId)).toHaveLength(1)
    expect(config?.trainerItems).toBeUndefined()
  })

  test('reports 30-minute cooldown remaining', () => {
    const remaining = getVsSeekerCooldownRemaining(
      '2026-05-14T12:00:00.000Z',
      new Date('2026-05-14T12:05:00.000Z').getTime(),
    )

    expect(remaining).toBe(25 * 60 * 1000)
    expect(formatVsSeekerCooldown(remaining)).toBe('25m')
  })
})
