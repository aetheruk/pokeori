'use server'

import { randomInt, randomUUID } from 'node:crypto'
import { allGames, type TcgBattleGameConfig } from '@/data/games'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redis } from '@/utilities/redis'
import {
  canSideChargeEnergy,
  arrangeOpponentTcgBattleCards,
  applyTcgBattleEnergyDiscards,
  applyTcgBattleStatusConditions,
  canSideTakeTcgBattleAction,
  canTcgBattleEndByPassStall,
  clearTcgBattleControlStatus,
  clearTcgBattleStatuses,
  clearTcgBattleTemporaryEffects,
  chooseTcgBattleAttackChoice,
  chooseOpponentTcgBattleAttack,
  compactTcgBattleBoard,
  createTcgBattleCardState,
  drawTcgBattleCards,
  doesTcgBattleConditionPass,
  getAllowedTcgBattleAttackCost,
  getEffectiveTcgBattleAttackCost,
  getTcgBattleAttackEffect,
  getTcgBattleCount,
  getValidTcgBattleTargets,
  getTcgBattleCardUnlockTurnForCard,
  getAvailableTcgBattleDeckPokemon,
  getTcgBattleDeckSearchMaxCount,
  getOpenTcgBattleBenchSlots,
  getNextTcgBattleTurnNumber,
  normalizeTcgBattleEnergyType,
  tickTcgBattleIncomingAttackModifiers,
  getTcgBattleTiebreakWinner,
  getTcgBattleWinner,
  flipTcgBattleSide,
  resolveTcgBattleAttack,
  resolveTcgBattleStatusAttackCheck,
  TCG_BATTLE_FORMATS,
  validateTcgBattleDeck,
  validateTcgBattleAttackChoice,
  isTcgBattleAttackDisabled,
  toTcgPvpPerspectiveState,
  type TcgBattleAttackChoice,
  type TcgBattleCardState,
  type TcgBattleCardSummary,
  type TcgBattleDeckFormat,
  type TcgBattleEnergyDiscardResolution,
  type TcgBattleEnergyType,
  type TcgBattleSide,
  type TcgBattleStatusCondition,
  type TcgBattleState,
  type TcgBattleTrainerCard,
  type TcgPvpSharedBattleState,
} from '@/utilities/tcg/tcg-battle'
import { getTcgCardSeriesById } from '@/utilities/tcg/tcg'
import {
  acquireActionLock,
  checkActionRateLimit,
  releaseActionLock,
} from '@/utilities/game-integrity'
import {
  getUser,
  type GameActivityState,
  type GameActivityCompletionResult,
} from '@/app/(frontend)/game/_shared/activity-actions'
import { completeGame, startGame } from '@/app/(frontend)/game/games/actions'
import {
  getUserInventoryMap,
  getUserTcgMap,
  incrementUserActivityResult,
} from '@/utilities/user-state'
import { KID_MODE_ACCESS_ERROR } from '@/utilities/kid-mode'

type TcgBattleActionResult =
  | {
      success: true
      state: TcgBattleState
      completion?: GameActivityCompletionResult
    }
  | { success: false; error: string }

type WithoutId<T> = T extends { id: string } ? Omit<T, 'id'> : never

const BATTLE_TTL_SECONDS = 60 * 60
const GAME_TTL_SECONDS = 60 * 60
const PVP_QUEUE_TTL_SECONDS = 5 * 60
const PVP_ACTION_TIMEOUT_MS = 2 * 60 * 1000
const PVP_RESULT_TTL_SECONDS = 60 * 60
const PVP_LOBBY_PREFIX = 'tcg:pvp:lobby:'
const PVP_QUEUE_PREFIX = 'tcg:pvp:queue:'
const PVP_QUEUE_MEMBER_PREFIX = 'tcg:pvp:queue-member:'
const PVP_STATUS_PREFIX = 'tcg:pvp:status:'
const PVP_MATCH_PREFIX = 'tcg:pvp:match:'
const PVP_BATTLE_PREFIX = 'tcg:pvp:battle:'
const PVP_RESULT_PREFIX = 'tcg:pvp:result:'

function battleKey(userId: string) {
  return `tcg-battle:${userId}`
}

function lockKey(userId: string) {
  return `lock:tcg-battle:${userId}`
}

type TcgPvpStatus = {
  status: 'lobby' | 'queued' | 'matched' | 'battle' | 'finished'
  encounterId: string
  code?: string
  matchId?: string
}

type TcgPvpLobby = {
  code: string
  encounterId: string
  hostUserId: string
  createdAt: number
}

type TcgPvpMatch = {
  matchId: string
  encounterId: string
  participantIds: [string, string]
  createdAt: number
}

type ValidatedTcgPvpDeck = {
  cards: Awaited<ReturnType<typeof validateTcgBattleDeck>>['cards']
  energy?: TcgBattleEnergyType
  trainer: TcgBattleTrainerCard
}

function pvpStatusKey(userId: string) {
  return `${PVP_STATUS_PREFIX}${userId}`
}

function pvpMatchKey(matchId: string) {
  return `${PVP_MATCH_PREFIX}${matchId}`
}

function pvpBattleKey(matchId: string) {
  return `${PVP_BATTLE_PREFIX}${matchId}`
}

function pvpResultKey(matchId: string, userId: string) {
  return `${PVP_RESULT_PREFIX}${matchId}:${userId}`
}

function pvpQueueKey(encounterId: string) {
  return `${PVP_QUEUE_PREFIX}${encounterId}`
}

function pvpQueueMemberKey(encounterId: string, userId: string) {
  return `${PVP_QUEUE_MEMBER_PREFIX}${encounterId}:${userId}`
}

function isTcgPvpEncounter(
  encounter: TcgBattleGameConfig,
): encounter is TcgBattleGameConfig & {
  settings: TcgBattleGameConfig['settings'] & { battleMode: 'pvp' }
} {
  return encounter.settings.battleMode === 'pvp'
}

async function withTcgPvpLock<T>(matchId: string, action: () => Promise<T>) {
  const lock = await acquireActionLock(`lock:tcg:pvp:${matchId}`, 12)
  if (!lock.acquired) {
    throw new Error('Another TCG PVP action is already being processed.')
  }
  try {
    return await action()
  } finally {
    await releaseActionLock(lock)
  }
}

async function loadTcgPvpStatus(userId: string) {
  return (await redis.get(pvpStatusKey(userId))) as TcgPvpStatus | null
}

async function loadTcgPvpSharedState(matchId: string) {
  return (await redis.get(
    pvpBattleKey(matchId),
  )) as TcgPvpSharedBattleState | null
}

async function rejectTcgBattleStart(userId: string, error: string) {
  // startGameActivity creates the parent research session before the TCG
  // battle-specific validation runs. Clear that session when the deck cannot
  // satisfy this battle so the failed launch cannot trap the user in it.
  await redis.del(`game:${userId}`)
  return { success: false as const, error }
}

async function withTcgBattleLock<T>(userId: string, action: () => Promise<T>) {
  const lock = await acquireActionLock(lockKey(userId), 10)
  if (!lock.acquired)
    throw new Error('Another TCG battle action is already being processed.')
  try {
    return await action()
  } finally {
    await releaseActionLock(lock)
  }
}

async function getActiveTcgBattleEncounter(
  userId: string,
  encounterId?: string,
) {
  const researchState = (await redis.get(
    `game:${userId}`,
  )) as GameActivityState | null
  if (!researchState) throw new Error('No active research encounter.')
  if (encounterId && researchState.encounterId !== encounterId) {
    throw new Error('Invalid TCG battle encounter.')
  }

  const encounter = allGames.find(
    (game) => game.id === researchState.encounterId,
  ) as TcgBattleGameConfig | undefined
  if (encounter?.gameType !== 'tcg-battle') {
    throw new Error('Active encounter is not a TCG battle.')
  }

  await redis.expire(`game:${userId}`, GAME_TTL_SECONDS)
  return encounter
}

async function loadState(userId: string): Promise<TcgBattleState> {
  const state = (await redis.get(battleKey(userId))) as TcgBattleState | null
  if (!state) throw new Error('No active TCG battle.')
  return state
}

async function saveState(state: TcgBattleState): Promise<TcgBattleState> {
  state.updatedAt = Date.now()
  const winner =
    state.phase === 'battle' || state.phase === 'promotion'
      ? getTcgBattleWinner(state)
      : null
  if (winner) {
    state.phase = 'finished'
    state.winner = winner
  }
  await redis.set(battleKey(state.userId), state, { ex: BATTLE_TTL_SECONDS })
  return state
}

type StoredGenerationDeckEntry = Partial<
  Record<TcgBattleDeckFormat, { cards: string[]; energy?: TcgBattleEnergyType }>
>

function normalizeDecksByGeneration(
  value: unknown,
): Record<string, StoredGenerationDeckEntry> {
  const raw = (value || {}) as Record<string, unknown>
  const result: Record<string, StoredGenerationDeckEntry> = {}
  for (const [generation, generationDecks] of Object.entries(raw)) {
    if (!generation || !generationDecks || typeof generationDecks !== 'object')
      continue
    const decks = generationDecks as Record<string, unknown>
    const normalizeEntry = (
      format: TcgBattleDeckFormat,
    ): { cards: string[]; energy?: TcgBattleEnergyType } => {
      const formatValue = decks[format]
      if (Array.isArray(formatValue)) {
        return {
          cards: formatValue.filter(
            (id): id is string => typeof id === 'string',
          ),
        }
      }
      if (!formatValue || typeof formatValue !== 'object') return { cards: [] }
      const formatEntry = formatValue as Record<string, unknown>
      return {
        cards: Array.isArray(formatEntry.cards)
          ? formatEntry.cards.filter(
              (id): id is string => typeof id === 'string',
            )
          : [],
        energy: normalizeTcgBattleEnergyType(formatEntry.energy) || undefined,
      }
    }
    result[generation] = {
      baby: normalizeEntry('baby'),
      champions: normalizeEntry('champions'),
      masters: normalizeEntry('masters'),
    }
  }
  return result
}

async function validateTcgPvpDeckForUser(
  userId: string,
  encounter: TcgBattleGameConfig,
  knownUser?: any,
): Promise<
  | { success: true; deck: ValidatedTcgPvpDeck }
  | { success: false; error: string }
> {
  const payload = await getPayload({ config: configPromise })
  const user =
    knownUser ||
    (await payload
      .findByID({ collection: 'users', id: userId })
      .catch(() => null))
  if (!user) return { success: false, error: 'Trainer not found.' }
  if (user.kidMode === true) {
    return { success: false, error: KID_MODE_ACCESS_ERROR }
  }

  const [collection, inventory] = await Promise.all([
    getUserTcgMap(payload as any, userId),
    getUserInventoryMap(payload as any, userId),
  ])
  if ((inventory['deck-box'] || 0) <= 0) {
    return { success: false, error: 'Deck Box required.' }
  }

  const { deckFormat: format, requiredSeries } = encounter.settings
  const decksByGeneration = normalizeDecksByGeneration(
    (user as any).tcgDecksByGeneration,
  )
  const selectedDeck = decksByGeneration[requiredSeries]?.[format]
  if (!selectedDeck) {
    return {
      success: false,
      error: `Set up a ${TCG_BATTLE_FORMATS[format].label} deck for ${requiredSeries} first.`,
    }
  }
  if (
    selectedDeck.cards.some(
      (cardId) => getTcgCardSeriesById(cardId) !== requiredSeries,
    )
  ) {
    return {
      success: false,
      error: `Your deck must use only ${requiredSeries} cards.`,
    }
  }

  const validation = await validateTcgBattleDeck(
    selectedDeck.cards,
    collection,
    format,
  )
  if (!validation.valid) {
    return { success: false, error: validation.errors.join(' ') }
  }

  return {
    success: true,
    deck: {
      cards: validation.cards,
      energy: selectedDeck.energy,
      trainer: {
        name: user.trainerName || 'Trainer',
        icon: user.icon,
        banner: user.banner,
        title: user.title,
      },
    },
  }
}

async function assertPreparedTcgPvp(
  userId: string,
  encounterId: string,
  knownUser?: any,
) {
  const session = (await redis.get(
    `game:${userId}`,
  )) as GameActivityState | null
  if (!session || session.encounterId !== encounterId) {
    return {
      success: false as const,
      error: 'Open this TCG PVP table from Explore before matchmaking.',
    }
  }
  const encounter = allGames.find((game) => game.id === encounterId) as
    | TcgBattleGameConfig
    | undefined
  if (encounter?.gameType !== 'tcg-battle') {
    return { success: false as const, error: 'Invalid TCG PVP table.' }
  }
  if (!isTcgPvpEncounter(encounter)) {
    return { success: false as const, error: 'Invalid TCG PVP table.' }
  }
  const deck = await validateTcgPvpDeckForUser(userId, encounter, knownUser)
  if (!deck.success) return deck
  await redis.expire(`game:${userId}`, GAME_TTL_SECONDS)
  return { success: true as const, encounter, deck: deck.deck }
}

async function initializeTcgPvpMatch(
  encounter: TcgBattleGameConfig,
  firstUserId: string,
  secondUserId: string,
) {
  const [firstValidation, secondValidation] = await Promise.all([
    assertPreparedTcgPvp(firstUserId, encounter.id),
    assertPreparedTcgPvp(secondUserId, encounter.id),
  ])
  if (!firstValidation.success) return firstValidation
  if (!secondValidation.success) return secondValidation

  const firstUserStarts = randomInt(0, 2) === 0
  const canonicalPlayerId = firstUserStarts ? firstUserId : secondUserId
  const canonicalOpponentId = firstUserStarts ? secondUserId : firstUserId
  const canonicalPlayerDeck = firstUserStarts
    ? firstValidation.deck
    : secondValidation.deck
  const canonicalOpponentDeck = firstUserStarts
    ? secondValidation.deck
    : firstValidation.deck
  const matchId = `tcg_pvp_${randomUUID()}`
  const now = Date.now()
  const startingEnergy =
    TCG_BATTLE_FORMATS[encounter.settings.deckFormat].startingEnergy
  const state: TcgPvpSharedBattleState = {
    userId: canonicalPlayerId,
    encounterId: encounter.id,
    battleMode: 'pvp',
    matchId,
    participantIds: {
      player: canonicalPlayerId,
      opponent: canonicalOpponentId,
    },
    format: encounter.settings.deckFormat,
    phase: 'arranging',
    turnNumber: 1,
    activeSide: 'player',
    player: {
      deck: canonicalPlayerDeck.cards,
      hand: drawTcgBattleCards(canonicalPlayerDeck.cards, 6),
      front: [],
      back: [],
      discard: [],
      energy: startingEnergy,
      selectedEnergy: canonicalPlayerDeck.energy,
    },
    opponent: {
      deck: canonicalOpponentDeck.cards,
      hand: drawTcgBattleCards(canonicalOpponentDeck.cards, 6),
      front: [],
      back: [],
      discard: [],
      energy: startingEnergy,
      selectedEnergy: canonicalOpponentDeck.energy,
    },
    consecutivePasses: 0,
    log: ['Both collectors are arranging their opening cards.'],
    playerTrainer: canonicalPlayerDeck.trainer,
    enemyTrainer: canonicalOpponentDeck.trainer,
    ready: { player: false, opponent: false },
    revision: 1,
    deadlineAt: now + PVP_ACTION_TIMEOUT_MS,
    startedAt: now,
    updatedAt: now,
  }
  const match: TcgPvpMatch = {
    matchId,
    encounterId: encounter.id,
    participantIds: [canonicalPlayerId, canonicalOpponentId],
    createdAt: now,
  }

  await Promise.all([
    redis.set(pvpMatchKey(matchId), match, { ex: BATTLE_TTL_SECONDS }),
    redis.set(pvpBattleKey(matchId), state, { ex: BATTLE_TTL_SECONDS }),
    redis.set(
      pvpStatusKey(firstUserId),
      {
        status: 'matched',
        encounterId: encounter.id,
        matchId,
      } satisfies TcgPvpStatus,
      { ex: BATTLE_TTL_SECONDS },
    ),
    redis.set(
      pvpStatusKey(secondUserId),
      {
        status: 'matched',
        encounterId: encounter.id,
        matchId,
      } satisfies TcgPvpStatus,
      { ex: BATTLE_TTL_SECONDS },
    ),
  ])

  return { success: true as const, matchId }
}

