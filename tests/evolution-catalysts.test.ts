import { describe, expect, test } from 'bun:test'
import { artisanRecipes } from '@/data/artisan'
import { battles } from '@/data/battles'
import {
  getLevelEvolutionCatalystForEvolution,
  LEVEL_EVOLUTION_CATALYSTS,
} from '@/data/evolution-catalysts'
import { EVOLUTIONS } from '@/data/evolutions'
import { items } from '@/data/items'
import { tasks } from '@/data/tasks'

describe('level evolution catalysts', () => {
  test('uses the three authored level bands and Artisan unlocks', () => {
    expect(LEVEL_EVOLUTION_CATALYSTS.map((catalyst) => [
      catalyst.minEvolutionLevel,
      catalyst.maxEvolutionLevel,
      catalyst.artisanLevel,
      catalyst.crystalCost,
      catalyst.powderId,
      catalyst.powderCost,
    ])).toEqual([
      [0, 20, 5, 25, 'poke-powder-xs', 10],
      [21, 40, 20, 300, 'poke-powder-s', 25],
      [41, Number.POSITIVE_INFINITY, 40, 500, 'poke-powder-m', 50],
    ])

    for (const catalyst of LEVEL_EVOLUTION_CATALYSTS) {
      const item = items.find((entry) => entry.id === catalyst.id)
      const recipe = artisanRecipes.find(
        (entry) => entry.id === `craft-${catalyst.id}`,
      )

      expect(item).toMatchObject({
        id: catalyst.id,
        name: catalyst.name,
        category: 'evolution',
        spriteId: 'max-revive',
      })
      expect(recipe).toMatchObject({
        category: 'items',
        artisanLevel: catalyst.artisanLevel,
        craftType: 'balance',
        fail: false,
        outputQuantity: { min: 1, max: 1 },
        costs: [
          { id: 'crystals', amount: catalyst.crystalCost, type: 'currency' },
          { id: catalyst.powderId, amount: catalyst.powderCost },
        ],
        rewards: [
          { type: 'item', targetId: catalyst.id, quantity: 1, dropChance: 100 },
        ],
      })
      expect(recipe?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: 'evolution-catalyst-recipe',
      })
    }
  })

  test('the Jungle Binder victory awards the first catalyst and unlocks all recipes', () => {
    const battle = battles.find((entry) => entry.id === 'buggy-4-battle-4')
    expect(battle?.rewards).toContainEqual({
      type: 'item',
      targetId: 'evolution-catalyst',
      quantity: 1,
      dropChance: 100,
    })
    expect(battle?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'evolution-catalyst-recipe',
      dropChance: 100,
    })

    const recipeMarker = tasks.find((task) => task.id === 'evolution-catalyst-recipe')
    expect(recipeMarker).toMatchObject({
      secret: true,
      completionTrigger: 'auto',
    })
  })

  test('Benny offers an optional thematic explanation for using the catalyst', () => {
    const tutorial = tasks.find((task) => task.id === 'evolution-catalyst-tutorial')
    expect(tutorial).toMatchObject({
      secret: false,
      repeatable: false,
      completionTrigger: 'manual',
      requirements: [{ type: 'item_owned', targetId: 'evolution-catalyst' }],
    })

    const dialogue = (tutorial?.enterModal || []).map((step) => step.message).join(' ')
    expect(tutorial?.enterModal).toHaveLength(3)
    expect(dialogue).toContain('old skin')
    expect(dialogue).toContain('Use it when the moment comes')
    expect(dialogue.toLowerCase()).not.toContain('recipe')
    expect(dialogue.toLowerCase()).not.toContain('unlock')
    expect(dialogue.toLowerCase()).not.toContain('artisan level')
    expect(dialogue.toLowerCase()).not.toContain('tier')
  })

  test('existing Jungle Binder owners receive a one-time catalyst handoff', () => {
    const handoff = tasks.find((task) => task.id === 'evolution-catalyst-handoff')
    expect(handoff).toMatchObject({
      secret: false,
      repeatable: false,
      completionTrigger: 'manual',
      requirements: [
        { type: 'item_owned', targetId: 'binder-base2' },
        { type: 'item_owned', targetId: 'evolution-catalyst', inverse: true },
        {
          type: 'task_completed',
          targetId: 'evolution-catalyst-recipe',
          inverse: true,
        },
      ],
    })
    expect(handoff?.rewards).toContainEqual({
      type: 'item',
      targetId: 'evolution-catalyst',
      quantity: 1,
    })
    expect(handoff?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'evolution-catalyst-recipe',
    })
  })

  test('selects catalysts only for level-only evolutions', () => {
    expect(
      getLevelEvolutionCatalystForEvolution({
        speciesId: 11,
        name: 'metapod',
        trigger: 'level-up',
        conditions: { minLevel: 10 },
      }),
    ).toMatchObject({ id: 'evolution-catalyst' })
    expect(
      getLevelEvolutionCatalystForEvolution({
        speciesId: 20,
        name: 'raticate',
        trigger: 'level-up',
        conditions: { minLevel: 20, timeOfDay: 'night' },
      }),
    ).toBeNull()
    expect(
      getLevelEvolutionCatalystForEvolution({
        speciesId: 26,
        name: 'raichu',
        trigger: 'use-item',
        conditions: { itemId: 'thunder-stone' },
      }),
    ).toBeNull()
  })

  test('every authored pure level evolution resolves to a catalyst tier', () => {
    const pureLevelEvolutions = Object.values(EVOLUTIONS)
      .flat()
      .filter(
        (evolution) =>
          evolution.trigger === 'level-up' &&
          typeof evolution.conditions.minLevel === 'number' &&
          Object.keys(evolution.conditions).every(
            (key) => key === 'minLevel' || key === 'requiredSourceForm',
          ),
      )

    expect(pureLevelEvolutions.length).toBeGreaterThan(0)
    expect(
      pureLevelEvolutions.every(
        (evolution) => getLevelEvolutionCatalystForEvolution(evolution) !== null,
      ),
    ).toBe(true)
  })
})
