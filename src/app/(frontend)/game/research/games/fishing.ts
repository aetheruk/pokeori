'use server'

import { redis } from '@/utilities/redis'
import { allGames } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { getUser, type ResearchState } from '../actions'
import { ABILITIES } from '@/data/abilities'
import {
  getAbilityShinyMultiplier,
  isNightHour,
  resolveStartAbilityId,
  shouldUseExtraShinyRoll,
} from '@/utilities/pokemon/encounter-ability-runtime'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  resolvePokemonRarity,
  type PokemonRarityId,
} from '@/utilities/pokemon/rarity-effects'
import { getShinyChance, rollShiny } from '@/utilities/pokemon/shiny-odds'
import { getResearcherShinyModifier, getSkillLevel } from '@/utilities/skills/unlocks'
import type { Reward } from '@/utilities/rewards/reward-logic'
import type {
  FishingGameConfig,
  RodType,
  FishingPokemonEntry,
  FishingItemEntry,
} from '@/data/games/fishing/types'
import {
  FISHING_ITEM_CHANCE,
  FISHING_POKEMON_CHANCE,
  globalFishingItemPools,
} from '@/data/games/fishing/item-pools'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { getRegionTimeZone, getTimeZoneClockTime } from '@/utilities/requirements'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  incrementUserActivityResult,
} from '@/utilities/user-state'
import type { WeatherSnapshot } from '@/utilities/weather'
import { applySecretFishingPokemonReplacement } from '@/utilities/fishing/secret-pokemon'

export interface FishingState {
  userId: string
  encounterId: string
  selectedRod: RodType
  castId?: string
  castTime: number
  appearTime: number // When the symbol should appear
  hookedResult?: {
    type: 'pokemon' | 'item'
    entry: FishingPokemonEntry | FishingItemEntry
    isShiny?: boolean
    rarity?: PokemonRarityId
  }
  reactionDeadline?: number // When the hook window ends
  phase: 'idle' | 'waiting' | 'nibble' | 'hooked' | 'missed'
  weather?: WeatherSnapshot
}

const FISHING_ACTION_LOCK_TTL = 10

function getFishingActionLockKey(userId: string): string {
  return `lock:fishing:action:${userId}`
}

function getRodItemId(rodType: RodType): string {
  if (rodType === 'good') return 'good-rod'
  if (rodType === 'super') return 'super-rod'
  return 'old-rod'
}

function buildHookedResponse(fishingState: FishingState) {
  const result = fishingState.hookedResult
  if (!result) {
    return {
      success: false,
      error: 'No hook result available',
    }
  }

  if (result.type === 'item') {
    const itemEntry = result.entry as FishingItemEntry
    return {
      success: true,
      hooked: true,
      type: 'item' as const,
      itemId: itemEntry.itemId,
      symbol: itemEntry.symbol,
    }
  }

  const pokemonEntry = result.entry as FishingPokemonEntry
  return {
    success: true,
    hooked: true,
    type: 'pokemon' as const,
    speciesId: pokemonEntry.speciesId,
    formId: pokemonEntry.formId,
    isShiny: result.isShiny,
    rarity: result.rarity,
    symbol: pokemonEntry.symbol,
  }
}

function getReactionDeadline(fishingState: FishingState): number | null {
  const entry = fishingState.hookedResult?.entry
  if (!entry) return null
  return fishingState.appearTime + entry.reactionTime
}

async function clearExpiredFishingCast(userId: string, fishingState: FishingState): Promise<boolean> {
  if (fishingState.phase === 'missed') {
    await redis.del(`fishing:${userId}`)
    return true
  }

  if (!['waiting', 'nibble'].includes(fishingState.phase)) return false

  const reactionDeadline = getReactionDeadline(fishingState)
  if (reactionDeadline !== null && Date.now() > reactionDeadline) {
    await redis.del(`fishing:${userId}`)
    return true
  }

  return false
}