function getTcgBattleTrainerCards(
  user: any,
  encounter: TcgBattleGameConfig,
): { playerTrainer: TcgBattleTrainerCard; enemyTrainer: TcgBattleTrainerCard } {
  const formatLabel =
    TCG_BATTLE_FORMATS[encounter.settings.deckFormat]?.label ||
    encounter.settings.deckFormat
  return {
    playerTrainer: {
      name: user?.trainerName || 'Player',
      icon: user?.icon,
      banner: user?.banner,
      title: user?.title,
    },
    enemyTrainer: {
      name: encounter.name,
      icon: 'ditto',
      banner: '/backgrounds/tcg.avif',
      title: `${formatLabel} TCG Battle`,
    },
  }
}

function findCard(cards: TcgBattleCardState[], instanceId: string) {
  return cards.find(
    (card) => card.instanceId === instanceId && card.currentHp > 0,
  )
}

function toTcgBattleCardSummary(card: TcgBattleCardState): TcgBattleCardSummary {
  const {
    instanceId: _instanceId,
    currentHp: _currentHp,
    statusConditions: _statusConditions,
    incomingAttackModifier: _incomingAttackModifier,
    temporaryEffects: _temporaryEffects,
    markers: _markers,
    ...summary
  } = card
  return summary
}

function shuffleTcgBattleDeck(side: TcgBattleState['player']) {
  for (let index = side.deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const card = side.deck[index]
    side.deck[index] = side.deck[swapIndex]
    side.deck[swapIndex] = card
  }
}

function promoteOpponentIfNeeded(state: TcgBattleState) {
  compactTcgBattleBoard(state.opponent)
  while (state.opponent.front.length < 3 && state.opponent.back.length > 0) {
    const [promoted] = state.opponent.back.splice(0, 1)
    state.opponent.front.push(promoted)
    state.log.unshift(`${promoted.name} moved to the opponent front row.`)
  }
}

function requirePlayerPromotionIfNeeded(state: TcgBattleState) {
  compactTcgBattleBoard(state.player)
  if (state.player.front.length < 3 && state.player.back.length > 0) {
    state.pendingPromotion = 'player'
    state.phase = 'promotion'
  }
}

function finishByStallIfNeeded(state: TcgBattleState) {
  if (canTcgBattleEndByPassStall(state)) {
    state.phase = 'finished'
    state.winner = getTcgBattleTiebreakWinner(state)
  }
}

function advanceTurn(state: TcgBattleState, nextSide: TcgBattleSide) {
  for (const sideKey of ['player', 'opponent'] as const) {
    for (const card of [...state[sideKey].front, ...state[sideKey].back]) {
      const effect = card.temporaryEffects?.attackDamageTakenBuff
      if (!effect || effect.sourceSide !== state.activeSide) continue
      effect.remainingTurns -= 1
      if (effect.remainingTurns <= 0) delete card.temporaryEffects?.attackDamageTakenBuff
    }
  }
  for (const sideKey of ['player', 'opponent'] as const) {
    for (const card of [...state[sideKey].front, ...state[sideKey].back]) {
      const history = card.temporaryEffects?.lastNightEyesAttackBySide
      if (!history?.[state.activeSide]) continue
      history[state.activeSide] = (history[state.activeSide] || 0) - 1
      if ((history[state.activeSide] || 0) <= 0) delete history[state.activeSide]
      if (Object.keys(history).length === 0) delete card.temporaryEffects?.lastNightEyesAttackBySide
    }
  }
  for (const sideKey of ['player', 'opponent'] as const) {
    for (const card of [...state[sideKey].front, ...state[sideKey].back]) {
      const history = card.temporaryEffects?.lastAttackHitBySide
      if (!history?.[state.activeSide]) continue
      history[state.activeSide] = (history[state.activeSide] || 0) - 1
      if ((history[state.activeSide] || 0) <= 0) delete history[state.activeSide]
      if (Object.keys(history).length === 0) delete card.temporaryEffects?.lastAttackHitBySide
    }
  }
  for (const card of [...state[state.activeSide].front, ...state[state.activeSide].back]) {
    delete card.temporaryEffects?.lastIncomingAttackDamage
  }
  state.turnNumber = getNextTcgBattleTurnNumber(
    state.turnNumber,
    state.activeSide,
    nextSide,
  )
  state.activeSide = nextSide
  tickTcgBattleIncomingAttackModifiers(state, nextSide)
}

function clearDamageEvents(state: TcgBattleState) {
  state.lastDamageEvent = undefined
  state.lastDamageEvents = []
  state.lastCoinFlipEvent = undefined
  state.lastCoinFlipEvents = []
  state.lastStatusEvent = undefined
  state.lastStatusEvents = []
  state.lastEffectEvents = []
}

function recordDamageEvent(
  state: TcgBattleState,
  event: Omit<NonNullable<TcgBattleState['lastDamageEvents']>[number], 'id'>,
) {
  const damageEvent = {
    id: crypto.randomUUID(),
    ...event,
  }
  state.lastDamageEvent = damageEvent
  state.lastDamageEvents = [...(state.lastDamageEvents || []), damageEvent]
}

function applyAttackDamageToCard(
  state: TcgBattleState,
  attackerSide: TcgBattleSide,
  sourceId: string,
  targetSide: TcgBattleSide,
  target: TcgBattleCardState,
  damage: number,
) {
  if (damage <= 0) return

  let enduredKnockout = false
  if (
    targetSide !== attackerSide &&
    target.temporaryEffects?.endure &&
    target.currentHp - damage <= 0
  ) {
    const result = Math.random() >= 0.5 ? 'heads' : 'tails'
    recordCoinFlipEvent(state, {
      sourceId: target.instanceId,
      side: targetSide,
      results: [result],
      heads: result === 'heads' ? 1 : 0,
      tails: result === 'tails' ? 1 : 0,
    })
    if (result === 'heads') {
      target.currentHp = 10
      enduredKnockout = true
      state.log.unshift(`${target.name} endured the knockout and held on with 10 HP.`)
    }
    delete target.temporaryEffects.endure
  }
  if (!enduredKnockout) target.currentHp = Math.max(0, target.currentHp - damage)
  recordDamageEvent(state, {
    sourceId,
    targetId: target.instanceId,
    targetSide,
    damage,
    reason: 'attack',
  })
}

function recordCoinFlipEvent(
  state: TcgBattleState,
  event: Omit<NonNullable<TcgBattleState['lastCoinFlipEvents']>[number], 'id'>,
) {
  const coinFlipEvent = {
    id: crypto.randomUUID(),
    ...event,
  }
  state.lastCoinFlipEvent = coinFlipEvent
  state.lastCoinFlipEvents = [
    ...(state.lastCoinFlipEvents || []),
    coinFlipEvent,
  ]
}

function recordStatusEvent(
  state: TcgBattleState,
  event: Omit<NonNullable<TcgBattleState['lastStatusEvents']>[number], 'id'>,
) {
  const statusEvent = {
    id: crypto.randomUUID(),
    ...event,
  }
  state.lastStatusEvent = statusEvent
  state.lastStatusEvents = [...(state.lastStatusEvents || []), statusEvent]
}

function recordStatusEvents(
  state: TcgBattleState,
  events: Omit<NonNullable<TcgBattleState['lastStatusEvents']>[number], 'id'>[],
) {
  for (const event of events) recordStatusEvent(state, event)
}

function recordEffectEvent(
  state: TcgBattleState,
  event: WithoutId<NonNullable<TcgBattleState['lastEffectEvents']>[number]>,
) {
  state.lastEffectEvents = [
    ...(state.lastEffectEvents || []),
    { id: crypto.randomUUID(), ...event } as NonNullable<
      TcgBattleState['lastEffectEvents']
    >[number],
  ]
}

function getTemporaryEffects(card: TcgBattleCardState) {
  card.temporaryEffects ||= {}
  return card.temporaryEffects
}

function recordTcgBattleAttackHit(card: TcgBattleCardState, sideKey: TcgBattleSide) {
  const history = getTemporaryEffects(card).lastAttackHitBySide || {}
  history[sideKey] = 2
  getTemporaryEffects(card).lastAttackHitBySide = history
}

function clearSourceLinkedControlsForInactiveSources(state: TcgBattleState) {
  for (const sideKey of ['player', 'opponent'] as const) {
    const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
    for (const affectedCard of [...state[opponentKey].front, ...state[opponentKey].back]) {
      const effects = affectedCard.temporaryEffects
      const retreatSourceId = effects?.cannotRetreat?.sourceId
      if (
        retreatSourceId &&
        !state[sideKey].front.some((card) => card.instanceId === retreatSourceId && card.currentHp > 0)
      ) delete effects?.cannotRetreat
      const switchSourceId = effects?.cannotSwitch?.sourceId
      if (
        switchSourceId &&
        !state[sideKey].front.some((card) => card.instanceId === switchSourceId && card.currentHp > 0)
      ) delete effects?.cannotSwitch
    }
  }
}

function swapTcgBattleCards(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  frontCard: TcgBattleCardState,
  benchCardId: string,
) {
  if (frontCard.temporaryEffects?.cannotSwitch) return false
  const side = state[sideKey]
  const frontIndex = side.front.findIndex(
    (card) => card.instanceId === frontCard.instanceId,
  )
  const benchIndex = side.back.findIndex(
    (card) => card.instanceId === benchCardId && card.currentHp > 0,
  )
  if (frontIndex < 0 || benchIndex < 0) return false
  const replacement = side.back[benchIndex]
  clearTcgBattleStatuses(frontCard)
  clearTcgBattleTemporaryEffects(frontCard)
  const opponentSide = state[sideKey === 'player' ? 'opponent' : 'player']
  for (const card of [...opponentSide.front, ...opponentSide.back]) {
    if (card.temporaryEffects?.cannotTarget?.targetId === frontCard.instanceId) {
      delete card.temporaryEffects.cannotTarget
    }
    if (card.temporaryEffects?.cannotRetreat?.sourceId === frontCard.instanceId) delete card.temporaryEffects.cannotRetreat
    if (card.temporaryEffects?.cannotSwitch?.sourceId === frontCard.instanceId) delete card.temporaryEffects.cannotSwitch
  }
  side.front[frontIndex] = replacement
  side.back[benchIndex] = frontCard
  recordEffectEvent(state, {
    kind: 'switch',
    side: sideKey,
    sourceId: frontCard.instanceId,
    targetId: replacement.instanceId,
  })
  return true
}

