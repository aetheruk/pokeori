import { describe, expect, test } from 'bun:test'
import { artisanRecipes } from '@/data/artisan'
import { battles } from '@/data/battles'
import { allGames } from '@/data/games'
import { items } from '@/data/items'
import { candyItems } from '@/data/items/entries/candies'
import { locations } from '@/data/locations'
import { tasks } from '@/data/tasks'
import {
  getArtisanBalancePosition,
  getArtisanBalanceQuality,
  getArtisanCraftQuality,
  getArtisanCrushQuality,
  getArtisanHoldBarWindow,
  getArtisanHoldQuality,
  getArtisanMixQuality,
  getArtisanScatterQuality,
  type ArtisanCraftTimingWindow,
} from '@/utilities/artisan/craft-quality'
import {
  getArtisanCraftRequiredLevel,
  getPrimaryOutputRewardIndex,
  resolveCraftRewards,
  resolveArtisanCraftMultiplier,
  scaleArtisanCosts,
  shouldConsumeCraftCosts,
  shouldFailCraft,
} from '@/utilities/artisan/rewards'
import type { ArtisanRecipe } from '@/data/artisan'

const powderTiers = ['xs', 's', 'm', 'l', 'xl'] as const

function expectedPokePowderForLevel(level: number) {
  const tierIndex = Math.min(powderTiers.length - 1, Math.floor(level / 20))
  return `poke-powder-${powderTiers[tierIndex]}`
}

const expectedPowderByCandyId: Record<
  string,
  {
    id: string
    name: string
    recipeName: string
    outputQuantity: { min: number; max: number }
  }
> = {
  'rare-candy-xs': {
    id: 'poke-powder-xs',
    name: 'XS PokePowder',
    recipeName: 'XS PokePowder',
    outputQuantity: { min: 1, max: 3 },
  },
  'rare-candy-s': {
    id: 'poke-powder-xs',
    name: 'XS PokePowder',
    recipeName: 'XS PokePowder EX',
    outputQuantity: { min: 1, max: 5 },
  },
  'rare-candy-m': {
    id: 'poke-powder-s',
    name: 'S PokePowder',
    recipeName: 'S PokePowder',
    outputQuantity: { min: 1, max: 3 },
  },
  'rare-candy-l': {
    id: 'poke-powder-s',
    name: 'S PokePowder',
    recipeName: 'S PokePowder EX',
    outputQuantity: { min: 1, max: 5 },
  },
  'rare-candy-xl': {
    id: 'poke-powder-m',
    name: 'M PokePowder',
    recipeName: 'M PokePowder',
    outputQuantity: { min: 1, max: 3 },
  },
  'rare-candy-xxl': {
    id: 'poke-powder-m',
    name: 'M PokePowder',
    recipeName: 'M PokePowder EX',
    outputQuantity: { min: 1, max: 5 },
  },
  'rare-candy-mega': {
    id: 'poke-powder-l',
    name: 'L PokePowder',
    recipeName: 'L PokePowder',
    outputQuantity: { min: 1, max: 3 },
  },
  'rare-candy-giga': {
    id: 'poke-powder-l',
    name: 'L PokePowder',
    recipeName: 'L PokePowder EX',
    outputQuantity: { min: 1, max: 5 },
  },
  'rare-candy-tera': {
    id: 'poke-powder-xl',
    name: 'XL PokePowder',
    recipeName: 'XL PokePowder',
    outputQuantity: { min: 1, max: 3 },
  },
  'rare-candy-max': {
    id: 'poke-powder-xl',
    name: 'XL PokePowder',
    recipeName: 'XL PokePowder EX',
    outputQuantity: { min: 1, max: 5 },
  },
}

