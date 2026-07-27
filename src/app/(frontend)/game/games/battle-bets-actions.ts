'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Pokemon, User } from '@/payload-types'
import { items } from '@/data/items'
import { allGames } from '@/data/games'
import type { BattleEnemy, TrainerBattleItemConfig } from '@/data/types'
import { createInitialPowersState } from '@/data/powers'
import { getGameUserData } from '@/utilities/game-data'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { redis } from '@/utilities/redis'
import { checkRequirement } from '@/utilities/requirements'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { initializeBattlePokemon } from '@/utilities/battle/battle-logic'
import {
  resolveEnemyBattleEvs,
  resolveEnemyBattleIvs,
} from '@/utilities/battle/enemy-stat-rolls'
import {
  chooseEnemyBattleAction,
  initializeEnemyAiMoveLoadouts,
  type EnemyBattleAction,
} from '@/utilities/battle/enemy-ai'
import {
  processBattleAbilitySuppressionForState,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
} from '@/utilities/battle/abilities'
import { initializeTeamMoveUses } from '@/utilities/battle/move-uses'
import { applyBattleRarityEntryEffects } from '@/utilities/battle/rarity-effects'
import {
  applyShadowScreamDamage,
  shouldShadowScream,
} from '@/utilities/battle/shadow-pokemon'
import {
  applyTrainerItemIfTriggered,
  normalizeTrainerBattleItems,
} from '@/utilities/battle/trainer-items'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { resolveEnemyBattleMoveUseLimit } from '@/utilities/skills/unlocks'
import {
  getSeenPokemonOptions,
  getVsSeekerTrainerHealingItemId,
  getVsSeekerTrainerLevel,
  VS_SEEKER_HELD_BERRY_CHANCE,
} from '@/utilities/vs-seeker'
import {
  calculateBattleBetsPayout,
  getBattleBetsFallbackWinner,
  type BattleBetsPokemonPreview,
  type BattleBetsPublicState,
  type BattleBetsReplayFrame,
  type BattleBetsSide,
  type BattleBetsTeamPreview,
} from '@/utilities/battle-bets'
import {
  resolvePvpTurn,
  type PvpMove,
} from '@/app/(frontend)/game/battles/pvp/resolution'

const GAME_ID = 'celadon-high-stakes-battle-bets'
const SESSION_TTL_SECONDS = 60 * 60
const ACTION_LOCK_SECONDS = 120
const MAX_FIXTURE_ATTEMPTS = 20
const MAX_BATTLE_TURNS = 100
const FEMALE_USER_ID = 'battle-bets-rocket-f'
const MALE_USER_ID = 'battle-bets-rocket-m'

type SeenPokedex = Record<string, Record<string, { seen?: boolean }>>

interface BattleBetsFixture {
  battleState: BattleState
  femaleTrainerItems?: TrainerBattleItemConfig[]
  maleTrainerItems?: TrainerBattleItemConfig[]
}

interface BattleBetsStoredState
  extends Omit<
    BattleBetsPublicState,
    'projectedFemalePayout' | 'projectedMalePayout'
  > {
  fixture: BattleBetsFixture
}

interface TrainerItemRuntime {
  items?: TrainerBattleItemConfig[]
  lastUsedTurn?: number
}

interface SimulatedBattle {
  winner: BattleBetsSide
  frames: BattleBetsReplayFrame[]
}

type ActionFailure = { success: false; error: string }
type StateActionSuccess = {
  success: true
  state: BattleBetsPublicState
  restored?: boolean
}
type StateActionResult = ActionFailure | StateActionSuccess

function sessionKey(userId: string): string {
  return `battle-bets:${userId}`
}

function getRemainingSessionTtl(expiresAt: number): number {
  return Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000))
}

async function saveLiveSession(
  userId: string,
  state: BattleBetsStoredState,
): Promise<boolean> {
  const ttl = getRemainingSessionTtl(state.expiresAt)
  if (ttl <= 0) {
    await redis.del(sessionKey(userId))
    return false
  }
  await redis.set(sessionKey(userId), state, { ex: ttl })
  return true
}

function actionResultKey(
  userId: string,
  action: string,
  clientActionId: string,
): string {
  return `battle-bets:result:${userId}:${action}:${clientActionId}`
}

