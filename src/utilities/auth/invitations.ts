import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { z } from 'zod'

const invitationClaims = z.object({
  id: z.string().uuid(),
  exp: z.number().int().positive(),
}).strict()

export type RegistrationInvitation = z.infer<typeof invitationClaims>
export const MAX_INVITATION_AGE_SECONDS = 30 * 24 * 60 * 60

export function hasInvitationSecret(secret: string | undefined): secret is string {
  return typeof secret === 'string' && Buffer.byteLength(secret) >= 32
}

/** Offline issuance; only the server/operator holds the signing key. */
export function issueRegistrationInvitation(secret: string, lifetimeSeconds = 7 * 24 * 60 * 60, now = Date.now()) {
  if (!hasInvitationSecret(secret)) throw new Error('Invitation signing secret must contain at least 32 bytes')
  if (!Number.isSafeInteger(lifetimeSeconds) || lifetimeSeconds <= 0 || lifetimeSeconds > MAX_INVITATION_AGE_SECONDS) {
    throw new Error('Invitation lifetime must be between one second and 30 days')
  }
  const claims: RegistrationInvitation = { id: randomUUID(), exp: Math.floor(now / 1000) + lifetimeSeconds }
  const body = Buffer.from(JSON.stringify(claims)).toString('base64url')
  const signature = createHmac('sha256', secret).update(`v1.${body}`).digest('base64url')
  return { token: `v1.${body}.${signature}`, expiresAt: new Date(claims.exp * 1000).toISOString() }
}

export function verifyRegistrationInvitation(token: string, secret: string | undefined, now = Date.now()): RegistrationInvitation | null {
  if (!hasInvitationSecret(secret) || typeof token !== 'string' || token.length > 256) return null
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== 'v1' || !/^[a-zA-Z0-9_-]+$/.test(parts[1]) || !/^[a-zA-Z0-9_-]{43}$/.test(parts[2])) return null
  const expected = createHmac('sha256', secret).update(`v1.${parts[1]}`).digest('base64url')
  if (!timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))) return null
  try {
    const parsed = invitationClaims.safeParse(JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')))
    const nowSeconds = Math.floor(now / 1000)
    if (!parsed.success || parsed.data.exp <= nowSeconds || parsed.data.exp > nowSeconds + MAX_INVITATION_AGE_SECONDS) return null
    return parsed.data
  } catch {
    return null
  }
}
