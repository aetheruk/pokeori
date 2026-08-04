'use server'

import { revalidatePath } from 'next/cache'
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
  drawTcgBattleCards,
  getAllowedTcgBattleAttackCost,
  getEffectiveTcgBattleAttackCost,
  getTcgBattleAttackEffect,
  getValidTcgBattleTargets,
  getTcgBattleCardUnlockTurnForCard,
  getNextTcgBattleTurnNumber,
  normalizeTcgBattleEnergyType,
  tickTcgBattleIncomingAttackModifiers,
  getTcgBattleTiebreakWinner,
  getTcgBattleWinner,
  resolveTcgBattleAttack,
  resolveTcgBattleStatusAttackCheck,
  TCG_BATTLE_FORMATS,
  validateTcgBattleDeck,
  validateTcgBattleAttackChoice,
  isTcgBattleAttackDisabled,
  type TcgBattleAttackChoice,
  type TcgBattleCardState,
  type TcgBattleDeckFormat,
  type TcgBattleEnergyDiscardResolution,
  type TcgBattleEnergyType,
  type TcgBattleSide,
  type TcgBattleStatusCondition,
  type TcgBattleState,
  type TcgBattleTrainerCard,
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
import { completeGame } from '@/app/(frontend)/game/games/actions'
import { getUserTcgMap } from '@/utilities/user-state'

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

function battleKey(userId: string) {
  return `tcg-battle:${userId}`
}

function lockKey(userId: string) {
  return `lock:tcg-battle:${userId}`
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
    { id: crypto.randomUUID(), ...event } as NonNullable<TcgBattleState['lastEffectEvents']>[number],
  ]
}

function getTemporaryEffects(card: TcgBattleCardState) {
  card.temporaryEffects ||= {}
  return card.temporaryEffects
}