function isValidClientActionId(value: string): boolean {
  return (
    typeof value === 'string' &&
    value.length >= 8 &&
    value.length <= 80 &&
    /^[a-zA-Z0-9-]+$/.test(value)
  )
}

function pickRandom<T>(values: T[], random: () => number): T {
  return values[Math.floor(random() * values.length)]
}

function pickRandomUnique<T>(
  values: T[],
  count: number,
  random: () => number,
): T[] {
  const remaining = [...values]
  const selected: T[] = []
  while (selected.length < count && remaining.length > 0) {
    selected.push(
      remaining.splice(Math.floor(random() * remaining.length), 1)[0],
    )
  }
  return selected
}

function getBattleBetsGame() {
  const game = allGames.find((entry) => entry.id === GAME_ID)
  return game?.gameType === 'battle-bets' ? game : null
}

function getProjectedPayout(
  pot: number,
  probability: number,
  houseEdge: number,
): number {
  return calculateBattleBetsPayout({
    pot,
    selectedProbability: probability,
    houseEdge,
  })
}

function toPublicState(state: BattleBetsStoredState): BattleBetsPublicState {
  const game = getBattleBetsGame()
  const houseEdge = game?.settings.houseEdge ?? 0.05
  return {
    gameId: state.gameId,
    pot: state.pot,
    phase: state.phase,
    femaleTeam: state.femaleTeam,
    maleTeam: state.maleTeam,
    femaleChance: state.femaleChance,
    maleChance: state.maleChance,
    projectedFemalePayout: getProjectedPayout(
      state.pot,
      state.femaleChance,
      houseEdge,
    ),
    projectedMalePayout: getProjectedPayout(
      state.pot,
      state.maleChance,
      houseEdge,
    ),
    selectedSide: state.selectedSide,
    winner: state.phase === 'result' ? state.winner : undefined,
    payout: state.phase === 'result' ? state.payout : undefined,
    replay: state.replay,
    createdAt: state.createdAt,
    expiresAt: state.expiresAt,
  }
}

function buildSeenPokedex(
  entries: Array<{
    speciesId?: string | number | null
    formId?: string | number | null
    seen?: boolean | null
  }>,
): SeenPokedex {
  const pokedex: SeenPokedex = {}
  for (const entry of entries) {
    if (entry.speciesId == null || entry.formId == null) continue
    const speciesId = String(entry.speciesId)
    const formId = String(entry.formId)
    pokedex[speciesId] ??= {}
    pokedex[speciesId][formId] = { seen: Boolean(entry.seen) }
  }
  return pokedex
}

function buildInventoryMap(
  entries: Array<{ itemId?: string | null; quantity?: number | null }>,
): Record<string, number> {
  return Object.fromEntries(
    entries
      .filter(
        (entry): entry is { itemId: string; quantity?: number | null } =>
          typeof entry.itemId === 'string',
      )
      .map((entry) => [entry.itemId, Math.max(0, entry.quantity ?? 0)]),
  )
}

function buildBattlePokemon(params: {
  enemy: BattleEnemy
  side: BattleBetsSide
  index: number
  random: () => number
}): BattlePokemon {
  const { enemy, random } = params
  const formId = enemy.formId || String(enemy.speciesId)
  const form = getPokemonForm(formId)
  const level = typeof enemy.level === 'number' ? enemy.level : enemy.level.min
  const ownerId = params.side === 'female' ? FEMALE_USER_ID : MALE_USER_ID
  const mockPokemon = {
    id: `${ownerId}-${params.index}-${formId}`,
    speciesId: enemy.speciesId,
    formId,
    level,
    name: form?.name || enemy.name || 'Unknown Pokémon',
    gender: 'genderless',
    user: ownerId,
    originalTrainer: ownerId,
    stats: null,
    ivs: resolveEnemyBattleIvs({
      enemy,
      level,
      isWildBattle: false,
      random,
    }),
    evs: resolveEnemyBattleEvs({
      enemy,
      level,
      isWildBattle: false,
      random,
    }),
    rarity: 'shadow',
    isShadow: true,
    isRadiant: false,
    shiny: false,
    heldItemId: enemy.heldItemId,
    aiMoves: enemy.aiMoves,
  } as unknown as Pokemon

  const pokemon = initializeBattlePokemon(mockPokemon)
  pokemon.isShadow = true
  pokemon.aiMoves = enemy.aiMoves
  return pokemon
}

