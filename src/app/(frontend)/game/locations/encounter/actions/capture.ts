'use server'

import { redis } from '@/utilities/redis'
import { locations, type LocationReward } from '@/data/locations'
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
  getCaptureAbilityRewards,
  getStoredEncounterAbility,
  isNightHour,
} from '@/utilities/pokemon/encounter-ability-runtime'
import {
  applyCatchAbilityModifier,
  applyQuestionBonusToCatchRate,
  getThrowQuality,
  getThrowStageBonus,
  getBallQuestionBonus,
  getHardBallCatchRate,
  getSecondChanceRate,
  type CaptureThrowInput,
} from '@/utilities/pokemon/catch-balance'
import {
  checkRequirement,
  type RequirementData,
} from '@/utilities/requirements'
import type { User } from '@/payload-types'
import { getGameUserData } from '@/utilities/game-data'
import { rollPokemonGender } from '@/utilities/pokemon/gender'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import type { EncounterState } from './types'
import { rollAbility, getUser } from './utils'
import { refreshEncounterShield } from './shield'
import {
  getItemSkillLockReason,
  getResearcherAbilityRolls,
  getResearcherHiddenAbilitiesUnlocked,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import { getActiveEggCount } from '@/utilities/day-care/eggs'
import {
  buildCaptureEscapeRopeReward,
  buildCaptureHealingBerryRewards,
  buildCaptureCrystalReward,
  buildCaptureRepelRewards,
  buildCaptureResearchXpRewards,
} from '@/utilities/research/capture-research-rewards'
import { buildArtisanMaterialRewards } from '@/utilities/artisan/material-drops'
import { registerAbilityDexEntry } from '@/utilities/pokemon/abilitydex'
import {
  calculatePokemonContentSkillXp,
  resolveSkillXpConfig,
} from '@/data/skills/xp'
import {
  resolveEncounterBackground,
  resolveEncounterOrigin,
} from '@/utilities/pokemon/origin'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  incrementUserActivityResult,
  setUserInventoryMap,
  setUserPokedexMap,
} from '@/utilities/user-state'

