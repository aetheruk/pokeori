import { describe, expect, test } from 'bun:test'
import { EVOLUTIONS } from '@/data/evolutions'
import { getLevelEvolutionCatalystForEvolution } from '@/data/evolution-catalysts'
import { items } from '@/data/items'
import { getMove } from '@/data/moves'
import pokemonData from '@/data/pokemon-data'
import { getRequiredEvolutionItem } from '@/utilities/pokemon/evolution-conditions'
import { matchesEvolutionMove } from '@/utilities/pokemon/evolution-moves'
import { validateAssignedMoveIds } from '@/utilities/pokemon/pokemon-moves'

const expectedMoves: Record<string, string> = {
  '108': 'rollout',
  '114': 'ancient-power',
  '190': 'double-hit',
  '193': 'ancient-power',
  '203': 'twin-beam',
  '206': 'hyper-drill',
  '211': 'barb-barrage',
  '221': 'ancient-power',
  '438': 'mimic',
  '439': 'mimic',
  '762': 'stomp',
  '803': 'dragon-pulse',
  '852': 'taunt',
  '1011': 'dragon-cheer',
}

describe('equipped evolution moves', () => {
  test('every move evolution resolves to its required assignable move without an evolution item', () => {
    const actualMoves: Record<string, string> = {}
    for (const [speciesId, evolutions] of Object.entries(EVOLUTIONS)) {
      for (const evolution of evolutions) {
        const { conditions } = evolution
        const moveId = conditions.knownMoveId
        if (!moveId) continue
        actualMoves[speciesId] = moveId
        expect(moveId).toBe(expectedMoves[speciesId])
        expect(getMove(moveId)).toBeDefined()
        expect(getRequiredEvolutionItem(conditions)).toBeNull()
        expect(getLevelEvolutionCatalystForEvolution(evolution)).toBeNull()
        expect(matchesEvolutionMove(conditions, null)).toBe(false)
        expect(matchesEvolutionMove(conditions, [{ moveId: 'tackle' }])).toBe(
          false,
        )
        expect(matchesEvolutionMove(conditions, [{ moveId }])).toBe(true)

        const tm = items.find((item) => item.moveId === moveId)
        expect(tm).toBeDefined()
        if (!tm) throw new Error(`Missing TM for ${moveId}`)
        const forms =
          pokemonData
            .find((species) => String(species.id) === speciesId)
            ?.forms.filter(
              (form) =>
                !conditions.requiredSourceForm ||
                form.form === conditions.requiredSourceForm,
            ) || []
        expect(forms.length).toBeGreaterThan(0)
        for (const form of forms) {
          expect(
            validateAssignedMoveIds({
              pokemonFormId: form.id,
              pokemonTypes: form.types,
              pokemonLevel: 1,
              moveIds: [moveId],
              inventory: { [tm.id]: 1 },
            }),
          ).toEqual({ success: true, moveIds: [moveId] })
        }
      }
    }
    expect(actualMoves).toEqual(expectedMoves)
  })

  test('only the required equipped move satisfies the condition', () => {
    const conditions = { knownMoveId: 'rollout' }
    expect(matchesEvolutionMove(conditions, undefined)).toBe(false)
    expect(matchesEvolutionMove(conditions, [])).toBe(false)
    expect(matchesEvolutionMove(conditions, [{ moveId: null }])).toBe(false)
    expect(matchesEvolutionMove(conditions, ['tm-rollout'])).toBe(false)
    expect(matchesEvolutionMove(conditions, ['205'])).toBe(false)
    expect(matchesEvolutionMove(conditions, ['tackle', 'rollout'])).toBe(true)
    expect(
      matchesEvolutionMove({ knownMoveId: 'unknown-move' }, ['unknown-move']),
    ).toBe(false)
    expect(matchesEvolutionMove({}, [])).toBe(true)
  })

  test('other item conditions retain their requirements alongside a move condition', () => {
    expect(getRequiredEvolutionItem({ itemId: 'fire-stone' })).toBe(
      'fire-stone',
    )
    expect(getRequiredEvolutionItem({ trade: true })).toBe('link-cable')
    expect(getRequiredEvolutionItem({ heldItem: 'razor-fang' })).toBe(
      'razor-fang',
    )
    expect(getRequiredEvolutionItem({ locationId: '1' })).toBe(
      'evolution-compass',
    )
    expect(
      getRequiredEvolutionItem({
        knownMoveId: 'rollout',
        itemId: 'fire-stone',
      }),
    ).toBe('fire-stone')
  })
})
