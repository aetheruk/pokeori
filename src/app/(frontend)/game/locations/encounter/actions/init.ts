'use server'

import { redis } from '@/utilities/redis'
import {
  locations,
  type LocationEncounter,
  type LocationReward,
} from '@/data/locations'
import { items } from '@/data/items'
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
import { MOON_STONE_EVOLVERS, ULTRA_BEASTS } from '@/data/lists/special-pokemon'
import { ABILITIES } from '@/data/abilities'
import {
  chooseAbilityEncounterReplacement,
  getAbilityLevelDelta,
  getAbilityShinyMultiplier,
  getAbilityTimerDeltaSeconds,
  getStoredEncounterAbility,
  isNightHour,
  resolveStartAbilityId,
  shouldUseExtraShinyRoll,
} from '@/utilities/pokemon/encounter-ability-runtime'
import {
  checkRequirement,
  isPokemonEligible,
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
import { isActivityEligibleForReplay } from '@/utilities/activity-replay'
import { canApplyEncounterAbilityOverride } from '@/utilities/pokemon/encounter-abilities'
import { getActiveChronicleContext } from '@/utilities/chronicles'
import { rollPokemonGender } from '@/utilities/pokemon/gender'
import type { EncounterState } from './types'
import { rollAbility, getUser } from './utils'
import { refreshEncounterShield, serializeEncounterShield } from './shield'
import {
  getItemSkillLockReason,
  getResearcherShinyModifier,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import {
  getUserActivityStatsMap,
  getUserCompletedTasksMap,
  getUserInventoryMap,
  getUserPokedexMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import { cache } from 'react'
import {
  ensureUserWeatherSlot,
  resolveSubRegionWeather,
} from '@/utilities/weather'
import { serializeEncounterQte } from '@/utilities/pokemon/encounter-qte'

const REPEL_ITEM_IDS = ['repel', 'super-repel', 'max-repel'] as const
type RepelItemId = (typeof REPEL_ITEM_IDS)[number]
type StartEncounterOptions = {
  repelItemId?: RepelItemId
}

function isRepelItemId(itemId: unknown): itemId is RepelItemId {
  return (
    typeof itemId === 'string' && REPEL_ITEM_IDS.includes(itemId as RepelItemId)
  )
}

function rollEncounter<T extends { chance: number }>(encounters: T[]): T {
  const totalChance = encounters.reduce(
    (sum, encounter) => sum + encounter.chance,
    0,
  )
  let roll = Math.random() * totalChance

  for (const encounter of encounters) {
    roll -= encounter.chance
    if (roll <= 0) return encounter
  }

  return encounters[encounters.length - 1]
}

function getEligibleEncounters(
  encounters: LocationEncounter[],
  userData: RequirementData,
  category: string,
  subCategory?: string,
): LocationEncounter[] {
  return encounters.filter((encounter) => {
    if (!encounter.requirements || encounter.requirements.length === 0) {
      return true
    }

    return encounter.requirements.every((req) =>
      checkRequirement(userData, req, { category, subCategory }),
    )
  })
}

export async function startEncounter(
  locationId: string,
  consumedPokemonIds?: string[],
  options: StartEncounterOptions = {},
) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })
  if (!jwtUser) throw new Error('Unauthorized')

  const user = (await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
  })) as User

  const startRateLimit = await checkActionRateLimit(
    user.id,
    'encounter-start',
    40,
    60,
  )
  if (!startRateLimit.allowed) {
    throw new Error('Too many encounter starts. Please wait a moment.')
  }

  const startLock = await acquireActionLock(
    `lock:encounter:start:${user.id}`,
    20,
  )
  if (!startLock.acquired) {
    throw new Error('Another encounter start is being processed')
  }

  try {
    const consumedKey =
      consumedPokemonIds && consumedPokemonIds.length > 0
        ? [...consumedPokemonIds].sort().join(',')
        : 'none'
    const repelItemId = options.repelItemId
    const repelKey = repelItemId || 'none'
    const startResultKey = `encounter:start:result:${user.id}:${locationId}:${consumedKey}:${repelKey}`

    const encounterId = `encounter:${user.id}`
    const activeEncounterState = (await redis.get(
      encounterId,
    )) as EncounterState | null

    const cachedStartResult = await getIdempotentResult<any>(startResultKey)
    if (
      cachedStartResult &&
      activeEncounterState &&
      activeEncounterState.locationId === locationId &&
      activeEncounterState.startTime === cachedStartResult.startTime &&
      Date.now() < activeEncounterState.expiry
    ) {
      return cachedStartResult
    }

    const location = locations.find((l) => l.id === locationId)
    if (!location) throw new Error('Location not found')
    if (repelItemId && !isRepelItemId(repelItemId)) {
      throw new Error('Invalid encounter item')
    }
    if (repelItemId) {
      const repelItem = items.find((item) => item.id === repelItemId)
      if (repelItem) {
        const repelLockReason = getItemSkillLockReason(repelItem, user.skills)
        if (repelLockReason) throw new Error(repelLockReason)
      }
    }
    const chronicleContext = await getActiveChronicleContext({
      userId: user.id,
      activityType: 'location',
      activityId: location.id,
    })

    // Active Pokemon Ability Check
    const activePoke = chronicleContext
      ? { docs: [] }
      : await payload.find({
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
    const activeAbilitySourceFormId = (activePoke.docs[0] as any)?.formId
    const activeAbility = activeAbilityId
      ? ABILITIES[activeAbilityId]
      : undefined

    // Common properties
    const requirements = location.requirements
    let duration = location.timer || 30
    const catchRateMod = location.catchRateModifier || 0
    const shinyMod = location.shinyChanceModifier || 1
    const rewards = location.rewards
    const requiredItem = location.requiredItem
    const background = location.background
    const specialEncounterConfig = location.specialEncounter
    const shieldConfig = location.shield

    const existingState = activeEncounterState

    if (existingState && Date.now() < existingState.expiry) {
      const response = {
        success: true,
        pokemonId: existingState.pokemonId,
        isShiny: existingState.isShiny,
        startTime: existingState.startTime,
        expiry: existingState.expiry,
        duration: Math.floor(
          (existingState.expiry - existingState.startTime) / 1000,
        ),
      }
      await setIdempotentResult(startResultKey, response, 30)
      return response
    }

    // Analyze requirements
    const requiredKeys = analyzeRequirements(location.requirements)

    const [inventoryMap, pokedexMap, completedTasksMap, activityStats] =
      await Promise.all([
        getUserInventoryMap(payload as any, user.id),
        getUserPokedexMap(payload as any, user.id),
        getUserCompletedTasksMap(payload as any, user.id),
        getUserActivityStatsMap(payload as any, user.id),
      ])
    const hasSpecialEncounterItem =
      !specialEncounterConfig ||
      (inventoryMap[specialEncounterConfig.requiredItemId] || 0) > 0
    const pokedexEntries = Object.entries(
      pokedexMap as Record<string, Record<string, any>>,
    ).flatMap(([speciesId, forms]) =>
      Object.entries(forms || {}).map(([formId, data]) => ({
        speciesId: Number(speciesId),
        formId,
        ...(data as any),
      })),
    )

    const weatherState = await ensureUserWeatherSlot(
      payload as any,
      user as User,
    )
    const userData: RequirementData = {
      user: user as User,
      inventory: Object.entries(inventoryMap).map(([itemId, qty]) => ({
        itemId,
        quantity: qty,
      })) as any[],
      pokedex: pokedexEntries as any[],
      pokemon: activePoke.docs as any[],
      tcg: [],
      completedTasks: Object.entries(completedTasksMap).map(
        ([taskId, data]) => ({
          taskId,
          ...(data as any),
        }),
      ) as any[],
      battleResults: activityStats.battles
        ? Object.entries(activityStats.battles).map(
            ([battleId, s]: [string, any]) => ({
              battleId,
              ...s,
            }),
          )
        : [],
      locationEncounterResults: activityStats.locations
        ? Object.entries(activityStats.locations).map(
            ([locationId, s]: [string, any]) => ({
              locationId,
              ...s,
            }),
          )
        : [],
      researchEncounterResults: activityStats.research
        ? Object.entries(activityStats.research).map(
            ([encounterId, s]: [string, any]) => ({
              encounterId,
              ...s,
            }),
          )
        : [],
      expeditionResults: activityStats.expeditions
        ? Object.entries(activityStats.expeditions).map(
            ([expeditionId, s]: [string, any]) => ({
              expeditionId,
              ...s,
            }),
          )
        : [],
      weatherSlot: weatherState.slot,
      weatherUpdatedAt: weatherState.updatedAt,
    }
    const weatherSnapshot = {
      ...resolveSubRegionWeather(location.subCategory, weatherState.slot),
      updatedAt: weatherState.updatedAt,
      expiresAt: weatherState.expiresAt,
    }

    // Check requirements
    if (location.requirements && location.requirements.length > 0) {
      const meetsRequirements = location.requirements.every((req) =>
        checkRequirement(userData, req, {
          category: location.category,
          subCategory: location.subCategory,
          weather: weatherSnapshot.weather,
        }),
      )
      if (!meetsRequirements) throw new Error('Requirements not met')
    }

    // Check Criteria (similar to requirements but can be consumed)
    if (location.criteria && location.criteria.length > 0) {
      const criteriaMet = location.criteria.every((req) =>
        checkRequirement(userData, req, {
          category: location.category,
          subCategory: location.subCategory,
          weather: weatherSnapshot.weather,
        }),
      )
      if (!criteriaMet) throw new Error('Entry criteria not met')
    }

    const allReqsAndCriteria = [
      ...(location.requirements || []),
      ...(location.criteria || []),
    ]

    // Handle Pokemon Consumption
    const pokemonCriteria = allReqsAndCriteria.filter(
      (req) => req.type === 'pokemon_owned' && req.consume,
    )

    if (pokemonCriteria.length > 0) {
      if (!consumedPokemonIds || consumedPokemonIds.length === 0) {
        throw new Error('No Pokemon selected for consumption')
      }

      const { docs: userPokemon } = await payload.find({
        collection: 'pokemon',
        where: {
          id: { in: consumedPokemonIds },
          user: { equals: user.id },
        },
        limit: 100,
      })

      if (userPokemon.length !== consumedPokemonIds.length) {
        throw new Error('Invalid Pokemon selection')
      }

      for (const req of pokemonCriteria) {
        const requiredCount = req.count || 1
        const targetId = req.targetId as string

        const matchingPokemon = userPokemon.filter((p) => {
          if (req.pokemonCriteria)
            return isPokemonEligible(p, req.pokemonCriteria)
          if (targetId) return String(p.speciesId) === targetId
          return true
        })

        if (matchingPokemon.length < requiredCount) {
          throw new Error(
            `Not enough Pokemon selected for ${targetId} (Need ${requiredCount})`,
          )
        }
      }

      for (const pid of consumedPokemonIds) {
        await payload.delete({
          collection: 'pokemon',
          id: pid,
        })
      }
    }

    // Handle Item Consumption
    const itemsToConsume: Record<string, number> = {}
    let hasConsumption = false

    for (const req of allReqsAndCriteria) {
      if (
        req.consume &&
        req.type === 'item_owned' &&
        typeof req.targetId === 'string'
      ) {
        itemsToConsume[req.targetId] =
          (itemsToConsume[req.targetId] || 0) + (req.count || 1)
        hasConsumption = true
      }
    }

    if (repelItemId) {
      itemsToConsume[repelItemId] = (itemsToConsume[repelItemId] || 0) + 1
      hasConsumption = true
    }

    if (hasConsumption) {
      const currentInventory = await getUserInventoryMap(
        payload as any,
        user.id,
      )
      const newInventory = { ...currentInventory }

      for (const [itemId, count] of Object.entries(itemsToConsume)) {
        const current = newInventory[itemId] || 0
        if (current < count) {
          throw new Error(`Not enough items: ${itemId}`)
        }
        newInventory[itemId] = current - count
      }
      Object.keys(inventoryMap).forEach((itemId) => delete inventoryMap[itemId])
      Object.assign(inventoryMap, newInventory)

      await setUserInventoryMap(payload as any, user.id, newInventory)
    }

    const eligibleEncounters = getEligibleEncounters(
      location.encounters,
      userData,
      location.category,
      location.subCategory,
    )
    if (eligibleEncounters.length === 0) {
      throw new Error('No eligible encounters found')
    }

    // Roll for Pokemon
    let selectedEncounter = rollEncounter(eligibleEncounters)

    if (repelItemId === 'max-repel') {
      const candidates = [
        selectedEncounter,
        rollEncounter(eligibleEncounters),
        rollEncounter(eligibleEncounters),
      ]
      selectedEncounter = candidates.reduce((rarest, candidate) =>
        candidate.chance < rarest.chance ? candidate : rarest,
      )
    }

    if (!selectedEncounter) throw new Error('No encounter found')

    let pokemonId = selectedEncounter.speciesId
    let speciesData = getPokemonSpecies(pokemonId)

    if (selectedEncounter.formId) {
      const specificForm = getPokemonForm(selectedEncounter.formId)
      if (specificForm) {
        speciesData = specificForm
      }
    }

    let formId = speciesData?.id || pokemonId.toString()

    // Encounter Ability Modifier (Override)
    // Check this AFTER formId is determined so criteria can properly match
    if (canApplyEncounterAbilityOverride(location)) {
      const replacementEncounter = chooseAbilityEncounterReplacement({
        ability: activeAbility,
        formId,
        speciesId: pokemonId,
        sourceFormId: activeAbilitySourceFormId,
        locationId: location.id,
        targetTypes: speciesData?.types,
        category: location.category,
        subCategory: location.subCategory,
        isNight: isNightHour(),
      })
      if (replacementEncounter) {
        selectedEncounter = replacementEncounter
        pokemonId = replacementEncounter.speciesId
        const newSpeciesData = getPokemonSpecies(replacementEncounter.speciesId)
        if (replacementEncounter.formId) {
          const specificForm = getPokemonForm(replacementEncounter.formId)
          speciesData = specificForm || newSpeciesData
        } else {
          speciesData = newSpeciesData
        }
        formId = speciesData?.id || pokemonId.toString()
      }
    }
    const effectiveAbilityId = resolveStartAbilityId(activeAbilityId, formId)
    const effectiveAbility = effectiveAbilityId
      ? ABILITIES[effectiveAbilityId]
      : undefined
    const baseRate = speciesData?.capture_rate || 100

    // Initial Catch Rate Calculation
    // We simulate full HP, which reduces catch rate to ~33% of base.
    // Formula: (3 * MaxHP - 2 * CurrentHP) / (3 * MaxHP) * Rate
    // If CurrentHP == MaxHP -> (3 - 2) / 3 * Rate = 1/3 * Rate
    const initialCatchRate = Math.floor(baseRate / 2)

    // Apply location modifier (0-255)
    // Formula: base + modifier (clamped to 255)
    const modifiedBaseRate = Math.min(
      255,
      initialCatchRate + (location.catchRateModifier || 0),
    )

    // Roll for Shiny
    // Base rate: 1/4096 (~0.024%)
    // Modified by location modifier
    const baseShinyRate = 1 / 4096
    const researcherLevel = getSkillLevel(user.skills, 'researching')
    let shinyChance =
      baseShinyRate *
      (location.shinyChanceModifier || 1) *
      getResearcherShinyModifier(researcherLevel)

    // Ability Shiny Modifier
    // We need species types for triggers.
    shinyChance *= getAbilityShinyMultiplier({
      ability: effectiveAbility,
      formId,
      speciesId: pokemonId,
      sourceFormId: activeAbilitySourceFormId,
      locationId: location.id,
      targetTypes: speciesData?.types,
      isNight: isNightHour(),
    })

    // Research Level 5: Double Roll for Shiny
    const researchFormEntry = pokedexMap[pokemonId.toString()]?.[formId]
    const formResearchLvl = researchFormEntry?.researchLevel || 0
    let isShiny: boolean
    if (formResearchLvl >= 5) {
      // Double roll — success on either
      isShiny = Math.random() < shinyChance || Math.random() < shinyChance
    } else {
      isShiny = Math.random() < shinyChance
    }
    if (
      !isShiny &&
      shouldUseExtraShinyRoll({
        ability: effectiveAbility,
        sourceFormId: activeAbilitySourceFormId,
        targetFormId: formId,
        shinyChance,
      })
    ) {
      isShiny = true
    }

    // Timer Modifier
    duration = Math.max(
      1,
      duration +
        getAbilityTimerDeltaSeconds({
          ability: effectiveAbility,
          formId,
          speciesId: pokemonId,
          sourceFormId: activeAbilitySourceFormId,
          locationId: location.id,
          targetTypes: speciesData?.types,
          isNight: isNightHour(),
        }),
    )

    const startTime = Date.now()
    const expiry = startTime + duration * 1000

    const state: EncounterState = {
      userId: user.id,
      locationId: location.id,
      pokemonId,
      formId,
      isShiny,
      gender: rollPokemonGender(pokemonId),
      startTime,
      expiry,
      baseCatchRate: modifiedBaseRate,
      currentCatchRate: shieldConfig ? 0 : modifiedBaseRate,
      questionsAnswered: [],
      itemsUsed: repelItemId ? [repelItemId] : [],
      totalCorrectAnswers: 0,
      consecutiveCorrectAnswers: 0,
      shield: shieldConfig
        ? {
            config: shieldConfig,
            active: true,
            correctAnswers: 0,
            consecutiveCorrectAnswers: 0,
            brokenCount: 0,
          }
        : undefined,
      fleeRate: location.fleeRate,
      levelRange: location.levelRange,
      catchRateModifier: location.catchRateModifier || 0,
      captureAttempts: 0,
      secondChanceUsed: false,
      secondChanceModifier: 0,
      encounterPool: eligibleEncounters.map((encounter) => ({
        speciesId: encounter.speciesId,
        formId: encounter.formId,
        chance: encounter.chance,
      })),
      weather: weatherSnapshot,
      activeAbilityId,
      activeAbilitySourcePokemonId: activePoke.docs[0]
        ? String((activePoke.docs[0] as any).id)
        : undefined,
      activeAbilitySourceFormId,
      activeAbilitySourceLevel: activePoke.docs[0]
        ? (activePoke.docs[0] as any).level
        : undefined,
      copiedAbilityId:
        effectiveAbilityId !== activeAbilityId ? effectiveAbilityId : undefined,
      levelModifier: getAbilityLevelDelta({
        ability: effectiveAbility,
        formId,
        speciesId: pokemonId,
        sourceFormId: activeAbilitySourceFormId,
        locationId: location.id,
        targetTypes: speciesData?.types,
        isNight: isNightHour(),
      }),
      rewardModifier: undefined,
      qte: undefined,
      normalQuestionsSinceLastQte: 0,
      abilityEscapeAttempted: false,
      specialEncounter: specialEncounterConfig
        ? {
            type: specialEncounterConfig.type,
            requiredItemId: specialEncounterConfig.requiredItemId,
            hasRequiredItem: hasSpecialEncounterItem,
            failMessage: specialEncounterConfig.failMessage,
          }
        : undefined,
      chronicle: chronicleContext
        ? {
            expeditionId: chronicleContext.expeditionId,
            expeditionName: chronicleContext.expeditionName,
            balls: { ...(chronicleContext.chronicle.balls || {}) },
          }
        : undefined,
    }

    // Handle Updates (Inventory for break chance, Pokedex for Seen)
    let breakMessage: string | undefined
    const updates: any = {}

    // Check Item Break
    if (!chronicleContext && requiredItem?.breakChance) {
      const roll = Math.random() * 100
      if (roll < requiredItem.breakChance) {
        const itemId = requiredItem!.id
        const qty = inventoryMap[itemId] || 0

        if (qty > 0) {
          inventoryMap[itemId] = qty - 1
          updates.inventory = inventoryMap

          const itemDef = items.find((i) => i.id === itemId)
          const itemName = itemDef?.name || itemId
          breakMessage = `Your ${itemName} disappears as you enter ${location.name}`
        }
      }
    }

    if (!chronicleContext && hasSpecialEncounterItem) {
      // Update Pokedex Checks
      const speciesKey = pokemonId.toString()
      const formKey = formId.toString()

      const pokedexData = pokedexMap[speciesKey] || {}
      const existingEntry = pokedexData[formKey] || {
        caught: false,
        seen: false,
        totalCaught: 0,
        totalSeen: 0,
        shinyCaught: false,
        shinySeen: false,
      }

      pokedexMap[speciesKey] = {
        ...pokedexData,
        [formKey]: {
          ...existingEntry,
          seen: true,
          totalSeen: (existingEntry.totalSeen || 0) + 1,
          shinySeen: isShiny ? true : existingEntry.shinySeen,
        },
      }
      updates.pokedex = pokedexMap
    }

    // Save Updates
    if (Object.keys(updates).length > 0) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: updates,
      })
    }

    // Save to Redis
    await redis.set(encounterId, state, { ex: duration + 60 })

    const response = {
      success: true,
      pokemonId,
      isShiny,
      gender: state.gender,
      startTime,
      expiry,
      duration,
      message: breakMessage,
    }

    await setIdempotentResult(startResultKey, response, 30)

    return response
  } finally {
    await releaseActionLock(startLock)
  }
}

