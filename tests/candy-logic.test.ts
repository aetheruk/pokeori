import { describe, expect, test } from 'bun:test'
import type { BattleConfig } from '@/data/types'
import {
  calculateCandyRewards,
  getCandyIdForLevel,
  getWildBattleCandyDustQuantity,
  getPokePowderIdForLevel,
  WILD_BATTLE_CANDY_DUST_DROP_CHANCE,
} from '@/utilities/rewards/candy-logic'

const wildBattle = { isWildBattle: true } as BattleConfig

describe('candy reward logic', () => {
  test('all wild battles roll XS candy at fifteen percent', () => {
    const rewards = calculateCandyRewards(wildBattle, [13, 16])

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-xs',
      quantity: { min: 1, max: 1 },
      dropChance: 15,
    })
  })

  test('doubles every wild battle candy quantity when Lucky Egg activates', () => {
    const rewards = calculateCandyRewards(wildBattle, [60], 2)

    const candies = rewards.filter((reward) =>
      String(reward.targetId).startsWith('rare-candy-'),
    )
    expect(candies).toHaveLength(4)
    expect(candies.map((reward) => reward.quantity)).toEqual(
      Array(4).fill({ min: 2, max: 2 }),
    )
    expect(candies.map((reward) => reward.dropChance)).toEqual([15, 9, 5, 3])
  })

  test('each eligible candy tier gets a separate roll at its inclusive level threshold', () => {
    const drops = [
      ['rare-candy-xs', 15],
      ['rare-candy-m', 9],
      ['rare-candy-xl', 5],
      ['rare-candy-mega', 3],
    ]
    for (const [level, count] of [
      [1, 1],
      [19, 1],
      [20, 2],
      [39, 2],
      [40, 3],
      [59, 3],
      [60, 4],
      [80, 4],
      [100, 4],
    ]) {
      const candies = calculateCandyRewards(wildBattle, [level]).filter(
        (reward) => String(reward.targetId).startsWith('rare-candy-'),
      )
      expect(
        candies.map((reward) => [reward.targetId, reward.dropChance]),
      ).toEqual(drops.slice(0, count))
      expect(
        candies.some((reward) => reward.targetId === 'rare-candy-tera'),
      ).toBe(false)
    }
  })

  test('the highest enemy level opens eligible tiers without changing other level-matched rewards', () => {
    expect(
      calculateCandyRewards(wildBattle, [5, 40]).filter((reward) =>
        String(reward.targetId).startsWith('rare-candy-'),
      ),
    ).toHaveLength(3)
    expect(getCandyIdForLevel(81)).toBe('rare-candy-tera')
    expect(calculateCandyRewards(wildBattle, [])).toEqual([])
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
