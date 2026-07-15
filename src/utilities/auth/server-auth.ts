'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkUserAuth() {
  // Get headers for auth check
  const headersList = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Authenticate
  const { user } = await payload.auth({ headers: headersList })

  // Handle authentication result
  if (!user) {
    redirect('/auth')
  } else {
    // Return data for authenticated users
    return {
      user,
    }
  }
}