export const getEncounter = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })

  if (!jwtUser) return null

  const user = await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
  })

  const encounterId = `encounter:${user.id}`
  const state = (await redis.get(encounterId)) as EncounterState | null

  if (!state) return null
  if (refreshEncounterShield(state)) {
    await redis.set(encounterId, state, {
      ex: Math.floor((state.expiry - Date.now()) / 1000) + 60,
    })
  }

  const inventoryMap = state.chronicle
    ? state.chronicle.balls || {}
    : await getUserInventoryMap(payload as any, user.id)
  // Convert to array for client/compatibility
  const inventoryArray = Object.entries(inventoryMap)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => ({ itemId: id, quantity: qty })) as any[]

  const speciesData =
    getPokemonForm(state.formId) || getPokemonSpecies(state.pokemonId)
  const pokemonName = speciesData?.name || 'Pokemon'

  // Get Active Pokemon Ability
  const activePoke = state.chronicle
    ? { docs: [] }
    : await payload.find({
        collection: 'pokemon',
        where: {
          and: [
            { user: { equals: user.id } },
            { isCompanion: { equals: true } },
          ],
        },
        limit: 1,
      })
  const activeAbilityId = (activePoke.docs[0] as any)?.ability
  const activeAbility =
    getStoredEncounterAbility(state) ||
    (activeAbilityId ? ABILITIES[activeAbilityId] : undefined)

  // Get research level for this form
  const pokedexMap = (await getUserPokedexMap(
    payload as any,
    user.id,
  )) as Record<string, any>
  const encounterResearchLvl =
    pokedexMap[state.pokemonId.toString()]?.[state.formId]?.researchLevel || 0
  const encounterSpeciesPokedex = (pokedexMap[state.pokemonId.toString()] ||
    {}) as Record<string, any>
  const hasCaughtEncounterSpecies = Object.values(encounterSpeciesPokedex).some(
    (entry: any) => !!entry?.caught,
  )

  let isEligibleForReplay = false
  const location = locations.find((l) => l.id === state.locationId)
  if (location && !state.chronicle) {
    isEligibleForReplay = await isActivityEligibleForReplay(
      user as User,
      location,
      'location',
    )
  }

  return {
    pokemonId: state.pokemonId,
    formId: state.formId,
    pokemonName,
    isShiny: state.isShiny,
    gender: state.gender,
    startTime: state.startTime,
    expiry: state.expiry,
    duration: Math.floor((state.expiry - state.startTime) / 1000),
    currentCatchRate: state.currentCatchRate,
    questionsAnsweredCount: state.questionsAnswered?.length || 0,
    shield: serializeEncounterShield(state),
    fleeRate: state.fleeRate,
    inventory: inventoryArray,
    locationId: state.locationId,
    background: (state as any).background, // From fishing or location encounter
    encounterLevel: state.level,
    kidMode: user.kidMode || false,
    itemsUsed: state.itemsUsed || [],
    hasCaughtEncounterSpecies,
    activeAbility,
    companionFormId: activePoke.docs[0]
      ? (activePoke.docs[0] as any).formId
      : undefined,
    companionShiny: activePoke.docs[0]
      ? (activePoke.docs[0] as any).shiny
      : false,
    companionLevel: activePoke.docs[0]
      ? (activePoke.docs[0] as any).level
      : undefined,
    abilityEscapeAttempted: state.abilityEscapeAttempted || false,
    formResearchLevel: encounterResearchLvl,
    isEligibleForReplay,
    specialEncounter: state.specialEncounter,
    qte: serializeEncounterQte(state.qte),
  }
})