function rollWeightedEntry<T extends { weight: number }>(entries: T[]): T {
  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0)
  let roll = Math.random() * totalWeight
  for (const entry of entries) {
    roll -= entry.weight
    if (roll <= 0) return entry
  }
  return entries[entries.length - 1]
}

function isDaytimeForFishingCategory(category: string): boolean {
  const { hour } = getTimeZoneClockTime(new Date(), getRegionTimeZone(category))
  return hour >= 6 && hour < 18
}

export async function castFishingLine(rodType: RodType) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'fishing-cast', 60, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many casts. Please wait a moment.' }
    }

    const actionLock = await acquireActionLock(
      getFishingActionLockKey(user.id),
      FISHING_ACTION_LOCK_TTL,
    )
    if (!actionLock.acquired) {
      return { success: false, error: 'Another fishing action is already being processed' }
    }

    try {
      const existingFishingState = (await redis.get(`fishing:${user.id}`)) as FishingState | null
      const clearedExpiredCast = existingFishingState
        ? await clearExpiredFishingCast(user.id, existingFishingState)
        : false
      if (
        existingFishingState &&
        !clearedExpiredCast &&
        ['waiting', 'nibble', 'hooked'].includes(existingFishingState.phase)
      ) {
        return { success: false, error: 'You already have an active cast' }
      }

      // Get research state to get encounter config
      const researchState = (await redis.get(`research:${user.id}`)) as ResearchState | null
      if (!researchState) {
        return { success: false, error: 'No active fishing session' }
      }

      const encounter = allGames.find((e) => e.id === researchState.encounterId) as
        | FishingGameConfig
        | undefined
      if (!encounter || encounter.gameType !== 'fishing') {
        return { success: false, error: 'Invalid fishing encounter' }
      }

      const payload = await getPayload({ config: configPromise })
      const inventory = await getUserInventoryMap(payload as any, user.id)
      const requiredRodItemId = getRodItemId(rodType)
      if ((inventory[requiredRodItemId] || 0) <= 0) {
        return { success: false, error: `You do not own ${requiredRodItemId}` }
      }

      const rodConfig = encounter.settings.rods[rodType]
      if (!rodConfig) {
        return { success: false, error: 'Invalid rod type' }
      }

      // Roll which pool (Pokemon vs items). Fishing uses a global 80/20 split.
      const poolRoll = Math.random() * (FISHING_POKEMON_CHANCE + FISHING_ITEM_CHANCE)
      let selectedEntry: FishingPokemonEntry | FishingItemEntry
      let resultType: 'pokemon' | 'item'

      if (poolRoll < FISHING_POKEMON_CHANCE) {
        // Pokemon pool - Apply time restrictions
        const isDay = isDaytimeForFishingCategory(encounter.category)

        // Filter entries valid for current time
        const validEntries = rodConfig.encounters.entries.filter((e) => {
          if (!e.time) return true
          if (e.time === 'day') return isDay
          if (e.time === 'night') return !isDay
          return true
        })

        // Fallback to all entries if no valid ones found (to prevent checking empty pool)
        const pool = validEntries.length > 0 ? validEntries : rodConfig.encounters.entries

        selectedEntry = applySecretFishingPokemonReplacement({
          rodType,
          entry: rollWeightedEntry(pool),
        })
        resultType = 'pokemon'
      } else {
        // Item pool. Local entries are reserved for quest/location-specific drops.
        const itemPool =
          rodConfig.items?.entries && rodConfig.items.entries.length > 0
            ? rodConfig.items.entries
            : globalFishingItemPools[rodType]
        selectedEntry = rollWeightedEntry(itemPool)
        resultType = 'item'
      }

      // Roll shiny for Pokemon
      let isShiny = false
      let rarity: PokemonRarityId = 'normal'
      if (resultType === 'pokemon') {
        const pokemonEntry = selectedEntry as FishingPokemonEntry
        const formId = pokemonEntry.formId || pokemonEntry.speciesId.toString()
        const speciesData = getPokemonForm(formId)
        const activeAbilityId = researchState.activeAbilityId
        const activeAbilitySourceFormId = researchState.activeAbilitySourceFormId
        const effectiveAbilityId = resolveStartAbilityId(activeAbilityId, formId)
        const effectiveAbility = effectiveAbilityId ? ABILITIES[effectiveAbilityId] : undefined
        const researcherLevel = getSkillLevel(user.skills, 'researching')
        const shinyChance = getShinyChance({
          sourceModifier: rodConfig.shinyChanceModifier || 1,
          researcherModifier: getResearcherShinyModifier(researcherLevel),
          abilityModifier: getAbilityShinyMultiplier({
            ability: effectiveAbility,
            formId,
            speciesId: pokemonEntry.speciesId,
            sourceFormId: activeAbilitySourceFormId,
            locationId: encounter.id,
            targetTypes: speciesData?.types,
            isNight: isNightHour(),
          }),
        })
        const pokedexMap = await getUserPokedexMap(payload as any, user.id)
        const researchLevel = pokedexMap[pokemonEntry.speciesId.toString()]?.[formId]?.researchLevel || 0

        isShiny = rollShiny(shinyChance, researchLevel >= 5 ? 2 : 1)
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
        rarity = resolvePokemonRarity({ rarity: pokemonEntry.rarity, shiny: isShiny })
        isShiny = rarity === 'shiny'
      }

      // Calculate appear time
      const appearDelay =
        selectedEntry.appearTime.min +
        Math.random() * (selectedEntry.appearTime.max - selectedEntry.appearTime.min)
      const now = Date.now()

      const fishingState: FishingState = {
        userId: user.id,
        encounterId: researchState.encounterId,
        selectedRod: rodType,
        castId: crypto.randomUUID(),
        castTime: now,
        appearTime: now + appearDelay,
        hookedResult: {
          type: resultType,
          entry: selectedEntry,
          isShiny,
          rarity,
        },
        phase: 'waiting',
        weather: researchState.weather,
      }

      await redis.set(`fishing:${user.id}`, fishingState, { ex: 120 }) // 2 min expiry

      // Refresh research session TTL to keep it alive while fishing
      await redis.expire(`research:${user.id}`, 900) // 15 min expiry for fishing sessions

      return {
        success: true,
        castTime: now,
        appearTime: fishingState.appearTime,
        reactionTime: selectedEntry.reactionTime,
        symbol: selectedEntry.symbol,
      }
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error casting fishing line:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function attemptHook() {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'fishing-hook', 120, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many hook attempts. Please wait a moment.' }
    }

    const actionLock = await acquireActionLock(
      getFishingActionLockKey(user.id),
      FISHING_ACTION_LOCK_TTL,
    )
    if (!actionLock.acquired) {
      return { success: false, error: 'Another fishing action is already being processed' }
    }

    try {
      const fishingState = (await redis.get(`fishing:${user.id}`)) as FishingState | null
      if (!fishingState?.hookedResult) {
        return { success: false, error: 'No active cast' }
      }

      const hookResultKey = `fishing:hook-result:${user.id}:${fishingState.castTime}`
      const cachedHookResult = await getIdempotentResult<any>(hookResultKey)
      if (cachedHookResult) {
        return cachedHookResult
      }

      if (fishingState.phase === 'hooked') {
        const hookedResponse = buildHookedResponse(fishingState)
        await setIdempotentResult(hookResultKey, hookedResponse, 120)
        return hookedResponse
      }

      if (!['waiting', 'nibble'].includes(fishingState.phase)) {
        return { success: false, error: 'No active cast' }
      }

      const now = Date.now()
      const entry = fishingState.hookedResult.entry
      const reactionDeadline = fishingState.appearTime + entry.reactionTime

      // Check if symbol has appeared yet
      if (now < fishingState.appearTime) {
        // Pressed too early
        fishingState.phase = 'missed'
        await redis.set(`fishing:${user.id}`, fishingState, { ex: 60 })
        const response = {
          success: true,
          hooked: false,
          message: 'Too early! The fish got away.',
        }
        await setIdempotentResult(hookResultKey, response, 120)
        return response
      }

      // Check if within reaction window
      if (now > reactionDeadline) {
        // Too late
        fishingState.phase = 'missed'
        await redis.set(`fishing:${user.id}`, fishingState, { ex: 60 })
        const response = {
          success: true,
          hooked: false,
          message: 'Too slow! The fish escaped.',
        }
        await setIdempotentResult(hookResultKey, response, 120)
        return response
      }

      // Success! Update state
      fishingState.phase = 'hooked'
      fishingState.reactionDeadline = reactionDeadline
      await redis.set(`fishing:${user.id}`, fishingState, { ex: 300 }) // 5 min to decide

      const response = buildHookedResponse(fishingState)
      await setIdempotentResult(hookResultKey, response, 120)

      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error attempting hook:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function claimFishingItem() {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'fishing-claim-item', 30, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many item claims. Please wait a moment.' }
    }

    const actionLock = await acquireActionLock(
      getFishingActionLockKey(user.id),
      FISHING_ACTION_LOCK_TTL,
    )
    if (!actionLock.acquired) {
      return { success: false, error: 'Another fishing action is already being processed' }
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const fishingState = (await redis.get(`fishing:${user.id}`)) as FishingState | null
      if (!fishingState || fishingState.phase !== 'hooked') {
        const recentClaim = await getIdempotentResult<any>(`fishing:item-claim:last:${user.id}`)
        if (recentClaim) {
          return recentClaim
        }
        return { success: false, error: 'No hooked item' }
      }

      const claimResultKey = `fishing:item-claim:${user.id}:${fishingState.castTime}`
      const cachedClaimResult = await getIdempotentResult<any>(claimResultKey)
      if (cachedClaimResult) {
        return cachedClaimResult
      }

      const result = fishingState.hookedResult
      if (!result || result.type !== 'item') {
        return { success: false, error: 'Not an item' }
      }

      const itemEntry = result.entry as FishingItemEntry

      // Grant the item
      const { summary } = await grantRewards(user.id, [
        { type: 'item', targetId: itemEntry.itemId, quantity: 1 },
      ])

      // Update stats in Redis (legacy/backup)
      const researchState = (await redis.get(`research:${user.id}`)) as ResearchState | null
      if (researchState) {
        researchState.wins += 1
        await redis.set(`research:${user.id}`, researchState, { ex: 900 })

        const encounterId = researchState.encounterId
        if (encounterId) {
          await incrementUserActivityResult(
            payload as any,
            user.id,
            'researchEncounterResults',
            encounterId,
            { wins: 1 },
          )
        }
      }

      const response = {
        success: true,
        claimed: true,
        itemId: itemEntry.itemId,
        summary,
      }

      await setIdempotentResult(claimResultKey, response, 300)
      await setIdempotentResult(`fishing:item-claim:last:${user.id}`, response, 300)

      // Clear fishing state
      await redis.del(`fishing:${user.id}`)

      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error claiming fishing item:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function releaseFish() {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'fishing-release', 40, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many release actions. Please wait a moment.' }
    }

    const actionLock = await acquireActionLock(
      getFishingActionLockKey(user.id),
      FISHING_ACTION_LOCK_TTL,
    )
    if (!actionLock.acquired) {
      return { success: false, error: 'Another fishing action is already being processed' }
    }

    try {
      // Clear fishing state, keep research session for continued fishing
      await redis.del(`fishing:${user.id}`)

      // Refresh research session TTL to keep it alive
      await redis.expire(`research:${user.id}`, 900) // 15 min expiry

      return { success: true, message: 'Released back into the water.' }
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error releasing fish:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function startFishingCatch() {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(user.id, 'fishing-start-catch', 30, 60)
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many catch attempts. Please wait a moment.' }
    }

    const actionLock = await acquireActionLock(
      getFishingActionLockKey(user.id),
      FISHING_ACTION_LOCK_TTL,
    )
    if (!actionLock.acquired) {
      return { success: false, error: 'Another fishing action is already being processed' }
    }

    try {
      const fishingState = (await redis.get(`fishing:${user.id}`)) as FishingState | null
      if (!fishingState || fishingState.phase !== 'hooked') {
        const recentCatchStart = await getIdempotentResult<any>(
          `fishing:catch-start:last:${user.id}`,
        )
        if (recentCatchStart) {
          return recentCatchStart
        }
        return { success: false, error: 'No hooked Pokemon' }
      }

      const catchStartResultKey = `fishing:catch-start:${user.id}:${fishingState.castTime}`
      const cachedCatchStart = await getIdempotentResult<any>(catchStartResultKey)
      if (cachedCatchStart) {
        return cachedCatchStart
      }

      const result = fishingState.hookedResult
      if (!result || result.type !== 'pokemon') {
        return { success: false, error: 'Not a Pokemon' }
      }

      const pokemonEntry = result.entry as FishingPokemonEntry
      const encounter = allGames.find((e) => e.id === fishingState.encounterId) as
        | FishingGameConfig
        | undefined

      if (!encounter) {
        return { success: false, error: 'Encounter not found' }
      }

      // Get rod config for per-rod settings
      const selectedRod = fishingState.selectedRod
      const rodConfig = encounter.settings.rods[selectedRod]

      // Create location-style encounter state in Redis
      // This allows reusing the existing catch UI and attemptCapture logic
      const { getPokemonSpecies, getPokemonForm } = await import('@/utilities/pokemon/pokedex')

      const speciesId = pokemonEntry.speciesId
      const formId = pokemonEntry.formId || speciesId.toString()
      const speciesData = getPokemonForm(formId) || getPokemonSpecies(speciesId)
      const baseRate = speciesData?.capture_rate || 100
      const catchRateMod = rodConfig?.catchRateModifier || 0
      const initialCatchRate = Math.floor(baseRate / 2)
      const modifiedBaseRate = Math.min(255, initialCatchRate + catchRateMod)

      const duration = rodConfig?.timer || 30
      const startTime = Date.now()
      const expiry = startTime + duration * 1000

      // Level calculation
      const levelRange = rodConfig?.levelRange || { min: 5, max: 25 }
      const level = Math.floor(
        Math.random() * (levelRange.max - levelRange.min + 1) + levelRange.min,
      )

      const encounterState = {
        userId: user.id,
        locationId: `fishing:${fishingState.encounterId}`, // Prefix to identify as fishing
        background: encounter.background,
        pokemonId: speciesId,
        formId,
        isShiny: result.isShiny || false,
        rarity: result.rarity,
        startTime,
        expiry,
        baseCatchRate: modifiedBaseRate,
        currentCatchRate: modifiedBaseRate,
        questionsAnswered: [],
        itemsUsed: [],
        level,
        levelRange,
        catchRateModifier: catchRateMod,
        encounterPool: (rodConfig?.encounters.entries || []).map((entry) => ({
          speciesId: entry.speciesId,
          formId: entry.formId,
          chance: entry.weight,
        })),
        weather: fishingState.weather,
      }

      // Store as location encounter for attemptCapture compatibility
      await redis.set(`encounter:${user.id}`, encounterState, { ex: duration + 60 })

      const response = {
        success: true,
        pokemonId: speciesId,
        formId,
        isShiny: result.isShiny || false,
        rarity: result.rarity,
        startTime,
        expiry,
        duration,
        level,
      }

      await setIdempotentResult(catchStartResultKey, response, 300)
      await setIdempotentResult(`fishing:catch-start:last:${user.id}`, response, 300)

      // Clear fishing state
      await redis.del(`fishing:${user.id}`)

      return response
    } finally {
      await releaseActionLock(actionLock)
    }
  } catch (error) {
    console.error('Error starting fishing catch:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function getFishingState() {
  try {
    const user = await getUser()

    if (!user) return null

    const fishingState = (await redis.get(`fishing:${user.id}`)) as FishingState | null
    return fishingState
  } catch (error) {
    console.error('Error getting fishing state:', error)
    return null
  }
}
