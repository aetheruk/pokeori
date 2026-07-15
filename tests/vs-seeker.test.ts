import { describe, expect, test } from 'bun:test'
import {
  buildVsSeekerBattleConfig,
  formatVsSeekerCooldown,
  getVsSeekerBadgeCount,
  getVsSeekerCandyRewards,
  getVsSeekerCooldownRemaining,
  getVsSeekerTrainerHealingItemId,
  getVsSeekerTrainerLevel,
  hasVsSeeker,
  VS_SEEKER_BADGE_LEVELS,
  VS_SEEKER_HELD_BERRY_CHANCE,
  VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE,
} from '@/utilities/vs-seeker'

describe('VS Seeker battle generation', () => {
  test('scales trainer level from Kanto badges', () => {
    expect(getVsSeekerTrainerLevel({})).toBe(10)
    expect(getVsSeekerTrainerLevel({ 'badge-kanto-cascade': 1 })).toBe(20)
    expect(getVsSeekerTrainerLevel({ 'badge-kanto-earth': 1 })).toBe(50)
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
    expect(config?.aiProfile).toBe('advanced')
    expect(config?.levelCap).toBe(20)
    expect(config?.enemyTeam).toHaveLength(3)
    expect(config?.enemyTeam.every((enemy) => enemy.level === 20)).toBe(true)
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
      quantity: 1000,
      dropChance: 100,
    })
    expect(config?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'league-ticket',
      quantity: 1,
      dropChance: 100,
    })
    expect(config?.disableCandyRewards).toBe(true)
    expect(config?.rewards).toEqual(
      expect.arrayContaining([
        { type: 'item', targetId: 'rare-candy-xs', quantity: 3, dropChance: 100 },
        { type: 'item', targetId: 'rare-candy-s', quantity: 3, dropChance: 100 },
      ]),
    )
  })

  test('rewards three of each candy tier up to the generated trainer level', () => {
    expect(getVsSeekerCandyRewards(10)).toEqual([
      { type: 'item', targetId: 'rare-candy-xs', quantity: 3, dropChance: 100 },
    ])
    expect(getVsSeekerCandyRewards(25)).toEqual([
      { type: 'item', targetId: 'rare-candy-xs', quantity: 3, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-s', quantity: 3, dropChance: 100 },
      { type: 'item', targetId: 'rare-candy-m', quantity: 3, dropChance: 100 },
    ])
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
