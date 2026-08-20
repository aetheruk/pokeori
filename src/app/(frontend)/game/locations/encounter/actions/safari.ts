'use server'

import { redis } from '@/utilities/redis'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import {
  resolveSafariAction,
  type SafariEncounterAction,
} from '@/utilities/pokemon/safari-catch'
import {
  ENCOUNTER_MECHANICS_LOCK_TTL,
  getEncounterMechanicsLockKey,
} from './lock'
import { failEncounter } from './failure'
import type { EncounterState } from './types'
import { getUser } from './utils'
import { endSafariExpeditionWithoutBalls } from '@/utilities/expeditions/actions'

export async function performSafariAction(
  action: SafariEncounterAction,
  attemptId: string,
) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Unauthorized' }
  if (action !== 'feed' && action !== 'rock') {
    return { success: false, error: 'Invalid Safari action' }
  }

  const rateLimit = await checkActionRateLimit(
    user.id,
    'encounter-safari-action',
    30,
    60,
  )
  if (!rateLimit.allowed) {
    return { success: false, error: 'Too many actions. Please wait a moment.' }
  }

  const resultKey = `encounter:safari:result:${user.id}:${attemptId}`
  const cached = await getIdempotentResult<any>(resultKey)
  if (cached) return cached

  const lock = await acquireActionLock(
    getEncounterMechanicsLockKey(user.id),
    ENCOUNTER_MECHANICS_LOCK_TTL,
  )
  if (!lock.acquired) {
    return {
      success: false,
      error: 'Another encounter action is being processed.',
    }
  }

  try {
    const encounterId = `encounter:${user.id}`
    const state = (await redis.get(encounterId)) as EncounterState | null
    if (!state) return { success: false, error: 'Encounter expired or invalid' }
    if (state.encounterMode !== 'safari' || !state.safari) {
      return { success: false, error: 'This is not a Safari encounter.' }
    }
    if (Date.now() >= state.expiry) {
      return { success: false, enterCapture: true, error: 'Time is up!' }
    }
    if (state.safari.ballsRemaining <= 0) {
      return {
        success: false,
        noSafariBalls: true,
        error: 'No Safari Balls remain.',
      }
    }

    const resolved = resolveSafariAction({
      action,
      currentStage: state.safari.stage,
      baseCatchRate: state.baseCatchRate,
      baseFleeRate: state.fleeRate || 10,
    })
    state.safari = {
      stage: resolved.stage,
      actions: state.safari.actions + 1,
      ballsRemaining: state.safari.ballsRemaining,
    }
    state.currentCatchRate = resolved.catchRate

    if (resolved.fled) {
      const expeditionProgress = await failEncounter(user, state)
      const response = {
        success: true,
        encounterFailed: true,
        failMessage:
          action === 'rock'
            ? 'The rock startled the Pokémon and it fled!'
            : 'The Pokémon took the Oran Berry, then slipped away!',
        pokemonId: state.pokemonId,
        formId: state.formId,
        expeditionProgress,
      }
      await setIdempotentResult(resultKey, response, 300)
      return response
    }

    await redis.set(encounterId, state, {
      ex: Math.max(60, Math.floor((state.expiry - Date.now()) / 1000) + 60),
    })
    const response = {
      success: true,
      action,
      newCatchRate: resolved.catchRate,
      safari: state.safari,
      message:
        action === 'rock'
          ? 'The Pokémon is rattled. It is easier to catch, but much more likely to flee.'
          : 'The Pokémon settles after eating. It is a little easier to catch and less likely to flee.',
    }
    await setIdempotentResult(resultKey, response, 300)
    return response
  } finally {
    await releaseActionLock(lock)
  }
}

export async function endSafariExpedition() {
  const user = await getUser()
  if (!user) return { success: false as const, message: 'Unauthorized' }

  return endSafariExpeditionWithoutBalls(user.id)
}
