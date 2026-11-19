'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { useHaptics } from '@haptics/react'
import type { TcgBattleGameConfig } from '@/data/games'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import {
  ACTIVITY_SETTLED_EVENT,
  ACTIVITY_STARTED_EVENT,
} from '@/utilities/games/update-safety'
import { getTcgEnergySymbol } from '@/utilities/tcg/energy-symbols'
import type {
  TcgBattleAttackChoice,
  TcgBattleCardState,
  TcgBattleChoiceRequirement,
  TcgBattleCoinFlipPurpose,
  TcgBattleEnergyType,
  TcgBattleEvolutionOption,
  TcgBattleState,
  TcgBattleStatusCondition,
} from '@/utilities/tcg/tcg-battle'
import {
  calculateTcgBattleDamage,
  canTcgBattleUseElectricStart,
  chooseTcgBattleAttackChoice,
  doesTcgBattleSubtypeFilterMatch,
  getAvailableTcgBattleDeckPokemon,
  getTcgBattleDeckSearchMaxCount,
  getEffectiveTcgBattleAttackCost,
  getOpenTcgBattleBenchSlots,
  hasTcgBattleRecentRuleBoxKnockout,
  canTcgBattlePutPokemonOnBench,
  getTcgBattleAttackEffect,
  getTcgBattleAbilityRetreatCost,
  isTcgBattleHealingPreventedForTarget,
  isTcgBattleRetreatBlockedByStatus,
  getTcgBattleCardUnlockTurnForCard,
  getTcgBattleEvolutionOptions,
  getTcgBattleAvailableAttacks,
  getTcgBattleEvolutionDamageEffect,
  getTcgBattleEvolutionAttackBoost,
  getTcgBattleEvolutionDamageTargetCount,
  getTcgBattleEvolutionBenchSearchCount,
  hasTcgBattleEvolutionOpponentDiscardBenchSearch,
  getTcgBattleEvolutionNamedBenchSearchNames,
  hasTcgBattleEvolutionShedinjaSearch,
  hasTcgBattleEvolutionShedinjaHandDiscard,
  hasTcgBattleEvolutionShedinjaDiscardSearch,
  hasTcgBattleEvolutionMassHealEffect,
  hasTcgBattleEvolutionTargetedFullHealEffect,
  getTcgBattleEvolutionDrawCount,
  getTcgBattleEvolutionDiscardRecoveryCount,
  getTcgBattleEvolutionEnergyEffect,
  getTcgBattleEvolutionStatusEffect,
  getTcgBattleEvolutionAttackProtectionEffect,
  getTcgBattleEvolutionDevolutionEffect,
  getTcgBattleEvolutionShuffleEffect,
  getTcgBattleEvolutionDiscardEffect,
  getTcgBattleEvolutionCoinHealingEffect,
  hasTcgBattleEvolutionSwitchEffect,
  hasTcgBattleEvolutionReturnPokemonEffect,
  hasTcgBattleEvolutionOnlySwitchEffect,
  getTcgBattleEvolutionSwitchMaxRemainingHp,
  hasTcgBattleEvolutionExSwitchEffect,
  hasTcgBattleEvolutionCardSearchEffect,
  hasTcgBattleEvolutionSelfSwitchEffect,
  getTcgBattlePokemonSwapPower,
  getTcgBattleAbilityDamageCounterEffect,
  getTcgBattleAbilityDamageCounterMoveEffect,
  getTcgBattleEffectiveTypes,
  getTcgBattleCount,
  getValidTcgBattleTargets,
  isTcgBattleAttackDisabled,
  isTcgBattleAbilityAttackAllowed,
  isTcgBattleAbilitySuppressed,
  isTcgBattleDamageCounterMovementBlocked,
  isTcgBattleTentacoolCowardice,
  isTcgBattleLopunnyBigJump,
  getTcgBattleCoinFlipStatusPower,
  isTcgBattleCradilySelectiveSlime,
  isTcgBattleVileplumeChoiceStatus,
  hasTcgBattleKlinklangEmergencyRotation,
  isTcgBattleDarkCrobatPoison,
  isTcgBattleDarkHoundoomFireBreath,
  isTcgBattleVenusaurMiracleAroma,
  isTcgBattleXatuPsychicShift,
  getTcgBattleEnergyChargeBonus,
  TCG_BATTLE_FORMATS,
} from '@/utilities/tcg/tcg-battle'
import type { GameCompletionResult } from '@/utilities/games/client-action-recovery'
import {
  arrangeTcgBattle,
  claimTcgBattleResult,
  refreshTcgBattleState,
  startTcgBattle,
  surrenderTcgPvp,
  tcgBattleAttack,
  tcgBattleCharge,
  tcgBattleEvolve,
  tcgBattlePlayBasicToBench,
  tcgBattleHealActiveAbility,
  tcgBattleUseDrawAbility,
  tcgBattleUseKogaKakunaEmerge,
  tcgBattleUseClefableMoonGuidance,
  tcgBattleResolveClefableMoonGuidance,
  tcgBattleUseInkayUpsideDownEvolution,
  tcgBattleUseKarrablastShellOn,
  tcgBattleUseAegislashStanceChange,
  tcgBattleUsePokemonSwapPower,
  tcgBattleUseBenchShuffleAbility,
  tcgBattleUseDiscardRecoveryAbility,
  tcgBattleUseDamageCounterAbility,
  tcgBattleUseVenomothShift,
  tcgBattleUseDamageCounterMoveAbility,
  tcgBattleUsePsychicDiscardEnergyAbility,
  tcgBattleUseIonoEnergyAbility,
  tcgBattleUseFlareonEnergyAbility,
  tcgBattleUseFrosmothEnergyAbility,
  tcgBattleUseBaxcaliburEnergyAbility,
  tcgBattleUseEmboarEnergyAbility,
  tcgBattleUseGardevoirGxEnergyAbility,
  tcgBattleUseVolcanionExDamageBoost,
  tcgBattleUseLudicoloCheerfulVoice,
  tcgBattleUsePalkiaVstarEnergyAbility,
  tcgBattleUseElectrodeGxEnergyAbility,
  tcgBattleUseDiscardRevivalEnergyAbility,
  tcgBattleUseBenchSwitchAbility,
  tcgBattleUseActiveStatusAbility,
  tcgBattleUseBenchEntryAbility,
  tcgBattleUseUnownVanish,
  tcgBattleUseUnownUndo,
  tcgBattleUseTentacoolCowardice,
  tcgBattleUseIgglybuffGaze,
  tcgBattleUseElekidPlayfulPunch,
  tcgBattlePromote,
  tcgBattleRetreat,
} from '../games/tcg-battle'

type BoardZone = 'player-front' | 'opponent-front'
type BenchMode = 'view' | 'retreat' | 'promote'
type SideTone = 'player' | 'opponent'
type TcgClientActionResult =
  | {
      success: true
      state: TcgBattleState
      completion?: GameCompletionResult
    }
  | { success: false; error: string }
type TcgAttack = TcgBattleCardState['attacks'][number]
type TcgDamageEvent = NonNullable<TcgBattleState['lastDamageEvents']>[number]
type TcgStatusEvent = NonNullable<TcgBattleState['lastStatusEvents']>[number]
type DamageCue = {
  id: string
  targetId: string
  damage: number
  side: SideTone
}
type CoinCue = {
  id: string
  sourceId: string
  side: SideTone
  purpose?: TcgBattleCoinFlipPurpose
  results: Array<'heads' | 'tails'>
  heads: number
  tails: number
}
type ResolutionTone = 'player' | 'opponent' | 'system'
type BattleResolution = {
  id: string
  tone: ResolutionTone
  title: string
  detail: string
  sourceId?: string
  damageCue?: DamageCue
  coinCue?: CoinCue
}
type ActionMeta = (
  | {
      kind: 'attack'
      attackerId: string
      targetId: string
      attackIndex: number
    }
  | { kind: 'retreat'; frontId: string; backId: string }
  | { kind: 'evolve'; targetId: string; evolutionCardId: string; effectTargetId?: string | string[] }
  | { kind: 'charge' }
  | { kind: 'bench' }
  | { kind: 'promote'; cardId: string }
  | { kind: 'ability'; sourceId: string; targetId?: string; abilityIndex: number; abilityName: string; abilityEffect: 'heal' | 'draw' | 'discardDraw' | 'discardHandDraw' | 'refillDraw' | 'search' | 'energySearch' | 'energyAttach' | 'benchSearch' | 'deckSwap' | 'pokemonSwap' | 'counterDamage' | 'switch' | 'status' | 'typeChange' | 'damageBoost' | 'teamDamageReduction' | 'reveal' | 'deckDiscard' | 'deckShuffle' | 'deckBottom' | 'evolution' | 'moonGuidanceResolve' | 'regidragoVstarResolve' | 'handReturn' | 'abilitySuppression' | 'directDamage'; abilityStatus?: TcgBattleStatusCondition }
  | { kind: 'arrange' }
  | { kind: 'claim' }
) & { actorSide?: SideTone }

interface TcgBattleGameProps {
  encounter: TcgBattleGameConfig
}

const TYPE_BADGE_CLASSES: Record<string, string> = {
  Colorless: 'border-game-border-strong bg-game-surface-raised text-game-ink',
  Darkness: 'border-game-charcoal/30 bg-game-charcoal/10 text-game-charcoal',
  Dragon: 'border-violet-300 bg-violet-50 text-violet-800',
  Fairy: 'border-pink-300 bg-pink-50 text-pink-800',
  Fighting: 'border-orange-300 bg-orange-50 text-game-ink',
  Fire: 'border-red-300 bg-red-50 text-red-800',
  Grass: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  Lightning: 'border-yellow-300 bg-yellow-50 text-game-ink',
  Metal: 'border-slate-300 bg-slate-50 text-slate-800',
  Psychic: 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800',
  Water: 'border-sky-300 bg-sky-50 text-sky-800',
}

const STATUS_ICON_SRC: Record<TcgBattleStatusCondition, string> = {
  asleep: '/images/sleep.avif',
  poisoned: '/images/poison.avif',
  burned: '/images/burn.avif',
  paralyzed: '/images/paralysis.avif',
  confused: '/images/confusion.avif',
}

const RESOLUTION_TIMING = {
  actionIntro: 760,
  coinFlip: 1380,
  damageHold: 980,
  betweenActions: 620,
  recoil: 860,
  faint: 760,
  boardUpdate: 900,
  statusUpdate: 140,
  finalSettle: 780,
} as const

function getAllowedAttackCost(turnNumber: number): number {
  if (turnNumber >= 10) return Number.POSITIVE_INFINITY
  if (turnNumber >= 7) return 4
  if (turnNumber >= 5) return 3
  if (turnNumber >= 3) return 2
  return 1
}

function getAttackCost(
  attack: TcgAttack,
  state?: TcgBattleState,
  attacker?: TcgBattleCardState,
  sideKey?: 'player' | 'opponent',
): number {
  if (state) {
    const resolvedAttacker = attacker || [...state.player.front, ...state.player.back, ...state.opponent.front, ...state.opponent.back]
      .find((card) => card.attacks.some((candidate) => candidate === attack))
    const resolvedSide = sideKey || (resolvedAttacker && [...state.player.front, ...state.player.back].some((card) => card.instanceId === resolvedAttacker.instanceId) ? 'player' : 'opponent')
    return getEffectiveTcgBattleAttackCost(state, attack, resolvedAttacker, resolvedSide)
  }
  return attack.convertedEnergyCost ?? attack.cost?.length ?? 0
}

function isCardUnlockedByTurn(
  card: TcgBattleCardState | undefined,
  turnNumber: number,
): boolean {
  if (!card) return false
  return turnNumber >= getTcgBattleCardUnlockTurnForCard(card)
}

function getProjectedDamage(
  attacker: TcgBattleCardState | undefined,
  attack: TcgAttack,
  target: TcgBattleCardState | undefined,
  state?: TcgBattleState,
): number {
  if (!attacker || !target) return 0
  const sideKey =
    state &&
    [...state.opponent.front, ...state.opponent.back].some(
      (card) => card.instanceId === attacker.instanceId,
    )
      ? 'opponent'
      : 'player'
  return calculateTcgBattleDamage(attacker, attack, target, state, sideKey)
}

function getHpPercent(card?: TcgBattleCardState): number {
  if (!card || card.hp <= 0) return 0
  return Math.max(
    0,
    Math.min(100, Math.round((card.currentHp / card.hp) * 100)),
  )
}

function getHpTone(card?: TcgBattleCardState): string {
  const percent = getHpPercent(card)
  if (percent <= 25) return 'bg-red-400'
  if (percent <= 50) return 'bg-amber-300'
  return 'bg-emerald-300'
}

function getLivingCards(side: TcgBattleState['player']): TcgBattleCardState[] {
  return [...side.front, ...side.back].filter((card) => card.currentHp > 0)
}

function hasTcgBattleOmanyteClairvoyance(state: TcgBattleState): boolean {
  return [...state.player.front, ...state.player.back].some((source) =>
    source.currentHp > 0 &&
    !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) &&
    (source.abilities || []).some((ability) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      return text === 'your opponent plays with his or her hand face up. this power stops working while omanyte is affected by a special condition.'
        ? !source.statusConditions?.length
        : text === 'your opponent plays with his or her hand face up. this power stops working while omanyte is asleep, confused, or paralyzed.' && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))
    }),
  )
}

function getBestProjectedDamage(
  attacker?: TcgBattleCardState,
  target?: TcgBattleCardState,
  cap = Number.POSITIVE_INFINITY,
  state?: TcgBattleState,
) {
  if (!attacker || !target) return 0
  return Math.max(
    0,
    ...(state ? getTcgBattleAvailableAttacks(state, 'player', attacker) : attacker.attacks)
      .filter((attack) => getAttackCost(attack, state, attacker) <= cap)
      .map((attack) => getProjectedDamage(attacker, attack, target, state)),
  )
}

function formatAttackCap(value: number): string {
  return value === Number.POSITIVE_INFINITY ? 'Any' : `${value}`
}

function getTypeBadgeClass(type?: string): string {
  return type
    ? TYPE_BADGE_CLASSES[type] || TYPE_BADGE_CLASSES.Colorless
    : TYPE_BADGE_CLASSES.Colorless
}

function orderCardsByIds(cards: TcgBattleCardState[], ids: string[]) {
  return ids
    .map((id) => cards.find((card) => card.instanceId === id))
    .filter((card): card is TcgBattleCardState => Boolean(card))
}

function getAllSideCards(side: TcgBattleState['player']): TcgBattleCardState[] {
  return [...side.front, ...side.back, ...side.hand, ...side.discard]
}

function findSideCard(
  side: TcgBattleState['player'],
  instanceId: string,
): TcgBattleCardState | undefined {
  return getAllSideCards(side).find((card) => card.instanceId === instanceId)
}

function cloneTcgBattleCard(card: TcgBattleCardState): TcgBattleCardState {
  return {
    ...card,
    evolutionStack: card.evolutionStack?.map((summary) => ({ ...summary })),
    statusConditions: card.statusConditions
      ? [...card.statusConditions]
      : undefined,
    incomingAttackModifier: card.incomingAttackModifier
      ? { ...card.incomingAttackModifier }
      : undefined,
    temporaryEffects: card.temporaryEffects
      ? structuredClone(card.temporaryEffects)
      : undefined,
    markers: card.markers ? [...card.markers] : undefined,
  }
}

function cloneTcgBattleSide(
  side: TcgBattleState['player'],
): TcgBattleState['player'] {
  return {
    ...side,
    deck: [...side.deck],
    hand: side.hand.map(cloneTcgBattleCard),
    front: side.front.map(cloneTcgBattleCard),
    back: side.back.map(cloneTcgBattleCard),
    discard: side.discard.map(cloneTcgBattleCard),
  }
}

function cloneTcgBattleState(state: TcgBattleState): TcgBattleState {
  return {
    ...state,
    player: cloneTcgBattleSide(state.player),
    opponent: cloneTcgBattleSide(state.opponent),
    lastDamageEvents: state.lastDamageEvents
      ? [...state.lastDamageEvents]
      : undefined,
    lastCoinFlipEvents: state.lastCoinFlipEvents
      ? [...state.lastCoinFlipEvents]
      : undefined,
    lastStatusEvents: state.lastStatusEvents
      ? [...state.lastStatusEvents]
      : undefined,
    log: [...state.log],
  }
}

function clearVisualActionEvents(state: TcgBattleState) {
  state.lastDamageEvent = undefined
  state.lastDamageEvents = []
  state.lastCoinFlipEvent = undefined
  state.lastCoinFlipEvents = []
  state.lastStatusEvent = undefined
  state.lastStatusEvents = []
}

function applyVisualDamageEvent(
  state: TcgBattleState,
  event: TcgDamageEvent,
): boolean {
  const target = findSideCard(state[event.targetSide], event.targetId)
  if (!target) return false
  target.currentHp = Math.max(0, target.currentHp - event.damage)
  state.lastDamageEvent = event
  state.lastDamageEvents = [...(state.lastDamageEvents || []), event]
  return target.currentHp <= 0
}

function applyVisualStatusEvent(state: TcgBattleState, event: TcgStatusEvent) {
  const target = findSideCard(state[event.targetSide], event.targetId)
  if (!target) return
  target.statusConditions = mergeTcgBattleStatusConditions(
    target.statusConditions,
    event.statuses,
  )
  state.lastStatusEvent = event
  state.lastStatusEvents = [...(state.lastStatusEvents || []), event]
}

function applyVisualStatusRemovals(
  state: TcgBattleState,
  previousState: TcgBattleState,
  nextState: TcgBattleState,
  side: SideTone,
  cardId: string,
) {
  const visualCard = findSideCard(state[side], cardId)
  const previousCard = findSideCard(previousState[side], cardId)
  const resolvedCard = findSideCard(nextState[side], cardId)
  if (!visualCard || !previousCard || !resolvedCard) return

  const resolvedStatuses = new Set(resolvedCard.statusConditions || [])
  const removedStatuses = new Set(
    (previousCard.statusConditions || []).filter(
      (status) =>
        (status === 'asleep' ||
          status === 'paralyzed' ||
          status === 'confused') &&
        !resolvedStatuses.has(status),
    ),
  )
  if (removedStatuses.size === 0) return

  const remainingStatuses = (visualCard.statusConditions || []).filter(
    (status) => !removedStatuses.has(status),
  )
  visualCard.statusConditions =
    remainingStatuses.length > 0 ? remainingStatuses : undefined
}

function mergeTcgBattleStatusConditions(
  currentStatuses: TcgBattleStatusCondition[] | undefined,
  statuses: TcgBattleStatusCondition[],
) {
  const current = new Set(currentStatuses || [])
  if (
    statuses.some(
      (status) =>
        status === 'asleep' || status === 'paralyzed' || status === 'confused',
    )
  ) {
    current.delete('asleep')
    current.delete('paralyzed')
    current.delete('confused')
  }
  for (const status of statuses) current.add(status)
  return Array.from(current)
}

function compactVisualBattleBoard(
  side: TcgBattleState['player'],
): TcgBattleCardState[] {
  const fainted = [
    ...side.front.filter((card) => card.currentHp <= 0),
    ...side.back.filter((card) => card.currentHp <= 0),
  ]
  if (fainted.length === 0) return []
  const discarded = fainted.flatMap((card) => {
    const stack = (card.evolutionStack || []).map((summary, index) => ({
      ...summary,
      instanceId: `${summary.id}:discard:${card.instanceId}:${index}`,
      currentHp: 0,
    }))
    const { evolutionStack: _evolutionStack, ...faintedCard } = card
    return [...stack, faintedCard]
  })
  side.discard = [...side.discard, ...discarded]
  side.front = side.front.filter((card) => card.currentHp > 0)
  side.back = side.back.filter((card) => card.currentHp > 0)
  return fainted
}

function promoteOpponentVisualFront(
  state: TcgBattleState,
): TcgBattleCardState[] {
  const promoted: TcgBattleCardState[] = []
  while (state.opponent.front.length < 3 && state.opponent.back.length > 0) {
    const nextCard = state.opponent.back.shift()
    if (!nextCard) break
    state.opponent.front.push(nextCard)
    promoted.push(nextCard)
  }
  return promoted
}

function flagPlayerVisualPromotion(state: TcgBattleState): boolean {
  if (state.player.front.length >= 3 || state.player.back.length === 0)
    return false
  state.pendingPromotion = 'player'
  state.phase = 'promotion'
  return true
}

function applyVisualRetreat(
  state: TcgBattleState,
  frontId: string,
  backId: string,
) {
  const frontIndex = state.player.front.findIndex(
    (card) => card.instanceId === frontId,
  )
  const backIndex = state.player.back.findIndex(
    (card) => card.instanceId === backId,
  )
  if (frontIndex < 0 || backIndex < 0) return

  const retreating = state.player.front[frontIndex]
  const replacement = state.player.back[backIndex]
  state.player.front[frontIndex] = replacement
  state.player.back[backIndex] = retreating
  state.player.energy = Math.max(
    0,
    state.player.energy - getTcgBattleAbilityRetreatCost(state.player, retreating, state.opponent, state.turnNumber),
  )
}

function findDamageEvent(
  state: TcgBattleState,
  predicate: (event: TcgDamageEvent) => boolean,
) {
  return state.lastDamageEvents?.find(predicate)
}

function makeResolutionId(prefix: string) {
  return `${prefix}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`
}

function makeCoinCue(
  event: NonNullable<TcgBattleState['lastCoinFlipEvents']>[number] | undefined,
): CoinCue | undefined {
  if (!event) return undefined
  return {
    id: event.id,
    sourceId: event.sourceId,
    side: event.side,
    purpose: event.purpose,
    results: event.results,
    heads: event.heads,
    tails: event.tails,
  }
}

function getAttackCoinCues(
  state: TcgBattleState,
  sourceId: string,
  side: SideTone,
): CoinCue[] {
  return (state.lastCoinFlipEvents || [])
    .filter(
      (event) =>
        event.sourceId === sourceId &&
        (event.purpose === undefined ||
          event.purpose === 'status-check' ||
          event.purpose === 'attack' ||
          event.purpose === 'attack-failure' ||
          event.purpose === 'effect'),
    )
    .map((event) => ({ ...makeCoinCue(event)!, side }))
}

function getCoinCueTitle(cue: CoinCue): string {
  switch (cue.purpose) {
    case 'status-check':
      return 'Status Check'
    case 'attack-failure':
      return 'Attack Check'
    case 'endure':
      return 'Endure Check'
    case 'effect':
      return 'Effect Check'
    default:
      return 'Attack Flip'
  }
}

function formatCoinSummary(cue?: CoinCue): string {
  if (!cue) return ''
  return `${cue.heads} heads / ${cue.tails} tails`
}

function formatStatusSummary(statuses: TcgBattleStatusCondition[]): string {
  return statuses
    .map((status) => status.charAt(0).toUpperCase() + status.slice(1))
    .join(', ')
}

function didAttackCapIncrease(previousCap: number, nextCap: number): boolean {
  const normalizedPrev =
    previousCap === Number.POSITIVE_INFINITY ? 4 : previousCap
  const normalizedNext = nextCap === Number.POSITIVE_INFINITY ? 4 : nextCap
  return normalizedNext > normalizedPrev
}

function isStageUnlockTurn(turnNumber: number): boolean {
  return (
    turnNumber === 3 ||
    turnNumber === 5 ||
    turnNumber === 7 ||
    turnNumber === 10
  )
}

function getWinnerLabel(winner?: TcgBattleState['winner']) {
  if (winner === 'player') return 'Victory'
  if (winner === 'opponent') return 'Defeat'
  if (winner === 'tie') return 'Draw'
  return 'Result'
}

function getWinnerMessage(
  winner?: TcgBattleState['winner'],
  noContest?: boolean,
) {
  if (noContest) return 'The match expired before either collector was ready.'
  if (winner === 'player') return 'You won the TCG battle.'
  if (winner === 'opponent') return 'You lost the TCG battle.'
  if (winner === 'tie') return 'The TCG battle ended in a draw.'
  return undefined
}

export function TcgBattleGame({ encounter }: TcgBattleGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { trigger: triggerHaptic } = useHaptics()
  const { refreshUser } = useUser()
  const router = useRouter()
  const [state, setState] = useState<TcgBattleState | null>(null)
  const [frontIds, setFrontIds] = useState<string[]>([])
  const [attackerId, setAttackerId] = useState('')
  const [targetId, setTargetId] = useState('')
  const [benchMode, setBenchMode] = useState<BenchMode | null>(null)
  const [showEvolutionSheet, setShowEvolutionSheet] = useState(false)
  const [selectedEvolutionCardId, setSelectedEvolutionCardId] = useState<string | null>(null)
  const [turnDrawNotice, setTurnDrawNotice] = useState<string | null>(null)
  const previousBattleLogRef = useRef<Map<string, number> | null>(null)
  const [choiceAttackIndex, setChoiceAttackIndex] = useState<number | null>(
    null,
  )
  const [previewCard, setPreviewCard] = useState<TcgBattleCardState | null>(
    null,
  )
  const [showOpeningVs, setShowOpeningVs] = useState(false)
  const [result, setResult] = useState<GameCompletionResult | null>(null)
  const [completionState, setCompletionState] = useState<TcgBattleState | null>(
    null,
  )
  const [claimError, setClaimError] = useState<string | null>(null)
  const [resolution, setResolution] = useState<BattleResolution | null>(null)
  const [isActionBusy, setIsActionBusy] = useState(false)
  const [attackCapPulse, setAttackCapPulse] = useState(false)
  const [energyNotice, setEnergyNotice] = useState<{
    id: number
    kind: 'evolution' | 'energy-card'
  } | null>(null)
  const [showSurrenderConfirm, setShowSurrenderConfirm] = useState(false)
  const [clockNow, setClockNow] = useState(() => Date.now())
  const [isPending, startTransition] = useTransition()
  const timersRef = useRef<number[]>([])
  const lastAnimatedActionRef = useRef<string | null>(null)
  const energyNoticeIdRef = useRef(0)

  const clearResolutionTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  useEffect(() => () => clearResolutionTimers(), [clearResolutionTimers])

  const scheduleResolutionStep = useCallback(
    (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay)
      timersRef.current.push(timer)
    },
    [],
  )

  useEffect(() => {
    let cancelled = false
    window.dispatchEvent(new Event(ACTIVITY_STARTED_EVENT))
    startTransition(async () => {
      const response = await startTcgBattle(encounter.id)
      if (cancelled) return
      if (!response.success) {
        window.dispatchEvent(new Event(ACTIVITY_SETTLED_EVENT))
        toast.error(response.error)
        router.replace('/game/explore')
        return
      }
      if ('cost' in encounter.settings && encounter.settings.cost) {
        void refreshUser()
      }
      setState(response.state)
      setFrontIds(
        response.state.phase === 'arranging' && !response.state.ready?.player
          ? []
          : response.state.player.front.map((card) => card.instanceId),
      )
    })
    return () => {
      cancelled = true
    }
  }, [encounter.id, router])

  useEffect(() => {
    if (state?.battleMode !== 'pvp' || state.phase === 'finished') return
    setClockNow(Date.now())
    const timer = window.setInterval(() => setClockNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [state?.battleMode, state?.phase])

  useEffect(() => {
    if (state?.phase !== 'battle') return
    if (!state.player.front.some((card) => card.instanceId === attackerId)) {
      setAttackerId(state.player.front[0]?.instanceId || '')
    }
    if (!state.opponent.front.some((card) => card.instanceId === targetId)) {
      setTargetId(state.opponent.front[0]?.instanceId || '')
    }
  }, [attackerId, state, targetId])

  useEffect(() => {
    if (state?.pendingPromotion === 'player' && state.player.back.length > 0) {
      setBenchMode('promote')
    }
  }, [state?.pendingPromotion, state?.player.back.length])

  const selectedAttacker = useMemo(
    () => state?.player.front.find((card) => card.instanceId === attackerId),
    [attackerId, state],
  )
  const selectedTarget = useMemo(
    () => state?.opponent.front.find((card) => card.instanceId === targetId),
    [state, targetId],
  )
  const evolutionOptions = useMemo(
    () =>
      state
        ? getTcgBattleEvolutionOptions(state.player, state.turnNumber, 'player', state.opponent, state.playerGoesSecond)
        : [],
    [state?.player, state?.turnNumber, state?.playerGoesSecond],
  )
  const attackCap = state ? getAllowedAttackCost(state.turnNumber) : 1
  const formatConfig = state ? TCG_BATTLE_FORMATS[state.format] : null
  const deadlineSeconds = state?.deadlineAt
    ? Math.max(0, Math.ceil((state.deadlineAt - clockNow) / 1000))
    : null
  const prevAttackCapRef = useRef<number>(attackCap)
  const prevTurnRef = useRef<number>(state?.turnNumber || 1)
  const isBusy =
    isPending || isActionBusy || Boolean(resolution) || showOpeningVs
  const closeOpeningVs = useCallback(() => setShowOpeningVs(false), [])

  useEffect(() => {
    if (!state) return
    const previousCap = prevAttackCapRef.current
    if (didAttackCapIncrease(previousCap, attackCap)) {
      setAttackCapPulse(true)
    }
    prevAttackCapRef.current = attackCap
  }, [attackCap, state])

  useEffect(() => {
    if (!attackCapPulse) return
    const timer = window.setTimeout(() => setAttackCapPulse(false), 1100)
    return () => window.clearTimeout(timer)
  }, [attackCapPulse])

  useEffect(() => {
    if (!state) return
    const previousTurn = prevTurnRef.current
    if (previousTurn < 15 && state.turnNumber >= 15) {
      prevTurnRef.current = state.turnNumber
      energyNoticeIdRef.current += 1
      setEnergyNotice({ id: energyNoticeIdRef.current, kind: 'energy-card' })
      return
    }
    if (
      state.turnNumber !== previousTurn &&
      isStageUnlockTurn(state.turnNumber)
    ) {
      prevTurnRef.current = state.turnNumber
      energyNoticeIdRef.current += 1
      setEnergyNotice({ id: energyNoticeIdRef.current, kind: 'evolution' })
      return
    }
    prevTurnRef.current = state.turnNumber
  }, [state])

  useEffect(() => {
    if (state?.phase !== 'battle') return
    const previousEntries = previousBattleLogRef.current
    const currentEntries = new Map<string, number>()
    for (const entry of state.log) currentEntries.set(entry, (currentEntries.get(entry) || 0) + 1)
    const drawEntry = previousEntries
      ? state.log.find((entry) => entry.startsWith('Player drew ') && entry.includes(' at the start of the turn.') && (previousEntries.get(entry) || 0) < (currentEntries.get(entry) || 0))
      : null
    previousBattleLogRef.current = currentEntries
    if (drawEntry) {
      const cardName = drawEntry.slice('Player drew '.length).replace(/ at the start of the turn\.$/, '')
      setTurnDrawNotice(cardName)
      const timer = window.setTimeout(() => setTurnDrawNotice(null), 4500)
      return () => window.clearTimeout(timer)
    }
  }, [state])

  useEffect(() => {
    if (!energyNotice) return
    const duration = energyNotice.kind === 'energy-card' ? 2100 : 1850
    const timer = window.setTimeout(() => setEnergyNotice(null), duration)
    return () => window.clearTimeout(timer)
  }, [energyNotice])

  const commitActionResult = useCallback(
    (nextState: TcgBattleState, completion?: GameCompletionResult) => {
      setState(nextState)
      setResolution(null)
      setIsActionBusy(false)
      if (completion) {
        setResult(completion)
        setCompletionState(nextState)
      }
      if (nextState.phase === 'finished') {
        if (nextState.winner === 'player') playSfx('stance_win')
        else if (nextState.winner === 'opponent') playSfx('stance_loss')
        else playSfx('stance_tie')
      }
    },
    [playSfx],
  )

  const animateActionResult = useCallback(
    (
      previousState: TcgBattleState,
      nextState: TcgBattleState,
      meta: ActionMeta,
      completion?: GameCompletionResult,
    ) => {
      clearResolutionTimers()

      if (meta.kind === 'arrange') {
        commitActionResult(nextState, completion)
        setShowOpeningVs(
          nextState.phase === 'battle' &&
            Boolean(nextState.playerTrainer && nextState.enemyTrainer),
        )
        return
      }

      if (meta.kind === 'claim' || meta.kind === 'promote') {
        if (meta.kind === 'promote') playSfx('select')
        commitActionResult(nextState, completion)
        return
      }

      if (meta.kind === 'ability') {
        const healedTarget = meta.targetId ? findSideCard(nextState.player, meta.targetId) : undefined
        const abilityCoin = nextState.lastCoinFlipEvents?.find((event) => event.sourceId === meta.sourceId && event.purpose === 'effect' && !previousState.lastCoinFlipEvents?.some((previous) => previous.id === event.id))
        setResolution({
          id: makeResolutionId('ability-heal'),
          tone: 'player',
          title: meta.abilityName,
          detail: meta.abilityEffect === 'status' && meta.abilityName === 'Fire Breath' && abilityCoin?.heads === 0
            ? 'Fire Breath flipped tails; no Special Condition was applied.'
            : abilityCoin
            ? abilityCoin.heads > 0
              ? `${abilityCoin.heads} heads: ${healedTarget?.name || 'Your Pokémon'} healed from ${meta.abilityName}.`
              : 'Tails: no damage was healed.'
            : meta.abilityEffect === 'status' && ['Pollen Stench', 'Long Distance Hypnosis', 'Fire Breath'].includes(meta.abilityName || '')
            ? `${meta.abilityName} flipped a coin; the Active Pokémon named by the result became ${meta.abilityStatus}.`
            : meta.abilityEffect === 'status'
            ? meta.abilityName === 'Head Trip' ? `Your Active Pokémon became ${meta.abilityStatus}.` : `The opponent's Active Pokémon became ${meta.abilityStatus}.`
            : meta.abilityEffect === 'heal' && meta.abilityName === 'Assistance'
            ? `${healedTarget?.name || 'Your Active Pokémon'} recovered from a Special Condition.`
            : meta.abilityEffect === 'search'
            ? `${meta.abilityName} searched your deck and shuffled it.`
            : meta.abilityEffect === 'discardHandDraw'
            ? `${meta.abilityName} discarded your hand and drew cards.`
            : meta.abilityEffect === 'refillDraw'
            ? `${meta.abilityName} drew cards until your hand reached 3.`
            : meta.abilityEffect === 'discardDraw'
            ? `${meta.abilityName} discarded a Pokémon and drew cards.`
            : meta.abilityEffect === 'draw'
            ? `${meta.abilityName} drew a card.`
            : meta.abilityEffect === 'reveal'
            ? nextState.log[0] || `${meta.abilityName} resolved a hand reveal.`
            : meta.abilityEffect === 'switch'
              ? `${meta.abilityName} changed the Active Pokémon.`
              : healedTarget ? `${healedTarget.name} recovered up to 20 HP.` : 'Healing ability used.',
          sourceId: meta.sourceId,
        })
        playSfx('good')
        scheduleResolutionStep(() => commitActionResult(nextState, completion), RESOLUTION_TIMING.actionIntro + RESOLUTION_TIMING.finalSettle)
        return
      }

      if (meta.kind === 'evolve') {
        const previous = findSideCard(previousState.player, meta.targetId)
        const evolved = findSideCard(nextState.player, meta.targetId)
        setResolution({
          id: makeResolutionId('evolved'),
          tone: 'player',
          title: 'Evolution',
          detail: `${previous?.name || 'Your Pokémon'} became ${evolved?.name || 'its next stage'}.`,
        })
        playSfx('good')
        scheduleResolutionStep(
          () => commitActionResult(nextState, completion),
          RESOLUTION_TIMING.actionIntro + RESOLUTION_TIMING.finalSettle,
        )
        return
      }

      let cursor = 0
      const plannedState = cloneTcgBattleState(previousState)
      const visualState = cloneTcgBattleState(previousState)
      clearVisualActionEvents(plannedState)
      clearVisualActionEvents(visualState)
      if (meta.kind === 'attack') {
        const attacker = findSideCard(previousState.player, meta.attackerId)
        const attack = attacker ? getTcgBattleAvailableAttacks(previousState, 'player', attacker)[meta.attackIndex] : undefined
        const attackWasPrevented = nextState.lastCoinFlipEvents?.some(
          (event) =>
            event.sourceId === meta.attackerId &&
            (event.purpose === 'status-check' ||
              event.purpose === 'attack-failure') &&
            event.tails > 0,
        )
        if (attack && !attackWasPrevented) {
          const paidEnergy = getAttackCost(attack, previousState, attacker, 'player')
          plannedState.player.energy = Math.max(
            0,
            plannedState.player.energy - paidEnergy,
          )
          visualState.player.energy = Math.max(
            0,
            visualState.player.energy - paidEnergy,
          )
        }
      }
      setState(cloneTcgBattleState(visualState))

      const publishVisualState = (updater: (draft: TcgBattleState) => void) => {
        updater(visualState)
        setState(cloneTcgBattleState(visualState))
      }
      const showResolution = (
        nextResolution: BattleResolution,
        sfx?: 'select' | 'good' | 'bad',
        onShow?: () => void,
      ) => {
        onShow?.()
        setResolution(nextResolution)
        if (sfx) playSfx(sfx)
      }
      const queueResolution = (
        delay: number,
        nextResolution: BattleResolution,
        sfx?: 'select' | 'good' | 'bad',
        onShow?: () => void,
      ) => {
        cursor += delay
        scheduleResolutionStep(
          () => showResolution(nextResolution, sfx, onShow),
          cursor,
        )
      }
      const queueDamageResolution = (
        delay: number,
        nextResolution: BattleResolution,
        sfx: 'select' | 'good' | 'bad',
        event?: TcgDamageEvent,
        onShow?: (draft: TcgBattleState) => void,
      ) => {
        if (event) applyVisualDamageEvent(plannedState, event)
        queueResolution(
          delay,
          nextResolution,
          sfx,
          event || onShow
            ? () =>
                publishVisualState((draft) => {
                  onShow?.(draft)
                  if (event) applyVisualDamageEvent(draft, event)
                })
            : undefined,
        )
      }
      const queueStatusResolution = (event: TcgStatusEvent | undefined) => {
        if (!event) return
        const target = findSideCard(
          plannedState[event.targetSide],
          event.targetId,
        )
        applyVisualStatusEvent(plannedState, event)
        queueResolution(
          RESOLUTION_TIMING.statusUpdate,
          {
            id: makeResolutionId('status-condition'),
            tone: event.targetSide === 'player' ? 'opponent' : 'player',
            title: 'Status Condition',
            detail: `${target?.name || 'Active card'} is now ${formatStatusSummary(event.statuses)}`,
            sourceId: event.sourceId,
          },
          'select',
          () =>
            publishVisualState((draft) => applyVisualStatusEvent(draft, event)),
        )
      }
      const planOpponentSettle = (autoPromote = true) => {
        const fainted = compactVisualBattleBoard(plannedState.opponent)
        const promoted = autoPromote
          ? promoteOpponentVisualFront(plannedState)
          : []
        return { fainted, promoted }
      }
      const planPlayerSettle = () => {
        const fainted = compactVisualBattleBoard(plannedState.player)
        const needsPromotion = flagPlayerVisualPromotion(plannedState)
        return { fainted, needsPromotion }
      }
      const queueOpponentSettle = (
        settle: ReturnType<typeof planOpponentSettle>,
      ) => {
        if (settle.fainted.length > 0) {
          queueResolution(
            RESOLUTION_TIMING.faint,
            {
              id: makeResolutionId('opponent-knockout'),
              tone: 'system',
              title: 'Knocked Out',
              detail:
                settle.fainted.length === 1
                  ? `${settle.fainted[0]?.name || 'Opponent card'} leaves the front row`
                  : `${settle.fainted.length} opponent cards leave the board`,
            },
            'select',
            () =>
              publishVisualState(
                (draft) => void compactVisualBattleBoard(draft.opponent),
              ),
          )
        }

        if (settle.promoted.length > 0) {
          const promoted = settle.promoted[0]
          queueResolution(
            RESOLUTION_TIMING.boardUpdate,
            {
              id: makeResolutionId('opponent-promote'),
              tone: 'opponent',
              title: 'Opponent Promotes',
              detail: `${promoted.name} moves to the front row`,
              sourceId: promoted.instanceId,
            },
            'select',
            () =>
              publishVisualState(
                (draft) => void promoteOpponentVisualFront(draft),
              ),
          )
        }
      }
      const queuePlayerSettle = (
        settle: ReturnType<typeof planPlayerSettle>,
      ) => {
        if (settle.fainted.length > 0) {
          queueResolution(
            RESOLUTION_TIMING.faint,
            {
              id: makeResolutionId('player-knockout'),
              tone: 'system',
              title: 'Knocked Out',
              detail:
                settle.fainted.length === 1
                  ? `${settle.fainted[0]?.name || 'Your card'} leaves your front row`
                  : `${settle.fainted.length} of your cards leave the board`,
            },
            'select',
            () =>
              publishVisualState(
                (draft) => void compactVisualBattleBoard(draft.player),
              ),
          )
        }

        if (settle.needsPromotion) {
          queueResolution(
            RESOLUTION_TIMING.boardUpdate,
            {
              id: makeResolutionId('player-promote-needed'),
              tone: 'system',
              title: 'Front Row Open',
              detail: 'Choose a bench card to promote',
            },
            'select',
            () =>
              publishVisualState(
                (draft) => void flagPlayerVisualPromotion(draft),
              ),
          )
        }
      }

      const playerTargetDamageEvent =
        meta.kind === 'attack'
          ? findDamageEvent(
              nextState,
              (event) =>
                event.sourceId === meta.attackerId &&
                event.targetId === meta.targetId &&
                event.targetSide === 'opponent',
            )
          : undefined
      const playerRecoilEvent =
        meta.kind === 'attack'
          ? findDamageEvent(
              nextState,
              (event) =>
                event.reason === 'self' &&
                event.sourceId === meta.attackerId &&
                event.targetId === meta.attackerId &&
                event.targetSide === 'player',
            )
          : undefined
      const playerConfusionEvent =
        meta.kind === 'attack'
          ? findDamageEvent(
              nextState,
              (event) =>
                event.reason === 'confusion' &&
                event.sourceId === meta.attackerId &&
                event.targetId === meta.attackerId &&
                event.targetSide === 'player',
            )
          : undefined
      const playerStatusEvents =
        meta.kind === 'attack'
          ? (nextState.lastStatusEvents || []).filter(
              (event) => event.sourceId === meta.attackerId,
            )
          : undefined
      const opponentDamageEvent = findDamageEvent(
        nextState,
        (event) =>
          event.reason !== 'status' &&
          event.reason !== 'ability' &&
          event.targetSide === 'player' &&
          event.sourceId !== event.targetId,
      )
      const opponentRecoilEvent = findDamageEvent(
        nextState,
        (event) =>
          event.reason === 'self' &&
          event.targetSide === 'opponent' &&
          event.sourceId === event.targetId,
      )
      const opponentConfusionEvent = findDamageEvent(
        nextState,
        (event) =>
          event.reason === 'confusion' &&
          event.targetSide === 'opponent' &&
          event.sourceId === event.targetId,
      )
      const opponentStatusEvents = (nextState.lastStatusEvents || []).filter(
        (event) =>
          event.targetSide === 'player' &&
          previousState.opponent.front.some(
            (card) => card.instanceId === event.sourceId,
          ),
      )
      const opponentAttackAction =
        nextState.lastAction?.side === 'opponent' &&
        nextState.lastAction.kind === 'attack' &&
        nextState.lastAction.id !== previousState.lastAction?.id
          ? nextState.lastAction
          : undefined
      const opponentAttackerId =
        opponentAttackAction?.attackerId ||
        opponentDamageEvent?.sourceId ||
        opponentStatusEvents[0]?.sourceId ||
        nextState.lastCoinFlipEvents?.find(
          (event) =>
            previousState.opponent.front.some(
              (card) => card.instanceId === event.sourceId,
            ) &&
            event.purpose !== 'endure' &&
            event.purpose !== 'effect',
        )?.sourceId
      const playerEffectEvent =
        meta.kind === 'attack'
          ? nextState.lastEffectEvents?.find(
              (event) => event.sourceId === meta.attackerId,
            )
          : undefined
      const endOfRoundStatusDamageEvents =
        nextState.lastDamageEvents?.filter(
          (event) => event.reason === 'status',
        ) || []
      const opponentCoinCues = opponentAttackerId
        ? getAttackCoinCues(nextState, opponentAttackerId, 'opponent')
        : []
      const opponentAttacker = opponentAttackerId
        ? findSideCard(plannedState.opponent, opponentAttackerId)
        : undefined
      const opponentAttack =
        opponentAttacker && opponentAttackAction
          ? getTcgBattleAvailableAttacks(previousState, 'opponent', opponentAttacker)[opponentAttackAction.attackIndex || 0]
          : undefined
      const opponentAttackWasPrevented = opponentCoinCues.some(
        (cue) =>
          (cue.purpose === 'status-check' ||
            cue.purpose === 'attack-failure') &&
          cue.tails > 0,
      )
      const applyVisualOpponentAttackPayment = (draft: TcgBattleState) => {
        draft.activeSide = 'opponent'
        if (opponentAttack && !opponentAttackWasPrevented) {
          draft.opponent.energy = Math.max(
            0,
            draft.opponent.energy - getAttackCost(opponentAttack, previousState, opponentAttacker, 'opponent'),
          )
        }
      }

      if (meta.kind === 'attack') {
        const attacker = findSideCard(previousState.player, meta.attackerId)
        const target = findSideCard(previousState.opponent, meta.targetId)
        const attack = attacker ? getTcgBattleAvailableAttacks(previousState, 'player', attacker)[meta.attackIndex] : undefined
        const playerCoinCues = getAttackCoinCues(
          nextState,
          meta.attackerId,
          'player',
        )
        const playerCoinCue = playerCoinCues[0]
        const damage =
          playerTargetDamageEvent?.damage ??
          (playerCoinCue
            ? 0
            : attack && target
              ? getProjectedDamage(attacker, attack, target, previousState)
              : 0)

        showResolution(
          {
            id: makeResolutionId(
              playerCoinCue ? 'player-flip' : 'player-attack',
            ),
            tone: 'player',
            title: playerCoinCue
              ? getCoinCueTitle(playerCoinCue)
              : attack?.name || 'Attack',
            detail: playerCoinCue
              ? formatCoinSummary(playerCoinCue)
              : target
                ? `${attacker?.name || 'Your card'} targets ${target.name}`
                : 'Your card attacks',
            sourceId: attacker?.instanceId,
            coinCue: playerCoinCue,
          },
          'good',
          playerCoinCue?.purpose === 'status-check'
            ? () =>
                publishVisualState((draft) =>
                  applyVisualStatusRemovals(
                    draft,
                    previousState,
                    nextState,
                    'player',
                    meta.attackerId,
                  ),
                )
            : undefined,
        )

        for (const coinCue of playerCoinCues.slice(1)) {
          queueResolution(
            RESOLUTION_TIMING.coinFlip,
            {
              id: makeResolutionId(`player-${coinCue.purpose || 'coin'}-flip`),
              tone: 'player',
              title: getCoinCueTitle(coinCue),
              detail: formatCoinSummary(coinCue),
              sourceId: attacker?.instanceId,
              coinCue,
            },
            'good',
          )
        }

        queueDamageResolution(
          playerCoinCue
            ? RESOLUTION_TIMING.coinFlip
            : RESOLUTION_TIMING.actionIntro,
          {
            id: makeResolutionId('player-damage'),
            tone: damage > 0 ? 'player' : 'system',
            title: damage > 0 ? attack?.name || 'Attack' : 'No Damage',
            detail:
              target && damage > 0
                ? `${target.name} takes the hit`
                : target
                  ? `${target.name} avoids the damage`
                  : 'The attack resolves',
            sourceId: attacker?.instanceId,
            damageCue:
              target && damage > 0
                ? {
                    id: makeResolutionId('player-damage-cue'),
                    targetId: target.instanceId,
                    damage,
                    side: 'opponent',
                  }
                : undefined,
          },
          damage > 0 ? 'good' : 'select',
          playerTargetDamageEvent,
        )

        for (const statusEvent of playerStatusEvents || []) {
          queueStatusResolution(statusEvent)
        }

        cursor += RESOLUTION_TIMING.damageHold

        if (playerRecoilEvent) {
          queueDamageResolution(
            0,
            {
              id: makeResolutionId('player-recoil'),
              tone: 'system',
              title: 'Recoil',
              detail: `${attacker?.name || 'Your card'} is hit by recoil`,
              sourceId: playerRecoilEvent.sourceId,
              damageCue: {
                id: makeResolutionId('player-recoil-damage'),
                targetId: playerRecoilEvent.targetId,
                damage: playerRecoilEvent.damage,
                side: 'player',
              },
            },
            'select',
            playerRecoilEvent,
          )
          cursor += RESOLUTION_TIMING.recoil
        }

        if (playerConfusionEvent) {
          queueDamageResolution(
            0,
            {
              id: makeResolutionId('player-confusion'),
              tone: 'system',
              title: 'Confusion',
              detail: `${attacker?.name || 'Your card'} hurt itself in confusion`,
              sourceId: playerConfusionEvent.sourceId,
              damageCue: {
                id: makeResolutionId('player-confusion-damage'),
                targetId: playerConfusionEvent.targetId,
                damage: playerConfusionEvent.damage,
                side: 'player',
              },
            },
            'bad',
            playerConfusionEvent,
          )
          cursor += RESOLUTION_TIMING.recoil
        }

        if (playerEffectEvent) {
          const effectDetail =
            'label' in playerEffectEvent
              ? playerEffectEvent.label
              : playerEffectEvent.kind === 'energy'
                ? `${playerEffectEvent.amount} Energy gained`
                : 'The front line changed'
          showResolution(
            {
              id: makeResolutionId('player-effect'),
              tone: 'player',
              title:
                playerEffectEvent.kind === 'copy'
                  ? 'Copied Attack'
                  : 'Card Effect',
              detail: effectDetail,
              sourceId: playerEffectEvent.sourceId,
            },
            'select',
          )
          cursor += RESOLUTION_TIMING.actionIntro
        }
        queueOpponentSettle(planOpponentSettle(nextState.battleMode !== 'pvp'))
        queuePlayerSettle(planPlayerSettle())
      } else if (meta.kind === 'retreat') {
        const retreating = findSideCard(previousState.player, meta.frontId)
        const replacement = findSideCard(previousState.player, meta.backId)
        applyVisualRetreat(plannedState, meta.frontId, meta.backId)
        showResolution(
          {
            id: makeResolutionId('retreat'),
            tone: 'player',
            title: 'Retreat',
            detail: replacement
              ? `${retreating?.name || 'Active card'} falls back for ${replacement.name}`
              : `${retreating?.name || 'Active card'} falls back`,
          },
          'select',
          () =>
            publishVisualState((draft) =>
              applyVisualRetreat(draft, meta.frontId, meta.backId),
            ),
        )
        cursor += RESOLUTION_TIMING.actionIntro
      } else if (meta.kind === 'bench') {
        const playedId = nextState.lastAction?.frontId
        const played = nextState.player.front.find((card) => card.instanceId === playedId) || nextState.player.back.find((card) => card.instanceId === playedId)
        const destination = nextState.player.front.some((card) => card.instanceId === playedId) ? 'front row' : 'Bench'
        showResolution({ id: makeResolutionId('play-basic'), tone: 'player', title: 'Play Basic Pokémon', detail: `${played?.name || 'Basic Pokémon'} joined your ${destination} without ending your turn.` }, 'select')
        cursor += RESOLUTION_TIMING.actionIntro
      } else {
        showResolution(
          {
            id: makeResolutionId('charge'),
            tone: 'system',
            title: 'Charge',
            detail:
              nextState.player.energy > previousState.player.energy
                ? 'You stored energy for later.'
                : 'You ended turn.',
          },
          'select',
        )
        cursor += RESOLUTION_TIMING.actionIntro
      }

      const skipOpponentStep = meta.kind === 'bench' || (
        nextState.pendingPromotion === 'player' &&
        opponentCoinCues.length === 0 &&
        !opponentDamageEvent &&
        !opponentRecoilEvent &&
        !opponentConfusionEvent &&
        opponentStatusEvents.length === 0 &&
        endOfRoundStatusDamageEvents.length === 0
      )
      const playerTarget = opponentDamageEvent
        ? findSideCard(plannedState.player, opponentDamageEvent.targetId)
        : undefined

      if (!skipOpponentStep && nextState.battleMode !== 'pvp') {
        if (opponentCoinCues.length > 0) {
          opponentCoinCues.forEach((coinCue, index) => {
            queueResolution(
              index === 0
                ? RESOLUTION_TIMING.betweenActions
                : RESOLUTION_TIMING.coinFlip,
              {
                id: makeResolutionId(`opponent-${coinCue.purpose || 'coin'}-flip`),
                tone: 'opponent',
                title: getCoinCueTitle(coinCue),
                detail: formatCoinSummary(coinCue),
                sourceId: opponentAttacker?.instanceId,
                coinCue,
              },
              'bad',
              index === 0
                ? () => publishVisualState(applyVisualOpponentAttackPayment)
                : undefined,
            )
          })

          queueDamageResolution(
            RESOLUTION_TIMING.coinFlip,
            {
              id: makeResolutionId(
                opponentDamageEvent ? 'opponent-damage' : 'opponent-no-damage',
              ),
              tone: opponentDamageEvent ? 'opponent' : 'system',
              title: opponentDamageEvent ? 'Opponent Attack' : 'No Damage',
              detail: opponentDamageEvent
                ? `${playerTarget?.name || 'Your card'} takes the hit`
                : 'The opponent attack fails to damage',
              sourceId: opponentAttacker?.instanceId,
              damageCue: opponentDamageEvent
                ? {
                    id: makeResolutionId('opponent-damage-cue'),
                    targetId: opponentDamageEvent.targetId,
                    damage: opponentDamageEvent.damage,
                    side: 'player',
                  }
                : undefined,
            },
            opponentDamageEvent ? 'bad' : 'select',
            opponentDamageEvent,
          )
          if (opponentDamageEvent) cursor += RESOLUTION_TIMING.damageHold
        } else if (opponentDamageEvent) {
          queueDamageResolution(
            RESOLUTION_TIMING.betweenActions,
            {
              id: makeResolutionId('opponent-damage'),
              tone: 'opponent',
              title: 'Opponent Attack',
              detail: `${playerTarget?.name || 'Your card'} takes the hit`,
              sourceId: opponentAttacker?.instanceId,
              damageCue: {
                id: makeResolutionId('opponent-damage-cue'),
                targetId: opponentDamageEvent.targetId,
                damage: opponentDamageEvent.damage,
                side: 'player',
              },
            },
            'bad',
            opponentDamageEvent,
            applyVisualOpponentAttackPayment,
          )
          cursor += RESOLUTION_TIMING.damageHold
        } else if (opponentRecoilEvent) {
          queueResolution(
            RESOLUTION_TIMING.betweenActions,
            {
              id: makeResolutionId('opponent-attack'),
              tone: 'opponent',
              title: 'Opponent Attack',
              detail: nextState.log[0] || 'The opponent attack resolves',
              sourceId: opponentAttacker?.instanceId,
            },
            'bad',
            () => publishVisualState(applyVisualOpponentAttackPayment),
          )
        } else if (opponentAttackAction) {
          queueResolution(
            RESOLUTION_TIMING.betweenActions,
            {
              id: makeResolutionId('opponent-attack'),
              tone: 'opponent',
              title: opponentAttack?.name || 'Opponent Attack',
              detail: nextState.log[0] || 'The opponent attack resolves.',
              sourceId: opponentAttacker?.instanceId,
            },
            'bad',
            () => publishVisualState(applyVisualOpponentAttackPayment),
          )
        } else {
          queueResolution(
            RESOLUTION_TIMING.betweenActions,
            {
              id: makeResolutionId('opponent-pass'),
              tone: nextState.phase === 'finished' ? 'system' : 'opponent',
              title:
                nextState.phase === 'finished'
                  ? getWinnerLabel(nextState.winner)
                  : 'Opponent Checks',
              detail: nextState.log[0] || 'The board settles.',
            },
            undefined,
            () =>
              publishVisualState((draft) => {
                draft.activeSide = 'opponent'
              }),
          )
        }

        const opponentRecoilCard = opponentRecoilEvent
          ? findSideCard(plannedState.opponent, opponentRecoilEvent.targetId)
          : undefined
        if (opponentRecoilEvent && opponentRecoilCard) {
          queueDamageResolution(
            opponentDamageEvent ? 0 : RESOLUTION_TIMING.recoil,
            {
              id: makeResolutionId('opponent-recoil'),
              tone: 'system',
              title: 'Recoil',
              detail: `${opponentRecoilCard.name} is hit by recoil`,
              sourceId: opponentRecoilEvent.sourceId,
              damageCue: {
                id: makeResolutionId('opponent-recoil-damage'),
                targetId: opponentRecoilEvent.targetId,
                damage: opponentRecoilEvent.damage,
                side: 'opponent',
              },
            },
            'select',
            opponentRecoilEvent,
          )
          cursor += RESOLUTION_TIMING.recoil
        }

        const opponentConfusionCard = opponentConfusionEvent
          ? findSideCard(plannedState.opponent, opponentConfusionEvent.targetId)
          : undefined
        if (opponentConfusionEvent && opponentConfusionCard) {
          queueDamageResolution(
            opponentDamageEvent || opponentRecoilEvent
              ? 0
              : RESOLUTION_TIMING.recoil,
            {
              id: makeResolutionId('opponent-confusion'),
              tone: 'system',
              title: 'Confusion',
              detail: `${opponentConfusionCard.name} hurt itself in confusion`,
              sourceId: opponentConfusionEvent.sourceId,
              damageCue: {
                id: makeResolutionId('opponent-confusion-damage'),
                targetId: opponentConfusionEvent.targetId,
                damage: opponentConfusionEvent.damage,
                side: 'opponent',
              },
            },
            'good',
            opponentConfusionEvent,
          )
          cursor += RESOLUTION_TIMING.recoil
        }

        for (const statusEvent of opponentStatusEvents) {
          queueStatusResolution(statusEvent)
        }
        for (const statusDamageEvent of endOfRoundStatusDamageEvents) {
          const statusTarget = findSideCard(
            plannedState[statusDamageEvent.targetSide],
            statusDamageEvent.targetId,
          )
          queueDamageResolution(
            RESOLUTION_TIMING.damageHold,
            {
              id: makeResolutionId('status-damage'),
              tone: 'system',
              title: 'Status Damage',
              detail: `${statusTarget?.name || 'Active card'} suffers poison/burn damage`,
              sourceId: statusDamageEvent.sourceId,
              damageCue: {
                id: makeResolutionId('status-damage-cue'),
                targetId: statusDamageEvent.targetId,
                damage: statusDamageEvent.damage,
                side: statusDamageEvent.targetSide,
              },
            },
            'select',
            statusDamageEvent,
          )
        }

        queueOpponentSettle(planOpponentSettle())
        queuePlayerSettle(planPlayerSettle())
      }

      scheduleResolutionStep(
        () => commitActionResult(nextState, completion),
        cursor + RESOLUTION_TIMING.finalSettle,
      )
    },
    [
      clearResolutionTimers,
      commitActionResult,
      playSfx,
      scheduleResolutionStep,
    ],
  )

  const animateRemoteActionResult = useCallback(
    (previousState: TcgBattleState, nextState: TcgBattleState) => {
      const action = nextState.lastAction
      if (action?.side !== 'opponent') {
        commitActionResult(nextState)
        return
      }

      clearResolutionTimers()
      setIsActionBusy(true)
      if (action.kind === 'arrange') {
        commitActionResult(nextState)
        if (
          previousState.phase === 'arranging' &&
          nextState.phase === 'battle' &&
          nextState.playerTrainer &&
          nextState.enemyTrainer
        ) {
          setShowOpeningVs(true)
        }
        return
      }
      if (action.kind === 'surrender' || action.kind === 'timeout') {
        commitActionResult(nextState)
        return
      }

      const visualState = cloneTcgBattleState(previousState)
      clearVisualActionEvents(visualState)
      const remoteDamage = nextState.lastDamageEvents?.find(
        (event) =>
          event.reason !== 'status' &&
          event.reason !== 'ability' &&
          (event.targetSide === 'player' || event.targetSide === 'opponent'),
      )

      if (action.kind === 'attack') {
        const remoteCoinCues = action.attackerId
          ? getAttackCoinCues(nextState, action.attackerId, 'opponent')
          : []
        const attacker = findSideCard(
          previousState.opponent,
          action.attackerId || '',
        )
        const target = findSideCard(previousState.player, action.targetId || '')
        const attack = attacker ? getTcgBattleAvailableAttacks(previousState, 'opponent', attacker)[action.attackIndex || 0] : undefined
        const attackWasPrevented = remoteCoinCues.some(
          (cue) =>
            (cue.purpose === 'status-check' ||
              cue.purpose === 'attack-failure') &&
            cue.tails > 0,
        )
        if (attack && !attackWasPrevented) {
          visualState.opponent.energy = Math.max(
            0,
            visualState.opponent.energy - getAttackCost(attack, previousState, attacker, 'opponent'),
          )
        }
        setState(visualState)
        const firstCoinCue = remoteCoinCues[0]
        setResolution({
          id: makeResolutionId('remote-attack'),
          tone: 'opponent',
          title: firstCoinCue
            ? getCoinCueTitle(firstCoinCue)
            : attack?.name || 'Opponent Attack',
          detail: firstCoinCue
            ? formatCoinSummary(firstCoinCue)
            : target
              ? `${attacker?.name || 'Opponent card'} targets ${target.name}`
              : nextState.log[0] || 'The opposing front line acts.',
          sourceId: attacker?.instanceId,
          coinCue: firstCoinCue,
        })
        playSfx('bad')
        if (firstCoinCue?.purpose === 'status-check' && action.attackerId) {
          setState((current) => {
            if (!current) return current
            const draft = cloneTcgBattleState(current)
            applyVisualStatusRemovals(
              draft,
              previousState,
              nextState,
              'opponent',
              action.attackerId!,
            )
            return draft
          })
        }
        remoteCoinCues.slice(1).forEach((coinCue, index) => {
          scheduleResolutionStep(() => {
            setResolution({
              id: makeResolutionId(`remote-${coinCue.purpose || 'coin'}-flip`),
              tone: 'opponent',
              title: getCoinCueTitle(coinCue),
              detail: formatCoinSummary(coinCue),
              sourceId: attacker?.instanceId,
              coinCue,
            })
            playSfx('bad')
          }, RESOLUTION_TIMING.coinFlip * (index + 1))
        })
        const damageDelay = remoteCoinCues.length > 0
          ? RESOLUTION_TIMING.coinFlip * remoteCoinCues.length
          : RESOLUTION_TIMING.actionIntro
        if (remoteDamage) {
          scheduleResolutionStep(() => {
            setResolution({
              id: makeResolutionId('remote-damage'),
              tone:
                remoteDamage.targetSide === 'player' ? 'opponent' : 'system',
              title:
                remoteDamage.reason === 'self' ? 'Recoil' : 'Opponent Attack',
              detail:
                remoteDamage.targetSide === 'player'
                  ? `${target?.name || 'Your card'} takes the hit`
                  : `${attacker?.name || 'Opponent card'} takes damage`,
              sourceId: remoteDamage.sourceId,
              damageCue: {
                id: makeResolutionId('remote-damage-cue'),
                targetId: remoteDamage.targetId,
                damage: remoteDamage.damage,
                side: remoteDamage.targetSide,
              },
            })
            setState((current) => {
              if (!current) return current
              const draft = cloneTcgBattleState(current)
              applyVisualDamageEvent(draft, remoteDamage)
              return draft
            })
            playSfx(remoteDamage.targetSide === 'player' ? 'bad' : 'select')
          }, damageDelay)
        }
        const remoteStatusEvents = (nextState.lastStatusEvents || []).filter(
          (event) => event.sourceId === action.attackerId,
        )
        let statusDelay = damageDelay + (remoteDamage ? RESOLUTION_TIMING.statusUpdate : 0)
        remoteStatusEvents.forEach((statusEvent, index) => {
          statusDelay += index === 0 ? 0 : RESOLUTION_TIMING.statusUpdate
          scheduleResolutionStep(() => {
            const statusTarget = findSideCard(
              nextState[statusEvent.targetSide],
              statusEvent.targetId,
            )
            setResolution({
              id: makeResolutionId('remote-status'),
              tone: 'opponent',
              title: 'Status Condition',
              detail: `${statusTarget?.name || 'Active card'} is now ${formatStatusSummary(statusEvent.statuses)}`,
              sourceId: statusEvent.sourceId,
            })
            setState((current) => {
              if (!current) return current
              const draft = cloneTcgBattleState(current)
              applyVisualStatusEvent(draft, statusEvent)
              return draft
            })
            playSfx('select')
          }, statusDelay)
        })
        const finalDelay = Math.max(
          damageDelay + (remoteDamage ? RESOLUTION_TIMING.damageHold : 0),
          statusDelay,
        )
        scheduleResolutionStep(
          () => commitActionResult(nextState),
          finalDelay + RESOLUTION_TIMING.finalSettle,
        )
        return
      }

      setState(visualState)
      const detail =
        action.kind === 'ability'
          ? action.abilityEffect === 'status' && ['Pollen Stench', 'Long Distance Hypnosis'].includes(action.abilityName || '')
            ? `${findSideCard(nextState.player, action.targetId || '')?.name || findSideCard(nextState.opponent, action.targetId || '')?.name || 'An Active Pokémon'} became ${action.abilityStatus} after the coin flip.`
            : action.abilityEffect === 'status' && action.abilityName === 'Fire Breath' && !nextState.lastCoinFlipEvents?.some((event) => event.sourceId === action.frontId && event.purpose === 'effect' && event.heads > 0)
            ? 'Fire Breath flipped tails; no Special Condition was applied.'
            : action.abilityEffect === 'status'
            ? action.abilityName === 'Head Trip' ? `Your Active Pokémon became ${action.abilityStatus}.` : `The opponent's Active Pokémon became ${action.abilityStatus}.`
            : action.abilityEffect === 'search'
            ? `${action.abilityName || 'A Pokémon Power'} searched the deck and shuffled it.`
            : action.abilityEffect === 'discardHandDraw'
            ? `${action.abilityName || 'A Pokémon Power'} discarded the hand and drew cards.`
            : action.abilityEffect === 'switch'
            ? `${action.abilityName || 'A Pokémon Power'} changed the Active Pokémon.`
            : action.abilityEffect === 'refillDraw'
            ? `${action.abilityName || 'A Pokémon Power'} drew cards until the hand reached 3.`
            : action.abilityEffect === 'discardDraw'
            ? `${action.abilityName || 'A Pokémon Power'} discarded a Pokémon and drew cards.`
            : action.abilityEffect === 'draw'
            ? `${action.abilityName || 'A Pokémon Power'} drew a card.`
            : action.abilityEffect === 'reveal'
            ? nextState.log[0] || `${action.abilityName || 'A Pokémon Power'} resolved a hand reveal.`
            : `${action.abilityName || 'A Pokémon Power'} restored HP to the opposing front line.`
          : action.kind === 'retreat'
          ? 'The opposing collector rotates their front line.'
          : action.kind === 'evolve'
            ? (() => {
                const before = findSideCard(previousState.opponent, action.frontId || '')
                const after = findSideCard(nextState.opponent, action.frontId || '')
                return before && after
                  ? `${before.name} becomes ${after.name}.`
                  : 'The opposing collector evolves a Pokémon.'
              })()
          : action.kind === 'promote'
            ? 'The opposing collector promotes a bench card.'
            : action.kind === 'bench'
              ? 'The opposing collector played a Basic Pokémon without ending their turn.'
            : nextState.opponent.energy > previousState.opponent.energy
              ? 'The opposing collector stores more Energy.'
              : 'The opposing collector ends their turn.'
      setResolution({
        id: makeResolutionId(`remote-${action.kind}`),
        tone: action.kind === 'promote' ? 'system' : 'opponent',
        title:
          action.kind === 'ability'
            ? 'Opponent Ability'
            : action.kind === 'retreat'
            ? 'Opponent Retreat'
            : action.kind === 'evolve'
              ? 'Opponent Evolution'
            : action.kind === 'promote'
              ? 'Opponent Promotion'
            : action.kind === 'bench'
              ? 'Opponent Basic Play'
              : 'Opponent Charge',
        detail,
      })
      playSfx('select')
      scheduleResolutionStep(
        () => commitActionResult(nextState),
        RESOLUTION_TIMING.actionIntro + RESOLUTION_TIMING.finalSettle,
      )
    },
    [
      clearResolutionTimers,
      commitActionResult,
      playSfx,
      scheduleResolutionStep,
    ],
  )

  useEffect(() => {
    if (
      state?.battleMode !== 'pvp' ||
      state.phase === 'finished' ||
      isActionBusy ||
      resolution ||
      showOpeningVs
    ) {
      return
    }

    let cancelled = false
    let inFlight = false
    const poll = async () => {
      if (inFlight) return
      inFlight = true
      try {
        const response = await refreshTcgBattleState()
        if (cancelled || !response.success) return
        const currentRevision = state.revision || 0
        const nextRevision = response.state.revision || 0
        if (nextRevision <= currentRevision) return
        const actionId = response.state.lastAction?.id
        if (actionId && lastAnimatedActionRef.current === actionId) return
        if (actionId) lastAnimatedActionRef.current = actionId

        if (response.state.lastAction?.side === 'opponent') {
          animateRemoteActionResult(state, response.state)
        } else {
          commitActionResult(response.state)
        }
      } finally {
        inFlight = false
      }
    }

    const interval = window.setInterval(() => void poll(), 1000)
    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [
    animateRemoteActionResult,
    commitActionResult,
    isActionBusy,
    resolution,
    showOpeningVs,
    state,
  ])

  const primeActionResolution = (
    previousState: TcgBattleState | null,
    meta: ActionMeta,
  ) => {
    if (
      !previousState ||
      meta.kind === 'claim' ||
      meta.kind === 'arrange' ||
      meta.kind === 'promote'
    )
      return
    if (meta.kind === 'attack') {
      const attacker = findSideCard(previousState.player, meta.attackerId)
      const attack = attacker ? getTcgBattleAvailableAttacks(previousState, 'player', attacker)[meta.attackIndex] : undefined
      setResolution({
        id: makeResolutionId('command-queued'),
        tone: 'player',
        title: 'Command Locked',
        detail: attack
          ? `${attacker?.name || 'Active card'} readies ${attack.name}`
          : 'Your front line advances.',
      })
      playSfx('select')
      return
    }
    if (meta.kind === 'retreat') {
      const retreating = findSideCard(previousState.player, meta.frontId)
      setResolution({
        id: makeResolutionId('retreat-queued'),
        tone: 'player',
        title: 'Retreat Ordered',
        detail: `${retreating?.name || 'Active card'} prepares to rotate out.`,
      })
      playSfx('select')
      return
    }
    if (meta.kind === 'evolve') {
      const target = findSideCard(previousState.player, meta.targetId)
      const evolution = previousState.player.hand.find(
        (card) => card.id === meta.evolutionCardId,
      )
      setResolution({
        id: makeResolutionId('evolve-queued'),
        tone: 'player',
        title: 'Evolution Ready',
        detail: `${target?.name || 'Your Pokémon'} prepares to evolve${evolution ? ` into ${evolution.name}` : ''}.`,
      })
      playSfx('select')
      return
    }
    if (meta.kind === 'ability') {
      setResolution({
        id: makeResolutionId('ability-queued'),
        tone: 'player',
        title: meta.abilityName,
        detail: meta.abilityEffect === 'status'
          ? meta.abilityName === 'Head Trip' ? `Your Active Pokémon will become ${meta.abilityStatus}.` : `The opponent's Active Pokémon will become ${meta.abilityStatus}.`
          : meta.abilityEffect === 'search'
          ? 'Choose up to two cards from your deck to take into your hand.'
          : meta.abilityEffect === 'discardHandDraw'
          ? 'Discard your hand and draw up to 3 cards.'
          : meta.abilityEffect === 'refillDraw'
          ? 'Draw Power activated; your hand refills to 3 cards.'
          : meta.abilityEffect === 'discardDraw'
          ? 'Discard Power activated; two cards are drawn.'
          : meta.abilityEffect === 'draw'
          ? 'Draw Power activated.'
          : meta.abilityEffect === 'reveal'
          ? 'Hand reveal Power activated.'
          : meta.abilityEffect === 'handReturn'
          ? `Flip to return ${findSideCard(previousState.player, meta.targetId || '')?.name || 'the selected Unown Pokémon'} to your hand on heads.`
          : meta.abilityEffect === 'switch'
            ? 'Switching Power activated.'
            : 'Healing Power activated.',
        sourceId: meta.sourceId,
      })
      playSfx('select')
      return
    }
    setResolution({
      id: makeResolutionId('charge-queued'),
      tone: 'system',
      title: 'Charge Ready',
      detail: 'Your front line channels more energy.',
    })
    playSfx('select')
  }

  const callAction = (
    action: () => Promise<TcgClientActionResult>,
    meta: ActionMeta,
  ) => {
    if (isBusy) return
    const previousState = state
    if (previousState?.lastAction?.abilityEffect === 'moonGuidancePending' && !(meta.kind === 'ability' && meta.abilityEffect === 'moonGuidanceResolve')) return
    if (previousState?.lastAction?.abilityEffect === 'regidragoVstarPending' && !(meta.kind === 'ability' && meta.abilityEffect === 'regidragoVstarResolve')) return
    setIsActionBusy(true)
    if (meta.kind === 'claim') setClaimError(null)
    primeActionResolution(previousState, meta)
    if (previousState && meta.kind === 'attack') {
      const optimisticState = cloneTcgBattleState(previousState)
      const attacker = findSideCard(previousState.player, meta.attackerId)
      const attack = attacker ? getTcgBattleAvailableAttacks(previousState, 'player', attacker)[meta.attackIndex] : undefined
      if (attack) {
        optimisticState.player.energy = Math.max(
          0,
          optimisticState.player.energy - getAttackCost(attack, previousState, attacker, 'player'),
        )
        setState(optimisticState)
      }
    }
    startTransition(async () => {
      try {
        const response = await action()
        if (!response.success) {
          setIsActionBusy(false)
          setResolution(null)
          if (previousState) setState(previousState)
          const errorMessage =
            response.error || 'Unable to complete the TCG battle action.'
          if (meta.kind === 'claim') setClaimError(errorMessage)
          toast.error(errorMessage)
          return
        }
        if (meta.kind === 'claim' && !response.completion) {
          setIsActionBusy(false)
          setResolution(null)
          if (previousState) setState(previousState)
          setClaimError(
            'The battle finished, but its rewards could not be loaded.',
          )
          return
        }
        if (response.state.lastAction?.privateRevealedCardName) {
          toast.info(`${response.state.lastAction.abilityName || 'Peek'} revealed ${response.state.lastAction.privateRevealedCardName}.`)
        }
        if (response.state.lastAction?.privateRevealedCardNames?.length) {
          toast.info(`${response.state.lastAction.abilityName || 'Peek'} revealed ${response.state.lastAction.privateRevealedCardNames.join(' and ')}.`)
        }
        setBenchMode(null)
        if (meta.kind === 'evolve') setShowEvolutionSheet(false)
        if (!previousState) {
          commitActionResult(response.state, response.completion)
          return
        }
        animateActionResult(
          previousState,
          response.state,
          meta,
          response.completion,
        )
      } catch (error) {
        setIsActionBusy(false)
        setResolution(null)
        if (previousState) setState(previousState)
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Unable to complete the TCG battle action.'
        if (meta.kind === 'claim') setClaimError(errorMessage)
        toast.error(errorMessage)
      }
    })
  }

  const requestAttack = (attackIndex: number) => {
    if (!state || !selectedAttacker) return
    const attack = getTcgBattleAvailableAttacks(state, 'player', selectedAttacker)[attackIndex]
    if (!attack) return
    const effect = getTcgBattleAttackEffect(attack)
    const validTargets = getValidTcgBattleTargets(
      state,
      'player',
      selectedAttacker,
      attack,
    )
    const currentTarget = validTargets.find(
      (card) => card.instanceId === targetId,
    )
    if (
      effect?.choiceRequirement ||
      effect?.targetScope === 'bench' ||
      effect?.targetScope === 'any' ||
      !currentTarget
    ) {
      setChoiceAttackIndex(attackIndex)
      return
    }
    callAction(
      () =>
        tcgBattleAttack(
          selectedAttacker.instanceId,
          attackIndex,
          currentTarget.instanceId,
          undefined,
          state.revision,
        ),
      {
        kind: 'attack',
        attackerId: selectedAttacker.instanceId,
        targetId: currentTarget.instanceId,
        attackIndex,
      },
    )
  }

  const submitAttackChoice = (
    attackIndex: number,
    selectedTargetId: string,
    choice?: TcgBattleAttackChoice,
  ) => {
    if (!selectedAttacker) return
    setChoiceAttackIndex(null)
    callAction(
      () =>
        tcgBattleAttack(
          selectedAttacker.instanceId,
          attackIndex,
          selectedTargetId,
          choice,
          state?.revision,
        ),
      {
        kind: 'attack',
        attackerId: selectedAttacker.instanceId,
        targetId: selectedTargetId,
        attackIndex,
      },
    )
  }

  const handleSetupSelect = (cardId: string) => {
    if (isBusy) return
    const card = state?.player.hand.find((entry) => entry.instanceId === cardId)
    if (!card || !card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && !canTcgBattleUseElectricStart(card, state?.playerGoesSecond)) return
    if (frontIds.includes(cardId)) {
      setFrontIds((current) => current.filter((id) => id !== cardId))
      playSfx('select')
      return
    }
    if (frontIds.length >= 3) return
    setFrontIds((current) => [...current, cardId])
    playSfx('select')
  }

  const handleCardTap = (card: TcgBattleCardState, zone: BoardZone) => {
    if (state?.phase !== 'battle' || isBusy) return
    if (zone === 'opponent-front') {
      setTargetId(card.instanceId)
      return
    }
    setAttackerId(card.instanceId)
  }

  const returnToExplore = async () => {
    try {
      await refreshUser(false, result?.invalidates)
    } catch (refreshError) {
      console.error('Failed to refresh TCG battle progress', refreshError)
    }
    window.dispatchEvent(new Event(ACTIVITY_SETTLED_EVENT))
    router.push('/game/explore')
  }

  const handleSurrender = () => {
    if (state?.battleMode !== 'pvp' || isBusy) return
    setShowSurrenderConfirm(false)
    setIsActionBusy(true)
    startTransition(async () => {
      const response = await surrenderTcgPvp(state.revision)
      if (!response.success) {
        setIsActionBusy(false)
        toast.error(response.error)
        return
      }
      commitActionResult(response.state, response.completion)
    })
  }

  const surrenderDialog = state?.battleMode === 'pvp' && (
    <AlertDialog
      open={showSurrenderConfirm}
      onOpenChange={setShowSurrenderConfirm}
    >
      <AlertDialogContent className="game-paper-background border-game-border bg-game-surface text-game-ink">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">
            Surrender this match?
          </AlertDialogTitle>
          <AlertDialogDescription>
            The opposing collector will receive the win. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep playing</AlertDialogCancel>
          <AlertDialogAction
            className="bg-game-charcoal text-game-cream hover:bg-game-charcoal-strong"
            onClick={handleSurrender}
          >
            Surrender
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  const resultOverlay = useMemo(() => {
    if (!result || completionState?.phase !== 'finished') return null

    return {
      ...result,
      success: result.success && completionState.winner === 'player',
      message: getWinnerMessage(
        completionState.winner,
        completionState.noContest,
      ),
    }
  }, [completionState, result])

  if (!state) {
    return (
      <div className="game-activity-chrome relative grid h-[100dvh] place-items-center overflow-hidden bg-game-canvas p-6 text-game-ink">
        <ArenaBackdrop />
        <div className="relative z-10 flex items-center gap-3 rounded-md border border-game-border bg-game-surface-raised px-4 py-3 shadow-md">
          <span className="h-2 w-2 rounded-full bg-game-ochre" aria-hidden="true" />
          <div className="text-xs font-black uppercase text-game-ink">
            Loading TCG battle
          </div>
        </div>
      </div>
    )
  }

  if (
    state.battleMode === 'pvp' &&
    state.phase === 'arranging' &&
    state.ready?.player
  ) {
    return (
      <div className="game-activity-chrome relative grid h-[100dvh] place-items-center overflow-hidden bg-game-canvas p-6 text-game-ink">
        <ArenaBackdrop />
        <div className="relative z-10 w-full max-w-md rounded-md border border-game-ochre/30 bg-game-surface-raised p-6 text-center shadow-md">
          <span aria-hidden="true" className="mx-auto block size-9 animate-spin rounded-full border-2 border-game-ochre border-r-transparent" />
          <SectionDivider className="mx-auto mb-2 mt-5 max-w-xs">
            Your board is ready
          </SectionDivider>
          <h1 className="font-display text-3xl font-semibold text-game-ink">
            Waiting for your opponent
          </h1>
          <p className="mt-3 text-sm text-game-muted">
            Their cards stay hidden until both collectors are ready.
          </p>
          {deadlineSeconds !== null && (
            <div className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-game-border bg-game-surface-raised/90 px-4 font-mono text-lg font-bold text-game-ink">
              {formatMatchClock(deadlineSeconds)}
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            className="game-focus-ring mx-auto mt-5 min-h-11 text-game-muted hover:bg-game-surface hover:text-game-ink"
            onClick={() => setShowSurrenderConfirm(true)}
          >
            <span aria-hidden="true">×</span>
            Leave match
          </Button>
        </div>
        {surrenderDialog}
      </div>
    )
  }

  if (state.phase === 'arranging') {
    const front = orderCardsByIds(state.player.hand, frontIds)
    const benchIds: string[] = []
    const readyToStart = frontIds.length >= 1 && front.length === frontIds.length && front.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) && front.every((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') || canTcgBattleUseElectricStart(card, state.playerGoesSecond))

    return (
      <div className="game-activity-chrome relative h-[100dvh] overflow-hidden bg-game-canvas text-game-ink">
        <ArenaBackdrop />
        <main className="relative z-10 flex h-full flex-col">
          <header className="shrink-0 px-4 pt-[calc(env(safe-area-inset-top)+1.8rem)] text-center sm:pt-[calc(env(safe-area-inset-top)+2.6rem)]">
            {state.battleMode === 'pvp' && deadlineSeconds !== null && (
              <div className="mx-auto mb-3 flex w-fit min-h-11 items-center gap-2 rounded-md border border-game-border bg-game-surface-raised/95 px-4 font-mono text-sm font-bold text-game-ink">
                {formatMatchClock(deadlineSeconds)}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="ml-1 h-9 w-9 text-game-muted hover:bg-game-surface hover:text-game-ink"
                  aria-label="Surrender match"
                  onClick={() => setShowSurrenderConfirm(true)}
                >
                  <span aria-hidden="true">×</span>
                </Button>
              </div>
            )}
            <SectionDivider className="mx-auto mb-2 max-w-xs sm:max-w-sm">
              Choose
            </SectionDivider>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-game-ink sm:text-5xl">
              Opening Pokémon
            </h1>
            <p className="mx-auto mt-2 max-w-md text-xs text-game-muted">Choose at least 1 Basic Pokémon for the front row. Fill all 3 front slots before playing any Pokémon onto the Bench.</p>
          </header>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-4 pb-5 pt-4 sm:gap-8">
            <div className="grid grid-cols-3 items-center justify-center gap-3 sm:gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <SetupRevealSlot
                  key={index}
                  card={front[index]}
                  index={index}
                />
              ))}
            </div>

            <AnimatePresence>
              {readyToStart && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <Button
                    className="h-12 rounded-md bg-game-charcoal px-8 text-xs font-black uppercase tracking-[0.18em] text-game-cream shadow-md hover:bg-game-charcoal-strong"
                    disabled={isBusy}
                    onClick={() =>
                      callAction(
                        () =>
                          arrangeTcgBattle(frontIds, benchIds, state.revision),
                        {
                          kind: 'arrange',
                        },
                      )
                    }
                  >
                    Start Battle
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <footer className="shrink-0 bg-gradient-to-t from-game-canvas via-game-canvas/90 to-transparent pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-5">
            <div className="mx-auto flex w-full max-w-5xl snap-x snap-mandatory justify-start gap-3 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [touch-action:pan-x] sm:gap-4 sm:px-10 [&::-webkit-scrollbar]:hidden">
              {state.player.hand.map((card) => {
                const slotIndex = frontIds.indexOf(card.instanceId)
                const selected = slotIndex >= 0
                const isBasic = card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') || canTcgBattleUseElectricStart(card, state.playerGoesSecond)
                return (
                  <SetupHandCard
                    key={card.instanceId}
                    card={card}
                    selected={selected}
                    slotIndex={selected ? slotIndex : undefined}
                    disabled={isBusy}
                    inactive={!selected && (!isBasic || frontIds.length >= 3)}
                  onClick={() => {
                    triggerHaptic('selection')
                    handleSetupSelect(card.instanceId)
                  }}
                  />
                )
              })}
            </div>
          </footer>
        </main>
        {surrenderDialog}
      </div>
    )
  }

  return (
    <div className="game-activity-chrome relative h-[100dvh] overflow-hidden bg-game-canvas text-game-ink">
      <ArenaBackdrop />
      <main className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-2 pb-3 pt-[calc(env(safe-area-inset-top)+1.25rem)] sm:px-3 sm:pt-[calc(env(safe-area-inset-top)+1.65rem)]">
        <BattleTopBar
          state={state}
          attackCap={attackCap}
          attackCapPulse={attackCapPulse}
          deadlineSeconds={deadlineSeconds}
          onSurrender={() => setShowSurrenderConfirm(true)}
        />
        <AnimatePresence>
          {turnDrawNotice && state.activeSide === 'player' && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} role="status" className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+4.25rem)] z-30 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-game-ochre/60 bg-game-surface-raised px-3 py-2 shadow-xl sm:px-4">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-game-moss text-xs font-black text-white">↓</span>
              <span className="text-[11px] font-bold text-game-ink">Drew <strong>{turnDrawNotice}</strong></span>
            </motion.div>
          )}
        </AnimatePresence>

        {state.battleMode === 'pvp' &&
          state.phase !== 'finished' &&
          (state.activeSide === 'opponent' ||
            state.pendingPromotion === 'opponent') && (
            <div className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top)+4.8rem)] z-30 -translate-x-1/2 rounded-md border border-game-ochre/35 bg-game-surface-raised px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-game-ink shadow-md">
              {state.pendingPromotion === 'opponent'
                ? 'Opponent is choosing a promotion'
                : 'Opponent’s turn'}
            </div>
          )}

        <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 pb-16 pt-2 sm:gap-4 sm:pb-20">
          <TeamEnergyReadout
            energy={state.opponent.energy}
            cap={formatConfig?.energyCap || 0}
            pokemonCount={getLivingCards(state.opponent).length}
            position="opponent"
          />
          {(state.battleMode === 'pvp' || hasTcgBattleOmanyteClairvoyance(state)) && state.opponent.hand.length > 0 && (
            <section aria-label="Opponent's revealed hand" className="w-full rounded-md border border-game-ochre/30 bg-game-surface-raised/90 px-2 py-1.5">
              <p className="mb-1 text-center text-[10px] font-black uppercase tracking-wide text-game-muted">Opponent's hand · revealed by Clairvoyance</p>
              <div className="flex justify-center gap-1.5 overflow-x-auto">
                {state.opponent.hand.map((card) => (
                  <div key={card.instanceId} className="w-12 shrink-0 text-center">
                    <Image src={card.image} alt={card.name} width={48} height={67} className="mx-auto h-[67px] w-12 rounded-sm object-cover" unoptimized />
                    <span className="block truncate text-[9px] font-semibold text-game-ink">{card.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          <BattleCardRow
            cards={state.opponent.front}
            side="opponent"
            zone="opponent-front"
            turnNumber={state.turnNumber}
            selectedId={targetId}
            resolution={resolution}
            damageEvent={resolution?.damageCue || state.lastDamageEvent}
            onCardTap={handleCardTap}
            onPreviewStart={setPreviewCard}
            onPreviewEnd={() => setPreviewCard(null)}
          />

          <div className="h-3 sm:h-5" />

          <BattleCardRow
            cards={state.player.front}
            side="player"
            zone="player-front"
            turnNumber={state.turnNumber}
            selectedId={attackerId}
            resolution={resolution}
            damageEvent={resolution?.damageCue || state.lastDamageEvent}
            onCardTap={handleCardTap}
            onPreviewStart={setPreviewCard}
            onPreviewEnd={() => setPreviewCard(null)}
          />
          <TeamEnergyReadout
            energy={state.player.energy}
            cap={formatConfig?.energyCap || 0}
            pokemonCount={getLivingCards(state.player).length}
            position="player"
          />

          <InlineAttackButtons
            state={state}
            selectedAttacker={selectedAttacker}
            selectedTarget={selectedTarget}
            attackCap={attackCap}
            isPending={isBusy}
            resolution={resolution}
            onAttack={requestAttack}
          />
          {state.extraAttackPending?.side === 'player' && (
            <p role="status" className="rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 py-2 text-center text-[10px] font-black uppercase tracking-wide text-game-ink">
              {state.player.front.find((card) => card.instanceId === state.extraAttackPending?.attackerId)?.name || 'This Pokémon'} may attack once more this turn.
            </p>
          )}
        </section>

        <BattleCommandControls
          state={state}
          selectedAttacker={selectedAttacker}
          isPending={isBusy}
          claimError={claimError}
          resultShown={Boolean(resultOverlay)}
          resolution={resolution}
          evolutionOptions={evolutionOptions}
          selectedEvolutionCardId={selectedEvolutionCardId}
          onCharge={() =>
            callAction(() => tcgBattleCharge(state.revision), {
              kind: 'charge',
            })
          }
          onClaim={() =>
            callAction(() => claimTcgBattleResult(), { kind: 'claim' })
          }
          onPromote={() => setBenchMode('promote')}
          onRetreat={() => setBenchMode('retreat')}
          onOpenEvolution={(cardId) => { setSelectedEvolutionCardId(cardId); setShowEvolutionSheet(true) }}
          onPlayBasicToBench={(cardId) => callAction(() => tcgBattlePlayBasicToBench(cardId, state.revision), { kind: 'bench' })}
          onUseHealAbility={(sourceId, abilityIndex, targetCardId, abilityName, discardPokemonIds) =>
            callAction(
              () => tcgBattleHealActiveAbility(sourceId, abilityIndex, targetCardId, state.revision, discardPokemonIds),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'heal' },
            )
          }
          onUseDrawAbility={(sourceId, abilityIndex, abilityName, discardCardIds, refillDraw, discardHandDraw, searchIndices, energySearch, benchSearch, handDeckSwapCardId, energyAttach, energyHandDraw, discardFightingAttach, revealHand, discardBenchSearch, shuffleOpponentDeckForCunning, mankeyPeekChoice) =>
            callAction(
              () => tcgBattleUseDrawAbility(sourceId, abilityIndex, state.revision, discardCardIds, searchIndices, energySearch, benchSearch, handDeckSwapCardId, energyHandDraw, discardFightingAttach, revealHand, discardBenchSearch, shuffleOpponentDeckForCunning, mankeyPeekChoice),
              { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: mankeyPeekChoice === 'claydolCosmicPower' ? 'refillDraw' : mankeyPeekChoice === 'zacianIntrepidSword' || mankeyPeekChoice === 'zacianPsychicEnergy' || mankeyPeekChoice === 'latiasPsychicAttach' || mankeyPeekChoice === 'magnezoneMetalAcceleration' ? 'energyAttach' : mankeyPeekChoice === 'zamazentaShieldStar' ? 'teamDamageReduction' : mankeyPeekChoice === 'regidragoVstarResolve' ? 'regidragoVstarResolve' : mankeyPeekChoice === 'rotomVstar' || discardHandDraw ? 'discardHandDraw' : mankeyPeekChoice === 'chandelureDeckDiscard' || mankeyPeekChoice === 'sableyeTopDeckDiscard' ? 'deckDiscard' : mankeyPeekChoice === 'aipomDeckBottom' ? 'deckBottom' : mankeyPeekChoice === 'slakingLazyBlow' ? 'damageBoost' : mankeyPeekChoice === 'blisseyKindEgg' ? 'deckSwap' : discardBenchSearch ? 'benchSearch' : revealHand ? 'reveal' : handDeckSwapCardId ? 'deckSwap' : benchSearch ? 'benchSearch' : energyAttach || energyHandDraw || discardFightingAttach ? 'energyAttach' : energySearch ? 'energySearch' : searchIndices ? 'search' : discardHandDraw ? 'discardHandDraw' : refillDraw ? 'refillDraw' : discardCardIds?.length ? 'discardDraw' : 'draw' },
            )
          }
          onUseKogaKakunaEmerge={(sourceId, abilityIndex, abilityName) => callAction(
            () => tcgBattleUseKogaKakunaEmerge(sourceId, abilityIndex, state.revision),
            { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'evolution' },
          )}
          onUseClefableMoonGuidance={(sourceId, abilityIndex, abilityName) => callAction(
            () => tcgBattleUseClefableMoonGuidance(sourceId, abilityIndex, state.revision),
            { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'evolution' },
          )}
          onResolveClefableMoonGuidance={(targetId, deckIndex, abilityName) => callAction(
            () => tcgBattleResolveClefableMoonGuidance(targetId, deckIndex, state.revision),
            { kind: 'ability', sourceId: state.lastAction?.frontId || '', targetId, abilityIndex: -1, abilityName, abilityEffect: 'moonGuidanceResolve' },
          )}
          onUseInkayUpsideDownEvolution={(sourceId, abilityIndex, deckIndex, abilityName) => callAction(
            () => tcgBattleUseInkayUpsideDownEvolution(sourceId, abilityIndex, deckIndex, state.revision),
            { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'evolution' },
          )}
          onUseKarrablastShellOn={(sourceId, abilityIndex, deckIndex, shelmetId, abilityName) => callAction(
            () => tcgBattleUseKarrablastShellOn(sourceId, abilityIndex, deckIndex, shelmetId, state.revision),
            { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'evolution' },
          )}
          onUseAegislashStanceChange={(sourceId, abilityIndex, replacementInstanceId, abilityName) => callAction(
            () => tcgBattleUseAegislashStanceChange(sourceId, abilityIndex, replacementInstanceId, state.revision),
            { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'pokemonSwap' },
          )}
          onUsePokemonSwapPower={(sourceId, abilityIndex, replacementCardId, abilityName) =>
            callAction(
              () => tcgBattleUsePokemonSwapPower(sourceId, abilityIndex, replacementCardId, state.revision),
              { kind: 'ability', sourceId, targetId: replacementCardId, abilityIndex, abilityName, abilityEffect: 'pokemonSwap' },
            )
          }
          onUseBenchShuffleAbility={(sourceId, abilityIndex, targetCardId, abilityName) =>
            callAction(
              () => tcgBattleUseBenchShuffleAbility(sourceId, abilityIndex, targetCardId, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: state.player.front.concat(state.player.back).some((card) => card.instanceId === sourceId && (card.name.toLowerCase() === 'archeops' || card.name.toLowerCase() === 'azumarill' && card.abilities?.[abilityIndex]?.text.toLowerCase().includes('return azumarill'))) ? 'handReturn' : 'deckShuffle' },
            )
          }
          onUseDiscardRecoveryAbility={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseDiscardRecoveryAbility(sourceId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'deckBottom' },
            )
          }
          onUseDamageCounterAbility={(sourceId, abilityIndex, targetCardId, abilityName, discardCardIds, counterTargetIds) =>
            callAction(
              () => tcgBattleUseDamageCounterAbility(sourceId, abilityIndex, targetCardId, state.revision, discardCardIds, counterTargetIds),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'counterDamage' },
            )
          }
          onUseVenomothShift={(sourceId, abilityIndex, targetId, targetType, abilityName) =>
            callAction(
              () => tcgBattleUseVenomothShift(sourceId, abilityIndex, targetId, targetType, state.revision),
              { kind: 'ability', sourceId, targetId, abilityIndex, abilityName, abilityEffect: 'typeChange' },
            )
          }
          onUseDamageCounterMoveAbility={(sourceId, abilityIndex, fromCardId, toCardId, counterCount, abilityName) =>
            callAction(
              () => tcgBattleUseDamageCounterMoveAbility(sourceId, abilityIndex, fromCardId, toCardId, counterCount, state.revision),
              { kind: 'ability', sourceId, targetId: toCardId, abilityIndex, abilityName, abilityEffect: 'counterDamage' },
            )
          }
          onUsePsychicDiscardEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUsePsychicDiscardEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseIonoEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseIonoEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseFlareonEnergyAbility={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseFlareonEnergyAbility(sourceId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseFrosmothEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseFrosmothEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseBaxcaliburEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseBaxcaliburEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseEmboarEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseEmboarEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseGardevoirGxEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseGardevoirGxEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseVolcanionExDamageBoost={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseVolcanionExDamageBoost(sourceId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'damageBoost' },
            )
          }
          onUseLudicoloCheerfulVoice={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseLudicoloCheerfulVoice(sourceId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'damageBoost' },
            )
          }
          onUsePalkiaVstarEnergyAbility={(sourceId, targetCardId, energyCount, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUsePalkiaVstarEnergyAbility(sourceId, targetCardId, energyCount, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseElectrodeGxEnergyAbility={(sourceId, targetCardId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseElectrodeGxEnergyAbility(sourceId, targetCardId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'energyAttach' },
            )
          }
          onUseDiscardRevivalEnergyAbility={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseDiscardRevivalEnergyAbility(sourceId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: sourceId, abilityIndex, abilityName, abilityEffect: state.player.discard.find((card) => card.instanceId === sourceId)?.abilities?.[abilityIndex]?.text.toLowerCase().includes('attach a darkness energy') ? 'energyAttach' : 'counterDamage' },
            )
          }
          onUseActiveStatusAbility={(sourceId, abilityIndex, abilityName, status, transferSourceId) =>
            callAction(
              () => tcgBattleUseActiveStatusAbility(sourceId, abilityIndex, status, state.revision, transferSourceId),
              { kind: 'ability', sourceId, ...(transferSourceId ? { targetId: transferSourceId } : {}), abilityIndex, abilityName, abilityEffect: 'status', abilityStatus: status },
            )
          }
          onUseBenchEntryAbility={(sourceId, abilityIndex, abilityName, effect, targetId) =>
            callAction(
              () => tcgBattleUseBenchEntryAbility(sourceId, abilityIndex, state.revision, targetId),
              { kind: 'ability', sourceId, ...(targetId ? { targetId: Array.isArray(targetId) ? targetId[0] : targetId } : {}), abilityIndex, abilityName, abilityEffect: effect === 'rayquazaStormyWinds' ? 'energyAttach' : effect === 'snorlaxLeftovers' || effect === 'darkraiVstarItems' || effect === 'dragonitePullUp' || effect === 'captivatingWink' || effect === 'darkInvitation' || effect === 'mandibuzzHandBench' || effect === 'gloomHandBench' ? 'benchSearch' : effect === 'damage' || effect === 'spreadDamage' || effect === 'coinDamage' || effect === 'coinSpreadDamage' ? 'directDamage' : effect === 'curseBreath' ? 'counterDamage' : effect === 'statusRecovery' || effect === 'asleep' || effect === 'coinParalyze' || effect === 'coinBurn' ? 'status' : effect === 'opponentSwitch' || effect === 'magneticReversal' ? 'switch' : effect === 'powerLock' ? 'abilitySuppression' : effect === 'handShuffleDraw' ? 'draw' : effect },
            )
          }
          onUseUnownVanish={(sourceId, targetId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseUnownVanish(sourceId, targetId, state.revision),
              { kind: 'ability', sourceId, targetId, abilityIndex, abilityName, abilityEffect: 'handReturn' },
            )
          }
          onUseUnownUndo={(sourceId, targetId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseUnownUndo(sourceId, targetId, state.revision),
              { kind: 'ability', sourceId, targetId, abilityIndex, abilityName, abilityEffect: 'handReturn' },
            )
          }
          onUseTentacoolCowardice={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseTentacoolCowardice(sourceId, abilityIndex, state.revision),
              { kind: 'ability', sourceId, targetId: sourceId, abilityIndex, abilityName, abilityEffect: 'handReturn' },
            )
          }
          onUseIgglybuffGaze={(sourceId, targetId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseIgglybuffGaze(sourceId, targetId, state.revision),
              { kind: 'ability', sourceId, targetId, abilityIndex, abilityName, abilityEffect: 'abilitySuppression' },
            )
          }
          onUseElekidPlayfulPunch={(sourceId, abilityIndex, abilityName) =>
            callAction(
              () => tcgBattleUseElekidPlayfulPunch(sourceId, state.revision),
              { kind: 'ability', sourceId, abilityIndex, abilityName, abilityEffect: 'directDamage' },
            )
          }
          onUseBenchSwitchAbility={(sourceId, abilityIndex, targetCardId, abilityName, discardIds) =>
            callAction(
              () => tcgBattleUseBenchSwitchAbility(sourceId, abilityIndex, targetCardId, state.revision, discardIds),
              { kind: 'ability', sourceId, targetId: targetCardId, abilityIndex, abilityName, abilityEffect: 'switch' },
            )
          }
        />
      </main>

      {benchMode && (
        <BenchSheet
          mode={benchMode}
          state={state}
          attacker={selectedAttacker}
          isPending={isBusy}
          onClose={() => setBenchMode(null)}
          onPromote={(cardId) =>
            callAction(() => tcgBattlePromote(cardId, state.revision), {
              kind: 'promote',
              cardId,
            })
          }
          onRetreat={(benchId) => {
            if (!selectedAttacker) return
            callAction(
              () =>
                tcgBattleRetreat(
                  selectedAttacker.instanceId,
                  benchId,
                  state.revision,
                ),
              {
                kind: 'retreat',
                frontId: selectedAttacker.instanceId,
                backId: benchId,
              },
            )
          }}
        />
      )}

      {showEvolutionSheet && (
        <EvolutionSheet
          options={selectedEvolutionCardId ? evolutionOptions.filter((option) => option.card.id === selectedEvolutionCardId) : evolutionOptions}
          discardPokemon={state.player.discard}
          playerSide={state.player}
          opposingSide={state.opponent}
          opposingDiscardPokemon={state.opponent.discard}
          opposingEnergy={state.opponent.energy}
          opposingPokemon={[...state.opponent.front, ...state.opponent.back].filter((card) => card.currentHp > 0)}
          opposingBenchPokemon={state.opponent.back.filter((card) => card.currentHp > 0)}
          isPending={isBusy}
          onClose={() => { setShowEvolutionSheet(false); setSelectedEvolutionCardId(null) }}
          onEvolve={(targetId, evolutionCardId, effectTargetId) =>
            callAction(
              () =>
                tcgBattleEvolve(targetId, evolutionCardId, state.revision, effectTargetId),
              { kind: 'evolve', targetId, evolutionCardId, effectTargetId },
            )
          }
        />
      )}

      {choiceAttackIndex !== null && selectedAttacker && (
        <AttackChoiceDrawer
          open
          state={state}
          attacker={selectedAttacker}
          attackIndex={choiceAttackIndex}
          defaultTargetId={targetId}
          onClose={() => setChoiceAttackIndex(null)}
          onConfirm={submitAttackChoice}
        />
      )}

      <AnimatePresence>
        {showOpeningVs && state.playerTrainer && state.enemyTrainer && (
          <VSAnimation
            appearance="paper"
            player={state.playerTrainer}
            enemy={state.enemyTrainer}
            onComplete={closeOpeningVs}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewCard && <CardPreviewOverlay card={previewCard} />}
      </AnimatePresence>
      <AnimatePresence>
        {resolution?.coinCue && <CoinFlipOverlay cue={resolution.coinCue} />}
      </AnimatePresence>
      <AnimatePresence>
        {energyNotice?.kind === 'evolution' && (
          <EvolutionEnergyBurst key={energyNotice.id} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {energyNotice?.kind === 'energy-card' && (
          <EnergyCardActivationBurst key={energyNotice.id} state={state} />
        )}
      </AnimatePresence>

      {resultOverlay && (
        <RewardResultOverlay
          result={resultOverlay}
          background={encounter.background}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={
            completionState ? getWinnerLabel(completionState.winner) : undefined
          }
          message={
            completionState
              ? getWinnerMessage(
                  completionState.winner,
                  completionState.noContest,
                )
              : undefined
          }
          onClose={returnToExplore}
        />
      )}
      {surrenderDialog}
      <style jsx global>{`
        @keyframes tcg-hit {
          0% {
            opacity: 0;
            transform: translate(-50%, -35%) scale(0.82);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -72%) scale(1.16);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -118%) scale(0.92);
          }
        }

        @keyframes tcg-selected {
          0%,
          100% {
            box-shadow:
              0 0 0 2px rgba(34, 211, 238, 0.85),
              0 14px 36px rgba(0, 0, 0, 0.55);
          }
          50% {
            box-shadow:
              0 0 0 3px rgba(251, 191, 36, 0.9),
              0 18px 44px rgba(0, 0, 0, 0.68);
          }
        }

        @keyframes tcg-foil {
          from {
            background-position: 220% 0;
          }
          to {
            background-position: -40% 100%;
          }
        }

        @keyframes tcg-player-lunge {
          0% {
            transform: translateY(0) scale(1);
          }
          35% {
            transform: translateY(-18px) scale(1.04);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tcg-opponent-lunge {
          0% {
            transform: translateY(0) scale(1);
          }
          35% {
            transform: translateY(18px) scale(1.04);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tcg-card-hit {
          0%,
          100% {
            transform: translateX(0) rotate(0);
          }
          18% {
            transform: translateX(-7px) rotate(-1.5deg);
          }
          38% {
            transform: translateX(7px) rotate(1.5deg);
          }
          58% {
            transform: translateX(-4px) rotate(-0.8deg);
          }
          78% {
            transform: translateX(3px) rotate(0.7deg);
          }
        }

        @keyframes tcg-energy-pulse {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(45, 212, 191, 0));
          }
          45% {
            transform: scale(1.22);
            filter: drop-shadow(0 0 10px rgba(45, 212, 191, 0.85));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0 rgba(45, 212, 191, 0));
          }
        }

        @keyframes tcg-energy-sweep {
          0% {
            transform: translateX(-130%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateX(130%);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tcg-motion {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

function ArenaBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-game-canvas" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(40,127,122,0.09),transparent_58%)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-game-border/45" />
    </div>
  )
}

function ResolutionToast({ resolution }: { resolution: BattleResolution }) {
  const toneClasses =
    resolution.tone === 'player'
      ? 'border-game-charcoal/35 bg-game-surface-raised text-game-ink'
      : resolution.tone === 'opponent'
        ? 'border-game-clay/40 bg-game-surface-raised text-game-ink'
        : 'border-game-ochre/45 bg-game-surface-raised text-game-ink'
  const actorLabel =
    resolution.tone === 'player'
      ? 'You'
      : resolution.tone === 'opponent'
        ? 'Foe'
        : 'Battle'

  return (
    <motion.div
      key={resolution.id}
      className="pointer-events-none fixed inset-x-3 top-[calc(env(safe-area-inset-top)+4.5rem)] z-40 flex justify-center sm:top-[calc(env(safe-area-inset-top)+5.5rem)]"
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'relative min-w-64 max-w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-md border px-4 py-3 shadow-md',
          toneClasses,
        )}
      >
        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-md border border-game-border bg-game-canvas px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-game-muted">
            {actorLabel}
          </span>
          <div className="min-w-0">
            <div className="truncate text-xs font-black uppercase">
              {resolution.title}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-game-muted">
              {resolution.detail}
            </div>
          </div>
          {resolution.damageCue && (
            <div className="ml-auto flex shrink-0 items-center gap-1 rounded-md border border-game-border bg-game-canvas px-2 py-1 text-xs font-bold text-game-ink">
              {resolution.damageCue.damage}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function formatEnergyCap(value: number): string {
  return value === Number.POSITIVE_INFINITY ? '4+' : `${value}`
}

function formatMatchClock(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}

function BattleTopBar({
  state,
  attackCap,
  attackCapPulse,
  deadlineSeconds,
  onSurrender,
}: {
  state: TcgBattleState
  attackCap: number
  attackCapPulse: boolean
  deadlineSeconds: number | null
  onSurrender: () => void
}) {
  const freeTypes =
    state.turnNumber >= 15
      ? [state.player.selectedEnergy, state.opponent.selectedEnergy].filter(
          Boolean,
        )
      : []
  const sideLabel =
    state.phase === 'finished'
      ? state.winner === 'player'
        ? 'YOU'
        : state.winner === 'tie'
          ? 'DRAW'
          : state.battleMode === 'pvp'
            ? 'OPPONENT'
            : 'CPU'
      : state.pendingPromotion === 'player' || state.activeSide === 'player'
        ? 'YOU'
        : state.battleMode === 'pvp'
          ? 'OPPONENT'
          : 'CPU'

  return (
    <div className="mt-1 shrink-0 px-1 py-1 sm:mt-2">
      <div className="grid grid-cols-3 items-center gap-3">
        <span className="inline-flex items-center gap-1 text-xs font-black text-game-ink">
          <EnergyIcon
            type="Colorless"
            className={cn(
              'h-5 w-5',
              attackCapPulse && 'animate-[tcg-energy-pulse_950ms_ease-out]',
            )}
          />
          {formatEnergyCap(attackCap)}
        </span>
        <div className="text-center leading-tight">
          <div className="text-[11px] font-light tracking-[0.08em] text-game-muted">
            Round {state.turnNumber}
            {state.battleMode === 'pvp' && deadlineSeconds !== null
              ? ` · ${formatMatchClock(deadlineSeconds)}`
              : ''}
          </div>
          <div className="text-[12px] font-black tracking-[0.14em] text-game-ink">
            {sideLabel}
          </div>
        </div>
        <div className="flex items-center justify-end gap-1.5">
          {freeTypes.length > 0 &&
            freeTypes.map((type, index) => (
              <span
                key={`${type}:${index}`}
                className="inline-flex items-center"
              >
                <EnergyIcon type={type || 'Colorless'} className="h-5 w-5" />
              </span>
            ))}
          {state.battleMode === 'pvp' && state.phase !== 'finished' && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10 text-game-muted hover:bg-game-surface hover:text-game-ink"
              aria-label="Surrender match"
              onClick={onSurrender}
            >
              <span aria-hidden="true">×</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function EvolutionEnergyBurst() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 1.02 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top)+3.75rem)] z-[70] mx-auto flex w-[min(92vw,780px)] items-center justify-center"
    >
      <div className="relative overflow-hidden rounded-md border border-game-ochre/40 bg-game-surface-raised/95 px-4 py-3 text-center backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 animate-[tcg-energy-sweep_900ms_ease-out] bg-[linear-gradient(to_right,transparent,rgba(40,127,122,0.18),transparent)]" />
        <p className="relative text-xs font-black uppercase tracking-[0.18em] text-game-ink sm:text-sm">
          A burst of Evolution Energy sweeps across the battlefield
        </p>
      </div>
    </motion.div>
  )
}

function EnergyCardActivationBurst({ state }: { state: TcgBattleState }) {
  const activeTypes = [
    state.player.selectedEnergy,
    state.opponent.selectedEnergy,
  ].filter(Boolean)
  const detail =
    activeTypes.length > 0
      ? `Energy Card Activated: ${activeTypes.join(' + ')} now reduces matching costs by 1.`
      : 'Energy Card Activated: no selected types were found.'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 1.02 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top)+6.75rem)] z-[70] mx-auto flex w-[min(92vw,860px)] items-center justify-center"
    >
      <div className="relative overflow-hidden rounded-md border border-game-moss/40 bg-game-surface-raised/95 px-4 py-3 text-center backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 animate-[tcg-energy-sweep_900ms_ease-out] bg-[linear-gradient(to_right,transparent,rgba(184,200,148,0.16),transparent)]" />
        <p className="relative text-[11px] font-black uppercase tracking-[0.12em] text-game-moss-strong sm:text-xs">
          {detail}
        </p>
      </div>
    </motion.div>
  )
}

function TeamEnergyReadout({
  energy,
  cap,
  pokemonCount,
  inverted = false,
  position,
}: {
  energy: number
  cap: number
  pokemonCount: number
  inverted?: boolean
  position: SideTone
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-3 rounded-md border border-game-border bg-game-surface-raised px-3 py-1.5 text-sm font-bold text-game-ink',
        position === 'opponent' ? 'mb-2 sm:mb-3' : 'mt-2 sm:mt-3',
        inverted && 'rotate-180',
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <EnergyIcon type="Colorless" className="h-5 w-5" />
        <span>
          {energy}/{cap}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5 text-game-muted">
        <Image
          src="/sprites/items/balls/poke-ball.avif"
          alt="Pokémon remaining"
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
        <span className="font-mono text-game-ink">{pokemonCount}</span>
      </span>
    </div>
  )
}

const TCG_CHOICE_TYPES: TcgBattleEnergyType[] = [
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
]

const TCG_CHOICE_STATUSES: TcgBattleStatusCondition[] = [
  'asleep',
  'burned',
  'confused',
  'paralyzed',
  'poisoned',
]

function AttackChoiceDrawer({
  open,
  state,
  attacker,
  attackIndex,
  defaultTargetId,
  onClose,
  onConfirm,
}: {
  open: boolean
  state: TcgBattleState
  attacker: TcgBattleCardState
  attackIndex: number
  defaultTargetId: string
  onClose: () => void
  onConfirm: (
    attackIndex: number,
    targetId: string,
    choice?: TcgBattleAttackChoice,
  ) => void
}) {
  const attack = getTcgBattleAvailableAttacks(state, 'player', attacker)[attackIndex]
  const effect = attack ? getTcgBattleAttackEffect(attack) : null
  const validTargets = attack
    ? getValidTcgBattleTargets(state, 'player', attacker, attack)
    : []
  const initialTarget = validTargets.some(
    (card) => card.instanceId === defaultTargetId,
  )
    ? defaultTargetId
    : validTargets[0]?.instanceId || ''
  const [selectedTargetId, setSelectedTargetId] = useState(initialTarget)
  const [selectedCardId, setSelectedCardId] = useState('')
  const [selectedDiscardPokemon, setSelectedDiscardPokemon] = useState<
    { side: 'player' | 'opponent'; cardId: string } | null
  >(null)
  const [selectedDamageCounterSourceId, setSelectedDamageCounterSourceId] = useState('')
  const [selectedCounterAssignments, setSelectedCounterAssignments] = useState<Record<string, number>>({})
  const [selectedDiscardHandPokemonIds, setSelectedDiscardHandPokemonIds] = useState<string[]>([])
  const [selectedOwnPokemonId, setSelectedOwnPokemonId] = useState('')
  const [selectedRecoveryPokemonIds, setSelectedRecoveryPokemonIds] = useState<string[]>([])
  const [selectedAttackIndex, setSelectedAttackIndex] = useState<number | null>(
    null,
  )
  const [followUpAttackIndex, setFollowUpAttackIndex] = useState<number | null>(
    null,
  )
  const [energyAmount, setEnergyAmount] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState<TcgBattleStatusCondition>('asleep')
  const [selectedFirstPairStatus, setSelectedFirstPairStatus] = useState<'burned' | 'poisoned'>('poisoned')
  const [selectedSecondPairStatus, setSelectedSecondPairStatus] = useState<'asleep' | 'confused'>('asleep')
  const [selectedDeckPokemonIds, setSelectedDeckPokemonIds] = useState<string[]>([])
  const [useOptionalBonus, setUseOptionalBonus] = useState(false)
  const [skipOptionalBenchSwitch, setSkipOptionalBenchSwitch] = useState(false)
  const [selectedType, setSelectedType] = useState<TcgBattleEnergyType>('Grass')
  const [resistanceType, setResistanceType] =
    useState<TcgBattleEnergyType>('Grass')
  const [weaknessType, setWeaknessType] = useState<TcgBattleEnergyType>('Grass')
  const target = validTargets.find(
    (card) => card.instanceId === selectedTargetId,
  )
  const requirement = effect?.choiceRequirement === 'optionalBonus' &&
    effect.damage.kind === 'handDiscardBonus' &&
    state.player.hand.length === 0
    ? undefined
    : effect?.choiceRequirement
  const attackCost = attack ? getAttackCost(attack, state, attacker, 'player') : 0
  const availableEnergy = Math.max(0, state.player.energy - attackCost)
  const energyTypeAllowed = !effect?.choiceEnergyType || state.player.selectedEnergy === effect.choiceEnergyType
  const availableChoiceEnergy = energyTypeAllowed
    ? Math.min(availableEnergy, effect?.choiceEnergyMax ?? Number.POSITIVE_INFINITY)
    : 0
  const copiedAttack =
    requirement === 'copyAttack' && target && selectedAttackIndex !== null
      ? getTcgBattleAvailableAttacks(state, 'opponent', target)[selectedAttackIndex]
      : undefined
  const copiedEffect = copiedAttack
    ? getTcgBattleAttackEffect(copiedAttack)
    : null
  const activeEffect = requirement === 'copyAttack' ? copiedEffect : effect
  const optionalBonusEnergyDiscardAmount = (activeEffect?.energyDiscard || []).reduce(
    (total, rule) => total + (rule.optional && rule.target === 'self' && typeof rule.amount === 'number' ? rule.amount : 0),
    0,
  )
  const optionalBonusHasEnoughEnergy = state.player.energy - (requirement === 'copyAttack' ? 0 : attackCost) >= optionalBonusEnergyDiscardAmount
  const constrainedStatusChoices = activeEffect?.status
    ?.filter((rule) => rule.useChosenStatus)
    .flatMap((rule) => rule.statuses)
  const statusChoices = constrainedStatusChoices?.length
    ? [...new Set(constrainedStatusChoices)]
    : TCG_CHOICE_STATUSES
  const recoveryPokemonRule = activeEffect?.special?.find(
    (rule) => rule.kind === 'recoverPokemonFromDiscardToHand',
  )
  const recoverablePokemonChoices = recoveryPokemonRule?.kind === 'recoverPokemonFromDiscardToHand'
    ? state.player.discard.filter((card) =>
        (!recoveryPokemonRule.includeSubtypes?.length || recoveryPokemonRule.includeSubtypes.some((subtype) => card.subtypes.includes(subtype))) &&
        (!recoveryPokemonRule.includeNames?.length || recoveryPokemonRule.includeNames.includes(card.name)) &&
        (!recoveryPokemonRule.includeTypes?.length || recoveryPokemonRule.includeTypes.some((type) => card.types.includes(type))),
      )
    : []
  const maxRecoverySelection = recoveryPokemonRule?.kind === 'recoverPokemonFromDiscardToHand'
    ? recoveryPokemonRule.maxCount ?? 1
    : 1
  const deckPokemonRule = activeEffect?.special?.find(
    (rule) => rule.kind === 'searchDeckPokemon',
  )
  const availableDeckPokemon = deckPokemonRule?.kind === 'searchDeckPokemon'
    ? getAvailableTcgBattleDeckPokemon(state.player, deckPokemonRule).filter((card) => deckPokemonRule.destination === 'hand' || canTcgBattlePutPokemonOnBench(state.player, card))
    : []
  const maxDeckPokemonSelection = deckPokemonRule?.kind === 'searchDeckPokemon'
    ? Math.min(
        getTcgBattleDeckSearchMaxCount({
          state,
          sideKey: 'player',
          attacker,
          target: target || attacker,
          rule: deckPokemonRule,
        }),
        deckPokemonRule.destination === 'hand' ? Number.POSITIVE_INFINITY : getOpenTcgBattleBenchSlots(state.player),
        availableDeckPokemon.length,
      )
    : 0
  const activeRequirement:
    | Exclude<TcgBattleChoiceRequirement, 'copyAttack'>
    | undefined =
    requirement === 'copyAttack'
      ? copiedEffect?.choiceRequirement === 'copyAttack'
        ? undefined
        : copiedEffect?.choiceRequirement
      : requirement
  const optionalSwitchTarget =
    activeRequirement === 'optionalOwnBench'
      ? 'self'
      : activeRequirement === 'optionalOpponentBench'
        ? 'opponent'
        : null
  const canSkipBenchSwitch = Boolean(
    optionalSwitchTarget &&
      activeEffect?.special?.some(
        (rule) => rule.kind === 'switch' && rule.target === optionalSwitchTarget && rule.optional,
      ),
  )
  const ownBenchHealingRule = activeRequirement === 'ownBench'
    ? activeEffect?.healing?.find(
        (rule) => 'target' in rule && rule.target === 'selectedOwnBench',
      )
    : undefined
  const benchChoices =
    activeRequirement === 'ownBench'
      ? state.player.back.filter((card) =>
          !ownBenchHealingRule ||
          doesTcgBattleSubtypeFilterMatch(
            card.subtypes,
            'subtypeFilter' in ownBenchHealingRule
              ? ownBenchHealingRule.subtypeFilter
              : undefined,
          ),
        )
      : activeRequirement === 'optionalOwnBench'
        ? state.player.back
      : activeRequirement === 'opponentBench' || activeRequirement === 'optionalOpponentBench'
        ? state.opponent.back
        : []
  const discardPokemonRule = activeEffect?.special?.find((rule) => rule.kind === 'reviveDiscardPokemon')
  const discardPokemonSides = discardPokemonRule?.kind === 'reviveDiscardPokemon' && discardPokemonRule.side
    ? [discardPokemonRule.side === 'self' ? 'player' : 'opponent'] as const
    : ['player', 'opponent'] as const
  const discardChoices = discardPokemonSides.flatMap((side) =>
    state[side].back.length < 3 && state[side].front.length + state[side].back.length < 6
      ? state[side].discard
          .filter((card) => card.subtypes.includes('Basic'))
          .map((card) => ({ side, card }))
      : [],
  )
  const transferDamageCountersRule = activeEffect?.special?.find((rule) => rule.kind === 'transferDamageCounters')
  const damageCounterSourceCards = transferDamageCountersRule?.kind === 'transferDamageCounters' && transferDamageCountersRule.sourceZone === 'bench'
    ? state.player.back
    : [...state.player.front, ...state.player.back]
  const transferDamageSourceNameContains = transferDamageCountersRule?.kind === 'transferDamageCounters'
    ? transferDamageCountersRule.sourceNameContains
    : undefined
  const damageCounterSourceChoices = damageCounterSourceCards
    .filter((card) =>
      card.currentHp > 0 &&
      card.currentHp < card.hp &&
      (!transferDamageSourceNameContains ||
        card.name.toLowerCase().includes(transferDamageSourceNameContains.toLowerCase())),
    )
  const handPokemonChoices = state.player.hand
  const ownPokemonChoices = [...state.player.front, ...state.player.back]
    .filter((card) => card.currentHp > 0)
  const counterDistributionChoices = [...state.opponent.front, ...state.opponent.back]
    .filter((card) => card.currentHp > 0)
  const counterDistributionCardIds = counterDistributionChoices.map((card) => card.instanceId).join('|')
  const counterDistributionCount = activeEffect?.choiceCounterCountFrom
    ? getTcgBattleCount(activeEffect.choiceCounterCountFrom, {
        state,
        sideKey: 'player',
        attacker,
        target: target || attacker,
        coinMode: 'actual',
      })
    : activeEffect?.choiceCounterCount || 0
  const assignedCounterCount = Object.values(selectedCounterAssignments).reduce((sum, count) => sum + count, 0)

  useEffect(() => {
    if (canSkipBenchSwitch && skipOptionalBenchSwitch) return
    if (
      !benchChoices.some(
        (card) => card.instanceId === selectedCardId && card.currentHp > 0,
      )
    ) {
      setSelectedCardId(
        benchChoices.find((card) => card.currentHp > 0)?.instanceId || '',
      )
    }
  }, [benchChoices, selectedCardId, canSkipBenchSwitch, skipOptionalBenchSwitch])

  useEffect(() => {
    setSkipOptionalBenchSwitch(false)
  }, [attacker.instanceId, attackIndex, activeRequirement, selectedAttackIndex, followUpAttackIndex])

  useEffect(() => {
    setSelectedCounterAssignments({})
  }, [attacker.instanceId, attackIndex, activeRequirement, selectedAttackIndex, followUpAttackIndex])

  useEffect(() => {
    const eligibleIds = new Set(counterDistributionChoices.map((card) => card.instanceId))
    setSelectedCounterAssignments((current) => Object.fromEntries(
      Object.entries(current).filter(([cardId, counters]) => eligibleIds.has(cardId) && counters > 0),
    ))
  }, [counterDistributionCardIds])

  useEffect(() => {
    if (activeRequirement === 'energyAmount') setEnergyAmount(availableChoiceEnergy)
  }, [activeRequirement, availableChoiceEnergy])

  useEffect(() => {
    if (
      !discardChoices.some(
        ({ side, card }) => side === selectedDiscardPokemon?.side && card.instanceId === selectedDiscardPokemon.cardId,
      )
    ) {
      const first = discardChoices[0]
      setSelectedDiscardPokemon(first ? { side: first.side, cardId: first.card.instanceId } : null)
    }
  }, [discardChoices, selectedDiscardPokemon])

  useEffect(() => {
    if (!damageCounterSourceChoices.some((card) => card.instanceId === selectedDamageCounterSourceId)) {
      setSelectedDamageCounterSourceId(damageCounterSourceChoices[0]?.instanceId || '')
    }
  }, [damageCounterSourceChoices, selectedDamageCounterSourceId])

  useEffect(() => {
    const handIds = new Set(handPokemonChoices.map((card) => card.instanceId))
    setSelectedDiscardHandPokemonIds((selected) => selected.filter((cardId) => handIds.has(cardId)))
  }, [handPokemonChoices])

  useEffect(() => {
    setSelectedDiscardHandPokemonIds([])
  }, [attacker.instanceId, attackIndex])

  useEffect(() => {
    if (!ownPokemonChoices.some((card) => card.instanceId === selectedOwnPokemonId)) {
      const mostInjured = [...ownPokemonChoices]
        .sort((a, b) => (b.hp - b.currentHp) - (a.hp - a.currentHp))[0]
      setSelectedOwnPokemonId(mostInjured?.instanceId || '')
    }
  }, [ownPokemonChoices, selectedOwnPokemonId])

  useEffect(() => {
    const eligibleIds = new Set(recoverablePokemonChoices.map((card) => card.instanceId))
    const selected = selectedRecoveryPokemonIds
      .filter((cardId) => eligibleIds.has(cardId))
      .slice(0, maxRecoverySelection)
    if (recoveryPokemonRule?.kind === 'recoverPokemonFromDiscardToHand' && recoveryPokemonRule.upTo) {
      if (selected.length !== selectedRecoveryPokemonIds.length) setSelectedRecoveryPokemonIds(selected)
      return
    }
    if (selected.length > 0 || recoverablePokemonChoices.length === 0) {
      if (selected.length !== selectedRecoveryPokemonIds.length) setSelectedRecoveryPokemonIds(selected)
      return
    }
    setSelectedRecoveryPokemonIds(recoverablePokemonChoices.slice(0, maxRecoverySelection).map((card) => card.instanceId))
  }, [recoverablePokemonChoices, selectedRecoveryPokemonIds, maxRecoverySelection, recoveryPokemonRule])

  if (!attack || !effect) return null

  const buildChoiceFor = (
    required:
      | Exclude<NonNullable<typeof requirement>, 'copyAttack'>
      | undefined,
    attackChoiceIndex: number | null,
  ): TcgBattleAttackChoice | undefined => {
    if (required === 'disableAttack' && attackChoiceIndex !== null) {
      return { kind: 'disabledAttack', attackIndex: attackChoiceIndex }
    }
    if (required === 'damageCounterTransfer') {
      return {
        kind: 'damageCounterTransfer',
        sourceCardId: selectedDamageCounterSourceId || undefined,
      }
    }
    if (required === 'discardHandCards') {
      const handIds = new Set(handPokemonChoices.map((card) => card.instanceId))
      return {
        kind: 'discardHandCards',
        cardIds: selectedDiscardHandPokemonIds.filter((cardId) => handIds.has(cardId)),
      }
    }
    if (required === 'ownPokemon' && selectedOwnPokemonId) {
      return { kind: 'ownPokemon', cardId: selectedOwnPokemonId }
    }
    if (required === 'counterDistribution') {
      return {
        kind: 'counterDistribution',
        assignments: Object.entries(selectedCounterAssignments)
          .filter(([, counters]) => counters > 0)
          .map(([cardId, counters]) => ({ cardId, counters })),
      }
    }
    if (
      required === 'discardPokemonToHand' &&
      (selectedRecoveryPokemonIds.length > 0 || recoveryPokemonRule?.kind === 'recoverPokemonFromDiscardToHand' && recoveryPokemonRule.upTo)
    ) {
      return { kind: 'discardPokemonToHand', cardIds: selectedRecoveryPokemonIds.slice(0, maxRecoverySelection) }
    }
    if (
      required === 'opponentBench' ||
        required === 'ownBench' ||
        required === 'optionalOpponentBench' ||
        required === 'optionalOwnBench'
    ) {
      if (canSkipBenchSwitch && skipOptionalBenchSwitch) return { kind: 'skipBenchSwitch' }
      if (!selectedCardId) return undefined
      return { kind: 'benchSwitch', cardId: selectedCardId }
    }
    if (required === 'discardPokemon' && selectedDiscardPokemon) {
      return { kind: 'discardPokemon', ...selectedDiscardPokemon }
    }
    if (required === 'deckPokemon') {
      const availableIds = new Set(availableDeckPokemon.map((card) => card.id))
      return {
        kind: 'deckPokemon',
        cardIds: selectedDeckPokemonIds
          .filter((cardId) => availableIds.has(cardId))
          .slice(0, maxDeckPokemonSelection),
      }
    }
    if (required === 'optionalBonus') {
      return { kind: 'optionalBonus', enabled: useOptionalBonus }
    }
    if (required === 'statusCondition') {
      return { kind: 'statusCondition', status: selectedStatus }
    }
    if (required === 'statusPair') {
      return { kind: 'statusPair', first: selectedFirstPairStatus, second: selectedSecondPairStatus }
    }
    if (required === 'energyAmount') {
      return { kind: 'energyAmount', amount: energyAmount }
    }
    if (required === 'typeChange') {
      return { kind: 'typeChange', type: selectedType }
    }
    if (required === 'textureMagic') {
      return { kind: 'textureMagic', resistanceType, weaknessType }
    }
    return undefined
  }

  const buildChoice = (): TcgBattleAttackChoice | undefined => {
    if (requirement === 'copyAttack' && selectedAttackIndex !== null) {
      return {
        kind: 'copiedAttack',
        attackIndex: selectedAttackIndex,
        followUp: buildChoiceFor(activeRequirement, followUpAttackIndex),
      }
    }
    return buildChoiceFor(activeRequirement, selectedAttackIndex)
  }

  const activeChoiceReady =
    !activeRequirement ||
    (activeRequirement === 'disableAttack'
      ? (requirement === 'copyAttack'
          ? followUpAttackIndex
          : selectedAttackIndex) !== null
      : activeRequirement === 'opponentBench'
        ? Boolean(selectedCardId)
        : activeRequirement === 'ownBench'
          ? benchChoices.every((card) => card.currentHp <= 0) || Boolean(selectedCardId)
        : activeRequirement === 'optionalOpponentBench' || activeRequirement === 'optionalOwnBench'
          ? benchChoices.every((card) => card.currentHp <= 0) ||
            Boolean(selectedCardId) ||
            (canSkipBenchSwitch && skipOptionalBenchSwitch)
        : activeRequirement === 'damageCounterTransfer'
          ? damageCounterSourceChoices.length === 0 || Boolean(selectedDamageCounterSourceId)
        : activeRequirement === 'discardHandCards'
          ? effect.choiceHandCardCount === undefined ||
            handPokemonChoices.length === 0 ||
            selectedDiscardHandPokemonIds.length === Math.min(effect.choiceHandCardCount, handPokemonChoices.length)
        : activeRequirement === 'ownPokemon'
          ? Boolean(selectedOwnPokemonId)
        : activeRequirement === 'counterDistribution'
          ? assignedCounterCount === counterDistributionCount
        : activeRequirement === 'discardPokemonToHand'
          ? recoverablePokemonChoices.length === 0 || (recoveryPokemonRule?.kind === 'recoverPokemonFromDiscardToHand' && recoveryPokemonRule.upTo
              ? selectedRecoveryPokemonIds.length <= Math.min(maxRecoverySelection, recoverablePokemonChoices.length)
              : selectedRecoveryPokemonIds.length === Math.min(maxRecoverySelection, recoverablePokemonChoices.length))
        : activeRequirement === 'discardPokemon'
          ? Boolean(selectedDiscardPokemon)
        : activeRequirement === 'statusCondition'
          ? statusChoices.includes(selectedStatus)
        : activeRequirement === 'statusPair'
          ? ['burned', 'poisoned'].includes(selectedFirstPairStatus) &&
            ['asleep', 'confused'].includes(selectedSecondPairStatus)
        : true)
  const choiceReady =
    !requirement ||
    (requirement === 'copyAttack'
      ? selectedAttackIndex !== null && activeChoiceReady
      : activeChoiceReady)

  const renderCardChoices = (
    cards: TcgBattleCardState[],
    value: string,
    onChange: (value: string) => void,
  ) => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {cards
        .filter((card) => card.currentHp > 0)
        .map((card) => (
          <button
            type="button"
            key={card.instanceId}
            onClick={() => onChange(card.instanceId)}
            className={cn(
              'game-focus-ring min-h-11 rounded-md border bg-game-surface-raised px-3 py-2 text-left text-game-ink transition-colors',
              value === card.instanceId
                ? 'border-game-moss bg-game-moss/25'
                : 'border-game-border/60 hover:border-game-moss/60',
            )}
          >
            <span className="block truncate text-sm font-semibold">
              {card.name}
            </span>
            <span className="font-mono text-xs text-game-muted">
              {card.currentHp}/{card.hp} HP
            </span>
          </button>
        ))}
    </div>
  )

  const renderTypeChoices = (
    value: TcgBattleEnergyType,
    onChange: (value: TcgBattleEnergyType) => void,
    allowedTypes: TcgBattleEnergyType[] = TCG_CHOICE_TYPES,
  ) => (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {allowedTypes.map((type) => (
        <button
          type="button"
          key={type}
          onClick={() => onChange(type)}
          className={cn(
            'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-sm font-semibold transition-colors',
            TYPE_BADGE_CLASSES[type],
            value === type
              ? 'ring-2 ring-game-moss'
              : 'opacity-80 hover:opacity-100',
          )}
        >
          {type}
        </button>
      ))}
    </div>
  )

  return (
    <Drawer open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DrawerContent
        title={`Choose ${attack.name}`}
        description="Complete the card’s extra choice before committing the attack."
        icon={<span className="text-xs font-bold uppercase tracking-wide">Target</span>}
        background="/backgrounds/tcg.avif"
        heroLabel="Card battle"
        className="border-game-border bg-game-surface-raised text-game-ink"
      >
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
          {(effect.targetScope === 'bench' || effect.targetScope === 'any') && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                Target
              </h3>
              {renderCardChoices(
                validTargets,
                selectedTargetId,
                setSelectedTargetId,
              )}
            </section>
          )}
          {(activeRequirement === 'opponentBench' ||
            activeRequirement === 'ownBench' ||
            activeRequirement === 'optionalOpponentBench' ||
            activeRequirement === 'optionalOwnBench') && benchChoices.some((card) => card.currentHp > 0) && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                {activeRequirement === 'ownBench' || activeRequirement === 'optionalOwnBench'
                  ? 'Switch with'
                  : 'Bring forward'}
              </h3>
              {renderCardChoices(
                benchChoices,
                selectedCardId,
                (cardId) => {
                  setSelectedCardId(cardId)
                  setSkipOptionalBenchSwitch(false)
                },
              )}
              {canSkipBenchSwitch && (
                <button
                  type="button"
                  aria-pressed={skipOptionalBenchSwitch}
                  onClick={() => {
                    setSelectedCardId('')
                    setSkipOptionalBenchSwitch(true)
                  }}
                  className={cn(
                    'game-focus-ring min-h-11 w-full rounded-md border px-3 py-2 text-sm font-semibold transition-colors',
                    skipOptionalBenchSwitch
                      ? 'border-game-moss bg-game-moss/25 text-game-ink'
                      : 'border-game-border/60 bg-game-surface-raised text-game-muted hover:border-game-moss/60',
                  )}
                >
                  {optionalSwitchTarget === 'self' ? 'Keep this Pokémon Active' : 'Leave the opponent Active'}
                </button>
              )}
            </section>
          )}
          {activeRequirement === 'damageCounterTransfer' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                Move damage counters from
              </h3>
              {damageCounterSourceChoices.length > 0 ? (
                renderCardChoices(
                  damageCounterSourceChoices,
                  selectedDamageCounterSourceId,
                  setSelectedDamageCounterSourceId,
                )
              ) : (
                <p className="text-sm text-game-muted">Your Pokémon have no damage counters to move.</p>
              )}
            </section>
          )}
          {activeRequirement === 'counterDistribution' && (
            <section className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-game-ink">Place damage counters</h3>
                <p className="text-xs text-game-muted">
                  Assign all {counterDistributionCount} counters. {assignedCounterCount}/{counterDistributionCount} assigned.
                </p>
              </div>
              <div className="space-y-2">
                {counterDistributionChoices.map((card) => {
                  const counters = selectedCounterAssignments[card.instanceId] || 0
                  const canAddCounter = assignedCounterCount < counterDistributionCount
                  return (
                    <div key={card.instanceId} className="flex items-center justify-between gap-3 rounded-md border border-game-border/60 bg-game-surface-raised px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-game-ink">{card.name}</p>
                        <p className="text-xs text-game-muted">{card.currentHp}/{card.hp} HP</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Remove a damage counter from ${card.name}`}
                          disabled={counters === 0}
                          onClick={() => setSelectedCounterAssignments((current) => {
                            const nextCount = (current[card.instanceId] || 0) - 1
                            if (nextCount <= 0) {
                              const remaining = { ...current }
                              delete remaining[card.instanceId]
                              return remaining
                            }
                            return { ...current, [card.instanceId]: nextCount }
                          })}
                          className="game-focus-ring h-9 w-9 rounded-md border border-game-border/60 text-lg font-semibold text-game-ink disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="w-5 text-center font-mono text-sm font-semibold text-game-ink">{counters}</span>
                        <button
                          type="button"
                          aria-label={`Add a damage counter to ${card.name}`}
                          disabled={!canAddCounter}
                          onClick={() => setSelectedCounterAssignments((current) => {
                            const total = Object.values(current).reduce((sum, count) => sum + count, 0)
                            if (total >= counterDistributionCount) return current
                            return { ...current, [card.instanceId]: (current[card.instanceId] || 0) + 1 }
                          })}
                          className="game-focus-ring h-9 w-9 rounded-md border border-game-border/60 text-lg font-semibold text-game-ink disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
          {activeRequirement === 'ownPokemon' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">Choose a Pokémon to heal</h3>
              {renderCardChoices(ownPokemonChoices, selectedOwnPokemonId, setSelectedOwnPokemonId)}
            </section>
          )}
          {activeRequirement === 'discardPokemonToHand' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                {maxRecoverySelection > 1 ? `Pokémon to recover (${selectedRecoveryPokemonIds.length} selected)` : 'Pokémon to recover'}
              </h3>
              {recoverablePokemonChoices.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {recoverablePokemonChoices.map((card) => {
                    const selected = selectedRecoveryPokemonIds.includes(card.instanceId)
                    return (
                      <button
                        type="button"
                        key={card.instanceId}
                        aria-pressed={selected}
                        onClick={() => setSelectedRecoveryPokemonIds((current) =>
                          selected
                            ? current.filter((cardId) => cardId !== card.instanceId)
                            : current.length < maxRecoverySelection ? [...current, card.instanceId] : current,
                        )}
                        className={cn(
                          'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors',
                          selected
                            ? 'border-game-moss bg-game-moss/25 text-game-ink'
                            : 'border-game-border/60 bg-game-surface-raised text-game-muted hover:border-game-moss/60',
                        )}
                      >
                        {card.name}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-game-muted">No eligible Pokémon are in your discard pile.</p>
              )}
            </section>
          )}
          {activeRequirement === 'discardHandCards' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                Pokémon to discard ({selectedDiscardHandPokemonIds.length})
              </h3>
              <p className="text-xs text-game-muted">
                {effect.choiceHandCardCount === undefined
                  ? 'Choose any number. Each Pokémon adds 30 damage.'
                  : `Choose ${effect.choiceHandCardCount} Pokémon to discard.`}
              </p>
              {handPokemonChoices.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {handPokemonChoices.map((card) => {
                    const selected = selectedDiscardHandPokemonIds.includes(card.instanceId)
                    const atSelectionLimit =
                      effect.choiceHandCardCount !== undefined &&
                      selectedDiscardHandPokemonIds.length >= effect.choiceHandCardCount
                    return (
                      <button
                        type="button"
                        key={card.instanceId}
                        aria-pressed={selected}
                        disabled={!selected && atSelectionLimit}
                        onClick={() => setSelectedDiscardHandPokemonIds((current) =>
                          selected
                            ? current.filter((cardId) => cardId !== card.instanceId)
                            : [...current, card.instanceId],
                        )}
                        className={cn(
                          'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-left text-sm font-semibold transition-colors',
                          selected
                            ? 'border-game-moss bg-game-moss/25 text-game-ink'
                            : 'border-game-border/60 bg-game-surface-raised text-game-muted hover:border-game-moss/60',
                        )}
                      >
                        {card.name}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-game-muted">Your hand is empty.</p>
              )}
            </section>
          )}
          {activeRequirement === 'discardPokemon' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                Basic Pokémon to revive
              </h3>
              {discardChoices.length === 0 ? (
                <p className="text-sm text-game-muted">Neither side has a Basic Pokémon that can be revived.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {discardChoices.map(({ side, card }) => {
                    const selected = selectedDiscardPokemon?.side === side && selectedDiscardPokemon.cardId === card.instanceId
                    const damageCounters = Math.floor(card.hp / 20)
                    const remainingHp = Math.max(1, card.hp - damageCounters * 10)
                    return (
                      <button
                        type="button"
                        key={`${side}-${card.instanceId}`}
                        onClick={() => setSelectedDiscardPokemon({ side, cardId: card.instanceId })}
                        className={cn(
                          'game-focus-ring min-h-11 rounded-md border bg-game-surface-raised px-3 py-2 text-left text-game-ink transition-colors',
                          selected ? 'border-game-moss bg-game-moss/25' : 'border-game-border/60 hover:border-game-moss/60',
                        )}
                      >
                        <span className="block truncate text-sm font-semibold">{card.name}</span>
                        <span className="text-xs text-game-muted">{side === 'player' ? 'Your' : "Opponent’s"} discard · returns at {remainingHp}/{card.hp} HP</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </section>
          )}
          {activeRequirement === 'deckPokemon' && deckPokemonRule?.kind === 'searchDeckPokemon' && (
            <section className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-game-ink">Choose Pokémon from your deck</h3>
                <p className="text-xs text-game-muted">
                  {deckPokemonRule.oneOfEachType
                    ? `Select up to ${maxDeckPokemonSelection} Pokémon, each with a different type.`
                    : deckPokemonRule.destination === 'hand'
                    ? `Select up to ${maxDeckPokemonSelection} Pokémon to add to your hand.`
                    : `Select up to ${maxDeckPokemonSelection}. You may leave some or all Bench spaces open.`}
                </p>
              </div>
              {availableDeckPokemon.length === 0 ? (
                <p className="text-sm text-game-muted">No eligible Pokémon remain in your deck.</p>
              ) : maxDeckPokemonSelection === 0 && deckPokemonRule.destination !== 'hand' ? (
                <p className="text-sm text-game-muted">Your Bench is full.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {availableDeckPokemon.map((card) => {
                    const selected = selectedDeckPokemonIds.includes(card.id)
                    const duplicateNameSelected = Boolean(deckPokemonRule.oneOfEachName && !selected && selectedDeckPokemonIds.some((cardId) =>
                      availableDeckPokemon.find((candidate) => candidate.id === cardId)?.name.toLowerCase() === card.name.toLowerCase(),
                    ))
                    const cardType = card.types[0]?.toLowerCase() || 'colorless'
                    const duplicateTypeSelected = Boolean(deckPokemonRule.oneOfEachType && !selected && selectedDeckPokemonIds.some((cardId) =>
                      (availableDeckPokemon.find((candidate) => candidate.id === cardId)?.types[0]?.toLowerCase() || 'colorless') === cardType,
                    ))
                    const disabled = !selected && (selectedDeckPokemonIds.length >= maxDeckPokemonSelection || duplicateNameSelected || duplicateTypeSelected)
                    return (
                      <button
                        type="button"
                        key={card.id}
                        disabled={disabled}
                        onClick={() => setSelectedDeckPokemonIds((current) =>
                          current.includes(card.id)
                            ? current.filter((id) => id !== card.id)
                            : current.length < maxDeckPokemonSelection
                              ? [...current, card.id]
                              : current,
                        )}
                        className={cn(
                          'game-focus-ring min-h-11 rounded-md border bg-game-surface-raised px-3 py-2 text-left text-game-ink transition-colors',
                          selected
                            ? 'border-game-moss bg-game-moss/25'
                            : 'border-game-border/60 hover:border-game-moss/60',
                          disabled && 'cursor-not-allowed opacity-40',
                        )}
                      >
                        <span className="block truncate text-sm font-semibold">{card.name}</span>
                        <span className="text-xs text-game-muted">{card.types.join(' / ')} · {card.hp} HP</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </section>
          )}
          {activeRequirement === 'optionalBonus' &&
            activeEffect &&
            (activeEffect.damage.kind === 'optionalChoiceBonus' ||
              activeEffect.damage.kind === 'optionalCoinDamage' ||
              activeEffect.damage.kind === 'handDiscardBonus') && (
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-game-ink">Optional attack bonus</h3>
                <p className="text-sm text-game-muted">
                  {activeEffect.optionalBonusPrompt || (activeEffect.damage.kind === 'optionalCoinDamage'
                    ? `Flip for ${activeEffect.damage.successDamage} damage? Tails does ${activeEffect.damage.failureDamage} damage.`
                    : optionalBonusEnergyDiscardAmount > 0
                      ? `Discard ${optionalBonusEnergyDiscardAmount} Energy to take +${activeEffect.damage.bonusDamage} damage?`
                      : activeEffect.selfDamage?.some((rule) => rule.kind === 'optionalChoice')
                        ? `Take +${activeEffect.damage.bonusDamage} damage and accept the recoil?`
                        : `Take +${activeEffect.damage.bonusDamage} damage?`)}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUseOptionalBonus(false)}
                    className={cn(
                      'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-sm font-semibold',
                      !useOptionalBonus
                        ? 'border-game-moss bg-game-moss/25 text-game-ink'
                        : 'border-game-border/60 bg-game-surface-raised text-game-muted',
                    )}
                  >
                    {activeEffect.damage.kind === 'optionalCoinDamage' ? 'Do not flip' : 'No bonus'}
                  </button>
                  <button
                    type="button"
                    disabled={!optionalBonusHasEnoughEnergy}
                    onClick={() => setUseOptionalBonus(true)}
                    className={cn(
                      'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-sm font-semibold',
                      !optionalBonusHasEnoughEnergy
                        ? 'cursor-not-allowed border-game-border/60 bg-game-surface-raised text-game-muted/50'
                        : useOptionalBonus
                        ? 'border-game-moss bg-game-moss/25 text-game-ink'
                        : 'border-game-border/60 bg-game-surface-raised text-game-muted',
                    )}
                  >
                    {activeEffect.damage.kind === 'optionalCoinDamage' ? 'Flip a coin' : 'Take bonus'}
                  </button>
                </div>
              </section>
            )}
          {activeRequirement === 'statusCondition' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">Special Condition</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {statusChoices.map((status) => (
                  <button
                    type="button"
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={cn(
                      'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-sm font-semibold capitalize transition-colors',
                      selectedStatus === status
                        ? 'border-game-moss bg-game-moss/25 text-game-ink'
                        : 'border-game-border/60 bg-game-surface-raised text-game-muted hover:border-game-moss/60',
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </section>
          )}
          {activeRequirement === 'statusPair' && (
            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-game-ink">First Special Condition</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(['burned', 'poisoned'] as const).map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setSelectedFirstPairStatus(status)}
                      className={cn(
                        'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-sm font-semibold capitalize transition-colors',
                        selectedFirstPairStatus === status
                          ? 'border-game-moss bg-game-moss/25 text-game-ink'
                          : 'border-game-border/60 bg-game-surface-raised text-game-muted hover:border-game-moss/60',
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-game-ink">Second Special Condition</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(['asleep', 'confused'] as const).map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setSelectedSecondPairStatus(status)}
                      className={cn(
                        'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-sm font-semibold capitalize transition-colors',
                        selectedSecondPairStatus === status
                          ? 'border-game-moss bg-game-moss/25 text-game-ink'
                          : 'border-game-border/60 bg-game-surface-raised text-game-muted hover:border-game-moss/60',
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
          {requirement === 'copyAttack' && target && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                Attack to copy
              </h3>
              <div className="grid gap-2">
                {getTcgBattleAvailableAttacks(state, 'opponent', target).map((candidate, index) => {
                  const candidateEffect = getTcgBattleAttackEffect(candidate)
                  const isRecursive = candidateEffect?.special?.some(
                    (rule) => rule.kind === 'copyAttack',
                  )
                  const acceptsTarget = getValidTcgBattleTargets(
                    state,
                    'player',
                    attacker,
                    candidate,
                  ).some((card) => card.instanceId === target.instanceId)
                  const unavailable =
                    !candidateEffect || Boolean(isRecursive) || !acceptsTarget
                  return (
                    <button
                      type="button"
                      key={`${candidate.name}-${index}`}
                      disabled={unavailable}
                      onClick={() => {
                        setSelectedAttackIndex(index)
                        setFollowUpAttackIndex(null)
                      }}
                      className={cn(
                        'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-left transition-colors',
                        selectedAttackIndex === index
                          ? 'border-game-moss bg-game-moss/25'
                          : 'border-game-border bg-game-canvas/50 hover:border-game-moss/60',
                        unavailable && 'cursor-not-allowed opacity-40',
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {candidate.name}
                      </span>
                      <span className="text-xs text-game-muted">
                        {candidate.text || `${candidate.damage || 0} damage`}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          )}
          {activeRequirement === 'disableAttack' && target && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                Attack to disable
              </h3>
              <div className="grid gap-2">
                {getTcgBattleAvailableAttacks(state, 'opponent', target).map((candidate, index) => {
                  const selectedIndex =
                    requirement === 'copyAttack'
                      ? followUpAttackIndex
                      : selectedAttackIndex
                  return (
                    <button
                      type="button"
                      key={`${candidate.name}-${index}`}
                      onClick={() =>
                        requirement === 'copyAttack'
                          ? setFollowUpAttackIndex(index)
                          : setSelectedAttackIndex(index)
                      }
                      className={cn(
                        'game-focus-ring min-h-11 rounded-md border px-3 py-2 text-left transition-colors',
                        selectedIndex === index
                          ? 'border-game-moss bg-game-moss/25'
                          : 'border-game-border bg-game-canvas/50 hover:border-game-moss/60',
                      )}
                    >
                      <span className="block text-sm font-semibold">
                        {candidate.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          )}
          {activeRequirement === 'energyAmount' && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-game-ink">
                {effect.choiceEnergyType ? `Extra ${effect.choiceEnergyType} Energy` : 'Extra Energy'}
              </h3>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {Array.from({ length: availableChoiceEnergy + 1 }, (_, amount) => (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => setEnergyAmount(amount)}
                    className={cn(
                      'game-focus-ring min-h-11 rounded-md border font-mono text-sm',
                      energyAmount === amount
                        ? 'border-game-moss bg-game-moss/25 text-game-ink'
                        : 'border-game-border bg-game-canvas/50 text-game-muted',
                    )}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </section>
          )}
          {activeRequirement === 'typeChange' &&
            renderTypeChoices(selectedType, setSelectedType, activeEffect?.choiceAllowedTypes)}
          {activeRequirement === 'textureMagic' && (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-game-ink">
                  Your resistance
                </h3>
                {renderTypeChoices(resistanceType, setResistanceType)}
              </section>
              <section className="space-y-2">
                <h3 className="text-sm font-semibold text-game-ink">
                  Target weakness
                </h3>
                {renderTypeChoices(weaknessType, setWeaknessType)}
              </section>
            </>
          )}
        </div>
        <DrawerFooter className="border-t border-game-border sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="min-h-11"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!selectedTargetId || !choiceReady}
            onClick={() =>
              onConfirm(attackIndex, selectedTargetId, buildChoice())
            }
            className="min-h-11 bg-game-charcoal text-game-cream hover:bg-game-charcoal-strong"
          >
            Commit attack
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function InlineAttackButtons({
  state,
  selectedAttacker,
  selectedTarget,
  attackCap,
  isPending,
  resolution,
  onAttack,
}: {
  state: TcgBattleState
  selectedAttacker?: TcgBattleCardState
  selectedTarget?: TcgBattleCardState
  attackCap: number
  isPending: boolean
  resolution?: BattleResolution | null
  onAttack: (attackIndex: number) => void
}) {
  const moonGuidancePending = state.lastAction?.abilityEffect === 'moonGuidancePending' && state.lastAction.side === 'player'
  const regidragoPending = state.lastAction?.abilityEffect === 'regidragoVstarPending' && state.lastAction.side === 'player'
  const canAct =
    state.phase === 'battle' && state.activeSide === 'player' && !resolution && !moonGuidancePending && !regidragoPending
  const attacks = selectedAttacker ? getTcgBattleAvailableAttacks(state, 'player', selectedAttacker) : []

  if (state.phase !== 'battle' || attacks.length === 0) return null

  return (
    <div className="z-20 flex w-full max-w-[min(34rem,calc(100vw-1rem))] flex-wrap items-center justify-center gap-2 px-2 pt-1">
      {attacks.map((attack, index) => {
        const cost = getAttackCost(attack, state, selectedAttacker, 'player')
        const validTargets = selectedAttacker
          ? getValidTcgBattleTargets(state, 'player', selectedAttacker, attack)
          : []
        const effect = getTcgBattleAttackEffect(attack)
        const hasResolvableTarget = selectedAttacker
          ? validTargets.some(
              (target) =>
                !effect?.choiceRequirement ||
                Boolean(
                  chooseTcgBattleAttackChoice({
                    state,
                    sideKey: 'player',
                    attacker: selectedAttacker,
                    attack,
                    target,
                    paidAttackCost: cost,
                  }),
                ),
            )
          : false
        const projectedDamage = getProjectedDamage(
          selectedAttacker,
          attack,
          selectedTarget,
          state,
        )
        const disabledReason = !canAct
          ? 'Wait'
          : !isTcgBattleAbilityAttackAllowed(state, 'player', selectedAttacker!)
            ? 'Ability'
          : isTcgBattleAttackDisabled(selectedAttacker!, index)
            ? 'Disabled'
            : !hasResolvableTarget
              ? 'Target'
              : !isCardUnlockedByTurn(selectedAttacker, state.turnNumber)
                ? `Turn ${selectedAttacker ? getTcgBattleCardUnlockTurnForCard(selectedAttacker) : 1}`
                : cost > state.player.energy
                  ? 'Energy'
                  : cost > attackCap
                    ? 'Cap'
                    : ''
        const disabled = isPending || Boolean(disabledReason)

        return (
          <button
            type="button"
            key={`${attack.name}-${index}`}
            className={cn(
              'game-focus-ring group flex min-h-11 min-w-0 flex-1 basis-[10rem] items-center justify-between gap-2 rounded-md border border-game-moss/30 bg-game-surface-raised/95 px-3 py-2 text-left backdrop-blur-md transition-colors hover:border-game-moss-strong/70 hover:bg-game-moss/15',
              disabled &&
                'cursor-default border-game-border/70 bg-game-surface-raised/75 opacity-40 hover:border-game-border/70 hover:bg-game-surface-raised/75',
            )}
            disabled={disabled}
            onClick={() => onAttack(index)}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-black uppercase text-game-ink">
                  {attack.name}
                </span>
                <span className="mt-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-game-muted">
                  {disabledReason || `${projectedDamage} damage`}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-black text-game-ink">
              <EnergyCost cost={cost} types={attack.cost} />
              <span>{attack.damage}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function getUsableActiveHealAbilities(state: TcgBattleState, target?: TcgBattleCardState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  return [...state.player.front, ...state.player.back, ...state.player.hand]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim()
      let normalized = text.replace(/\s+/g, ' ').replace(/remove (\d+) damage counters? from/g, (_match, count: string) => `heal ${Number(count) * 10} damage from`)
      const vstarPower = /\(you can't use more than 1 vstar power in a game\.?\)\.?$/.test(normalized)
      if (vstarPower) normalized = normalized.replace(/\s*\(you can't use more than 1 vstar power in a game\.?\)\.?$/, '').replace(/^during your turn, /, 'once during your turn, ')
      normalized = normalized.replace(/ if you use this ability, your turn ends\.$/, '')
      const shared = /(?:you )?can't use more than 1 [^.]+ (?:ability|power|pok[eé]-power) each turn\./.test(normalized) || source.name.toLowerCase() === 'wigglytuff' && normalized.includes("good neighbor poke-power this turn")
      normalized = normalized.replace(/\s+(?:you )?can't use more than 1 [^.]+ (?:ability|power|pok[eé]-power) each turn\./, '')
      const specialConditionGate = /(?:this power|this ability) can't be used if [^.]+ affected by a special condition\./.test(normalized)
      const basicStatusGate = /(?:this power|this ability) can't be used if [^.]+ (?:asleep, confused, and paralyzed|asleep, confused, or paralyzed)\./.test(normalized)
      normalized = normalized.replace(/\s+(?:this power|this ability) can't be used if [^.]+ (?:affected by a special condition|asleep, confused, and paralyzed|asleep, confused, or paralyzed)\./, '')
      const activeHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, (?:you may use this ability\. )?(?:you may )?heal (\d+) damage from your active pokemon\.$/)
      const snorlaxRest = source.name.toLowerCase() === 'snorlax' && normalized === 'once during your turn (before your attack), you may heal 10 damage from snorlax. snorlax is now asleep.'
      const activeSelfHeal = normalized.match(/^once during your turn, if this pokemon is in the active spot, you may use this ability\. heal (\d+) damage from this pokemon\.$/) || (snorlaxRest ? ['', '10'] as RegExpMatchArray : null)
      const xatuActiveHeal = source.name.toLowerCase() === 'xatu' && normalized === 'once during your turn (before your attack), you may heal 10 damage from each of your active pokemon.'
      const coinActiveHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, you may flip a coin\. if heads, heal (\d+) damage from your active pokemon\.$/)
      const coinAnyHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, you may flip a coin\. if heads, heal (\d+) damage from (?:1|one|a) of your pokemon\.$/)
      const blisseyEnergyHeal = normalized === 'once during your turn (before your attack), choose 1 of your benched pokemon and flip a coin. if heads, count the number of energy attached to blissey and then remove that many damage counters from the chosen benched pokemon.'
      const activeAnyHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, if this pokemon is (?:in the active spot|your active pokemon), you may heal (\d+) damage from (?:1|one|a) of your pokemon\.$/)
      const activeGrassHeal = normalized === 'once during your turn (before your attack), you may heal 20 damage from your active grass pokemon.'
      const activeTypedHeal = normalized.match(/^once during your turn \(before your attack\), you may heal (\d+) damage from your active (grass|fire|water|lightning|psychic|fighting|metal|darkness|dragon|fairy|colorless) pokemon\.$/)
      const activeEvolutionHeal = normalized === 'once during your turn, you may heal 20 damage from your active evolution pokemon.'
      const benchedHeal = normalized.match(/^once during your turn \(before your attack\), you may heal (\d+) damage from (?:1|one|a) of your benched pokemon\.$/)
      const activeEnergyHeal = normalized.match(/^if this pokemon is your active pokemon, once during your turn(?: \(before your attack\))?, you may heal (\d+) damage from 1 of your pokemon that has any energy attached to it\.$/)
      const grassEnergyHeal = normalized.match(/^once during your turn \(before your attack\), you may heal (\d+) damage from 1 of your pokemon that has any (grass|water) energy attached to it\.$/)
      const anyHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, (?:you may use this ability\. )?(?:you may )?heal (\d+) damage from (?:1|one|a) of your (?:(grass|fire|water|lightning|psychic|fighting|metal|darkness|dragon|fairy|colorless|\{[grwlpfmdyc]\}) )?pokemon(?: \(excluding ([^)]+)\))?\.$/)
      const eachHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, (?:you may use this ability\. )?(?:you may )?heal (\d+) damage from each of your (?:(grass|fire|water|lightning|psychic|fighting|metal|darkness|dragon|fairy|colorless|\{[grwlpfmdyc]\}) )?pokemon\.$/) || (source.name.toLowerCase() === 'lopunny' && normalized === 'once during your turn (before your attack), you may discard an energy card from your hand. if you do, heal 10 damage from each of your pokemon.' ? ['', '10'] : null)
      const goodraVstarHeal = vstarPower && normalized === 'once during your turn, you may heal all damage from this pokemon.'
      const coinHealEach = normalized === 'once during your turn (before your attack), you may flip a coin. if heads, heal 10 damage from each of your pokemon that has any.'
      const goodNeighborHeal = source.name.toLowerCase() === 'wigglytuff' && normalized === "once during your turn (before your attack), if wigglytuff is on your bench, you may flip a coin. if heads, each player removes up to 2 damage counters from his or her active pokemon. this power can't be used if you have already used another wigglytuff's good neighbor poke-power this turn."
      const unownVHeal = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unownv' && normalized === 'once during your turn (before your attack), you may heal 20 damage from each of your pokemon. if you do, your turn ends.'
      const lopunnyHustleStep = source.name.toLowerCase() === 'lopunny' && normalized === 'once during your turn (before your attack), you may discard an energy card from your hand. if you do, heal 10 damage from each of your pokemon.'
      const nurseCall = source.name.toLowerCase() === 'blissey' && normalized === 'once during your turn (before your attack), you may discard a card from your hand. if you do, heal 20 damage from 1 of your pokemon.'
      const discardMetalPokemonHeal = normalized === 'once during your turn (before your attack), you may discard a metal pokemon from your hand. if you do, heal 100 damage from this pokemon.'
      const discardPokemonHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, you may discard a pokemon from your hand\. if you do, heal (\d+) damage from this pokemon\.$/)
      const regiHeal = source.name.toLowerCase() === 'registeel' && normalized === 'once during your turn (before your attack), you may discard 2 cards from your hand. then, heal 30 damage from registeel.'
      const gooeyRegeneration = normalized === 'as often as you like during your turn (before your attack), you may discard an energy attached to this pokemon. if you do, heal 60 damage from this pokemon.'
      const purifyingFire = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'hoohex' && normalized === 'once during your turn (before your attack), if this pokemon has any basic fire energy attached to it, you may heal 50 damage from it.'
      const sceptileNurtureAndHeal = source.name.toLowerCase() === 'sceptile' && normalized === 'once during your turn (before your attack), you may attach a grass energy card from your hand to 1 of your pokemon. if you do, heal 30 damage from that pokemon.'
      const garganaclFightingEnergyHeal = source.name.toLowerCase() === 'garganacl' && normalized === 'once during your turn, you may attach a basic {f} energy card from your discard pile to 1 of your pokemon. if you attached energy to a pokemon in this way, heal 30 damage from that pokemon.'
      const shuckleEnergyHeal = source.name.toLowerCase() === 'shuckle' && normalized === 'once during your turn, if this pokemon has any {g} energy attached, you may use this ability. heal 30 damage from 1 of your pokemon.'
      const arbolivaEnergyHeal = source.name.toLowerCase() === 'arboliva' && normalized === 'once during your turn, you may heal 60 damage from 1 of your pokemon ex that has any energy attached. if you do, discard a random energy from that pokemon.'
      const deltaHeal = source.name.toLowerCase().includes('espeon') && normalized === 'once during your turn (before your attack), you may heal 10 damage from each of your pokemon that has δ on its card.'
      const shayminExBenchBasicHeal = source.name.toLowerCase() === 'shaymin-ex' && normalized === 'once during your turn (before your attack), you may heal 20 damage from each of your benched basic pokemon.'
      const ludicoloCheerfulVoice = source.name.toLowerCase() === 'ludicolo' && normalized === 'once during your turn, if you have any {g} mega evolution pokemon ex in play, you may use this ability. heal 60 damage from 1 of your pokemon.'
      const quagsireWaterHeal = source.name.toLowerCase() === 'quagsire' && normalized === 'once during your turn (before your attack), if quagsire is your active pokemon and the defending pokemon has any water energy attached to it, you may heal 30 damage from quagsire.'
      const butterfreeMiraculousPowder = normalized === 'once during your turn (before your attack), you may remove all special conditions from your active pokemon.'
      const floralBreeze = source.name.toLowerCase() === 'florges break' && normalized === 'once during your turn (before your attack), you may heal 30 damage and remove a special condition from your active pokemon.'
      const blisseyHappiness = source.name.toLowerCase() === 'blissey' && normalized === 'once during your turn (before your attack), you may remove a special condition from your active pokemon.'
      const unownHeal = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unownh' && normalized === 'once during your turn (before your attack), if you have unown h, unown e, unown a, and unown l on your bench, you may choose 1 of your active pokemon and remove all special conditions from it.'
      const clefablePsychicRecovery = normalized === "once during your turn, if your active pokemon has any psychic energy attached, you may heal 20 damage from it, and it recovers from a special condition."
      const specialConditionRecovery = normalized === 'once during your turn (before your attack), if wigglytuff is on your bench, you may choose 1 of your active pokemon and remove 1 special condition from it.' || butterfreeMiraculousPowder || floralBreeze || blisseyHappiness || unownHeal || clefablePsychicRecovery
      const busybodyNurse = normalized === 'once during your turn, you may use this ability. your active pokemon recovers from all special conditions.'
      const busybodyHand = normalized === 'once during your turn (before your attack), if this pokemon is in your hand, you may reveal it. if you do, heal 10 damage and remove a special condition from your active pokemon. then, discard this pokemon.'
      const benchActiveHeal = normalized.match(/^once during your turn \(before your attack\), if this pokemon is on your bench, you may heal (\d+) damage from your active pokemon\.$/)
      const namedSelfHeal = normalized.match(/^once during your turn(?: \(before your attack\))?, (?:you may )?heal (\d+) damage from ([a-z0-9 .'-]+)\.$/)
      const sourceName = source.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
      const isNamedSelfHeal = Boolean(namedSelfHeal && namedSelfHeal[2] === sourceName)
      const healAmount = activeHeal?.[1] || activeSelfHeal?.[1] || coinActiveHeal?.[1] || coinAnyHeal?.[1] || activeEnergyHeal?.[1] || grassEnergyHeal?.[1] || activeAnyHeal?.[1] || activeTypedHeal?.[1] || (activeGrassHeal || activeEvolutionHeal || clefablePsychicRecovery || goodNeighborHeal ? '20' : undefined) || anyHeal?.[1] || benchedHeal?.[1] || eachHeal?.[1] || (shayminExBenchBasicHeal ? '20' : undefined) || (ludicoloCheerfulVoice ? '60' : undefined) || (quagsireWaterHeal ? '30' : undefined) || (deltaHeal || xatuActiveHeal ? '10' : undefined) || (goodraVstarHeal ? '9999' : undefined) || (coinHealEach || lopunnyHustleStep || blisseyEnergyHeal ? '10' : undefined) || (unownVHeal || nurseCall ? '20' : undefined) || (discardPokemonHeal?.[1] || (discardMetalPokemonHeal ? '100' : undefined)) || (arbolivaEnergyHeal ? '60' : undefined) || (regiHeal || sceptileNurtureAndHeal || garganaclFightingEnergyHeal || shuckleEnergyHeal ? '30' : undefined) || benchActiveHeal?.[1] || (isNamedSelfHeal ? namedSelfHeal?.[1] : undefined) || (gooeyRegeneration ? '60' : undefined) || (busybodyHand ? '10' : undefined) || (floralBreeze ? '30' : undefined) || (purifyingFire ? '50' : undefined) || (specialConditionRecovery || busybodyNurse ? '0' : undefined)
      if (vstarPower && (state.player.usedVstarPower || ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId))) return []
      if (sceptileNurtureAndHeal && (state.player.selectedEnergy?.toLowerCase() !== 'grass' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap)) return []
      if (garganaclFightingEnergyHeal && (state.player.selectedEnergy?.toLowerCase() !== 'fighting' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap)) return []
      if (shuckleEnergyHeal && (state.player.selectedEnergy?.toLowerCase() !== 'grass' || state.player.energy < 1 || ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId))) return []
      if (arbolivaEnergyHeal && (state.player.energy < 1 || ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId))) return []
      if (deltaHeal && ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId)) return []
      if (shayminExBenchBasicHeal && ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId)) return []
      if (ludicoloCheerfulVoice && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && /^mega\b/i.test(card.name) && /\bex\b/i.test(card.name) && card.types.some((type) => type.toLowerCase() === 'grass'))) return []
      if (quagsireWaterHeal && (state.opponent.energy < 1 || state.opponent.selectedEnergy?.toLowerCase() !== 'water' || !state.opponent.front.some((card) => card.currentHp > 0))) return []
      if (!healAmount) return []
      if (goodNeighborHeal && (!state.player.back.some((card) => card.instanceId === source.instanceId) || !state.player.front.some((card) => card.currentHp > 0) || !state.opponent.front.some((card) => card.currentHp > 0))) return []
      if (activeEvolutionHeal && ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId)) return []
      if (purifyingFire && ![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId)) return []
      if (lopunnyHustleStep && (source.statusConditions?.length || !state.player.hand.some((card) => card.subtypes.some((subtype) => ['basic', 'special'].includes(subtype.toLowerCase()))))) return []
      if ((discardPokemonHeal || discardMetalPokemonHeal || regiHeal || nurseCall) && state.player.hand.length < (regiHeal ? 2 : 1)) return []
      if (discardMetalPokemonHeal && !state.player.hand.some((card) => card.types.some((type) => type.toLowerCase() === 'metal'))) return []
      if (unownVHeal && (![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length)) return []
      if (activeAnyHeal && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (activeSelfHeal && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (activeEnergyHeal && (!state.player.front.some((card) => card.instanceId === source.instanceId) || state.player.energy < 1)) return []
      if (grassEnergyHeal && (state.player.energy < 1 || state.player.selectedEnergy?.toLowerCase() !== grassEnergyHeal[2])) return []
      if (benchActiveHeal && !state.player.back.some((card) => card.instanceId === source.instanceId)) return []
      if (unownHeal && !['h', 'e', 'a', 'l'].every((letter) => state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === `unown${letter}`))) return []
      if (specialConditionRecovery && !butterfreeMiraculousPowder && !floralBreeze && !blisseyHappiness && !unownHeal && !clefablePsychicRecovery && (!state.player.back.some((card) => card.instanceId === source.instanceId) || source.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim() !== 'wigglytuff')) return []
      if (clefablePsychicRecovery && (state.player.energy < 1 || state.player.selectedEnergy?.toLowerCase() !== 'psychic')) return []
      if (specialConditionGate && source.statusConditions?.length) return []
      if (basicStatusGate && source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))) return []
      const candidateTargets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0)
      const targetTypeRaw = eachHeal?.[2] || anyHeal?.[2]
      const targetType = targetTypeRaw?.startsWith('{') ? ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', f: 'fighting', m: 'metal', d: 'darkness', y: 'fairy', c: 'colorless' } as Record<string, string>)[targetTypeRaw.slice(1, -1)] : targetTypeRaw
      let healTargets = vstarPower && eachHeal ? state.player.back.filter((card) => card.currentHp > 0 && card.currentHp < card.hp && card.types.some((type) => type.toLowerCase() === 'grass')) : deltaHeal ? candidateTargets.filter((card) => card.currentHp < card.hp && (card.name.includes('δ') || card.name.toLowerCase().includes('delta'))) : shayminExBenchBasicHeal ? state.player.back.filter((card) => card.currentHp > 0 && card.currentHp < card.hp && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) : xatuActiveHeal ? state.player.front.filter((card) => card.currentHp > 0 && card.currentHp < card.hp) : blisseyEnergyHeal || benchedHeal ? state.player.back.filter((card) => card.currentHp > 0 && card.currentHp < card.hp) : clefablePsychicRecovery ? state.player.front.filter((card) => card.currentHp > 0 && (card.currentHp < card.hp || card.statusConditions?.length)) : activeGrassHeal || activeTypedHeal ? state.player.front.filter((card) => card.currentHp > 0 && card.currentHp < card.hp && card.types.some((type) => type.toLowerCase() === (activeGrassHeal ? 'grass' : activeTypedHeal?.[2]))) : activeEvolutionHeal ? state.player.front.filter((card) => card.currentHp > 0 && card.currentHp < card.hp && Boolean(card.evolutionStack?.length)) : specialConditionRecovery || busybodyNurse || busybodyHand ? state.player.front.filter((card) => card.currentHp > 0 && (card.statusConditions?.length || (busybodyHand || floralBreeze) && card.currentHp < card.hp)) : coinHealEach || unownVHeal || coinAnyHeal ? candidateTargets.filter((card) => card.currentHp < card.hp) : discardPokemonHeal || discardMetalPokemonHeal || regiHeal || isNamedSelfHeal || activeSelfHeal || gooeyRegeneration || purifyingFire || goodraVstarHeal || quagsireWaterHeal ? [source] : garganaclFightingEnergyHeal ? candidateTargets : eachHeal || anyHeal || activeEnergyHeal || grassEnergyHeal || activeAnyHeal || activeSelfHeal || nurseCall || sceptileNurtureAndHeal || arbolivaEnergyHeal || ludicoloCheerfulVoice
        ? candidateTargets.filter((card) => (!arbolivaEnergyHeal || card.subtypes.some((subtype) => subtype.toLowerCase().replace(/[^a-z0-9]/g, '') === 'ex')) && (!targetType || card.types.some((type) => type.toLowerCase() === targetType)) && (!anyHeal?.[3] || card.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') !== anyHeal[3].toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '')))
        : target ? [target] : []
      if (goodNeighborHeal) healTargets = [...state.player.front.map((card) => ({ card, side: 'player' as const })), ...state.opponent.front.map((card) => ({ card, side: 'opponent' as const }))].filter(({ card, side }) => card.currentHp > 0 && card.currentHp < card.hp && !isTcgBattleHealingPreventedForTarget(state, side, card)).map(({ card }) => card)
      if (!garganaclFightingEnergyHeal && !healTargets.some((card) => card.currentHp < card.hp || (specialConditionRecovery || busybodyNurse || busybodyHand) && card.statusConditions?.length)) return []
      if ((gooeyRegeneration || purifyingFire || blisseyEnergyHeal) && state.player.energy < 1 || purifyingFire && state.player.selectedEnergy?.toLowerCase() !== 'fire') return []
      const usageKey = shared ? `shared:${ability.name}` : `${abilityIndex}:${ability.name}`
      const alreadyUsed = shared
        ? [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.[usageKey] === state.turnNumber)
        : source.abilityUses?.[usageKey] === state.turnNumber
      if (alreadyUsed) return []
      return [{ source, ability, abilityIndex, healAmount: Number(healAmount), healsEach: Boolean(eachHeal || deltaHeal || shayminExBenchBasicHeal || coinHealEach || unownVHeal || lopunnyHustleStep || xatuActiveHeal || goodNeighborHeal), bothActiveHeal: goodNeighborHeal, targetAny: Boolean(anyHeal || coinAnyHeal || blisseyEnergyHeal || benchedHeal || activeEnergyHeal || grassEnergyHeal || activeAnyHeal || activeSelfHeal || activeGrassHeal || activeTypedHeal || activeEvolutionHeal || specialConditionRecovery || busybodyNurse || busybodyHand || nurseCall || sceptileNurtureAndHeal || garganaclFightingEnergyHeal || shuckleEnergyHeal || arbolivaEnergyHeal || shayminExBenchBasicHeal || quagsireWaterHeal), healTargetType: activeGrassHeal ? 'grass' : activeTypedHeal?.[2] || targetType || null, excludedTargetName: anyHeal?.[3] || null, activeGrassOnly: Boolean(activeGrassHeal || activeTypedHeal), activeEvolutionOnly: activeEvolutionHeal, benchTargetOnly: Boolean(blisseyEnergyHeal || benchedHeal || shayminExBenchBasicHeal || vstarPower && eachHeal), shared, energyRequired: Boolean(activeEnergyHeal || grassEnergyHeal || gooeyRegeneration || purifyingFire || clefablePsychicRecovery || blisseyEnergyHeal || shuckleEnergyHeal || arbolivaEnergyHeal), energyType: purifyingFire ? 'fire' : grassEnergyHeal ? grassEnergyHeal[2] : shuckleEnergyHeal ? 'grass' : clefablePsychicRecovery ? 'psychic' : garganaclFightingEnergyHeal ? 'fighting' : undefined, energyFromDiscard: garganaclFightingEnergyHeal, discardPokemon: Boolean(discardPokemonHeal || discardMetalPokemonHeal || regiHeal || nurseCall), discardPokemonType: discardMetalPokemonHeal ? 'metal' : undefined, discardPokemonCount: regiHeal ? 2 : 1, discardEnergy: gooeyRegeneration || arbolivaEnergyHeal, discardEnergyFromHand: lopunnyHustleStep, selfOnly: Boolean(discardPokemonHeal || discardMetalPokemonHeal || regiHeal || isNamedSelfHeal || activeSelfHeal || gooeyRegeneration || purifyingFire || unownVHeal || goodraVstarHeal || quagsireWaterHeal), specialConditionRecovery: specialConditionRecovery || busybodyNurse || busybodyHand, recoverAllConditions: busybodyNurse, handSource: busybodyHand, clefablePsychicRecovery }]
    }))
}

function parseTcgBattleDirectAbilityDraw(text: string): { count: number; activeBonus: number; activeOnly: boolean; knockoutGate: boolean; specialConditionGate: boolean; shared: boolean; endsTurn: boolean; refillTarget?: number; vstarPower?: boolean; damageCounters?: number; energyType?: string; requiredName?: string; requiredBenchNames?: string[]; requiredHandSize?: number; maximumHandSize?: number; benchPlayOnly?: boolean; knockoutAfterDraw?: boolean; shuffleSourceIntoDeckAfterDraw?: boolean; discardHandToBottom?: boolean } | null {
  let normalized = text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  if (normalized === 'once during your turn, you may put 1 damage counter on this pokemon. if you do, draw a card.') return { count: 1, activeBonus: 0, activeOnly: false, knockoutGate: false, specialConditionGate: false, shared: false, endsTurn: false, damageCounters: 1 }
  const shared = /(?:you )?can't use more than 1 [^.]+ (?:ability|power|pok[eé]-power) each turn\./.test(normalized)
  normalized = normalized.replace(/\s+(?:you )?can't use more than 1 [^.]+ (?:ability|power|pok[eé]-power) each turn\./, '')
  const specialConditionGate = /(?:this power|this ability) can't be used if [^.]+ affected by a special condition\./.test(normalized)
  normalized = normalized.replace(/\s+(?:this power|this ability) can't be used if [^.]+ affected by a special condition\./, '')
  const knockoutGate = /, if any of your pokemon were knocked out during your opponent's last turn,/.test(normalized)
  normalized = normalized.replace(/, if any of your pokemon were knocked out during your opponent's last turn,/, ',')
  const endsTurn = /if you use this ability, your turn ends\.$/.test(normalized)
  normalized = normalized.replace(/ if you use this ability, your turn ends\.$/, '')
  const vstarPower = /\(you can't use more than 1 vstar power in a game\.\)$/.test(normalized)
  normalized = normalized.replace(/\s+\(you can't use more than 1 vstar power in a game\.\)$/, '')
  if (normalized === 'once during your turn, you may draw 3 cards. if you drew any cards in this way, shuffle this pokemon and all attached cards into your deck.') return { count: 3, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, shuffleSourceIntoDeckAfterDraw: true }
  if (/^once during your turn \(before your attack\), if snorlax is your active pokemon, you may draw cards until you have 6 cards in your hand\. if you do, snorlax is now asleep\.$/.test(normalized)) return { count: 0, activeBonus: 0, activeOnly: true, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: 6 }
  const lowHandRefill = normalized.match(/^once during your turn \(before your attack\), if you have less than (\d+) cards in your hand, you may draw cards until you have (\d+) cards in your hand\.$/)
  if (lowHandRefill) return { count: 0, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: Number(lowHandRefill[2]), maximumHandSize: Number(lowHandRefill[1]) - 1 }
  const handRefill = normalized.match(/^(?:once during your turn(?: \(before your attack\))?|during your turn), you may draw cards until you have (\d+) cards in your hand\.$/)
  if (handRefill) return { count: 0, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: Number(handRefill[1]), vstarPower }
  if (normalized === 'you must put a card from your hand on the bottom of your deck in order to use this ability. once during your turn, you may draw cards until you have 5 cards in your hand.') return { count: 0, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: 5, discardHandToBottom: true }
  const activeRefill = normalized.match(/^once during your turn, if this pokemon is in the active spot, you may draw cards until you have (\d+) cards in your hand\.$/)
  if (activeRefill) return { count: 0, activeBonus: 0, activeOnly: true, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: Number(activeRefill[1]) }
  if (/^once during your turn \(before your attack\), you may draw cards until you have 7 cards in your hand\. if you drew any cards in this way, this pokemon is knocked out\.$/.test(normalized)) return { count: 0, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: 7, knockoutAfterDraw: true }
  if (normalized === 'when you play this pokemon from your hand onto your bench, you may draw cards until you have 6 cards in your hand.') return { count: 0, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared: false, endsTurn, refillTarget: 6, benchPlayOnly: true }
  if (normalized === 'once during your turn (before your attack), you may discard a grass energy card from your hand. if you do, draw 3 cards.') return { count: 3, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, energyType: 'g' }
  if (/^once during your turn \(before your attack\), if you have unown o, unown n, and unown e on your bench and you have 1 card left in your hand, you may draw cards until you have 7 cards in your hand\.$/.test(normalized)) return { count: 0, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, refillTarget: 7, requiredBenchNames: ['unowno', 'unownn', 'unowne'], requiredHandSize: 1 }
  const lunarCycle = /^once during your turn, if you have solrock in play, you may discard a basic \{f\} energy card from your hand in order to use this ability\. draw 3 cards\.$/.test(normalized)
  if (lunarCycle) return { count: 3, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared: true, endsTurn, energyType: 'f', requiredName: 'solrock' }
  if (/^once during your turn \(before your attack\), you may discard 1 energy card from your hand\. then draw up to 3 cards from your deck\.$/.test(normalized)) return { count: 3, activeBonus: 0, activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn, energyType: 'any' }
  const activeBonus = normalized.match(/^(once during your turn(?: \(before your attack\))?), (?:you may )?draw (a|one|\d+) cards?\. if this pokemon is (?:in the active spot|your active pokemon), draw (a|one|\d+) more cards?\.$/)
  if (activeBonus) return { count: activeBonus[2] === 'a' || activeBonus[2] === 'one' ? 1 : Number(activeBonus[2]), activeBonus: activeBonus[3] === 'a' || activeBonus[3] === 'one' ? 1 : Number(activeBonus[3]), activeOnly: false, knockoutGate, specialConditionGate, shared, endsTurn }
  const match = normalized.match(/^once during your turn(?: \(before your attack\))?(?:, if this pokemon is (in the active spot|your active pokemon))?, (?:you may use this ability\. )?(?:you may )?draw (a|one|\d+) cards?\.$/)
  return match ? { count: match[2] === 'a' || match[2] === 'one' ? 1 : Number(match[2]), activeBonus: 0, activeOnly: Boolean(match[1]), knockoutGate, specialConditionGate, shared, endsTurn } : null
}

function getTcgBattleTopDeckPickCount(text: string) {
  const normalized = text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  const discardRestPick = normalized.match(/^once during your turn \(before your attack\), you may look at the top (\d+) cards? of your deck, choose 1 of them, and put it into your hand\. discard the other \d+ cards?\. this power can't be used if .+ is affected by a special condition\.$/)
  if (discardRestPick) return Number(discardRestPick[1])
  if (/^once during your turn \(before your attack\), you may look at the top 4 cards of your deck, choose 1 of them, and put it into your hand\. put the 3 other cards on the bottom of your deck in any order\. this power can't be used if metagross is affected by a special condition\.$/.test(normalized)) return 4
  if (normalized === "once during your turn (before your attack), if jirachi is your active pokemon, you may look at the top 5 cards of your deck, choose 1 of them, and put it into your hand. shuffle your deck afterward. jirachi and your other active pokemon, if any, are now asleep. this power can't be used if jirachi is affected by a special condition.") return 5
  return Number((/^once during your turn \(before your attack\), you may look at the top 2 cards of your deck, choose 1 of them, and put it into your hand\. put the other card on the bottom of your deck\. this power can't be used if uxie is affected by a special condition\. you can't use more than 1 trade off poke-power each turn\.$/.test(normalized) ? 2 : undefined) || normalized.match(/^once during your turn(?: \(before your attack\))?, you may look at the top (\d+) cards? of your deck, choose 1 of them, and put it into your hand\. discard the other \d+ cards?\.$/)?.[1] || normalized.match(/^once during your turn(?: \(before your attack\))?, you may look at the top (\d+) cards? of your deck, choose 1 of them, and put it into your hand\. put the other card back on top of your deck\.$/)?.[1] || normalized.match(/^once during your turn, if this pokemon is in the active spot, you may look at the top (\d+) cards? of your deck and put 1 of them into your hand\. put the other card back on top of your deck\.$/)?.[1] || normalized.match(/^once during your turn(?: \(before your attack\))?, you may look at the top (\d+) cards? of your deck and put 1 of them into your hand\. (?:discard the other cards?(?: into your discard pile)?|put the other cards? on the bottom of your deck|put the other card back on top of your deck)\.$/)?.[1] || (getTcgBattleTopDeckSearchSubtype(normalized) ? 6 : 0) || (/^once during your turn, if this pokemon is in the active spot, you may look at the top 2 cards of your deck and put 1 of them into your hand\. put the other card in the lost zone\.$/.test(normalized) ? 2 : 0))
}

function isTcgBattleJirachiWishMaker(name: string, text: string) {
  return name.toLowerCase() === 'jirachi' && getTcgBattleTopDeckPickCount(text) === 5 && text.toLowerCase().replace(/pokémon/g, 'pokemon').includes('jirachi and your other active pokemon')
}

function getTcgBattleIndexPermutations(count: number): number[][] {
  const build = (remaining: number[]): number[][] => remaining.length === 0
    ? [[]]
    : remaining.flatMap((value) => build(remaining.filter((candidate) => candidate !== value)).map((rest) => [value, ...rest]))
  return build(Array.from({ length: count }, (_, index) => index))
}

function getTcgBattleTopDeckSearchSubtype(text: string) {
  const normalized = text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  if (normalized === 'once during your turn, if this pokemon is in the active spot, you may look at the top 6 cards of your deck, reveal a pokemon you find there, and put it into your hand. shuffle the other cards back into your deck.') return 'pokemon'
  return undefined
}

function getTcgBattleAbilityDeckSearchEffect(text: string): { sharedKey: string; subtype?: string; requiredSubtype?: string; requiredType?: string; requiredTypes?: string[]; requiredEnergyType?: string; basicEnergyOnly?: boolean; requiredOpponentEnergyLead?: boolean; nameContains?: string; requiredNames?: string[]; requiredBenchNames?: string[]; excludedName?: string; attackNameContains?: string; noRuleBox?: boolean; evolutionOnly?: boolean; count: number; maxHp?: number; firstTurnOnly?: boolean; onlyIfGoesSecond?: boolean; knockoutGate?: boolean; upToCount?: boolean; requiredName?: string; requiredActiveAbilityName?: string; sharedLimit?: boolean; endsTurn?: boolean; putOnTop?: boolean; putOnBench?: boolean; activeOnly?: boolean; benchPlayOnly?: boolean; benchToActiveOnly?: boolean; specialConditionGate?: boolean; blockedStatuses?: string[]; energyCard?: boolean; handDiscardCount?: number; attachEnergyFromDeck?: boolean; requiresEmptyHand?: boolean; knockoutAnyGate?: boolean } | null {
  const normalized = text.replace(/<[^>]*>/g, ' ').replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  if (/search (?:your deck|your discard pile|your opponent's discard pile) for .*\b(?:trainer|supporter|stadium|item|pokemon tool)\b/.test(normalized)) return null
  if (normalized === "once during your turn (before your attack), you may search your deck for a pokemon that has δ on its card, show it to your opponent, and put it into your hand. shuffle your deck afterward. you can't use more than 1 delta sign poke-power each turn. this power can't be used if fearow is affected by a special condition.") return { sharedKey: 'delta sign', subtype: 'pokemon', nameContains: 'δ', count: 1, specialConditionGate: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a basic pokemon or evolution card, show it to your opponent, and put it into your hand. shuffle your deck afterward. this power can\'t be used if nidoqueen is affected by a special condition.') return { sharedKey: 'nidoqueen basic or evolution search', subtype: 'pokemon', count: 1, specialConditionGate: true }
  if (normalized === "once during your turn (before your attack), if any of your pokemon were knocked out during your opponent's last turn, search your deck for any 1 card and put it into your hand. shuffle your deck afterward. this power can't be used if slowking is affected by a special condition.") return { sharedKey: 'slowking knockout search', count: 1, knockoutAnyGate: true, specialConditionGate: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a basic energy card, show it to your opponent, and put it into your hand. shuffle your deck afterward. this power can\'t be used if aerodactyl is affected by a special condition.') return { sharedKey: 'aerodactyl basic energy search', subtype: 'energy', energyCard: true, basicEnergyOnly: true, count: 1, specialConditionGate: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a card. shuffle your deck, then put that card on top of your deck. this power can\'t be used if magcargo is affected by a special condition.') return { sharedKey: 'magcargo top deck search', count: 1, specialConditionGate: true, putOnTop: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for an evolution card. show it to your opponent and put it into your hand. shuffle your deck afterward. this power can\'t be used if dark dragonair is affected by a special condition.') return { sharedKey: 'dark dragonair evolution search', subtype: 'pokemon', evolutionOnly: true, count: 1, activeOnly: true, specialConditionGate: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for up to 2 basic energy cards, reveal them, and put them into your hand. then, shuffle your deck.') return { sharedKey: 'ribombee basic energy search', subtype: 'energy', energyCard: true, basicEnergyOnly: true, count: 2, upToCount: true }
  if (normalized === 'when you play this pokemon from your hand onto your bench during your turn, you may search your deck for up to 2 pokemon vmax and put them onto your bench. then, shuffle your deck. if you use this ability, your turn ends.') return { sharedKey: 'eternamax', requiredSubtype: 'vmax', count: 2, upToCount: true, sharedLimit: false, benchPlayOnly: true, putOnBench: true, endsTurn: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a team aqua pokemon, reveal it, and put it into your hand. shuffle your deck afterward.') return { sharedKey: 'team aqua search', subtype: 'pokemon', nameContains: 'team aqua', count: 1 }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a pokemon that has the nuzzle attack, reveal it, and put it into your hand. then, shuffle your deck.') return { sharedKey: 'nuzzle search', subtype: 'pokemon', attackNameContains: 'nuzzle', count: 1, sharedLimit: false }
  if (normalized === 'once during your turn, when you put unown from your hand onto your bench, you may search your deck for a darkness energy card, show it to your opponent, and put it into your hand. shuffle your deck afterward.') return { sharedKey: 'unown darkness energy search', subtype: 'energy', energyCard: true, requiredEnergyType: 'darkness', count: 1, benchPlayOnly: true, sharedLimit: false }
  if (normalized === 'once during your turn (before you attack), if you have unown j, unown o, unown i, and unown n on your bench, you may search your deck for a basic pokemon or evolution pokemon card. show that card to your opponent, then put it into your hand. shuffle your deck afterward.') return { sharedKey: 'unown join search', subtype: 'pokemon', requiredBenchNames: ['unownj', 'unowno', 'unowni', 'unownn'], count: 1, sharedLimit: false }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a team plasma card, reveal it, and put it into your hand. shuffle your deck afterward. you may not use an ability with the same name during your turn.') return { sharedKey: 'plasma search', requiredSubtype: 'team plasma', count: 1 }
  if (normalized === 'once during your turn, if your active pokemon has the festival lead ability, you may search your deck for a card and put it into your hand. then, shuffle your deck.') return { sharedKey: 'festival lead search', count: 1, sharedLimit: false, requiredActiveAbilityName: 'festival lead' }
  if (normalized === 'search your deck for an energy card and attach it to 1 of your benched pokemon. then, shuffle your deck.') return { sharedKey: 'bouncy-bounce charge', subtype: 'energy', energyCard: true, attachEnergyFromDeck: true, count: 1 }
  if (normalized === 'once during your turn, when this pokemon moves from your bench to the active spot, you may search your deck for up to 3 basic {g} energy cards and attach them to this pokemon. then, shuffle your deck.') return { sharedKey: 'buzzing boost', subtype: 'energy', requiredEnergyType: 'grass', energyCard: true, attachEnergyFromDeck: true, count: 3, upToCount: true, sharedLimit: false, benchToActiveOnly: true }
  if (normalized === "once during your turn (before your attack), you may count the total number of energy cards attached to all of your pokemon and all of your opponent's pokemon. if your opponent has more total energy cards attached, you may search your deck for 1 fire energy card and attach it to 1 of your benched pokemon, if any. shuffle your deck afterward. this power can't be used if typhlosion is affected by a special condition.") return { sharedKey: 'energy gap', subtype: 'energy', requiredEnergyType: 'fire', energyCard: true, attachEnergyFromDeck: true, count: 1, sharedLimit: false, specialConditionGate: true, requiredOpponentEnergyLead: true }
  if (normalized === "once during your turn (before your attack), you may put 2 cards from your hand into your deck. then, search your deck for an energy card, show it to your opponent, and put it into your hand. shuffle your deck afterward. this power can't be used if furret is affected by a special condition.") return { sharedKey: 'furret energy search', subtype: 'energy', energyCard: true, handDiscardCount: 2, count: 1, sharedLimit: false, specialConditionGate: true }
  if (normalized === "you can use this ability only if you go second. once during your first turn (before your attack), you may search your deck for a spewpa and a vivillon, reveal them, and put them into your hand. then, shuffle your deck.") return { sharedKey: 'vivillon spring', requiredNames: ['spewpa', 'vivillon'], count: 2, firstTurnOnly: true, onlyIfGoesSecond: true }
  if (/^when you play this pokemon from your hand onto your bench during your turn, you may search your deck for up to 3 flamigo, reveal them, and put them into your hand\. then, shuffle your deck\.$/.test(normalized)) return { sharedKey: 'insta-flock', nameContains: 'flamigo', count: 3, upToCount: true, sharedLimit: false, benchPlayOnly: true }
  if (/^when you play this pokemon from your hand onto your bench, you may search your deck for up to 3 pokemon-ex \(except for hoopa-ex\), reveal them, and put them into your hand\. shuffle your deck afterward\.$/.test(normalized)) return { sharedKey: 'scoundrel ring', requiredSubtype: 'ex', excludedName: 'hoopa-ex', count: 3, upToCount: true, sharedLimit: false, benchPlayOnly: true }
  if (normalized === "once during your turn (before your attack), you may search your deck for a pokemon that isn't a pokemon-gx or pokemon-ex, reveal it, and put it into your hand. then, shuffle your deck.") return { sharedKey: 'queen’s call', noRuleBox: true, count: 1 }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a pokemon that has the nuzzle attack, reveal it, and put it into your hand. then, shuffle your deck.') return { sharedKey: 'nuzzly gathering', attackNameContains: 'nuzzle', count: 1 }
  if (/^once during your turn \(before your attack\), you may search your deck for a grass pokemon, show it to your opponent, and put it into your hand\. shuffle your deck afterward\. this power can't be used if sunflora is affected by a special condition\.$/.test(normalized)) return { sharedKey: 'sunshine grace', subtype: 'grass', count: 1, sharedLimit: false, specialConditionGate: true }
  if (/^once during your turn \(before your attack\), you may search your deck for a grass pokemon, reveal it, and put it into your hand\. then, shuffle your deck\.$/.test(normalized)) return { sharedKey: 'grass pokemon search', subtype: 'grass', count: 1 }
  if (normalized === 'you must discard 2 cards from your hand in order to use this ability. once during your turn, you may search your deck for a galarian perrserker, reveal it, and put it into your hand. then, shuffle your deck.') return { sharedKey: 'evolution roar', nameContains: 'galarian perrserker', count: 1, sharedLimit: false }
  if (/^once during your turn \(before your attack\), you may search your deck for a pokemon, reveal it, and put it into your hand\. shuffle your deck afterward\.$/.test(normalized)) return { sharedKey: 'floral scent', subtype: 'pokemon', count: 1, sharedLimit: false }
  if (/^once during your turn \(before your attack\), you may search your deck for a dragon pokemon, reveal it, and put it into your hand\. shuffle your deck afterward\.$/.test(normalized)) return { sharedKey: 'dragon call', requiredType: 'dragon', count: 1, sharedLimit: false }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a fairy pokemon, reveal it, and put it into your hand. then, shuffle your deck.') return { sharedKey: 'illuminate', requiredType: 'fairy', count: 1, sharedLimit: false }
  if (/^once during your turn, you may search your deck for a card and put it into your hand\. then, shuffle your deck\. you can't use more than 1 quick search ability each turn\.$/.test(normalized)) return { sharedKey: 'quick search', count: 1 }
  if (/^once during your turn, you may search your deck for a rapid strike card, reveal it, and put it into your hand\. then, shuffle your deck\. you can't use more than 1 rapid strike search ability each turn\.$/.test(normalized)) return { sharedKey: 'rapid strike search', subtype: 'rapid strike', count: 1 }
  if (/^once during your turn \(before your attack\), you may search your deck for a grass pokemon, show it to your opponent, and put it into your hand\. shuffle your deck afterward\. this power can't be used if beedrill is affected by a special condition\.$/.test(normalized)) return { sharedKey: 'beedrill flutter wings', subtype: 'grass', count: 1, sharedLimit: false, specialConditionGate: true }
  if (/^once during your turn \(before your attack\), you may search your deck for an evolution card\. show it to your opponent and put it into your hand\. shuffle your deck afterward\. this power can't be used if dark dragonair is asleep, confused, or paralyzed\.$/.test(normalized)) return { sharedKey: 'evolutionary light', evolutionOnly: true, count: 1, sharedLimit: false, activeOnly: true, blockedStatuses: ['asleep', 'confused', 'paralyzed'] }
  if (/^once during your turn, you may search your deck for up to 2 evolution \{m\} pokemon, reveal them, and put them into your hand\. then, shuffle your deck\.$/.test(normalized)) return { sharedKey: 'metallic signal', requiredType: 'metal', evolutionOnly: true, count: 2, upToCount: true }
  if (/^once during your first turn, you may search your deck for up to 3 \{c\} pokemon with 100 hp or less, reveal them, and put them into your hand\. then, shuffle your deck\. you can't use more than 1 fan call ability during your turn\.$/.test(normalized)) return { sharedKey: 'fan call', subtype: 'colorless', count: 3, maxHp: 100, firstTurnOnly: true }
  if (/^once during your turn \(before your attack\), if 1 of your pokemon-gx or pokemon-ex was knocked out during your opponent's last turn, you may search your deck for up to 2 cards and put them into your hand\. then, shuffle your deck\. you can't use more than 1 cat walk ability each turn\.$/.test(normalized)) return { sharedKey: 'cat walk', count: 2, knockoutGate: true, upToCount: true }
  if (/^once during your turn \(before your attack\), if you have garchomp in play, you may search your deck for a card and put it into your hand\. then, shuffle your deck\.$/.test(normalized)) return { sharedKey: 'lucario garchomp search', count: 1, requiredName: 'garchomp', sharedLimit: false }
  if (/^once during your turn \(before your attack\), if team magma's mightyena is your active pokemon, you may search your deck for a pokemon with team magma in its name, show it to your opponent, and put it into your hand\. shuffle your deck afterward\. this power can't be used if team magma's mightyena is affected by a special condition\.$/.test(normalized)) return { sharedKey: 'team magma call for help', count: 1, nameContains: 'team magma', sharedLimit: false, activeOnly: true, specialConditionGate: true }
  if (/^once during your turn, you may search your deck for an item card, reveal it, and put it into your hand\. then, shuffle your deck\. if you use this ability, your turn ends\.$/.test(normalized)) return { sharedKey: 'dream gift', count: 1, endsTurn: true }
  if (/^once during your turn, if this pokemon is in the active spot, you may use this ability\. search your deck for a card\. shuffle your deck, then put that card on top of it\.$/.test(normalized)) return { sharedKey: 'crobat top search', count: 1, activeOnly: true, putOnTop: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a card. shuffle your deck, then put that card on top of it.') return { sharedKey: 'diving search', count: 1, sharedLimit: false, putOnTop: true }
  if (normalized === 'once during your turn (before your attack), you may search your deck for a card, shuffle your deck, then put that card on top of it.') return { sharedKey: 'smooth over', count: 1, sharedLimit: false, putOnTop: true }
  return null
}

function getUsableDrawAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.lastAction?.abilityEffect === 'handBottomPending') return []
  return [...state.player.front, ...state.player.back, ...state.player.hand]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim()
      const slakingLazyBlow = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'slaking' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), if slaking is your active pokemon, you may flip a coin. if heads, slaking's lazy blow attack's base damage is 130 during this turn. if tails, slaking can't attack or retreat during this turn. (if slaking is no longer your active pokemon, this effect ends)." && state.player.front.some((card) => card.instanceId === source.instanceId)
      const blisseyKindEgg = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), if happiny is anywhere under blissey, you may choose a number of cards in your hand up to the amount of energy attached to blissey and put those cards on top of your deck. shuffle your deck afterward. then, draw that many cards. this power can't be used if blissey is affected by a special condition." && Boolean(source.evolutionStack?.some((card) => card.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'happiny')) && !source.statusConditions?.length && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && state.player.energy > 0 && state.player.hand.length > 0
      const pitchPyukumuku = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'pyukumuku' && text.replace(/\s+/g, ' ').trim() === "once during your turn, if this pokemon is in your hand, you may reveal it and put it on the bottom of your deck. if you do, draw a card. you can't use more than 1 pitch a pyukumuku ability each turn."
      const sourceIsInHand = state.player.hand.some((card) => card.instanceId === source.instanceId)
      const electabuzzBottomDraw = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'electabuzz' && text === "once during your turn (before your attack), if electabuzz is an evolved pokemon, you may draw a card from the bottom of your deck. this power can't be used if electabuzz is affected by a special condition." && Boolean(source.evolutionStack?.length) && !source.statusConditions?.length && state.player.deck.length > 0
      const jellicentDeepSeaDraw = source.name.toLowerCase() === 'jellicent' && text.replace(/\s+/g, ' ').trim() === 'once during your turn, you may use this ability. draw a card. if you do, you may put a card from your hand on the bottom of your deck.'
      const talonflameSkyHunt = source.name.toLowerCase() === 'talonflame' && text.replace(/\s+/g, ' ').trim() === "once during your turn, you may use this ability. flip a coin. if heads, discard a random card from your opponent's hand."
      if (sourceIsInHand && !pitchPyukumuku) return []
      const directDraw = electabuzzBottomDraw || jellicentDeepSeaDraw ? { count: 1, activeBonus: 0, activeOnly: false, knockoutGate: false, specialConditionGate: false, shared: false, endsTurn: false } : parseTcgBattleDirectAbilityDraw(text) || (slakingLazyBlow || blisseyKindEgg ? { count: 0, activeBonus: 0, activeOnly: slakingLazyBlow, knockoutGate: false, specialConditionGate: false, shared: false, endsTurn: false } : null)
      const giratinaLetLoose = source.name.toLowerCase() === 'giratina' && text.replace(/\s+/g, ' ').trim() === 'once during your turn, when you put giratina from your hand onto your bench, you may use this power. each player shuffles his or her hand into his or her deck and draws up to 4 cards. (you draw your cards first).'
      const marshadowLetLoose = source.name.toLowerCase() === 'marshadow' && text.replace(/\s+/g, ' ').trim() === 'when you play this pokemon from your hand onto your bench during your turn, you may have each player shuffle their hand into their deck and draw 4 cards.'
      const metagrossExHandShuffle = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'metagrossex' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), if metagross ex is your active pokemon, you may use this power. each player shuffles his or her hand into his or her deck. then, each player draws 4 cards. this power can't be used if metagross ex is affected by a special condition." && state.player.front.some((card) => card.instanceId === source.instanceId) && !source.statusConditions?.length && (state.player.hand.length + state.player.deck.length > 0 || state.opponent.hand.length + state.opponent.deck.length > 0)
      const unownDDraw = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unownd' && text === 'once during your turn (before your attack), if unown d is on your bench, you may flip a coin. if heads, each player may draw a card. (you draw your card first.)' && state.player.back.some((card) => card.instanceId === source.instanceId)
      const opponentHandShuffleDraw = source.name.toLowerCase() === 'gothitelle' && text === "once during your turn, if this pokemon is in the active spot, you may have your opponent shuffle their hand into their deck and draw 3 cards." && state.player.front.some((card) => card.instanceId === source.instanceId) && (state.opponent.hand.length > 0 || state.opponent.deck.length > 0)
      const claydolHandDraw = source.name.toLowerCase() === 'claydol' && text === "once during your turn (before your attack), if claydol is your active pokemon, you may shuffle your hand into your deck. then, draw a number of cards equal to the number of cards in your opponent's hand. this power can't be used if claydol is affected by a special condition." && state.player.front.some((card) => card.instanceId === source.instanceId) && !source.statusConditions?.length && (state.player.hand.length > 0 || state.player.deck.length > 0) && state.opponent.hand.length > 0
      const sandFlap = source.name.toLowerCase() === 'flygon' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may choose either player. that player shuffles his or her hand into his or her deck and draws 4 cards.'
      const energyTypes: Record<string, string> = { g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'metal', d: 'darkness', y: 'fairy', c: 'colorless', f: 'fighting' }
      const topDeckSearchSubtype = getTcgBattleTopDeckSearchSubtype(text)
      const topDeckPickCount = getTcgBattleTopDeckPickCount(text)
      const metagrossDeltaTopPick = source.name.toLowerCase() === 'metagross δ' && topDeckPickCount === 4 && text.toLowerCase().includes('put the 3 other cards on the bottom of your deck in any order')
      const jirachiWishMaker = isTcgBattleJirachiWishMaker(source.name, text)
      const uxieLvXTradeOff = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'uxielvx' && topDeckPickCount === 2
      const orbeetleBugRadar = source.name.toLowerCase() === 'orbeetle' && text === "once during your turn, you may look at the top 3 cards of your opponent's deck and put them back in any order." && (state.battleMode === 'pvp' || state.opponent.deck.length > 0)
      const machampTerraforming = source.name.toLowerCase() === 'machamp' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may look at the top 4 cards of your deck and rearrange them as you like. this power can't be used if machamp is affected by a special condition."
      const slowkingTemporalBackflow = source.name.toLowerCase() === 'slowking' && text.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may look at the top 3 cards of that player's deck and put them back on top of that player's deck in any order. this power can't be used if slowking is affected by a special condition."
      const lunatonePremonition = source.name.toLowerCase() === 'lunatone' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may look at the top 2 cards of your deck and put them back on top of your deck in any order.'
      const laprasGoForASwim = source.name.toLowerCase() === 'lapras' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may look at the top 2 cards of your deck and put them back in any order.' || source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unowna' && text === 'once during your turn (before your attack), if unown a is on your bench, you may look at the top 2 cards of your deck and put them back on top of your deck in any order.' && state.player.back.some((card) => card.instanceId === source.instanceId)
      const galladePremonition = source.name.toLowerCase() === 'gallade' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may look at the top 5 cards of your deck and put them back on top of your deck in any order.'
      const solrockPremonition = source.name.toLowerCase() === 'solrock' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), if you have lunatone in play, you may look at the top 3 cards of your deck and put them back on top of your deck in any order. this power can\'t be used if solrock is affected by a special condition.'
      const eachPlayerDraw = unownDDraw || giratinaLetLoose || marshadowLetLoose || metagrossExHandShuffle || /^once during your turn(?: \(before your attack\))?(?:, if this pokemon is (?:in the active spot|your active pokemon))?, (?:you may use this ability\. )?(?:you may have )?each player draws? a card\.$/.test(text.replace(/\s+/g, ' '))
      const madPartyDiscard = text === 'you must discard a pokemon that has the mad party attack from your hand in order to use this ability. once during your turn, you may draw 2 cards.'
      const evolutionRoar = text === 'you must discard 2 cards from your hand in order to use this ability. once during your turn, you may search your deck for a galarian perrserker, reveal it, and put it into your hand. then, shuffle your deck.'
      const mindHat = text === 'once during your turn, you may use this ability. each player discards a card from their hand. (your opponent discards first.)'
      const krookodileEnergyDiscard = (source.name.toLowerCase() === 'krookodile' && text === "once during your turn (before your attack), if this pokemon is your active pokemon, you may flip a coin. if heads, discard an energy attached to your opponent's active pokemon.") || (source.name.toLowerCase() === 'rampardos ex' && text === "once during your turn, if this pokemon is in the active spot, you may use this ability. flip a coin. if heads, discard an energy from your opponent's active pokemon.")
      const wingBuzz = source.name.toLowerCase() === 'ninjask' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), if this pokemon is your active pokemon, you may discard a card from your hand. if you do, discard the top card of your opponent's deck."
      const chandelureDeckDiscard = source.name.toLowerCase() === 'chandelure' && text.replace(/\s+/g, ' ').trim() === "once during your turn, you may discard the top card of your opponent's deck."
      const aipomDeckBottom = source.name.toLowerCase() === 'aipom' && text.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may put the top card of your opponent's deck on the bottom of their deck without looking at it." && state.opponent.deck.length > 0
      const sableyeTopDeckDiscard = source.name.toLowerCase() === 'sableye' && text.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may look at the top card of your deck. you may discard that card.'
      const morpekoTopDeckDiscard = source.name.toLowerCase() === 'morpeko' && text.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === 'once during your turn, you may look at the top card of your deck. you may discard that card.'
      const ninetalesFireDraw = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'ninetales' && text === "once during your turn (before your attack), you may discard a fire energy card from your hand. if you do, draw 3 cards. this power can't be used if ninetales is affected by a special condition."
      const salazzleFireDraw = source.name.toLowerCase() === 'salazzle' && text === 'once during your turn (before your attack), you may discard a fire energy card from your hand. if you do, draw 3 cards.'
      const radiantGreninjaDiscard = source.name.toLowerCase() === 'radiant greninja' && text === 'you must discard an energy card from your hand in order to use this ability. once during your turn, you may draw 2 cards.'
      const discardAndDraw = /once during your turn/.test(text) && /discard (?:a|\d+) cards? from your hand/.test(text) && /draw (?:a|one|\d+) cards?/.test(text) || madPartyDiscard || evolutionRoar || mindHat || wingBuzz || ninetalesFireDraw || radiantGreninjaDiscard || salazzleFireDraw
      const darkKadabraMatterExchange = text === "once during your turn (before your attack), you may discard a card from your hand in order to draw a card. this power can't be used if dark kadabra is asleep, confused, or paralyzed."
      const ultraBeastDiscard = /^once during your turn \(before your attack\), you may discard an ultra beast card from your hand\. if you do, draw 3 cards\.$/.test(text)
      const discardDrawMatch = text.match(/draw (a|one|\d+) cards?/)
      const discardDrawCount = radiantGreninjaDiscard ? 2 : ninetalesFireDraw || salazzleFireDraw ? 3 : discardDrawMatch ? discardDrawMatch[1] === 'a' || discardDrawMatch[1] === 'one' ? 1 : Number(discardDrawMatch[1]) : 0
      const discardCount = Number(text.match(/discard (\d+) cards from your hand/)?.[1] || 1)
      const discardHandEntry = text.match(/^when you play this pokemon from your hand onto your bench during your turn, you may discard your hand and draw (\d+) cards\. you can't use more than 1 dedechange ability each turn\.$/)
      const discardHandMatch = text.match(/^(once during your (first )?turn(?: \(before your attack\))?|during your turn), you may discard your hand and draw (a|one|\d+) cards?\.(?: \(you can't use more than 1 vstar power in a game\.\))?(?: you can't use more than 1 squawk and seize ability during your turn\.)?(?: if you use this ability, your turn ends\.)?$/)
      const discardHandDrawCount = discardHandEntry ? Number(discardHandEntry[1]) : discardHandMatch ? discardHandMatch[4] === 'a' || discardHandMatch[4] === 'one' ? 1 : Number(discardHandMatch[4]) : 0
      const discardHandFirstTurnOnly = Boolean(discardHandMatch?.[2])
      const discardHandVstar = text.includes("can't use more than 1 vstar power in a game")
      const discardHandShared = text.includes("can't use more than 1 squawk and seize ability during your turn") || Boolean(discardHandEntry)
      const discardHandEndsTurn = false
      const discardHandDraw = Boolean(discardHandMatch || discardHandEntry)
      const discardHandBenchPlayOnly = Boolean(discardHandEntry)
      const lilligantVstarSearch = source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'hisuianlilligantvstar' && text === "during your turn, you may search your deck for up to 5 in any combination of grass pokemon and grass energy cards, reveal them, and put them into your hand. then, shuffle your deck. (you can't use more than 1 vstar power in a game)."
      const vstarSearchCount = Number(text.match(/^during your turn, you may search your deck for up to (\d+) cards? and put them into your hand\. then, shuffle your deck\. \(you can't use more than 1 vstar power in a game\.\)$/)?.[1] || (lilligantVstarSearch ? 5 : 0))
      const gentleFin = /^once during your turn, if this pokemon is in the active spot, you may put a basic pokemon with 70 hp or less from your discard pile onto your bench\.$/.test(text)
      const discardBenchSearch = gentleFin || /^during your turn, you may put up to 2 colorless pokemon that don't have a rule box from your discard pile onto your bench\. \(pokemon v, pokemon-gx, etc\. have rule boxes\.\) \(you can't use more than 1 vstar power in a game\.\)$/.test(text)
      const abilityDeckSearch = getTcgBattleAbilityDeckSearchEffect(text)
      const searchCount = vstarSearchCount || (abilityDeckSearch?.count ?? 0)
      const searchDeck = searchCount > 0
      const energyAttachFromDeck = text.match(/^once during your turn, you may search your deck for a basic \{([grwlpmdycf])\} energy card and attach it to this pokemon\. then, shuffle your deck\.$/)
      const clefairyMoonWatch = source.name.toLowerCase() === 'clefairy' && text === 'once during your turn, if this pokemon is in the active spot, for each of your benched clefairy, you may search your deck for a psychic energy card and attach it to that clefairy. then, shuffle your deck.' && state.player.front.some((card) => card.instanceId === source.instanceId) && state.player.back.some((card) => card.currentHp > 0 && card.name.toLowerCase() === 'clefairy')
      const giratinaBrokenSpaceBellow = source.name.toLowerCase() === 'giratina ex' && text === 'once during your turn, you may take a {p} energy from your energy zone and attach it to this pokemon. if you use this ability, your turn ends.'
      const gardevoirPsyShadow = source.name.toLowerCase() === 'gardevoir' && text === 'once during your turn, you may take a {p} energy from your energy zone and attach it to the {p} pokemon in the active spot.'
      const energyZoneAttach = text.match(/^once during your turn, if this pokemon is in the active spot, you may take a \{([grwlpmdycf])\} energy from your energy zone and attach it to 1 of your \{([grwlpmdycf])\} pokemon\.$/) || (giratinaBrokenSpaceBellow || gardevoirPsyShadow ? [giratinaBrokenSpaceBellow ? 'broken-space-bellow' : 'psy-shadow', 'p', 'p'] as RegExpMatchArray : null)
      const modeledEnergyZoneAttach = energyZoneAttach
      if ((giratinaBrokenSpaceBellow || gardevoirPsyShadow) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      const rillaboomEnergySearch = /^once during your turn, you may search your deck for up to 2 grass energy cards and attach them to 1 of your pokemon\. then, shuffle your deck\.$/.test(text)
      const forretressEnergySearch = /^once during your turn, you may search your deck for up to 5 basic \{g\} energy cards and attach them to your pokemon in any way you like\. then, shuffle your deck\. if you searched your deck in this way, this pokemon is knocked out\.$/.test(text)
      const aromatissePsychicEnergySearch = source.name.toLowerCase() === 'aromatisse' && text === 'once during your turn, you may use this ability. search your deck for up to 2 basic {p} energy cards, reveal them, and put them into your hand. then, shuffle your deck.'
      const eldegossBasicEnergySearch = source.name.toLowerCase() === 'eldegoss' && text === 'once during your turn, you may search your deck for up to 2 basic energy cards, reveal them, and put them into your hand. then, shuffle your deck.'
      const ribombeeHoneyGather = source.name.toLowerCase() === 'ribombee' && text === 'once during your turn (before your attack), you may search your deck for up to 2 basic energy cards, reveal them, and put them into your hand. then, shuffle your deck.'
      const galarianBirdEnergy = source.name.toLowerCase() === 'galarian moltres' && text === 'when you play this pokemon from your hand onto your bench during your turn, you may attach up to 2 darkness energy cards from your hand to this pokemon.' ? 'darkness' : source.name.toLowerCase() === 'galarian zapdos' && text === 'when you play this pokemon from your hand onto your bench during your turn, you may attach up to 2 fighting energy cards from your hand to this pokemon.' ? 'fighting' : source.name.toLowerCase() === 'galarian articuno' && text === 'when you play this pokemon from your hand onto your bench during your turn, you may attach up to 2 psychic energy cards from your hand to this pokemon.' ? 'psychic' : null
      const galarianBirdBenchPower = Boolean(galarianBirdEnergy && source.playedToBenchTurn === state.turnNumber && state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId)
      const solgaleoMetalEnergySearch = source.name.toLowerCase() === 'solgaleo' && text === 'once during your turn, if this pokemon is on your bench, you may use this ability. search your deck for up to 2 basic metal energy cards and attach them to this pokemon. then, shuffle your deck.'
      const delphoxEnergySearch = source.name.toLowerCase() === 'delphox break' && text === 'once during your turn (before your attack), you may search your deck for a fire energy card and attach it to 1 of your pokemon. shuffle your deck afterward.'
      const leafeonEnergySearch = source.name.toLowerCase() === 'leafeon v' && text === 'once during your turn, you may search your deck for a grass energy card and attach it to 1 of your pokemon. then, shuffle your deck. if you use this ability, your turn ends.'
      const energySearch = text.match(/^once during your turn, if this pokemon is (?:in the active spot|your active pokemon), you may search your deck for up to (\d+) basic \{([grwlpmdycf])\} energy cards?, reveal them, and put them into your hand\. then, shuffle your deck\.$/) || (galarianBirdBenchPower ? ['galarian bird bench energy', '2', ({ psychic: 'p', fighting: 'f', darkness: 'd' } as Record<string, string>)[galarianBirdEnergy!] ] as RegExpMatchArray : ribombeeHoneyGather ? ['ribombee honey gather', '2', ({ grass: 'g', fire: 'r', water: 'w', lightning: 'l', psychic: 'p', metal: 'm', darkness: 'd', fairy: 'y', colorless: 'c', fighting: 'f' } as Record<string, string>)[state.player.selectedEnergy?.toLowerCase() || ''] || 'c'] as RegExpMatchArray : solgaleoMetalEnergySearch ? ['solgaleo metal pool energy', '2', 'm'] as RegExpMatchArray : eldegossBasicEnergySearch ? ['eldegoss cotton lift', '2', 'c'] as RegExpMatchArray : clefairyMoonWatch ? ['clefairy moon watch', String(state.player.back.filter((card) => card.currentHp > 0 && card.name.toLowerCase() === 'clefairy').length), 'p'] as RegExpMatchArray : energyAttachFromDeck ? [energyAttachFromDeck[0], '1', energyAttachFromDeck[1]] as RegExpMatchArray : modeledEnergyZoneAttach ? [modeledEnergyZoneAttach[0], '1', modeledEnergyZoneAttach[1]] as RegExpMatchArray : delphoxEnergySearch ? ['delphox energy acceleration', '1', 'r'] as RegExpMatchArray : leafeonEnergySearch ? ['leafeon energy acceleration', '1', 'g'] as RegExpMatchArray : null)
      const charizardEnergySearch = /^once during your turn \(before your attack\), you may put 2 damage counters on this pokemon\. if you do, search your deck for up to 2 fire energy cards and attach them to this pokemon\. then, shuffle your deck\.$/.test(text)
      const incineroarEnergySearch = source.name.toLowerCase().replace(/[^a-z0-9-]/g, '') === 'incineroar-gx' && text === 'once during your turn (before your attack), you may put 3 damage counters on this pokemon. if you do, search your deck for up to 3 darkness energy cards and attach them to this pokemon. then, shuffle your deck.'
      const resolvedEnergySearch = energySearch || (charizardEnergySearch ? ['charizard energy acceleration', '2', 'r'] as RegExpMatchArray : incineroarEnergySearch ? ['incineroar energy acceleration', '3', 'd'] as RegExpMatchArray : rillaboomEnergySearch ? ['rillaboom energy acceleration', '2', 'g'] as RegExpMatchArray : forretressEnergySearch ? ['forretress energy acceleration', '5', 'g'] as RegExpMatchArray : null)
      const energySearchCount = aromatissePsychicEnergySearch || eldegossBasicEnergySearch || solgaleoMetalEnergySearch || ribombeeHoneyGather || galarianBirdBenchPower ? 2 : Number(resolvedEnergySearch?.[1] || 0)
      const firestarter = ['blaziken', 'typhlosion'].includes(source.name.toLowerCase()) && /^once during your turn \(before your attack\), you may attach a fire energy card from your discard pile to 1 of your benched pokemon\. this power can't be used if (?:blaziken|typhlosion) is affected by a special condition\.$/.test(text)
      const yanmegaSpeedBoost = source.name.toLowerCase() === 'yanmega' && text === "once during your turn (before your attack), if yanmega is your active pokemon, you may search your discard pile for a grass energy card and attach it to yanmega. this power can't be used if yanmega is affected by a special condition."
      const cinderaceLibero = /^once during your turn, when this pokemon moves from your bench to the active spot, you may attach up to 2 fire energy cards from your discard pile to it\.$/.test(text)
      const coalossalTarGenerator = /^once during your turn, you may attach a fire energy card, a fighting energy card, or 1 of each from your discard pile to your pokemon in any way you like\.$/.test(text)
      const vivillonEnergyColor = source.name.toLowerCase() === 'vivillon' && text === 'once during your turn (before your attack), you may flip a coin. if heads, search your deck for a basic energy card and attach it to 1 of your pokemon. shuffle your deck afterward.'
      const electrodeEnergyGrounding = source.name.toLowerCase() === 'electrode' && text === "once during your turn (before your attack), if electrode is your active pokemon, you may flip a coin. if heads, choose a lightning energy card from your discard pile and attach it to 1 of your pokemon. this power can't be used if electrode is affected by a special condition."
      const bellossomCoinAttach = source.name.toLowerCase() === 'bellossom' && text === "once during your turn (before your attack), you may flip a coin. if heads, attach 1 basic energy card from your hand to 1 of your benched pokemon. this power can't be used if bellossom is affected by a special condition."
      const magnetonMagneticCircuit = source.name.toLowerCase() === 'magneton' && text === 'once during your turn, you may attach up to 3 basic energy cards from your discard pile to your {l} pokemon in any way you like. if you use this ability, this pokemon is knocked out.'
      const handEnergyAttachMatch = text.match(/^as often as you like during your turn(?: \(before your attack\))?, you may attach (?:a )?(?:basic )?(?:\{([grwlpmdycf])\}|(grass|fire|water|lightning|psychic|fighting|metal|darkness|fairy|colorless)) energy card from your hand to 1 of your pokemon\.$/)
      const handEnergyAttach = Boolean(handEnergyAttachMatch)
      const hydreigonDarkTrance = /^as often as you like during your turn(?: \(before your attack\))?, you may attach (?:a darkness energy card|a \{d\} energy card) from your hand to 1 of your pokemon\.$/.test(text)
      const cherrimSpringBloom = text === "as often as you like during your turn, you may attach a grass energy card from your hand to 1 of your pokemon that doesn't have a rule box (pokemon v, pokemon-gx, etc. have rule boxes)."
      const turboblaze = source.name.toLowerCase() === 'reshiram' && text === 'once during your turn (before your attack), if this pokemon is your active pokemon, you may attach a fire energy card from your hand to 1 of your dragon pokemon.'
      const pawmotEnergyAttach = text === 'once during your turn, you may use this ability. attach a basic lightning energy card from your discard pile to 1 of your pokemon.'
      const flaaffyDynamotor = text === 'once during your turn (before your attack), you may attach a lightning energy card from your discard pile to 1 of your benched pokemon.'
      const burmyWearCloak = ['burmy plant cloak', 'burmy sandy cloak'].includes(source.name.toLowerCase()) && /^once during your turn \(before your attack\), if burmy (?:plant|sandy) cloak is your active pokemon, you may search your discard pile for a basic (?:grass|fighting) energy card and attach it to burmy (?:plant|sandy) cloak\.$/.test(text)
      const discardBasicEnergyAttach = text === 'once during your turn, you may attach a basic energy card from your discard pile to 1 of your pokemon.'
      const basicEnergyHandAttach = text === 'once during your turn, you may attach a basic energy card from your hand to 1 of your pokemon.'
      const oricorioFirestarter = source.name.toLowerCase() === 'oricorio ex' && text === 'as often as you like during your turn, if you have any {r} mega evolution pokemon ex in play, you may use this ability. attach a basic {r} energy card from your hand to 1 of your benched {r} pokemon.'
      const ethanHoOhGoldenFlame = source.name.toLowerCase().startsWith("ethan's ho-oh") && text === "once during your turn, you may attach up to 2 basic {r} energy cards from your hand to 1 of your benched ethan's pokemon."
      const energyAttach = magnetonMagneticCircuit || ethanHoOhGoldenFlame || oricorioFirestarter || pawmotEnergyAttach || flaaffyDynamotor || burmyWearCloak || discardBasicEnergyAttach || basicEnergyHandAttach || vivillonEnergyColor || electrodeEnergyGrounding || bellossomCoinAttach || handEnergyAttach || turboblaze || hydreigonDarkTrance || cherrimSpringBloom || cinderaceLibero || coalossalTarGenerator || firestarter || yanmegaSpeedBoost || text.match(/^once during your turn(?: \(before your attack\))?, you may attach (?:a darkness energy card from your discard pile to this pokemon\. you can't use more than 1 direflame wings ability each turn\.|a basic \{[grwlpmdycf]\} energy card from your discard pile to (?:1 of your benched pokemon|this pokemon)\.|a psychic energy card from your discard pile to 1 of your lunatone\.|a basic energy card from your discard pile to this pokemon\.)$/)
      const energyAttachIsDireflameWings = text.includes("can't use more than 1 direflame wings ability each turn")
      const energyAttachTypeCode = text.match(/attach a basic \{([grwlpmdycf])\} energy card from your discard pile/)?.[1]
      const energyAttachType = energyAttachTypeCode
        ? ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', f: 'fighting', m: 'metal', d: 'darkness', y: 'fairy', c: 'colorless' } as Record<string, string>)[energyAttachTypeCode]
        : cinderaceLibero ? 'fire'
        : ethanHoOhGoldenFlame ? 'fire'
        : oricorioFirestarter ? 'fire'
        : yanmegaSpeedBoost ? 'grass'
        : cherrimSpringBloom ? 'grass'
        : electrodeEnergyGrounding ? 'lightning'
        : bellossomCoinAttach ? 'any'
        : handEnergyAttachMatch ? energyTypes[handEnergyAttachMatch[1] || ''] || handEnergyAttachMatch[2]
        : vivillonEnergyColor ? 'any'
        : turboblaze ? 'fire'
        : energyAttach && text.includes('darkness energy') ? 'darkness'
        : firestarter ? 'fire'
        : pawmotEnergyAttach ? 'lightning'
        : flaaffyDynamotor ? 'lightning'
        : burmyWearCloak ? source.name.toLowerCase().includes('plant') ? 'grass' : 'fighting'
        : discardBasicEnergyAttach ? 'any'
        : basicEnergyHandAttach ? 'any'
        : energyAttach && text.includes('psychic energy') ? 'psychic'
        : magnetonMagneticCircuit ? 'lightning'
            : energyAttach ? 'any' : undefined
      const floatzelWaterAttach = source.name.toLowerCase() === 'floatzel' && text === "once during your turn (before your attack), you may attach a water energy card from your hand to floatzel. this power can't be used if floatzel is affected by a special condition."
      const celebiGrassAttach = source.name.toLowerCase() === 'celebi' && text === "once during your turn (before your attack), if celebi is your active pokemon, you may attach a grass energy card from your hand to 1 of your pokemon. this power can't be used if celebi is affected by a special condition."
      const energyHandDraw = text.match(/^once during your turn, you may attach a basic \{g\} energy card from your hand to this pokemon\. if you attached energy to a pokemon in this way, draw a card\.$/) || text.match(/^once during your turn, you may attach a psychic energy card from your hand to 1 of your benched psychic pokemon\. if you attached energy to a pokemon in this way, draw 2 cards\.$/) || text.match(/^once during your turn, you may attach a basic \{p\} energy card from your hand to 1 of your benched pokemon\. if you attached energy to a pokemon in this way, draw 2 cards\.$/) || floatzelWaterAttach || celebiGrassAttach
      const discardFightingAttach = text.match(/^once during your turn, you may attach up to (\d+) basic \{f\} energy cards? from your discard pile to your basic \{f\} pokemon in any way you like\. if you use this ability, your turn ends\.$/)
      const unownIncrease = source.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === 'unowni' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "when you play unown [i] from your hand, you may search your deck for a card with unown in its name and put it onto your bench. shuffle your deck afterward. you can't use this power if your bench is full." && state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId || source.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === 'unownc' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), if unown c is on your bench, you may flip a coin. if heads, search your deck for any 1 unown and put it onto your bench. shuffle your deck afterward.' && state.player.back.some((card) => card.instanceId === source.instanceId) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      const kabutoReviveFriends = source.name.toLowerCase() === 'kabuto' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before you attack), you may flip a coin. if heads, search your deck for a card named kabuto and put it on your bench. shuffle your deck afterward. treat the new kabuto as a basic pokemon. this power can't be used if kabuto is asleep, confused, or paralyzed (or if your bench is full)." && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      const omanyteFossil = source.name.toLowerCase() === 'omanyte' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may flip a coin. if heads, search your deck for a card that evolves from mysterious fossil and put it on your bench. shuffle your deck afterward. treat that card as a basic pokemon. this power can't be used if omanyte is asleep, confused, or paralyzed (or if your bench is full)." && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      const beldumMagneticCall = source.name.toLowerCase() === 'beldum' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may flip a coin. if heads, search your deck for a metal basic pokemon and put it onto your bench. shuffle your deck afterward. this power can't be used if beldum is affected by a special condition." && !source.statusConditions?.length && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      const restoredBenchSearch = source.name.toLowerCase() === 'omastar' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may search your deck for a restored pokemon and put it onto your bench. shuffle your deck afterward.' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      const benchSearchMatch = text.match(/^once during your turn, you may search your deck for up to (\d+) basic \{([grwlpmdycf])\} pokemon and put them onto your bench\. then, shuffle your deck\.$/)
      const fossilBenchSearchPower = kabutoReviveFriends || omanyteFossil || beldumMagneticCall || source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unownc' && unownIncrease
      const benchSearch = benchSearchMatch || (unownIncrease || fossilBenchSearchPower || restoredBenchSearch ? ['Named Pokémon Bench Search', '1', ''] as unknown as RegExpMatchArray : null)
      const benchSearchCount = unownIncrease || fossilBenchSearchPower || restoredBenchSearch ? 1 : Number(benchSearch?.[1] || 0)
      const benchSearchType = unownIncrease ? 'Unown Pokémon' : kabutoReviveFriends ? 'kabuto' : omanyteFossil ? 'mysteriousfossil' : beldumMagneticCall ? 'metal' : restoredBenchSearch ? 'restored' : ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'fighting', d: 'darkness', y: 'metal', c: 'colorless', f: 'fairy' } as Record<string, string>)[benchSearch?.[2] || '']
      const refillDrawEnergyCost = text.match(/^you must discard (?:a basic \{l\} energy from this pokemon|an energy card from your hand) in order to use this ability\./)?.[0]
      const kricketuneRefill = /^once during your turn, you may draw cards until you have 3 cards in your hand\. if this pokemon is in the active spot, you may draw cards until you have 4 cards in your hand instead\. you can't use more than 1 exciting stage ability each turn\.$/.test(text)
      const fusionStrikeRefill = /^once during your turn, you may draw cards until you have as many cards in your hand as you have fusion strike pokemon in play\.$/.test(text)
      const porygon2Refill = source.name.toLowerCase() === 'porygon2' && /^once during each of your turns \(before your attack\), if you have 2 or fewer cards in your hand, you may draw cards from your deck until you have 3 cards in your hand\. this power can't be used if porygon2 is affected by a special condition\.$/.test(text)
      const fusionStrikeCount = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'fusion strike')).length
      const refillDrawTarget = (porygon2Refill ? '3' : kricketuneRefill ? '3' : fusionStrikeRefill ? String(fusionStrikeCount) : undefined) || (directDraw?.refillTarget !== undefined ? String(directDraw.refillTarget) : undefined) || text.match(/^(?:you must discard (?:a basic \{l\} energy from this pokemon|an energy card from your hand) in order to use this ability\. )?once during your turn(?: \(before your attack\))?, you may draw cards until you have (\d+) cards in your hand\.$/)?.[1] || text.match(/^once during your turn, if this pokemon is in the active spot, you may draw cards until you have (\d+) cards in your hand\. if you use this ability, your turn ends\.$/)?.[1] || text.match(/^when you play this pokemon from your hand onto your bench during your turn, you may draw cards until you have (\d+) cards in your hand\. you can't use more than 1 dark asset ability each turn\.$/)?.[1]
      const refillDraw = Boolean(refillDrawTarget)
      const dragoniteDrawTop = source.name.toLowerCase() === 'dragonite' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may draw a card. if you do, choose a card from your hand and put it on top of your deck. this power can't be used if dragonite is asleep, confused, or paralyzed."
      const handDeckSwap = ['once during your turn, you may switch a card from your hand with the top card of your deck.', 'once during your turn, you may use this ability. switch a card from your hand with the top card of your deck.'].includes(text.replace(/\s+/g, ' ').trim()) || dragoniteDrawTop
      const delibirdGiftExchange = source.name.toLowerCase() === 'delibird' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), if delibird is your active pokemon, you may shuffle 1 card from your hand into your deck. then, draw a card. this power can't be used if delibird is affected by a special condition."
      const shuffleHandDraw = text.replace(/\s+/g, ' ').trim() === 'once during your turn, you may shuffle your hand and put it on the bottom of your deck. if you put any cards on the bottom of your deck in this way, draw a card.'
      const normalizedTellName = source.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '')
      const unownTell = normalizedTellName === 'unownt' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may flip a coin. if heads, look at your opponent's hand and show your hand to your opponent. this power can be used even if unown t is asleep, confused, or paralyzed."
      const unownLaugh = normalizedTellName === 'unownl' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may flip a coin. if heads, each player shuffles his or her deck. this power can be used even if unown l is asleep, confused, or paralyzed.'
      const unownHelp = normalizedTellName === 'unownh' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), if you have unown h, unown e, unown l, and unown p on your bench, you may shuffle your hand into your deck, then draw a new hand of the same number of cards.'
      const unownQuicken = normalizedTellName === 'unownq' && text.replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may flip a coin. if heads, prevent all effects of attacks, including damage, done to any of your pokemon with unown in its name during your opponent's next turn. if you have more than 1 unown q in play, use only 1 [quicken] each turn. this power can be used even if unown q is asleep, confused, or paralyzed."
      const unownGive = normalizedTellName === 'unowng' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), if you have unown g, unown i, unown v, and unown e on your bench, you may flip a coin. if heads, search your deck for a basic energy card and attach it to 1 of your pokemon. shuffle your deck afterward.'
      const unownObserve = normalizedTellName === 'unowno' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before you attack), you may look at 5 cards from the top of your opponent's deck and put them back in the same order."
      const unownXray = normalizedTellName === 'unownx' && text.replace(/pokémon/g, 'pokemon').replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), if you have unown x on your bench, you may look at the top card of your opponent's deck and put it back on top of his or her deck."
      const darkSlowkingCunning = normalizedTellName === 'darkslowking' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may flip a coin. if heads, look at the top card of your opponent's deck. then, you may have your opponent shuffle his or her deck. this power can't be used if dark slowking is asleep, confused, or paralyzed."
      const darkSlowkingCunningNoFlip = normalizedTellName === 'darkslowking' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may look at the top card of your opponent's deck. then, you may shuffle his or her deck. this power can't be used if dark slowking is affected by a special condition."
      const porygonDeckPeek = normalizedTellName === 'porygon' && text.replace(/\s+/g, ' ').trim() === 'once during your turn, you may look at the top card of your deck.'
      const lanturnDeckPeek = normalizedTellName === 'lanturn' && text.replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim() === "as often as you like during your turn (before your attack), you may look at the top card of your opponent's deck."
      const malamarDualPeek = source.name.toLowerCase() === 'malamar' && text.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === "once during your turn, you may look at the top card of your opponent's deck. if you do, look at the top card of your deck." && state.opponent.deck.length > 0 && state.player.deck.length > 0
      const spiritombBuildingSpite = source.name.toLowerCase() === 'spiritomb' && text.replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may put 1 damage counter on this pokemon.'
      const mankeyPeek = normalizedTellName === 'mankey' && text.replace(/pokémon/g, 'pokemon').replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === "once during your turn (before your attack), you may look at one of the following: the top card of either player's deck, a random card from your opponent's hand, or one of either player's prizes. this power can't be used if mankey is asleep, confused, or paralyzed." || porygonDeckPeek || lanturnDeckPeek
      const unownDeckPeek = normalizedTellName === 'unown' && text.replace(/pokémon/g, 'pokemon').replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === "once during your turn, you may choose either player. look at the top card of that player's deck."
      const opponentHandTrim = text.replace(/[’]/g, "'").replace(/\s+/g, ' ').trim() === 'once during your turn, you may have your opponent discard cards from their hand until they have 4 cards in their hand.'
      const mewExHandPeek = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'mewex' && text === "once during your turn (before your attack), if mew ex is on your bench, you may look at your opponent's hand." && state.player.back.some((card) => card.instanceId === source.instanceId)
      const bwpMewPsyscan = source.name.toLowerCase() === 'mew' && text === 'once during your turn (before your attack), if this pokemon is your active pokemon, you may have your opponent reveal his or her hand.' && state.player.front.some((card) => card.instanceId === source.instanceId)
      const sableyeHandPeek = source.name.toLowerCase() === 'sableye' && text === "once during your turn (before your attack), if sableye is your active pokemon, you may look at your opponent's hand. this power can't be used if sableye is affected by a special condition." && state.player.front.some((card) => card.instanceId === source.instanceId) && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      const hasUnownHelpBench = ['h', 'e', 'l', 'p'].every((letter) => state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === `unown${letter}`))
      const hasUnownGiveBench = ['g', 'i', 'v', 'e'].every((letter) => state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === `unown${letter}`))
      const sharedQuickenUsed = [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.['shared:quicken'] === state.turnNumber)
      const revealHand = opponentHandTrim || mewExHandPeek || bwpMewPsyscan || sableyeHandPeek || chandelureDeckDiscard && state.opponent.deck.length > 0 || unownTell || unownLaugh || unownHelp && hasUnownHelpBench || unownQuicken && !sharedQuickenUsed || unownGive && hasUnownGiveBench && state.player.energy < TCG_BATTLE_FORMATS[state.format].energyCap || unownObserve && state.opponent.deck.length > 0 || unownXray && state.opponent.deck.length > 0 && state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === 'unownx') || (darkSlowkingCunning || darkSlowkingCunningNoFlip) && state.opponent.deck.length > 0 && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) || unownDeckPeek || porygonDeckPeek || malamarDualPeek || /^once during your turn(?: \(before your attack\))?, you may have your opponent reveal their hand\.$/.test(text.replace(/\s+/g, ' ').trim())
      const usableMankeyPeek = (mankeyPeek || porygonDeckPeek || sableyeTopDeckDiscard || morpekoTopDeckDiscard || aipomDeckBottom || malamarDualPeek) && (porygonDeckPeek || lanturnDeckPeek || aipomDeckBottom || morpekoTopDeckDiscard || malamarDualPeek || !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))) && (lanturnDeckPeek || source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber)
      const usableUnownDeckPeek = unownDeckPeek && (state.player.deck.length > 0 || state.opponent.deck.length > 0) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
      if (!pitchPyukumuku && !slakingLazyBlow && !krookodileEnergyDiscard && !electabuzzBottomDraw && !opponentHandShuffleDraw && !claydolHandDraw && !directDraw && !eachPlayerDraw && !sandFlap && !discardAndDraw && !discardHandDraw && !refillDraw && !searchDeck && !energySearch && !energyAttach && !energyHandDraw && !discardFightingAttach && !benchSearch && !discardBenchSearch && !topDeckPickCount && !handDeckSwap && !delibirdGiftExchange && !shuffleHandDraw && !revealHand && !usableMankeyPeek && !usableUnownDeckPeek && !orbeetleBugRadar && !machampTerraforming && !lunatonePremonition && !laprasGoForASwim && !galladePremonition && !solrockPremonition && !slowkingTemporalBackflow && !talonflameSkyHunt) return []
      if (krookodileEnergyDiscard && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber)) return []
      if (giratinaLetLoose && (source.playedToBenchTurn !== state.turnNumber || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber)) return []
      if (marshadowLetLoose && (source.playedToBenchTurn !== state.turnNumber || !state.player.back.some((card) => card.instanceId === source.instanceId) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber)) return []
      if (metagrossExHandShuffle && source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      if (sandFlap && ![state.player, state.opponent].some((side) => side.hand.length > 0 || side.deck.length > 0)) return []
      if (machampTerraforming && (source.statusConditions?.length || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.deck.length === 0)) return []
      if ((lunatonePremonition || laprasGoForASwim) && (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.deck.length === 0)) return []
      if (solrockPremonition && (source.statusConditions?.length || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.deck.length === 0 || ![...state.player.front, ...state.player.back].some((card) => card.name.toLowerCase() === 'lunatone' && card.currentHp > 0))) return []
      if (slowkingTemporalBackflow && (source.statusConditions?.length || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.deck.length === 0 && state.opponent.deck.length === 0)) return []
      if (jirachiWishMaker && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.deck.length === 0)) return []
      if (galladePremonition && (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.deck.length === 0)) return []
      if (darkKadabraMatterExchange && source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))) return []
      if (topDeckPickCount && /this power can't be used if/.test(text) && source.statusConditions?.length) return []
      if (metagrossDeltaTopPick && source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      if (topDeckPickCount && state.player.deck.length === 0 || (topDeckSearchSubtype || /^once during your turn, if this pokemon is in the active spot, you may look at the top 2 cards of your deck and put 1 of them into your hand\. put the other card in the lost zone\.$/.test(text)) && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (handDeckSwap && (!state.player.deck.length || !state.player.hand.length) || dragoniteDrawTop && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length)) return []
      if (delibirdGiftExchange && (!state.player.deck.length || !state.player.hand.length || !state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length)) return []
      if (mindHat && state.opponent.hand.length === 0) return []
      if (shuffleHandDraw && !state.player.hand.length) return []
      if (pitchPyukumuku && state.player.abilityUses?.['shared:pitch a pyukumuku'] === state.turnNumber) return []
      if (vstarSearchCount && state.player.usedVstarPower) return []
      if (discardBenchSearch && ((!gentleFin && state.player.usedVstarPower) || gentleFin && !state.player.front.some((card) => card.instanceId === source.instanceId) || getOpenTcgBattleBenchSlots(state.player) < 1 || !state.player.discard.some((card) => gentleFin ? card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.hp <= 70 : card.types.some((type) => type.toLowerCase() === 'colorless') && !card.subtypes.some((subtype) => ['ex', 'gx', 'v', 'vmax', 'vstar'].includes(subtype.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z]/g, '')))))) return []
      if ((charizardEnergySearch || incineroarEnergySearch) && (source.currentHp <= (incineroarEnergySearch ? 30 : 20) || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || state.player.selectedEnergy?.toLowerCase() !== (incineroarEnergySearch ? 'darkness' : 'fire'))) return []
      if (delphoxEnergySearch && (state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || state.player.selectedEnergy?.toLowerCase() !== 'fire')) return []
      if (leafeonEnergySearch && (state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || state.player.selectedEnergy?.toLowerCase() !== 'grass')) return []
      if (abilityDeckSearch?.firstTurnOnly && state.turnNumber !== 1 || abilityDeckSearch?.onlyIfGoesSecond && state.playerGoesSecond !== true) return []
      if (abilityDeckSearch?.knockoutGate && !hasTcgBattleRecentRuleBoxKnockout(state, 'player') || abilityDeckSearch?.knockoutAnyGate && !(state.lastOpponentAttackKnockout?.player?.knockedOut && state.lastOpponentAttackKnockout.player.turnNumber === state.turnNumber)) return []
      if (abilityDeckSearch?.requiredName && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.name.toLowerCase().includes(abilityDeckSearch.requiredName!))) return []
      if (abilityDeckSearch?.requiredActiveAbilityName && !state.player.front.some((card) => card.currentHp > 0 && !isTcgBattleAbilitySuppressed(card, [state.player, state.opponent]) && card.abilities?.some((entry) => entry.name.toLowerCase() === abilityDeckSearch.requiredActiveAbilityName))) return []
      if (abilityDeckSearch?.requiredBenchNames?.some((name) => !state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === name))) return []
      if (abilityDeckSearch?.specialConditionGate && source.statusConditions?.length || abilityDeckSearch?.blockedStatuses && source.statusConditions?.some((status) => abilityDeckSearch.blockedStatuses!.includes(status))) return []
      if (abilityDeckSearch?.handDiscardCount && state.player.hand.length < abilityDeckSearch.handDiscardCount) return []
      if ((abilityDeckSearch?.requiredOpponentEnergyLead && state.opponent.energy <= state.player.energy) || (abilityDeckSearch?.attachEnergyFromDeck && (state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || (abilityDeckSearch.benchToActiveOnly ? !state.player.front.some((card) => card.instanceId === source.instanceId) || !state.lastEffectEvents?.some((event) => event.kind === 'switch' && event.side === 'player' && event.targetId === source.instanceId) && !(state.lastAction?.kind === 'retreat' && state.lastAction.side === 'player' && state.lastAction.backId === source.instanceId) : !state.player.back.some((card) => card.currentHp > 0))))) return []
      if (oricorioFirestarter && (![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'ex') && card.name.toLowerCase().includes('mega') && card.types.some((type) => type.toLowerCase() === 'fire')) || !state.player.back.some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'fire')) || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap)) return []
      if (ethanHoOhGoldenFlame && (![...state.player.front, ...state.player.back].some((card) => card.instanceId === source.instanceId) || !state.player.back.some((card) => card.currentHp > 0 && card.name.toLowerCase().replace(/[’']/g, '').startsWith('ethans')) || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber)) return []
      if (abilityDeckSearch?.evolutionOnly && !state.player.deck.some((card) => Boolean(card.evolvesFrom))) return []
      if (abilityDeckSearch?.activeOnly && !state.player.front.some((card) => card.instanceId === source.instanceId) || abilityDeckSearch?.requiresEmptyHand && state.player.hand.length > 0) return []
      if (abilityDeckSearch?.requiredType && !state.player.deck.some((card) => card.types.some((type) => type.toLowerCase() === abilityDeckSearch.requiredType) && (!abilityDeckSearch.evolutionOnly || Boolean(card.evolvesFrom)))) return []
      if (abilityDeckSearch?.subtype === 'pokemon' && !state.player.deck.some((card) => card.types.length > 0)) return []
      if (abilityDeckSearch?.energyCard && (!state.player.selectedEnergy || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || abilityDeckSearch.requiredEnergyType && state.player.selectedEnergy.toLowerCase() !== abilityDeckSearch.requiredEnergyType)) return []
      if (abilityDeckSearch?.subtype && abilityDeckSearch.subtype !== 'pokemon' && !abilityDeckSearch.energyCard && !state.player.deck.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '') === abilityDeckSearch.subtype))) return []
      if (abilityDeckSearch?.requiredName && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.name.toLowerCase().includes(abilityDeckSearch.requiredName!))) return []
      if (abilityDeckSearch?.maxHp && !state.player.deck.some((card) => card.types.some((type) => type.toLowerCase() === abilityDeckSearch.subtype) && card.hp <= abilityDeckSearch.maxHp!)) return []
      if (abilityDeckSearch?.nameContains && !state.player.deck.some((card) => card.name.toLowerCase().includes(abilityDeckSearch.nameContains!))) return []
      if (abilityDeckSearch?.requiredNames?.some((name) => !state.player.deck.some((card) => card.name.toLowerCase() === name))) return []
      if (abilityDeckSearch?.requiredSubtype && !state.player.deck.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === abilityDeckSearch.requiredSubtype))) return []
      if (abilityDeckSearch?.putOnBench && (!getOpenTcgBattleBenchSlots(state.player) || !state.player.deck.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === abilityDeckSearch.requiredSubtype) && canTcgBattlePutPokemonOnBench(state.player, card)))) return []
      if (abilityDeckSearch?.excludedName && !state.player.deck.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === abilityDeckSearch.requiredSubtype) && !card.name.toLowerCase().includes(abilityDeckSearch.excludedName!))) return []
      if (abilityDeckSearch?.benchPlayOnly && (source.playedToBenchTurn !== state.turnNumber || state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId)) return []
      if (abilityDeckSearch?.benchToActiveOnly && (!state.player.front.some((card) => card.instanceId === source.instanceId) || !state.lastEffectEvents?.some((event) => event.kind === 'switch' && event.side === 'player' && event.targetId === source.instanceId) && !(state.lastAction?.kind === 'retreat' && state.lastAction.side === 'player' && state.lastAction.backId === source.instanceId))) return []
      if (abilityDeckSearch?.attackNameContains && !state.player.deck.some((card) => card.attacks.some((attack) => attack.name.toLowerCase().includes(abilityDeckSearch.attackNameContains!)))) return []
      if (abilityDeckSearch?.noRuleBox && !state.player.deck.some((card) => !card.subtypes.some((subtype) => ['ex', 'gx', 'v', 'vmax', 'vstar'].includes(subtype.toLowerCase().replace(/[^a-z]/g, '').replace(/^pokemon/, ''))))) return []
      if (state.player.deck.length === 0 && !directDraw?.discardHandToBottom && !electabuzzBottomDraw && !opponentHandShuffleDraw && !claydolHandDraw && !pitchPyukumuku && !giratinaLetLoose && !marshadowLetLoose && !searchDeck && !energySearch && !revealHand && !discardBenchSearch && !mindHat && !chandelureDeckDiscard && !sableyeTopDeckDiscard && (!eachPlayerDraw || state.opponent.deck.length === 0 && (!marshadowLetLoose || state.opponent.hand.length === 0)) && !metagrossExHandShuffle) return []
      if ((discardAndDraw && !radiantGreninjaDiscard && !ninetalesFireDraw && !salazzleFireDraw && state.player.hand.length < discardCount) || (radiantGreninjaDiscard && state.player.energy < 1) || ((ninetalesFireDraw || salazzleFireDraw) && (state.player.energy < 1 || state.player.selectedEnergy?.toLowerCase() !== 'fire')) || (ultraBeastDiscard && !state.player.hand.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'ultra beast'))) || (madPartyDiscard && !state.player.hand.some((card) => card.attacks.some((attack) => attack.name.toLowerCase() === 'mad party'))) || (wingBuzz && (!state.player.front.some((card) => card.instanceId === source.instanceId) || state.opponent.deck.length === 0)) || (chandelureDeckDiscard && state.opponent.deck.length === 0)) return []
      if (discardHandFirstTurnOnly && state.turnNumber !== 1) return []
      if (discardHandVstar && state.player.usedVstarPower) return []
      if (directDraw?.vstarPower && state.player.usedVstarPower) return []
      const sourceIsActive = state.player.front.some((card) => card.instanceId === source.instanceId)
      const effectiveRefillTarget = kricketuneRefill && sourceIsActive ? 4 : Number(refillDrawTarget)
      if (refillDraw && state.player.hand.length - (directDraw?.discardHandToBottom ? 1 : 0) >= effectiveRefillTarget) return []
      if (directDraw?.requiredHandSize !== undefined && state.player.hand.length !== directDraw.requiredHandSize) return []
      if (directDraw?.maximumHandSize !== undefined && state.player.hand.length > directDraw.maximumHandSize) return []
      if (directDraw?.requiredBenchNames?.some((requiredName) => !state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === requiredName))) return []
      if (/^once during your turn, if this pokemon is in the active spot,/.test(text) && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (discardHandBenchPlayOnly && source.playedToBenchTurn !== state.turnNumber) return []
      const darkAsset = text.includes("can't use more than 1 dark asset ability each turn")
      if (darkAsset && source.playedToBenchTurn !== state.turnNumber) return []
      if (directDraw?.benchPlayOnly && source.playedToBenchTurn !== state.turnNumber) return []
      if (refillDrawEnergyCost && (state.player.energy < 1 || text.includes('basic {l}') && state.player.selectedEnergy?.toLowerCase() !== 'lightning')) return []
      if (directDraw?.activeOnly && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (directDraw?.energyType && (state.player.energy < 1 || directDraw.energyType !== 'any' && state.player.selectedEnergy?.toLowerCase() !== energyTypes[directDraw.energyType])) return []
      if (directDraw?.requiredName && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.name.toLowerCase().includes(directDraw.requiredName!))) return []
      if (solgaleoMetalEnergySearch && !state.player.back.some((card) => card.instanceId === source.instanceId && card.currentHp > 0)) return []
      if (energySearch && (!galarianBirdBenchPower && !ribombeeHoneyGather && !gardevoirPsyShadow && !eldegossBasicEnergySearch && !solgaleoMetalEnergySearch && !rillaboomEnergySearch && !forretressEnergySearch && !delphoxEnergySearch && !leafeonEnergySearch && !text.includes('attach it to this pokemon') && !state.player.front.some((card) => card.instanceId === source.instanceId) || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || (energyAttachFromDeck || energyZoneAttach) && state.player.selectedEnergy?.toLowerCase() !== ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'metal', d: 'darkness', y: 'fairy', c: 'colorless', f: 'fighting' } as Record<string, string>)[(energyAttachFromDeck || energyZoneAttach)![1]] || delphoxEnergySearch && state.player.selectedEnergy?.toLowerCase() !== 'fire' || leafeonEnergySearch && state.player.selectedEnergy?.toLowerCase() !== 'grass' || (rillaboomEnergySearch || forretressEnergySearch) && state.player.selectedEnergy?.toLowerCase() !== 'grass' || energyZoneAttach && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'metal', d: 'darkness', y: 'fairy', c: 'colorless', f: 'fighting' } as Record<string, string>)[energyZoneAttach[2]])))) return []
      if (gardevoirPsyShadow && !state.player.front.some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'psychic'))) return []
      if (energyAttachFromDeck && state.player.selectedEnergy?.toLowerCase() !== ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'metal', d: 'darkness', y: 'fairy', c: 'colorless', f: 'fighting' } as Record<string, string>)[energyAttachFromDeck[1]]) return []
      if (energyAttach && ((energyAttachType !== 'any' && state.player.selectedEnergy?.toLowerCase() !== energyAttachType) || coalossalTarGenerator && !['fire', 'fighting'].includes(state.player.selectedEnergy?.toLowerCase() || '') || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || text.includes('benched pokemon') && !state.player.back.some((card) => card.currentHp > 0))) return []
      if (oricorioFirestarter && (![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'ex') && card.name.toLowerCase().includes('mega') && card.types.some((type) => type.toLowerCase() === 'fire')) || !state.player.back.some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'fire')))) return []
      if (cinderaceLibero && !state.lastEffectEvents?.some((event) => event.kind === 'switch' && event.side === 'player' && event.targetId === source.instanceId)) return []
      if (bellossomCoinAttach && (!state.player.selectedEnergy || source.statusConditions?.length)) return []
      if (handEnergyAttach && (!state.player.selectedEnergy || energyAttachType !== state.player.selectedEnergy.toLowerCase())) return []
      if (cherrimSpringBloom && !state.player.hand.some((card) => card.name.toLowerCase().includes('grass energy'))) return []
      if (magnetonMagneticCircuit && (state.player.selectedEnergy?.toLowerCase() !== 'lightning' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || !state.player.discard.some((card) => card.name.toLowerCase() === 'lightning energy' && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) || ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'lightning')))) return []
      if (yanmegaSpeedBoost && (!sourceIsActive || source.statusConditions?.length)) return []
      if (burmyWearCloak && (!state.player.front.some((card) => card.instanceId === source.instanceId) || state.player.selectedEnergy?.toLowerCase() !== energyAttachType || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || !state.player.discard.some((card) => card.name.toLowerCase() === `${energyAttachType} energy` && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')))) return []
      if (firestarter && source.statusConditions?.length || (floatzelWaterAttach || celebiGrassAttach) && source.statusConditions?.length) return []
      if (celebiGrassAttach && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (energyHandDraw && (state.player.selectedEnergy?.toLowerCase() !== (floatzelWaterAttach ? 'water' : text.includes('benched') ? 'psychic' : 'grass') || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || !(floatzelWaterAttach || celebiGrassAttach) && state.player.deck.length === 0 || text.includes('benched psychic pokemon') && !state.player.back.some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'psychic')) || text.includes('benched pokemon') && !text.includes('benched psychic pokemon') && !state.player.back.some((card) => card.currentHp > 0))) return []
      if (discardFightingAttach && (state.player.selectedEnergy?.toLowerCase() !== 'fighting' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap || ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.subtypes.includes('Basic') && card.types.some((type) => type.toLowerCase() === 'fighting')))) return []
      if (benchSearch && (!getOpenTcgBattleBenchSlots(state.player) || !state.player.deck.some((card) => (kabutoReviveFriends ? card.name.toLowerCase() === 'kabuto' : omanyteFossil ? card.evolvesFrom?.toLowerCase().replace(/[^a-z0-9]/g, '') === 'mysteriousfossil' : restoredBenchSearch ? card.subtypes.some((subtype) => subtype.toLowerCase() === 'restored') : card.subtypes.includes('Basic') && (unownIncrease ? card.name.toLowerCase().includes('unown') : card.types.some((type) => type.toLowerCase() === benchSearchType))) && canTcgBattlePutPokemonOnBench(state.player, card)))) return []
      if (directDraw?.knockoutGate && !(state.lastOpponentAttackKnockout?.player?.knockedOut && state.lastOpponentAttackKnockout.player.turnNumber === state.turnNumber)) return []
      if (directDraw?.specialConditionGate && source.statusConditions?.length) return []
      if (ninetalesFireDraw && (source.statusConditions?.length || !state.player.hand.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'energy') && card.name.toLowerCase().includes('fire')))) return []
      if (uxieLvXTradeOff && source.statusConditions?.length) return []
      const sharedUse = pitchPyukumuku || directDraw?.shared || discardHandShared || Boolean(abilityDeckSearch) || Boolean(energyAttachIsDireflameWings) || darkAsset || kricketuneRefill || unownQuicken || uxieLvXTradeOff
      const usageKey = pitchPyukumuku ? 'shared:pitch a pyukumuku' : uxieLvXTradeOff ? 'shared:trade off' : unownQuicken ? 'shared:quicken' : abilityDeckSearch ? `shared:${abilityDeckSearch.sharedKey}` : energyAttachIsDireflameWings ? 'shared:direflame wings' : darkAsset ? 'shared:dark asset' : kricketuneRefill ? 'shared:exciting stage' : discardHandBenchPlayOnly ? 'shared:dedechange' : sharedUse ? `shared:${ability.name}` : `${abilityIndex}:${ability.name}`
      const abilityDeckSearchShared = abilityDeckSearch?.sharedLimit !== false && Boolean(abilityDeckSearch)
      const alreadyUsed = lanturnDeckPeek ? false : pitchPyukumuku
        ? state.player.abilityUses?.[usageKey] === state.turnNumber
        : !hydreigonDarkTrance && sharedUse && (!abilityDeckSearch || abilityDeckSearchShared)
        ? [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.[usageKey] === state.turnNumber)
        : source.abilityUses?.[usageKey] === state.turnNumber
      if (alreadyUsed) return []
      return [{ source, ability, abilityIndex, krookodileEnergyDiscard, pitchPyukumuku, jellicentDeepSeaDraw, talonflameSkyHunt, sandFlap, wingBuzz, ninetalesFireDraw, salazzleFireDraw, radiantGreninjaDiscard, unownDDraw, opponentHandShuffleDraw, claydolHandDraw, electabuzzBottomDraw, slowkingTemporalBackflow, aipomDeckBottom, malamarDualPeek, discardAndDraw: discardAndDraw || ultraBeastDiscard || madPartyDiscard || evolutionRoar, discardCount: radiantGreninjaDiscard || ninetalesFireDraw || salazzleFireDraw ? 0 : ultraBeastDiscard || madPartyDiscard || wingBuzz ? 1 : discardCount, discardDrawCount: ultraBeastDiscard || ninetalesFireDraw || salazzleFireDraw ? 3 : radiantGreninjaDiscard ? 2 : discardDrawCount, ultraBeastDiscard, madPartyDiscard, evolutionRoar, mindHat, discardHandDraw, discardHandDrawCount, discardHandEndsTurn, refillDraw, refillDrawTarget: String(effectiveRefillTarget), refillDrawEnergyCost, discardHandToBottom: Boolean(directDraw?.discardHandToBottom), directDrawCount: directDraw ? directDraw.count + (sourceIsActive ? directDraw.activeBonus : 0) : undefined, directDrawEnergyType: directDraw?.energyType, directDrawDamageCounters: directDraw?.damageCounters, directDrawEndsTurn: false, eachPlayerDraw, shuffleBothHandsDrawFour: giratinaLetLoose || marshadowLetLoose || metagrossExHandShuffle, abilityDeckSearch, searchDeck, searchCount, searchSubtype: abilityDeckSearch?.subtype, searchMaxHp: abilityDeckSearch?.maxHp, searchRequiredType: abilityDeckSearch?.requiredType, searchEndsTurn: false, vstarSearch: Boolean(vstarSearchCount), energySearch: energySearch || charizardEnergySearch || incineroarEnergySearch || aromatissePsychicEnergySearch, energySearchCount, charizardEnergySearch, incineroarEnergySearch, delphoxEnergySearch, leafeonEnergySearch, rillaboomEnergySearch, forretressEnergySearch, energyAttach, energyAttachType, handEnergyAttach, vivillonEnergyColor, hydreigonDarkTrance, cherrimSpringBloom, cinderaceLibero, coalossalTarGenerator, energyHandDraw, discardFightingAttach, benchSearch, benchSearchCount, benchSearchType, discardBenchSearch, topDeckPickCount, topDeckSearchSubtype, orbeetleBugRadar, machampTerraforming, lunatonePremonition, laprasGoForASwim, galladePremonition, solrockPremonition, handDeckSwap, dragoniteDrawTop, delibirdGiftExchange, shuffleHandDraw, revealHand, opponentHandTrim, unownTell, unownLaugh, unownHelp, unownQuicken, unownGive, unownObserve, unownXray, darkSlowkingCunning, darkSlowkingCunningNoFlip, mankeyPeek: usableMankeyPeek || usableUnownDeckPeek, sableyeTopDeckDiscard: sableyeTopDeckDiscard || morpekoTopDeckDiscard, porygonDeckPeek, unownDeckPeek: usableUnownDeckPeek }]
    }))
}

function getUsableSalamenceTopEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.deck.length === 0) return []
  const salamenceExpected = "once during your turn (before your attack), you may reveal the top card of your deck. if that card is a basic energy card, attach it to 1 of your pokemon. if that card isn't a basic energy card, discard it. this power can't be used if salamence is affected by a special condition."
  const magcargoExpected = 'once during your turn (before your attack), you may discard the top card of your deck. if it’s a basic energy card, attach it to 1 of your pokemon.'
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) && (source.name.toLowerCase() !== 'salamence' || !source.statusConditions?.length))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      if (text !== salamenceExpected && !(source.name.toLowerCase() === 'magcargo-gx' && text === magcargoExpected.replace(/[’]/g, "'")) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      return [{ source, ability, abilityIndex }]
    }))
}

function getUsablePokemonSwapPowers(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const normalizeName = (value: string) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '')
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const power = getTcgBattlePokemonSwapPower(ability.text)
      if (!power || (power.sourceName ? normalizeName(source.name) !== normalizeName(power.sourceName) : !normalizeName(source.name).includes(normalizeName(power.pokemonName)))) return []
      if (power.activeOnly && !state.player.front.some((card) => card.instanceId === source.instanceId) || power.firstTurnOnly && state.turnNumber !== 1) return []
      if (power.afterRetreat && (state.lastAction?.kind !== 'retreat' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId || !state.player.back.some((card) => card.instanceId === source.instanceId))) return []
      const usageKey = power.sharedUse === false ? `${abilityIndex}:${ability.name}` : `shared:${power.powerName}`
      if (power.sharedUse !== false && [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.[usageKey] === state.turnNumber) || source.abilityUses?.[usageKey] === state.turnNumber) return []
      const inheritedDamage = power.resetReplacement ? 0 : Math.max(0, source.hp - source.currentHp)
      const replacementZone = power.replacementZone || 'deck'
      const replacementTargets = state.player[replacementZone].filter((card) => card.hp > inheritedDamage && (power.allowedNames ? power.allowedNames.some((name) => normalizeName(name) === normalizeName(card.name)) : normalizeName(card.name).includes(normalizeName(power.pokemonName))) && !power.excludedNames?.some((name) => normalizeName(name) === normalizeName(card.name)) && (!power.basicOnly || card.subtypes.some((subtype) => normalizeName(subtype) === 'basic')) && (!power.stage1Only || card.subtypes.some((subtype) => normalizeName(subtype) === 'stage1')) && (!power.pokemonVOnly || card.subtypes.some((subtype) => ['v', 'pokemonv'].includes(normalizeName(subtype)))) && (!power.excludePokemonEx || !card.subtypes.some((subtype) => ['ex', 'pokemonex'].includes(normalizeName(subtype)))))
      return replacementTargets.length ? [{ source, ability, abilityIndex, power, replacementTargets }] : []
    }))
}

function getUsableBenchShuffleAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const normalize = (value: string) => value.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = normalize(ability.text)
      const pidgeotPower = /^once during your turn \(before your attack\), if pidgeot is your active pokemon, you may shuffle 1 of your benched pokemon and all cards attached to it into your deck\. this power can't be used if pidgeot is affected by a special condition\.$/.test(text)
        && normalize(source.name) === 'pidgeot'
        && state.player.front.some((card) => card.instanceId === source.instanceId)
        && !source.statusConditions?.length
      const suicunePower = /^once during your turn \(before your attack\), if this pokemon is on your bench, you may shuffle it and all cards attached to it into your deck\.$/.test(text)
        && normalize(source.name).startsWith('suicune')
        && state.player.back.some((card) => card.instanceId === source.instanceId)
      const jumpluffPower = text === 'once during your turn (before your attack), you may return this pokemon and all cards attached to it to your hand.' && normalize(source.name) === 'jumpluff'
      const azumarillReturn = normalize(source.name) === 'azumarill' && text === 'once during your turn (before your attack), if azumarill is on your bench, you may flip a coin. if heads, return azumarill and all cards attached to it to your hand.'
      const toxicroakGReturn = normalize(source.name).replace(/[^a-z0-9]/g, '') === 'toxicroakg' && text === "once during your turn (before your attack), if toxicroak is your active pokemon, you may flip a coin. if heads, return toxicroak and all cards attached to it to your hand. this power can't be used if toxicroak is affected by a special condition."
      const umbreonActiveReturn = normalize(source.name) === 'umbreon' && text === "once during your turn (before your attack), if umbreon is your active pokemon, you may flip a coin. if heads, return umbreon and all cards attached to it to your hand. this power can't be used if umbreon is affected by a special condition."
      const activeCoinReturn = toxicroakGReturn || umbreonActiveReturn
      const wishiwashiCowardice = normalize(source.name) === 'wishiwashi' && text === "once during your turn (before your attack), you may discard all cards attached to this pokemon and return it to your hand. you can't use this ability during your first turn or on the turn this pokemon was put into play."
      const starmiePower = text === 'once during your turn (before your attack), you may shuffle this pokemon and all cards attached to it into your deck.' && normalize(source.name) === 'starmie'
      const undevelop = /^once during your turn \(before your attack\), you may devolve (flareon|jolteon|vaporeon) and put \1 into your hand\. this power can't be used if \1 is affected by a special condition\.$/.test(text)
        && normalize(source.name) === text.match(/you may devolve (flareon|jolteon|vaporeon)/)?.[1]
        && Boolean(source.evolutionStack?.length)
        && !source.statusConditions?.length
      const gengarDevolution = normalize(source.name) === 'gengar lv.x' && text === "once during your turn (before your attack), you may choose 1 of your opponent's pokemon lv.x. remove the level-up card from that pokemon and have your opponent shuffle that card into his or her deck. the power can't be used if gengar is affected by a special condition."
      const archeopsDevolution = normalize(source.name) === 'archeops' && text === "once during your turn, if this pokemon is in the active spot, you may devolve 1 of your opponent's evolved pokemon by putting the highest stage evolution card on it into your opponent's hand."
      const dusknoirPower = normalize(source.name) === 'dusknoir' && text === "once during your turn (before your attack), if your opponent has 4 or more benched pokemon, you may choose 1 of them and shuffle that pokemon and all cards attached to it into his or her deck. this power can't be used if dusknoir is affected by a special condition."
      const crawdauntExReturn = normalize(source.name) === 'crawdaunt ex' && text === "once during your turn (before your attack), if your opponent has 4 or more benched pokemon, you may choose 1 of them and return that pokemon and all cards attached to it to his or her hand. this power can't be used if crawdaunt ex is affected by a special condition."
      const aipomSnappyMove = normalize(source.name) === 'aipom' && text === "once during your turn (before your attack), if aipom is on your bench, you may draw a card. then, discard all cards attached to aipom and put aipom on the bottom of your deck. you can't use more than 1 snappy move poké-power each turn."
      const unownRDraw = normalize(source.name).replace(/[^a-z0-9]/g, '') === 'unownr' && text === 'once during your turn, if unown r is on your bench, you may discard unown r and all cards attached to it. (this doesn\'t count as a knocked out pokemon.) then, draw a card.'
      const unownFarewellLetter = normalize(source.name).replace(/[^a-z0-9]/g, '') === 'unown' && text === 'once during your turn (before your attack), if this pokemon is on your bench, you may discard this pokemon and all cards attached to it (this does not count as a knocked out pokemon). if you do, draw a card.'
      const unownZTopDeck = normalize(source.name).replace(/[^a-z0-9]/g, '') === 'unownz' && text === 'once during your turn (before your attack), if unown z is on your bench and you have no cards in your deck, you may discard all cards attached to unown z and put unown z on top of your deck.' && state.player.back.some((card) => card.instanceId === source.instanceId) && state.player.deck.length === 0
      const mistysPsyduckReturn = normalize(source.name) === "misty's psyduck" && text === 'once during your turn, if this pokemon is on your bench, you may discard the bottom card of your deck. if you do, discard all cards from this pokemon and put this pokemon on top of your deck.'
      if (!pidgeotPower && !suicunePower && !jumpluffPower && !azumarillReturn && !activeCoinReturn && !wishiwashiCowardice && !starmiePower && !undevelop && !unownRDraw && !unownFarewellLetter && !unownZTopDeck && !gengarDevolution && !archeopsDevolution && !dusknoirPower && !crawdauntExReturn && !aipomSnappyMove && !mistysPsyduckReturn || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || mistysPsyduckReturn && (state.player.deck.length === 0 || !state.player.back.some((card) => card.instanceId === source.instanceId) || state.player.abilityUses?.[`flustered leap:${source.id}`] === state.turnNumber)) return []
      if (dusknoirPower && (source.statusConditions?.length || state.opponent.back.filter((card) => card.currentHp > 0).length < 4)) return []
      if (crawdauntExReturn && (source.statusConditions?.length || state.opponent.back.filter((card) => card.currentHp > 0).length < 4)) return []
      if (gengarDevolution && (source.statusConditions?.length || ![...state.opponent.front, ...state.opponent.back].some((card) => card.currentHp > 0 && card.name.toLowerCase().includes('lv.x') && card.evolutionStack?.length))) return []
      if (archeopsDevolution && (!state.player.front.some((card) => card.instanceId === source.instanceId) || ![...state.opponent.front, ...state.opponent.back].some((card) => card.currentHp > 0 && card.evolutionStack?.length))) return []
      if ((unownRDraw || unownFarewellLetter) && (!state.player.back.some((card) => card.instanceId === source.instanceId) || state.player.deck.length === 0)) return []
      if (unownZTopDeck && (!state.player.back.some((card) => card.instanceId === source.instanceId) || state.player.deck.length > 0)) return []
      if (aipomSnappyMove && (!state.player.back.some((card) => card.instanceId === source.instanceId) || state.player.deck.length === 0 || [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.['shared:snappy move'] === state.turnNumber))) return []
      if (jumpluffPower && state.player.front.some((card) => card.instanceId === source.instanceId) && ![...state.player.front, ...state.player.back].some((card) => card.instanceId !== source.instanceId && card.currentHp > 0)) return []
      if (azumarillReturn && !state.player.back.some((card) => card.instanceId === source.instanceId)) return []
      if (activeCoinReturn && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length || ![...state.player.front, ...state.player.back].some((card) => card.instanceId !== source.instanceId && card.currentHp > 0))) return []
      if (wishiwashiCowardice && (source.playedToBenchTurn === state.turnNumber || state.turnNumber === (state.playerGoesSecond ? 2 : 1) || ![...state.player.front, ...state.player.back].some((card) => card.instanceId !== source.instanceId && card.currentHp > 0))) return []
      if (starmiePower && ![...state.player.front, ...state.player.back].some((card) => card.instanceId !== source.instanceId && card.currentHp > 0)) return []
      const targets = pidgeotPower ? state.player.back.filter((card) => card.currentHp > 0) : gengarDevolution || archeopsDevolution ? [...state.opponent.front, ...state.opponent.back].filter((card) => card.currentHp > 0 && card.evolutionStack?.length && (!gengarDevolution || card.name.toLowerCase().includes('lv.x'))) : dusknoirPower || crawdauntExReturn ? state.opponent.back.filter((card) => card.currentHp > 0) : [source]
      return targets.map((target) => ({ source, ability, abilityIndex, target, selfReturn: suicunePower, returnToHand: jumpluffPower || azumarillReturn || activeCoinReturn, azumarillReturn, activeCoinReturn, wishiwashiCowardice, selfShuffle: starmiePower, unownFarewellLetter, unownZTopDeck, undevelop, gengarDevolution, archeopsDevolution, dusknoirPower, crawdauntExReturn, aipomSnappyMove, mistysPsyduckReturn }))
    }))
}

function getUsableDiscardRecoveryAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const discardRecovery = state.player.discard.flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
    const supported = /^once during your turn \(before your attack\), if this pokemon is in your discard pile, you may put this pokemon (?:on the bottom of your deck|into your hand)\.$/.test(text)
    const empoleonRecall = source.name.toLowerCase() === 'empoleon' && text === 'once during your turn, if this pokemon is in your discard pile and you have no cards in your hand, you may put this pokemon onto your bench. if you do, draw 3 cards.' && state.player.hand.length === 0 && state.player.back.length < 5
    const usageKey = `discard:${source.id}:${abilityIndex}:${ability.name}`
    if (!supported && !empoleonRecall || state.player.abilityUses?.[usageKey] === state.turnNumber) return []
    return [{ source, ability, abilityIndex, empoleonRecall }]
  }))
  const suicuneRecovery = state.player.back.flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
    const supported = source.name.toLowerCase() === 'suicune' && text === 'once during your turn, when you put suicune from your hand onto your bench, you may search your discard pile for up to 3 water pokemon, show them to your opponent, and put them into your hand.'
    if (!supported || source.playedToBenchTurn !== state.turnNumber || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || !state.player.discard.some((card) => card.types.some((type) => type.toLowerCase() === 'water'))) return []
    return [{ source, ability, abilityIndex, suicuneRecovery: true as const, empoleonRecall: false }]
  }))
  const starmieRecovery = [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
    const supported = source.name.toLowerCase() === 'starmie' && text === "once during your turn (before your attack), you may search your discard pile for a water energy card, show it to your opponent, and put it into your hand. this power can't be used if starmie is affected by a special condition."
    if (!supported || source.statusConditions?.length || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || !state.player.discard.some((card) => card.name.toLowerCase() === 'water energy' && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))) return []
    return [{ source, ability, abilityIndex, starmieRecovery: true as const, empoleonRecall: false }]
  }))
  return [...discardRecovery, ...suicuneRecovery, ...starmieRecovery]
}

function isTcgBattleBenchToActiveAbility(text: string, sourceName: string) {
  if (/^once during your turn(?: \(before your attack\))?, if this pokemon is on your bench, you may switch (?:it|this pokemon) with your active pokemon\.$/.test(text) ||
    /^once during your turn \(before your attack\), if this pokemon is on your bench, you may switch this pokemon with your active pokemon\.$/.test(text)) return true
  const namedSource = text.match(/^once during your turn(?: \(before (?:your|you) attack\))?,? if ([a-z0-9' -]+) is on your bench, you may switch (?:it|this pokemon) with your active pokemon\.$/)?.[1]
  if (!namedSource) return false
  const normalize = (value: string) => value.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  return normalize(namedSource) === normalize(sourceName)
}

function getUsableBenchSwitchAbilities(state: TcgBattleState, active?: TcgBattleCardState) {
  if (!active || active.temporaryEffects?.cannotSwitch || state.phase !== 'battle' || state.activeSide !== 'player') return []
  return state.player.back
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim()
      const supported = isTcgBattleBenchToActiveAbility(text, source.name) ||
        text === "once during your turn, you may switch 1 of your benched {d} pokemon, except any pecharunt ex, with your active pokemon. if you do, the new active pokemon is now poisoned. you can't use more than 1 subjugating chains ability each turn."
      const isSubjugatingChains = text.includes('subjugating chains ability')
      if (isSubjugatingChains && (!source.types.some((type) => type.toLowerCase() === 'darkness') || source.name.toLowerCase().includes('pecharunt ex'))) return []
      const usageKey = isSubjugatingChains ? `shared:${ability.name}` : `${abilityIndex}:${ability.name}`
      const alreadyUsed = isSubjugatingChains
        ? [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.[usageKey] === state.turnNumber)
        : source.abilityUses?.[usageKey] === state.turnNumber
      if (!supported || alreadyUsed) return []
      return [{ source, ability, abilityIndex }]
    }))
}

function getUsableActiveSwitchAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const lumineonGust = source.name.toLowerCase() === 'lumineon' && text === "once during your turn (before your attack), if lumineon is your active pokemon, you may choose 1 of your opponent's benched pokemon that has maximum hp of 100 or more and switch it with 1 of the defending pokemon. this power can't be used if lumineon is affected by a special condition."
      const weavileDarkCut = source.name.toLowerCase() === 'weavile' && text === "once during your turn, when this pokemon moves from your bench to the active spot, you may switch in 1 of your opponent's benched basic pokemon to the active spot."
      const opponentGust = lumineonGust || weavileDarkCut || /^once during your turn, if this pokemon is in the active spot, you may switch in 1 of your opponent's benched pokemon(?: that (?:has damage on it|is basic))? to the active spot\.$/.test(text)
      const dragonWind = source.name.toLowerCase() === 'salamence' && text === "if this pokemon is your active pokemon, once during your turn (before your attack), you may switch 1 of your opponent's benched pokemon with their active pokemon."
      const ironBundleSwitch = text === "once during your turn, if this pokemon is on your bench, you may switch out your opponent's active pokemon to the bench. (your opponent chooses the new active pokemon.) if you do, discard this pokemon and all attached cards."
      const driveOff = text === "as long as light arcanine is your active pokemon, once during your turn (before your attack), if your opponent has any benched pokemon, he or she chooses 1 of them and switches it with the defending pokemon. this power can't be used while light arcanine is asleep, confused, or paralyzed."
      const swellowDriveOff = text === "once during your turn (before your attack), you may have your opponent switch his or her active pokemon with 1 of his or her benched pokemon." || text === "once during your turn (before your attack), you may have your opponent switch their active pokemon with 1 of their benched pokemon." || text === "once during your turn, you may have your opponent switch their active pokemon with 1 of their benched pokemon." || text === "once during your turn (before your attack), if this pokemon is your active pokemon, you may have your opponent switch his or her active pokemon with 1 of his or her benched pokemon." || text === "once during your turn (before your attack), if this pokemon is your active pokemon, you may have your opponent switch their active pokemon with 1 of their benched pokemon."
      const swellowBasicForcedSwitch = source.name.toLowerCase() === 'swellow' && text === "once during your turn, you may switch out your opponent's active basic pokemon to the bench. (your opponent chooses the new active pokemon.)"
      const opponentForcedSwitch = ironBundleSwitch || driveOff || swellowDriveOff || swellowBasicForcedSwitch || text === "once during your turn, you may use this ability. switch out your opponent's active pokemon to the bench. (your opponent chooses the new active pokemon.)" || /^once during your turn, you may switch out your opponent's active pokemon to the bench\. \(your opponent chooses the new active pokemon\.\)$/.test(text) || text === "once during your turn, if this pokemon is in the active spot, you may switch out your opponent's active pokemon to the bench. (your opponent chooses the new active pokemon.)"
      const opponentVstarSwitch = /^during your turn, you may switch 1 of your opponent's benched pokemon with their active pokemon\. \(you can't use more than 1 vstar power in a game\.\)$/.test(text)
      const bigWing = text === "once during your turn (before your attack), if this pokemon is your active pokemon, you may have your opponent switch his or her active pokemon with 1 of his or her benched pokemon." || text === "if this pokemon is your active pokemon, once during your turn (before your attack), you may have your opponent switch their active pokemon with 1 of their benched pokemon." || text === "once during your turn (before your attack), you may have your opponent switch his or her active pokemon with 1 of his or her benched pokemon. this power can't be used if infernape e4 is affected by a special condition."
      const intimidatingRoar = source.name.toLowerCase() === 'infernape e4 lv.x' && bigWing
      const unownMGust = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unownm' && text === "once during your turn (before your attack), if unown m is your active pokemon, you may flip a coin. if heads, switch 1 of your opponent's benched pokemon with 1 of the defending pokemon. this power can't be used if unown m is affected by a special condition."
      const fragranceTrap = unownMGust || /^once during your turn \(before your attack\), you may flip a coin\. if heads, and if your opponent has any benched pokemon, choose 1 of them and switch it with his or her active pokemon\. this power can't be used if erika's victreebel is asleep, confused, or paralyzed\.$/.test(text) || text === "once during your turn (before your attack), you may flip a coin. if heads, choose 1 of your opponent's benched pokemon and switch the defending pokemon with it. this power can't be used if victreebel is affected by a special condition."
      const nidoqueenMaternalCall = source.name.toLowerCase() === 'nidoqueen' && text === "once during your turn, you may use this ability. flip a coin. if heads, switch in 1 of your opponent's benched pokemon to the active spot."
      const appletunAroma = text === 'once during your turn, you may flip a coin. if heads, switch 1 of your opponent\'s benched basic pokemon with their active pokemon.' || source.name.toLowerCase() === 'rillaboom' && text === "once during your turn, you may flip a coin. if heads, switch in 1 of your opponent's benched pokemon to the active spot." || nidoqueenMaternalCall
      const captivatingRhythm = source.name.toLowerCase() === 'ludicolo' && ability.name === 'Captivating Rhythm' && text === 'once during your turn (before your attack), you may flip a coin. if heads, switch 1 of your opponent\'s benched pokemon with their active pokemon.'
      const regiMove = source.name.toLowerCase() === 'regice' && text === "once during your turn (before your attack), you may use this power. discard 2 cards from your hand and choose 1 of your opponent's active pokemon that isn't an evolved pokemon. then, your opponent switches that pokemon with 1 of his or her benched pokemon. this power can't be used if regice is affected by a special condition."
      const waterActiveSwitch = text === 'once during your turn, you may switch your active {w} pokemon with 1 of your benched pokemon.'
      const politoedLeapFrog = source.name.toLowerCase() === 'politoed' && text === 'once during your turn (before your attack), you may choose a water pokemon on your bench and switch it with your active pokemon. this power can\'t be used if politoed is affected by a special condition.'
      const magneticWarp = text === 'once during your turn (before your attack), you may switch your active pokemon with 1 of your benched pokemon. if you do, your opponent switches his or her active pokemon with 1 of his or her benched pokemon.' || text === 'once during your turn, you may switch your active pokemon with 1 of your benched pokemon. if you do, your opponent switches their active pokemon with 1 of their benched pokemon.'
      const mawileStarRondo = source.name.toLowerCase() === 'mawile vstar' && text === "during your turn, if this pokemon is on your bench, you may switch it with your active pokemon. if you do, switch 1 of your opponent's benched pokemon with their active pokemon. (you can't use more than 1 vstar power in a game.)"
      const decidueyeTotalFreedom = source.name.toLowerCase() === 'decidueye ex' && text === 'once during your turn, you may use this ability. if this pokemon is on the bench, switch it with your active pokemon. or, if this pokemon is in the active spot, switch it with 1 of your benched pokemon.'
      const ownSwitch = /^once during your turn(?: \(before your attack\))?, (?:you may use this ability\. switch|you may switch) your active pokemon with 1 of your benched pokemon\.$/.test(text) || waterActiveSwitch
      const gardevoirTeleportation = text === 'once during your turn (before your attack), choose 1 of your active pokemon or 1 of your benched pokemon and switch gardevoir with that pokemon. this power can\'t be used if gardevoir is affected by a special condition.'
      const supported = ownSwitch || decidueyeTotalFreedom || mawileStarRondo || opponentGust || dragonWind || opponentForcedSwitch || opponentVstarSwitch || bigWing || fragranceTrap || appletunAroma || captivatingRhythm || magneticWarp || gardevoirTeleportation || regiMove || politoedLeapFrog
      if (opponentVstarSwitch && state.player.usedVstarPower) return []
      if (bigWing && (!state.player.front.some((card) => card.instanceId === source.instanceId) || intimidatingRoar && source.statusConditions?.length)) return []
      if (opponentGust && (!state.player.front.some((card) => card.instanceId === source.instanceId) || lumineonGust && source.statusConditions?.length)) return []
      if (weavileDarkCut && (state.lastAction?.kind !== 'retreat' || state.lastAction.side !== 'player' || state.lastAction.backId !== source.instanceId)) return []
      if (dragonWind && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (ironBundleSwitch && !state.player.back.some((card) => card.instanceId === source.instanceId)) return []
      if (driveOff && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)))) return []
      if (swellowDriveOff && text.includes('if this pokemon is your active pokemon') && !state.player.front.some((card) => card.instanceId === source.instanceId)) return []
      if (swellowBasicForcedSwitch && !state.opponent.front.some((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))) return []
      if (waterActiveSwitch && (!state.player.front.some((card) => card.instanceId === source.instanceId) || !source.types.some((type) => type.toLowerCase() === 'water'))) return []
      if (politoedLeapFrog && (source.statusConditions?.length || !state.player.front.some((card) => card.currentHp > 0) || !state.player.back.some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'water')))) return []
      if (gardevoirTeleportation && (source.name.toLowerCase() !== 'gardevoir lv.x' || source.statusConditions?.length)) return []
      if (appletunAroma && !['appletun', 'rillaboom', 'nidoqueen'].includes(source.name.toLowerCase())) return []
      if (regiMove && (source.statusConditions?.length || state.player.hand.length < 2 || !state.opponent.back.some((card) => card.currentHp > 0))) return []
      if (magneticWarp && (!state.player.front.some((card) => card.currentHp > 0) || !state.opponent.front.some((card) => card.currentHp > 0) || !state.opponent.back.some((card) => card.currentHp > 0))) return []
      if (regiMove) return state.opponent.front.filter((target) => target.currentHp > 0 && !target.subtypes.some((subtype) => ['stage 1', 'stage 2', 'stage 3', 'level-up'].includes(subtype.toLowerCase()))).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: true, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false, regiMove: true }))
      if (magneticWarp) return state.player.back.filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: false, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false }))
      if (decidueyeTotalFreedom) return (state.player.front.some((card) => card.instanceId === source.instanceId) ? state.player.back : state.player.front).filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: false, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false }))
      if (mawileStarRondo && (!state.player.back.some((card) => card.instanceId === source.instanceId) || state.player.usedVstarPower || !state.player.front.some((card) => card.currentHp > 0) || !state.opponent.front.some((card) => card.currentHp > 0) || !state.opponent.back.some((card) => card.currentHp > 0))) return []
      if (mawileStarRondo) return state.opponent.back.filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: true, opponentForcedSwitch: false, opponentVstarSwitch: true, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false }))
      if (!supported || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || fragranceTrap && (unownMGust && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length) || text.includes('victreebel is affected by a special condition') && source.statusConditions?.length || !unownMGust && !text.includes('victreebel is affected by a special condition') && source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)))) return []
      if (opponentGust || dragonWind || fragranceTrap || appletunAroma || captivatingRhythm) return state.opponent.back.filter((target) => target.currentHp > 0 && (!lumineonGust || target.hp >= 100) && (!text.includes('benched basic pokemon') || target.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: true, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap, appletunAroma, captivatingRhythm, dragonWind }))
      if (bigWing) return state.opponent.back.filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: true, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: true, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false }))
      if (opponentForcedSwitch || opponentVstarSwitch || bigWing) {
        if (swellowBasicForcedSwitch && !state.opponent.front.some((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))) return []
        const target = state.opponent.back.find((card) => card.currentHp > 0)
        return target ? [{ source, target, ability, abilityIndex, opponentTarget: true, opponentForcedSwitch, opponentVstarSwitch, bigWing, ironBundleSwitch, fragranceTrap: false, appletunAroma: false, dragonWind: false }] : []
      }
      if (gardevoirTeleportation) return [...state.player.front, ...state.player.back].filter((target) => target.currentHp > 0 && target.instanceId !== source.instanceId && state.player.front.some((card) => card.instanceId === source.instanceId) !== state.player.front.some((card) => card.instanceId === target.instanceId)).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: false, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false }))
      if (politoedLeapFrog) return state.player.back.filter((target) => target.currentHp > 0 && target.types.some((type) => type.toLowerCase() === 'water')).map((target) => ({ source, target, ability, abilityIndex, opponentTarget: false, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false, politoedLeapFrog: true }))
      if (source.temporaryEffects?.cannotSwitch) return []
      return state.player.back
        .filter((target) => target.currentHp > 0)
        .map((target) => ({ source, target, ability, abilityIndex, opponentTarget: false, opponentForcedSwitch: false, opponentVstarSwitch: false, bigWing: false, ironBundleSwitch: false, fragranceTrap: false, appletunAroma: false, dragonWind: false }))
    }))
}

function getUsableVenomothShiftAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const cards = [...state.player.front, ...state.player.back, ...state.opponent.front, ...state.opponent.back].filter((card) => card.currentHp > 0)
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !source.statusConditions?.some((condition) => ['asleep', 'confused', 'paralyzed'].includes(condition)) && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
      const venomothShift = text === "once during your turn (before your attack), you may change the type of venomoth to the type of any other pokemon in play other than colorless. this power can't be used if venomoth is asleep, confused, or paralyzed."
      const ninetalesTypeCopy = source.name.toLowerCase() === 'ninetales' && text === "once during your turn (before your attack), you may choose 1 of your opponent's pokemon. ninetales is the same type as that pokemon (all if that pokemon is more than 1 type) until the end of your turn. this power can't be used if ninetales is affected by a special condition."
      const lanturnSubmerge = text === "once during your turn (before your attack), you may change lanturn's type to water until the end of your turn. this power can't be used if lanturn is asleep, confused, or paralyzed. if lanturn becomes asleep, confused, or paralyzed after you have used this power, its type changes back to lightning."
      const lunatoneLunarEclipse = text === "once during your turn (before your attack), if solrock is in play, you may use this power. until the end of your turn, lunatone's type is darkness. this power can't be used if lunatone is affected by a special condition."
      const solrockSolarEclipse = text === "once during your turn (before your attack), if lunatone is in play, you may use this power. until the end of your turn, solrock's type is fire. this power can't be used if solrock is affected by a special condition."
      const weavileDarkEngage = source.name.toLowerCase() === 'weavile' && text === "once during your turn (before your attack), you may use this power. each of your active pokemon's type is darkness until the end of your turn. if that pokemon is no longer your active pokemon, this effect ends."
      const claydolExFighting = text === "once during your turn (before your attack), you may use this power. claydol ex's type is fighting until the end of your turn."
      const rotomPsychicShift = text === "once during your turn (before your attack), you may use this power. rotom's type is psychic until the end of your turn."
      const salamenceExFire = text === "once during your turn (before your attack), you may use this power. salamence ex's type is fire until the end of your turn."
      const fixedTypePower = claydolExFighting || rotomPsychicShift || salamenceExFire
      const rotomType = text.match(/^once during your turn \(before your attack\), you may use this power\. (fan|frost|heat|mow|wash) rotom's type is (colorless|water|fire|grass|lightning) until the end of your turn\.$/)
      if ((!venomothShift && !ninetalesTypeCopy && !lanturnSubmerge && !lunatoneLunarEclipse && !solrockSolarEclipse && !weavileDarkEngage && !rotomType && !fixedTypePower) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || ninetalesTypeCopy && source.statusConditions?.length) return []
      if (fixedTypePower) return [{ source, target: source, type: claydolExFighting ? 'Fighting' : rotomPsychicShift ? 'Psychic' : 'Fire', ability, abilityIndex }]
      if (weavileDarkEngage) return [{ source, target: source, type: 'Darkness', ability, abilityIndex }]
      if (rotomType) return [{ source, target: source, type: rotomType[2] === 'colorless' ? 'Colorless' : rotomType[2][0].toUpperCase() + rotomType[2].slice(1), ability, abilityIndex }]
      if (lanturnSubmerge) return [{ source, target: source, type: 'Water', ability, abilityIndex }]
      if (lunatoneLunarEclipse || solrockSolarEclipse) {
        const requiredPartner = lunatoneLunarEclipse ? 'solrock' : 'lunatone'
        const partnerIsInPlay = [...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.name.toLowerCase() === requiredPartner)
        if (!partnerIsInPlay) return []
        return [{ source, target: source, type: lunatoneLunarEclipse ? 'Darkness' : 'Fire', ability, abilityIndex }]
      }
      if (ninetalesTypeCopy) return state.opponent.front.concat(state.opponent.back).flatMap((target) => {
        const targetTypes = getTcgBattleEffectiveTypes(target, state)
        return targetTypes.length ? [{ source, target, type: targetTypes.join(', '), ability, abilityIndex }] : []
      })
      return cards.flatMap((target) => target.instanceId === source.instanceId ? [] : getTcgBattleEffectiveTypes(target, state).filter((type) => type.toLowerCase() !== 'colorless').map((type) => ({ source, target, type, ability, abilityIndex })))
    }))
}

function getUsableActiveStatusAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap<any>((source) => (source.abilities || []).flatMap<any>((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const coinFlipStatus = getTcgBattleCoinFlipStatusPower(ability.text)
      const igglybuffDreamDance = source.name.toLowerCase() === 'igglybuff' && text === "once during your turn (before your attack), you may flip a coin. if heads, your opponent's active pokemon is now asleep. if you use this ability, your turn ends."
      const poisonPollen = ability.name === 'Poison Pollen' && coinFlipStatus === 'poisoned'
      const golduckPsyduckStep = source.name.toLowerCase() === 'golduck' && text.includes('if golduck is your active pokemon')
      const drapionPoisonClaws = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'drapionlvx' && coinFlipStatus === 'poisoned'
      const drapionVstarVenomousVortex = source.name.toLowerCase() === 'drapion vstar' && text === "during your turn, you may make your opponent's active pokemon paralyzed and poisoned. during pokemon checkup, put 3 damage counters on that pokemon instead of 1. (you can't use more than 1 vstar power in a game.)"
      const houndoomFireBreath = source.name.toLowerCase() === 'houndoom' && coinFlipStatus === 'burned' && text.includes('this power can\'t be used if houndoom is affected by a special condition')
      const hypnoSleepPendulum = source.name.toLowerCase() === 'hypno' && text === "once during your turn (before your attack), if hypno is your active pokemon, you may make the defending pokemon asleep. this power can't be used if hypno is affected by a special condition."
      const selectiveSlime = isTcgBattleCradilySelectiveSlime(ability.text)
      const vileplumeChoiceStatus = isTcgBattleVileplumeChoiceStatus(ability.text)
      const miracleAroma = isTcgBattleVenusaurMiracleAroma(ability.text)
      const xatuPsychicShift = isTcgBattleXatuPsychicShift(ability.text)
      const unownYRecovery = source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'unowny' && text === 'once during your turn (before your attack), if unown y is on your bench, you may remove 1 damage counter from 1 of your active unown and that unown is now asleep.'
      const darkHoundoomFireBreath = isTcgBattleDarkHoundoomFireBreath(ability.text)
      const delphoxMysticalTorch = source.name.toLowerCase() === 'delphox' && text === "once during your turn (before your attack), you may leave your opponent's active pokemon burned."
      const typhlosionBurn = source.name.toLowerCase() === 'typhlosion' && text === "once during your turn, you may make your opponent's active pokemon burned."
      const venusaurPureBody = source.name.toLowerCase() === 'venusaur' && text === "once during your turn (before your attack), you may use this power. your active pokemon and the defending pokemon are no longer asleep, confused, paralyzed, or poisoned. this power can't be used if venusaur is asleep, confused, or paralyzed."
      const mareepFluffyPillow = source.name.toLowerCase() === 'mareep' && text === "once during your turn (before your attack), if this pokemon is your active pokemon, you may leave your opponent's active pokemon asleep."
      const blazikenFireBreath = source.name.toLowerCase() === 'blaziken' && text === "once during your turn (before your attack), you may choose 1 of the defending pokemon. that pokemon is now burned. this power can't be used if blaziken is affected by a special condition."
      const torridWave = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'magmortarlvx' && text === "once during your turn (before your attack), if magmortar is your active pokemon, you may choose 1 of the defending pokemon. that pokemon is now burned. put 3 damage counters instead of 2 on that pokemon between turns. this power can't be used if magmortar is affected by a special condition."
      const statusMatch = text.match(/^once during your turn(?: \(before your attack\))?, if this pokemon is (?:in the active spot|your active pokemon), you may make your opponent's active pokemon (?:now )?(asleep|confused|paralyzed|poisoned|burned)\.$/)
      const hisuianTyphlosionHex = source.name.toLowerCase() === 'hisuian typhlosion' && text === "you must discard a psychic energy card from your hand in order to use this ability. once during your turn, you may make your opponent's active pokemon burned and confused."
      const darkCrobatPoison = isTcgBattleDarkCrobatPoison(ability.text)
      const bothActiveSleep = source.name.toLowerCase() === 'hypno' && ability.name === 'Goodnight, Babies' && text === 'once during your turn (before your attack), you may leave both active pokemon asleep.' || source.name.toLowerCase() === 'wigglytuff' && text === 'once during your turn (before your attack), you may use this power. each active pokemon (both yours and your opponent\'s) is now asleep. this power can\'t be used if wigglytuff is affected by a special condition.'
      const ariadosPoison = source.name.toLowerCase() === 'ariados' && text === 'once during your turn (before your attack), you may use this ability. both active pokemon (except for grass pokemon) are now poisoned.'
      const victreebelConfusingPoison = source.name.toLowerCase() === 'victreebel' && text === "once during your turn (before your attack), you may discard a grass energy attached to this pokemon. if you do, your opponent's active pokemon is now confused and poisoned."
      const headTrip = ability.name === 'Head Trip' && text === 'once during your turn (before your attack), if haunter is on your bench, you may use this power. one of your active pokemon is now confused.'
      const poliwagSecondTurn = source.name.toLowerCase() === 'poliwag' && text === "you can use this ability only if you go second. once during your first turn (before your attack), you may leave your opponent's active pokemon confused."
      const status = (coinFlipStatus || statusMatch?.[1] || (drapionVstarVenomousVortex ? 'poisoned' : undefined) || (victreebelConfusingPoison || poliwagSecondTurn ? 'confused' : undefined) || (hisuianTyphlosionHex || delphoxMysticalTorch || typhlosionBurn || darkHoundoomFireBreath || blazikenFireBreath || torridWave ? 'burned' : undefined) || (darkCrobatPoison || ariadosPoison ? 'poisoned' : undefined) || (headTrip || miracleAroma || xatuPsychicShift || bothActiveSleep || hypnoSleepPendulum || selectiveSlime || vileplumeChoiceStatus || mareepFluffyPillow || venusaurPureBody ? 'asleep' : undefined)) as TcgBattleStatusCondition | undefined
      if (poisonPollen && source.statusConditions?.length) return []
      if (golduckPsyduckStep && (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length)) return []
      if ((!status || poliwagSecondTurn && (state.turnNumber !== 1 || state.playerGoesSecond !== true) || headTrip && !state.player.back.some((card) => card.instanceId === source.instanceId) || !coinFlipStatus && !miracleAroma && !headTrip && !xatuPsychicShift && !unownYRecovery && !bothActiveSleep && !hypnoSleepPendulum && !ariadosPoison && !victreebelConfusingPoison && !venusaurPureBody && !selectiveSlime && !vileplumeChoiceStatus && !hisuianTyphlosionHex && !delphoxMysticalTorch && !typhlosionBurn && !blazikenFireBreath && !torridWave && !houndoomFireBreath && !poliwagSecondTurn && !drapionVstarVenomousVortex && !state.player.front.some((card) => card.instanceId === source.instanceId) || (mareepFluffyPillow || delphoxMysticalTorch || hypnoSleepPendulum || torridWave) && !state.player.front.some((card) => card.instanceId === source.instanceId) || victreebelConfusingPoison && (!state.player.front.some((card) => card.instanceId === source.instanceId) && !state.player.back.some((card) => card.instanceId === source.instanceId) || state.player.energy < 1 || state.player.selectedEnergy?.toLowerCase() !== 'grass') || hisuianTyphlosionHex && (!state.player.hand.some((card) => card.name.toLowerCase().includes('psychic energy')) || !state.opponent.front.some((card) => card.currentHp > 0 && (!card.statusConditions?.includes('burned') || !card.statusConditions?.includes('confused')))) || typhlosionBurn && (!state.opponent.front.some((card) => card.currentHp > 0 && !card.statusConditions?.includes('burned')) || !state.player.front.some((card) => card.currentHp > 0)) || igglybuffDreamDance && !state.opponent.front.some((card) => card.currentHp > 0) || headTrip && state.player.front.length === 0 || (bothActiveSleep || ariadosPoison || mareepFluffyPillow || poliwagSecondTurn || hypnoSleepPendulum || torridWave) && (!state.player.front.some((card) => card.currentHp > 0) || !state.opponent.front.some((card) => card.currentHp > 0)) || drapionVstarVenomousVortex && (!state.opponent.front.some((card) => card.currentHp > 0) || state.player.usedVstarPower)) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || venusaurPureBody && source.statusConditions?.some((condition) => ['asleep', 'confused', 'paralyzed'].includes(condition)) || (miracleAroma && source.statusConditions?.length) || (hypnoSleepPendulum && source.statusConditions?.length) || (bothActiveSleep && source.statusConditions?.length) || houndoomFireBreath && source.statusConditions?.length || (coinFlipStatus && !igglybuffDreamDance || darkHoundoomFireBreath) && source.statusConditions?.some((condition) => ['asleep', 'confused', 'paralyzed'].includes(condition)) || drapionPoisonClaws && source.statusConditions?.length || blazikenFireBreath && source.statusConditions?.length || torridWave && source.statusConditions?.length || darkCrobatPoison && source.statusConditions?.length) return []
      if (unownYRecovery) return state.player.front.flatMap((active) => active.currentHp > 0 && active.currentHp < active.hp && active.name.toLowerCase().includes('unown') && !active.statusConditions?.includes('asleep') ? [{ source, ability, abilityIndex, status: 'asleep' as const, transferSourceId: active.instanceId, targetId: undefined as string | undefined, coinFlipStatus: false, headTrip: false, bothActiveSleep: false, ariadosPoison: false, unownYRecovery: true, torridWave: false }] : [])
      if (xatuPsychicShift) {
        if (source.name.toLowerCase() !== 'xatu' || !state.player.back.some((card) => card.instanceId === source.instanceId) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || !state.opponent.front.some((card) => card.currentHp > 0)) return []
        return state.player.front.flatMap((active) => active.currentHp > 0 ? (active.statusConditions || []).map((condition) => ({ source, ability, abilityIndex, status: condition, transferSourceId: active.instanceId as string | undefined, targetId: undefined as string | undefined, coinFlipStatus: false, headTrip: false, bothActiveSleep: false, ariadosPoison: false, unownYRecovery: false, torridWave: false, drapionVstarVenomousVortex: false })) : [])
      }
      const statuses: TcgBattleStatusCondition[] = miracleAroma ? ['asleep', 'burned', 'poisoned'] : selectiveSlime ? ['burned', 'confused', 'poisoned'] : vileplumeChoiceStatus ? ['asleep', 'burned', 'confused', 'poisoned'] : [status]
      if (venusaurPureBody && (!state.player.front.some((card) => (card.statusConditions || []).some((condition) => ['asleep', 'confused', 'paralyzed', 'poisoned'].includes(condition))) && !state.opponent.front.some((card) => (card.statusConditions || []).some((condition) => ['asleep', 'confused', 'paralyzed', 'poisoned'].includes(condition))))) return []
      if (torridWave) return state.opponent.front.filter((target) => target.currentHp > 0).map((target) => ({ source, ability, abilityIndex, status, transferSourceId: target.instanceId, targetId: target.instanceId, coinFlipStatus: false, headTrip: false, bothActiveSleep: false, ariadosPoison: false, unownYRecovery: false, torridWave: true, drapionVstarVenomousVortex: false }))
      if (drapionPoisonClaws || drapionVstarVenomousVortex) return state.opponent.front.filter((target) => target.currentHp > 0 && (!drapionPoisonClaws || !target.statusConditions?.includes('poisoned'))).map((target) => ({ source, ability, abilityIndex, status, transferSourceId: undefined as string | undefined, targetId: target.instanceId, coinFlipStatus: drapionPoisonClaws, headTrip: false, bothActiveSleep: false, ariadosPoison: false, unownYRecovery: false, torridWave: false, drapionVstarVenomousVortex }))
      return statuses.map((selectedStatus) => ({ source, ability, abilityIndex, status: selectedStatus, transferSourceId: undefined as string | undefined, targetId: undefined as string | undefined, coinFlipStatus: Boolean(coinFlipStatus || darkHoundoomFireBreath || miracleAroma || selectiveSlime || vileplumeChoiceStatus), venusaurPureBody, headTrip, bothActiveSleep, ariadosPoison, victreebelConfusingPoison, hisuianTyphlosionHex, unownYRecovery: false, torridWave: false, drapionVstarVenomousVortex: false }))
    }))
}

function getUsableBenchEntryAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  type BenchEntryAbilityOption = { source: TcgBattleCardState; ability: NonNullable<TcgBattleCardState['abilities']>[number]; abilityIndex: number; effect: 'status' | 'asleep' | 'coinParalyze' | 'coinBurn' | 'coinSpreadDamage' | 'statusRecovery' | 'heal' | 'deckDiscard' | 'switch' | 'damage' | 'spreadDamage' | 'opponentSwitch' | 'powerLock' | 'curseBreath' | 'coinDamage' | 'magneticReversal' | 'handShuffleDraw' | 'dragonitePullUp' | 'captivatingWink' | 'darkInvitation' | 'mandibuzzHandBench' | 'gloomHandBench' | 'rayquazaStormyWinds' | 'snorlaxLeftovers' | 'darkraiVstarItems'; target?: TcgBattleCardState; targets?: TcgBattleCardState[]; healAmount: number; recoverCondition: boolean }
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && (source.playedToBenchTurn === state.turnNumber || ['metagross', 'dusknoir', 'gloom', 'snorlax', 'darkraivstar'].includes(source.name.replace(/[^a-z0-9]/gi, '').toLowerCase())) && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap<BenchEntryAbilityOption>((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const dragonitePullUp = source.name.toLowerCase() === 'dragonite-ex' && text === 'when you play this pokemon from your hand onto your bench during your turn, you may put 2 basic pokemon (except for dragonite-ex) from your discard pile into your hand.'
      const snorlaxLeftovers = source.name.toLowerCase() === 'snorlax' && text === 'once during your turn, you may put up to 2 leftovers cards from your discard pile into your hand.'
      const darkraiVstarItems = source.name.toLowerCase() === 'darkrai vstar' && text === "during your turn, you may put up to 2 item cards from your discard pile into your hand. (you can't use more than 1 vstar power in a game.)"
      const rayquazaStormyWinds = source.name.toLowerCase() === 'rayquaza-gx' && text === 'when you play this pokemon from your hand onto your bench during your turn, you may discard the top 3 cards of your deck. if you do, attach a basic energy card from your discard pile to this pokemon.'
      const captivatingWink = source.name.toLowerCase() === 'mawile-gx' && text === "when you play this pokemon from your hand onto your bench during your turn, you may have your opponent reveal their hand and put any number of basic pokemon you find there onto their bench."
      const darkInvitation = source.name.toLowerCase() === 'dusknoir' && text === "once during your turn (before your attack), you may have your opponent reveal their hand. put a basic pokemon you find there onto your opponent's bench, and put 3 damage counters on that pokemon."
      const mandibuzzHandBench = source.name.toLowerCase() === 'mandibuzz' && text === "once during your turn, you may use this ability. your opponent reveals their hand, and you put a basic pokemon with 70 hp or less that you find there onto your opponent's bench."
      const gloomHandBench = source.name.toLowerCase() === 'gloom' && text === "once during your turn (before your attack), if your opponent's bench isn't full, you may flip a coin. if heads, your opponent reveals their hand. put a basic pokemon you find there onto their bench."
      const hawluchaSpread = text === "when you play this pokemon from your hand onto your bench during your turn, you may choose 2 of your opponent's benched pokemon and put 1 damage counter on each of them."
      const hawluchaSuddenCyclone = text === "when you play this pokemon from your hand onto your bench, you may have your opponent switch his or her active pokemon with 1 of his or her benched pokemon."
      const spiritombCurseBreath = text === "once during your turn, when you put spiritomb from your hand onto your bench, you may put 1 damage counter on all pokemon that already have any damage counters on them (both yours and your opponent's). you can't use more than 1 curse breath poke-power each turn."
      const unownBang = source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'unown' && text === "once during your turn, when you put unown ! from your hand onto your bench, you may flip a coin. if heads, put 2 damage counters on 1 of your opponent's pokemon. if tails, put 2 damage counters on 1 of your pokemon."
      const tropicalHeal = text === 'once during your turn, when you put tropius from your hand onto your bench, you may remove all special conditions, imprison markers, and shock-wave markers from your pokemon.'
      const vaporeonStar = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'vaporeon' && text === "once during your turn, when you put vaporeon ☆ from your hand onto your bench, you may remove all special conditions and 3 damage counters from each active pokemon (both yours and your opponent's)."
      const unownActiveClean = source.name.replace(/[^a-z0-9]/g, '') === 'unown' && text === 'once during your turn, when you put unown from your hand onto your bench, remove all special conditions from your active pokemon.'
      const darkraiDarknessShade = source.name.toLowerCase() === 'darkrai' && text === 'once during your turn, when you put darkrai from your hand onto your bench, you may choose 1 of the defending pokemon. that pokemon is now asleep.'
      const spiritombSpookyWhirlpool = source.name.toLowerCase() === 'spiritomb' && text === "once during your turn, when you put spiritomb from your hand onto your bench, you may use this power. your opponent shuffles his or her hand into his or her deck and draws 6 cards."
      const articunoFreezingScreech = source.name.toLowerCase() === 'articuno' && text === 'once during your turn, when you put articuno from your hand onto your bench, you may flip a coin. if heads, choose 1 of the defending pokemon. that pokemon is now paralyzed.'
      const torkoalHotSnort = source.name.toLowerCase() === 'torkoal' && text === "once during your turn, when you put torkoal from your hand onto your bench, you may flip a coin. if heads, the defending pokemon is now burned."
      const espeonStarConfusion = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'espeon' && text === "once during your turn, when you put espeon star from your hand onto your bench, you may use this power. each active pokemon (both yours and your opponent's) is now confused."
      const zapdosSheetLightning = source.name.toLowerCase() === 'zapdos' && text === "once during your turn, when you put zapdos from your hand onto your bench, you may flip a coin. if heads, put 1 damage counter on each of your opponent's pokemon."
      const metagrossMagneticReversal = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'metagross' && text === "once during your turn (before your attack), you may flip a coin. if heads, switch 1 of your opponent's benched pokemon with 1 of the defending pokemon. this power can't be used if metagross is affected by a special condition."
      const healMatch = text.match(/^when you play this pokemon from your hand onto your bench during your turn, you may heal (\d+) damage from your active pokemon(?: and have it recover from a special condition)?\.$/)
      const effect: 'status' | 'asleep' | 'coinParalyze' | 'coinBurn' | 'coinSpreadDamage' | 'statusRecovery' | 'heal' | 'deckDiscard' | 'switch' | 'damage' | 'spreadDamage' | 'opponentSwitch' | 'powerLock' | 'curseBreath' | 'coinDamage' | 'magneticReversal' | 'handShuffleDraw' | 'dragonitePullUp' | 'captivatingWink' | 'darkInvitation' | 'mandibuzzHandBench' | 'gloomHandBench' | 'rayquazaStormyWinds' | 'snorlaxLeftovers' | 'darkraiVstarItems' | null = darkraiVstarItems ? 'darkraiVstarItems' : snorlaxLeftovers ? 'snorlaxLeftovers' : gloomHandBench ? 'gloomHandBench' : mandibuzzHandBench ? 'mandibuzzHandBench' : darkInvitation ? 'darkInvitation' : captivatingWink ? 'captivatingWink' : dragonitePullUp ? 'dragonitePullUp' : zapdosSheetLightning ? 'coinSpreadDamage' : torkoalHotSnort ? 'coinBurn' : articunoFreezingScreech ? 'coinParalyze' : darkraiDarknessShade ? 'asleep' : spiritombSpookyWhirlpool ? 'handShuffleDraw' : metagrossMagneticReversal ? 'magneticReversal' : unownBang ? 'coinDamage' : spiritombCurseBreath
        ? 'curseBreath' : text === "once during your turn, when you put mesprit from your hand onto your bench, you may use this power. your opponent can't use any poke-powers on his or her pokemon during your opponent's next turn."
        ? 'powerLock' : espeonStarConfusion || text === 'when you play this pokemon from your hand onto your bench during your turn, you may leave both active pokemon confused and poisoned.'
        ? 'status'
        : dragonitePullUp ? 'dragonitePullUp' : rayquazaStormyWinds ? 'rayquazaStormyWinds' : tropicalHeal || unownActiveClean || vaporeonStar ? 'statusRecovery' : healMatch ? 'heal' : hawluchaSpread ? 'spreadDamage' : hawluchaSuddenCyclone ? 'opponentSwitch' : text === "when you play this pokemon from your hand onto your bench during your turn, you may discard the top card of your opponent's deck." ? 'deckDiscard' : text === "when you play this pokemon from your hand onto your bench during your turn, you may put 1 damage counter on 1 of your opponent's pokemon." || source.name.toLowerCase() === 'crobat g' && text === "once during your turn, when you put crobat g from your hand onto your bench, you may put 1 damage counter on 1 of your opponent's pokemon." ? 'damage' : /^when you play this pokemon from your hand onto your bench during your turn, you may switch it with your active pokemon(?:\. if you do, (?:you may move any amount of energy from your other pokemon to this pokemon|move any number of (?:water|lightning) energy from your other pokemon to this pokemon))?\.$/.test(text) || text === 'when you play this pokemon from your hand onto your bench during your turn, you may move any number of lightning energy from your other pokemon to this pokemon. if you do, switch this pokemon with your active pokemon.' ? 'switch' : null
      if (!effect || effect !== 'magneticReversal' && effect !== 'darkInvitation' && effect !== 'mandibuzzHandBench' && effect !== 'gloomHandBench' && effect !== 'snorlaxLeftovers' && effect !== 'darkraiVstarItems' && source.playedToBenchTurn !== state.turnNumber || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || effect === 'darkraiVstarItems' && state.player.usedVstarPower) return []
      if (effect === 'darkraiVstarItems') {
        const items = state.player.discard.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'item')).slice(0, 2)
        return items.length ? [{ source, ability, abilityIndex, effect, targets: items, healAmount: 0, recoverCondition: false }] : []
      }
      if (effect === 'snorlaxLeftovers') {
        const leftovers = state.player.discard.filter((card) => card.name.toLowerCase() === 'leftovers').slice(0, 2)
        return leftovers.length ? [{ source, ability, abilityIndex, effect, targets: leftovers, healAmount: 0, recoverCondition: false }] : []
      }
      if (effect === 'rayquazaStormyWinds') {
        if (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId || state.player.deck.length === 0 || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
        const energies = state.player.discard.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.subtypes.some((subtype) => subtype.toLowerCase() === 'energy'))
        return energies.map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      }
      if (effect === 'gloomHandBench') {
        if (!gloomHandBench || getOpenTcgBattleBenchSlots(state.opponent) < 1) return []
        const targets = state.opponent.hand.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))
        return targets.length ? targets.map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false })) : [{ source, ability, abilityIndex, effect, healAmount: 0, recoverCondition: false }]
      }
      if (effect === 'mandibuzzHandBench') {
        if (!mandibuzzHandBench || getOpenTcgBattleBenchSlots(state.opponent) < 1) return []
        return state.opponent.hand.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.hp <= 70).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      }
      if (effect === 'darkInvitation') {
        if (!darkInvitation || getOpenTcgBattleBenchSlots(state.opponent) < 1) return []
        return state.opponent.hand.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      }
      if (torkoalHotSnort && (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId)) return []
      if (unownActiveClean && (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId)) return []
      if (vaporeonStar && (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId)) return []
      if (effect === 'magneticReversal') {
        if (!metagrossMagneticReversal || source.statusConditions?.length) return []
        return state.opponent.front.filter((active) => active.currentHp > 0).flatMap((active) => state.opponent.back.filter((bench) => bench.currentHp > 0).map((bench) => ({ source, ability, abilityIndex, effect, targets: [active, bench], healAmount: 0, recoverCondition: false })))
      }
      if (effect === 'spreadDamage' && !(state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId)) return []
      if (effect === 'curseBreath' && (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId || [...state.player.front, ...state.player.back].some((card) => card.abilityUses?.['shared:curse breath'] === state.turnNumber))) return []
      if (effect === 'opponentSwitch' && !(source.name.toLowerCase() === 'hawlucha' && state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId)) return []
      if (effect === 'deckDiscard' && state.opponent.deck.length === 0) return []
      if (effect === 'spreadDamage') {
        const targets = state.opponent.back.filter((target) => target.currentHp > 0)
        return targets.flatMap((first, index) => targets.slice(index + 1).map((second) => ({ source, ability, abilityIndex, effect, targets: [first, second], healAmount: 0, recoverCondition: false })))
      }
      if (effect === 'curseBreath') return [{ source, ability, abilityIndex, effect, healAmount: 0, recoverCondition: false }]
      if (effect === 'dragonitePullUp') {
        const basics = state.player.discard.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.name.toLowerCase() !== 'dragonite-ex')
        if (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId || basics.length === 0) return []
        const choices = basics.map((card) => [card])
        for (let first = 0; first < basics.length; first += 1) for (let second = first + 1; second < basics.length; second += 1) choices.push([basics[first], basics[second]])
        return choices.map((targets) => ({ source, ability, abilityIndex, effect, targets, healAmount: 0, recoverCondition: false }))
      }
      if (effect === 'handShuffleDraw') return [{ source, ability, abilityIndex, effect, healAmount: 0, recoverCondition: false }]
      if (effect === 'captivatingWink') {
        const hasLegalBasics = state.opponent.hand.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) && getOpenTcgBattleBenchSlots(state.opponent) > 0
        if (state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId || !hasLegalBasics) return []
        return [{ source, ability, abilityIndex, effect, healAmount: 0, recoverCondition: false }]
      }
      if (effect === 'coinDamage') {
        if (!unownBang || state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId) return []
        return state.opponent.front.concat(state.opponent.back).filter((opponentTarget) => opponentTarget.currentHp > 0).flatMap((opponentTarget) =>
          state.player.front.concat(state.player.back).filter((playerTarget) => playerTarget.currentHp > 0).map((playerTarget) => ({ source, ability, abilityIndex, effect, targets: [opponentTarget, playerTarget], healAmount: 0, recoverCondition: false })),
        )
      }
      if (effect === 'opponentSwitch') return state.opponent.back.filter((target) => target.currentHp > 0).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      if (effect === 'asleep' && !(state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId)) return []
      if (effect === 'asleep') return state.opponent.front.filter((target) => target.currentHp > 0 && !target.statusConditions?.includes('asleep')).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      if (effect === 'coinParalyze') return state.opponent.front.filter((target) => target.currentHp > 0 && !target.statusConditions?.includes('paralyzed')).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      if (effect === 'coinBurn') return state.opponent.front.filter((target) => target.currentHp > 0 && !target.statusConditions?.includes('burned')).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      if (effect === 'coinSpreadDamage' && state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId) return [{ source, ability, abilityIndex, effect, targets: [...state.opponent.front, ...state.opponent.back].filter((target) => target.currentHp > 0), healAmount: 0, recoverCondition: false }]
      if (effect === 'damage') return [...state.opponent.front, ...state.opponent.back].filter((target) => target.currentHp > 0).map((target) => ({ source, ability, abilityIndex, effect, target, healAmount: 0, recoverCondition: false }))
      if (vaporeonStar) {
        const targets = [...state.player.front, ...state.opponent.front].filter((card) => card.currentHp > 0)
        if (targets.length < 2 || !targets.some((card) => card.currentHp < card.hp || card.statusConditions?.length)) return []
        return [{ source, ability, abilityIndex, effect, targets, healAmount: 30, recoverCondition: true }]
      }
      if (effect === 'heal') {
        const active = state.player.front.find((card) => card.currentHp > 0)
        const recoverCondition = Boolean(healMatch && text.includes('recover from a special condition'))
        if (!active || Math.min(Number(healMatch?.[1] || 0), active.hp - active.currentHp) <= 0 && (!recoverCondition || !active.statusConditions?.length)) return []
      }
      if (effect === 'status' && (!state.player.front.some((card) => card.currentHp > 0) || !state.opponent.front.some((card) => card.currentHp > 0))) return []
      if (espeonStarConfusion && !(state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId)) return []
      if (effect === 'switch' && (!state.player.front.some((card) => card.currentHp > 0) || !state.player.back.some((card) => card.instanceId === source.instanceId) || source.name.toLowerCase() === 'tapu koko-gx' && (state.player.selectedEnergy?.toLowerCase() !== 'lightning' || state.player.energy < 1))) return []
      return [{ source, ability, abilityIndex, effect, healAmount: Number(healMatch?.[1] || 0), recoverCondition: Boolean(healMatch && text.includes('recover from a special condition')) }]
    }))
}

function getUsableUnownVanishAbilities(state: TcgBattleState) {
  const action = state.lastAction
  if (state.phase !== 'battle' || state.activeSide !== 'player' || action?.kind !== 'bench' || action.side !== 'player' || !action.frontId) return []
  const source = [...state.player.front, ...state.player.back].find((card) => card.instanceId === action.frontId && card.currentHp > 0)
  if (!source || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent])) return []
  const abilityIndex = (source.abilities || []).findIndex((ability) => {
    const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
    return source.name.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') === 'unownv' && text === "when you play unown v from your hand, you may flip a coin. if heads, return 1 of your pokemon with unown in its name (other than unown v) to your hand. (discard all cards attached to that card.)"
  })
  const ability = source.abilities?.[abilityIndex]
  if (!ability) return []
  return [...state.player.front, ...state.player.back]
    .filter((target) => target.currentHp > 0 && target.instanceId !== source.instanceId && target.name.toLowerCase().includes('unown'))
    .map((target) => ({ source, target, ability, abilityIndex }))
}

function getUsableUnownUndoAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const requiredLetters = ['u', 'n', 'd', 'o']
  if (!requiredLetters.every((letter) => state.player.back.some((card) => card.currentHp > 0 && card.name.replace(/[’]/g, "'").toLowerCase().replace(/[^a-z]/g, '') === `unown${letter}`))) return []
  return state.player.back.flatMap((source) => {
    if (source.currentHp <= 0 || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent])) return []
    return (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
      const expected = "once during your turn (before you attack), if you have unown [u], unown [n], unown [d], and unown [o] on your bench, you may return your active pokemon and all cards attached to it to your hand."
      if (text !== expected || source.name.replace(/[’]/g, "'").toLowerCase().replace(/[^a-z]/g, '') !== 'unownu' || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || state.player.back.length === 0) return []
      return state.player.front.filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex }))
    })
  })
}

function getUsableTentacoolCowardiceAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) =>
      source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'tentacool' && isTcgBattleTentacoolCowardice(ability.text) && source.playedToBenchTurn !== state.turnNumber && source.playedToFrontTurn !== state.turnNumber && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))
        ? [{ source, ability, abilityIndex }]
        : source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'lopunny' && isTcgBattleLopunnyBigJump(ability.text) && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber
        ? [{ source, ability, abilityIndex }]
        : [],
    ))
}

function getUsableIgglybuffGazeAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const isPokemonPower = (type: string) => ['pokepower', 'pokemonpower'].includes(type.toLowerCase().replace(/[^a-z]/g, ''))
  const targets = state.opponent.back.filter((target) => target.currentHp > 0 && Boolean(target.abilities?.length) && target.abilities!.every((ability) => isPokemonPower(ability.type || '')))
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex): Array<{ source: TcgBattleCardState; target: TcgBattleCardState; ability: NonNullable<TcgBattleCardState['abilities']>[number]; abilityIndex: number; isImprison: boolean }> => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
      const expectedText = "once during your turn (before you attack), choose 1 of your opponent's benched pokemon that has a pokemon power. that power stops working until the end of this turn. this effect ends if that pokemon leaves the bench. (pokemon power)"
      const imprisonText = "once during your turn (before your attack), if gardevoir ex is your active pokemon, you may put an imprison marker on 1 of your opponent's pokemon. any pokemon that has any imprison markers on it can't use any poke-powers or poke-bodies. this power can't be used if gardevoir ex is affected by a special condition."
      const isImprison = source.name.replace(/[^a-z0-9]/gi, '').toLowerCase().startsWith('gardevoirex') && text === imprisonText
      if ((!isImprison && (source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() !== 'igglybuff' || text !== expectedText)) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      if (isImprison) {
        if (!state.player.front.some((card) => card.instanceId === source.instanceId) || source.statusConditions?.length) return []
        return [...state.opponent.front, ...state.opponent.back].filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex, isImprison }))
      }
      return targets.map((target) => ({ source, target, ability, abilityIndex, isImprison }))
    }))
}

function getUsableElekidPlayfulPunchAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const target = state.opponent.front.find((card) => card.currentHp > 0)
  if (!target) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/pokémon/g, 'pokemon').replace(/\s+/g, ' ').trim()
      const expectedText = "once during your turn (before your attack), you may flip a coin. if heads, do 20 damage to your opponent's active pokemon. (apply weakness and resistance.) either way, this ends your turn. this power can't be used if elekid is asleep, confused, or paralyzed."
      if (source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() !== 'elekid' || text !== expectedText || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      return [{ source, target, ability, abilityIndex }]
    }))
}

function getUsableDamageCounterAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const types: Record<string, string> = { g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'fighting', d: 'darkness', y: 'metal', c: 'colorless', f: 'fairy' }
  const energyType = state.player.selectedEnergy?.toLowerCase()
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex): Array<{ source: TcgBattleCardState; target: TcgBattleCardState; distributionTargets?: TcgBattleCardState[]; ability: NonNullable<TcgBattleCardState['abilities']>[number]; abilityIndex: number; effect: NonNullable<ReturnType<typeof getTcgBattleAbilityDamageCounterEffect>> }> => {
      const effect = getTcgBattleAbilityDamageCounterEffect(ability.text)
      if (effect?.vstar && state.player.usedVstarPower) return []
      if (!effect || effect.energyType && (state.player.energy < 1 || types[effect.energyType] !== energyType) || effect.activeOnly && !state.player.front.some((card) => card.instanceId === source.instanceId) || effect.sourceBenchOnly && !state.player.back.some((card) => card.instanceId === source.instanceId) || effect.specialConditionGate && source.statusConditions?.length || effect.requiresOtherActiveName && !state.player.front.some((card) => card.instanceId !== source.instanceId && card.currentHp > 0 && card.name.toLowerCase().includes(effect.requiresOtherActiveName!))) return []
      if (effect.benchToActiveOnly && !state.lastEffectEvents?.some((event) => event.kind === 'switch' && event.side === 'player' && event.targetId === source.instanceId)) return []
      if (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      const targetSide = effect.ownTargets ? state.player : state.opponent
      const targets = (effect.defendingOnly ? state.opponent.front : effect.benchOnly ? state.opponent.back : [...targetSide.front, ...targetSide.back]).filter((target) => target.currentHp > 0 && (!effect.counterRemoval || target.currentHp < target.hp) && (!effect.damagedTargetOnly || target.currentHp < target.hp) && (!effect.requiredTargetSubtype || target.subtypes.some((subtype) => subtype.toLowerCase() === effect.requiredTargetSubtype)) && (!effect.requiredTargetMarker || target.name.includes('δ') || target.name.toLowerCase().includes('delta')) && (!effect.excludedTargetName || !target.name.toLowerCase().includes(effect.excludedTargetName)))
      if (effect.fixedTargetCount && targets.length < effect.fixedTargetCount) return []
      if (effect.discardHandForSelfCounters) return state.player.hand.length ? [{ source, target: source, distributionTargets: undefined, ability, abilityIndex, effect }] : []
      if (effect.distributeCounters) return targets.length ? [{ source, target: targets[0], distributionTargets: targets, ability, abilityIndex, effect }] : []
      return (effect.spreadToAllOpponents ? targets.slice(0, 1) : targets).map((target) => ({ source, target, distributionTargets: undefined, ability, abilityIndex, effect }))
    }))
}

function getUsableDamageCounterMoveAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || isTcgBattleDamageCounterMovementBlocked(state)) return []
  const allCards = [...state.player.front, ...state.player.back, ...state.opponent.front, ...state.opponent.back].filter((card) => card.currentHp > 0)
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const effect = getTcgBattleAbilityDamageCounterMoveEffect(ability.text)
      if (effect?.benchPlayOnly && (source.playedToBenchTurn !== state.turnNumber || state.lastAction?.kind !== 'bench' || state.lastAction.side !== 'player' || state.lastAction.frontId !== source.instanceId)) return []
      const absolCursedEyes = source.name.toLowerCase() === 'absol' && ability.text.replace(/[’]/g, "'").toLowerCase().replace(/\s+/g, ' ').trim() === "when you play this pokemon from your hand onto your bench, you may move 3 damage counters from 1 of your opponent's pokemon to another of his or her pokemon."
      if (absolCursedEyes && source.playedToBenchTurn !== state.turnNumber) return []
      if (!effect || effect.activeOnly && !state.player.front.some((card) => card.instanceId === source.instanceId) || (effect.blockedStatuses ? source.statusConditions?.some((status) => effect.blockedStatuses!.includes(status)) : effect.blockedBySpecialCondition && source.statusConditions?.length) || effect.minimumSourceHp && source.currentHp < effect.minimumSourceHp || effect.requiresDarknessEnergy && (state.player.energy < 1 || state.player.selectedEnergy?.toLowerCase() !== 'darkness') || effect.requiredName && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.name.toLowerCase().includes(effect.requiredName!)) || !effect.repeatable && source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      const ownCards = [...state.player.front, ...state.player.back]
      const opponentCards = [...state.opponent.front, ...state.opponent.back]
      const sources = (effect.opponentToOpponent ? opponentCards : effect.ownToOpponent || effect.ownToOwn ? ownCards : allCards).filter((card) => card.currentHp < card.hp && (!effect.pokemonSpOnly || card.subtypes.some((subtype) => ['sp', 'pokemon sp'].includes(subtype.toLowerCase()))) && (!effect.pokemonType || card.types.some((type) => type.toLowerCase() === effect.pokemonType)) && (!effect.sourceNameContains || card.name.toLowerCase().includes(effect.sourceNameContains)) && (!effect.sourceSelf || card.instanceId === source.instanceId))
      const targets = (effect.targetSelf ? [source] : effect.opponentToOpponent || effect.ownToOpponent ? opponentCards : effect.ownToOwn ? ownCards : allCards).filter((card) => card.currentHp > 0 && (!effect.targetActiveOnly || state.opponent.front.some((active) => active.instanceId === card.instanceId)) && (!effect.pokemonSpOnly || card.subtypes.some((subtype) => ['sp', 'pokemon sp'].includes(subtype.toLowerCase()))) && (!effect.pokemonType || card.types.some((type) => type.toLowerCase() === effect.pokemonType)) && (!effect.targetNameContains || card.name.toLowerCase().includes(effect.targetNameContains)))
      return sources.flatMap((from) => targets.filter((to) => to.instanceId !== from.instanceId && (!effect.preventKnockout || to.currentHp > 10)).flatMap((to) => {
        const availableCounters = Math.min(effect.maxCounters, Math.floor((from.hp - from.currentHp) / 10), effect.preventKnockout ? Math.floor((to.currentHp - 1) / 10) : effect.maxCounters)
        const counterCounts = effect.allCounters ? [availableCounters] : Array.from({ length: availableCounters }, (_, index) => index + 1)
        return counterCounts.filter((count) => count > 0).map((counterCount) => ({ source, from, to, counterCount, ability, abilityIndex }))
      }))
    }))
}

function getUsablePsychicDiscardEnergyAbilities(state: TcgBattleState) {
  const energyType = state.player.selectedEnergy?.toLowerCase()
  const hasBasicLightningInDiscard = state.player.discard.some((card) => card.name === 'Lightning Energy' && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))
  const hasMetalInDiscard = state.player.discard.some((card) => card.name.toLowerCase() === 'metal energy')
  if (state.phase !== 'battle' || state.activeSide !== 'player' || (energyType !== 'psychic' && energyType !== 'metal' && !hasBasicLightningInDiscard) || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  const targets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 20 && card.types.some((type) => type.toLowerCase() === 'psychic'))
  const benchedTargets = state.player.back.filter((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'psychic'))
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const repeatablePsychicAttachment = /^as often as you like during your turn, you may attach a basic \{p\} energy card from your discard pile to 1 of your \{p\} pokemon\. if you attached energy to a pokemon in this way, put 2 damage counters on that pokemon\. you can't use this ability on a pokemon that would be knocked out\.$/.test(normalized)
      const activeDiscardAttachment = /^once during your turn \(before your attack\), you may attach a psychic or metal energy card from your discard pile to your active pokemon\.$/.test(normalized)
      const benchDiscardAttachment = /^once during your turn \(before your attack\), you may attach a psychic energy card from your discard pile to 1 of your benched pokemon\.$/.test(normalized)
      const lightningBenchAttachment = /^once during your turn, you may attach a lightning energy card from your discard pile to 1 of your benched pokemon\.$/.test(normalized)
      const metalBenchAttachment = /^once during your turn \(before your attack\), you may attach a metal energy card from your discard pile to 1 of your benched pokemon\.$/.test(normalized)
      if (repeatablePsychicAttachment) return energyType === 'psychic' ? targets.map((target) => ({ source, target, ability, abilityIndex })) : []
      if (benchDiscardAttachment) return energyType === 'psychic' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber ? benchedTargets.map((target) => ({ source, target, ability, abilityIndex })) : []
      if (lightningBenchAttachment) return hasBasicLightningInDiscard && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber ? state.player.back.filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex })) : []
      if (metalBenchAttachment) return energyType === 'metal' && hasMetalInDiscard && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber ? state.player.back.filter((target) => target.currentHp > 0).map((target) => ({ source, target, ability, abilityIndex })) : []
      if (!activeDiscardAttachment || (energyType !== 'psychic' && energyType !== 'metal') || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      const active = state.player.front.find((card) => card.currentHp > 0)
      return active ? [{ source, target: active, ability, abilityIndex }] : []
    }))
}

function getUsableIonoEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  const ionoTargets = state.player.selectedEnergy?.toLowerCase() === 'lightning' ? [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && card.name.toLowerCase().includes("iono's")) : []
  const hydrappleTargets = state.player.selectedEnergy?.toLowerCase() === 'grass' ? [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && card.currentHp < card.hp) : []
  const houndoomTargets = ['darkness', 'fighting'].includes(state.player.selectedEnergy?.toLowerCase() || '') ? [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'single strike')) : []
  if (!ionoTargets.length && !hydrappleTargets.length && !houndoomTargets.length) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const ionoAbility = /^as often as you like during your turn, you may attach a basic \{l\} energy card from your hand to 1 of your iono's pokemon\.$/.test(normalized)
      const hydrappleAbility = /^once during your turn, you may attach a basic \{g\} energy card from your hand to 1 of your pokemon\. if you attached energy to a pokemon in this way, heal 30 damage from that pokemon\.$/.test(normalized)
      const houndoomAbility = /^once during your turn, you may search your deck for a single strike energy card and attach it to 1 of your single strike pokemon\. then, shuffle your deck\. if you attached energy to a pokemon in this way, put 2 damage counters on that pokemon\.$/.test(normalized)
      if (ionoAbility) return ionoTargets.map((target) => ({ source, target, ability, abilityIndex, hydrapple: false, houndoom: false }))
      if (hydrappleAbility && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber) return hydrappleTargets.map((target) => ({ source, target, ability, abilityIndex, hydrapple: true, houndoom: false }))
      if (houndoomAbility && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber) return houndoomTargets.map((target) => ({ source, target, ability, abilityIndex, hydrapple: false, houndoom: true }))
      return []
    }))
}

function getUsableFlareonEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.selectedEnergy?.toLowerCase() !== 'fire' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      if (!/^once during your turn, you may attach a \{r\} energy from your discard pile to this pokemon\. if you do, do 20 damage to this pokemon\.$/.test(normalized)) return []
      if (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      return [{ source, ability, abilityIndex }]
    }))
}

function getUsableFrosmothEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.selectedEnergy?.toLowerCase() !== 'water' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const rainDance = /^as often as you like during your turn \(before your attack\), you may attach 1 water energy card to 1 of your water pokemon\. \(this doesn't use up your 1 energy card attachment for the turn\.\) this power can't be used if blastoise is asleep, confused, or paralyzed\.$/.test(normalized)
      const frosmoth = /^as often as you like during your turn, you may attach a water energy card from your hand to 1 of your benched water pokemon\.$/.test(normalized)
      const deluge = normalized === 'as often as you like during your turn, you may attach a water energy card from your hand to 1 of your pokemon.'
      if (!rainDance && !frosmoth && !deluge || rainDance && source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))) return []
      const targets = (rainDance || deluge ? [...state.player.front, ...state.player.back] : state.player.back).filter((card) => card.currentHp > 0 && (deluge || card.types.some((type) => type.toLowerCase() === 'water')))
      if (!targets.length) return []
      return targets.map((target) => ({ source, target, ability, abilityIndex }))
    }))
}

function getUsableBaxcaliburEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.selectedEnergy?.toLowerCase() !== 'water' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  const targets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0)
  if (!targets.length) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      if (!/^as often as you like during your turn, you may attach a basic \{w\} energy card from your hand to 1 of your pokemon\.$/.test(normalized)) return []
      return targets.map((target) => ({ source, target, ability, abilityIndex }))
    }))
}

function getUsableEmboarEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.selectedEnergy?.toLowerCase() !== 'fire' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  const targets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0)
  if (!targets.length) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      if (!/^as often as you like during your turn \(before your attack\), you may attach a fire energy card from your hand to 1 of your pokemon\.$/.test(normalized)) return []
      return targets.map((target) => ({ source, target, ability, abilityIndex }))
    }))
}

function getUsableGardevoirGxEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap) return []
  const targets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0)
  if (!targets.length) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const bird = getUiLegendaryBirdEnergyAbility(source.name, ability.text)
      const energyType = bird?.energyType || 'fairy'
      if (state.player.selectedEnergy?.toLowerCase() !== energyType) return []
      if (!bird && !/^once during your turn \(before your attack\), you may attach a fairy energy card from your hand to 1 of your pokemon\.$/.test(normalized)) return []
      if (bird?.requiredPokemon.some((name) => !targets.some((card) => card.instanceId !== source.instanceId && card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === name))) return []
      if (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      return (bird ? [source] : targets).map((target) => ({ source, target, ability, abilityIndex, energyType }))
    }))
}

function getUiLegendaryBirdEnergyAbility(sourceName: string, text?: string): { energyType: 'fire' | 'lightning' | 'water'; requiredPokemon: string[] } | undefined {
  const name = sourceName.toLowerCase().replace(/[^a-z0-9]/g, '')
  const normalized = (text || '').replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
  if (name === 'moltres' && /^once during your turn, if you have articuno and zapdos in play, you may use this ability\. attach a basic (?:fire|\{r\}) energy card from your hand to this pokemon\.$/.test(normalized)) return { energyType: 'fire', requiredPokemon: ['articuno', 'zapdos'] }
  if (name === 'zapdos' && /^once during your turn, if you have moltres and articuno in play, you may use this ability\. attach a basic (?:lightning|\{l\}) energy card from your hand to this pokemon\.$/.test(normalized)) return { energyType: 'lightning', requiredPokemon: ['moltres', 'articuno'] }
  if (name === 'articuno' && /^once during your turn, if you have moltres and zapdos in play, you may use this ability\. attach a basic (?:water|\{w\}) energy card from your hand to this pokemon\.$/.test(normalized)) return { energyType: 'water', requiredPokemon: ['moltres', 'zapdos'] }
  return undefined
}

function getUsableVolcanionExDamageBoostAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const rapidashPower = source.name.toLowerCase() === 'rapidash' && normalized === "once during your turn, you may discard a fire energy card from your hand in order to use this ability. during this turn, your fire pokemon's attacks do 30 more damage to your opponent's active pokemon (before applying weakness and resistance)."
      const skeledirgePower = source.name.toLowerCase() === 'skeledirge ex' && normalized === "once during your turn, you may discard a basic {r} energy card from your hand in order to use this ability. during this turn, attacks used by your pokemon do 60 more damage to your opponent's active pokemon (before applying weakness and resistance)."
      const skeledirgeInfernoDance = source.name.toLowerCase() === 'skeledirge' && normalized === "once during your turn, you may discard 1 fire energy from this pokemon in order to use this ability. during this turn, attacks used by your fire pokemon do +50 damage to your opponent's active pokemon."
      const feraligatrPower = source.name.toLowerCase() === 'feraligatr' && normalized === "once during your turn, you may put 5 damage counters on this pokemon. if you do, during this turn, attacks used by this pokemon do 120 more damage to your opponent's active pokemon (before applying weakness and resistance)."
      const volcanionPower = /^once during your turn \(before your attack\), you may discard a fire energy card from your hand\. if you do, during this turn, your basic fire pokemon's attacks do 30 more damage to your opponent's active pokemon \(before applying weakness and resistance\)\.$/.test(normalized)
      if (!feraligatrPower && !rapidashPower && !skeledirgePower && !skeledirgeInfernoDance && (!volcanionPower || state.player.selectedEnergy?.toLowerCase() !== 'fire' || state.player.energy < 1)) return []
      if (feraligatrPower && source.currentHp <= 50) return []
      if (skeledirgeInfernoDance && (state.player.selectedEnergy?.toLowerCase() !== 'fire' || state.player.energy < 1)) return []
      if (skeledirgeInfernoDance && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'fire'))) return []
      if (rapidashPower && !state.player.hand.some((card) => card.name.toLowerCase() === 'fire energy')) return []
      if (skeledirgePower && !state.player.hand.some((card) => card.name.toLowerCase().includes('fire energy') && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))) return []
      if (volcanionPower && ![...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.types.some((type) => type.toLowerCase() === 'fire'))) return []
      if (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      return [{ source, ability, abilityIndex }]
    }))
}

function getUsableLudicoloCheerfulVoiceAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && source.name.toLowerCase() === 'ludicolo' && !source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      if (normalized !== "once during your turn (before your attack), you may use this power. if you do, your turn ends. during your next turn, each of ludicolo's attacks does 60 more damage to the defending pokemon (before applying weakness and resistance). this power can't be used if ludicolo is affected by a special condition.") return []
      if (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
      return [{ source, ability, abilityIndex }]
    }))
}

function getUsablePalkiaVstarEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || state.player.usedVstarPower || state.player.selectedEnergy?.toLowerCase() !== 'water') return []
  const count = Math.min(3, TCG_BATTLE_FORMATS[state.format].energyCap - state.player.energy)
  if (count < 1) return []
  const targets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && card.types.some((type) => type.toLowerCase() === 'water'))
  if (!targets.length) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      if (!/^during your turn, you may attach up to 3 water energy cards from your discard pile to your water pokemon in any way you like\. \(you can't use more than 1 vstar power in a game\.\)$/.test(normalized)) return []
      return targets.flatMap((target) => Array.from({ length: count }, (_, index) => ({ source, target, ability, abilityIndex, energyCount: index + 1 })))
    }))
}

function getUsableElectrodeGxEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player' || !state.player.selectedEnergy) return []
  return [...state.player.front, ...state.player.back]
    .filter((source) => source.currentHp > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]))
    .flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
      const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
      const buzzap = /^at any time during your turn \(before your attack\) you may knock out electrode and attach it to 1 of your other pokemon\. if you do, cho(?:o|)se a type of energy\. electrode is now an energy card (?:of that type )?\(instead of a pokemon\) that provides 2 energy(?: of that type)?\. this power can't be used if electrode is asleep, confused, or paralyzed\.$/.test(normalized)
      const gxEnergy = /^once during your turn \(before your attack\), you may attach 5 energy cards from your discard pile to your pokemon, except pokemon-gx or pokemon-ex, in any way you like\. if you do, this pokemon is knocked out\.$/.test(normalized)
      if (!buzzap && !gxEnergy || buzzap && source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) || gxEnergy && source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || TCG_BATTLE_FORMATS[state.format].energyCap - state.player.energy < (buzzap ? 2 : 5)) return []
      const targets = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && card.instanceId !== source.instanceId && (buzzap || !card.subtypes.some((subtype) => ['gx', 'ex'].includes(subtype.toLowerCase()))))
      return targets.map((target) => ({ source, target, ability, abilityIndex, buzzap }))
    }))
}

function getUsableDiscardRevivalEnergyAbilities(state: TcgBattleState) {
  if (state.phase !== 'battle' || state.activeSide !== 'player') return []
  const revivalAbilities = getOpenTcgBattleBenchSlots(state.player) < 1 ? [] : state.player.discard.flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
    const energyRevival = /^once during your turn \(before your attack\), if this pokemon is in your discard pile, you may put it onto your bench\. then, attach a darkness energy card from your discard pile to this pokemon\.$/.test(normalized)
    const hoOhRevival = source.name.toLowerCase() === 'ho-oh v' && /^once during your turn, if this pokemon is in your discard pile, you may put it onto your bench\. if you do, attach up to 4 basic energy cards from your discard pile to this pokemon\. if you use this ability, your turn ends\.$/.test(normalized)
    const damageCounterRevival = /^once during your turn, if this pokemon is in your discard pile, you may put it onto your bench\. if you do, put 3 damage counters on this pokemon\.$/.test(normalized)
    if (!energyRevival && !damageCounterRevival && !hoOhRevival || energyRevival && (state.player.selectedEnergy?.toLowerCase() !== 'darkness' || state.player.energy >= TCG_BATTLE_FORMATS[state.format].energyCap)) return []
    if (source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || !canTcgBattlePutPokemonOnBench(state.player, source)) return []
    return [{ source, ability, abilityIndex }]
  }))
  const porygonZAbilities = [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const normalized = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
    const expected = 'once during your turn, you may flip a coin. if heads, attach up to 4 basic energy cards from your discard pile to this pokemon. if tails, discard an energy from this pokemon.'
    const selectedEnergy = state.player.selectedEnergy?.toLowerCase()
    const hasMatchingDiscardEnergy = Boolean(selectedEnergy && state.player.discard.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.name.toLowerCase().includes(`${selectedEnergy} energy`)))
    if (source.currentHp <= 0 || source.name.toLowerCase() !== 'porygon-z' || normalized !== expected || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || !state.player.selectedEnergy || (!hasMatchingDiscardEnergy && state.player.energy < 1)) return []
    return [{ source, ability, abilityIndex }]
  }))
  return [...revivalAbilities, ...porygonZAbilities]
}

function BattleCommandControls({
  state,
  selectedAttacker,
  isPending,
  claimError,
  resultShown,
  resolution,
  evolutionOptions,
  selectedEvolutionCardId,
  onCharge,
  onClaim,
  onPromote,
  onRetreat,
  onOpenEvolution,
  onPlayBasicToBench,
  onUseHealAbility,
  onUseDrawAbility,
  onUseKogaKakunaEmerge,
  onUseClefableMoonGuidance,
  onResolveClefableMoonGuidance,
  onUseInkayUpsideDownEvolution,
  onUseKarrablastShellOn,
  onUseAegislashStanceChange,
  onUsePokemonSwapPower,
  onUseBenchShuffleAbility,
  onUseDiscardRecoveryAbility,
  onUseDamageCounterAbility,
  onUseVenomothShift,
  onUseDamageCounterMoveAbility,
  onUsePsychicDiscardEnergyAbility,
  onUseIonoEnergyAbility,
  onUseFlareonEnergyAbility,
  onUseFrosmothEnergyAbility,
  onUseBaxcaliburEnergyAbility,
  onUseEmboarEnergyAbility,
  onUseGardevoirGxEnergyAbility,
  onUseVolcanionExDamageBoost,
  onUseLudicoloCheerfulVoice,
  onUsePalkiaVstarEnergyAbility,
  onUseElectrodeGxEnergyAbility,
  onUseDiscardRevivalEnergyAbility,
  onUseActiveStatusAbility,
  onUseBenchEntryAbility,
  onUseUnownVanish,
  onUseUnownUndo,
  onUseTentacoolCowardice,
  onUseIgglybuffGaze,
  onUseElekidPlayfulPunch,
  onUseBenchSwitchAbility,
}: {
  state: TcgBattleState
  selectedAttacker?: TcgBattleCardState
  isPending: boolean
  claimError: string | null
  resultShown: boolean
  resolution?: BattleResolution | null
  evolutionOptions: TcgBattleEvolutionOption[]
  selectedEvolutionCardId: string | null
  onCharge: () => void
  onClaim: () => void
  onPromote: () => void
  onRetreat: () => void
  onOpenEvolution: (cardId: string) => void
  onPlayBasicToBench: (cardId: string) => void
  onUseHealAbility: (sourceId: string, abilityIndex: number, targetId: string, abilityName: string, discardPokemonIds?: string[]) => void
  onUseDrawAbility: (sourceId: string, abilityIndex: number, abilityName: string, discardCardIds?: string[], refillDraw?: boolean, discardHandDraw?: boolean, searchDeckIndices?: number[], energySearch?: boolean, benchSearch?: boolean, handDeckSwapCardId?: string, energyAttach?: boolean, energyHandDraw?: boolean, discardFightingAttach?: boolean, revealHand?: boolean, discardBenchSearch?: boolean, shuffleOpponentDeckForCunning?: boolean, mankeyPeekChoice?: 'ownDeck' | 'opponentDeck' | 'randomOpponentHand' | 'bugRadar' | 'bugRadarOrder' | 'jellicentDeepSeaDraw' | 'jellicentDeepSeaBottom' | 'talonflameSkyHunt' | 'sandFlapSelf' | 'sandFlapOpponent' | 'chandelureDeckDiscard' | 'slakingLazyBlow' | 'blisseyKindEgg' | 'salamenceTopEnergy' | 'magcargoTopEnergy' | 'slowkingOwnOrder' | 'slowkingOpponentOrder' | 'krookodileEnergyDiscard' | 'sableyeTopDeckDiscard' | 'aipomDeckBottom' | 'malamarDualPeek' | 'spiritombBuildingSpite' | 'gothitelleDeckSift' | 'kingdraHandBottom' | 'unownEEntryDraw' | 'regidragoVstar' | 'regidragoVstarResolve' | 'rotomVstar' | 'zacianPsychicEnergy' | 'zacianIntrepidSword' | 'claydolCosmicPower' | 'toxtricitySinisterSurge' | 'feraligatrDoubleSwitch' | 'zamazentaShieldStar' | 'latiasPsychicAttach' | 'magnezoneMetalAcceleration') => void
  onUseKogaKakunaEmerge: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseClefableMoonGuidance: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onResolveClefableMoonGuidance: (targetId: string, deckIndex: number, abilityName: string) => void
  onUseInkayUpsideDownEvolution: (sourceId: string, abilityIndex: number, deckIndex: number, abilityName: string) => void
  onUseKarrablastShellOn: (sourceId: string, abilityIndex: number, deckIndex: number, shelmetId: string, abilityName: string) => void
  onUseAegislashStanceChange: (sourceId: string, abilityIndex: number, replacementInstanceId: string, abilityName: string) => void
  onUsePokemonSwapPower: (sourceId: string, abilityIndex: number, replacementCardId: string, abilityName: string) => void
  onUseBenchShuffleAbility: (sourceId: string, abilityIndex: number, targetCardId: string, abilityName: string) => void
  onUseDiscardRecoveryAbility: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseDamageCounterAbility: (sourceId: string, abilityIndex: number, targetCardId: string, abilityName: string, discardCardIds?: string[], counterTargetIds?: string[]) => void
  onUseVenomothShift: (sourceId: string, abilityIndex: number, targetId: string, targetType: string, abilityName: string) => void
  onUseDamageCounterMoveAbility: (sourceId: string, abilityIndex: number, fromCardId: string, toCardId: string, counterCount: number, abilityName: string) => void
  onUsePsychicDiscardEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseIonoEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseFlareonEnergyAbility: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseFrosmothEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseBaxcaliburEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseEmboarEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseGardevoirGxEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseVolcanionExDamageBoost: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseLudicoloCheerfulVoice: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUsePalkiaVstarEnergyAbility: (sourceId: string, targetCardId: string, energyCount: number, abilityIndex: number, abilityName: string) => void
  onUseElectrodeGxEnergyAbility: (sourceId: string, targetCardId: string, abilityIndex: number, abilityName: string) => void
  onUseDiscardRevivalEnergyAbility: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseActiveStatusAbility: (sourceId: string, abilityIndex: number, abilityName: string, status: TcgBattleStatusCondition, transferSourceId?: string) => void
  onUseBenchEntryAbility: (sourceId: string, abilityIndex: number, abilityName: string, effect: 'status' | 'asleep' | 'coinParalyze' | 'coinBurn' | 'coinSpreadDamage' | 'statusRecovery' | 'heal' | 'deckDiscard' | 'switch' | 'damage' | 'spreadDamage' | 'opponentSwitch' | 'powerLock' | 'curseBreath' | 'coinDamage' | 'magneticReversal' | 'handShuffleDraw' | 'dragonitePullUp' | 'captivatingWink' | 'darkInvitation' | 'mandibuzzHandBench' | 'gloomHandBench' | 'rayquazaStormyWinds' | 'snorlaxLeftovers' | 'darkraiVstarItems', targetId?: string | string[]) => void
  onUseUnownVanish: (sourceId: string, targetId: string, abilityIndex: number, abilityName: string) => void
  onUseUnownUndo: (sourceId: string, targetId: string, abilityIndex: number, abilityName: string) => void
  onUseTentacoolCowardice: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseIgglybuffGaze: (sourceId: string, targetId: string, abilityIndex: number, abilityName: string) => void
  onUseElekidPlayfulPunch: (sourceId: string, abilityIndex: number, abilityName: string) => void
  onUseBenchSwitchAbility: (sourceId: string, abilityIndex: number, targetId: string, abilityName: string, discardIds?: string[]) => void
}) {
  const hasAutoClaimedResultRef = useRef(false)
  const [distributedCounterTargets, setDistributedCounterTargets] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (
      state.phase !== 'finished' ||
      resultShown ||
      isPending ||
      hasAutoClaimedResultRef.current
    ) {
      return
    }
    hasAutoClaimedResultRef.current = true
    onClaim()
  }, [isPending, onClaim, resultShown, state.phase])

  const moonGuidancePending = state.lastAction?.abilityEffect === 'moonGuidancePending' && state.lastAction.side === 'player'
  const regidragoPending = state.lastAction?.abilityEffect === 'regidragoVstarPending' && state.lastAction.side === 'player'
  const [regidragoRecoveryIds, setRegidragoRecoveryIds] = useState<string[]>([])
  const canAct =
    state.phase === 'battle' && state.activeSide === 'player' && !resolution && !moonGuidancePending && !regidragoPending && state.lastAction?.abilityEffect !== 'handBottomPending'
  const formatConfig = TCG_BATTLE_FORMATS[state.format]
  const displayedChargeGain = formatConfig.chargeGain + getTcgBattleEnergyChargeBonus(state, 'player')
  const atCap = state.player.energy >= formatConfig.energyCap
  const basicHand = state.player.hand.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && canTcgBattlePutPokemonOnBench(state.player, card))
  const opponentHasStage2 = [...state.opponent.front, ...state.opponent.back].some((card) => card.currentHp > 0 && card.subtypes.some((subtype) => subtype.toLowerCase() === 'stage 2'))
  const emergencyRotationHand = state.player.hand.filter((card) => hasTcgBattleKlinklangEmergencyRotation(card) && opponentHasStage2 && state.player.front.filter((pokemon) => pokemon.currentHp > 0).length === 3 && getOpenTcgBattleBenchSlots(state.player) > 0 && canTcgBattlePutPokemonOnBench(state.player, card))
  const lastCardBenchDrawHand = state.player.hand.length === 1 && state.player.front.filter((pokemon) => pokemon.currentHp > 0).length === 3 && getOpenTcgBattleBenchSlots(state.player) > 0
    ? state.player.hand.filter((card) => canTcgBattlePutPokemonOnBench(state.player, card) && !isTcgBattleAbilitySuppressed(card, [state.player, state.opponent]) && card.abilities?.some((ability) => /^once during your turn(?: \(before your attack\))?, if this pokemon is the last card in your hand, you may play it onto your bench\. if you do, draw 3 cards\.$/.test(ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim())))
    : []
  const basicPlayDestination = state.player.front.length < 3 ? 'front row' : 'Bench'
  const canPlaceBasic = state.player.front.length < 3 || getOpenTcgBattleBenchSlots(state.player) > 0
  const usableHealAbilities = getUsableActiveHealAbilities(state, selectedAttacker)
  const usableDrawAbilities = getUsableDrawAbilities(state)
  const usableRegidragoVstar = !state.player.usedVstarPower && state.player.deck.length > 0
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'regidrago vstar' && text === "during your turn, you may discard the top 7 cards of your deck. then, put up to 2 cards from your discard pile into your hand. (you can't use more than 1 vstar power in a game.)" && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableRotomVstar = !state.player.usedVstarPower
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'rotom vstar' && text === "during your turn, you may use this ability. discard any number of cards from your hand. then, draw that many cards. (you can't use more than 1 vstar power in a game.)" && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableZacianPsychicEnergy = state.player.energy < formatConfig.energyCap && state.player.selectedEnergy?.toLowerCase() === 'psychic'
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && text === "once during your turn, you may search your deck for a psychic energy card and attach it to 1 of your pokemon. then, shuffle your deck. if you use this ability, your turn ends." && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) && state.player.deck.some((card) => card.name.toLowerCase() === 'psychic energy' && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableZacianIntrepidSword = state.player.deck.length > 0
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().replace(/\{m\}/g, 'metal').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'zacian v' && text === "once during your turn, you may look at the top 3 cards of your deck and attach any number of metal energy cards you find there to this pokemon. put the other cards into your hand. if you use this ability, your turn ends." && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableClaydolCosmicPower = state.phase === 'battle' && state.activeSide === 'player'
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'claydol' && text === "once during your turn (before your attack), you may choose up to 2 cards from your hand and put them on the bottom of your deck in any order. if you do, draw cards until you have 6 cards in your hand. this power can't be used if claydol is affected by a special condition." && !source.statusConditions?.length && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && state.player.hand.length > 0 && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableToxtricitySinisterSurge = state.phase === 'battle' && state.activeSide === 'player' && state.player.energy < formatConfig.energyCap && state.player.deck.some((card) => card.name.toLowerCase() === 'darkness energy' && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'toxtricity' && text === 'once during your turn, you may use this ability. search your deck for a basic {d} energy card and attach it to 1 of your benched {d} pokemon. then, shuffle your deck. if you attached energy to a pokemon in this way, place 2 damage counters on that pokemon.' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent])
          ? state.player.back.filter((target) => target.currentHp > 0 && target.types.some((type) => type.toLowerCase() === 'darkness')).map((target) => ({ source, target, ability, abilityIndex }))
          : []
      }))
    : []
  const usableFeraligatrDoubleSwitch = state.phase === 'battle' && state.activeSide === 'player' && state.opponent.front.some((card) => card.currentHp > 0) && (state.player.back.some((card) => card.currentHp > 0) || state.opponent.back.some((card) => card.currentHp > 0))
    ? state.player.front.flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        const expected = "once during your turn (before your attack), if feraligatr is your active pokemon and if your opponent has any benched pokemon, your opponent switches his or her active pokemon with 1 of his or her benched pokemon. either way, if you have any benched pokemon, switch feraligatr with 1 of them. this power can't be used if feraligatr is affected by a special condition."
        return source.currentHp > 0 && source.name.toLowerCase() === 'feraligatr' && text === expected && !source.statusConditions?.length && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent])
          ? (state.player.back.filter((target) => target.currentHp > 0).length ? state.player.back.filter((target) => target.currentHp > 0) : [undefined]).map((target) => ({ source, target, ability, abilityIndex }))
          : []
      }))
    : []
  const usableZamazentaShieldStar = !state.player.usedVstarPower
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'zamazenta vstar' && text.startsWith("during your turn, you may use this ability. during your opponent's next turn, all of your pokemon take 100 less damage") && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableLatiasPsychicAttach = state.player.selectedEnergy?.toLowerCase() === 'psychic' && state.player.energy < formatConfig.energyCap && state.player.hand.some((card) => card.name.toLowerCase().includes('psychic energy') && card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) && [...state.player.front, ...state.player.back].some((card) => card.currentHp > 0 && card.name.toLowerCase().startsWith('latios'))
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'latias' && text === 'once during your turn, you may attach a psychic energy card from your hand to 1 of your latios.' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableMagnezoneMetalAcceleration = state.player.selectedEnergy?.toLowerCase() === 'metal' && state.player.energy < formatConfig.energyCap && state.player.deck.slice(0, 6).some((card) => card.name.toLowerCase().includes('metal energy') || card.types.some((type) => type.toLowerCase() === 'metal') && card.subtypes.some((subtype) => subtype.toLowerCase() === 'energy'))
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        return source.currentHp > 0 && source.name.toLowerCase() === 'magnezone' && text === 'once during your turn, you may look at the top 6 cards of your deck and attach any number of metal energy cards you find there to your pokemon in any way you like. shuffle the other cards back into your deck.' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? [{ source, ability, abilityIndex }] : []
      }))
    : []
  const usableSalamenceTopEnergyAbilities = getUsableSalamenceTopEnergyAbilities(state)
  const usableOrbeetleBugRadarAbilities = usableDrawAbilities.filter((item) => item.orbeetleBugRadar)
  const usableDeckOrderAbilities = usableDrawAbilities.filter((item) => item.machampTerraforming || item.lunatonePremonition || item.laprasGoForASwim || item.galladePremonition || item.solrockPremonition || item.source.name.toLowerCase() === 'slowking')
  const bugRadarPending = state.lastAction?.abilityEffect === 'deckOrderPending' && state.lastAction.side === 'player'
  const jellicentBottomPending = state.lastAction?.abilityEffect === 'handBottomPending' && state.lastAction.side === 'player'
  const jellicentPendingSource = jellicentBottomPending ? [...state.player.front, ...state.player.back].find((card) => card.instanceId === state.lastAction?.frontId) : undefined
  const jellicentPendingAbility = jellicentPendingSource?.abilities?.[state.lastAction?.abilityIndex || 0]
  const opponentDeckTop = bugRadarPending
    ? (state.lastAction?.privateRevealedCardNames || []).map((name, index) => ({ name, instanceId: state.lastAction?.privateRevealedCardIds?.[index] || String(index) }))
    : state.opponent.deck.slice(0, 3)
  const opponentDeckOrderOptions = getTcgBattleIndexPermutations(opponentDeckTop.length)
  type MoonGuidanceChoice = { source: TcgBattleCardState; ability: NonNullable<TcgBattleCardState['abilities']>[number]; abilityIndex: number; pending: boolean; targetId?: string; deckIndex?: number; evolutionName?: string }
  const usableKogaKakunaEmerge = [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
    if (state.phase !== 'battle' || state.activeSide !== 'player' || state.turnNumber < 5 || source.currentHp <= 0 || source.playedToBenchTurn === state.turnNumber || source.name.toLowerCase() !== "koga's kakuna" || text !== "once during your turn (before your attack), you may flip a coin. if heads, search your deck for an evolution card named koga's beedrill and put it on koga's kakuna. (this counts as evolving koga's kakuna.) shuffle your deck afterward. this power can't be used if koga's kakuna is asleep, confused, or paralyzed." || source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status)) || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || !state.player.deck.some((card) => card.name.toLowerCase() === "koga's beedrill")) return []
    return [{ source, ability, abilityIndex }]
  }))
  const usableSelfEvolutionCoins = [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
    const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
    const name = source.name.toLowerCase()
    const expected = `once during your turn (before your attack), if ${name} is your active pokemon, you may flip a coin. if heads, search your deck for a card that evolves from ${name} and put it onto ${name}. (this counts as evolving ${name}.) shuffle your deck afterward. this power can't be used if ${name} is affected by a special condition.`
    const unbrokenBondsText = 'once during your turn (before your attack), you may flip a coin. if heads, search your deck for a card that evolves from this pokemon and put it onto this pokemon to evolve it. then, shuffle your deck.'
    const selfEvolution = ['caterpie', 'metapod', 'cascoon'].includes(name) && text === expected
    const unbrokenBondsEvolution = ['caterpie', 'metapod'].includes(name) && text === unbrokenBondsText
    if (state.phase !== 'battle' || state.activeSide !== 'player' || source.currentHp <= 0 || !['caterpie', 'metapod', 'cascoon'].includes(name) || !selfEvolution && !unbrokenBondsEvolution || selfEvolution && (!state.player.front.some((pokemon) => pokemon.instanceId === source.instanceId) || source.statusConditions?.some((status) => ['asleep', 'confused', 'paralyzed'].includes(status))) || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber || !state.player.deck.some((card) => card.evolvesFrom?.toLowerCase() === name)) return []
    return [{ source, ability, abilityIndex }]
  }))
  const usableClefableMoonGuidance = state.phase === 'battle' && state.activeSide === 'player'
    ? [...state.player.front, ...state.player.back].flatMap<MoonGuidanceChoice>((source) => (source.abilities || []).flatMap<MoonGuidanceChoice>((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        const expected = 'once during your turn (before your attack), you may flip a coin. if heads, search your deck for a card that evolves from 1 of your pokemon and put it onto that pokemon. (this counts as evolving that pokemon.) shuffle your deck afterward.'
        const isPendingSource = moonGuidancePending && source.instanceId === state.lastAction?.frontId && ability.name === state.lastAction?.abilityName
        if (source.currentHp <= 0 || source.name.toLowerCase() !== 'clefable' || text !== expected || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent])) return []
        if (!moonGuidancePending && source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
        const legalOptions = state.player.deck.flatMap((card, deckIndex) => {
          const candidate = { ...card, instanceId: card.id, currentHp: card.hp } as TcgBattleCardState
          const probeSide = { ...state.player, hand: [...state.player.hand, candidate] }
          return getTcgBattleEvolutionOptions(probeSide, state.turnNumber, 'player', state.opponent, state.playerGoesSecond)
            .filter((option) => option.card.id === card.id)
            .map((option) => ({ targetId: option.targetId, deckIndex, evolutionName: card.name }))
        })
        if (!legalOptions.length) return []
        return isPendingSource
          ? legalOptions.map((choice) => ({ source, ability, abilityIndex, pending: true, ...choice }))
          : !moonGuidancePending ? [{ source, ability, abilityIndex, pending: false, targetId: undefined, deckIndex: undefined, evolutionName: undefined }] : []
      }))
    : []
  const usableInkayUpsideDownEvolution = state.phase === 'battle' && state.activeSide === 'player'
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        const expected = 'once during your turn (before your attack), if this pokemon is confused, you may search your deck for a card that evolves from this pokemon and put it onto this pokemon. (this counts as evolving this pokemon.) shuffle your deck afterward.'
        if (source.currentHp <= 0 || source.name.toLowerCase() !== 'inkay' || !source.statusConditions?.includes('confused') || text !== expected || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
        return state.player.deck.flatMap((card, deckIndex) => {
          const candidate = { ...card, instanceId: card.id, currentHp: card.hp } as TcgBattleCardState
          const probeSide = { ...state.player, hand: [...state.player.hand, candidate] }
          const legal = getTcgBattleEvolutionOptions(probeSide, state.turnNumber, 'player', state.opponent, state.playerGoesSecond)
            .some((option) => option.targetId === source.instanceId && option.card.id === card.id)
          return legal ? [{ source, ability, abilityIndex, deckIndex, evolutionName: card.name }] : []
        })
      }))
    : []
  const usableKarrablastShellOn = state.phase === 'battle' && state.activeSide === 'player'
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        const expected = 'once during your turn (before your attack), you may discard a shelmet from your hand. if you do, search your deck for a card that evolves from this pokemon and put it onto this pokemon to evolve it. then, shuffle your deck.'
        if (source.currentHp <= 0 || source.name.toLowerCase() !== 'karrablast' || text !== expected || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
        const shelmets = state.player.hand.filter((card) => card.name.toLowerCase() === 'shelmet')
        if (!shelmets.length) return []
        return state.player.deck.flatMap((card, deckIndex) => {
          const candidate = { ...card, instanceId: card.id, currentHp: card.hp } as TcgBattleCardState
          const probeSide = { ...state.player, hand: [...state.player.hand, candidate] }
          const legal = getTcgBattleEvolutionOptions(probeSide, state.turnNumber, 'player', state.opponent, state.playerGoesSecond)
            .some((option) => option.targetId === source.instanceId && option.card.id === card.id)
          return legal ? shelmets.map((shelmet) => ({ source, ability, abilityIndex, deckIndex, evolutionName: card.name, shelmetId: shelmet.instanceId })) : []
        })
      }))
    : []
  const usableAegislashStanceChange = state.phase === 'battle' && state.activeSide === 'player'
    ? [...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => {
        const text = ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()
        const expected = 'once during your turn (before your attack), you may switch this pokemon with an aegislash in your hand. (any cards attached to this pokemon, damage counters, special conditions, turns in play, and any other effects remain on the new pokemon.)'
        if (source.currentHp <= 0 || source.name.toLowerCase() !== 'aegislash' || text !== expected || isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) || source.abilityUses?.[`${abilityIndex}:${ability.name}`] === state.turnNumber) return []
        return state.player.hand.filter((card) => card.name.toLowerCase() === 'aegislash')
          .map((replacement) => ({ source, ability, abilityIndex, replacement }))
      }))
    : []
  const usablePokemonSwapPowers = getUsablePokemonSwapPowers(state)
  const usableBenchShuffleAbilities = getUsableBenchShuffleAbilities(state)
  const usableDiscardRecoveryAbilities = getUsableDiscardRecoveryAbilities(state)
  const usableDamageCounterAbilities = getUsableDamageCounterAbilities(state)
  const usableVenomothShiftAbilities = getUsableVenomothShiftAbilities(state)
  const usableDamageCounterMoveAbilities = getUsableDamageCounterMoveAbilities(state)
  const usablePsychicDiscardEnergyAbilities = getUsablePsychicDiscardEnergyAbilities(state)
  const usableIonoEnergyAbilities = getUsableIonoEnergyAbilities(state)
  const usableFlareonEnergyAbilities = getUsableFlareonEnergyAbilities(state)
  const usableFrosmothEnergyAbilities = getUsableFrosmothEnergyAbilities(state)
  const usableBaxcaliburEnergyAbilities = getUsableBaxcaliburEnergyAbilities(state)
  const usableEmboarEnergyAbilities = getUsableEmboarEnergyAbilities(state)
  const usableGardevoirGxEnergyAbilities = getUsableGardevoirGxEnergyAbilities(state)
  const usableVolcanionExDamageBoostAbilities = getUsableVolcanionExDamageBoostAbilities(state)
  const usableLudicoloCheerfulVoiceAbilities = getUsableLudicoloCheerfulVoiceAbilities(state)
  const usablePalkiaVstarEnergyAbilities = getUsablePalkiaVstarEnergyAbilities(state)
  const usableElectrodeGxEnergyAbilities = getUsableElectrodeGxEnergyAbilities(state)
  const usableDiscardRevivalEnergyAbilities = getUsableDiscardRevivalEnergyAbilities(state)
  const usableBenchSwitchAbilities = getUsableBenchSwitchAbilities(state, selectedAttacker)
  const usableActiveSwitchAbilities = getUsableActiveSwitchAbilities(state)
  const usableActiveStatusAbilities = getUsableActiveStatusAbilities(state)
  const usableBenchEntryAbilities = getUsableBenchEntryAbilities(state)
  const usableUnownVanishAbilities = getUsableUnownVanishAbilities(state)
  const usableUnownUndoAbilities = getUsableUnownUndoAbilities(state)
  const usableTentacoolCowardiceAbilities = getUsableTentacoolCowardiceAbilities(state)
  const usableIgglybuffGazeAbilities = getUsableIgglybuffGazeAbilities(state)
  const usableElekidPlayfulPunchAbilities = getUsableElekidPlayfulPunchAbilities(state)
  const vstarSearchDeckOptions = state.player.deck.map((card, index) => ({ card, index })).filter(({ card }) => usableDrawAbilities.some((item) => {
    if (item.vstarSearch && item.source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'hisuianlilligantvstar') return card.types.some((type) => type.toLowerCase() === 'grass') || card.name.toLowerCase().includes('grass energy')
    if (item.searchDeck && item.abilityDeckSearch) {
      const effect = item.abilityDeckSearch
      return (!effect.subtype || effect.subtype === 'colorless' ? (!effect.subtype || card.types.some((type) => type.toLowerCase() === effect.subtype)) : effect.energyCard ? card.name.toLowerCase().includes(`${effect.requiredEnergyType || ''} energy`) && (!effect.basicEnergyOnly || card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) : card.subtypes.some((subtype) => subtype.toLowerCase() === effect.subtype)) &&
        (!effect.requiredEnergyType || card.name.toLowerCase().includes(`${effect.requiredEnergyType} energy`) && (!effect.basicEnergyOnly || card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))) &&
        (!effect.nameContains || card.name.toLowerCase().includes(effect.nameContains)) &&
        (!effect.requiredNames || effect.requiredNames.includes(card.name.toLowerCase())) &&
        (!effect.requiredSubtype || card.subtypes.some((subtype) => subtype.toLowerCase() === effect.requiredSubtype)) &&
        (!effect.putOnBench || canTcgBattlePutPokemonOnBench(state.player, card)) &&
        (!effect.excludedName || !card.name.toLowerCase().includes(effect.excludedName)) &&
        (!effect.attackNameContains || card.attacks.some((attack) => attack.name.toLowerCase().includes(effect.attackNameContains!))) &&
        (!effect.noRuleBox || !card.subtypes.some((subtype) => ['ex', 'gx', 'v', 'vmax', 'vstar'].includes(subtype.toLowerCase().replace(/[^a-z]/g, '').replace(/^pokemon/, '')))) &&
        (!effect.maxHp || card.hp <= effect.maxHp) &&
        (!effect.requiredType || card.types.some((type) => type.toLowerCase() === effect.requiredType)) &&
        (!effect.evolutionOnly || Boolean(card.evolvesFrom))
    }
    return Boolean(item.searchDeck && (!item.searchSubtype || item.searchSubtype === 'pokemon' ? (!item.searchSubtype || card.types.length > 0) : item.searchSubtype === 'colorless' ? card.types.some((type) => type.toLowerCase() === item.searchSubtype) && (!item.searchMaxHp || card.hp <= item.searchMaxHp) : card.subtypes.some((subtype) => subtype.toLowerCase() === item.searchSubtype)) && (!item.searchRequiredType || card.types.some((type) => type.toLowerCase() === item.searchRequiredType)) || item.benchSearch && (item.benchSearchType === 'kabuto' ? card.name.toLowerCase() === 'kabuto' : item.benchSearchType === 'mysteriousfossil' ? card.evolvesFrom?.toLowerCase().replace(/[^a-z0-9]/g, '') === 'mysteriousfossil' : item.benchSearchType === 'restored' ? card.subtypes.some((subtype) => subtype.toLowerCase() === 'restored') : card.subtypes.includes('Basic') && (item.benchSearchType?.toLowerCase().includes('unown') ? card.name.toLowerCase().includes('unown') : card.types.some((type) => type.toLowerCase() === item.benchSearchType))))
  }))
  const discardBenchSearchOptions = state.player.discard.map((card, index) => ({ card, index })).filter(({ card }) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && card.hp <= 70 || card.types.some((type) => type.toLowerCase() === 'colorless') && !card.subtypes.some((subtype) => ['ex', 'gx', 'v', 'vmax', 'vstar'].includes(subtype.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z]/g, ''))))
  const benchSearchDeckOptions = state.player.deck.map((card, index) => ({ card, index })).filter(({ card }) => {
    if (!canTcgBattlePutPokemonOnBench(state.player, card)) return false
    return usableDrawAbilities.some((item) => {
      if (!item.benchSearch) return false
      if (item.benchSearchType === 'kabuto') return card.name.toLowerCase() === 'kabuto'
      if (item.benchSearchType === 'mysteriousfossil') return card.evolvesFrom?.toLowerCase().replace(/[^a-z0-9]/g, '') === 'mysteriousfossil'
      if (item.benchSearchType === 'restored') return card.subtypes.some((subtype) => subtype.toLowerCase() === 'restored')
      return card.subtypes.includes('Basic') && (item.benchSearchType?.toLowerCase().includes('unown') ? card.name.toLowerCase().includes('unown') : card.types.some((type) => type.toLowerCase() === item.benchSearchType))
    })
  })
  const [drawDiscardCardIds, setDrawDiscardCardIds] = useState<string[]>(state.player.hand[0]?.instanceId ? [state.player.hand[0].instanceId] : [])
  const [vstarSearchIndices, setVstarSearchIndices] = useState<string[]>([])
  const [healTargetCardId, setHealTargetCardId] = useState(state.player.front[0]?.instanceId || '')
  const anyHealAbilities = usableHealAbilities.filter(({ targetAny }) => targetAny)
  const hasSpecialConditionRecovery = usableHealAbilities.some(({ specialConditionRecovery }) => specialConditionRecovery)
  const healTargetCandidates = [...state.player.front, ...state.player.back].filter((card) => card.currentHp > 0 && (anyHealAbilities.some(({ energyFromDiscard }) => energyFromDiscard) || (card.currentHp < card.hp && anyHealAbilities.some(({ healTargetType, excludedTargetName, activeGrassOnly, activeEvolutionOnly, benchTargetOnly }) => (!activeGrassOnly || state.player.front.some((active) => active.instanceId === card.instanceId)) && (!activeEvolutionOnly || state.player.front.some((active) => active.instanceId === card.instanceId) && Boolean(card.evolutionStack?.length)) && (!benchTargetOnly || state.player.back.some((benched) => benched.instanceId === card.instanceId)) && (!healTargetType || card.types.some((cardType) => cardType.toLowerCase() === healTargetType)) && (!excludedTargetName || card.name.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '') !== excludedTargetName.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '')))) || (hasSpecialConditionRecovery && state.player.front.some((active) => active.instanceId === card.instanceId) && card.statusConditions?.length)))
  const activeHealTargetCardId = healTargetCandidates.some((card) => card.instanceId === healTargetCardId) ? healTargetCardId : healTargetCandidates[0]?.instanceId || ''
  const activeDrawDiscardCardIds = drawDiscardCardIds.filter((id) => state.player.hand.some((card) => card.instanceId === id))
  if (activeDrawDiscardCardIds.length === 0 && state.player.hand[0] && usableRotomVstar.length === 0) activeDrawDiscardCardIds.push(state.player.hand[0].instanceId)
  const getHealDiscardIds = (type?: string, count = 1) => {
    const eligible = state.player.hand.filter((card) => !type || card.types.some((cardType) => cardType.toLowerCase() === type))
    const selected = activeDrawDiscardCardIds.map((id) => eligible.find((card) => card.instanceId === id)).filter((card): card is (typeof eligible)[number] => Boolean(card))
    return (selected.length >= count ? selected : eligible).slice(0, count).map((card) => card.instanceId)
  }
  const activeVstarSearchIndices = vstarSearchIndices.filter((index) => Number.isInteger(Number(index)) && Number(index) >= 0 && Number(index) < state.player.deck.length)

  if (state.phase === 'finished' && resultShown) return null

  if (state.phase === 'finished' && !claimError) {
    return (
      <span className="sr-only" role="status">
        Loading results…
      </span>
    )
  }

  if (state.phase === 'finished') {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-game-canvas/95 p-4 backdrop-blur-md sm:p-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-game-danger/40 bg-game-danger/10 text-game-danger">
            <span aria-hidden="true" className="text-2xl font-semibold">!</span>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-game-ink">
              {getWinnerLabel(state.winner)}
            </p>
            <p role="alert" className="mt-2 max-w-sm text-sm text-game-ink/75">
              {claimError}
            </p>
            <Button
              className="mt-4 h-11 rounded-md bg-game-charcoal px-5 text-sm font-bold text-game-cream hover:bg-game-charcoal-strong"
              disabled={isPending}
              onClick={onClaim}
            >
              Retry results
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (state.pendingPromotion === 'player') {
    return (
      <div className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-30 flex justify-center">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onPromote}
          className="game-focus-ring min-h-12 rounded-md border border-game-ochre/50 bg-game-surface-raised px-5 text-xs font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/10"
        >
          Promote
        </Button>
      </div>
    )
  }

  return (
    <div className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-30 flex flex-col items-center justify-center gap-2">
      {regidragoPending && state.lastAction?.frontId && typeof state.lastAction.abilityIndex === 'number' && (
        <div className="flex max-h-56 max-w-[min(34rem,calc(100vw-1rem))] flex-wrap justify-center gap-1.5 overflow-y-auto rounded-lg border border-game-ochre/50 bg-game-canvas/95 p-2 shadow-lg">
          <p className="w-full text-center text-[10px] font-black uppercase tracking-wide text-game-ink">Legacy Star · Choose up to 2 cards to return</p>
          {state.player.discard.map((card) => {
            const selected = regidragoRecoveryIds.includes(card.instanceId)
            return <Button key={card.instanceId} type="button" variant="outline" disabled={isPending || !selected && regidragoRecoveryIds.length >= 2} onClick={() => setRegidragoRecoveryIds((current) => selected ? current.filter((id) => id !== card.instanceId) : [...current, card.instanceId])} className="game-focus-ring h-8 px-2 text-[10px]">{selected ? '✓ ' : ''}{card.name}</Button>
          })}
          <Button type="button" variant="outline" disabled={isPending} onClick={() => onUseDrawAbility(state.lastAction!.frontId!, state.lastAction!.abilityIndex!, state.lastAction!.abilityName || 'Legacy Star', regidragoRecoveryIds.filter((id) => state.player.discard.some((card) => card.instanceId === id)), false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'regidragoVstarResolve')} className="game-focus-ring h-8 px-3 text-[10px] font-black uppercase">Return selected cards</Button>
        </div>
      )}
      {(usableHealAbilities.length > 0 || usableDrawAbilities.length > 0 || usableRegidragoVstar.length > 0 || usableRotomVstar.length > 0 || usableZacianPsychicEnergy.length > 0 || usableZacianIntrepidSword.length > 0 || usableClaydolCosmicPower.length > 0 || usableToxtricitySinisterSurge.length > 0 || usableFeraligatrDoubleSwitch.length > 0 || usableZamazentaShieldStar.length > 0 || usableLatiasPsychicAttach.length > 0 || usableMagnezoneMetalAcceleration.length > 0 || usableSalamenceTopEnergyAbilities.length > 0 || usablePokemonSwapPowers.length > 0 || usableBenchShuffleAbilities.length > 0 || usableDiscardRecoveryAbilities.length > 0 || usableDamageCounterAbilities.length > 0 || usableBenchSwitchAbilities.length > 0 || usableActiveSwitchAbilities.length > 0 || usableActiveStatusAbilities.length > 0 || usableBenchEntryAbilities.length > 0 || usableUnownVanishAbilities.length > 0 || usableIgglybuffGazeAbilities.length > 0 || usableElekidPlayfulPunchAbilities.length > 0) && canAct && (
        <div className="flex max-w-full flex-wrap justify-center gap-1.5 px-2">
          {usableRegidragoVstar.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:legacy-star`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'regidragoVstar')} className="game-focus-ring h-9 rounded-md border border-game-dragon/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-dragon/10">Discard top 7 · Legacy Star</Button>
          ))}
          {usableRotomVstar.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:conversion-star`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, activeDrawDiscardCardIds, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'rotomVstar')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/10">Conversion Star · Discard {activeDrawDiscardCardIds.length} · Draw same</Button>
          ))}
          {usableZacianPsychicEnergy.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:zacian-psychic-energy`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'zacianPsychicEnergy')} className="game-focus-ring h-9 rounded-md border border-game-psychic/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-psychic/10">Search Psychic Energy · End turn</Button>
          ))}
          {usableZacianIntrepidSword.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:zacian-intrepid-sword`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'zacianIntrepidSword')} className="game-focus-ring h-9 rounded-md border border-game-metal/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-metal/10">Intrepid Sword · Top 3 · End turn</Button>
          ))}
          {usableClaydolCosmicPower.map(({ source, ability, abilityIndex }) => (
            <div key={`${source.instanceId}:${abilityIndex}:claydol-cosmic-power`} className="flex flex-wrap items-center gap-1.5">
              <select aria-label="Choose up to two cards to put on the bottom for Cosmic Power; selection order sets their order" multiple value={activeDrawDiscardCardIds} onChange={(event) => {
                const selectedIds = Array.from(event.currentTarget.selectedOptions, (option) => option.value)
                const selectedSet = new Set(selectedIds)
                const retained = activeDrawDiscardCardIds.filter((id) => selectedSet.has(id))
                setDrawDiscardCardIds([...retained, ...selectedIds.filter((id) => !retained.includes(id))].slice(0, 2))
              }} className="h-16 max-w-48 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink">{state.player.hand.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}</select>
              <Button type="button" variant="outline" disabled={isPending || Boolean(resolution) || activeDrawDiscardCardIds.length < 1 || activeDrawDiscardCardIds.length > 2} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, activeDrawDiscardCardIds, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'claydolCosmicPower')} className="game-focus-ring h-9 rounded-md border border-game-psychic/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-psychic/10">Bottom 1–2 · Draw to 6 · {ability.name}</Button>
            </div>
          ))}
          {usableToxtricitySinisterSurge.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}:sinister-surge`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, target.instanceId, false, false, false, false, false, false, 'toxtricitySinisterSurge')} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">Attach Darkness · 2 counters on {target.name} · {ability.name}</Button>
          ))}
          {usableFeraligatrDoubleSwitch.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target?.instanceId || 'opponent-only'}:feraligatr-double-switch`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, target?.instanceId, false, false, false, false, false, false, 'feraligatrDoubleSwitch')} className="game-focus-ring h-9 rounded-md border border-game-water/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-water/10">Switch opponent · {target ? `Send ${target.name} in` : 'no own Bench'} · {ability.name}</Button>
          ))}
          {usableZamazentaShieldStar.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:shield-star`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'zamazentaShieldStar')} className="game-focus-ring h-9 rounded-md border border-game-metal/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-metal/10">Shield Star · −100 next turn</Button>
          ))}
          {usableLatiasPsychicAttach.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:latias-psychic-attach`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'latiasPsychicAttach')} className="game-focus-ring h-9 rounded-md border border-game-psychic/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-psychic/10">Attach Psychic Energy from hand · Latias</Button>
          ))}
          {usableMagnezoneMetalAcceleration.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:magnezone-metal-acceleration`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'magnezoneMetalAcceleration')} className="game-focus-ring h-9 rounded-md border border-game-metal/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-metal/10">Top 6 · Attach Metal Energy · Magnezone</Button>
          ))}
          {usableHealAbilities.map(({ source, ability, abilityIndex, healAmount, healsEach, bothActiveHeal, targetAny, discardPokemon, discardPokemonCount, discardPokemonType, discardEnergy, selfOnly, specialConditionRecovery, handSource, clefablePsychicRecovery }) => (
            <Button
              key={`${source.instanceId}:${abilityIndex}`}
              type="button"
              variant="outline"
              disabled={isPending || Boolean(resolution)}
              onClick={() => onUseHealAbility(source.instanceId, abilityIndex, bothActiveHeal ? source.instanceId : handSource ? state.player.front.find((card) => card.instanceId === activeHealTargetCardId && (card.currentHp < card.hp || card.statusConditions?.length))?.instanceId || state.player.front.find((card) => card.currentHp > 0 && (card.currentHp < card.hp || card.statusConditions?.length))?.instanceId || '' : clefablePsychicRecovery ? state.player.front.find((card) => card.instanceId === activeHealTargetCardId && (card.currentHp < card.hp || card.statusConditions?.length))?.instanceId || state.player.front.find((card) => card.currentHp > 0 && (card.currentHp < card.hp || card.statusConditions?.length))?.instanceId || '' : specialConditionRecovery ? state.player.front.find((card) => card.instanceId === activeHealTargetCardId && card.statusConditions?.length)?.instanceId || state.player.front.find((card) => card.currentHp > 0 && card.statusConditions?.length)?.instanceId || '' : selfOnly ? source.instanceId : targetAny ? activeHealTargetCardId : selectedAttacker!.instanceId, ability.name, discardPokemon ? getHealDiscardIds(discardPokemonType, discardPokemonCount) : undefined)}
              className="game-focus-ring h-9 rounded-md border border-game-moss/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-moss/15"
            >
              {source.name.toLowerCase() === 'garganacl' ? `Attach Fighting Energy from discard · heal 30 · chosen Pokémon` : bothActiveHeal ? `Flip · heal up to 20 from both Active Pokémon · ${ability.name}` : source.name.toLowerCase() === 'snorlax' && ability.text.toLowerCase().includes('snorlax is now asleep') ? `Heal 10 · Become Asleep · ${ability.name}` : discardEnergy ? `Discard 1 shared Energy · heal ${healAmount} · ${ability.name}` : ability.name === 'Hustle Step' ? `Discard Energy from hand · heal ${healAmount} each · ${ability.name}` : ability.name === 'Nurse Call' ? `Discard 1 card · heal ${healAmount} · chosen Pokémon` : discardPokemonCount > 1 ? `Discard ${discardPokemonCount} cards · heal ${healAmount} · ${ability.name}` : handSource ? `Heal 10 & remove a Special Condition · discard ${source.name}` : specialConditionRecovery && healAmount > 0 ? `Heal ${healAmount} & remove a Special Condition · ${ability.name}` : specialConditionRecovery ? `Remove Special Condition · ${ability.name}` : `Heal ${healAmount}${healsEach ? ' each' : targetAny ? ' · chosen Pokémon' : ''} · ${ability.name}`}
            </Button>
          ))}
          {usableHealAbilities.some(({ targetAny }) => targetAny) && (
            <select
              aria-label="Choose a Pokémon to heal with an Ability"
              value={activeHealTargetCardId}
              onChange={(event) => setHealTargetCardId(event.target.value)}
              className="h-9 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {healTargetCandidates.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}
            </select>
          )}
          {usableDrawAbilities.filter((item) => !item.sandFlap && !item.mankeyPeek && !item.orbeetleBugRadar && !item.machampTerraforming && !item.lunatonePremonition && !item.laprasGoForASwim && !item.galladePremonition && !item.solrockPremonition).map(({ source, ability, abilityIndex, krookodileEnergyDiscard, unownDDraw, opponentHandShuffleDraw, claydolHandDraw, electabuzzBottomDraw, jellicentDeepSeaDraw, talonflameSkyHunt, discardAndDraw, discardCount, discardDrawCount, radiantGreninjaDiscard, salazzleFireDraw, ultraBeastDiscard, madPartyDiscard, evolutionRoar, mindHat, wingBuzz, ninetalesFireDraw, discardHandDraw, discardHandDrawCount, discardHandEndsTurn, refillDraw, refillDrawTarget, refillDrawEnergyCost, discardHandToBottom, directDrawCount, directDrawEnergyType, directDrawDamageCounters, directDrawEndsTurn, eachPlayerDraw, abilityDeckSearch, searchDeck, searchCount, searchSubtype, searchMaxHp, searchEndsTurn, energySearch, energySearchCount, charizardEnergySearch, incineroarEnergySearch, delphoxEnergySearch, rillaboomEnergySearch, forretressEnergySearch, energyAttach, energyAttachType, handEnergyAttach, vivillonEnergyColor, hydreigonDarkTrance, cherrimSpringBloom, cinderaceLibero, coalossalTarGenerator, energyHandDraw, discardFightingAttach, benchSearch, benchSearchCount, benchSearchType, discardBenchSearch, topDeckPickCount, topDeckSearchSubtype, handDeckSwap, dragoniteDrawTop, delibirdGiftExchange, shuffleHandDraw, revealHand, opponentHandTrim, unownTell, unownLaugh, unownHelp, unownQuicken, unownGive, unownObserve, unownXray, darkSlowkingCunning, darkSlowkingCunningNoFlip }) => (
            <Button
              key={`${source.instanceId}:${abilityIndex}`}
              type="button"
              variant="outline"
              disabled={isPending || Boolean(resolution) || Boolean(discardHandToBottom && activeDrawDiscardCardIds.length !== 1) || Boolean(abilityDeckSearch?.handDiscardCount && (activeDrawDiscardCardIds.length !== abilityDeckSearch.handDiscardCount || !abilityDeckSearch.energyCard && (activeVstarSearchIndices.length !== 1 || !state.player.deck[Number(activeVstarSearchIndices[0])]?.name.toLowerCase().includes('energy')))) || Boolean(abilityDeckSearch?.attachEnergyFromDeck && !abilityDeckSearch.energyCard && ((abilityDeckSearch.upToCount ? activeVstarSearchIndices.length > abilityDeckSearch.count : activeVstarSearchIndices.length !== 1) || activeVstarSearchIndices.some((index) => !state.player.deck[Number(index)]?.name.toLowerCase().includes(`${abilityDeckSearch.requiredEnergyType || ''} energy`) || abilityDeckSearch.basicEnergyOnly && !state.player.deck[Number(index)]?.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')))) || source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey' && (activeDrawDiscardCardIds.length === 0 || activeDrawDiscardCardIds.length > state.player.energy) || Boolean(topDeckSearchSubtype && activeVstarSearchIndices[0] && (Number(activeVstarSearchIndices[0]) >= 6 || !state.player.deck[Number(activeVstarSearchIndices[0])]?.subtypes.some((subtype) => subtype.toLowerCase() === topDeckSearchSubtype)))}
              title={dragoniteDrawTop ? 'Draw a card, then put a selected card from your hand on top of your deck.' : handEnergyAttach ? `Attach ${energyAttachType} Energy from your hand to the shared pool.` : ability.text.toLowerCase().includes('attach 1 basic energy card from your hand') ? 'Flip a coin; on heads, attach a Basic Energy from your hand to a Benched Pokémon.' : source.name.toLowerCase() === 'chandelure' ? "Discard the top Pokémon card of the opponent's deck." : ability.name === 'Pitch a Pyukumuku' ? 'Reveal this Pokémon in your hand, put it on the bottom of your deck, then draw a card.' : jellicentDeepSeaDraw ? 'Draw a card, then optionally put a card from your hand on the bottom of your deck.' : talonflameSkyHunt ? 'Flip a coin; on heads, discard a random Pokémon from the opponent’s hand.' : shuffleHandDraw ? 'Shuffle your hand to the bottom of your deck, then draw 1 card.' : undefined}
              onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, discardHandToBottom ? activeDrawDiscardCardIds.slice(0, 1) : discardAndDraw ? activeDrawDiscardCardIds.slice(0, discardCount) : abilityDeckSearch?.handDiscardCount ? activeDrawDiscardCardIds.slice(0, abilityDeckSearch.handDiscardCount) : source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey' ? activeDrawDiscardCardIds : undefined, refillDraw, discardHandDraw, searchDeck || benchSearch || topDeckPickCount || discardBenchSearch ? abilityDeckSearch?.energyCard ? [] : activeVstarSearchIndices.slice(0, topDeckPickCount ? 1 : benchSearch ? Math.min(benchSearchCount, getOpenTcgBattleBenchSlots(state.player)) : discardBenchSearch ? Math.min(2, getOpenTcgBattleBenchSlots(state.player)) : searchCount).map(Number) : undefined, Boolean(energySearch || energyAttach || energyHandDraw || discardFightingAttach), Boolean(benchSearch), handDeckSwap || delibirdGiftExchange ? activeDrawDiscardCardIds[0] : undefined, Boolean(energyAttach), Boolean(energyHandDraw), Boolean(discardFightingAttach), Boolean(revealHand), Boolean(discardBenchSearch), false, source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey' ? 'blisseyKindEgg' : source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'slaking' ? 'slakingLazyBlow' : source.name.toLowerCase() === 'chandelure' ? 'chandelureDeckDiscard' : ['krookodile', 'rampardos ex'].includes(source.name.toLowerCase()) ? 'krookodileEnergyDiscard' : jellicentDeepSeaDraw ? 'jellicentDeepSeaDraw' : talonflameSkyHunt ? 'talonflameSkyHunt' : undefined)}
              className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15"
            >
              {incineroarEnergySearch ? `Take 30 damage · Attach up to 3 Darkness Energy · ${ability.name}` : abilityDeckSearch?.handDiscardCount ? `Return 2 cards and find Energy · ${ability.name}` : source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey' ? `Return ${activeDrawDiscardCardIds.length} to deck and redraw · ${ability.name}` : source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'slaking' ? `Flip for Lazy Blow · ${ability.name}` : krookodileEnergyDiscard ? `Flip for opponent Active Energy discard · ${ability.name}` : discardBenchSearch ? `Bench up to 2 Colorless from discard · ${ability.name}` : abilityDeckSearch?.attachEnergyFromDeck ? `Attach ${abilityDeckSearch.count === 1 ? '' : `up to ${abilityDeckSearch.count} `}${abilityDeckSearch.requiredEnergyType ? `${abilityDeckSearch.requiredEnergyType[0].toUpperCase()}${abilityDeckSearch.requiredEnergyType.slice(1)} ` : ''}Energy · ${ability.name}` : abilityDeckSearch?.putOnTop ? `Search Pokémon to deck top · ${ability.name}` : revealHand ? `${source.name.toLowerCase() === 'chandelure' ? "Discard opponent's top card" : opponentHandTrim ? 'Discard opponent hand to 4' : unownObserve ? 'Inspect opponent top 5' : unownXray ? 'Inspect opponent top card' : darkSlowkingCunningNoFlip ? 'Inspect opponent top card' : darkSlowkingCunning ? 'Flip to inspect; leave deck order' : unownTell ? 'Flip to reveal both hands' : unownLaugh ? 'Flip to shuffle both decks' : unownHelp ? 'Shuffle hand and redraw' : unownQuicken ? 'Flip to protect Unown' : unownGive ? 'Flip to attach 1 Energy' : "Reveal opponent's hand"} · ${ability.name}` : handDeckSwap ? `Swap hand card with deck top · ${ability.name}` : energyAttach ? source.name.toLowerCase() === 'magneton' ? `Attach up to 3 Lightning Energy · Knock Out this Pokémon · ${ability.name}` : ability.name === 'Golden Flame' ? `Attach up to 2 Fire to Benched Ethan's Pokémon · ${ability.name}` : ability.name === 'Fire Dance' ? `Attach Fire from hand to Benched Fire · ${ability.name}` : source.name.toLowerCase() === 'togetic' ? `Recycle selected Basic Energy · ${ability.name}` : vivillonEnergyColor ? `Flip for selected Energy · ${ability.name}` : cherrimSpringBloom ? `Attach Grass to a Pokémon without a Rule Box · ${ability.name}` : cinderaceLibero ? `Attach up to 2 Fire Energy · ${ability.name}` : coalossalTarGenerator ? `Attach up to 2 Fire/Fighting Energy · ${ability.name}` : hydreigonDarkTrance ? `Attach Darkness Energy · ${ability.name}` : `Attach ${energyAttachType === 'any' ? 'selected' : energyAttachType} Energy from discard · ${ability.name}` : energyHandDraw ? source.name.toLowerCase() === 'celebi' ? `Attach Grass Energy · ${ability.name}` : source.name.toLowerCase() === 'floatzel' ? 'Attach Water Energy to Floatzel' : ability.text.toLowerCase().includes('benched psychic pokemon') ? `Attach Psychic to Benched Psychic · Draw 2 · ${ability.name}` : ability.text.toLowerCase().includes('benched pokemon') ? `Attach Psychic to Bench · Draw 2 · ${ability.name}` : `Attach Grass Energy · Draw 1 · ${ability.name}` : discardFightingAttach ? `Attach up to 2 Fighting Energy · ${ability.name}` : topDeckPickCount ? `Pick 1 of top ${topDeckPickCount} · ${ability.name}` : benchSearch ? `Search up to ${Math.min(benchSearchCount, getOpenTcgBattleBenchSlots(state.player))} Basic ${benchSearchType} to Bench · ${ability.name}` : energySearch ? source.name.toLowerCase() === 'leafeon v' ? `Attach Grass Energy · End turn · ${ability.name}` : delphoxEnergySearch ? `Search Fire Energy · ${ability.name}` : forretressEnergySearch ? `Attach up to 5 Grass Energy · Knock Out this Pokémon · ${ability.name}` : rillaboomEnergySearch ? `Attach up to 2 Grass Energy · ${ability.name}` : charizardEnergySearch ? `Take 20 damage · Attach up to 2 Fire Energy · ${ability.name}` : ability.text.toLowerCase().includes('from your energy zone') ? `Attach Grass Energy to a Grass Pokémon · ${ability.name}` : ability.text.toLowerCase().includes('attach it to this pokemon') ? `Attach Lightning Energy · ${ability.name}` : `Find up to ${energySearchCount} Energy · ${ability.name}` : searchDeck ? `Search up to ${searchCount} · ${ability.name}` : opponentHandShuffleDraw ? `Opponent shuffles hand · Draw 3 · ${ability.name}` : electabuzzBottomDraw ? `Draw bottom card · ${ability.name}` : claydolHandDraw ? `Shuffle your hand · Draw ${state.opponent.hand.length} · ${ability.name}` : eachPlayerDraw ? unownDDraw ? `Flip coin · Both may draw 1 · ${ability.name}` : ability.name === 'Let Loose' ? `Both shuffle hands · Draw up to 4 · ${ability.name}` : `Each draw · ${ability.name}` : discardAndDraw ? (mindHat ? `Both discard 1 · ${ability.name}` : evolutionRoar ? `Discard 2 · Search Galarian Perrserker · ${ability.name}` : `Discard ${radiantGreninjaDiscard ? '1 Energy' : ultraBeastDiscard ? '1 Ultra Beast' : madPartyDiscard ? '1 Mad Party Pokémon' : wingBuzz ? '1 card · Mill opponent 1' : salazzleFireDraw ? '1 Fire Energy' : discardCount} · ${wingBuzz ? '' : `Draw ${discardDrawCount} · `}${ability.name}`) : discardHandDraw ? `Discard hand · Draw ${discardHandDrawCount} · ${ability.name}` : refillDraw ? `${refillDrawEnergyCost ? 'Discard Energy · ' : ''}Draw to ${refillDrawTarget} · ${ability.name}` : talonflameSkyHunt ? `Flip coin · Discard random opponent card on heads · ${ability.name}` : `${directDrawDamageCounters ? `Put ${directDrawDamageCounters} damage counter on self · ` : ''}${directDrawEnergyType ? `Discard ${directDrawEnergyType === 'any' ? '' : directDrawEnergyType === 'f' ? 'Fighting ' : directDrawEnergyType === 'g' ? 'Grass ' : `${directDrawEnergyType.toUpperCase()} `}Energy · ` : ''}Draw ${directDrawCount || 1} · ${ability.name}`}
            </Button>
          ))}
          {jellicentPendingSource && jellicentPendingAbility && (
            <div className="flex flex-wrap items-center gap-2">
              <select aria-label="Choose a card to put on the bottom of your deck for Deep Sea Draw" value={activeDrawDiscardCardIds[0] || ''} onChange={(event) => setDrawDiscardCardIds(event.target.value ? [event.target.value] : [])} className="h-9 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink">
                <option value="">Choose a card (optional)</option>
                {state.player.hand.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}
              </select>
              <Button type="button" variant="outline" disabled={isPending || Boolean(resolution) || !activeDrawDiscardCardIds[0]} onClick={() => onUseDrawAbility(jellicentPendingSource.instanceId, state.lastAction!.abilityIndex!, jellicentPendingAbility.name, [activeDrawDiscardCardIds[0]], false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'jellicentDeepSeaBottom')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Put selected card on deck bottom</Button>
              <Button type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(jellicentPendingSource.instanceId, state.lastAction!.abilityIndex!, jellicentPendingAbility.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'jellicentDeepSeaBottom')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Keep hand</Button>
            </div>
          )}
          {usableDrawAbilities.filter((item) => item.sandFlap).map(({ source, ability, abilityIndex }) => (
            <div key={`${source.instanceId}:${abilityIndex}:sand-flap`} className="contents">
              <Button type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'sandFlapSelf')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Shuffle your hand and draw 4 · {ability.name}</Button>
              <Button type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'sandFlapOpponent')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Shuffle opponent&apos;s hand and draw 4 · {ability.name}</Button>
            </div>
          ))}
          {usableOrbeetleBugRadarAbilities.flatMap(({ source, ability, abilityIndex }) => state.battleMode === 'pvp' && !bugRadarPending
            ? [<Button key={`${source.instanceId}:${abilityIndex}:bug-radar-inspect`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'bugRadar')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Inspect opponent’s top 3 · {ability.name}</Button>]
            : opponentDeckOrderOptions.map((order) => (
              <Button key={`${source.instanceId}:${abilityIndex}:bug-radar:${order.join('')}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, order, false, false, undefined, false, false, false, false, false, false, state.battleMode === 'pvp' ? 'bugRadarOrder' : 'bugRadar')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
                Put {order.map((index) => opponentDeckTop[index]?.name).join(' → ')} on top · {ability.name}
              </Button>
            ))) }
          {usableSalamenceTopEnergyAbilities.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:top-energy`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, source.name.toLowerCase() === 'magcargo-gx' ? 'magcargoTopEnergy' : 'salamenceTopEnergy')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {source.name.toLowerCase() === 'magcargo-gx' ? 'Discard top card · add Energy if Basic' : 'Reveal top card'} · {ability.name}
            </Button>
          ))}
          {usableDeckOrderAbilities.flatMap(({ source, ability, abilityIndex, lunatonePremonition, laprasGoForASwim, galladePremonition, solrockPremonition }) => {
            const slowkingTemporalBackflow = source.name.toLowerCase() === 'slowking'
            const playerDeck = slowkingTemporalBackflow ? undefined : state.player.deck
            const deckChoices = slowkingTemporalBackflow ? [['slowkingOwnOrder', 'your deck', state.player.deck], ['slowkingOpponentOrder', "opponent's deck", state.opponent.deck]] as const : [['', 'your deck', playerDeck || []]] as const
            return deckChoices.flatMap(([choice, owner, deck]) => {
              const topCards = deck.slice(0, slowkingTemporalBackflow ? 3 : galladePremonition ? 5 : solrockPremonition ? 3 : lunatonePremonition || laprasGoForASwim ? 2 : 4)
              return getTcgBattleIndexPermutations(topCards.length).map((order) => (
                <Button key={`${source.instanceId}:${abilityIndex}:deck-order:${choice}:${order.join('')}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, order, false, false, undefined, false, false, false, false, false, false, slowkingTemporalBackflow ? choice as 'slowkingOwnOrder' | 'slowkingOpponentOrder' : undefined)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
                  Put {order.map((index) => topCards[index]?.name).join(' → ')} on {owner} · {ability.name}
                </Button>
              ))
            })
          })}
          {[...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'unowne' && ability.text.toLowerCase().replace(/\s+/g, ' ').trim() === 'when you play unown [e] from your hand, your opponent may shuffle his or her hand into his or her deck and then draw 4 cards. either way, you may shuffle your hand into your deck and draw 4 cards.' && state.lastAction?.kind === 'bench' && state.lastAction.side === 'player' && state.lastAction.frontId === source.instanceId && source.playedToBenchTurn === state.turnNumber ? [
            <Button key={`${source.instanceId}:${abilityIndex}:unown-e-draw`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'unownEEntryDraw')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Shuffle your hand · Draw up to 4 · {ability.name}</Button>,
          ] : []))}
          {[...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => source.name.toLowerCase() === 'spiritomb' && ability.text.toLowerCase().replace(/\s+/g, ' ').trim() === 'once during your turn (before your attack), you may put 1 damage counter on this pokemon.' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber ? [
            <Button key={`${source.instanceId}:${abilityIndex}:building-spite`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, false, false, false, 'spiritombBuildingSpite')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Put 1 damage counter on Spiritomb · {ability.name}</Button>,
          ] : []))}
          {usableDrawAbilities.filter((item) => item.mankeyPeek).flatMap(({ source, ability, abilityIndex, unownDeckPeek, porygonDeckPeek, sableyeTopDeckDiscard, aipomDeckBottom, malamarDualPeek }) => malamarDualPeek ? [
            <Button key={`${source.instanceId}:${abilityIndex}:dual-deck-peek`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, true, false, false, 'malamarDualPeek')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Inspect both deck tops · {ability.name}</Button>,
          ] : aipomDeckBottom ? [
            <Button key={`${source.instanceId}:${abilityIndex}:deck-bottom-opponent`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, true, false, false, 'aipomDeckBottom')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Put opponent&apos;s top card on deck bottom · {ability.name}
            </Button>,
          ] : sableyeTopDeckDiscard ? [
            <Button key={`${source.instanceId}:${abilityIndex}:discard-top`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, true, false, false, 'sableyeTopDeckDiscard')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Discard {state.player.deck[0]?.name || 'top card'} · {ability.name}
            </Button>,
          ] : (source.name.toLowerCase() === 'lanturn' && ability.text.toLowerCase().includes('as often as you like') ? [
            ...(state.opponent.deck.length > 0 ? [['opponentDeck', "Inspect opponent's deck top"] as const] : []),
          ] : porygonDeckPeek ? [
            ...(state.player.deck.length > 0 ? [['ownDeck', 'Inspect your deck top'] as const] : []),
          ] : unownDeckPeek ? [
            ...(state.player.deck.length > 0 ? [['ownDeck', 'Inspect your deck top'] as const] : []),
            ...(state.opponent.deck.length > 0 ? [['opponentDeck', "Inspect opponent's deck top"] as const] : []),
          ] : [
            ['ownDeck', 'Inspect your deck top'],
            ['opponentDeck', "Inspect opponent's deck top"],
            ['randomOpponentHand', "Inspect a random card in opponent's hand"],
          ] as const).map(([choice, label]) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${choice}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, true, false, false, choice)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {label} · Peek
            </Button>
          )))}
          {usableDrawAbilities.filter((item) => item.darkSlowkingCunning || item.darkSlowkingCunningNoFlip).map(({ source, ability, abilityIndex, darkSlowkingCunningNoFlip }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:shuffle`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, undefined, false, false, undefined, false, false, false, true, false, true)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {darkSlowkingCunningNoFlip ? 'Shuffle opponent deck after inspecting top card' : 'Flip; shuffle opponent deck on heads'} · {ability.name}
            </Button>
          ))}
          {usableKogaKakunaEmerge.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseKogaKakunaEmerge(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Flip for Koga's Beedrill · {ability.name}
            </Button>
          ))}
          {usableSelfEvolutionCoins.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:evolve-coin`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseKogaKakunaEmerge(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Flip to evolve {source.name} · {ability.name}
            </Button>
          ))}
          {[...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => source.name.toLowerCase() === 'gothitelle' && ability.text.toLowerCase().replace(/\s+/g, ' ').trim() === "once during your turn, you may look at the top 2 cards of your opponent's deck and put 1 of them back. put the other card on the bottom of their deck." && state.opponent.deck.length >= 2 && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber ? [0, 1].map((index) => (
            <Button key={`${source.instanceId}:${abilityIndex}:deck-sift:${index}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, [index], false, false, undefined, false, false, false, true, false, false, 'gothitelleDeckSift')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Keep {state.opponent.deck[index]?.name || 'selected card'} on top · {ability.name}</Button>
          )) : []))}
          {[...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => source.name.toLowerCase() === 'kingdra' && ability.text.toLowerCase().replace(/\s+/g, ' ').trim() === 'once during your turn, you may have either player shuffle their hand and put it on the bottom of their deck. if that player put any cards on the bottom in this way, they draw 4 cards.' && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber ? (['player', 'opponent'] as const).filter((side) => state[side].hand.length > 0).map((side) => (
            <Button key={`${source.instanceId}:${abilityIndex}:bottom-hand:${side}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, [side === 'player' ? 0 : 1], false, false, undefined, false, false, false, false, false, false, 'kingdraHandBottom')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">{side === 'player' ? 'Shuffle your hand to deck bottom · draw 4' : 'Shuffle opponent hand to deck bottom · draw 4'} · {ability.name}</Button>
          )) : []))}
          {[...state.player.front, ...state.player.back].flatMap((source) => (source.abilities || []).flatMap((ability, abilityIndex) => source.name.toLowerCase() === 'vivillon' && ability.text.toLowerCase().replace(/\s+/g, ' ').trim() === 'once during your turn, you may use this ability. your opponent shuffles their hand and puts it on the bottom of their deck. if they put any cards on the bottom of their deck in this way, they draw 4 cards.' && state.opponent.hand.length > 0 && source.abilityUses?.[`${abilityIndex}:${ability.name}`] !== state.turnNumber && !isTcgBattleAbilitySuppressed(source, [state.player, state.opponent]) ? (
            <Button key={`${source.instanceId}:${abilityIndex}:bottom-hand:opponent`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDrawAbility(source.instanceId, abilityIndex, ability.name, undefined, false, false, [1], false, false, undefined, false, false, false, false, false, false, 'kingdraHandBottom')} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">Shuffle opponent hand to deck bottom · draw 4 · {ability.name}</Button>
          ) : []))}
          {usableClefableMoonGuidance.map((choice) => choice.pending ? (
            <Button key={`${choice.source.instanceId}:${choice.abilityIndex}:${choice.targetId}:${choice.deckIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onResolveClefableMoonGuidance(choice.targetId!, choice.deckIndex!, choice.ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Evolve {([...state.player.front, ...state.player.back].find((card) => card.instanceId === choice.targetId)?.name) || 'Pokémon'} into {choice.evolutionName} · {choice.ability.name}
            </Button>
          ) : (
            <Button key={`${choice.source.instanceId}:${choice.abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseClefableMoonGuidance(choice.source.instanceId, choice.abilityIndex, choice.ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Flip for Moon Guidance · {choice.ability.name}
            </Button>
          ))}
          {usableInkayUpsideDownEvolution.map(({ source, ability, abilityIndex, deckIndex, evolutionName }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${deckIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseInkayUpsideDownEvolution(source.instanceId, abilityIndex, deckIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Evolve Confused Inkay into {evolutionName} · {ability.name}
            </Button>
          ))}
          {usableKarrablastShellOn.map(({ source, ability, abilityIndex, deckIndex, evolutionName, shelmetId }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${deckIndex}:${shelmetId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseKarrablastShellOn(source.instanceId, abilityIndex, deckIndex, shelmetId, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              Discard Shelmet · evolve Karrablast into {evolutionName} · {ability.name}
            </Button>
          ))}
          {usableAegislashStanceChange.map(({ source, ability, abilityIndex, replacement }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${replacement.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseAegislashStanceChange(source.instanceId, abilityIndex, replacement.instanceId, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {source.name}: change to {replacement.attacks[0]?.name || 'Aegislash'} stance · {ability.name}
            </Button>
          ))}
          {usablePokemonSwapPowers.flatMap(({ source, ability, abilityIndex, power, replacementTargets }) => replacementTargets.map((replacement) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${replacement.id}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUsePokemonSwapPower(source.instanceId, abilityIndex, replacement.id, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {power.powerName}: {source.name} → {replacement.name}{power.replacementZone === 'discard' ? ' (discard pile)' : power.replacementZone === 'hand' ? ' (hand)' : ''}
            </Button>
          )))}
          {usableBenchShuffleAbilities.map(({ source, ability, abilityIndex, target, selfReturn, returnToHand, azumarillReturn, activeCoinReturn, wishiwashiCowardice, selfShuffle, unownFarewellLetter, unownZTopDeck, undevelop, gengarDevolution, archeopsDevolution, dusknoirPower, crawdauntExReturn, aipomSnappyMove, mistysPsyduckReturn }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseBenchShuffleAbility(source.instanceId, abilityIndex, target.instanceId, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {mistysPsyduckReturn ? `Discard deck bottom; put Misty's Psyduck on top · ${ability.name}` : aipomSnappyMove ? `Draw 1; put Aipom on the bottom of the deck · ${ability.name}` : archeopsDevolution ? `Devolve opponent's ${target.name}; return its highest Evolution to hand · ${ability.name}` : crawdauntExReturn ? `Return opponent's ${target.name} and its Evolution cards to hand · ${ability.name}` : dusknoirPower ? `Shuffle opponent's ${target.name} and its Evolution cards into their deck · ${ability.name}` : gengarDevolution ? `Devolve opponent's ${target.name}; shuffle LV.X into their deck · ${ability.name}` : undevelop ? `Devolve ${source.name} to hand · ${ability.name}` : activeCoinReturn ? `Flip to return ${source.name} to hand · ${ability.name}` : azumarillReturn ? `Flip to return Azumarill to hand · ${ability.name}` : wishiwashiCowardice ? `Return Wishiwashi to hand · ${ability.name}` : unownZTopDeck ? `Put Unown Z on top of your empty deck · ${ability.name}` : returnToHand ? `Return ${target.name} and its Evolution cards to hand` : unownFarewellLetter || source.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'unownr' ? `Discard ${target.name} · draw 1 card · ${ability.name}` : `Shuffle ${target.name}${selfShuffle ? ' and its Evolution cards' : ''} into deck${selfReturn || selfShuffle ? '' : ` · ${source.name}`} · ${ability.name}`}
            </Button>
          ))}
          {usableDiscardRecoveryAbilities.map(({ source, ability, abilityIndex, empoleonRecall }) => (
            <Button key={`${source.id}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDiscardRecoveryAbility(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {empoleonRecall ? 'Put Empoleon onto the Bench; draw 3' : source.name.toLowerCase() === 'suicune' ? `Recover up to 3 Water Pokémon from discard · ${ability.name}` : source.name.toLowerCase() === 'starmie' ? `Recover Water Energy from discard · ${ability.name}` : ability.text.toLowerCase().includes('into your hand') ? `Return ${source.name} to hand` : `Put ${source.name} on deck bottom · ${ability.name}`}
            </Button>
          ))}
          {usableVenomothShiftAbilities.map(({ source, target, type, ability, abilityIndex }) => (
              <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}:${type}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseVenomothShift(source.instanceId, abilityIndex, target.instanceId, type, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/15">
              {ability.name} · {source.name} becomes {type}
            </Button>
          ))}
          {usableDamageCounterAbilities.map(({ source, target, distributionTargets, ability, abilityIndex, effect }) => (
            <div key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} className="flex flex-wrap items-center gap-2">
            {effect.discardHandForSelfCounters && <select aria-label="Choose cards to discard for Temper Tantrum" multiple value={activeDrawDiscardCardIds} onChange={(event) => setDrawDiscardCardIds(Array.from(event.currentTarget.selectedOptions, (option) => option.value))} className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink">{state.player.hand.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}</select>}
            {effect.discardSingleCardFromHand && <select aria-label={`Choose one card to discard for ${ability.name}`} value={activeDrawDiscardCardIds[0] || ''} onChange={(event) => setDrawDiscardCardIds(event.currentTarget.value ? [event.currentTarget.value] : [])} className="h-9 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"><option value="">Choose a card</option>{state.player.hand.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}</select>}
            {effect.distributeCounters && distributionTargets?.map((_, counterIndex) => {
              const key = `${source.instanceId}:${abilityIndex}`
              const choices = distributionTargets
              const assigned = distributedCounterTargets[key] || Array.from({ length: effect.count }, () => choices[0]?.instanceId || '')
              return <select key={counterIndex} aria-label={`Choose Pokémon for damage counter ${counterIndex + 1}`} value={assigned[counterIndex] || ''} onChange={(event) => {
                const selectedId = event.currentTarget.value
                setDistributedCounterTargets((current) => ({ ...current, [key]: Array.from({ length: effect.count }, (_, index) => index === counterIndex ? selectedId : (current[key] || assigned)[index] || choices[0]?.instanceId || '') }))
              }} className="h-9 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink">{choices.map((choice) => <option key={choice.instanceId} value={choice.instanceId}>{choice.name}</option>)}</select>
            })}
            <Button type="button" variant="outline" disabled={isPending || Boolean(resolution) || effect.discardHandForSelfCounters && activeDrawDiscardCardIds.length === 0 || effect.discardSingleCardFromHand && activeDrawDiscardCardIds.length !== 1} onClick={() => {
              const distribution = distributedCounterTargets[`${source.instanceId}:${abilityIndex}`]
              onUseDamageCounterAbility(source.instanceId, abilityIndex, target.instanceId, ability.name, effect.discardHandForSelfCounters || effect.discardSingleCardFromHand ? activeDrawDiscardCardIds : undefined, effect.distributeCounters ? distribution || Array.from({ length: effect.count }, () => target.instanceId) : undefined)
            }} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              {effect.discardSingleCardFromHand ? `Discard 1 · Flip coin · Heads: ${effect.count} counters on ${target.name}` : effect.discardHandForSelfCounters ? `Discard ${activeDrawDiscardCardIds.length} · Put ${activeDrawDiscardCardIds.length} counter${activeDrawDiscardCardIds.length === 1 ? '' : 's'} on ${source.name}` : effect.returnOpposingEnergy ? `Flip coin · Heads: return Energy from ${target.name}` : effect.discardOpposingEnergy ? `Flip coin · Heads: discard Energy from ${target.name}` : effect.counterRemoval ? `Remove up to ${effect.count} counters from ${target.name}` : effect.coinFlip ? `Flip coin · Heads: ${effect.spreadToAllOpponents ? `${effect.count} counter on each opposing Benched Pokémon` : `1 counter on ${target.name}`}` : `${effect.energyType ? `Pay ${effect.energyType.toUpperCase()} · ` : ''}${effect.fixedTargetCount ? `Put ${effect.fixedCountersPerTarget} counters on each of 2 opposing Benched Pokémon` : effect.distributeCounters ? `Assign ${effect.count} counters among opposing Pokémon` : effect.spreadToAllOpponents ? `${effect.count} counter${effect.count === 1 ? '' : 's'} on each opposing Pokémon` : effect.directDamage ? `${effect.directDamage} damage to ${target.name}` : `${effect.count} counter${effect.count === 1 ? '' : 's'} on ${effect.ownTargets ? `friendly ${target.name}` : target.name}`}`}{effect.shuffleSource ? ` · shuffle ${source.name} into deck` : ''}{effect.selfKnockout ? ` · Knock Out ${source.name}` : ''}{effect.endsTurn ? ' · Ends turn' : ''} · {ability.name}
            </Button>
            </div>
          ))}
          {usableDamageCounterMoveAbilities.map(({ source, from, to, counterCount, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${from.instanceId}:${to.instanceId}:${counterCount}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDamageCounterMoveAbility(source.instanceId, abilityIndex, from.instanceId, to.instanceId, counterCount, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              Move {counterCount} counter{counterCount === 1 ? '' : 's'} · {from.name} → {to.name} · {ability.name}
            </Button>
          ))}
          {usablePsychicDiscardEnergyAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUsePsychicDiscardEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-violet/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-violet/10">
              {ability.text.toLowerCase().includes('lightning energy card from your discard pile') ? `Recover Lightning Energy to Benched ${target.name} · ${ability.name}` : ability.text.toLowerCase().includes('metal energy card from your discard pile') ? `Recover Metal Energy to Benched ${target.name} · ${ability.name}` : ability.text.toLowerCase().includes('benched pokemon') ? `Attach Psychic Energy to Benched ${target.name} · ${ability.name}` : ability.text.toLowerCase().startsWith('once during your turn') ? `Attach ${state.player.selectedEnergy} Energy to Active · ${ability.name}` : `Attach Psychic Energy · 20 damage to ${target.name} · ${ability.name}`}
            </Button>
          ))}
          {usableIonoEnergyAbilities.map(({ source, target, ability, abilityIndex, hydrapple, houndoom }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseIonoEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-ochre/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-ochre/10">
              {houndoom ? `Attach ${state.player.selectedEnergy} · 2 counters on ${target.name}` : hydrapple ? `Attach Grass · Heal 30 from ${target.name}` : `Attach Lightning Energy · ${target.name}`} · {ability.name}
            </Button>
          ))}
          {usableFlareonEnergyAbilities.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseFlareonEnergyAbility(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              Attach Fire Energy · 20 damage to {source.name} · {ability.name}
            </Button>
          ))}
          {usableFrosmothEnergyAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseFrosmothEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-water/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-water/10">
              Attach Water Energy · {target.name} · {ability.name}
            </Button>
          ))}
          {usableBaxcaliburEnergyAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseBaxcaliburEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-water/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-water/10">
              Attach Water Energy · {target.name} · {ability.name}
            </Button>
          ))}
          {usableEmboarEnergyAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseEmboarEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              Attach Fire Energy · {target.name} · {ability.name}
            </Button>
          ))}
          {usableGardevoirGxEnergyAbilities.map(({ source, target, ability, abilityIndex, energyType }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseGardevoirGxEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-violet/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-violet/10">
              Attach {energyType[0].toUpperCase()}{energyType.slice(1)} Energy · {target.name} · {ability.name}
            </Button>
          ))}
          {usableVolcanionExDamageBoostAbilities.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseVolcanionExDamageBoost(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              {source.name.toLowerCase() === 'feraligatr' ? 'Take 50 damage · Feraligatr attacks +120 this turn' : source.name.toLowerCase() === 'skeledirge ex' ? 'Discard Basic Fire Energy · your attacks +60 vs Active this turn' : source.name.toLowerCase() === 'skeledirge' ? 'Discard shared Fire Energy · Fire attacks +50 this turn' : `Discard Fire Energy · ${source.name.toLowerCase() === 'rapidash' ? 'Fire attacks +30 this turn' : 'Basic Fire attacks +30 this turn'}`} · {ability.name}
            </Button>
          ))}
          {usableLudicoloCheerfulVoiceAbilities.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseLudicoloCheerfulVoice(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-grass/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-grass/10">
              End turn · Ludicolo attacks +60 next turn · {ability.name}
            </Button>
          ))}
          {usablePalkiaVstarEnergyAbilities.map(({ source, target, ability, abilityIndex, energyCount }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}:${energyCount}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUsePalkiaVstarEnergyAbility(source.instanceId, target.instanceId, energyCount, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-water/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-water/10">
              Attach {energyCount} Water Energy · {target.name} · {ability.name} (VSTAR)
            </Button>
          ))}
          {usableElectrodeGxEnergyAbilities.map(({ source, target, ability, abilityIndex, buzzap }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseElectrodeGxEnergyAbility(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              {buzzap ? `Attach 2 ${state.player.selectedEnergy} Energy · Knock Out ${source.name} · ${target.name}` : `Attach 5 Energy · Knock Out ${source.name} · ${target.name}`} · {ability.name}
            </Button>
          ))}
          {usableDiscardRevivalEnergyAbilities.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseDiscardRevivalEnergyAbility(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/10">
              {source.name.toLowerCase() === 'porygon-z' ? `Flip coin · recover up to 4 ${state.player.selectedEnergy} Energy / tails discard 1 · ${ability.name}` : source.name.toLowerCase() === 'ho-oh v' ? `Revive ${source.name} · Recover up to 4 ${state.player.selectedEnergy || 'selected'} Energy · End turn` : ability.text.toLowerCase().includes('put 3 damage counters') ? `Revive ${source.name} · 3 damage counters · ${ability.name}` : `Revive ${source.name} · Attach Darkness Energy · ${ability.name}`}
            </Button>
          ))}
          {usableRotomVstar.length > 0 || usableDrawAbilities.some(({ discardAndDraw, discardCount, abilityDeckSearch, source }) => discardAndDraw && discardCount > 1 || Boolean(abilityDeckSearch?.handDiscardCount) || source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey') ? (
            <select
              aria-label={usableRotomVstar.length > 0 ? 'Choose any number of cards to discard for Conversion Star' : usableDrawAbilities.some(({ abilityDeckSearch }) => abilityDeckSearch?.handDiscardCount) ? 'Choose two cards to return to your deck for Furret' : usableDrawAbilities.some(({ source }) => source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'blissey') ? `Choose up to ${state.player.energy} cards for Kind Egg` : usableDrawAbilities.some(({ radiantGreninjaDiscard }) => radiantGreninjaDiscard) ? 'Choose an Energy card for Concealed Cards' : 'Choose cards to discard for a draw Power'}
              multiple
              value={activeDrawDiscardCardIds}
              onChange={(event) => setDrawDiscardCardIds(Array.from(event.currentTarget.selectedOptions, (option) => option.value))}
              className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {state.player.hand.filter((card) => usableDrawAbilities.some((entry) => entry.radiantGreninjaDiscard) ? card.subtypes.some((subtype) => subtype.toLowerCase() === 'energy') : usableDrawAbilities.some((entry) => entry.ninetalesFireDraw || entry.salazzleFireDraw) ? card.subtypes.some((subtype) => subtype.toLowerCase() === 'energy') && card.name.toLowerCase().includes('fire') : !usableDrawAbilities.some((entry) => entry.ultraBeastDiscard) || usableDrawAbilities.some((entry) => entry.discardAndDraw && !entry.ultraBeastDiscard) || card.subtypes.some((subtype) => subtype.toLowerCase() === 'ultra beast')).map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}
            </select>
          ) : usableHealAbilities.some(({ discardPokemonCount }) => discardPokemonCount > 1) ? (
            <select
              aria-label="Choose two cards to discard for Regi Heal"
              multiple
              value={activeDrawDiscardCardIds}
              onChange={(event) => setDrawDiscardCardIds(Array.from(event.currentTarget.selectedOptions, (option) => option.value))}
              className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {state.player.hand.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}
            </select>
          ) : (usableDrawAbilities.some(({ discardAndDraw, discardCount, handDeckSwap, delibirdGiftExchange, discardHandToBottom }) => (discardAndDraw && discardCount === 1) || handDeckSwap || delibirdGiftExchange || discardHandToBottom) || usableHealAbilities.some(({ discardPokemon }) => discardPokemon)) ? (
            <select
              aria-label={usableHealAbilities.some(({ ability }) => ability.name === 'Nurse Call') ? 'Choose a card to discard for Nurse Call' : usableHealAbilities.some(({ discardPokemon }) => discardPokemon) ? 'Choose a Pokémon to discard for a healing Ability' : usableDrawAbilities.some(({ discardHandToBottom }) => discardHandToBottom) ? 'Choose a card to put on the bottom of your deck' : usableDrawAbilities.some(({ delibirdGiftExchange }) => delibirdGiftExchange) ? 'Choose a card to shuffle into your deck for Gift Exchange' : usableDrawAbilities.some(({ handDeckSwap }) => handDeckSwap) ? 'Choose a card to swap with the top card of your deck' : 'Choose a Pokémon to discard for a draw Power'}
              value={usableHealAbilities.some((entry) => entry.discardPokemonType) ? getHealDiscardIds(usableHealAbilities.find((entry) => entry.discardPokemonType)?.discardPokemonType)[0] || '' : activeDrawDiscardCardIds[0] || ''}
              onChange={(event) => setDrawDiscardCardIds(event.target.value ? [event.target.value] : [])}
              className="h-9 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {state.player.hand.filter((card) => (!usableDrawAbilities.some((entry) => entry.ultraBeastDiscard) || usableDrawAbilities.some((entry) => entry.discardAndDraw && !entry.ultraBeastDiscard) || card.subtypes.some((subtype) => subtype.toLowerCase() === 'ultra beast')) && (!usableHealAbilities.some((entry) => entry.discardPokemonType) || card.types.some((type) => type.toLowerCase() === 'metal'))).map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}
            </select>
          ) : null}
          {usableDrawAbilities.some(({ searchDeck }) => searchDeck) && (
            <select
              aria-label="Choose cards from the deck for an Ability"
              multiple
              value={activeVstarSearchIndices}
              onChange={(event) => setVstarSearchIndices(Array.from(event.currentTarget.selectedOptions, (option) => option.value))}
              className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {vstarSearchDeckOptions.map(({ card, index }) => <option key={`${card.id}:${index}`} value={String(index)}>{card.name}</option>)}
            </select>
          )}
          {usableDrawAbilities.some(({ topDeckPickCount }) => topDeckPickCount > 0) && (
            <select
              aria-label="Choose a card from the top of the deck for an Ability"
              value={activeVstarSearchIndices[0] || ''}
              onChange={(event) => setVstarSearchIndices(event.target.value ? [event.target.value] : [])}
              className="h-9 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {usableDrawAbilities.some(({ topDeckSearchSubtype }) => topDeckSearchSubtype) && <option value="">No matching card; shuffle the cards back</option>}
              {state.player.deck.slice(0, Math.max(...usableDrawAbilities.map(({ topDeckPickCount }) => topDeckPickCount))).map((card, index) => ({ card, index })).filter(({ card }) => !usableDrawAbilities.some(({ topDeckSearchSubtype }) => topDeckSearchSubtype) || usableDrawAbilities.some(({ topDeckSearchSubtype }) => topDeckSearchSubtype && (topDeckSearchSubtype === 'pokemon' || card.subtypes.some((subtype) => subtype.toLowerCase() === topDeckSearchSubtype)))).map(({ card, index }) => <option key={`${card.id}:${index}`} value={String(index)}>{card.name}</option>)}
            </select>
          )}
          {usableDrawAbilities.some(({ benchSearch }) => benchSearch) && !usableDrawAbilities.some(({ searchDeck }) => searchDeck) && (
            <select
              aria-label="Choose Basic Pokémon to put on the Bench"
              multiple
              value={activeVstarSearchIndices}
              onChange={(event) => setVstarSearchIndices(Array.from(event.currentTarget.selectedOptions, (option) => option.value))}
              className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {benchSearchDeckOptions.map(({ card, index }) => <option key={`${card.id}:${index}`} value={String(index)}>{card.name}</option>)}
            </select>
          )}
          {usableDrawAbilities.some(({ discardBenchSearch }) => discardBenchSearch) && (
            <select
              aria-label="Choose Pokémon to put on your Bench from your discard pile"
              multiple
              value={vstarSearchIndices.filter((index) => Number.isInteger(Number(index)) && Number(index) >= 0 && Number(index) < state.player.discard.length)}
              onChange={(event) => setVstarSearchIndices(Array.from(event.currentTarget.selectedOptions, (option) => option.value))}
              className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink"
            >
              {discardBenchSearchOptions.map(({ card, index }) => <option key={`${card.id}:${index}`} value={String(index)}>{card.name}</option>)}
            </select>
          )}
          {usableBenchSwitchAbilities.map(({ source, ability, abilityIndex }) => (
            <Button
              key={`${source.instanceId}:${abilityIndex}`}
              type="button"
              variant="outline"
              disabled={isPending || Boolean(resolution)}
              onClick={() => onUseBenchSwitchAbility(source.instanceId, abilityIndex, selectedAttacker!.instanceId, ability.name)}
              className="game-focus-ring h-9 rounded-md border border-game-sky/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-sky/15"
            >
              Switch · {ability.name}
            </Button>
          ))}
          {usableActiveSwitchAbilities.map(({ source, target, ability, abilityIndex, opponentTarget, opponentForcedSwitch, opponentVstarSwitch, bigWing, ironBundleSwitch, fragranceTrap, appletunAroma, dragonWind }) => (
            <Button
              key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`}
              type="button"
              variant="outline"
              disabled={isPending || Boolean(resolution) || source.name.toLowerCase() === 'regice' && activeDrawDiscardCardIds.length < 2}
              onClick={() => onUseBenchSwitchAbility(source.instanceId, abilityIndex, target.instanceId, ability.name, source.name.toLowerCase() === 'regice' ? activeDrawDiscardCardIds.slice(0, 2) : undefined)}
              className="game-focus-ring h-9 rounded-md border border-game-moss/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-moss/15"
            >
              {source.name.toLowerCase() === 'metagross' && ability.name === 'Magnetic Warp' ? `Switch to ${target.name}, then opponent switches` : source.name.toLowerCase() === 'regice' ? `Discard 2 cards · opponent switches out ${target.name}` : dragonWind ? `Bring in ${target.name} · Dragon Wind` : fragranceTrap || appletunAroma || source.name.toLowerCase() === 'ludicolo' && ability.name === 'Captivating Rhythm' ? `Flip coin · switch in ${target.name}` : bigWing ? `Opponent switches to ${target.name}` : opponentVstarSwitch ? `VSTAR: bring in ${target.name}` : opponentForcedSwitch ? 'Switch opponent Active to Bench' : opponentTarget ? `Bring in ${target.name}` : `Switch to ${target.name}`}{ironBundleSwitch ? ' · Discard this Pokémon' : ability.name.toLowerCase().includes('subjugating chains') ? ' · Poison' : ''} · {ability.name}
            </Button>
          ))}
          {usableActiveSwitchAbilities.some(({ source }) => source.name.toLowerCase() === 'regice') && (
            <select aria-label="Choose two cards to discard for Regi Move" multiple value={activeDrawDiscardCardIds} onChange={(event) => setDrawDiscardCardIds(Array.from(event.currentTarget.selectedOptions, (option) => option.value))} className="h-16 min-w-36 rounded-md border border-game-border-strong bg-game-surface-raised px-2 text-xs text-game-ink">
              {state.player.hand.map((card) => <option key={card.instanceId} value={card.instanceId}>{card.name}</option>)}
            </select>
          )}
          {usableActiveStatusAbilities.map(({ source, ability, abilityIndex, status, coinFlipStatus, headTrip, bothActiveSleep, ariadosPoison, victreebelConfusingPoison, hisuianTyphlosionHex, venusaurPureBody, transferSourceId, unownYRecovery, targetId, torridWave, drapionVstarVenomousVortex }) => (
            <Button
              key={`${source.instanceId}:${abilityIndex}:${status}:${transferSourceId || 'active'}`}
              type="button"
              variant="outline"
              disabled={isPending || Boolean(resolution)}
              onClick={() => onUseActiveStatusAbility(source.instanceId, abilityIndex, ability.name, status, torridWave || drapionVstarVenomousVortex || source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'drapionlvx' ? targetId : transferSourceId)}
              className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/15"
            >
              {venusaurPureBody ? `Clear Special Conditions from both Active Pokémon · ${ability.name}` : drapionVstarVenomousVortex ? `Paralyze & Poison ${state.opponent.front.find((card) => card.instanceId === targetId)?.name} · 30 damage · ${ability.name}` : torridWave ? `Burn ${state.opponent.front.find((card) => card.instanceId === targetId)?.name} · 30 damage · ${ability.name}` : source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'drapionlvx' ? `Flip to Poison ${state.opponent.front.find((card) => card.instanceId === targetId)?.name} · 30 damage · ${ability.name}` : ariadosPoison ? `Poison non-Grass Active Pokémon · ${ability.name}` : victreebelConfusingPoison ? `Discard Grass Energy · Confuse & Poison · ${ability.name}` : hisuianTyphlosionHex ? `Discard Psychic Energy · Burn & Confuse · ${ability.name}` : coinFlipStatus ? `Flip coin · ${status[0].toUpperCase() + status.slice(1)} · ${ability.name}` : unownYRecovery ? `Remove 1 counter & make ${transferSourceId ? state.player.front.find((card) => card.instanceId === transferSourceId)?.name : 'Active Unown'} Asleep · ${ability.name}` : transferSourceId ? `Transfer ${status} from Active · ${ability.name}` : bothActiveSleep ? `Both Active Pokémon Asleep · ${ability.name}` : `${status[0].toUpperCase() + status.slice(1)} ${headTrip ? 'own Active' : 'opponent Active'} · ${ability.name}`}
            </Button>
          ))}
          {usableBenchEntryAbilities.map(({ source, target, targets, ability, abilityIndex, effect, healAmount }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${targets?.map((item) => item.instanceId).join(':') || target?.instanceId || ''}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseBenchEntryAbility(source.instanceId, abilityIndex, ability.name, effect, targets?.map((item) => item.instanceId) || target?.instanceId)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/15">
              {effect === 'status' ? source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'espeon' ? 'Confuse both Active Pokémon' : 'Confuse & Poison both Active Pokémon' : effect === 'gloomHandBench' ? `Flip for ${target?.name} · Bench from opponent's hand` : effect === 'mandibuzzHandBench' ? `Bench ${target?.name} from opponent's hand · ${ability.name}` : effect === 'captivatingWink' ? 'Reveal hand · Bench Basic Pokémon' : effect === 'darkInvitation' ? `Bench ${target?.name} from opponent's hand · 3 damage counters` : effect === 'statusRecovery' && source.name.replace(/[^a-z0-9]/gi, '').toLowerCase() === 'vaporeon' ? 'Heal both Active Pokémon 30 · clear Special Conditions' : effect === 'heal' ? `Heal ${healAmount} Active` : effect === 'deckDiscard' ? "Discard opponent's top card" : effect === 'handShuffleDraw' ? 'Opponent shuffles hand and draws 6' : effect === 'dragonitePullUp' ? `Recover ${targets?.length || 0} Basic Pokémon to hand` : effect === 'rayquazaStormyWinds' ? `Discard 3 · Attach ${target?.name} to Energy pool` : effect === 'snorlaxLeftovers' || effect === 'darkraiVstarItems' ? `Recover ${targets?.map((item) => item.name).join(', ')} · ${ability.name}` : effect === 'spreadDamage' ? `Damage ${targets?.map((item) => item.name).join(' and ')}` : effect === 'opponentSwitch' ? `Opponent switches to ${target?.name}` : effect === 'damage' ? `Put a counter on ${target?.name}` : effect === 'asleep' ? `Make ${target?.name} Asleep` : effect === 'coinBurn' ? `Flip for Burn · ${target?.name}` : ability.name}
            </Button>
          ))}
          {usableUnownVanishAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseUnownVanish(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-violet/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-violet/15">
              Flip to return {target.name} to hand · {ability.name}
            </Button>
          ))}
          {usableUnownUndoAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseUnownUndo(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-violet/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-violet/15">
              Return Active {target.name} to hand · {ability.name}
            </Button>
          ))}
          {usableTentacoolCowardiceAbilities.map(({ source, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseTentacoolCowardice(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-violet/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-violet/15">
              Return {source.name} to hand · {ability.name}
            </Button>
          ))}
          {usableIgglybuffGazeAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}:${target.instanceId}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseIgglybuffGaze(source.instanceId, target.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-violet/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-violet/15">
              {source.name.toLowerCase().replace(/[^a-z0-9]/g, '').startsWith('gardevoirex') ? `Put Imprison marker on ${target.name}` : `Stop ${target.name}'s Pokémon Power`} · {ability.name}
            </Button>
          ))}
          {usableElekidPlayfulPunchAbilities.map(({ source, target, ability, abilityIndex }) => (
            <Button key={`${source.instanceId}:${abilityIndex}`} type="button" variant="outline" disabled={isPending || Boolean(resolution)} onClick={() => onUseElekidPlayfulPunch(source.instanceId, abilityIndex, ability.name)} className="game-focus-ring h-9 rounded-md border border-game-danger/45 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-danger/15">
              Flip coin · 20 to {target.name} · {ability.name}
            </Button>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <LabeledCommandButton
          label="Switch"
          disabled={!canAct || !selectedAttacker || isPending || isTcgBattleRetreatBlockedByStatus(state.player, selectedAttacker, [state.player, state.opponent])}
          onClick={onRetreat}
        />
        <LabeledCommandButton
          label={atCap ? 'End Turn' : 'Charge'}
          disabled={!canAct || isPending}
          onClick={onCharge}
        >
          <span className="relative inline-flex items-center justify-center">
            <EnergyIcon type="Colorless" className="h-[18px] w-[18px]" />
            {!atCap && (
              <span className="absolute -right-5 -top-3 rounded border border-game-charcoal bg-game-charcoal px-1 py-[1px] text-[10px] font-black leading-none text-white">
                +{displayedChargeGain}
              </span>
            )}
          </span>
        </LabeledCommandButton>
      </div>
      <section aria-label={`Your hand, ${state.player.hand.length} cards`} className="w-full rounded-xl border border-game-border-strong bg-game-surface-raised/95 px-2 py-2 shadow-lg sm:px-3">
        <div className="mb-1.5 flex items-center justify-between px-1">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-game-muted">Your hand <span className="ml-1 text-game-ink">{state.player.hand.length}</span></p>
          {selectedEvolutionCardId && <p className="text-[10px] font-bold text-game-moss">Choose a Pokémon to evolve above</p>}
        </div>
        <div className="flex max-w-full snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {state.player.hand.map((card) => {
            const isBasic = basicHand.some((item) => item.instanceId === card.instanceId)
            const evolution = evolutionOptions.some((option) => option.card.id === card.id)
            const selected = selectedEvolutionCardId === card.id
            const isEmergencyRotation = emergencyRotationHand.some((item) => item.instanceId === card.instanceId)
            const isLastCardBenchPlay = lastCardBenchDrawHand.some((item) => item.instanceId === card.instanceId)
            const playable = (isBasic && canPlaceBasic) || isEmergencyRotation || isLastCardBenchPlay
            const playLabel = isEmergencyRotation ? 'Emergency Rotation' : isLastCardBenchPlay ? 'Bench · Draw 3' : `Play · ${basicPlayDestination}`
            const playDescription = isEmergencyRotation ? 'play onto the Bench with Emergency Rotation' : isLastCardBenchPlay ? 'play onto the Bench and draw three cards' : `play to ${basicPlayDestination}`
            return <button key={card.instanceId} type="button" disabled={!canAct || isPending || (!playable && !evolution)} onClick={() => playable ? onPlayBasicToBench(card.instanceId) : evolution ? onOpenEvolution(card.id) : undefined} aria-pressed={selected} aria-label={`${card.name}${playable ? `, ${playDescription}` : evolution ? ', select to evolve' : ''}`} className={`game-focus-ring group relative w-[76px] shrink-0 snap-start overflow-hidden rounded-lg border-2 text-left transition ${selected ? 'border-game-moss ring-2 ring-game-moss/30' : 'border-game-border hover:border-game-ochre'} ${!canAct || (!playable && !evolution) ? 'opacity-65' : ''}`}>
              <Image src={card.image} alt={card.name} width={76} height={106} className="h-[106px] w-[76px] object-cover" unoptimized />
              <span className="block truncate bg-game-canvas px-1 py-1 text-center text-[9px] font-bold text-game-ink">{card.name}</span>
              {(playable || evolution) && <span className="absolute left-1 right-1 top-1 rounded bg-game-charcoal/90 px-1 py-0.5 text-center text-[8px] font-black uppercase tracking-wide text-white">{playable ? playLabel : 'Evolve'}</span>}
            </button>
          })}
          {state.player.hand.length === 0 && <p className="px-2 py-4 text-xs text-game-muted">Your hand is empty.</p>}
        </div>
      </section>
    </div>
  )
}

function LabeledCommandButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
  children?: ReactNode
}) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'game-focus-ring h-11 rounded-md border border-game-border bg-game-surface-raised px-4 text-game-ink shadow-sm transition-colors hover:border-game-moss/55 hover:bg-game-moss/10',
        'inline-flex items-center gap-2',
        disabled && 'opacity-35',
      )}
    >
      {children && <span className="shrink-0">{children}</span>}
      <span className="text-[11px] font-light uppercase tracking-[0.14em]">
        {label}
      </span>
    </Button>
  )
}

function CardPreviewOverlay({ card }: { card: TcgBattleCardState }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-game-canvas/85 p-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
    >
      <motion.div
        className="relative aspect-[240/330] h-[min(72dvh,34rem)] overflow-hidden rounded-xl shadow-[0_10px_24px_rgba(24,35,39,0.2)]"
        initial={{ scale: 0.88, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 12 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="min(72dvh, 34rem)"
          className="object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  )
}

function CoinFlipOverlay({ cue }: { cue: CoinCue }) {
  return (
    <motion.div
      key={cue.id}
      className="pointer-events-none fixed inset-0 z-[65] flex items-center justify-center px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
    >
      <div className="absolute inset-0 bg-game-surface-raised/80 backdrop-blur-[1px]" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          {cue.results.slice(0, 6).map((result, index) => {
            const src =
              result === 'heads'
                ? '/images/coin-front.avif'
                : '/images/coin-back.avif'
            return (
              <motion.div
                key={`${cue.id}:${index}`}
                className="relative h-20 w-20 sm:h-24 sm:w-24"
                style={{ perspective: 900 }}
                initial={{ y: 34, scale: 0.72, rotateY: 0, opacity: 0 }}
                animate={{
                  y: [34, -38, 0],
                  scale: [0.72, 1.12, 1],
                  rotateY: [0, 540, 1080],
                  opacity: [0, 1, 1],
                }}
                exit={{ y: -10, scale: 0.92, opacity: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.78,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Image
                  src={src}
                  alt={result === 'heads' ? 'Coin heads' : 'Coin tails'}
                  fill
                  sizes="96px"
                  className="object-contain drop-shadow-[0_8px_18px_rgba(24,35,39,0.22)]"
                  priority
                />
              </motion.div>
            )
          })}
          {cue.results.length > 6 && (
            <div className="flex h-20 min-w-20 items-center justify-center rounded-md border border-game-border bg-game-surface-raised px-3 font-mono text-sm font-bold text-game-ink sm:h-24">
              +{cue.results.length - 6}
            </div>
          )}
        </div>
        <motion.div
          className={cn(
            'rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] shadow-md',
            cue.side === 'player'
              ? 'border-game-charcoal/35 bg-game-surface-raised text-game-ink'
              : 'border-game-clay/40 bg-game-surface-raised text-game-ink',
          )}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ delay: 0.42, duration: 0.16 }}
        >
          {formatCoinSummary(cue)}
        </motion.div>
      </div>
    </motion.div>
  )
}

function BattleHeader({
  state,
  title,
  subtitle,
}: {
  state: TcgBattleState
  title: string
  subtitle?: string
}) {
  const phaseLabel =
    state.phase === 'finished'
      ? getWinnerLabel(state.winner)
      : state.pendingPromotion === 'player'
        ? 'Promotion'
        : state.activeSide === 'player'
          ? 'Your turn'
          : 'Opponent turn'

  return (
    <header className="relative overflow-hidden rounded-md border border-game-border bg-game-surface-raised px-3 py-2 shadow-sm">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-game-ochre" />
            <h1 className="truncate text-sm font-black uppercase text-game-ink sm:text-base">
              {title}
            </h1>
          </div>
          <div className="mt-1 flex min-w-0 items-center gap-2 text-[11px] text-game-muted">
            <span className="truncate">
              {subtitle || `Turn ${state.turnNumber} / ${phaseLabel}`}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[auto_auto] gap-1.5">
          <SideScorePill
            label="You"
            side={state.player}
            energy={state.player.energy}
            tone="player"
          />
          <SideScorePill
            label="Foe"
            side={state.opponent}
            energy={state.opponent.energy}
            tone="opponent"
          />
        </div>
      </div>
    </header>
  )
}

function SideScorePill({
  label,
  side,
  energy,
  tone,
}: {
  label: string
  side: TcgBattleState['player']
  energy: number
  tone: SideTone
}) {
  const living = getLivingCards(side).length

  return (
    <div
      className={cn(
        'min-w-[4.7rem] rounded-md border px-2 py-1',
        tone === 'player'
          ? 'border-game-charcoal/30 bg-game-charcoal/10'
          : 'border-game-clay/30 bg-game-clay/10',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
          {label}
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-game-ink">
          <span className="text-[9px] uppercase tracking-wide">Energy</span>
          {energy}
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] font-bold text-game-muted">
        <span>{side.front.length} front</span>
        <span>{living} live</span>
        <span className={cn((side.knockoutCount || 0) >= 5 && 'font-black text-game-clay')}>
          KO {side.knockoutCount || 0}/6
        </span>
      </div>
    </div>
  )
}

function SetupRevealSlot({
  card,
  index,
}: {
  card?: TcgBattleCardState
  index: number
}) {
  return (
    <motion.div
      className="tcg-motion relative aspect-[240/330] w-[clamp(5.8rem,25vw,14rem)] select-none sm:w-[clamp(8rem,18vw,15.5rem)]"
      style={{ perspective: 1500 }}
      initial={{
        opacity: 0,
        y: 24,
        rotateZ: index === 0 ? -4 : index === 2 ? 4 : 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateZ: index === 0 ? -2 : index === 2 ? 2 : 0,
      }}
      transition={{
        delay: index * 0.08,
        type: 'spring',
        stiffness: 180,
        damping: 20,
      }}
    >
      <motion.div
        className="relative h-full w-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: card ? 180 : 0 }}
        transition={{
          duration: 0.7,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-md border border-game-border bg-game-surface shadow-[0_8px_18px_rgba(24,35,39,0.18)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src="/images/tcg-back.avif"
            alt="Pokemon card back"
            fill
            sizes="(max-width: 640px) 30vw, 230px"
            className="object-cover"
            priority
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.16) 50%, transparent 62%)',
              backgroundSize: '220% 220%',
            }}
            animate={{ backgroundPosition: ['-120% -120%', '320% 320%'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-md border border-game-ochre/55 bg-game-surface-raised shadow-[0_8px_18px_rgba(24,35,39,0.2)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {card ? (
            <>
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="(max-width: 640px) 30vw, 230px"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_28%,rgba(255,255,255,0.18)_45%,transparent_62%)] opacity-40" />
            </>
          ) : (
            <div className="h-full w-full bg-game-surface" />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function SetupHandCard({
  card,
  selected,
  slotIndex,
  disabled,
  inactive,
  onClick,
}: {
  card: TcgBattleCardState
  selected: boolean
  slotIndex?: number
  disabled?: boolean
  inactive?: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      data-haptic-manual="true"
      layout
      className={cn(
        'tcg-motion group relative aspect-[240/330] w-[calc((100vw-4.5rem)/3.5)] max-w-[9rem] shrink-0 snap-center touch-manipulation overflow-hidden rounded-md border bg-game-surface-raised p-0 transition duration-200 active:scale-[0.97] sm:w-[clamp(7.5rem,15vw,9.5rem)]',
        selected
          ? 'border-game-ochre shadow-[0_0_0_3px_rgba(40,127,122,0.18)]'
          : 'border-game-border shadow-[0_6px_14px_rgba(24,35,39,0.16)] hover:border-game-ochre/55',
        inactive ? 'cursor-default opacity-35 saturate-50' : 'cursor-pointer',
        disabled && 'pointer-events-none opacity-50',
      )}
      aria-label={
        selected
          ? `Remove ${card.name} from active Pokemon`
          : `Choose ${card.name} as active Pokemon`
      }
      aria-pressed={selected}
      disabled={disabled || inactive}
      onClick={onClick}
      whileTap={{ scale: disabled || inactive ? 1 : 0.97 }}
    >
      <Image
        src={card.image}
        alt={card.name}
        fill
        sizes="(max-width: 640px) 28vw, 152px"
        className={cn(
          'object-cover transition duration-300',
          selected && 'opacity-[0.62] saturate-75',
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-game-charcoal/35 via-transparent to-game-surface/10" />
      {selected && slotIndex !== undefined && (
        <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-game-ochre text-[10px] font-black text-game-ink shadow-md">
          {slotIndex + 1}
        </div>
      )}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100',
          'bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.18)_48%,transparent_64%)]',
        )}
      />
    </motion.button>
  )
}

function BattleCardRow({
  cards,
  side,
  zone,
  turnNumber,
  selectedId,
  resolution,
  damageEvent,
  onCardTap,
  onPreviewStart,
  onPreviewEnd,
}: {
  cards: TcgBattleCardState[]
  side: SideTone
  zone: BoardZone
  turnNumber: number
  selectedId?: string
  resolution?: BattleResolution | null
  damageEvent?: DamageCue | TcgBattleState['lastDamageEvent']
  onCardTap: (card: TcgBattleCardState, zone: BoardZone) => void
  onPreviewStart: (card: TcgBattleCardState) => void
  onPreviewEnd: () => void
}) {
  return (
    <section className="relative w-full overflow-visible">
      <div className="relative z-10 grid grid-cols-3 place-items-center gap-2 sm:gap-5">
        {cards.map((card) => (
          <CardImageButton
            key={card.instanceId}
            card={card}
            turnNumber={turnNumber}
            selected={selectedId === card.instanceId}
            side={side}
            battleRole={
              resolution?.sourceId === card.instanceId
                ? 'attacker'
                : resolution?.damageCue?.targetId === card.instanceId
                  ? 'target'
                  : undefined
            }
            damage={
              damageEvent?.targetId === card.instanceId
                ? damageEvent.damage
                : undefined
            }
            damageKey={
              damageEvent?.targetId === card.instanceId
                ? damageEvent.id
                : undefined
            }
            onPreviewStart={() => onPreviewStart(card)}
            onPreviewEnd={onPreviewEnd}
            onClick={() => onCardTap(card, zone)}
          />
        ))}
        {Array.from({ length: Math.max(0, 3 - cards.length) }).map(
          (_, index) => (
            <EmptyCardSlot key={index} side={side} />
          ),
        )}
      </div>
    </section>
  )
}

function MiniHpReadout({
  attacker,
  target,
}: {
  attacker?: TcgBattleCardState
  target?: TcgBattleCardState
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <TinyHpPill label="ATK" card={attacker} tone="player" />
      <TinyHpPill label="TGT" card={target} tone="opponent" />
    </div>
  )
}

function CommandMatchup({
  attacker,
  target,
  active,
  bestDamage,
  attackCap,
}: {
  attacker?: TcgBattleCardState
  target?: TcgBattleCardState
  active: boolean
  bestDamage: number
  attackCap: number
}) {
  const canKnockOut = Boolean(target && bestDamage >= target.currentHp)

  return (
    <div className="grid min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2">
      <CombatantSummary
        card={attacker}
        tone="player"
        fallback="Choose attacker"
      />
      <div
        className={cn(
          'flex h-10 min-w-16 flex-col items-center justify-center border px-2 shadow-inner',
          active
            ? 'border-game-ochre/45 bg-game-ochre/10'
            : 'border-game-border bg-game-surface-raised',
        )}
      >
        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-game-ink">
          <span className={canKnockOut ? 'text-game-danger' : 'text-game-muted'}>
            {canKnockOut ? 'KO' : 'Damage'}
          </span>
          {bestDamage}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-game-muted">
          cap {formatAttackCap(attackCap)}
        </div>
      </div>
      <CombatantSummary
        card={target}
        tone="opponent"
        fallback="Choose target"
        align="right"
      />
    </div>
  )
}

function CombatantSummary({
  card,
  tone,
  fallback,
  align = 'left',
}: {
  card?: TcgBattleCardState
  tone: SideTone
  fallback: string
  align?: 'left' | 'right'
}) {
  const type = card?.types[0] || 'Colorless'

  return (
    <div
      className={cn(
        'grid min-w-0 grid-cols-[auto_1fr] items-center gap-2 border bg-game-surface-raised/80 p-1.5',
        tone === 'player' ? 'border-game-charcoal/35' : 'border-game-danger/35',
        align === 'right' && 'grid-cols-[1fr_auto]',
      )}
    >
      {align === 'left' && <CombatantThumb card={card} tone={tone} />}
      <div className={cn('min-w-0', align === 'right' && 'text-right')}>
        <div className="truncate text-[11px] font-black uppercase text-game-ink">
          {card?.name || fallback}
        </div>
        <div
          className={cn(
            'mt-1 flex items-center gap-1.5',
            align === 'right' && 'justify-end',
          )}
        >
          {card ? (
            <>
              <EnergyIcon type={type} className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold text-game-muted">
                {card.currentHp}/{card.hp} HP
              </span>
            </>
          ) : (
            <span className="text-[10px] font-bold text-game-muted">
              No card selected
            </span>
          )}
        </div>
      </div>
      {align === 'right' && <CombatantThumb card={card} tone={tone} />}
    </div>
  )
}

function CombatantThumb({
  card,
  tone,
}: {
  card?: TcgBattleCardState
  tone: SideTone
}) {
  return (
    <div
      className={cn(
        'relative h-9 w-7 shrink-0 overflow-hidden border bg-game-surface-raised',
        tone === 'player' ? 'border-game-charcoal/40' : 'border-game-danger/40',
      )}
    >
      {card ? (
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="28px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="px-0.5 text-[8px] font-bold uppercase text-game-muted">
            Empty
          </span>
        </div>
      )}
    </div>
  )
}

function AttackCommandButton({
  attack,
  cost,
  projectedDamage,
  disabledReason,
  disabled,
  onClick,
}: {
  attack: TcgAttack
  cost: number
  projectedDamage: number
  disabledReason: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      className={cn(
        'group relative h-12 overflow-hidden border border-game-moss/35 bg-game-surface-raised/80 px-2 text-left text-game-ink hover:bg-game-moss/20',
        disabled &&
          'border-game-border/40 bg-game-surface-raised/55 text-game-muted',
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="min-w-0">
          <span className="block truncate text-xs font-black">
            {attack.name}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-game-muted">
            {disabledReason ? (
              disabledReason
            ) : (
              <>
                {projectedDamage} damage
              </>
            )}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-0.5 text-xs font-black">
          <EnergyCost cost={cost} types={attack.cost} />
          <span className="text-[10px] text-game-muted">
            {attack.damage}
          </span>
        </span>
      </span>
    </Button>
  )
}

function TinyHpPill({
  label,
  card,
  tone,
}: {
  label: string
  card?: TcgBattleCardState
  tone: SideTone
}) {
  return (
    <div
      className={cn(
        'border bg-game-surface-raised/80 px-2 py-1',
        tone === 'player' ? 'border-game-charcoal/35' : 'border-game-danger/35',
      )}
    >
      <div className="flex items-center justify-between gap-1 text-[10px] font-black uppercase tracking-[0.06em] text-game-muted">
        <span>{label}</span>
        <span>{card ? `${card.currentHp}/${card.hp}` : '-'}</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden bg-game-border/60">
        <div
          className={cn('h-full transition-all', getHpTone(card))}
          style={{ width: `${getHpPercent(card)}%` }}
        />
      </div>
    </div>
  )
}

function BenchBar({
  state,
  playerBenchCount,
  opponentBenchCount,
  onOpenBench,
}: {
  state: TcgBattleState
  playerBenchCount: number
  opponentBenchCount: number
  onOpenBench: () => void
}) {
  const turnLabel =
    state.phase === 'finished'
      ? getWinnerLabel(state.winner)
      : state.pendingPromotion === 'player'
        ? 'Promote'
        : state.activeSide === 'player'
          ? 'Your turn'
          : 'Foe turn'

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5">
      <div className="flex items-center justify-center gap-2 border border-game-clay/20 bg-game-surface-raised/80 py-2 text-xs text-game-muted">
        Foe bench {opponentBenchCount}
      </div>
      <div className="flex min-w-20 items-center justify-center border border-game-ochre/30 bg-game-ochre/10 px-2 py-2 text-xs font-black uppercase text-game-ink">
        {turnLabel}
      </div>
      <button
        type="button"
        className="game-focus-ring flex items-center justify-center gap-2 border border-game-charcoal/35 bg-game-charcoal/20 py-2 text-xs font-black uppercase text-game-ink transition-colors hover:bg-game-charcoal/35"
        onClick={onOpenBench}
      >
        Bench {playerBenchCount}
      </button>
    </div>
  )
}

function BenchSheet({
  mode,
  state,
  attacker,
  isPending,
  onClose,
  onPromote,
  onRetreat,
}: {
  mode: BenchMode
  state: TcgBattleState
  attacker?: TcgBattleCardState
  isPending: boolean
  onClose: () => void
  onPromote: (cardId: string) => void
  onRetreat: (cardId: string) => void
}) {
  const isPromotion = mode === 'promote'
  const isRetreat = mode === 'retreat'
  const title = isPromotion
    ? 'Promote from Bench'
    : isRetreat
      ? 'Choose Replacement'
      : 'Your Bench'
  const description = isPromotion
    ? 'Fill the open front slot.'
    : isRetreat
      ? attacker?.temporaryEffects?.cannotRetreat
        ? `${attacker.name} cannot retreat this turn.`
        : `${attacker?.name || 'Selected card'} retreat cost ${attacker ? getTcgBattleAbilityRetreatCost(state.player, attacker, state.opponent, state.turnNumber) : 0}.`
      : `${state.player.back.length} ready / ${state.player.discard.length} discarded.`
  const icon = isPromotion ? (
    <span className="text-xs font-bold uppercase tracking-wide">Promote</span>
  ) : isRetreat ? (
    <span className="text-xs font-bold uppercase tracking-wide">Switch</span>
  ) : (
    <span className="text-xs font-bold uppercase tracking-wide">Bench</span>
  )

  return (
    <ResponsivePanel
      open
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
      title={title}
      description={description}
      icon={icon}
      background="/backgrounds/tcg.avif"
      heroLabel="Card battle"
      className="bg-game-surface-raised text-game-ink"
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mx-auto grid max-w-5xl grid-cols-3 place-items-center gap-2">
          {state.player.back.length === 0 ? (
            <div
              className="col-span-3 flex h-32 w-full items-center justify-center rounded-md border border-dashed border-game-border bg-game-surface-raised text-sm font-bold text-game-muted"
              role="status"
              aria-live="polite"
            >
              No cards are waiting on the bench.
            </div>
          ) : (
            state.player.back.map((card) => (
              <CardImageButton
                key={card.instanceId}
                card={card}
                disabled={isPending || (isRetreat && (!attacker || Boolean(attacker.temporaryEffects?.cannotRetreat)))}
                onClick={() => {
                  if (isPromotion) onPromote(card.instanceId)
                  else if (isRetreat) onRetreat(card.instanceId)
                }}
              />
            ))
          )}
        </div>
      </div>
    </ResponsivePanel>
  )
}

function EvolutionSheet({
  options,
  discardPokemon,
  playerSide,
  opposingSide,
  opposingDiscardPokemon,
  opposingEnergy,
  opposingPokemon,
  opposingBenchPokemon,
  isPending,
  onClose,
  onEvolve,
}: {
  options: TcgBattleEvolutionOption[]
  discardPokemon: TcgBattleCardState[]
  playerSide: TcgBattleState['player']
  opposingSide: TcgBattleState['opponent']
  opposingDiscardPokemon: TcgBattleCardState[]
  opposingEnergy: number
  opposingPokemon: TcgBattleCardState[]
  opposingBenchPokemon: TcgBattleCardState[]
  isPending: boolean
  onClose: () => void
  onEvolve: (targetId: string, evolutionCardId: string, effectTargetId?: string | string[]) => void
}) {
  const [pendingChoice, setPendingChoice] = useState<{ targetId: string; evolutionCardId: string; effectTargetIds: string[] } | null>(null)
  const selectedOption = pendingChoice && options.find((option) => option.targetId === pendingChoice.targetId && option.card.id === pendingChoice.evolutionCardId)
  const brightLookEligible = (card: { name: string }, targetId: string) => card.name.toLowerCase() === 'luxray gl lv.x' && playerSide.front.some((target) => target.instanceId === targetId && target.name.toLowerCase() === 'luxray gl')
  const damageTargetCount = selectedOption ? getTcgBattleEvolutionDamageTargetCount(selectedOption.card) : 0
  const bladeStormEligible = Boolean(selectedOption && selectedOption.card.name.toLowerCase() === 'gallade e4 lv.x' && playerSide.front.some((card) => card.instanceId === selectedOption.targetId && card.name.toLowerCase() === 'gallade e4'))
  const damageEffect = selectedOption && (selectedOption.card.name.toLowerCase() !== 'gallade e4 lv.x' || bladeStormEligible) ? getTcgBattleEvolutionDamageEffect(selectedOption.card) : null
  const damageTargetOptions = damageEffect?.targetRule === 'pokemonExOrGx' ? opposingPokemon.filter((card) => card.currentHp > 0 && card.subtypes.some((subtype) => /(?:pokemon[- ]?)?(?:ex|gx)/i.test(subtype))) : opposingPokemon
  const coinHealingEffect = selectedOption ? getTcgBattleEvolutionCoinHealingEffect(selectedOption.card) : null
  const isMiloticHealingRipples = selectedOption?.card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'milotic' && selectedOption.card.abilities?.some((ability) => ability.name.toLowerCase() === 'healing ripples')
  const targetedHealTargets = playerSide.front.concat(playerSide.back).filter((card) => card.currentHp > 0 && card.currentHp < card.hp && (selectedOption?.card.name.toLowerCase().replace(/[^a-z0-9]/g, '') !== 'whimsicott' || playerSide.front.some((active) => active.instanceId === card.instanceId) && card.types.some((type) => type.toLowerCase() === 'grass')) && (!isMiloticHealingRipples || card.types.some((type) => type.toLowerCase() === 'water')))
  const opposingActivePokemon = opposingPokemon.filter((card) => !opposingBenchPokemon.some((benchCard) => benchCard.instanceId === card.instanceId) && card.currentHp > 0)
  const benchSearchCount = selectedOption ? getTcgBattleEvolutionBenchSearchCount(selectedOption.card) : 0
  const opponentDiscardBenchSearch = selectedOption ? hasTcgBattleEvolutionOpponentDiscardBenchSearch(selectedOption.card) : false
  const opponentDiscardBenchOptions = opposingDiscardPokemon.filter((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic') && canTcgBattlePutPokemonOnBench(opposingSide, card))
  const benchSearchShedinja = selectedOption ? hasTcgBattleEvolutionShedinjaSearch(selectedOption.card) : false
  const benchSearchNamedPokemon = selectedOption ? getTcgBattleEvolutionNamedBenchSearchNames(selectedOption.card) : []
  const benchSearchShedinjaHandDiscard = selectedOption ? hasTcgBattleEvolutionShedinjaHandDiscard(selectedOption.card) : false
  const benchSearchShedinjaDiscard = selectedOption ? hasTcgBattleEvolutionShedinjaDiscardSearch(selectedOption.card) : false
  const benchSearchOptions = benchSearchShedinjaHandDiscard
    ? [
        ...playerSide.hand.map((card) => ({ card, index: `hand:${card.instanceId}` })),
        ...playerSide.discard.map((card) => ({ card, index: `discard:${card.instanceId}` })),
      ].filter(({ card }) => card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'shedinja' && canTcgBattlePutPokemonOnBench(playerSide, card))
    : benchSearchShedinjaDiscard
    ? playerSide.discard.map((card) => ({ card, index: `discard:${card.instanceId}` })).filter(({ card }) => card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'shedinja' && canTcgBattlePutPokemonOnBench(playerSide, card))
    : playerSide.deck.map((card, index) => ({ card, index: String(index) })).filter(({ card }) => (benchSearchNamedPokemon.length ? benchSearchNamedPokemon.includes(card.name.toLowerCase().replace(/[^a-z0-9]/g, '')) : benchSearchShedinja ? card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'shedinja' : card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) && canTcgBattlePutPokemonOnBench(playerSide, card))
  const evolutionCardSearchOptions = playerSide.deck.map((card, index) => ({ card, index }))
  const discardRecoveryCount = selectedOption ? getTcgBattleEvolutionDiscardRecoveryCount(selectedOption.card) : 0
  const recoverablePokemon = discardPokemon.filter((card) => card.subtypes.some((subtype) => ['basic', 'stage 1', 'stage 2'].includes(subtype.toLowerCase())))
  const getEvolutionDeckDiscardCount = (card: Pick<TcgBattleCardState, 'abilities'>) => {
    const text = card.abilities?.map((ability) => ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim()) || []
    const existingKnockoutPower = text.some((abilityText) => /^once during your turn, when you play this pokemon from your hand to evolve 1 of your pokemon, you may use this ability\. you may also use this ability if this pokemon is in the active spot and is knocked out by damage from an attack from your opponent's pokemon\. discard the top 2 cards of your opponent's deck\.$/.test(abilityText))
    if (existingKnockoutPower) return 2
    return Number(text.map((abilityText) => abilityText.match(/^(?:once during your turn, )?when you play (?:this pokemon|[a-z0-9 .'-]+) from your hand to evolve 1 of your pokemon(?: during your turn)?, you may discard the top (\d+) cards (?:of|from) your opponent's deck\.$|^when you play this pokemon from your hand to evolve 1 of your pokemon during your turn, you must flip a coin\. if heads, discard the top (\d+) cards (?:of|from) your opponent's deck\. if tails, discard the top (\d+) cards (?:of|from) your deck\.$|^when you play this pokemon from your hand to evolve 1 of your pokemon during your turn, you must discard the top (\d+) cards of your deck\.$/)?.[1] || abilityText.match(/if heads, discard the top (\d+) cards (?:of|from) your opponent's deck\. if tails/)?.[1] || abilityText.match(/must discard the top (\d+) cards of your deck/)?.[1]).find(Boolean) || 0)
  }
  const hasDeckDiscardAbility = (card: Pick<TcgBattleCardState, 'abilities'>) => getEvolutionDeckDiscardCount(card) > 0
  const hasEvolutionRandomHandDiscardAbility = (card: Pick<TcgBattleCardState, 'abilities'>) => (card.abilities || []).some((ability) => ability.text.replace(/[’]/g, "'").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim() === "when you play this pokemon from your hand to evolve 1 of your pokemon during your turn, you may discard a random card from your opponent's hand. if this pokemon is your active pokemon and is knocked out by damage from an opponent's attack, you may discard a random card from your opponent's hand.")
  return (
    <ResponsivePanel
      open
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
      title="Evolve Pokémon"
      description="Choose a Pokémon and a matching evolution card from your hand. Evolving does not use your turn; only attacking or charging ends it. Some Pokémon use a once-per-turn Ability to evolve early or heal."
      icon={<span className="text-xs font-bold uppercase tracking-wide">Evolve</span>}
      background="/backgrounds/tcg.avif"
      heroLabel="Card battle"
      className="bg-game-surface-raised text-game-ink"
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          {selectedOption?.effect === 'azumarillFroth' ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Use Froth when Azumarill evolves from your hand? It Paralyzes each opposing Active Pokémon.</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'azumarillFroth')} className="justify-start game-focus-ring">Evolve & use Froth</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using Froth</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && discardRecoveryCount > 0 ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{selectedOption.card.name.toLowerCase() === 'milotic' ? 'Choose a Pokémon card from your discard pile to return to your hand.' : `Choose up to ${discardRecoveryCount} Pokémon from your discard pile to return to your hand.`}</p>
              {recoverablePokemon.map((card) => (
                <Button key={card.instanceId} type="button" variant="outline" disabled={isPending || (pendingChoice.effectTargetIds.length >= discardRecoveryCount && !pendingChoice.effectTargetIds.includes(card.instanceId))} onClick={() => setPendingChoice((current) => current ? { ...current, effectTargetIds: current.effectTargetIds.includes(card.instanceId) ? current.effectTargetIds.filter((id) => id !== card.instanceId) : [...current.effectTargetIds, card.instanceId] } : current)} className="justify-start game-focus-ring">{pendingChoice.effectTargetIds.includes(card.instanceId) ? 'Selected · ' : ''}{card.name}</Button>
              ))}
              {pendingChoice.effectTargetIds.length > 0 && <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, pendingChoice.effectTargetIds)} className="justify-start game-focus-ring">Evolve & return {pendingChoice.effectTargetIds.length} Pokémon</Button>}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && benchSearchCount > 0 && opponentDiscardBenchSearch ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Choose a Basic Pokémon from your opponent’s discard pile to put onto their Bench.</p>
              {opponentDiscardBenchOptions.map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, `redEyes:${card.instanceId}`)} className="justify-start game-focus-ring">Put {card.name} onto the opponent’s Bench</Button>)}
              {opponentDiscardBenchOptions.length === 0 && <p className="rounded-md bg-game-surface-raised p-3 text-sm text-game-ink">No Basic Pokémon can be added to the opponent’s Bench.</p>}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && benchSearchCount > 0 ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{benchSearchShedinjaHandDiscard ? 'Choose Shedinja from your hand or discard pile to put on your Bench as a Basic Pokémon.' : benchSearchShedinjaDiscard ? 'Choose Shedinja from your discard pile to put on your Bench.' : benchSearchShedinja ? 'Choose Shedinja from your deck to put on your Bench as a Basic Pokémon.' : `Choose up to ${Math.min(benchSearchCount, getOpenTcgBattleBenchSlots(playerSide))} Basic Pokémon from your deck to put on your Bench.`}</p>
              {benchSearchOptions.map(({ card, index }) => (
                <Button key={`${card.id}:${index}`} type="button" variant="outline" disabled={isPending || (!pendingChoice.effectTargetIds.includes(String(index)) && pendingChoice.effectTargetIds.length >= Math.min(benchSearchCount, getOpenTcgBattleBenchSlots(playerSide)))} onClick={() => setPendingChoice((current) => current ? { ...current, effectTargetIds: current.effectTargetIds.includes(String(index)) ? current.effectTargetIds.filter((id) => id !== String(index)) : [...current.effectTargetIds, String(index)] } : current)} className="justify-start game-focus-ring">{pendingChoice.effectTargetIds.includes(String(index)) ? 'Selected · ' : ''}{card.name} · {card.hp} HP</Button>
              ))}
              {pendingChoice.effectTargetIds.length > 0 && <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, pendingChoice.effectTargetIds)} className="justify-start game-focus-ring">Evolve & put {benchSearchShedinja ? 'Shedinja' : `${pendingChoice.effectTargetIds.length} Basic Pokémon`} on the Bench</Button>}
              {benchSearchOptions.length === 0 && <p className="rounded-md bg-game-surface-raised p-3 text-sm text-game-ink">{benchSearchShedinja ? 'No Shedinja can be added to your Bench right now.' : 'No Basic Pokémon can be added to your Bench right now.'}</p>}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasTcgBattleEvolutionMassHealEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{selectedOption.card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'garchompclvx' ? 'Use Healing Breath to heal all of your Pokémon SP?' : selectedOption.card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'dachsbunex' ? 'Heal all damage from your Evolution Pokémon? If any damage is healed, discard all Energy from the shared Energy pool.' : ['blissey', 'blisseyex'].includes(selectedOption.card.name.toLowerCase().replace(/[^a-z0-9]/g, '')) ? 'Heal all damage from your damaged Pokémon? This approximates attached Energy by discarding all Energy from the shared pool if any damage is healed.' : 'Use Healing Shower to heal all damage from every Pokémon except Pokémon-ex on both sides?'}</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'miloticHeal')} className="justify-start game-focus-ring">Evolve & use {selectedOption.card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'garchompclvx' ? 'Healing Breath' : ['dachsbunex', 'blissey', 'blisseyex'].includes(selectedOption.card.name.toLowerCase().replace(/[^a-z0-9]/g, '')) ? 'healing Ability' : 'Healing Shower'}</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionAttackBoost(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Use Ludicolo&apos;s Ability? Basic Pokémon&apos;s attacks do 100 more damage to the opponent&apos;s Active Pokémon this turn, before Weakness and Resistance.</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'evolutionAttackBoost')} className="justify-start game-focus-ring">Evolve & boost Basic Pokémon attacks</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && damageEffect ? (
            <>
              {damageEffect.allOpposing ? (
                <>
                  <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{damageEffect.coinSpreadCount ? `Flip ${damageEffect.coinSpreadCount} coins. For each heads, put 1 damage counter on each opposing Benched Pokémon.` : 'Put 1 damage counter on each of your opponent’s Pokémon.'}</p>
                  <Button type="button" variant="outline" disabled={isPending || opposingPokemon.length === 0} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, opposingPokemon.map((card) => card.instanceId))} className="justify-start game-focus-ring">Evolve & use {damageEffect.coinSpreadCount ? 'Dragon Pulse' : selectedOption.card.name.toLowerCase() === 'gallade e4 lv.x' ? 'Blade Storm' : 'Thorn Tempest'}</Button>
                </>
              ) : <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{damageEffect.activeAmount !== undefined && damageEffect.benchAmount !== undefined ? `Choose 1 opposing Active Pokémon to take ${damageEffect.activeAmount / 10} damage counters and 1 opposing Benched Pokémon to take ${damageEffect.benchAmount / 10} damage counters.` : `Choose ${damageTargetCount === 1 ? 'an opposing Pokémon' : `${damageTargetCount} opposing Pokémon`} to ${damageEffect.counters ? `take ${damageEffect.amount / 10} damage counter${damageEffect.amount === 10 ? '' : 's'}` : `take ${damageEffect.amount} damage`}${damageEffect.applyWeaknessResistance ? ' (applying Weakness and Resistance)' : ''}.`}</p>
              {damageTargetOptions.map((card) => (
                <Button key={card.instanceId} type="button" variant="outline" disabled={isPending || (damageTargetCount > 1 && pendingChoice.effectTargetIds.length >= damageTargetCount && !pendingChoice.effectTargetIds.includes(card.instanceId)) || (damageEffect.activeAmount !== undefined && damageEffect.benchAmount !== undefined && !pendingChoice.effectTargetIds.includes(card.instanceId) && pendingChoice.effectTargetIds.some((id) => opposingBenchPokemon.some((benchCard) => benchCard.instanceId === id) === opposingBenchPokemon.some((benchCard) => benchCard.instanceId === card.instanceId)))} onClick={() => damageTargetCount === 1 ? onEvolve(selectedOption.targetId, selectedOption.card.id, card.instanceId) : setPendingChoice((current) => current ? { ...current, effectTargetIds: current.effectTargetIds.includes(card.instanceId) ? current.effectTargetIds.filter((id) => id !== card.instanceId) : [...current.effectTargetIds, card.instanceId] } : current)} className="justify-start game-focus-ring">{pendingChoice.effectTargetIds.includes(card.instanceId) ? 'Selected · ' : ''}{damageEffect.activeAmount !== undefined && damageEffect.benchAmount !== undefined ? opposingBenchPokemon.some((benchCard) => benchCard.instanceId === card.instanceId) ? 'Bench · 3 counters · ' : 'Active · 2 counters · ' : ''}{card.name} · {card.currentHp}/{card.hp} HP</Button>
              ))}
              {damageTargetCount > 1 && <Button type="button" variant="outline" disabled={isPending || pendingChoice.effectTargetIds.length !== damageTargetCount} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, pendingChoice.effectTargetIds)} className="justify-start game-focus-ring">Evolve & use Ability</Button>}
              </>}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasEvolutionRandomHandDiscardAbility(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Use Arf Arf Bark to discard a random card from your opponent’s hand?</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'evolutionHandDiscard')} className="justify-start game-focus-ring">Evolve & use Arf Arf Bark</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasDeckDiscardAbility(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{selectedOption.card.name === 'Gyarados' ? `Discard the top ${getEvolutionDeckDiscardCount(selectedOption.card)} cards of your deck when Gyarados evolves.` : selectedOption.card.name === 'Feraligatr' ? 'Flip a coin. On heads discard the top 5 cards of the opponent’s deck; on tails discard the top 5 cards of your deck?' : `Use ${selectedOption.card.name === 'Rhyperior' ? 'Earth Fissure' : 'Sandy Flapping'} to discard the top ${getEvolutionDeckDiscardCount(selectedOption.card)} cards of your opponent’s deck?`}</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'deckDiscard')} className="justify-start game-focus-ring">{selectedOption.card.name === 'Gyarados' ? 'Evolve & discard the top cards' : selectedOption.card.name === 'Feraligatr' ? 'Evolve & flip for deck discard' : `Evolve & use ${selectedOption.card.name === 'Rhyperior' ? 'Earth Fissure' : 'Sandy Flapping'}`}</Button>
              {selectedOption.card.name !== 'Gyarados' && <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)}>Evolve without using the Ability</Button>}
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && coinHealingEffect ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Use Softboiled? Heads heals up to {coinHealingEffect.headsCounters * 10} damage; tails heals up to {coinHealingEffect.tailsCounters * 10} damage.</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'softboiled')} className="justify-start game-focus-ring">Evolve & use Softboiled</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasTcgBattleEvolutionTargetedFullHealEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{isMiloticHealingRipples ? 'Choose one of your damaged Water Pokémon. Heal 60 damage from it.' : selectedOption.card.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 'whimsicott' ? 'Choose your damaged Active Grass Pokémon. Heal all damage from it, then discard all Energy from the shared Energy pool.' : `Choose one of your damaged Pokémon to heal all damage from with ${selectedOption.card.abilities?.find((ability) => hasTcgBattleEvolutionTargetedFullHealEffect({ ...selectedOption.card, abilities: [ability] }))?.name || 'this Ability'}.`}</p>
              {targetedHealTargets.map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, `dragoniteHeal:${card.instanceId}`)} className="justify-start game-focus-ring">{card.name} · {card.currentHp}/{card.hp} HP</Button>)}
              {targetedHealTargets.length === 0 && <p className="rounded-md bg-game-surface-raised p-3 text-sm text-game-ink">No damaged Pokémon can be healed.</p>}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionShuffleEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Choose an opposing Pokémon. Flip a coin; on heads, shuffle it and its Evolution cards into its owner’s deck. Individual attached cards are not tracked.</p>
              {opposingPokemon.filter((card) => card.currentHp > 0).map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, `evolutionShuffle:${card.instanceId}`)} className="justify-start game-focus-ring">Choose {card.name} · {card.currentHp}/{card.hp} HP</Button>)}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionDiscardEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Flip 2 coins. If both are heads, discard the opposing Active Pokémon and its Evolution cards without counting it as a Knock Out. Individual attached cards are not tracked.</p>
              <Button type="button" variant="outline" disabled={isPending || opposingActivePokemon.length === 0} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'evolutionDiscard')}>Evolve & use {getTcgBattleEvolutionDiscardEffect(selectedOption.card)!.abilityName}</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)}>Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionDevolutionEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Use {getTcgBattleEvolutionDevolutionEffect(selectedOption.card)!.abilityName} to return the highest Evolution card from each opposing evolved Pokémon to its owner’s hand?</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'evolutionDevolution')} className="justify-start game-focus-ring">Evolve & use {getTcgBattleEvolutionDevolutionEffect(selectedOption.card)!.abilityName}</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionAttackProtectionEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Use {getTcgBattleEvolutionAttackProtectionEffect(selectedOption.card)!.abilityName} to prevent all effects, including damage, from your opponent’s attacks until the end of their next turn?</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'evolutionProtection')} className="justify-start game-focus-ring">Evolve & use {getTcgBattleEvolutionAttackProtectionEffect(selectedOption.card)!.abilityName}</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionStatusEffect(selectedOption.card) ? (
            (() => {
              const effect = getTcgBattleEvolutionStatusEffect(selectedOption.card)!
              const activeTargets = opposingPokemon.filter((card) => !opposingBenchPokemon.some((benchCard) => benchCard.instanceId === card.instanceId))
              return effect.chooseDefending ? <>
                <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Choose an opposing Active Pokémon to become Poisoned. Its Poison damage is increased to 20 during Pokémon Checkup.</p>
                {activeTargets.map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, `evolutionStatus:${card.instanceId}`)} className="justify-start game-focus-ring">Poison {card.name}</Button>)}
                <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)}>Evolve without using the Ability</Button>
                <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
              </> : <>
                <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{effect.coinFlip ? `Use ${effect.abilityName} to flip a coin. On heads, the opponent’s Active Pokémon becomes ${effect.statuses.join(' and ')}.` : `${effect.mandatory ? `${effect.abilityName} will make ` : `Use ${effect.abilityName} to make `}${effect.bothActive ? 'both Active Pokémon' : 'the opponent’s Active Pokémon'} ${effect.statuses.join(' and ')}${effect.mandatory ? ' when Beedrill evolves.' : '?'}`}</p>
                <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'evolutionStatus')} className="justify-start game-focus-ring">{effect.mandatory ? 'Evolve & apply the effect' : `Evolve & use ${effect.abilityName}`}</Button>
                {!effect.mandatory && <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)}>Evolve without using the Ability</Button>}
                <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
              </>
            })()
          ) : selectedOption && selectedOption.card.name.toLowerCase() === 'milotic' && selectedOption.card.abilities?.some((ability) => ability.text.replace(/[’]/g, "'").toLowerCase().replace(/\s+/g, ' ').includes('each player puts a basic pokemon from their discard pile onto their bench')) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Each player puts the highest HP legal Basic Pokémon from their discard pile onto their Bench. Your opponent goes first.</p>
              <Button type="button" variant="outline" disabled={isPending || !playerSide.discard.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic')) && !opposingSide.discard.some((card) => card.subtypes.some((subtype) => subtype.toLowerCase() === 'basic'))} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'miloticDiscardBench')} className="justify-start game-focus-ring">Evolve & use Recover</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && getTcgBattleEvolutionEnergyEffect(selectedOption.card) ? (
            (() => {
              const effect = getTcgBattleEvolutionEnergyEffect(selectedOption.card)!
              return <>
                <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{effect.coinFlipDiscard ? 'Flip a coin. On heads, discard 1 shared Energy from the opponent’s pool?' : effect.discardOpponentActive ? 'Discard 1 shared Energy from the opponent’s pool?' : effect.coinFlip ? `Flip a coin. On heads, add up to ${effect.count} Fire Energy to the shared Energy pool?` : `Add up to ${effect.count} ${{ g: 'Grass', r: 'Fire', w: 'Water', l: 'Lightning', p: 'Psychic', m: 'Fighting', d: 'Darkness', y: 'Metal', c: 'Colorless', f: 'Fairy', any: playerSide.selectedEnergy || 'selected type' }[effect.energyType]} Energy to the shared Energy pool?`}</p>
                <Button type="button" variant="outline" disabled={isPending || effect.energyType === 'any' && !playerSide.selectedEnergy || effect.discardOpponentActive && !effect.coinFlipDiscard && opposingEnergy < 1 || Boolean(effect.discardPile || effect.searchDeck || effect.topDeckCount) && playerSide.energy > 0 && Boolean(playerSide.selectedEnergy) && playerSide.selectedEnergy!.toLowerCase() !== ({ g: 'grass', r: 'fire', w: 'water', l: 'lightning', p: 'psychic', m: 'fighting', d: 'darkness', y: 'metal', c: 'colorless', f: 'fairy' } as Record<string, string>)[effect.energyType]} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'energy')} className="justify-start game-focus-ring">{effect.coinFlipDiscard ? 'Evolve & flip for opponent Energy discard' : effect.discardOpponentActive ? 'Evolve & discard 1 opponent Energy' : effect.coinFlip ? 'Evolve & flip for Fire Energy' : `Evolve & gain up to ${effect.count} ${effect.energyType === 'any' ? `${playerSide.selectedEnergy || ''} ` : ''}Energy`}</Button>
                <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
                <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
              </>
            })()
          ) : selectedOption && getTcgBattleEvolutionDrawCount(selectedOption.card) > 0 ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">{selectedOption.card.name.toLowerCase() === 'thievul' ? 'Shuffle both players’ hands to the bottoms of their decks; if either hand had cards, each player draws up to 4.' : selectedOption.card.name.toLowerCase() === 'alcremie' ? 'Each player draws 1 card.' : `Draw ${getTcgBattleEvolutionDrawCount(selectedOption.card)} cards with this evolution Ability?`}</p>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, 'draw')} className="justify-start game-focus-ring">{selectedOption.card.name.toLowerCase() === 'thievul' ? 'Evolve & use Fumbling Hands' : selectedOption.card.name.toLowerCase() === 'alcremie' ? 'Evolve & let each player draw 1' : `Evolve & draw ${getTcgBattleEvolutionDrawCount(selectedOption.card)}`}</Button>
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasTcgBattleEvolutionCardSearchEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Choose any card from your deck to add to your hand.</p>
              {evolutionCardSearchOptions.map(({ card, index }) => <Button key={`${card.id}:${index}`} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, `cardSearch:${index}`)} className="justify-start game-focus-ring">{card.name}{card.types.length ? ` · ${card.types.join('/')}` : ''}</Button>)}
              {evolutionCardSearchOptions.length === 0 && <p className="rounded-md bg-game-surface-raised p-3 text-sm text-game-ink">Your deck is empty.</p>}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasTcgBattleEvolutionSwitchEffect(selectedOption.card) && (selectedOption.card.name.toLowerCase() !== 'luxray gl lv.x' || brightLookEligible(selectedOption.card, selectedOption.targetId)) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Choose an opposing Benched Pokémon to switch into the Active Spot.</p>
              {opposingBenchPokemon.filter((card) => (!hasTcgBattleEvolutionOnlySwitchEffect(selectedOption.card) || Boolean(card.evolvesFrom)) && (getTcgBattleEvolutionSwitchMaxRemainingHp(selectedOption.card) === undefined || card.currentHp <= getTcgBattleEvolutionSwitchMaxRemainingHp(selectedOption.card)!) && (!hasTcgBattleEvolutionExSwitchEffect(selectedOption.card) || card.subtypes.some((subtype) => ['ex', 'pokemon-ex'].includes(subtype.toLowerCase())))).map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, card.instanceId)} className="justify-start game-focus-ring">{card.name} · {card.currentHp}/{card.hp} HP</Button>)}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasTcgBattleEvolutionReturnPokemonEffect(selectedOption.card) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Choose one of your Pokémon, except Corviknight, to return to your hand. Its Evolution cards return too; individual attached cards are not tracked.</p>
              {[...playerSide.front, ...playerSide.back].filter((card) => card.currentHp > 0 && card.instanceId !== selectedOption.targetId && !card.name.toLowerCase().startsWith('corviknight') && (!playerSide.front.some((active) => active.instanceId === card.instanceId) || playerSide.back.some((bench) => bench.currentHp > 0))).map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, card.instanceId)} className="justify-start game-focus-ring">Return {card.name} · {card.currentHp}/{card.hp} HP</Button>)}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using the Ability</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : selectedOption && hasTcgBattleEvolutionSelfSwitchEffect(selectedOption.card) && playerSide.back.some((card) => card.instanceId === selectedOption.targetId) ? (
            <>
              <p className="rounded-md bg-game-surface-raised p-3 text-sm font-bold text-game-ink">Switch Arcanine with one of your Active Pokémon? Individual attached Energy cards are not tracked, so no Energy moves.</p>
              {playerSide.front.filter((card) => card.currentHp > 0).map((card) => <Button key={card.instanceId} type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id, card.instanceId)} className="justify-start game-focus-ring">Switch with {card.name} · {card.currentHp}/{card.hp} HP</Button>)}
              <Button type="button" variant="outline" disabled={isPending} onClick={() => onEvolve(selectedOption.targetId, selectedOption.card.id)} className="justify-start game-focus-ring">Evolve without using Flame Dash</Button>
              <Button type="button" variant="ghost" onClick={() => setPendingChoice(null)}>Back</Button>
            </>
          ) : null}
          {selectedOption && (discardRecoveryCount > 0 || benchSearchCount > 0 || damageEffect || coinHealingEffect || hasTcgBattleEvolutionTargetedFullHealEffect(selectedOption.card) || getTcgBattleEvolutionDrawCount(selectedOption.card) > 0 || hasTcgBattleEvolutionCardSearchEffect(selectedOption.card) || hasTcgBattleEvolutionSwitchEffect(selectedOption.card) || hasTcgBattleEvolutionReturnPokemonEffect(selectedOption.card) || hasTcgBattleEvolutionSelfSwitchEffect(selectedOption.card) && playerSide.back.some((card) => card.instanceId === selectedOption.targetId)) ? null : options.length === 0 ? (
            <div
              className="flex min-h-28 items-center justify-center rounded-md border border-dashed border-game-border bg-game-surface-raised px-4 text-center text-sm font-bold text-game-muted"
              role="status"
            >
              No Pokémon can evolve right now.
            </div>
          ) : (
            options.map((option) => (
              <div
                key={`${option.targetId}:${option.card.id}`}
                className="flex items-center gap-3 rounded-md border border-game-border bg-game-canvas p-2.5"
              >
                <Image
                  src={option.card.image}
                  alt={option.card.name}
                  width={44}
                  height={60}
                  className="h-[60px] w-11 rounded-sm object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-black uppercase text-game-ink">
                    {option.targetName} → {option.card.name}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-game-muted">
                    {option.card.subtypes.join(' · ')}
                  </p>
                  {option.effect === 'meganiumStage2' && <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-game-ochre">Meganium · evolve a Basic directly</p>}
                  {option.effect === 'dittoPrismStage1' && <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-game-ochre">Ditto Prism · evolve into any Stage 1</p>}
                  {option.effect === 'phantumpDamageEvolve' && <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-game-ochre">Natural Cure · evolve now and take 2 damage counters</p>}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => option.effect === 'pichuHeal' || option.effect === 'eeveeHeal' || option.effect === 'babyHeal' ? onEvolve(option.targetId, option.card.id, option.effect) : getTcgBattleEvolutionAttackBoost(option.card) || getTcgBattleEvolutionDiscardRecoveryCount(option.card) > 0 || getTcgBattleEvolutionBenchSearchCount(option.card) > 0 || getTcgBattleEvolutionDamageEffect(option.card) || getTcgBattleEvolutionCoinHealingEffect(option.card) || getTcgBattleEvolutionEnergyEffect(option.card) || getTcgBattleEvolutionStatusEffect(option.card) || getTcgBattleEvolutionAttackProtectionEffect(option.card) || getTcgBattleEvolutionDevolutionEffect(option.card) || getTcgBattleEvolutionShuffleEffect(option.card) || getTcgBattleEvolutionDiscardEffect(option.card) || getTcgBattleEvolutionDrawCount(option.card) > 0 || hasTcgBattleEvolutionCardSearchEffect(option.card) || hasTcgBattleEvolutionSwitchEffect(option.card) && (option.card.name.toLowerCase() !== 'luxray gl lv.x' || brightLookEligible(option.card, option.targetId)) || hasTcgBattleEvolutionSelfSwitchEffect(option.card) && playerSide.back.some((card) => card.instanceId === option.targetId) || hasDeckDiscardAbility(option.card) || hasEvolutionRandomHandDiscardAbility(option.card) || hasTcgBattleEvolutionMassHealEffect(option.card) || hasTcgBattleEvolutionTargetedFullHealEffect(option.card) || option.effect === 'azumarillFroth' ? setPendingChoice({ targetId: option.targetId, evolutionCardId: option.card.id, effectTargetIds: [] }) : onEvolve(option.targetId, option.card.id)}
                  className="game-focus-ring min-h-10 shrink-0 rounded-md border border-game-moss/50 bg-game-surface-raised px-3 text-[10px] font-black uppercase tracking-wide text-game-ink hover:bg-game-moss/10"
                >
                  {option.effect === 'pichuHeal' || option.effect === 'eeveeHeal' || option.effect === 'babyHeal' ? 'Evolve & heal all damage' : option.effect === 'azumarillFroth' ? 'Evolve & choose Froth' : getTcgBattleEvolutionAttackBoost(option.card) ? 'Evolve & boost Basic attacks' : hasTcgBattleEvolutionMassHealEffect(option.card) ? 'Evolve & choose Healing Shower' : hasTcgBattleEvolutionTargetedFullHealEffect(option.card) ? 'Evolve & choose healing Ability' : getTcgBattleEvolutionDiscardRecoveryCount(option.card) > 0 || getTcgBattleEvolutionBenchSearchCount(option.card) > 0 ? 'Evolve & choose Pokémon' : hasEvolutionRandomHandDiscardAbility(option.card) ? 'Evolve & use Ability' : hasDeckDiscardAbility(option.card) ? 'Evolve & choose Ability' : getTcgBattleEvolutionCoinHealingEffect(option.card) ? 'Evolve & choose Ability' : getTcgBattleEvolutionEnergyEffect(option.card) ? 'Evolve & choose Energy effect' : getTcgBattleEvolutionStatusEffect(option.card) || getTcgBattleEvolutionAttackProtectionEffect(option.card) || getTcgBattleEvolutionDevolutionEffect(option.card) || getTcgBattleEvolutionShuffleEffect(option.card) || getTcgBattleEvolutionDiscardEffect(option.card) ? 'Evolve & choose Ability' : getTcgBattleEvolutionDamageEffect(option.card) || hasTcgBattleEvolutionCardSearchEffect(option.card) || hasTcgBattleEvolutionSwitchEffect(option.card) && (option.card.name.toLowerCase() !== 'luxray gl lv.x' || brightLookEligible(option.card, option.targetId)) || hasTcgBattleEvolutionSelfSwitchEffect(option.card) && playerSide.back.some((card) => card.instanceId === option.targetId) ? 'Evolve & choose' : getTcgBattleEvolutionDrawCount(option.card) > 0 ? 'Evolve & draw' : 'Evolve'}
                </Button>
              </div>
            ))
          )}
          <p className="px-1 pt-2 text-[11px] leading-relaxed text-game-muted">
            Damage counters stay on the Pokémon. Poison, sleep, and temporary effects clear when it evolves.
          </p>
        </div>
      </div>
    </ResponsivePanel>
  )
}

function CardImageButton({
  card,
  turnNumber,
  selected = false,
  muted = false,
  disabled = false,
  draggable = false,
  side = 'player',
  battleRole,
  damage,
  damageKey,
  onClick,
  onDropCard,
  onPreviewStart,
  onPreviewEnd,
}: {
  card: TcgBattleCardState
  turnNumber?: number
  selected?: boolean
  muted?: boolean
  disabled?: boolean
  draggable?: boolean
  side?: SideTone
  battleRole?: 'attacker' | 'target'
  damage?: number
  damageKey?: string
  onClick?: () => void
  onDropCard?: (sourceId: string) => void
  onPreviewStart?: () => void
  onPreviewEnd?: () => void
}) {
  const interactive = Boolean(onClick || draggable || onDropCard)
  const knockedOut = card.currentHp <= 0
  const damageTaken = Math.max(0, card.hp - card.currentHp)
  const statuses = card.statusConditions || []
  const unlockTurn = getTcgBattleCardUnlockTurnForCard(card)
  const lockedTurnsRemaining = turnNumber
    ? Math.max(0, unlockTurn - turnNumber)
    : 0
  const isLocked = lockedTurnsRemaining > 0
  const longPressTimerRef = useRef<number | null>(null)
  const suppressClickRef = useRef(false)

  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current !== null) {
      window.clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }, [])

  useEffect(() => clearLongPressTimer, [clearLongPressTimer])

  const finishPreviewPress = useCallback(() => {
    clearLongPressTimer()
    if (!suppressClickRef.current) return
    onPreviewEnd?.()
    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 90)
  }, [clearLongPressTimer, onPreviewEnd])

  return (
    <button
      type="button"
      className={cn(
        'tcg-motion group relative aspect-[240/330] w-[clamp(82px,27vw,150px)] touch-manipulation overflow-visible bg-transparent p-0 text-left transition duration-200 sm:w-[clamp(108px,14vw,190px)]',
        selected
          ? 'drop-shadow-[0_8px_16px_rgba(24,35,39,0.2)]'
          : 'drop-shadow-[0_6px_14px_rgba(24,35,39,0.16)]',
        battleRole === 'attacker' &&
          (side === 'player'
            ? 'animate-[tcg-player-lunge_520ms_ease-out]'
            : 'animate-[tcg-opponent-lunge_520ms_ease-out]'),
        battleRole === 'target' && 'animate-[tcg-card-hit_460ms_ease-out]',
        muted && 'opacity-[0.82]',
        disabled && 'opacity-50',
        interactive && !disabled
          ? 'cursor-pointer active:scale-[0.985]'
          : 'cursor-default',
      )}
      aria-label={card.name}
      draggable={draggable && !disabled}
      onPointerDown={() => {
        if (disabled || !onPreviewStart) return
        clearLongPressTimer()
        suppressClickRef.current = false
        longPressTimerRef.current = window.setTimeout(() => {
          suppressClickRef.current = true
          onPreviewStart()
        }, 390)
      }}
      onPointerUp={finishPreviewPress}
      onPointerCancel={finishPreviewPress}
      onPointerLeave={finishPreviewPress}
      onClick={(event) => {
        if (disabled) return
        if (suppressClickRef.current) {
          event.preventDefault()
          event.stopPropagation()
          suppressClickRef.current = false
          return
        }
        onClick?.()
      }}
      onDragStart={(event) =>
        event.dataTransfer.setData('text/plain', card.instanceId)
      }
      onDragOver={(event) => {
        if (onDropCard) event.preventDefault()
      }}
      onDrop={(event) => {
        if (!onDropCard) return
        event.preventDefault()
        const sourceId = event.dataTransfer.getData('text/plain')
        if (sourceId && sourceId !== card.instanceId) onDropCard(sourceId)
      }}
    >
      {selected && (
        <div
          className={cn(
            'pointer-events-none absolute -inset-2 z-20 rounded-xl border-2',
            side === 'player'
              ? 'border-game-ochre bg-game-ochre/[0.06]'
              : 'border-red-200 bg-red-300/[0.06]',
          )}
        />
      )}
      {isLocked && !knockedOut && (
        <div
          className={cn(
            'pointer-events-none absolute z-30 flex items-center gap-1 rounded-full border border-game-ochre/60 bg-game-surface-raised/95 px-2 py-1 text-[10px] font-black uppercase text-game-ink shadow-md backdrop-blur-sm',
            side === 'opponent' ? '-left-2 -top-2' : '-right-2 -top-2',
          )}
        >
          <span>Locked · T-{lockedTurnsRemaining}</span>
        </div>
      )}
      {damage !== undefined && damage > 0 && (
        <span
          key={damageKey}
          className="pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 animate-[tcg-hit_900ms_ease-out_forwards] rounded-full bg-red-500 px-2 py-1 text-sm font-black text-game-cream shadow-lg"
        >
          -{damage}
        </span>
      )}
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-md shadow-[0_6px_14px_rgba(24,35,39,0.18)]',
          side === 'opponent' && 'rotate-180',
        )}
      >
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(max-width: 640px) 30vw, 196px"
          className={cn(
            'select-none object-cover transition duration-300',
            knockedOut && 'grayscale opacity-45',
          )}
          priority={false}
        />
      </div>
      {damageTaken > 0 && (
        <div
          className={cn(
            'pointer-events-none absolute z-30 flex h-8 w-8 items-center justify-center rounded-full border border-red-100/70 bg-red-500 text-xs font-black text-game-cream shadow-[0_0_18px_rgba(239,68,68,0.55),0_8px_18px_rgba(0,0,0,0.45)] sm:h-9 sm:w-9 sm:text-sm',
            side === 'opponent'
              ? '-left-2 -top-2 rotate-180'
              : '-bottom-2 -right-2',
          )}
        >
          {damageTaken}
        </div>
      )}
      {statuses.length > 0 && (
        <div
          className={cn(
            'pointer-events-none absolute z-30 flex gap-1 rounded-full border border-game-border bg-game-surface-raised p-1 shadow-sm',
            side === 'opponent'
              ? '-bottom-2 -right-2 rotate-180'
              : '-left-2 -top-2',
          )}
        >
          {statuses.map((status) => (
            <span
              key={status}
              className="relative block h-5 w-5 sm:h-6 sm:w-6"
              title={status}
            >
              <Image
                src={STATUS_ICON_SRC[status]}
                alt={status}
                fill
                sizes="24px"
                className="object-contain drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]"
              />
            </span>
          ))}
        </div>
      )}
      {card.markers?.some((marker) => marker === 'lightningRod' || marker === 'shockWave') && (
        <div
          className={cn(
            'pointer-events-none absolute bottom-1 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-md border border-game-ochre/50 bg-game-surface-raised px-1.5 py-1 text-[8px] font-bold uppercase tracking-wide text-game-ink shadow-sm',
            side === 'opponent' && 'rotate-180',
          )}
          title={`${card.markers
            .filter((marker) => marker === 'lightningRod' || marker === 'shockWave')
            .map((marker) => marker === 'lightningRod' ? 'Lightning Rod' : 'Shock-wave')
            .join(', ')} marker`}
        >
          {card.markers.includes('lightningRod') && <span>Rod</span>}
          {card.markers.includes('shockWave') && <span>Shock</span>}
        </div>
      )}
    </button>
  )
}

function EmptyCardSlot({ side }: { side: SideTone }) {
  return (
    <div
      className={cn(
        'aspect-[240/330] w-[clamp(82px,27vw,150px)] opacity-0 sm:w-[clamp(108px,14vw,190px)]',
        side === 'player' ? 'bg-game-charcoal/0' : 'bg-game-clay/0',
      )}
    />
  )
}

function EnergyIcon({
  type,
  className = 'h-4 w-4',
}: {
  type?: string
  className?: string
}) {
  return (
    <Image
      src={getTcgEnergySymbol(type)}
      alt={type || 'Colorless'}
      width={24}
      height={24}
      unoptimized
      className={`${className} rounded-full ring-1 ring-game-border-strong`}
    />
  )
}

function EnergyCost({ cost, types }: { cost: number; types?: string[] }) {
  if (cost === 0)
    return <span className="text-[10px] text-game-muted">Free</span>
  const symbols = (
    types && types.length > 0
      ? types
      : Array.from({ length: cost }, () => 'Colorless')
  ).slice(0, 3)
  return (
    <span className="inline-flex items-center -space-x-1">
      {symbols.map((type, index) => (
        <EnergyIcon key={`${type}-${index}`} type={type} className="h-4 w-4" />
      ))}
      {cost > symbols.length && (
        <span className="ml-1 text-[10px]">+{cost - symbols.length}</span>
      )}
    </span>
  )
}
