import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import { getPokemonItemEffectLabel } from '@/utilities/pokemon/item-usability'

const CANDY_IDS = [
  'rare-candy-xs',
  'rare-candy-s',
  'rare-candy-m',
  'rare-candy-l',
  'rare-candy-xl',
  'rare-candy-xxl',
  'rare-candy-mega',
  'rare-candy-giga',
  'rare-candy-tera',
  'rare-candy-max',
]

describe('Candy level-ups', () => {
  test('all candy tiers always raise a level when their tier and badge cap allow it', () => {
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
