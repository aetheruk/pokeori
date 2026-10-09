import { describe, expect, test } from 'bun:test'
import { globalFishingPokemonPool } from '@/data/games/fishing/pokemon-pool'
import { items } from '@/data/items'
import { meetsFishingKeepNetRequirements } from '@/utilities/fishing/keep-net-requirements'

describe('fishing keep-net requirements', () => {
  test('global replacement requirements refer to authored items', () => {
    const itemIds = new Set(items.map((item) => item.id))
    const requirementIds = globalFishingPokemonPool.flatMap((entry) =>
      (entry.keepNetRequirements || []).map((requirement) => requirement.itemId),
    )

    expect(requirementIds).toEqual(['drake-scale-t1', 'golden-scale'])
    expect(requirementIds.every((itemId) => itemIds.has(itemId))).toBe(true)
  })

  test('requires the configured total item quantity in the keep net', () => {
    const requirement = [{ itemId: 'drake-scale-t1', quantity: 2 }]

    expect(
      meetsFishingKeepNetRequirements(requirement, [
        {
          type: 'pokemon',
        },
        {
          type: 'item',
          itemId: 'drake-scale-t1',
          quantity: 1,
        },
      ]),
    ).toBe(false)

    expect(
      meetsFishingKeepNetRequirements(requirement, [
        {
          type: 'item',
          itemId: 'drake-scale-t1',
          quantity: 2,
        },
      ]),
    ).toBe(true)
  })
})