function applyTcgBattleSpecialEffects(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  target: TcgBattleCardState
  paidAttackCost: number
  choice?: TcgBattleAttackChoice
  resolution: ReturnType<typeof resolveTcgBattleAttack>
  blockTargetEffects: boolean
}) {
  const { state, sideKey, attacker, target, paidAttackCost, resolution, blockTargetEffects } =
    params
  const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
  const choice =
    resolution.copiedAttackName && params.choice?.kind === 'copiedAttack'
      ? params.choice.followUp
      : params.choice

  if (resolution.copiedAttackName) {
    recordEffectEvent(state, {
      kind: 'copy',
      sourceId: attacker.instanceId,
      targetId: target.instanceId,
      label: resolution.copiedAttackName,
    })
  }

  for (const rule of resolution.specialEffects || []) {
    const targetsOpponent =
      [
        'disableAttack',
        'blockTargeting',
        'swapDamageCounters',
        'returnTargetToHand',
        'knockOutTarget',
        'changeWeakness',
        'changeType',
        'placeMarker',
        'attackFailsOnTails',
        'preventSwitch',
        'buffDefendingPokemon',
        'transferDamageCounters',
        'transferDamageCountersFromOwnSide',
        'transferAllDamageCounters',
        'shuffleTargetIntoDeck',
      ].includes(rule.kind) ||
      (rule.kind === 'switch' && rule.target === 'opponent') ||
      (rule.kind === 'preventRetreat' && (rule.target || 'opponent') === 'opponent') ||
      (rule.kind === 'cannotAttack' && rule.target !== 'self') ||
      (rule.kind === 'buffAttack' && rule.target === 'opponent') ||
      (rule.kind === 'drawCards' && rule.target === 'opponent') ||
      (rule.kind === 'shuffleRandomHandCardIntoDeck' && rule.target === 'opponent') ||
      (rule.kind === 'discardRandomHandCard' && rule.target === 'opponent') ||
      (rule.kind === 'revealHand' && rule.target === 'opponent') ||
      (rule.kind === 'millCards' && rule.target === 'opponent') ||
      (rule.kind === 'clearStatus' && rule.target === 'opponent') ||
      (rule.kind === 'clearStatusOnSide' && rule.side === 'opponent') ||
      (rule.kind === 'setStatus' && rule.target === 'opponent') ||
      (rule.kind === 'preventStatus' && rule.target === 'opponent')
    if (blockTargetEffects && targetsOpponent) continue

    if (rule.kind === 'revealTopDeckPokemon') {
      const destination = state[sideKey]
      const inUseIds = new Set(
        [...destination.hand, ...destination.front, ...destination.back, ...destination.discard].map((card) => card.id),
      )
      const available = destination.deck.filter((card) => !inUseIds.has(card.id))
      const revealed = drawTcgBattleCards(available, rule.amount)
      const eligibleSubtypes = new Set(rule.includeSubtypes.map((subtype) => subtype.toLowerCase()))
      let addedToHand = 0
      for (const pokemon of revealed) {
        if (pokemon.subtypes.some((subtype) => eligibleSubtypes.has(subtype.toLowerCase()))) {
          destination.hand.push(pokemon)
          addedToHand += 1
        } else {
          destination.discard.push(pokemon)
        }
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: `Revealed ${revealed.length} Pokémon and added ${addedToHand} Team Plasma Pokémon to your hand`,
      })
      continue
    }

    if (rule.kind === 'searchDeckPokemon' && (choice?.kind === 'deckPokemon' || rule.random)) {
      const destination = state[sideKey]
      const availableCards = getAvailableTcgBattleDeckPokemon(destination, rule)
      const availableById = new Map(availableCards.map((card) => [card.id, card]))
      const maxCount = Math.min(
        getTcgBattleDeckSearchMaxCount({ state, sideKey, attacker, target, rule }),
        rule.destination === 'hand' ? Number.POSITIVE_INFINITY : getOpenTcgBattleBenchSlots(destination),
      )
      const selectedIds = choice?.kind === 'deckPokemon'
        ? choice.cardIds.slice(0, maxCount)
        : drawTcgBattleCards(availableCards, maxCount).map((card) => card.id)
      for (const [index, cardId] of selectedIds.entries()) {
        const cardSummary = availableById.get(cardId)
        if (!cardSummary) continue
        const newPokemon = createTcgBattleCardState(cardSummary, destination.back.length + destination.hand.length + index)
        if (rule.treatAsBasic) newPokemon.subtypes = ['Basic']
        if (rule.damageCountersOnSearch) {
          newPokemon.currentHp = Math.max(0, newPokemon.currentHp - rule.damageCountersOnSearch * 10)
        }
        if (rule.destination === 'hand') destination.hand.push(newPokemon)
        else destination.back.push(newPokemon)
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: newPokemon.instanceId,
          label: rule.destination === 'hand' ? `${newPokemon.name} joined your hand` : `${newPokemon.name} joined the Bench`,
        })
      }
      continue
    }

    if (rule.kind === 'drawCards') {
      if (!doesTcgBattleConditionPass(rule.condition, resolution.coinFlips)) continue
      if (
        rule.requiresDiscardChoice &&
        !(
          choice?.kind === 'discardHandCards' &&
          choice.cardIds.some((cardId) => state[sideKey].discard.some((card) => card.instanceId === cardId))
        )
      ) continue
      const destinationSideKey = rule.target === 'self' ? sideKey : opponentKey
      const destination = state[destinationSideKey]
      if (rule.shuffleHandIntoDeck) {
        destination.deck.push(...destination.hand.map(toTcgBattleCardSummary))
        destination.hand = []
        shuffleTcgBattleDeck(destination)
      }
      const units = rule.source
        ? getTcgBattleCount(rule.source, { state, sideKey, attacker, target, paidAttackCost, coinMode: 'actual' }) + (
            rule.source.kind === 'energy' && (rule.source.side === 'own' || rule.source.side === 'both')
              ? paidAttackCost
              : 0
          )
        : 0
      const amount = typeof rule.untilHandSize === 'number'
        ? Math.max(0, rule.untilHandSize - destination.hand.length)
        : Math.max(
            0,
            (rule.amount || 0) +
              (rule.amountPerHead || 0) * (resolution.coinFlips?.heads || 0) +
              (rule.amountPerUnit || 0) * units,
          )
      const inUseIds = new Set(
        [...destination.hand, ...destination.front, ...destination.back, ...destination.discard].map((card) => card.id),
      )
      const available = destination.deck.filter((card) => !inUseIds.has(card.id))
      const drawn = drawTcgBattleCards(available, amount)
      destination.hand.push(...drawn)
      if (drawn.length > 0 || rule.shuffleHandIntoDeck) {
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: attacker.instanceId,
          label: rule.shuffleHandIntoDeck
            ? `${destination === state[sideKey] ? 'Your' : "Opponent's"} hand was shuffled and ${drawn.length} Pokémon drawn`
            : `${destination === state[sideKey] ? 'You' : 'Opponent'} drew ${drawn.length} Pokémon`,
        })
      }
      continue
    }

    if (rule.kind === 'shuffleRandomHandCardIntoDeck') {
      const destinationSideKey = rule.target === 'self' ? sideKey : opponentKey
      const destination = state[destinationSideKey]
      const count = rule.amountPerHead === undefined
        ? 1
        : rule.amountPerHead * (resolution.coinFlips?.heads || 0)
      for (let discarded = 0; discarded < count && destination.hand.length > 0; discarded += 1) {
        const index = Math.floor(Math.random() * destination.hand.length)
        const [shuffledCard] = destination.hand.splice(index, 1)
        destination.deck.push(toTcgBattleCardSummary(shuffledCard))
        shuffleTcgBattleDeck(destination)
        const handOwner = destinationSideKey === sideKey ? 'your' : "your opponent's"
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: shuffledCard.instanceId,
          label: rule.revealSelected
            ? `${shuffledCard.name} was revealed from ${handOwner} hand and shuffled into their deck`
            : `A Pokémon was shuffled from ${handOwner} hand into their deck`,
        })
      }
      continue
    }

    if (rule.kind === 'discardRandomHandCard') {
      if (!doesTcgBattleConditionPass(rule.condition, resolution.coinFlips)) continue
      const destinationSideKey = rule.target === 'self' ? sideKey : opponentKey
      const destination = state[destinationSideKey]
      const discardCount = typeof rule.untilHandSize === 'number'
        ? Math.max(0, destination.hand.length - rule.untilHandSize)
        : rule.amount !== undefined
          ? rule.amount
        : rule.amountPerHead !== undefined
          ? rule.amountPerHead * (resolution.coinFlips?.heads || 0)
          : rule.amountPerTail
            ? rule.amountPerTail * (resolution.coinFlips?.tails || 0)
            : 1
      for (let count = 0; count < discardCount && destination.hand.length > 0; count += 1) {
        const index = Math.floor(Math.random() * destination.hand.length)
        const [discardedCard] = destination.hand.splice(index, 1)
        destination.discard.push(discardedCard)
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: discardedCard.instanceId,
          label: `${discardedCard.name} was discarded from the ${destinationSideKey === sideKey ? 'attacker' : 'opponent'}'s hand`,
        })
      }
      continue
    }

    if (rule.kind === 'discardSelectedHandPokemon' && choice?.kind === 'discardHandCards') {
      const selectedIds = new Set(choice.cardIds)
      const discarded = state[sideKey].hand.filter((card) => selectedIds.has(card.instanceId))
      state[sideKey].hand = state[sideKey].hand.filter((card) => !selectedIds.has(card.instanceId))
      state[sideKey].discard.push(...discarded)
      if (discarded.length > 0) {
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: attacker.instanceId,
          label: `${discarded.map((card) => card.name).join(', ')} discarded from the attacker's hand`,
        })
      }
      continue
    }

    if (rule.kind === 'recoverRandomPokemonFromDiscardToHand') {
      const discard = state[sideKey].discard
      const recoverCount = Math.min(rule.amountPerHead * (resolution.coinFlips?.heads || 0), discard.length)
      const recovered: TcgBattleCardState[] = []
      for (let index = 0; index < recoverCount; index += 1) {
        const cardIndex = Math.floor(Math.random() * discard.length)
        recovered.push(...discard.splice(cardIndex, 1))
      }
      if (recovered.length > 0) {
        state[sideKey].hand.push(...recovered)
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: recovered[0].instanceId,
          label: `${recovered.map((card) => card.name).join(', ')} returned from the discard pile to your hand`,
        })
      }
      continue
    }

    if (rule.kind === 'recoverPokemonFromDiscardToHand' && choice?.kind === 'discardPokemonToHand') {
      if (!doesTcgBattleConditionPass(rule.condition, resolution.coinFlips)) continue
      const discard = state[sideKey].discard
      const selectedIds = choice.cardIds || (choice.cardId ? [choice.cardId] : [])
      const maxCount = rule.maxCount ?? 1
      const recovered: TcgBattleCardState[] = []
      for (const cardId of selectedIds.slice(0, maxCount)) {
        const card = discard.find((entry) => entry.instanceId === cardId)
        const eligible = card &&
          (!rule.includeSubtypes?.length || rule.includeSubtypes.some((subtype) => card.subtypes.includes(subtype))) &&
          (!rule.includeNames?.length || rule.includeNames.includes(card.name)) &&
          (!rule.includeTypes?.length || rule.includeTypes.some((type) => card.types.includes(type)))
        if (!card || !eligible) continue
        discard.splice(discard.indexOf(card), 1)
        recovered.push(card)
      }
      if (recovered.length > 0) {
        state[sideKey].hand.push(...recovered)
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: recovered[0].instanceId,
          label: `${recovered.map((card) => card.name).join(', ')} returned from the discard pile to the attacker's hand`,
        })
      }
      continue
    }

    if (rule.kind === 'returnOwnBenchToHand' && choice?.kind === 'benchSwitch') {
      const cardIndex = state[sideKey].back.findIndex(
        (card) => card.instanceId === choice.cardId && card.currentHp > 0,
      )
      if (cardIndex < 0) continue
      const [card] = state[sideKey].back.splice(cardIndex, 1)
      clearTcgBattleTemporaryEffects(card)
      clearTcgBattleStatuses(card)
      card.currentHp = card.hp
      card.markers = undefined
      state[sideKey].hand.push(card)
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: card.instanceId,
        label: `${card.name} returned from the Bench to your hand`,
      })
      continue
    }

    if (rule.kind === 'returnOwnPokemonToDeck') {
      const cardIndex = state[sideKey].front.findIndex((card) => card.instanceId === attacker.instanceId)
      if (cardIndex < 0) continue
      const [card] = state[sideKey].front.splice(cardIndex, 1)
      state[sideKey].deck.push(toTcgBattleCardSummary(card))
      shuffleTcgBattleDeck(state[sideKey])
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: `${card.name} was shuffled into your deck`,
      })
      continue
    }

    if (rule.kind === 'returnTargetToHand') {
      const cardIndex = state[opponentKey].front.findIndex(
        (card) => card.instanceId === target.instanceId && card.currentHp > 0,
      )
      if (cardIndex < 0) continue
      const [card] = state[opponentKey].front.splice(cardIndex, 1)
      clearTcgBattleTemporaryEffects(card)
      clearTcgBattleStatuses(card)
      card.currentHp = card.hp
      card.markers = undefined
      state[opponentKey].hand.push(card)
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: card.instanceId,
        label: `${card.name} returned to the opponent's hand`,
      })
      continue
    }

    if (
      rule.kind === 'knockOutTarget' &&
      target.currentHp > 0 &&
      (!rule.requiresAnyTargetStatus || Boolean(target.statusConditions?.length))
    ) {
      target.currentHp = 0
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.name} was Knocked Out`,
      })
      continue
    }

    if (rule.kind === 'transferDamageCounters') {
      if (choice?.kind !== 'damageCounterTransfer' || !choice.sourceCardId) continue
      const ownCards = rule.sourceZone === 'bench'
        ? state[sideKey].back
        : [...state[sideKey].front, ...state[sideKey].back]
      const source = ownCards.find((card) => card.instanceId === choice.sourceCardId && card.currentHp > 0)
      const defendingCard = [...state[opponentKey].front, ...state[opponentKey].back]
        .find((card) => card.instanceId === target.instanceId && card.currentHp > 0)
      if (!source || !defendingCard) continue
      const availableCounters = Math.max(0, Math.floor((source.hp - source.currentHp) / 10))
      const movedCounters = Math.min(rule.maxCounters, availableCounters)
      if (movedCounters <= 0) continue
      const damage = movedCounters * 10
      source.currentHp = Math.min(source.hp, source.currentHp + damage)
      defendingCard.currentHp = Math.max(0, defendingCard.currentHp - damage)
      recordDamageEvent(state, {
        sourceId: attacker.instanceId,
        targetId: defendingCard.instanceId,
        targetSide: opponentKey,
        damage,
        reason: 'attack',
      })
      recordTcgBattleAttackHit(defendingCard, sideKey)
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: source.instanceId,
        label: `Moved ${movedCounters} damage counter${movedCounters === 1 ? '' : 's'} from ${source.name} to ${defendingCard.name}`,
      })
      continue
    }

    if (rule.kind === 'transferDamageCountersFromOwnSide') {
      const defendingCard = [...state[opponentKey].front, ...state[opponentKey].back]
        .find((card) => card.instanceId === target.instanceId && card.currentHp > 0)
      if (!defendingCard) continue
      for (const source of [...state[sideKey].front, ...state[sideKey].back]) {
        if (source.currentHp <= 0) continue
        const availableCounters = Math.max(0, Math.floor((source.hp - source.currentHp) / 10))
        const movedCounters = Math.min(rule.maxCountersPerPokemon, availableCounters)
        if (movedCounters <= 0) continue
        const damage = movedCounters * 10
        source.currentHp = Math.min(source.hp, source.currentHp + damage)
        defendingCard.currentHp = Math.max(0, defendingCard.currentHp - damage)
        recordDamageEvent(state, {
          sourceId: attacker.instanceId,
          targetId: defendingCard.instanceId,
          targetSide: opponentKey,
          damage,
          reason: 'attack',
        })
        recordTcgBattleAttackHit(defendingCard, sideKey)
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: source.instanceId,
          label: `Moved ${movedCounters} damage counter${movedCounters === 1 ? '' : 's'} from ${source.name} to ${defendingCard.name}`,
        })
      }
      continue
    }

    if (rule.kind === 'shuffleTargetIntoDeck') {
      if (!doesTcgBattleConditionPass(rule.condition, resolution.coinFlips)) continue
      if (rule.requiresOpponentBench && state[opponentKey].back.every((card) => card.currentHp <= 0)) continue
      const defendingSide = state[opponentKey]
      const targetZone = rule.targetZone === 'bench' ? defendingSide.back : defendingSide.front
      const targetIndex = targetZone.findIndex((card) => card.instanceId === target.instanceId)
      if (targetIndex < 0) continue
      const [card] = targetZone.splice(targetIndex, 1)
      defendingSide.deck.push(toTcgBattleCardSummary(card))
      shuffleTcgBattleDeck(defendingSide)
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.name} was shuffled into the opposing deck`,
      })
      continue
    }

    if (rule.kind === 'shuffleDiscardPokemonIntoDeck') {
      const discard = state[sideKey].discard
      const count = Math.min(rule.maxCount, discard.length)
      for (let index = 0; index < count; index += 1) {
        const cardIndex = Math.floor(Math.random() * discard.length)
        const [card] = discard.splice(cardIndex, 1)
        state[sideKey].deck.push(toTcgBattleCardSummary(card))
      }
      if (count > 0) {
        shuffleTcgBattleDeck(state[sideKey])
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: attacker.instanceId,
          label: `${count} Pokémon returned from your discard pile to your deck`,
        })
      }
      continue
    }

    if (rule.kind === 'revealHand') {
      const destinationSideKey = rule.target === 'self' ? sideKey : opponentKey
      const destination = state[destinationSideKey]
      const cardNames = destination.hand.map((card) => card.name)
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: cardNames.length > 0
          ? `${destinationSideKey === sideKey ? 'Attacker' : 'Opponent'} revealed: ${cardNames.join(', ')}`
          : `${destinationSideKey === sideKey ? 'Attacker' : 'Opponent'} has no cards in hand to reveal`,
      })
      continue
    }

    if (rule.kind === 'millCards') {
      if (!doesTcgBattleConditionPass(rule.condition, resolution.coinFlips)) continue
      if (rule.requiresOptionalChoice && !(choice?.kind === 'optionalBonus' && choice.enabled)) continue
      const destinationSideKey = rule.target === 'self' ? sideKey : opponentKey
      const destination = state[destinationSideKey]
      const inUseIds = new Set(
        [...destination.hand, ...destination.front, ...destination.back, ...destination.discard].map((card) => card.id),
      )
      const available = destination.deck.filter((card) => !inUseIds.has(card.id))
      const sourceUnits = rule.source
        ? getTcgBattleCount(rule.source, { state, sideKey, attacker, target, paidAttackCost, coinMode: 'actual' })
        : 0
      const amount = Math.min(
        available.length,
        rule.amount +
          (rule.amountPerHead || 0) * (resolution.coinFlips?.heads || 0) +
          (rule.amountPerOwnEnergy || 0) * state[sideKey].energy +
          (rule.amountPerUnit || 0) * sourceUnits,
      )
      const milled = drawTcgBattleCards(available, amount)
      destination.discard.push(...milled)
      if (milled.length > 0) {
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: attacker.instanceId,
          label: `${milled.length} Pokémon discarded from the ${destinationSideKey === sideKey ? 'attacker' : 'opponent'}'s deck`,
        })
      }
      continue
    }

    if (rule.kind === 'switch' && rule.beforeDamage) continue
    if (rule.kind === 'switch' && rule.ifTargetSurvives && target.currentHp <= 0) continue
    if (
      rule.kind === 'switch' &&
      rule.ifCounterDamage &&
      !resolution.counterDamage?.some((hit) => hit.targetId === target.instanceId && hit.damage > 0)
    ) continue
    if (rule.kind === 'switch' && choice?.kind === 'benchSwitch') {
      const switched = swapTcgBattleCards(
        state,
        rule.target === 'self' ? sideKey : opponentKey,
        rule.target === 'self' ? attacker : target,
        choice.cardId,
      )
      if (switched)
        state.log.unshift(
          `${rule.target === 'self' ? attacker.name : target.name} switched with a benched card.`,
        )
      if (switched && rule.poisonAfterSwitch) {
        const switchedTargetId = state[opponentKey].front.find(
          (card) => card.instanceId === choice.cardId,
        )?.instanceId
        if (switchedTargetId) {
          const statusEvents = applyTcgBattleStatusConditions(
            state,
            sideKey,
            attacker.instanceId,
            switchedTargetId,
            [{ target: 'opponent', statuses: ['poisoned'] }],
          )
          recordStatusEvents(state, statusEvents.map(({ id: _id, ...event }) => event))
        }
      }
      continue
    }
    if (rule.kind === 'disableAttack' && choice?.kind === 'disabledAttack') {
      if (rule.targetBasicOnly && !target.subtypes.includes('Basic')) continue
      getTemporaryEffects(target).disabledAttack = {
        attackIndex: choice.attackIndex,
        remainingTurns: 2,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.attacks[choice.attackIndex]?.name || 'Attack'} disabled`,
      })
      continue
    }
    if (rule.kind === 'buffAttack') {
      if (!doesTcgBattleConditionPass(rule.condition, resolution.coinFlips)) continue
      const affected = rule.target === 'opponent'
        ? target
        : rule.target === 'switchedOwn' && choice?.kind === 'benchSwitch'
          ? state[sideKey].front.find((card) => card.instanceId === choice.cardId) || attacker
          : attacker
      getTemporaryEffects(affected).nextAttackBuff = {
        attackName: rule.attackNames?.length ? (rule.attackName || '') : (rule.attackName || '*'),
        attackNames: rule.attackNames,
        baseDamage: rule.baseDamage,
        damageBonus: rule.damageBonus,
        damageMultiplier: rule.damageMultiplier,
        selfDamageMultiplier: rule.selfDamageMultiplier,
        remainingTurns: 2,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: affected.instanceId,
        label: `${rule.attackName || rule.attackNames?.join(' or ') || 'Next attack'} empowered`,
      })
      continue
    }
    if (rule.kind === 'buffDefendingPokemon') {
      getTemporaryEffects(target).attackDamageTakenBuff = {
        sourceSide: sideKey,
        damageBonus: rule.damageBonus,
        remainingTurns: 2,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.name} will take ${rule.damageBonus} extra damage from the next attack`,
      })
      continue
    }
    if (rule.kind === 'blockTargeting') {
      if (rule.targetMaxHpAtMost !== undefined && target.hp > rule.targetMaxHpAtMost) continue
      getTemporaryEffects(target).cannotTarget = {
        targetId: attacker.instanceId,
        remainingTurns: 2,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `Cannot target ${attacker.name}`,
      })
      continue
    }
    if (rule.kind === 'cannotAttack') {
      const affected = rule.target === 'self' ? attacker : target
      getTemporaryEffects(affected).cannotAttack = { remainingTurns: 2 }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: affected.instanceId,
        label: `${affected.name} cannot attack next turn`,
      })
      continue
    }
    if (rule.kind === 'preventStatus') {
      const affected = rule.target === 'self'
        ? choice?.kind === 'benchSwitch'
          ? state[sideKey].front.find((card) => card.instanceId === choice.cardId) || attacker
          : attacker
        : target
      getTemporaryEffects(affected).preventStatusConditions = {
        statuses: rule.statuses,
        remainingTurns: rule.whileActive ? 99 : 2,
        whileActive: rule.whileActive,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: affected.instanceId,
        label: `${affected.name} is protected from ${rule.statuses.join(', ')}`,
      })
      continue
    }
    if (rule.kind === 'clearStatus') {
      const affected = rule.target === 'self' ? attacker : target
      affected.statusConditions = (affected.statusConditions || []).filter(
        (status) => !rule.statuses.includes(status),
      )
      if (affected.statusConditions.length === 0) affected.statusConditions = undefined
      continue
    }
    if (rule.kind === 'clearStatusOnSide') {
      const affectedSide = rule.side === 'own' ? state[sideKey] : state[opponentKey]
      for (const affected of affectedSide.front) {
        affected.statusConditions = (affected.statusConditions || []).filter(
          (status) => !rule.statuses.includes(status),
        )
        if (affected.statusConditions.length === 0) affected.statusConditions = undefined
      }
      continue
    }
    if (rule.kind === 'setStatus') {
      const affected = rule.target === 'self' ? attacker : target
      affected.statusConditions = [...new Set([...(affected.statusConditions || []), ...rule.statuses])]
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: affected.instanceId,
        label: `${affected.name} is now ${rule.statuses.join(', ')}`,
      })
      continue
    }
    if (rule.kind === 'preventRetreat') {
      const retreatTarget = rule.target === 'self' ? attacker : target
      getTemporaryEffects(retreatTarget).cannotRetreat = rule.untilSourceLeaves
        ? { remainingTurns: 99, sourceId: attacker.instanceId, untilSourceLeaves: true }
        : rule.untilTargetLeaves
          ? { remainingTurns: 99, untilTargetLeaves: true }
          : { remainingTurns: 2, sourceId: rule.sourceLeavesClears ? attacker.instanceId : undefined }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.name} cannot retreat next turn`,
      })
      continue
    }
    if (rule.kind === 'preventSwitch') {
      getTemporaryEffects(target).cannotSwitch = {
        remainingTurns: 2,
        sourceId: rule.sourceLeavesClears ? attacker.instanceId : undefined,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.name} cannot be switched next turn`,
      })
      continue
    }
    if (rule.kind === 'endure') {
      getTemporaryEffects(attacker).endure = { remainingTurns: 1 }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: `${attacker.name} will endure a knockout`,
      })
      continue
    }
    if (rule.kind === 'attackFailsOnTails') {
      getTemporaryEffects(target).attackFailsOnTails = true
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${target.name}'s next attack can fail`,
      })
      continue
    }
    if (rule.kind === 'disableSelfAttack') {
      const attackIndex = attacker.attacks.findIndex(
        (candidate) => candidate.name.toLowerCase() === rule.attackName.toLowerCase(),
      )
      if (attackIndex >= 0) {
        getTemporaryEffects(attacker).disabledAttack = { attackIndex, remainingTurns: 2 }
        recordEffectEvent(state, {
          kind: 'control',
          sourceId: attacker.instanceId,
          targetId: attacker.instanceId,
          label: `${rule.attackName} disabled next turn`,
        })
      }
      continue
    }
    if (rule.kind === 'grow') {
      const effects = getTemporaryEffects(attacker)
      effects.originalMaxHp ??= attacker.hp
      const newMaxHp = Math.max(attacker.hp, rule.maxHp)
      attacker.currentHp += newMaxHp - attacker.hp
      attacker.hp = newMaxHp
      effects.attackBaseDamageOverrides = [
        ...(effects.attackBaseDamageOverrides || []).filter(
          (entry) => entry.attackName.toLowerCase() !== rule.attackName.toLowerCase(),
        ),
        { attackName: rule.attackName, baseDamage: rule.baseDamage },
      ]
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: `${attacker.name} grew stronger`,
      })
      continue
    }
    if (rule.kind === 'swapDamageCounters') {
      const attackerCounters = Math.max(0, Math.floor((attacker.hp - attacker.currentHp) / 10))
      const targetCounters = Math.max(0, Math.floor((target.hp - target.currentHp) / 10))
      const attackerBefore = attacker.currentHp
      const targetBefore = target.currentHp
      attacker.currentHp = Math.max(0, attacker.hp - targetCounters * 10)
      target.currentHp = Math.max(0, target.hp - attackerCounters * 10)
      const attackerDamageAdded = Math.max(0, attackerBefore - attacker.currentHp)
      const targetDamageAdded = Math.max(0, targetBefore - target.currentHp)
      if (attackerDamageAdded > 0) {
        recordDamageEvent(state, {
          sourceId: target.instanceId,
          targetId: attacker.instanceId,
          targetSide: sideKey,
          damage: attackerDamageAdded,
          reason: 'attack',
        })
      }
      if (targetDamageAdded > 0) {
        recordDamageEvent(state, {
          sourceId: attacker.instanceId,
          targetId: target.instanceId,
          targetSide: opponentKey,
          damage: targetDamageAdded,
          reason: 'attack',
        })
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: 'Damage counters swapped',
      })
      continue
    }
    if (rule.kind === 'transferAllDamageCounters') {
      const transferredDamage = Math.max(0, Math.floor((attacker.hp - attacker.currentHp) / 10) * 10)
      if (transferredDamage <= 0) continue
      attacker.currentHp = Math.min(attacker.hp, attacker.currentHp + transferredDamage)
      target.currentHp = Math.max(0, target.currentHp - transferredDamage)
      recordDamageEvent(state, {
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        targetSide: opponentKey,
        damage: transferredDamage,
        reason: 'attack',
      })
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: `${transferredDamage / 10} damage counters moved to ${target.name}`,
      })
      continue
    }
    if (rule.kind === 'reviveDiscardPokemon' && choice?.kind === 'discardPokemon') {
      if (blockTargetEffects && choice.side !== sideKey) continue
      if (rule.side === 'self' && choice.side !== sideKey) continue
      if (rule.side === 'opponent' && choice.side === sideKey) continue
      const destination = state[choice.side]
      const cardIndex = destination.discard.findIndex(
        (card) => card.instanceId === choice.cardId && card.subtypes.includes('Basic'),
      )
      if (cardIndex < 0 || destination.back.length >= 3 || destination.front.length + destination.back.length >= 6) continue
      const [revived] = destination.discard.splice(cardIndex, 1)
      clearTcgBattleTemporaryEffects(revived)
      clearTcgBattleStatuses(revived)
      revived.currentHp = Math.max(1, revived.hp - Math.floor(revived.hp / 20) * 10)
      revived.markers = undefined
      destination.back.push(revived)
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: revived.instanceId,
        label: `${revived.name} returned to the Bench`,
      })
      continue
    }
    if (
      (rule.kind === 'changeWeakness' ||
        rule.kind === 'changeResistance' ||
        rule.kind === 'changeType') &&
      choice?.kind === 'typeChange'
    ) {
      const affected = rule.kind === 'changeResistance' ? attacker : target
      const effects = getTemporaryEffects(affected)
      if (rule.kind === 'changeWeakness') {
        effects.weaknessValue = effects.weaknessType
          ? effects.weaknessValue ?? '×2'
          : affected.weaknesses[0]?.value ?? null
        effects.weaknessType = choice.type
      }
      if (rule.kind === 'changeResistance') effects.resistanceType = choice.type
      if (rule.kind === 'changeType') effects.battleType = choice.type
      recordEffectEvent(state, {
        kind: 'type',
        sourceId: attacker.instanceId,
        targetId: affected.instanceId,
        label: `${choice.type} ${rule.kind.replace('change', '').toLowerCase()}`,
      })
      continue
    }
    if (rule.kind === 'textureMagic' && choice?.kind === 'textureMagic') {
      if (choice.resistanceType)
        getTemporaryEffects(attacker).resistanceType = choice.resistanceType
      if (choice.weaknessType && !blockTargetEffects)
        getTemporaryEffects(target).weaknessType = choice.weaknessType
      recordEffectEvent(state, {
        kind: 'type',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: 'Texture Magic',
      })
      continue
    }
    if (rule.kind === 'destinyBond') {
      getTemporaryEffects(attacker).destinyBond = { remainingTurns: 1 }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: 'Destiny Bond',
      })
      continue
    }
    if (rule.kind === 'discardEnergyOnKnockout') {
      getTemporaryEffects(attacker).discardEnergyOnKnockout = { remainingTurns: 1 }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: 'Little Grudge',
      })
      continue
    }
    if (rule.kind === 'reflectDamage') {
      getTemporaryEffects(attacker).reflectDamage = {
        remainingTurns: 1,
        damageMultiplier: rule.damageMultiplier,
        reflectFixedDamage: rule.reflectFixedDamage,
        coinGate: rule.coinGate,
      }
      recordEffectEvent(state, {
        kind: 'control',
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        label: rule.reflectFixedDamage ? 'Spike Armor' : rule.damageMultiplier === 2 ? 'Crosscounter' : 'Mirror Shell',
      })
      continue
    }
    if (rule.kind === 'placeMarker') {
      target.markers = Array.from(
        new Set([...(target.markers || []), rule.marker]),
      )
      recordEffectEvent(state, {
        kind: 'marker',
        sourceId: attacker.instanceId,
        targetId: target.instanceId,
        label: rule.marker === 'shockWave' ? 'Shock-wave marker' : 'Lightning Rod',
      })
    }
  }
}

