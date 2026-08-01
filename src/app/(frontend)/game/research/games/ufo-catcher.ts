'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  completeGameActivity,
  getGameActivityStateForUser,
  getUser,
  setGameActivityStateForUser,
  type GameActivityState,
} from '@/app/(frontend)/game/_shared/activity-actions'
import { allGames } from '@/data/games'
import type {
  UfoCatcherGameConfig,
  UfoCatcherPublicAttempt,
  UfoCatcherSettings,
} from '@/data/games/ufo-catcher'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'
import {
  buildUfoCatcherPrizeLayout,
  getEligibleUfoCatcherTiers,
  resolveUfoCatcherAttempt,
  type UfoCatcherControlInput,
} from '@/utilities/research/ufo-catcher'
import type { Reward } from '@/utilities/rewards/reward-logic'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import {
  getUserInventoryMap,
  incrementUserActivityResult,
} from '@/utilities/user-state'
import { mergeSummaries } from '../utils'

const UFO_CATCHER_ATTEMPT_TTL_SECONDS = 300
const UFO_CATCHER_RESULT_TTL_SECONDS = 600

interface UfoCatcherPrivateAttempt {
  publicAttempt: UfoCatcherPublicAttempt
  gripRoll: number
  rewardsByTierId: Record<string, Reward[]>
}

export interface UfoCatcherAttemptResult {
  success: boolean
  error?: string
  restored?: boolean
  attempt?: UfoCatcherPublicAttempt
  balance?: number
  outcome?: 'miss' | 'slip' | 'caught'
  coordinates?: { x: number; y: number }
  prize?: UfoCatcherPublicAttempt['prizes'][number]
  gripChance?: number
  rewards?: any
  summary?: any
  totalCost?: number
}

function getAttemptKey(userId: string) {
  return `ufo-catcher:${userId}`
}

function getResultKey(userId: string, attemptId: unknown) {
  if (
    typeof attemptId !== 'string' ||
    !/^[a-zA-Z0-9-]{1,80}$/.test(attemptId)
  ) {
    return null
  }
  return `ufo-catcher:result:${userId}:${attemptId}`
}

function secureRoll() {
  const values = new Uint32Array(1)
  crypto.getRandomValues(values)
  return values[0] / 2 ** 32
}

function getCurrencyBalance(user: any, currencyType: string) {
  return Number(user.currency?.[currencyType] || 0)
}

function getEncounter(encounterId: string) {
  const encounter = allGames.find((entry) => entry.id === encounterId)
  return encounter?.gameType === 'ufo-catcher'
    ? (encounter as unknown as UfoCatcherGameConfig)
    : null
}

async function saveSessionState(
  userId: string,
  state: GameActivityState,
  sessionSeconds = 720,
) {
  const ttl = Math.max(
    sessionSeconds,
    Math.ceil((state.expiry - Date.now()) / 1000) + 120,
  )
  await setGameActivityStateForUser(userId, 'game', state, ttl)
}

