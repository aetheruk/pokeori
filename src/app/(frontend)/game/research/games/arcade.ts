'use server'

import { allGames } from '@/data/games'
import { getGameActivityStateForUser, getUser } from '@/app/(frontend)/game/_shared/activity-actions'
import { acquireActionLock, checkActionRateLimit, getIdempotentResult, releaseActionLock } from '@/utilities/game-integrity'
import { isArcadeGameType, verifyArcadeCheckpoint, type ArcadeProof, type ArcadeRound } from '@/utilities/research/arcade-authority'
import { redis } from '@/utilities/redis'

export type ArcadeCheckpointResult = {success: true; roundData: ArcadeRound} | {success: false; error: string}

export async function checkpointArcade(proof: ArcadeProof): Promise<ArcadeCheckpointResult> {
  const user = await getUser()
  if (!user) return {success: false, error: 'Not authenticated'}
  if (!proof || typeof proof.sessionId !== 'string' || !/^[0-9:]{1,64}$/.test(proof.sessionId) || !Number.isSafeInteger(proof.revision) || proof.revision < 0 || !Number.isSafeInteger(proof.targetTick) || proof.targetTick < 0) {
    return {success: false, error: 'Invalid arcade checkpoint'}
  }
  const key = `arcade:checkpoint:${user.id}:${proof.sessionId}:${proof.revision}:${proof.targetTick}`
  const cached = await getIdempotentResult<ArcadeCheckpointResult>(key)
  if (cached) return cached
  const rate = await checkActionRateLimit(user.id, 'arcade-checkpoint', 60, 60)
  if (!rate.allowed) return {success: false, error: 'Too many checkpoints. Please wait a moment.'}
  const lock = await acquireActionLock(`lock:game:settle:${user.id}`, 60)
  if (!lock.acquired) return {success: false, error: 'Game action already in progress'}
  try {
    const repeated = await getIdempotentResult<ArcadeCheckpointResult>(key)
    if (repeated) return repeated
    const state = await getGameActivityStateForUser(user.id, 'game')
    if (!state || state.expiry < Date.now()) return {success: false, error: 'Arcade session expired. Start a new run.'}
    const encounter = allGames.find((entry) => entry.id === state.encounterId)
    if (!encounter || !isArcadeGameType(encounter.gameType)) return {success: false, error: 'No active arcade session'}
    const result = verifyArcadeCheckpoint(encounter.gameType, encounter.settings, state.roundData, proof)
    if (!result.success) return result
    const response: ArcadeCheckpointResult = {success: true, roundData: result.roundData}
    const nextState = {...state, roundData: result.roundData}
    const saved = await redis.setManyIfValue(`game:${user.id}`, state, [
      {key: `game:${user.id}`, value: nextState, ttlSeconds: Math.max(120, Math.ceil((state.expiry - Date.now()) / 1000) + 120)},
      {key, value: response, ttlSeconds: 3600},
    ])
    return saved ? response : {success: false, error: 'The game changed while saving. Retry this checkpoint.'}
  } finally {
    await releaseActionLock(lock)
  }
}