function formatEnergyDiscardSummary(
  sideKey: TcgBattleSide,
  energyDiscards: TcgBattleEnergyDiscardResolution[],
) {
  return energyDiscards
    .map((discard) => {
      const label =
        discard.target === 'self'
          ? sideKey === 'player'
            ? 'You'
            : 'Opponent'
          : sideKey === 'player'
            ? 'Opponent'
            : 'You'
      return `${label} discarded ${discard.amount} energy.`
    })
    .join(' ')
}

function formatStatusNames(statuses: TcgBattleStatusCondition[]) {
  return statuses
    .map((status) => status.charAt(0).toUpperCase() + status.slice(1))
    .join(', ')
}

function applyEndOfRoundStatusDamage(state: TcgBattleState) {
  for (const sideKey of ['player', 'opponent'] as const) {
    for (const card of state[sideKey].front.filter(
      (frontCard) => frontCard.currentHp > 0,
    )) {
      const statuses = card.statusConditions || []
      const damage =
        (statuses.includes('poisoned') ? 10 : 0) +
        (statuses.includes('burned') ? 10 : 0)
      if (damage <= 0) continue

      card.currentHp = Math.max(0, card.currentHp - damage)
      recordDamageEvent(state, {
        sourceId: card.instanceId,
        targetId: card.instanceId,
        targetSide: sideKey,
        damage,
        reason: 'status',
      })
      state.log.unshift(`${card.name} took ${damage} poison/burn damage.`)
    }
  }
  clearSourceLinkedControlsForInactiveSources(state)
}

