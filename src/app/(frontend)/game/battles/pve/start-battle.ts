import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redis } from '@/utilities/redis'
import { revalidatePath } from 'next/cache'
import { battles } from '@/data/battles'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  initializeBattlePokemon,
  applyStatus,
} from '@/utilities/battle/battle-logic'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import { getGameUserData } from '@/utilities/game-data'
import { checkRequirement, isPokemonEligible } from '@/utilities/requirements'
import type { BattleState } from '@/utilities/battle/types'
import type { User, Pokemon } from '@/payload-types'
import { getUser } from '../helpers/user'
import { createInitialPowersState } from '@/data/powers'
import { BATTLE_TTL } from '../helpers/state-management'
import type { BattleConfig } from '@/data/types'
import type { BattleEnemy } from '@/data/types'
import { normalizeTrainerBattleItems } from '@/utilities/battle/trainer-items'
import {
  initializeEnemyAiMoveLoadouts,
  resolveBattleAiProfile,
} from '@/utilities/battle/enemy-ai'
import {
  resolveEnemyBattleEvs,
  resolveEnemyBattleIvs,
} from '@/utilities/battle/enemy-stat-rolls'
import { getObservedPreferredStance } from '@/utilities/battle/pokedex-observation'
import { rollPokemonGender } from '@/utilities/pokemon/gender'
import { getActiveChronicleContext } from '@/utilities/chronicles'
import type { ExpeditionChroniclePokemonConfig } from '@/data/expeditions'
import {
  getSkillLevel,
  resolveEnemyBattleMoveUseLimit,
  resolveTrainerBattleItemUseLimit,
  resolveTrainerBattleMoveUseLimit,
} from '@/utilities/skills/unlocks'
import {
  getChronicleBattleItemUseLimit,
  getChronicleMoveUseLimit,
  normalizeChronicleBattleBudgets,
} from '@/utilities/battle/chronicle-budgets'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import {
  getPokemonRarityLegacyFields,
  resolvePokemonRarity,
} from '@/utilities/pokemon/rarity-effects'
import { initializeTeamMoveUses } from '@/utilities/battle/move-uses'
import {
  buildRivalBattleRewards,
  getFirstRivalBattleTeam,
  getRivalTrainerId,
  isRivalBattleConfig,
  scaleRivalPokemonForBattle,
} from '@/utilities/rivals'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  setUserInventoryMap,
  setUserPokedexMap,
} from '@/utilities/user-state'
import { getActiveExpeditionForUser } from '@/utilities/expeditions/actions'
import {
  ensureUserWeatherSlot,
  resolveSubRegionWeather,
} from '@/utilities/weather'
import {
  processBattleAbilitySuppressionForState,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
} from '@/utilities/battle/abilities'
import { applyBattleRarityEntryEffects } from '@/utilities/battle/rarity-effects'

