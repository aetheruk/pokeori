import 'server-only'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'

/** Authorize each action independently of the developer page layout. */
export async function requireDevAdmin() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Developer tools are disabled in production')
  }
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user?.isAdmin) throw new Error('Administrator access required')
}
