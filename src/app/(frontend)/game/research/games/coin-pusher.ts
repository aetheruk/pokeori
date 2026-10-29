'use server'

import { randomInt } from 'node:crypto'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getUser, isGridAdventureActivityContextActive, type GameActivityState } from '@/app/(frontend)/game/_shared/activity-actions'
import { allGames } from '@/data/games'
import type { CoinPusherSettings } from '@/data/games/coin-pusher/types'
import { acquireActionLock, checkActionRateLimit, releaseActionLock } from '@/utilities/game-integrity'
import { createEconomyRequestId, getEconomyActionErrorMessage, getEconomyActionResult, runEconomyAction } from '@/utilities/economy/transactions'
import { redis } from '@/utilities/redis'
import { advanceCoinPusher } from '@/utilities/research/coin-pusher-simulation'
import { grantRewards, type Reward } from '@/utilities/rewards/reward-logic'
import { mergeSummaries } from '../utils'

const random = () => randomInt(0, 1_000_000) / 1_000_000

function mergeCoinPusherSummaries(a: any, b: any) {
  const result = mergeSummaries({ ...a, currency: undefined }, { ...b, currency: undefined })
  const currency = [...(a?.currency || []), ...(b?.currency || [])]
  if (currency.length) {
    result.currency = []
    for (const entry of currency) {
      const existing = result.currency.find((item: any) => item.type === entry.type)
      if (existing) existing.quantity += entry.quantity
      else result.currency.push({ ...entry })
    }
  }
  return result
}

