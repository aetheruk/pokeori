'use server'

import { redis } from '@/utilities/redis'
import { locations, type LocationReward } from '@/data/locations'
import { items } from '@/data/items'
import { getPokemonSpecies, getPokemonForm } from '@/utilities/pokemon/pokedex'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getQuizData } from '@/data/quiz'
import { generatePokemonStats, computeStats } from '@/utilities/pokemon/pokemon-mechanics'
import { incrementDailyTaskProgress } from '@/utilities/tasks/daily-progress'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { MOON_STONE_EVOLVERS, ULTRA_BEASTS } from '@/data/lists/special-pokemon'
import { ABILITIES } from '@/data/abilities'
import {
  getAbilityEscapeChance,
  getStoredEncounterAbility,
  isNightHour,
} from '@/utilities/pokemon/encounter-ability-runtime'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'
import type { User } from '@/payload-types'
import { getGameUserData } from '@/utilities/game-data'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import type { ExpeditionProgressSnapshot } from '@/utilities/expeditions/actions'
import type { EncounterState } from './types'
import { rollAbility, getUser } from './utils'
import {
  getUserPokedexMap,
  incrementUserActivityResult,
} from '@/utilities/user-state'

const ENCOUNTER_ESCAPE_LOCK_TTL = 12

function getEncounterEscapeLockKey(userId: string): string {
  return `lock:encounter:escape:${userId}`
}

async function performRunAway(
  user: User,
  state: EncounterState,
  payload: any,
  trackLoss: boolean,
): Promise<ExpeditionProgressSnapshot | undefined> {
  const encounterId = `encounter:${user.id}`

  // Clear encounter first to prevent duplicate action races.
  await redis.del(encounterId)

  if (!trackLoss || state.chronicle) {
    const expeditionResult = await recordExpeditionActivityResult(
      user.id,
      'location',
      state.locationId,
      false,
    )
    return expeditionResult.expedition
  }

  await incrementUserActivityResult(
    payload as any,
    user.id,
    'locationEncounterResults',
    state.locationId,
    { losses: 1 },
  )

  // Update Research Stats (Fishing Loss)
  if (state.locationId.startsWith('fishing:')) {
    const researchId = state.locationId.replace('fishing:', '')
    await incrementUserActivityResult(
      payload as any,
      user.id,
      'researchEncounterResults',
      researchId,
      { losses: 1 },
    )
  }

  const expeditionResult = await recordExpeditionActivityResult(
    user.id,
    'location',
    state.locationId,
    false,
  )
  return expeditionResult.expedition
}

export async function runAway() {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const rateLimit = await checkActionRateLimit(user.id, 'encounter-runaway', 30, 60)
  if (!rateLimit.allowed) {
    return { success: false, message: 'Too many escape attempts. Please wait a moment.' }
  }

  const escapeLock = await acquireActionLock(
    getEncounterEscapeLockKey(user.id),
    ENCOUNTER_ESCAPE_LOCK_TTL,
  )
  if (!escapeLock.acquired) {
    return { success: false, message: 'Another escape action is already being processed' }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const encounterId = `encounter:${user.id}`
    const state = (await redis.get(encounterId)) as EncounterState | null

    if (!state) {
      const recentRunAway = await getIdempotentResult<any>(`encounter:runaway:last:${user.id}`)
      if (recentRunAway) {
        return recentRunAway
      }
      return { success: false, message: 'Encounter expired or invalid' }
    }

    const resultKey = `encounter:runaway:result:${user.id}:${state.locationId}:${state.startTime}`
    const cachedResult = await getIdempotentResult<any>(resultKey)
    if (cachedResult) {
      return cachedResult
    }

    const expeditionProgress = await performRunAway(user, state, payload, true)

    const response = {
      success: true,
      message: 'You ran away safely!',
      expeditionProgress,
    }
    await setIdempotentResult(resultKey, response, 300)
    await setIdempotentResult(`encounter:runaway:last:${user.id}`, response, 300)

    return response
  } finally {
    await releaseActionLock(escapeLock)
  }
}

