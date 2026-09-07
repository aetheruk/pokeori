import 'server-only'

import { createHash } from 'node:crypto'
import { createLocalReq, initTransaction, commitTransaction, killTransaction, type Payload } from 'payload'
import type { RegistrationInvitation } from './invitations'

/** The durable unique receipt makes invitation consumption and signup atomic. */
export async function registerInvitedAccount(
  payload: Payload,
  data: { trainerName: string; email: string; password: string; kidMode: boolean },
  invitation: RegistrationInvitation,
) {
  if (invitation.exp * 1000 <= Date.now()) throw new Error('Invitation has expired')
  if ((payload.db as { transactionOptions?: unknown }).transactionOptions === false) {
    throw new Error('Registration requires database transactions')
  }
  const req = await createLocalReq({}, payload)
  if (!(await initTransaction(req))) throw new Error('Registration requires database transactions')
  try {
    const key = createHash('sha256').update(`registration-invitation:${invitation.id}`).digest('hex')
    const existing = await payload.find({
      collection: 'economy-action-receipts', where: { key: { equals: key } },
      pagination: false, limit: 1, depth: 0, overrideAccess: true, req,
    })
    if (existing.docs.length) throw new Error('Invitation has already been used')
    const user = await payload.create({ collection: 'users', data, depth: 0, overrideAccess: true, req })
    await payload.create({
      collection: 'economy-action-receipts',
      data: {
        key, user: user.id, action: 'register-invitation', requestId: invitation.id,
        response: { userId: user.id, expiresAt: new Date(invitation.exp * 1000).toISOString() },
        committedAt: new Date().toISOString(),
      },
      depth: 0, overrideAccess: true, req,
    })
    await commitTransaction(req)
    return user
  } catch (error) {
    await killTransaction(req)
    throw error
  }
}