export async function startBattle(
  battleId: string,
  consumedPokemonIds?: string[],
): Promise<{ success: boolean; error?: string; state?: BattleState }> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const battleConfig = battles.find((b) => b.id === battleId)
  if (!battleConfig) return { success: false, error: 'Battle not found' }

  // PVP Handling
  if (battleConfig.pvp) {
    if (battleConfig.pvp_type === 'ranked')
      return { success: false, error: 'PVP_RANKED' }
    return { success: false, error: 'PVP_FRIENDLY' }
  }

  // Check requirements
  if (battleConfig.requirements && battleConfig.requirements.length > 0) {
    const requiredKeys = analyzeRequirements(battleConfig.requirements)
    const userData = await getGameUserData(user as User, requiredKeys)
    const meetsRequirements = battleConfig.requirements.every((req) =>
      checkRequirement(userData, req, {
        category: battleConfig.category,
        subCategory: battleConfig.subCategory,
      }),
    )
    if (!meetsRequirements)
      return { success: false, error: 'Requirements not met' }
  }

  // Check criteria - these can also be consumed!
  if (battleConfig.criteria && battleConfig.criteria.length > 0) {
    const requiredKeys = analyzeRequirements(battleConfig.criteria)
    const userData = await getGameUserData(user as User, requiredKeys)
    const criteriaMet = battleConfig.criteria.every((req) =>
      checkRequirement(userData, req, {
        category: battleConfig.category,
        subCategory: battleConfig.subCategory,
      }),
    )
    if (!criteriaMet) return { success: false, error: 'Entry criteria not met' }
  }

  const allReqsAndCriteria = [
    ...(battleConfig.requirements || []),
    ...(battleConfig.criteria || []),
  ]

  const payload = await getPayload({ config: configPromise })

  // Handle Pokemon Consumption
  const pokemonCriteria = allReqsAndCriteria.filter(
    (req) => req.type === 'pokemon_owned' && req.consume,
  )

  if (pokemonCriteria.length > 0) {
    if (!consumedPokemonIds || consumedPokemonIds.length === 0) {
      return { success: false, error: 'No Pokemon selected for consumption' }
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
      return { success: false, error: 'Invalid Pokemon selection' }
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
        return {
          success: false,
          error: `Not enough Pokemon selected for ${targetId} (Need ${requiredCount})`,
        }
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

  if (hasConsumption) {
    const currentInventory = await getUserInventoryMap(payload as any, user.id)
    const newInventory = { ...currentInventory }

    for (const [itemId, count] of Object.entries(itemsToConsume)) {
      const current = newInventory[itemId] || 0
      if (current < count) {
        return { success: false, error: `Not enough items: ${itemId}` }
      }
      newInventory[itemId] = current - count
    }

    await setUserInventoryMap(payload as any, user.id, newInventory)
  }

  // Handle Currency Consumption
  const currenciesToConsume: Record<string, number> = {}
  let hasCurrencyConsumption = false

  for (const req of allReqsAndCriteria) {
    if (req.consume && req.type === 'currency_owned') {
      const currencyId = (req.targetId as string) || 'crystals'
      currenciesToConsume[currencyId] =
        (currenciesToConsume[currencyId] || 0) + (req.count || 1)
      hasCurrencyConsumption = true
    }
  }

  if (hasCurrencyConsumption) {
    const userRefetched = await payload.findByID({
      collection: 'users',
      id: user.id,
    })
    const currentCurrency = {
      ...((userRefetched.currency as Record<string, number>) || {}),
    }

    for (const [currencyId, count] of Object.entries(currenciesToConsume)) {
      const current = currentCurrency[currencyId] || 0
      if (current < count) {
        return { success: false, error: `Not enough currency: ${currencyId}` }
      }
      currentCurrency[currencyId] = current - count
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { currency: currentCurrency },
    })
  }

  const resolvedBattleConfig = isRivalBattleConfig(battleConfig)
    ? {
        ...battleConfig,
        rewards: buildRivalBattleRewards(battleConfig),
      }
    : battleConfig

  return startBattleFromConfig(user as User, resolvedBattleConfig, {
    dynamic: isRivalBattleConfig(battleConfig),
  })
}

