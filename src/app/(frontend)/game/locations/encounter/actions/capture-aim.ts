'use server'

import { randomUUID } from 'node:crypto'
import { redis } from '@/utilities/redis'
import { acquireActionLock, checkActionRateLimit, releaseActionLock } from '@/utilities/game-integrity'
import { CAPTURE_RING_PERIOD_MS } from '@/utilities/pokemon/capture-timing'
import { getUser } from './utils'
import { getEncounterRedisTtlSeconds, type EncounterState } from './types'
import { getEncounterMechanicsLockKey } from './lock'

export async function beginCaptureAim() {
  const user = await getUser()
  if (!user) return { success: false as const, error: 'Not authenticated' }
  if (!(await checkActionRateLimit(user.id, 'capture-aim', 60, 60)).allowed) {
    return { success: false as const, error: 'Too many aiming requests. Please wait a moment.' }
  }
  const lock = await acquireActionLock(getEncounterMechanicsLockKey(user.id), 60)
  if (!lock.acquired) return { success: false as const, error: 'Another capture action is being processed' }
  try {
    const key = `encounter:${user.id}`
    const state = await redis.get<EncounterState>(key)
    const now = Date.now()
    if (!state || state.userId !== user.id || state.expiry <= now) {
      return { success: false as const, error: 'Encounter expired' }
    }
    const attempt = state.captureAttempts || 0
    if (!state.captureTiming || state.captureTiming.attempt !== attempt) {
      const previous = structuredClone(state)
      state.captureTiming = { id: randomUUID(), startedAt: now, serverNow: now,
        periodMs: CAPTURE_RING_PERIOD_MS, attempt }
      const saved = await redis.setManyIfValue(key, previous,
        [{ key, value: state, ttlSeconds: getEncounterRedisTtlSeconds(state) }])
      if (!saved) return { success: false as const, error: 'Encounter changed. Please aim again.' }
    }
    return { success: true as const, timing: { ...state.captureTiming, serverNow: now } }
  } finally {
    await releaseActionLock(lock)
  }
}
