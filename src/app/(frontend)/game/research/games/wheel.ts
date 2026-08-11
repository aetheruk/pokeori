'use server'

import { redis } from '@/utilities/redis'
import { allGames } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import {
  clearGameActivityStateForUser,
  completeGameActivity,
  getUser,
  type GameActivityState,
} from '@/app/(frontend)/game/_shared/activity-actions'
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
  encounterId?: string
  targetIndex: number
  spinDuration: number
  timestamp: number
}

interface PrizeWheelClaimResult {
  success: boolean
  summary?: any
  message?: string
  error?: string
  hasRewards?: boolean
}

function parseSpinData(
  spinDataRaw: PrizeWheelSpinData | string,
): PrizeWheelSpinData | null {
  try {
    const spinData =
      typeof spinDataRaw === 'string'
        ? (JSON.parse(spinDataRaw) as PrizeWheelSpinData)
        : spinDataRaw
    return typeof spinData?.targetIndex === 'number' ? spinData : null
  } catch {
    return null
  }
}

async function settlePrizeWheelSpin({
  userId,
  encounterId,
  spinData,
  deleteSpinOnSuccess,
}: {
  userId: string
  encounterId: string
  spinData: PrizeWheelSpinData
  deleteSpinOnSuccess: boolean
}): Promise<PrizeWheelClaimResult> {
  if (spinData.encounterId && spinData.encounterId !== encounterId) {
    return { success: false, error: 'Research session mismatch' }
  }

  const spinId =
    spinData.spinId || `${spinData.timestamp}-${spinData.targetIndex}`
  const idempotentResultKey = `prizewheel:claim-result:${userId}:${spinId}`
  const spinKey = `prizewheel:${userId}`
  const cachedResult =
    await getIdempotentResult<PrizeWheelClaimResult>(idempotentResultKey)
  if (cachedResult) {
    if (deleteSpinOnSuccess) await redis.del(spinKey)
    return cachedResult
  }

  const claimLock = await acquireActionLock(
    `lock:prize-wheel:claim:${userId}:${spinId}`,
    12,
  )
  if (!claimLock.acquired) {
    return { success: false, error: 'Reward claim already in progress' }
  }

  try {
    const cachedResultAfterLock =
      await getIdempotentResult<PrizeWheelClaimResult>(idempotentResultKey)
    if (cachedResultAfterLock) {
      if (deleteSpinOnSuccess) await redis.del(spinKey)
      return cachedResultAfterLock
    }

    const state = (await redis.get(`game:${userId}`)) as GameActivityState | null
    if (!state || state.encounterId !== encounterId) {
      return { success: false, error: 'Research session mismatch' }
    }

    const encounter = allGames.find((entry) => entry.id === state.encounterId)
    if (encounter?.gameType !== 'prize-wheel') {
      return { success: false, error: 'Invalid game type' }
    }

    const targetSlot = (encounter.settings.slots || [])[spinData.targetIndex]
    if (!targetSlot) {
      return { success: false, error: 'Invalid target slot' }
    }

    const hasRewards = Boolean(targetSlot.rewards?.length)
    let rewardSummary = null
    if (hasRewards) {
      const rewardResult = await grantRewards(userId, targetSlot.rewards, {
        idempotencyKey: idempotentResultKey,
      })
      rewardSummary = rewardResult.summary
    }

    const payload = await getPayload({ config: configPromise })
    await incrementUserActivityResult(
      payload as any,
      userId,
      'gameResults',
      encounterId,
      hasRewards ? { wins: 1 } : { losses: 1 },
    )

    const response: PrizeWheelClaimResult = {
      success: true,
      summary: rewardSummary,
      message: hasRewards ? 'Prize Claimed!' : 'Better luck next time!',
      hasRewards,
    }
    await setIdempotentResult(idempotentResultKey, response, 600)
    if (deleteSpinOnSuccess) await redis.del(spinKey)
    return response
  } finally {
    await releaseActionLock(claimLock)
  }
}

