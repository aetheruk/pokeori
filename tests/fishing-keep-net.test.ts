import { describe, expect, test } from 'bun:test'
import {
  applyFishingCatchCrystalMultiplier,
  buildFishingKeepNetCaptureRewards,
  getFishingAlphaChanceMultiplier,
  getFishingCatchCrystalMultiplier,
  getFishingExplorerXpBonus,
  getFishingItemChance,
  getFishingShinyChanceMultiplier,
  getSameFormKeepNetCount,
  type FishingKeepNetEntry,
} from '@/utilities/fishing/keep-net'

describe('fishing keep net', () => {
  test('scales item chance by total net occupancy', () => {
    expect(getFishingItemChance(0)).toBe(30)
    expect(getFishingItemChance(5)).toBe(35)
    expect(getFishingItemChance(10)).toBe(40)
    expect(getFishingItemChance(20)).toBe(40)

  })

  test('adds Explorer XP using only Pokemon in the net', () => {
    const pokemon = (id: string): FishingKeepNetEntry => ({
      id,
      type: 'pokemon',
      speciesId: 129,
      formId: '129',
      isShiny: false,
      isAlpha: false,
    })
    const item: FishingKeepNetEntry = {
      id: 'item',
      type: 'item',
      itemId: 'water-gem',
      quantity: 1,
    }

    expect(getFishingExplorerXpBonus(10, 20, [])).toBe(10)
    expect(getFishingExplorerXpBonus(10, 20, [
      ...Array.from({ length: 5 }, (_, index) => pokemon(`${index}`)),
      ...Array.from({ length: 5 }, (_, index) => ({ ...item, id: `item-${index}` })),
    ])).toBe(120)
    expect(getFishingExplorerXpBonus(10, 20, [
      ...Array.from({ length: 10 }, (_, index) => pokemon(`${index}`)),
      item,
    ])).toBe(230)
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

    expect(buildFishingKeepNetCaptureRewards(entries)).toEqual([
      { type: 'pokemon_research_xp', targetId: '129', quantity: 1, dropChance: 100 },
      { type: 'pokemon_research_xp', targetId: '129', quantity: 1, dropChance: 100 },
      { type: 'item', targetId: 'water-gem', quantity: 1, dropChance: 100 },
      { type: 'currency', targetId: 'pokedollars', quantity: 250, dropChance: 100 },
      { type: 'currency', targetId: 'crystals', quantity: 15, dropChance: 100 },
    ])
  })

  test('scales the normal catch crystal reward by matching form count up to five times', () => {
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

    expect(applyFishingCatchCrystalMultiplier({
      type: 'currency',
      targetId: 'crystals',
      quantity: 15,
      dropChance: 100,
    }, getFishingCatchCrystalMultiplier(getSameFormKeepNetCount(entries, '129')))).toEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 75,
      dropChance: 100,
    })
    expect(applyFishingCatchCrystalMultiplier({
      type: 'currency',
      targetId: 'crystals',
      quantity: 15,
      dropChance: 100,
    }, getFishingCatchCrystalMultiplier(getSameFormKeepNetCount(entries, '130')))).toEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 15,
      dropChance: 100,
    })
    expect(buildFishingKeepNetCaptureRewards(entries).at(-1)).toEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 5,
      dropChance: 100,
    })
  })

})