export async function startBattleFromConfig(
  user: User,
  battleConfig: BattleConfig,
  options: {
    dynamic?: boolean
  } = {},
): Promise<{ success: boolean; error?: string; state?: BattleState }> {
  const maxPokemon = battleConfig.maxPokemon || 6
  const playerTeamLoadLimit = battleConfig.isWildBattle ? 6 : maxPokemon

  const payload = await getPayload({ config: configPromise })
  const weatherState = await ensureUserWeatherSlot(payload as any, user)
  const weatherSnapshot = {
    ...resolveSubRegionWeather(battleConfig.subCategory, weatherState.slot),
    updatedAt: weatherState.updatedAt,
    expiresAt: weatherState.expiresAt,
  }
  const rivalContext = isRivalBattleConfig(battleConfig)
    ? await getRivalBattleContext(payload, user, battleConfig)
    : null
  if (rivalContext?.error) {
    return { success: false, error: rivalContext.error }
  }

  const chronicleContext = options.dynamic
    ? null
    : await getActiveChronicleContext({
        userId: user.id,
        activityType: 'battle',
        activityId: battleConfig.id,
      })
  const activeExpedition = options.dynamic
    ? null
    : await getActiveExpeditionForUser(user.id)
  const activeExpeditionStep =
    activeExpedition?.status === 'active'
      ? activeExpedition.steps[activeExpedition.currentStepIndex]
      : undefined
  const expeditionContext =
    activeExpedition &&
    activeExpeditionStep?.activityType === 'battle' &&
    activeExpeditionStep.activityId === battleConfig.id
      ? {
          expeditionId: activeExpedition.expeditionId,
          expeditionName: activeExpedition.expeditionName,
        }
      : undefined
  const chronicleTeam = chronicleContext?.chronicle.battleTeam || []

  const userPokemonDocs = chronicleContext
    ? chronicleTeam
        .slice(0, playerTeamLoadLimit)
        .map((pokemon, index) => buildChroniclePokemon(user, pokemon, index))
    : (
        await payload.find({
          collection: 'pokemon',
          where: {
            user: { equals: user.id },
            onBattleTeam: { equals: true },
          },
          limit: playerTeamLoadLimit,
          sort: 'battleTeamPosition',
        })
      ).docs

  if (userPokemonDocs.length === 0) {
    return {
      success: false,
      error: chronicleContext
        ? 'Chronicle battle team is not configured.'
        : 'You must have at least 1 Pokemon in your Battle Team to start.',
    }
  }

  const trainerLevel = getSkillLevel(user.skills, 'battling')
  const chronicleBattleItems = chronicleContext?.chronicle.battleItems || {}
  const itemUseLimit = chronicleContext
    ? getChronicleBattleItemUseLimit({
        battleItems: chronicleBattleItems,
        battleConfig,
      })
    : resolveTrainerBattleItemUseLimit(
        trainerLevel,
        battleConfig.itemsPerBattle,
      )
  const moveUseLimit = chronicleContext
    ? getChronicleMoveUseLimit(battleConfig)
    : resolveTrainerBattleMoveUseLimit(
        trainerLevel,
        battleConfig.movesPerBattle,
      )
  const playerTrainerLevel = chronicleContext ? 100 : trainerLevel
  const pokedex = await getUserPokedexMap(payload as any, user.id)
  const playerTeam = initializeTeamMoveUses(
    userPokemonDocs.map((p) =>
      initializeBattlePokemon(
        p,
        battleConfig.levelCap,
        false,
        playerTrainerLevel,
        getPokemonResearchLevel(pokedex as any, p.speciesId, p.formId),
      ),
    ),
    moveUseLimit,
  )
  if (playerTeam[0] && !battleConfig.isWildBattle) {
    playerTeam[0].activeTurnStarted = 1
  }

  // Enemy Team Init
  let enemyTeamConfig: BattleEnemy[] = []
  if (!rivalContext?.team) {
    const enemyTeamPool = await getEligibleBattleEnemies(user, battleConfig)
    if (enemyTeamPool.length === 0) {
      return { success: false, error: 'No eligible enemy Pokemon available.' }
    }

    enemyTeamConfig = enemyTeamPool
    if (battleConfig.isWildBattle && enemyTeamPool.length > 1) {
      const randomIndex = Math.floor(Math.random() * enemyTeamPool.length)
      enemyTeamConfig = [enemyTeamPool[randomIndex]]
    }
  }

  const enemyTeam = rivalContext?.team
    ? rivalContext.team
    : await Promise.all(
        enemyTeamConfig.map(async (enemy) => {
          const formData = getPokemonForm(enemy.formId || enemy.speciesId)
          const name = enemy.name || formData?.name || 'Unknown'
          const level =
            typeof enemy.level === 'number'
              ? enemy.level
              : Math.floor(
                  Math.random() * (enemy.level.max - enemy.level.min + 1),
                ) + enemy.level.min

          const rarity = resolvePokemonRarity(enemy)
          const rarityLegacyFields = getPokemonRarityLegacyFields(rarity)
          const mockPokemon = {
            speciesId: enemy.speciesId,
            formId: enemy.formId || enemy.speciesId.toString(),
            level,
            name: name,
            gender: enemy.gender || rollPokemonGender(enemy.speciesId),
            stats: null,
            ivs: resolveEnemyBattleIvs({
              enemy,
              level,
              isWildBattle: battleConfig.isWildBattle,
            }),
            evs: resolveEnemyBattleEvs({
              enemy,
              level,
              isWildBattle: battleConfig.isWildBattle,
            }),
            rarity,
            ...rarityLegacyFields,
            heldItemId: enemy.heldItemId,
            aiMoves: enemy.aiMoves,
          } as unknown as Pokemon

          const initialized = initializeBattlePokemon(mockPokemon)
          initialized.aiMoves = enemy.aiMoves
          if (rarityLegacyFields.isShadow) {
            initialized.isShadow = true
          }
          if (rarityLegacyFields.isRadiant) {
            initialized.isRadiant = true
          }
          if (enemy.initialStatus) {
            applyStatus(initialized, enemy.initialStatus)
          }
          initialized.pokemonResearchLevel = getPokemonResearchLevel(
            pokedex as any,
            initialized.speciesId,
            initialized.formId,
          )
          initialized.observedPreferredStance = getObservedPreferredStance(
            pokedex as any,
            initialized,
          )
          return initialized
        }),
      )
  const enemyMoveUseLimit = resolveEnemyBattleMoveUseLimit(
    enemyTeam.map((enemy) => enemy.level),
    battleConfig.enemyMovesPerBattle,
  )
  initializeTeamMoveUses(enemyTeam, enemyMoveUseLimit)

  // Register seen Pokemon in Pokedex
  const pokedexUpdate: Record<string, any> = pokedex
  let pokedexUpdated = false

  if (!chronicleContext) {
    for (const enemy of enemyTeam) {
      const speciesId = enemy.speciesId.toString()
      const formId = enemy.formId.toString()

      if (!pokedexUpdate[speciesId]) {
        pokedexUpdate[speciesId] = {}
      }

      if (!pokedexUpdate[speciesId][formId]) {
        pokedexUpdate[speciesId][formId] = {
          seen: true,
          caught: false,
          shiny: false,
        }
        pokedexUpdated = true
      } else if (!pokedexUpdate[speciesId][formId].seen) {
        pokedexUpdate[speciesId][formId].seen = true
        pokedexUpdated = true
      }
    }
  }

  if (pokedexUpdated) {
    await setUserPokedexMap(payload as any, user.id, pokedexUpdate)
  }

  if (enemyTeam[0]) {
    enemyTeam[0].activeTurnStarted = 1
  }
  const aiProfile = resolveBattleAiProfile(battleConfig)

  const initialState: BattleState = {
    playerTeam,
    enemyTeam,
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    playerParticipantIndexes: battleConfig.isWildBattle ? [] : [0],
    turn: 1,
    history: [],
    status: 'ongoing',
    pendingPlayerSwitch: battleConfig.isWildBattle ? true : undefined,
    pendingPlayerSwitchReason: battleConfig.isWildBattle ? 'lead' : undefined,
    battleId: battleConfig.id,
    background: battleConfig.background,
    playerName:
      chronicleContext?.chronicle.playerName || user.trainerName || 'Player',
    enemyName:
      rivalContext?.trainer?.name ||
      (battleConfig.isWildBattle ? 'Wild Pokemon' : battleConfig.name),
    isWildBattle: battleConfig.isWildBattle,
    weather: weatherSnapshot,
    itemsUsedThisBattle: [],
    trainerItems: normalizeTrainerBattleItems(battleConfig.trainerItems),
    enemyMoveUsesRemaining: enemyMoveUseLimit,
    ai: {
      version: 1,
      profile: aiProfile,
    },
    chronicle: chronicleContext
      ? {
          expeditionId: chronicleContext.expeditionId,
          expeditionName: chronicleContext.expeditionName,
        }
      : undefined,
    expeditionContext,
    chronicleInventory: chronicleContext ? chronicleBattleItems : undefined,
    powers: createInitialPowersState({
      movesPerBattle: moveUseLimit,
      teraUsesPerBattle: battleConfig.teraUsesPerBattle,
      dynamaxPerBattle: battleConfig.dynamaxPerBattle,
      megaEvolutionsPerBattle: battleConfig.megaEvolutionsPerBattle,
      zMovesPerBattle: battleConfig.zMovesPerBattle,
      victoryUses: battleConfig.victoryUses,
      weatherUses: battleConfig.weatherUses,
      shoutUses: battleConfig.shoutsPerBattle,
      circadianUses: battleConfig.circadianUses,
    }),
    config: {
      itemsPerBattle: itemUseLimit,
      movesPerBattle: moveUseLimit,
      allowedItems: chronicleContext
        ? Object.keys(chronicleBattleItems)
        : battleConfig.allowedItems,
      allowSwapping: battleConfig.allowSwapping !== false,
      maxPokemon,
      enemyAttackTelegraphChance: battleConfig.enemyAttackTelegraphChance,
      music: battleConfig.music,
    },
    playerTrainer: {
      name:
        chronicleContext?.chronicle.playerName || user.trainerName || 'Player',
      icon: chronicleContext?.chronicle.playerIcon || (user as any).icon,
      banner: (user as any).banner,
      title: chronicleContext?.chronicle.playerTitle || (user as any).title,
    },
    enemyTrainer: battleConfig.title
      ? {
          name: rivalContext?.trainer?.name || battleConfig.name,
          icon: rivalContext?.trainer?.icon || battleConfig.icon.id,
          banner: rivalContext?.trainer?.banner || battleConfig.background,
          title: rivalContext?.trainer?.title || battleConfig.title,
        }
      : undefined,
    dynamicBattleConfig: options.dynamic ? battleConfig : undefined,
  }
  initializeEnemyAiMoveLoadouts({ state: initialState, profile: aiProfile })
  normalizeChronicleBattleBudgets(initialState, battleConfig)
  const suppressionMessages = processBattleAbilitySuppressionForState(initialState)
  const initialFieldMessages = [
    ...(battleConfig.isWildBattle
      ? []
      : applyBattleRarityEntryEffects(
          initialState.playerTeam[initialState.activePlayerIndex],
        )),
    ...applyBattleRarityEntryEffects(
      initialState.enemyTeam[initialState.activeEnemyIndex],
    ),
    ...suppressionMessages,
    ...(battleConfig.isWildBattle
      ? []
      : [
          ...processBattleAbilityWeatherSet({
            state: initialState,
            pokemon: initialState.playerTeam[initialState.activePlayerIndex],
            ownerName: initialState.playerName,
          }),
          ...processBattleAbilityTerrainSet({
            state: initialState,
            pokemon: initialState.playerTeam[initialState.activePlayerIndex],
            ownerName: initialState.playerName,
          }),
        ]),
    ...processBattleAbilityWeatherSet({
      state: initialState,
      pokemon: initialState.enemyTeam[initialState.activeEnemyIndex],
      ownerName: initialState.enemyName,
    }),
    ...processBattleAbilityTerrainSet({
      state: initialState,
      pokemon: initialState.enemyTeam[initialState.activeEnemyIndex],
      ownerName: initialState.enemyName,
    }),
  ]
  if (initialFieldMessages.length) {
    initialState.history.unshift({
      turn: initialState.turn,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: initialFieldMessages.join('\n'),
    })
  }

  const existingState = await redis.get<BattleState>(`battle:${user.id}`)
  if (existingState && existingState.status === 'ongoing') {
    if (normalizeChronicleBattleBudgets(existingState, battleConfig)) {
      await redis.set(`battle:${user.id}`, existingState, { ex: BATTLE_TTL })
    }
    return { success: true, state: existingState }
  }

  await redis.del(`battle:${user.id}`)
  await redis.set(`battle:${user.id}`, initialState, { ex: BATTLE_TTL })
  revalidatePath('/game/battles/encounter')
  return { success: true, state: initialState }
}

