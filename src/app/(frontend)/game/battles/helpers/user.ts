import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import type { User } from '@/payload-types'

export async function getUser(): Promise<User | null> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })

  if (!jwtUser) return null

  const user = await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
  })

  return user as User
}
