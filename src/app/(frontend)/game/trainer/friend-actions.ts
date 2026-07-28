'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { User } from '@/payload-types'
import {
  KID_MODE_ACCESS_ERROR,
  isKidModeUser,
} from '@/utilities/kid-mode'

export interface FriendRequest {
  id: string
  from: string
  to: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

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

// Send a friend request
export async function sendFriendRequest(
  targetUserId: string,
): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  const actorError = kidModeError(user)
  if (actorError) return actorError

  if (user.id === targetUserId) {
    return { success: false, error: 'Cannot send friend request to yourself' }
  }

  try {
    const targetUser = await payload.findByID({ collection: 'users', id: targetUserId })
    if (!targetUser) {
      return { success: false, error: 'User not found' }
    }
    if (isKidModeUser(targetUser)) {
      return { success: false, error: 'That trainer is not available.' }
    }

    // Check if already friends
    const friends = ((user as any).friends || []) as string[]
    if (friends.includes(targetUserId)) {
      return { success: false, error: 'Already friends' }
    }

    // Check if request already exists
    const existingRequests = ((user as any).friendRequests || []) as FriendRequest[]
    const hasExisting = existingRequests.some(
      (req) =>
        (req.from === user.id && req.to === targetUserId && req.status === 'pending') ||
        (req.from === targetUserId && req.to === user.id && req.status === 'pending'),
    )

    if (hasExisting) {
      return { success: false, error: 'Friend request already pending' }
    }

    // Create friend request
    const request: FriendRequest = {
      id: `${user.id}-${targetUserId}-${Date.now()}`,
      from: user.id,
      to: targetUserId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // Add to both users' friendRequests
    const userRequests = [...existingRequests, request]
    const targetRequests = [...((targetUser as any).friendRequests || []), request]

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { friendRequests: userRequests },
    })

    await payload.update({
      collection: 'users',
      id: targetUserId,
      data: { friendRequests: targetRequests },
    })

    revalidatePath('/game')
    return { success: true }
  } catch (error) {
    console.error('Send friend request error:', error)
    return { success: false, error: 'Failed to send friend request' }
  }
}

// Accept a friend request
export async function acceptFriendRequest(
  requestId: string,
): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  const actorError = kidModeError(user)
  if (actorError) return actorError

  try {
    const requests = ((user as any).friendRequests || []) as FriendRequest[]
    const request = requests.find((r) => r.id === requestId && r.to === user.id)

    if (!request) {
      return { success: false, error: 'Friend request not found' }
    }

    // Update request status
    const updatedRequests = requests.map((r) =>
      r.id === requestId ? { ...r, status: 'accepted' as const } : r,
    )

    // Add to friends list
    const friends = ((user as any).friends || []) as string[]
    const updatedFriends = [...friends, request.from]

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        friendRequests: updatedRequests,
        friends: updatedFriends,
      },
    })

    // Update sender's data
    const sender = await payload.findByID({ collection: 'users', id: request.from })
    if (isKidModeUser(sender)) {
      return { success: false, error: 'That trainer is not available.' }
    }
    const senderRequests = ((sender as any).friendRequests || []) as FriendRequest[]
    const senderFriends = ((sender as any).friends || []) as string[]

    await payload.update({
      collection: 'users',
      id: request.from,
      data: {
        friendRequests: senderRequests.map((r) =>
          r.id === requestId ? { ...r, status: 'accepted' as const } : r,
        ),
        friends: [...senderFriends, user.id],
      },
    })

    revalidatePath('/game')
    return { success: true }
  } catch (error) {
    console.error('Accept friend request error:', error)
    return { success: false, error: 'Failed to accept friend request' }
  }
}

// Reject a friend request
export async function rejectFriendRequest(
  requestId: string,
): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  const actorError = kidModeError(user)
  if (actorError) return actorError

  try {
    const requests = ((user as any).friendRequests || []) as FriendRequest[]
    const request = requests.find((r) => r.id === requestId)

    if (!request) {
      return { success: false, error: 'Friend request not found' }
    }

    // Remove request from both users
    const updatedRequests = requests.filter((r) => r.id !== requestId)

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { friendRequests: updatedRequests },
    })

    // Update other user
    const otherUserId = request.from === user.id ? request.to : request.from
    const otherUser = await payload.findByID({ collection: 'users', id: otherUserId })
    if (isKidModeUser(otherUser)) {
      return { success: false, error: 'That trainer is not available.' }
    }
    const otherRequests = ((otherUser as any).friendRequests || []) as FriendRequest[]

    await payload.update({
      collection: 'users',
      id: otherUserId,
      data: { friendRequests: otherRequests.filter((r) => r.id !== requestId) },
    })

    revalidatePath('/game')
    return { success: true }
  } catch (error) {
    console.error('Reject friend request error:', error)
    return { success: false, error: 'Failed to reject friend request' }
  }
}

// Remove a friend
export async function removeFriend(
  friendId: string,
): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  const actorError = kidModeError(user)
  if (actorError) return actorError

  try {
    const friend = await payload.findByID({ collection: 'users', id: friendId })
    if (isKidModeUser(friend)) {
      return { success: false, error: 'That trainer is not available.' }
    }

    const friends = ((user as any).friends || []) as string[]
    const updatedFriends = friends.filter((id) => id !== friendId)

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { friends: updatedFriends },
    })

    // Remove from friend's list
    const friendFriends = ((friend as any).friends || []) as string[]

    await payload.update({
      collection: 'users',
      id: friendId,
      data: { friends: friendFriends.filter((id) => id !== user.id) },
    })

    revalidatePath('/game')
    return { success: true }
  } catch (error) {
    console.error('Remove friend error:', error)
    return { success: false, error: 'Failed to remove friend' }
  }
}

// Get friends list
export async function getFriendsList(): Promise<{
  success: boolean
  error?: string
  data?: Array<{
    id: string
    trainerName?: string | null
    icon: any
    banner: any
    title: any
    skills: User['skills']
  }>
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
        and: [
          { id: { in: friends } },
          { kidMode: { not_equals: true } },
        ],
      },
    })

    const friendsData = friendUsers.docs.map((friend) => ({
      id: friend.id,
      trainerName: friend.trainerName,
      icon: (friend as any).icon || 'ditto',
      banner: (friend as any).banner || 'lab',
      title: (friend as any).title || 'new-beginnings',
      skills: friend.skills,
    }))

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
    const pendingIncoming = requests.filter((r) => r.to === user.id && r.status === 'pending')

    if (pendingIncoming.length === 0) {
      return { success: true, data: [] }
    }

    // Get sender details
    const senderIds = pendingIncoming.map((r) => r.from)
    const senders = await payload.find({
      collection: 'users',
      where: {
        and: [
          { id: { in: senderIds } },
          { kidMode: { not_equals: true } },
        ],
      },
    })

    const requestsWithDetails = pendingIncoming.flatMap((request) => {
      const sender = senders.docs.find((s) => s.id === request.from)
      if (!sender) return []
      return [{
        ...request,
        senderName: sender.trainerName || 'Unknown',
        senderIcon: (sender as any).icon || 'ditto',
      }]
    })

    return { success: true, data: requestsWithDetails }
  } catch (error) {
    console.error('Get pending requests error:', error)
    return { success: false, error: 'Failed to get pending requests' }
  }
}