describe('artisan recipes', () => {
  test('contains direct nut to dye processing recipes and dried dye recipes', () => {
    expect(
      artisanRecipes.some((recipe) => recipe.id.startsWith('extract-')),
    ).toBe(false)

    const expectedPaintCosts = {
      'paint-red': 'nut-red',
      'paint-blue': 'nut-blue',
      'paint-yellow': 'nut-yellow',
      'paint-green': 'nut-green',
      'paint-purple': 'nut-purple',
      'paint-white': 'nut-white',
      'paint-black': 'nut-black',
    }
    const expectedPaintLevels = {
      'paint-red': 1,
      'paint-blue': 21,
      'paint-yellow': 28,
      'paint-green': 14,
      'paint-purple': 7,
      'paint-white': 40,
      'paint-black': 40,
    }

    for (const [paintId, nutId] of Object.entries(expectedPaintCosts)) {
      const recipe = artisanRecipes.find((entry) => entry.id === paintId)
      const nut = items.find((item) => item.id === nutId)
      const color = paintId.replace('paint-', '')
      const driedRecipe = artisanRecipes.find(
        (entry) => entry.id === `dried-${color}`,
      )
      const driedDye = items.find((item) => item.id === `dried-${color}`)

      expect(recipe?.costs).toEqual([{ id: nutId, amount: 1 }])
      expect(recipe?.artisanLevel).toBe(
        expectedPaintLevels[paintId as keyof typeof expectedPaintLevels],
      )
      expect(recipe?.bulk).toBe(5)
      expect(nut?.category).toBe('misc')
      expect(nut?.battleEffect).toBeUndefined()
      expect(nut?.heldConfig).toBeUndefined()
      expect(nut?.effects).toBeUndefined()
      expect(driedDye?.category).toBe('misc')
      expect(driedRecipe?.artisanLevel).toBe(recipe!.artisanLevel + 3)
      expect(driedRecipe?.craftType).toBe('balance')
      expect(driedRecipe?.costs).toEqual([{ id: paintId, amount: 5 }])
      expect(driedRecipe?.rewards).toContainEqual({
        type: 'item',
        targetId: `dried-${color}`,
        quantity: 1,
        dropChance: 100,
      })
    }
  })

  test('type lure recipes exist for all 18 core pokemon types across three tiers', () => {
    const lureRecipes = artisanRecipes.filter(
      (recipe) => recipe.id.startsWith('craft-') && recipe.id.endsWith('-lure'),
    )
    expect(lureRecipes.length).toBe(54)
  })

  test('type lure recipes use tiered gems, matching material, and level-relevant PokePowder', () => {
    const lureRecipes = artisanRecipes.filter(
      (recipe) => recipe.category === 'lures',
    )

    for (const recipe of lureRecipes) {
      expect(recipe.craftType).toBe('balance')
      expect(recipe.name.startsWith('Craft ')).toBe(false)
      expect(recipe.costs).toHaveLength(3)
      const expectedGemAmount =
        recipe.id.startsWith('craft-advanced-') ||
        recipe.id.startsWith('craft-master-')
          ? 5
          : 2
      expect(
        recipe.costs.find((cost) => cost.id.endsWith('-gem'))?.amount,
      ).toBe(expectedGemAmount)
      expect(recipe.costs.some((cost) => cost.id.startsWith('paint-'))).toBe(
        false,
      )
      expect(recipe.costs).toContainEqual({
        id: expectedPokePowderForLevel(recipe.artisanLevel),
        amount: 1,
      })
      expect(recipe.bulk).toBe(3)
      expect(getArtisanCraftRequiredLevel(recipe, 3)).toBe(
        recipe.artisanLevel + 5,
      )
      expect(recipe.requirements).toContainEqual({
        type: 'skill_level',
        targetId: 'researching',
        count: recipe.artisanLevel,
      })

      if (recipe.id === 'craft-water-lure') {
        expect(recipe.costs).toContainEqual({ id: 'water-gem', amount: 2 })
        expect(recipe.costs).toContainEqual({
          id: 'aqua-solvent-t1',
          amount: 2,
        })
        expect(recipe.artisanLevel).toBe(10)
      } else if (recipe.id === 'craft-advanced-water-lure') {
        expect(recipe.costs).toContainEqual({ id: 'water-gem', amount: 5 })
        expect(recipe.costs).toContainEqual({
          id: 'aqua-solvent-t1',
          amount: 2,
        })
        expect(recipe.artisanLevel).toBe(40)
      } else if (recipe.id === 'craft-master-water-lure') {
        expect(recipe.costs).toContainEqual({
          id: 'pristine-water-gem',
          amount: 5,
        })
        expect(recipe.costs).toContainEqual({
          id: 'aqua-solvent-t3',
          amount: 2,
        })
        expect(recipe.artisanLevel).toBe(70)
      } else if (recipe.id === 'craft-normal-lure') {
        expect(recipe.costs).toContainEqual({ id: 'soft-fluff-t1', amount: 2 })
      } else if (!recipe.id.includes('water-lure')) {
        expect(
          recipe.costs.some((cost) => cost.id.startsWith('aqua-solvent-')),
        ).toBe(false)
      }
    }
  })

  test('premier ball uses white dye and waits for later authoring', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-premier-ball',
    )

    expect(recipe?.artisanLevel).toBe(100)
    expect(recipe?.costs).toContainEqual({ id: 'paint-white', amount: 1 })
    expect(recipe?.costs).toContainEqual({ id: 'poke-powder-xl', amount: 2 })
    expect(recipe?.costs.some((cost) => cost.id === 'paint-red')).toBe(false)
  })

  test('net ball is the authored early specialty ball recipe', () => {
    const recipe = artisanRecipes.find((entry) => entry.id === 'craft-net-ball')
    const bugGodFinal = tasks.find((task) => task.id === 'bug-maniac-trade-3')

    expect(recipe?.artisanLevel).toBe(16)
    expect(recipe?.costs).toContainEqual({ id: 'paint-green', amount: 1 })
    expect(recipe?.costs.some((cost) => cost.id === 'paint-blue')).toBe(false)
    expect(recipe?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'net-ball-manual',
    })
    expect(bugGodFinal?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'net-ball-manual',
    })
  })

  test('great ball unlocks with blue dye at Artisan 25', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-great-ball',
    )

    expect(recipe?.artisanLevel).toBe(25)
    expect(recipe?.costs).toContainEqual({ id: 'paint-blue', amount: 1 })
  })

  test('luxury ball uses black dye', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-luxury-ball',
    )

    expect(recipe?.artisanLevel).toBe(100)
    expect(recipe?.costs).toContainEqual({ id: 'paint-black', amount: 1 })
    expect(recipe?.costs.some((cost) => cost.id === 'paint-yellow')).toBe(false)
  })

  test('concentrated beast recipes unlock from fused stone random events and craft once', () => {
    const elements = ['fire', 'thunder', 'water'] as const

    for (const element of elements) {
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-concentrated-${element}`,
      )
      const output = items.find((item) => item.id === `concentrated-${element}`)

      expect(output).toMatchObject({
        category: 'key',
        unique: true,
      })
      expect(recipe).toBeDefined()
      expect(recipe?.category).toBe('quests')
      expect(recipe?.artisanLevel).toBe(50)
      expect(recipe?.craftType).toBe('mix')
      expect(recipe?.outputQuantity).toEqual({ min: 1, max: 1 })
      expect(recipe?.costs).toEqual([
        { id: 'rainbow-feather', amount: 1 },
        { id: 'poke-powder-m', amount: 100 },
        { id: `lifeless-${element}`, amount: 1 },
      ])
      expect(recipe?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: `beast-stones-${element}`,
      })
      expect(recipe?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: `concentrated-${element}`,
        inverse: true,
      })
      expect(recipe?.rewards).toContainEqual({
        type: 'item',
        targetId: `concentrated-${element}`,
        quantity: 1,
        dropChance: 100,
      })
    }
  })

  test('concentrated branch recipes unlock from fused branch random events and craft once', () => {
    const branches = ['flaming', 'charged', 'frozen'] as const

    for (const branch of branches) {
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-concentrated-${branch}-branch`,
      )
      const output = items.find(
        (item) => item.id === `concentrated-${branch}-branch`,
      )

      expect(output).toMatchObject({
        category: 'key',
        unique: true,
      })
      expect(recipe).toBeDefined()
      expect(recipe?.category).toBe('quests')
      expect(recipe?.artisanLevel).toBe(35)
      expect(recipe?.craftType).toBe('mix')
      expect(recipe?.outputQuantity).toEqual({ min: 1, max: 1 })
      expect(recipe?.costs).toEqual([
        { id: 'silver-feather', amount: 1 },
        { id: 'poke-powder-s', amount: 100 },
        { id: `lifeless-${branch}-branch`, amount: 1 },
      ])
      expect(recipe?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: `bird-branches-${branch}`,
      })
      expect(recipe?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: `concentrated-${branch}-branch`,
        inverse: true,
      })
      expect(recipe?.rewards).toContainEqual({
        type: 'item',
        targetId: `concentrated-${branch}-branch`,
        quantity: 1,
        dropChance: 100,
      })
    }
  })

  test('all recipes have categories, valid outputs, and resolvable item references', () => {
    const itemIds = new Set(items.map((item) => item.id))

    for (const recipe of artisanRecipes) {
      expect([
        'materials',
        'balls',
        'lures',
        'held',
        'items',
        'quests',
      ]).toContain(recipe.category)
      expect(recipe.outputQuantity.min).toBeGreaterThanOrEqual(0)
      expect(recipe.outputQuantity.max).toBeGreaterThanOrEqual(
        recipe.outputQuantity.min,
      )
      expect(recipe.artisanLevel).toBeGreaterThanOrEqual(1)
      expect(recipe.artisanLevel).toBeLessThanOrEqual(100)
      expect(['precise', 'crush', 'balance', 'mix', 'scatter']).toContain(
        recipe.craftType,
      )
      if (recipe.bulk !== undefined) {
        expect(Number.isInteger(recipe.bulk)).toBe(true)
        expect(recipe.bulk).toBeGreaterThan(1)
      }

      for (const cost of recipe.costs) {
        if (cost.type === 'currency') {
          expect(['crystals', 'pokedollars']).toContain(cost.id)
        } else {
          expect(itemIds.has(cost.id)).toBe(true)
        }
        expect(cost.amount).toBeGreaterThan(0)
      }

      for (const reward of recipe.rewards) {
        if (reward.type === 'item') {
          expect(itemIds.has(String(reward.targetId))).toBe(true)
        }
      }
    }
  })

  test('dye recipes use the crush craft type', () => {
    const paintRecipes = artisanRecipes.filter((recipe) =>
      recipe.rewards.some(
        (reward) =>
          reward.type === 'item' &&
          String(reward.targetId).startsWith('paint-'),
      ),
    )

    expect(paintRecipes.length).toBeGreaterThan(0)
    for (const recipe of paintRecipes) {
      expect(recipe.category).toBe('materials')
      expect(recipe.craftType).toBe('crush')
      expect(recipe.fail).toBe(true)
      expect(recipe.outputQuantity).toEqual({ min: 0, max: 2 })
      expect(resolveCraftRewards(recipe, 'bad')).toEqual([])
      expect(resolveCraftRewards(recipe, 'good')[0]).toMatchObject({
        quantity: 1,
      })
      expect(resolveCraftRewards(recipe, 'perfect')[0]).toMatchObject({
        quantity: 2,
      })
    }
  })

  test('potion recipe uses purple dye, aqua solvent, tiny powder, and the mix craft type', () => {
    const recipe = artisanRecipes.find((entry) => entry.id === 'mix-potion')

    expect(recipe?.category).toBe('items')
    expect(recipe?.artisanLevel).toBe(5)
    expect(recipe?.craftType).toBe('mix')
    expect(recipe?.costs).toEqual([
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'paint-purple', amount: 1 },
      { id: 'aqua-solvent-t1', amount: 1 },
    ])
    expect(recipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'battle-potion',
      quantity: 1,
      dropChance: 100,
    })
    expect(recipe?.fail).toBe(true)
    expect(recipe?.outputQuantity).toEqual({ min: 0, max: 2 })
    expect(resolveCraftRewards(recipe!, 'bad')).toEqual([])
    expect(resolveCraftRewards(recipe!, 'good')[0]).toMatchObject({
      quantity: 1,
    })
    expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
      quantity: 2,
    })
    expect(recipe?.bulk).toBe(3)
    expect(getArtisanCraftRequiredLevel(recipe!, 3)).toBe(10)
  })

  test('status remedy recipes unlock together and use berries, candy dust, and typed materials', () => {
    const expectedRecipes = [
      {
        id: 'mix-antidote',
        level: 22,
        output: 'antidote',
        costs: [
          { id: 'poke-powder-xs', amount: 2 },
          { id: 'pecha-berry', amount: 1 },
          { id: 'toxic-resin-t1', amount: 3 },
        ],
      },
      {
        id: 'mix-paralyze-heal',
        level: 22,
        output: 'paralyze-heal',
        costs: [
          { id: 'poke-powder-xs', amount: 2 },
          { id: 'cheri-berry', amount: 1 },
          { id: 'electric-component-t1', amount: 3 },
        ],
      },
      {
        id: 'mix-awakening',
        level: 22,
        output: 'awakening',
        costs: [
          { id: 'poke-powder-xs', amount: 2 },
          { id: 'chesto-berry', amount: 1 },
          { id: 'mind-thread-t1', amount: 3 },
        ],
      },
      {
        id: 'mix-burn-heal',
        level: 22,
        output: 'burn-heal',
        costs: [
          { id: 'poke-powder-xs', amount: 2 },
          { id: 'rawst-berry', amount: 1 },
          { id: 'aqua-solvent-t1', amount: 3 },
        ],
      },
      {
        id: 'mix-ice-heal',
        level: 22,
        output: 'ice-heal',
        costs: [
          { id: 'poke-powder-xs', amount: 2 },
          { id: 'aspear-berry', amount: 1 },
          { id: 'cinder-shard-t1', amount: 3 },
        ],
      },
    ]

    for (const expected of expectedRecipes) {
      const recipe = artisanRecipes.find((entry) => entry.id === expected.id)

      expect(recipe?.category).toBe('items')
      expect(recipe?.artisanLevel).toBe(expected.level)
      expect(recipe?.craftType).toBe('mix')
      expect(recipe?.costs).toEqual(expected.costs)
      expect(recipe?.bulk).toBe(3)
      expect(getArtisanCraftRequiredLevel(recipe!, 3)).toBe(expected.level + 5)
      expect(recipe?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.output,
        quantity: 1,
        dropChance: 100,
      })
      expect(recipe?.fail).toBe(true)
      expect(recipe?.outputQuantity).toEqual({ min: 0, max: 2 })
      expect(resolveCraftRewards(recipe!, 'bad')).toEqual([])
      expect(resolveCraftRewards(recipe!, 'good')[0]).toMatchObject({
        quantity: 1,
      })
      expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
        quantity: 2,
      })
    }
  })

  test('healing drink recipes use powder and tiered elemental materials', () => {
    const expectedRecipes = [
      {
        id: 'mix-fresh-water',
        level: 13,
        output: 'fresh-water',
        costs: [
          { id: 'poke-powder-xs', amount: 3 },
          { id: 'aqua-solvent-t1', amount: 1 },
          { id: 'water-gem', amount: 1 },
        ],
      },
      {
        id: 'mix-super-potion',
        level: 32,
        output: 'battle-super-potion',
        costs: [
          { id: 'poke-powder-s', amount: 1 },
          { id: 'paint-red', amount: 1 },
          { id: 'aqua-solvent-t1', amount: 3 },
        ],
      },
      {
        id: 'mix-soda-pop',
        level: 35,
        output: 'soda-pop',
        costs: [
          { id: 'poke-powder-s', amount: 1 },
          { id: 'aqua-solvent-t1', amount: 2 },
          { id: 'paint-blue', amount: 1 },
        ],
      },
      {
        id: 'mix-lemonade',
        level: 41,
        output: 'lemonade',
        costs: [
          { id: 'poke-powder-m', amount: 1 },
          { id: 'aqua-solvent-t1', amount: 2 },
          { id: 'paint-yellow', amount: 1 },
        ],
      },
    ]

    for (const expected of expectedRecipes) {
      const recipe = artisanRecipes.find((entry) => entry.id === expected.id)

      expect(recipe?.category).toBe('items')
      expect(recipe?.artisanLevel).toBe(expected.level)
      expect(recipe?.craftType).toBe('mix')
      expect(recipe?.costs).toEqual(expected.costs)
      expect(recipe?.bulk).toBe(3)
      expect(getArtisanCraftRequiredLevel(recipe!, 3)).toBe(expected.level + 5)
      expect(recipe?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.output,
        quantity: 1,
        dropChance: 100,
      })
      expect(recipe?.fail).toBe(true)
      expect(recipe?.outputQuantity).toEqual({ min: 0, max: 2 })
      expect(resolveCraftRewards(recipe!, 'bad')).toEqual([])
      expect(resolveCraftRewards(recipe!, 'good')[0]).toMatchObject({
        quantity: 1,
      })
      expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
        quantity: 2,
      })
    }
  })

  test('poke powder material recipes crush two matching candies', () => {
    const itemById = new Map(items.map((item) => [item.id, item]))
    const powderRecipes = artisanRecipes.filter((recipe) =>
      recipe.id.startsWith('craft-poke-powder-'),
    )
    const powderItems = items.filter((item) =>
      item.id.startsWith('poke-powder-'),
    )

    expect(powderRecipes.length).toBe(candyItems.length)
    expect(powderItems.map((item) => item.id).sort()).toEqual([
      'poke-powder-l',
      'poke-powder-m',
      'poke-powder-s',
      'poke-powder-xl',
      'poke-powder-xs',
    ])

    for (const [index, candy] of candyItems.entries()) {
      const tier = candy.id.replace('rare-candy-', '')
      const expectedPowder = expectedPowderByCandyId[candy.id]
      const powder = itemById.get(expectedPowder.id)
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-poke-powder-${tier}`,
      )
      const expectedLevel = index === 0 ? 2 : index * 10

      expect(powder).toBeDefined()
      expect(powder?.name).toBe(expectedPowder.name)
      expect(powder?.spriteId).toBe('silver-powder')
      expect(powder?.hueRotate).toBe(0)
      expect(recipe?.name).toBe(expectedPowder.recipeName)
      expect(recipe?.costs).toEqual([{ id: candy.id, amount: 2 }])
      expect(recipe?.rewards).toEqual([
        {
          type: 'item',
          targetId: expectedPowder.id,
          quantity: 1,
          dropChance: 100,
        },
      ])
      expect(recipe?.outputQuantity).toEqual(expectedPowder.outputQuantity)
      expect(recipe?.artisanLevel).toBe(expectedLevel)
      expect(recipe?.craftType).toBe('crush')
      expect(recipe?.bulk).toBe(5)
      expect(getArtisanCraftRequiredLevel(recipe!, 5)).toBe(expectedLevel + 5)
    }
  })

  test('day care fence recipe crafts one task item from wood scraps and hides after task progress', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-day-care-fence',
    )

    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('quests')
    expect(recipe?.artisanLevel).toBe(12)
    expect(recipe?.costs).toEqual([{ id: 'wood-scraps-t1', amount: 2 }])
    expect(recipe?.outputQuantity).toEqual({ min: 1, max: 1 })
    expect(recipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'day-care-fence-wood',
      quantity: 1,
      dropChance: 100,
    })
    expect(recipe?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'day-care-intro' },
        {
          type: 'task_completed',
          targetId: 'day-care-fixing-the-fence',
          inverse: true,
        },
        {
          type: 'item_owned',
          targetId: 'day-care-fence-wood',
          count: 5,
          inverse: true,
        },
      ]),
    )

    const rewards = resolveCraftRewards(recipe!, 'perfect')
    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'day-care-fence-wood',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('day care brick recipe consumes clay and only succeeds on good or perfect kiln work', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-day-care-clay-brick',
    )

    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('quests')
    expect(recipe?.artisanLevel).toBe(15)
    expect(recipe?.costs).toEqual([{ id: 'terra-dust-t1', amount: 1 }])
    expect(recipe?.bulk).toBeUndefined()
    expect(recipe?.craftType).toBe('mix')
    expect(recipe?.outputQuantity).toEqual({ min: 1, max: 2 })
    expect(recipe?.qualityOutputQuantity).toEqual({ good: 1, perfect: 2 })
    expect(recipe?.minimumQuality).toBe('good')
    expect(recipe?.materialFailQualities).toEqual(['bad'])
    expect(recipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'day-care-clay-brick',
      quantity: 1,
      dropChance: 100,
    })
    expect(recipe?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'day-care-building-repairs' },
        {
          type: 'task_completed',
          targetId: 'day-care-firing-the-bricks',
          inverse: true,
        },
        {
          type: 'item_owned',
          targetId: 'day-care-clay-brick',
          count: 100,
          inverse: true,
        },
      ]),
    )

    expect(shouldFailCraft(recipe!, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(recipe!, 'bad')).toBe(true)
    expect(resolveCraftRewards(recipe!, 'bad')).toEqual([])
    expect(resolveCraftRewards(recipe!, 'good')[0]).toMatchObject({
      type: 'item',
      targetId: 'day-care-clay-brick',
      quantity: 1,
    })
    expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
      type: 'item',
      targetId: 'day-care-clay-brick',
      quantity: 2,
    })
  })

  test('hiker clothes are stitched as a Route 9 quest craft', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-hiker-clothes',
    )

    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('quests')
    expect(recipe?.artisanLevel).toBe(15)
    expect(recipe?.costs).toEqual([
      { id: 'soft-fluff-t1', amount: 10 },
      { id: 'wing-feather-t1', amount: 6 },
    ])
    expect(recipe?.craftType).toBe('precise')
    expect(recipe?.outputQuantity).toEqual({ min: 1, max: 1 })
    expect(recipe?.minimumQuality).toBe('good')
    expect(recipe?.iconItemId).toBe('hiker-clothes')
    expect(recipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'hiker-clothes',
      quantity: 1,
      dropChance: 100,
    })
    expect(recipe?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'route-9-trail-clothes' },
        {
          type: 'task_completed',
          targetId: 'route-9-assemble-hiker-outfit',
          inverse: true,
        },
        {
          type: 'item_owned',
          targetId: 'hiker-clothes',
          count: 1,
          inverse: true,
        },
      ]),
    )

    expect(shouldFailCraft(recipe!, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(recipe!, 'bad')).toBe(false)
    expect(resolveCraftRewards(recipe!, 'good')[0]).toMatchObject({
      type: 'item',
      targetId: 'hiker-clothes',
      quantity: 1,
    })
  })

  test('tiny bug armour is a Jungle binder-gated scatter quest craft for the Bug God hand-in', () => {
    const item = items.find((entry) => entry.id === 'tiny-bug-armour')
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-tiny-bug-armour',
    )
    const task = tasks.find((entry) => entry.id === 'bug-god-tiny-armour')

    expect(item).toMatchObject({
      name: 'Tiny Bug Armour',
      spriteId: 'auspicious-armor',
      hueRotate: 95,
    })
    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('quests')
    expect(recipe?.craftType).toBe('scatter')
    expect(recipe?.artisanLevel).toBe(6)
    expect(recipe?.costs).toEqual([
      { id: 'chitin-fragment-t1', amount: 3 },
      { id: 'poke-powder-xs', amount: 2 },
    ])
    expect(recipe?.minimumQuality).toBe('good')
    expect(recipe?.materialFailQualities).toEqual(['bad'])
    expect(recipe?.bulk).toBe(10)
    expect(getArtisanCraftRequiredLevel(recipe!, 10)).toBe(11)
    expect(recipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'tiny-bug-armour',
      quantity: 1,
      dropChance: 100,
    })
    expect(recipe?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'bug-maniac-trade-3',
    })
    expect(recipe?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'binder-base2',
    })

    expect(task).toBeDefined()
    expect(task?.repeatable).toBe(true)
    expect(task?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'bug-maniac-trade-3',
    })
    expect(task?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'binder-base2',
    })
    expect(task?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'tiny-bug-armour',
      count: 1,
      consume: true,
    })
    expect(task?.rewards).toContainEqual({
      type: 'item',
      targetId: 'pack-base2',
      quantity: 1,
      requirements: [
        {
          type: 'card_collected_set',
          targetId: 'base2',
          count: 64,
          unique: true,
          inverse: true,
        },
      ],
    })
    expect(task?.rewards).toContainEqual({
      type: 'item',
      targetId: 'chitin-fragment-t1',
      quantity: 2,
      requirements: [
        {
          type: 'card_collected_set',
          targetId: 'base2',
          count: 64,
          unique: true,
        },
      ],
    })
    expect(task?.exitModal?.message).toContain('Take this.')
    expect(task?.exitModal?.closeButtonText).toBe('Take Reward')

    expect(shouldFailCraft(recipe!, 'bad')).toBe(true)
    expect(shouldFailCraft(recipe!, 'good')).toBe(false)
    expect(shouldFailCraft(recipe!, 'perfect')).toBe(false)
    expect(shouldConsumeCraftCosts(recipe!, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(recipe!, 'good')).toBe(true)
    expect(resolveCraftRewards(recipe!, 'bad')).toEqual([])
    expect(resolveCraftRewards(recipe!, 'good')).toEqual(
      expect.arrayContaining([
        {
          type: 'item',
          targetId: 'tiny-bug-armour',
          quantity: 1,
          dropChance: 100,
        },
      ]),
    )
    expect(resolveCraftRewards(recipe!, 'perfect')).toEqual(
      expect.arrayContaining([
        {
          type: 'item',
          targetId: 'tiny-bug-armour',
          quantity: 1,
          dropChance: 100,
        },
      ]),
    )
    expect(resolveCraftRewards(recipe!, 'perfect', 10)[0]).toMatchObject({
      type: 'item',
      targetId: 'tiny-bug-armour',
      quantity: 10,
    })
  })

  test('berry candies unlock four artisan levels after their dye recipes', () => {
    const expectedCandyRecipes = [
      { color: 'red', level: 5, dye: 'paint-red' },
      { color: 'purple', level: 11, dye: 'paint-purple' },
      { color: 'green', level: 18, dye: 'paint-green' },
      { color: 'blue', level: 25, dye: 'paint-blue' },
      { color: 'yellow', level: 32, dye: 'paint-yellow' },
    ]

    for (const { color, level, dye } of expectedCandyRecipes) {
      const itemId = `${color}-berry-candy`
      const item = items.find((entry) => entry.id === itemId)
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-${itemId}`,
      )

      expect(item).toMatchObject({
        name: `${color[0].toUpperCase()}${color.slice(1)} Berry Candy`,
        category: 'candy',
        spriteId: itemId,
        effects: { increaseFriendship: 5, encounterSecondChanceModifier: 10 },
      })
      expect(recipe).toBeDefined()
      expect(recipe?.category).toBe('items')
      expect(recipe?.craftType).toBe('scatter')
      expect(recipe?.artisanLevel).toBe(level)
      expect(recipe?.costs).toEqual([
        { id: dye, amount: 1 },
        { id: 'poke-powder-xs', amount: 2 },
      ])
      expect(recipe?.outputQuantity).toEqual({ min: 0, max: 2 })
      expect(recipe?.rewards).toContainEqual({
        type: 'item',
        targetId: itemId,
        quantity: 1,
        dropChance: 100,
      })
      expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
        type: 'item',
        targetId: itemId,
        quantity: 2,
      })
    }
  })

  test('held item recipes generate low, normal, and unstable type boost tiers', () => {
    const weakMagnet = artisanRecipes.find(
      (entry) => entry.id === 'craft-weak-magnet',
    )
    expect(weakMagnet).toBeDefined()
    expect(weakMagnet?.category).toBe('held')
    expect(weakMagnet?.artisanLevel).toBe(18)
    expect(weakMagnet?.costs).toEqual([
      { id: 'electric-component-t1', amount: 5 },
      { id: 'poke-powder-xs', amount: 2 },
    ])
    expect(weakMagnet?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'weak-magnet-recipe',
    })
    expect(weakMagnet?.rewards).toContainEqual({
      type: 'item',
      targetId: 'weak-magnet',
      quantity: 1,
      dropChance: 100,
    })

    const hardStone = artisanRecipes.find(
      (entry) => entry.id === 'craft-hard-stone',
    )
    expect(hardStone?.category).toBe('held')
    expect(hardStone?.artisanLevel).toBe(50)
    expect(hardStone?.costs).toEqual([
      { id: 'small-stone-t1', amount: 500 },
      { id: 'poke-powder-m', amount: 100 },
    ])
    expect(hardStone?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'hard-stone-recipe',
    })
    expect(hardStone?.rewards).toContainEqual({
      type: 'item',
      targetId: 'hard-stone',
      quantity: 1,
      dropChance: 100,
    })

    const unstableSpellTag = artisanRecipes.find(
      (entry) => entry.id === 'craft-unstable-spell-tag',
    )
    expect(unstableSpellTag?.category).toBe('held')
    expect(unstableSpellTag?.artisanLevel).toBe(75)
    expect(unstableSpellTag?.costs).toEqual([
      { id: 'spirit-wisp-t1', amount: 25 },
      { id: 'poke-powder-xl', amount: 5 },
    ])
    expect(unstableSpellTag?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'unstable-spell-tag-recipe',
    })
    expect(unstableSpellTag?.rewards).toContainEqual({
      type: 'item',
      targetId: 'unstable-spell-tag',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('battle observer is a low-level scatter item craft from lab components', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-battle-observer',
    )

    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('items')
    expect(recipe?.craftType).toBe('scatter')
    expect(recipe?.artisanLevel).toBe(3)
    expect(recipe?.costs).toEqual([
      { id: 'electric-component-t1', amount: 2 },
      { id: 'metal-scrap-t1', amount: 2 },
    ])
    expect(recipe?.outputQuantity).toEqual({ min: 0, max: 2 })
    expect(recipe?.bulk).toBe(5)
    expect(getArtisanCraftRequiredLevel(recipe!, 5)).toBe(8)
    expect(resolveCraftRewards(recipe!, 'bad')).toEqual([])
    expect(resolveCraftRewards(recipe!, 'good')[0]).toMatchObject({
      type: 'item',
      targetId: 'battle-observer',
      quantity: 1,
    })
    expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
      type: 'item',
      targetId: 'battle-observer',
      quantity: 2,
    })
  })

  test('research kit is crafted from observer supplies and small powder', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-research-kit',
    )

    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('items')
    expect(recipe?.artisanLevel).toBe(35)
    expect(recipe?.costs).toEqual([
      { id: 'battle-observer', amount: 1 },
      { id: 'battle-potion', amount: 1 },
      { id: 'poke-ball', amount: 1 },
      { id: 'poke-powder-xs', amount: 2 },
      { id: 'soft-fluff-t1', amount: 2 },
    ])
    expect(recipe?.outputQuantity).toEqual({ min: 1, max: 1 })
    expect(recipe?.iconItemId).toBe('research-kit')
    expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
      type: 'item',
      targetId: 'research-kit',
      quantity: 1,
    })
  })

  test('trainer glove quest recipe completes the Pallet artisan marker without an item output', () => {
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-trainers-glove',
    )

    expect(recipe).toBeDefined()
    expect(recipe?.category).toBe('quests')
    expect(recipe?.costs).toEqual([{ id: 'soft-fluff-t1', amount: 1 }])
    expect(recipe?.primaryOutputRewardIndex).toBeNull()
    expect(recipe?.iconItemId).toBe('soft-fluff-t1')
    expect(getPrimaryOutputRewardIndex(recipe!)).toBeNull()

    const rewards = resolveCraftRewards(recipe!, 'perfect')
    expect(rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'pallet-artisan-glove-crafted',
      quantity: 1,
      dropChance: 100,
    })
    expect(rewards).toContainEqual({
      type: 'xp',
      skill: 'artisan',
      quantity: 26,
      dropChance: 100,
    })
    expect(rewards.some((reward) => reward.type === 'item')).toBe(false)
  })

  test('ball recipes use broken ball casings instead of metal scrap shells', () => {
    const ballRecipes = artisanRecipes.filter((recipe) =>
      recipe.rewards.some((reward) => {
        const output = items.find((item) => item.id === reward.targetId)
        return output?.category === 'ball'
      }),
    )

    for (const recipe of ballRecipes) {
      const costIds = recipe.costs.map((cost) => cost.id)
      expect(costIds.some((id) => id.startsWith('broken-ball-'))).toBe(true)
      expect(costIds.some((id) => id.startsWith('metal-scrap-'))).toBe(false)
      expect(recipe.bulk).toBe(3)
      expect(getArtisanCraftRequiredLevel(recipe, 3)).toBe(
        recipe.artisanLevel + 5,
      )

      if (recipe.id === 'craft-poke-ball') {
        expect(recipe.costs).toContainEqual({ id: 'broken-ball-t1', amount: 1 })
        expect(
          recipe.costs.some((cost) => cost.id.startsWith('poke-powder-')),
        ).toBe(false)
      } else {
        expect(recipe.costs).toContainEqual({
          id: expectedPokePowderForLevel(recipe.artisanLevel),
          amount: 2,
        })
      }

      for (const cost of recipe.costs) {
        expect(cost.id.endsWith('-t2')).toBe(false)
        if (cost.id.endsWith('-t3'))
          expect(recipe.artisanLevel).toBeGreaterThanOrEqual(70)
      }
    }
  })

  test('specialty ball recipes require hidden manual tasks', () => {
    const manualExclusions = new Set(['poke-ball', 'great-ball', 'ultra-ball'])
    const ballRecipes = artisanRecipes.filter((recipe) =>
      recipe.rewards.some((reward) => {
        const output = items.find((item) => item.id === reward.targetId)
        return output?.category === 'ball'
      }),
    )

    for (const recipe of ballRecipes) {
      const outputItemId = recipe.rewards
        .find(
          (reward) =>
            items.find((item) => item.id === reward.targetId)?.category ===
            'ball',
        )
        ?.targetId?.toString()
      expect(outputItemId).toBeDefined()

      const manualRequirement = recipe.requirements?.find(
        (requirement) =>
          requirement.type === 'task_completed' &&
          requirement.targetId === `${outputItemId}-manual`,
      )

      if (manualExclusions.has(outputItemId!)) {
        expect(manualRequirement).toBeUndefined()
      } else {
        expect(manualRequirement).toBeDefined()
      }
    }

    const manualTasks = tasks.filter(
      (task) =>
        task.subCategory === 'Recipe Manuals' && task.id.endsWith('-manual'),
    )
    expect(manualTasks.map((task) => task.id).sort()).toEqual(
      ballRecipes
        .map((recipe) =>
          recipe.rewards
            .find(
              (reward) =>
                items.find((item) => item.id === reward.targetId)?.category ===
                'ball',
            )
            ?.targetId?.toString(),
        )
        .filter(
          (itemId): itemId is string =>
            !!itemId && !manualExclusions.has(itemId),
        )
        .map((itemId) => `${itemId}-manual`)
        .sort(),
    )

    for (const task of manualTasks) {
      const ballName = items.find((item) => item.id === task.icon.id)?.name
      expect(task.name).toBe(`${ballName} Manual`)
      expect(task.secret).toBe(true)
      expect(task.completionTrigger).toBe('auto')
      expect(task.repeatable).toBe(false)
    }

    const authoredDiminishedHeldRecipePrizes = new Set([
      'aluminium-powder-recipe',
      'brittle-hard-stone-recipe',
      'coarse-sand-recipe',
      'cotton-scarf-recipe',
      'dusty-charcoal-recipe',
      'fairy-down-recipe',
      'magic-water-recipe',
      'poison-tip-recipe',
      'regular-seed-recipe',
      'rusty-coat-recipe',
      'weak-magnet-recipe',
    ])

    for (const recipeId of [
      ...authoredDiminishedHeldRecipePrizes,
      'magnet-recipe',
      'unstable-magnet-recipe',
      'hard-stone-recipe',
      'unstable-hard-stone-recipe',
      'spell-tag-recipe',
      'unstable-spell-tag-recipe',
    ]) {
      const recipeTask = tasks.find((task) => task.id === recipeId)
      expect(recipeTask?.subCategory, recipeId).toBe('Recipe Manuals')
      expect(recipeTask?.secret, recipeId).toBe(
        !authoredDiminishedHeldRecipePrizes.has(recipeId),
      )
      expect(recipeTask?.completionTrigger, recipeId).toBe('auto')
    }
  })

  test('documents authored diminished held recipe prize unlocks across the 18 types', () => {
    const diminishedHeldRecipes = [
      {
        type: 'normal',
        recipeId: 'cotton-scarf-recipe',
        source: 'Route 3 catches',
      },
      {
        type: 'fire',
        recipeId: 'dusty-charcoal-recipe',
        source: "Charmander's Den catches",
      },
      {
        type: 'water',
        recipeId: 'magic-water-recipe',
        source: 'Squirtle Cove catches',
      },
      {
        type: 'electric',
        recipeId: 'weak-magnet-recipe',
        source: 'Route 10 catches',
      },
      {
        type: 'grass',
        recipeId: 'regular-seed-recipe',
        source: 'Secret Garden catches',
      },
      { type: 'ice', recipeId: 'often-melt-ice-recipe', source: null },
      { type: 'fighting', recipeId: 'brown-belt-recipe', source: null },
      {
        type: 'poison',
        recipeId: 'poison-tip-recipe',
        source: 'Route 22 catches',
      },
      {
        type: 'ground',
        recipeId: 'coarse-sand-recipe',
        source: "Diglett's Cave catches",
      },
      {
        type: 'flying',
        recipeId: 'dull-beak-recipe',
        source: 'Route 8 catches',
      },
      { type: 'psychic', recipeId: 'straight-spoon-recipe', source: null },
      {
        type: 'bug',
        recipeId: 'aluminium-powder-recipe',
        source: 'Buggy Champion',
      },
      {
        type: 'rock',
        recipeId: 'brittle-hard-stone-recipe',
        source: 'Mt. Moon catches',
      },
      { type: 'ghost', recipeId: 'faux-spell-tag-recipe', source: null },
      { type: 'dragon', recipeId: 'chipped-dragon-fang-recipe', source: null },
      { type: 'dark', recipeId: 'chipped-glasses-recipe', source: null },
      {
        type: 'steel',
        recipeId: 'rusty-coat-recipe',
        source: 'Rock Tunnel metal mining',
      },
      {
        type: 'fairy',
        recipeId: 'fairy-down-recipe',
        source: 'Clefairy Cavern catches',
      },
    ]

    const authoredPrizeIds = new Set(
      diminishedHeldRecipes
        .filter((entry) => entry.source)
        .map((entry) => entry.recipeId),
    )

    expect(diminishedHeldRecipes).toHaveLength(18)
    expect([...authoredPrizeIds].sort()).toEqual([
      'aluminium-powder-recipe',
      'brittle-hard-stone-recipe',
      'coarse-sand-recipe',
      'cotton-scarf-recipe',
      'dull-beak-recipe',
      'dusty-charcoal-recipe',
      'fairy-down-recipe',
      'magic-water-recipe',
      'poison-tip-recipe',
      'regular-seed-recipe',
      'rusty-coat-recipe',
      'weak-magnet-recipe',
    ])

    for (const entry of diminishedHeldRecipes) {
      const recipeTask = tasks.find((task) => task.id === entry.recipeId)
      expect(recipeTask?.secret, entry.recipeId).toBe(!entry.source)
    }

    const route3 = locations.find((location) => location.id === 'route-3')
    const route8 = locations.find((location) => location.id === 'route-8')
    const route22 = locations.find(
      (location) => location.id === 'viridian-outskirts',
    )
    const route10 = locations.find((location) => location.id === 'route-10')
    const diglettsCave = locations.find(
      (location) => location.id === 'digletts-cave-main',
    )
    const clefairyCavern = locations.find(
      (location) => location.id === 'exp-mt-moon-clefairy-cavern',
    )
    const charmanderDen = locations.find(
      (location) => location.id === 'charmander-den-growlithe',
    )
    const secretGarden = locations.find(
      (location) => location.id === 'viridian-secret-garden-open',
    )
    const squirtleCove = locations.find(
      (location) => location.id === 'vermilion-squirtle-cove-open',
    )
    const mtMoonCatchLocations = [
      'exp-mt-moon-1f',
      'exp-mt-moon-b1f',
      'exp-mt-moon-b2f',
    ].map((id) => locations.find((location) => location.id === id))
    const rockTunnelCatchLocations = locations.filter((location) =>
      location.id.startsWith('exp-rock-tunnel-'),
    )
    const buggyChampion = battles.find(
      (battle) => battle.id === 'buggy-champion',
    )
    const rockTunnelMetalMining = allGames.find(
      (game) => game.id === 'rock-tunnel-hidden-chamber-mining',
    )

    for (const location of [
      route3,
      route8,
      route22,
      route10,
      diglettsCave,
      clefairyCavern,
      charmanderDen,
      secretGarden,
      squirtleCove,
    ]) {
      expect(location).toBeDefined()
    }

    expect(route3?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'cotton-scarf-recipe',
      dropChance: 12,
    })
    expect(route8?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'dull-beak-recipe',
      dropChance: 12,
    })
    expect(route22?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'poison-tip-recipe',
      dropChance: 12,
    })
    expect(route10?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'weak-magnet-recipe',
      dropChance: 12,
    })
    expect(diglettsCave?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'coarse-sand-recipe',
      dropChance: 12,
    })
    expect(clefairyCavern?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'fairy-down-recipe',
      dropChance: 12,
    })
    expect(charmanderDen?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'dusty-charcoal-recipe',
      dropChance: 12,
    })
    expect(secretGarden?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'regular-seed-recipe',
      dropChance: 12,
    })
    expect(squirtleCove?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'magic-water-recipe',
      dropChance: 12,
    })
    for (const location of mtMoonCatchLocations) {
      expect(location?.rewards).toContainEqual({
        type: 'task_complete',
        targetId: 'brittle-hard-stone-recipe',
        dropChance: 12,
      })
    }
    for (const location of rockTunnelCatchLocations) {
      expect(location.rewards).not.toContainEqual(
        expect.objectContaining({ targetId: 'coarse-sand-recipe' }),
      )
    }
    expect(buggyChampion?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'aluminium-powder-recipe',
      dropChance: 100,
    })
    expect(rockTunnelMetalMining?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'rusty-coat-recipe',
      dropChance: 12,
    })
  })

  test('held type boost items use tiered break chances and multipliers', () => {
    const low = items.find((entry) => entry.id === 'faux-spell-tag')
    const item = items.find((entry) => entry.id === 'spell-tag')
    const high = items.find((entry) => entry.id === 'unstable-spell-tag')

    expect(low?.heldConfig).toMatchObject({
      consumeOnUse: true,
      consumeChance: 25,
      consumeTrigger: 'attack',
      effect: {
        type: 'type-damage-boost',
        pokemonType: 'ghost',
        damageMultiplier: 1.1,
      },
    })
    expect(item?.heldConfig).toMatchObject({
      consumeOnUse: false,
      effect: {
        type: 'type-damage-boost',
        pokemonType: 'ghost',
        damageMultiplier: 1.1,
      },
    })
    expect(high?.heldConfig).toMatchObject({
      consumeOnUse: true,
      consumeChance: 15,
      consumeTrigger: 'attack',
      effect: {
        type: 'type-damage-boost',
        pokemonType: 'ghost',
        damageMultiplier: 1.15,
      },
    })
    expect(item?.skillRequirements?.battling).toBeUndefined()
  })

  test('inferior elemental stone recipes require perfect quality and elemental costs', () => {
    const expected = new Map([
      ['inferior-fire-stone', ['fire-gem', 'cinder-shard-t1']],
      ['inferior-water-stone', ['water-gem', 'aqua-solvent-t1']],
      ['inferior-leaf-stone', ['grass-gem', 'wood-scraps-t1']],
      ['inferior-thunder-stone', ['electric-gem', 'electric-component-t1']],
      ['inferior-shiny-stone', ['fairy-gem', 'pixie-powder-t1']],
      ['inferior-ice-stone', ['ice-gem', 'frost-crystal-t1']],
      ['inferior-dark-stone', ['dark-gem', 'shadow-fiber-t1']],
      ['inferior-light-stone', ['dragon-gem', 'drake-scale-t1']],
    ])

    for (const [itemId, [gemId, materialId]] of expected) {
      const recipe = artisanRecipes.find((entry) => entry.id === `craft-${itemId}`)
      expect(recipe, itemId).toBeDefined()
      expect(recipe?.category, itemId).toBe('held')
      expect(recipe?.artisanLevel, itemId).toBe(30)
      expect(recipe?.minimumQuality, itemId).toBe('perfect')
      expect(recipe?.materialFail, itemId).toBeUndefined()
      expect(shouldFailCraft(recipe!, 'good'), itemId).toBe(true)
      expect(shouldConsumeCraftCosts(recipe!, 'good'), itemId).toBe(false)
      expect(resolveCraftRewards(recipe!, 'good'), itemId).toEqual([])
      expect(resolveCraftRewards(recipe!, 'perfect')[0]).toMatchObject({
        type: 'item',
        targetId: itemId,
        quantity: 1,
      })
      expect(recipe?.requirements, itemId).toContainEqual({
        type: 'task_completed',
        targetId: 'elemental-stones-recipe',
      })
      expect(recipe?.costs, itemId).toEqual(
        expect.arrayContaining([
          { id: gemId, amount: 10 },
          { id: materialId, amount: 100 },
          { id: 'neutral-stone', amount: 1 },
          { id: 'crystals', amount: 1000, type: 'currency' },
        ]),
      )
    }
  })

  test('unauthored specialty ball recipes are held at Artisan 100', () => {
    const levelExceptions = new Map([
      ['poke-ball', 1],
      ['great-ball', 25],
      ['ultra-ball', 50],
      ['net-ball', 16],
      ['moon-ball', 12],
    ])
    const ballRecipes = artisanRecipes.filter((recipe) =>
      recipe.rewards.some((reward) => {
        const output = items.find((item) => item.id === reward.targetId)
        return output?.category === 'ball'
      }),
    )

    for (const recipe of ballRecipes) {
      const outputItemId = recipe.rewards
        .find(
          (reward) =>
            items.find((item) => item.id === reward.targetId)?.category ===
            'ball',
        )
        ?.targetId?.toString()
      expect(outputItemId).toBeDefined()
      expect(recipe.artisanLevel).toBe(
        levelExceptions.get(outputItemId!) ?? 100,
      )
    }
  })

  test('ball recipes fail on bad quality and craft one or two balls on success', () => {
    const ballRecipes = artisanRecipes.filter((recipe) =>
      recipe.rewards.some((reward) => {
        const output = items.find((item) => item.id === reward.targetId)
        return output?.category === 'ball'
      }),
    )

    expect(ballRecipes.length).toBeGreaterThan(0)
    for (const recipe of ballRecipes) {
      expect(recipe.fail).toBe(true)
      expect(recipe.outputQuantity).toEqual({ min: 0, max: 2 })
      expect(resolveCraftRewards(recipe, 'bad')).toEqual([])
      expect(
        resolveCraftRewards(recipe, 'good').find(
          (reward) => reward.type === 'item',
        ),
      ).toMatchObject({
        quantity: 1,
      })
      const perfectRewards = resolveCraftRewards(recipe, 'perfect')
      const primaryReward = perfectRewards.find(
        (reward) => reward.type === 'item',
      )
      expect(primaryReward).toMatchObject({ quantity: 2 })
    }
  })

  test('craft quality only scales the primary output item reward', () => {
    const recipe: ArtisanRecipe = {
      id: 'test-mixed-reward',
      name: 'Test Mixed Reward',
      description: 'Test recipe',
      category: 'materials',
      artisanLevel: 1,
      craftType: 'precise',
      costs: [{ id: 'soft-fluff-t1', amount: 1 }],
      rewards: [
        { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 100 },
        {
          type: 'item',
          targetId: 'soft-fluff-t1',
          quantity: 5,
          dropChance: 100,
        },
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 25,
          dropChance: 100,
        },
      ],
      outputQuantity: { min: 1, max: 3 },
    }

    const rewards = resolveCraftRewards(recipe, 'perfect')

    expect(rewards[0]).toMatchObject({ targetId: 'poke-ball', quantity: 3 })
    expect(rewards[1]).toMatchObject({ targetId: 'soft-fluff-t1', quantity: 5 })
    expect(rewards[2]).toMatchObject({ type: 'currency', quantity: 25 })
    expect(rewards[3]).toMatchObject({
      type: 'xp',
      skill: 'artisan',
      quantity: 26,
    })
  })

  test('bulk crafts multiply costs and rewards only when the recipe allows that multiplier', () => {
    const recipe = artisanRecipes.find((entry) => entry.id === 'paint-red')!

    expect(resolveArtisanCraftMultiplier(recipe, 5)).toBe(5)
    expect(resolveArtisanCraftMultiplier(recipe, 4)).toBe(1)
    expect(getArtisanCraftRequiredLevel(recipe, 1)).toBe(1)
    expect(getArtisanCraftRequiredLevel(recipe, 5)).toBe(6)
    expect(scaleArtisanCosts(recipe.costs, 5)).toEqual([
      { id: 'nut-red', amount: 5 },
    ])

    const rewards = resolveCraftRewards(recipe, 'perfect', 5)

    expect(rewards[0]).toMatchObject({ targetId: 'paint-red', quantity: 10 })
    expect(rewards[1]).toMatchObject({
      type: 'xp',
      skill: 'artisan',
      quantity: 130,
    })
  })

  test('bad quality uses minimum output unless the recipe opts into failure', () => {
    const recipe: ArtisanRecipe = {
      id: 'test-bad-output',
      name: 'Test Bad Output',
      description: 'Test recipe',
      category: 'balls',
      artisanLevel: 1,
      craftType: 'precise',
      costs: [{ id: 'soft-fluff-t1', amount: 1 }],
      rewards: [
        { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 100 },
      ],
      outputQuantity: { min: 1, max: 3 },
    }

    const rewards = resolveCraftRewards(recipe, 'bad')

    expect(shouldFailCraft(recipe, 'bad')).toBe(false)
    expect(shouldConsumeCraftCosts(recipe, 'bad')).toBe(true)
    expect(rewards[0]).toMatchObject({ targetId: 'poke-ball', quantity: 1 })
    expect(rewards[1]).toMatchObject({
      type: 'xp',
      skill: 'artisan',
      quantity: 20,
    })
  })

  test('recipes can make bad quality fail with optional material loss', () => {
    const safeFailureRecipe: ArtisanRecipe = {
      id: 'test-safe-failure',
      name: 'Test Safe Failure',
      description: 'Test recipe',
      category: 'quests',
      artisanLevel: 1,
      craftType: 'precise',
      fail: true,
      costs: [{ id: 'soft-fluff-t1', amount: 1 }],
      rewards: [
        { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 100 },
      ],
      outputQuantity: { min: 1, max: 3 },
    }
    const materialFailureRecipe: ArtisanRecipe = {
      ...safeFailureRecipe,
      id: 'test-material-failure',
      materialFail: true,
    }

    expect(resolveCraftRewards(safeFailureRecipe, 'bad')).toEqual([])
    expect(shouldFailCraft(safeFailureRecipe, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(safeFailureRecipe, 'bad')).toBe(false)
    expect(resolveCraftRewards(materialFailureRecipe, 'bad')).toEqual([])
    expect(shouldFailCraft(materialFailureRecipe, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(materialFailureRecipe, 'bad')).toBe(true)
  })

  test('recipes can require perfect quality to succeed', () => {
    const recipe: ArtisanRecipe = {
      id: 'test-perfect-required',
      name: 'Test Perfect Required',
      description: 'Test recipe',
      category: 'quests',
      artisanLevel: 1,
      craftType: 'scatter',
      minimumQuality: 'perfect',
      materialFail: true,
      costs: [{ id: 'soft-fluff-t1', amount: 1 }],
      rewards: [
        { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 100 },
      ],
      outputQuantity: { min: 1, max: 1 },
    }

    expect(shouldFailCraft(recipe, 'bad')).toBe(true)
    expect(shouldFailCraft(recipe, 'good')).toBe(true)
    expect(shouldFailCraft(recipe, 'perfect')).toBe(false)
    expect(shouldConsumeCraftCosts(recipe, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(recipe, 'good')).toBe(true)
    expect(resolveCraftRewards(recipe, 'bad')).toEqual([])
    expect(resolveCraftRewards(recipe, 'good')).toEqual([])
    expect(resolveCraftRewards(recipe, 'perfect')[0]).toMatchObject({
      targetId: 'poke-ball',
      quantity: 1,
    })
  })

  test('failed craft material loss can be limited by quality', () => {
    const recipe: ArtisanRecipe = {
      id: 'test-quality-cost-failure',
      name: 'Test Quality Cost Failure',
      description: 'Test recipe',
      category: 'quests',
      artisanLevel: 1,
      craftType: 'scatter',
      minimumQuality: 'perfect',
      materialFailQualities: ['bad'],
      costs: [{ id: 'soft-fluff-t1', amount: 1 }],
      rewards: [
        { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 100 },
      ],
      outputQuantity: { min: 1, max: 1 },
    }

    expect(shouldFailCraft(recipe, 'bad')).toBe(true)
    expect(shouldFailCraft(recipe, 'good')).toBe(true)
    expect(shouldFailCraft(recipe, 'perfect')).toBe(false)
    expect(shouldConsumeCraftCosts(recipe, 'bad')).toBe(true)
    expect(shouldConsumeCraftCosts(recipe, 'good')).toBe(false)
    expect(shouldConsumeCraftCosts(recipe, 'perfect')).toBe(true)
  })

  test('recipes can opt out of a primary item output', () => {
    const recipe: ArtisanRecipe = {
      id: 'test-service-reward',
      name: 'Test Service Reward',
      description: 'Test service recipe',
      category: 'materials',
      artisanLevel: 1,
      craftType: 'precise',
      costs: [{ id: 'soft-fluff-t1', amount: 10 }],
      rewards: [
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 100,
          dropChance: 100,
        },
      ],
      primaryOutputRewardIndex: null,
      outputQuantity: { min: 1, max: 3 },
      iconItemId: 'soft-fluff-t1',
    }

    const rewards = resolveCraftRewards(recipe, 'perfect')

    expect(getPrimaryOutputRewardIndex(recipe)).toBeNull()
    expect(rewards[0]).toMatchObject({ type: 'currency', quantity: 100 })
    expect(rewards[1]).toMatchObject({
      type: 'xp',
      skill: 'artisan',
      quantity: 26,
    })
  })

  test('hold release quality uses deterministic timing bands', () => {
    const session: ArtisanCraftTimingWindow = {
      targetAt: 1000,
      perfectWindowMs: 70,
      goodWindowMs: 190,
    }

    expect(getArtisanCraftQuality(1000, session)).toBe('perfect')
    expect(getArtisanCraftQuality(1070, session)).toBe('perfect')
    expect(getArtisanCraftQuality(1150, session)).toBe('good')
    expect(getArtisanCraftQuality(1200, session)).toBe('bad')
    expect(getArtisanHoldQuality([1000, 1070, 1150], session)).toBe('good')
    expect(getArtisanHoldQuality([1000, 1070, 930], session)).toBe('perfect')
    expect(getArtisanHoldQuality([1000, 1150, 1200], session)).toBe('bad')
    expect(
      getArtisanHoldQuality([900, 1100, 700], {
        ...session,
        holdTargetOffsetsMs: [900, 1100, 700],
      }),
    ).toBe('perfect')
    expect(
      getArtisanHoldQuality([900, 1100, 900], {
        ...session,
        holdTargetOffsetsMs: [900, 1100, 700],
      }),
    ).toBe('good')
  })

  test('hold release visual band uses the scored timing edges', () => {
    const targetElapsedMs = 900
    const windowMs = 70
    const durationMs = 1600
    const band = getArtisanHoldBarWindow(targetElapsedMs, windowMs, durationMs)

    expect(band.left).toBeCloseTo(
      ((targetElapsedMs - windowMs) / durationMs) ** 1.85 * 100,
    )
    expect(band.right).toBeCloseTo(
      ((targetElapsedMs + windowMs) / durationMs) ** 1.85 * 100,
    )
    expect(band.width).toBeCloseTo(band.right - band.left)
    expect(band.left).toBeLessThan(band.center)
    expect(band.center).toBeLessThan(band.right)
  })

  test('crush quality uses deterministic tap thresholds', () => {
    const session = {
      goodTapCount: 13,
      perfectTapCount: 16,
    }

    expect(getArtisanCrushQuality(12, session)).toBe('bad')
    expect(getArtisanCrushQuality(13, session)).toBe('good')
    expect(getArtisanCrushQuality(15, session)).toBe('good')
    expect(getArtisanCrushQuality(16, session)).toBe('perfect')
  })

  test('balance quality uses deterministic lock positions', () => {
    const session = {
      balanceTargets: [0.5, 0.5, 0.5],
      balanceGoodWindow: 0.084,
      balancePerfectWindow: 0.084,
      balancePeriodMs: 1000,
    }

    expect(getArtisanBalancePosition(250, 1000)).toBe(0.5)
    expect(getArtisanBalanceQuality([250, 250, 250], session)).toBe('perfect')
    expect(getArtisanBalanceQuality([250, 250, 50], session)).toBe('good')
    expect(getArtisanBalanceQuality([250, 50, 50], session)).toBe('bad')
    expect(getArtisanBalanceQuality([50, 50, 50], session)).toBe('bad')
  })

  test('mix quality uses deterministic rotation thresholds', () => {
    const session = {
      mixGoodRotations: 2.25,
      mixPerfectRotations: 3.5,
    }

    expect(getArtisanMixQuality(2, session)).toBe('bad')
    expect(getArtisanMixQuality(2.25, session)).toBe('good')
    expect(getArtisanMixQuality(3.5, session)).toBe('perfect')
  })

  test('mix quality defaults require six spins for good and nine for perfect', () => {
    expect(getArtisanMixQuality(5.9, {})).toBe('bad')
    expect(getArtisanMixQuality(6, {})).toBe('good')
    expect(getArtisanMixQuality(8.9, {})).toBe('good')
    expect(getArtisanMixQuality(9, {})).toBe('perfect')
  })

  test('scatter quality uses deterministic tap thresholds', () => {
    const session = { goodTapCount: 11, perfectTapCount: 15 }

    expect(getArtisanScatterQuality(10, session)).toBe('bad')
    expect(getArtisanScatterQuality(11, session)).toBe('good')
    expect(getArtisanScatterQuality(14, session)).toBe('good')
    expect(getArtisanScatterQuality(15, session)).toBe('perfect')
  })
})