function finishOpponentTurn(state: TcgBattleState) {
  applyEndOfRoundStatusDamage(state)
  promoteOpponentIfNeeded(state)
  const winner = getTcgBattleWinner(state)
  if (winner) {
    state.phase = 'finished'
    state.winner = winner
    return
  }
  requirePlayerPromotionIfNeeded(state)
  if (state.pendingPromotion) return
  advanceTurn(state, 'player')
  finishByStallIfNeeded(state)
}

function applyAttack(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  attackIndex: number,
  target: TcgBattleCardState,
  choice?: TcgBattleAttackChoice,
) {
  const side = state[sideKey]
  const attack = attacker.attacks[attackIndex]
  if (!attack) throw new Error('Invalid attack.')
  if (isTcgBattleAttackDisabled(attacker, attackIndex)) {
    throw new Error(`${attack.name} is disabled this turn.`)
  }

  const energyCost = getEffectiveTcgBattleAttackCost(state, attack)
  if (energyCost > side.energy) throw new Error('Not enough energy.')
  if (energyCost > getAllowedTcgBattleAttackCost(state.turnNumber)) {
    throw new Error('That attack costs too much energy for this turn.')
  }
  const unlockTurn = getTcgBattleCardUnlockTurnForCard(attacker)
  if (state.turnNumber < unlockTurn) {
    throw new Error(`${attacker.name} is locked until turn ${unlockTurn}.`)
  }
  const choiceError = validateTcgBattleAttackChoice({
    state,
    sideKey,
    attacker,
    attack,
    target,
    choice,
    paidAttackCost: energyCost,
  })
  if (choiceError) throw new Error(choiceError)

  const defendingSide = sideKey === 'player' ? 'opponent' : 'player'
  const defendingSideTurnNumber = getNextTcgBattleTurnNumber(
    state.turnNumber,
    sideKey,
    defendingSide,
  )
  const damageEventStartIndex = state.lastDamageEvents?.length || 0
  state.lastOpponentAttackKnockout = {
    ...state.lastOpponentAttackKnockout,
    [defendingSide]: { turnNumber: defendingSideTurnNumber, knockedOut: false },
  }

  const statusCheck = resolveTcgBattleStatusAttackCheck(
    attacker,
    Math.random,
    getTcgBattleAttackEffect(attack)?.allowWhileAsleep,
  )
  if (statusCheck.coinFlips) {
    recordCoinFlipEvent(state, {
      sourceId: attacker.instanceId,
      side: sideKey,
      results: statusCheck.coinFlips.results,
      heads: statusCheck.coinFlips.heads,
      tails: statusCheck.coinFlips.tails,
    })
  }
  if (statusCheck.clearedStatus) {
    clearTcgBattleControlStatus(attacker, statusCheck.clearedStatus)
    state.log.unshift(
      `${attacker.name} shook off ${statusCheck.clearedStatus}.`,
    )
  }
  if (!statusCheck.canAttack) {
    if (statusCheck.selfDamage > 0) {
      attacker.currentHp = Math.max(
        0,
        attacker.currentHp - statusCheck.selfDamage,
      )
      recordDamageEvent(state, {
        sourceId: attacker.instanceId,
        targetId: attacker.instanceId,
        targetSide: sideKey,
        damage: statusCheck.selfDamage,
        reason: 'confusion',
      })
    }
    state.consecutivePasses = 0
    const damageSummary =
      statusCheck.selfDamage > 0
        ? ` ${attacker.name} took ${statusCheck.selfDamage} confusion damage.`
        : ''
    state.log.unshift(
      `${sideKey === 'player' ? 'Your' : "Opponent's"} ${attacker.name} could not attack while ${statusCheck.blockedStatus}.${damageSummary}`,
    )
    return
  }

  if (attacker.temporaryEffects?.attackFailsOnTails) {
    const result = Math.random() >= 0.5 ? 'heads' : 'tails'
    const flippingSide = sideKey === 'player' ? 'opponent' : 'player'
    recordCoinFlipEvent(state, {
      sourceId: attacker.instanceId,
      side: flippingSide,
      results: [result],
      heads: result === 'heads' ? 1 : 0,
      tails: result === 'tails' ? 1 : 0,
    })
    if (result === 'tails') {
      state.consecutivePasses = 0
      state.log.unshift(`${attacker.name}'s attack did nothing after a tails flip.`)
      return
    }
  }

  let blockTargetEffects =
    target.incomingAttackModifier?.kind === 'preventAllEffects'
  const beforeDamageSwitch = getTcgBattleAttackEffect(attack)?.special?.find(
    (rule) => rule.kind === 'switch' && rule.beforeDamage,
  )
  if (
    beforeDamageSwitch?.kind === 'switch' &&
    !blockTargetEffects &&
    choice?.kind === 'benchSwitch'
  ) {
    const switchSide = beforeDamageSwitch.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    const switched = swapTcgBattleCards(state, switchSide, target, choice.cardId)
    if (switched) {
      const replacement = state[switchSide].front.find((card) => card.instanceId === choice.cardId)
      if (replacement) target = replacement
    }
  }
  blockTargetEffects = target.incomingAttackModifier?.kind === 'preventAllEffects'
  const targetHadDestinyBond = Boolean(target.temporaryEffects?.destinyBond)
  const targetReflectDamage = target.temporaryEffects?.reflectDamage
  const resolution = resolveTcgBattleAttack({
    state,
    sideKey,
    attacker,
    attack,
    target,
    paidAttackCost: energyCost,
    choice,
  })
  side.energy -= energyCost
  const applicableEnergyDiscards = blockTargetEffects
    ? resolution.energyDiscards?.filter((discard) => discard.target === 'self')
    : resolution.energyDiscards
  applyTcgBattleEnergyDiscards(state, sideKey, applicableEnergyDiscards)
  for (const gain of resolution.energyGains || []) {
    if (
      gain.requiresSourceSurvival &&
      (resolution.selfKnockOut || attacker.currentHp - resolution.selfDamage <= 0)
    ) continue
    const targetSide =
      gain.target === 'self'
        ? sideKey
        : sideKey === 'player'
          ? 'opponent'
          : 'player'
    const before = state[targetSide].energy
    state[targetSide].energy = Math.min(
      TCG_BATTLE_FORMATS[state.format].energyCap,
      before + gain.amount,
    )
    const added = state[targetSide].energy - before
    if (added > 0) {
      recordEffectEvent(state, {
        kind: 'energy',
        side: targetSide,
        sourceId: attacker.instanceId,
        amount: added,
      })
    }
  }
  if (resolution.coinFlips) {
    recordCoinFlipEvent(state, {
      sourceId: attacker.instanceId,
      side: sideKey,
      results: resolution.coinFlips.results,
      heads: resolution.coinFlips.heads,
      tails: resolution.coinFlips.tails,
    })
  }
  const opponentSideKey = sideKey === 'player' ? 'opponent' : 'player'
  const targetSideKey = [...side.front, ...side.back].some((card) => card.instanceId === target.instanceId)
    ? sideKey
    : opponentSideKey
  applyAttackDamageToCard(state, sideKey, attacker.instanceId, targetSideKey, target, resolution.targetDamage)
  if (
    resolution.targetDamage > 0 &&
    target.incomingAttackModifier?.kind === 'coinPreventDamage' &&
    target.incomingAttackModifier.persistent
  ) {
    target.incomingAttackModifier = undefined
  }
  getTemporaryEffects(target).lastIncomingAttackDamage = resolution.targetDamage
  if (attack.name.toLowerCase() === 'night eyes') {
    const history = getTemporaryEffects(target).lastNightEyesAttackBySide || {}
    history[sideKey] = 2
    getTemporaryEffects(target).lastNightEyesAttackBySide = history
  }
  if (resolution.targetDamage > 0 || attack.name.toLowerCase() === 'midnight eyes') {
    recordTcgBattleAttackHit(target, sideKey)
  }
  if (resolution.targetDamage > 0) {
    recordDamageEvent(state, {
      sourceId: attacker.instanceId,
      targetId: target.instanceId,
      targetSide: targetSideKey,
      damage: resolution.targetDamage,
      reason: 'attack',
    })
  }
  if (resolution.benchDamage && resolution.benchDamage.length > 0) {
    for (const benchHit of resolution.benchDamage) {
      const hitCard = [...state[benchHit.targetSide].front, ...state[benchHit.targetSide].back].find(
        (card) => card.instanceId === benchHit.targetId && card.currentHp > 0,
      )
      if (!hitCard) continue
      applyAttackDamageToCard(state, sideKey, attacker.instanceId, benchHit.targetSide, hitCard, benchHit.damage)
      if (benchHit.damage > 0) recordTcgBattleAttackHit(hitCard, sideKey)
    }
  }
  if (resolution.counterDamage && resolution.counterDamage.length > 0) {
    for (const counterHit of resolution.counterDamage) {
      const sideState = state[counterHit.targetSide]
      const allCards = [...sideState.front, ...sideState.back]
      const hitCard = allCards.find(
        (card) => card.instanceId === counterHit.targetId && card.currentHp > 0,
      )
      if (!hitCard) continue
      applyAttackDamageToCard(state, sideKey, attacker.instanceId, counterHit.targetSide, hitCard, counterHit.damage)
      if (counterHit.damage > 0) recordTcgBattleAttackHit(hitCard, sideKey)
    }
  }
  if (resolution.healing && resolution.healing.length > 0) {
    for (const heal of resolution.healing) {
      const sideState = state[heal.targetSide]
      const allCards = [...sideState.front, ...sideState.back]
      const healCard = allCards.find(
        (card) => card.instanceId === heal.targetId && card.currentHp > 0,
      )
      if (!healCard) continue
      const previousHp = healCard.currentHp
      healCard.currentHp = Math.min(
        healCard.hp,
        healCard.currentHp + heal.amount,
      )
      if (healCard.currentHp > previousHp) {
        getTemporaryEffects(healCard).healedTurnNumber = state.turnNumber
        getTemporaryEffects(healCard).healedBySide = sideKey
      }
    }
  }

  let selfDamage = resolution.selfDamage
  if (resolution.selfKnockOut && attacker.currentHp - selfDamage > 0) {
    selfDamage += attacker.currentHp - selfDamage
  }
  if (selfDamage > 0) {
    attacker.currentHp = Math.max(0, attacker.currentHp - selfDamage)
    recordDamageEvent(state, {
      sourceId: attacker.instanceId,
      targetId: attacker.instanceId,
      targetSide: sideKey,
      damage: selfDamage,
      reason: 'self',
    })
  }
  if (resolution.incomingReflectedDamage && attacker.currentHp > 0) {
    const reflected = Math.min(attacker.currentHp, resolution.incomingReflectedDamage)
    attacker.currentHp -= reflected
    recordDamageEvent(state, {
      sourceId: target.instanceId,
      targetId: attacker.instanceId,
      targetSide: sideKey,
      damage: reflected,
      reason: 'self',
    })
  }
  if (
    targetReflectDamage &&
    resolution.targetDamage > 0 &&
    attacker.currentHp > 0
  ) {
    let reflectDamage = true
    if (targetReflectDamage.coinGate) {
      const result = Math.random() >= 0.5 ? 'heads' : 'tails'
      recordCoinFlipEvent(state, {
        sourceId: target.instanceId,
        side: sideKey,
        results: [result],
        heads: result === 'heads' ? 1 : 0,
        tails: result === 'tails' ? 1 : 0,
      })
      reflectDamage = typeof targetReflectDamage.coinGate === 'string'
        ? result === targetReflectDamage.coinGate
        : result === targetReflectDamage.coinGate.result && targetReflectDamage.coinGate.minimum <= 1
    }
    if (reflectDamage) {
      const reflected = Math.min(
        attacker.currentHp,
        targetReflectDamage.reflectFixedDamage ??
          resolution.targetDamage * (targetReflectDamage.damageMultiplier || 1),
      )
      attacker.currentHp -= reflected
      recordDamageEvent(state, {
        sourceId: target.instanceId,
        targetId: attacker.instanceId,
        targetSide: sideKey,
        damage: reflected,
        reason: 'self',
      })
    }
  }
  if (targetHadDestinyBond && target.currentHp <= 0 && attacker.currentHp > 0) {
    const bondedDamage = attacker.currentHp
    attacker.currentHp = 0
    recordDamageEvent(state, {
      sourceId: target.instanceId,
      targetId: attacker.instanceId,
      targetSide: sideKey,
      damage: bondedDamage,
      reason: 'self',
    })
  }
  const statusEvents = applyTcgBattleStatusConditions(
    state,
    sideKey,
    attacker.instanceId,
    target.instanceId,
    blockTargetEffects
      ? resolution.statusConditions?.filter(
          (status) => status.target === 'self',
        )
      : resolution.statusConditions,
  )
  recordStatusEvents(
    state,
    statusEvents.map(({ id: _id, ...event }) => event),
  )
  if (resolution.protection && resolution.protection.length > 0) {
    for (const protection of resolution.protection) {
      const sideState = state[protection.targetSide]
      const allCards = [...sideState.front, ...sideState.back]
      const protectedCard = allCards.find(
        (card) => card.instanceId === protection.targetId && card.currentHp > 0,
      )
      if (!protectedCard) continue
      protectedCard.incomingAttackModifier = protection.modifier
    }
  }
  applyTcgBattleSpecialEffects({
    state,
    sideKey,
    attacker,
    target,
    paidAttackCost: energyCost,
    choice,
    resolution,
    blockTargetEffects,
  })
  const attackDamageEvents = (state.lastDamageEvents || []).slice(damageEventStartIndex)
  const grudgeKnockoutIds = new Set(
    attackDamageEvents
      .filter((event) => event.targetSide === defendingSide && event.reason === 'attack')
      .map((event) => event.targetId),
  )
  for (const grudgeCard of [...state[defendingSide].front, ...state[defendingSide].back]) {
    if (
      !grudgeKnockoutIds.has(grudgeCard.instanceId) ||
      grudgeCard.currentHp > 0 ||
      !grudgeCard.temporaryEffects?.discardEnergyOnKnockout
    ) continue
    delete grudgeCard.temporaryEffects.discardEnergyOnKnockout
    if (side.energy > 0) {
      side.energy -= 1
      state.log.unshift(`${grudgeCard.name}'s Little Grudge discarded 1 Energy from the attacking side.`)
    }
  }
  const defendingCards = [...state[defendingSide].front, ...state[defendingSide].back]
  const knockedOutByAttack = (state.lastDamageEvents || [])
    .slice(damageEventStartIndex)
    .some((event) =>
      event.targetSide === defendingSide &&
      event.reason === 'attack' &&
      defendingCards.some((card) => card.instanceId === event.targetId && card.currentHp <= 0),
    ) || (
      resolution.specialEffects?.some((rule) => rule.kind === 'knockOutTarget') === true &&
      defendingCards.some((card) => card.instanceId === target.instanceId && card.currentHp <= 0)
    )
  state.lastOpponentAttackKnockout = {
    ...state.lastOpponentAttackKnockout,
    [defendingSide]: { turnNumber: defendingSideTurnNumber, knockedOut: knockedOutByAttack },
  }
  clearSourceLinkedControlsForInactiveSources(state)

  if (
    attacker.temporaryEffects?.nextAttackBuff?.attackName === '*' ||
    attacker.temporaryEffects?.nextAttackBuff?.attackName.toLowerCase() === attack.name.toLowerCase() ||
    attacker.temporaryEffects?.nextAttackBuff?.attackNames?.some((name) => name.toLowerCase() === attack.name.toLowerCase())
  ) {
    delete attacker.temporaryEffects.nextAttackBuff
  }
  if (attacker.temporaryEffects?.lastIncomingAttackDamage !== undefined) {
    delete attacker.temporaryEffects.lastIncomingAttackDamage
  }

  state.consecutivePasses = 0
  const coinSummary = resolution.coinFlips
    ? ` after ${resolution.coinFlips.heads} heads and ${resolution.coinFlips.tails} tails`
    : ''
  const selfSummary =
    selfDamage > 0 ? ` ${attacker.name} took ${selfDamage} recoil.` : ''
  const energyDiscardSummary =
    applicableEnergyDiscards && applicableEnergyDiscards.length > 0
      ? ` ${formatEnergyDiscardSummary(sideKey, applicableEnergyDiscards)}`
      : ''
  const statusSummary =
    resolution.statusConditions && resolution.statusConditions.length > 0
      ? ` ${resolution.statusConditions
          .map((status) => {
            const label =
              status.target === 'self'
                ? sideKey === 'player'
                  ? 'Your active Pokemon'
                  : "Opponent's active Pokemon"
                : sideKey === 'player'
                  ? "Opponent's active Pokemon"
                  : 'Your active Pokemon'
            return `${label} is now ${formatStatusNames(status.statuses)}.`
          })
          .join(' ')}`
      : ''
  const healingSummary =
    resolution.healing && resolution.healing.length > 0
      ? ` Healed ${resolution.healing.reduce((sum, heal) => sum + heal.amount, 0)} total HP.`
      : ''
  state.log.unshift(
    `${sideKey === 'player' ? 'You' : 'Opponent'} used ${attacker.name}'s ${attack.name} for ${resolution.targetDamage} damage${coinSummary}.${selfSummary}${energyDiscardSummary}${statusSummary}${healingSummary}`,
  )
}

