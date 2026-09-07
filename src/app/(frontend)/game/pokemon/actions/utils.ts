import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import type { User } from '@/payload-types'
export { serializePokemon } from '@/utilities/pokemon/serialize'

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
