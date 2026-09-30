import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { getPokemonItemEffectLabel } from '@/utilities/pokemon/item-usability'

const CANDY_IDS = [
  'rare-candy-xs',
  'rare-candy-m',
  'rare-candy-xl',
  'rare-candy-mega',
  'rare-candy-tera',
]

describe('Candy level-ups', () => {
  test('all five candy tiers and bags always raise levels when tier and badge cap allow it', () => {
    for (const itemId of CANDY_IDS) {
      const item = items.find((entry) => entry.id === itemId)
      expect(item?.description).not.toContain('chance')
      expect(getPokemonItemEffectLabel(item!)).toBe('Level +1')
    }

    for (const itemId of CANDY_IDS) {
      const item = items.find((entry) => entry.id === `${itemId}-bag`)
      expect(item?.description).not.toContain('chance')
    }
  })
})
