import type { TcgCardAttack, TcgCardDetail } from '@/data/tcg/types'
import { getTcgCardDetailById } from '@/data/tcg/details'

export type TcgBattleDeckFormat = 'baby' | 'champions' | 'masters'
export type TcgBattleSide = 'player' | 'opponent'
export type TcgBattlePhase = 'arranging' | 'battle' | 'promotion' | 'finished'
export type TcgBattleMode = 'pve' | 'pvp'
export type TcgBattleEnergyType =
  | 'Grass'
  | 'Fire'
  | 'Water'
  | 'Lightning'
  | 'Psychic'
  | 'Fighting'
  | 'Darkness'
  | 'Metal'
  | 'Fairy'
  | 'Dragon'
  | 'Colorless'

export type TcgBattleCoinCondition =
  | 'heads'
  | 'tails'
  | { result: 'heads' | 'tails'; minimum: number }
export type TcgBattleCoinResult = 'heads' | 'tails'
export type TcgBattleStatusCondition = 'asleep' | 'poisoned' | 'burned' | 'paralyzed' | 'confused'

export type TcgBattleCountSource =
  | { kind: 'bench'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'pokemonInPlay'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'injuredPokemon'; side: 'own' | 'opponent' | 'both'; zone: 'bench' | 'play' }
  | { kind: 'damageCounters'; target: 'attacker' | 'target' }
  | { kind: 'unusedEnergy' }
  | { kind: 'chosenEnergy' }
  | { kind: 'energy'; side: 'own' | 'opponent'; max?: number }
  | {
      kind: 'namedPokemon'
      side: 'own' | 'opponent' | 'both'
      zone: 'bench' | 'play'
      names: string[]
    }