function swapTcgBattleCards(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  frontCard: TcgBattleCardState,
  benchCardId: string,
) {
  const side = state[sideKey]
  const frontIndex = side.front.findIndex((card) => card.instanceId === frontCard.instanceId)
  const benchIndex = side.back.findIndex((card) => card.instanceId === benchCardId && card.currentHp > 0)
  if (frontIndex < 0 || benchIndex < 0) return false
  const replacement = side.back[benchIndex]
  clearTcgBattleStatuses(frontCard)
  clearTcgBattleTemporaryEffects(frontCard)
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
  choice?: TcgBattleAttackChoice
  resolution: ReturnType<typeof resolveTcgBattleAttack>
  blockTargetEffects: boolean
}) {
  const { state, sideKey, attacker, target, resolution, blockTargetEffects } = params
  const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
  const choice = resolution.copiedAttackName && params.choice?.kind === 'copiedAttack'
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
    const targetsOpponent = [
      'disableAttack',
      'blockTargeting',
      'changeWeakness',
      'changeType',
      'placeMarker',
    ].includes(rule.kind) || (rule.kind === 'switch' && rule.target === 'opponent')
    if (blockTargetEffects && targetsOpponent) continue

    if (rule.kind === 'switch' && choice?.kind === 'benchSwitch') {
      const switched = swapTcgBattleCards(
        state,
        rule.target === 'self' ? sideKey : opponentKey,
        rule.target === 'self' ? attacker : target,
        choice.cardId,
      )
      if (switched) state.log.unshift(`${rule.target === 'self' ? attacker.name : target.name} switched with a benched card.`)
      continue
    }
    if (rule.kind === 'disableAttack' && choice?.kind === 'disabledAttack') {
      getTemporaryEffects(target).disabledAttack = { attackIndex: choice.attackIndex, remainingTurns: 2 }
      recordEffectEvent(state, { kind: 'control', sourceId: attacker.instanceId, targetId: target.instanceId, label: `${target.attacks[choice.attackIndex]?.name || 'Attack'} disabled` })
      continue
    }
    if (rule.kind === 'buffAttack') {
      getTemporaryEffects(attacker).nextAttackBuff = { attackName: rule.attackName, baseDamage: rule.baseDamage, remainingTurns: 2 }
      recordEffectEvent(state, { kind: 'control', sourceId: attacker.instanceId, targetId: attacker.instanceId, label: `${rule.attackName} empowered` })
      continue
    }
    if (rule.kind === 'blockTargeting') {
      getTemporaryEffects(target).cannotTarget = { targetId: attacker.instanceId, remainingTurns: 2 }
      recordEffectEvent(state, { kind: 'control', sourceId: attacker.instanceId, targetId: target.instanceId, label: `Cannot target ${attacker.name}` })
      continue
    }
    if ((rule.kind === 'changeWeakness' || rule.kind === 'changeResistance' || rule.kind === 'changeType') && choice?.kind === 'typeChange') {
      const affected = rule.kind === 'changeResistance' ? attacker : target
      const effects = getTemporaryEffects(affected)
      if (rule.kind === 'changeWeakness') effects.weaknessType = choice.type
      if (rule.kind === 'changeResistance') effects.resistanceType = choice.type
      if (rule.kind === 'changeType') effects.battleType = choice.type
      recordEffectEvent(state, { kind: 'type', sourceId: attacker.instanceId, targetId: affected.instanceId, label: `${choice.type} ${rule.kind.replace('change', '').toLowerCase()}` })
      continue
    }
    if (rule.kind === 'textureMagic' && choice?.kind === 'textureMagic') {
      if (choice.resistanceType) getTemporaryEffects(attacker).resistanceType = choice.resistanceType
      if (choice.weaknessType && !blockTargetEffects) getTemporaryEffects(target).weaknessType = choice.weaknessType
      recordEffectEvent(state, { kind: 'type', sourceId: attacker.instanceId, targetId: target.instanceId, label: 'Texture Magic' })
      continue
    }
    if (rule.kind === 'destinyBond') {
      getTemporaryEffects(attacker).destinyBond = { remainingTurns: 1 }
      recordEffectEvent(state, { kind: 'control', sourceId: attacker.instanceId, targetId: attacker.instanceId, label: 'Destiny Bond' })
      continue
    }
    if (rule.kind === 'reflectDamage') {
      getTemporaryEffects(attacker).reflectDamage = { remainingTurns: 1 }
      recordEffectEvent(state, { kind: 'control', sourceId: attacker.instanceId, targetId: attacker.instanceId, label: 'Mirror Shell' })
      continue
    }
    if (rule.kind === 'placeMarker') {
      target.markers = Array.from(new Set([...(target.markers || []), rule.marker]))
      recordEffectEvent(state, { kind: 'marker', sourceId: attacker.instanceId, targetId: target.instanceId, label: 'Lightning Rod' })
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

  const statusCheck = resolveTcgBattleStatusAttackCheck(attacker)
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

  const blockTargetEffects = target.incomingAttackModifier?.kind === 'preventAllEffects'
  const targetHadDestinyBond = Boolean(target.temporaryEffects?.destinyBond)
  const targetHadReflectDamage = Boolean(target.temporaryEffects?.reflectDamage)
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
    const targetSide = gain.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    const before = state[targetSide].energy
    state[targetSide].energy = Math.min(
      TCG_BATTLE_FORMATS[state.format].energyCap,
      before + gain.amount,
    )
    const added = state[targetSide].energy - before
    if (added > 0) {
      recordEffectEvent(state, { kind: 'energy', side: targetSide, sourceId: attacker.instanceId, amount: added })
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
  target.currentHp = Math.max(0, target.currentHp - resolution.targetDamage)
  getTemporaryEffects(target).lastIncomingAttackDamage = resolution.targetDamage
  if (resolution.targetDamage > 0) {
    recordDamageEvent(state, {
      sourceId: attacker.instanceId,
      targetId: target.instanceId,
      targetSide: sideKey === 'player' ? 'opponent' : 'player',
      damage: resolution.targetDamage,
      reason: 'attack',
    })
  }
  if (resolution.benchDamage && resolution.benchDamage.length > 0) {
    for (const benchHit of resolution.benchDamage) {
      const benchCard = state[benchHit.targetSide].back.find(
        (card) => card.instanceId === benchHit.targetId && card.currentHp > 0,
      )
      if (!benchCard) continue
      benchCard.currentHp = Math.max(0, benchCard.currentHp - benchHit.damage)
      recordDamageEvent(state, {
        sourceId: attacker.instanceId,
        targetId: benchCard.instanceId,
        targetSide: benchHit.targetSide,
        damage: benchHit.damage,
        reason: 'attack',
      })
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
      hitCard.currentHp = Math.max(0, hitCard.currentHp - counterHit.damage)
      recordDamageEvent(state, {
        sourceId: attacker.instanceId,
        targetId: hitCard.instanceId,
        targetSide: counterHit.targetSide,
        damage: counterHit.damage,
        reason: 'attack',
      })
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
      healCard.currentHp = Math.min(
        healCard.hp,
        healCard.currentHp + heal.amount,
      )
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
  if (targetHadReflectDamage && resolution.targetDamage > 0 && attacker.currentHp > 0) {
    const reflected = Math.min(attacker.currentHp, resolution.targetDamage)
    attacker.currentHp -= reflected
    recordDamageEvent(state, {
      sourceId: target.instanceId,
      targetId: attacker.instanceId,
      targetSide: sideKey,
      damage: reflected,
      reason: 'self',
    })
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
      ? resolution.statusConditions?.filter((status) => status.target === 'self')
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
    choice,
    resolution,
    blockTargetEffects,
  })

  if (attacker.temporaryEffects?.nextAttackBuff?.attackName.toLowerCase() === attack.name.toLowerCase()) {
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
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

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
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

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
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

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
): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

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

export async function tcgBattleCharge(): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

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

export async function claimTcgBattleResult(): Promise<TcgBattleActionResult> {
  try {
    const user = await getUser()
    if (!user) return { success: false, error: 'Not authenticated' }

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

    if (completion.success) {
      await redis.del(battleKey(user.id))
      revalidatePath('/game/explore')
    }
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
