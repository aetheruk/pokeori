'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
      req: {
        headers: await headers(),
      },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: result.exp ? new Date(result.exp * 1000) : undefined,
      })
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid email or password'
    return { error: message }
  }

  redirect('/game')
}

export async function register(prevState: unknown, formData: FormData) {
  const trainerName = formData.get('trainerName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!trainerName || !email || !password || !confirmPassword) {
    return { error: 'All fields are required' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  const betaCode = formData.get('betaCode') as string
  if (betaCode !== 'pokebeta26') {
    return { error: 'Invalid beta access code' }
  }

  try {
    const payload = await getPayload({ config })

    await payload.create({
      collection: 'users',
      data: {
        trainerName,
        email,
        password,
      },
    })

    // Log the user in after registration
    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
      req: {
        headers: await headers(),
      },
    })

    if (result.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: result.exp ? new Date(result.exp * 1000) : undefined,
      })
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create account'
    return { error: message }
  }

  redirect('/game')
}