export async function startUfoCatcherAttempt(
  encounterId: string,
): Promise<UfoCatcherAttemptResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'ufo-catcher-start',
      30,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many attempts. Please wait a moment.',
      }
    }

    const actionLock = await acquireActionLock(
      `lock:ufo-catcher:action:${user.id}`,
      12,
    )
    if (!actionLock.acquired) {
      return {
        success: false,
        error: 'Another claw attempt is being processed',
      }
    }

    const payload = await getPayload({ config: configPromise })
    try {
      const encounter = getEncounter(encounterId)
      if (!encounter) return { success: false, error: 'Invalid game type' }

      const state = await getGameActivityStateForUser(user.id, 'game')
      if (!state || state.encounterId !== encounterId) {
        return { success: false, error: 'UFO Catcher session changed' }
      }

      const attemptKey = getAttemptKey(user.id)
      const existing = await redis.get<UfoCatcherPrivateAttempt>(attemptKey)
      if (existing?.publicAttempt.encounterId === encounterId) {
        return {
          success: true,
          restored: true,
          attempt: existing.publicAttempt,
          balance: getCurrencyBalance(
            user,
            encounter.settings.cost.currencyType,
          ),
          summary: state.ufoCatcherSession?.totalRewards || {},
          totalCost: state.ufoCatcherSession?.totalCost || 0,
        }
      }
      if (existing) await redis.del(attemptKey)

      const freshUser = await payload.findByID({
        collection: 'users',
        id: user.id,
      })
      const freshInventory = await getUserInventoryMap(payload, freshUser.id)
      const { cost } = encounter.settings
      const currentBalance = getCurrencyBalance(freshUser, cost.currencyType)
      if (currentBalance < cost.amount) {
        return { success: false, error: 'Insufficient funds' }
      }

      const prizeCount = encounter.settings.prizeCount
      const eligibleTiers = getEligibleUfoCatcherTiers(
        encounter.settings.tiers,
        {
          unlockedIcons: freshUser.unlockedIcons,
          unlockedTitles: freshUser.unlockedTitles,
          inventory: freshInventory,
        },
      )
      const publicAttempt: UfoCatcherPublicAttempt = {
        attemptId: crypto.randomUUID(),
        encounterId,
        createdAt: Date.now(),
        prizes: buildUfoCatcherPrizeLayout({
          settings: {
            ...(encounter.settings as UfoCatcherSettings),
            tiers: eligibleTiers,
          },
          tierRolls: Array.from({ length: prizeCount }, secureRoll),
          anchorRolls: Array.from({ length: prizeCount }, secureRoll),
          jitterRolls: Array.from({ length: prizeCount }, () => ({
            x: secureRoll(),
            y: secureRoll(),
          })),
        }),
        xTravelMs: encounter.settings.xTravelMs,
        yTravelMs: encounter.settings.yTravelMs,
      }
      const privateAttempt: UfoCatcherPrivateAttempt = {
        publicAttempt,
        gripRoll: secureRoll(),
        rewardsByTierId: Object.fromEntries(
          eligibleTiers.map((tier) => [tier.id, tier.rewards as Reward[]]),
        ),
      }

      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          currency: {
            ...freshUser.currency,
            [cost.currencyType]: currentBalance - cost.amount,
          },
        },
      })

      try {
        await redis.set(attemptKey, privateAttempt, {
          ex: UFO_CATCHER_ATTEMPT_TTL_SECONDS,
        })
        const currentSession = state.ufoCatcherSession || {
          totalRewards: {},
          totalCost: 0,
        }
        state.ufoCatcherSession = {
          ...currentSession,
          totalCost: currentSession.totalCost + cost.amount,
        }
        await saveSessionState(user.id, state)
      } catch (error) {
        await redis.del(attemptKey)
        const rollbackUser = await payload.findByID({
          collection: 'users',
          id: user.id,
        })
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            currency: {
              ...rollbackUser.currency,
              [cost.currencyType]:
                getCurrencyBalance(rollbackUser, cost.currencyType) +
                cost.amount,
            },
          },
        })
        throw error
      }

      return {
        success: true,
        attempt: publicAttempt,
        balance: currentBalance - cost.amount,
        summary: state.ufoCatcherSession.totalRewards,
        totalCost: state.ufoCatcherSession.totalCost,
      }
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error starting UFO Catcher attempt:', error)
    return { success: false, error: 'Unable to start the claw' }
  }
}

