'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { randomInt } from 'node:crypto'
import {
  type GameActivityState,
  getUser,
} from '@/app/(frontend)/game/_shared/activity-actions'
import { allGames } from '@/data/games'
import type { PachinkoGameSettings } from '@/data/games/pachinko/types'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
} from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'
import { splitGuaranteedPachinkoCurrencyRewards } from '@/utilities/research/pachinko-rewards'
import {
  resolvePachinkoRound,
} from '@/utilities/research/pachinko-round'
import { simulatePachinkoRound, type PachinkoPlayback } from '@/utilities/research/pachinko-simulation'
import type { Reward } from '@/utilities/rewards/reward-logic'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { incrementUserActivityResult } from '@/utilities/user-state'
import { mergeSummaries } from '../utils'
import { createEconomyRequestId, getEconomyActionErrorMessage, runEconomyAction } from '@/utilities/economy/transactions'

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
  playback?: PachinkoPlayback
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
  request: { roundId: string; arrowPosition: number }
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
    if (typeof request.arrowPosition !== 'number' || !Number.isFinite(request.arrowPosition) ||
        request.arrowPosition < 0 || request.arrowPosition > 100 ||
        'outcomeBucketIds' in request || 'triggerBucketId' in request) {
      return { success: false, error: 'Invalid release. Reopen Pachinko to update the game.' }
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
      `lock:game:settle:${user.id}`,
      60,
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
      if (encounter?.gameType !== 'pachinko' || !encounter.settings.board) {
        return { success: false, error: 'Invalid game type' }
      }

      const cost = encounter.settings.cost
      const settings = encounter.settings as PachinkoGameSettings
      // Choose launch jitter only on the server. A request ID reuses its
      // committed simulation and payout, including after a lost response.
      const launchVelocity = randomInt(-1_000_000, 1_000_001) / 1_000_000
      const economyResult = await runEconomyAction(
        {
          userId: user.id,
          action: 'pachinko-round',
          requestId: createEconomyRequestId(`${state.startTime}:${encounter.id}:${request.roundId}`),
          aliasRequestIds: [createEconomyRequestId(`${state.startTime}:${encounter.id}:turn:${state.wins}:${state.losses}`)],
          payload,
        },
        async ({ payload, req }) => {
          const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })
          const currentBalance = cost
            ? freshUser.currency?.[cost.currencyType] || 0
            : freshUser.currency?.pokedollars || 0
          if (cost && currentBalance < cost.amount) {
            return { success: false as const, error: 'Insufficient funds' }
          }
          const simulation = simulatePachinkoRound(settings, request.arrowPosition, launchVelocity)
          const resolvedRound = resolvePachinkoRound(settings.board.buckets, {
            roundId: request.roundId,
            triggerBucketId: simulation.triggerBucketId,
            outcomeBucketIds: simulation.outcomeBucketIds,
          })
          if (!resolvedRound.valid) throw new Error('Invalid simulated Pachinko outcome')
          const roundRewards = resolvedRound.hitBuckets.flatMap((bucket) => bucket.rewards)
          const isWin = roundRewards.length > 0
          const { guaranteedCurrencyPayout, deferredRewards } = cost && roundRewards.length > 0
            ? splitGuaranteedPachinkoCurrencyRewards(roundRewards, cost.currencyType)
            : { guaranteedCurrencyPayout: 0, deferredRewards: roundRewards }
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
          const session = structuredClone(state.pachinkoSession || { totalRewards: {}, totalCost: 0 })
          if (roundSummary) session.totalRewards = mergeSummaries(session.totalRewards, roundSummary)
          session.totalCost += cost?.amount || 0
          return {
            success: true as const, settledBalance, roundSummary, session, previousState: structuredClone(state),
            wins: state.wins + (isWin ? 1 : 0), losses: state.losses + (isWin ? 0 : 1),
            hitCount: resolvedRound.hitBuckets.length, hitCounts: resolvedRound.hitCounts,
            isBonus: resolvedRound.isBonus, playback: simulation.playback,
          }
        },
      )
      if (!economyResult.success) return economyResult
      const { settledBalance, roundSummary, session: currentSession } = economyResult

      // Update Redis
      state.pachinkoSession = currentSession
      state.wins = economyResult.wins
      state.losses = economyResult.losses

      const response = {
        success: true,
        balance: settledBalance,
        rewards: roundSummary,
        summary: currentSession.totalRewards,
        totalCost: currentSession.totalCost,
        hitCount: economyResult.hitCount,
        hitCounts: economyResult.hitCounts,
        isBonus: economyResult.isBonus,
        playback: economyResult.playback,
      }

      await redis.setManyIfValue(`game:${user.id}`, economyResult.previousState, [
        { key: `game:${user.id}`, value: state, ttlSeconds: 3600 },
        { key: idempotentResultKey, value: response, ttlSeconds: 3600 },
      ])

      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error completing pachinko round:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}
