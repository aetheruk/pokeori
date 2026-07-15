'use server'

import { redis } from '@/utilities/redis'
import type { LocationReward } from '@/data/locations'
import { items } from '@/data/items'
import {
  getEncounterSecondChanceModifier,
  getTypeLureAnswerEquivalent,
  getTypeLureType,
  isEncounterItemUsableForPokemon,
  isMidEncounterUsableItem,
  isPreEncounterOnlyItem,
} from '@/data/items/types'
import { getPokemonSpecies, getPokemonForm } from '@/utilities/pokemon/pokedex'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getQuizData } from '@/data/quiz'
import {
  generatePokemonStats,
  computeStats,
} from '@/utilities/pokemon/pokemon-mechanics'
import { incrementDailyTaskProgress } from '@/utilities/tasks/daily-progress'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { MOON_STONE_EVOLVERS, ULTRA_BEASTS } from '@/data/lists/special-pokemon'
import { ABILITIES } from '@/data/abilities'
import {
  applyAnswerAbility,
  getStoredEncounterAbility,
} from '@/utilities/pokemon/encounter-ability-runtime'
import {
  checkRequirement,
  type RequirementData,
} from '@/utilities/requirements'
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
import type { EncounterState } from './types'
import { rollAbility, getUser } from './utils'
import { runAway } from './escape'
import {
  applyCorrectAnswerToShield,
  applyIncorrectAnswerToShield,
  refreshEncounterShield,
  serializeEncounterShield,
} from './shield'
import { getAnswerResultKey } from './answer-idempotency'
import { getEncounterItemResultKey } from './item-idempotency'
import {
  getExplorerEncounterItemLimit,
  getItemSkillLockReason,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import {
  getUserInventoryMap,
  incrementUserActivityResult,
  setUserInventoryMap,
} from '@/utilities/user-state'
import {
  activateEncounterQte,
  buildEncounterQte,
  buildScareQteDecoyFormIds,
  serializeEncounterQte,
  shouldRollEncounterQte,
} from '@/utilities/pokemon/encounter-qte'
import {
  ENCOUNTER_MECHANICS_LOCK_TTL,
  getEncounterMechanicsLockKey,
} from './lock'
import { buildEncounterQuizQuestion } from './quiz-question'

async function rollNextQtePromptIfReady({
  payload,
  state,
  user,
  now,
}: {
  payload: Awaited<ReturnType<typeof getPayload>>
  state: EncounterState
  user: User
  now: number
}) {
  if (
    state.qte?.status === 'active' ||
    state.chronicle ||
    (state.specialEncounter && !state.specialEncounter.hasRequiredItem) ||
    !shouldRollEncounterQte({
      normalQuestionsSinceLastQte: state.normalQuestionsSinceLastQte || 0,
      shieldActive: !!state.shield?.active,
    })
  ) {
    return undefined
  }

  const inventory = await getUserInventoryMap(payload as any, user.id)
  const qte = buildEncounterQte({ inventory, items })
  if (!qte) return undefined
  if (qte.type === 'scare') {
    qte.decoyFormIds = buildScareQteDecoyFormIds({
      encounterPool: state.encounterPool,
      activeFormId: state.formId,
    })
  }

  state.qte = qte
  activateEncounterQte(state.qte, now)
  return serializeEncounterQte(state.qte)
}

async function failEncounterFromAbility(
  user: User,
  state: EncounterState,
  activePokemonId?: string,
) {
  const payload = await getPayload({ config: configPromise })
  const encounterId = `encounter:${user.id}`

  await redis.del(encounterId)

  if (activePokemonId) {
    await payload.update({
      collection: 'pokemon',
      id: activePokemonId,
      data: { ability: '' },
    })
  }

  await incrementUserActivityResult(
    payload as any,
    user.id,
    'locationEncounterResults',
    state.locationId,
    { losses: 1 },
  )

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

export async function getQuizQuestion(
  pokemonId: number,
  kidMode: boolean = false,
  formId?: string,
) {
  try {
    const user = await getUser()
    const state = user
      ? ((await redis.get(`encounter:${user.id}`)) as EncounterState | null)
      : null
    return buildEncounterQuizQuestion({ pokemonId, kidMode, formId, state })
  } catch (error) {
    console.error('Error loading quiz:', error)
    return null
  }
}

export async function applyEncounterPromptResult({
  payload,
  user,
  state,
  isCorrect,
  now,
  promptId,
  optionIndex,
  rateMultiplier = 1,
  promptType = 'question',
}: {
  payload: Awaited<ReturnType<typeof getPayload>>
  user: User
  state: EncounterState
  isCorrect: boolean
  now: number
  promptId: string
  optionIndex?: number
  rateMultiplier?: number
  promptType?: 'question' | 'qte'
}) {
  const speciesData = getPokemonSpecies(state.pokemonId)
  const baseRate = speciesData?.capture_rate || 100
  const changeAmount = Math.min(10, baseRate / 6)

  let activePokemon: any | undefined
  let activePokemonId = state.activeAbilitySourcePokemonId
  let activePokemonLevel = state.activeAbilitySourceLevel
  let activePokemonFormId = state.activeAbilitySourceFormId
  let activeAbility = getStoredEncounterAbility(state)

  if (!activeAbility || activePokemonLevel === undefined || !activePokemonId) {
    const activePoke = await payload.find({
      collection: 'pokemon',
      where: {
        and: [{ user: { equals: user.id } }, { isCompanion: { equals: true } }],
      },
      limit: 1,
    })
    activePokemon = activePoke.docs[0] as any
    activePokemonId ||= activePokemon?.id ? String(activePokemon.id) : undefined
    activePokemonLevel ??= activePokemon?.level
    activePokemonFormId ||= activePokemon?.formId
    const activeAbilityId = activePokemon?.ability
    activeAbility ||= activeAbilityId ? ABILITIES[activeAbilityId] : undefined
  }

  const answerAbilityResult = applyAnswerAbility({
    state,
    ability: activeAbility,
    sourceFormId: activePokemonFormId,
    activePokemonLevel,
    targetTypes: speciesData?.types,
    isCorrect,
    changeAmount,
    optionIndex,
  })
  isCorrect = answerAbilityResult.isCorrect

  if (promptType === 'question') {
    state.normalQuestionsSinceLastQte =
      (state.normalQuestionsSinceLastQte || 0) + 1
  } else {
    state.normalQuestionsSinceLastQte = 0
  }

  if (isCorrect) {
    state.totalCorrectAnswers = (state.totalCorrectAnswers || 0) + 1
    state.consecutiveCorrectAnswers = (state.consecutiveCorrectAnswers || 0) + 1
    const shieldResult = applyCorrectAnswerToShield(state, now)
    if (!shieldResult.wasShielded) {
      const defaultIncrease = answerAbilityResult.skipDefault
        ? 0
        : changeAmount * rateMultiplier
      const rateIncrease =
        defaultIncrease + (answerAbilityResult.rateDelta || 0)
      state.currentCatchRate = Math.min(
        255,
        state.currentCatchRate + rateIncrease,
      )
    }
    if (answerAbilityResult.timerDeltaMs) {
      state.expiry = Math.max(
        Date.now() + 1000,
        state.expiry + answerAbilityResult.timerDeltaMs,
      )
    }
    state.questionsAnswered.push(promptId)
    if (promptType === 'qte') state.qte = undefined
    const qte = await rollNextQtePromptIfReady({ payload, state, user, now })
    return {
      success: true,
      correct: true,
      newCatchRate: state.currentCatchRate,
      shield: serializeEncounterShield(state) ?? null,
      shieldBroken: shieldResult.brokeShield,
      abilityMessage: answerAbilityResult.message,
      qte: qte ?? null,
      newExpiry: state.expiry,
    }
  }

  if (answerAbilityResult.failEncounter) {
    const expeditionProgress = await failEncounterFromAbility(
      user,
      state,
      answerAbilityResult.abilityLost ? activePokemonId : undefined,
    )
    return {
      success: true,
      correct: false,
      encounterFailed: true,
      abilityLost: answerAbilityResult.abilityLost,
      failMessage: answerAbilityResult.message || 'The wild pokemon fled.',
      pokemonId: state.pokemonId,
      formId: state.formId,
      expeditionProgress,
    }
  }

  const wasShielded = applyIncorrectAnswerToShield(state)
  state.lastAnswerWasWrong = true
  if (state.fleeRate && Math.random() < state.fleeRate / 100) {
    const expeditionProgress = await failEncounterFromAbility(user, state)
    return {
      success: true,
      correct: false,
      encounterFailed: true,
      failMessage: 'The Pokemon fled!',
      pokemonId: state.pokemonId,
      formId: state.formId,
      expeditionProgress,
    }
  }

  if (!wasShielded) {
    if (!answerAbilityResult.skipDefault) {
      state.currentCatchRate = Math.max(
        0,
        state.currentCatchRate - changeAmount / 2,
      )
    }
    if (answerAbilityResult.rateDelta) {
      state.currentCatchRate = Math.max(
        0,
        Math.min(255, state.currentCatchRate + answerAbilityResult.rateDelta),
      )
    }
  }
  if (answerAbilityResult.timerDeltaMs) {
    state.expiry = Math.max(
      Date.now() + 1000,
      state.expiry + answerAbilityResult.timerDeltaMs,
    )
  }
  state.questionsAnswered.push(promptId)
  if (promptType === 'qte') state.qte = undefined
  const qte = await rollNextQtePromptIfReady({ payload, state, user, now })
  return {
    success: true,
    correct: false,
    newCatchRate: state.currentCatchRate,
    shield: serializeEncounterShield(state) ?? null,
    qte: qte ?? null,
    newExpiry: state.expiry,
  }
}

export async function submitAnswer(
  questionId: string,
  answer: string,
  attemptId?: string,
  optionIndex?: number,
) {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'encounter-submit-answer',
      240,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many answers. Please wait a moment.',
      }
    }

    const mechanicsLock = await acquireActionLock(
      getEncounterMechanicsLockKey(user.id),
      ENCOUNTER_MECHANICS_LOCK_TTL,
    )
    if (!mechanicsLock.acquired) {
      return {
        success: false,
        error: 'Another encounter action is being processed',
      }
    }

    try {
      const encounterId = `encounter:${user.id}`
      const state = (await redis.get(encounterId)) as EncounterState | null

      if (!state) {
        const recentAnswer = await getIdempotentResult<any>(
          `encounter:answer:last:${user.id}`,
        )
        if (recentAnswer) {
          return recentAnswer
        }
        return { success: false, error: 'Encounter expired or invalid' }
      }

      if (Date.now() > state.expiry) {
        return { success: false, error: 'Time is up!', enterCapture: true }
      }
      const now = Date.now()
      refreshEncounterShield(state, now)

      const resultKey = getAnswerResultKey({
        userId: user.id,
        locationId: state.locationId,
        startTime: state.startTime,
        questionId,
        answer,
        attemptId,
      })
      const cachedAnswerResult = await getIdempotentResult<any>(resultKey)
      if (cachedAnswerResult) {
        return cachedAnswerResult
      }

      if (state.qte?.status === 'active') {
        return { success: false, error: 'Complete the active QTE first' }
      }

      let isCorrect = false

      if (questionId.startsWith('kid-')) {
        isCorrect = state.formId === answer
      } else {
        // Load quiz to verify answer
        const questions = getQuizData(state.pokemonId)
        if (!questions) return { success: false, error: 'Quiz data not found' }

        const question = questions.find((q) => q.id === questionId)

        if (!question) return { success: false, error: 'Invalid question' }

        isCorrect = question.correctAnswer === answer
      }

      const payload = await getPayload({ config: configPromise })

      const response = await applyEncounterPromptResult({
        payload,
        user,
        state,
        isCorrect,
        now,
        promptId: questionId,
        optionIndex,
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
      await setIdempotentResult(
        `encounter:answer:last:${user.id}`,
        response,
        ttl,
      )
      return response
    } finally {
      await releaseActionLock(mechanicsLock)
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}

export async function useEncounterItem(itemId: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Unauthorized' }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'encounter-use-item',
      80,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many item actions. Please wait a moment.',
      }
    }

    const mechanicsLock = await acquireActionLock(
      getEncounterMechanicsLockKey(user.id),
      ENCOUNTER_MECHANICS_LOCK_TTL,
    )
    if (!mechanicsLock.acquired) {
      return {
        success: false,
        error: 'Another encounter action is being processed',
      }
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const encounterId = `encounter:${user.id}`
      const state = (await redis.get(encounterId)) as EncounterState | null

      if (!state) {
        const recentUseItem = await getIdempotentResult<any>(
          `encounter:item:last:${user.id}`,
        )
        if (recentUseItem) {
          return recentUseItem
        }
        return { success: false, error: 'Encounter expired or invalid' }
      }

      const resultKey = getEncounterItemResultKey({
        userId: user.id,
        state,
        itemId,
      })
      const cachedUseItemResult = await getIdempotentResult<any>(resultKey)
      if (cachedUseItemResult) {
        return cachedUseItemResult
      }

      refreshEncounterShield(state)

      const itemUseLimit = getExplorerEncounterItemLimit(
        getSkillLevel(user.skills, 'catching'),
      )
      if ((state.itemsUsed || []).length >= itemUseLimit) {
        return {
          success: false,
          error: `You can only use ${itemUseLimit} item${itemUseLimit === 1 ? '' : 's'} per encounter!`,
        }
      }

      // Check Inventory
      const inventory = await getUserInventoryMap(payload as any, user.id)
      const qty = inventory[itemId] || 0
      if (qty < 1) {
        return { success: false, error: "You don't have that item!" }
      }

      const itemDef = items.find((i) => i.id === itemId)
      if (
        !itemDef ||
        (!isMidEncounterUsableItem(itemDef) && !isPreEncounterOnlyItem(itemDef))
      ) {
        return { success: false, error: 'Invalid item' }
      }
      const skillLockReason = getItemSkillLockReason(itemDef, user.skills)
      if (skillLockReason) return { success: false, error: skillLockReason }

      // Logic per item
      let message = `Used ${itemDef.name}!`
      let fled = false
      let newRate = state.currentCatchRate
      let expeditionProgress: any

      // Get Species Data for Logic
      const species =
        getPokemonForm(state.formId) || getPokemonSpecies(state.pokemonId)
      if (!species) return { success: false, error: 'Pokemon data not found' }
      const lureType = getTypeLureType(itemId)
      const secondChanceModifier = getEncounterSecondChanceModifier(itemDef)

      // 1. Escape Rope
      if (itemId === 'escape-rope') {
        const runAwayResult = await runAway()
        if (!runAwayResult.success) {
          return {
            success: false,
            error: runAwayResult.message || 'Failed to flee',
          }
        }
        expeditionProgress = (runAwayResult as any)?.expeditionProgress
        fled = true
        message = 'You used an Escape Rope to flee safely!'
        // Inventory decrement is handled below if not fled?
        // runAway doesn't decrement item, we must do it here.
      }
      // 2. Pre-encounter utility items
      else if (isPreEncounterOnlyItem(itemDef)) {
        return {
          success: false,
          error: 'Repels must be used before starting an encounter.',
        }
      }
      // 3. Type Lures
      else if (lureType) {
        const typeCap = lureType.charAt(0).toUpperCase() + lureType.slice(1)

        if (!isEncounterItemUsableForPokemon(itemDef, species.types)) {
          return {
            success: false,
            error: `This lure only works on ${typeCap}-type Pokemon!`,
          }
        }

        // Lure strength comes from the crafted item tier, not a passive skill multiplier.
        const speciesData = getPokemonSpecies(state.pokemonId)
        const baseRate = speciesData?.capture_rate || 100
        // Formula: BaseRate / 6, capped at 10 max increase per answer.
        const stageValue = Math.min(10, baseRate / 6)
        const lureMultiplier = getTypeLureAnswerEquivalent(itemId)

        if (state.shield?.active) {
          message = `Used ${itemDef.name}, but the shield blocked the catch-rate boost!`
        } else {
          newRate = Math.min(
            255,
            state.currentCatchRate + lureMultiplier * stageValue,
          )
          message = `Used ${itemDef.name}! Catch rate increased!`
        }
      }
      // 4. Second Chance support items
      else if (secondChanceModifier > 0) {
        state.secondChanceModifier =
          (state.secondChanceModifier || 0) + secondChanceModifier
        message = `Used ${itemDef.name}! Second Chance increased by ${secondChanceModifier}%.`
      }
      // 5. Chaos Stone
      else if (itemId === 'chaos-stone') {
        const roll = Math.random()
        if (roll < 0.33) {
          // Flee
          const runAwayResult = await runAway()
          if (!runAwayResult.success) {
            return {
              success: false,
              error: runAwayResult.message || 'Failed to flee',
            }
          }
          expeditionProgress = (runAwayResult as any)?.expeditionProgress
          fled = true
          message = 'The Chaos Stone caused the Pokemon to flee!'
        } else if (roll < 0.66) {
          // +5 Stages
          const speciesData = getPokemonSpecies(state.pokemonId)
          const baseRate = speciesData?.capture_rate || 100
          const stageValue = Math.min(10, baseRate / 6)

          if (state.shield?.active) {
            message =
              'The Chaos Stone surged, but the shield blocked the catch-rate boost!'
          } else {
            newRate = Math.min(255, state.currentCatchRate + 5 * stageValue)
            message = 'Chaos Stone greatly increased catch rate!'
          }
        } else {
          // -5 Stages
          const speciesData = getPokemonSpecies(state.pokemonId)
          const baseRate = speciesData?.capture_rate || 100
          const stageValue = Math.min(10, baseRate / 6)

          newRate = Math.max(0, state.currentCatchRate - 5 * stageValue)
          message = 'Chaos Stone drastically reduced catch rate!'
        }
      }

      // Decrement Inventory
      inventory[itemId] = qty - 1
      await setUserInventoryMap(payload as any, user.id, inventory)

      if (fled) {
        const response = {
          success: true,
          fled: true,
          message,
          expeditionProgress,
        }
        await setIdempotentResult(resultKey, response, 120)
        await setIdempotentResult(
          `encounter:item:last:${user.id}`,
          response,
          120,
        )
        return response
      }

      // Update State
      state.currentCatchRate = newRate
      state.itemsUsed = [...(state.itemsUsed || []), itemId]

      const encounterTtl = Math.max(
        60,
        Math.floor((state.expiry - Date.now()) / 1000) + 60,
      )
      await redis.set(encounterId, state, {
        ex: encounterTtl,
      })

      const response = {
        success: true,
        fled: false,
        message,
        newCatchRate: newRate,
        shield: serializeEncounterShield(state) ?? null,
      }
      await setIdempotentResult(resultKey, response, 120)
      await setIdempotentResult(`encounter:item:last:${user.id}`, response, 120)
      return response
    } finally {
      await releaseActionLock(mechanicsLock)
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    }
  }
}
