import type { TcgCardAttack, TcgCardDetail } from '@/data/tcg/types'
import { getTcgCardDetailById } from '@/data/tcg/details'

export type TcgBattleDeckFormat = 'baby' | 'champions' | 'masters'
export type TcgBattleSide = 'player' | 'opponent'
export type TcgBattlePhase = 'arranging' | 'battle' | 'promotion' | 'finished'
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

export type TcgBattleCoinCondition = 'heads' | 'tails'
export type TcgBattleStatusCondition = 'asleep' | 'poisoned' | 'burned' | 'paralyzed' | 'confused'

export type TcgBattleCountSource =
  | { kind: 'bench'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'pokemonInPlay'; side: 'own' | 'opponent' | 'both' }
  | { kind: 'damageCounters'; target: 'attacker' | 'target' }

export type TcgBattleDamageRule =
  | { kind: 'fixed'; amount: number }
  | { kind: 'zeroOnTails'; amount: number }
  | { kind: 'zeroIfAnyTails'; amount: number; coinFlipCount: number }
  | { kind: 'headsBonus'; baseDamage: number; bonusDamage: number }
  | { kind: 'headsBonusEach'; baseDamage: number; bonusDamage: number; coinFlipCount: number }
  | { kind: 'headsMultiplier'; damagePerHeads: number; coinFlipCount: number }
  | { kind: 'count'; baseDamage: number; perUnitDamage: number; source: TcgBattleCountSource; maxUnits?: number }

export type TcgBattleSelfDamageRule =
  | { kind: 'fixed'; amount: number; condition?: TcgBattleCoinCondition }
  | { kind: 'damageCounters'; perCounterDamage: number; condition?: TcgBattleCoinCondition }

export type TcgBattleEnergyDiscardRule = {
  target: 'self' | 'opponent'
  amount: number | 'all'
  condition?: TcgBattleCoinCondition
}

export type TcgBattleEnergyDiscardResolution = {
  target: 'self' | 'opponent'
  amount: number
  requestedAmount: number | 'all'
}

export type TcgBattleStatusRule = {
  target: 'self' | 'opponent'
  statuses: TcgBattleStatusCondition[]
  condition?: TcgBattleCoinCondition
}

export type TcgBattleProtectionRule = {
  target: 'self' | 'opponent'
  kind: 'preventAll' | 'reduce'
  amount?: number
  condition?: TcgBattleCoinCondition
}

export type TcgBattleBenchDamageRule = {
  amount: number
  side: 'own' | 'opponent' | 'both'
  maxTargets?: number
}

export type TcgBattleCounterDamageRule =
  | { amount: number; target: 'self' | 'opponent' }
  | { amount: number; side: 'own' | 'opponent' | 'both'; maxTargets?: number }

export type TcgBattleHealingRule =
  | { amount: number; target: 'self' | 'opponent' }
  | { amount: number; side: 'own' | 'opponent' | 'both'; maxTargets?: number }
  | { target: 'self' | 'opponent'; amountFrom: 'damageDealt' }

export type TcgBattleStatusResolution = {
  target: 'self' | 'opponent'
  statuses: TcgBattleStatusCondition[]
}

export type TcgBattleIncomingAttackModifier =
  | { kind: 'preventAll'; remainingOpponentTurns: number }
  | { kind: 'reduce'; amount: number; remainingOpponentTurns: number }