function createTeamConfig(params: {
  pokedex: SeenPokedex
  inventory: Record<string, number>
  random: () => number
}): {
  enemies: BattleEnemy[]
  trainerItems?: TrainerBattleItemConfig[]
} | null {
  const pool = getSeenPokemonOptions(params.pokedex)
  if (pool.length < 3) return null

  const level = getVsSeekerTrainerLevel(params.inventory)
  const berryIds = items
    .filter((item) => item.category === 'berry' && item.heldConfig)
    .map((item) => item.id)
  const enemies = pickRandomUnique(pool, 3, params.random).map((entry) => {
    const enemy: BattleEnemy = {
      speciesId: entry.speciesId,
      formId: entry.formId,
      level,
      isShadow: true,
    }
    if (berryIds.length > 0 && params.random() < VS_SEEKER_HELD_BERRY_CHANCE) {
      enemy.heldItemId = pickRandom(berryIds, params.random)
    }
    return enemy
  })
  const healingItemId = getVsSeekerTrainerHealingItemId({
    inventory: params.inventory,
    rng: params.random,
  })

  return {
    enemies,
    trainerItems: healingItemId
      ? [{ itemId: healingItemId, quantity: 1 }]
      : undefined,
  }
}

function createBattleBetsFixture(params: {
  pokedex: SeenPokedex
  inventory: Record<string, number>
  random?: () => number
}): BattleBetsFixture | null {
  const random = params.random ?? Math.random
  const femaleConfig = createTeamConfig({ ...params, random })
  const maleConfig = createTeamConfig({ ...params, random })
  if (!femaleConfig || !maleConfig) return null

  const femaleTeam = femaleConfig.enemies.map((enemy, index) =>
    buildBattlePokemon({ enemy, side: 'female', index, random }),
  )
  const maleTeam = maleConfig.enemies.map((enemy, index) =>
    buildBattlePokemon({ enemy, side: 'male', index, random }),
  )
  const moveUseLimit = resolveEnemyBattleMoveUseLimit([
    ...femaleTeam.map((pokemon) => pokemon.level),
    ...maleTeam.map((pokemon) => pokemon.level),
  ])
  initializeTeamMoveUses(femaleTeam, moveUseLimit)
  initializeTeamMoveUses(maleTeam, moveUseLimit)
  if (femaleTeam[0]) femaleTeam[0].activeTurnStarted = 1
  if (maleTeam[0]) maleTeam[0].activeTurnStarted = 1

  const femalePowers = createInitialPowersState({
    movesPerBattle: moveUseLimit,
    teraUsesPerBattle: 0,
    dynamaxPerBattle: 0,
    megaEvolutionsPerBattle: 0,
    zMovesPerBattle: 0,
  })
  const malePowers = createInitialPowersState({
    movesPerBattle: moveUseLimit,
    teraUsesPerBattle: 0,
    dynamaxPerBattle: 0,
    megaEvolutionsPerBattle: 0,
    zMovesPerBattle: 0,
  })

  const battleState: BattleState = {
    playerTeam: femaleTeam,
    enemyTeam: maleTeam,
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: GAME_ID,
    background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
    playerName: 'Rocket Grunt F',
    enemyName: 'Rocket Grunt M',
    isWildBattle: false,
    isPvp: true,
    itemsUsedThisBattle: [],
    powers: femalePowers,
    pvpPowers: {
      [FEMALE_USER_ID]: femalePowers,
      [MALE_USER_ID]: malePowers,
    },
    pvpMoveUseLimits: {
      [FEMALE_USER_ID]: moveUseLimit,
      [MALE_USER_ID]: moveUseLimit,
    },
    pvpItemUseLimits: {
      [FEMALE_USER_ID]: 0,
      [MALE_USER_ID]: 0,
    },
    config: {
      movesPerBattle: moveUseLimit,
      itemsPerBattle: 0,
      allowSwapping: true,
      maxPokemon: 3,
    },
    ai: { version: 1, profile: 'advanced' },
    playerTrainer: {
      name: 'Rocket Grunt F',
      icon: '/sprites/trainers/rocket-grunt-f.avif',
    },
    enemyTrainer: {
      name: 'Rocket Grunt M',
      icon: '/sprites/trainers/rocket-grunt-m.avif',
    },
  }

  initializeEnemyAiMoveLoadouts({
    state: battleState,
    profile: 'advanced',
    random,
  })
  initializeEnemyAiMoveLoadouts({
    state: mirrorBattleState(battleState),
    profile: 'advanced',
    random,
  })
  const initialMessages = [
    ...applyBattleRarityEntryEffects(
      battleState.playerTeam[battleState.activePlayerIndex],
      random,
      battleState,
    ),
    ...applyBattleRarityEntryEffects(
      battleState.enemyTeam[battleState.activeEnemyIndex],
      random,
      battleState,
    ),
    ...processBattleAbilitySuppressionForState(battleState),
    ...processBattleAbilityWeatherSet({
      state: battleState,
      pokemon: battleState.playerTeam[battleState.activePlayerIndex],
      ownerName: battleState.playerName,
    }),
    ...processBattleAbilityTerrainSet({
      state: battleState,
      pokemon: battleState.playerTeam[battleState.activePlayerIndex],
      ownerName: battleState.playerName,
    }),
    ...processBattleAbilityWeatherSet({
      state: battleState,
      pokemon: battleState.enemyTeam[battleState.activeEnemyIndex],
      ownerName: battleState.enemyName,
    }),
    ...processBattleAbilityTerrainSet({
      state: battleState,
      pokemon: battleState.enemyTeam[battleState.activeEnemyIndex],
      ownerName: battleState.enemyName,
    }),
  ]
  if (initialMessages.length > 0) {
    battleState.history.unshift({
      turn: 1,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: initialMessages.join('\n'),
    })
  }

  return {
    battleState,
    femaleTrainerItems: normalizeTrainerBattleItems(femaleConfig.trainerItems),
    maleTrainerItems: normalizeTrainerBattleItems(maleConfig.trainerItems),
  }
}

