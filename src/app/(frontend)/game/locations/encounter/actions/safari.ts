'use server'

import { redis } from '@/utilities/redis'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import {
  resolveSafariAction,
  SAFARI_BASE_FLEE_RATE,
  type SafariEncounterAction,
} from '@/utilities/pokemon/safari-catch'
import {
  ENCOUNTER_MECHANICS_LOCK_TTL,
  getEncounterMechanicsLockKey,
} from './lock'
import { failEncounter } from './failure'
import {
  getEncounterRedisTtlSeconds,
  type EncounterState,
} from './types'
import { getUser } from './utils'
import { endSafariExpeditionWithoutBalls } from '@/utilities/expeditions/actions'

export async function performSafariAction(
  action: SafariEncounterAction,
  attemptId: string,
) {
  const user = await getUser()
  if (!user) return { success: false, error: 'Unauthorized' }
  if (action !== 'feed' && action !== 'tamato') {
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
    if (state.safari.ballsRemaining <= 0) {
      return {
        success: false,
        noSafariBalls: true,
        error: 'No Safari Balls remain.',
      }
    }

    const species =
      getPokemonForm(state.formId) || getPokemonSpecies(state.pokemonId)
    const resolved = resolveSafariAction({
      action,
      currentStage: state.safari.stage,
      baseCaptureRate: species?.capture_rate || 100,
      currentCatchRate: state.currentCatchRate,
      baseFleeRate: state.fleeRate || SAFARI_BASE_FLEE_RATE,
    })
    state.safari = {
      stage: resolved.stage,
      actions: state.safari.actions + 1,
      ballsRemaining: state.safari.ballsRemaining,
    }
    state.currentCatchRate = resolved.catchRate
    state.fleeRate = resolved.fleeChance

    if (resolved.fled) {
      const expeditionProgress = await failEncounter(user, state)
      const response = {
        success: true,
        encounterFailed: true,
        failMessage:
          action === 'tamato'
            ? 'The Tamato Berry startled the Pokémon and it fled!'
            : 'The Pokémon took the Oran Berry, then slipped away!',
        pokemonId: state.pokemonId,
        formId: state.formId,
        expeditionProgress,
      }
      await setIdempotentResult(resultKey, response, 300)
      return response
    }

    await redis.set(encounterId, state, {
      ex: getEncounterRedisTtlSeconds(state),
    })
    const response = {
      success: true,
      action,
      newCatchRate: resolved.catchRate,
      fleeRate: resolved.fleeChance,
      safari: state.safari,
      message:
        action === 'tamato'
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
