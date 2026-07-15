'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export interface FriendRequest {
  id: string
  from: string
  to: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

// Send a friend request
export async function sendFriendRequest(targetUserId: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  if (user.id === targetUserId) {
    return { success: false, error: 'Cannot send friend request to yourself' }
  }

  try {
    const targetUser = await payload.findByID({ collection: 'users', id: targetUserId })
    if (!targetUser) {
      return { success: false, error: 'User not found' }
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
export async function acceptFriendRequest(requestId: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

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
export async function rejectFriendRequest(requestId: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

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
export async function removeFriend(friendId: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    const friends = ((user as any).friends || []) as string[]
    const updatedFriends = friends.filter((id) => id !== friendId)

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { friends: updatedFriends },
    })

    // Remove from friend's list
    const friend = await payload.findByID({ collection: 'users', id: friendId })
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
export async function getFriendsList() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    const friends = ((user as any).friends || []) as string[]

    if (friends.length === 0) {
      return { success: true, data: [] }
    }

    const friendUsers = await payload.find({
      collection: 'users',
      where: {
        id: {
          in: friends,
        },
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
export async function getPendingRequests() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

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
        id: {
          in: senderIds,
        },
      },
    })

    const requestsWithDetails = pendingIncoming.map((request) => {
      const sender = senders.docs.find((s) => s.id === request.from)
      return {
        ...request,
        senderName: sender?.trainerName || 'Unknown',
        senderIcon: (sender as any)?.icon || 'ditto',
      }
    })

    return { success: true, data: requestsWithDetails }
  } catch (error) {
    console.error('Get pending requests error:', error)
    return { success: false, error: 'Failed to get pending requests' }
  }
}