function mirrorBattleState(state: BattleState): BattleState {
  const femaleId = String(state.playerTeam[0]?.user || FEMALE_USER_ID)
  const maleId = String(state.enemyTeam[0]?.user || MALE_USER_ID)
  return {
    ...state,
    playerTeam: state.enemyTeam,
    enemyTeam: state.playerTeam,
    activePlayerIndex: state.activeEnemyIndex,
    activeEnemyIndex: state.activePlayerIndex,
    playerName: state.enemyName,
    enemyName: state.playerName,
    powers: state.pvpPowers?.[maleId] ?? state.powers,
    pvpPowers: state.pvpPowers
      ? {
          ...state.pvpPowers,
          [femaleId]: state.pvpPowers[femaleId],
          [maleId]: state.pvpPowers[maleId],
        }
      : undefined,
  }
}

function enemyActionToPvpMove(action: EnemyBattleAction): PvpMove {
  switch (action.kind) {
    case 'move':
      return {
        stance: action.move.stance,
        attackType: action.move.attackType,
        specialMoveId: action.move.move.id,
        calledByMetronome: action.move.calledByMetronome,
      }
    case 'switch':
      return {
        stance: 'speed',
        attackType: `swap:${action.newIndex}`,
      }
    case 'item':
      return { stance: 'tech', skipAction: true }
    case 'stance':
      return { stance: action.stance }
  }
}

function chooseSideMove(params: {
  state: BattleState
  side: BattleBetsSide
  trainerItemRuntime: TrainerItemRuntime
  random: () => number
}): PvpMove {
  const view =
    params.side === 'female'
      ? mirrorBattleState(params.state)
      : { ...params.state }
  view.trainerItems = params.trainerItemRuntime.items
  view.trainerItemLastUsedTurn = params.trainerItemRuntime.lastUsedTurn
  const item = applyTrainerItemIfTriggered(view, 'enemy-action')
  params.trainerItemRuntime.items = view.trainerItems
  params.trainerItemRuntime.lastUsedTurn = view.trainerItemLastUsedTurn
  if (item.used) {
    return {
      stance: 'tech',
      skipAction: item.skipsEnemyAction !== false,
      spectatorMessage: item.message,
    }
  }

  const enemyMon = view.enemyTeam[view.activeEnemyIndex]
  const playerMon = view.playerTeam[view.activePlayerIndex]
  if (shouldShadowScream(enemyMon, params.random)) {
    const damage = applyShadowScreamDamage(enemyMon)
    return {
      stance: 'tech',
      skipAction: true,
      spectatorMessage: `${view.enemyName}'s ${enemyMon.name} screams out in pain! [icon:damage:${damage}]`,
    }
  }
  return enemyActionToPvpMove(
    chooseEnemyBattleAction({
      state: view,
      enemyMon,
      playerMon,
      canUseItems: false,
      canSwitch: true,
      consumeMoveUse: false,
      random: params.random,
    }),
  )
}

