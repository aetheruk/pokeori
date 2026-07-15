'use server'

import { redis } from '@/utilities/redis'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import type { EncounterState } from './types'
import { getUser } from './utils'
import {
  completeEncounterQteState,
  type EncounterQteCompletionPayload,
} from '@/utilities/pokemon/encounter-qte'
import { applyEncounterPromptResult } from './mechanics'
import { buildEncounterQuizQuestion } from './quiz-question'
import {
  ENCOUNTER_MECHANICS_LOCK_TTL,
  getEncounterMechanicsLockKey,
} from './lock'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function completeEncounterQte(
  qteId: string,
  payload: EncounterQteCompletionPayload,
) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const rate = await checkActionRateLimit(user.id, 'encounter-qte', 80, 60)
  if (!rate.allowed)
    return { success: false, error: 'Too many QTE actions. Please wait.' }

  const lock = await acquireActionLock(
    getEncounterMechanicsLockKey(user.id),
    ENCOUNTER_MECHANICS_LOCK_TTL,
  )
  if (!lock.acquired)
    return {
      success: false,
      error: 'Another encounter action is being processed',
    }

  try {
    const encounterId = `encounter:${user.id}`
    const state = (await redis.get(encounterId)) as EncounterState | null
    if (!state) return { success: false, error: 'Encounter expired or invalid' }
    if (!state.qte || state.qte.id !== qteId || state.qte.status !== 'active') {
      const cached = await getIdempotentResult<any>(
        `encounter:qte:last:${user.id}`,
      )
      if (cached) return cached
      return { success: false, error: 'No active QTE' }
    }
    if (Date.now() > state.expiry) {
      return { success: false, error: 'Time is up!', enterCapture: true }
    }

    const resultKey = `encounter:qte:result:${user.id}:${state.locationId}:${state.startTime}:${qteId}`
    const cached = await getIdempotentResult<any>(resultKey)
    if (cached) return cached

    const now = Date.now()
    completeEncounterQteState(state.qte, payload)

    const isCorrect = !!state.qte.success
    const rateMultiplier = isCorrect ? state.qte.catchStageBonus || 1 : 1
    const payloadClient = await getPayload({ config: configPromise })
    const response = await applyEncounterPromptResult({
      payload: payloadClient,
      user,
      state,
      isCorrect,
      now,
      promptId: `qte:${qteId}`,
      rateMultiplier,
      promptType: 'qte',
    })

    if (
      !(response as any).encounterFailed &&
      !(response as any).qte &&
      ((response as any).newCatchRate ?? state.currentCatchRate) < 255
    ) {
      ;(response as any).nextQuestion = buildEncounterQuizQuestion({
        pokemonId: state.pokemonId,
        kidMode: !!(user as any).kidMode,
        formId: state.formId,
        state,
      })
    }

    if (!(response as any).encounterFailed) {
      await redis.set(encounterId, state, {
        ex: Math.floor((state.expiry - Date.now()) / 1000) + 60,
      })
    }

    const ttl = (response as any).encounterFailed ? 300 : 120
    await setIdempotentResult(resultKey, response, ttl)
    await setIdempotentResult(`encounter:qte:last:${user.id}`, response, ttl)
    return response
  } finally {
    await releaseActionLock(lock)
  }
}
