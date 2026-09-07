'use server'

import { allGames } from '@/data/games'
import type { DiglettTunnelTapSettings } from '@/data/games/diglett-tunnel-tap/types'
import { getUser, getGameActivityStateForUser } from '@/app/(frontend)/game/_shared/activity-actions'
import { acquireActionLock, checkActionRateLimit, getIdempotentResult, releaseActionLock } from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'
import { applyDiglettTap, type DiglettRound } from '@/utilities/research/diglett-authority'

export type DiglettTapResult = { success: boolean; error?: string; round?: DiglettRound; correct?: boolean; gameOver?: boolean }

export async function submitDiglettTap(input: {
  encounterId: string; startTime: number; revision: number; spawnKey: number; slot: number; actionId: string
}): Promise<DiglettTapResult> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (!input || typeof input.encounterId !== 'string' || !Number.isSafeInteger(input.startTime) ||
      !Number.isSafeInteger(input.revision) || input.revision < 0 ||
      typeof input.actionId !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(input.actionId)) return { success: false, error: 'Invalid tunnel action' }
  const key = `diglett-tunnel-tap:answer:${user.id}:${input.startTime}:${input.actionId}`
  const cached = await getIdempotentResult<DiglettTapResult>(key)
  if (cached) return cached
  if (!(await checkActionRateLimit(user.id, 'diglett-tunnel-tap-answer', 80, 60)).allowed) return { success: false, error: 'Too many answers. Please wait a moment.' }
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired) return { success: false, error: 'Game action already in progress' }
  try {
    const repeated = await getIdempotentResult<DiglettTapResult>(key)
    if (repeated) return repeated
    const state = await getGameActivityStateForUser(user.id, 'game')
    if (!state || state.encounterId !== input.encounterId || state.startTime !== input.startTime) return { success: false, error: 'Tunnel session changed. Reopen the game.' }
    const encounter = allGames.find((game) => game.id === state.encounterId)
    if (encounter?.gameType !== 'diglett-tunnel-tap' || state.roundData?.kind !== 'diglett-tunnel-tap') return { success: false, error: 'Invalid tunnel session' }
    const round = state.roundData as DiglettRound
    if (round.revision !== input.revision) return { success: false, error: 'This tunnel has changed. Reopen the game to continue.' }
    const answer = applyDiglettTap(encounter.settings as unknown as DiglettTunnelTapSettings, round, input.spawnKey, input.slot, Date.now())
    const previous = structuredClone(state)
    state.roundData = answer.round
    state.expiry = answer.round.deadline
    const result: DiglettTapResult = { success: true, ...answer }
    const saved = await redis.setManyIfValue(`game:${user.id}`, previous, [
      { key: `game:${user.id}`, value: state, ttlSeconds: Math.max(120, Math.ceil((state.expiry - Date.now()) / 1000) + 120) },
      { key, value: result, ttlSeconds: 3600 },
    ])
    if (!saved) return { success: false, error: 'This tunnel changed while saving. Retry your answer.' }
    return result
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unable to save this answer' }
  } finally { await releaseActionLock(lock) }
}
