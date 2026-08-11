'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  type GameActivityState,
  getUser,
} from '@/app/(frontend)/game/_shared/activity-actions'
import { allGames } from '@/data/games'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'
import { splitGuaranteedPachinkoCurrencyRewards } from '@/utilities/research/pachinko-rewards'
import {
  type PachinkoRoundRequest,
  resolvePachinkoRound,
} from '@/utilities/research/pachinko-round'
import type { Reward } from '@/utilities/rewards/reward-logic'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { incrementUserActivityResult } from '@/utilities/user-state'
import { mergeSummaries } from '../utils'
import { getEconomyActionErrorMessage, runEconomyAction } from '@/utilities/economy/transactions'

type PachinkoSettlementResult = {
  success: boolean
  error?: string
  balance?: number
  rewards?: any
  summary?: any
  totalCost?: number
  hitCount?: number
  hitCounts?: Record<string, number>
  isBonus?: boolean
}

function getRoundResultKey(userId: string, roundId: unknown) {
  if (typeof roundId !== 'string' || !/^[a-zA-Z0-9:_-]{1,80}$/.test(roundId)) {
    return null
  }
  return `pachinko:round-result:${userId}:${roundId}`
}

export async function completePachinkoRound({
  encounterId,
  request,
}: {
  encounterId: string
  request: PachinkoRoundRequest
}): Promise<PachinkoSettlementResult> {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const idempotentResultKey = getRoundResultKey(user.id, request?.roundId)
    if (!idempotentResultKey) {
      return { success: false, error: 'Invalid round id' }
    }

    const cachedResult =
      await getIdempotentResult<PachinkoSettlementResult>(idempotentResultKey)
    if (cachedResult) return cachedResult

    const rateLimit = await checkActionRateLimit(
      user.id,
      'pachinko-round',
      80,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many pachinko actions. Please wait a moment.',
      }
    }

    const actionLock = await acquireActionLock(
      `lock:pachinko:action:${user.id}`,
      10,
    )
    if (!actionLock.acquired) {
      return {
        success: false,
        error: 'A pachinko action is already being processed',
      }
    }

    const payload = await getPayload({ config: configPromise })

    try {
      const lockedCachedResult =
        await getIdempotentResult<PachinkoSettlementResult>(idempotentResultKey)
      if (lockedCachedResult) return lockedCachedResult

      const state = (await redis.get(
        `game:${user.id}`,
      )) as GameActivityState | null
      if (!state) {
        return { success: false, error: 'Session expired' }
      }
      if (state.encounterId !== encounterId) {
        return { success: false, error: 'Pachinko session changed' }
      }

      const encounter = allGames.find((e) => e.id === encounterId)
      if (encounter?.gameType !== 'pachinko') {
        return { success: false, error: 'Invalid game type' }
      }

      const resolvedRound = resolvePachinkoRound(
        encounter.settings.board?.buckets || [],
        request,
      )
      if (!resolvedRound.valid) {
        return { success: false, error: resolvedRound.error }
      }

      const cost = encounter.settings.cost

      const roundRewards = resolvedRound.hitBuckets.flatMap(
        (bucket) => bucket.rewards,
      )
      const isWin = roundRewards.length > 0
      const { guaranteedCurrencyPayout, deferredRewards } =
        cost && roundRewards.length > 0
          ? splitGuaranteedPachinkoCurrencyRewards(
              roundRewards,
              cost.currencyType,
            )
          : {
              guaranteedCurrencyPayout: 0,
              deferredRewards: roundRewards,
            }
      const economyResult = await runEconomyAction(
        {
          userId: user.id,
          action: 'pachinko-round',
          requestId: request.roundId,
          payload,
        },
        async ({ req }) => {
          const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })
          const currentBalance = cost
            ? freshUser.currency?.[cost.currencyType] || 0
            : freshUser.currency?.pokedollars || 0
          if (cost && currentBalance < cost.amount) {
            return { success: false as const, error: 'Insufficient funds' }
          }
          const settledBalance = cost
            ? currentBalance - cost.amount + guaranteedCurrencyPayout
            : currentBalance
          await incrementUserActivityResult(
            payload as any,
            user.id,
            'gameResults',
            state.encounterId,
            isWin ? { wins: 1 } : { losses: 1 },
            { req },
          )
          if (cost) {
            await payload.update({
              collection: 'users',
              id: user.id,
              data: {
                currency: {
                  ...freshUser.currency,
                  [cost.currencyType]: settledBalance,
                },
              },
              req,
            })
          }
          let roundSummary: any = guaranteedCurrencyPayout
            ? {
                currency: [{ type: cost!.currencyType, quantity: guaranteedCurrencyPayout }],
              }
            : null
          if (deferredRewards.length > 0) {
            const res = await grantRewards(
              user.id,
              deferredRewards as unknown as Reward[],
              { payload, req },
            )
            roundSummary = mergeSummaries(roundSummary, res.summary)
          }
          return { success: true as const, settledBalance, roundSummary }
        },
      )
      if (!economyResult.success) return economyResult
      const { settledBalance, roundSummary } = economyResult

      // Update Redis
      const currentSession = state.pachinkoSession || {
        totalRewards: {},
        totalCost: 0,
      }
      if (roundSummary) {
        currentSession.totalRewards = mergeSummaries(
          currentSession.totalRewards,
          roundSummary,
        )
      }
      currentSession.totalCost =
        (currentSession.totalCost || 0) + (cost?.amount || 0)
      state.pachinkoSession = currentSession
      if (isWin) state.wins += 1
      else state.losses += 1

      await redis.set(`game:${user.id}`, state, { ex: 3600 })

      const response = {
        success: true,
        balance: settledBalance,
        rewards: roundSummary,
        summary: currentSession.totalRewards,
        totalCost: currentSession.totalCost,
        hitCount: resolvedRound.hitBuckets.length,
        hitCounts: resolvedRound.hitCounts,
        isBonus: resolvedRound.isBonus,
      }

      await setIdempotentResult(idempotentResultKey, response, 600)

      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error completing pachinko round:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}
