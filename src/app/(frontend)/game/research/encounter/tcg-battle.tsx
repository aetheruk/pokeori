'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownUp,
  Check,
  ChevronsUp,
  CircleDot,
  Clock3,
  Crosshair,
  EyeOff,
  Layers,
  Lock,
  Shield,
  SkipForward,
  Skull,
  Sparkles,
  Swords,
  X,
  Zap,
} from 'lucide-react'
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
import { TrainerCard } from '@/components/game/battles/TrainerCard'
import { VSAnimation } from '@/components/game/battles/VSAnimation'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import type { TcgBattleGameConfig } from '@/data/games'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getTcgEnergySymbol } from '@/utilities/tcg/energy-symbols'
import type {
  TcgBattleCardState,
  TcgBattleState,
  TcgBattleStatusCondition,
} from '@/utilities/tcg/tcg-battle'
import {
  getEffectiveTcgBattleAttackCost,
  getTcgBattleCardUnlockTurnForCard,
  TCG_BATTLE_FORMATS,
} from '@/utilities/tcg/tcg-battle'
import type { ResearchCompletionResult } from '../actions'
import {
  arrangeTcgBattle,
  claimTcgBattleResult,
  startTcgBattle,
  tcgBattleAttack,
  tcgBattleCharge,
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
      completion?: ResearchCompletionResult
    }
  | { success: false; error: string }
type TcgAttack = TcgBattleCardState['attacks'][number]
type TcgDamageEvent = NonNullable<TcgBattleState['lastDamageEvents']>[number]
type TcgCoinFlipEvent = NonNullable<
  TcgBattleState['lastCoinFlipEvents']
>[number]
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
type ActionMeta =
  | {
      kind: 'attack'
      attackerId: string
      targetId: string
      attackIndex: number
    }
  | { kind: 'retreat'; frontId: string; backId: string }
  | { kind: 'charge' }
  | { kind: 'promote'; cardId: string }
  | { kind: 'arrange' }
  | { kind: 'claim' }

interface TcgBattleGameProps {
  encounter: TcgBattleGameConfig
}

const TYPE_BADGE_CLASSES: Record<string, string> = {
  Colorless: 'border-[#f7ecd6]/35 bg-[#f7ecd6]/10 text-[#f7ecd6]',
  Darkness: 'border-[#748083]/40 bg-[#172733]/80 text-[#f7ecd6]',
  Dragon: 'border-violet-300/40 bg-violet-500/15 text-violet-100',
  Fairy: 'border-pink-300/40 bg-pink-500/15 text-pink-100',
  Fighting: 'border-orange-300/45 bg-orange-600/15 text-orange-100',
  Fire: 'border-red-300/45 bg-red-600/15 text-red-100',
  Grass: 'border-emerald-300/40 bg-emerald-600/15 text-emerald-100',
  Lightning: 'border-yellow-200/50 bg-yellow-400/15 text-yellow-100',
  Metal: 'border-slate-300/40 bg-slate-400/15 text-slate-100',
  Psychic: 'border-fuchsia-300/40 bg-fuchsia-500/15 text-fuchsia-100',
  Water: 'border-sky-300/45 bg-sky-500/15 text-sky-100',
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
  finalSettle: 780,
} as const

function getAllowedAttackCost(turnNumber: number): number {
  if (turnNumber >= 10) return Number.POSITIVE_INFINITY
  if (turnNumber >= 7) return 4
  if (turnNumber >= 5) return 3
  if (turnNumber >= 3) return 2
  return 1
}

function getAttackCost(attack: TcgAttack, state?: TcgBattleState): number {
  if (state) return getEffectiveTcgBattleAttackCost(state, attack)
  return attack.convertedEnergyCost ?? attack.cost?.length ?? 0
}

function isCardUnlockedByTurn(
  card: TcgBattleCardState | undefined,
  turnNumber: number,
): boolean {
  if (!card) return false
  return turnNumber >= getTcgBattleCardUnlockTurnForCard(card)
}

function canPlayerTakeAnyAttack(state: TcgBattleState): boolean {
  const attackCap = getAllowedAttackCost(state.turnNumber)
  return state.player.front.some(
    (card) =>
      card.currentHp > 0 &&
      isCardUnlockedByTurn(card, state.turnNumber) &&
      card.attacks.some((attack) => {
        const cost = getAttackCost(attack, state)
        return cost <= attackCap && cost <= state.player.energy
      }),
  )
}

function parseAttackDamage(damage?: string): number {
  const normalized = (damage || '').trim()
  return /^\d+$/.test(normalized) ? Number.parseInt(normalized, 10) : 0
}