export interface TcgBattleAttackEffect {
  damage: TcgBattleDamageRule
  coinFlipCount?: number
  selfDamage?: TcgBattleSelfDamageRule[]
  selfKnockOut?: boolean
  energyDiscard?: TcgBattleEnergyDiscardRule[]
  status?: TcgBattleStatusRule[]
  benchDamage?: TcgBattleBenchDamageRule[]
  counterDamage?: TcgBattleCounterDamageRule[]
  healing?: TcgBattleHealingRule[]
  protection?: TcgBattleProtectionRule[]
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

export interface TcgBattleState {
  userId: string
  encounterId: string
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
    results: TcgBattleCoinCondition[]
    heads: number
    tails: number
  }
  lastCoinFlipEvents?: {
    id: string
    sourceId: string
    side: TcgBattleSide
    results: TcgBattleCoinCondition[]
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
  log: string[]
  playerTrainer?: TcgBattleTrainerCard
  enemyTrainer?: TcgBattleTrainerCard
  startedAt: number
  updatedAt: number
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
  const attacks = getSupportedTcgBattleAttacks(card.attacks || [])

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
  const supportedAttacks = getSupportedTcgBattleAttacks(card.attacks || [])
  return (
    card.supertype === 'Pokémon' &&
    Number.isFinite(hp) &&
    hp > 0 &&
    (card.types?.length || 0) > 0 &&
    supportedAttacks.length > 0 &&
    Boolean(card.images?.small || card.images?.large)
  )
}

export function calculateTcgBattleCardCost(card: TcgCardDetail): number {
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

  candidates.sort((a, b) => {
    const costDelta = a.cost - b.cost
    if (costDelta !== 0) return costDelta
    return getCardBattleScore(b) - getCardBattleScore(a)
  })

  const limit = TCG_BATTLE_FORMATS[format].deckCostLimit
  const selected: TcgBattleCardSummary[] = []
  let totalCost = 0
  for (const card of candidates) {
    if (selected.length >= 15) break
    if (totalCost + card.cost > limit) continue
    selected.push(card)
    totalCost += card.cost
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

export function getCleanDamageTcgAttacks(attacks: TcgCardAttack[]): TcgBattleAttack[] {
  return getSupportedTcgBattleAttacks(attacks)
}

export function getSupportedTcgBattleAttacks(attacks: TcgCardAttack[]): TcgBattleAttack[] {
  return attacks.flatMap((attack): TcgBattleAttack[] => {
    const battleEffect = inferTcgBattleAttackEffect(attack)
    return battleEffect ? [{ ...attack, battleEffect }] : []
  })
}

export function inferTcgBattleAttackEffect(attack: TcgCardAttack): TcgBattleAttackEffect | null {
  const text = normalizeTcgAttackText(attack.text || '')
  const normalizedDamage = normalizeTcgDamageText(attack.damage || '')
  const exactDamage = parseTcgAttackDamage(normalizedDamage)
  const baseDamage = parseTcgAttackBaseDamage(normalizedDamage)
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
    hasConditionalProtection(protection)
      ? 1
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
  }
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
  statusConditions?: TcgBattleStatusResolution[]
  coinFlips?: {
    results: TcgBattleCoinCondition[]
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
    results: TcgBattleCoinCondition[]
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
  random?: () => number
}): TcgBattleAttackResolution {
  const { state, sideKey, attacker, attack, target, paidAttackCost, random = Math.random } = params
  const effect = getTcgBattleAttackEffect(attack)
  if (!effect) {
    return {
      targetDamage: 0,
      targetDamageBeforeModifiers: 0,
      selfDamage: 0,
      selfKnockOut: false,
    }
  }

  const coinFlips = effect.coinFlipCount ? rollTcgBattleCoins(effect.coinFlipCount, random) : undefined
  const targetDamageBeforeModifiers = calculateTcgBattleRawDamage(effect.damage, {
    state,
    sideKey,
    attacker,
    target,
    coinFlips,
    coinMode: 'actual',
  })
  const targetDamageAfterType = applyTcgWeaknessAndResistance(attacker, target, targetDamageBeforeModifiers)
  const targetDamage = applyTcgBattleIncomingAttackModifier(target, targetDamageAfterType)
  const selfDamage = (effect.selfDamage || []).reduce(
    (sum, rule) =>
      doesTcgBattleConditionPass(rule.condition, coinFlips)
        ? sum + calculateTcgBattleSelfDamage(rule, attacker)
        : sum,
    0,
  )
  const energyDiscards = calculateTcgBattleEnergyDiscards(effect.energyDiscard || [], {
    state,
    sideKey,
    attack,
    paidAttackCost,
    coinFlips,
  })
  const statusConditions = calculateTcgBattleStatusConditions(effect.status || [], coinFlips)
  const benchDamage = calculateTcgBattleBenchDamage(effect.benchDamage || [], state, sideKey, random)
  const counterDamage = calculateTcgBattleCounterDamage(effect.counterDamage || [], state, sideKey, attacker, target, random)
  const healing = calculateTcgBattleHealing(
    effect.healing || [],
    state,
    sideKey,
    attacker,
    target,
    random,
    targetDamage,
  )
  const protection = calculateTcgBattleProtection(effect.protection || [], sideKey, attacker, target, coinFlips)

  return {
    targetDamage,
    targetDamageBeforeModifiers,
    selfDamage,
    selfKnockOut: Boolean(effect.selfKnockOut),
    benchDamage: benchDamage.length > 0 ? benchDamage : undefined,
    counterDamage: counterDamage.length > 0 ? counterDamage : undefined,
    healing: healing.length > 0 ? healing : undefined,
    protection: protection.length > 0 ? protection : undefined,
    energyDiscards: energyDiscards.length > 0 ? energyDiscards : undefined,
    statusConditions: statusConditions.length > 0 ? statusConditions : undefined,
    coinFlips,
  }
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

export function applyTcgBattleIncomingAttackModifier(card: TcgBattleCardState, damage: number): number {
  const modifier = card.incomingAttackModifier
  if (!modifier || damage <= 0) return Math.max(0, damage)
  if (modifier.kind === 'preventAll') return 0
  if (modifier.kind === 'reduce') return Math.max(0, damage - Math.max(0, modifier.amount))
  return Math.max(0, damage)
}

export function tickTcgBattleIncomingAttackModifiers(state: TcgBattleState, sideKey: TcgBattleSide) {
  for (const card of [...state[sideKey].front, ...state[sideKey].back]) {
    const modifier = card.incomingAttackModifier
    if (!modifier) continue
    modifier.remainingOpponentTurns -= 1
    if (modifier.remainingOpponentTurns <= 0) {
      card.incomingAttackModifier = undefined
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

  const damage = calculateTcgBattleRawDamage(effect.damage, {
    state,
    sideKey,
    attacker,
    target,
    coinMode: 'max',
  })
  return applyTcgWeaknessAndResistance(attacker, target, damage)
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
    | { attacker: TcgBattleCardState; target: TcgBattleCardState; attackIndex: number; damage: number }
    | null = null

  for (const attacker of state.opponent.front.filter((card) => card.currentHp > 0)) {
    if (!isTcgBattleSummaryUnlocked(attacker, state.turnNumber)) continue
    for (const [attackIndex, attack] of attacker.attacks.entries()) {
      const cost = getEffectiveTcgBattleAttackCost(state, attack)
      if (cost > maxCost || cost > state.opponent.energy) continue
      for (const target of state.player.front.filter((card) => card.currentHp > 0)) {
        const damage = calculateTcgBattleDamage(attacker, attack, target, state, 'opponent')
        if (!best || damage > best.damage || target.currentHp < best.target.currentHp) {
          best = { attacker, target, attackIndex, damage }
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
      const cost = getEffectiveTcgBattleAttackCost(state, attack)
      return cost <= maxCost && cost <= side.energy
    }),
  )
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
  const addRule = (amount: number, rule: Omit<TcgBattleHealingRule, 'amount'>) => {
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
): { targetSide: TcgBattleSide; targetId: string; damage: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; damage: number }[] = []

  const addFromSide = (targetSide: TcgBattleSide, amount: number, maxTargets?: number) => {
    const candidates = state[targetSide].back.filter((card) => card.currentHp > 0)
    const selected = maxTargets ? pickRandomTcgBattleCards(candidates, maxTargets, random) : candidates
    for (const card of selected) {
      results.push({ targetSide, targetId: card.instanceId, damage: amount })
    }
  }

  for (const rule of rules) {
    if (rule.side === 'own' || rule.side === 'both') addFromSide(sideKey, rule.amount, rule.maxTargets)
    if (rule.side === 'opponent' || rule.side === 'both') {
      addFromSide(sideKey === 'player' ? 'opponent' : 'player', rule.amount, rule.maxTargets)
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
): { targetSide: TcgBattleSide; targetId: string; damage: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; damage: number }[] = []
  for (const rule of rules) {
    if ('target' in rule) {
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      results.push({ targetSide, targetId, damage: rule.amount })
      continue
    }

    const addFromSide = (targetSide: TcgBattleSide) => {
      const candidates = state[targetSide].back.filter((card) => card.currentHp > 0)
      const selected = rule.maxTargets ? pickRandomTcgBattleCards(candidates, rule.maxTargets, random) : candidates
      for (const card of selected) {
        results.push({ targetSide, targetId: card.instanceId, damage: rule.amount })
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
): { targetSide: TcgBattleSide; targetId: string; amount: number }[] {
  const results: { targetSide: TcgBattleSide; targetId: string; amount: number }[] = []
  for (const rule of rules) {
    if ('amountFrom' in rule && rule.amountFrom === 'damageDealt') {
      const amount = Math.max(0, damageDealt)
      if (amount <= 0) continue
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      results.push({ targetSide, targetId, amount })
      continue
    }

    if ('target' in rule && 'amount' in rule) {
      const targetSide = rule.target === 'self' ? sideKey : sideKey === 'player' ? 'opponent' : 'player'
      const targetId = rule.target === 'self' ? attacker.instanceId : target.instanceId
      results.push({ targetSide, targetId, amount: rule.amount })
      continue
    }

    if (!('side' in rule) || !('amount' in rule)) continue

    const addFromSide = (targetSide: TcgBattleSide) => {
      const candidates = state[targetSide].back.filter((card) => card.currentHp > 0 && card.currentHp < card.hp)
      const selected = rule.maxTargets ? pickRandomTcgBattleCards(candidates, rule.maxTargets, random) : candidates
      for (const card of selected) {
        results.push({ targetSide, targetId: card.instanceId, amount: rule.amount })
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
    }
  }

  if (isMultiplier && countMatch.mode === 'damage') {
    return {
      kind: 'count',
      baseDamage: 0,
      perUnitDamage: countMatch.damage,
      source: countMatch.source,
    }
  }

  return null
}

function matchTcgBattleCountSource(text: string):
  | {
      mode: 'damage' | 'more'
      damage: number
      source: TcgBattleCountSource
    }
  | null {
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
    /(?:this pokemon|[a-z0-9' .&-]+)(?: also)? does (\d+) damage to itself for each damage counter on it\b/,
  )
  if (perCounter) {
    return [{ kind: 'damageCounters', perCounterDamage: Number.parseInt(perCounter[1], 10) }]
  }

  const tailsDamage = text.match(
    /flip a coin\. if tails, (?:this pokemon|[a-z0-9' .&-]+)(?: also)? does (\d+) damage to itself\b/,
  )
  if (tailsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(tailsDamage[1], 10), condition: 'tails' }]
  }

  const oldTailsDamage = text.match(
    /if tails, this attack does \d+ damage(?: plus)?(?: and| plus) (?:this pokemon|[a-z0-9' .&-]+) does (\d+) damage to itself\b/,
  )
  if (oldTailsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(oldTailsDamage[1], 10), condition: 'tails' }]
  }

  const headsDamage = text.match(
    /flip a coin\. if heads, (?:this pokemon|[a-z0-9' .&-]+)(?: also)? does (\d+) damage to itself\b/,
  )
  if (headsDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(headsDamage[1], 10), condition: 'heads' }]
  }

  const fixedDamage = text.match(/(?:this pokemon|[a-z0-9' .&-]+)(?: also)? does (\d+) damage to itself\b/)
  if (fixedDamage) {
    return [{ kind: 'fixed', amount: Number.parseInt(fixedDamage[1], 10) }]
  }

  return []
}

function hasConditionalSelfDamage(rules: TcgBattleSelfDamageRule[]): boolean {
  return rules.some((rule) => Boolean(rule.condition))
}

function inferTcgBattleEnergyDiscard(text: string): TcgBattleEnergyDiscardRule[] {
  const rules: TcgBattleEnergyDiscardRule[] = []
  const sentences = text.split(/\.\s*/)

  for (const sentence of sentences) {
    if (!sentence || /\byou may discard\b/.test(sentence)) continue
    const condition = sentence.match(/\bif (heads|tails),? /)?.[1] as TcgBattleCoinCondition | undefined
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
    const condition = sentence.match(/\bif (heads|tails),? /)?.[1] as TcgBattleCoinCondition | undefined
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
    const condition = sentence.match(/\bif (heads|tails),? /)?.[1] as TcgBattleCoinCondition | undefined
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
    if (rule.kind === 'preventAll') {
      applied.push({
        targetSide,
        targetId,
        modifier: { kind: 'preventAll', remainingOpponentTurns: 1 },
      })
    } else {
      applied.push({
        targetSide,
        targetId,
        modifier: {
          kind: 'reduce',
          amount: Math.max(0, rule.amount || 0),
          remainingOpponentTurns: 1,
        },
      })
    }
  }

  return applied
}

function getTcgBattleAttackEffect(attack: TcgBattleAttack): TcgBattleAttackEffect | null {
  return attack.battleEffect || inferTcgBattleAttackEffect(attack)
}

function rollTcgBattleCoins(
  count: number,
  random: () => number,
): NonNullable<TcgBattleAttackResolution['coinFlips']> {
  const results = Array.from({ length: count }, () => (random() >= 0.5 ? 'heads' : 'tails') as TcgBattleCoinCondition)
  const heads = results.filter((result) => result === 'heads').length
  return {
    results,
    heads,
    tails: count - heads,
  }
}

function calculateTcgBattleRawDamage(
  rule: TcgBattleDamageRule,
  context: {
    state?: TcgBattleState
    sideKey?: TcgBattleSide
    attacker: TcgBattleCardState
    target: TcgBattleCardState
    coinFlips?: TcgBattleAttackResolution['coinFlips']
    coinMode: 'actual' | 'max'
  },
): number {
  switch (rule.kind) {
    case 'fixed':
      return rule.amount
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
    case 'count':
      return (
        rule.baseDamage +
        rule.perUnitDamage *
          Math.min(
            getTcgBattleCount(rule.source, context),
            typeof rule.maxUnits === 'number' ? rule.maxUnits : Number.POSITIVE_INFINITY,
          )
      )
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
  },
): number {
  if (source.kind === 'damageCounters') {
    const card = source.target === 'attacker' ? context.attacker : context.target
    return Math.max(0, Math.floor((card.hp - card.currentHp) / 10))
  }

  if (!context.state || !context.sideKey) return 0
  const own = context.state[context.sideKey]
  const opponent = context.state[context.sideKey === 'player' ? 'opponent' : 'player']

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

function calculateTcgBattleSelfDamage(rule: TcgBattleSelfDamageRule, attacker: TcgBattleCardState): number {
  if (rule.kind === 'fixed') return rule.amount
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
    const amount = Math.min(available, rule.amount === 'all' ? available : rule.amount)
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
  return condition === 'heads' ? coinFlips.heads > 0 : coinFlips.tails > 0
}

function applyTcgWeaknessAndResistance(
  attacker: TcgBattleCardState,
  target: TcgBattleCardState,
  damage: number,
): number {
  const attackType = attacker.types[0]
  if (!attackType) return damage

  let modifiedDamage = damage
  const weakness = target.weaknesses.find((entry) => entry.type === attackType)
  if (weakness) {
    if (normalizeTcgDamageText(weakness.value).includes('x2')) modifiedDamage *= 2
    else modifiedDamage += parseSignedModifier(weakness.value)
  }

  const resistance = target.resistances.find((entry) => entry.type === attackType)
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