export type TcgBattleDamageRule =
  | { kind: 'fixed'; amount: number }
  | { kind: 'zeroOnTails'; amount: number }
  | { kind: 'zeroIfAnyTails'; amount: number; coinFlipCount: number }
  | { kind: 'coinCount'; amountPerHeads: number; coinFlipCount: number; exactHeads?: number }
  | { kind: 'conditionalBonus'; baseDamage: number; bonusDamage: number; condition: TcgBattleCoinCondition }
  | { kind: 'headsBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'headsBonusEach'; baseDamage: number; bonusDamage: number; coinFlipCount: number }
  | { kind: 'headsMultiplier'; damagePerHeads: number; coinFlipCount: number }
  | { kind: 'tailsBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'tailsMultiplier'; damagePerTails: number }
  | { kind: 'count'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource; maxUnits?: number }
  | { kind: 'subtractCount'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource }
  | { kind: 'remainingHpHalf' }
  | { kind: 'remainingHpHalfRoundedDown' }
  | { kind: 'targetToRemainingHp'; remainingHp: number; condition?: TcgBattleCoinCondition }
  | { kind: 'conditionalCount'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource; condition?: TcgBattleCoinCondition; minUnits?: number; maxUnits?: number; failureDamage?: number }
  | { kind: 'healthyTarget'; healthyDamage: number; damagedDamage: number }
  | { kind: 'headsTable'; damages: number[]; coinFlipCount: number }
  | { kind: 'lastHitBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'lastIncomingDamage' }

export type TcgBattleSelfDamageRule =
  | { kind: 'fixed'; amount: number; condition?: TcgBattleCoinCondition }
  | { kind: 'damageCounters'; perCounterDamage: number; condition?: TcgBattleCoinCondition }
  | { kind: 'perTail'; amount: number }

export type TcgBattleEnergyDiscardRule = {
  target: 'self' | 'opponent'
  amount: number | 'all' | 'heads' | 'choice' | 'opponentPokemon'
  condition?: TcgBattleCoinCondition
}

export type TcgBattleEnergyDiscardResolution = {
  target: 'self' | 'opponent'
  amount: number
  requestedAmount: number | 'all' | 'heads' | 'choice' | 'opponentPokemon'
}

export type TcgBattleStatusRule = {
  target: 'self' | 'opponent'
  statuses: TcgBattleStatusCondition[]
  condition?: TcgBattleCoinCondition
}

export type TcgBattleProtectionRule = {
  target: 'self' | 'opponent'
  kind: 'preventAll' | 'preventAllEffects' | 'reduce' | 'preventAtMost' | 'halve' | 'coinPreventDamage'
  amount?: number
  attackerOnly?: boolean
  condition?: TcgBattleCoinCondition
  preventOn?: TcgBattleCoinResult
}

export type TcgBattleBenchDamageRule = {
  amount: number
  side: 'own' | 'opponent' | 'both'
  maxTargets?: number
  condition?: TcgBattleCoinCondition
  typeFilter?: { include?: string[]; exclude?: string[] }
}

export type TcgBattleCounterDamageRule =
  | { amount: number; target: 'self' | 'opponent' }
  | {
      amount: number
      side: 'own' | 'opponent' | 'both'
      maxTargets?: number
      condition?: TcgBattleCoinCondition
      zone?: 'bench' | 'play'
      onlyDamaged?: boolean
      excludeAttacker?: boolean
      excludeTarget?: boolean
      typeFilter?: { include?: string[]; exclude?: string[] }
    }
  | {
      amount: number
      side: 'own' | 'opponent' | 'both'
      names: string[]
      zone: 'bench' | 'play'
      condition?: TcgBattleCoinCondition
    }
  | { amountPerHead: number; side: 'own' | 'opponent' | 'both'; zone?: 'bench' | 'play'; condition?: TcgBattleCoinCondition; excludeAttacker?: boolean; excludeTarget?: boolean }
  | { amountPerUnit: number; source: TcgBattleCountSource; target: 'self' | 'opponent'; condition?: TcgBattleCoinCondition }

export type TcgBattleHealingRule =
  | { amount: number | 'all'; target: 'self' | 'opponent'; condition?: TcgBattleCoinCondition }
  | { amount: number | 'all'; side: 'own' | 'opponent' | 'both'; maxTargets?: number; condition?: TcgBattleCoinCondition; zone?: 'bench' | 'play'; amountPerHead?: number }
  | { target: 'self' | 'opponent'; amountFrom: 'damageDealt' | 'halfDamageDealtRoundedUp'; condition?: TcgBattleCoinCondition }

export type TcgBattleEnergyGainRule = {
  target: 'self' | 'opponent'
  amount?: number
  amountPerUnit?: number
  source?: TcgBattleCountSource
  condition?: TcgBattleCoinCondition
  requiresSourceSurvival?: boolean
}

export type TcgBattleAttackChoice =
  | { kind: 'copiedAttack'; attackIndex: number; followUp?: TcgBattleAttackChoice }
  | { kind: 'disabledAttack'; attackIndex: number }
  | { kind: 'benchSwitch'; cardId: string }
  | { kind: 'discardPokemon'; side: TcgBattleSide; cardId: string }
  | { kind: 'energyAmount'; amount: number }
  | { kind: 'typeChange'; type: TcgBattleEnergyType }
  | {
      kind: 'textureMagic'
      resistanceType?: TcgBattleEnergyType
      weaknessType?: TcgBattleEnergyType
    }

export type TcgBattleChoiceRequirement =
  | 'copyAttack'
  | 'disableAttack'
  | 'discardPokemon'
  | 'opponentBench'
  | 'ownBench'
  | 'optionalOpponentBench'
  | 'optionalOwnBench'
  | 'energyAmount'
  | 'typeChange'
  | 'textureMagic'

export type TcgBattleSpecialRule =
  | {
      kind: 'switch'
      target: 'self' | 'opponent'
      condition?: TcgBattleCoinCondition
      ifTargetSurvives?: boolean
      beforeDamage?: boolean
      poisonAfterSwitch?: boolean
    }
  | { kind: 'disableAttack'; condition?: TcgBattleCoinCondition }
  | { kind: 'buffAttack'; attackName?: string; target?: 'self' | 'opponent'; baseDamage?: number; damageBonus?: number; damageMultiplier?: number; selfDamageMultiplier?: number }
  | { kind: 'buffDefendingPokemon'; damageBonus: number }
  | { kind: 'blockTargeting'; condition?: TcgBattleCoinCondition; targetMaxHpAtMost?: number }
  | { kind: 'cannotAttack'; target?: 'self' | 'opponent'; condition?: TcgBattleCoinCondition }
  | { kind: 'disableSelfAttack'; attackName: string; condition?: TcgBattleCoinCondition }
  | { kind: 'preventRetreat'; condition?: TcgBattleCoinCondition; untilSourceLeaves?: boolean; untilTargetLeaves?: boolean; sourceLeavesClears?: boolean }
  | { kind: 'preventSwitch'; condition?: TcgBattleCoinCondition; sourceLeavesClears?: boolean }
  | { kind: 'endure'; condition?: TcgBattleCoinCondition }
  | { kind: 'attackFailsOnTails'; condition?: TcgBattleCoinCondition }
  | { kind: 'grow'; maxHp: number; attackName: string; baseDamage: number; condition?: TcgBattleCoinCondition }
  | { kind: 'swapDamageCounters'; condition?: TcgBattleCoinCondition }
  | { kind: 'reviveDiscardPokemon' }
  | { kind: 'changeWeakness'; condition?: TcgBattleCoinCondition }
  | { kind: 'changeResistance'; condition?: TcgBattleCoinCondition }
  | { kind: 'changeType'; condition?: TcgBattleCoinCondition }
  | { kind: 'textureMagic' }
  | { kind: 'destinyBond' }
  | { kind: 'mirrorLastDamage' }
  | { kind: 'reflectDamage'; damageMultiplier?: number; coinGate?: TcgBattleCoinCondition }
  | { kind: 'placeMarker'; marker: 'lightningRod' }
  | { kind: 'markerDamage'; marker: 'lightningRod'; amount: number }
  | { kind: 'copyAttack'; coinGate?: TcgBattleCoinCondition; preserveExtraCosts: boolean }

export type TcgBattleStatusResolution = {
  target: 'self' | 'opponent'
  statuses: TcgBattleStatusCondition[]
}

export type TcgBattleIncomingAttackModifier =
  | { kind: 'preventAll'; remainingOpponentTurns: number }
  | { kind: 'preventAllEffects'; remainingOpponentTurns: number }
  | { kind: 'reduce'; amount: number; remainingOpponentTurns: number; attackerId?: string }
  | { kind: 'preventAtMost'; amount: number; remainingOpponentTurns: number }
  | { kind: 'halve'; remainingOpponentTurns: number }
  | { kind: 'coinPreventDamage'; preventOn: TcgBattleCoinResult; remainingOpponentTurns: number; persistent?: boolean }

export interface TcgBattleTemporaryEffects {
  disabledAttack?: { attackIndex: number; remainingTurns: number }
  cannotAttack?: { remainingTurns: number }
  cannotRetreat?: { remainingTurns: number; sourceId?: string; untilSourceLeaves?: boolean; untilTargetLeaves?: boolean }
  cannotSwitch?: { remainingTurns: number; sourceId?: string; untilSourceLeaves?: boolean }
  endure?: { remainingTurns: number }
  attackFailsOnTails?: true
  cannotTarget?: { targetId: string; remainingTurns: number }
  nextAttackBuff?: { attackName: string; baseDamage?: number; damageBonus?: number; damageMultiplier?: number; selfDamageMultiplier?: number; remainingTurns: number }
  attackBaseDamageOverrides?: { attackName: string; baseDamage: number }[]
  originalMaxHp?: number
  weaknessType?: TcgBattleEnergyType
  resistanceType?: TcgBattleEnergyType
  battleType?: TcgBattleEnergyType
  destinyBond?: { remainingTurns: number }
  reflectDamage?: { remainingTurns: number; damageMultiplier?: number; coinGate?: TcgBattleCoinCondition }
  lastIncomingAttackDamage?: number
  attackDamageTakenBuff?: { sourceSide: TcgBattleSide; damageBonus: number; remainingTurns: number }
}

export interface TcgBattleAttackEffect {
  damage: TcgBattleDamageRule
  coinFlipCount?: number
  coinFlipSource?: TcgBattleCountSource
  flipUntilTails?: boolean
  selfDamage?: TcgBattleSelfDamageRule[]
  selfKnockOut?: boolean
  energyDiscard?: TcgBattleEnergyDiscardRule[]
  status?: TcgBattleStatusRule[]
  benchDamage?: TcgBattleBenchDamageRule[]
  counterDamage?: TcgBattleCounterDamageRule[]
  healing?: TcgBattleHealingRule[]
  energyGain?: TcgBattleEnergyGainRule[]
  protection?: TcgBattleProtectionRule[]
  targetScope?: 'front' | 'bench' | 'any'
  ignoreWeaknessResistance?: boolean
  choiceRequirement?: TcgBattleChoiceRequirement
  special?: TcgBattleSpecialRule[]
}

function shouldIgnoreTcgWeaknessAndResistance(text: string): boolean {
  return (
    /(?:this attack(?:'s)? damage|this damage) (?:isn't|is not) affected by weakness(?:,| or| and) resistance\b/.test(text) ||
    /(?:don't|do not) apply weakness and resistance for (?:this attack|this damage)\b/.test(text)
  )
}

export type TcgBattleAttack = TcgCardAttack & {
  battleEffect?: TcgBattleAttackEffect
}

export const TCG_BATTLE_FORMATS: Record<
  TcgBattleDeckFormat,
  { label: string; deckCostLimit: number; startingEnergy: number; energyCap: number; chargeGain: number }
> = {
  baby: { label: 'Baby', deckCostLimit: 30, startingEnergy: 5, energyCap: 12, chargeGain: 2 },
  champions: { label: 'Champions', deckCostLimit: 55, startingEnergy: 5, energyCap: 16, chargeGain: 2 },
  masters: { label: 'Masters', deckCostLimit: 85, startingEnergy: 6, energyCap: 22, chargeGain: 2 },
}

export interface TcgBattleCardSummary {
  id: string
  name: string
  hp: number
  types: string[]
  subtypes: string[]
  evolvesTo?: string[]
  image: string
  cost: number
  convertedRetreatCost: number
  attacks: TcgBattleAttack[]
  weaknesses: { type: string; value: string }[]
  resistances: { type: string; value: string }[]
}

export interface TcgBattleCardState extends TcgBattleCardSummary {
  instanceId: string
  currentHp: number
  statusConditions?: TcgBattleStatusCondition[]
  incomingAttackModifier?: TcgBattleIncomingAttackModifier
  temporaryEffects?: TcgBattleTemporaryEffects
  markers?: Array<'lightningRod'>
}

export interface TcgBattleSideState {
  deck: TcgBattleCardSummary[]
  hand: TcgBattleCardState[]
  front: TcgBattleCardState[]
  back: TcgBattleCardState[]
  discard: TcgBattleCardState[]
  energy: number
  selectedEnergy?: TcgBattleEnergyType
}

export interface TcgBattleTrainerCard {
  name: string
  icon?: string
  banner?: string
  title?: string
}

export type TcgBattleEffectEvent =
  | { id: string; kind: 'switch'; side: TcgBattleSide; sourceId: string; targetId: string }
  | { id: string; kind: 'control'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'type'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'marker'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'copy'; sourceId: string; targetId: string; label: string }
  | { id: string; kind: 'energy'; side: TcgBattleSide; sourceId: string; amount: number }

export type TcgBattleLastAction = {
  id: string
  side: TcgBattleSide
  kind:
    | 'arrange'
    | 'attack'
    | 'retreat'
    | 'charge'
    | 'promote'
    | 'surrender'
    | 'timeout'
  attackerId?: string
  attackIndex?: number
  targetId?: string
  frontId?: string
  backId?: string
  cardId?: string
}

export interface TcgBattleState {
  userId: string
  encounterId: string
  battleMode?: TcgBattleMode
  matchId?: string
  format: TcgBattleDeckFormat
  phase: TcgBattlePhase
  turnNumber: number
  activeSide: TcgBattleSide
  player: TcgBattleSideState
  opponent: TcgBattleSideState
  pendingPromotion?: TcgBattleSide
  consecutivePasses: number
  winner?: TcgBattleSide | 'tie'
  lastDamageEvent?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    damage: number
    reason?: 'attack' | 'self' | 'confusion' | 'status'
  }
  lastDamageEvents?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    damage: number
    reason?: 'attack' | 'self' | 'confusion' | 'status'
  }[]
  lastCoinFlipEvent?: {
    id: string
    sourceId: string
    side: TcgBattleSide
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }
  lastCoinFlipEvents?: {
    id: string
    sourceId: string
    side: TcgBattleSide
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }[]
  lastStatusEvent?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    statuses: TcgBattleStatusCondition[]
  }
  lastStatusEvents?: {
    id: string
    sourceId: string
    targetId: string
    targetSide: TcgBattleSide
    statuses: TcgBattleStatusCondition[]
  }[]
  lastEffectEvents?: TcgBattleEffectEvent[]
  log: string[]
  playerTrainer?: TcgBattleTrainerCard
  enemyTrainer?: TcgBattleTrainerCard
  ready?: Record<TcgBattleSide, boolean>
  revision?: number
  lastAction?: TcgBattleLastAction
  deadlineAt?: number
  pendingPromotions?: TcgBattleSide[]
  resumeSideAfterPromotion?: TcgBattleSide
  outcomeReason?: 'knockout' | 'stall' | 'surrender' | 'timeout'
  noContest?: boolean
  startedAt: number
  updatedAt: number
}

export interface TcgPvpSharedBattleState extends TcgBattleState {
  battleMode: 'pvp'
  matchId: string
  participantIds: Record<TcgBattleSide, string>
  ready: Record<TcgBattleSide, boolean>
  revision: number
  deadlineAt: number
  statsFinalized?: boolean
  acknowledgedBy?: string[]
}

export function flipTcgBattleSide(side: TcgBattleSide): TcgBattleSide {
  return side === 'player' ? 'opponent' : 'player'
}

function cloneTcgBattlePerspectiveSide(
  side: TcgBattleSideState,
): TcgBattleSideState {
  return {
    ...side,
    deck: [...side.deck],
    hand: [...side.hand],
    front: [...side.front],
    back: [...side.back],
    discard: [...side.discard],
  }
}

function flipTcgBattleEffectEvent(
  event: TcgBattleEffectEvent,
): TcgBattleEffectEvent {
  if ('side' in event) {
    return { ...event, side: flipTcgBattleSide(event.side) }
  }
  return { ...event }
}

export function toTcgPvpPerspectiveState(
  shared: TcgPvpSharedBattleState,
  viewerUserId: string,
): TcgBattleState | null {
  const isCanonicalPlayer = shared.participantIds.player === viewerUserId
  const isCanonicalOpponent = shared.participantIds.opponent === viewerUserId
  if (!isCanonicalPlayer && !isCanonicalOpponent) return null

  const shouldFlip = isCanonicalOpponent
  const ownSide = cloneTcgBattlePerspectiveSide(
    shouldFlip ? shared.opponent : shared.player,
  )
  const opposingSide = cloneTcgBattlePerspectiveSide(
    shouldFlip ? shared.player : shared.opponent,
  )

  // The opponent's unused deck, private arrangement, and selected Energy remain
  // server-only until the relevant public battle state makes them visible.
  opposingSide.deck = []
  opposingSide.hand = []
  if (shared.phase === 'arranging') {
    opposingSide.front = []
    opposingSide.back = []
  }
  if (shared.turnNumber < 15) opposingSide.selectedEnergy = undefined

  const flipSide = (side: TcgBattleSide) =>
    shouldFlip ? flipTcgBattleSide(side) : side
  const { participantIds: _participantIds, ...publicState } = shared

  return {
    ...publicState,
    userId: viewerUserId,
    player: ownSide,
    opponent: opposingSide,
    activeSide: flipSide(shared.activeSide),
    pendingPromotion: shared.pendingPromotion
      ? flipSide(shared.pendingPromotion)
      : undefined,
    pendingPromotions: shared.pendingPromotions?.map(flipSide),
    resumeSideAfterPromotion: shared.resumeSideAfterPromotion
      ? flipSide(shared.resumeSideAfterPromotion)
      : undefined,
    winner:
      shared.winner === 'tie' || !shared.winner
        ? shared.winner
        : flipSide(shared.winner),
    ready: {
      player: shouldFlip ? shared.ready.opponent : shared.ready.player,
      opponent: shouldFlip ? shared.ready.player : shared.ready.opponent,
    },
    playerTrainer: shouldFlip ? shared.enemyTrainer : shared.playerTrainer,
    enemyTrainer: shouldFlip ? shared.playerTrainer : shared.enemyTrainer,
    lastAction: shared.lastAction
      ? { ...shared.lastAction, side: flipSide(shared.lastAction.side) }
      : undefined,
    lastDamageEvent: shared.lastDamageEvent
      ? {
          ...shared.lastDamageEvent,
          targetSide: flipSide(shared.lastDamageEvent.targetSide),
        }
      : undefined,
    lastDamageEvents: shared.lastDamageEvents?.map((event) => ({
      ...event,
      targetSide: flipSide(event.targetSide),
    })),
    lastCoinFlipEvent: shared.lastCoinFlipEvent
      ? {
          ...shared.lastCoinFlipEvent,
          side: flipSide(shared.lastCoinFlipEvent.side),
        }
      : undefined,
    lastCoinFlipEvents: shared.lastCoinFlipEvents?.map((event) => ({
      ...event,
      side: flipSide(event.side),
    })),
    lastStatusEvent: shared.lastStatusEvent
      ? {
          ...shared.lastStatusEvent,
          targetSide: flipSide(shared.lastStatusEvent.targetSide),
        }
      : undefined,
    lastStatusEvents: shared.lastStatusEvents?.map((event) => ({
      ...event,
      targetSide: flipSide(event.targetSide),
    })),
    lastEffectEvents: shared.lastEffectEvents?.map((event) =>
      shouldFlip ? flipTcgBattleEffectEvent(event) : { ...event },
    ),
  }
}

const TCG_BATTLE_ENERGY_TYPES: readonly TcgBattleEnergyType[] = [
  'Grass',
  'Fire',
  'Water',
  'Lightning',
  'Psychic',
  'Fighting',
  'Darkness',
  'Metal',
  'Fairy',
  'Dragon',
  'Colorless',
]

export function normalizeTcgBattleEnergyType(value: unknown): TcgBattleEnergyType | null {
  if (typeof value !== 'string') return null
  return TCG_BATTLE_ENERGY_TYPES.includes(value as TcgBattleEnergyType)
    ? (value as TcgBattleEnergyType)
    : null
}

function getTcgBattleGlobalEnergyReductions(state: TcgBattleState): Partial<Record<TcgBattleEnergyType, number>> {
  if (state.turnNumber < 15) return {}
  const reductions: Partial<Record<TcgBattleEnergyType, number>> = {}
  for (const energyType of [state.player.selectedEnergy, state.opponent.selectedEnergy]) {
    if (!energyType) continue
    reductions[energyType] = (reductions[energyType] || 0) + 1
  }
  return reductions
}

export function getEffectiveTcgBattleAttackCost(state: TcgBattleState, attack: TcgBattleAttack): number {
  const costs = attack.cost || []
  if (costs.length === 0) return attack.convertedEnergyCost ?? 0

  const reductions = getTcgBattleGlobalEnergyReductions(state)
  if (Object.keys(reductions).length === 0) return costs.length

  let reduced = 0
  const used = {} as Partial<Record<TcgBattleEnergyType, number>>
  for (const costType of costs) {
    const normalizedType = normalizeTcgBattleEnergyType(costType)
    if (!normalizedType) continue
    const available = reductions[normalizedType] || 0
    const alreadyUsed = used[normalizedType] || 0
    if (available > alreadyUsed) {
      used[normalizedType] = alreadyUsed + 1
      reduced += 1
    }
  }

  return Math.max(0, costs.length - reduced)
}

export interface TcgBattleDeckValidation {
  valid: boolean
  errors: string[]
  cards: TcgBattleCardSummary[]
  totalCost: number
}

export function normalizeTcgDeckFormat(value: unknown): TcgBattleDeckFormat | null {
  return value === 'baby' || value === 'champions' || value === 'masters' ? value : null
}

export async function buildTcgBattleCardSummary(cardId: string): Promise<TcgBattleCardSummary | null> {
  const card = await getTcgCardDetailById(cardId)
  if (!card || !isTcgBattleCardLegal(card)) return null
  const setId = card.id.slice(0, card.id.lastIndexOf('-'))
  const attacks = getSupportedTcgBattleAttacks(card.attacks || [], setId)

  return {
    id: card.id,
    name: card.name,
    hp: Number.parseInt(card.hp || '0', 10),
    types: card.types || [],
    subtypes: card.subtypes || [],
    evolvesTo: card.evolvesTo || [],
    image: card.images.large || card.images.small,
    cost: calculateTcgBattleCardCost(card),
    convertedRetreatCost: card.convertedRetreatCost ?? 1,
    attacks,
    weaknesses: card.weaknesses || [],
    resistances: card.resistances || [],
  }
}

export function isTcgBattleCardLegal(card: TcgCardDetail): boolean {
  const hp = Number.parseInt(card.hp || '0', 10)
  const setId = card.id.slice(0, card.id.lastIndexOf('-'))
  const supportedAttacks = getSupportedTcgBattleAttacks(card.attacks || [], setId)
  return (
    card.supertype === 'Pokémon' &&
    Number.isFinite(hp) &&
    hp > 0 &&
    (card.types?.length || 0) > 0 &&
    supportedAttacks.length > 0 &&
    Boolean(card.images?.small || card.images?.large)
  )
}

export function calculateTcgBattleCardCost(
  card: Pick<TcgCardDetail, 'name' | 'subtypes' | 'evolvesTo'>,
): number {
  const subtypes = (card.subtypes || []).map((subtype) => subtype.toUpperCase())
  const name = card.name.toUpperCase()
  const special15 = ['VMAX', 'VSTAR', 'MEGA', 'TAG TEAM', 'LEGEND', 'V-UNION', 'ETERNAMAX']
  if (special15.some((marker) => subtypes.includes(marker) || name.includes(marker))) return 15

  const special10 = ['EX', 'GX', 'V', 'RADIANT']
  if (special10.some((marker) => subtypes.includes(marker) || name.includes(` ${marker}`))) return 10

  if (subtypes.includes('STAGE 2')) return 5
  if (subtypes.includes('STAGE 1')) return 3
  if (subtypes.includes('BASIC')) return (card.evolvesTo?.length || 0) > 0 ? 1 : 5
  return 5
}

export async function validateTcgBattleDeck(
  cardIds: string[],
  collection: Record<string, number>,
  format: TcgBattleDeckFormat,
): Promise<TcgBattleDeckValidation> {
  const errors: string[] = []
  const uniqueIds = Array.from(new Set(cardIds.filter(Boolean)))
  if (uniqueIds.length !== 15 || cardIds.length !== 15) {
    errors.push('Deck must contain exactly 15 unique cards.')
  }

  const cards: TcgBattleCardSummary[] = []
  for (const cardId of uniqueIds) {
    if ((collection[cardId] || 0) <= 0) {
      errors.push(`${cardId} is not in your collection.`)
      continue
    }
    const card = await buildTcgBattleCardSummary(cardId)
    if (!card) {
      errors.push(`${cardId} is not a legal battle card.`)
      continue
    }
    cards.push(card)
  }

  const totalCost = cards.reduce((sum, card) => sum + card.cost, 0)
  const limit = TCG_BATTLE_FORMATS[format].deckCostLimit
  if (totalCost > limit) {
    errors.push(`Deck cost ${totalCost} exceeds the ${limit} ${TCG_BATTLE_FORMATS[format].label} limit.`)
  }

  return { valid: errors.length === 0, errors, cards, totalCost }
}

export async function autoBuildTcgBattleDeck(
  collection: Record<string, number>,
  format: TcgBattleDeckFormat,
): Promise<TcgBattleDeckValidation> {
  const candidates: TcgBattleCardSummary[] = []
  for (const [cardId, qty] of Object.entries(collection)) {
    if (qty <= 0) continue
    const summary = await buildTcgBattleCardSummary(cardId)
    if (summary) candidates.push(summary)
  }

  const limit = TCG_BATTLE_FORMATS[format].deckCostLimit
  const candidatesByCost = new Map<number, TcgBattleCardSummary[]>()
  for (const card of candidates) {
    const cardsAtCost = candidatesByCost.get(card.cost) || []
    cardsAtCost.push(card)
    candidatesByCost.set(card.cost, cardsAtCost)
  }

  // Only the best fifteen cards at each cost can contribute to a fifteen-card
  // deck. Keeping that bounded pool makes the format-aware selection cheap
  // even when a trainer owns the full catalog.
  const candidatePool = Array.from(candidatesByCost.values()).flatMap((cards) =>
    [...cards]
      .sort((a, b) => getCardBattleScore(b) - getCardBattleScore(a))
      .slice(0, 15),
  )
  type DeckState = { score: number; cards: TcgBattleCardSummary[] }
  const states: Array<Array<DeckState | undefined>> = Array.from(
    { length: 16 },
    () => Array.from({ length: limit + 1 }),
  )
  states[0][0] = { score: 0, cards: [] }

  for (const card of candidatePool) {
    for (let count = 14; count >= 0; count -= 1) {
      for (let currentCost = 0; currentCost + card.cost <= limit; currentCost += 1) {
        const state = states[count][currentCost]
        if (!state) continue
        const nextCost = currentCost + card.cost
        const nextScore = state.score + getCardBattleScore(card)
        const existing = states[count + 1][nextCost]
        if (!existing || nextScore > existing.score) {
          states[count + 1][nextCost] = {
            score: nextScore,
            cards: [...state.cards, card],
          }
        }
      }
    }
  }

  let selected: TcgBattleCardSummary[] = []
  let totalCost = 0
  let bestScore = -Infinity
  for (let cost = 0; cost <= limit; cost += 1) {
    const state = states[15][cost]
    if (!state) continue
    if (state.score > bestScore || (state.score === bestScore && cost > totalCost)) {
      selected = state.cards
      totalCost = cost
      bestScore = state.score
    }
  }

  const errors = selected.length === 15 ? [] : ['Not enough legal owned cards to build this format.']
  return { valid: errors.length === 0, errors, cards: selected, totalCost }
}

export function createTcgBattleCardState(card: TcgBattleCardSummary, index: number): TcgBattleCardState {
  return {
    ...card,
    instanceId: `${card.id}:${index}:${Math.random().toString(36).slice(2, 8)}`,
    currentHp: card.hp,
  }
}

export function drawTcgBattleCards(cards: TcgBattleCardSummary[], count: number): TcgBattleCardState[] {
  const pool = [...cards]
  const drawn: TcgBattleCardState[] = []
  while (pool.length > 0 && drawn.length < count) {
    const index = Math.floor(Math.random() * pool.length)
    const [card] = pool.splice(index, 1)
    drawn.push(createTcgBattleCardState(card, drawn.length))
  }
  return drawn
}

export function arrangeOpponentTcgBattleCards(cards: TcgBattleCardState[]) {
  const sorted = [...cards].sort((a, b) => getCardBattleScore(b) - getCardBattleScore(a))
  return { front: sorted.slice(0, 3), back: sorted.slice(3, 6) }
}

export function getAllowedTcgBattleAttackCost(turnNumber: number): number {
  if (turnNumber >= 10) return Number.POSITIVE_INFINITY
  if (turnNumber >= 7) return 4
  if (turnNumber >= 5) return 3
  if (turnNumber >= 3) return 2
  return 1
}

export function getTcgBattleCardUnlockTurn(cardCost: number): number {
  if (cardCost >= 15) return 10
  if (cardCost >= 10) return 7
  return 1
}

export function isTcgBattleCardUnlocked(cardCost: number, turnNumber: number): boolean {
  return turnNumber >= getTcgBattleCardUnlockTurn(cardCost)
}

export function getTcgBattleCardUnlockTurnForCard(card: Pick<TcgBattleCardSummary, 'cost' | 'subtypes'>): number {
  const subtypeSet = new Set((card.subtypes || []).map((entry) => entry.toUpperCase()))
  const stageTurn = subtypeSet.has('STAGE 2') ? 5 : subtypeSet.has('STAGE 1') ? 3 : 1
  return Math.max(stageTurn, getTcgBattleCardUnlockTurn(card.cost))
}

export function isTcgBattleSummaryUnlocked(card: Pick<TcgBattleCardSummary, 'cost' | 'subtypes'>, turnNumber: number) {
  return turnNumber >= getTcgBattleCardUnlockTurnForCard(card)
}

export function getNextTcgBattleTurnNumber(
  turnNumber: number,
  currentSide: TcgBattleSide,
  nextSide: TcgBattleSide,
): number {
  return currentSide === 'opponent' && nextSide === 'player' ? turnNumber + 1 : turnNumber
}

export function hasTcgBattleReachedFinalAttackAllowance(turnNumber: number): boolean {
  return getAllowedTcgBattleAttackCost(turnNumber) === Number.POSITIVE_INFINITY
}

export function parseTcgAttackDamage(damage: string): number {
  const normalized = damage.trim()
  return /^\d+$/.test(normalized) ? Number.parseInt(normalized, 10) : 0
}

export function isCleanTcgAttackDamage(damage: string): boolean {
  return /^\d+$/.test(damage.trim())
}

export function getCleanDamageTcgAttacks(attacks: TcgCardAttack[], setId?: string): TcgBattleAttack[] {
  return getSupportedTcgBattleAttacks(attacks, setId)
}

export function getSupportedTcgBattleAttacks(attacks: TcgCardAttack[], setId?: string): TcgBattleAttack[] {
  return attacks.flatMap((attack): TcgBattleAttack[] => {
    const battleEffect = inferTcgBattleAttackEffect(attack, setId)
    return battleEffect ? [{ ...attack, battleEffect }] : []
  })
}

export function inferTcgBattleAttackEffect(attack: TcgCardAttack, setId?: string): TcgBattleAttackEffect | null {
  const text = normalizeTcgAttackText(attack.text || '')
  const ignoreWeaknessResistance = shouldIgnoreTcgWeaknessAndResistance(text)
  const normalizedDamage = normalizeTcgDamageText(attack.damage || '')
  const exactDamage = parseTcgAttackDamage(normalizedDamage)
  const baseDamage = parseTcgAttackBaseDamage(normalizedDamage)
  const neoEffect = inferNeoTcgBattleAttackEffect(attack, text, normalizedDamage, baseDamage, setId)
  if (neoEffect) {
    return ignoreWeaknessResistance
      ? { ...neoEffect, ignoreWeaknessResistance: true }
      : neoEffect
  }
  const classicEffect = inferClassicTcgBattleAttackEffect(attack, text, normalizedDamage, baseDamage, setId)
  if (classicEffect) {
    return ignoreWeaknessResistance
      ? { ...classicEffect, ignoreWeaknessResistance: true }
      : classicEffect
  }
  const selfDamage = inferTcgBattleSelfDamage(text)
  const energyDiscard = inferTcgBattleEnergyDiscard(text)
  const status = inferTcgBattleStatus(text)
  const benchDamage = inferTcgBattleBenchDamage(text)
  const counterDamage = inferTcgBattleCounterDamage(text)
  const healing = inferTcgBattleHealing(text)
  const protection = inferTcgBattleProtection(text)
  const selfKnockOut = /\b(?:knock out this pokemon|this pokemon is knocked out)\b/.test(text)
  const selfEffects = selfDamage.length > 0 ? selfDamage : undefined
  const energyDiscardEffects = energyDiscard.length > 0 ? energyDiscard : undefined
  const statusEffects = status.length > 0 ? status : undefined
  const benchDamageEffects = benchDamage.length > 0 ? benchDamage : undefined
  const counterDamageEffects = counterDamage.length > 0 ? counterDamage : undefined
  const healingEffects = healing.length > 0 ? healing : undefined
  const protectionEffects = protection.length > 0 ? protection : undefined
  const conditionalEffectCoinFlip =
    hasConditionalSelfDamage(selfDamage) ||
    hasConditionalEnergyDiscard(energyDiscard) ||
    hasConditionalStatus(status) ||
    hasConditionalProtection(protection) ||
    benchDamage.some((rule) => Boolean(rule.condition)) ||
    counterDamage.some((rule) => 'condition' in rule && Boolean(rule.condition)) ||
    healing.some((rule) => 'condition' in rule && Boolean(rule.condition))
      ? Math.max(
          parseTcgAttackCoinFlipCount(text) || 1,
          getTcgBattleConditionFlipCount([
            ...selfDamage,
            ...energyDiscard,
            ...status,
            ...benchDamage,
            ...counterDamage,
            ...healing,
            ...protection,
          ]),
        )
      : undefined

  if (isCleanTcgAttackDamage(normalizedDamage)) {
    const tailsZero = /flip a coin\. if tails, this attack does nothing\b/.test(text)
    const anyTailsZero = text.match(
      /flip (\d+) coins\. if (?:1 or both of them are tails|any (?:of them )?are tails|either of them is tails), this attack does nothing\b/,
    )
    const coinFlipCount = tailsZero ? 1 : conditionalEffectCoinFlip
    return {
      damage: anyTailsZero
        ? {
            kind: 'zeroIfAnyTails',
            amount: exactDamage,
            coinFlipCount: Number.parseInt(anyTailsZero[1], 10),
          }
        : tailsZero
          ? { kind: 'zeroOnTails', amount: exactDamage }
          : { kind: 'fixed', amount: exactDamage },
      coinFlipCount: anyTailsZero ? Number.parseInt(anyTailsZero[1], 10) : coinFlipCount,
      selfDamage: selfEffects,
      selfKnockOut,
      energyDiscard: energyDiscardEffects,
      status: statusEffects,
      benchDamage: benchDamageEffects,
      counterDamage: counterDamageEffects,
      healing: healingEffects,
      protection: protectionEffects,
      ignoreWeaknessResistance,
    }
  }

  const variableDamage = inferVariableTcgBattleDamage(text, normalizedDamage, baseDamage)
  if (!variableDamage) {
    const hasStandaloneUtilityEffect =
      Boolean(statusEffects) ||
      Boolean(benchDamageEffects) ||
      Boolean(counterDamageEffects) ||
      Boolean(healingEffects) ||
      Boolean(protectionEffects) ||
      hasNonSelfTcgBattleEnergyDiscard(energyDiscard)

    if (!hasStandaloneUtilityEffect) {
      return null
    }
    return {
      damage: { kind: 'fixed', amount: 0 },
      coinFlipCount: conditionalEffectCoinFlip,
      selfDamage: selfEffects,
      selfKnockOut,
      energyDiscard: energyDiscardEffects,
      status: statusEffects,
      benchDamage: benchDamageEffects,
      counterDamage: counterDamageEffects,
      healing: healingEffects,
      protection: protectionEffects,
      ignoreWeaknessResistance,
    }
  }

  return {
    ...variableDamage,
    coinFlipCount: variableDamage.coinFlipCount || conditionalEffectCoinFlip,
    selfDamage: selfEffects,
    selfKnockOut,
    energyDiscard: energyDiscardEffects,
    status: statusEffects,
    benchDamage: benchDamageEffects,
    counterDamage: counterDamageEffects,
    healing: healingEffects,
    protection: protectionEffects,
    ignoreWeaknessResistance,
  }
}

function inferNeoTcgBattleAttackEffect(
  attack: TcgCardAttack,
  _text: string,
  _damage: string,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  if (setId !== 'neo1' && setId !== 'neo2') return null

  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  if (name === 'flower dance' && setId === 'neo1') {
    return {
      damage: {
        kind: 'count',
        baseDamage: 0,
        perUnitDamage: 30,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Bellossom'] },
      },
    }
  }
  if (name === 'sweet nectar' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ amount: 'all', side: 'own', zone: 'play', maxTargets: 1, condition: 'heads' }],
    }
  }
  if (name === 'chomp' && setId === 'neo1') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'damageCounters', target: 'attacker' },
    }
  }
  if (name === 'super metronome' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', coinGate: 'heads', preserveExtraCosts: false }],
    }
  }
  if (name === 'flame burst' && setId === 'neo1') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      selfDamage: [{ kind: 'fixed', amount: 20, condition: 'heads' }],
    }
  }
  if (name === 'mean look' && setId === 'neo1') {
    return { ...zero(), special: [{ kind: 'preventRetreat', untilSourceLeaves: true }] }
  }
  if (name === 'feint attack' && setId === 'neo1') {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'feint attack' && setId === 'neo2') {
    // The source's attack text is missing from the local card data. Neo's
    // Umbreon card uses the same 20-damage, any-target effect as the Neo card.
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'beat up' && setId === 'neo1') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonInPlay', side: 'own' },
    }
  }
  if (name === 'spider web' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'preventRetreat', condition: 'heads', untilTargetLeaves: true }],
    }
  }
  if (name === 'sweet scent' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [
        { amount: 20, side: 'own', zone: 'play', maxTargets: 1, condition: 'heads' },
        { amount: 20, side: 'opponent', zone: 'play', maxTargets: 1, condition: 'tails' },
      ],
    }
  }
  if (name === 'discharge' && setId === 'neo1') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'all' }],
    }
  }
  if (name === 'screech' && setId === 'neo1') {
    return { ...zero(), special: [{ kind: 'buffDefendingPokemon', damageBonus: 20 }] }
  }
  if (name === 'sticky nectar' && setId === 'neo1') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
      coinFlipCount: 1,
      special: [
        { kind: 'preventRetreat', condition: 'heads', sourceLeavesClears: true },
        { kind: 'preventSwitch', condition: 'heads', sourceLeavesClears: true },
      ],
    }
  }
  if (name === 'raging charge' && setId === 'neo1') {
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'damageCounters', target: 'attacker' },
      },
      selfDamage: [{ kind: 'fixed', amount: 20 }],
    }
  }
  if (name === 'milk drink' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 2,
      healing: [
        { target: 'self', amount: 20, condition: { result: 'heads', minimum: 1 } },
        { target: 'self', amount: 20, condition: { result: 'heads', minimum: 2 } },
      ],
    }
  }
  if (name === 'endure' && setId === 'neo1') {
    return { ...zero(), coinFlipCount: 1, special: [{ kind: 'endure', condition: 'heads' }] }
  }
  if (name === 'fin slap' && setId === 'neo1') {
    return { damage: { kind: 'lastHitBonus', baseDamage, bonusDamage: 10 } }
  }
  if (name === 'comet punch' && setId === 'neo1') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 4 },
      coinFlipCount: 4,
    }
  }
  if ((name === 'hide' && setId === 'neo1') || (name === 'detect' && setId === 'neo2')) {
    return {
      ...zero(),
      coinFlipCount: 1,
      protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
    }
  }
  if (name === 'roar' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
    }
  }
  if (name === 'scary face' && setId === 'neo1') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [
        { kind: 'cannotAttack', target: 'opponent', condition: 'heads' },
        { kind: 'preventRetreat', condition: 'heads' },
      ],
    }
  }
  if (name === 'growth' && setId === 'neo1') {
    return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 2, condition: 'heads' }] }
  }
  if (name === 'static electricity' && setId === 'neo1') {
    return {
      ...zero(),
      energyGain: [{
        target: 'self',
        amountPerUnit: 1,
        source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Mareep'] },
      }],
    }
  }
  if (name === 'hydrocutter' && setId === 'neo2') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 40, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own', max: 3 },
    }
  }
  if (name === 'false swipe' && setId === 'neo2') {
    return { damage: { kind: 'remainingHpHalfRoundedDown' } }
  }
  if (name === 'double claw' && setId === 'neo2') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 2 },
      coinFlipCount: 2,
    }
  }
  if (name === 'counter' && setId === 'neo2') {
    return {
      ...zero(),
      special: [{ kind: 'reflectDamage', coinGate: 'heads' }],
    }
  }
  if (name === 'shockwave' && setId === 'neo2') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'optionalOpponentBench',
      counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', condition: 'heads' }],
      special: [{ kind: 'switch', target: 'opponent', condition: 'heads' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'hyper reverse' && setId === 'neo2') {
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'energy', side: 'opponent' } },
      healing: [{ target: 'self', amountFrom: 'damageDealt' }],
    }
  }
  if (name === 'hatch' && setId === 'neo2') {
    return {
      ...zero(),
      coinFlipCount: 1,
      healing: [{ target: 'self', amount: 'all', condition: 'heads' }],
    }
  }
  if (name === 'spike barrage' && setId === 'neo2') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 20, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
    }
  }
  if (name === 'belly drum' && setId === 'neo2') {
    return {
      ...zero(),
      selfDamage: [{ kind: 'fixed', amount: 30 }],
      energyGain: [{ target: 'self', amount: 2, requiresSourceSurvival: true }],
    }
  }
  if (name === 'dust devil' && setId === 'neo2') {
    return {
      ...zero(),
      counterDamage: [{ amount: 10, side: 'both', zone: 'play', typeFilter: { exclude: ['Fighting'] } }],
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'fury cutter' && setId === 'neo2') {
    return {
      damage: { kind: 'headsTable', damages: [10, 20, 30, 50, 90], coinFlipCount: 4 },
      coinFlipCount: 4,
    }
  }
  if (name === 'work together' && setId === 'neo2') {
    return {
      damage: {
        kind: 'conditionalCount',
        baseDamage,
        perUnitDamage: 10,
        source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Omanyte', 'Omastar', 'Kabuto', 'Kabutops'] },
        condition: 'heads',
        failureDamage: baseDamage,
      },
      coinFlipCount: 1,
    }
  }
  if (name === 'nap time' && setId === 'neo2') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      status: [{ target: 'self', statuses: ['asleep'] }],
    }
  }
  if (name === 'slime' && setId === 'neo2') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'coinPreventDamage', preventOn: 'tails' }],
    }
  }

  return null
}

