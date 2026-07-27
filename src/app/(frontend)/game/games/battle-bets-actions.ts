'use server'

import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import {
  type PvpMove,
  resolvePvpTurn,
} from '@/app/(frontend)/game/battles/pvp/resolution'
import { allGames } from '@/data/games'
import { items } from '@/data/items'
import { createInitialPowersState } from '@/data/powers'
import type { BattleEnemy, TrainerBattleItemConfig } from '@/data/types'
import type { Pokemon, User } from '@/payload-types'
import {
  processBattleAbilitySuppressionForState,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
} from '@/utilities/battle/abilities'
import { initializeBattlePokemon } from '@/utilities/battle/battle-logic'
import {
  chooseEnemyBattleAction,
  type EnemyBattleAction,
  initializeEnemyAiMoveLoadouts,
} from '@/utilities/battle/enemy-ai'
import {
  resolveEnemyBattleEvs,
  resolveEnemyBattleIvs,
} from '@/utilities/battle/enemy-stat-rolls'
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
import {
  type BattleBetsPokemonPreview,
  type BattleBetsPublicState,
  type BattleBetsSide,
  type BattleBetsTeamPreview,
  calculateBattleBetsDecimalOdds,
  calculateBattleBetsPayout,
  calculateBattleBetsSettlement,
  getBattleBetsFallbackWinner,
  mirrorBattleBetsBattleState,
} from '@/utilities/battle-bets'
import { getGameUserData } from '@/utilities/game-data'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { redis } from '@/utilities/redis'
import { checkRequirement } from '@/utilities/requirements'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { resolveEnemyBattleMoveUseLimit } from '@/utilities/skills/unlocks'
import { incrementUserActivityResult } from '@/utilities/user-state'
import {
  getSeenPokemonOptions,
  getVsSeekerTrainerHealingItemId,
  getVsSeekerTrainerLevel,
  VS_SEEKER_HELD_BERRY_CHANCE,
} from '@/utilities/vs-seeker'

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
  playerTrainerItems?: TrainerBattleItemConfig[]
  enemyTrainerItems?: TrainerBattleItemConfig[]
  playerTrainerItemLastUsedTurn?: number
  enemyTrainerItemLastUsedTurn?: number
}

interface BattleBetsStoredState
  extends Omit<
    BattleBetsPublicState,
    'femaleOdds' | 'maleOdds' | 'rewardSummary' | 'battle'
  > {
  femaleChance: number
  maleChance: number
  wagerActionId?: string
  lastTurnActionId?: string
  settled?: boolean
  fixture: BattleBetsFixture
}

interface TrainerItemRuntime {
  items?: TrainerBattleItemConfig[]
  lastUsedTurn?: number
}

