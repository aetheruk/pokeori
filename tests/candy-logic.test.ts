import { describe, expect, test } from 'bun:test'
import type { BattleConfig } from '@/data/types'
import {
  calculateCandyRewards,
  getWildBattleCandyDropChance,
  getWildBattleCandyDustQuantity,
  WILD_BATTLE_CANDY_DUST_DROP_CHANCE,
} from '@/utilities/rewards/candy-logic'

const wildBattle = { isWildBattle: true } as BattleConfig

describe('candy reward logic', () => {
  test('uses the highest enemy level for the base wild battle candy tier at a flat 8%', () => {
    const rewards = calculateCandyRewards(wildBattle, [13, 16])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-s',
      quantity: { min: 1, max: 1 },
      dropChance: 8,
    })
  })

  test('doubles every wild battle candy quantity when Lucky Egg activates', () => {
    const rewards = calculateCandyRewards(wildBattle, [16], 2)

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-s',
      quantity: { min: 2, max: 2 },
      dropChance: 8,
    })
  })

  test('uses a flat 8% wild battle candy chance at every level tier', () => {
    for (const level of [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
      expect(getWildBattleCandyDropChance(level)).toBe(8)
    }
  })

  test('adds a level-scaled Candy Dust roll to wild battles', () => {
    const rewards = calculateCandyRewards(wildBattle, [41])
    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'candy-dust',
      quantity: { min: 1, max: 3 },
      dropChance: WILD_BATTLE_CANDY_DUST_DROP_CHANCE,
    })
  })

  test('scales Candy Dust quantity by level', () => {
    expect(getWildBattleCandyDustQuantity(20)).toEqual({ min: 1, max: 1 })
    expect(getWildBattleCandyDustQuantity(21)).toEqual({ min: 1, max: 2 })
    expect(getWildBattleCandyDustQuantity(41)).toEqual({ min: 1, max: 3 })
    expect(getWildBattleCandyDustQuantity(61)).toEqual({ min: 2, max: 3 })
    expect(getWildBattleCandyDustQuantity(81)).toEqual({ min: 3, max: 3 })
  })

  test('does not add automatic Candy or Dust to trainer battles', () => {
    const rewards = calculateCandyRewards(
      { isWildBattle: false } as BattleConfig,
      [16, 22],
    )
    expect(rewards).toEqual([])
  })

  test('can disable automatic wild battle Candy and Dust', () => {
    const rewards = calculateCandyRewards(
      { isWildBattle: true, disableCandyRewards: true } as BattleConfig,
      [16],
    )

    expect(rewards).toEqual([])
  })
})