export interface TcgBattleAttackResolution {
  targetDamage: number
  targetDamageBeforeModifiers: number
  selfDamage: number
  selfKnockOut: boolean
  benchDamage?: {
    targetSide: TcgBattleSide
    targetId: string
    damage: number
  }[]
  counterDamage?: {
    targetSide: TcgBattleSide
    targetId: string
    damage: number
  }[]
  healing?: {
    targetSide: TcgBattleSide
    targetId: string
    amount: number
  }[]
  protection?: {
    targetSide: TcgBattleSide
    targetId: string
    modifier: TcgBattleIncomingAttackModifier
  }[]
  energyDiscards?: TcgBattleEnergyDiscardResolution[]
  energyGains?: { target: 'self' | 'opponent'; amount: number; requiresSourceSurvival?: boolean }[]
  statusConditions?: TcgBattleStatusResolution[]
  specialEffects?: TcgBattleSpecialRule[]
  copiedAttackName?: string
  coinFlips?: {
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }
}

export interface TcgBattleStatusAttackCheck {
  canAttack: boolean
  blockedStatus?: Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'>
  clearedStatus?: Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'>
  selfDamage: number
  coinFlips?: {
    results: TcgBattleCoinResult[]
    heads: number
    tails: number
  }
}

export function resolveTcgBattleAttack(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  attack: TcgBattleAttack
  target: TcgBattleCardState
  paidAttackCost?: number
  choice?: TcgBattleAttackChoice
  random?: () => number
}): TcgBattleAttackResolution {
  const { state, sideKey, attacker, attack, target, paidAttackCost, choice, random = Math.random } = params
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) {
    return {
      targetDamage: 0,
      targetDamageBeforeModifiers: 0,
      selfDamage: 0,
      selfKnockOut: false,
    }
  }

  const dynamicCoinCount = effect.coinFlipSource
    ? getTcgBattleCount(effect.coinFlipSource, {
        state,
        sideKey,
        attacker,
        target,
        paidAttackCost,
        coinMode: 'actual',
      })
    : effect.coinFlipCount || 0
  const coinFlips = effect.flipUntilTails
    ? rollTcgBattleCoinsUntilTails(random)
    : dynamicCoinCount > 0
      ? rollTcgBattleCoins(dynamicCoinCount, random)
      : undefined

  const copyRule = effect.special?.find((rule) => rule.kind === 'copyAttack')
  if (
    copyRule &&
    doesTcgBattleConditionPass(copyRule.coinGate, coinFlips) &&
    choice?.kind === 'copiedAttack'
  ) {
    const copiedAttack = target.attacks[choice.attackIndex]
    const copiedEffect = copiedAttack && getTcgBattleAttackEffect(copiedAttack)
    if (copiedAttack && copiedEffect && !copiedEffect.special?.some((rule) => rule.kind === 'copyAttack')) {
      const copiedResolution = resolveTcgBattleAttack({
        state,
        sideKey,
        attacker,
        attack: copiedAttack,
        target,
        paidAttackCost: 0,
        choice: choice.followUp,
        random,
      })
      return {
        ...copiedResolution,
        coinFlips: coinFlips || copiedResolution.coinFlips,
        energyDiscards: copyRule.preserveExtraCosts
          ? copiedResolution.energyDiscards
          : copiedResolution.energyDiscards?.filter((discard) => discard.target !== 'self'),
        copiedAttackName: copiedAttack.name,
      }
    }
  }
  let targetDamageBeforeModifiers = calculateTcgBattleRawDamage(effect.damage, {
    state,
    sideKey,
    attacker,
    target,
    paidAttackCost,
    coinFlips,
    choice,
    coinMode: 'actual',
  })
  targetDamageBeforeModifiers = applyTcgBattleTemporaryAttackBoost(attacker, attack, targetDamageBeforeModifiers)
  const targetDamageAfterType = applyTcgWeaknessAndResistance(attacker, target, targetDamageBeforeModifiers)
  const typedDamageBase = effect.ignoreWeaknessResistance ? targetDamageBeforeModifiers : targetDamageAfterType
  const damageTakenBuff = target.temporaryEffects?.attackDamageTakenBuff
  const typedDamage = typedDamageBase > 0 && damageTakenBuff?.sourceSide === sideKey
    ? typedDamageBase + damageTakenBuff.damageBonus
    : typedDamageBase
  const incomingCoinFlips = target.incomingAttackModifier?.kind === 'coinPreventDamage' && typedDamage > 0
    ? rollTcgBattleCoins(1, random)
    : undefined
  const targetDamage = incomingCoinFlips && target.incomingAttackModifier?.kind === 'coinPreventDamage'
    ? incomingCoinFlips.results[0] === target.incomingAttackModifier.preventOn
      ? 0
      : applyTcgBattleIncomingAttackModifier(target, typedDamage, attacker.instanceId)
    : applyTcgBattleIncomingAttackModifier(target, typedDamage, attacker.instanceId)
  const selfDamage = (effect.selfDamage || []).reduce(
    (sum, rule) =>
      doesTcgBattleConditionPass('condition' in rule ? rule.condition : undefined, coinFlips)
        ? sum + calculateTcgBattleSelfDamage(rule, attacker, coinFlips)
        : sum,
    0,
  )
  const attackBuff = attacker.temporaryEffects?.nextAttackBuff
  const boostedSelfDamage = attackBuff?.attackName.toLowerCase() === attack.name.toLowerCase()
    ? Math.round(selfDamage * (attackBuff.selfDamageMultiplier || 1))
    : selfDamage
  const energyDiscards = calculateTcgBattleEnergyDiscards(effect.energyDiscard || [], {
    state,
    sideKey,
    attack,
    paidAttackCost,
    coinFlips,
    choice,
  })
  const statusConditions = calculateTcgBattleStatusConditions(effect.status || [], coinFlips)
  const benchDamage = calculateTcgBattleBenchDamage(effect.benchDamage || [], state, sideKey, random, coinFlips)
  const counterDamage = calculateTcgBattleCounterDamage(
    effect.counterDamage || [],
    state,
    sideKey,
    attacker,
    target,
    random,
    coinFlips,
    paidAttackCost,
    choice,
  )
  const healing = calculateTcgBattleHealing(
    effect.healing || [],
    state,
    sideKey,
    attacker,
    target,
    random,
    targetDamage,
    coinFlips,
  )
  const protection = calculateTcgBattleProtection(effect.protection || [], sideKey, attacker, target, coinFlips)

  return {
    targetDamage,
    targetDamageBeforeModifiers,
    selfDamage: boostedSelfDamage,
    selfKnockOut: Boolean(effect.selfKnockOut),
    benchDamage: benchDamage.length > 0 ? benchDamage : undefined,
    counterDamage: counterDamage.length > 0 ? counterDamage : undefined,
    healing: healing.length > 0 ? healing : undefined,
    energyGains: effect.energyGain
      ?.filter((gain) => doesTcgBattleConditionPass(gain.condition, coinFlips))
      .map((gain) => ({
        target: gain.target,
        amount: gain.amount ?? (gain.amountPerUnit || 0) * (gain.source
          ? getTcgBattleCount(gain.source, { state, sideKey, attacker, target, paidAttackCost, coinMode: 'actual', choice })
          : 0),
        requiresSourceSurvival: gain.requiresSourceSurvival,
      })),
    protection: protection.length > 0 ? protection : undefined,
    energyDiscards: energyDiscards.length > 0 ? energyDiscards : undefined,
    statusConditions: statusConditions.length > 0 ? statusConditions : undefined,
    specialEffects: (effect.special || []).filter((rule) => {
      if (rule.kind === 'copyAttack') return false
      return doesTcgBattleConditionPass('condition' in rule ? rule.condition : undefined, coinFlips)
    }),
    coinFlips: combineTcgBattleCoinFlips(coinFlips, incomingCoinFlips),
  }
}

function combineTcgBattleCoinFlips(
  first?: TcgBattleAttackResolution['coinFlips'],
  second?: TcgBattleAttackResolution['coinFlips'],
): TcgBattleAttackResolution['coinFlips'] {
  if (!first) return second
  if (!second) return first
  const results = [...first.results, ...second.results]
  return { results, heads: first.heads + second.heads, tails: first.tails + second.tails }
}