interface SimulatedBattle {
  winner: BattleBetsSide
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

function isSupportedSessionPhase(
  phase: string,
): phase is BattleBetsStoredState['phase'] {
  return phase === 'inspect' || phase === 'battle' || phase === 'result'
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

function getTokenBalance(user: User): number {
  return Math.max(
    0,
    Math.floor(
      (user.currency as Record<string, number> | null | undefined)?.[
        'fun-tokens'
      ] || 0,
    ),
  )
}

function createBattleBetsRewardSummary(payout: number): RewardSummary {
  return {
    xp: {},
    items: [],
    pokemon: [],
    currency: [{ type: 'fun-tokens', quantity: payout }],
    cards: [],
    tasksCompleted: [],
    taskExitModals: [],
    banners: [],
    icons: [],
    titles: [],
    upgrades: [],
    notices: [],
    researchXp: [],
    researchBreakthroughs: [],
    eggs: [],
  }
}

function toPublicState(state: BattleBetsStoredState): BattleBetsPublicState {
  const game = getBattleBetsGame()
  const houseEdge = game?.settings.houseEdge ?? 0.05
  return {
    gameId: state.gameId,
    sessionId: state.sessionId,
    tokenBalance: state.tokenBalance,
    phase: state.phase,
    femaleTeam: state.femaleTeam,
    maleTeam: state.maleTeam,
    femaleOdds: calculateBattleBetsDecimalOdds({
      selectedProbability: state.femaleChance,
      houseEdge,
    }),
    maleOdds: calculateBattleBetsDecimalOdds({
      selectedProbability: state.maleChance,
      houseEdge,
    }),
    selectedSide: state.selectedSide,
    stake: state.stake,
    potentialPayout: state.potentialPayout,
    won: state.phase === 'result' ? state.won : undefined,
    payout: state.phase === 'result' ? state.payout : undefined,
    rewardSummary:
      state.phase === 'result' && state.settled && state.won && state.payout
        ? createBattleBetsRewardSummary(state.payout)
        : undefined,
    battle: state.phase === 'inspect' ? undefined : state.fixture.battleState,
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
    background: '/backgrounds/game-corner.avif',
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
      banner: 'celadon-game-corner',
      title: 'Shadow Champ',
    },
    enemyTrainer: {
      name: 'Rocket Grunt M',
      icon: '/sprites/trainers/rocket-grunt-m.avif',
      banner: 'celadon-game-corner',
      title: 'Shadow Champ',
    },
  }

  initializeEnemyAiMoveLoadouts({
    state: battleState,
    profile: 'advanced',
    random,
  })
  initializeEnemyAiMoveLoadouts({
    state: mirrorBattleBetsBattleState(battleState),
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
    playerTrainerItems: normalizeTrainerBattleItems(femaleConfig.trainerItems),
    enemyTrainerItems: normalizeTrainerBattleItems(maleConfig.trainerItems),
  }
}

function orientFixtureForBackedSide(
  fixture: BattleBetsFixture,
  side: BattleBetsSide,
): BattleBetsFixture {
  if (side === 'female') return fixture

  return {
    battleState: mirrorBattleBetsBattleState(fixture.battleState),
    playerTrainerItems: fixture.enemyTrainerItems,
    enemyTrainerItems: fixture.playerTrainerItems,
    playerTrainerItemLastUsedTurn: fixture.enemyTrainerItemLastUsedTurn,
    enemyTrainerItemLastUsedTurn: fixture.playerTrainerItemLastUsedTurn,
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
  side: 'player' | 'enemy'
  trainerItemRuntime: TrainerItemRuntime
  random: () => number
}): PvpMove {
  const view =
    params.side === 'player'
      ? mirrorBattleBetsBattleState(params.state)
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
  options: { random?: () => number } = {},
): Promise<SimulatedBattle> {
  const random = options.random ?? Math.random
  let state = structuredClone(fixture.battleState)
  const playerItems: TrainerItemRuntime = {
    items: structuredClone(fixture.playerTrainerItems),
  }
  const enemyItems: TrainerItemRuntime = {
    items: structuredClone(fixture.enemyTrainerItems),
  }
  while (state.status === 'ongoing' && state.turn <= MAX_BATTLE_TURNS) {
    const playerMove = chooseSideMove({
      state,
      side: 'player',
      trainerItemRuntime: playerItems,
      random,
    })
    const enemyMove = chooseSideMove({
      state,
      side: 'enemy',
      trainerItemRuntime: enemyItems,
      random,
    })
    state = await resolvePvpTurn(state, playerMove, enemyMove, {
      persist: false,
      random,
    })
  }

  const winner =
    state.status === 'won'
      ? 'female'
      : state.status === 'lost'
        ? 'male'
        : getFallbackWinner(state, random)
  return { winner }
}

async function resolveNextBattleBetsTurn(
  fixture: BattleBetsFixture,
  random: () => number = Math.random,
): Promise<boolean> {
  let state = fixture.battleState
  if (state.status !== 'ongoing') {
    return true
  }

  const playerItems: TrainerItemRuntime = {
    items: fixture.playerTrainerItems,
    lastUsedTurn: fixture.playerTrainerItemLastUsedTurn,
  }
  const enemyItems: TrainerItemRuntime = {
    items: fixture.enemyTrainerItems,
    lastUsedTurn: fixture.enemyTrainerItemLastUsedTurn,
  }
  const playerMove = chooseSideMove({
    state,
    side: 'player',
    trainerItemRuntime: playerItems,
    random,
  })
  const enemyMove = chooseSideMove({
    state,
    side: 'enemy',
    trainerItemRuntime: enemyItems,
    random,
  })

  state = await resolvePvpTurn(state, playerMove, enemyMove, {
    persist: false,
    random,
  })
  fixture.battleState = state
  fixture.playerTrainerItems = playerItems.items
  fixture.enemyTrainerItems = enemyItems.items
  fixture.playerTrainerItemLastUsedTurn = playerItems.lastUsedTurn
  fixture.enemyTrainerItemLastUsedTurn = enemyItems.lastUsedTurn

  if (state.status === 'won' || state.status === 'lost') return true
  if (state.turn <= MAX_BATTLE_TURNS) return false

  const winner = getFallbackWinner(state, random)
  state.status = winner === 'female' ? 'won' : 'lost'
  state.history.unshift({
    turn: Math.max(1, state.turn - 1),
    playerStance: 'tech',
    enemyStance: 'tech',
    result: winner === 'female' ? 'win' : 'loss',
    damageDealt: 0,
    damageTaken: 0,
    message: `${winner === 'female' ? state.playerName : state.enemyName} takes the judge's decision when the book calls time.`,
  })
  fixture.battleState = state
  return true
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
    side === 'female' ? fixture.playerTrainerItems : fixture.enemyTrainerItems
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
      sessionId: crypto.randomUUID(),
      tokenBalance: getTokenBalance(params.user),
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
    if (
      existing &&
      (!isSupportedSessionPhase(String(existing.phase)) ||
        typeof existing.sessionId !== 'string')
    ) {
      await redis.del(sessionKey(user.id))
      existing = null
    }
    if (existing && getRemainingSessionTtl(existing.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      existing = null
    }
    if (existing?.phase === 'result' && !existing.settled) {
      existing = await settleBattleBetsResult({
        payload,
        user,
        state: existing,
      })
    }
    if (
      existing &&
      (existing.phase === 'battle' ||
        (existing.phase === 'inspect' && !forceReset))
    ) {
      const freshUser = (await payload.findByID({
        collection: 'users',
        id: user.id,
      })) as User
      existing.tokenBalance = getTokenBalance(freshUser)
      await saveLiveSession(user.id, existing)
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

    const created = await createSession({
      user: freshUser,
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
  const { payload, user } = await currentUser()
  if (!user) return null
  let state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
  if (
    state &&
    (!isSupportedSessionPhase(String(state.phase)) ||
      typeof state.sessionId !== 'string')
  ) {
    await redis.del(sessionKey(user.id))
    return null
  }
  if (state && getRemainingSessionTtl(state.expiresAt) <= 0) {
    await redis.del(sessionKey(user.id))
    return null
  }
  if (state) {
    if (state.phase === 'result' && !state.settled) {
      state = await settleBattleBetsResult({ payload, user, state })
    }
    const freshUser = (await payload.findByID({
      collection: 'users',
      id: user.id,
    })) as User
    state.tokenBalance = getTokenBalance(freshUser)
  }
  return state ? toPublicState(state) : null
}

export async function placeBattleBet(
  side: BattleBetsSide,
  stake: number,
  clientActionId: string,
): Promise<StateActionResult> {
  const { payload, user } = await currentUser()
  if (!user || (side !== 'female' && side !== 'male')) {
    return { success: false, error: 'Invalid wager.' }
  }
  if (!Number.isSafeInteger(stake) || stake < 1) {
    return {
      success: false,
      error: 'Enter a whole-number stake of at least 1 Fun Token.',
    }
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
    if (state?.phase === 'battle' && state.wagerActionId === clientActionId) {
      const response: StateActionResult = {
        success: true,
        state: toPublicState(state),
      }
      await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
      return response
    }
    if (state?.phase !== 'inspect') {
      return { success: false, error: 'There is no open wager.' }
    }
    if (getRemainingSessionTtl(state.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      return {
        success: false,
        error: 'That matchup has expired. Start a new game.',
      }
    }

    const freshUser = (await payload.findByID({
      collection: 'users',
      id: user.id,
    })) as User
    const tokenBalance = getTokenBalance(freshUser)
    if (stake > tokenBalance) {
      return {
        success: false,
        error: 'You do not have enough Fun Tokens for that stake.',
      }
    }
    const game = getBattleBetsGame()
    if (!game) return { success: false, error: 'Battle Bets is unavailable.' }
    const selectedProbability =
      side === 'female' ? state.femaleChance : state.maleChance
    const potentialPayout = calculateBattleBetsPayout({
      stake,
      selectedProbability,
      houseEdge: game.settings.houseEdge ?? 0.05,
    })
    const currency = {
      ...((freshUser.currency as Record<string, number>) || {}),
      'fun-tokens': tokenBalance - stake,
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { currency },
    })

    const next: BattleBetsStoredState = {
      ...state,
      phase: 'battle',
      selectedSide: side,
      stake,
      potentialPayout,
      tokenBalance: tokenBalance - stake,
      wagerActionId: clientActionId,
      fixture: orientFixtureForBackedSide(state.fixture, side),
    }
    if (!(await saveLiveSession(user.id, next))) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          currency: {
            ...((freshUser.currency as Record<string, number>) || {}),
            'fun-tokens': tokenBalance,
          },
        },
      })
      return {
        success: false,
        error: 'That matchup expired before the wager could be placed.',
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

async function settleBattleBetsResult(params: {
  payload: Awaited<ReturnType<typeof getPayload>>
  user: User
  state: BattleBetsStoredState
}): Promise<BattleBetsStoredState> {
  if (params.state.phase !== 'result' || params.state.settled) {
    return params.state
  }

  const receiptKey = actionResultKey(
    params.user.id,
    'settlement',
    params.state.sessionId,
  )
  const existingReceipt = await getIdempotentResult<{
    tokenBalance: number
    payout: number
    won: boolean
    activityRecorded: boolean
  }>(receiptKey)
  if (existingReceipt) {
    if (!existingReceipt.activityRecorded) {
      await setIdempotentResult(
        receiptKey,
        { ...existingReceipt, activityRecorded: true },
        SESSION_TTL_SECONDS,
      )
      await incrementUserActivityResult(
        params.payload as any,
        params.user.id,
        'gameResults',
        GAME_ID,
        existingReceipt.won ? { wins: 1 } : { losses: 1 },
      )
    }
    const restored = {
      ...params.state,
      won: existingReceipt.won,
      payout: existingReceipt.payout,
      tokenBalance: existingReceipt.tokenBalance,
      settled: true,
    }
    await saveLiveSession(params.user.id, restored)
    return restored
  }

  const won =
    params.state.fixture.battleState.status === 'won' &&
    params.state.won === true
  const payout = won ? Math.max(0, params.state.payout || 0) : 0
  const freshUser = (await params.payload.findByID({
    collection: 'users',
    id: params.user.id,
  })) as User
  let tokenBalance = getTokenBalance(freshUser)

  if (won && payout > 0) {
    tokenBalance += payout
    await params.payload.update({
      collection: 'users',
      id: params.user.id,
      data: {
        currency: {
          ...((freshUser.currency as Record<string, number>) || {}),
          'fun-tokens': tokenBalance,
        },
      },
    })
  }

  await setIdempotentResult(
    receiptKey,
    { tokenBalance, payout, won, activityRecorded: false },
    SESSION_TTL_SECONDS,
  )
  await setIdempotentResult(
    receiptKey,
    { tokenBalance, payout, won, activityRecorded: true },
    SESSION_TTL_SECONDS,
  )
  await incrementUserActivityResult(
    params.payload as any,
    params.user.id,
    'gameResults',
    GAME_ID,
    won ? { wins: 1 } : { losses: 1 },
  )

  const settled = {
    ...params.state,
    won,
    payout,
    tokenBalance,
    settled: true,
  }
  await saveLiveSession(params.user.id, settled)
  return settled
}

export async function advanceBattleBetsBattle(
  clientActionId: string,
): Promise<StateActionResult> {
  const { payload, user } = await currentUser()
  if (!user) return { success: false, error: 'Not authenticated' }
  if (!isValidClientActionId(clientActionId)) {
    return { success: false, error: 'Invalid battle request.' }
  }
  const rateLimit = await checkRateLimit(user.id, 'battle-turn', 120)
  if (rateLimit) return rateLimit
  const resultKey = actionResultKey(user.id, 'battle-turn', clientActionId)
  const cached = await getIdempotentResult<StateActionResult>(resultKey)
  if (cached) return cached
  const lock = await acquireActionLock(`lock:battle-bets:${user.id}`, 30)
  if (!lock.acquired) {
    return { success: false, error: 'The next turn is already resolving.' }
  }
  try {
    const repeated = await getIdempotentResult<StateActionResult>(resultKey)
    if (repeated) return repeated
    const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (!state || (state.phase !== 'battle' && state.phase !== 'result')) {
      return { success: false, error: 'There is no active battle.' }
    }
    if (getRemainingSessionTtl(state.expiresAt) <= 0) {
      await redis.del(sessionKey(user.id))
      return {
        success: false,
        error: 'That battle has expired.',
      }
    }
    if (state.lastTurnActionId === clientActionId) {
      const replayed =
        state.phase === 'result'
          ? await settleBattleBetsResult({ payload, user, state })
          : state
      const response: StateActionResult = {
        success: true,
        state: toPublicState(replayed),
      }
      await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
      return response
    }
    if (state.phase === 'result') {
      const settled = await settleBattleBetsResult({ payload, user, state })
      const response: StateActionResult = {
        success: true,
        state: toPublicState(settled),
      }
      await setIdempotentResult(resultKey, response, SESSION_TTL_SECONDS)
      return response
    }

    const completed = await resolveNextBattleBetsTurn(state.fixture)
    let next = state
    if (completed) {
      const won = state.fixture.battleState.status === 'won'
      const selectedProbability =
        state.selectedSide === 'female' ? state.femaleChance : state.maleChance
      const game = getBattleBetsGame()
      const payout = calculateBattleBetsSettlement({
        won,
        stake: state.stake || 0,
        selectedProbability,
        houseEdge: game?.settings.houseEdge ?? 0.05,
      })
      next = {
        ...state,
        phase: 'result',
        won,
        payout,
        settled: false,
      }
    }
    next = { ...next, lastTurnActionId: clientActionId }
    if (!(await saveLiveSession(user.id, next))) {
      return {
        success: false,
        error: 'That battle has expired.',
      }
    }
    if (next.phase === 'result') {
      next = await settleBattleBetsResult({ payload, user, state: next })
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

export async function clearBattleBetsResult(): Promise<
  ActionFailure | { success: true }
> {
  const { user } = await currentUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  const lock = await acquireActionLock(`lock:battle-bets:${user.id}`, 30)
  if (!lock.acquired) {
    return { success: false, error: 'That result is still being settled.' }
  }
  try {
    const state = await redis.get<BattleBetsStoredState>(sessionKey(user.id))
    if (state?.phase === 'battle') {
      return {
        success: false,
        error: 'The active wager must finish before leaving.',
      }
    }
    await redis.del(sessionKey(user.id))
    return { success: true }
  } finally {
    await releaseActionLock(lock)
  }
}
