import { describe, expect, test } from 'bun:test'
import type { BattleConfig } from '@/data/types'
import {
  calculateCandyRewards,
  getWildBattleCandyDropChance,
  getWildBattleCandyDustQuantity,
  getPokePowderIdForLevel,
  WILD_BATTLE_CANDY_DUST_DROP_CHANCE,
} from '@/utilities/rewards/candy-logic'

const wildBattle = { isWildBattle: true } as BattleConfig

describe('candy reward logic', () => {
  test('uses the highest enemy level for the base wild battle candy tier', () => {
    const rewards = calculateCandyRewards(wildBattle, [13, 16])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-xs',
      quantity: { min: 1, max: 1 },
      dropChance: 5,
    })
  })

  test('doubles every wild battle candy quantity when Lucky Egg activates', () => {
    const rewards = calculateCandyRewards(wildBattle, [16], 2)

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-xs',
      quantity: { min: 2, max: 2 },
      dropChance: 5,
    })
  })

  test('uses descending candy drop chances across five 20-level tiers', () => {
    for (const [level, chance] of [
      [1, 5],
      [20, 5],
      [21, 4],
      [40, 4],
      [41, 3],
      [60, 3],
      [61, 2],
      [80, 2],
      [81, 1],
      [100, 1],
    ]) {
      expect(getWildBattleCandyDropChance(level)).toBe(chance)
    }
  })

  test('adds a level-matched PokePowder roll to wild battles', () => {
    const rewards = calculateCandyRewards(wildBattle, [41])
    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'poke-powder-m',
      quantity: { min: 1, max: 3 },
      dropChance: 35,
    })
    expect(WILD_BATTLE_CANDY_DUST_DROP_CHANCE).toBe(35)
  })

  test('uses the crafted PokePowder tier for the encounter level', () => {
    expect(getPokePowderIdForLevel(1)).toBe('poke-powder-xs')
    expect(getPokePowderIdForLevel(20)).toBe('poke-powder-xs')
    expect(getPokePowderIdForLevel(21)).toBe('poke-powder-s')
    expect(getPokePowderIdForLevel(41)).toBe('poke-powder-m')
    expect(getPokePowderIdForLevel(61)).toBe('poke-powder-l')
    expect(getPokePowderIdForLevel(81)).toBe('poke-powder-xl')
    expect(getPokePowderIdForLevel(100)).toBe('poke-powder-xl')
  })

  test('always awards one to three Candy Dust regardless of level', () => {
    for (const level of [1, 20, 21, 40, 41, 60, 61, 80, 81, 100]) {
      expect(getWildBattleCandyDustQuantity(level)).toEqual({ min: 1, max: 3 })
    }
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