function applyTcgBattleTemporaryAttackBoost(
  attacker: TcgBattleCardState,
  attack: TcgBattleAttack,
  damage: number,
): number {
  let boostedDamage = damage
  const name = attack.name.toLowerCase()
  const override = attacker.temporaryEffects?.attackBaseDamageOverrides?.find(
    (entry) => entry.attackName.toLowerCase() === name,
  )
  if (override) boostedDamage = Math.max(boostedDamage, override.baseDamage)

  const buff = attacker.temporaryEffects?.nextAttackBuff
  if (buff?.attackName === '*' || buff?.attackName.toLowerCase() === name) {
    if (typeof buff.baseDamage === 'number') boostedDamage = Math.max(boostedDamage, buff.baseDamage)
    if (typeof buff.damageBonus === 'number') boostedDamage += buff.damageBonus
    if (buff.damageMultiplier && buff.damageMultiplier > 1) {
      boostedDamage = Math.round((boostedDamage * buff.damageMultiplier) / 10) * 10
    }
  }
  return boostedDamage
}

export function applyTcgBattleEnergyDiscards(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  energyDiscards: TcgBattleEnergyDiscardResolution[] | undefined,
) {
  if (!energyDiscards || energyDiscards.length === 0) return

  for (const discard of energyDiscards) {
    const targetSideKey = discard.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    state[targetSideKey].energy = Math.max(0, state[targetSideKey].energy - discard.amount)
  }
}

export function applyTcgBattleStatusConditions(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  sourceId: string,
  attackTargetId: string,
  statusConditions: TcgBattleStatusResolution[] | undefined,
) {
  if (!statusConditions || statusConditions.length === 0) return []

  const applied: NonNullable<TcgBattleState['lastStatusEvents']> = []
  for (const statusCondition of statusConditions) {
    const targetSideKey = statusCondition.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    const targetId = statusCondition.target === 'self' ? sourceId : attackTargetId
    const target = state[targetSideKey].front.find((card) => card.instanceId === targetId && card.currentHp > 0)
    if (!target) continue

    const statuses = applyTcgBattleCardStatuses(target, statusCondition.statuses)
    if (statuses.length === 0) continue

    applied.push({
      id: '',
      sourceId,
      targetId: target.instanceId,
      targetSide: targetSideKey,
      statuses,
    })
  }

  return applied
}

export function clearTcgBattleControlStatus(
  card: TcgBattleCardState,
  status: Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'>,
) {
  card.statusConditions = (card.statusConditions || []).filter((condition) => condition !== status)
  if (card.statusConditions.length === 0) card.statusConditions = undefined
}

export function clearTcgBattleStatuses(card: TcgBattleCardState) {
  card.statusConditions = undefined
}

export function applyTcgBattleIncomingAttackModifier(
  card: TcgBattleCardState,
  damage: number,
  attackerId?: string,
): number {
  const modifier = card.incomingAttackModifier
  if (!modifier || damage <= 0) return Math.max(0, damage)
  if (modifier.kind === 'preventAll') return 0
  if (modifier.kind === 'preventAllEffects') return 0
  if (modifier.kind === 'preventAtMost') return damage <= modifier.amount ? 0 : damage
  if (modifier.kind === 'halve') return Math.floor(damage / 20) * 10
  if (modifier.kind === 'coinPreventDamage') return Math.max(0, damage)
  if (modifier.kind === 'reduce') {
    if (modifier.attackerId && modifier.attackerId !== attackerId) return Math.max(0, damage)
    return Math.max(0, damage - Math.max(0, modifier.amount))
  }
  return Math.max(0, damage)
}

export function tickTcgBattleIncomingAttackModifiers(state: TcgBattleState, sideKey: TcgBattleSide) {
  for (const card of [...state[sideKey].front, ...state[sideKey].back]) {
    const modifier = card.incomingAttackModifier
    if (modifier) {
      if (!('persistent' in modifier && modifier.persistent)) {
        modifier.remainingOpponentTurns -= 1
        if (modifier.remainingOpponentTurns <= 0) {
          card.incomingAttackModifier = undefined
        }
      }
    }

    const effects = card.temporaryEffects
    if (!effects) continue
    for (const key of ['disabledAttack', 'cannotAttack', 'cannotRetreat', 'cannotSwitch', 'endure', 'cannotTarget', 'nextAttackBuff', 'destinyBond', 'reflectDamage'] as const) {
      const effect = effects[key]
      if (!effect) continue
      if (key === 'cannotRetreat' && (effects.cannotRetreat?.untilSourceLeaves || effects.cannotRetreat?.untilTargetLeaves)) continue
      effect.remainingTurns -= 1
      if (effect.remainingTurns <= 0) delete effects[key]
    }
  }
}

export function resolveTcgBattleStatusAttackCheck(
  attacker: TcgBattleCardState,
  random: () => number = Math.random,
): TcgBattleStatusAttackCheck {
  const status = getBlockingTcgBattleStatus(attacker)
  if (!status) return { canAttack: true, selfDamage: 0 }

  const coinFlips = rollTcgBattleCoins(1, random)
  if (coinFlips.heads > 0) {
    return {
      canAttack: true,
      clearedStatus: status,
      selfDamage: 0,
      coinFlips,
    }
  }

  return {
    canAttack: false,
    blockedStatus: status,
    selfDamage: status === 'confused' ? 10 : 0,
    coinFlips,
  }
}

export function calculateTcgBattleDamage(
  attacker: TcgBattleCardState,
  attack: TcgBattleAttack,
  target: TcgBattleCardState,
  state?: TcgBattleState,
  sideKey?: TcgBattleSide,
): number {
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) return 0

  const dynamicCount = effect.coinFlipSource
    ? getTcgBattleCount(effect.coinFlipSource, {
        state,
        sideKey,
        attacker,
        target,
        paidAttackCost: attack.convertedEnergyCost ?? attack.cost?.length ?? 0,
        coinMode: 'max',
      })
    : 0
  const projectedCoinCount = effect.flipUntilTails
    ? 1
    : Math.max(0, effect.coinFlipSource ? dynamicCount : effect.coinFlipCount || 0)
  const useTails = effect.damage.kind === 'tailsMultiplier' || effect.damage.kind === 'tailsBonus'
  const projectedCoins = projectedCoinCount > 0
    ? {
        results: Array.from({ length: projectedCoinCount }, () => (useTails ? 'tails' : 'heads') as TcgBattleCoinResult),
        heads: useTails ? 0 : projectedCoinCount,
        tails: useTails ? projectedCoinCount : 0,
      }
    : undefined

  let damage = calculateTcgBattleRawDamage(effect.damage, {
    state,
    sideKey,
    attacker,
    target,
    paidAttackCost: attack.convertedEnergyCost ?? attack.cost?.length ?? 0,
    coinFlips: projectedCoins,
    coinMode: 'max',
  })
  damage = applyTcgBattleTemporaryAttackBoost(attacker, attack, damage)
  return effect.ignoreWeaknessResistance ? damage : applyTcgWeaknessAndResistance(attacker, target, damage)
}

export function getTcgBattleWinner(state: TcgBattleState): TcgBattleSide | 'tie' | null {
  const playerLiving = getLivingTcgBattleCards(state.player).length
  const opponentLiving = getLivingTcgBattleCards(state.opponent).length
  if (playerLiving === 0 && opponentLiving === 0) return 'tie'
  if (playerLiving === 0) return 'opponent'
  if (opponentLiving === 0) return 'player'
  return null
}

export function getTcgBattleTiebreakWinner(state: TcgBattleState): TcgBattleSide | 'tie' {
  const playerHp = getLivingTcgBattleCards(state.player).reduce((sum, card) => sum + card.currentHp, 0)
  const opponentHp = getLivingTcgBattleCards(state.opponent).reduce((sum, card) => sum + card.currentHp, 0)
  if (playerHp > opponentHp) return 'player'
  if (opponentHp > playerHp) return 'opponent'

  const playerLiving = getLivingTcgBattleCards(state.player).length
  const opponentLiving = getLivingTcgBattleCards(state.opponent).length
  if (playerLiving > opponentLiving) return 'player'
  if (opponentLiving > playerLiving) return 'opponent'
  return 'tie'
}

export function getLivingTcgBattleCards(side: TcgBattleSideState): TcgBattleCardState[] {
  return [...side.front, ...side.back].filter((card) => card.currentHp > 0)
}

export function compactTcgBattleBoard(side: TcgBattleSideState): void {
  const faintedFront = side.front.filter((card) => card.currentHp <= 0)
  const faintedBack = side.back.filter((card) => card.currentHp <= 0)
  side.discard.push(...faintedFront, ...faintedBack)
  side.front = side.front.filter((card) => card.currentHp > 0)
  side.back = side.back.filter((card) => card.currentHp > 0)
}

export function chooseOpponentTcgBattleAttack(state: TcgBattleState) {
  const maxCost = getAllowedTcgBattleAttackCost(state.turnNumber)
  let best:
    | {
        attacker: TcgBattleCardState
        target: TcgBattleCardState
        attackIndex: number
        damage: number
        choice?: TcgBattleAttackChoice
      }
    | null = null

  for (const attacker of state.opponent.front.filter((card) => card.currentHp > 0)) {
    if (!isTcgBattleSummaryUnlocked(attacker, state.turnNumber)) continue
    for (const [attackIndex, attack] of attacker.attacks.entries()) {
      if (isTcgBattleAttackDisabled(attacker, attackIndex)) continue
      const cost = getEffectiveTcgBattleAttackCost(state, attack)
      if (cost > maxCost || cost > state.opponent.energy) continue
      for (const target of getValidTcgBattleTargets(state, 'opponent', attacker, attack)) {
        const choice = chooseTcgBattleAttackChoice({
          state,
          sideKey: 'opponent',
          attacker,
          attack,
          target,
          paidAttackCost: cost,
        })
        const requirement = getTcgBattleAttackEffect(attack)?.choiceRequirement
        if (requirement && !choice && !isOptionalBenchChoiceSatisfied(requirement, state, 'opponent')) continue
        const damage = calculateTcgBattleDamage(attacker, attack, target, state, 'opponent')
        if (!best || damage > best.damage || target.currentHp < best.target.currentHp) {
          best = { attacker, target, attackIndex, damage, choice }
        }
      }
    }
  }

  return best
}

export function canSideTakeTcgBattleAction(state: TcgBattleState, sideKey: TcgBattleSide): boolean {
  const side = state[sideKey]
  const opponent = state[sideKey === 'player' ? 'opponent' : 'player']
  if (side.energy <= 0 || opponent.front.every((card) => card.currentHp <= 0)) return false
  const maxCost = getAllowedTcgBattleAttackCost(state.turnNumber)
  return side.front.some((card) =>
    card.currentHp > 0 &&
    isTcgBattleSummaryUnlocked(card, state.turnNumber) &&
    card.attacks.some((attack) => {
      const attackIndex = card.attacks.indexOf(attack)
      if (isTcgBattleAttackDisabled(card, attackIndex)) return false
      const cost = getEffectiveTcgBattleAttackCost(state, attack)
      if (cost > maxCost || cost > side.energy) return false
      return getValidTcgBattleTargets(state, sideKey, card, attack).some((target) => {
        const required = getTcgBattleAttackEffect(attack)?.choiceRequirement
        const choice = required ? chooseTcgBattleAttackChoice({
          state,
          sideKey,
          attacker: card,
          attack,
          target,
          paidAttackCost: cost,
        }) : undefined
        return !required || Boolean(choice) || isOptionalBenchChoiceSatisfied(required, state, sideKey)
      })
    }),
  )
}

function isOptionalBenchChoiceSatisfied(
  requirement: TcgBattleChoiceRequirement,
  state: TcgBattleState,
  sideKey: TcgBattleSide,
): boolean {
  if (requirement === 'optionalOwnBench') {
    return state[sideKey].back.every((card) => card.currentHp <= 0)
  }
  if (requirement === 'optionalOpponentBench') {
    const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
    return state[opponentKey].back.every((card) => card.currentHp <= 0)
  }
  return false
}

export function canSideChargeEnergy(state: TcgBattleState, sideKey: TcgBattleSide): boolean {
  return state[sideKey].energy < TCG_BATTLE_FORMATS[state.format].energyCap
}

export function canTcgBattleEndByPassStall(state: TcgBattleState): boolean {
  return (
    state.consecutivePasses >= 2 &&
    hasTcgBattleReachedFinalAttackAllowance(state.turnNumber) &&
    !canSideTakeTcgBattleAction(state, 'player') &&
    !canSideTakeTcgBattleAction(state, 'opponent') &&
    !canSideChargeEnergy(state, 'player') &&
    !canSideChargeEnergy(state, 'opponent')
  )
}