function normalizeAttackText(text?: string): string {
  return (text || '')
    .replace(/Pokémon/g, 'Pokemon')
    .replace(/pokémon/g, 'pokemon')
    .replace(/×/g, 'x')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeDamageText(damage?: string): string {
  return (damage || '').replace(/×/g, 'x').trim()
}

function parseAttackBaseDamage(damage?: string): number {
  const match = normalizeDamageText(damage).match(/^(\d+)/)
  return match ? Number.parseInt(match[1], 10) : 0
}

function parseSignedModifier(value: string): number {
  const match = value.match(/[+-]\d+/)
  return match ? Number.parseInt(match[0], 10) : 0
}

function countDamageCounters(card?: TcgBattleCardState): number {
  if (!card) return 0
  return Math.max(0, Math.floor((card.hp - card.currentHp) / 10))
}

function getSideCount(
  state: TcgBattleState | undefined,
  side: 'own' | 'opponent' | 'both',
  zone: 'bench' | 'play',
) {
  if (!state) return 0
  const ownCards =
    zone === 'bench'
      ? state.player.back
      : [...state.player.front, ...state.player.back]
  const opponentCards =
    zone === 'bench'
      ? state.opponent.back
      : [...state.opponent.front, ...state.opponent.back]
  const ownCount = ownCards.filter((card) => card.currentHp > 0).length
  const opponentCount = opponentCards.filter(
    (card) => card.currentHp > 0,
  ).length
  if (side === 'own') return ownCount
  if (side === 'opponent') return opponentCount
  return ownCount + opponentCount
}

function getProjectedRawDamage(
  attack: TcgAttack,
  attacker: TcgBattleCardState | undefined,
  target: TcgBattleCardState | undefined,
  state?: TcgBattleState,
): number {
  const damageText = normalizeDamageText(attack.damage)
  const text = normalizeAttackText(attack.text)
  const exactDamage = parseAttackDamage(damageText)
  if (/^\d+$/.test(damageText)) return exactDamage

  const baseDamage = parseAttackBaseDamage(damageText)
  const headsBonus = text.match(
    /flip a coin\. if heads, this attack does (\d+) more damage\b/,
  )
  if (headsBonus && damageText.endsWith('+'))
    return baseDamage + Number.parseInt(headsBonus[1], 10)

  const oldHeadsBonus = text.match(
    /flip a coin\. if heads, this attack does \d+ damage plus (\d+) more damage; if tails, this attack does \d+ damage/,
  )
  if (oldHeadsBonus && damageText.endsWith('+'))
    return baseDamage + Number.parseInt(oldHeadsBonus[1], 10)

  const headsBonusEach = text.match(
    /flip (\d+) coins\. this attack does (\d+) more damage for each heads\b/,
  )
  if (headsBonusEach && damageText.endsWith('+')) {
    return (
      baseDamage +
      Number.parseInt(headsBonusEach[1], 10) *
        Number.parseInt(headsBonusEach[2], 10)
    )
  }

  const headsMultiplier = text.match(
    /flip (\d+) coins\. this attack does (\d+) damage (?:for each heads|times the number of heads)\b/,
  )
  if (headsMultiplier && damageText.endsWith('x')) {
    return (
      Number.parseInt(headsMultiplier[1], 10) *
      Number.parseInt(headsMultiplier[2], 10)
    )
  }

  const ownBenchMore = text.match(
    /this attack does (\d+) more damage for each of your benched pokemon\b/,
  )
  if (ownBenchMore && damageText.endsWith('+')) {
    return (
      baseDamage +
      Number.parseInt(ownBenchMore[1], 10) * getSideCount(state, 'own', 'bench')
    )
  }

  const opponentBenchMore = text.match(
    /this attack does (\d+) more damage for each of your opponent's benched pokemon\b/,
  )
  if (opponentBenchMore && damageText.endsWith('+')) {
    return (
      baseDamage +
      Number.parseInt(opponentBenchMore[1], 10) *
        getSideCount(state, 'opponent', 'bench')
    )
  }

  const bothBenchMore = text.match(
    /this attack does (\d+) more damage for each benched pokemon \(both yours and your opponent's\)\b/,
  )
  if (bothBenchMore && damageText.endsWith('+')) {
    return (
      baseDamage +
      Number.parseInt(bothBenchMore[1], 10) *
        getSideCount(state, 'both', 'bench')
    )
  }

  const selfCounterMore = text.match(
    /this attack does (\d+) more damage for each damage counter on this pokemon\b/,
  )
  if (selfCounterMore && damageText.endsWith('+')) {
    return (
      baseDamage +
      Number.parseInt(selfCounterMore[1], 10) * countDamageCounters(attacker)
    )
  }

  const targetCounterMore = text.match(
    /this attack does (\d+) more damage for each damage counter on your opponent's active pokemon\b/,
  )
  if (targetCounterMore && damageText.endsWith('+')) {
    return (
      baseDamage +
      Number.parseInt(targetCounterMore[1], 10) * countDamageCounters(target)
    )
  }

  const countDamage =
    text.match(
      /this attack does (\d+) damage for each of your opponent's benched pokemon\b/,
    ) ||
    text.match(
      /does (\d+) damage times the number of your opponent's benched pokemon\b/,
    )
  if (
    countDamage &&
    (damageText.endsWith('x') || damageText === '?' || damageText === '')
  ) {
    return (
      Number.parseInt(countDamage[1], 10) *
      getSideCount(state, 'opponent', 'bench')
    )
  }

  const ownPlayDamage = text.match(
    /this attack does (\d+) damage for each of your pokemon in play\b/,
  )
  if (
    ownPlayDamage &&
    (damageText.endsWith('x') || damageText === '?' || damageText === '')
  ) {
    return (
      Number.parseInt(ownPlayDamage[1], 10) * getSideCount(state, 'own', 'play')
    )
  }

  const selfCounterDamage =
    text.match(
      /this attack does (\d+) damage for each damage counter on this pokemon\b/,
    ) ||
    text.match(
      /does (\d+) damage times the number of damage counters on this pokemon\b/,
    )
  if (
    selfCounterDamage &&
    (damageText.endsWith('x') || damageText === '?' || damageText === '')
  ) {
    return (
      Number.parseInt(selfCounterDamage[1], 10) * countDamageCounters(attacker)
    )
  }

  const targetCounterDamage = text.match(
    /this attack does (\d+) damage for each damage counter on your opponent's active pokemon\b/,
  )
  if (
    targetCounterDamage &&
    (damageText.endsWith('x') || damageText === '?' || damageText === '')
  ) {
    return (
      Number.parseInt(targetCounterDamage[1], 10) * countDamageCounters(target)
    )
  }

  return exactDamage
}

function getProjectedDamage(
  attacker: TcgBattleCardState | undefined,
  attack: TcgAttack,
  target: TcgBattleCardState | undefined,
  state?: TcgBattleState,
): number {
  let damage = getProjectedRawDamage(attack, attacker, target, state)
  const attackType = attacker?.types[0]
  if (!attackType || !target) return damage

  const weakness = target.weaknesses.find((entry) => entry.type === attackType)
  if (weakness) {
    if (weakness.value.includes('x2')) damage *= 2
    else damage += parseSignedModifier(weakness.value)
  }

  const resistance = target.resistances.find(
    (entry) => entry.type === attackType,
  )
  if (resistance)
    damage = Math.max(0, damage + parseSignedModifier(resistance.value))
  return damage
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

function getBestProjectedDamage(
  attacker?: TcgBattleCardState,
  target?: TcgBattleCardState,
  cap = Number.POSITIVE_INFINITY,
  state?: TcgBattleState,
) {
  if (!attacker || !target) return 0
  return Math.max(
    0,
    ...attacker.attacks
      .filter((attack) => getAttackCost(attack, state) <= cap)
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
    statusConditions: card.statusConditions
      ? [...card.statusConditions]
      : undefined,
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
  side.discard = [...side.discard, ...fainted]
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
    state.player.energy - (retreating.convertedRetreatCost ?? 1),
  )
}

function findDamageEvent(
  state: TcgBattleState,
  predicate: (event: TcgDamageEvent) => boolean,
) {
  return state.lastDamageEvents?.find(predicate)
}

function findCoinEvent(
  state: TcgBattleState,
  predicate: (event: TcgCoinFlipEvent) => boolean,
) {
  return state.lastCoinFlipEvents?.find(predicate)
}

function findStatusEvent(
  state: TcgBattleState,
  predicate: (event: TcgStatusEvent) => boolean,
) {
  return state.lastStatusEvents?.find(predicate)
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
    results: event.results,
    heads: event.heads,
    tails: event.tails,
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

function getWinnerMessage(winner?: TcgBattleState['winner']) {
  if (winner === 'player') return 'You won the TCG battle.'
  if (winner === 'opponent') return 'You lost the TCG battle.'
  if (winner === 'tie') return 'The TCG battle ended in a draw.'
  return undefined
}

export function TcgBattleGame({ encounter }: TcgBattleGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const router = useRouter()
  const [state, setState] = useState<TcgBattleState | null>(null)
  const [frontIds, setFrontIds] = useState<string[]>([])
  const [attackerId, setAttackerId] = useState('')
  const [targetId, setTargetId] = useState('')
  const [benchMode, setBenchMode] = useState<BenchMode | null>(null)
  const [previewCard, setPreviewCard] = useState<TcgBattleCardState | null>(
    null,
  )
  const [showOpeningVs, setShowOpeningVs] = useState(false)
  const [result, setResult] = useState<ResearchCompletionResult | null>(null)
  const [resolution, setResolution] = useState<BattleResolution | null>(null)
  const [isActionBusy, setIsActionBusy] = useState(false)
  const [attackCapPulse, setAttackCapPulse] = useState(false)
  const [showEvolutionEnergyBurst, setShowEvolutionEnergyBurst] =
    useState(false)
  const [showEnergyCardBurst, setShowEnergyCardBurst] = useState(false)
  const [isPending, startTransition] = useTransition()
  const timersRef = useRef<number[]>([])

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
    startTransition(async () => {
      const response = await startTcgBattle(encounter.id)
      if (!response.success) {
        toast.error(response.error)
        return
      }
      setState(response.state)
      setFrontIds(
        response.state.phase === 'arranging'
          ? []
          : response.state.player.front.map((card) => card.instanceId),
      )
    })
  }, [encounter.id])

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
  const attackCap = state ? getAllowedAttackCost(state.turnNumber) : 1
  const formatConfig = state ? TCG_BATTLE_FORMATS[state.format] : null
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
      const timer = window.setTimeout(() => setAttackCapPulse(false), 1100)
      prevAttackCapRef.current = attackCap
      return () => window.clearTimeout(timer)
    }
    prevAttackCapRef.current = attackCap
  }, [attackCap, state])

  useEffect(() => {
    if (!state) return
    const previousTurn = prevTurnRef.current
    if (previousTurn < 15 && state.turnNumber >= 15) {
      setShowEnergyCardBurst(true)
      const timer = window.setTimeout(() => setShowEnergyCardBurst(false), 2100)
      prevTurnRef.current = state.turnNumber
      return () => window.clearTimeout(timer)
    }
    if (
      state.turnNumber !== previousTurn &&
      isStageUnlockTurn(state.turnNumber)
    ) {
      setShowEvolutionEnergyBurst(true)
      const timer = window.setTimeout(
        () => setShowEvolutionEnergyBurst(false),
        1850,
      )
      prevTurnRef.current = state.turnNumber
      return () => window.clearTimeout(timer)
    }
    prevTurnRef.current = state.turnNumber
  }, [state])

  const commitActionResult = useCallback(
    (nextState: TcgBattleState, completion?: ResearchCompletionResult) => {
      setState(nextState)
      setResolution(null)
      setIsActionBusy(false)
      if (completion) setResult(completion)
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
      completion?: ResearchCompletionResult,
    ) => {
      clearResolutionTimers()

      if (meta.kind === 'arrange') {
        commitActionResult(nextState, completion)
        setShowOpeningVs(
          Boolean(nextState.playerTrainer && nextState.enemyTrainer),
        )
        return
      }

      if (meta.kind === 'claim' || meta.kind === 'promote') {
        if (meta.kind === 'promote') playSfx('select')
        commitActionResult(nextState, completion)
        return
      }

      let cursor = 0
      const plannedState = cloneTcgBattleState(previousState)
      const visualState = cloneTcgBattleState(previousState)
      clearVisualActionEvents(plannedState)
      clearVisualActionEvents(visualState)
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
          RESOLUTION_TIMING.boardUpdate,
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
      const planOpponentSettle = () => {
        const fainted = compactVisualBattleBoard(plannedState.opponent)
        const promoted = promoteOpponentVisualFront(plannedState)
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
      const playerStatusEvent =
        meta.kind === 'attack'
          ? findStatusEvent(
              nextState,
              (event) => event.sourceId === meta.attackerId,
            )
          : undefined
      const opponentDamageEvent = findDamageEvent(
        nextState,
        (event) =>
          event.reason !== 'status' &&
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
      const opponentStatusEvent = findStatusEvent(
        nextState,
        (event) => event.targetSide === 'player',
      )
      const endOfRoundStatusDamageEvents =
        nextState.lastDamageEvents?.filter(
          (event) => event.reason === 'status',
        ) || []
      const opponentCoinCue = makeCoinCue(
        findCoinEvent(nextState, (event) => event.side === 'opponent'),
      )

      if (meta.kind === 'attack') {
        const attacker = findSideCard(previousState.player, meta.attackerId)
        const target = findSideCard(previousState.opponent, meta.targetId)
        const attack = attacker?.attacks[meta.attackIndex]
        const playerCoinCue = makeCoinCue(
          findCoinEvent(
            nextState,
            (event) =>
              event.sourceId === meta.attackerId && event.side === 'player',
          ),
        )
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
            title: playerCoinCue ? 'Coin Flip' : attack?.name || 'Attack',
            detail: playerCoinCue
              ? formatCoinSummary(playerCoinCue)
              : target
                ? `${attacker?.name || 'Your card'} targets ${target.name}`
                : 'Your card attacks',
            sourceId: attacker?.instanceId,
            coinCue: playerCoinCue,
          },
          'good',
        )

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

        queueStatusResolution(playerStatusEvent)
        queueOpponentSettle(planOpponentSettle())
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

      const skipOpponentStep =
        nextState.pendingPromotion === 'player' &&
        !opponentCoinCue &&
        !opponentDamageEvent &&
        !opponentRecoilEvent &&
        !opponentConfusionEvent &&
        !opponentStatusEvent &&
        endOfRoundStatusDamageEvents.length === 0
      const opponentAttacker = opponentDamageEvent
        ? findSideCard(plannedState.opponent, opponentDamageEvent.sourceId)
        : opponentCoinCue
          ? findSideCard(plannedState.opponent, opponentCoinCue.sourceId)
          : opponentRecoilEvent
            ? findSideCard(plannedState.opponent, opponentRecoilEvent.sourceId)
            : opponentConfusionEvent
              ? findSideCard(
                  plannedState.opponent,
                  opponentConfusionEvent.sourceId,
                )
              : undefined
      const playerTarget = opponentDamageEvent
        ? findSideCard(plannedState.player, opponentDamageEvent.targetId)
        : undefined

      if (!skipOpponentStep) {
        if (opponentCoinCue) {
          queueResolution(
            RESOLUTION_TIMING.betweenActions,
            {
              id: makeResolutionId('opponent-flip'),
              tone: 'opponent',
              title: 'Opponent Flip',
              detail: formatCoinSummary(opponentCoinCue),
              sourceId: opponentAttacker?.instanceId,
              coinCue: opponentCoinCue,
            },
            'bad',
            () =>
              publishVisualState((draft) => {
                draft.activeSide = 'opponent'
              }),
          )

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
            (draft) => {
              draft.activeSide = 'opponent'
            },
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
            () =>
              publishVisualState((draft) => {
                draft.activeSide = 'opponent'
              }),
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

        queueStatusResolution(opponentStatusEvent)
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
      const attack = attacker?.attacks[meta.attackIndex]
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
    setIsActionBusy(true)
    primeActionResolution(previousState, meta)
    startTransition(async () => {
      const response = await action()
      if (!response.success) {
        setIsActionBusy(false)
        setResolution(null)
        toast.error(response.error)
        return
      }
      setBenchMode(null)
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
    })
  }

  const handleSetupSelect = (cardId: string) => {
    if (isBusy) return
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

  const returnToExplore = () => router.push('/game/explore')
  const resultOverlay = useMemo(() => {
    if (!result) return null
    if (state?.phase !== 'finished') return result

    return {
      ...result,
      success: result.success && state.winner === 'player',
      message: getWinnerMessage(state.winner),
    }
  }, [result, state?.phase, state?.winner])

  if (!state) {
    return (
      <div className="game-activity-chrome relative grid h-[100dvh] place-items-center overflow-hidden bg-game-canvas p-6 text-game-ink">
        <ArenaBackdrop />
        <div className="relative z-10 flex items-center gap-3 rounded-lg border border-[#f7ecd6]/15 bg-[#172733]/80 px-4 py-3 shadow-2xl backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-amber-200" />
          <div className="text-xs font-black uppercase text-[#f7ecd6]">
            Loading TCG battle
          </div>
        </div>
      </div>
    )
  }

  if (state.phase === 'arranging') {
    const front = orderCardsByIds(state.player.hand, frontIds)
    const selectedSetupIds = new Set(frontIds)
    const benchIds = state.player.hand
      .filter((card) => !selectedSetupIds.has(card.instanceId))
      .map((card) => card.instanceId)
    const readyToStart = frontIds.length === 3 && benchIds.length === 3

    return (
      <div className="game-activity-chrome relative h-[100dvh] overflow-hidden bg-game-canvas text-game-ink">
        <ArenaBackdrop />
        <main className="relative z-10 flex h-full flex-col">
          <header className="shrink-0 px-4 pt-[calc(env(safe-area-inset-top)+1.8rem)] text-center sm:pt-[calc(env(safe-area-inset-top)+2.6rem)]">
            <SectionDivider className="mx-auto mb-2 max-w-xs sm:max-w-sm">
              Choose
            </SectionDivider>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-game-ochre sm:text-5xl">
              Active Pokemon
            </h1>
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
                    className="h-12 rounded-lg bg-game-clay px-8 text-xs font-black uppercase tracking-[0.18em] text-game-cream shadow-md hover:bg-game-clay/90"
                    disabled={isBusy}
                    onClick={() =>
                      callAction(() => arrangeTcgBattle(frontIds, benchIds), {
                        kind: 'arrange',
                      })
                    }
                  >
                    <Check className="h-4 w-4" />
                    Start Battle
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <footer className="shrink-0 bg-[linear-gradient(to_top,rgba(8,16,20,1),rgba(8,16,20,0.86),transparent)] pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-5">
            <div className="mx-auto flex max-w-5xl snap-x snap-mandatory justify-start gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:gap-4 sm:px-10 [&::-webkit-scrollbar]:hidden">
              {state.player.hand.map((card) => {
                const slotIndex = frontIds.indexOf(card.instanceId)
                const selected = slotIndex >= 0
                return (
                  <SetupHandCard
                    key={card.instanceId}
                    card={card}
                    selected={selected}
                    slotIndex={selected ? slotIndex : undefined}
                    disabled={isBusy}
                    inactive={!selected && frontIds.length >= 3}
                    onClick={() => handleSetupSelect(card.instanceId)}
                  />
                )
              })}
            </div>
          </footer>
        </main>
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
        />

        <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 pb-16 pt-2 sm:gap-4 sm:pb-20">
          <TeamEnergyReadout
            energy={state.opponent.energy}
            cap={formatConfig?.energyCap || 0}
            benchCount={state.opponent.back.length}
            position="opponent"
          />
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
            benchCount={state.player.back.length}
            position="player"
          />

          <InlineAttackButtons
            state={state}
            selectedAttacker={selectedAttacker}
            selectedTarget={selectedTarget}
            attackCap={attackCap}
            isPending={isBusy}
            resolution={resolution}
            onAttack={(attackIndex) =>
              callAction(
                () => tcgBattleAttack(attackerId, attackIndex, targetId),
                {
                  kind: 'attack',
                  attackerId,
                  targetId,
                  attackIndex,
                },
              )
            }
          />
        </section>

        <BattleCommandControls
          state={state}
          selectedAttacker={selectedAttacker}
          isPending={isBusy}
          resolution={resolution}
          onCharge={() =>
            callAction(() => tcgBattleCharge(), { kind: 'charge' })
          }
          onClaim={() =>
            callAction(() => claimTcgBattleResult(), { kind: 'claim' })
          }
          onPromote={() => setBenchMode('promote')}
          onRetreat={() => setBenchMode('retreat')}
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
            callAction(() => tcgBattlePromote(cardId), {
              kind: 'promote',
              cardId,
            })
          }
          onRetreat={(benchId) => {
            if (!selectedAttacker) return
            callAction(
              () => tcgBattleRetreat(selectedAttacker.instanceId, benchId),
              {
                kind: 'retreat',
                frontId: selectedAttacker.instanceId,
                backId: benchId,
              },
            )
          }}
        />
      )}

      <AnimatePresence>
        {showOpeningVs && state.playerTrainer && state.enemyTrainer && (
          <VSAnimation
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
        {showEvolutionEnergyBurst && <EvolutionEnergyBurst />}
      </AnimatePresence>
      <AnimatePresence>
        {showEnergyCardBurst && <EnergyCardActivationBurst state={state} />}
      </AnimatePresence>

      {resultOverlay && (
        <RewardResultOverlay
          result={resultOverlay}
          title={
            state.phase === 'finished'
              ? getWinnerLabel(state.winner)
              : undefined
          }
          message={
            state.phase === 'finished'
              ? getWinnerMessage(state.winner)
              : undefined
          }
          onClose={returnToExplore}
        />
      )}
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
      <div className="absolute inset-0 bg-[#07080c]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(127,29,29,0.28)_0%,rgba(9,9,11,0.34)_28%,rgba(14,116,144,0.2)_72%,rgba(5,8,11,0.96)_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,transparent_16%,transparent_84%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  )
}

function ResolutionToast({ resolution }: { resolution: BattleResolution }) {
  const toneClasses =
    resolution.tone === 'player'
      ? 'border-cyan-200/35 bg-cyan-950/55 text-cyan-50'
      : resolution.tone === 'opponent'
        ? 'border-red-200/35 bg-red-950/55 text-red-50'
        : 'border-amber-200/35 bg-[#0d1820]/80 text-amber-50'
  const Icon =
    resolution.tone === 'player'
      ? Swords
      : resolution.tone === 'opponent'
        ? Shield
        : Sparkles

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
          'relative min-w-64 max-w-[min(32rem,calc(100vw-2rem))] overflow-hidden border px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-md',
          toneClasses,
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#f7ecd6]/15 bg-[#081014]/35">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-black uppercase">
              {resolution.title}
            </div>
            <div className="mt-0.5 truncate text-[11px] text-[#f7ecd6]">
              {resolution.detail}
            </div>
          </div>
          {resolution.damageCue && (
            <div className="ml-auto flex shrink-0 items-center gap-1 border border-[#f7ecd6]/15 bg-[#081014]/35 px-2 py-1 text-xs font-black text-[#f7ecd6]">
              <Crosshair className="h-3.5 w-3.5 text-amber-200" />
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

function BattleTopBar({
  state,
  attackCap,
  attackCapPulse,
}: {
  state: TcgBattleState
  attackCap: number
  attackCapPulse: boolean
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
        : 'CPU'
      : state.pendingPromotion === 'player' || state.activeSide === 'player'
        ? 'YOU'
        : 'CPU'

  return (
    <div className="mt-1 shrink-0 px-1 py-1 sm:mt-2">
      <div className="grid grid-cols-3 items-center gap-3">
        <span className="inline-flex items-center gap-1 text-xs font-black text-[#f7ecd6]">
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
          <div className="text-[11px] font-light tracking-[0.08em] text-[#d8d2c3]">
            Round {state.turnNumber}
          </div>
          <div className="text-[12px] font-black tracking-[0.14em] text-emerald-300">
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
      <div className="relative overflow-hidden rounded-lg border border-[#d3ad63]/40 bg-[#172733]/90 px-4 py-3 text-center backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 animate-[tcg-energy-sweep_900ms_ease-out] bg-[linear-gradient(to_right,transparent,rgba(211,173,99,0.18),transparent)]" />
        <p className="relative text-xs font-black uppercase tracking-[0.18em] text-[#f1cf7a] sm:text-sm">
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
      <div className="relative overflow-hidden rounded-lg border border-[#b8c894]/40 bg-[#172733]/90 px-4 py-3 text-center backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 animate-[tcg-energy-sweep_900ms_ease-out] bg-[linear-gradient(to_right,transparent,rgba(184,200,148,0.16),transparent)]" />
        <p className="relative text-[11px] font-black uppercase tracking-[0.12em] text-[#c9d8a7] sm:text-xs">
          {detail}
        </p>
      </div>
    </motion.div>
  )
}

function TeamEnergyReadout({
  energy,
  cap,
  benchCount,
  inverted = false,
  position,
}: {
  energy: number
  cap: number
  benchCount: number
  inverted?: boolean
  position: SideTone
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-3 text-sm font-black text-[#f7ecd6] drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]',
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
      <span className="inline-flex items-center gap-1.5">
        <Layers className="h-5 w-5 text-[#d8d2c3]" />
        <span>{benchCount}</span>
      </span>
    </div>
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
  const canAct =
    state.phase === 'battle' && state.activeSide === 'player' && !resolution
  const attacks = selectedAttacker?.attacks || []

  if (state.phase !== 'battle' || attacks.length === 0) return null

  return (
    <div className="z-20 flex w-full max-w-[min(34rem,calc(100vw-1rem))] flex-wrap items-center justify-center gap-2 px-2 pt-1">
      {attacks.map((attack, index) => {
        const cost = getAttackCost(attack, state)
        const projectedDamage = getProjectedDamage(
          selectedAttacker,
          attack,
          selectedTarget,
          state,
        )
        const disabledReason = !canAct
          ? 'Wait'
          : !selectedTarget
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
              'game-focus-ring group flex min-h-11 min-w-0 flex-1 basis-[10rem] items-center justify-between gap-2 rounded-lg border border-[#b8c894]/30 bg-[#172733]/80 px-3 py-2 text-left backdrop-blur-md transition-colors hover:border-[#c9d8a7]/70 hover:bg-[#405d3d]/35',
              disabled &&
                'cursor-default border-[#f7ecd6]/10 bg-[#172733]/55 opacity-40 hover:border-[#f7ecd6]/10 hover:bg-[#172733]/55',
            )}
            disabled={disabled}
            onClick={() => onAttack(index)}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#91a96b]/15 text-[#c9d8a7]">
                <Swords className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-black uppercase text-[#f7ecd6]">
                  {attack.name}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#b2b6a8]">
                  <Crosshair className="h-3 w-3 text-amber-200" />
                  {disabledReason || projectedDamage}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-black text-[#f7ecd6]">
              <EnergyCost cost={cost} types={attack.cost} />
              <span>{attack.damage}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

function BattleCommandControls({
  state,
  selectedAttacker,
  isPending,
  resolution,
  onCharge,
  onClaim,
  onPromote,
  onRetreat,
}: {
  state: TcgBattleState
  selectedAttacker?: TcgBattleCardState
  isPending: boolean
  resolution?: BattleResolution | null
  onCharge: () => void
  onClaim: () => void
  onPromote: () => void
  onRetreat: () => void
}) {
  const canAct =
    state.phase === 'battle' && state.activeSide === 'player' && !resolution
  const formatConfig = TCG_BATTLE_FORMATS[state.format]
  const atCap = state.player.energy >= formatConfig.energyCap
  const canAttack = canPlayerTakeAnyAttack(state)
  const forceAttack = atCap && canAttack

  if (state.pendingPromotion === 'player') {
    return (
      <div className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-30 flex justify-center">
        <IconCommandButton
          label="Promote"
          size="large"
          disabled={isPending}
          onClick={onPromote}
        >
          <ChevronsUp className="h-[22px] w-[22px]" />
        </IconCommandButton>
      </div>
    )
  }

  if (state.phase === 'finished') {
    const playerTrainer = state.playerTrainer || {
      name: 'Player',
      icon: 'ditto',
      banner: '/backgrounds/tcg.avif',
      title: 'Trainer',
    }
    const enemyTrainer = state.enemyTrainer || {
      name: 'Opponent',
      icon: 'ditto',
      banner: '/backgrounds/tcg.avif',
      title: 'Trainer',
    }
    const loserSide =
      state.winner === 'player'
        ? 'opponent'
        : state.winner === 'opponent'
          ? 'player'
          : null
    const buttonDelay = loserSide ? 1.3 : 0.9

    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#081014]/90 p-4 backdrop-blur-md sm:p-6">
        <div className="relative flex w-full max-w-3xl flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ y: '-120vh', scale: 1 }}
            animate={
              loserSide === 'player'
                ? {
                    y: ['-120vh', '-6vh', '0vh', '10vh', '120vh'],
                    scale: [1, 1, 1.02, 1, 0.96],
                    rotate: [0, 0, 1, 3, 9],
                  }
                : {
                    y: ['-120vh', '-6vh', '0vh', '0vh'],
                    scale: [1, 1, 1.02, 1],
                    rotate: [0, 0, -1, 0],
                  }
            }
            transition={{
              duration: loserSide === 'player' ? 1.65 : 0.82,
              ease: loserSide === 'player' ? [0.2, 0.95, 0.22, 1] : 'easeInOut',
              times:
                loserSide === 'player'
                  ? [0, 0.45, 0.62, 0.78, 1]
                  : [0, 0.7, 0.85, 1],
            }}
            className="z-20 w-full overflow-hidden rounded-lg border border-[#f7ecd6]/15"
          >
            <TrainerCard
              name={playerTrainer.name}
              icon={playerTrainer.icon}
              banner={playerTrainer.banner}
              title={playerTrainer.title}
              className="h-[170px] rounded-none border-none sm:h-[210px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.5,
              type: 'spring',
              bounce: 0.4,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="font-display text-4xl font-semibold text-[#e8b85b] sm:text-5xl">
              {getWinnerLabel(state.winner).toUpperCase()}
            </span>
          </motion.div>

          <motion.div
            initial={{ y: '120vh', scale: 1 }}
            animate={
              loserSide === 'opponent'
                ? {
                    y: ['120vh', '6vh', '0vh', '-10vh', '120vh'],
                    scale: [1, 1, 1.02, 1, 0.96],
                    rotate: [0, 0, -1, -3, -9],
                  }
                : {
                    y: ['120vh', '6vh', '0vh', '0vh'],
                    scale: [1, 1, 1.02, 1],
                    rotate: [0, 0, 1, 0],
                  }
            }
            transition={{
              duration: loserSide === 'opponent' ? 1.65 : 0.82,
              ease:
                loserSide === 'opponent' ? [0.2, 0.95, 0.22, 1] : 'easeInOut',
              times:
                loserSide === 'opponent'
                  ? [0, 0.45, 0.62, 0.78, 1]
                  : [0, 0.7, 0.85, 1],
            }}
            className="z-20 w-full overflow-hidden rounded-lg border border-[#f7ecd6]/15"
          >
            <TrainerCard
              name={enemyTrainer.name}
              icon={enemyTrainer.icon}
              banner={enemyTrainer.banner}
              title={enemyTrainer.title}
              className="h-[170px] rounded-none border-none sm:h-[210px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: buttonDelay, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2 translate-y-[calc(100%+0.5rem)] sm:translate-y-[calc(100%+0.75rem)]"
          >
            <Button
              className="h-11 px-5"
              disabled={isPending}
              onClick={onClaim}
            >
              Show Results
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-30 flex justify-center">
      <div className="flex items-center justify-center gap-3">
        <LabeledCommandButton
          label="Switch"
          disabled={!canAct || !selectedAttacker || isPending || forceAttack}
          onClick={onRetreat}
        >
          <ArrowDownUp className="h-[18px] w-[18px]" />
        </LabeledCommandButton>
        <LabeledCommandButton
          label={atCap ? 'End Turn' : 'Energise'}
          disabled={!canAct || isPending || forceAttack}
          onClick={onCharge}
        >
          <span className="relative inline-flex items-center justify-center">
            <EnergyIcon type="Colorless" className="h-[18px] w-[18px]" />
            {!atCap && (
              <span className="absolute -right-5 -top-3 rounded border border-[#b8c894]/55 bg-[#5f794f]/30 px-1 py-[1px] text-[10px] font-black leading-none text-[#f7ecd6]">
                +{formatConfig.chargeGain}
              </span>
            )}
          </span>
        </LabeledCommandButton>
      </div>
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
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'game-focus-ring h-11 rounded-full border border-game-night-border/60 bg-game-night-surface/80 px-4 text-game-night-ink shadow-[0_12px_28px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors hover:border-game-moss/55 hover:bg-game-moss/20',
        'inline-flex items-center gap-2',
        disabled && 'opacity-35',
      )}
    >
      <span className="shrink-0">{children}</span>
      <span className="text-[11px] font-light uppercase tracking-[0.14em]">
        {label}
      </span>
    </Button>
  )
}

function IconCommandButton({
  label,
  size = 'small',
  disabled,
  onClick,
  children,
}: {
  label: string
  size?: 'small' | 'large'
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <Button
      type="button"
      size="icon"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'game-focus-ring rounded-full border border-game-night-border/60 bg-game-night-surface/80 text-game-night-ink shadow-[0_12px_28px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors hover:border-game-moss/55 hover:bg-game-moss/20',
        size === 'large' ? 'h-[52px] w-[52px]' : 'h-11 w-11',
        disabled && 'opacity-35',
      )}
    >
      {children}
    </Button>
  )
}

function CardPreviewOverlay({ card }: { card: TcgBattleCardState }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-[#081014]/70 p-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
    >
      <motion.div
        className="relative aspect-[240/330] h-[min(72dvh,34rem)] overflow-hidden rounded-xl shadow-[0_28px_80px_rgba(0,0,0,0.72)]"
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
      <div className="absolute inset-0 bg-[#081014]/30 backdrop-blur-[1px]" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          {cue.results.map((result, index) => {
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
                  className="object-contain drop-shadow-[0_12px_26px_rgba(0,0,0,0.65)]"
                  priority
                />
              </motion.div>
            )
          })}
        </div>
        <motion.div
          className={cn(
            'border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-2xl backdrop-blur-md',
            cue.side === 'player'
              ? 'border-cyan-200/35 bg-cyan-950/65 text-cyan-50'
              : 'border-red-200/35 bg-red-950/65 text-red-50',
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
    <header className="relative overflow-hidden rounded-lg border border-[#f7ecd6]/15 bg-[#172733]/82 px-3 py-2 shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-[1fr_auto] items-center gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#d3ad63]" />
            <h1 className="truncate text-sm font-black uppercase text-[#f7ecd6] sm:text-base">
              {title}
            </h1>
          </div>
          <div className="mt-1 flex min-w-0 items-center gap-2 text-[11px] text-[#b2b6a8]">
            <Clock3 className="h-3.5 w-3.5 shrink-0 text-[#b2b6a8]" />
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
        'min-w-[4.7rem] border px-2 py-1 shadow-inner',
        tone === 'player'
          ? 'border-cyan-300/25 bg-cyan-950/40'
          : 'border-red-300/25 bg-red-950/35',
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-[10px] font-black uppercase tracking-[0.08em] text-[#b2b6a8]">
          {label}
        </div>
        <div className="flex items-center gap-1 text-xs font-black text-amber-200">
          <Zap className="h-3.5 w-3.5" />
          {energy}
        </div>
      </div>
      <div className="mt-1 flex items-center justify-between gap-2 text-[10px] font-bold text-[#d8d2c3]">
        <span>{side.front.length} front</span>
        <span>{living} live</span>
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
          className="absolute inset-0 overflow-hidden rounded-lg border border-[#f7ecd6]/15 bg-[#162147] shadow-[0_22px_48px_rgba(0,0,0,0.55)]"
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
          className="absolute inset-0 overflow-hidden rounded-lg border border-[#d3ad63]/55 bg-[#0d1820] shadow-[0_24px_54px_rgba(0,0,0,0.58)]"
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
            <div className="h-full w-full bg-[#162147]" />
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
      layout
      className={cn(
        'tcg-motion group relative aspect-[240/330] w-[calc((100vw-4.5rem)/3.5)] max-w-[9rem] shrink-0 snap-center overflow-hidden rounded-lg border bg-[#0d1820] p-0 transition duration-200 active:scale-[0.97] sm:w-[clamp(7.5rem,15vw,9.5rem)]',
        selected
          ? 'border-[#d3ad63] shadow-[0_0_0_3px_rgba(211,173,99,0.18)]'
          : 'border-[#f7ecd6]/15 shadow-[0_12px_28px_rgba(0,0,0,0.42)] hover:border-[#d3ad63]/55',
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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,16,20,0.45),transparent,rgba(247,236,214,0.06))]" />
      {selected && slotIndex !== undefined && (
        <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#d3ad63] text-[10px] font-black text-[#172733] shadow-md">
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
            ? 'border-cyan-300/25 bg-cyan-400/10'
            : 'border-[#f7ecd6]/15 bg-[#f7ecd6]/5',
        )}
      >
        <div className="flex items-center gap-1 text-[10px] font-black uppercase text-[#f7ecd6]">
          {canKnockOut ? (
            <Skull className="h-3.5 w-3.5 text-red-200" />
          ) : (
            <Crosshair className="h-3.5 w-3.5 text-amber-200" />
          )}
          {bestDamage}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#b2b6a8]">
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
        'grid min-w-0 grid-cols-[auto_1fr] items-center gap-2 border bg-[#081014]/35 p-1.5',
        tone === 'player' ? 'border-cyan-300/20' : 'border-red-300/20',
        align === 'right' && 'grid-cols-[1fr_auto]',
      )}
    >
      {align === 'left' && <CombatantThumb card={card} tone={tone} />}
      <div className={cn('min-w-0', align === 'right' && 'text-right')}>
        <div className="truncate text-[11px] font-black uppercase text-[#f7ecd6]">
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
              <span className="text-[10px] font-bold text-[#b2b6a8]">
                {card.currentHp}/{card.hp} HP
              </span>
            </>
          ) : (
            <span className="text-[10px] font-bold text-[#b2b6a8]">
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
        'relative h-9 w-7 shrink-0 overflow-hidden border bg-[#0d1820]',
        tone === 'player' ? 'border-cyan-300/25' : 'border-red-300/25',
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
          <CircleDot className="h-3.5 w-3.5 text-[#748083]" />
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
        'group relative h-12 overflow-hidden border border-game-moss/35 bg-game-night-surface/80 px-2 text-left text-game-night-ink hover:bg-game-moss/20',
        disabled && 'border-game-night-border/40 bg-game-night-surface/55 text-game-night-muted',
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <span className="min-w-0">
          <span className="block truncate text-xs font-black">
            {attack.name}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-game-night-muted">
            {disabledReason ? (
              disabledReason
            ) : (
              <>
                <Crosshair className="h-3 w-3 text-game-ochre" />
                {projectedDamage} damage
              </>
            )}
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-0.5 text-xs font-black">
          <EnergyCost cost={cost} types={attack.cost} />
          <span className="text-[10px] text-game-night-muted">{attack.damage}</span>
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
        'border bg-[#081014]/35 px-2 py-1',
        tone === 'player' ? 'border-cyan-300/20' : 'border-red-300/20',
      )}
    >
      <div className="flex items-center justify-between gap-1 text-[10px] font-black uppercase tracking-[0.06em] text-[#b2b6a8]">
        <span>{label}</span>
        <span>{card ? `${card.currentHp}/${card.hp}` : '-'}</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden bg-[#172733]">
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
      <div className="flex items-center justify-center gap-2 border border-red-300/15 bg-[#081014]/35 py-2 text-xs text-[#b2b6a8]">
        <EyeOff className="h-3.5 w-3.5" />
        Foe bench {opponentBenchCount}
      </div>
      <div className="flex min-w-20 items-center justify-center border border-amber-300/20 bg-amber-500/10 px-2 py-2 text-xs font-black uppercase text-amber-100">
        {turnLabel}
      </div>
      <button
        type="button"
        className="game-focus-ring flex items-center justify-center gap-2 border border-cyan-300/20 bg-cyan-500/10 py-2 text-xs font-black uppercase text-cyan-50 transition-colors hover:bg-cyan-400/15"
        onClick={onOpenBench}
      >
        <Layers className="h-3.5 w-3.5" />
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

  return (
    <div className="fixed inset-0 z-50 bg-[#081014]/76 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close bench"
      />
      <div className="game-paper-background absolute inset-x-0 bottom-0 mx-auto max-w-5xl rounded-t-xl border border-game-border bg-game-surface p-4 text-game-ink shadow-2xl">
        <div className="mb-3 grid grid-cols-[1fr_auto] items-center gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-game-ink">
              {isPromotion ? (
                <ChevronsUp className="h-4 w-4 text-amber-200" />
              ) : isRetreat ? (
                <ArrowDownUp className="h-4 w-4 text-amber-200" />
              ) : (
                <Layers className="h-4 w-4 text-cyan-200" />
              )}
              {isPromotion
                ? 'Promote from Bench'
                : isRetreat
                  ? 'Choose Replacement'
                  : 'Your Bench'}
            </div>
            <div className="truncate text-xs text-game-muted">
              {isPromotion
                ? 'Fill the open front slot'
                : isRetreat
                  ? `${attacker?.name || 'Selected card'} retreat cost ${attacker?.convertedRetreatCost ?? 0}`
                  : `${state.player.back.length} ready / ${state.player.discard.length} discarded`}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            aria-label="Close card selection"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid max-h-[48dvh] min-h-36 grid-cols-3 place-items-center gap-2 overflow-y-auto">
          {state.player.back.length === 0 ? (
            <div
              className="col-span-3 flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-game-border bg-game-surface-raised text-sm font-bold text-game-muted"
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
                disabled={isPending || (isRetreat && !attacker)}
                onClick={() => {
                  if (isPromotion) onPromote(card.instanceId)
                  else if (isRetreat) onRetreat(card.instanceId)
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
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
          ? 'drop-shadow-[0_18px_28px_rgba(0,0,0,0.58)]'
          : 'drop-shadow-[0_16px_26px_rgba(0,0,0,0.48)]',
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
              ? 'border-[#d3ad63] bg-[#d3ad63]/[0.06]'
              : 'border-red-200 bg-red-300/[0.06]',
          )}
        />
      )}
      {isLocked && !knockedOut && (
        <div
          className={cn(
            'pointer-events-none absolute z-30 flex items-center gap-1 rounded-full border border-[#d3ad63]/60 bg-[#172733]/90 px-2 py-1 text-[10px] font-black uppercase text-[#f1cf7a] shadow-md backdrop-blur-sm',
            side === 'opponent' ? '-left-2 -top-2' : '-right-2 -top-2',
          )}
        >
          <Lock className="h-3 w-3" />
          <span>T-{lockedTurnsRemaining}</span>
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
          'relative h-full w-full overflow-hidden rounded-lg shadow-[0_18px_38px_rgba(0,0,0,0.5)]',
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
            'pointer-events-none absolute z-30 flex gap-1 rounded-full border border-[#f7ecd6]/15 bg-[#081014]/75 p-1 shadow-[0_8px_18px_rgba(0,0,0,0.5)] backdrop-blur-sm',
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
    </button>
  )
}

function EmptyCardSlot({ side }: { side: SideTone }) {
  return (
    <div
      className={cn(
        'aspect-[240/330] w-[clamp(82px,27vw,150px)] opacity-0 sm:w-[clamp(108px,14vw,190px)]',
        side === 'player' ? 'bg-cyan-300/0' : 'bg-red-300/0',
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
      className={`${className} rounded-full ring-1 ring-[#081014]/30`}
    />
  )
}

function EnergyCost({ cost, types }: { cost: number; types?: string[] }) {
  if (cost === 0)
    return <span className="text-[10px] text-[#b2b6a8]">Free</span>
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
