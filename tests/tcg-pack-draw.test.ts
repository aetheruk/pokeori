import { describe, expect, test } from 'bun:test'
import {
  buildTcgBoosterPackDraws,
  getTcgBoosterRareSlotWeights,
  normalizeTcgPackRarity,
} from '@/utilities/tcg/tcg-card-draw'

function fixedRng(value: number) {
  return () => value
}

function sequenceRng(values: number[], fallback = 0.5) {
  const queue = [...values]
  return () => queue.shift() ?? fallback
}

describe('TCG booster pack draw balance', () => {
  test('normalizes API rarity strings into pack buckets', () => {
    expect(normalizeTcgPackRarity('Common')).toBe('common')
    expect(normalizeTcgPackRarity('Uncommon')).toBe('uncommon')
    expect(normalizeTcgPackRarity('Rare')).toBe('rare')
    expect(normalizeTcgPackRarity('Rare Holo')).toBe('holoRare')
    expect(normalizeTcgPackRarity('Rare Holo GX')).toBe('ultra')
    expect(normalizeTcgPackRarity('Rare Secret')).toBe('secret')
    expect(normalizeTcgPackRarity('Rare Rainbow')).toBe('chase')
  })

  test('five-card packs use common, uncommon, and rare slots', () => {
    const [pack] = buildTcgBoosterPackDraws({
      setId: 'base1',
      cardsPerPack: 5,
      rng: fixedRng(0.5),
    })

    expect(pack.godPack).toBe(false)
    expect(pack.cards).toHaveLength(5)
    expect(pack.cards.slice(0, 3).map((card) => normalizeTcgPackRarity(card.rarity))).toEqual([
      'common',
      'common',
      'common',
    ])
    expect(normalizeTcgPackRarity(pack.cards[3].rarity)).toBe('uncommon')
    expect(['rare', 'holoRare', 'ultra', 'secret', 'chase']).toContain(
      normalizeTcgPackRarity(pack.cards[4].rarity),
    )
  })

  test('bulk penalty moves ten percent of rarer-slot weight into plain rares', () => {
    expect(getTcgBoosterRareSlotWeights(false)).toEqual({
      rare: 70,
      holoRare: 18,
      ultra: 8,
      secret: 3,
      chase: 1,
    })
    expect(getTcgBoosterRareSlotWeights(true)).toEqual({
      rare: 73,
      holoRare: 16.2,
      ultra: 7.2,
      secret: 2.7,
      chase: 0.9,
    })
  })

  test('God Packs turn every non-promo slot into a rare-or-better slot', () => {
    const [pack] = buildTcgBoosterPackDraws({
      setId: 'base1',
      cardsPerPack: 5,
      rng: sequenceRng([0]),
    })

    expect(pack.godPack).toBe(true)
    expect(pack.cards).toHaveLength(5)
    expect(pack.cards.every((card) => normalizeTcgPackRarity(card.rarity) === 'rare')).toBe(true)
  })
})