function normalizeTcgAttackText(text: string): string {
  return text
    .replace(/Pokémon/g, 'Pokemon')
    .replace(/pokémon/g, 'pokemon')
    .replace(/×/g, 'x')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeTcgDamageText(damage: string): string {
  return damage.replace(/×/g, 'x').trim()
}

function parseTcgAttackCoinFlipCount(text: string): number | undefined {
  const multiple = text.match(/\bflip (\d+) coins?\b/)
  if (multiple) return Number.parseInt(multiple[1], 10)
  return /\bflip a coin\b/.test(text) ? 1 : undefined
}

function getTcgBattleConditionFlipCount(rules: unknown[]): number {
  return rules.reduce<number>((maximum, rule) => {
    if (typeof rule !== 'object' || rule === null || !('condition' in rule)) return maximum
    const condition = (rule as { condition?: TcgBattleCoinCondition }).condition
    if (!condition) return maximum
    const count = typeof condition === 'object' ? condition.minimum : 1
    return Math.max(maximum, count)
  }, 0)
}

function inferTcgBattleCoinCondition(text: string): TcgBattleCoinCondition | undefined {
  const both = text.match(/\bif both(?: of them)? are (heads|tails)\b/)
  if (both) return { result: both[1] as TcgBattleCoinResult, minimum: 2 }
  const multiple = text.match(/\bif (?:1|one) or both(?: of them)? are (heads|tails)\b/)
  if (multiple) return { result: multiple[1] as TcgBattleCoinResult, minimum: 1 }
  const any = text.match(/\bif (?:any(?: of them)?|either(?: of them)?) are (heads|tails)\b/)
  if (any) return { result: any[1] as TcgBattleCoinResult, minimum: 1 }
  const simple = text.match(/\bif (heads|tails)\b/)
  return simple?.[1] as TcgBattleCoinCondition | undefined
}

function inferClassicTcgBattleAttackEffect(
  attack: TcgCardAttack,
  text: string,
  damage: string,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  const name = attack.name.toLowerCase()
  const zero = (): TcgBattleAttackEffect => ({ damage: { kind: 'fixed', amount: 0 } })

  // Gym attack names are mapped only when their source set is known.
  if (setId === 'gym1' || setId === 'gym2') {
    if (name === 'discharge') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
        energyDiscard: [{ target: 'self', amount: 'all' }],
      }
    }
    if (name === 'knockout needle') {
      return {
        damage: {
          kind: 'conditionalBonus',
          baseDamage,
          bonusDamage: 60,
          condition: { result: 'heads', minimum: 2 },
        },
        coinFlipCount: 2,
      }
    }
    if (name === 'crosscounter') {
      return {
        ...zero(),
        special: [{ kind: 'reflectDamage', damageMultiplier: 2, coinGate: 'heads' }],
      }
    }
    if (name === 'shadow images') {
      return {
        ...zero(),
        protection: [{ target: 'self', kind: 'coinPreventDamage', preventOn: 'tails' }],
      }
    }
    if (name === 'pain amplifier') {
      return {
        ...zero(),
        counterDamage: [{ amount: 10, side: 'opponent', zone: 'play', onlyDamaged: true }],
      }
    }
    if (name === 'tunneling') {
      return {
        ...zero(),
        benchDamage: [{ amount: 20, side: 'opponent', maxTargets: 2 }],
        special: [{ kind: 'cannotAttack', target: 'self' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'alert') {
      return {
        ...zero(),
        choiceRequirement: 'ownBench',
        special: [{ kind: 'switch', target: 'self' }],
      }
    }
    if (name === 'healing pollen') {
      if (/flip 3 coins/.test(text)) {
        return {
          ...zero(),
          coinFlipCount: 3,
          healing: [{ amount: 0, amountPerHead: 10, side: 'own', zone: 'play' }],
        }
      }
      return {
        ...zero(),
        coinFlipCount: 1,
        healing: [{ target: 'self', amount: 40, condition: 'heads' }],
      }
    }
    if (name === 'lucky shot') {
      return {
        damage: { kind: 'zeroOnTails', amount: 30 },
        coinFlipCount: 1,
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'spiral dive') {
      return {
        ...zero(),
        counterDamage: [{ amount: 10, side: 'opponent', zone: 'play' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'deflector') {
      return { ...zero(), protection: [{ target: 'self', kind: 'halve' }] }
    }
    if (name === 'water punch') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'night spirits') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 0 },
        coinFlipSource: {
          kind: 'namedPokemon',
          side: 'own',
          zone: 'play',
          names: ["Sabrina's Gastly", "Sabrina's Haunter", "Sabrina's Gengar"],
        },
      }
    }
    if (name === 'naptime') {
      return {
        ...zero(),
        coinFlipCount: 1,
        healing: [{ target: 'self', amount: 30, condition: 'heads' }],
        status: [{ target: 'self', statuses: ['asleep'], condition: 'heads' }],
      }
    }
    if (name === 'taunt') {
      return {
        ...zero(),
        choiceRequirement: 'opponentBench',
        special: [{ kind: 'switch', target: 'opponent' }],
      }
    }
    if (name === 'eggsplosion') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
        coinFlipSource: { kind: 'energy', side: 'own' },
      }
    }
    if (name === 'stretch vine') {
      const amount = Number.parseInt(text.match(/this attack does (\d+) damage to (?:it|that pokemon)/)?.[1] || '0', 10)
      return {
        damage: { kind: 'fixed', amount },
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'focus energy') {
      const attackName = text.match(/'s ([a-z][a-z -]*) attack's/)?.[1]
      if (attackName) {
        const damagesSelf = /damage to itself(?:\)| is doubled)/.test(text)
        return {
          ...zero(),
          special: [{ kind: 'buffAttack', attackName, damageMultiplier: 2, selfDamageMultiplier: damagesSelf ? 2 : undefined }],
        }
      }
    }
    if (name === 'spin ball') {
      return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 1 }, coinFlipCount: 1 }
    }
    if (name === 'suggestion') {
      return { ...zero(), coinFlipCount: 1, special: [{ kind: 'cannotAttack', target: 'opponent', condition: 'heads' }] }
    }
    if (name === 'roaring flames') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 20,
          source: { kind: 'unusedEnergy' },
        },
        energyDiscard: [{ target: 'self', amount: 'all' }],
      }
    }
    if (name === 'flame jet') {
      return {
        damage: { kind: 'zeroOnTails', amount: 40 },
        coinFlipCount: 1,
        targetScope: 'any',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'growth') {
      return { ...zero(), coinFlipCount: 1, energyGain: [{ target: 'self', amount: 2, condition: 'heads' }] }
    }
    if (name === 'super removal') {
      return {
        ...zero(),
        coinFlipCount: 1,
        energyDiscard: [{ target: 'opponent', amount: 'opponentPokemon', condition: 'heads' }],
      }
    }
    if (name === 'summon storm') {
      return {
        ...zero(),
        coinFlipCount: 2,
        counterDamage: [{ amount: 20, side: 'both', zone: 'play', excludeAttacker: true, condition: { result: 'heads', minimum: 2 } }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'intimidate') {
      return { ...zero(), special: [{ kind: 'blockTargeting', targetMaxHpAtMost: 50 }] }
    }
    if (name === 'giant growth') {
      return {
        ...zero(),
        coinFlipCount: 1,
        special: [{ kind: 'grow', maxHp: 80, attackName: 'Pound', baseDamage: 30, condition: 'heads' }],
      }
    }
    if (name === 'kerzap') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'self', amount: 'all', condition: 'heads' }],
      }
    }
    if (name === 'juxtapose') {
      return { ...zero(), coinFlipCount: 1, special: [{ kind: 'swapDamageCounters', condition: 'heads' }] }
    }
    if (name === 'lie low') {
      return { ...zero(), protection: [{ target: 'self', kind: 'reduce', amount: 20 }] }
    }
    if (name === 'love lariat') {
      return {
        damage: {
          kind: 'conditionalCount',
          baseDamage,
          perUnitDamage: 50,
          source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ["Giovanni's Nidoking"] },
          minUnits: 0,
          maxUnits: 1,
          condition: 'heads',
        },
        coinFlipCount: 1,
      }
    }
    if (name === 'poison buildup') {
      return { ...zero(), status: [{ target: 'self', statuses: ['poisoned'] }] }
    }
    if (name === 'aerial maneuvers') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
    if (name === 'thunder flare') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 10,
          source: { kind: 'damageCounters', target: 'attacker' },
        },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'fixed', amount: 30, condition: 'tails' }],
      }
    }
    if (name === 'damage shift') {
      return {
        ...zero(),
        healing: [{ amount: 10, side: 'own', zone: 'play' }],
        counterDamage: [{ amountPerUnit: 10, source: { kind: 'injuredPokemon', side: 'own', zone: 'play' }, target: 'opponent' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'invigorate') {
      return {
        ...zero(),
        choiceRequirement: 'discardPokemon',
        special: [{ kind: 'reviveDiscardPokemon' }],
      }
    }
    if (name === 'bonfire') {
      return {
        ...zero(),
        coinFlipCount: 3,
        counterDamage: [{ amountPerHead: 10, side: 'opponent', zone: 'play' }],
        energyDiscard: [{ target: 'self', amount: 'heads' }],
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'rend') {
      return {
        damage: {
          kind: 'count',
          baseDamage,
          perUnitDamage: 20,
          source: { kind: 'damageCounters', target: 'target' },
          maxUnits: 1,
        },
      }
    }
    if (name === 'spontaneous explosion') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 30 },
        coinFlipCount: 1,
        selfDamage: [{ kind: 'fixed', amount: 30, condition: 'heads' }],
      }
    }
    if (name === 'power ball') {
      return {
        damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 3 },
        coinFlipCount: 3,
      }
    }
    if (name === 'shadow attack') {
      return {
        damage: { kind: 'zeroOnTails', amount: 30 },
        coinFlipCount: 1,
        targetScope: 'bench',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'pendulum curse') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 },
        coinFlipSource: { kind: 'damageCounters', target: 'target' },
      }
    }
    if (name === 'life drain') {
      return {
        damage: { kind: 'targetToRemainingHp', remainingHp: 10, condition: 'heads' },
        coinFlipCount: 1,
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'magic darts') {
      return {
        damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 3 },
        coinFlipCount: 3,
        targetScope: 'any',
        ignoreWeaknessResistance: true,
      }
    }
    if (name === 'retaliate') {
      return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
    }
    if (name === 'stoke') {
      return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
    }
    if (name === 'group therapy') {
      return { ...zero(), healing: [{ amount: 10, side: 'both', zone: 'play' }] }
    }
    if (name === 'pulled punch') {
      return { damage: { kind: 'healthyTarget', healthyDamage: 40, damagedDamage: 10 } }
    }
    if (name === 'fury punch') {
      return {
        damage: {
          kind: 'conditionalCount',
          baseDamage: 0,
          perUnitDamage: 20,
          source: { kind: 'damageCounters', target: 'attacker' },
          condition: 'heads',
        },
        coinFlipCount: 1,
      }
    }
    if (name === 'group attack') {
      return {
        damage: {
          kind: 'count',
          baseDamage: 0,
          perUnitDamage: 10,
          source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ["Koga's Zubat"] },
        },
      }
    }
    if (name === 'play dead') {
      return {
        ...zero(),
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
    if (name === 'esp') {
      return {
        damage: { kind: 'coinCount', amountPerHeads: 20, coinFlipCount: 3, exactHeads: 2 },
        coinFlipCount: 3,
        choiceRequirement: 'copyAttack',
        special: [{ kind: 'copyAttack', coinGate: { result: 'heads', minimum: 3 }, preserveExtraCosts: false }],
      }
    }
    if (name === 'blizzard') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [
          { amount: 10, side: 'opponent', condition: 'heads' },
          { amount: 10, side: 'own', condition: 'tails' },
        ],
      }
    }
    if (name === 'mega drain') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        healing: [{ target: 'self', amountFrom: 'halfDamageDealtRoundedUp' }],
      }
    }
    if (name === 'water ring') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        benchDamage: [{ amount: 10, side: 'both', typeFilter: { exclude: ['Water'] } }],
      }
    }
    if (name === 'sonic distortion') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 2,
        status: [{ target: 'opponent', statuses: ['confused'], condition: { result: 'heads', minimum: 1 } }],
      }
    }
    if (['horn toss', 'shake', 'whirlwind'].includes(name)) {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent' }],
      }
    }
    if (name === 'removal pulse' || name === 'rapids') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'opponent', amount: 1, condition: 'heads' }],
      }
    }
    if (name === 'mud splash') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 10, side: 'opponent', maxTargets: 1, condition: 'heads' }],
      }
    }
    if (name === 'stamp') {
      return {
        damage: { kind: 'headsBonus', baseDamage, bonusDamage: 10 },
        coinFlipCount: 1,
        benchDamage: [{ amount: 10, side: 'opponent', condition: 'heads' }],
      }
    }
    if (name === 'detonate') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        selfDamage: [{ kind: 'fixed', amount: 50 }],
        benchDamage: [{ amount: 10, side: 'both' }],
      }
    }
    if (name === 'overhead toss') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 20, side: 'own', maxTargets: 1, condition: 'tails' }],
      }
    }
    if (name === 'sporadic sponging') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        healing: [{ target: 'self', amount: 10, condition: 'heads' }],
      }
    }
    if (name === 'fast-acting poison') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 2,
        status: [{ target: 'opponent', statuses: ['confused', 'poisoned'], condition: { result: 'heads', minimum: 2 } }],
      }
    }
    if (name === 'smelly gas') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 10, side: 'both', condition: 'heads' }],
      }
    }
    if (name === 'hug') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        special: [{ kind: 'preventRetreat', condition: 'heads' }],
      }
    }
    if (name === 'fire tail slap') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        energyDiscard: [{ target: 'self', amount: 1, condition: 'tails' }],
      }
    }
    if (name === 'hind kick') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        choiceRequirement: 'optionalOwnBench',
        special: [{ kind: 'switch', target: 'self', condition: 'heads' }],
      }
    }
    if (name === 'overrun') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        benchDamage: [{ amount: 20, side: 'opponent', maxTargets: 1, condition: 'heads' }],
      }
    }
    if (name === 'ink spurt') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        special: [{ kind: 'attackFailsOnTails', condition: 'heads' }],
      }
    }
    if (name === 'bubbles') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        special: [{ kind: 'disableSelfAttack', attackName: 'Bubbles', condition: 'tails' }],
      }
    }
    if (name === 'dragon tornado') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent', ifTargetSurvives: true }],
      }
    }
    if (name === 'flytrap') {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        choiceRequirement: 'opponentBench',
        special: [{ kind: 'switch', target: 'opponent', beforeDamage: true }],
      }
    }
    if (name === 'sludge grip') {
      return {
        ...zero(),
        coinFlipCount: 1,
        choiceRequirement: 'optionalOpponentBench',
        special: [{ kind: 'switch', target: 'opponent', condition: 'heads', poisonAfterSwitch: true }],
      }
    }
    if (name === 'agility' && /prevent all effects of attacks, including damage/.test(text)) {
      return {
        damage: { kind: 'fixed', amount: baseDamage },
        coinFlipCount: 1,
        protection: [{ target: 'self', kind: 'preventAllEffects', condition: 'heads' }],
      }
    }
  }

  if (/damage (?:plus|times).*energy card(?:s)? attached to the defending pokemon/.test(text)) {
    const perUnit = Number.parseInt(text.match(/(?:plus|does) (\d+) more damage for each energy|does (\d+) damage times/)?.slice(1).find(Boolean) || '10', 10)
    return {
      damage: {
        kind: 'count',
        baseDamage: damage.endsWith('+') ? baseDamage : 0,
        perUnitDamage: perUnit,
        source: { kind: 'energy', side: 'opponent' },
      },
    }
  }

  if (/energy attached to .* but not used to pay for this attack/.test(text) && damage.endsWith('+')) {
    const perUnit = Number.parseInt(text.match(/plus (\d+) more damage for each/)?.[1] || '10', 10)
    const maxBonus = Number.parseInt(text.match(/can't add more than (\d+) damage/)?.[1] || '0', 10)
    const maxUnitsFromOrdinal = Number.parseInt(text.match(/after the (\d+)(?:st|nd|rd|th)/)?.[1] || '0', 10)
    return {
      damage: {
        kind: 'count',
        baseDamage,
        perUnitDamage: perUnit,
        source: { kind: 'unusedEnergy' },
        maxUnits: maxBonus > 0 ? Math.floor(maxBonus / perUnit) : maxUnitsFromOrdinal || undefined,
      },
    }
  }

  if (name === 'do the wave') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'bench', side: 'own' } } }
  }
  if (name === 'meditate') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'target' } } }
  }
  if (name === 'rage') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'flail') {
    return { damage: { kind: 'count', baseDamage: 0, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'karate chop') {
    return { damage: { kind: 'subtractCount', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } } }
  }
  if (name === 'super fang') return { damage: { kind: 'remainingHpHalf' } }
  if (name === 'boyfriends') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 20, source: { kind: 'namedPokemon', side: 'own', zone: 'play', names: ['Nidoking'] } } }
  }
  if (name === 'magnetism') {
    return { damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'namedPokemon', side: 'own', zone: 'bench', names: ['Magnemite', 'Magneton', 'Dark Magneton'] } } }
  }
  if (name === 'mass explosion') {
    const names = ['Koffing', 'Weezing', 'Dark Weezing']
    return {
      damage: { kind: 'count', baseDamage: 0, perUnitDamage: 20, source: { kind: 'namedPokemon', side: 'both', zone: 'play', names } },
      counterDamage: [{ amount: 20, side: 'both', zone: 'play', names }],
    }
  }
  if (name === 'big eggsplosion') {
    return { damage: { kind: 'headsMultiplier', damagePerHeads: 20, coinFlipCount: 0 }, coinFlipSource: { kind: 'energy', side: 'own' } }
  }
  if (name === 'bench manipulation') {
    return {
      damage: { kind: 'tailsMultiplier', damagePerTails: 20 },
      coinFlipSource: { kind: 'bench', side: 'opponent' },
      ignoreWeaknessResistance: true,
    }
  }
  if (name === 'continuous fireball') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 50, coinFlipCount: 0 },
      coinFlipSource: { kind: 'energy', side: 'own' },
      energyDiscard: [{ target: 'self', amount: 'heads' }],
    }
  }
  if (name === 'burning fire') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'chosenEnergy' } },
      energyDiscard: [{ target: 'self', amount: 'choice' }],
      choiceRequirement: 'energyAmount',
    }
  }
  if (name === 'playing with fire') {
    return {
      damage: { kind: 'headsBonus', baseDamage, bonusDamage: 20 },
      coinFlipCount: 1,
      energyDiscard: [{ target: 'self', amount: 1, condition: 'heads' }],
    }
  }
  if (name === 'flames of rage') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      energyDiscard: [{ target: 'self', amount: 2 }],
    }
  }
  if (name === 'knock down') {
    return { damage: { kind: 'tailsBonus', baseDamage, bonusDamage: 20 }, coinFlipCount: 1 }
  }
  if (name === 'rampage') {
    return {
      damage: { kind: 'count', baseDamage, perUnitDamage: 10, source: { kind: 'damageCounters', target: 'attacker' } },
      coinFlipCount: 1,
      status: [{ target: 'self', statuses: ['confused'], condition: 'tails' }],
    }
  }
  if (name === 'miraculous comeback') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'pokemonInPlay', side: 'both' },
      selfDamage: [{ kind: 'perTail', amount: 10 }],
    }
  }
  if (name === 'seething anger') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      coinFlipSource: { kind: 'damageCounters', target: 'attacker' },
    }
  }
  if (['stone barrage', 'repeating kick'].includes(name)) {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: name === 'repeating kick' ? 20 : 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'metal pincer') {
    return {
      damage: { kind: 'headsBonusEach', baseDamage, bonusDamage: 10, coinFlipCount: 0 },
      flipUntilTails: true,
    }
  }
  if (name === 'petal whirlwind') {
    return {
      damage: { kind: 'headsMultiplier', damagePerHeads: 30, coinFlipCount: 3 },
      coinFlipCount: 3,
      status: [{ target: 'self', statuses: ['confused'], condition: { result: 'heads', minimum: 2 } }],
    }
  }

  if (name === 'cat punch') {
    return {
      damage: { kind: 'zeroOnTails', amount: 20 },
      coinFlipCount: 1,
      benchDamage: [{ amount: 20, side: 'opponent', maxTargets: 1, condition: 'tails' }],
      ignoreWeaknessResistance: true,
    }
  }
  if (['coin hurl', 'jump over'].includes(name)) {
    return {
      damage: { kind: 'zeroOnTails', amount: 20 },
      coinFlipCount: 1,
      targetScope: name === 'jump over' ? 'bench' : 'any',
      ignoreWeaknessResistance: true,
    }
  }
  const directDamage: Record<string, { amount: number; scope: 'bench' | 'any' }> = {
    'dig under': { amount: 10, scope: 'any' },
    flitter: { amount: 20, scope: 'any' },
    stare: { amount: 10, scope: 'any' },
    'stretch kick': { amount: 20, scope: 'bench' },
    telekinesis: { amount: 30, scope: 'any' },
  }
  if (directDamage[name]) {
    return {
      damage: { kind: 'fixed', amount: directDamage[name].amount },
      targetScope: directDamage[name].scope,
      ignoreWeaknessResistance: true,
    }
  }
  if (['lure', 'fascinate', 'tempt'].includes(name)) {
    const conditional = name === 'lure' ? undefined : 'heads'
    return {
      ...zero(),
      coinFlipCount: conditional ? 1 : undefined,
      choiceRequirement: 'opponentBench',
      special: [{ kind: 'switch', target: 'opponent', condition: conditional }],
    }
  }
  if (name === 'teleport') {
    return { ...zero(), choiceRequirement: 'ownBench', special: [{ kind: 'switch', target: 'self' }] }
  }

  if (name === 'first aid') return { ...zero(), healing: [{ target: 'self', amount: 10 }] }
  if (name === 'spacing out') {
    return { ...zero(), coinFlipCount: 1, healing: [{ target: 'self', amount: 10, condition: 'heads' }] }
  }
  if (name === 'recover') {
    return {
      ...zero(),
      healing: [{ target: 'self', amount: 'all' }],
      energyDiscard: [{ target: 'self', amount: 1 }],
    }
  }
  if (name === 'afternoon nap' || name === 'recharge') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 1 }] }
  }
  if (name === 'energy absorption') {
    return { ...zero(), energyGain: [{ target: 'self', amount: 2 }] }
  }

  if (name === 'amnesia') {
    return { ...zero(), choiceRequirement: 'disableAttack', special: [{ kind: 'disableAttack' }] }
  }
  if (name === 'swords dance') {
    return { ...zero(), special: [{ kind: 'buffAttack', attackName: 'Slash', baseDamage: 60 }] }
  }
  if (name === 'barrier') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      protection: [{ target: 'self', kind: 'preventAllEffects' }],
    }
  }
  if (name === 'harden') {
    return { ...zero(), protection: [{ target: 'self', kind: 'preventAtMost', amount: 30 }] }
  }
  if (name === 'light screen') {
    return { ...zero(), protection: [{ target: 'self', kind: 'halve' }] }
  }
  if (name === 'growl' || name === 'snivel') {
    return {
      ...zero(),
      protection: [{ target: 'self', kind: 'reduce', amount: name === 'growl' ? 10 : 20, attackerOnly: true }],
    }
  }
  if (name === 'tail wag' || name === 'leer') {
    return {
      ...zero(),
      coinFlipCount: 1,
      special: [{ kind: 'blockTargeting', condition: 'heads' }],
    }
  }
  if (name === 'destiny bond') {
    return {
      ...zero(),
      energyDiscard: [{ target: 'self', amount: 1 }],
      special: [{ kind: 'destinyBond' }],
    }
  }
  if (name === 'mirror move') return { damage: { kind: 'lastIncomingDamage' }, ignoreWeaknessResistance: true, special: [{ kind: 'mirrorLastDamage' }] }
  if (name === 'mirror shell') return { ...zero(), special: [{ kind: 'reflectDamage' }] }
  if (name === 'conversion 1') {
    return { ...zero(), choiceRequirement: 'typeChange', special: [{ kind: 'changeWeakness' }] }
  }
  if (name === 'conversion 2') {
    return { ...zero(), choiceRequirement: 'typeChange', special: [{ kind: 'changeResistance' }] }
  }
  if (name === 'paint') {
    return {
      ...zero(),
      coinFlipCount: 1,
      choiceRequirement: 'typeChange',
      special: [{ kind: 'changeType', condition: 'heads' }],
    }
  }
  if (name === 'texture magic') {
    return { ...zero(), choiceRequirement: 'textureMagic', special: [{ kind: 'textureMagic' }] }
  }
  if (name === 'lightning rod') {
    return { ...zero(), targetScope: 'any', special: [{ kind: 'placeMarker', marker: 'lightningRod' }] }
  }
  if (name === 'lightning bolt' && /lightning rod marker/.test(text)) {
    return {
      damage: { kind: 'fixed', amount: 20 },
      targetScope: 'any',
      special: [{ kind: 'markerDamage', marker: 'lightningRod', amount: 20 }],
    }
  }
  if (name === 'metronome' || name === 'mini-metronome') {
    const mini = name === 'mini-metronome'
    return {
      ...zero(),
      coinFlipCount: mini ? 1 : undefined,
      choiceRequirement: 'copyAttack',
      special: [{ kind: 'copyAttack', coinGate: mini ? 'heads' : undefined, preserveExtraCosts: mini }],
    }
  }

  return null
}

