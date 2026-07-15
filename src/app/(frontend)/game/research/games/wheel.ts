'use server'

import { redis } from '@/utilities/redis'
import { allGames } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { getUser, type ResearchState } from '../actions'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { incrementUserActivityResult } from '@/utilities/user-state'

interface PrizeWheelSpinData {
  spinId: string
  targetIndex: number
  spinDuration: number
  timestamp: number
}

export async function initiatePrizeWheelSpin() {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'prize-wheel-spin', 20, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many spin attempts. Please try again shortly.' }
    }

    const spinLock = await acquireActionLock(`lock:prize-wheel:spin:${user.id}`, 10)
    if (!spinLock.acquired) {
      return { success: false, error: 'Another spin is already being processed' }
    }

    const payload = await getPayload({ config: configPromise })

    try {
      const existingSpin = await redis.get<PrizeWheelSpinData>(`prizewheel:${user.id}`)
      if (existingSpin) {
        return { success: false, error: 'Please claim your existing spin first' }
      }

      const state = (await redis.get(`research:${user.id}`)) as ResearchState | null
      if (!state) {
        return { success: false, error: 'Session expired' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (!encounter || encounter.gameType !== 'prize-wheel') {
        return { success: false, error: 'Invalid game type' }
      }

      // Cost Check with fresh user state
      const cost = encounter.settings.cost
      const freshUser = await payload.findByID({ collection: 'users', id: user.id })
      let updatedBalance = 0

      if (cost) {
        const currentBalance = (freshUser.currency as any)?.[cost.currencyType] || 0
        if (currentBalance < cost.amount) {
          return { success: false, error: 'Insufficient funds' }
        }

        updatedBalance = currentBalance - cost.amount

        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            currency: {
              ...freshUser.currency,
              [cost.currencyType]: updatedBalance,
            },
          },
        })
      }

      // Determine Result
      const slots = encounter.settings.slots || []
      if (slots.length === 0) {
        return { success: false, error: 'Configuration error: No slots' }
      }

      const totalWeight = slots.reduce(
        (sum: number, slot: { percentage: number }) => sum + slot.percentage,
        0,
      )
      let random = Math.random() * totalWeight
      let targetIndex = 0

      for (let i = 0; i < slots.length; i++) {
        random -= slots[i].percentage
        if (random <= 0) {
          targetIndex = i
          break
        }
      }

      // Spin Duration
      const minTime = encounter.settings.spinTime?.min || 3
      const maxTime = encounter.settings.spinTime?.max || 6
      const spinDuration = minTime + Math.random() * (maxTime - minTime)

      const spinData: PrizeWheelSpinData = {
        spinId: crypto.randomUUID(),
        targetIndex,
        spinDuration,
        timestamp: Date.now(),
      }

      try {
        // Save state to Redis (waiting for claim)
        await redis.set(`prizewheel:${user.id}`, spinData, { ex: 120 })
      } catch (spinError) {
        // Best-effort rollback if we already charged but failed to persist spin.
        if (cost) {
          const rollbackUser = await payload.findByID({ collection: 'users', id: user.id })
          const rollbackBalance = (rollbackUser.currency as any)?.[cost.currencyType] || 0
          await payload.update({
            collection: 'users',
            id: user.id,
            data: {
              currency: {
                ...rollbackUser.currency,
                [cost.currencyType]: rollbackBalance + cost.amount,
              },
            },
          })
        }
        throw spinError
      }

      return {
        success: true,
        targetIndex,
        spinDuration,
        spinId: spinData.spinId,
        balance: cost ? updatedBalance : undefined,
      }
    } finally {
      await releaseActionLock(spinLock)
    }
  } catch (error) {
    console.error('Error initiating prize wheel spin:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function claimPrizeWheelReward(encounterId: string) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'prize-wheel-claim', 30, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many claim attempts. Please wait a moment.' }
    }

    const spinKey = `prizewheel:${user.id}`
    const spinDataRaw = await redis.get<PrizeWheelSpinData | string>(spinKey)
    if (!spinDataRaw) {
      return { success: false, error: 'Spin session expired or invalid' }
    }

    const spinData =
      typeof spinDataRaw === 'string'
        ? (JSON.parse(spinDataRaw) as PrizeWheelSpinData)
        : (spinDataRaw as PrizeWheelSpinData)

    if (typeof spinData?.targetIndex !== 'number') {
      return { success: false, error: 'Invalid spin session data' }
    }

    const spinId = spinData.spinId || `${spinData.timestamp}-${spinData.targetIndex}`
    const idempotentResultKey = `prizewheel:claim-result:${user.id}:${spinId}`

    const cachedResult = await getIdempotentResult<any>(idempotentResultKey)
    if (cachedResult) {
      return cachedResult
    }

    const claimLock = await acquireActionLock(`lock:prize-wheel:claim:${user.id}:${spinId}`, 12)
    if (!claimLock.acquired) {
      return { success: false, error: 'Reward claim already in progress' }
    }

    try {
      const cachedResultAfterLock = await getIdempotentResult<any>(idempotentResultKey)
      if (cachedResultAfterLock) {
        return cachedResultAfterLock
      }

      const payload = await getPayload({ config: configPromise })

      const state = (await redis.get(`research:${user.id}`)) as ResearchState | null
      if (!state || state.encounterId !== encounterId) {
        return { success: false, error: 'Research session mismatch' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (!encounter || encounter.gameType !== 'prize-wheel') {
        return { success: false, error: 'Invalid game type' }
      }

      const slots = encounter.settings.slots || []
      const targetSlot = slots[spinData.targetIndex]

      if (!targetSlot) {
        return { success: false, error: 'Invalid target slot' }
      }

      // Grant Rewards
      let rewardSummary = null
      const hasRewards = targetSlot.rewards && targetSlot.rewards.length > 0

      if (hasRewards) {
        const res = await grantRewards(user.id, targetSlot.rewards)
        rewardSummary = res.summary
      }

      await incrementUserActivityResult(
        payload as any,
        user.id,
        'researchEncounterResults',
        encounterId,
        hasRewards ? { wins: 1 } : { losses: 1 },
      )

      const response = {
        success: true,
        summary: rewardSummary,
        message: hasRewards ? 'Prize Claimed!' : 'Better luck next time!',
      }

      await setIdempotentResult(idempotentResultKey, response, 600)
      await redis.del(spinKey)

      return response
    } finally {
      await releaseActionLock(claimLock)
    }
  } catch (error) {
    console.error('Error claiming prize wheel reward:', error)
    return { success: false, error: 'Internal server error' }
  }
}