function replayPokemon(pokemon: BattlePokemon) {
  return {
    formId: String(pokemon.formId),
    name: pokemon.name,
    level: pokemon.level,
    currentHp: pokemon.currentHp,
    maxHp: pokemon.maxHp,
    fainted: pokemon.currentHp <= 0,
    isShadow: true as const,
  }
}

function createReplayFrame(
  state: BattleState,
  messages: string[],
): BattleBetsReplayFrame {
  return {
    turn: Math.max(0, state.turn - 1),
    femaleActiveIndex: state.activePlayerIndex,
    maleActiveIndex: state.activeEnemyIndex,
    femaleTeam: state.playerTeam.map(replayPokemon),
    maleTeam: state.enemyTeam.map(replayPokemon),
    messages,
  }
}

function getFallbackWinner(
  state: BattleState,
  random: () => number,
): BattleBetsSide {
  return getBattleBetsFallbackWinner({
    femaleRemainingHp: state.playerTeam.reduce(
      (total, pokemon) => total + pokemon.currentHp,
      0,
    ),
    femaleMaximumHp: state.playerTeam.reduce(
      (total, pokemon) => total + pokemon.maxHp,
      0,
    ),
    maleRemainingHp: state.enemyTeam.reduce(
      (total, pokemon) => total + pokemon.currentHp,
      0,
    ),
    maleMaximumHp: state.enemyTeam.reduce(
      (total, pokemon) => total + pokemon.maxHp,
      0,
    ),
    random,
  })
}

async function simulateBattle(
  fixture: BattleBetsFixture,
  options: { captureReplay?: boolean; random?: () => number } = {},
): Promise<SimulatedBattle> {
  const random = options.random ?? Math.random
  let state = structuredClone(fixture.battleState)
  const femaleItems: TrainerItemRuntime = {
    items: structuredClone(fixture.femaleTrainerItems),
  }
  const maleItems: TrainerItemRuntime = {
    items: structuredClone(fixture.maleTrainerItems),
  }
  const frames: BattleBetsReplayFrame[] = []
  if (options.captureReplay) {
    frames.push(
      createReplayFrame(state, [
        'The book closes. Both Rocket Grunts send out their first Shadow Pokémon.',
        ...(state.history[0]?.message.split('\n').filter(Boolean) || []),
      ]),
    )
  }

  while (state.status === 'ongoing' && state.turn <= MAX_BATTLE_TURNS) {
    const previousHistoryLength = state.history.length
    const femaleMove = chooseSideMove({
      state,
      side: 'female',
      trainerItemRuntime: femaleItems,
      random,
    })
    const maleMove = chooseSideMove({
      state,
      side: 'male',
      trainerItemRuntime: maleItems,
      random,
    })
    state = await resolvePvpTurn(state, femaleMove, maleMove, {
      persist: false,
      random,
    })
    if (options.captureReplay) {
      const addedEntries = Math.max(
        0,
        state.history.length - previousHistoryLength,
      )
      const messages = state.history
        .slice(0, Math.max(1, addedEntries))
        .flatMap((entry) => entry.message.split('\n'))
        .filter(Boolean)
      frames.push(createReplayFrame(state, messages))
    }
  }

  const winner =
    state.status === 'won'
      ? 'female'
      : state.status === 'lost'
        ? 'male'
        : getFallbackWinner(state, random)
  if (options.captureReplay && state.status === 'ongoing') {
    frames.push(
      createReplayFrame(state, [
        `${winner === 'female' ? 'Rocket Grunt F' : 'Rocket Grunt M'} takes the decision when the book calls time.`,
      ]),
    )
  }
  return { winner, frames }
}