function parseTcgAttackBaseDamage(damage: string): number {
  const match = damage.match(/^(\d+)/)
  return match ? Number.parseInt(match[1], 10) : 0
}

function inferVariableTcgBattleDamage(
  text: string,
  damage: string,
  baseDamage: number,
): Pick<TcgBattleAttackEffect, 'damage' | 'coinFlipCount'> | null {
  const headsBonus = text.match(/flip a coin\. if heads, this attack does (\d+) more damage\b/)
  if (headsBonus && damage.endsWith('+')) {
    return {
      damage: {
        kind: 'headsBonus',
        baseDamage,
        bonusDamage: Number.parseInt(headsBonus[1], 10),
      },
      coinFlipCount: 1,
    }
  }

  const oldHeadsBonus = text.match(
    /flip a coin\. if heads, this attack does \d+ damage plus (\d+) more damage; if tails, this attack does \d+ damage/,
  )
  if (oldHeadsBonus && damage.endsWith('+')) {
    return {
      damage: {
        kind: 'headsBonus',
        baseDamage,
        bonusDamage: Number.parseInt(oldHeadsBonus[1], 10),
      },
      coinFlipCount: 1,
    }
  }

  const headsBonusEach = text.match(/flip (\d+) coins\. this attack does (\d+) more damage for each heads\b/)
  if (headsBonusEach && damage.endsWith('+')) {
    return {
      damage: {
        kind: 'headsBonusEach',
        baseDamage,
        bonusDamage: Number.parseInt(headsBonusEach[2], 10),
        coinFlipCount: Number.parseInt(headsBonusEach[1], 10),
      },
      coinFlipCount: Number.parseInt(headsBonusEach[1], 10),
    }
  }

  const headsMultiplier = text.match(
    /flip (\d+) coins\. this attack does (\d+) damage (?:for each heads|times the number of heads)\b/,
  )
  if (headsMultiplier && damage.endsWith('x')) {
    return {
      damage: {
        kind: 'headsMultiplier',
        damagePerHeads: Number.parseInt(headsMultiplier[2], 10),
        coinFlipCount: Number.parseInt(headsMultiplier[1], 10),
      },
      coinFlipCount: Number.parseInt(headsMultiplier[1], 10),
    }
  }

  const countDamage = inferCountedTcgBattleDamage(text, damage, baseDamage)
  return countDamage ? { damage: countDamage } : null
}

function inferTcgBattleBenchDamage(text: string): TcgBattleBenchDamageRule[] {
  const rules: TcgBattleBenchDamageRule[] = []
  const addRule = (amount: number, side: TcgBattleBenchDamageRule['side'], maxTargets?: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    rules.push({ amount, side, maxTargets })
  }

  const eachBoth = text.match(/(?:and )?(\d+) damage to each benched pokemon \(both yours and your opponent's\)/)
  if (eachBoth) addRule(Number.parseInt(eachBoth[1], 10), 'both')

  const eachOpponent = text.match(/(?:and )?(\d+) damage to each of your opponent's benched pokemon/)
  if (eachOpponent) addRule(Number.parseInt(eachOpponent[1], 10), 'opponent')

  const eachOwn = text.match(/(?:and )?(\d+) damage to each of your benched pokemon/)
  if (eachOwn) addRule(Number.parseInt(eachOwn[1], 10), 'own')

  const oneOpponent = text.match(/(?:and )?(\d+) damage to (?:1|one) of your opponent's benched pokemon/)
  if (oneOpponent) addRule(Number.parseInt(oneOpponent[1], 10), 'opponent', 1)

  const oneOwn = text.match(/(?:and )?(\d+) damage to (?:1|one) of your benched pokemon/)
  if (oneOwn) addRule(Number.parseInt(oneOwn[1], 10), 'own', 1)

  return rules
}

function inferTcgBattleCounterDamage(text: string): TcgBattleCounterDamageRule[] {
  const rules: TcgBattleCounterDamageRule[] = []
  const addRule = (amount: number, rule: Omit<TcgBattleCounterDamageRule, 'amount'>) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    rules.push({ amount, ...rule } as TcgBattleCounterDamageRule)
  }

  const activeOpponent = text.match(/put (\d+) damage counter(?:s)? on (?:your opponent's active pokemon|the defending pokemon|that pokemon)\b/)
  if (activeOpponent) addRule(Number.parseInt(activeOpponent[1], 10) * 10, { target: 'opponent' })

  const activeSelf = text.match(/put (\d+) damage counter(?:s)? on (?:this pokemon|itself|this card)\b/)
  if (activeSelf) addRule(Number.parseInt(activeSelf[1], 10) * 10, { target: 'self' })

  const eachBothBench = text.match(/put (\d+) damage counter(?:s)? on each benched pokemon \(both yours and your opponent's\)\b/)
  if (eachBothBench) addRule(Number.parseInt(eachBothBench[1], 10) * 10, { side: 'both' })

  const eachOppBench = text.match(/put (\d+) damage counter(?:s)? on each of your opponent's benched pokemon\b/)
  if (eachOppBench) addRule(Number.parseInt(eachOppBench[1], 10) * 10, { side: 'opponent' })

  const eachOwnBench = text.match(/put (\d+) damage counter(?:s)? on each of your benched pokemon\b/)
  if (eachOwnBench) addRule(Number.parseInt(eachOwnBench[1], 10) * 10, { side: 'own' })

  const oneOppBench = text.match(/put (\d+) damage counter(?:s)? on (?:1|one) of your opponent's benched pokemon\b/)
  if (oneOppBench) addRule(Number.parseInt(oneOppBench[1], 10) * 10, { side: 'opponent', maxTargets: 1 })

  const oneOwnBench = text.match(/put (\d+) damage counter(?:s)? on (?:1|one) of your benched pokemon\b/)
  if (oneOwnBench) addRule(Number.parseInt(oneOwnBench[1], 10) * 10, { side: 'own', maxTargets: 1 })

  return rules
}

function inferTcgBattleHealing(text: string): TcgBattleHealingRule[] {
  const rules: TcgBattleHealingRule[] = []
  const addRule = (
    amount: number,
    rule:
      | { target: 'self' | 'opponent'; condition?: TcgBattleCoinCondition }
      | { side: 'own' | 'opponent' | 'both'; maxTargets?: number; condition?: TcgBattleCoinCondition },
  ) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    rules.push({ amount, ...rule } as TcgBattleHealingRule)
  }

  const damageDoneSelf =
    text.match(
      /remove a number of damage counters from (?:this pokemon|[a-z0-9' .&-]+) equal to the damage done to (?:the defending pokemon|your opponent's active pokemon|that pokemon)\b/,
    ) ||
    text.match(
      /heal (?:this pokemon|[a-z0-9' .&-]+) equal to the damage done to (?:the defending pokemon|your opponent's active pokemon|that pokemon)\b/,
    )
  if (damageDoneSelf) rules.push({ target: 'self', amountFrom: 'damageDealt' })

  const healSelf = text.match(/heal (\d+) damage from (?:this pokemon|itself|this card)\b/)
  if (healSelf) addRule(Number.parseInt(healSelf[1], 10), { target: 'self' })

  const healOpp = text.match(/heal (\d+) damage from (?:your opponent's active pokemon|the defending pokemon|that pokemon)\b/)
  if (healOpp) addRule(Number.parseInt(healOpp[1], 10), { target: 'opponent' })

  const removeSelf = text.match(/remove (\d+) damage counter(?:s)? from (?:this pokemon|itself|this card)\b/)
  if (removeSelf) addRule(Number.parseInt(removeSelf[1], 10) * 10, { target: 'self' })

  const removeOpp = text.match(/remove (\d+) damage counter(?:s)? from (?:your opponent's active pokemon|the defending pokemon|that pokemon)\b/)
  if (removeOpp) addRule(Number.parseInt(removeOpp[1], 10) * 10, { target: 'opponent' })

  const healEachOwnBench = text.match(/heal (\d+) damage from each of your benched pokemon\b/)
  if (healEachOwnBench) addRule(Number.parseInt(healEachOwnBench[1], 10), { side: 'own' })

  const healEachOppBench = text.match(/heal (\d+) damage from each of your opponent's benched pokemon\b/)
  if (healEachOppBench) addRule(Number.parseInt(healEachOppBench[1], 10), { side: 'opponent' })

  const removeOneOwnBench = text.match(/remove (\d+) damage counter(?:s)? from (?:1|one) of your benched pokemon\b/)
  if (removeOneOwnBench) addRule(Number.parseInt(removeOneOwnBench[1], 10) * 10, { side: 'own', maxTargets: 1 })

  const removeOneOppBench = text.match(/remove (\d+) damage counter(?:s)? from (?:1|one) of your opponent's benched pokemon\b/)
  if (removeOneOppBench) addRule(Number.parseInt(removeOneOppBench[1], 10) * 10, { side: 'opponent', maxTargets: 1 })

  return rules
}

function calculateTcgBattleBenchDamage(
  rules: TcgBattleBenchDamageRule[],
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  random: () => number,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
): { targetSide: TcgBattleSide; targetId: string; damage: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; damage: number }[] = []

  const addFromSide = (targetSide: TcgBattleSide, rule: TcgBattleBenchDamageRule) => {
    const candidates = state[targetSide].back.filter((card) => {
      if (card.currentHp <= 0) return false
      const cardTypes = card.types.map((type) => type.toLowerCase())
      if (rule.typeFilter?.include?.length && !rule.typeFilter.include.some((type) => cardTypes.includes(type.toLowerCase()))) return false
      if (rule.typeFilter?.exclude?.some((type) => cardTypes.includes(type.toLowerCase()))) return false
      return true
    })
    const selected = rule.maxTargets ? pickRandomTcgBattleCards(candidates, rule.maxTargets, random) : candidates
    for (const card of selected) {
      results.push({ targetSide, targetId: card.instanceId, damage: rule.amount })
    }
  }

  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey, rule)
    if (rule.side === 'opponent' || rule.side === 'both') {
      addFromSide(sideKey === 'player' ? 'opponent' : 'player', rule)
    }
  }

  return results
}

function calculateTcgBattleCounterDamage(
  rules: TcgBattleCounterDamageRule[],
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  random: () => number,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
  paidAttackCost?: number,
  choice?: TcgBattleAttackChoice,
): { targetSide: TcgBattleSide; targetId: string; damage: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; damage: number }[] = []
  for (const rule of rules) {
    if ('condition' in rule && !doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    if ('target' in rule) {
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      const amount = 'amountPerUnit' in rule
        ? rule.amountPerUnit * getTcgBattleCount(rule.source, {
            state,
            sideKey,
            attacker,
            target,
            paidAttackCost,
            coinMode: 'actual',
            choice,
          })
        : rule.amount
      if (amount > 0) results.push({ targetSide, targetId, damage: amount })
      continue
    }

    const addFromSide = (targetSide: TcgBattleSide) => {
      let candidates = ('zone' in rule && rule.zone === 'play'
        ? [...state[targetSide].front, ...state[targetSide].back]
        : state[targetSide].back
      ).filter((card) => card.currentHp > 0)
      if ('typeFilter' in rule && rule.typeFilter) {
        const normalizeType = (value: string) => value.toLowerCase()
        if (rule.typeFilter.include?.length) {
          const included = new Set(rule.typeFilter.include.map(normalizeType))
          candidates = candidates.filter((card) => card.types.some((type) => included.has(normalizeType(type))))
        }
        if (rule.typeFilter.exclude?.length) {
          const excluded = new Set(rule.typeFilter.exclude.map(normalizeType))
          candidates = candidates.filter((card) => !card.types.some((type) => excluded.has(normalizeType(type))))
        }
      }
      if ('names' in rule) {
        const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
        const names = new Set(rule.names.map(normalizeName))
        candidates = candidates.filter((card) => names.has(normalizeName(card.name)))
      }
      if ('onlyDamaged' in rule && rule.onlyDamaged) {
        candidates = candidates.filter((card) => card.currentHp < card.hp)
      }
      if ('excludeAttacker' in rule && rule.excludeAttacker && targetSide === sideKey) {
        candidates = candidates.filter((card) => card.instanceId !== attacker.instanceId)
      }
      if ('excludeTarget' in rule && rule.excludeTarget && targetSide !== sideKey) {
        candidates = candidates.filter((card) => card.instanceId !== target.instanceId)
      }
      const selected = 'maxTargets' in rule && rule.maxTargets
        ? pickRandomTcgBattleCards(candidates, rule.maxTargets, random)
        : candidates
      const amount = 'amountPerHead' in rule
        ? rule.amountPerHead * (coinFlips?.heads || 0)
        : rule.amount
      if (amount <= 0) return
      for (const card of selected) {
        results.push({ targetSide, targetId: card.instanceId, damage: amount })
      }
    }
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey)
    if (rule.side === 'opponent' || rule.side === 'both') addFromSide(sideKey === 'player' ? 'opponent' : 'player')
  }
  return results
}

function calculateTcgBattleHealing(
  rules: TcgBattleHealingRule[],
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  random: () => number,
  damageDealt: number,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
): { targetSide: TcgBattleSide; targetId: string; amount: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; amount: number }[] = []
  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    if ('amountFrom' in rule) {
      const amount = Math.max(
        0,
        rule.amountFrom === 'halfDamageDealtRoundedUp'
          ? Math.ceil(damageDealt / 20) * 10
          : damageDealt,
      )
      if (amount <= 0) continue
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      results.push({ targetSide, targetId, amount })
      continue
    }

    if ('target' in rule && 'amount' in rule) {
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      const targetCard = rule.target === 'self' ? attacker : target
      const amount = rule.amount === 'all' ? Math.max(0, targetCard.hp - targetCard.currentHp) : rule.amount
      if (amount > 0) results.push({ targetSide, targetId, amount })
      continue
    }

    if (!('side' in rule) || !('amount' in rule)) continue

    const addFromSide = (targetSide: TcgBattleSide) => {
      const cards = rule.zone === 'play'
        ? [...state[targetSide].front, ...state[targetSide].back]
        : state[targetSide].back
      const candidates = cards.filter((card) => card.currentHp > 0 && card.currentHp < card.hp)
      const selected = rule.maxTargets ? pickRandomTcgBattleCards(candidates, rule.maxTargets, random) : candidates
      const amount = typeof rule.amount === 'number'
        ? rule.amount + (rule.amountPerHead || 0) * (coinFlips?.heads || 0)
        : 0
      for (const card of selected) {
        const healing = rule.amount === 'all' ? card.hp - card.currentHp : amount
        if (healing > 0) results.push({ targetSide, targetId: card.instanceId, amount: healing })
      }
    }
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey)
    if (rule.side === 'opponent' || rule.side === 'both') addFromSide(sideKey === 'player' ? 'opponent' : 'player')
  }
  return results
}

function pickRandomTcgBattleCards<T>(cards: T[], count: number, random: () => number): T[] {
  if (count <= 0 || cards.length === 0) return []
  if (count >= cards.length) return [...cards]

  const pool = [...cards]
  const picks: T[] = []
  while (picks.length < count && pool.length > 0) {
    const index = Math.floor(random() * pool.length)
    const [picked] = pool.splice(index, 1)
    picks.push(picked)
  }
  return picks
}

function inferCountedTcgBattleDamage(
  text: string,
  damage: string,
  baseDamage: number,
): TcgBattleDamageRule | null {
  const suffix = damage.slice(String(baseDamage || '').length)
  const isBonus = suffix === '+'
  const isMultiplier = suffix === 'x' || damage === '?' || damage === ''
  const countMatch = matchTcgBattleCountSource(text)
  if (!countMatch) return null

  if (isBonus && countMatch.mode === 'more') {
    return {
      kind: 'count',
      baseDamage,
      perUnitDamage: countMatch.damage,
      source: countMatch.source,
      maxUnits: countMatch.maxUnits,
    }
  }

  if (isMultiplier && countMatch.mode === 'damage') {
    return {
      kind: 'count',
      baseDamage: 0,
      perUnitDamage: countMatch.damage,
      source: countMatch.source,
      maxUnits: countMatch.maxUnits,
    }
  }

  return null
}

function matchTcgBattleCountSource(text: string):
  | {
      mode: 'damage' | 'more'
      damage: number
      source: TcgBattleCountSource
      maxUnits?: number
    }
  | null {
  const unusedEnergyMore = text.match(
    /(?:this attack )?does \d+ damage plus (\d+) more damage for each [a-z]+ energy attached to [a-z0-9' .&-]+ but not used to pay for this attack's energy cost\. extra [a-z]+ energy after the (\d+)(?:st|nd|rd|th) (?:doesn't|don't) count\b/,
  )
  if (unusedEnergyMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(unusedEnergyMore[1], 10),
      source: { kind: 'unusedEnergy' },
      maxUnits: Number.parseInt(unusedEnergyMore[2], 10),
    }
  }

  const ownBenchMore = text.match(/this attack does (\d+) more damage for each of your benched pokemon\b/)
  if (ownBenchMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(ownBenchMore[1], 10),
      source: { kind: 'bench', side: 'own' },
    }
  }

  const opponentBenchMore = text.match(
    /this attack does (\d+) more damage for each of your opponent's benched pokemon\b/,
  )
  if (opponentBenchMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(opponentBenchMore[1], 10),
      source: { kind: 'bench', side: 'opponent' },
    }
  }

  const bothBenchMore = text.match(
    /this attack does (\d+) more damage for each benched pokemon \(both yours and your opponent's\)\b/,
  )
  if (bothBenchMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(bothBenchMore[1], 10),
      source: { kind: 'bench', side: 'both' },
    }
  }

  const selfCounterMore = text.match(/this attack does (\d+) more damage for each damage counter on this pokemon\b/)
  if (selfCounterMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(selfCounterMore[1], 10),
      source: { kind: 'damageCounters', target: 'attacker' },
    }
  }

  const targetCounterMore = text.match(
    /this attack does (\d+) more damage for each damage counter on your opponent's active pokemon\b/,
  )
  if (targetCounterMore) {
    return {
      mode: 'more',
      damage: Number.parseInt(targetCounterMore[1], 10),
      source: { kind: 'damageCounters', target: 'target' },
    }
  }

  const ownBenchDamage =
    text.match(/this attack does (\d+) damage for each of your benched pokemon\b/) ||
    text.match(/does (\d+) damage times the number of your benched pokemon\b/)
  if (ownBenchDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(ownBenchDamage[1], 10),
      source: { kind: 'bench', side: 'own' },
    }
  }

  const opponentBenchDamage =
    text.match(/this attack does (\d+) damage for each of your opponent's benched pokemon\b/) ||
    text.match(/does (\d+) damage times the number of your opponent's benched pokemon\b/)
  if (opponentBenchDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(opponentBenchDamage[1], 10),
      source: { kind: 'bench', side: 'opponent' },
    }
  }

  const selfCounterDamage =
    text.match(/this attack does (\d+) damage for each damage counter on this pokemon\b/) ||
    text.match(/does (\d+) damage times the number of damage counters on this pokemon\b/)
  if (selfCounterDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(selfCounterDamage[1], 10),
      source: { kind: 'damageCounters', target: 'attacker' },
    }
  }

  const targetCounterDamage = text.match(
    /this attack does (\d+) damage for each damage counter on your opponent's active pokemon\b/,
  )
  if (targetCounterDamage) {
    return {
      mode: 'damage',
      damage: Number.parseInt(targetCounterDamage[1], 10),
      source: { kind: 'damageCounters', target: 'target' },
    }
  }

  const ownPokemonInPlay = text.match(/this attack does (\d+) damage for each of your pokemon in play\b/)
  if (ownPokemonInPlay) {
    return {
      mode: 'damage',
      damage: Number.parseInt(ownPokemonInPlay[1], 10),
      source: { kind: 'pokemonInPlay', side: 'own' },
    }
  }

  const opponentPokemonInPlay = text.match(
    /this attack does (\d+) damage for each of your opponent's pokemon in play\b/,
  )
  if (opponentPokemonInPlay) {
    return {
      mode: 'damage',
      damage: Number.parseInt(opponentPokemonInPlay[1], 10),
      source: { kind: 'pokemonInPlay', side: 'opponent' },
    }
  }

  return null
}

function inferTcgBattleSelfDamage(text: string): TcgBattleSelfDamageRule[] {
  const perCounter = text.match(
    /(?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself for each damage counter on it\b/,
  )
  if (perCounter) {
    return [{ kind: 'damageCounters', perCounterDamage: Number.parseInt(perCounter[1], 10) }]
  }

  const tailsDamage = text.match(
    /flip a coin\. if tails, (?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself\b/,
  )
  if (tailsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(tailsDamage[1], 10), condition: 'tails' }]
  }

  const oldTailsDamage = text.match(
    /if tails, this attack does \d+ damage(?: plus)?(?: and| plus) (?:this pokemon|[a-z0-9' .&♀♂-]+) does (\d+) damage to itself\b/,
  )
  if (oldTailsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(oldTailsDamage[1], 10), condition: 'tails' }]
  }

  const headsDamage = text.match(
    /flip a coin\. if heads, (?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself\b/,
  )
  if (headsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(headsDamage[1], 10), condition: 'heads' }]
  }

  const fixedDamage = text.match(/(?:this pokemon|[a-z0-9' .&♀♂-]+)(?: also)? does (\d+) damage to itself\b/)
  if (fixedDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(fixedDamage[1], 10) }]
  }

  return []
}

function hasConditionalSelfDamage(rules: TcgBattleSelfDamageRule[]): boolean {
  return rules.some((rule) => Boolean('condition' in rule && rule.condition))
}

function inferTcgBattleEnergyDiscard(text: string): TcgBattleEnergyDiscardRule[] {
  const rules: TcgBattleEnergyDiscardRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence || /\byou may discard\b/.test(sentence)) continue
    const condition = inferTcgBattleCoinCondition(sentence)
    const discardMatch = sentence.match(
      /\bdiscard (?:(all|an?|one|\d+) )?(?:[a-z]+ )?energy(?: cards?)?(?: attached to| from) ([^.]+)/,
    )
    if (!discardMatch) continue

    const target = getTcgBattleEnergyDiscardTarget(discardMatch[2])
    if (!target) continue

    rules.push({
      target,
      amount: parseTcgBattleEnergyDiscardAmount(discardMatch[1]),
      condition,
    })
  }

  return rules
}

function parseTcgBattleEnergyDiscardAmount(value: string | undefined): number | 'all' {
  if (!value || value === 'a' || value === 'an' || value === 'one') return 1
  if (value === 'all') return 'all'
  return Math.max(1, Number.parseInt(value, 10) || 1)
}

function getTcgBattleEnergyDiscardTarget(text: string): TcgBattleEnergyDiscardRule['target'] | null {
  if (/\b(?:opponent|defending pokemon)\b/.test(text)) return 'opponent'
  if (/\b(?:this pokemon|itself|it|this card)\b/.test(text)) return 'self'
  return 'self'
}

function hasConditionalEnergyDiscard(rules: TcgBattleEnergyDiscardRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function hasNonSelfTcgBattleEnergyDiscard(rules: TcgBattleEnergyDiscardRule[]): boolean {
  return rules.some((rule) => rule.target !== 'self')
}

function inferTcgBattleStatus(text: string): TcgBattleStatusRule[] {
  const rules: TcgBattleStatusRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence || /\bcan't be (?:asleep|poisoned|burned|paralyzed|confused)\b/.test(sentence)) continue
    const condition = inferTcgBattleCoinCondition(sentence)
    if (sentence.startsWith('if ') && !condition) continue

    const statuses = getTcgBattleStatusesFromText(sentence)
    if (statuses.length === 0) continue

    const target = getTcgBattleStatusTarget(sentence)
    if (!target) continue

    rules.push({ target, statuses, condition })
  }

  return rules
}

function inferTcgBattleProtection(text: string): TcgBattleProtectionRule[] {
  const rules: TcgBattleProtectionRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence) continue
    const condition = inferTcgBattleCoinCondition(sentence)
    if (sentence.startsWith('if ') && !condition) continue

    const preventAllSelf = /prevent all damage done to (?:this pokemon|[a-z0-9' .&-]+) during your opponent's next turn\b/.test(
      sentence,
    )
    if (preventAllSelf) {
      rules.push({ target: 'self', kind: 'preventAll', condition })
      continue
    }

    const reduceSelf = sentence.match(
      /all damage done by attacks to (?:this pokemon|[a-z0-9' .&-]+) during your opponent's next turn is reduced by (\d+)\b/,
    )
    if (reduceSelf) {
      rules.push({
        target: 'self',
        kind: 'reduce',
        amount: Number.parseInt(reduceSelf[1], 10),
        condition,
      })
      continue
    }

    if (/whenever (?:this pokemon|[a-z0-9' .&-]+) takes damage, divide that damage in half\b/.test(sentence)) {
      rules.push({ target: 'self', kind: 'halve' })
    }
  }

  return rules
}

function getTcgBattleStatusesFromText(text: string): TcgBattleStatusCondition[] {
  if (
    !(
      /\b(?:is|are|become|becomes) now (?:asleep|poisoned|burned|paralyzed|confused)\b/.test(text) ||
      /\b(?:leave|make) .*\b(?:asleep|poisoned|burned|paralyzed|confused)\b/.test(text)
    )
  ) {
    return []
  }

  const statuses: TcgBattleStatusCondition[] = []
  if (/\basleep\b/.test(text)) statuses.push('asleep')
  if (/\bpoisoned\b/.test(text)) statuses.push('poisoned')
  if (/\bburned\b/.test(text)) statuses.push('burned')
  if (/\bparalyzed\b/.test(text)) statuses.push('paralyzed')
  if (/\bconfused\b/.test(text)) statuses.push('confused')
  return statuses
}

function getTcgBattleStatusTarget(text: string): TcgBattleStatusRule['target'] | null {
  if (/\b(?:your opponent's active pokemon|defending pokemon|new active pokemon|that pokemon)\b/.test(text)) {
    return 'opponent'
  }
  if (/\b(?:this pokemon|itself|this card)\b/.test(text)) return 'self'
  return null
}

function hasConditionalStatus(rules: TcgBattleStatusRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function hasConditionalProtection(rules: TcgBattleProtectionRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function calculateTcgBattleProtection(
  rules: TcgBattleProtectionRule[],
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
) {
  const applied: {
    targetSide: TcgBattleSide
    targetId: string
    modifier: TcgBattleIncomingAttackModifier
  }[] = []

  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, coinFlips)) continue
    const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
    const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
    if (rule.kind === 'preventAll' || rule.kind === 'preventAllEffects') {
      applied.push({
        targetSide,
        targetId,
        modifier: { kind: rule.kind, remainingOpponentTurns: 1 },
      })
    } else if (rule.kind === 'coinPreventDamage') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'coinPreventDamage',
          preventOn: rule.preventOn || 'tails',
          remainingOpponentTurns: 99,
          persistent: true,
        },
      })
    } else if (rule.kind === 'reduce') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'reduce',
          amount: Math.max(0, rule.amount || 0),
          remainingOpponentTurns: 1,
          attackerId: rule.attackerOnly ? target.instanceId : undefined,
        },
      })
    } else if (rule.kind === 'preventAtMost') {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'preventAtMost',
          amount: Math.max(0, rule.amount || 0),
          remainingOpponentTurns: 1,
        },
      })
    } else {
      applied.push({ targetSide, targetId, modifier: { kind: 'halve', remainingOpponentTurns: 1 } })
    }
  }

  return applied
}

