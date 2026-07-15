import { describe, expect, test } from 'bun:test'
import { decrementFaintedPokemonFriendship } from '@/utilities/battle/friendship'
import { makeBattlePokemon } from './helpers/battle-fixtures'

function makePayload(friendship: number, user: string = 'player-1') {
  const updates: any[] = []
  return {
    updates,
    payload: {
      findByID: async () => ({ id: 'pokemon-1', user, friendship }),
      update: async (args: any) => {
        updates.push(args)
        return { id: args.id, user, friendship: args.data.friendship }
      },
    } as any,
  }
}

describe('battle friendship', () => {
  test('fainted owned Pokemon lose one friendship without going below zero', async () => {
    const pokemon = makeBattlePokemon({ friendship: 5 })
    const { payload, updates } = makePayload(5)

    await decrementFaintedPokemonFriendship({
      payload,
      pokemon,
      userId: 'player-1',
    })

    expect(pokemon.friendship).toBe(4)
    expect(updates[0]).toMatchObject({
      collection: 'pokemon',
      id: 'pokemon-1',
      data: { friendship: 4 },
    })

    const faintedAtZero = makeBattlePokemon({ friendship: 0 })
    const zeroPayload = makePayload(0)
    await decrementFaintedPokemonFriendship({
      payload: zeroPayload.payload,
      pokemon: faintedAtZero,
      userId: 'player-1',
    })

    expect(faintedAtZero.friendship).toBe(0)
    expect(zeroPayload.updates[0].data.friendship).toBe(0)
  })

  test('faint friendship loss ignores Pokemon owned by another user', async () => {
    const pokemon = makeBattlePokemon({ user: 'player-2', friendship: 5 })
    const { payload, updates } = makePayload(5, 'player-2')

    await decrementFaintedPokemonFriendship({
      payload,
      pokemon,
      userId: 'player-1',
    })

    expect(pokemon.friendship).toBe(5)
    expect(updates).toEqual([])
  })
})
