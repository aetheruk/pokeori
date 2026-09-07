'use server'

import { allGames } from '@/data/games'
import type { Match3GameSettings } from '@/data/games/match3/types'
import { getUser, getGameActivityStateForUser } from '@/app/(frontend)/game/_shared/activity-actions'
import { acquireActionLock, checkActionRateLimit, getIdempotentResult, releaseActionLock } from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'
import { applyMatch3Move, type Match3Position, type Match3Cascade, type Match3RoundState } from '@/utilities/research/match3'

export type Match3MoveResult = {
  success: boolean
  error?: string
  accepted?: boolean
  round?: Match3RoundState
  cascades?: Match3Cascade[]
  expiry?: number
}

export async function submitMatch3Move(input: {
  encounterId: string
  startTime: number
  revision: number
  from: Match3Position
  to: Match3Position
  actionId: string
}): Promise<Match3MoveResult> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (!input || typeof input.encounterId !== 'string' || !Number.isSafeInteger(input.startTime) ||
      !Number.isSafeInteger(input.revision) || input.revision < 0 ||
      typeof input.actionId !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(input.actionId)) {
    return { success: false, error: 'Invalid Match 3 action' }
  }
  const key = `match3:move:${user.id}:${input.startTime}:${input.actionId}`
  const cached = await getIdempotentResult<Match3MoveResult>(key)
  if (cached) return cached
  const rate = await checkActionRateLimit(user.id, 'match3-move', 120, 60)
  if (!rate.allowed) return { success: false, error: 'Too many moves. Please wait a moment.' }
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired) return { success: false, error: 'Game action already in progress' }
  try {
    const repeated = await getIdempotentResult<Match3MoveResult>(key)
    if (repeated) return repeated
    const state = await getGameActivityStateForUser(user.id, 'game')
    if (!state || state.encounterId !== input.encounterId || state.startTime !== input.startTime) {
      return { success: false, error: 'Match 3 session changed. Reopen the game.' }
    }
    const encounter = allGames.find((game) => game.id === state.encounterId)
    if (encounter?.gameType !== 'match3' || state.roundData?.kind !== 'match3') {
      return { success: false, error: 'Invalid Match 3 session' }
    }
    const round = state.roundData as Match3RoundState
    if (round.revision !== input.revision) {
      return { success: false, error: 'This board has changed. Reopen the game to continue.' }
    }
    const move = applyMatch3Move(encounter.settings as unknown as Match3GameSettings, round, input.from, input.to, Date.now())
    const previous = structuredClone(state)
    state.roundData = move.round
    state.expiry = move.round.deadline || Date.now() + 3_600_000
    const result: Match3MoveResult = { success: true, ...move, expiry: state.expiry }
    // Save the response with the board in one atomic Redis operation,
    // so a lost response never leaves a committed move without its receipt.
    const saved = await redis.setManyIfValue(`game:${user.id}`, previous, [
      { key: `game:${user.id}`, value: state, ttlSeconds: Math.max(120, Math.ceil((state.expiry - Date.now()) / 1000) + 120) },
      { key, value: result, ttlSeconds: 3600 },
    ])
    if (!saved) return { success: false, error: 'This board changed while the move was resolving. Retry your move.' }
    return result
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unable to save this move' }
  } finally {
    await releaseActionLock(lock)
  }
}