function createTeamPreview(
  side: BattleBetsSide,
  fixture: BattleBetsFixture,
): BattleBetsTeamPreview {
  const team =
    side === 'female'
      ? fixture.battleState.playerTeam
      : fixture.battleState.enemyTeam
  const trainerItems =
    side === 'female' ? fixture.femaleTrainerItems : fixture.maleTrainerItems
  return {
    trainerName: side === 'female' ? 'Rocket Grunt F' : 'Rocket Grunt M',
    trainerSpriteId: side === 'female' ? 'rocket-grunt-f' : 'rocket-grunt-m',
    pokemon: team.map(
      (pokemon): BattleBetsPokemonPreview => ({
        speciesId: pokemon.speciesId,
        formId: String(pokemon.formId),
        name: pokemon.name,
        level: pokemon.level,
        types: pokemon.types,
        heldItemId: pokemon.heldItem?.id,
        isShadow: true,
      }),
    ),
    trainerItemId: trainerItems?.[0]?.itemId,
  }
}

async function createSession(params: {
  user: User
  payload: Awaited<ReturnType<typeof getPayload>>
  pot: number
}): Promise<{ state?: BattleBetsStoredState; error?: string }> {
  const game = getBattleBetsGame()
  if (!game) return { error: 'Battle Bets is unavailable.' }
  const simulationCount = game.settings.simulationCount ?? 200
  const minimumWinChance = game.settings.minimumWinChance ?? 0.25
  const maximumWinChance = game.settings.maximumWinChance ?? 0.75

  const userData = await getGameUserData(params.user, [
    'inventory',
    'pokedex',
    'currency',
    'completedTasks',
  ])
  if (
    !game.requirements.every((requirement) =>
      checkRequirement(userData, requirement, {
        category: game.category,
        subCategory: game.subCategory,
      }),
    )
  ) {
    return { error: 'Complete Battle Bets in the High Stakes Room first.' }
  }

  const pokedex = buildSeenPokedex(userData.pokedex || [])
  const inventory = buildInventoryMap(userData.inventory || [])
  if (getSeenPokemonOptions(pokedex).length < 3) {
    return {
      error:
        'You need at least three seen non-Legendary Pokémon before the book can make a match.',
    }
  }

  let best:
    | {
        fixture: BattleBetsFixture
        femaleChance: number
        distance: number
      }
    | undefined
  for (let attempt = 0; attempt < MAX_FIXTURE_ATTEMPTS; attempt += 1) {
    const fixture = createBattleBetsFixture({ pokedex, inventory })
    if (!fixture) break
    let femaleWins = 0
    for (let simulation = 0; simulation < simulationCount; simulation += 1) {
      const result = await simulateBattle(fixture)
      if (result.winner === 'female') femaleWins += 1
    }
    const femaleChance = femaleWins / simulationCount
    const candidate = {
      fixture,
      femaleChance,
      distance: Math.abs(0.5 - femaleChance),
    }
    if (!best || candidate.distance < best.distance) best = candidate
    if (femaleChance >= minimumWinChance && femaleChance <= maximumWinChance) {
      best = candidate
      break
    }
  }
  if (!best) return { error: 'The house could not prepare a valid matchup.' }

  const createdAt = Date.now()
  return {
    state: {
      gameId: GAME_ID,
      pot: params.pot,
      phase: 'inspect',
      femaleTeam: createTeamPreview('female', best.fixture),
      maleTeam: createTeamPreview('male', best.fixture),
      femaleChance: best.femaleChance,
      maleChance: 1 - best.femaleChance,
      createdAt,
      expiresAt: createdAt + SESSION_TTL_SECONDS * 1000,
      fixture: best.fixture,
    },
  }
}

async function currentUser() {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })
  return { payload, user: user as User | null }
}

async function checkRateLimit(
  userId: string,
  action: string,
  limit = 12,
): Promise<ActionFailure | null> {
  const rateLimit = await checkActionRateLimit(
    userId,
    `battle-bets-${action}`,
    limit,
    60,
  )
  return rateLimit.allowed
    ? null
    : { success: false, error: 'Too many requests. Let the book settle first.' }
}