/** Finish a transaction whose database commit outlived its Redis update. */
export async function recoverCoinPusherSettlement(encounterId: string) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired) return { success: false, error: 'The machine is busy.' }
  try {
    const key = `game:${user.id}`
    const state = await redis.get<GameActivityState>(key)
    if (!state || state.encounterId !== encounterId || !state.coinPusherSession) return { success: true }
    const receipt = await getEconomyActionResult<{ session: NonNullable<GameActivityState['coinPusherSession']>; previousState: GameActivityState }>({
      userId: user.id, action: 'coin-pusher',
      requestId: createEconomyRequestId(`${state.startTime}:${encounterId}:${state.coinPusherSession.board.revision}`),
    })
    if (!receipt) return { success: true }
    const saved = await redis.setManyIfValue(key, receipt.previousState, [{ key, value: { ...state, coinPusherSession: receipt.session }, ttlSeconds: Math.max(60, Math.ceil((state.expiry - Date.now()) / 1000) + 120) }])
    return saved ? { success: true } : { success: false, error: 'The machine state could not be saved. Please retry.' }
  } catch (error) {
    console.error('Coin pusher recovery failed:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  } finally { await releaseActionLock(lock) }
}

/** The server owns both the board and every outcome. The revision identifies
 * the economic action, so a committed result can repair an interrupted Redis
 * update without charging or granting anything twice. */
export async function advanceCoinPusherGame(input: {
  encounterId: string
  revision: number
  actionId: string
  drops: number[]
}) {
  const user = await getUser()
  if (!user) return { success: false as const, error: 'Not authenticated' }
  if (!input || typeof input.encounterId !== 'string' ||
    !Number.isSafeInteger(input.revision) || input.revision < 0 ||
    typeof input.actionId !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(input.actionId) ||
    !Array.isArray(input.drops) || input.drops.length > 3 ||
    input.drops.some((x) => typeof x !== 'number' || !Number.isFinite(x) || x < 0 || x > 1)) {
    return { success: false as const, error: 'Invalid drop' }
  }
  const limit = await checkActionRateLimit(user.id, 'coin-pusher', 80, 60)
  if (!limit.allowed) return { success: false as const, error: 'Please wait a moment.' }
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired) return { success: false as const, error: 'The machine is busy.' }
  try {
    const key = `game:${user.id}`
    const state = await redis.get<GameActivityState>(key)
    if (!state || state.encounterId !== input.encounterId || state.expiry <= Date.now() || !state.coinPusherSession) {
      return { success: false as const, error: 'This game session has expired.' }
    }
    const encounter = state.eventConfigSnapshot || allGames.find((game) => game.id === input.encounterId)
    if (encounter?.gameType !== 'coin-pusher') return { success: false as const, error: 'Invalid game.' }
    if (encounter.gridAdventureOnly && !(await isGridAdventureActivityContextActive(user.id, state.encounterId, state.gridAdventureContext))) {
      return { success: false as const, error: 'This machine is no longer part of the active adventure.' }
    }
    if (input.revision !== state.coinPusherSession.board.revision) {
      if (input.revision > state.coinPusherSession.board.revision) return { success: false as const, error: 'The machine state changed. Please reload.' }
      const receipt = await getEconomyActionResult<{ actionId: string; rewards: unknown }>({
        userId: user.id, action: 'coin-pusher',
        requestId: createEconomyRequestId(`${state.startTime}:${state.encounterId}:${input.revision}`),
      })
      return { success: true as const, replayed: receipt?.actionId !== input.actionId, actionId: receipt?.actionId || '', session: state.coinPusherSession, rewards: receipt?.rewards || null }
    }
    if (!input.drops.length && state.coinPusherSession.board.revision === 0) {
      return { success: true as const, replayed: false, actionId: input.actionId, session: state.coinPusherSession, rewards: null }
    }
    const settings = encounter.settings as CoinPusherSettings
    const payload = await getPayload({ config: configPromise })
    const requestId = createEconomyRequestId(`${state.startTime}:${state.encounterId}:${input.revision}`)
    if (!input.drops.length) {
      // Most idle frames do not change the player's account. Keep those in
      // Redis only, after checking for a transaction that may need recovery.
      const committed = await getEconomyActionResult({ userId: user.id, action: 'coin-pusher', requestId, payload })
      if (!committed) {
        const simulation = advanceCoinPusher(state.coinPusherSession.board, settings, [], random)
        if (!simulation.coinsWon && !simulation.prizesWon.length) {
          const session = { ...state.coinPusherSession, board: simulation.board }
          const saved = await redis.setManyIfValue(key, state, [{ key, value: { ...state, coinPusherSession: session }, ttlSeconds: Math.max(60, Math.ceil((state.expiry - Date.now()) / 1000) + 120) }])
          if (!saved) return { success: false as const, error: 'The machine state could not be saved. Please retry.' }
          return { success: true as const, replayed: false, actionId: input.actionId, session, rewards: null, frames: simulation.frames }
        }
      }
    }
    const result = await runEconomyAction({
      userId: user.id, action: 'coin-pusher', payload,
      requestId,
    }, async ({ payload, req }) => {
      const freshUser = await payload.findByID({ collection: 'users', id: user.id, req })
      const cost = settings.cost.amount * input.drops.length
      const currentBalance = freshUser.currency?.[settings.cost.currencyType] || 0
      if (currentBalance < cost) throw new Error('COIN_PUSHER_INSUFFICIENT_FUNDS')
      const simulation = advanceCoinPusher(state.coinPusherSession!.board, settings, input.drops, random)
      const payout = simulation.coinsWon * settings.payout.amount
      const currency = { ...freshUser.currency }
      currency[settings.cost.currencyType] = currentBalance - cost
      currency[settings.payout.currencyType] = (currency[settings.payout.currencyType] || 0) + payout
      await payload.update({ collection: 'users', id: user.id, data: { currency }, req })
      let summary: any = payout ? { currency: [{ type: settings.payout.currencyType, quantity: payout }] } : null
      const rewards = simulation.prizesWon.flatMap((id) => settings.prizePool.find((prize) => prize.id === id)?.rewards || [])
      if (rewards.length) {
        const result = await grantRewards(user.id, rewards as Reward[], { payload, req })
        summary = mergeCoinPusherSummaries(summary, result.summary)
      }
      const session = {
        board: simulation.board,
        totalCost: state.coinPusherSession!.totalCost + cost,
        totalRewards: summary ? mergeCoinPusherSummaries(state.coinPusherSession!.totalRewards, summary) : state.coinPusherSession!.totalRewards,
      }
      return { actionId: input.actionId, session, rewards: summary, frames: simulation.frames, previousState: state }
    })
    const nextState = { ...state, coinPusherSession: result.session }
    const saved = await redis.setManyIfValue(key, result.previousState, [{ key, value: nextState, ttlSeconds: Math.max(60, Math.ceil((state.expiry - Date.now()) / 1000) + 120) }])
    if (!saved) return { success: false as const, error: 'The machine state could not be saved. Please retry.' }
    return { success: true as const, replayed: result.actionId !== input.actionId, actionId: result.actionId, session: result.session, rewards: result.rewards, frames: result.frames }
  } catch (error) {
    if (error instanceof Error && error.message === 'COIN_PUSHER_INSUFFICIENT_FUNDS') {
      return { success: false as const, error: 'Not enough currency to drop a coin.' }
    }
    console.error('Coin pusher action failed:', error)
    return { success: false as const, error: getEconomyActionErrorMessage(error) }
  } finally {
    await releaseActionLock(lock)
  }
}
