import type { Pokemon, User } from '@/payload-types'

/** A populated original trainer is public attribution, never an account snapshot. */
export function serializePokemon(pokemon: Pokemon): Pokemon {
  const trainer = pokemon.originalTrainer
  return {
    ...pokemon,
    id: String(pokemon.id),
    user: typeof pokemon.user === 'object' ? String(pokemon.user.id) : String(pokemon.user),
    originalTrainer: trainer && typeof trainer === 'object'
      ? { id: String(trainer.id), trainerName: trainer.trainerName } as User
      : trainer,
    createdAt: pokemon.createdAt ? String(pokemon.createdAt) : '',
    updatedAt: pokemon.updatedAt ? String(pokemon.updatedAt) : '',
  }
}
