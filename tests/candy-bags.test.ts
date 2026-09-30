import { describe, expect, test } from 'bun:test'
import { artisanRecipes } from '@/data/artisan'
import { items } from '@/data/items'
import {
  getPokemonItemEffectLabel,
  getPokemonItemUnavailableReason,
} from '@/utilities/pokemon/item-usability'
import {
  resolveCraftRewards,
  shouldConsumeCraftCosts,
  shouldFailCraft,
} from '@/utilities/artisan/rewards'

const BAG_CONFIGS = [
  ['rare-candy-xs-bag', 20, 1, 19, 2, 'rare-candy-xs'],
  ['rare-candy-m-bag', 40, 20, 39, 20, 'rare-candy-m'],
  ['rare-candy-xl-bag', 60, 40, 59, 40, 'rare-candy-xl'],
  ['rare-candy-mega-bag', 80, 60, 79, 60, 'rare-candy-mega'],
  ['rare-candy-tera-bag', 100, 80, 99, 80, 'rare-candy-tera'],
] as const

describe('Candy Bags', () => {
  test('define every candy tier as a capped level-setting item', () => {
    for (const [
      itemId,
      targetLevel,
      minLevel,
      maxLevel,
      artisanLevel,
      candyId,
    ] of BAG_CONFIGS) {
      const item = items.find((entry) => entry.id === itemId)
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-${itemId}`,
      )

      expect(item).toMatchObject({
        id: itemId,
        name: expect.stringContaining('Bag'),
        category: 'candy',
        effects: {
          setLevel: targetLevel,
          minLevel,
          maxLevel,
        },
      })
      expect(recipe).toMatchObject({
        artisanLevel,
        costs: [{ id: candyId, amount: 10 }],
        rewards: [
          { type: 'item', targetId: itemId, quantity: 1, dropChance: 100 },
        ],
        craftType: 'balance',
        fail: true,
        materialFailQualities: [],
        bulk: 2,
        requirements: [
          { type: 'task_completed', targetId: 'fuchsia-build-in-bulk' },
        ],
      })
    }
  })

  test('bad crafts fail without consuming candy while good and perfect crafts succeed', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-rare-candy-xs-bag',
    )
    expect(recipe).toBeDefined()
    if (!recipe) return

    expect(shouldFailCraft(recipe, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(recipe, 'bad')).toBe(false)
    expect(resolveCraftRewards(recipe, 'bad')).toEqual([])
    expect(shouldFailCraft(recipe, 'good')).toBe(false)
    expect(shouldConsumeCraftCosts(recipe, 'good')).toBe(true)
    expect(resolveCraftRewards(recipe, 'good')).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-xs-bag',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('bags only appear for Pokemon inside their candy tier', () => {
    const bag = items.find((item) => item.id === 'rare-candy-xs-bag')
    expect(bag).toBeDefined()
    if (!bag) return

    expect(getPokemonItemEffectLabel(bag)).toBe('Level → 20')
    expect(getPokemonItemUnavailableReason(bag, { level: 1 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 19 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 20 })).toContain(
      'up to level 19',
    )
  })
})
