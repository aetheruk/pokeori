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
  ['rare-candy-xs-bag', 10, 1, 9, 2, 'rare-candy-xs', undefined],
  ['rare-candy-s-bag', 20, 10, 19, 10, 'rare-candy-s', undefined],
  ['rare-candy-m-bag', 30, 20, 29, 20, 'rare-candy-m', undefined],
  ['rare-candy-l-bag', 40, 30, 39, 30, 'rare-candy-l', undefined],
  ['rare-candy-xl-bag', 50, 40, 49, 40, 'rare-candy-xl', 90],
  ['rare-candy-xxl-bag', 60, 50, 59, 50, 'rare-candy-xxl', 80],
  ['rare-candy-mega-bag', 70, 60, 69, 60, 'rare-candy-mega', 70],
  ['rare-candy-giga-bag', 80, 70, 79, 70, 'rare-candy-giga', 60],
  ['rare-candy-tera-bag', 90, 80, 89, 80, 'rare-candy-tera', 50],
  ['rare-candy-max-bag', 100, 90, 99, 90, 'rare-candy-max', 25],
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
      levelChance,
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
          setLevelChance: levelChance,
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

    expect(getPokemonItemEffectLabel(bag)).toBe('Level → 10')
    expect(getPokemonItemUnavailableReason(bag, { level: 1 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 9 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 10 })).toContain(
      'up to level 9',
    )
  })
})