export async function attemptAbilityEscape() {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const rateLimit = await checkActionRateLimit(user.id, 'encounter-ability-escape', 30, 60)
  if (!rateLimit.allowed) {
    return { success: false, message: 'Too many escape attempts. Please wait a moment.' }
  }

  const escapeLock = await acquireActionLock(
    getEncounterEscapeLockKey(user.id),
    ENCOUNTER_ESCAPE_LOCK_TTL,
  )
  if (!escapeLock.acquired) {
    return { success: false, message: 'Another escape action is already being processed' }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const encounterId = `encounter:${user.id}`
    const state = (await redis.get(encounterId)) as EncounterState | null

    if (!state) {
      const recentResult = await getIdempotentResult<any>(
        `encounter:ability-escape:last:${user.id}`,
      )
      if (recentResult) {
        return recentResult
      }
      return { success: false, message: 'Encounter expired or invalid' }
    }

    const resultKey = `encounter:ability-escape:result:${user.id}:${state.locationId}:${state.startTime}`
    const cachedResult = await getIdempotentResult<any>(resultKey)
    if (cachedResult) {
      return cachedResult
    }

    // Check Active Pokemon Ability
    const activePoke = await payload.find({
      collection: 'pokemon',
      where: {
        and: [
          { user: { equals: user.id } },
          { user: { equals: user.id } },
          { isCompanion: { equals: true } },
        ],
      },
      limit: 1,
    })
    const activeAbilityId = (activePoke.docs[0] as any)?.ability
    const activeAbility = getStoredEncounterAbility(state) || (activeAbilityId ? ABILITIES[activeAbilityId] : undefined)

    const speciesData = getPokemonForm(state.formId) || getPokemonSpecies(state.pokemonId)
    const escapeChance = getAbilityEscapeChance({
      ability: activeAbility,
      formId: state.formId,
      speciesId: state.pokemonId,
      sourceFormId: state.activeAbilitySourceFormId || (activePoke.docs[0] as any)?.formId,
      locationId: state.locationId,
      targetTypes: speciesData?.types,
      isNight: isNightHour(),
    })

    if (!activeAbility || typeof escapeChance !== 'number') {
      return { success: false, message: 'No escape ability active' }
    }

    if (state.abilityEscapeAttempted) {
      return { success: false, message: 'You already tried to use this ability!' }
    }

    // Mark as attempted immediately
    state.abilityEscapeAttempted = true
    await redis.set(encounterId, state, {
      ex: Math.floor((state.expiry - Date.now()) / 1000) + 60,
    })

    // Check Rate
    const roll = Math.random() * 100
    const escaped = roll < escapeChance
    let response

    if (escaped) {
      const expeditionProgress = await performRunAway(user, state, payload, true)
      response = {
        success: true,
        escaped: true,
        message: `${activeAbility.name} allowed you to escape!`,
        expeditionProgress,
      }
    } else {
      response = {
        success: true,
        escaped: false,
        message: `${activeAbility.name} failed to escape.`,
      }
    }

    await setIdempotentResult(resultKey, response, 300)
    await setIdempotentResult(`encounter:ability-escape:last:${user.id}`, response, 300)

    return response
  } finally {
    await releaseActionLock(escapeLock)
  }
}

export async function researchEscape() {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const rateLimit = await checkActionRateLimit(user.id, 'encounter-research-escape', 30, 60)
  if (!rateLimit.allowed) {
    return { success: false, message: 'Too many escape attempts. Please wait a moment.' }
  }

  const escapeLock = await acquireActionLock(
    getEncounterEscapeLockKey(user.id),
    ENCOUNTER_ESCAPE_LOCK_TTL,
  )
  if (!escapeLock.acquired) {
    return { success: false, message: 'Another escape action is already being processed' }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const encounterId = `encounter:${user.id}`
    const state = (await redis.get(encounterId)) as EncounterState | null

    if (!state) {
      const recentResult = await getIdempotentResult<any>(
        `encounter:research-escape:last:${user.id}`,
      )
      if (recentResult) {
        return recentResult
      }
      return { success: false, message: 'Encounter expired or invalid' }
    }

    const resultKey = `encounter:research-escape:result:${user.id}:${state.locationId}:${state.startTime}`
    const cachedResult = await getIdempotentResult<any>(resultKey)
    if (cachedResult) {
      return cachedResult
    }

    // Check research level for the encountered form
    const pokedexMap = (await getUserPokedexMap(payload as any, user.id)) as Record<string, any>
    const formEntry = pokedexMap[state.pokemonId.toString()]?.[state.formId]
    const researchLevel = formEntry?.researchLevel || 0

    if (researchLevel < 3) {
      return { success: false, message: 'Research level too low for free escape' }
    }

    // Clear encounter (free flee — no loss counter)
    const expeditionProgress = await performRunAway(user, state, payload, false)

    const response = {
      success: true,
      escaped: true,
      message: 'Your research knowledge helped you escape safely!',
      expeditionProgress,
    }

    await setIdempotentResult(resultKey, response, 300)
    await setIdempotentResult(`encounter:research-escape:last:${user.id}`, response, 300)

    return response
  } finally {
    await releaseActionLock(escapeLock)
  }
}