export function getTcgBattleAttackEffect(attack: TcgBattleAttack): TcgBattleAttackEffect | null {
  if (!attack.battleEffect) return inferTcgBattleAttackEffect(attack)

  // Battles already in progress can carry an effect inferred before the text
  // bypass rule was added. Refresh this one flag without rebuilding the rest
  // of the persisted attack effect.
  return shouldIgnoreTcgWeaknessAndResistance(
    normalizeTcgAttackText(attack.text || ''),
  ) && !attack.battleEffect.ignoreWeaknessResistance
    ? { ...attack.battleEffect, ignoreWeaknessResistance: true }
    : attack.battleEffect
}

export function getValidTcgBattleTargets(
  state: TcgBattleState,
  sideKey: TcgBattleSide,
  attacker: TcgBattleCardState,
  attack: TcgBattleAttack,
): TcgBattleCardState[] {
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) return []
  const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
  const scope = effect.targetScope || 'front'
  const candidates = scope === 'front'
    ? state[opponentKey].front
    : scope === 'bench'
      ? state[opponentKey].back
      : [...state[opponentKey].front, ...state[opponentKey].back]
  return candidates.filter((card) => {
    if (card.currentHp <= 0) return false
    if (attacker.temporaryEffects?.cannotTarget?.targetId === card.instanceId) return false
    const markerRule = effect.special?.find((rule) => rule.kind === 'markerDamage')
    if (markerRule?.kind === 'markerDamage' && !card.markers?.includes(markerRule.marker)) return false
    if (effect.special?.some((rule) => rule.kind === 'changeWeakness') && card.weaknesses.length === 0) return false
    return true
  })
}

export function isTcgBattleAttackDisabled(card: TcgBattleCardState, attackIndex: number): boolean {
  return Boolean(card.temporaryEffects?.cannotAttack) || card.temporaryEffects?.disabledAttack?.attackIndex === attackIndex
}

export function validateTcgBattleAttackChoice(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  attack: TcgBattleAttack
  target: TcgBattleCardState
  choice?: TcgBattleAttackChoice
  paidAttackCost: number
}): string | null {
  const { state, sideKey, attacker, attack, target, choice, paidAttackCost } = params
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) return 'That attack is not supported.'
  const validTargets = getValidTcgBattleTargets(state, sideKey, attacker, attack)
  if (!validTargets.some((card) => card.instanceId === target.instanceId)) return 'Invalid target for that attack.'

  const required = effect.choiceRequirement
  if (!required) return choice ? 'That attack does not accept an extra choice.' : null
  const own = state[sideKey]
  const opponent = state[sideKey === 'player' ? 'opponent' : 'player']
  if (!choice) {
    if (required === 'optionalOpponentBench' && opponent.back.every((card) => card.currentHp <= 0)) return null
    if (required === 'optionalOwnBench' && own.back.every((card) => card.currentHp <= 0)) return null
    return 'Choose how that attack should resolve.'
  }
  const validType = (type: TcgBattleEnergyType | undefined) => Boolean(type && type !== 'Colorless')

  if (required === 'copyAttack') {
    if (choice.kind !== 'copiedAttack') return 'Choose an attack to copy.'
    const copied = target.attacks[choice.attackIndex]
    const copiedEffect = copied && getTcgBattleAttackEffect(copied)
    if (!copied || !copiedEffect || copiedEffect.special?.some((rule) => rule.kind === 'copyAttack')) {
      return 'That attack cannot be copied.'
    }
    if (copiedEffect.choiceRequirement) {
      const nestedError = validateTcgBattleAttackChoice({
        state,
        sideKey,
        attacker,
        attack: copied,
        target,
        choice: choice.followUp,
        paidAttackCost: 0,
      })
      if (nestedError) return nestedError
    }
    return null
  }
  if (required === 'disableAttack') {
    return choice.kind === 'disabledAttack' && target.attacks[choice.attackIndex]
      ? null
      : 'Choose a valid opposing attack.'
  }
  if (required === 'discardPokemon') {
    if (choice.kind !== 'discardPokemon') return 'Choose a Basic Pokémon from a discard pile.'
    if (choice.side !== 'player' && choice.side !== 'opponent') return 'Choose a valid discard pile.'
    const owner = state[choice.side]
    const card = owner.discard.find((entry) => entry.instanceId === choice.cardId)
    if (!card?.subtypes.includes('Basic')) return 'Choose a Basic Pokémon from a discard pile.'
    if (owner.back.length >= 3 || getLivingTcgBattleCards(owner).length >= 6) {
      return 'That side has no room on its Bench.'
    }
    return null
  }
  if (required === 'opponentBench' || required === 'ownBench' || required === 'optionalOpponentBench' || required === 'optionalOwnBench') {
    if (choice.kind !== 'benchSwitch') return 'Choose a benched card.'
    const bench = required === 'ownBench' || required === 'optionalOwnBench' ? own.back : opponent.back
    return bench.some((card) => card.instanceId === choice.cardId && card.currentHp > 0)
      ? null
      : 'Choose a living benched card.'
  }
  if (required === 'energyAmount') {
    const available = Math.max(0, own.energy - paidAttackCost)
    return choice.kind === 'energyAmount' && Number.isInteger(choice.amount) && choice.amount >= 0 && choice.amount <= available
      ? null
      : 'Choose an available Energy amount.'
  }
  if (required === 'typeChange') {
    return choice.kind === 'typeChange' && validType(choice.type) ? null : 'Choose a non-Colorless type.'
  }
  if (required === 'textureMagic') {
    if (choice.kind !== 'textureMagic') return 'Choose Texture Magic types.'
    if (!choice.resistanceType && !choice.weaknessType) return 'Choose at least one type.'
    if ((choice.resistanceType && !validType(choice.resistanceType)) || (choice.weaknessType && !validType(choice.weaknessType))) {
      return 'Texture Magic cannot choose Colorless.'
    }
    return null
  }
  return null
}