async function getEligibleBattleEnemies(
  user: User,
  battleConfig: BattleConfig,
): Promise<BattleEnemy[]> {
  const enemyRequirements = battleConfig.enemyTeam.flatMap(
    (enemy) => enemy.requirements || [],
  )
  if (enemyRequirements.length === 0) return battleConfig.enemyTeam

  const requiredKeys = analyzeRequirements(enemyRequirements)
  const userData = await getGameUserData(user, requiredKeys)

  return battleConfig.enemyTeam.filter((enemy) => {
    if (!enemy.requirements || enemy.requirements.length === 0) return true
    return enemy.requirements.every((requirement) =>
      checkRequirement(userData, requirement, {
        category: battleConfig.category,
        subCategory: battleConfig.subCategory,
      }),
    )
  })
}

async function getRivalBattleContext(
  payload: any,
  user: User,
  battleConfig: BattleConfig,
): Promise<{
  error?: string
  trainer?: {
    name: string
    icon?: string
    banner?: string
    title?: string
  }
  team?: ReturnType<typeof initializeBattlePokemon>[]
}> {
  const rivalTrainerId = getRivalTrainerId(user as any)
  if (!rivalTrainerId) {
    return { error: 'Choose a rival before starting this battle.' }
  }

  const rivalUser = (await payload.findByID({
    collection: 'users',
    id: rivalTrainerId,
  })) as User | null

  if (!rivalUser) {
    return { error: 'Your selected rival could not be found.' }
  }

  const rivalPokemonResult = await payload.find({
    collection: 'pokemon',
    where: {
      user: { equals: rivalTrainerId },
      onBattleTeam: { equals: true },
    },
    limit: 10,
    sort: 'battleTeamPosition',
  })

  const rivalTeamDocs = getFirstRivalBattleTeam(
    rivalPokemonResult.docs as Pokemon[],
    battleConfig.maxPokemon || 3,
  )

  if (rivalTeamDocs.length === 0) {
    return {
      error: `${rivalUser.trainerName || 'Your rival'} needs at least 1 Pokemon on their Battle Team.`,
    }
  }

  const rivalLevel = battleConfig.rivalLevel || battleConfig.levelCap || 5
  const rivalTrainerLevel = getSkillLevel(rivalUser.skills, 'battling')
  const rivalPokedex = await getUserPokedexMap(payload as any, rivalUser.id)

  const team = rivalTeamDocs.map((pokemon) =>
    initializeBattlePokemon(
      scaleRivalPokemonForBattle(pokemon, rivalLevel),
      rivalLevel,
      true,
      rivalTrainerLevel,
      getPokemonResearchLevel(rivalPokedex, pokemon.speciesId, pokemon.formId),
    ),
  )

  return {
    trainer: {
      name: rivalUser.trainerName || 'Rival',
      icon: (rivalUser as any).icon,
      banner: (rivalUser as any).banner,
      title: (rivalUser as any).title,
    },
    team,
  }
}

