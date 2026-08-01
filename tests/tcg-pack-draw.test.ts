import { describe, expect, test } from 'bun:test'
import {
  buildTcgBoosterPackDraws,
  getTcgBoosterSlotRarityWeights,
  normalizeTcgPackRarity,
} from '@/utilities/tcg/tcg-card-draw'
import { getTcgSetById } from '@/utilities/tcg/tcg'

function fixedRng(value: number) {
  return () => value
}

function sequenceRng(values: number[], fallback = 0.5) {
  const queue = [...values]
  return () => queue.shift() ?? fallback
}

describe('TCG booster pack draw balance', () => {
  test('normalizes the synced API rarity strings into general and chase buckets', () => {
    expect(normalizeTcgPackRarity('Common')).toBe('common')
    expect(normalizeTcgPackRarity('Promo')).toBe('common')
    expect(normalizeTcgPackRarity('Uncommon')).toBe('uncommon')
    expect(normalizeTcgPackRarity('Rare')).toBe('rare')
    expect(normalizeTcgPackRarity('Rare Holo')).toBe('rare')
    expect(normalizeTcgPackRarity('Rare Holo GX')).toBe('rare')
    expect(normalizeTcgPackRarity('Rare Holo VSTAR')).toBe('rare')
    expect(normalizeTcgPackRarity('Illustration Rare')).toBe('rare')
    expect(normalizeTcgPackRarity('Rare Secret')).toBe('chase')
    expect(normalizeTcgPackRarity('Special Illustration Rare')).toBe('chase')
    expect(normalizeTcgPackRarity('Rare Rainbow')).toBe('chase')
    expect(normalizeTcgPackRarity('Hyper Rare')).toBe('chase')
    expect(normalizeTcgPackRarity('unknown future rarity')).toBe('common')
  })

  test('uses the requested 65/20/14/1 odds for every normal slot', () => {
    expect(getTcgBoosterSlotRarityWeights(false)).toEqual({
      common: 65,
      uncommon: 20,
      rare: 14,
      chase: 1,
    })
    // Bulk opening uses the same per-slot table; it no longer has a separate
    // rare-slot penalty because every slot is already independently rolled.
    expect(getTcgBoosterSlotRarityWeights(true)).toEqual({
      common: 65,
      uncommon: 20,
      rare: 14,
      chase: 1,
    })
  })

  test('five-card packs roll every slot independently and can contain multiple rares', () => {
    const [pack] = buildTcgBoosterPackDraws({
      setId: 'base1',
      cardsPerPack: 5,
      // 0.9 selects the rare bucket (base1 has no chase cards) for each slot.
      rng: fixedRng(0.9),
    })

    expect(pack.godPack).toBe(false)
    expect(pack.cards).toHaveLength(5)
    expect(pack.cards.every((card) => normalizeTcgPackRarity(card.rarity) === 'rare')).toBe(true)
  })

  test('chase slots prefer cards missing from the collection', () => {
    const chaseCards = getTcgSetById('me5')?.cards.filter(
      (card) => normalizeTcgPackRarity(card.rarity) === 'chase',
    )
    expect(chaseCards?.length).toBeGreaterThan(1)

    const unownedChaseCard = chaseCards?.[0]
    if (!unownedChaseCard || !chaseCards) throw new Error('Expected synced me5 chase cards')

    const collection = Object.fromEntries(
      chaseCards.slice(1).map((card) => [card.id, 1]),
    )
    const [pack] = buildTcgBoosterPackDraws({
      setId: 'me5',
      cardsPerPack: 2,
      collection,
      // god-pack roll, then chase bucket/card rolls for each slot
      rng: sequenceRng([0.999, 0.999, 0.5, 0.999, 0.5]),
    })

    expect(pack.cards).toHaveLength(2)
    expect(pack.cards.map((card) => normalizeTcgPackRarity(card.rarity))).toEqual([
      'chase',
      'chase',
    ])
    expect(pack.cards[0]?.id).toBe(unownedChaseCard.id)
    // The unowned card is not repeated in the same pack; all other chase cards
    // were already owned, so the second slot may fall back to a duplicate.
    expect(pack.cards[1]?.id).not.toBe(unownedChaseCard.id)
  })

  test('chase duplicates are allowed once every chase card is owned', () => {
    const chaseCards = getTcgSetById('me5')?.cards.filter(
      (card) => normalizeTcgPackRarity(card.rarity) === 'chase',
    )
    if (!chaseCards || chaseCards.length === 0) throw new Error('Expected synced me5 chase cards')

    const collection = Object.fromEntries(chaseCards.map((card) => [card.id, 1]))
    const [pack] = buildTcgBoosterPackDraws({
      setId: 'me5',
      cardsPerPack: 2,
      collection,
      rng: fixedRng(0.999),
    })

    expect(pack.cards).toHaveLength(2)
    expect(pack.cards.every((card) => normalizeTcgPackRarity(card.rarity) === 'chase')).toBe(true)
  })

  test('God Packs turn every slot into a rare-or-better slot', () => {
    const [pack] = buildTcgBoosterPackDraws({
      setId: 'base1',
      cardsPerPack: 5,
      rng: fixedRng(0),
    })

    expect(pack.godPack).toBe(true)
    expect(pack.cards).toHaveLength(5)
    expect(pack.cards.every((card) => normalizeTcgPackRarity(card.rarity) === 'rare')).toBe(true)
  })
})
