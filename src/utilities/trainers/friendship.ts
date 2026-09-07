export interface FriendRequest {
  id: string
  from: string
  to: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

export interface SocialUser {
  id: string
  kidMode?: boolean | null
  friends?: unknown
  friendRequests?: unknown
}

export const MAX_PENDING_FRIEND_REQUESTS = 50
const MAX_FRIEND_HISTORY = 50

export function friendRequests(user: SocialUser): FriendRequest[] {
  if (!Array.isArray(user.friendRequests)) return []
  return user.friendRequests.filter((request): request is FriendRequest =>
    Boolean(
      request &&
        typeof request.id === 'string' &&
        typeof request.from === 'string' &&
        typeof request.to === 'string' &&
        ['pending', 'accepted', 'rejected'].includes(request.status),
    ),
  )
}

function friends(user: SocialUser): string[] {
  return [
    ...new Set(
      Array.isArray(user.friends)
        ? user.friends.filter((id): id is string => typeof id === 'string')
        : [],
    ),
  ]
}

function boundedRequests(requests: FriendRequest[]): FriendRequest[] {
  const unique = [
    ...new Map(requests.map((request) => [request.id, request])).values(),
  ]
  return [
    ...unique.filter((request) => request.status === 'pending'),
    ...unique
      .filter((request) => request.status !== 'pending')
      .slice(-MAX_FRIEND_HISTORY),
  ]
}

type SocialChange = { friends: string[]; friendRequests: FriendRequest[] }
type FriendPlan =
  | { success: false; error: string }
  | {
      success: true
      actor: SocialChange
      other: SocialChange
    }

/** Both snapshots must be loaded and persisted within the same transaction. */
export function planFriendship(
  actor: SocialUser,
  other: SocialUser,
  operation: 'send' | 'accept' | 'reject' | 'remove',
  requestId: string,
  now = new Date().toISOString(),
): FriendPlan {
  if (actor.id === other.id)
    return { success: false, error: 'Choose another trainer.' }
  if (actor.kidMode || other.kidMode) {
    return { success: false, error: 'That trainer is not available.' }
  }
  let actorRequests = friendRequests(actor)
  let otherRequests = friendRequests(other)
  let actorFriends = friends(actor)
  let otherFriends = friends(other)

  if (operation === 'send') {
    if (actorFriends.includes(other.id) || otherFriends.includes(actor.id)) {
      return { success: false, error: 'Already friends' }
    }
    const betweenPair = (request: FriendRequest) =>
      request.status === 'pending' &&
      ((request.from === actor.id && request.to === other.id) ||
        (request.to === actor.id && request.from === other.id))
    if (actorRequests.some(betweenPair) || otherRequests.some(betweenPair)) {
      return { success: false, error: 'Friend request already pending' }
    }
    if (
      [actorRequests, otherRequests].some(
        (requests) =>
          requests.filter((request) => request.status === 'pending').length >=
          MAX_PENDING_FRIEND_REQUESTS,
      )
    ) {
      return {
        success: false,
        error:
          'Too many pending friend requests. Resolve existing requests first.',
      }
    }
    const request: FriendRequest = {
      id: requestId,
      from: actor.id,
      to: other.id,
      status: 'pending',
      createdAt: now,
    }
    actorRequests = [...actorRequests, request]
    otherRequests = [...otherRequests, request]
  } else if (operation === 'remove') {
    actorFriends = actorFriends.filter((id) => id !== other.id)
    otherFriends = otherFriends.filter((id) => id !== actor.id)
  } else {
    const request = actorRequests.find(
      (entry) =>
        entry.id === requestId &&
        entry.status === 'pending' &&
        ((entry.from === actor.id && entry.to === other.id) ||
          (entry.to === actor.id && entry.from === other.id)),
    )
    if (!request || (operation === 'accept' && request.to !== actor.id)) {
      return { success: false, error: 'Friend request is no longer pending.' }
    }
    if (operation === 'accept') {
      if (
        !otherRequests.some(
          (entry) =>
            entry.id === requestId &&
            entry.status === 'pending' &&
            entry.from === request.from &&
            entry.to === request.to,
        )
      ) {
        return { success: false, error: 'Friend request is no longer pending.' }
      }
      const accept = (entry: FriendRequest): FriendRequest =>
        entry.id === requestId ? { ...entry, status: 'accepted' } : entry
      actorRequests = actorRequests.map(accept)
      otherRequests = otherRequests.map(accept)
      actorFriends = [...new Set([...actorFriends, other.id])]
      otherFriends = [...new Set([...otherFriends, actor.id])]
    } else {
      actorRequests = actorRequests.filter((entry) => entry.id !== requestId)
      otherRequests = otherRequests.filter((entry) => entry.id !== requestId)
    }
  }
  return {
    success: true,
    actor: {
      friends: actorFriends,
      friendRequests: boundedRequests(actorRequests),
    },
    other: {
      friends: otherFriends,
      friendRequests: boundedRequests(otherRequests),
    },
  }
}