export async function attemptCapture(
  ballItemId: string,
  throwInput?: CaptureThrowInput,
) {
  const user = await getUser()
  if (!user) throw new Error('Unauthorized')

  const rateLimit = await checkActionRateLimit(
    user.id,
    'encounter-capture',
    60,
    60,
  )
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: 'Too many capture attempts. Please wait a moment.',
    }
  }

  const captureLock = await acquireActionLock(
    `lock:encounter:capture:${user.id}`,
    15,
  )
  if (!captureLock.acquired) {
    return {
      success: false,
      message: 'Another capture attempt is being processed',
    }
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const encounterId = `encounter:${user.id}`
    const state = (await redis.get(encounterId)) as EncounterState | null

    if (!state) {
      const recentCapture = await getIdempotentResult<any>(
        `encounter:capture:last:${user.id}`,
      )
      if (recentCapture) {
        return recentCapture
      }
      return { success: false, message: 'Encounter expired or invalid' }
    }

    const captureAttempt = state.captureAttempts || 0
    const captureResultKey = `encounter:capture:result:${user.id}:${state.locationId}:${state.startTime}:${captureAttempt}:${ballItemId}`
    const cachedCaptureResult = await getIdempotentResult<any>(captureResultKey)
    if (cachedCaptureResult) {
      return cachedCaptureResult
    }
    refreshEncounterShield(state)

    // Data Prefetch
    const isChronicle = !!state.chronicle
    const inventory = isChronicle
      ? { ...(state.chronicle?.balls || {}) }
      : await getUserInventoryMap(payload as any, user.id)
    const pokemon = isChronicle
      ? 0
      : await payload
          .find({
            collection: 'pokemon',
            where: { user: { equals: user.id } },
            limit: 0,
          })
          .then((res) => res.totalDocs)
    const eggCount = isChronicle ? 0 : await getActiveEggCount(payload as any, user.id)
    // We needed count of pokemon.
    const pokedex = isChronicle
      ? ({} as Record<string, any>)
      : ((await getUserPokedexMap(payload as any, user.id)) as Record<
          string,
          any
        >)

    // Validate ball
    const ball = items.find((i) => i.id === ballItemId && i.category === 'ball')
    if (!ball) return { success: false, message: 'Invalid ball' }
    const ballLockReason = getItemSkillLockReason(ball, user.skills)
    if (ballLockReason) return { success: false, message: ballLockReason }

    // Check inventory
    const qty = inventory[ballItemId] || 0
    if (qty < 1) {
      return { success: false, message: `You don't have any ${ball.name}s!` }
    }

    // Check Max Pokemon
    const maxPokemon = user.maxPokemon || 50
    if (!isChronicle && pokemon + eggCount >= maxPokemon) {
      // Clear Redis
      await redis.del(encounterId)

      // Update Location Stats (Loss)
      await incrementUserActivityResult(
        payload as any,
        user.id,
        'locationEncounterResults',
        state.locationId,
        { losses: 1 },
      )

      // Update Research Stats (Fishing Loss - Storage Full)
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

      const response = {
        success: true,
        caught: false,
        failMessage: 'Pokemon Storage Full!',
        formId: state.formId,
        pokemonId: state.pokemonId,
        expeditionProgress: undefined as any,
      }

      const expeditionResult = await recordExpeditionActivityResult(
        user.id,
        'location',
        state.locationId,
        false,
      )
      response.expeditionProgress = expeditionResult.expedition

      await setIdempotentResult(captureResultKey, response, 300)
      await setIdempotentResult(
        `encounter:capture:last:${user.id}`,
        response,
        300,
      )

      return response
    }

    // Decrement Ball & Update User
    inventory[ballItemId] = qty - 1
    if (!isChronicle) {
      await setUserInventoryMap(payload as any, user.id, inventory)
    }

    // Calculate Capture
    const species =
      getPokemonForm(state.formId) || getPokemonSpecies(state.pokemonId)

    // Ability Catch Modifier
    const activePoke = isChronicle
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
    const activeAbility =
      getStoredEncounterAbility(state) ||
      (activeAbilityId ? ABILITIES[activeAbilityId] : undefined)

    const location = locations.find((l) => l.id === state.locationId)
    const rewardRequirementContext = {
      category: location?.category,
      subCategory: location?.subCategory,
      weather: state.weather?.weather,
    }
    const turnCount = state.questionsAnswered
      ? state.questionsAnswered.length
      : 0
    const repelUsed = (state.itemsUsed || []).includes('repel')
    const superRepelUsed = (state.itemsUsed || []).includes('super-repel')
    const repelLevelRange = repelUsed ? state.levelRange : undefined
    const superRepelLevelRange = superRepelUsed ? state.levelRange : undefined

    const hour = new Date().getHours()
    const isNight = hour >= 18 || hour < 6
    const encounterLevel =
      typeof state.level === 'number' ? state.level : undefined
    const targetMinLevel =
      superRepelLevelRange?.min ??
      repelLevelRange?.min ??
      location?.levelRange?.min ??
      encounterLevel ??
      1
    const targetMaxLevel =
      superRepelLevelRange?.max ??
      repelLevelRange?.max ??
      location?.levelRange?.max ??
      encounterLevel ??
      5
    const userActiveLevel = (activePoke.docs[0] as any)?.level
    const speciesPokedex = (pokedex[state.pokemonId.toString()] ||
      {}) as Record<string, any>
    const isCaughtBefore = Object.values(speciesPokedex).some(
      (entry: any) => !!entry?.caught,
    )

    const isUltraBeast = ULTRA_BEASTS.includes(state.pokemonId)
    const throwQuality = getThrowQuality(throwInput)
    const throwStageBonus = getThrowStageBonus(throwQuality)
    const questionBonus = getBallQuestionBonus({
      ballId: ballItemId,
      species,
      turnCount,
      targetLevel:
        ballItemId === 'level-ball' ? targetMaxLevel : targetMinLevel,
      userActiveLevel,
      isCaughtBefore,
      isNight,
      isUltraBeast,
      isMoonStoneEvolver: MOON_STONE_EVOLVERS.includes(state.pokemonId),
    })

    const baseCaptureRate = species?.capture_rate || 100
    const hardCatchRate = getHardBallCatchRate({
      ballId: ballItemId,
      isUltraBeast,
    })
    let finalRate =
      hardCatchRate ??
      applyQuestionBonusToCatchRate(
        state.currentCatchRate,
        baseCaptureRate,
        questionBonus + throwStageBonus,
      )

    if (hardCatchRate === undefined) {
      finalRate = applyCatchAbilityModifier(finalRate, {
        activeAbility,
        formId: state.formId,
        speciesId: state.pokemonId,
        sourceFormId:
          state.activeAbilitySourceFormId ||
          (activePoke.docs[0] as any)?.formId,
        locationId: state.locationId,
        types: species?.types,
        isNight: isNightHour(),
      })
    }

    let level =
      superRepelUsed || (repelUsed && Math.random() < 0.8)
        ? targetMaxLevel
        : Math.floor(Math.random() * (targetMaxLevel - targetMinLevel + 1)) +
          targetMinLevel

    if (state.levelModifier) {
      level += state.levelModifier
      level = Math.max(targetMinLevel, Math.min(targetMaxLevel, level))
    }

    // Check Catch
    let caught = false
    if (state.shield?.active) {
      caught = false
    } else if (ballItemId === 'master-ball') {
      caught = true
    } else {
      const roll = Math.random() * 255
      caught = roll < finalRate
    }

    const explorerLevel = getSkillLevel(user.skills, 'catching')
    const secondChanceRate = getSecondChanceRate(
      explorerLevel,
      state.secondChanceModifier || 0,
    )
    const secondChanceTriggered =
      !caught &&
      !state.secondChanceUsed &&
      Math.random() * 100 < secondChanceRate

    if (isChronicle) {
      if (secondChanceTriggered) {
        state.secondChanceUsed = true
        state.captureAttempts = captureAttempt + 1
        await redis.set(encounterId, state, {
          ex: Math.floor((state.expiry - Date.now()) / 1000) + 60,
        })

        const response = {
          success: true,
          caught: false,
          secondChance: true,
          message: 'The Pokemon broke free, but it stayed nearby!',
          formId: state.formId,
          pokemonId: state.pokemonId,
          throwQuality,
          throwStageBonus,
          expeditionProgress: undefined as any,
        }
        await setIdempotentResult(captureResultKey, response, 300)
        return response
      }

      await redis.del(encounterId)

      const response = caught
        ? {
            success: true,
            caught: true,
            pokemonName: species?.name,
            rewards: undefined as any,
            messages: [] as string[],
            formId: state.formId,
            pokemonId: state.pokemonId,
            throwQuality,
            throwStageBonus,
            expeditionProgress: undefined as any,
          }
        : {
            success: true,
            caught: false,
            message: 'The Pokemon broke free!',
            formId: state.formId,
            pokemonId: state.pokemonId,
            throwQuality,
            throwStageBonus,
            expeditionProgress: undefined as any,
          }

      const expeditionResult = await recordExpeditionActivityResult(
        user.id,
        'location',
        state.locationId,
        caught,
      )
      response.expeditionProgress = expeditionResult.expedition

      await setIdempotentResult(captureResultKey, response, 300)
      await setIdempotentResult(
        `encounter:capture:last:${user.id}`,
        response,
        300,
      )
      return response
    }

    if (secondChanceTriggered) {
      state.secondChanceUsed = true
      state.captureAttempts = captureAttempt + 1
      await redis.set(encounterId, state, {
        ex: Math.floor((state.expiry - Date.now()) / 1000) + 60,
      })

      const response = {
        success: true,
        caught: false,
        secondChance: true,
        message: 'The Pokemon broke free, but it stayed nearby!',
        formId: state.formId,
        pokemonId: state.pokemonId,
        throwQuality,
        throwStageBonus,
        expeditionProgress: undefined as any,
      }
      await setIdempotentResult(captureResultKey, response, 300)
      return response
    }

    // Update Companion Friendship
    if (activePoke.docs.length > 0) {
      const companionDoc = activePoke.docs[0] as any
      const currentFriendship =
        typeof companionDoc.friendship === 'number'
          ? companionDoc.friendship
          : 70
      const change = caught ? 5 : -2
      const newFriendship = Math.max(
        0,
        Math.min(255, currentFriendship + change),
      )

      await payload.update({
        collection: 'pokemon',
        id: companionDoc.id,
        data: { friendship: newFriendship },
      })
    }

    // Clear Redis
    await redis.del(encounterId)

    // Update Location Stats (Wins/Losses)
    await incrementUserActivityResult(
      payload as any,
      user.id,
      'locationEncounterResults',
      state.locationId,
      caught ? { wins: 1 } : { losses: 1 },
    )

    // Update Research Stats (Fishing Win/Loss logic handled here? No, Loss is only final)
    // Wait, if caught=true -> Win. If caught=false -> Not final loss unless we want to track throws.
    // User said: "win if it's succesfully caught... loss if it fails to catch" (final?)
    // Win is clear.
    if (caught && state.locationId.startsWith('fishing:')) {
      const researchId = state.locationId.replace('fishing:', '')
      await incrementUserActivityResult(
        payload as any,
        user.id,
        'researchEncounterResults',
        researchId,
        { wins: 1 },
      )
    }
    // Update Research Stats (Fishing Loss if failed catch - single attempt)
    if (!caught && state.locationId.startsWith('fishing:')) {
      const researchId = state.locationId.replace('fishing:', '')
      await incrementUserActivityResult(
        payload as any,
        user.id,
        'researchEncounterResults',
        researchId,
        { losses: 1 },
      )
    }

    const formData =
      getPokemonForm(state.formId) || getPokemonSpecies(state.pokemonId)

    // If NOT caught, return failure
    if (!caught) {
      const rewardsToGrant: LocationReward[] = []
      const xpConfig = resolveSkillXpConfig(
        'catching',
        level,
        location?.skillXp,
      )
      const failureResearcherLevel = getSkillLevel(user.skills, 'researching')
      rewardsToGrant.push({
        type: 'xp',
        quantity: calculatePokemonContentSkillXp(
          xpConfig.skill,
          xpConfig.level,
          formData?.base_experience,
          0.5,
        ),
        dropChance: 100,
        skill: xpConfig.skill,
      })
      const abilityRewards = getCaptureAbilityRewards({
        state,
        ability: activeAbility,
        sourceFormId:
          state.activeAbilitySourceFormId ||
          (activePoke.docs[0] as any)?.formId,
        level,
        targetTypes: formData?.types || [],
        researchingLevel: failureResearcherLevel,
        caught: false,
      })
      rewardsToGrant.push(...abilityRewards.rewards)
      const { summary } = await grantRewards(user.id, rewardsToGrant, {
        requirementContext: rewardRequirementContext,
      })

      const response = {
        success: true,
        caught: false,
        message: 'The Pokemon broke free!',
        rewards: summary,
        formId: state.formId,
        pokemonId: state.pokemonId,
        throwQuality,
        throwStageBonus,
        expeditionProgress: undefined as any,
      }

      const expeditionResult = await recordExpeditionActivityResult(
        user.id,
        'location',
        state.locationId,
        false,
      )
      response.expeditionProgress = expeditionResult.expedition

      await setIdempotentResult(captureResultKey, response, 300)
      await setIdempotentResult(
        `encounter:capture:last:${user.id}`,
        response,
        300,
      )
      return response
    }

    // If CAUGHT:
    // Create Pokemon
    const {
      ivs: baseIvs,
      evs,
      nature,
      height,
      weight,
      size,
      messages: statMessages,
    } = generatePokemonStats(formData?.height || 0, formData?.weight || 0)

    // Research Level 4+: Improved IVs (double-roll, take best of each)
    const captureResearchLevel = getPokemonResearchLevel(
      pokedex,
      state.pokemonId,
      state.formId,
    )
    let ivs = baseIvs
    if (captureResearchLevel >= 4) {
      const secondRoll = {
        hp: Math.floor(Math.random() * 32),
        attack: Math.floor(Math.random() * 32),
        defense: Math.floor(Math.random() * 32),
        specialAttack: Math.floor(Math.random() * 32),
        specialDefense: Math.floor(Math.random() * 32),
        speed: Math.floor(Math.random() * 32),
      }
      ivs = {
        hp: Math.max(baseIvs.hp, secondRoll.hp),
        attack: Math.max(baseIvs.attack, secondRoll.attack),
        defense: Math.max(baseIvs.defense, secondRoll.defense),
        specialAttack: Math.max(
          baseIvs.specialAttack,
          secondRoll.specialAttack,
        ),
        specialDefense: Math.max(
          baseIvs.specialDefense,
          secondRoll.specialDefense,
        ),
        speed: Math.max(baseIvs.speed, secondRoll.speed),
      }
    }

    // Calculate Stats
    const pokemonStats = computeStats(
      formData?.stats || {
        hp: 0,
        attack: 0,
        defense: 0,
        'special-attack': 0,
        'special-defense': 0,
        speed: 0,
      },
      ivs,
      evs,
      level,
      nature,
    )

    let initialFriendship = 70
    if (ballItemId === 'luxury-ball') initialFriendship = 140
    if (ballItemId === 'friend-ball') initialFriendship = 200

    const catchResearchLvl = getPokemonResearchLevel(
      pokedex,
      state.pokemonId,
      state.formId,
    )
    const researcherLevel = getSkillLevel(user.skills, 'researching')
    const abilityId = rollAbility(
      state.formId,
      formData?.types || [],
      catchResearchLvl,
      getResearcherAbilityRolls(researcherLevel),
      getResearcherHiddenAbilitiesUnlocked(researcherLevel),
    )

    await payload.create({
      collection: 'pokemon',
      data: {
        user: user.id,
        speciesId: state.pokemonId,
        formId: state.formId,
        name: formData?.name || 'Unknown',
        level: level,
        shiny: state.isShiny,
        gender: state.gender || rollPokemonGender(state.pokemonId),
        identified: true,
        originalTrainer: user.id,
        ballType: ballItemId,
        friendship: initialFriendship,
        ivs,
        evs,
        nature,
        height,
        weight,
        size,
        background: resolveEncounterBackground(
          state.locationId,
          (state as any).background,
        ),
        stats: {
          hp: pokemonStats.hp,
          attack: pokemonStats.attack,
          defense: pokemonStats.defense,
          specialAttack: pokemonStats.specialAttack,
          specialDefense: pokemonStats.specialDefense,
          speed: pokemonStats.speed,
        },
        ability: abilityId,
        isShadow: ballItemId === 'rocket-ball',
        ...resolveEncounterOrigin(state.locationId),
      },
    })
    const abilityRegistration = await registerAbilityDexEntry(
      payload as any,
      user.id,
      abilityId,
      'catch',
    )

    // Update Pokedex (Caught)
    // Update Pokedex (Caught)
    const speciesKey = state.pokemonId.toString()
    const formKey = state.formId.toString()

    const speciesData = pokedex[speciesKey] || {}
    const dexEntry = speciesData[formKey] || {
      seen: true,
      totalSeen: 0,
      caught: false,
      totalCaught: 0,
    }
    const newPokedex = {
      ...pokedex,
      [speciesKey]: {
        ...speciesData,
        [formKey]: {
          ...dexEntry,
          seen: true,
          caught: true,
          totalSeen: Math.max(dexEntry.totalSeen || 0, 1),
          totalCaught: (dexEntry.totalCaught || 0) + 1,
          shinySeen: state.isShiny ? true : dexEntry.shinySeen,
          shinyCaught: state.isShiny ? true : dexEntry.shinyCaught,
        },
      },
    }

    await setUserPokedexMap(payload as any, user.id, newPokedex)

    // Grant Rewards (XP, Drops)
    const rewardsToGrant: LocationReward[] = []

    const formResearchLevel = getPokemonResearchLevel(
      newPokedex,
      speciesKey,
      formKey,
    )
    rewardsToGrant.push(buildCaptureCrystalReward(level, formResearchLevel))

    const companionFormId = (activePoke.docs[0] as any)?.formId
    rewardsToGrant.push(
      ...buildCaptureResearchXpRewards(state.formId, companionFormId),
    )

    const xpConfig = resolveSkillXpConfig('catching', level, location?.skillXp)

    rewardsToGrant.push({
      type: 'xp',
      quantity: calculatePokemonContentSkillXp(
        xpConfig.skill,
        xpConfig.level,
        formData?.base_experience,
      ),
      dropChance: 100,
      skill: xpConfig.skill,
    })

    if (location?.rewards) rewardsToGrant.push(...location.rewards)
    rewardsToGrant.push(buildCaptureEscapeRopeReward())
    rewardsToGrant.push(...buildCaptureRepelRewards(explorerLevel))
    rewardsToGrant.push(...buildCaptureHealingBerryRewards(researcherLevel))
    rewardsToGrant.push(
      ...buildArtisanMaterialRewards(
        {
          speciesId: state.pokemonId,
          formId: state.formId,
          level,
          types: formData?.types || [],
          researchingLevel: researcherLevel,
        },
        'capture',
      ),
    )

    const abilityRewards = getCaptureAbilityRewards({
      state,
      ability: activeAbility,
      sourceFormId: state.activeAbilitySourceFormId || companionFormId,
      level,
      targetTypes: formData?.types || [],
      researchingLevel: researcherLevel,
      caught: true,
    })
    rewardsToGrant.push(...abilityRewards.rewards)
    if (abilityRewards.abilityLost && activePoke.docs[0]) {
      await payload.update({
        collection: 'pokemon',
        id: (activePoke.docs[0] as any).id,
        data: { ability: '' },
      })
    }

    const { summary } = await grantRewards(user.id, rewardsToGrant, {
      requirementContext: rewardRequirementContext,
    })

    // Consolidate messages
    const messages = [...statMessages]

    if (abilityId) {
      if (abilityRegistration.isNew) {
        messages.push(
          `${ABILITIES[abilityId]?.name || 'Ability'} was registered in your AbilityDex!`,
        )
      }
    }

    // Handle Location Item Use On Catch
    if (location?.requiredItem?.useOnCatch) {
      const item = inventory[location.requiredItem!.id] || 0
      if (item > 0) {
        inventory[location.requiredItem!.id] = item - 1
        await setUserInventoryMap(payload as any, user.id, inventory)
        const itemDef = items.find((i) => i.id === location.requiredItem!.id)
        const itemName = itemDef?.name || location.requiredItem!.id
        messages.push(`Your ${itemName} disappears!`)
      }
    }

    // Daily Tasks Explicit Progress Tracking
    await incrementDailyTaskProgress(user.id, 'daily_catch', 1, {
      speciesId: state.pokemonId,
      types: formData?.types || [],
    })

    const response = {
      success: true,
      caught: true,
      pokemonName: formData?.name,
      rewards: summary,
      messages,
      levelUp: summary.levelUp,
      formId: state.formId,
      pokemonId: state.pokemonId,
      throwQuality,
      throwStageBonus,
      expeditionProgress: undefined as any,
    }

    const expeditionResult = await recordExpeditionActivityResult(
      user.id,
      'location',
      state.locationId,
      true,
    )
    response.expeditionProgress = expeditionResult.expedition

    await setIdempotentResult(captureResultKey, response, 300)
    await setIdempotentResult(
      `encounter:capture:last:${user.id}`,
      response,
      300,
    )

    return response
  } finally {
    await releaseActionLock(captureLock)
  }
}
