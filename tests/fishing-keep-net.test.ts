import { describe, expect, test } from 'bun:test'
import type { Reward } from '@/data/types'
import {
  applyFishingExplorerXpMultiplier,
  buildFishingKeepNetCaptureRewards,
  getFishingAlphaChanceMultiplier,
  getFishingExplorerXpMultiplier,
  getFishingItemChance,
  getFishingShinyChanceMultiplier,
  getSameFormKeepNetCount,
  type FishingKeepNetEntry,
} from '@/utilities/fishing/keep-net'

describe('fishing keep net', () => {
  test('scales item chance and caught-Pokemon Explorer XP with net occupancy', () => {
    expect(getFishingItemChance(0)).toBe(30)
    expect(getFishingItemChance(5)).toBe(35)
    expect(getFishingItemChance(10)).toBe(40)
    expect(getFishingItemChance(20)).toBe(40)

    expect(getFishingExplorerXpMultiplier(0)).toBe(1)
    expect(getFishingExplorerXpMultiplier(1)).toBe(1.4)
    expect(getFishingExplorerXpMultiplier(5)).toBe(3)
    expect(getFishingExplorerXpMultiplier(10)).toBe(5)
    expect(getFishingExplorerXpMultiplier(20)).toBe(5)
  })

  test('scales Alpha and Shiny odds linearly by matching form count', () => {
    expect(getFishingAlphaChanceMultiplier(1)).toBe(1.01)
    expect(getFishingAlphaChanceMultiplier(10)).toBe(1.1)
    expect(getFishingAlphaChanceMultiplier(20)).toBe(1.1)
    expect(getFishingShinyChanceMultiplier(1)).toBe(1.01)
    expect(getFishingShinyChanceMultiplier(10)).toBe(1.1)
    expect(getFishingShinyChanceMultiplier(20)).toBe(1.1)
  })

  test('counts matching Pokemon by species form and ignores item slots', () => {
    const entries: FishingKeepNetEntry[] = [
      { id: '1', type: 'pokemon', speciesId: 129, formId: '129', isShiny: false, isAlpha: false },
      { id: '2', type: 'pokemon', speciesId: 129, formId: '129', isShiny: true, isAlpha: false },
      { id: '3', type: 'pokemon', speciesId: 129, formId: '129-alola', isShiny: false, isAlpha: false },
      { id: '4', type: 'item', itemId: 'water-gem', quantity: 1 },
    ]

    expect(getSameFormKeepNetCount(entries, '129')).toBe(2)
    expect(getSameFormKeepNetCount(entries, '129-alola')).toBe(1)
  })

  test('pays stored items and one species Research XP per kept Pokemon on capture', () => {
    const entries: FishingKeepNetEntry[] = [
      { id: '1', type: 'pokemon', speciesId: 129, formId: '129', isShiny: false, isAlpha: false },
      { id: '2', type: 'pokemon', speciesId: 129, formId: '129', isShiny: true, isAlpha: false },
      { id: '3', type: 'item', itemId: 'water-gem', quantity: 1 },
      { id: '4', type: 'item', currencyId: 'pokedollars', quantity: 250 },
      { id: '5', type: 'item', currencyId: 'crystals', quantity: 15 },
    ]

    expect(buildFishingKeepNetCaptureRewards(entries, '129')).toEqual([
      { type: 'pokemon_research_xp', targetId: '129', quantity: 1, dropChance: 100 },
      { type: 'pokemon_research_xp', targetId: '129', quantity: 1, dropChance: 100 },
      { type: 'item', targetId: 'water-gem', quantity: 1, dropChance: 100 },
      { type: 'currency', targetId: 'pokedollars', quantity: 250, dropChance: 100 },
      { type: 'currency', targetId: 'crystals', quantity: 27, dropChance: 100 },
    ])
  })

  test('scales stored crystals by the captured form count up to five times', () => {
    const entries: FishingKeepNetEntry[] = [
      ...Array.from({ length: 10 }, (_, index) => ({
        id: `magikarp-${index}`,
        type: 'pokemon' as const,
        speciesId: 129,
        formId: '129',
        isShiny: false,
        isAlpha: false,
      })),
      { id: 'crystals', type: 'item', currencyId: 'crystals', quantity: 5 },
    ]

    expect(buildFishingKeepNetCaptureRewards(entries, '129').at(-1)).toEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 25,
      dropChance: 100,
    })
    expect(buildFishingKeepNetCaptureRewards(entries, '130').at(-1)).toEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 5,
      dropChance: 100,
    })
  })

  test('multiplies only Explorer XP and never exceeds five times', () => {
    const rewards: Reward[] = [
      { type: 'xp', skill: 'catching', quantity: 10 },
      { type: 'xp', skill: 'catching', quantity: { min: 2, max: 3 } },
      { type: 'xp', skill: 'training', quantity: 10 },
      { type: 'item', targetId: 'water-gem', quantity: 2 },
    ]

    expect(applyFishingExplorerXpMultiplier(rewards, 2)).toEqual([
      { ...rewards[0], quantity: 20 },
      { ...rewards[1], quantity: { min: 4, max: 6 } },
      rewards[2],
      rewards[3],
    ])
    expect(applyFishingExplorerXpMultiplier(rewards, 8)[0]).toEqual({
      ...rewards[0],
      quantity: 50,
    })
    expect(rewards[0].quantity).toBe(10)
  })
})
