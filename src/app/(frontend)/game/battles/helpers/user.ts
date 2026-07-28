import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import type { User } from '@/payload-types'

export async function getUser(options?: {
  fresh?: boolean
}): Promise<User | null> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })

  if (!jwtUser) return null
  if (!options?.fresh) return jwtUser as User

  return (await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
    depth: 0,
  })) as User
}