export async function startBattleBets(
  forceReset = false,
): Promise<StateActionResult> {
  const { payload, user } = await currentUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  const rateLimit = await checkRateLimit(user.id, 'start', 6)
  if (rateLimit) return rateLimit

  const lock = await acquireActionLock(
    `lock:battle-bets:${user.id}`,
    ACTION_LOCK_SECONDS,
  )
  if (!lock.acquired) {
    return {
      success: false,
      error: 'Battle Bets is already being prepared.',
    }
  }

  try {
    let existing = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (existing && getRemainingSessionTtl(existing.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      existing = null
    }
    if (
      existing &&
      !(forceReset && existing.phase === 'result' && existing.payout === 0)
    ) {
      return {
        success: true,
        state: toPublicState(existing),
        restored: true,
      }
    }
    if (existing) await redis.del(sessionKey(user.id))

    const game = getBattleBetsGame()
    if (!game) return { success: false, error: 'Battle Bets is unavailable.' }
    const freshUser = (await payload.findByID({
      collection: 'users',
      id: user.id,
    })) as User
    const buyIn = game.settings.buyIn ?? 100

    const created = await createSession({
      user: freshUser,
      payload,
      pot: buyIn,
    })
    if (!created.state) {
      return {
        success: false,
        error: created.error || 'The house could not prepare a matchup.',
      }
    }

    await redis.set(sessionKey(user.id), created.state, {
      ex: SESSION_TTL_SECONDS,
    })
    return { success: true, state: toPublicState(created.state) }
  } finally {
    await releaseActionLock(lock)
  }
}

export async function getBattleBetsState(): Promise<BattleBetsPublicState | null> {
  const { user } = await currentUser()
  if (!user) return null
  const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
  if (state && getRemainingSessionTtl(state.expiresAt) <= 0) {
    await redis.del(sessionKey(user.id))
    return null
  }
  return state ? toPublicState(state) : null
}

export async function placeBattleBet(
  side: BattleBetsSide,
  clientActionId: string,
): Promise<StateActionResult> {
  const { user } = await currentUser()
  if (!user || (side !== 'female' && side !== 'male')) {
    return { success: false, error: 'Invalid wager.' }
  }
  if (!isValidClientActionId(clientActionId)) {
    return { success: false, error: 'Invalid wager request.' }
  }
  const rateLimit = await checkRateLimit(user.id, 'wager')
  if (rateLimit) return rateLimit
  const resultKey = actionResultKey(user.id, 'wager', clientActionId)
  const cached = await getIdempotentResult<StateActionResult>(resultKey)
  if (cached) return cached

  const lock = await acquireActionLock(
    `lock:battle-bets:${user.id}`,
    ACTION_LOCK_SECONDS,
  )
  if (!lock.acquired) {
    return { success: false, error: 'That wager is already resolving.' }
  }
  try {
    const repeated = await getIdempotentResult<StateActionResult>(resultKey)
    if (repeated) return repeated
    const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (state?.phase !== 'inspect') {
      return { success: false, error: 'There is no open wager.' }
    }
    if (getRemainingSessionTtl(state.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      return {
        success: false,
        error: 'That book expired and the virtual pot was forfeited.',
      }
    }

    const battle = await simulateBattle(state.fixture, {
      captureReplay: true,
    })
    const selectedChance =
      side === 'female' ? state.femaleChance : state.maleChance
    const game = getBattleBetsGame()
    const won = battle.winner === side
    const payout =
      won && game
        ? calculateBattleBetsPayout({
            pot: state.pot,
            selectedProbability: selectedChance,
            houseEdge: game.settings.houseEdge ?? 0.05,
          })
        : 0
    const next: BattleBetsStoredState = {
      ...state,
      phase: 'replay',
      selectedSide: side,
      winner: battle.winner,
      payout,
      replay: battle.frames,
    }
    if (!(await saveLiveSession(user.id, next))) {
      return {
        success: false,
        error: 'That book expired and the virtual pot was forfeited.',
      }
    }
    const response: StateActionResult = {
      success: true,
      state: toPublicState(next),
    }
    await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
    return response
  } finally {
    await releaseActionLock(lock)
  }
}

export async function finishBattleBetsReplay(
  clientActionId: string,
): Promise<StateActionResult> {
  const { user } = await currentUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (!isValidClientActionId(clientActionId)) {
    return { success: false, error: 'Invalid replay request.' }
  }
  const resultKey = actionResultKey(user.id, 'finish-replay', clientActionId)
  const cached = await getIdempotentResult<StateActionResult>(resultKey)
  if (cached) return cached
  const lock = await acquireActionLock(`lock:battle-bets:${user.id}`, 15)
  if (!lock.acquired) {
    return { success: false, error: 'The result is already being settled.' }
  }
  try {
    const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (!state || (state.phase !== 'replay' && state.phase !== 'result')) {
      return { success: false, error: 'There is no replay to settle.' }
    }
    if (getRemainingSessionTtl(state.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      return {
        success: false,
        error: 'That book expired and the virtual pot was forfeited.',
      }
    }
    const next =
      state.phase === 'result'
        ? state
        : ({ ...state, phase: 'result' } as BattleBetsStoredState)
    if (state.phase !== 'result') {
      await saveLiveSession(user.id, next)
    }
    const response: StateActionResult = {
      success: true,
      state: toPublicState(next),
    }
    await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
    return response
  } finally {
    await releaseActionLock(lock)
  }
}

export async function cashOutBattleBets(
  clientActionId: string,
): Promise<ActionFailure | { success: true; payout: number }> {
  const { payload, user } = await currentUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (!isValidClientActionId(clientActionId)) {
    return { success: false, error: 'Invalid cash-out request.' }
  }
  const rateLimit = await checkRateLimit(user.id, 'cash-out')
  if (rateLimit) return rateLimit
  const resultKey = actionResultKey(user.id, 'cash-out', clientActionId)
  const cached = await getIdempotentResult<
    ActionFailure | { success: true; payout: number }
  >(resultKey)
  if (cached) return cached

  const lock = await acquireActionLock(`lock:battle-bets:${user.id}`, 30)
  if (!lock.acquired) {
    return { success: false, error: 'That pot is already being settled.' }
  }
  try {
    const repeated = await getIdempotentResult<
      ActionFailure | { success: true; payout: number }
    >(resultKey)
    if (repeated) return repeated
    const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (
      state?.phase !== 'result' ||
      !state.payout ||
      state.winner !== state.selectedSide
    ) {
      return {
        success: false,
        error: 'There is no winning pot to cash out.',
      }
    }
    if (getRemainingSessionTtl(state.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      return {
        success: false,
        error: 'That book expired and the virtual pot was forfeited.',
      }
    }

    const freshUser = (await payload.findByID({
      collection: 'users',
      id: user.id,
    })) as User
    const currency = {
      ...((freshUser.currency as Record<string, number>) || {}),
    }
    currency['fun-tokens'] = (currency['fun-tokens'] || 0) + state.payout
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { currency },
    })
    await redis.del(sessionKey(user.id))
    const response = { success: true as const, payout: state.payout }
    await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
    return response
  } finally {
    await releaseActionLock(lock)
  }
}

export async function rollOverBattleBets(
  clientActionId: string,
): Promise<StateActionResult> {
  const { payload, user } = await currentUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (!isValidClientActionId(clientActionId)) {
    return { success: false, error: 'Invalid rollover request.' }
  }
  const rateLimit = await checkRateLimit(user.id, 'roll-over', 6)
  if (rateLimit) return rateLimit
  const resultKey = actionResultKey(user.id, 'roll-over', clientActionId)
  const cached = await getIdempotentResult<StateActionResult>(resultKey)
  if (cached) return cached

  const lock = await acquireActionLock(
    `lock:battle-bets:${user.id}`,
    ACTION_LOCK_SECONDS,
  )
  if (!lock.acquired) {
    return { success: false, error: 'The next book is already being prepared.' }
  }
  try {
    const repeated = await getIdempotentResult<StateActionResult>(resultKey)
    if (repeated) return repeated
    const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (
      state?.phase !== 'result' ||
      !state.payout ||
      state.winner !== state.selectedSide
    ) {
      return {
        success: false,
        error: 'Win a battle before rolling over.',
      }
    }
    if (getRemainingSessionTtl(state.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      return {
        success: false,
        error: 'That book expired and the virtual pot was forfeited.',
      }
    }

    const created = await createSession({
      user,
      payload,
      pot: state.payout,
    })
    if (!created.state) {
      return {
        success: false,
        error: created.error || 'The house could not prepare another matchup.',
      }
    }
    await redis.set(sessionKey(user.id), created.state, {
      ex: SESSION_TTL_SECONDS,
    })
    const response: StateActionResult = {
      success: true,
      state: toPublicState(created.state),
    }
    await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
    return response
  } finally {
    await releaseActionLock(lock)
  }
}