function runOpponentTurn(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'opponent') return
  const choice = chooseOpponentTcgBattleAttack(state)

  if (!choice) {
    if (canSideChargeEnergy(state, 'opponent')) {
      const gain = TCG_BATTLE_FORMATS[state.format].chargeGain
      const cap = TCG_BATTLE_FORMATS[state.format].energyCap
      const before = state.opponent.energy
      state.opponent.energy = Math.min(cap, state.opponent.energy + gain)
      state.log.unshift(
        `Opponent charged ${state.opponent.energy - before} energy.`,
      )
    } else {
      state.log.unshift('Opponent ended turn.')
    }
    state.consecutivePasses += 1
    finishOpponentTurn(state)
    return
  }

  applyAttack(
    state,
    'opponent',
    choice.attacker,
    choice.attackIndex,
    choice.target,
    choice.choice,
  )
  finishOpponentTurn(state)
}

function runOpponentPressureTurns(state: TcgBattleState) {
  let guard = 0
  while (
    guard < 20 &&
    state.phase === 'battle' &&
    state.activeSide === 'player' &&
    state.player.energy <= 0 &&
    canSideTakeTcgBattleAction(state, 'opponent')
  ) {
    guard += 1
    state.log.unshift('You have no energy remaining. Opponent continues.')
    advanceTurn(state, 'opponent')
    runOpponentTurn(state)
  }
}

function afterPlayerAction(state: TcgBattleState) {
  promoteOpponentIfNeeded(state)
  requirePlayerPromotionIfNeeded(state)
  const winner = getTcgBattleWinner(state)
  if (winner) {
    state.phase = 'finished'
    state.winner = winner
    return
  }
  if (state.pendingPromotion) return
  advanceTurn(state, 'opponent')
  runOpponentTurn(state)
  runOpponentPressureTurns(state)
}

function getTcgPvpViewerSide(
  state: TcgPvpSharedBattleState,
  userId: string,
): TcgBattleSide | null {
  if (state.participantIds.player === userId) return 'player'
  if (state.participantIds.opponent === userId) return 'opponent'
  return null
}

function getTcgPvpSideName(
  state: TcgPvpSharedBattleState,
  side: TcgBattleSide,
) {
  return side === 'player'
    ? state.playerTrainer?.name || 'Trainer 1'
    : state.enemyTrainer?.name || 'Trainer 2'
}

function makeEmptyTcgPvpSummary() {
  return {
    xp: {},
    items: [],
    pokemon: [],
    currency: [],
    cards: [],
  }
}

async function saveTcgPvpSharedState(state: TcgPvpSharedBattleState) {
  state.updatedAt = Date.now()
  await redis.set(pvpBattleKey(state.matchId), state, {
    ex: BATTLE_TTL_SECONDS,
  })
}

async function finalizeTcgPvpResult(state: TcgPvpSharedBattleState) {
  if (state.statsFinalized) {
    await saveTcgPvpSharedState(state)
    return
  }

  const playerId = state.participantIds.player
  const opponentId = state.participantIds.opponent
  const payload = await getPayload({ config: configPromise })
  if (!state.noContest && state.winner && state.winner !== 'tie') {
    const winnerId = state.winner === 'player' ? playerId : opponentId
    const loserId = state.winner === 'player' ? opponentId : playerId
    await Promise.all([
      incrementUserActivityResult(
        payload as any,
        winnerId,
        'gameResults',
        state.encounterId,
        { wins: 1 },
      ),
      incrementUserActivityResult(
        payload as any,
        loserId,
        'gameResults',
        state.encounterId,
        { losses: 1 },
      ),
    ])
  }

  const resultFor = (userId: string): GameActivityCompletionResult => {
    const side = getTcgPvpViewerSide(state, userId)
    const viewerWinner =
      state.winner === 'tie' || !state.winner || !side
        ? state.winner
        : state.winner === side
          ? 'player'
          : 'opponent'
    const message = state.noContest
      ? 'The match expired before either collector was ready.'
      : viewerWinner === 'player'
        ? state.outcomeReason === 'timeout'
          ? 'You won when the opposing collector ran out of time.'
          : state.outcomeReason === 'surrender'
            ? 'The opposing collector surrendered.'
            : 'You won the TCG battle.'
        : viewerWinner === 'opponent'
          ? state.outcomeReason === 'timeout'
            ? 'You ran out of time.'
            : state.outcomeReason === 'surrender'
              ? 'You surrendered the TCG battle.'
              : 'You lost the TCG battle.'
          : 'The TCG battle ended in a draw.'
    return {
      success: true,
      summary: makeEmptyTcgPvpSummary(),
      message,
      invalidates: ['gameResults'],
    }
  }

  state.statsFinalized = true
  await Promise.all([
    redis.set(pvpResultKey(state.matchId, playerId), resultFor(playerId), {
      ex: PVP_RESULT_TTL_SECONDS,
    }),
    redis.set(pvpResultKey(state.matchId, opponentId), resultFor(opponentId), {
      ex: PVP_RESULT_TTL_SECONDS,
    }),
    redis.set(
      pvpStatusKey(playerId),
      {
        status: 'finished',
        encounterId: state.encounterId,
        matchId: state.matchId,
      } satisfies TcgPvpStatus,
      { ex: PVP_RESULT_TTL_SECONDS },
    ),
    redis.set(
      pvpStatusKey(opponentId),
      {
        status: 'finished',
        encounterId: state.encounterId,
        matchId: state.matchId,
      } satisfies TcgPvpStatus,
      { ex: PVP_RESULT_TTL_SECONDS },
    ),
  ])
  await saveTcgPvpSharedState(state)
}

function getTcgPvpPromotionQueue(
  state: TcgPvpSharedBattleState,
  actingSide: TcgBattleSide,
) {
  compactTcgBattleBoard(state.player)
  compactTcgBattleBoard(state.opponent)
  const queue: TcgBattleSide[] = []
  const defender = flipTcgBattleSide(actingSide)
  for (const sideKey of [defender, actingSide]) {
    const side = state[sideKey]
    const desiredFrontCount = Math.min(3, side.front.length + side.back.length)
    const missing = Math.max(0, desiredFrontCount - side.front.length)
    for (let index = 0; index < missing; index += 1) queue.push(sideKey)
  }
  return queue
}

function settleTcgPvpAction(
  state: TcgPvpSharedBattleState,
  actingSide: TcgBattleSide,
) {
  const completedRound = actingSide === 'opponent'
  if (completedRound) applyEndOfRoundStatusDamage(state)

  compactTcgBattleBoard(state.player)
  compactTcgBattleBoard(state.opponent)
  const winner = getTcgBattleWinner(state)
  if (winner) {
    state.phase = 'finished'
    state.winner = winner
    state.outcomeReason = 'knockout'
    return
  }

  const nextSide = flipTcgBattleSide(actingSide)
  const promotions = getTcgPvpPromotionQueue(state, actingSide)
  if (promotions.length > 0) {
    state.pendingPromotions = promotions
    state.pendingPromotion = promotions[0]
    state.resumeSideAfterPromotion = nextSide
    state.phase = 'promotion'
    state.activeSide = promotions[0]
    state.deadlineAt = Date.now() + PVP_ACTION_TIMEOUT_MS
    return
  }

  state.pendingPromotions = undefined
  state.pendingPromotion = undefined
  state.resumeSideAfterPromotion = undefined
  state.phase = 'battle'
  advanceTurn(state, nextSide)
  finishByStallIfNeeded(state)
  if (state.winner) state.outcomeReason = 'stall'
  state.deadlineAt = Date.now() + PVP_ACTION_TIMEOUT_MS
}

async function resolveExpiredTcgPvpDeadline(state: TcgPvpSharedBattleState) {
  if (state.phase === 'finished' || Date.now() <= state.deadlineAt) return false

  if (state.phase === 'arranging') {
    if (state.ready.player !== state.ready.opponent) {
      state.winner = state.ready.player ? 'player' : 'opponent'
    } else {
      state.winner = 'tie'
      state.noContest = true
    }
  } else {
    const timedOutSide =
      state.phase === 'promotion' && state.pendingPromotion
        ? state.pendingPromotion
        : state.activeSide
    state.winner = flipTcgBattleSide(timedOutSide)
  }
  state.phase = 'finished'
  state.outcomeReason = 'timeout'
  state.revision += 1
  state.lastAction = {
    id: randomUUID(),
    side:
      state.winner === 'tie' || !state.winner
        ? state.activeSide
        : flipTcgBattleSide(state.winner),
    kind: 'timeout',
  }
  await finalizeTcgPvpResult(state)
  return true
}

async function runTcgPvpMutation(
  userId: string,
  expectedRevision: number | undefined,
  mutate: (
    state: TcgPvpSharedBattleState,
    viewerSide: TcgBattleSide,
  ) => string | undefined,
): Promise<TcgBattleActionResult> {
  const status = await loadTcgPvpStatus(userId)
  if (!status?.matchId) {
    return { success: false, error: 'No active TCG PVP match.' }
  }

  return withTcgPvpLock(status.matchId, async () => {
    const state = await loadTcgPvpSharedState(status.matchId as string)
    if (!state) return { success: false, error: 'TCG PVP match expired.' }
    const viewerSide = getTcgPvpViewerSide(state, userId)
    if (!viewerSide)
      return { success: false, error: 'Not a match participant.' }
    if (await resolveExpiredTcgPvpDeadline(state)) {
      return { success: false, error: 'The action clock expired.' }
    }
    if (
      typeof expectedRevision !== 'number' ||
      expectedRevision !== state.revision
    ) {
      return {
        success: false,
        error: 'The battle changed. Refreshing the latest state.',
      }
    }

    const error = mutate(state, viewerSide)
    if (error) return { success: false, error }
    state.revision += 1
    state.updatedAt = Date.now()
    if (state.phase === 'finished') await finalizeTcgPvpResult(state)
    else await saveTcgPvpSharedState(state)

    const perspective = toTcgPvpPerspectiveState(state, userId)
    if (!perspective) return { success: false, error: 'Unable to load match.' }
    return { success: true, state: perspective }
  })
}

export async function prepareTcgPvp(encounterId: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false as const, error: 'Not authenticated' }
    if (user.kidMode === true) {
      return { success: false as const, error: KID_MODE_ACCESS_ERROR }
    }

    const existingStatus = await loadTcgPvpStatus(user.id)
    if (existingStatus?.matchId) {
      return {
        success: true as const,
        status: existingStatus.status,
        matchId: existingStatus.matchId,
      }
    }
    const pokemonPvpStatus = await redis.get<{ status?: string }>(
      `pvp:status:${user.id}`,
    )
    if (pokemonPvpStatus) {
      return {
        success: false as const,
        error: 'Finish or leave your current PVP battle first.',
      }
    }

    const encounter = allGames.find((game) => game.id === encounterId) as
      | TcgBattleGameConfig
      | undefined
    if (encounter?.gameType !== 'tcg-battle') {
      return { success: false as const, error: 'Invalid TCG PVP table.' }
    }
    if (!isTcgPvpEncounter(encounter)) {
      return { success: false as const, error: 'Invalid TCG PVP table.' }
    }

    const start = await startGame(encounterId, true)
    if (!start.success) return start
    const prepared = await assertPreparedTcgPvp(user.id, encounterId, user)
    if (!prepared.success) {
      await redis.del(`game:${user.id}`)
      return prepared
    }
    return { success: true as const, status: 'ready' as const }
  } catch (error) {
    return {
      success: false as const,
      error:
        error instanceof Error ? error.message : 'Unable to prepare TCG PVP.',
    }
  }
}

