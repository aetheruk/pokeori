import type { Payload } from 'payload'
import type { BattlePokemon } from './types'

function normalizeRelationshipId(value: unknown): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string' || typeof value === 'number') return value.toString()
  if (typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: string | number }).id
    return id === undefined ? undefined : id.toString()
  }
  return undefined
}

export async function decrementFaintedPokemonFriendship(params: {
  payload: Payload
  pokemon?: BattlePokemon
  userId?: string
}): Promise<void> {
  const { payload, pokemon, userId } = params
  if (!pokemon?.id) return

  const pokemonUserId = normalizeRelationshipId((pokemon as any).user)
  if (userId && pokemonUserId && pokemonUserId !== userId) return

  const currentFriendship = typeof pokemon.friendship === 'number' ? pokemon.friendship : 70

  try {
    const storedPokemon = await payload.findByID({
      collection: 'pokemon',
      id: pokemon.id.toString(),
    })
    const storedUserId = normalizeRelationshipId((storedPokemon as any)?.user)
    if (userId && storedUserId && storedUserId !== userId) return

    const storedFriendship =
      typeof storedPokemon?.friendship === 'number' ? storedPokemon.friendship : currentFriendship

    pokemon.friendship = Math.max(0, currentFriendship - 1)

    await payload.update({
      collection: 'pokemon',
      id: pokemon.id.toString(),
      data: {
        friendship: Math.max(0, storedFriendship - 1),
      },
    })
  } catch (error) {
    console.error('Failed to decrement fainted Pokemon friendship', error)
  }
}
