'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { mysteryGifts } from '@/data/mystery-gifts'
import { revalidatePath } from 'next/cache'
import { getUserPokedexMap, getUserTcgMap } from '@/utilities/user-state'

async function getTrainerCollectionCounts(payload: any, userId: string) {
  const [tcg, pokedex] = await Promise.all([
    getUserTcgMap(payload, userId),
    getUserPokedexMap(payload, userId),
  ])

  let seenCount = 0
  let caughtCount = 0
  Object.values(pokedex).forEach((species: any) => {
    Object.values(species).forEach((form: any) => {
      if (form.seen) seenCount++
      if (form.caught) caughtCount++
    })
  })

  return {
    uniqueCards: Object.keys(tcg).length,
    pokedexSeen: seenCount,
    pokedexCaught: caughtCount,
  }
}

// --- Search Trainers ---

export async function searchTrainers(query: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: currentUser } = await payload.auth({ headers: headersList })

  if (!query || query.length < 3) {
    return { success: false, error: 'Search query too short' }
  }

  try {
    const users = await payload.find({
      collection: 'users',
      where: {
        trainerName: {
          contains: query,
        },
      },
      limit: 10,
    })

    const currentUserFriends = currentUser ? (currentUser as any).friends || [] : []
    const currentUserRequests = currentUser ? (currentUser as any).friendRequests || [] : []

    const results = await Promise.all(users.docs.map(async (user) => {
      const collectionCounts = await getTrainerCollectionCounts(payload, user.id)
      // Check friend status
      const isFriend = currentUserFriends.includes(user.id)
      const hasPendingRequest = currentUserRequests.some(
        (req: any) =>
          ((req.from === currentUser?.id && req.to === user.id) ||
            (req.from === user.id && req.to === currentUser?.id)) &&
          req.status === 'pending',
      )

      return {
        id: user.id,
        trainerName: user.trainerName,
        icon: (user as any).icon || 'ditto',
        banner: (user as any).banner || 'lab',
        title: (user as any).title || 'new-beginnings',
        skills: user.skills,
        battleTeam: (user as any).battleTeam || [],
        stats: {
          ...collectionCounts,
        },
        isFriend,
        hasPendingRequest,
      }
    }))

    return { success: true, data: results }
  } catch (error) {
    console.error('Search error:', error)
    return { success: false, error: 'Failed to search trainers' }
  }
}

// --- High Scores ---

export async function getHighScores(
  skill: 'catching' | 'battling' | 'researching' | 'artisan' | 'ranked-battling',
) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: currentUser } = await payload.auth({ headers: headersList })

  try {
    const sortedUsers = await payload.find({
      collection: 'users',
      sort: `-skills.${skill}.level`,
      limit: 20,
    })

    const currentUserFriends = currentUser ? (currentUser as any).friends || [] : []
    const currentUserRequests = currentUser ? (currentUser as any).friendRequests || [] : []

    const results = await Promise.all(sortedUsers.docs.map(async (user) => {
      const collectionCounts = await getTrainerCollectionCounts(payload, user.id)
      // Check friend status
      const isFriend = currentUserFriends.includes(user.id)
      const hasPendingRequest = currentUserRequests.some(
        (req: any) =>
          ((req.from === currentUser?.id && req.to === user.id) ||
            (req.from === user.id && req.to === currentUser?.id)) &&
          req.status === 'pending',
      )

      return {
        id: user.id,
        trainerName: user.trainerName,
        icon: (user as any).icon || 'ditto',
        banner: (user as any).banner || 'lab',
        title: (user as any).title || 'new-beginnings',
        skills: user.skills,
        battleTeam: (user as any).battleTeam || [],
        stats: {
          ...collectionCounts,
        },
        isFriend,
        hasPendingRequest,
        level: user.skills?.[skill]?.level || 1,
        exp: user.skills?.[skill]?.exp || 0,
      }
    }))

    return { success: true, data: results }
  } catch (error) {
    console.error('High scores error:', error)
    return { success: false, error: 'Failed to get high scores' }
  }
}

// --- Mystery Gift ---

export async function redeemMysteryGift(code: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const normalizedCode = code.toUpperCase().trim()
  const gift = mysteryGifts.find((g) => g.code === normalizedCode)

  if (!gift) {
    return { success: false, error: 'Invalid code' }
  }

  if (!gift.active) {
    return { success: false, error: 'This code has expired' }
  }

  if (gift.expirationDate && new Date(gift.expirationDate) < new Date()) {
    return { success: false, error: 'This code has expired' }
  }

  // Check if already redeemed
  const redeemedCodes = (user as any).redeemedCodes || []
  if (redeemedCodes.includes(normalizedCode)) {
    return { success: false, error: 'You have already redeemed this code' }
  }

  try {
    // Grant rewards using the comprehensive system
    const { grantRewards } = await import('@/utilities/rewards/reward-logic')
    const { summary } = await grantRewards(user.id, gift.rewards, { source: 'mystery-gift' })

    // Update redeemed codes
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        redeemedCodes: [...redeemedCodes, normalizedCode],
      },
    })

    revalidatePath('/game')

    return { success: true, summary }
  } catch (error) {
    console.error('Redemption error:', error)
    return { success: false, error: 'Failed to redeem code' }
  }
}