export async function createTcgPvpLobby(encounterId: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false as const, error: 'Not authenticated' }
    const rateLimit = await checkActionRateLimit(
      user.id,
      'tcg-pvp-lobby-create',
      10,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false as const,
        error: 'Too many lobby requests. Please wait.',
      }
    }
    const prepared = await assertPreparedTcgPvp(user.id, encounterId, user)
    if (!prepared.success) return prepared

    const existing = await loadTcgPvpStatus(user.id)
    if (existing?.matchId) {
      return { success: true as const, matchId: existing.matchId }
    }
    if (existing?.code) await redis.del(`${PVP_LOBBY_PREFIX}${existing.code}`)

    let code = ''
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const candidate = randomInt(100000, 1000000).toString()
      const reserved = await redis.set(
        `${PVP_LOBBY_PREFIX}${candidate}`,
        {
          code: candidate,
          encounterId,
          hostUserId: user.id,
          createdAt: Date.now(),
        } satisfies TcgPvpLobby,
        { ex: BATTLE_TTL_SECONDS, nx: true },
      )
      if (reserved) {
        code = candidate
        break
      }
    }
    if (!code)
      return { success: false as const, error: 'Unable to create lobby.' }

    await redis.set(
      pvpStatusKey(user.id),
      { status: 'lobby', encounterId, code } satisfies TcgPvpStatus,
      { ex: BATTLE_TTL_SECONDS },
    )
    return { success: true as const, code }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unable to create lobby.',
    }
  }
}

export async function joinTcgPvpLobby(encounterId: string, code: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false as const, error: 'Not authenticated' }
    const rateLimit = await checkActionRateLimit(
      user.id,
      'tcg-pvp-lobby-join',
      12,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false as const,
        error: 'Too many lobby attempts. Please wait.',
      }
    }
    if (!/^\d{6}$/.test(code)) {
      return { success: false as const, error: 'Enter a valid six-digit code.' }
    }
    const prepared = await assertPreparedTcgPvp(user.id, encounterId, user)
    if (!prepared.success) return prepared

    const lobby = (await redis.get(
      `${PVP_LOBBY_PREFIX}${code}`,
    )) as TcgPvpLobby | null
    if (!lobby || lobby.encounterId !== encounterId) {
      return { success: false as const, error: 'Lobby not found.' }
    }
    if (lobby.hostUserId === user.id) {
      return {
        success: false as const,
        error: 'You cannot join your own lobby.',
      }
    }

    return await withTcgPvpLock(`lobby:${code}`, async () => {
      const currentLobby = (await redis.get(
        `${PVP_LOBBY_PREFIX}${code}`,
      )) as TcgPvpLobby | null
      if (!currentLobby || currentLobby.encounterId !== encounterId) {
        return {
          success: false as const,
          error: 'Lobby is no longer available.',
        }
      }
      const match = await initializeTcgPvpMatch(
        prepared.encounter,
        currentLobby.hostUserId,
        user.id,
      )
      if (!match.success) return match
      await redis.del(`${PVP_LOBBY_PREFIX}${code}`)
      return match
    })
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unable to join lobby.',
    }
  }
}

export async function joinTcgPvpQuickMatch(encounterId: string) {
  try {
    const user = await getUser()
    if (!user) return { success: false as const, error: 'Not authenticated' }
    const rateLimit = await checkActionRateLimit(
      user.id,
      'tcg-pvp-quick-match',
      12,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false as const,
        error: 'Too many matchmaking requests. Please wait.',
      }
    }
    const prepared = await assertPreparedTcgPvp(user.id, encounterId, user)
    if (!prepared.success) return prepared
    const memberKey = pvpQueueMemberKey(encounterId, user.id)
    if (await redis.get(memberKey)) {
      return { success: true as const, status: 'queued' as const }
    }

    return await withTcgPvpLock(`queue:${encounterId}`, async () => {
      const queueKey = pvpQueueKey(encounterId)
      while (true) {
        const candidateId = (await redis.lpop(queueKey)) as string | null
        if (!candidateId) break
        const candidateMarker = await redis.get(
          pvpQueueMemberKey(encounterId, candidateId),
        )
        if (!candidateMarker) continue
        await redis.del(pvpQueueMemberKey(encounterId, candidateId))
        if (candidateId === user.id) continue

        const candidate = await assertPreparedTcgPvp(candidateId, encounterId)
        if (!candidate.success) {
          await redis.del(pvpStatusKey(candidateId))
          continue
        }
        const match = await initializeTcgPvpMatch(
          prepared.encounter,
          candidateId,
          user.id,
        )
        if (!match.success) {
          await redis.del(pvpStatusKey(candidateId))
          continue
        }
        return {
          success: true as const,
          status: 'matched' as const,
          matchId: match.matchId,
        }
      }

      await redis.rpush(queueKey, user.id)
      await Promise.all([
        redis.set(memberKey, '1', { ex: PVP_QUEUE_TTL_SECONDS }),
        redis.set(
          pvpStatusKey(user.id),
          { status: 'queued', encounterId } satisfies TcgPvpStatus,
          { ex: PVP_QUEUE_TTL_SECONDS },
        ),
      ])
      return { success: true as const, status: 'queued' as const }
    })
  } catch (error) {
    return {
      success: false as const,
      error:
        error instanceof Error ? error.message : 'Unable to enter Quick Match.',
    }
  }
}

export async function cancelTcgPvpMatchmaking(encounterId: string) {
  const user = await getUser()
  if (!user) return { success: false as const, error: 'Not authenticated' }
  const status = await loadTcgPvpStatus(user.id)
  if (status?.matchId) {
    return {
      success: false as const,
      error: 'The match has started. Surrender from the battle table instead.',
    }
  }
  if (status?.code) await redis.del(`${PVP_LOBBY_PREFIX}${status.code}`)
  await Promise.all([
    redis.del(pvpQueueMemberKey(encounterId, user.id)),
    redis.del(pvpStatusKey(user.id)),
  ])
  const session = (await redis.get(
    `game:${user.id}`,
  )) as GameActivityState | null
  if (session?.encounterId === encounterId) await redis.del(`game:${user.id}`)
  return { success: true as const }
}

export async function getTcgPvpMatchmakingStatus(encounterId: string) {
  const user = await getUser()
  if (!user) return { success: false as const, error: 'Not authenticated' }
  const status = await loadTcgPvpStatus(user.id)
  if (!status || status.encounterId !== encounterId) {
    return { success: true as const, status: 'idle' as const }
  }
  if (!status.matchId) return { success: true as const, ...status }

  await withTcgPvpLock(status.matchId, async () => {
    const state = await loadTcgPvpSharedState(status.matchId as string)
    if (state) await resolveExpiredTcgPvpDeadline(state)
  })
  const refreshed = await loadTcgPvpStatus(user.id)
  return {
    success: true as const,
    ...(refreshed || { status: 'idle' as const }),
  }
}

export async function refreshTcgBattleState(): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }
    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (!isTcgPvpEncounter(encounter)) {
      const state = await loadState(user.id)
      return { success: true, state }
    }
    const status = await loadTcgPvpStatus(user.id)
    if (!status?.matchId) {
      return { success: false, error: 'No active TCG PVP match.' }
    }
    return await withTcgPvpLock(status.matchId, async () => {
      const state = await loadTcgPvpSharedState(status.matchId as string)
      if (!state) return { success: false, error: 'TCG PVP match expired.' }
      await resolveExpiredTcgPvpDeadline(state)
      const perspective = toTcgPvpPerspectiveState(state, user.id)
      if (!perspective)
        return { success: false, error: 'Not a match participant.' }
      return { success: true, state: perspective }
    })
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unable to refresh battle.',
    }
  }
}

export async function startTcgBattle(
  encounterId: string,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'tcg-battle-start',
      20,
      60,
    )
    if (!rateLimit.allowed)
      return { success: false, error: 'Too many battle starts. Please wait.' }

    const activeEncounter = await getActiveTcgBattleEncounter(
      user.id,
      encounterId,
    )
    if (isTcgPvpEncounter(activeEncounter)) {
      const status = await loadTcgPvpStatus(user.id)
      if (!status?.matchId) {
        return {
          success: false,
          error: 'Join a friendly lobby or Quick Match from Explore first.',
        }
      }
      return await withTcgPvpLock(status.matchId, async () => {
        const shared = await loadTcgPvpSharedState(status.matchId as string)
        if (!shared) return { success: false, error: 'TCG PVP match expired.' }
        await resolveExpiredTcgPvpDeadline(shared)
        const perspective = toTcgPvpPerspectiveState(shared, user.id)
        if (!perspective) {
          return { success: false, error: 'Not a match participant.' }
        }
        return { success: true, state: perspective }
      })
    }

    return await withTcgBattleLock(user.id, async () => {
      const encounter = await getActiveTcgBattleEncounter(user.id, encounterId)
      const existing = (await redis.get(
        battleKey(user.id),
      )) as TcgBattleState | null
      if (
        existing &&
        existing.encounterId === encounter.id &&
        existing.phase !== 'finished'
      ) {
        const trainers = getTcgBattleTrainerCards(user, encounter)
        existing.playerTrainer =
          existing.playerTrainer || trainers.playerTrainer
        existing.enemyTrainer = existing.enemyTrainer || trainers.enemyTrainer
        await saveState(existing)
        return { success: true, state: existing }
      }

      const format = encounter.settings.deckFormat
      const requiredSeries = encounter.settings.requiredSeries
      const decksByGeneration = normalizeDecksByGeneration(
        (user as any).tcgDecksByGeneration,
      )
      const requiredSeriesDecks = decksByGeneration[requiredSeries] || {}
      const payload = await getPayload({ config: configPromise })
      const collection = await getUserTcgMap(payload as any, user.id)
      const selectedDeckEntry = requiredSeriesDecks[format]
      if (!selectedDeckEntry) {
        return rejectTcgBattleStart(
          user.id,
          `Set up a ${TCG_BATTLE_FORMATS[format].label} deck for ${requiredSeries} first.`,
        )
      }

      const selectedDeckIds = selectedDeckEntry.cards
      if (
        selectedDeckIds.some(
          (cardId) => getTcgCardSeriesById(cardId) !== requiredSeries,
        )
      ) {
        return rejectTcgBattleStart(
          user.id,
          `Your deck must use only ${requiredSeries} cards.`,
        )
      }
      const playerDeck = await validateTcgBattleDeck(
        selectedDeckIds,
        collection,
        format,
      )
      if (!playerDeck.valid) {
        return rejectTcgBattleStart(user.id, playerDeck.errors.join(' '))
      }

      const opponentCardIds = encounter.settings.opponentDeckCardIds
      if (!opponentCardIds) {
        return rejectTcgBattleStart(user.id, 'Opponent deck is missing.')
      }
      const opponentOffSeries = opponentCardIds.some(
        (cardId) => getTcgCardSeriesById(cardId) !== requiredSeries,
      )
      if (opponentOffSeries) {
        return rejectTcgBattleStart(
          user.id,
          `Opponent deck must use only ${requiredSeries} cards.`,
        )
      }

      const opponentDeckValidation = await validateTcgBattleDeck(
        opponentCardIds,
        Object.fromEntries(opponentCardIds.map((cardId) => [cardId, 1])),
        format,
      )
      if (!opponentDeckValidation.valid) {
        return rejectTcgBattleStart(
          user.id,
          `Opponent deck is invalid. ${opponentDeckValidation.errors.join(' ')}`,
        )
      }
      const opponentDeck = opponentDeckValidation.cards

      const playerHand = drawTcgBattleCards(playerDeck.cards, 6)
      const opponentHand = drawTcgBattleCards(opponentDeck, 6)
      const opponentBoard = arrangeOpponentTcgBattleCards(opponentHand)
      const energy = TCG_BATTLE_FORMATS[format].startingEnergy
      const trainers = getTcgBattleTrainerCards(user, encounter)

      const state: TcgBattleState = {
        userId: user.id,
        encounterId: encounter.id,
        format,
        phase: 'arranging',
        turnNumber: 1,
        activeSide: 'player',
        player: {
          deck: playerDeck.cards,
          hand: playerHand,
          front: [],
          back: [],
          discard: [],
          energy,
          selectedEnergy: selectedDeckEntry?.energy,
        },
        opponent: {
          deck: opponentDeck,
          hand: opponentHand,
          front: opponentBoard.front,
          back: opponentBoard.back,
          discard: [],
          energy,
          selectedEnergy: encounter.settings.opponentEnergyType,
        },
        consecutivePasses: 0,
        log: ['Arrange 3 cards in front and 3 cards on the bench.'],
        playerTrainer: trainers.playerTrainer,
        enemyTrainer: trainers.enemyTrainer,
        startedAt: Date.now(),
        updatedAt: Date.now(),
      }

      await saveState(state)
      return { success: true, state }
    })
  } catch (error) {
    console.error('[TCG Battle] Failed to start battle.', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to start battle.',
    }
  }
}

export async function arrangeTcgBattle(
  frontIds: string[],
  backIds: string[],
  expectedRevision?: number,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (isTcgPvpEncounter(encounter)) {
      return runTcgPvpMutation(
        user.id,
        expectedRevision,
        (state, viewerSide) => {
          if (state.phase !== 'arranging') return 'Battle is already arranged.'
          if (state.ready[viewerSide]) return 'Your cards are already arranged.'
          const ids = [...frontIds, ...backIds]
          if (
            frontIds.length !== 3 ||
            backIds.length !== 3 ||
            new Set(ids).size !== 6
          ) {
            return 'Choose exactly 3 front cards and 3 bench cards.'
          }
          const side = state[viewerSide]
          const front = frontIds.map((id) => findCard(side.hand, id))
          const back = backIds.map((id) => findCard(side.hand, id))
          if (front.some((card) => !card) || back.some((card) => !card)) {
            return 'Invalid card arrangement.'
          }
          side.front = front as TcgBattleCardState[]
          side.back = back as TcgBattleCardState[]
          side.hand = []
          state.ready[viewerSide] = true
          state.lastAction = {
            id: randomUUID(),
            side: viewerSide,
            kind: 'arrange',
          }
          clearDamageEvents(state)
          if (state.ready.player && state.ready.opponent) {
            state.phase = 'battle'
            state.activeSide = 'player'
            state.deadlineAt = Date.now() + PVP_ACTION_TIMEOUT_MS
            state.log.unshift('Both collectors are ready. Battle started.')
          } else {
            state.log.unshift(
              `${getTcgPvpSideName(state, viewerSide)} is ready.`,
            )
          }
        },
      )
    }

    return await withTcgBattleLock(user.id, async () => {
      const state = await loadState(user.id)
      await getActiveTcgBattleEncounter(user.id, state.encounterId)
      if (state.phase !== 'arranging')
        return { success: false, error: 'Battle is already arranged.' }

      const ids = [...frontIds, ...backIds]
      if (
        frontIds.length !== 3 ||
        backIds.length !== 3 ||
        new Set(ids).size !== 6
      ) {
        return {
          success: false,
          error: 'Choose exactly 3 front cards and 3 bench cards.',
        }
      }

      const front = frontIds.map((id) => findCard(state.player.hand, id))
      const back = backIds.map((id) => findCard(state.player.hand, id))
      if (front.some((card) => !card) || back.some((card) => !card)) {
        return { success: false, error: 'Invalid card arrangement.' }
      }

      state.player.front = front as TcgBattleCardState[]
      state.player.back = back as TcgBattleCardState[]
      state.player.hand = []
      clearDamageEvents(state)
      state.phase = 'battle'
      state.log.unshift('Battle started.')
      await saveState(state)
      return { success: true, state }
    })
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unable to arrange battle.',
    }
  }
}

