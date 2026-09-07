'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHash } from 'node:crypto'
import { getClientIp, rateLimit } from '@/utilities/rate-limiter'
import { registrationSchema } from '@/utilities/auth/registration-validation'
import { hasInvitationSecret, verifyRegistrationInvitation } from '@/utilities/auth/invitations'
import { registerInvitedAccount } from '@/utilities/auth/register-invited-account'

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
        sameSite: 'lax',
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
  try {
    const requestHeaders = await headers()
    const ipLimit = await rateLimit('registration-ip', getClientIp(requestHeaders), 10, 900)
    if (!ipLimit.allowed) return { error: 'Too many registration attempts. Please try again later.' }

    const parsed = registrationSchema.safeParse({
      trainerName: formData.get('trainerName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      betaCode: formData.get('betaCode'),
      kidMode: formData.get('kidMode') === 'true',
    })
    if (!parsed.success) return { error: parsed.error.issues[0]?.message || 'Invalid registration details' }
    const { trainerName, email, password, betaCode, kidMode } = parsed.data
    const emailKey = createHash('sha256').update(email).digest('hex')
    const emailLimit = await rateLimit('registration-email', emailKey, 5, 3600)
    if (!emailLimit.allowed) return { error: 'Too many registration attempts. Please try again later.' }
    if (!hasInvitationSecret(process.env.BETA_INVITATION_SECRET)) return { error: 'Registration is temporarily unavailable.' }
    const invitation = verifyRegistrationInvitation(betaCode, process.env.BETA_INVITATION_SECRET)
    if (!invitation) {
      return { error: 'Invalid or expired invitation code' }
    }

    const payload = await getPayload({ config })

    await registerInvitedAccount(payload, { trainerName, email, password, kidMode }, invitation)

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
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: result.exp ? new Date(result.exp * 1000) : undefined,
      })
    }
  } catch (error: unknown) {
    console.error('Registration failed:', error)
    return { error: 'Unable to create an account with these details.' }
  }

  redirect('/game')
}
