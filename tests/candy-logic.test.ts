import { describe, expect, test } from 'bun:test'
import type { BattleConfig } from '@/data/types'
import {
  calculateCandyRewards,
  getWildBattleCandyDropChance,
} from '@/utilities/rewards/candy-logic'

const wildBattle = {
  isWildBattle: true,
} as BattleConfig

describe('candy reward logic', () => {
  test('uses the highest enemy level for the base wild battle candy tier', () => {
    const rewards = calculateCandyRewards(wildBattle, [13, 16])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-s',
      quantity: { min: 1, max: 1 },
      dropChance: 65,
    })
  })

  test('scales base wild battle candy chance by candy size pair', () => {
    expect(getWildBattleCandyDropChance(10)).toBe(65)
    expect(getWildBattleCandyDropChance(20)).toBe(65)
    expect(getWildBattleCandyDropChance(30)).toBe(45)
    expect(getWildBattleCandyDropChance(40)).toBe(45)
    expect(getWildBattleCandyDropChance(50)).toBe(30)
    expect(getWildBattleCandyDropChance(60)).toBe(30)
    expect(getWildBattleCandyDropChance(70)).toBe(25)
    expect(getWildBattleCandyDropChance(80)).toBe(25)
    expect(getWildBattleCandyDropChance(90)).toBe(15)
    expect(getWildBattleCandyDropChance(100)).toBe(15)
  })

  test('adds Cascade Badge S Candy support for wild enemies above level 15', () => {
    const rewards = calculateCandyRewards(wildBattle, [16])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-m',
      quantity: { min: 1, max: 1 },
      dropChance: 20,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'badge-kanto-cascade',
          count: 1,
        },
      ],
    })
  })

  test('does not add Cascade Badge support at level 15 or below', () => {
    const rewards = calculateCandyRewards(wildBattle, [15])

    expect(rewards.some((reward) => reward.targetId === 'rare-candy-m')).toBe(false)
  })

  test('adds Rainbow Badge S Candy EX support for wild enemies above level 25', () => {
    const rewards = calculateCandyRewards(wildBattle, [26])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-l',
      quantity: { min: 1, max: 1 },
      dropChance: 20,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'badge-kanto-rainbow',
          count: 1,
        },
      ],
    })
  })

  test('does not add Rainbow Badge support at level 25 or below', () => {
    const rewards = calculateCandyRewards(wildBattle, [25])

    expect(rewards.some((reward) => reward.targetId === 'rare-candy-l')).toBe(false)
  })

  test('adds Soul Badge M Candy support for wild enemies above level 30', () => {
    const rewards = calculateCandyRewards(wildBattle, [31])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-xl',
      quantity: { min: 1, max: 1 },
      dropChance: 20,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'badge-kanto-soul',
          count: 1,
        },
      ],
    })
  })

  test('does not add Soul Badge support at level 30 or below', () => {
    const rewards = calculateCandyRewards(wildBattle, [30])

    expect(rewards.some((reward) => reward.targetId === 'rare-candy-xl')).toBe(false)
  })

  test('adds Earth Badge M Candy EX support for wild enemies above level 40', () => {
    const rewards = calculateCandyRewards(wildBattle, [41])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-xxl',
      quantity: { min: 1, max: 1 },
      dropChance: 20,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'badge-kanto-earth',
          count: 1,
        },
      ],
    })
  })

  test('does not add Earth Badge support at level 40 or below', () => {
    const rewards = calculateCandyRewards(wildBattle, [40])

    expect(rewards.some((reward) => reward.targetId === 'rare-candy-xxl')).toBe(false)
  })

  test('guarantees one candy for trainer battles from the highest enemy level', () => {
    const rewards = calculateCandyRewards({ isWildBattle: false } as BattleConfig, [16, 22])

    expect(rewards).toEqual([
      {
        type: 'item',
        targetId: 'rare-candy-m',
        quantity: 1,
        dropChance: 100,
      },
    ])
  })

  test('can disable automatic battle candy rewards', () => {
    const rewards = calculateCandyRewards(
      { isWildBattle: false, disableCandyRewards: true } as BattleConfig,
      [16, 22],
    )

    expect(rewards).toEqual([])
  })
})
