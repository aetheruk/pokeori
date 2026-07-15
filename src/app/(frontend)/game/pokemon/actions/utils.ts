import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import type { Pokemon, User } from '@/payload-types'

export type StatName = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'

export async function getUser(): Promise<User | null> {
  const payload = await getPayload({ config })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })
  if (!jwtUser) return null
  const user = await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
  })
  return user as User
}

export function serializePokemon(pokemon: Pokemon): Pokemon {
  return {
    ...pokemon,
    id: String(pokemon.id),
    user: typeof pokemon.user === 'object' ? String(pokemon.user.id) : String(pokemon.user),
    originalTrainer: pokemon.originalTrainer, // Keep as is - can be object or string
    createdAt: pokemon.createdAt ? String(pokemon.createdAt) : '',
    updatedAt: pokemon.updatedAt ? String(pokemon.updatedAt) : '',
  }
}