export async function tcgBattleAttack(
  attackerId: string,
  attackIndex: number,
  targetId: string,
  choice?: TcgBattleAttackChoice,
  expectedRevision?: number,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (isTcgPvpEncounter(encounter)) {
      return runTcgPvpMutation(
        user.id,
        expectedRevision,
        (state, viewerSide) => {
          if (state.phase !== 'battle' || state.activeSide !== viewerSide) {
            return 'It is not your turn.'
          }
          const attacker = findCard(state[viewerSide].front, attackerId)
          const targetSide = flipTcgBattleSide(viewerSide)
          const target = findCard(
            [...state[targetSide].front, ...state[targetSide].back],
            targetId,
          )
          if (!attacker || !target) return 'Invalid attacker or target.'
          const attack = attacker.attacks[attackIndex]
          if (!attack) return 'Invalid attack.'

          clearDamageEvents(state)
          applyAttack(state, viewerSide, attacker, attackIndex, target, choice)
          state.log[0] = `${getTcgPvpSideName(state, viewerSide)} used ${attacker.name}'s ${attack.name}.`
          state.lastAction = {
            id: randomUUID(),
            side: viewerSide,
            kind: 'attack',
            attackerId,
            attackIndex,
            targetId,
          }
          settleTcgPvpAction(state, viewerSide)
        },
      )
    }

    return await withTcgBattleLock(user.id, async () => {
      const state = await loadState(user.id)
      await getActiveTcgBattleEncounter(user.id, state.encounterId)
      if (state.phase !== 'battle' || state.activeSide !== 'player') {
        return { success: false, error: 'It is not your turn.' }
      }

      const attacker = findCard(state.player.front, attackerId)
      const target = findCard(
        [...state.opponent.front, ...state.opponent.back],
        targetId,
      )
      if (!attacker || !target)
        return { success: false, error: 'Invalid attacker or target.' }

      clearDamageEvents(state)
      applyAttack(state, 'player', attacker, attackIndex, target, choice)
      afterPlayerAction(state)
      await saveState(state)
      return { success: true, state }
    })
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to attack.',
    }
  }
}

export async function tcgBattleRetreat(
  frontId: string,
  backId: string,
  expectedRevision?: number,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (isTcgPvpEncounter(encounter)) {
      return runTcgPvpMutation(
        user.id,
        expectedRevision,
        (state, viewerSide) => {
          if (state.phase !== 'battle' || state.activeSide !== viewerSide) {
            return 'It is not your turn.'
          }
          const side = state[viewerSide]
          const frontIndex = side.front.findIndex(
            (card) => card.instanceId === frontId && card.currentHp > 0,
          )
          const backIndex = side.back.findIndex(
            (card) => card.instanceId === backId && card.currentHp > 0,
          )
          if (frontIndex < 0 || backIndex < 0) {
            return 'Invalid retreat selection.'
          }
          const formatConfig = TCG_BATTLE_FORMATS[state.format]
          if (
            side.energy >= formatConfig.energyCap &&
            canSideTakeTcgBattleAction(state, viewerSide)
          ) {
            return 'You must attack while at full energy.'
          }
          const retreating = side.front[frontIndex]
          if (retreating.temporaryEffects?.cannotRetreat) {
            return `${retreating.name} cannot retreat this turn.`
          }
          const cost = retreating.convertedRetreatCost ?? 1
          if (cost > side.energy) return 'Not enough energy to retreat.'

          clearDamageEvents(state)
          side.energy -= cost
          clearTcgBattleStatuses(retreating)
          clearTcgBattleTemporaryEffects(retreating)
          side.front[frontIndex] = side.back[backIndex]
          side.back[backIndex] = retreating
          state.consecutivePasses = 0
          state.log.unshift(
            `${getTcgPvpSideName(state, viewerSide)} retreated ${retreating.name} for ${cost} energy.`,
          )
          state.lastAction = {
            id: randomUUID(),
            side: viewerSide,
            kind: 'retreat',
            frontId,
            backId,
          }
          settleTcgPvpAction(state, viewerSide)
        },
      )
    }

    return await withTcgBattleLock(user.id, async () => {
      const state = await loadState(user.id)
      await getActiveTcgBattleEncounter(user.id, state.encounterId)
      if (state.phase !== 'battle' || state.activeSide !== 'player') {
        return { success: false, error: 'It is not your turn.' }
      }

      const frontIndex = state.player.front.findIndex(
        (card) => card.instanceId === frontId && card.currentHp > 0,
      )
      const backIndex = state.player.back.findIndex(
        (card) => card.instanceId === backId && card.currentHp > 0,
      )
      if (frontIndex < 0 || backIndex < 0)
        return { success: false, error: 'Invalid retreat selection.' }
      const formatConfig = TCG_BATTLE_FORMATS[state.format]
      if (
        state.player.energy >= formatConfig.energyCap &&
        canSideTakeTcgBattleAction(state, 'player')
      ) {
        return {
          success: false,
          error: 'You must attack while at full energy.',
        }
      }

      const retreating = state.player.front[frontIndex]
      if (retreating.temporaryEffects?.cannotRetreat) {
        return {
          success: false,
          error: `${retreating.name} cannot retreat this turn.`,
        }
      }
      const cost = retreating.convertedRetreatCost ?? 1
      if (cost > state.player.energy)
        return { success: false, error: 'Not enough energy to retreat.' }

      clearDamageEvents(state)
      state.player.energy -= cost
      clearTcgBattleStatuses(retreating)
      clearTcgBattleTemporaryEffects(retreating)
      state.player.front[frontIndex] = state.player.back[backIndex]
      state.player.back[backIndex] = retreating
      state.consecutivePasses = 0
      state.log.unshift(`${retreating.name} retreated for ${cost} energy.`)
      afterPlayerAction(state)
      await saveState(state)
      return { success: true, state }
    })
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to retreat.',
    }
  }
}

export async function tcgBattlePromote(
  cardId: string,
  expectedRevision?: number,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (isTcgPvpEncounter(encounter)) {
      return runTcgPvpMutation(
        user.id,
        expectedRevision,
        (state, viewerSide) => {
          if (
            state.phase !== 'promotion' ||
            state.pendingPromotion !== viewerSide
          ) {
            return 'No promotion is pending for you.'
          }
          const side = state[viewerSide]
          const backIndex = side.back.findIndex(
            (card) => card.instanceId === cardId && card.currentHp > 0,
          )
          if (backIndex < 0) return 'Invalid promotion card.'
          const [promoted] = side.back.splice(backIndex, 1)
          side.front.push(promoted)
          clearDamageEvents(state)
          state.log.unshift(
            `${getTcgPvpSideName(state, viewerSide)} promoted ${promoted.name}.`,
          )
          state.lastAction = {
            id: randomUUID(),
            side: viewerSide,
            kind: 'promote',
            cardId,
          }

          const remaining = [...(state.pendingPromotions || [])]
          remaining.shift()
          state.pendingPromotions = remaining.length ? remaining : undefined
          if (remaining.length > 0) {
            state.pendingPromotion = remaining[0]
            state.activeSide = remaining[0]
            state.deadlineAt = Date.now() + PVP_ACTION_TIMEOUT_MS
            return
          }

          const resumeSide =
            state.resumeSideAfterPromotion || flipTcgBattleSide(viewerSide)
          state.pendingPromotion = undefined
          state.resumeSideAfterPromotion = undefined
          state.phase = 'battle'
          advanceTurn(state, resumeSide)
          finishByStallIfNeeded(state)
          if (state.winner) state.outcomeReason = 'stall'
          state.deadlineAt = Date.now() + PVP_ACTION_TIMEOUT_MS
        },
      )
    }

    return await withTcgBattleLock(user.id, async () => {
      const state = await loadState(user.id)
      await getActiveTcgBattleEncounter(user.id, state.encounterId)
      if (state.pendingPromotion !== 'player')
        return { success: false, error: 'No promotion is pending.' }

      const backIndex = state.player.back.findIndex(
        (card) => card.instanceId === cardId && card.currentHp > 0,
      )
      if (backIndex < 0)
        return { success: false, error: 'Invalid promotion card.' }
      const [promoted] = state.player.back.splice(backIndex, 1)
      const previousActiveSide = state.activeSide
      state.player.front.push(promoted)
      clearDamageEvents(state)
      state.pendingPromotion = undefined
      state.phase = 'battle'
      state.turnNumber = getNextTcgBattleTurnNumber(
        state.turnNumber,
        previousActiveSide,
        'player',
      )
      state.activeSide = 'player'
      state.log.unshift(`${promoted.name} moved to your front row.`)
      await saveState(state)
      return { success: true, state }
    })
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to promote card.',
    }
  }
}

export async function tcgBattleCharge(
  expectedRevision?: number,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (isTcgPvpEncounter(encounter)) {
      return runTcgPvpMutation(
        user.id,
        expectedRevision,
        (state, viewerSide) => {
          if (state.phase !== 'battle' || state.activeSide !== viewerSide) {
            return 'It is not your turn.'
          }
          clearDamageEvents(state)
          const side = state[viewerSide]
          const formatConfig = TCG_BATTLE_FORMATS[state.format]
          const atCap = side.energy >= formatConfig.energyCap
          if (atCap && canSideTakeTcgBattleAction(state, viewerSide)) {
            return 'You must attack while at full energy.'
          }
          if (atCap) {
            state.log.unshift(
              `${getTcgPvpSideName(state, viewerSide)} ended the turn.`,
            )
          } else {
            const before = side.energy
            side.energy = Math.min(
              formatConfig.energyCap,
              side.energy + formatConfig.chargeGain,
            )
            state.log.unshift(
              `${getTcgPvpSideName(state, viewerSide)} charged ${side.energy - before} energy.`,
            )
          }
          state.consecutivePasses += 1
          state.lastAction = {
            id: randomUUID(),
            side: viewerSide,
            kind: 'charge',
          }
          settleTcgPvpAction(state, viewerSide)
        },
      )
    }

    return await withTcgBattleLock(user.id, async () => {
      const state = await loadState(user.id)
      await getActiveTcgBattleEncounter(user.id, state.encounterId)
      if (state.phase !== 'battle' || state.activeSide !== 'player') {
        return { success: false, error: 'It is not your turn.' }
      }

      clearDamageEvents(state)
      const formatConfig = TCG_BATTLE_FORMATS[state.format]
      const atCap = state.player.energy >= formatConfig.energyCap
      if (atCap && canSideTakeTcgBattleAction(state, 'player')) {
        return {
          success: false,
          error: 'You must attack while at full energy.',
        }
      }

      if (atCap) {
        state.log.unshift('You ended turn.')
      } else {
        const before = state.player.energy
        state.player.energy = Math.min(
          formatConfig.energyCap,
          state.player.energy + formatConfig.chargeGain,
        )
        state.log.unshift(`You charged ${state.player.energy - before} energy.`)
      }
      state.consecutivePasses += 1
      afterPlayerAction(state)
      finishByStallIfNeeded(state)
      await saveState(state)
      return { success: true, state }
    })
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to charge.',
    }
  }
}

export async function surrenderTcgPvp(
  expectedRevision?: number,
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }
    const encounter = await getActiveTcgBattleEncounter(user.id)
    if (!isTcgPvpEncounter(encounter)) {
      return { success: false, error: 'This is not a TCG PVP battle.' }
    }
    return runTcgPvpMutation(user.id, expectedRevision, (state, viewerSide) => {
      if (state.phase === 'finished') return 'Battle is already finished.'
      state.phase = 'finished'
      state.winner = flipTcgBattleSide(viewerSide)
      state.outcomeReason = 'surrender'
      state.lastAction = {
        id: randomUUID(),
        side: viewerSide,
        kind: 'surrender',
      }
      state.log.unshift(`${getTcgPvpSideName(state, viewerSide)} surrendered.`)
    })
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to surrender.',
    }
  }
}

export async function claimTcgBattleResult(): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

    // Revalidating here rerenders the active game route after its session is
    // cleared, which redirects to Explore before the client can show results.

    const status = await loadTcgPvpStatus(user.id)
    if (status?.matchId) {
      if (!status.encounterId) {
        return { success: false, error: 'No finished TCG PVP match.' }
      }
      const pvpEncounter = allGames.find(
        (game) => game.id === status.encounterId,
      ) as TcgBattleGameConfig | undefined
      if (!pvpEncounter || !isTcgPvpEncounter(pvpEncounter)) {
        return { success: false, error: 'Invalid TCG PVP encounter.' }
      }
      return await withTcgPvpLock(status.matchId, async () => {
        const shared = await loadTcgPvpSharedState(status.matchId as string)
        if (!shared) return { success: false, error: 'TCG PVP match expired.' }
        await resolveExpiredTcgPvpDeadline(shared)
        if (shared.phase !== 'finished' || !shared.winner) {
          return { success: false, error: 'Battle is not finished.' }
        }
        await finalizeTcgPvpResult(shared)
        const completion = (await redis.get(
          pvpResultKey(shared.matchId, user.id),
        )) as GameActivityCompletionResult | null
        if (!completion) {
          return { success: false, error: 'Unable to load the match result.' }
        }
        const perspective = toTcgPvpPerspectiveState(shared, user.id)
        if (!perspective) {
          return { success: false, error: 'Not a match participant.' }
        }

        shared.acknowledgedBy = Array.from(
          new Set([...(shared.acknowledgedBy || []), user.id]),
        )
        await Promise.all([
          redis.del(pvpStatusKey(user.id)),
          redis.del(`game:${user.id}`),
        ])
        if (shared.acknowledgedBy.length >= 2) {
          await Promise.all([
            redis.del(pvpBattleKey(shared.matchId)),
            redis.del(pvpMatchKey(shared.matchId)),
          ])
        } else {
          await saveTcgPvpSharedState(shared)
        }
        return { success: true, state: perspective, completion }
      })
    }

    const state = await loadState(user.id)
    await getActiveTcgBattleEncounter(user.id, state.encounterId)
    if (state.phase !== 'finished' || !state.winner) {
      return { success: false, error: 'Battle is not finished.' }
    }

    const completion = await completeGame(
      state.encounterId,
      state.winner === 'player',
    )
    if (!completion.success) {
      return {
        success: false,
        error: completion.error || 'Unable to claim battle result.',
      }
    }

    if (completion.success) await redis.del(battleKey(user.id))
    return { success: true, state, completion }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unable to claim battle result.',
    }
  }
}
