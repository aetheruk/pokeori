'use server'

import { redis } from '@/utilities/redis'
import { allGames } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { mergeSummaries } from '../utils'
import { getUser, type ResearchState } from '../actions'
import type { Reward } from '@/utilities/rewards/reward-logic'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { incrementUserActivityResult } from '@/utilities/user-state'

type PachinkoSettlementResult = {
  success: boolean
  error?: string
  balance?: number
  rewards?: any
  summary?: any
  totalCost?: number
}

function getDropResultKey(userId: string, dropId?: string) {
  if (!dropId) return null
  if (!/^[a-zA-Z0-9:_-]{1,80}$/.test(dropId)) return null
  return `pachinko:drop-result:${userId}:${dropId}`
}

async function settlePachinkoDrop({
  bucketId,
  dropId,
  action,
}: {
  bucketId?: string
  dropId?: string
  action: 'bucket' | 'miss'
}): Promise<PachinkoSettlementResult> {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const idempotentResultKey = getDropResultKey(user.id, dropId)
    if (dropId && !idempotentResultKey) {
      return { success: false, error: 'Invalid drop id' }
    }

    if (idempotentResultKey) {
      const cachedResult = await getIdempotentResult<PachinkoSettlementResult>(idempotentResultKey)
      if (cachedResult) return cachedResult
    }

    const rateLimit = await checkActionRateLimit(
      user.id,
      action === 'bucket' ? 'pachinko-drop' : 'pachinko-miss',
      80,
      60,
    )
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many pachinko actions. Please wait a moment.' }
    }

    const actionLock = await acquireActionLock(`lock:pachinko:action:${user.id}`, 10)
    if (!actionLock.acquired) {
      return { success: false, error: 'A pachinko action is already being processed' }
    }

    const payload = await getPayload({ config: configPromise })

    try {
      if (idempotentResultKey) {
        const cachedResult = await getIdempotentResult<PachinkoSettlementResult>(idempotentResultKey)
        if (cachedResult) return cachedResult
      }

      const state = (await redis.get(`research:${user.id}`)) as ResearchState | null
      if (!state) {
        return { success: false, error: 'Session expired' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (!encounter || encounter.gameType !== 'pachinko') {
        return { success: false, error: 'Invalid game type' }
      }

      // Cost Check using fresh user read
      const freshUser = await payload.findByID({ collection: 'users', id: user.id })
      const cost = encounter.settings.cost
      let currentBalance = 0
      if (cost) {
        const currencyKey = cost.currencyType
        currentBalance = freshUser.currency?.[currencyKey] || 0
        if (currentBalance < cost.amount) {
          return { success: false, error: 'Insufficient funds' }
        }
      }

      const bucket =
        action === 'bucket'
          ? encounter.settings.board?.buckets.find((b: { id: string }) => b.id === bucketId)
          : null
      if (action === 'bucket' && !bucket) {
        return { success: false, error: 'Invalid bucket' }
      }

      const hasRewards = bucket?.rewards && bucket.rewards.length > 0
      const isWin = action === 'bucket' && hasRewards

      await incrementUserActivityResult(
        payload as any,
        user.id,
        'researchEncounterResults',
        state.encounterId,
        isWin ? { wins: 1 } : { losses: 1 },
      )

      const updateData: any = {}
      if (cost) {
        updateData.currency = {
          ...freshUser.currency,
          [cost.currencyType]: currentBalance - cost.amount,
        }
      }

      if (Object.keys(updateData).length > 0) {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: updateData,
        })
      }

      // Grant Rewards
      let dropSummary = null
      if (hasRewards) {
        const res = await grantRewards(user.id, bucket.rewards as unknown as Reward[])
        dropSummary = res.summary
      }

      // Update Redis
      const currentSession = state.pachinkoSession || { totalRewards: {}, totalCost: 0 }
      if (dropSummary) {
        currentSession.totalRewards = mergeSummaries(currentSession.totalRewards, dropSummary)
      }
      currentSession.totalCost = (currentSession.totalCost || 0) + (cost?.amount || 0)
      state.pachinkoSession = currentSession
      if (isWin) state.wins += 1
      else state.losses += 1

      await redis.set(`research:${user.id}`, state, { ex: 3600 })

      const response = {
        success: true,
        balance: cost ? currentBalance - cost.amount : freshUser.currency?.pokedollars || 0,
        rewards: dropSummary,
        summary: currentSession.totalRewards,
        totalCost: currentSession.totalCost,
      }

      if (idempotentResultKey) {
        await setIdempotentResult(idempotentResultKey, response, 600)
      }

      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error(`Error completing pachinko ${action}:`, error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function completePachinkoDrop(bucketId: string, dropId?: string) {
  return settlePachinkoDrop({ bucketId, dropId, action: 'bucket' })
}

/**
 * Track a missed pachinko drop (ball hit floor, not a bucket)
 * Deducts cost but gives no rewards, increments loss stat
 */
export async function completePachinkoMiss(dropId?: string) {
  return settlePachinkoDrop({ dropId, action: 'miss' })
}
