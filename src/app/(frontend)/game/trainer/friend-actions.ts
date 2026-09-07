'use server'

import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import type { PublicTrainerSummary } from '@/components/game/trainer/types'
import type { User } from '@/payload-types'
import { isKidModeUser, KID_MODE_ACCESS_ERROR } from '@/utilities/kid-mode'
import { randomUUID } from 'node:crypto'
import { checkActionRateLimit } from '@/utilities/game-integrity'
import {
  createEconomyRequestId,
  getEconomyActionErrorMessage,
  runEconomyAction,
} from '@/utilities/economy/transactions'
import {
  friendRequests,
  planFriendship,
  type FriendRequest,
} from '@/utilities/trainers/friendship'
import { buildPublicTrainerSummaries } from '@/utilities/trainers/public-summary'

export type { FriendRequest } from '@/utilities/trainers/friendship'

async function getFreshAuthenticatedUser(payload: any): Promise<User | null> {
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return null
  return payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 0,
  }) as Promise<User>
}

function kidModeError(user: User | null) {
  return isKidModeUser(user)
    ? { success: false, error: KID_MODE_ACCESS_ERROR }
    : null
}

async function changeFriendship(
  operation: 'send' | 'accept' | 'reject' | 'remove',
  identifier: string,
): Promise<{ success: boolean; error?: string }> {
  if (
    typeof identifier !== 'string' ||
    !identifier ||
    identifier.length > 200
  ) {
    return { success: false, error: 'Invalid trainer or request.' }
  }
  try {
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) return { success: false, error: 'Not authenticated' }
    const limit = await checkActionRateLimit(
      user.id,
      `friend-${operation}`,
      operation === 'send' ? 10 : 30,
      60,
    )
    if (!limit.allowed)
      return { success: false, error: 'Too many requests. Try again shortly.' }

    // Accept/reject retries refer to the same request; send/remove are new
    // commands whose current eligibility is checked within the transaction.
    const requestId =
      operation === 'accept' || operation === 'reject'
        ? createEconomyRequestId(identifier)
        : randomUUID()
    const result = await runEconomyAction(
      { payload, userId: user.id, action: `friend-${operation}`, requestId },
      async ({ payload: transactionalPayload }) => {
        const actor = await transactionalPayload.findByID({
          collection: 'users',
          id: user.id,
          depth: 0,
        })
        const actorError = kidModeError(actor)
        if (actorError) return actorError
        let otherId = identifier
        if (operation === 'accept' || operation === 'reject') {
          const request = friendRequests(actor).find(
            (entry) =>
              entry.id === identifier &&
              entry.status === 'pending' &&
              (entry.from === actor.id || entry.to === actor.id),
          )
          if (!request)
            return {
              success: false,
              error: 'Friend request is no longer pending.',
            }
          otherId = request.from === actor.id ? request.to : request.from
        }
        if (otherId === actor.id)
          return { success: false, error: 'Choose another trainer.' }
        const other = await transactionalPayload.findByID({
          collection: 'users',
          id: otherId,
          depth: 0,
        })
        const plan = planFriendship(
          actor,
          other,
          operation,
          operation === 'send' ? requestId : identifier,
        )
        if (!plan.success) return plan
        // The transaction retries from fresh snapshots on a concurrent write
        // conflict, and rolls both sides back if either update fails.
        await transactionalPayload.update({
          collection: 'users',
          id: actor.id,
          data: plan.actor,
        })
        await transactionalPayload.update({
          collection: 'users',
          id: other.id,
          data: plan.other,
        })
        return { success: true }
      },
    )
    if (result.success) revalidatePath('/game')
    return result
  } catch (error) {
    console.error('Friendship update failed:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}

export async function sendFriendRequest(targetUserId: string) {
  return changeFriendship('send', targetUserId)
}

export async function acceptFriendRequest(requestId: string) {
  return changeFriendship('accept', requestId)
}

export async function rejectFriendRequest(requestId: string) {
  return changeFriendship('reject', requestId)
}

export async function removeFriend(friendId: string) {
  return changeFriendship('remove', friendId)
}

// Get friends list
export async function getFriendsList(): Promise<{
  success: boolean
  error?: string
  data?: PublicTrainerSummary[]
}> {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  const actorError = kidModeError(user)
  if (actorError) return actorError

  try {
    const friends = ((user as any).friends || []) as string[]

    if (friends.length === 0) {
      return { success: true, data: [] }
    }

    const friendUsers = await payload.find({
      collection: 'users',
      where: {
        and: [{ id: { in: friends } }, { kidMode: { not_equals: true } }],
      },
      pagination: false,
      depth: 0,
      select: {
        trainerName: true,
        icon: true,
        banner: true,
        title: true,
        skills: true,
      },
    })

    const friendsData = await buildPublicTrainerSummaries({
      payload,
      trainers: friendUsers.docs,
      viewer: user,
    })

    return { success: true, data: friendsData }
  } catch (error) {
    console.error('Get friends list error:', error)
    return { success: false, error: 'Failed to get friends list' }
  }
}

// Get pending friend requests
export async function getPendingRequests(): Promise<{
  success: boolean
  error?: string
  data?: Array<
    FriendRequest & {
      senderName: string
      senderIcon: any
    }
  >
}> {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  const actorError = kidModeError(user)
  if (actorError) return actorError

  try {
    const requests = ((user as any).friendRequests || []) as FriendRequest[]
    const pendingIncoming = requests.filter(
      (r) => r.to === user.id && r.status === 'pending',
    )

    if (pendingIncoming.length === 0) {
      return { success: true, data: [] }
    }

    // Get sender details
    const senderIds = pendingIncoming.map((r) => r.from)
    const senders = await payload.find({
      collection: 'users',
      where: {
        and: [{ id: { in: senderIds } }, { kidMode: { not_equals: true } }],
      },
      pagination: false,
      depth: 0,
      select: { trainerName: true, icon: true },
    })

    const requestsWithDetails = pendingIncoming.flatMap((request) => {
      const sender = senders.docs.find((s) => s.id === request.from)
      if (!sender) return []
      return [
        {
          ...request,
          senderName: sender.trainerName || 'Unknown',
          senderIcon: (sender as any).icon || 'ditto',
        },
      ]
    })

    return { success: true, data: requestsWithDetails }
  } catch (error) {
    console.error('Get pending requests error:', error)
    return { success: false, error: 'Failed to get pending requests' }
  }
}
