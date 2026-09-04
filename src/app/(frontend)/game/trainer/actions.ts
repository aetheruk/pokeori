'use server'

import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { mysteryGifts } from '@/data/mystery-gifts'
import type { User } from '@/payload-types'
import {
  getEconomyActionErrorMessage,
  runEconomyAction,
} from '@/utilities/economy/transactions'
import { isKidModeUser, KID_MODE_ACCESS_ERROR } from '@/utilities/kid-mode'
import { buildPublicTrainerSummaries } from '@/utilities/trainers/public-summary'

async function getFreshAuthenticatedUser(payload: any): Promise<User | null> {
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return null
  return payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 0,
  }) as Promise<User>
}

// --- Search Trainers ---

export async function searchTrainers(query: string) {
  const payload = await getPayload({ config: configPromise })
  const currentUser = await getFreshAuthenticatedUser(payload)

  if (!currentUser) {
    return { success: false, error: 'Not authenticated' }
  }
  if (isKidModeUser(currentUser)) {
    return { success: false, error: KID_MODE_ACCESS_ERROR }
  }

  if (!query || query.length < 3) {
    return { success: false, error: 'Search query too short' }
  }

  try {
    const users = await payload.find({
      collection: 'users',
      where: {
        and: [
          { trainerName: { contains: query } },
          { kidMode: { not_equals: true } },
        ],
      },
      limit: 10,
      depth: 0,
      select: {
        trainerName: true,
        icon: true,
        banner: true,
        title: true,
        skills: true,
      },
    })

    const results = await buildPublicTrainerSummaries({
      payload,
      trainers: users.docs,
      viewer: currentUser,
    })

    return { success: true, data: results }
  } catch (error) {
    console.error('Search error:', error)
    return { success: false, error: 'Failed to search trainers' }
  }
}

// --- High Scores ---

export async function getHighScores(
  skill:
    | 'catching'
    | 'battling'
    | 'researching'
    | 'artisan'
    | 'ranked-battling',
) {
  const payload = await getPayload({ config: configPromise })
  const currentUser = await getFreshAuthenticatedUser(payload)

  if (!currentUser) {
    return { success: false, error: 'Not authenticated' }
  }
  if (isKidModeUser(currentUser)) {
    return { success: false, error: KID_MODE_ACCESS_ERROR }
  }

  try {
    const sortedUsers = await payload.find({
      collection: 'users',
      where: {
        kidMode: {
          not_equals: true,
        },
      },
      sort: `-skills.${skill}.level`,
      limit: 20,
      depth: 0,
      select: {
        trainerName: true,
        icon: true,
        banner: true,
        title: true,
        skills: true,
      },
    })

    const summaries = await buildPublicTrainerSummaries({
      payload,
      trainers: sortedUsers.docs,
      viewer: currentUser,
    })
    const results = summaries.map((summary) => ({
      ...summary,
      level: currentSkill(summary.skills, skill)?.level || 1,
      exp: currentSkill(summary.skills, skill)?.exp || 0,
    }))

    return { success: true, data: results }
  } catch (error) {
    console.error('High scores error:', error)
    return { success: false, error: 'Failed to get high scores' }
  }
}

function currentSkill(skills: User['skills'], skill: string) {
  return skills?.[skill as keyof NonNullable<User['skills']>]
}

// --- Mystery Gift ---

export async function redeemMysteryGift(code: string, clientActionId: string) {
  const payload = await getPayload({ config: configPromise })
  const user = await getFreshAuthenticatedUser(payload)

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }
  if (isKidModeUser(user)) {
    return { success: false, error: KID_MODE_ACCESS_ERROR }
  }
  if (!clientActionId)
    return { success: false, error: 'Missing action identifier' }

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

  try {
    const result = await runEconomyAction(
      {
        userId: user.id,
        action: 'redeem-mystery-gift',
        requestId: clientActionId,
      },
      async ({ payload: transactionPayload, req }) => {
        const freshUser = await transactionPayload.findByID({
          collection: 'users',
          id: user.id,
          depth: 0,
          req,
        })
        const redeemedCodes = (freshUser as any).redeemedCodes || []
        if (redeemedCodes.includes(normalizedCode)) {
          return {
            success: false,
            error: 'You have already redeemed this code',
          }
        }

        const { grantRewards } = await import(
          '@/utilities/rewards/reward-logic'
        )
        const { summary } = await grantRewards(user.id, gift.rewards, {
          source: 'mystery-gift',
          payload: transactionPayload,
          req,
        })

        await transactionPayload.update({
          collection: 'users',
          id: user.id,
          data: {
            redeemedCodes: [...redeemedCodes, normalizedCode],
          },
          req,
        })

        return { success: true, summary }
      },
    )
    revalidatePath('/game')
    return result
  } catch (error) {
    console.error('Redemption error:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}