export async function initiatePrizeWheelSpin() {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'prize-wheel-spin',
      20,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many spin attempts. Please try again shortly.',
      }
    }

    const spinLock = await acquireActionLock(
      `lock:prize-wheel:spin:${user.id}`,
      10,
    )
    if (!spinLock.acquired) {
      return {
        success: false,
        error: 'Another spin is already being processed',
      }
    }

    const payload = await getPayload({ config: configPromise })

    try {
      const existingSpin = await redis.get<PrizeWheelSpinData>(
        `prizewheel:${user.id}`,
      )
      if (existingSpin) {
        return {
          success: false,
          error: 'Please claim your existing spin first',
        }
      }

      const state = (await redis.get(
        `game:${user.id}`,
      )) as GameActivityState | null
      if (!state) {
        return { success: false, error: 'Session expired' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (encounter?.gameType !== 'prize-wheel') {
        return { success: false, error: 'Invalid game type' }
      }

      // Cost Check with fresh user state
      const cost = encounter.settings.cost
      const freshUser = await payload.findByID({
        collection: 'users',
        id: user.id,
      })
      let updatedBalance = 0

      if (cost) {
        const currentBalance =
          (freshUser.currency as any)?.[cost.currencyType] || 0
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
        encounterId: encounter.id,
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
          const rollbackUser = await payload.findByID({
            collection: 'users',
            id: user.id,
          })
          const rollbackBalance =
            (rollbackUser.currency as any)?.[cost.currencyType] || 0
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

    const rateLimit = await checkActionRateLimit(
      user.id,
      'prize-wheel-claim',
      30,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many claim attempts. Please wait a moment.',
      }
    }

    const spinKey = `prizewheel:${user.id}`
    const spinDataRaw = await redis.get<PrizeWheelSpinData | string>(spinKey)
    if (!spinDataRaw) {
      return { success: false, error: 'Spin session expired or invalid' }
    }

    const spinData = parseSpinData(spinDataRaw)
    if (!spinData) {
      return { success: false, error: 'Invalid spin session data' }
    }

    return settlePrizeWheelSpin({
      userId: user.id,
      encounterId,
      spinData,
      deleteSpinOnSuccess: true,
    })
  } catch (error) {
    console.error('Error claiming prize wheel reward:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function exitPrizeWheel(encounterId: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const exitLock = await acquireActionLock(
      `lock:prize-wheel:exit:${user.id}`,
      20,
    )
    if (!exitLock.acquired) {
      return { success: false, error: 'Prize wheel exit already in progress' }
    }

    try {
      const state = (await redis.get(
        `game:${user.id}`,
      )) as GameActivityState | null
      if (state && state.encounterId !== encounterId) {
        return { success: false, error: 'Research session mismatch' }
      }

      const spinKey = `prizewheel:${user.id}`
      const spinDataRaw =
        await redis.get<PrizeWheelSpinData | string>(spinKey)

      if (!spinDataRaw) {
        if (state) await clearGameActivityStateForUser(user.id, 'game')
        return { success: true }
      }
      if (!state) {
        return { success: false, error: 'Research session mismatch' }
      }

      const spinData = parseSpinData(spinDataRaw)
      if (!spinData) {
        return { success: false, error: 'Invalid spin session data' }
      }

      const claimResult = await settlePrizeWheelSpin({
        userId: user.id,
        encounterId,
        spinData,
        deleteSpinOnSuccess: false,
      })
      if (!claimResult.success) return claimResult

      const completionResult = await completeGameActivity(
        'game',
        encounterId,
        Boolean(claimResult.hasRewards),
      )
      if (!completionResult.success) {
        return {
          success: false,
          error: completionResult.error || 'Unable to close prize wheel session',
        }
      }

      await redis.del(spinKey)
      await clearGameActivityStateForUser(user.id, 'game')
      return { success: true, settledSpin: true }
    } finally {
      await releaseActionLock(exitLock)
    }
  } catch (error) {
    console.error('Error exiting prize wheel:', error)
    return { success: false, error: 'Internal server error' }
  }
}
