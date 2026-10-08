import { describe, expect, test } from 'bun:test'
import type { Reward } from '@/data/types'
import {
  applyFishingExplorerXpMultiplier,
  buildFishingKeepNetCaptureRewards,
  getFishingAlphaChanceMultiplier,
  getFishingExplorerXpMultiplier,
  getFishingItemChance,
  getFishingShinyChanceMultiplier,
  getSameSpeciesKeepNetCount,
  type FishingKeepNetEntry,
} from '@/utilities/fishing/keep-net'

describe('fishing keep net', () => {
  test('scales item chance and caught-Pokemon Explorer XP with net occupancy', () => {
    expect(getFishingItemChance(0)).toBe(30)
    expect(getFishingItemChance(5)).toBe(35)
    expect(getFishingItemChance(10)).toBe(40)
    expect(getFishingItemChance(20)).toBe(40)

    expect(getFishingExplorerXpMultiplier(0)).toBe(1)
    expect(getFishingExplorerXpMultiplier(5)).toBe(2)
    expect(getFishingExplorerXpMultiplier(10)).toBe(3)
    expect(getFishingExplorerXpMultiplier(20)).toBe(3)
  })

  test('applies matching-species Alpha and Shiny odds at the requested thresholds', () => {
    expect(getFishingAlphaChanceMultiplier(2)).toBe(1)
    expect(getFishingAlphaChanceMultiplier(3)).toBe(1.2)
    expect(getFishingShinyChanceMultiplier(6)).toBe(1)
    expect(getFishingShinyChanceMultiplier(7)).toBe(1.1)
  })

  test('counts matching Pokemon by species form and ignores item slots', () => {
    const entries: FishingKeepNetEntry[] = [
      { id: '1', type: 'pokemon', speciesId: 129, formId: '129', isShiny: false, isAlpha: false },
      { id: '2', type: 'pokemon', speciesId: 129, formId: '129', isShiny: true, isAlpha: false },
      { id: '3', type: 'pokemon', speciesId: 129, formId: '129-alola', isShiny: false, isAlpha: false },
      { id: '4', type: 'item', itemId: 'water-gem', quantity: 1 },
    ]

    expect(getSameSpeciesKeepNetCount(entries, 129, '129')).toBe(2)
    expect(getSameSpeciesKeepNetCount(entries, 129, '129-alola')).toBe(1)
  })

  test('pays stored items and one species Research XP per kept Pokemon on capture', () => {
    const entries: FishingKeepNetEntry[] = [
      { id: '1', type: 'pokemon', speciesId: 129, formId: '129', isShiny: false, isAlpha: false },
      { id: '2', type: 'pokemon', speciesId: 129, formId: '129', isShiny: true, isAlpha: false },
      { id: '3', type: 'item', itemId: 'water-gem', quantity: 1 },
      { id: '4', type: 'item', currencyId: 'pokedollars', quantity: 250 },
      { id: '5', type: 'item', currencyId: 'crystals', quantity: 15 },
    ]

    expect(buildFishingKeepNetCaptureRewards(entries)).toEqual([
      { type: 'pokemon_research_xp', targetId: '129', quantity: 1, dropChance: 100 },
      { type: 'pokemon_research_xp', targetId: '129', quantity: 1, dropChance: 100 },
      { type: 'item', targetId: 'water-gem', quantity: 1, dropChance: 100 },
      { type: 'currency', targetId: 'pokedollars', quantity: 250, dropChance: 100 },
      { type: 'currency', targetId: 'crystals', quantity: 15, dropChance: 100 },
    ])
  })

  test('multiplies only Explorer XP and never exceeds three times', () => {
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
      quantity: 30,
    })
    expect(rewards[0].quantity).toBe(10)
  })
})