export function chooseTcgBattleAttackChoice(params: {
  state: TcgBattleState
  sideKey: TcgBattleSide
  attacker: TcgBattleCardState
  attack: TcgBattleAttack
  target: TcgBattleCardState
  paidAttackCost: number
}): TcgBattleAttackChoice | undefined {
  const { state, sideKey, attacker, attack, target, paidAttackCost } = params
  const effect = getTcgBattleAttackEffect(attack)
  const required = effect?.choiceRequirement
  if (!required) return undefined
  if (required === 'copyAttack') {
    const candidates = target.attacks
      .map((candidate, attackIndex) => {
        const candidateEffect = getTcgBattleAttackEffect(candidate)
        const followUp = candidateEffect
          ? chooseTcgBattleAttackChoice({
              state,
              sideKey,
              attacker,
              attack: candidate,
              target,
              paidAttackCost: 0,
            })
          : undefined
        const validTarget = getValidTcgBattleTargets(
          state,
          sideKey,
          attacker,
          candidate,
        ).some((card) => card.instanceId === target.instanceId)
        return {
          attackIndex,
          attack: candidate,
          candidateEffect,
          followUp,
          validTarget,
          damage: calculateTcgBattleDamage(
            attacker,
            candidate,
            target,
            state,
            sideKey,
          ),
        }
      })
      .filter(
        ({ candidateEffect, followUp, validTarget }) =>
          candidateEffect &&
          validTarget &&
          !candidateEffect.special?.some((rule) => rule.kind === 'copyAttack') &&
          (!candidateEffect.choiceRequirement || followUp),
      )
      .sort((a, b) => b.damage - a.damage)
    const picked = candidates[0]
    if (!picked) return undefined
    return {
      kind: 'copiedAttack',
      attackIndex: picked.attackIndex,
      followUp: picked.followUp,
    }
  }
  if (required === 'disableAttack') {
    let bestIndex = 0
    let bestDamage = -1
    target.attacks.forEach((candidate, index) => {
      const damage = calculateTcgBattleDamage(target, candidate, attacker, state, sideKey === 'player' ? 'opponent' : 'player')
      if (damage > bestDamage) {
        bestDamage = damage
        bestIndex = index
      }
    })
    return { kind: 'disabledAttack', attackIndex: bestIndex }
  }
  if (required === 'discardPokemon') {
    const opponentKey = sideKey === 'player' ? 'opponent' : 'player'
    const candidatesFor = (candidateSide: TcgBattleSide) =>
      state[candidateSide].back.length < 3 && getLivingTcgBattleCards(state[candidateSide]).length < 6
        ? state[candidateSide].discard
            .filter((card) => card.subtypes.includes('Basic'))
            .map((card) => ({ side: candidateSide, card }))
            .sort((a, b) => b.card.hp - a.card.hp)
        : []
    const picked = candidatesFor(sideKey)[0] || candidatesFor(opponentKey)[0]
    return picked
      ? { kind: 'discardPokemon', side: picked.side, cardId: picked.card.instanceId }
      : undefined
  }
  if (required === 'opponentBench' || required === 'ownBench' || required === 'optionalOpponentBench' || required === 'optionalOwnBench') {
    const bench = required === 'ownBench' || required === 'optionalOwnBench'
      ? state[sideKey].back
      : state[sideKey === 'player' ? 'opponent' : 'player'].back
    const picked = [...bench].filter((card) => card.currentHp > 0).sort((a, b) => b.currentHp - a.currentHp)[0]
    return picked ? { kind: 'benchSwitch', cardId: picked.instanceId } : undefined
  }
  if (required === 'energyAmount') {
    return { kind: 'energyAmount', amount: Math.max(0, state[sideKey].energy - paidAttackCost) }
  }
  const attackType = normalizeTcgBattleEnergyType(attacker.types[0]) || 'Grass'
  const targetType = normalizeTcgBattleEnergyType(target.types[0]) || 'Grass'
  if (required === 'typeChange') return { kind: 'typeChange', type: attackType === 'Colorless' ? 'Grass' : attackType }
  if (required === 'textureMagic') {
    return {
      kind: 'textureMagic',
      resistanceType: targetType === 'Colorless' ? 'Grass' : targetType,
      weaknessType: attackType === 'Colorless' ? 'Grass' : attackType,
    }
  }
  return undefined
}

export function clearTcgBattleTemporaryEffects(card: TcgBattleCardState) {
  const originalMaxHp = card.temporaryEffects?.originalMaxHp
  if (typeof originalMaxHp === 'number') {
    const damage = Math.max(0, card.hp - card.currentHp)
    card.hp = originalMaxHp
    card.currentHp = Math.max(0, originalMaxHp - damage)
  }
  card.temporaryEffects = undefined
  card.incomingAttackModifier = undefined
}

function rollTcgBattleCoins(
  count: number,
  random: () => number,
): NonNullable<TcgBattleAttackResolution['coinFlips']> {
  const results = Array.from({ length: count }, () => (random() >= 0.5 ? 'heads' : 'tails') as TcgBattleCoinResult)
  const heads = results.filter((result) => result === 'heads').length
  return {
    results,
    heads,
    tails: count - heads,
  }
}

function rollTcgBattleCoinsUntilTails(
  random: () => number,
): NonNullable<TcgBattleAttackResolution['coinFlips']> {
  const results: Array<'heads' | 'tails'> = []
  while (results.length < 20) {
    const result = random() >= 0.5 ? 'heads' : 'tails'
    results.push(result)
    if (result === 'tails') break
  }
  const heads = results.filter((result) => result === 'heads').length
  return { results, heads, tails: results.length - heads }
}

function calculateTcgBattleRawDamage(
  rule: TcgBattleDamageRule,
  context: {
    state?: TcgBattleState
    sideKey?: TcgBattleSide
    attacker: TcgBattleCardState
    target: TcgBattleCardState
    paidAttackCost?: number
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    choice?: TcgBattleAttackChoice
    coinMode: 'actual' | 'max'
  },
): number {
  switch (rule.kind) {
    case 'fixed':
      return rule.amount
    case 'coinCount': {
      const heads = context.coinMode === 'actual'
        ? (context.coinFlips?.heads ?? 0)
        : rule.coinFlipCount
      return rule.exactHeads === undefined || heads === rule.exactHeads
        ? rule.amountPerHeads * heads
        : 0
    }
    case 'conditionalBonus':
      return rule.baseDamage + (doesTcgBattleConditionPass(rule.condition, context.coinFlips) ? rule.bonusDamage : 0)
    case 'zeroOnTails': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 0
      return tails > 0 ? 0 : rule.amount
    }
    case 'zeroIfAnyTails': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 0
      return tails > 0 ? 0 : rule.amount
    }
    case 'headsBonus': {
      const heads = getEstimatedTcgBattleHeads(1, context)
      return rule.baseDamage + (heads > 0 ? rule.bonusDamage : 0)
    }
    case 'headsBonusEach': {
      const heads = getEstimatedTcgBattleHeads(rule.coinFlipCount, context)
      return rule.baseDamage + rule.bonusDamage * heads
    }
    case 'headsMultiplier': {
      const heads = getEstimatedTcgBattleHeads(rule.coinFlipCount, context)
      return rule.damagePerHeads * heads
    }
    case 'tailsBonus': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 1
      return rule.baseDamage + (tails > 0 ? rule.bonusDamage : 0)
    }
    case 'tailsMultiplier': {
      const tails = context.coinMode === 'actual' ? (context.coinFlips?.tails ?? 0) : 1
      return rule.damagePerTails * tails
    }
    case 'count':
      return (
        rule.baseDamage +
        rule.perUnitDamage *
          Math.min(
            getTcgBattleCount(rule.source, context),
            typeof rule.maxUnits === 'number' ? rule.maxUnits : Number.POSITIVE_INFINITY,
          )
      )
    case 'subtractCount':
      return Math.max(0, rule.baseDamage - rule.perUnitDamage * getTcgBattleCount(rule.source, context))
    case 'remainingHpHalf':
      return Math.ceil(context.target.currentHp / 20) * 10
    case 'remainingHpHalfRoundedDown':
      return Math.floor(context.target.currentHp / 20) * 10
    case 'targetToRemainingHp':
      return doesTcgBattleConditionPass(rule.condition, context.coinFlips)
        ? Math.max(0, context.target.currentHp - rule.remainingHp)
        : 0
    case 'conditionalCount': {
      if (!doesTcgBattleConditionPass(rule.condition, context.coinFlips)) return rule.failureDamage || 0
      const count = getTcgBattleCount(rule.source, context)
      if (count < (rule.minUnits ?? 0)) return 0
      return rule.baseDamage + rule.perUnitDamage * Math.min(count, rule.maxUnits ?? Number.POSITIVE_INFINITY)
    }
    case 'healthyTarget':
      return context.target.currentHp === context.target.hp ? rule.healthyDamage : rule.damagedDamage
    case 'headsTable': {
      const heads = context.coinMode === 'actual'
        ? context.coinFlips?.heads ?? 0
        : rule.coinFlipCount
      return rule.damages[Math.min(heads, rule.damages.length - 1)] ?? 0
    }
    case 'lastHitBonus':
      return rule.baseDamage + (context.attacker.temporaryEffects?.lastIncomingAttackDamage ? rule.bonusDamage : 0)
    case 'lastIncomingDamage':
      return Math.max(0, context.attacker.temporaryEffects?.lastIncomingAttackDamage || 0)
  }
}

function getEstimatedTcgBattleHeads(
  fallbackCount: number,
  context: {
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    coinMode: 'actual' | 'max'
  },
): number {
  if (context.coinMode === 'actual') return context.coinFlips?.heads ?? 0
  return fallbackCount || context.coinFlips?.results.length || 1
}

function getTcgBattleCount(
  source: TcgBattleCountSource,
  context: {
    state?: TcgBattleState
    sideKey?: TcgBattleSide
    attacker: TcgBattleCardState
    target: TcgBattleCardState
    paidAttackCost?: number
    coinMode: 'actual' | 'max'
    choice?: TcgBattleAttackChoice
  },
): number {
  if (source.kind === 'damageCounters') {
    const card = source.target === 'attacker' ? context.attacker : context.target
    return Math.max(0, Math.floor((card.hp - card.currentHp) / 10))
  }

  if (source.kind === 'unusedEnergy') {
    if (!context.state || !context.sideKey) {
      return context.coinMode === 'max' ? Number.POSITIVE_INFINITY : 0
    }
    return Math.max(
      0,
      context.state[context.sideKey].energy - (context.paidAttackCost || 0),
    )
  }

  if (source.kind === 'chosenEnergy') {
    return context.choice?.kind === 'energyAmount' ? Math.max(0, context.choice.amount) : 0
  }

  if (!context.state || !context.sideKey) return 0
  const own = context.state[context.sideKey]
  const opponent = context.state[context.sideKey === 'player' ? 'opponent' : 'player']

  if (source.kind === 'energy') {
    const amount = source.side === 'own' ? own.energy : opponent.energy
    return Math.min(amount, source.max ?? Number.POSITIVE_INFINITY)
  }

  if (source.kind === 'namedPokemon') {
    const normalizeName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
    const wanted = new Set(source.names.map(normalizeName))
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'bench' ? side.back : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side).filter((card) => card.currentHp > 0 && wanted.has(normalizeName(card.name))).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'injuredPokemon') {
    const cardsFor = (side: TcgBattleSideState) =>
      source.zone === 'bench' ? side.back : [...side.front, ...side.back]
    const countFor = (side: TcgBattleSideState) =>
      cardsFor(side).filter((card) => card.currentHp > 0 && card.currentHp < card.hp).length
    if (source.side === 'own') return countFor(own)
    if (source.side === 'opponent') return countFor(opponent)
    return countFor(own) + countFor(opponent)
  }

  if (source.kind === 'bench') {
    if (source.side === 'own') return own.back.filter((card) => card.currentHp > 0).length
    if (source.side === 'opponent') return opponent.back.filter((card) => card.currentHp > 0).length
    return (
      own.back.filter((card) => card.currentHp > 0).length +
      opponent.back.filter((card) => card.currentHp > 0).length
    )
  }

  if (source.side === 'own') return getLivingTcgBattleCards(own).length
  if (source.side === 'opponent') return getLivingTcgBattleCards(opponent).length
  return getLivingTcgBattleCards(own).length + getLivingTcgBattleCards(opponent).length
}

function calculateTcgBattleSelfDamage(
  rule: TcgBattleSelfDamageRule,
  attacker: TcgBattleCardState,
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
): number {
  if (rule.kind === 'fixed') return rule.amount
  if (rule.kind === 'perTail') return rule.amount * (coinFlips?.tails || 0)
  return rule.perCounterDamage * Math.max(0, Math.floor((attacker.hp - attacker.currentHp) / 10))
}

function calculateTcgBattleEnergyDiscards(
  rules: TcgBattleEnergyDiscardRule[],
  context: {
    state: TcgBattleState
    sideKey: TcgBattleSide
    attack: TcgBattleAttack
    paidAttackCost?: number
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    choice?: TcgBattleAttackChoice
  },
): TcgBattleEnergyDiscardResolution[] {
  if (rules.length === 0) return []

  const attackCost = context.paidAttackCost ?? context.attack.convertedEnergyCost ?? context.attack.cost?.length ?? 0
  const remaining = {
    self: Math.max(0, context.state[context.sideKey].energy - attackCost),
    opponent: Math.max(0, context.state[context.sideKey === 'player' ? 'opponent' : 'player'].energy),
  }
  const discards: TcgBattleEnergyDiscardResolution[] = []

  for (const rule of rules) {
    if (!doesTcgBattleConditionPass(rule.condition, context.coinFlips)) continue

    const available = remaining[rule.target]
    const requested =
      rule.amount === 'all'
        ? available
        : rule.amount === 'heads'
          ? context.coinFlips?.heads || 0
          : rule.amount === 'opponentPokemon'
            ? context.state[context.sideKey === 'player' ? 'opponent' : 'player'].front.filter((card) => card.currentHp > 0).length +
              context.state[context.sideKey === 'player' ? 'opponent' : 'player'].back.filter((card) => card.currentHp > 0).length
          : rule.amount === 'choice'
            ? context.choice?.kind === 'energyAmount'
              ? context.choice.amount
              : 0
            : rule.amount
    const amount = Math.min(available, Math.max(0, requested))
    if (amount <= 0) continue

    remaining[rule.target] -= amount
    discards.push({
      target: rule.target,
      amount,
      requestedAmount: rule.amount,
    })
  }

  return discards
}

function calculateTcgBattleStatusConditions(
  rules: TcgBattleStatusRule[],
  coinFlips?: TcgBattleAttackResolution['coinFlips'],
): TcgBattleStatusResolution[] {
  return rules
    .filter((rule) => doesTcgBattleConditionPass(rule.condition, coinFlips))
    .map((rule) => ({ target: rule.target, statuses: rule.statuses }))
}

function applyTcgBattleCardStatuses(
  card: TcgBattleCardState,
  statuses: TcgBattleStatusCondition[],
): TcgBattleStatusCondition[] {
  if (statuses.length === 0) return []

  const current = new Set(card.statusConditions || [])
  const controlStatuses = statuses.filter(isTcgBattleControlStatus)
  if (controlStatuses.length > 0) {
    current.delete('asleep')
    current.delete('paralyzed')
    current.delete('confused')
  }

  const applied: TcgBattleStatusCondition[] = []
  for (const status of statuses) {
    if (!current.has(status)) applied.push(status)
    current.add(status)
  }

  card.statusConditions = Array.from(current)
  return applied
}

function getBlockingTcgBattleStatus(
  card: TcgBattleCardState,
): Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'> | undefined {
  const statuses = card.statusConditions || []
  if (statuses.includes('paralyzed')) return 'paralyzed'
  if (statuses.includes('asleep')) return 'asleep'
  if (statuses.includes('confused')) return 'confused'
  return undefined
}

function isTcgBattleControlStatus(
  status: TcgBattleStatusCondition,
): status is Extract<TcgBattleStatusCondition, 'asleep' | 'paralyzed' | 'confused'> {
  return status === 'asleep' || status === 'paralyzed' || status === 'confused'
}

function doesTcgBattleConditionPass(
  condition: TcgBattleCoinCondition | undefined,
  coinFlips: TcgBattleAttackResolution['coinFlips'],
): boolean {
  if (!condition) return true
  if (!coinFlips) return false
  if (typeof condition === 'object') {
    const count = condition.result === 'heads' ? coinFlips.heads : coinFlips.tails
    return count >= condition.minimum
  }
  return condition === 'heads' ? coinFlips.heads > 0 : coinFlips.tails > 0
}

function applyTcgWeaknessAndResistance(
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  damage: number,
): number {
  const attackType = attacker.temporaryEffects?.battleType || attacker.types[0]
  if (!attackType) return damage

  let modifiedDamage = damage
  const weaknessType = target.temporaryEffects?.weaknessType
  const weakness = weaknessType
    ? weaknessType === attackType
      ? { type: weaknessType, value: '×2' }
      : undefined
    : target.weaknesses.find((entry) => entry.type === attackType)
  if (weakness) {
    if (normalizeTcgDamageText(weakness.value).includes('x2')) modifiedDamage *= 2
    else modifiedDamage += parseSignedModifier(weakness.value)
  }

  const resistanceType = target.temporaryEffects?.resistanceType
  const resistance = resistanceType
    ? resistanceType === attackType
      ? { type: resistanceType, value: '-30' }
      : undefined
    : target.resistances.find((entry) => entry.type === attackType)
  if (resistance) modifiedDamage = Math.max(0, modifiedDamage + parseSignedModifier(resistance.value))

  return modifiedDamage
}

function parseSignedModifier(value: string): number {
  const match = value.match(/[+-]\d+/)
  return match ? Number.parseInt(match[0], 10) : 0
}

function getCardBattleScore(card: TcgBattleCardSummary): number {
  const cardState = { ...card, currentHp: card.hp, instanceId: card.id }
  const bestAttack = Math.max(
    0,
    ...card.attacks.map((attack) => {
      const effect = getTcgBattleAttackEffect(attack)
      if (!effect) return 0
      return calculateTcgBattleRawDamage(effect.damage, {
        attacker: cardState,
        target: cardState,
        coinMode: 'max',
      })
    }),
  )
  return card.hp + bestAttack * 2 - card.cost
}
