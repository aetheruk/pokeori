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
  ['rare-candy-xs-bag', 1000, 1, 2, 'rare-candy-xs'],
  ['rare-candy-m-bag', 8000, 20, 20, 'rare-candy-m'],
  ['rare-candy-xl-bag', 30000, 40, 40, 'rare-candy-xl'],
  ['rare-candy-mega-bag', 100000, 60, 60, 'rare-candy-mega'],
  ['rare-candy-tera-bag', 300000, 80, 80, 'rare-candy-tera'],
] as const

describe('Candy Bags', () => {
  test('define every bag with ten candies worth of XP and the same minimum level', () => {
    for (const [
      itemId,
      experience,
      minLevel,
      artisanLevel,
      candyId,
    ] of BAG_CONFIGS) {
      const item = items.find((entry) => entry.id === itemId)
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-${itemId}`,
      )

      expect(item).toMatchObject({
        id: itemId,
        category: 'candy',
        effects: {
          grantPokemonExperience: experience,
          minLevel,
        },
      })
      expect(item?.name).toContain('Bag')
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

  test('XS bags remain available above the former tier ceiling', () => {
    const bag = items.find((item) => item.id === 'rare-candy-xs-bag')
    expect(bag).toBeDefined()
    if (!bag) return

    expect(getPokemonItemEffectLabel(bag)).toBe('XP +1,000')
    expect(getPokemonItemUnavailableReason(bag, { level: 1 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 19 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 20 })).toBeNull()
    expect(getPokemonItemUnavailableReason(bag, { level: 99 })).toBeNull()
  })
})
