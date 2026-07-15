'use server'

import { redis } from '@/utilities/redis'
import { allGames } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { mergeSummaries } from '../utils'
import { getUser, type ResearchState } from '../actions'
import {
  acquireActionLock,
  checkActionRateLimit,
  releaseActionLock,
} from '@/utilities/game-integrity'
import { incrementUserActivityResult } from '@/utilities/user-state'

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

export async function spinSlotMachine(betAmount?: number) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

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
      const state = (await redis.get(`research:${user.id}`)) as ResearchState | null
      if (!state) {
        return { success: false, error: 'Session expired' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (!encounter || encounter.gameType !== 'slots') {
        return { success: false, error: 'Invalid game type' }
      }

      // Cost Check (fresh user read)
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
        const totalWeight = paytable.reduce((sum: number, line: any) => sum + (line.weight || 1), 0)
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
      let spinSummary = null
      if (wonRewards.length > 0) {
        const res = await grantRewards(user.id, wonRewards)
        spinSummary = res.summary

        // Update redis session accumulation
        const currentSession = state.slotsSession || { totalRewards: {} }
        currentSession.totalRewards = mergeSummaries(currentSession.totalRewards, spinSummary)
        currentSession.totalCost = (currentSession.totalCost || 0) + (cost?.amount || 0)
        state.slotsSession = currentSession
        state.wins += 1
      } else {
        const currentSession = state.slotsSession || { totalRewards: {} }
        currentSession.totalCost = (currentSession.totalCost || 0) + (cost?.amount || 0)
        state.slotsSession = currentSession
        state.losses += 1
      }

      // Update Redis
      await redis.set(`research:${user.id}`, state, { ex: 3600 })

      return {
        success: true,
        icons: resultIcons,
        rewards: spinSummary,
        balance: cost ? currentBalance - cost.amount : freshUser.currency?.pokedollars || 0,
      }
    } finally {
      await releaseActionLock(spinLock)
    }
  } catch (err) {
    console.error('Error spinning slots:', err)
    return { success: false, error: 'Server error' }
  }
}
