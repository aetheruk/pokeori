'use server'

import { redis } from '@/utilities/redis'
import { allGames } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { mergeSummaries } from '../utils'
import {
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
import { getEconomyActionErrorMessage, runEconomyAction } from '@/utilities/economy/transactions'

function getRandomSymbol(symbols: any[]): string {
  if (!symbols.length) return '?'
  // Weighted random for symbols?
  const totalWeight = symbols.reduce((sum, s) => sum + (s.weight || 1), 0)
  let r = Math.random() * totalWeight
  for (const s of symbols) {
    if (r < (s.weight || 1)) return s.id
    r -= s.weight || 1
  }
  return symbols[0].id
}

export async function spinSlotMachine(clientActionId: string, betAmount?: number) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }
    if (!clientActionId) return { success: false, error: 'Missing action identifier' }
    const resultKey = `slots:spin-result:${user.id}:${clientActionId}`
    const cachedResult = await getIdempotentResult<any>(resultKey)
    if (cachedResult) return cachedResult

    const rateLimit = await checkActionRateLimit(user.id, 'slots-spin', 40, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many spins. Please wait a moment.' }
    }

    const spinLock = await acquireActionLock(`lock:slots:spin:${user.id}`, 10)
    if (!spinLock.acquired) {
      return { success: false, error: 'A spin is already being processed' }
    }

    const payload = await getPayload({ config: configPromise })

    try {
      const state = (await redis.get(
        `game:${user.id}`,
      )) as GameActivityState | null
      if (!state) {
        return { success: false, error: 'Session expired' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (encounter?.gameType !== 'slots') {
        return { success: false, error: 'Invalid game type' }
      }

      const cost = encounter.settings.cost

      // Slots RNG Logic
      const settings = encounter.settings
      const paytable = settings.paytable || []
      const symbols = settings.symbols || []

      // Determine outcome
      // Use stored win rate if available, otherwise default to 30
      const winRate = state.slotsSession?.currentWinRate || 30
      const isWin = Math.random() * 100 < winRate

      let resultIcons: string[] = []
      let wonRewards: any[] = []

      if (isWin && paytable.length > 0) {
        // Pick a winning line
        const totalWeight = paytable.reduce(
          (sum: number, line: any) => sum + (line.weight || 1),
          0,
        )
        let random = Math.random() * totalWeight
        let chosenLine = paytable[0]
        for (const line of paytable) {
          const w = line.weight || 1
          if (random < w) {
            chosenLine = line
            break
          }
          random -= w
        }
        resultIcons = [...chosenLine.icons]
        wonRewards = chosenLine.rewards
      } else {
        // Generate losing combination
        let attempts = 0
        while (attempts < 10) {
          resultIcons = [
            getRandomSymbol(symbols),
            getRandomSymbol(symbols),
            getRandomSymbol(symbols),
          ]
          const isWinning = paytable.some(
            (line: any) =>
              line.icons[0] === resultIcons[0] &&
              line.icons[1] === resultIcons[1] &&
              line.icons[2] === resultIcons[2],
          )
          if (!isWinning) break
          attempts++
        }
      }

      const economyResult = await runEconomyAction(
        { userId: user.id, action: 'slots-spin', requestId: clientActionId, payload },
        async ({ req }) => {
          const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })
          const currentBalance = cost
            ? freshUser.currency?.[cost.currencyType] || 0
            : freshUser.currency?.pokedollars || 0
          if (cost && currentBalance < cost.amount) {
            return { success: false as const, error: 'Insufficient funds' }
          }
          await incrementUserActivityResult(
            payload as any,
            user.id,
            'gameResults',
            state.encounterId,
            isWin ? { wins: 1 } : { losses: 1 },
            { req },
          )
          const balance = cost ? currentBalance - cost.amount : currentBalance
          if (cost) {
            await payload.update({
              collection: 'users',
              id: user.id,
              data: { currency: { ...freshUser.currency, [cost.currencyType]: balance } },
              req,
            })
          }
          let spinSummary = null
          if (wonRewards.length > 0) {
            const res = await grantRewards(user.id, wonRewards, { payload, req })
            spinSummary = res.summary
          }
          return { success: true as const, spinSummary, balance }
        },
      )
      if (!economyResult.success) return economyResult
      const spinSummary = economyResult.spinSummary

      if (wonRewards.length > 0) {

        // Update redis session accumulation
        const currentSession = state.slotsSession || { totalRewards: {} }
        currentSession.totalRewards = mergeSummaries(
          currentSession.totalRewards,
          spinSummary,
        )
        currentSession.totalCost =
          (currentSession.totalCost || 0) + (cost?.amount || 0)
        state.slotsSession = currentSession
        state.wins += 1
      } else {
        const currentSession = state.slotsSession || { totalRewards: {} }
        currentSession.totalCost =
          (currentSession.totalCost || 0) + (cost?.amount || 0)
        state.slotsSession = currentSession
        state.losses += 1
      }

      // Update Redis
      await redis.set(`game:${user.id}`, state, { ex: 3600 })

      const response = {
        success: true,
        icons: resultIcons,
        rewards: spinSummary,
        balance: economyResult.balance,
      }
      await setIdempotentResult(resultKey, response, 600)
      return response
    } finally {
      await releaseActionLock(spinLock)
    }
  } catch (err) {
    console.error('Error spinning slots:', err)
    return { success: false, error: getEconomyActionErrorMessage(err) }
  }
}