function buildChroniclePokemon(
  user: User,
  config: ExpeditionChroniclePokemonConfig,
  index: number,
): Pokemon {
  const formId = config.formId || String(config.speciesId)
  const now = new Date().toISOString()
  const rarity = resolvePokemonRarity(config)

  return {
    id: `chronicle:${user.id}:${formId}:${index}`,
    user: user.id,
    originalTrainer: user.id,
    speciesId: config.speciesId,
    formId,
    name: config.name || getPokemonForm(formId)?.name || 'Pokemon',
    level: config.level,
    rarity,
    identified: true,
    ability: config.ability,
    assignedMoves: config.assignedMoves?.map((moveId) => ({ moveId })) || [],
    heldItemId: config.heldItemId,
    ivs: {
      hp: config.ivs?.hp ?? 15,
      attack: config.ivs?.attack ?? 15,
      defense: config.ivs?.defense ?? 15,
      specialAttack: config.ivs?.specialAttack ?? 15,
      specialDefense: config.ivs?.specialDefense ?? 15,
      speed: config.ivs?.speed ?? 15,
    },
    evs: {
      hp: config.evs?.hp ?? 0,
      attack: config.evs?.attack ?? 0,
      defense: config.evs?.defense ?? 0,
      specialAttack: config.evs?.specialAttack ?? 0,
      specialDefense: config.evs?.specialDefense ?? 0,
      speed: config.evs?.speed ?? 0,
    },
    nature: config.nature,
    ...getPokemonRarityLegacyFields(rarity),
    onBattleTeam: true,
    battleTeamPosition: index,
    createdAt: now,
    updatedAt: now,
  } as Pokemon
}