export async function settleUfoCatcherAttempt({
  encounterId,
  attemptId,
  input,
}: {
  encounterId: string
  attemptId: string
  input: UfoCatcherControlInput
}): Promise<UfoCatcherAttemptResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const resultKey = getResultKey(user.id, attemptId)
    if (!resultKey) return { success: false, error: 'Invalid attempt id' }

    const cached = await getIdempotentResult<UfoCatcherAttemptResult>(resultKey)
    if (cached) return cached

    const rateLimit = await checkActionRateLimit(
      user.id,
      'ufo-catcher-settle',
      40,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many attempts. Please wait a moment.',
      }
    }

    const actionLock = await acquireActionLock(
      `lock:ufo-catcher:action:${user.id}`,
      15,
    )
    if (!actionLock.acquired) {
      return { success: false, error: 'The claw is already resolving' }
    }

    try {
      const lockedCached =
        await getIdempotentResult<UfoCatcherAttemptResult>(resultKey)
      if (lockedCached) return lockedCached

      const state = await getGameActivityStateForUser(user.id, 'game')
      if (!state || state.encounterId !== encounterId) {
        return { success: false, error: 'UFO Catcher session changed' }
      }

      const encounter = getEncounter(encounterId)
      if (!encounter) return { success: false, error: 'Invalid game type' }

      const attempt = await redis.get<UfoCatcherPrivateAttempt>(
        getAttemptKey(user.id),
      )
      if (
        !attempt ||
        attempt.publicAttempt.attemptId !== attemptId ||
        attempt.publicAttempt.encounterId !== encounterId
      ) {
        return { success: false, error: 'Claw attempt expired or changed' }
      }

      const elapsedMs = Date.now() - attempt.publicAttempt.createdAt
      if (
        !input ||
        !Number.isFinite(input.xHoldMs) ||
        !Number.isFinite(input.yHoldMs) ||
        elapsedMs + 400 < input.xHoldMs + input.yHoldMs
      ) {
        return { success: false, error: 'Invalid claw movement timing' }
      }

      const resolution = resolveUfoCatcherAttempt({
        settings: encounter.settings as UfoCatcherSettings,
        prizes: attempt.publicAttempt.prizes,
        input,
        gripRoll: attempt.gripRoll,
      })
      if (!resolution) {
        return { success: false, error: 'Invalid claw controls' }
      }

      const payload = await getPayload({ config: configPromise })
      let rewardSummary = null
      if (resolution.outcome === 'caught') {
        const tier = encounter.settings.tiers.find(
          (entry) => entry.id === resolution.prize.tierId,
        )
        const rewards =
          attempt.rewardsByTierId?.[resolution.prize.tierId] || tier?.rewards
        if (!rewards)
          return { success: false, error: 'Prize configuration changed' }
        const rewardResult = await grantRewards(
          user.id,
          rewards,
        )
        rewardSummary = rewardResult.summary
      }

      const won = resolution.outcome === 'caught'
      await incrementUserActivityResult(
        payload as any,
        user.id,
        'gameResults',
        encounterId,
        won ? { wins: 1 } : { losses: 1 },
      )

      const currentSession = state.ufoCatcherSession || {
        totalRewards: {},
        totalCost: 0,
      }
      if (rewardSummary) {
        currentSession.totalRewards = mergeSummaries(
          currentSession.totalRewards,
          rewardSummary,
        )
      }
      state.ufoCatcherSession = currentSession
      if (won) state.wins += 1
      else state.losses += 1
      await saveSessionState(user.id, state)

      const freshUser = await payload.findByID({
        collection: 'users',
        id: user.id,
      })
      const response: UfoCatcherAttemptResult = {
        success: true,
        outcome: resolution.outcome,
        coordinates: resolution.coordinates,
        prize: resolution.outcome === 'miss' ? undefined : resolution.prize,
        gripChance: resolution.gripChance,
        rewards: rewardSummary,
        summary: currentSession.totalRewards,
        totalCost: currentSession.totalCost,
        balance: getCurrencyBalance(
          freshUser,
          encounter.settings.cost.currencyType,
        ),
      }

      await setIdempotentResult(
        resultKey,
        response,
        UFO_CATCHER_RESULT_TTL_SECONDS,
      )
      await redis.del(getAttemptKey(user.id))
      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error settling UFO Catcher attempt:', error)
    return { success: false, error: 'The claw failed to resolve' }
  }
}

export async function exitUfoCatcher(encounterId: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const exitLock = await acquireActionLock(
      `lock:ufo-catcher:exit:${user.id}`,
      20,
    )
    if (!exitLock.acquired) {
      return { success: false, error: 'UFO Catcher exit already in progress' }
    }

    try {
      const state = await getGameActivityStateForUser(user.id, 'game')
      if (!state || state.encounterId !== encounterId) {
        return { success: false, error: 'UFO Catcher session changed' }
      }

      const pending = await redis.get<UfoCatcherPrivateAttempt>(
        getAttemptKey(user.id),
      )
      if (pending?.publicAttempt.encounterId === encounterId) {
        const payload = await getPayload({ config: configPromise })
        await incrementUserActivityResult(
          payload as any,
          user.id,
          'gameResults',
          encounterId,
          { losses: 1 },
        )
        state.losses += 1
        await saveSessionState(user.id, state)
        await redis.del(getAttemptKey(user.id))
      }

      return completeGameActivity('game', encounterId, true)
    } finally {
      await releaseActionLock(exitLock)
    }
  } catch (error) {
    console.error('Error exiting UFO Catcher:', error)
    return { success: false, error: 'Unable to leave the UFO Catcher' }
  }
}
