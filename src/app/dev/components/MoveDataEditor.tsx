'use client'

import * as React from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Save,
  Plus,
  Loader2,
  CheckCheck,
  Filter,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  getMovePokemonFormList,
  listMoveTypeFiles,
  readPokemonResearchLevelRewards,
  readMoveTypeFile,
  savePokemonResearchLevelRewards,
  saveMoveTypeFile,
  type PokemonResearchLevelReward,
} from '../actions'
import { STATUS_EFFECTS } from '@/data/moves/entries/status-effects'
import {
  type BuffConfig,
  type MoveContestComparison,
  type MoveContestConfig,
  type MoveContestMetric,
  type MoveContestMetricValue,
  type MoveContestOutcomeConfig,
  type MoveContestResult,
  type MoveBattleCondition,
  type MoveHeldItemEffect,
  type MoveTypeChangeEffect,
  type MoveSecondaryStatusConfig,
  type SecondaryStatusEffect,
  type SecondaryStatusTarget,
  type SecondaryStatusTrigger,
  type SecondaryStatusTurnRange,
  type StatusEffectId,
  type MoveConditionalDamageModifier,
  type MoveNextAccuracyBypass,
  type MovePostDamageStatusCure,
  type MovePostDamageStatStage,
  type MoveStatStageEffect,
  type MoveTransformEffect,
  type MoveLockEffect,
  type MoveUseEffect,
  type MoveCurseEffect,
  MoveConfig,
} from '@/data/moves/types'
import type {
  BattleAiActor,
  BattleAiComparison,
  BattleAiEffectiveness,
  BattleAiEffectivenessFloor,
  BattleAiStat,
  BattleAiUseCondition,
  BattleAiUseConditionGroup,
  BattleAiUseConfig,
} from '@/data/battle-ai'
import type { WeatherType } from '@/data/weather'
import type { PokemonTypeName } from '@/data/items'
import { POKEMON_TYPES } from '@/data/moves'

interface MoveTypeMeta {
  id: string
  filename: string
  variableName: string
  label: string
}

interface PokemonFormForMoveEditor {
  speciesId: number
  speciesName: string
  forms: {
    id: string
    name: string
    types: string[]
  }[]
}

interface FlattenedPokemonFormForMoveEditor {
  speciesId: number
  speciesName: string
  id: string
  name: string
  types: string[]
}

type StatusTarget = Exclude<NonNullable<NonNullable<MoveConfig['status']>['target']>, undefined>
type RandomStatus = NonNullable<NonNullable<MoveConfig['randomStatuses']>['options']>[number]
type RandomStatusTarget = NonNullable<RandomStatus['target']>
type ContestOutcomeTarget = 'success' | 'failure'
type FailOnStance = Exclude<MoveConfig['failOnStance'], undefined>
type FailOnStanceOption = FailOnStance | 'none'
type AiUseMode = Exclude<NonNullable<MoveConfig['aiUse']>['mode'], undefined>
type SelfDamageConfig = NonNullable<MoveConfig['selfDamage']>
type ContinuousConfig = NonNullable<MoveConfig['continuous']>
type RepeatDamageConfig = NonNullable<MoveConfig['repeatDamage']>
type CalledMoveConfig = NonNullable<MoveConfig['calledMove']>
type DamageRuleConfig = NonNullable<MoveConfig['damageRule']>
type DelayedDamageConfig = NonNullable<MoveConfig['delayedDamage']>
type DynamicTypeConfig = NonNullable<MoveConfig['dynamicType']>
type WeatherDamageMultiplierConfig = NonNullable<MoveConfig['weatherDamageMultiplier']>
type ItemUseEffectConfig = NonNullable<MoveConfig['itemUseEffect']>
type NextDamageModifierConfig = NonNullable<MoveConfig['nextDamageModifier']>
type StatusCureConfig = NonNullable<MoveConfig['statusCure']>
type StatusTransferConfig = NonNullable<MoveConfig['statusTransfer']>
type SecondaryStatusCureConfig = NonNullable<MoveConfig['secondaryStatusCure']>
type PartyReviveConfig = NonNullable<MoveConfig['partyRevive']>
type SwitchEffectConfig = NonNullable<MoveConfig['switchEffect']>
type BattleRewardsConfig = NonNullable<MoveConfig['battleRewards']>
type ConditionalDamageModifierConfig = MoveConditionalDamageModifier
type NextAccuracyBypassConfig = MoveNextAccuracyBypass
type PostDamageStatusCureConfig = MovePostDamageStatusCure
type PostDamageStatStageConfig = MovePostDamageStatStage
type StatStageEffectConfig = MoveStatStageEffect
type TransformEffectConfig = MoveTransformEffect
type MoveLockEffectConfig = MoveLockEffect
type MoveUseEffectConfig = MoveUseEffect
type CurseEffectConfig = MoveCurseEffect
type SecondaryStatusEffectType = SecondaryStatusEffect['type']
type BattleConditionType = MoveBattleCondition['type']
type TypeChangeEffectType = MoveTypeChangeEffect['type']
type DisableStanceChoice = NonNullable<MoveConfig['disableStance']>['stance']
type AiCondition = BattleAiUseCondition
type AiConditionType = BattleAiUseCondition['type']
type AiConditionGroup = BattleAiUseConditionGroup

const MOVE_STANCES = ['power', 'speed', 'tech', 'random'] as const
const MOVE_TARGETS = ['self', 'enemy'] as const
const MOVE_FORCED_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
  'random',
] as const
const STATUS_TARGETS: StatusTarget[] = ['self', 'enemy']
const RANDOM_STATUS_TARGETS: RandomStatusTarget[] = ['self', 'enemy', 'random']
const FAIL_STANCES: FailOnStanceOption[] = ['none', 'loss', 'tie']
const AI_USE_MODES: AiUseMode[] = ['all', 'any']
const AI_ACTORS: BattleAiActor[] = ['self', 'opponent']
const AI_STATS: BattleAiStat[] = [
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
]
const AI_COMPARISONS: BattleAiComparison[] = [
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'equal',
  'notEqual',
]
const AI_EFFECTIVENESS: BattleAiEffectiveness[] = [
  'immune',
  'not-very-effective',
  'neutral',
  'super-effective',
]
const AI_EFFECTIVENESS_FLOORS: BattleAiEffectivenessFloor[] = [
  'not-very-effective',
  'neutral',
  'super-effective',
]
const BUFF_STATS: BuffConfig['stat'][] = ['attack', 'defense', 'specialAttack', 'specialDefense', 'speed', 'crit']
const BUFF_TARGETS: Exclude<BuffConfig['target'], undefined>[] = ['self', 'enemy']
const SECONDARY_STATUS_TARGETS: SecondaryStatusTarget[] = [
  'self-pokemon',
  'enemy-pokemon',
  'self-side',
  'enemy-side',
  'both-pokemon',
  'both-sides',
  'field',
]
const SECONDARY_STATUS_TRIGGERS: SecondaryStatusTrigger[] = ['turn-end', 'switch']
const SECONDARY_STATUS_EFFECT_TYPES: SecondaryStatusEffectType[] = [
  'damage',
  'absorb',
  'apply-status',
  'stat',
  'damage-reduction',
  'damage-modifier',
  'damage-taken-modifier',
  'type-immunity-bypass',
  'accuracy-bypass',
  'infatuation',
  'switch-prevention',
  'move-block',
  'snatch-beneficial-move',
  'faint-bond',
  'faint-move-use-depletion',
]
const SECONDARY_STATUS_STANCES = ['power', 'speed', 'tech'] as const
const SECONDARY_STATUS_ATTACK_TYPES = MOVE_FORCED_TYPES.filter((type) => type !== 'random')
const MOVE_CONTEST_METRICS: MoveContestMetric[] = [
  'level',
  'currentHp',
  'maxHp',
  'height',
  'weight',
  'size',
  'friendship',
  'stat:attack',
  'stat:defense',
  'stat:specialAttack',
  'stat:specialDefense',
  'stat:speed',
  'effective-stat:attack',
  'effective-stat:defense',
  'effective-stat:specialAttack',
  'effective-stat:specialDefense',
  'effective-stat:speed',
]
const MOVE_CONTEST_SELECTOR_METRICS = MOVE_CONTEST_METRICS
const MOVE_CONTEST_COMPARISONS: MoveContestComparison[] = [
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual',
  'equal',
  'notEqual',
]
const MOVE_CONTEST_RESULTS: MoveContestResult[] = ['win', 'loss', 'tie']
const CONTEST_CUSTOM_METRIC_VALUE = '__custom__'
const FIELD_CONTROL_CLASS = 'h-8 w-full text-sm'
const EDITOR_PANEL_CLASS = 'rounded-lg border bg-background/80 p-4 shadow-sm'
const EDITOR_PANEL_HEADER_CLASS = 'mb-3 flex flex-wrap items-start justify-between gap-3'
const EDITOR_PANEL_TITLE_CLASS = 'text-sm font-semibold tracking-tight'
const EDITOR_PANEL_DESCRIPTION_CLASS = 'mt-0.5 text-xs text-muted-foreground'
const POKEMON_TYPE_CHIP_STYLES: Record<string, string> = {
  normal: 'bg-zinc-500/20 text-zinc-100 border-zinc-500/30',
  fire: 'bg-orange-500/20 text-orange-100 border-orange-500/30',
  water: 'bg-blue-500/20 text-blue-100 border-blue-500/30',
  electric: 'bg-yellow-500/20 text-yellow-100 border-yellow-500/30',
  grass: 'bg-green-500/20 text-green-100 border-green-500/30',
  ice: 'bg-cyan-500/20 text-cyan-100 border-cyan-500/30',
  fighting: 'bg-red-700/20 text-red-100 border-red-700/30',
  poison: 'bg-purple-500/20 text-purple-100 border-purple-500/30',
  ground: 'bg-amber-700/20 text-amber-100 border-amber-700/30',
  flying: 'bg-indigo-500/20 text-indigo-100 border-indigo-500/30',
  psychic: 'bg-fuchsia-500/20 text-fuchsia-100 border-fuchsia-500/30',
  bug: 'bg-lime-500/20 text-lime-100 border-lime-500/30',
  rock: 'bg-stone-500/20 text-stone-100 border-stone-500/30',
  ghost: 'bg-violet-500/20 text-violet-100 border-violet-500/30',
  dragon: 'bg-sky-500/20 text-sky-100 border-sky-500/30',
  dark: 'bg-zinc-800/60 text-zinc-100 border-zinc-700/50',
  steel: 'bg-slate-400/20 text-slate-100 border-slate-400/30',
  fairy: 'bg-pink-500/20 text-pink-100 border-pink-500/30',
  stellar: 'bg-indigo-400/20 text-indigo-100 border-indigo-400/30',
}
const AI_CONDITION_TYPES: AiConditionType[] = [
  'hp-at-or-below',
  'hp-above',
  'hp-comparison',
  'status',
  'status-absent',
  'turn-start',
  'turn-divisible-by',
  'active-turn',
  'stat-comparison',
  'default-effectiveness',
  'move-effectiveness',
  'no-other-move-effectiveness',
  'not-type',
  'has-type',
  'opponent-used-move',
]
const RUNTIME_MOVE_EFFECT_FIELDS = [
  'calledMove',
  'damageRule',
  'delayedDamage',
  'dynamicType',
  'weatherDamageMultiplier',
  'conditionalDamageModifiers',
  'ignoreDefenderStatStages',
  'damageStatSource',
  'itemUseEffect',
  'heldItemEffect',
  'disableStance',
  'nextDamageModifier',
  'nextAccuracyBypass',
  'postDamageStatusCure',
  'postDamageStatStage',
  'statStageEffect',
  'transformEffect',
  'moveLockEffect',
  'moveUseEffect',
  'curseEffect',
  'statusCure',
  'statusTransfer',
  'secondaryStatusCure',
  'partyRevive',
  'battleCondition',
  'switchEffect',
  'typeChangeEffect',
  'battleRewards',
] as const
type RuntimeMoveEffectField = (typeof RUNTIME_MOVE_EFFECT_FIELDS)[number]
const BATTLE_CONDITION_TYPES: BattleConditionType[] = [
  'user-status',
  'target-status',
  'last-ally-fainted-previous-turn',
  'user-has-used-other-moves',
  'not-last-used-move',
  'first-active-turn',
  'opposite-gender-target',
  'user-has-held-item',
  'target-has-held-item',
  'user-has-consumed-held-item',
]
const TYPE_CHANGE_EFFECT_TYPES: TypeChangeEffectType[] = [
  'random',
  'first-known-move',
  'resist-last-opponent-move',
  'target-primary',
  'set',
  'add',
  'remove',
]
const DISABLE_STANCE_CHOICES: DisableStanceChoice[] = ['power', 'speed', 'tech', 'random']
const CALLED_MOVE_MODES: CalledMoveConfig['mode'][] = [
  'random-authored',
  'opponent-last-successful',
  'self-known-random',
  'opponent-last-successful-boosted',
]
const DAMAGE_RULE_TYPES: DamageRuleConfig['type'][] = [
  'flat',
  'target-current-hp-percent',
  'user-level',
  'user-current-hp',
  'last-damage-taken',
  'party-member-count',
  'match-user-hp',
  'average-active-hp',
  'ohko',
]
const DYNAMIC_TYPE_TYPES: DynamicTypeConfig['type'][] = [
  'held-plate',
  'held-memory',
  'held-drive',
  'weather',
  'tera',
  'user-primary',
  'target-primary',
]
const ITEM_USE_EFFECT_TYPES: ItemUseEffectConfig['type'][] = [
  'restore-self',
  'remove-enemy',
  'consume-self',
]
const CONDITIONAL_DAMAGE_MODIFIER_TYPES: ConditionalDamageModifierConfig['type'][] = [
  'user-status',
  'user-no-held-item',
  'target-status',
  'target-pokemon-type',
  'remaining-move-uses-at-or-below',
  'target-current-hp-at-or-below-percent',
  'user-current-hp-percent',
  'weather',
  'super-effective',
  'target-positive-stat-stages',
  'user-positive-stat-stages',
  'fainted-party-members',
  'target-dynamaxed',
  'user-took-damage',
  'user-stat-lowered-this-turn',
  'target-switching-out',
  'user-previous-move-failed',
  'user-previous-successful-move',
  'chance',
]
const POST_DAMAGE_STATUS_CURE_TARGETS: PostDamageStatusCureConfig['target'][] = ['self', 'enemy']
const POST_DAMAGE_STAT_STAGE_TARGETS: NonNullable<PostDamageStatStageConfig['target']>[] = ['self', 'enemy']
const NEXT_ACCURACY_BYPASS_TARGETS: NextAccuracyBypassConfig['target'][] = ['self', 'enemy']
const STAT_STAGE_EFFECT_TYPES: StatStageEffectConfig['type'][] = [
  'copy-target',
  'swap-self',
  'reset',
  'swap-target',
  'invert-target',
  'boost-pokemon-type',
]
const STAT_STAGE_EFFECT_STATS: Exclude<BuffConfig['stat'], 'crit'>[] = [
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
]
const MOVE_TYPE_CHANGE_TYPES = MOVE_FORCED_TYPES.filter((type) => type !== 'random')
const MOVE_WEATHER_TYPES = [
  'clear',
  'rain',
  'heavy-rain',
  'thunderstorm',
  'harsh-sunlight',
  'extremely-harsh-sunlight',
  'sandstorm',
  'hail',
  'snow',
  'snowstorm',
  'fog',
  'strong-winds',
  'shadowy-aura',
] as const
const SWITCH_EFFECT_TYPES: SwitchEffectConfig['type'][] = [
  'force-enemy-random',
  'self-pending',
]

function formatAiConditionType(value: AiConditionType) {
  return value
    .split('-')
    .map((chunk) => `${chunk[0].toUpperCase()}${chunk.slice(1)}`)
    .join(' ')
}

function pickRuntimeMoveEffects(move: MoveConfig | null): Partial<MoveConfig> {
  if (!move) return {}
  return RUNTIME_MOVE_EFFECT_FIELDS.reduce((acc, field) => {
    const value = move[field as keyof MoveConfig]
    if (value !== undefined) {
      ;(acc as Record<string, unknown>)[field] = value
    }
    return acc
  }, {} as Partial<MoveConfig>)
}

function normalizeAiStatusConditionValue(value: string | string[] | 'all' | undefined): string {
  if (!value) return 'all'
  if (value === 'all') return 'all'
  return Array.isArray(value) ? value[0] || 'all' : value
}

function makeDefaultAiUseConfig(): BattleAiUseConfig {
  return {
    chance: 100,
    conditions: [],
  }
}

function makeBattleConditionFromType(type: BattleConditionType): MoveBattleCondition {
  if (type === 'user-status' || type === 'target-status') return { type, statusId: 'sleep' }
  return { type }
}

function makeTypeChangeEffectFromType(type: TypeChangeEffectType): MoveTypeChangeEffect {
  if (type === 'random') return { type, target: 'self' }
  if (type === 'set' || type === 'add' || type === 'remove') {
    return { type, target: 'self', pokemonType: 'normal' }
  }
  return { type, target: 'self' }
}

function makeDamageRuleFromType(type: DamageRuleConfig['type']): DamageRuleConfig {
  if (type === 'flat') return { type, amount: 20 }
  if (type === 'target-current-hp-percent') return { type, percent: 50 }
  if (type === 'user-level') return { type, multiplier: 1 }
  if (type === 'party-member-count') return { type, perMemberDamage: 0.25 }
  if (type === 'ohko') return { type, failIfUserLowerLevel: true }
  return { type }
}

function makeDynamicTypeFromType(type: DynamicTypeConfig['type']): DynamicTypeConfig {
  return { type, fallbackType: 'normal' }
}

function makeItemUseEffectFromType(type: ItemUseEffectConfig['type']): ItemUseEffectConfig {
  if (type === 'consume-self') return { type, amount: 1, failIfUnavailable: true }
  return { type, amount: 1 }
}

function makeConditionalDamageModifierFromType(
  type: ConditionalDamageModifierConfig['type'],
): ConditionalDamageModifierConfig {
  if (type === 'remaining-move-uses-at-or-below') {
    return { type, uses: 1, multiplier: 2 }
  }
  if (type === 'target-current-hp-at-or-below-percent') {
    return { type, percent: 50, multiplier: 2 }
  }
  if (type === 'user-current-hp-percent') {
    return { type, multiplierAtFullHp: 1, minimumMultiplier: 0.1 }
  }
  if (type === 'weather') {
    return { type, weather: ['rain'], multiplier: 2 }
  }
  if (type === 'target-pokemon-type') {
    return { type, pokemonTypes: ['water'], multiplier: 2 }
  }
  if (
    type === 'user-no-held-item' ||
    type === 'super-effective' ||
    type === 'target-positive-stat-stages' ||
    type === 'user-positive-stat-stages' ||
    type === 'target-dynamaxed' ||
    type === 'user-took-damage' ||
    type === 'user-stat-lowered-this-turn' ||
    type === 'target-switching-out' ||
    type === 'user-previous-move-failed'
  ) {
    return { type, multiplier: 2 }
  }
  if (type === 'fainted-party-members') {
    return { type, baseMultiplier: 1, perFaintedMultiplier: 1 }
  }
  if (type === 'user-previous-successful-move') {
    return { type, moveIds: [], multiplier: 2 }
  }
  if (type === 'chance') {
    return { type, chance: 30, multiplier: 2 }
  }
  return { type, statuses: 'all', multiplier: 2 }
}

function makeStatStageEffectFromType(type: StatStageEffectConfig['type']): StatStageEffectConfig {
  if (type === 'swap-self') return { type, first: 'attack', second: 'defense' }
  if (type === 'reset') return { type, target: 'both' }
  if (type === 'boost-pokemon-type') {
    return {
      type,
      target: 'both',
      pokemonType: 'grass',
      stats: ['attack', 'specialAttack'],
      stages: 1,
    }
  }
  return { type, target: 'self' }
}

function makeConditionFromType(type: AiConditionType): AiCondition {
  switch (type) {
    case 'hp-at-or-below':
      return { type, target: 'opponent', thresholdPercent: 50 }
    case 'hp-above':
      return { type, target: 'opponent', thresholdPercent: 50 }
    case 'hp-comparison':
      return {
        type,
        leftTarget: 'self',
        rightTarget: 'opponent',
        comparison: 'greaterThan',
      }
    case 'status':
    case 'status-absent':
      return {
        type,
        target: 'self',
        status: 'all',
      }
    case 'turn-start':
      return { type, minTurn: 1 }
    case 'turn-divisible-by':
      return { type, divisor: 2 }
    case 'active-turn':
      return {
        type,
        target: 'self',
        minTurn: 1,
      }
    case 'stat-comparison':
      return {
        type,
        target: 'self',
        left: 'attack',
        right: 'defense',
        comparison: 'greaterThan',
      }
    case 'default-effectiveness':
      return { type, atLeast: 'neutral' }
    case 'move-effectiveness':
      return {
        type,
        target: 'opponent',
        atLeast: 'neutral',
      }
    case 'no-other-move-effectiveness':
      return { type, atLeast: 'super-effective' }
    case 'not-type':
    case 'has-type':
      return { type, target: 'opponent', pokemonType: 'water' }
    case 'opponent-used-move':
      return { type }
  }
}

function parseNumericValue(value: string) {
  if (value === '') return undefined
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

function isSecondaryStatusTurnRange(
  turns: MoveSecondaryStatusConfig['turns'],
): turns is SecondaryStatusTurnRange {
  return typeof turns === 'object' && turns !== null
}

function makeDefaultSecondaryStatus(index = 1): MoveSecondaryStatusConfig {
  return {
    id: index === 1 ? 'secondary-status' : `secondary-status-${index}`,
    name: 'Secondary Status',
    target: 'enemy-pokemon',
    triggers: ['turn-end'],
    turns: { min: 3, max: 5 },
    effects: [makeDefaultSecondaryStatusEffect('damage')],
  }
}

function makeDefaultSecondaryStatusEffect(type: SecondaryStatusEffectType): SecondaryStatusEffect {
  switch (type) {
    case 'damage':
      return { type, percentMaxHp: 12.5 }
    case 'absorb':
      return { type, percentMaxHp: 12.5, healPercent: 100 }
    case 'apply-status':
      return { type, statusId: 'poison', chance: 100 }
    case 'stat':
      return { type, stat: 'attack', stages: -1, chance: 100 }
    case 'damage-reduction':
      return { type, percent: 50 }
    case 'damage-modifier':
      return { type, percent: 50 }
    case 'damage-taken-modifier':
      return { type, percent: 50 }
    case 'type-immunity-bypass':
      return { type, attackTypes: ['normal'] }
    case 'accuracy-bypass':
      return { type }
    case 'infatuation':
      return { type, chance: 50 }
    case 'switch-prevention':
      return { type }
    case 'move-block':
      return { type, mode: 'zero-damage' }
    case 'snatch-beneficial-move':
      return { type }
    case 'faint-bond':
      return { type }
    case 'faint-move-use-depletion':
      return { type, amount: 5 }
    case 'heal':
      return { type, percentMaxHp: 50 }
    case 'status-immunity':
      return { type, statuses: 'all' }
    case 'wake-status':
      return { type, statuses: ['sleep'] }
  }
}

function isContestMetricValue(value: MoveContestMetricValue | undefined): value is number {
  return typeof value === 'number'
}

function getInterruptEnemyMoveChanceValue(
  value: MoveConfig['interruptEnemyMove'],
): number | undefined {
  if (value === undefined) return undefined
  if (typeof value === 'boolean') return value ? 100 : 0
  return value
}

function normalizeInterruptEnemyMoveChanceValue(
  value: MoveConfig['interruptEnemyMove'],
): number | undefined {
  if (value === undefined) return undefined
  if (typeof value === 'boolean') return value ? 100 : 0
  const clamped = Math.max(0, Math.min(100, value))
  return Number.isFinite(clamped) ? clamped : undefined
}

function normalizePercentValue(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value)) return undefined
  return Math.max(0, Math.min(100, value))
}

function getTypeLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function getTypeChipClass(type: string) {
  return POKEMON_TYPE_CHIP_STYLES[type.toLowerCase()] || 'bg-zinc-700/20 text-zinc-100 border-zinc-500/30'
}

const PokemonFormCard = React.memo(function PokemonFormCard({
  form,
  selected,
  recommended,
  researchMoveCount,
  usableMoveCount,
  onToggle,
}: {
  form: FlattenedPokemonFormForMoveEditor
  selected: boolean
  recommended: boolean
  researchMoveCount: number
  usableMoveCount: number
  onToggle: (formId: string) => void
}) {
  const typeChips = React.useMemo(
    () => Array.from(new Set(form.types.map((type) => type.toLowerCase()).filter(Boolean))),
    [form.types],
  )

  return (
    <button
      type="button"
      className={cn(
        'group relative rounded-md border p-3 text-left transition',
        selected
          ? 'border-primary/80 bg-primary/12'
          : 'border-border hover:bg-muted/20',
      )}
      onClick={() => onToggle(form.id)}
    >
      {researchMoveCount > 0 ? (
        <div
          className="absolute left-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/15 px-1.5 text-xs font-semibold text-sky-300 shadow-sm"
          title={`${researchMoveCount} Pokemon Research move${researchMoveCount === 1 ? '' : 's'} assigned`}
        >
          {researchMoveCount}
        </div>
      ) : null}
      <div
        className="absolute right-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/15 px-1.5 text-xs font-semibold text-emerald-300 shadow-sm"
        title={`${usableMoveCount} usable move${usableMoveCount === 1 ? '' : 's'} in the current type file`}
      >
        {usableMoveCount}
      </div>
      {recommended ? (
        <div className="absolute right-2 top-9 rounded-full bg-amber-500/15 p-1 text-amber-400 ring-1 ring-amber-500/30">
          <Star className="h-3.5 w-3.5 fill-amber-400" />
        </div>
      ) : null}
      <div className="mx-auto flex h-20 w-20 items-center justify-center">
        <Image
          src={getPokemonImageUrl(form.id, 'sprite')}
          alt={form.name}
          width={80}
          height={80}
          className="h-16 w-16"
        />
      </div>
      <p className="truncate text-sm text-center text-muted-foreground">{form.id}</p>
      <p className="truncate text-sm text-center font-medium">{form.name}</p>
      <p className="truncate text-xs text-muted-foreground/80">
        {form.speciesName}
      </p>
      {typeChips.length > 0 ? (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {typeChips.map((type) => (
            <Badge
              key={`${form.id}-${type}`}
              variant="outline"
              className={cn('h-5 px-1.5 text-[10px]', getTypeChipClass(type))}
            >
              {getTypeLabel(type)}
            </Badge>
          ))}
        </div>
      ) : (
        <div className="mt-2 text-center text-xs text-muted-foreground">No type data</div>
      )}
    </button>
  )
})

function sortNumericStringIds(a: string, b: string) {
  const ai = Number(a)
  const bi = Number(b)
  if (Number.isNaN(ai) || Number.isNaN(bi)) return a.localeCompare(b)
  return ai - bi
}

function normalizeFormIds(formIds: string[] | undefined, allFormIds: Set<string>): string[] {
  const normalized = Array.from(new Set((formIds || []).map((id) => id.toString()).filter(Boolean)))
    .filter((id) => allFormIds.size === 0 || allFormIds.has(id))
    .sort(sortNumericStringIds)

  return normalized
}

function normalizeMoveForEditor(move: MoveConfig): MoveConfig {
  const formId = move.formId ? Array.from(new Set(move.formId.map((id) => id.toString()).filter(Boolean))) : []

  return {
    ...move,
    formId,
    interruptEnemyMove: normalizeInterruptEnemyMoveChanceValue(move.interruptEnemyMove),
    status: move.status
      ? {
          id: move.status.id,
          chance: move.status.chance,
          target: move.status.target,
          forceStatus: move.status.forceStatus,
        }
      : undefined,
    critChance: move.critChance,
    forcedType: move.forcedType,
    notes: move.notes,
  }
}

function normalizeMoveForSave(move: MoveConfig, allFormIds: Set<string>): MoveConfig {
  const formId = normalizeFormIds(move.formId, allFormIds)

  return {
    ...move,
    id: move.id,
    formId: formId.length ? formId : undefined,
    absorb: normalizePercentValue(move.absorb),
    interruptEnemyMove: normalizeInterruptEnemyMoveChanceValue(move.interruptEnemyMove),
  }
}

function DashboardMetric({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: React.ReactNode
  tone?: 'default' | 'accent' | 'warning'
}) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card px-3 py-2 shadow-sm',
        tone === 'accent' && 'border-primary/30 bg-primary/5',
        tone === 'warning' && 'border-amber-500/30 bg-amber-500/10',
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  )
}

function makeNewMove(type: string) {
  return {
    id: `new-${type}-${Date.now()}`,
    name: 'New Move',
    description: '',
    stance: 'tech' as const,
    target: 'enemy' as const,
    forcedType: (type || 'normal') as (typeof MOVE_FORCED_TYPES)[number],
    damage: 1,
    accuracy: 100,
  }
}

function normalizeMoveIdInput(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function MoveDataEditor() {
  const ALL_TYPES_FILTER_VALUE = 'all'
  const RECOMMENDED_TYPES_FILTER_VALUE = 'recommended'
  const [moveTypes, setMoveTypes] = React.useState<MoveTypeMeta[]>([])
  const [pokemonGroups, setPokemonGroups] = React.useState<PokemonFormForMoveEditor[]>([])
  const [selectedType, setSelectedType] = React.useState<string>('normal')
  const [moves, setMoves] = React.useState<MoveConfig[]>([])
  const [moveRecommendations, setMoveRecommendations] = React.useState<Record<string, string[]>>({})
  const [researchLevelRewards, setResearchLevelRewards] = React.useState<PokemonResearchLevelReward[]>([])
  const [researchRewardsDirty, setResearchRewardsDirty] = React.useState(false)
  const [selectedMoveId, setSelectedMoveId] = React.useState('')
  const [workingMove, setWorkingMove] = React.useState<MoveConfig | null>(null)

  const [loadingContext, setLoadingContext] = React.useState(false)
  const [loadingMoves, setLoadingMoves] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [moveSearch, setMoveSearch] = React.useState('')
  const [hideResearchUnlockedMoves, setHideResearchUnlockedMoves] = React.useState(false)
  const [formSearch, setFormSearch] = React.useState('')
  const [hideResearchAssignedLearnerForms, setHideResearchAssignedLearnerForms] = React.useState(false)
  const [bulkType, setBulkType] = React.useState(ALL_TYPES_FILTER_VALUE)
  const [researchFormId, setResearchFormId] = React.useState('')
  const [researchLevel, setResearchLevel] = React.useState(1)

  const [jsonMode, setJsonMode] = React.useState<'form' | 'json'>('form')
  const [jsonValue, setJsonValue] = React.useState('')
  const [jsonError, setJsonError] = React.useState('')
  const [aiUseJson, setAiUseJson] = React.useState('')
  const [aiUseJsonError, setAiUseJsonError] = React.useState('')
  const [runtimeEffectsJson, setRuntimeEffectsJson] = React.useState('')
  const [runtimeEffectsJsonError, setRuntimeEffectsJsonError] = React.useState('')

  const selectedMove = React.useMemo(
    () => moves.find((move) => move.id === selectedMoveId) || null,
    [moves, selectedMoveId],
  )

  const allFormIds = React.useMemo(() => {
    const ids = new Set<string>()
    for (const species of pokemonGroups) {
      for (const form of species.forms) {
        ids.add(form.id.toString())
      }
    }
    return ids
  }, [pokemonGroups])

  const pokemonFormById = React.useMemo(() => {
    const map = new Map<string, FlattenedPokemonFormForMoveEditor>()
    for (const species of pokemonGroups) {
      for (const form of species.forms) {
        map.set(form.id.toString(), {
          speciesId: species.speciesId,
          speciesName: species.speciesName,
          ...form,
        })
      }
    }
    return map
  }, [pokemonGroups])

  const selectedMoveRecommendedFormIds = React.useMemo(() => {
    if (!selectedMove?.id) return new Set<string>()
    const recommended = moveRecommendations[selectedMove.id] || []
    return new Set(recommended.filter((formId) => allFormIds.has(formId.toString())))
  }, [selectedMove?.id, moveRecommendations, allFormIds])

  const availablePokemonTypes = React.useMemo(() => {
    const typeSet = new Set<string>()
    for (const species of pokemonGroups) {
      for (const form of species.forms) {
        for (const type of form.types) {
          if (type) typeSet.add(type.toLowerCase())
        }
      }
    }

    const sortedTypes = Array.from(typeSet).sort().map((type) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    }))

    return [
      { value: ALL_TYPES_FILTER_VALUE, label: 'All' },
      { value: RECOMMENDED_TYPES_FILTER_VALUE, label: 'Recommended' },
      ...sortedTypes,
    ]
  }, [pokemonGroups])

  const workingMoveFormIds = workingMove?.formId
  const workingMoveTmItemId = workingMove?.id ? `tm-${workingMove.id}` : ''

  const selectedMoveResearchRewards = React.useMemo(() => {
    if (!workingMoveTmItemId) return []
    return researchLevelRewards
      .filter((reward) => reward.itemId === workingMoveTmItemId)
      .sort((a, b) => {
        const formCompare = sortNumericStringIds(a.formId, b.formId)
        if (formCompare !== 0) return formCompare
        return a.level - b.level
      })
  }, [researchLevelRewards, workingMoveTmItemId])

  const researchUnlockedMoveIds = React.useMemo(() => {
    const ids = new Set<string>()
    for (const reward of researchLevelRewards) {
      if (!reward.itemId.startsWith('tm-')) continue
      ids.add(reward.itemId.slice(3))
    }
    return ids
  }, [researchLevelRewards])

  const researchMoveCountByFormId = React.useMemo(() => {
    const moveIdsByFormId = new Map<string, Set<string>>()
    for (const reward of researchLevelRewards) {
      if (!reward.itemId.startsWith('tm-')) continue
      const formId = reward.formId.toString()
      const moveIds = moveIdsByFormId.get(formId) ?? new Set<string>()
      moveIds.add(reward.itemId.slice(3))
      moveIdsByFormId.set(formId, moveIds)
    }

    const counts = new Map<string, number>()
    for (const [formId, moveIds] of moveIdsByFormId) {
      counts.set(formId, moveIds.size)
    }
    return counts
  }, [researchLevelRewards])

  const usableMoveCountByFormId = React.useMemo(() => {
    const moveIdsByFormId = new Map<string, Set<string>>()
    const effectiveMoves = moves.map((move) =>
      workingMove && move.id === selectedMoveId ? workingMove : move,
    )

    for (const move of effectiveMoves) {
      const targetFormIds = move.formId ?? []
      for (const formId of targetFormIds) {
        const normalizedFormId = formId.toString()
        if (!allFormIds.has(normalizedFormId)) continue
        const moveIds = moveIdsByFormId.get(normalizedFormId) ?? new Set<string>()
        moveIds.add(move.id)
        moveIdsByFormId.set(normalizedFormId, moveIds)
      }
    }

    const counts = new Map<string, number>()
    for (const [formId, moveIds] of moveIdsByFormId) {
      counts.set(formId, moveIds.size)
    }
    return counts
  }, [allFormIds, moves, selectedMoveId, workingMove])

  const selectedFormIds = React.useMemo(() => {
    if (!workingMove || !allFormIds.size) return new Set<string>()
    return new Set((workingMoveFormIds ?? []).filter((id) => allFormIds.has(id.toString())))
  }, [workingMove?.id, workingMoveFormIds, allFormIds])

  const isAllForms = selectedFormIds.size > 0 && selectedFormIds.size === allFormIds.size

  const filteredMoves = React.useMemo(() => {
    const query = moveSearch.trim().toLowerCase()
    const matchingMoves = moves.filter((move) => {
      if (hideResearchUnlockedMoves && researchUnlockedMoveIds.has(move.id)) return false
      if (!query) return true
      return (
        move.id.toLowerCase().includes(query) ||
        move.name.toLowerCase().includes(query) ||
        move.description.toLowerCase().includes(query)
      )
    })

    return [...matchingMoves].sort((a, b) => {
      const levelCompare = (a.level ?? Number.MAX_SAFE_INTEGER) - (b.level ?? Number.MAX_SAFE_INTEGER)
      if (levelCompare !== 0) return levelCompare
      return (a.name || a.id).localeCompare(b.name || b.id)
    })
  }, [hideResearchUnlockedMoves, moveSearch, moves, researchUnlockedMoveIds])

  const filteredPokemonGroups = React.useMemo(() => {
    const query = formSearch.trim().toLowerCase()
    const targetType = bulkType.trim().toLowerCase()
    const isRecommendedFilter = targetType === RECOMMENDED_TYPES_FILTER_VALUE
    const isTypeFilterActive = targetType && targetType !== ALL_TYPES_FILTER_VALUE
    if (!query && !isTypeFilterActive && !hideResearchAssignedLearnerForms) return pokemonGroups
    if (isRecommendedFilter && !selectedMoveRecommendedFormIds.size) return []

    return pokemonGroups
      .map((species) => {
        const forms = species.forms.filter((form) => {
          if (
            hideResearchAssignedLearnerForms &&
            (researchMoveCountByFormId.get(form.id) ?? 0) > 0
          ) {
            return false
          }

          if (isTypeFilterActive) {
            if (isRecommendedFilter) {
              if (!selectedMoveRecommendedFormIds.has(form.id)) return false
            } else {
            const hasTargetType = form.types.some((type) => type.toLowerCase() === targetType)
            if (!hasTargetType) return false
            }
          }

          const haystack = [
            form.id.toLowerCase(),
            form.name.toLowerCase(),
            ...form.types.map((type) => type.toLowerCase()),
            species.speciesName.toLowerCase(),
            species.speciesId.toString(),
          ]
          return haystack.some((value) => value.includes(query))
        })
        if (forms.length > 0) {
          return { ...species, forms }
        }
        return null
      })
      .filter(Boolean) as PokemonFormForMoveEditor[]
  }, [
    formSearch,
    bulkType,
    pokemonGroups,
    hideResearchAssignedLearnerForms,
    selectedMoveRecommendedFormIds,
    researchMoveCountByFormId,
    RECOMMENDED_TYPES_FILTER_VALUE,
  ])

  const filteredPokemonForms = React.useMemo<FlattenedPokemonFormForMoveEditor[]>(() => {
    return filteredPokemonGroups.flatMap((species) =>
      species.forms.map((form) => ({
        speciesId: species.speciesId,
        speciesName: species.speciesName,
        ...form,
      })),
    )
  }, [filteredPokemonGroups])

  const researchUnlockFormOptions = React.useMemo(() => {
    const ids = workingMoveFormIds ?? []
    return ids
      .map((id) => pokemonFormById.get(id.toString()))
      .filter((form): form is FlattenedPokemonFormForMoveEditor => Boolean(form))
      .sort((a, b) => sortNumericStringIds(a.id, b.id))
  }, [pokemonFormById, workingMoveFormIds])

  const statusIds = React.useMemo(() => Object.keys(STATUS_EFFECTS).sort(), [])

  const syncMoveToList = React.useCallback(
    (move: MoveConfig, previousId?: string) => {
      const normalized = normalizeMoveForSave(move, allFormIds)
      setMoves((current) => {
        const next = [...current]
        const index = previousId
          ? next.findIndex((entry) => entry.id === previousId)
          : next.findIndex((entry) => entry.id === normalized.id)
        const duplicateIndex = next.findIndex((entry) => entry.id === normalized.id)
        if (index !== -1 && duplicateIndex !== -1 && duplicateIndex !== index) {
          return current
        }
        if (index === -1) {
          next.push(normalized)
        } else {
          next[index] = normalized
        }
        return next
      })
    },
    [allFormIds],
  )

  const commitWorkingMoveToList = React.useCallback(() => {
    if (!workingMove) return
    syncMoveToList(workingMove, selectedMoveId)
  }, [selectedMoveId, syncMoveToList, workingMove])

  const writeWorkingMove = React.useCallback(
    (move: MoveConfig | null, preserveJson = true) => {
      setWorkingMove(move)
      if (preserveJson && move) {
        setJsonValue(JSON.stringify(move, null, 2))
        setJsonError('')
        setAiUseJson(move.aiUse ? JSON.stringify(move.aiUse, null, 2) : '')
        setAiUseJsonError('')
        const runtimeEffects = pickRuntimeMoveEffects(move)
        setRuntimeEffectsJson(
          Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
        )
        setRuntimeEffectsJsonError('')
      } else if (!move) {
        setJsonValue('')
        setJsonError('')
        setAiUseJson('')
        setAiUseJsonError('')
        setRuntimeEffectsJson('')
        setRuntimeEffectsJsonError('')
      }
    },
    [],
  )

  const updateWorkingMove = React.useCallback(
    (patch: Partial<MoveConfig>) => {
      setWorkingMove((current) => {
        if (!current) return null
        const next = {
          ...current,
          ...patch,
        }
        return next
      })
    },
    [],
  )

  const updateRuntimeMoveEffects = React.useCallback(
    (patch: Partial<Pick<MoveConfig, RuntimeMoveEffectField>>) => {
      if (!workingMove) return
      const nextMove = {
        ...workingMove,
        ...patch,
      }
      const runtimeEffects = pickRuntimeMoveEffects(nextMove)

      updateWorkingMove(patch)
      setRuntimeEffectsJson(
        Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
      )
      setRuntimeEffectsJsonError('')
    },
    [updateWorkingMove, workingMove],
  )

  const handleRuntimeEffectsJsonApply = React.useCallback(() => {
    if (!workingMove) return
    const trimmed = runtimeEffectsJson.trim()
    const clearedFields = RUNTIME_MOVE_EFFECT_FIELDS.reduce((acc, field) => {
      ;(acc as Record<string, undefined>)[field] = undefined
      return acc
    }, {} as Partial<MoveConfig>)

    if (!trimmed) {
      updateWorkingMove(clearedFields)
      setRuntimeEffectsJsonError('')
      return
    }

    try {
      const parsed = JSON.parse(trimmed) as Record<string, unknown>
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        setRuntimeEffectsJsonError('Runtime effects JSON must be an object.')
        return
      }

      const unsupportedKeys = Object.keys(parsed).filter(
        (key) => !RUNTIME_MOVE_EFFECT_FIELDS.includes(key as RuntimeMoveEffectField),
      )
      if (unsupportedKeys.length) {
        setRuntimeEffectsJsonError(`Unsupported runtime field: ${unsupportedKeys.join(', ')}`)
        return
      }

      updateWorkingMove({
        ...clearedFields,
        ...(parsed as Partial<MoveConfig>),
      })
      setRuntimeEffectsJson(JSON.stringify(parsed, null, 2))
      setRuntimeEffectsJsonError('')
    } catch (error) {
      setRuntimeEffectsJsonError(error instanceof Error ? error.message : 'Invalid JSON')
    }
  }, [runtimeEffectsJson, updateWorkingMove, workingMove])

  const moveIdError = React.useMemo(() => {
    if (!workingMove) return ''
    if (!workingMove.id) return 'Move ID is required.'
    const duplicate = moves.some((move) => move.id === workingMove.id && move.id !== selectedMoveId)
    return duplicate ? 'Another move already uses this ID.' : ''
  }, [moves, selectedMoveId, workingMove])

  const handleMoveIdChange = React.useCallback(
    (value: string) => {
      if (!workingMove) return
      const nextId = normalizeMoveIdInput(value)
      updateWorkingMove({ id: nextId })
    },
    [updateWorkingMove, workingMove],
  )

  const updateAiUse = React.useCallback(
    (aiUse: MoveConfig['aiUse']) => {
      const next = aiUse
      if (!next) {
        setAiUseJson('')
      } else {
        setAiUseJson(JSON.stringify(next, null, 2))
      }
      setAiUseJsonError('')
      updateWorkingMove({ aiUse: next })
    },
    [updateWorkingMove],
  )

  const updateAiUseConfig = React.useCallback(
    (patcher: (config: NonNullable<MoveConfig['aiUse']>) => NonNullable<MoveConfig['aiUse']>) => {
      if (!workingMove) return

      const next = patcher(workingMove.aiUse ? { ...workingMove.aiUse } : makeDefaultAiUseConfig())
      updateAiUse(next)
    },
    [updateAiUse, workingMove],
  )

  const handleAiUseToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateAiUse(undefined)
      return
    }

    const next = workingMove.aiUse ?? makeDefaultAiUseConfig()
    updateAiUse(next)
  }

  const handleAiUseChance = (value: string) => {
    updateAiUseConfig((current) => {
      const chance = parseNumericValue(value)
      if (chance === undefined) {
        delete current.chance
        return current
      }

      return {
        ...current,
        chance,
      }
    })
  }

  const handleAiUseMode = (mode: string) => {
    if (mode !== 'all' && mode !== 'any') return
    updateAiUseConfig((current) => ({
      ...current,
      mode: mode as AiUseMode,
    }))
  }

  const handleAiUseConditionChange = (
    index: number,
    nextCondition: AiCondition,
  ) => {
    updateAiUseConfig((current) => {
      const nextConditions = (current.conditions ?? []).map((condition, conditionIndex) =>
        conditionIndex === index ? nextCondition : condition,
      )
      return {
        ...current,
        conditions: nextConditions,
      }
    })
  }

  const handleAiUseConditionRemove = (index: number) => {
    updateAiUseConfig((current) => {
      const nextConditions = (current.conditions ?? []).filter((_, conditionIndex) => conditionIndex !== index)
      return {
        ...current,
        conditions: nextConditions.length ? nextConditions : undefined,
      }
    })
  }

  const handleAiUseConditionAdd = (type: AiConditionType = 'hp-at-or-below') => {
    updateAiUseConfig((current) => {
      const nextConditions = [...(current.conditions ?? [])]
      nextConditions.push(makeConditionFromType(type))
      return {
        ...current,
        conditions: nextConditions,
      }
    })
  }

  const handleAiUseConditionTypeChange = (
    index: number,
    type: AiConditionType,
  ) => {
    handleAiUseConditionChange(index, makeConditionFromType(type))
  }

  const handleAiUseConditionGroupChange = (
    groupIndex: number,
    nextGroup: AiConditionGroup,
  ) => {
    updateAiUseConfig((current) => {
      const nextGroups = (current.conditionGroups ?? []).map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              ...nextGroup,
            }
          : group,
      )
      return {
        ...current,
        conditionGroups: nextGroups.length ? nextGroups : undefined,
      }
    })
  }

  const handleAiUseConditionGroupRemove = (groupIndex: number) => {
    updateAiUseConfig((current) => {
      const nextGroups = (current.conditionGroups ?? []).filter((_, index) => index !== groupIndex)
      return {
        ...current,
        conditionGroups: nextGroups.length ? nextGroups : undefined,
      }
    })
  }

  const handleAiUseConditionGroupAdd = () => {
    updateAiUseConfig((current) => {
      const groups = [...(current.conditionGroups ?? [])]
      groups.push({
        conditions: [makeConditionFromType('opponent-used-move')],
        chance: 100,
        mode: 'all',
      })
      return {
        ...current,
        conditionGroups: groups,
      }
    })
  }

  const handleAiUseConditionGroupMode = (groupIndex: number, mode: string) => {
    if (mode !== 'all' && mode !== 'any') return
    updateAiUseConfig((current) => {
      const nextGroups = (current.conditionGroups ?? []).map((group, index) =>
        index === groupIndex ? { ...group, mode: mode as AiUseMode } : group,
      )
      return {
        ...current,
        conditionGroups: nextGroups,
      }
    })
  }

  const handleAiUseConditionGroupChance = (groupIndex: number, value: string) => {
    updateAiUseConfig((current) => {
      const chance = parseNumericValue(value)
      const nextGroups = (current.conditionGroups ?? []).map((group, index) => {
        if (index !== groupIndex) return group
        if (chance === undefined) {
          const nextGroup = { ...group }
          delete nextGroup.chance
          return nextGroup
        }
        return {
          ...group,
          chance,
        }
      })

      return {
        ...current,
        conditionGroups: nextGroups,
      }
    })
  }

  const handleAiUseConditionGroupConditionAdd = (groupIndex: number) => {
    updateAiUseConfig((current) => {
      const nextGroups = (current.conditionGroups ?? []).map((group, index) => {
        if (index !== groupIndex) return group
        const nextConditions = [...(group.conditions || []), makeConditionFromType('hp-at-or-below')]
        return {
          ...group,
          conditions: nextConditions,
        }
      })

      return {
        ...current,
        conditionGroups: nextGroups,
      }
    })
  }

  const handleAiUseConditionGroupConditionChange = (
    groupIndex: number,
    conditionIndex: number,
    nextCondition: AiCondition,
  ) => {
    updateAiUseConfig((current) => {
      const nextGroups = (current.conditionGroups ?? []).map((group, currentGroupIndex) => {
        if (currentGroupIndex !== groupIndex) return group
        const nextConditions = (group.conditions || []).map((condition, currentConditionIndex) =>
          currentConditionIndex === conditionIndex ? nextCondition : condition,
        )
        return {
          ...group,
          conditions: nextConditions,
        }
      })

      return {
        ...current,
        conditionGroups: nextGroups,
      }
    })
  }

  const handleAiUseConditionGroupConditionTypeChange = (
    groupIndex: number,
    conditionIndex: number,
    type: AiConditionType,
  ) => {
    handleAiUseConditionGroupConditionChange(groupIndex, conditionIndex, makeConditionFromType(type))
  }

  const handleAiUseConditionGroupConditionRemove = (groupIndex: number, conditionIndex: number) => {
    updateAiUseConfig((current) => {
      const nextGroups = (current.conditionGroups ?? []).map((group, currentGroupIndex) => {
        if (currentGroupIndex !== groupIndex) return group
        const nextConditions = (group.conditions || []).filter((_, currentConditionIndex) => currentConditionIndex !== conditionIndex)
        return {
          ...group,
          conditions: nextConditions,
        }
      })

      return {
        ...current,
        conditionGroups: nextGroups,
      }
    })
  }

  const applyAiUseJson = () => {
    if (!workingMove) return

    if (!aiUseJson.trim()) {
      updateAiUse(undefined)
      return
    }

    try {
      const parsed = JSON.parse(aiUseJson)
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('AI rules must be an object')
      }
      const next = parsed as MoveConfig['aiUse']
      updateAiUse(next)
      setAiUseJsonError('')
      toast.success('AI rules JSON applied')
    } catch (error) {
      const message = (error as Error).message
      setAiUseJsonError(message)
      toast.error(`Invalid AI rules JSON: ${message}`)
    }
  }

  const handleSecondaryStatusesToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({ secondaryStatuses: undefined })
      return
    }

    const next = workingMove.secondaryStatuses ?? [makeDefaultSecondaryStatus()]
    updateWorkingMove({ secondaryStatuses: next })
  }

  const updateSecondaryStatuses = (nextStatuses: MoveSecondaryStatusConfig[]) => {
    updateWorkingMove({
      secondaryStatuses: nextStatuses.length ? nextStatuses : undefined,
    })
  }

  const handleAddSecondaryStatus = () => {
    if (!workingMove) return
    const statuses = workingMove.secondaryStatuses ?? []
    updateSecondaryStatuses([...statuses, makeDefaultSecondaryStatus(statuses.length + 1)])
  }

  const handleUpdateSecondaryStatus = (
    index: number,
    patch: Partial<MoveSecondaryStatusConfig>,
  ) => {
    if (!workingMove?.secondaryStatuses) return
    const statuses = [...workingMove.secondaryStatuses]
    const current = statuses[index]
    if (!current) return

    const nextStatus: MoveSecondaryStatusConfig = {
      ...current,
      ...patch,
    }

    if ('name' in patch && !patch.name) {
      delete nextStatus.name
    }
    if ('chance' in patch && patch.chance === undefined) {
      delete nextStatus.chance
    }
    if ('turns' in patch && patch.turns === undefined) {
      delete nextStatus.turns
    }

    statuses[index] = nextStatus
    updateSecondaryStatuses(statuses)
  }

  const handleRemoveSecondaryStatus = (index: number) => {
    if (!workingMove?.secondaryStatuses) return
    updateSecondaryStatuses(
      workingMove.secondaryStatuses.filter((_, currentIndex) => currentIndex !== index),
    )
  }

  const handleSecondaryStatusTriggerToggle = (
    statusIndex: number,
    trigger: SecondaryStatusTrigger,
    checked: boolean,
  ) => {
    const current = workingMove?.secondaryStatuses?.[statusIndex]
    if (!current) return

    const triggers = checked
      ? Array.from(new Set([...current.triggers, trigger]))
      : current.triggers.filter((value) => value !== trigger)

    handleUpdateSecondaryStatus(statusIndex, { triggers })
  }

  const handleSecondaryStatusTurnsMode = (
    statusIndex: number,
    mode: 'none' | 'fixed' | 'range',
  ) => {
    if (mode === 'none') {
      handleUpdateSecondaryStatus(statusIndex, { turns: undefined })
      return
    }

    if (mode === 'fixed') {
      handleUpdateSecondaryStatus(statusIndex, { turns: 3 })
      return
    }

    handleUpdateSecondaryStatus(statusIndex, { turns: { min: 3, max: 5 } })
  }

  const handleSecondaryStatusTurnsValue = (
    statusIndex: number,
    field: 'fixed' | 'min' | 'max',
    value: string,
  ) => {
    const currentTurns = workingMove?.secondaryStatuses?.[statusIndex]?.turns
    const parsed = parseNumericValue(value)

    if (field === 'fixed') {
      handleUpdateSecondaryStatus(statusIndex, { turns: parsed })
      return
    }

    const currentRange = isSecondaryStatusTurnRange(currentTurns)
      ? currentTurns
      : { min: 3, max: 5 }

    handleUpdateSecondaryStatus(statusIndex, {
      turns: {
        ...currentRange,
        [field]: parsed ?? currentRange[field],
      },
    })
  }

  const handleAddSecondaryStatusEffect = (
    statusIndex: number,
    type: SecondaryStatusEffectType = 'damage',
  ) => {
    const current = workingMove?.secondaryStatuses?.[statusIndex]
    if (!current) return

    handleUpdateSecondaryStatus(statusIndex, {
      effects: [...current.effects, makeDefaultSecondaryStatusEffect(type)],
    })
  }

  const handleUpdateSecondaryStatusEffect = (
    statusIndex: number,
    effectIndex: number,
    patcher: (effect: SecondaryStatusEffect) => SecondaryStatusEffect,
  ) => {
    const current = workingMove?.secondaryStatuses?.[statusIndex]
    if (!current) return

    const effects = [...current.effects]
    const effect = effects[effectIndex]
    if (!effect) return

    effects[effectIndex] = patcher(effect)
    handleUpdateSecondaryStatus(statusIndex, { effects })
  }

  const handleSecondaryStatusEffectType = (
    statusIndex: number,
    effectIndex: number,
    type: SecondaryStatusEffectType,
  ) => {
    handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, () =>
      makeDefaultSecondaryStatusEffect(type),
    )
  }

  const handleRemoveSecondaryStatusEffect = (statusIndex: number, effectIndex: number) => {
    const current = workingMove?.secondaryStatuses?.[statusIndex]
    if (!current) return

    const effects = current.effects.filter((_, currentIndex) => currentIndex !== effectIndex)
    handleUpdateSecondaryStatus(statusIndex, {
      effects: effects.length ? effects : [makeDefaultSecondaryStatusEffect('damage')],
    })
  }

  const handleDamageRangeField = (field: 'min' | 'max', value: string) => {
    if (!workingMove) return

    let min = workingMove.damageRange?.min
    let max = workingMove.damageRange?.max

    if (value === '') {
      if (field === 'min') {
        min = undefined
      } else {
        max = undefined
      }
    } else {
      const numberValue = Number(value)
      if (Number.isNaN(numberValue)) return

      if (field === 'min') {
        min = numberValue
        if (max === undefined) {
          max = numberValue
        }
      } else {
        max = numberValue
        if (min === undefined) {
          min = numberValue
        }
      }
    }

    if (min === undefined || max === undefined) {
      updateWorkingMove({ damageRange: undefined })
      return
    }

    updateWorkingMove({
      damageRange: {
        min,
        max,
      },
    })
  }

  const handleChargedValue = (value: string) => {
    if (!workingMove) return

    const parsed = parseNumericValue(value)
    updateWorkingMove({
      charged:
        parsed === undefined || parsed <= 0
          ? undefined
          : Math.max(1, Math.floor(parsed)),
    })
  }

  const handleRechargeValue = (value: string) => {
    if (!workingMove) return

    const parsed = parseNumericValue(value)
    updateWorkingMove({
      recharge:
        parsed === undefined || parsed <= 0
          ? undefined
          : Math.max(1, Math.floor(parsed)),
    })
  }

  const handleContinuousToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({
        continuous: undefined,
        repeatDamage: undefined,
        continuousEnd: undefined,
      })
      return
    }

    updateWorkingMove({
      continuous: workingMove.continuous ?? { min: 2, max: 3 },
    })
  }

  const handleContinuousField = (
    field: keyof ContinuousConfig,
    value: string,
  ) => {
    if (!workingMove) return

    const parsed = parseNumericValue(value)
    const current = workingMove.continuous ?? { min: 2, max: 3 }
    let min = current.min
    let max = current.max

    if (parsed === undefined || parsed <= 0) {
      if (field === 'min') {
        min = 1
      } else {
        max = min
      }
    } else if (field === 'min') {
      min = Math.max(1, Math.floor(parsed))
      max = Math.max(min, max)
    } else {
      max = Math.max(min, Math.floor(parsed))
    }

    updateWorkingMove({ continuous: { min, max } })
  }

  const handleRepeatDamageToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({ repeatDamage: undefined })
      return
    }

    updateWorkingMove({
      repeatDamage: workingMove.repeatDamage ?? { perUsePercent: 100, maxUses: 5 },
    })
  }

  const handleRepeatDamageField = (
    field: keyof RepeatDamageConfig,
    value: string,
  ) => {
    if (!workingMove) return

    const parsed = parseNumericValue(value)
    const current = workingMove.repeatDamage ?? { perUsePercent: 100, maxUses: 5 }
    const next: RepeatDamageConfig = { ...current }

    if (field === 'perUsePercent') {
      next.perUsePercent = parsed ?? 0
    } else if (parsed === undefined || parsed <= 0) {
      delete next.maxUses
    } else {
      next.maxUses = Math.max(1, Math.floor(parsed))
    }

    updateWorkingMove({ repeatDamage: next })
  }

  const handleContinuousEndStatusToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({ continuousEnd: undefined })
      return
    }

    updateWorkingMove({
      continuousEnd: workingMove.continuousEnd ?? {
        status: { id: 'confusion', chance: 100, target: 'self' },
      },
    })
  }

  const handleContinuousEndStatusField = (
    field: 'id' | 'chance' | 'target' | 'forceStatus',
    value: string | boolean,
  ) => {
    if (!workingMove) return

    const currentStatus = workingMove.continuousEnd?.status ?? {
      id: 'confusion' as const,
      chance: 100,
      target: 'self' as const,
    }
    const nextStatus = { ...currentStatus }

    if (field === 'id' && typeof value === 'string') {
      nextStatus.id = value as typeof nextStatus.id
    } else if (field === 'chance' && typeof value === 'string') {
      nextStatus.chance = parseNumericValue(value)
    } else if (field === 'target' && typeof value === 'string') {
      nextStatus.target = value === 'enemy' ? 'enemy' : 'self'
    } else if (field === 'forceStatus' && typeof value === 'boolean') {
      nextStatus.forceStatus = value || undefined
    }

    updateWorkingMove({ continuousEnd: { status: nextStatus } })
  }

  const handleAddDamageByDefenderType = () => {
    if (!workingMove) return

    const current = workingMove.damageByDefenderType ?? {}
    const nextType = SECONDARY_STATUS_ATTACK_TYPES.find((type) => current[type] === undefined)
    if (!nextType) return

    updateWorkingMove({
      damageByDefenderType: {
        ...current,
        [nextType]: workingMove.damage || 1,
      },
    })
  }

  const handleUpdateDamageByDefenderType = (
    previousType: string,
    nextType: string,
    value: number | undefined,
  ) => {
    if (!workingMove) return

    const next = { ...(workingMove.damageByDefenderType ?? {}) } as Record<string, number>
    delete next[previousType]

    if (value !== undefined) {
      next[nextType] = value
    }

    updateWorkingMove({
      damageByDefenderType: Object.keys(next).length
        ? (next as MoveConfig['damageByDefenderType'])
        : undefined,
    })
  }

  const handleRemoveDamageByDefenderType = (type: string) => {
    if (!workingMove?.damageByDefenderType) return

    const next = { ...workingMove.damageByDefenderType } as Record<string, number>
    delete next[type]

    updateWorkingMove({
      damageByDefenderType: Object.keys(next).length
        ? (next as MoveConfig['damageByDefenderType'])
        : undefined,
    })
  }

  const handleSelfDamageToggle = (checked: boolean) => {
    if (!workingMove) return
    if (!checked) {
      updateWorkingMove({ selfDamage: undefined })
      return
    }

    const next: SelfDamageConfig = workingMove.selfDamage
      ? { ...workingMove.selfDamage }
      : { chance: 100, fraction: 8 }

    updateWorkingMove({ selfDamage: next })
  }

  const handleSelfDamageValue = (field: keyof SelfDamageConfig, value: string) => {
    if (!workingMove?.selfDamage) return

    const parsed = parseNumericValue(value)
    const next: SelfDamageConfig = {
      ...workingMove.selfDamage,
    }

    if (parsed === undefined) {
      delete next[field]
    } else {
      next[field] = parsed
    }

    if (next.chance === undefined && next.fraction === undefined) {
      updateWorkingMove({ selfDamage: undefined })
      return
    }

    updateWorkingMove({ selfDamage: next })
  }

  const handleInterruptEnemyMoveToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({ interruptEnemyMove: undefined })
      return
    }

    const nextChance = typeof workingMove.interruptEnemyMove === 'number'
      ? workingMove.interruptEnemyMove
      : 100
    updateWorkingMove({ interruptEnemyMove: nextChance })
  }

  const handleInterruptEnemyMoveChance = (value: string) => {
    if (!workingMove) return

    const parsed = parseNumericValue(value)
    if (parsed === undefined) {
      updateWorkingMove({ interruptEnemyMove: undefined })
      return
    }

    updateWorkingMove({ interruptEnemyMove: Math.max(0, Math.min(100, parsed)) })
  }

  const handleCalledMoveMode = (value: string) => {
    const calledMove = CALLED_MOVE_MODES.includes(value as CalledMoveConfig['mode'])
      ? { mode: value as CalledMoveConfig['mode'] }
      : undefined
    updateRuntimeMoveEffects({ calledMove })
  }

  const handleCalledMoveExcludeSelf = (checked: boolean) => {
    if (!workingMove?.calledMove) return
    updateRuntimeMoveEffects({
      calledMove: {
        ...workingMove.calledMove,
        excludeSelf: checked || undefined,
      },
    })
  }

  const handleDamageRuleType = (value: string) => {
    const damageRule = DAMAGE_RULE_TYPES.includes(value as DamageRuleConfig['type'])
      ? makeDamageRuleFromType(value as DamageRuleConfig['type'])
      : undefined
    updateRuntimeMoveEffects({ damageRule })
  }

  const handleDamageRuleNumber = (field: 'amount' | 'percent' | 'multiplier' | 'perMemberDamage', value: string) => {
    if (!workingMove?.damageRule) return
    const parsed = parseNumericValue(value)
    updateRuntimeMoveEffects({
      damageRule: {
        ...workingMove.damageRule,
        [field]: parsed ?? 0,
      } as DamageRuleConfig,
    })
  }

  const handleDamageRuleLowerLevel = (checked: boolean) => {
    if (workingMove?.damageRule?.type !== 'ohko') return
    updateRuntimeMoveEffects({
      damageRule: {
        ...workingMove.damageRule,
        failIfUserLowerLevel: checked || undefined,
      },
    })
  }

  const handleDelayedDamageToggle = (checked: boolean) => {
    const delayedDamage: DelayedDamageConfig | undefined = checked
      ? workingMove?.delayedDamage ?? { turns: 2, damage: Math.max(1, workingMove?.damage || 1) }
      : undefined
    updateRuntimeMoveEffects({ delayedDamage })
  }

  const handleDelayedDamageNumber = (field: keyof DelayedDamageConfig, value: string) => {
    if (!workingMove?.delayedDamage) return
    updateRuntimeMoveEffects({
      delayedDamage: {
        ...workingMove.delayedDamage,
        [field]: Math.max(1, parseNumericValue(value) ?? 1),
      },
    })
  }

  const handleDynamicTypeType = (value: string) => {
    const dynamicType = DYNAMIC_TYPE_TYPES.includes(value as DynamicTypeConfig['type'])
      ? makeDynamicTypeFromType(value as DynamicTypeConfig['type'])
      : undefined
    updateRuntimeMoveEffects({ dynamicType })
  }

  const handleDynamicTypeFallback = (fallbackType: string) => {
    if (!workingMove?.dynamicType) return
    updateRuntimeMoveEffects({
      dynamicType: {
        ...workingMove.dynamicType,
        fallbackType: fallbackType === 'none' ? undefined : fallbackType as DynamicTypeConfig['fallbackType'],
      } as DynamicTypeConfig,
    })
  }

  const handleWeatherDamageMultiplierEnabled = (checked: boolean) => {
    updateRuntimeMoveEffects({
      weatherDamageMultiplier: checked
        ? {
            multiplier: workingMove?.weatherDamageMultiplier?.multiplier ?? 2,
          }
        : undefined,
    })
  }

  const handleWeatherDamageMultiplierValue = (value: string) => {
    if (!workingMove?.weatherDamageMultiplier) return
    const parsed = parseNumericValue(value)
    updateRuntimeMoveEffects({
      weatherDamageMultiplier: {
        ...workingMove.weatherDamageMultiplier,
        multiplier: parsed ?? 1,
      } as WeatherDamageMultiplierConfig,
    })
  }

  const handleItemUseEffectType = (value: string) => {
    const itemUseEffect = ITEM_USE_EFFECT_TYPES.includes(value as ItemUseEffectConfig['type'])
      ? makeItemUseEffectFromType(value as ItemUseEffectConfig['type'])
      : undefined
    updateRuntimeMoveEffects({ itemUseEffect })
  }

  const handleItemUseEffectAmount = (value: string) => {
    if (!workingMove?.itemUseEffect) return
    updateRuntimeMoveEffects({
      itemUseEffect: {
        ...workingMove.itemUseEffect,
        amount: Math.max(0, parseNumericValue(value) ?? 0),
      } as ItemUseEffectConfig,
    })
  }

  const handleItemUseEffectFailIfUnavailable = (checked: boolean) => {
    if (workingMove?.itemUseEffect?.type !== 'consume-self') return
    updateRuntimeMoveEffects({
      itemUseEffect: {
        ...workingMove.itemUseEffect,
        failIfUnavailable: checked || undefined,
      },
    })
  }

  const handleHeldItemEffectType = (value: string) => {
    if (!workingMove) return

    let heldItemEffect: MoveHeldItemEffect | undefined
    if (value === 'consume-berries') {
      heldItemEffect = { type: value, target: 'both' }
    } else if (
      value === 'bestow' ||
      value === 'remove-target' ||
      value === 'steal-target' ||
      value === 'swap' ||
      value === 'recycle' ||
      value === 'consume-self'
    ) {
      heldItemEffect = { type: value }
    }
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      heldItemEffect,
    })

    updateWorkingMove({
      heldItemEffect,
    })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleStatusCureMode = (value: string) => {
    const [target, mode] = value.split(':') as [StatusCureConfig['target'], 'all' | 'specific']
    const statusCure: StatusCureConfig | undefined =
      target === 'self' || target === 'enemy' || target === 'ally-party'
        ? {
            target,
            statuses: mode === 'specific' ? ['confusion' as const] : 'all',
            healUserPercent: workingMove?.statusCure?.healUserPercent,
            failIfNoStatus: workingMove?.statusCure?.failIfNoStatus,
          }
        : undefined
    updateRuntimeMoveEffects({ statusCure })
  }

  const handleStatusCureStatusToggle = (statusId: string, checked: boolean) => {
    if (!workingMove?.statusCure || workingMove.statusCure.statuses === 'all') return
    const typedStatusId = statusId as StatusEffectId
    const statuses = checked
      ? Array.from(new Set([...workingMove.statusCure.statuses, typedStatusId]))
      : workingMove.statusCure.statuses.filter((entry) => entry !== typedStatusId)
    updateRuntimeMoveEffects({
      statusCure: {
        ...workingMove.statusCure,
        statuses: statuses.length ? statuses : ['confusion'],
      },
    })
  }

  const handleStatusTransferMode = (value: string) => {
    const statusTransfer: StatusTransferConfig | undefined =
      value === 'self:enemy:all' || value === 'self:enemy:specific'
        ? {
            from: 'self',
            to: 'enemy',
            statuses: value.endsWith(':specific') ? ['confusion' as const] : 'all',
            clearSourceOnSuccess: workingMove?.statusTransfer?.clearSourceOnSuccess ?? true,
            failIfNoStatus: workingMove?.statusTransfer?.failIfNoStatus,
          }
        : undefined
    updateRuntimeMoveEffects({ statusTransfer })
  }

  const handleStatusTransferStatusToggle = (statusId: string, checked: boolean) => {
    if (!workingMove?.statusTransfer || workingMove.statusTransfer.statuses === 'all') return
    const typedStatusId = statusId as StatusEffectId
    const statuses = checked
      ? Array.from(new Set([...workingMove.statusTransfer.statuses, typedStatusId]))
      : workingMove.statusTransfer.statuses.filter((entry) => entry !== typedStatusId)
    updateRuntimeMoveEffects({
      statusTransfer: {
        ...workingMove.statusTransfer,
        statuses: statuses.length ? statuses : ['confusion'],
      },
    })
  }

  const handleSecondaryStatusCureTarget = (value: string) => {
    const secondaryStatusCure: SecondaryStatusCureConfig | undefined =
      value === 'self' || value === 'enemy' || value === 'both'
        ? {
            target: value as SecondaryStatusCureConfig['target'],
            scope: workingMove?.secondaryStatusCure?.scope,
            ids: workingMove?.secondaryStatusCure?.ids,
          }
        : undefined
    updateRuntimeMoveEffects({ secondaryStatusCure })
  }

  const handleSecondaryStatusCureScope = (value: string) => {
    if (!workingMove?.secondaryStatusCure) return
    const scope =
      value === 'side' || value === 'pokemon-and-side'
        ? value
        : value === 'pokemon'
          ? value
          : undefined
    updateRuntimeMoveEffects({
      secondaryStatusCure: {
        ...workingMove.secondaryStatusCure,
        scope,
      },
    })
  }

  const handleSecondaryStatusCureIds = (value: string) => {
    if (!workingMove?.secondaryStatusCure) return
    const ids = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
    updateRuntimeMoveEffects({
      secondaryStatusCure: {
        ...workingMove.secondaryStatusCure,
        ids: ids.length ? ids : undefined,
      },
    })
  }

  const handlePartyReviveToggle = (checked: boolean) => {
    const partyRevive: PartyReviveConfig | undefined = checked
      ? workingMove?.partyRevive ?? { target: 'ally-party', hpPercent: 50 }
      : undefined
    updateRuntimeMoveEffects({ partyRevive })
  }

  const handlePartyReviveHpPercent = (value: string) => {
    if (!workingMove?.partyRevive) return
    updateRuntimeMoveEffects({
      partyRevive: {
        ...workingMove.partyRevive,
        hpPercent: Math.max(1, parseNumericValue(value) ?? 1),
      },
    })
  }

  const handleSwitchEffectType = (value: string) => {
    const switchEffect = SWITCH_EFFECT_TYPES.includes(value as SwitchEffectConfig['type'])
      ? { type: value as SwitchEffectConfig['type'] }
      : undefined
    updateRuntimeMoveEffects({ switchEffect })
  }

  const handleSwitchEffectPassStages = (checked: boolean) => {
    if (workingMove?.switchEffect?.type !== 'self-pending') return
    updateRuntimeMoveEffects({
      switchEffect: {
        ...workingMove.switchEffect,
        passStatStages: checked || undefined,
      },
    })
  }

  const handleBattleRewardsToggle = (checked: boolean) => {
    const battleRewards: BattleRewardsConfig | undefined = checked
      ? workingMove?.battleRewards ?? {
          rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: 30, dropChance: 100 }],
        }
      : undefined
    updateRuntimeMoveEffects({ battleRewards })
  }

  const handleBattleRewardField = (
    field: 'type' | 'targetId' | 'quantity' | 'dropChance' | 'guaranteed',
    value: string | boolean,
  ) => {
    const currentReward = workingMove?.battleRewards?.rewards[0]
    if (!currentReward) return

    const nextReward = { ...currentReward }
    if (field === 'quantity' && typeof value === 'string') {
      nextReward.quantity = parseNumericValue(value) ?? 0
    } else if (field === 'dropChance' && typeof value === 'string') {
      nextReward.dropChance = parseNumericValue(value)
    } else if (field === 'guaranteed' && typeof value === 'boolean') {
      nextReward.guaranteed = value || undefined
    } else if ((field === 'type' || field === 'targetId') && typeof value === 'string') {
      ;(nextReward as Record<string, unknown>)[field] = value
    }

    updateRuntimeMoveEffects({
      battleRewards: {
        rewards: [nextReward],
      },
    })
  }

  const handleNextDamageModifierToggle = (checked: boolean) => {
    if (!workingMove) return

    const nextDamageModifier = checked
      ? workingMove.nextDamageModifier ?? { percent: 60 }
      : undefined
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      nextDamageModifier,
    })

    updateWorkingMove({ nextDamageModifier })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleNextDamageModifierField = (
    field: keyof NextDamageModifierConfig,
    value: string,
  ) => {
    if (!workingMove?.nextDamageModifier) return

    const nextDamageModifier: NextDamageModifierConfig = {
      ...workingMove.nextDamageModifier,
    }

    if (field === 'target') {
      nextDamageModifier.target = value === 'enemy' ? 'enemy' : value === 'self' ? 'self' : undefined
    } else {
      const parsed = parseNumericValue(value)
      if (field === 'percent') {
        nextDamageModifier.percent = parsed ?? 0
      } else if (parsed === undefined || parsed <= 0) {
        delete nextDamageModifier.uses
      } else {
        nextDamageModifier.uses = Math.max(1, Math.floor(parsed))
      }
    }

    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      nextDamageModifier,
    })

    updateWorkingMove({ nextDamageModifier })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleConditionalDamageModifierAdd = (type: ConditionalDamageModifierConfig['type']) => {
    if (!CONDITIONAL_DAMAGE_MODIFIER_TYPES.includes(type)) return
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: [
        ...(workingMove?.conditionalDamageModifiers ?? []),
        makeConditionalDamageModifierFromType(type),
      ],
    })
  }

  const handleConditionalDamageModifierRemove = (index: number) => {
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).filter(
      (_, modifierIndex) => modifierIndex !== index,
    )
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierType = (
    index: number,
    type: ConditionalDamageModifierConfig['type'],
  ) => {
    if (!CONDITIONAL_DAMAGE_MODIFIER_TYPES.includes(type)) return
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) =>
      modifierIndex === index ? makeConditionalDamageModifierFromType(type) : modifier,
    )
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierNumber = (
    index: number,
    field:
      | 'multiplier'
      | 'uses'
      | 'percent'
      | 'multiplierAtFullHp'
      | 'minimumMultiplier'
      | 'chance'
      | 'baseMultiplier'
      | 'perFaintedMultiplier',
    value: string,
  ) => {
    const parsed = parseNumericValue(value)
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) => {
      if (modifierIndex !== index) return modifier
      if (field === 'uses' && modifier.type === 'remaining-move-uses-at-or-below') {
        return { ...modifier, uses: Math.max(0, Math.floor(parsed ?? 0)) }
      }
      if (field === 'percent' && modifier.type === 'target-current-hp-at-or-below-percent') {
        return { ...modifier, percent: Math.max(0, Math.min(100, parsed ?? 0)) }
      }
      if (field === 'chance' && modifier.type === 'chance') {
        return { ...modifier, chance: Math.max(0, Math.min(100, parsed ?? 0)) }
      }
      if (field === 'multiplierAtFullHp' && modifier.type === 'user-current-hp-percent') {
        return { ...modifier, multiplierAtFullHp: parsed ?? 0 }
      }
      if (field === 'minimumMultiplier' && modifier.type === 'user-current-hp-percent') {
        return { ...modifier, minimumMultiplier: parsed ?? undefined }
      }
      if (field === 'baseMultiplier' && modifier.type === 'fainted-party-members') {
        return { ...modifier, baseMultiplier: parsed ?? undefined }
      }
      if (field === 'perFaintedMultiplier' && modifier.type === 'fainted-party-members') {
        return { ...modifier, perFaintedMultiplier: parsed ?? 0 }
      }
      if (field === 'multiplier') {
        if (
          modifier.type === 'user-current-hp-percent' ||
          modifier.type === 'fainted-party-members'
        ) return modifier
        return { ...modifier, multiplier: parsed ?? 0 } as ConditionalDamageModifierConfig
      }
      return modifier
    })
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierStatuses = (
    index: number,
    value: string,
  ) => {
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) => {
      if (modifierIndex !== index) return modifier
      if (modifier.type !== 'user-status' && modifier.type !== 'target-status') return modifier
      const statuses = value
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean) as StatusEffectId[]
      return {
        ...modifier,
        statuses: statuses.length ? statuses : 'all',
      } as ConditionalDamageModifierConfig
    })
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierWeather = (
    index: number,
    value: string,
  ) => {
    const weather: WeatherType[] = value
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry): entry is WeatherType =>
        MOVE_WEATHER_TYPES.includes(entry as (typeof MOVE_WEATHER_TYPES)[number]),
      )
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) => {
      if (modifierIndex !== index || modifier.type !== 'weather') return modifier
      return {
        ...modifier,
        weather: weather.length ? weather : ['rain'],
      } as ConditionalDamageModifierConfig
    })
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierPokemonTypes = (
    index: number,
    value: string,
  ) => {
    const pokemonTypes = value
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry): entry is PokemonTypeName =>
        MOVE_TYPE_CHANGE_TYPES.includes(entry as PokemonTypeName),
      )
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) => {
      if (modifierIndex !== index || modifier.type !== 'target-pokemon-type') return modifier
      return {
        ...modifier,
        pokemonTypes: pokemonTypes.length ? pokemonTypes : ['water'],
      } as ConditionalDamageModifierConfig
    })
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierMoveIds = (
    index: number,
    value: string,
  ) => {
    const moveIds = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) => {
      if (modifierIndex !== index || modifier.type !== 'user-previous-successful-move') return modifier
      return {
        ...modifier,
        moveIds,
      } as ConditionalDamageModifierConfig
    })
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleConditionalDamageModifierInvert = (
    index: number,
    checked: boolean,
  ) => {
    const nextModifiers = (workingMove?.conditionalDamageModifiers ?? []).map((modifier, modifierIndex) => {
      if (modifierIndex !== index || modifier.type !== 'user-current-hp-percent') return modifier
      return {
        ...modifier,
        invert: checked || undefined,
      }
    })
    updateRuntimeMoveEffects({
      conditionalDamageModifiers: nextModifiers.length ? nextModifiers : undefined,
    })
  }

  const handleIgnoreDefenderStatStages = (checked: boolean) => {
    updateRuntimeMoveEffects({ ignoreDefenderStatStages: checked || undefined })
  }

  const handleNextAccuracyBypassTarget = (value: string) => {
    const nextAccuracyBypass = NEXT_ACCURACY_BYPASS_TARGETS.includes(value as NextAccuracyBypassConfig['target'])
      ? {
          target: value as NextAccuracyBypassConfig['target'],
          uses: workingMove?.nextAccuracyBypass?.uses,
        }
      : undefined
    updateRuntimeMoveEffects({ nextAccuracyBypass })
  }

  const handleNextAccuracyBypassUses = (value: string) => {
    if (!workingMove?.nextAccuracyBypass) return
    const parsed = parseNumericValue(value)
    updateRuntimeMoveEffects({
      nextAccuracyBypass: {
        ...workingMove.nextAccuracyBypass,
        uses: parsed === undefined || parsed <= 0 ? undefined : Math.max(1, Math.floor(parsed)),
      },
    })
  }

  const handlePostDamageStatusCureTarget = (value: string) => {
    const postDamageStatusCure = POST_DAMAGE_STATUS_CURE_TARGETS.includes(value as PostDamageStatusCureConfig['target'])
      ? {
          target: value as PostDamageStatusCureConfig['target'],
          statuses: workingMove?.postDamageStatusCure?.statuses ?? 'all',
        }
      : undefined
    updateRuntimeMoveEffects({ postDamageStatusCure })
  }

  const handlePostDamageStatusCureStatuses = (value: string) => {
    if (!workingMove?.postDamageStatusCure) return
    const statuses = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean) as StatusEffectId[]
    updateRuntimeMoveEffects({
      postDamageStatusCure: {
        ...workingMove.postDamageStatusCure,
        statuses: statuses.length ? statuses : 'all',
      },
    })
  }

  const handlePostDamageStatStageTarget = (value: string) => {
    const postDamageStatStage = POST_DAMAGE_STAT_STAGE_TARGETS.includes(
      value as NonNullable<PostDamageStatStageConfig['target']>,
    )
      ? {
          condition: 'target-ko' as const,
          stat: workingMove?.postDamageStatStage?.stat ?? 'attack',
          stages: workingMove?.postDamageStatStage?.stages ?? 1,
          chance: workingMove?.postDamageStatStage?.chance,
          target: value as NonNullable<PostDamageStatStageConfig['target']>,
        }
      : undefined
    updateRuntimeMoveEffects({ postDamageStatStage })
  }

  const handlePostDamageStatStageField = (
    field: 'stat' | 'stages' | 'chance',
    value: string,
  ) => {
    if (!workingMove?.postDamageStatStage) return
    if (field === 'stat') {
      updateRuntimeMoveEffects({
        postDamageStatStage: {
          ...workingMove.postDamageStatStage,
          stat: value as PostDamageStatStageConfig['stat'],
        },
      })
      return
    }

    const parsed = parseNumericValue(value)
    updateRuntimeMoveEffects({
      postDamageStatStage: {
        ...workingMove.postDamageStatStage,
        [field]:
          parsed === undefined
            ? field === 'chance'
              ? undefined
              : workingMove.postDamageStatStage[field]
            : field === 'chance'
              ? Math.max(0, Math.min(100, parsed))
              : Math.trunc(parsed),
      },
    })
  }

  const handleStatStageEffectType = (value: string) => {
    const statStageEffect = STAT_STAGE_EFFECT_TYPES.includes(value as StatStageEffectConfig['type'])
      ? makeStatStageEffectFromType(value as StatStageEffectConfig['type'])
      : undefined
    updateRuntimeMoveEffects({ statStageEffect })
  }

  const handleStatStageEffectTarget = (value: string) => {
    if (
      workingMove?.statStageEffect?.type !== 'copy-target' &&
      workingMove?.statStageEffect?.type !== 'reset' &&
      workingMove?.statStageEffect?.type !== 'swap-target' &&
      workingMove?.statStageEffect?.type !== 'invert-target' &&
      workingMove?.statStageEffect?.type !== 'boost-pokemon-type'
    ) {
      return
    }
    const target =
      workingMove.statStageEffect.type === 'reset' ||
      workingMove.statStageEffect.type === 'boost-pokemon-type'
        ? value === 'enemy'
          ? 'enemy'
          : value === 'both'
            ? 'both'
            : 'self'
        : value === 'enemy'
          ? 'enemy'
          : 'self'
    updateRuntimeMoveEffects({
      statStageEffect: {
        ...workingMove.statStageEffect,
        target,
      } as StatStageEffectConfig,
    })
  }

  const handleBoostPokemonTypeField = (
    field: 'pokemonType' | 'stages',
    value: string,
  ) => {
    if (workingMove?.statStageEffect?.type !== 'boost-pokemon-type') return
    if (field === 'pokemonType') {
      if (!POKEMON_TYPES.includes(value as (typeof POKEMON_TYPES)[number])) return
      updateRuntimeMoveEffects({
        statStageEffect: {
          ...workingMove.statStageEffect,
          pokemonType: value as (typeof POKEMON_TYPES)[number],
        },
      })
      return
    }

    const parsed = parseNumericValue(value)
    updateRuntimeMoveEffects({
      statStageEffect: {
        ...workingMove.statStageEffect,
        stages: parsed === undefined ? workingMove.statStageEffect.stages : Math.trunc(parsed),
      },
    })
  }

  const handleBoostPokemonTypeStat = (
    stat: Exclude<BuffConfig['stat'], 'crit'>,
    checked: boolean,
  ) => {
    if (workingMove?.statStageEffect?.type !== 'boost-pokemon-type') return
    const nextStats = checked
      ? Array.from(new Set([...workingMove.statStageEffect.stats, stat]))
      : workingMove.statStageEffect.stats.filter((current) => current !== stat)
    updateRuntimeMoveEffects({
      statStageEffect: {
        ...workingMove.statStageEffect,
        stats: nextStats.length ? nextStats : [stat],
      },
    })
  }

  const handleStatStageEffectSwapStat = (
    field: 'first' | 'second',
    value: string,
  ) => {
    if (workingMove?.statStageEffect?.type !== 'swap-self') return
    if (!STAT_STAGE_EFFECT_STATS.includes(value as Exclude<BuffConfig['stat'], 'crit'>)) return
    updateRuntimeMoveEffects({
      statStageEffect: {
        ...workingMove.statStageEffect,
        [field]: value,
      } as StatStageEffectConfig,
    })
  }

  const handleTransformEffectToggle = (checked: boolean) => {
    const transformEffect: TransformEffectConfig | undefined = checked ? { target: 'enemy' } : undefined
    updateRuntimeMoveEffects({ transformEffect })
  }

  const handleMoveLockEffectTarget = (value: string) => {
    const moveLockEffect: MoveLockEffectConfig | undefined =
      value === 'enemy'
        ? {
            target: 'enemy',
            turns: workingMove?.moveLockEffect?.turns ?? 2,
          }
        : undefined
    updateRuntimeMoveEffects({ moveLockEffect })
  }

  const handleMoveLockEffectTurns = (value: string) => {
    if (!workingMove?.moveLockEffect) return
    updateRuntimeMoveEffects({
      moveLockEffect: {
        ...workingMove.moveLockEffect,
        turns: Math.max(1, Math.floor(parseNumericValue(value) ?? 1)),
      },
    })
  }

  const handleMoveUseEffectTarget = (value: string) => {
    const moveUseEffect: MoveUseEffectConfig | undefined =
      value === 'self' || value === 'enemy'
        ? {
            target: value,
            amount: workingMove?.moveUseEffect?.amount ?? 2,
          }
        : undefined
    updateRuntimeMoveEffects({ moveUseEffect })
  }

  const handleMoveUseEffectAmount = (value: string) => {
    if (!workingMove?.moveUseEffect) return
    updateRuntimeMoveEffects({
      moveUseEffect: {
        ...workingMove.moveUseEffect,
        amount: Math.max(1, Math.floor(parseNumericValue(value) ?? 1)),
      },
    })
  }

  const handleCurseEffectToggle = (checked: boolean) => {
    const curseEffect: CurseEffectConfig | undefined = checked
      ? {
          ghostType: 'ghost',
          ghostHpFraction: 2,
          ghostDamagePercentMaxHp: 25,
          ghostTurns: 4,
          nonGhostBuffs: [
            { stat: 'attack', stages: 1, chance: 100 },
            { stat: 'defense', stages: 1, chance: 100 },
            { stat: 'speed', stages: -1, chance: 100 },
          ],
        }
      : undefined
    updateRuntimeMoveEffects({ curseEffect })
  }

  const handleBattleConditionType = (value: string) => {
    if (!workingMove) return

    const battleCondition = BATTLE_CONDITION_TYPES.includes(value as BattleConditionType)
      ? makeBattleConditionFromType(value as BattleConditionType)
      : undefined
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      battleCondition,
    })

    updateWorkingMove({ battleCondition })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleBattleConditionStatus = (statusId: string) => {
    if (
      workingMove?.battleCondition?.type !== 'user-status' &&
      workingMove?.battleCondition?.type !== 'target-status'
    ) {
      return
    }

    const battleCondition = {
      ...workingMove.battleCondition,
      statusId,
    } as MoveBattleCondition
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      battleCondition,
    })

    updateWorkingMove({ battleCondition })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleDisableStanceChoice = (value: string) => {
    if (!workingMove) return

    const disableStance = DISABLE_STANCE_CHOICES.includes(value as DisableStanceChoice)
      ? {
          stance: value as DisableStanceChoice,
          turns: workingMove.disableStance?.turns ?? 2,
        }
      : undefined
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      disableStance,
    })

    updateWorkingMove({ disableStance })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleDisableStanceTurns = (value: string) => {
    if (!workingMove?.disableStance) return

    const turns = Math.max(1, parseNumericValue(value) ?? 1)
    const disableStance = {
      ...workingMove.disableStance,
      turns,
    }
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      disableStance,
    })

    updateWorkingMove({ disableStance })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleTypeChangeEffectType = (value: string) => {
    if (!workingMove) return

    const typeChangeEffect = TYPE_CHANGE_EFFECT_TYPES.includes(value as TypeChangeEffectType)
      ? makeTypeChangeEffectFromType(value as TypeChangeEffectType)
      : undefined
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      typeChangeEffect,
    })

    updateWorkingMove({ typeChangeEffect })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleTypeChangeEffectTarget = (target: string) => {
    if (!workingMove?.typeChangeEffect) return

    const typeChangeEffect = {
      ...workingMove.typeChangeEffect,
      target: target === 'enemy' ? 'enemy' : 'self',
    } as MoveTypeChangeEffect
    const runtimeEffects = pickRuntimeMoveEffects({
      ...workingMove,
      typeChangeEffect,
    })

    updateWorkingMove({ typeChangeEffect })
    setRuntimeEffectsJson(
      Object.keys(runtimeEffects).length ? JSON.stringify(runtimeEffects, null, 2) : '',
    )
    setRuntimeEffectsJsonError('')
  }

  const handleTypeChangeEffectPokemonType = (pokemonType: string) => {
    if (!workingMove?.typeChangeEffect) return
    if (
      workingMove.typeChangeEffect.type !== 'set' &&
      workingMove.typeChangeEffect.type !== 'add' &&
      workingMove.typeChangeEffect.type !== 'remove'
    ) {
      return
    }
    if (!MOVE_TYPE_CHANGE_TYPES.includes(pokemonType as (typeof MOVE_TYPE_CHANGE_TYPES)[number])) return

    const typeChangeEffect: MoveTypeChangeEffect = {
      ...workingMove.typeChangeEffect,
      pokemonType: pokemonType as (typeof MOVE_TYPE_CHANGE_TYPES)[number],
    }
    updateRuntimeMoveEffects({ typeChangeEffect })
  }

  const handleTypeChangeEffectTurns = (value: string) => {
    if (!workingMove?.typeChangeEffect) return
    if (
      workingMove.typeChangeEffect.type !== 'set' &&
      workingMove.typeChangeEffect.type !== 'add' &&
      workingMove.typeChangeEffect.type !== 'remove'
    ) {
      return
    }
    const parsed = parseNumericValue(value)
    const typeChangeEffect: MoveTypeChangeEffect = {
      ...workingMove.typeChangeEffect,
      turns: parsed === undefined || parsed <= 0 ? undefined : Math.max(1, Math.floor(parsed)),
    }
    updateRuntimeMoveEffects({ typeChangeEffect })
  }

  const handleHealToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({
        heal: false,
        healFull: false,
      })
      return
    }

    updateWorkingMove({ heal: true })
  }

  const handleHealFullToggle = (checked: boolean) => {
    if (!workingMove) return

    if (checked) {
      updateWorkingMove({
        heal: true,
        healFull: true,
      })
      return
    }

    updateWorkingMove({ healFull: false })
  }

  const handleAbsorbValue = (value: string) => {
    if (!workingMove) return

    const parsed = parseNumericValue(value)
    updateWorkingMove({ absorb: normalizePercentValue(parsed) })
  }

  const handleAddBuff = () => {
    if (!workingMove) return
    const next = [
      ...(workingMove.buffs || []),
      {
        stat: 'attack',
        stages: 1,
        chance: 100,
        target: 'self',
      } as BuffConfig,
    ]
    updateWorkingMove({ buffs: next })
  }

  const handleUpdateBuff = (index: number, patch: Partial<BuffConfig>) => {
    if (!workingMove?.buffs?.length) return
    const buffs = [...workingMove.buffs]
    const current = buffs[index]
    if (!current) return

    const nextBuff: BuffConfig = {
      ...current,
      ...patch,
    }

    buffs[index] = nextBuff
    updateWorkingMove({ buffs })
  }

  const handleRemoveBuff = (index: number) => {
    if (!workingMove?.buffs?.length) return
    const buffs = workingMove.buffs.filter((_, currentIndex) => currentIndex !== index)
    updateWorkingMove({ buffs: buffs.length ? buffs : undefined })
  }

  const handleAddDebuff = () => {
    if (!workingMove) return
    const next = [
      ...(workingMove.debuffs || []),
      {
        stat: 'attack',
        stages: -1,
        chance: 100,
        target: 'enemy',
      } as BuffConfig,
    ]
    updateWorkingMove({ debuffs: next })
  }

  const handleUpdateDebuff = (index: number, patch: Partial<BuffConfig>) => {
    if (!workingMove?.debuffs?.length) return
    const debuffs = [...workingMove.debuffs]
    const current = debuffs[index]
    if (!current) return

    const nextDebuff: BuffConfig = {
      ...current,
      ...patch,
    }

    debuffs[index] = nextDebuff
    updateWorkingMove({ debuffs })
  }

  const handleRemoveDebuff = (index: number) => {
    if (!workingMove?.debuffs?.length) return
    const debuffs = workingMove.debuffs.filter((_, currentIndex) => currentIndex !== index)
    updateWorkingMove({ debuffs: debuffs.length ? debuffs : undefined })
  }

  const handleContestToggle = (checked: boolean) => {
    if (!workingMove) return

    if (!checked) {
      updateWorkingMove({ contest: undefined })
      return
    }

    const next: MoveContestConfig = workingMove.contest ?? {
      attackerMetric: 'effective-stat:speed',
      comparison: 'greaterThan',
    }
    updateWorkingMove({ contest: next })
  }

  const handleContestPatch = (patcher: (next: MoveContestConfig) => MoveContestConfig | undefined) => {
    if (!workingMove) return

    const next = patcher(
      workingMove.contest ?? {
        attackerMetric: 'effective-stat:speed',
        comparison: 'greaterThan',
      },
    )

    updateWorkingMove({ contest: next })
  }

  const handleContestOutcomePatch = (
    outcome: ContestOutcomeTarget,
    patcher: (next: MoveContestOutcomeConfig | undefined) => MoveContestOutcomeConfig | undefined,
  ) => {
    if (!workingMove) return

    handleContestPatch((contest) => {
      const nextOutcome = patcher(contest?.[outcome] as MoveContestOutcomeConfig | undefined)
      const nextContest: MoveContestConfig = {
        ...contest,
        [outcome]: nextOutcome,
      }

      if (
        nextContest[outcome] === undefined &&
        nextContest.success === undefined &&
        nextContest.failure === undefined
      ) {
        delete nextContest.success
        delete nextContest.failure
        if (
          Object.keys(nextContest).length === 2 &&
          nextContest.defenderMetric === undefined
        ) {
          return undefined
        }
      }

      return nextContest
    })
  }

  const renderAiConditionEffectivenessMatches = (
    condition: Extract<
      AiCondition,
      {
        type: 'default-effectiveness' | 'move-effectiveness'
      }
    >,
    updateCondition: (nextCondition: AiCondition) => void,
    prefix = '',
  ) => {
    const matches = condition.matches ?? []

    return (
      <div className="space-y-2 rounded-md border p-2">
        <div className="space-y-1">
          <Label>{`${prefix}Matches`}</Label>
          <div className="grid grid-cols-2 gap-2">
            {AI_EFFECTIVENESS.map((effectiveness) => (
              <div
                key={effectiveness}
                className="flex items-center gap-2 text-xs"
              >
                <Checkbox
                  checked={matches.includes(effectiveness)}
                  onCheckedChange={(checked) => {
                    const nextMatches = checked
                      ? [...matches, effectiveness]
                      : matches.filter((value) => value !== effectiveness)
                    updateCondition({
                      ...condition,
                      matches: nextMatches.length ? nextMatches : undefined,
                    })
                  }}
                />
                <span>{effectiveness}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <Label>{`${prefix}At least`}</Label>
          <Select
            value={condition.atLeast || ''}
            onValueChange={(value) => {
              if (!value) {
                const nextCondition = { ...condition }
                delete nextCondition.atLeast
                updateCondition(nextCondition)
                return
              }

              updateCondition({
                ...condition,
                atLeast: value as BattleAiEffectivenessFloor,
              })
            }}
          >
            <SelectTrigger className={FIELD_CONTROL_CLASS}>
              <SelectValue placeholder="Select floor" />
            </SelectTrigger>
            <SelectContent>
              {AI_EFFECTIVENESS_FLOORS.map((floor) => (
                <SelectItem key={floor} value={floor}>
                  {floor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  const renderAiConditionEditor = (
    condition: AiCondition,
    path: string,
    onTypeChange: (type: AiConditionType) => void,
    onChange: (nextCondition: AiCondition) => void,
    onRemove: () => void,
  ) => {
    const hasActorTarget =
      condition.type === 'hp-at-or-below' ||
      condition.type === 'hp-above' ||
      condition.type === 'active-turn' ||
      condition.type === 'stat-comparison' ||
      condition.type === 'move-effectiveness' ||
      condition.type === 'status' ||
      condition.type === 'status-absent' ||
      condition.type === 'not-type' ||
      condition.type === 'has-type'

    return (
      <div className="space-y-2 rounded-md border p-2" key={path}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label className="text-xs">Condition {path}</Label>
          <div className="flex items-center gap-2">
            <Select value={condition.type} onValueChange={(value) => onTypeChange(value as AiConditionType)}>
              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                <SelectValue placeholder="Condition type" />
              </SelectTrigger>
              <SelectContent>
                {AI_CONDITION_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatAiConditionType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={onRemove}>
              <Trash2 className="mr-1 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
              {hasActorTarget && (
                <div className="space-y-1">
                  <Label>Target</Label>
                  <Select
                    value={condition.target || 'opponent'}
                    onValueChange={(value) =>
                      onChange({
                        ...condition,
                        target: value as BattleAiActor,
                      })
                    }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Target" />
                </SelectTrigger>
                <SelectContent>
                  {AI_ACTORS.map((actor) => (
                    <SelectItem key={actor} value={actor}>
                      {actor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(condition.type === 'hp-at-or-below' || condition.type === 'hp-above') && (
            <div className="space-y-1">
              <Label>Threshold %</Label>
              <Input
                type="number"
                min="1"
                max="100"
                className={FIELD_CONTROL_CLASS}
                value={condition.thresholdPercent ?? ''}
                onChange={(event) =>
                  onChange({
                    ...condition,
                    thresholdPercent: parseNumericValue(event.target.value) ?? 1,
                  })
                }
              />
            </div>
          )}

          {(condition.type === 'turn-start' || condition.type === 'turn-divisible-by') && (
            <div className="space-y-1">
              <Label>{condition.type === 'turn-start' ? 'Min Turn' : 'Divisor'}</Label>
              <Input
                type="number"
                min="1"
                className={FIELD_CONTROL_CLASS}
                value={
                  condition.type === 'turn-start'
                    ? condition.minTurn ?? ''
                    : condition.divisor ?? ''
                }
                onChange={(event) =>
                  condition.type === 'turn-start'
                    ? onChange({
                        ...condition,
                        minTurn: parseNumericValue(event.target.value) ?? 1,
                      })
                    : onChange({
                        ...condition,
                        divisor: Math.max(1, parseNumericValue(event.target.value) || 1),
                      })
                }
              />
            </div>
          )}

          {condition.type === 'active-turn' && (
            <>
              <div className="space-y-1">
                <Label>Min Turn</Label>
                <Input
                  type="number"
                  min="1"
                  className={FIELD_CONTROL_CLASS}
                  value={condition.minTurn ?? ''}
                  onChange={(event) =>
                    onChange({
                      ...condition,
                      minTurn: parseNumericValue(event.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Max Turn</Label>
                <Input
                  type="number"
                  min="1"
                  className={FIELD_CONTROL_CLASS}
                  value={condition.maxTurn ?? ''}
                  onChange={(event) =>
                    onChange({
                      ...condition,
                      maxTurn: parseNumericValue(event.target.value),
                    })
                  }
                />
              </div>
            </>
          )}

          {condition.type === 'not-type' || condition.type === 'has-type' ? (
            <div className="space-y-1">
              <Label>Pokemon Type</Label>
              <Input
                value={condition.pokemonType}
                className={FIELD_CONTROL_CLASS}
                onChange={(event) =>
                  onChange({
                    ...condition,
                    pokemonType: event.target.value,
                  })
                }
              />
            </div>
          ) : null}
        </div>

        {(condition.type === 'status' || condition.type === 'status-absent') && (
          <div className="space-y-1">
            <Label>Status</Label>
            <Select
              value={
                condition.type === 'status' || condition.type === 'status-absent'
                  ? normalizeAiStatusConditionValue(condition.status)
                  : 'all'
              }
              onValueChange={(value) =>
                onChange({
                  ...condition,
                  status: value,
                })
              }
            >
              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">all</SelectItem>
                {statusIds.map((statusId) => (
                  <SelectItem key={statusId} value={statusId}>
                    {statusId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

              {(condition.type === 'stat-comparison' || condition.type === 'hp-comparison') && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {condition.type === 'hp-comparison' && (
                    <>
                      <div className="space-y-1">
                        <Label>Left target</Label>
                        <Select
                          value={condition.leftTarget || 'self'}
                          onValueChange={(value) =>
                            onChange({
                              ...condition,
                              leftTarget: value as BattleAiActor,
                            })
                          }
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Left target" />
                          </SelectTrigger>
                          <SelectContent>
                            {AI_ACTORS.map((actor) => (
                              <SelectItem key={actor} value={actor}>
                                {actor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Right target</Label>
                        <Select
                          value={condition.rightTarget || 'self'}
                          onValueChange={(value) =>
                            onChange({
                              ...condition,
                              rightTarget: value as BattleAiActor,
                            })
                          }
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Right target" />
                          </SelectTrigger>
                          <SelectContent>
                            {AI_ACTORS.map((actor) => (
                              <SelectItem key={actor} value={actor}>
                                {actor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {condition.type === 'stat-comparison' && (
                    <>
                      <div className="space-y-1">
                        <Label>Left stat</Label>
                        <Select
                          value={condition.left}
                          onValueChange={(value) =>
                            onChange({
                              ...condition,
                              left: value as BattleAiStat,
                            })
                          }
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Stat" />
                          </SelectTrigger>
                          <SelectContent>
                            {AI_STATS.map((stat) => (
                              <SelectItem key={stat} value={stat}>
                                {stat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Right stat</Label>
                        <Select
                          value={condition.right}
                          onValueChange={(value) =>
                            onChange({
                              ...condition,
                              right: value as BattleAiStat,
                            })
                          }
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Stat" />
                          </SelectTrigger>
                          <SelectContent>
                            {AI_STATS.map((stat) => (
                              <SelectItem key={stat} value={stat}>
                                {stat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-1">
                    <Label>Comparison</Label>
                    <Select
                      value={condition.comparison}
                      onValueChange={(value) =>
                        onChange({
                          ...condition,
                          comparison: value as BattleAiComparison,
                        })
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Comparison" />
                </SelectTrigger>
                <SelectContent>
                  {AI_COMPARISONS.map((comparison) => (
                    <SelectItem key={comparison} value={comparison}>
                      {comparison}
                    </SelectItem>
                  ))}
                </SelectContent>
                    </Select>
                  </div>
                  {condition.type === 'stat-comparison' && (
                    <div className="space-y-1">
                      <Label>Use effective stats</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={Boolean(condition.effective)}
                    onCheckedChange={(checked) =>
                      onChange({
                        ...condition,
                        effective: Boolean(checked),
                      })
                    }
                  />
                  <span>Enabled</span>
                </div>
              </div>
            )}
          </div>
            )}

          {condition.type === 'default-effectiveness' &&
            renderAiConditionEffectivenessMatches(
              condition,
              onChange,
              'Default ',
            )}
          {condition.type === 'move-effectiveness' &&
            renderAiConditionEffectivenessMatches(condition, onChange, 'Move ')}

          {condition.type === 'no-other-move-effectiveness' && (
            <div className="space-y-1">
              <Label>At least</Label>
                <Select
              value={condition.atLeast || 'super-effective'}
              onValueChange={(value) =>
                onChange({
                  ...condition,
                  atLeast: value as BattleAiEffectivenessFloor,
                })
              }
            >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="At least" />
                </SelectTrigger>
              <SelectContent>
                {AI_EFFECTIVENESS_FLOORS.map((floor) => (
                  <SelectItem key={floor} value={floor}>
                    {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    )
  }

  const renderContestOutcomeEditor = (
    title: string,
    side: ContestOutcomeTarget,
    contest: NonNullable<MoveConfig['contest']>,
    onPatch: (nextOutcome: MoveContestOutcomeConfig | undefined) => void,
    onRemove: () => void,
  ) => {
    const outcome = contest[side]

    return (
      <div className="space-y-2 rounded-md border p-2">
        <div className="flex items-center justify-between gap-2">
          <Label>{title}</Label>
          <Button size="sm" variant="outline" onClick={onRemove}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Damage multiplier</Label>
            <Input
              type="number"
              step="0.1"
              className={FIELD_CONTROL_CLASS}
              value={outcome?.damageMultiplier ?? ''}
              onChange={(event) =>
                onPatch({
                  ...outcome,
                  damageMultiplier: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Result</Label>
            <Select
              value={outcome?.result || 'win'}
              onValueChange={(value) =>
                onPatch({
                  ...outcome,
                  result: value as MoveContestResult,
                })
              }
            >
              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                <SelectValue placeholder="Result" />
              </SelectTrigger>
              <SelectContent>
                {MOVE_CONTEST_RESULTS.map((result) => (
                  <SelectItem key={result} value={result}>
                    {result}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-xs">
            <span>Fail move</span>
            <Switch
              checked={Boolean(outcome?.failMove)}
              onCheckedChange={(checked) =>
                onPatch({
                  ...outcome,
                  failMove: checked || undefined,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-xs">
            <span>Prevent counter</span>
            <Switch
              checked={Boolean(outcome?.preventCounter)}
              onCheckedChange={(checked) =>
                onPatch({
                  ...outcome,
                  preventCounter: checked || undefined,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label>Message</Label>
          <Input
            className={FIELD_CONTROL_CLASS}
            value={outcome?.message || ''}
            onChange={(event) =>
              onPatch({
                ...outcome,
                message: event.target.value || undefined,
              })
            }
          />
        </div>
      </div>
    )
  }

  const handleRandomStatusesToggle = (checked: boolean) => {
    if (!workingMove) return
    if (!checked) {
      updateWorkingMove({ randomStatuses: undefined })
      return
    }

    const next = workingMove.randomStatuses ?? { chance: 100, options: [] }
    updateWorkingMove({ randomStatuses: next })
  }

  const handleRandomStatusesChance = (value: string) => {
    if (!workingMove?.randomStatuses) return

    const nextChance = value === '' ? undefined : Number(value)
    if (value !== '' && Number.isNaN(nextChance)) return

    const next = {
      ...workingMove.randomStatuses,
      chance: nextChance === undefined ? 100 : nextChance,
    }

    updateWorkingMove({ randomStatuses: next })
  }

  const handleAddRandomStatus = () => {
    if (!workingMove) return
    const statusId = statusIds[0] || 'poison'
    const current = workingMove.randomStatuses ?? { chance: 100, options: [] }
    updateWorkingMove({
      randomStatuses: {
        ...current,
        options: [
          ...(current.options || []),
          {
            id: statusId as RandomStatus['id'],
            chance: 100,
            target: 'enemy' as RandomStatusTarget,
          },
        ],
      },
    })
  }

  const handleUpdateRandomStatus = (
    index: number,
    patch: Partial<RandomStatus>,
  ) => {
    if (!workingMove?.randomStatuses?.options) return
    const options = [...workingMove.randomStatuses.options]
    const current = options[index]
    if (!current) return

    const nextOption: RandomStatus = {
      ...current,
      ...patch,
    }

    if (patch.chance === undefined) {
      delete (nextOption as Partial<RandomStatus>).chance
    }

    options[index] = nextOption

    updateWorkingMove({
      randomStatuses: {
        ...workingMove.randomStatuses,
        options,
      },
    })
  }

  const handleRemoveRandomStatus = (index: number) => {
    if (!workingMove?.randomStatuses?.options) return
    const options = workingMove.randomStatuses.options.filter((_, currentIndex) => currentIndex !== index)
    if (!options.length) {
      updateWorkingMove({ randomStatuses: undefined })
      return
    }

    updateWorkingMove({
      randomStatuses: {
        ...workingMove.randomStatuses,
        options,
      },
    })
  }

  const selectMove = React.useCallback(
    (moveId: string) => {
      if (moveId === selectedMoveId) return
      commitWorkingMoveToList()
      const move = moves.find((item) => item.id === moveId)
      if (!move) return
      const normalized = normalizeMoveForEditor(move)
      setSelectedMoveId(normalized.id)
      writeWorkingMove(normalized, true)
    },
    [commitWorkingMoveToList, moves, selectedMoveId, writeWorkingMove],
  )

  const loadMoves = React.useCallback(
    async (type: string) => {
      setLoadingMoves(true)
      try {
        const loaded = await readMoveTypeFile(type)
        const normalizedMoves = loaded.moves.map((move) => normalizeMoveForEditor(move))
        setMoveRecommendations(loaded.recommendationsByMoveId)
        setMoves(normalizedMoves)
        const nextSelected = normalizedMoves[0]?.id ?? ''
        setSelectedMoveId(nextSelected)
        writeWorkingMove(normalizedMoves[0] || null, true)
      } catch (error) {
        toast.error(`Failed to load ${type} moves: ${(error as Error).message}`)
        setMoveRecommendations({})
        setMoves([])
        setSelectedMoveId('')
        writeWorkingMove(null)
      } finally {
        setLoadingMoves(false)
      }
    },
    [writeWorkingMove],
  )

  const loadContext = React.useCallback(async () => {
    setLoadingContext(true)
    try {
      const [types, groups, researchRewards] = await Promise.all([
        listMoveTypeFiles(),
        getMovePokemonFormList(),
        readPokemonResearchLevelRewards(),
      ])
      setMoveTypes(types)
      setPokemonGroups(groups)
      setResearchLevelRewards(researchRewards)
      setResearchRewardsDirty(false)

      const defaultType = types[0]?.id || 'normal'
      setSelectedType(defaultType)
      await loadMoves(defaultType)
    } catch (error) {
      toast.error(`Failed to initialize move editor: ${(error as Error).message}`)
    } finally {
      setLoadingContext(false)
    }
  }, [loadMoves])

  React.useEffect(() => {
    void loadContext()
  }, [loadContext])

  React.useEffect(() => {
    if (researchFormId && allFormIds.has(researchFormId)) return
    setResearchFormId(researchUnlockFormOptions[0]?.id ?? '')
  }, [allFormIds, researchFormId, researchUnlockFormOptions])

  React.useEffect(() => {
    if (!selectedMoveId && moves[0]) {
      selectMove(moves[0].id)
      return
    }

    if (!moves.length) {
      setSelectedMoveId('')
      writeWorkingMove(null)
      return
    }

    if (!moves.some((move) => move.id === selectedMoveId)) {
      selectMove(moves[0].id)
    }
  }, [moves, selectedMoveId, selectMove, writeWorkingMove])

  const handleTypeChange = async (type: string) => {
    commitWorkingMoveToList()
    setSelectedType(type)
    await loadMoves(type)
  }

  const handleAddMove = () => {
    commitWorkingMoveToList()
    const newMove = makeNewMove(selectedType) as MoveConfig
    newMove.formId = []
    newMove.accuracy = 100
    newMove.damage = 1

    const normalized = normalizeMoveForEditor(newMove)
    setMoves((current) => [...current, normalized])
    setSelectedMoveId(normalized.id)
    writeWorkingMove(normalized, true)
  }

  const handleDeleteMove = () => {
    if (!workingMove) return
    const deletedId = selectedMoveId || workingMove.id
    const index = moves.findIndex((move) => move.id === deletedId)
    const next = moves[index + 1] || moves[index - 1] || null
    setMoves((current) => current.filter((move) => move.id !== deletedId))
    setSelectedMoveId(next?.id || '')
    writeWorkingMove(next, true)
  }

  const handleSetAllForms = () => {
    if (!workingMove) return
    updateWorkingMove({ formId: Array.from(allFormIds).sort(sortNumericStringIds) })
    toast.success('Move now applies to all Pokemon')
  }

  const handleApplyRecommendations = () => {
    if (!workingMove) return
    const recommended = selectedMoveRecommendedFormIds
    if (!recommended.size) {
      toast.info('No recommendations found for this move.')
      return
    }

    const normalized = normalizeFormIds(Array.from(recommended), allFormIds)
    updateWorkingMove({ formId: normalized })
  }

  const updateResearchLevelRewardRows = React.useCallback(
    (updater: (rows: PokemonResearchLevelReward[]) => PokemonResearchLevelReward[]) => {
      setResearchLevelRewards((current) => updater(current))
      setResearchRewardsDirty(true)
    },
    [],
  )

  const handleAddResearchUnlock = () => {
    if (!workingMoveTmItemId || !researchFormId) return
    const nextLevel = Number(researchLevel)
    if (!Number.isFinite(nextLevel) || nextLevel < 1) {
      toast.error('Research level must be at least 1.')
      return
    }

    updateResearchLevelRewardRows((current) => {
      const exists = current.some(
        (reward) =>
          reward.itemId === workingMoveTmItemId &&
          reward.formId === researchFormId &&
          reward.level === nextLevel,
      )
      if (exists) return current

      return [
        ...current,
        {
          formId: researchFormId,
          level: nextLevel,
          itemId: workingMoveTmItemId,
        },
      ]
    })
  }

  const handleAddSelectedLearnersAsResearchUnlocks = () => {
    if (!workingMoveTmItemId || !researchUnlockFormOptions.length) return
    const nextLevel = Number(researchLevel)
    if (!Number.isFinite(nextLevel) || nextLevel < 1) {
      toast.error('Research level must be at least 1.')
      return
    }

    const formIds = researchUnlockFormOptions.map((form) => form.id)
    updateResearchLevelRewardRows((current) => {
      const existing = new Set(
        current
          .filter((reward) => reward.itemId === workingMoveTmItemId)
          .map((reward) => `${reward.formId}:${reward.level}`),
      )
      const additions = formIds
        .filter((formId) => !existing.has(`${formId}:${nextLevel}`))
        .map((formId) => ({
          formId,
          level: nextLevel,
          itemId: workingMoveTmItemId,
        }))

      return additions.length ? [...current, ...additions] : current
    })
  }

  const handleUpdateResearchUnlockLevel = (
    reward: PokemonResearchLevelReward,
    value: string,
  ) => {
    const nextLevel = Number(value)
    if (!Number.isFinite(nextLevel) || nextLevel < 1) return

    updateResearchLevelRewardRows((current) =>
      current.map((entry) =>
        entry.itemId === reward.itemId &&
        entry.formId === reward.formId &&
        entry.level === reward.level
          ? { ...entry, level: nextLevel }
          : entry,
      ),
    )
  }

  const handleRemoveResearchUnlock = (reward: PokemonResearchLevelReward) => {
    updateResearchLevelRewardRows((current) =>
      current.filter(
        (entry) =>
          !(
            entry.itemId === reward.itemId &&
            entry.formId === reward.formId &&
            entry.level === reward.level
          ),
      ),
    )
  }

  const handleSelectAllByType = () => {
    if (!workingMove || !pokemonGroups.length || bulkType === ALL_TYPES_FILTER_VALUE) return

    const nextSet = new Set<string>()
    if (bulkType === RECOMMENDED_TYPES_FILTER_VALUE) {
      for (const formId of selectedMoveRecommendedFormIds) {
        nextSet.add(formId)
      }
    } else {
      const targetType = bulkType.toLowerCase()
      for (const species of pokemonGroups) {
        for (const form of species.forms) {
          if (form.types.some((type) => type.toLowerCase() === targetType)) {
            nextSet.add(form.id.toString())
          }
        }
      }
    }

    if (!nextSet.size) {
      toast.info('No forms found for selected filter.')
      return
    }

    const normalized = normalizeFormIds(Array.from(nextSet), allFormIds)
    updateWorkingMove({ formId: normalized })
  }

  const toggleForm = React.useCallback((formId: string) => {
    if (!allFormIds.size) return

    const current = new Set(selectedFormIds)
    if (current.has(formId)) {
      current.delete(formId)
    } else {
      current.add(formId)
    }

    const normalized = normalizeFormIds(Array.from(current), allFormIds)
    updateWorkingMove({ formId: normalized })
  }, [allFormIds, selectedFormIds, updateWorkingMove])

  const isFormSelected = React.useCallback(
    (formId: string) => {
      return selectedFormIds.has(formId)
    },
    [selectedFormIds],
  )

  const isFormRecommended = React.useCallback(
    (formId: string) => selectedMoveRecommendedFormIds.has(formId),
    [selectedMoveRecommendedFormIds],
  )

  const applyRawJson = () => {
    if (!workingMove) return

    try {
      const parsed = JSON.parse(jsonValue)
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Move JSON must be an object.')
      }

      const next = normalizeMoveForEditor({
        ...parsed,
        id: parsed.id || workingMove.id,
      } as MoveConfig)

      setSelectedMoveId(next.id)
      writeWorkingMove(next, true)
      syncMoveToList(next, selectedMoveId)
      setJsonError('')
      toast.success('Move JSON applied')
    } catch (error) {
      const message = (error as Error).message
      setJsonError(message)
      toast.error(`Invalid JSON: ${message}`)
    }
  }

  const handleStatusToggle = (checked: boolean) => {
    if (!workingMove) return
    if (!checked) {
      updateWorkingMove({ status: undefined })
      return
    }

    updateWorkingMove({
      status: {
        id: 'poison',
        chance: 100,
        target: 'enemy',
      },
    })
  }

  const renderSecondaryStatusEffectFields = (
    statusIndex: number,
    effectIndex: number,
    effect: SecondaryStatusEffect,
  ) => {
    const updateNumberField = (field: string, value: string) => {
      handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
        const nextEffect = { ...currentEffect } as SecondaryStatusEffect & Record<string, unknown>
        const parsed = parseNumericValue(value)
        if (parsed === undefined) {
          delete nextEffect[field]
        } else {
          nextEffect[field] = parsed
        }
        return nextEffect as SecondaryStatusEffect
      })
    }

    switch (effect.type) {
      case 'damage':
        return (
          <>
            <div className="space-y-1">
              <Label>Max HP %</Label>
              <Input
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={effect.percentMaxHp ?? ''}
                onChange={(event) => updateNumberField('percentMaxHp', event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Flat damage</Label>
              <Input
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={effect.flatDamage ?? ''}
                onChange={(event) => updateNumberField('flatDamage', event.target.value)}
              />
            </div>
          </>
        )
      case 'absorb':
        return (
          <>
            <div className="space-y-1">
              <Label>Max HP %</Label>
              <Input
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={effect.percentMaxHp ?? ''}
                onChange={(event) => updateNumberField('percentMaxHp', event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Flat damage</Label>
              <Input
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={effect.flatDamage ?? ''}
                onChange={(event) => updateNumberField('flatDamage', event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Heal %</Label>
              <Input
                type="number"
                min="0"
                className={FIELD_CONTROL_CLASS}
                value={effect.healPercent ?? ''}
                onChange={(event) => updateNumberField('healPercent', event.target.value)}
              />
            </div>
          </>
        )
      case 'apply-status':
        return (
          <>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={effect.statusId}
                onValueChange={(value) =>
                  handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => ({
                    ...currentEffect,
                    statusId: value as typeof effect.statusId,
                  }) as SecondaryStatusEffect)
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusIds.map((statusId) => (
                    <SelectItem key={statusId} value={statusId}>
                      {statusId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Chance %</Label>
              <Input
                type="number"
                min="0"
                max="100"
                className={FIELD_CONTROL_CLASS}
                value={effect.chance ?? ''}
                onChange={(event) => updateNumberField('chance', event.target.value)}
              />
            </div>
          </>
        )
      case 'stat':
        return (
          <>
            <div className="space-y-1">
              <Label>Stat</Label>
              <Select
                value={effect.stat}
                onValueChange={(value) =>
                  handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => ({
                    ...currentEffect,
                    stat: value as BuffConfig['stat'],
                  }) as SecondaryStatusEffect)
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Stat" />
                </SelectTrigger>
                <SelectContent>
                  {BUFF_STATS.map((stat) => (
                    <SelectItem key={stat} value={stat}>
                      {stat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Stages</Label>
              <Input
                type="number"
                className={FIELD_CONTROL_CLASS}
                value={effect.stages}
                onChange={(event) => updateNumberField('stages', event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Chance %</Label>
              <Input
                type="number"
                min="0"
                max="100"
                className={FIELD_CONTROL_CLASS}
                value={effect.chance ?? ''}
                onChange={(event) => updateNumberField('chance', event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Required Pokemon Type</Label>
              <Select
                value={effect.pokemonType ?? 'any'}
                onValueChange={(value) =>
                  handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
                    const nextEffect = { ...currentEffect } as Extract<
                      SecondaryStatusEffect,
                      { type: 'stat' }
                    >
                    if (value === 'any') {
                      delete nextEffect.pokemonType
                    } else {
                      nextEffect.pokemonType = value as (typeof POKEMON_TYPES)[number]
                    }
                    return nextEffect
                  })
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Pokemon type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {POKEMON_TYPES.map((pokemonType) => (
                    <SelectItem key={pokemonType} value={pokemonType}>
                      {pokemonType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case 'damage-reduction':
      case 'damage-modifier':
      case 'damage-taken-modifier':
        return (
          <>
            <div className="space-y-1">
              <Label>
                {effect.type === 'damage-reduction'
                  ? 'Reduction %'
                  : effect.type === 'damage-taken-modifier'
                    ? 'Taken +/- %'
                    : 'Damage +/- %'}
              </Label>
              <Input
                type="number"
                min={effect.type === 'damage-reduction' ? '0' : '-100'}
                max="300"
                className={FIELD_CONTROL_CLASS}
                value={effect.percent}
                onChange={(event) => updateNumberField('percent', event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Stance</Label>
              <Select
                value={effect.stance ?? 'any'}
                onValueChange={(value) =>
                  handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
                    const nextEffect = { ...currentEffect } as Extract<
                      SecondaryStatusEffect,
                      { type: 'damage-reduction' | 'damage-modifier' | 'damage-taken-modifier' }
                    >
                    if (value === 'any') {
                      delete nextEffect.stance
                    } else {
                      nextEffect.stance = value as typeof SECONDARY_STATUS_STANCES[number]
                    }
                    return nextEffect
                  })
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Stance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {SECONDARY_STATUS_STANCES.map((stance) => (
                    <SelectItem key={stance} value={stance}>
                      {stance}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Attack type</Label>
              <Select
                value={effect.attackType ?? 'any'}
                onValueChange={(value) =>
                  handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
                    const nextEffect = { ...currentEffect } as Extract<
                      SecondaryStatusEffect,
                      { type: 'damage-reduction' | 'damage-modifier' | 'damage-taken-modifier' }
                    >
                    if (value === 'any') {
                      delete nextEffect.attackType
                    } else {
                      nextEffect.attackType = value as typeof SECONDARY_STATUS_ATTACK_TYPES[number]
                    }
                    return nextEffect
                  })
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Attack type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {SECONDARY_STATUS_ATTACK_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case 'type-immunity-bypass':
        return (
          <div className="space-y-1 xl:col-span-3">
            <Label>Bypassed immunities</Label>
            <div className="flex min-h-8 flex-wrap items-center gap-3 rounded-md border px-3 py-1.5">
              {SECONDARY_STATUS_ATTACK_TYPES.map((type) => (
                <div key={type} className="flex items-center gap-2 text-xs">
                  <Checkbox
                    checked={effect.attackTypes?.includes(type) ?? false}
                    onCheckedChange={(checked) =>
                      handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
                        if (currentEffect.type !== 'type-immunity-bypass') return currentEffect
                        const currentTypes = currentEffect.attackTypes ?? []
                        const nextTypes = checked
                          ? Array.from(new Set([...currentTypes, type]))
                          : currentTypes.filter((attackType) => attackType !== type)
                        return {
                          ...currentEffect,
                          attackTypes: nextTypes.length ? nextTypes : undefined,
                        }
                      })
                    }
                  />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'accuracy-bypass':
        return (
          <div className="text-xs text-muted-foreground xl:col-span-3">
            Affected Pokemon's moves ignore accuracy checks.
          </div>
        )
      case 'infatuation':
        return (
          <div className="space-y-1">
            <Label>Chance %</Label>
            <Input
              type="number"
              min="0"
              max="100"
              className={FIELD_CONTROL_CLASS}
              value={effect.chance ?? ''}
              onChange={(event) => updateNumberField('chance', event.target.value)}
            />
          </div>
        )
      case 'switch-prevention':
        return null
      case 'move-block':
        return (
          <>
            <div className="space-y-1">
              <Label>Block mode</Label>
              <Select
                value={effect.mode}
                onValueChange={(value) =>
                  handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) =>
                    currentEffect.type === 'move-block'
                      ? {
                          ...currentEffect,
                          mode: value as typeof currentEffect.mode,
                          moveIds: value === 'move-id' ? currentEffect.moveIds ?? ['sing'] : undefined,
                          attackTypes:
                            value === 'attack-type'
                              ? currentEffect.attackTypes ?? ['fire']
                              : undefined,
                          damagePercentMaxHp:
                            value === 'attack-type'
                              ? currentEffect.damagePercentMaxHp
                              : undefined,
                        }
                      : currentEffect,
                  )
                }
              >
                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                  <SelectValue placeholder="Block mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zero-damage">Zero-damage moves</SelectItem>
                  <SelectItem value="move-id">Specific move ids</SelectItem>
                  <SelectItem value="last-used">Last used move</SelectItem>
                  <SelectItem value="healing">Healing moves</SelectItem>
                  <SelectItem value="attack-type">Attack type</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {effect.mode === 'move-id' && (
              <div className="space-y-1 xl:col-span-2">
                <Label>Move IDs</Label>
                <Input
                  className={FIELD_CONTROL_CLASS}
                  value={effect.moveIds?.join(', ') ?? ''}
                  onChange={(event) =>
                    handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) =>
                      currentEffect.type === 'move-block'
                        ? {
                            ...currentEffect,
                            moveIds: event.target.value
                              .split(',')
                              .map((moveId) => moveId.trim())
                              .filter(Boolean),
                          }
                        : currentEffect,
                    )
                  }
                />
              </div>
            )}
            {effect.mode === 'attack-type' && (
              <>
                <div className="space-y-1 xl:col-span-3">
                  <Label>Blocked attack types</Label>
                  <div className="flex min-h-8 flex-wrap items-center gap-3 rounded-md border px-3 py-1.5">
                    {SECONDARY_STATUS_ATTACK_TYPES.map((type) => (
                      <div key={type} className="flex items-center gap-2 text-xs">
                        <Checkbox
                          checked={effect.attackTypes?.includes(type) ?? false}
                          onCheckedChange={(checked) =>
                            handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
                              if (currentEffect.type !== 'move-block') return currentEffect
                              const currentTypes = currentEffect.attackTypes ?? []
                              const nextTypes = checked
                                ? Array.from(new Set([...currentTypes, type]))
                                : currentTypes.filter((attackType) => attackType !== type)
                              return {
                                ...currentEffect,
                                attackTypes: nextTypes.length ? nextTypes : undefined,
                              }
                            })
                          }
                        />
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Block Damage % Max HP</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    className={FIELD_CONTROL_CLASS}
                    value={effect.damagePercentMaxHp ?? ''}
                    onChange={(event) =>
                      handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) => {
                        if (currentEffect.type !== 'move-block') return currentEffect
                        const parsed = parseNumericValue(event.target.value)
                        return {
                          ...currentEffect,
                          damagePercentMaxHp:
                            parsed === undefined ? undefined : Math.max(0, Math.min(100, parsed)),
                        }
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Checkbox
                    checked={effect.removeOnBlock ?? false}
                    onCheckedChange={(checked) =>
                      handleUpdateSecondaryStatusEffect(statusIndex, effectIndex, (currentEffect) =>
                        currentEffect.type === 'move-block'
                          ? {
                              ...currentEffect,
                              removeOnBlock: Boolean(checked) || undefined,
                            }
                          : currentEffect,
                      )
                    }
                  />
                  <Label>Remove after block</Label>
                </div>
              </>
            )}
          </>
        )
      case 'snatch-beneficial-move':
        return null
      case 'faint-bond':
        return (
          <div className="text-xs text-muted-foreground xl:col-span-3">
            If the affected Pokemon faints from opposing direct damage, the attacker faints too.
          </div>
        )
      case 'faint-move-use-depletion':
        return (
          <div className="space-y-1">
            <Label>Move uses depleted</Label>
            <Input
              type="number"
              min="0"
              className={FIELD_CONTROL_CLASS}
              value={effect.amount}
              onChange={(event) => updateNumberField('amount', event.target.value)}
            />
          </div>
        )
    }
  }

  const handleSave = async () => {
    if (!selectedType) return
    if (moveIdError) {
      toast.error(moveIdError)
      return
    }
    setSaving(true)
    try {
      const payload = moves.map((move) =>
        move.id === selectedMoveId && workingMove
          ? normalizeMoveForSave(workingMove, allFormIds)
          : normalizeMoveForSave(move, allFormIds),
      )
      const seenMoveIds = new Set<string>()
      for (const move of payload) {
        if (!move.id) {
          toast.error('Every move needs a Move ID before saving.')
          return
        }
        if (seenMoveIds.has(move.id)) {
          toast.error(`Move ID "${move.id}" is already used.`)
          return
        }
        seenMoveIds.add(move.id)
      }
      const result = await saveMoveTypeFile(selectedType, payload)
      if (!result.success) {
        toast.error(`Failed to save ${selectedType}.ts: ${result.error}`)
        return
      }
      setMoves(payload)
      setMoveRecommendations(result.recommendationsByMoveId ?? {})
      if (workingMove?.id) {
        setSelectedMoveId(workingMove.id)
      }

      if (researchRewardsDirty) {
        const researchResult = await savePokemonResearchLevelRewards(researchLevelRewards)
        if (!researchResult.success) {
          toast.error(`Saved moves, but failed to save research unlocks: ${researchResult.error}`)
          return
        }
        setResearchRewardsDirty(false)
      }

      toast.success(
        researchRewardsDirty
          ? `Saved ${selectedType}.ts and research unlocks`
          : `Saved ${selectedType}.ts`,
      )
    } catch (error) {
      toast.error(`Failed to save ${selectedType}.ts: ${(error as Error).message}`)
    } finally {
      setSaving(false)
    }
  }

  const isLoading = loadingContext || loadingMoves
  const visibleMoveCount = filteredMoves.length
  const learnerCountLabel = isAllForms ? 'All forms' : selectedFormIds.size.toString()
  const selectedTypeLabel = moveTypes.find((type) => type.id === selectedType)?.label ?? selectedType
  const selectedMoveTypeLabel = workingMove?.forcedType ? getTypeLabel(workingMove.forcedType) : 'None'
  const selectedMoveStanceLabel = workingMove?.stance ? getTypeLabel(workingMove.stance) : 'None'
  const hasUnsavedUnlockChanges = researchRewardsDirty

  return (
    <div className="min-h-screen bg-muted/30 p-3 sm:p-4">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-4">
        <header className="rounded-xl border bg-card/95 p-4 text-card-foreground shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight">Move Data Editor</h1>
                {hasUnsavedUnlockChanges && (
                  <Badge variant="secondary" className="border-amber-500/30 bg-amber-500/10 text-amber-700">
                    Unsaved unlocks
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Edit TM move data, research unlocks, and learner eligibility from one workspace.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleAddMove}>
                <Plus className="mr-2 h-4 w-4" />
                Add Move
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isLoading || saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Moves & Unlocks
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <DashboardMetric label="Type file" value={selectedTypeLabel} tone="accent" />
            <DashboardMetric label="Moves" value={`${moves.length} total`} />
            <DashboardMetric label="Visible" value={`${visibleMoveCount} shown`} />
            <DashboardMetric label="Learners" value={selectedMove ? learnerCountLabel : 'Select a move'} />
            <DashboardMetric
              label="Research unlocks"
              value={selectedMove ? selectedMoveResearchRewards.length : 0}
              tone={hasUnsavedUnlockChanges ? 'warning' : 'default'}
            />
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="flex min-h-[calc(100vh-13rem)] flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="space-y-3 border-b bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">Move Library</h2>
                  <p className="text-xs text-muted-foreground">{selectedTypeLabel} file</p>
                </div>
                <Badge variant="outline">{visibleMoveCount}</Badge>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="move-type-select">Move type file</Label>
                <Select value={selectedType} onValueChange={handleTypeChange}>
                  <SelectTrigger id="move-type-select" className="h-9 w-full text-sm">
                    <SelectValue placeholder="Select move type file" />
                  </SelectTrigger>
                  <SelectContent>
                    {moveTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search id, name, description"
                  value={moveSearch}
                  className="h-9 pl-8 text-sm"
                  onChange={(event) => setMoveSearch(event.target.value)}
                />
              </div>

              <div className="flex items-center justify-between gap-3 rounded-md border bg-background/70 px-3 py-2 text-sm">
                <span className="min-w-0">
                  <span className="block font-medium">Hide research unlocks</span>
                  <span className="block text-xs text-muted-foreground">
                    Exclude moves already granted by Pokemon Research.
                  </span>
                </span>
                <Switch
                  checked={hideResearchUnlockedMoves}
                  onCheckedChange={(checked) => setHideResearchUnlockedMoves(Boolean(checked))}
                />
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0">
              {filteredMoves.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  {isLoading ? 'Loading moves...' : 'No moves match the current filters.'}
                </div>
              ) : (
                <div className="space-y-2 p-3">
                  {filteredMoves.map((move) => {
                    const hasResearchUnlock = researchUnlockedMoveIds.has(move.id)
                    return (
                      <button
                        key={move.id}
                        type="button"
                        className={cn(
                          'w-full rounded-lg border px-3 py-2.5 text-left transition hover:shadow-sm',
                          move.id === selectedMoveId
                            ? 'border-primary/70 bg-primary/10 shadow-sm'
                            : 'border-border bg-background/70 hover:bg-muted/30',
                        )}
                        onClick={() => selectMove(move.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-1.5">
                              {hasResearchUnlock && (
                                <Star
                                  className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-500"
                                  aria-label="Authored as a Pokemon Research unlock"
                                />
                              )}
                              <p className="truncate text-sm font-medium">{move.name || move.id}</p>
                            </div>
                            <p className="truncate text-xs text-muted-foreground">{move.id}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0 text-[10px]">
                            {move.stance}
                          </Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <Badge variant="outline" className="text-[10px]">
                            Lv {move.level ?? '-'}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px]">
                            {move.forcedType || 'type-free'}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            {move.damage}x
                          </Badge>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </ScrollArea>
          </aside>

          <section className="min-w-0 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="sticky top-0 z-20 border-b bg-card/95 p-4 backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-semibold tracking-tight">
                      {selectedMove ? selectedMove.name || selectedMove.id : 'Select a move'}
                    </h2>
                    {workingMove?.aiOnly && <Badge variant="outline">AI only</Badge>}
                    {workingMove?.trainerOnly && <Badge variant="outline">Trainer only</Badge>}
                    {workingMove?.manualOnly && <Badge variant="outline">Manual only</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedMove ? `${workingMove?.id || selectedMove.id} in ${selectedType}.ts` : 'Choose a move from the library.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedMove && (
                    <>
                      <Badge variant="secondary">{selectedMoveStanceLabel}</Badge>
                      <Badge variant="secondary">{selectedMoveTypeLabel}</Badge>
                    </>
                  )}
              <Tabs
                value={jsonMode}
                onValueChange={(value) => {
                  const nextMode = value as 'form' | 'json'
                  setJsonMode(nextMode)
                  if (nextMode === 'json' && workingMove) {
                    setJsonValue(JSON.stringify(workingMove, null, 2))
                    setJsonError('')
                  }
                }}
              >
                <TabsList>
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteMove}
                disabled={!workingMove || isLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
            </div>

          {isLoading ? (
            <div className="flex h-[28rem] items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading move data...
            </div>
          ) : !selectedMove ? (
            <div className="flex h-[28rem] items-center justify-center p-8 text-sm text-muted-foreground">
              Select a move from the library to begin editing.
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <Tabs value={jsonMode}>
                <TabsContent value="form" className="mt-0 space-y-5 p-4 lg:p-6">
                  <section className={EDITOR_PANEL_CLASS}>
                    <div className={EDITOR_PANEL_HEADER_CLASS}>
                      <div>
                        <h3 className={EDITOR_PANEL_TITLE_CLASS}>Identity & Battle Profile</h3>
                        <p className={EDITOR_PANEL_DESCRIPTION_CLASS}>
                          Core values used by assignment, battle display, and damage calculation.
                        </p>
                      </div>
                    </div>
                  <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
                    <div className="space-y-1">
                      <Label htmlFor="move-id">Move ID</Label>
                      <Input
                        id="move-id"
                        value={workingMove?.id || ''}
                        onChange={(event) => handleMoveIdChange(event.target.value)}
                        aria-invalid={Boolean(moveIdError)}
                        className={cn(FIELD_CONTROL_CLASS, moveIdError && 'border-destructive')}
                      />
                      {moveIdError && (
                        <p className="text-xs font-medium text-destructive">{moveIdError}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-name">Name</Label>
                      <Input
                        id="move-name"
                        value={workingMove?.name || ''}
                        onChange={(event) => updateWorkingMove({ name: event.target.value })}
                        className={FIELD_CONTROL_CLASS}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-stance">Stance</Label>
                      <Select
                        value={workingMove?.stance || 'tech'}
                        onValueChange={(value) =>
                          updateWorkingMove({ stance: value as MoveConfig['stance'] })
                        }
                      >
                        <SelectTrigger id="move-stance" className={FIELD_CONTROL_CLASS}>
                          <SelectValue placeholder="Pick stance" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOVE_STANCES.map((stance) => (
                            <SelectItem key={stance} value={stance}>
                              {stance}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-target">Target</Label>
                      <Select
                        value={workingMove?.target || 'enemy'}
                        onValueChange={(value) =>
                          updateWorkingMove({ target: value as MoveConfig['target'] })
                        }
                      >
                        <SelectTrigger id="move-target" className={FIELD_CONTROL_CLASS}>
                          <SelectValue placeholder="Pick target" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOVE_TARGETS.map((target) => (
                            <SelectItem key={target} value={target}>
                              {target}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-type">Forced type</Label>
                      <Select
                        value={workingMove?.forcedType || 'normal'}
                        onValueChange={(value) =>
                          updateWorkingMove({ forcedType: value as MoveConfig['forcedType'] })
                        }
                      >
                        <SelectTrigger id="move-type" className={FIELD_CONTROL_CLASS}>
                          <SelectValue placeholder="Pick forced type" />
                        </SelectTrigger>
                        <SelectContent>
                          {MOVE_FORCED_TYPES.map((forcedType) => (
                            <SelectItem key={forcedType} value={forcedType}>
                              {forcedType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-level">Required Level</Label>
                      <Input
                        id="move-level"
                        type="number"
                        min="1"
                        value={workingMove?.level ?? ''}
                        className={FIELD_CONTROL_CLASS}
                        onChange={(event) =>
                          updateWorkingMove({
                            level: event.target.value ? Number(event.target.value) : undefined,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-crit">Crit Chance (%)</Label>
                      <Input
                        id="move-crit"
                        type="number"
                        min="0"
                        max="100"
                        value={workingMove?.critChance ?? ''}
                        className={FIELD_CONTROL_CLASS}
                        onChange={(event) =>
                          updateWorkingMove({
                            critChance: event.target.value ? Number(event.target.value) : undefined,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-damage">Damage</Label>
                      <Input
                        id="move-damage"
                        type="number"
                        step="0.1"
                        value={workingMove?.damage ?? ''}
                        className={FIELD_CONTROL_CLASS}
                        onChange={(event) => updateWorkingMove({ damage: Number(event.target.value) })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-accuracy">Accuracy</Label>
                      <Input
                        id="move-accuracy"
                        type="number"
                        min="0"
                        max="100"
                        value={workingMove?.accuracy ?? ''}
                        className={FIELD_CONTROL_CLASS}
                        onChange={(event) =>
                          updateWorkingMove({
                            accuracy: Number(event.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Always Hits</span>
                      <Switch
                        checked={!!workingMove?.alwaysHits}
                        onCheckedChange={(checked) =>
                          updateWorkingMove({ alwaysHits: checked ? true : undefined })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-fail">Fail on stance</Label>
                      <Select
                        value={workingMove?.failOnStance || 'none'}
                        onValueChange={(value) =>
                          updateWorkingMove({
                            failOnStance:
                              value === 'none' ? undefined : (value as MoveConfig['failOnStance']),
                          })
                        }
                      >
                        <SelectTrigger id="move-fail" className={FIELD_CONTROL_CLASS}>
                          <SelectValue placeholder="No fail rule" />
                        </SelectTrigger>
                        <SelectContent>
                          {FAIL_STANCES.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Prevent counter on stance win</span>
                      <Switch
                        checked={!!workingMove?.preventCounterOnStanceWin}
                        onCheckedChange={(checked) =>
                          updateWorkingMove({
                            preventCounterOnStanceWin: checked ? true : undefined,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-damage-range-min">Damage range min</Label>
                      <Input
                        id="move-damage-range-min"
                        type="number"
                        step="0.1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.damageRange?.min ?? ''}
                        onChange={(event) => handleDamageRangeField('min', event.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-damage-range-max">Damage range max</Label>
                      <Input
                        id="move-damage-range-max"
                        type="number"
                        step="0.1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.damageRange?.max ?? ''}
                        onChange={(event) => handleDamageRangeField('max', event.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-charged">Charge turns</Label>
                      <Input
                        id="move-charged"
                        type="number"
                        min="1"
                        step="1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.charged ?? ''}
                        onChange={(event) => handleChargedValue(event.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-recharge">Recharge turns</Label>
                      <Input
                        id="move-recharge"
                        type="number"
                        min="1"
                        step="1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.recharge ?? ''}
                        onChange={(event) => handleRechargeValue(event.target.value)}
                      />
                    </div>
                  </div>
                  </section>

                  <section className={EDITOR_PANEL_CLASS}>
                    <div className={EDITOR_PANEL_HEADER_CLASS}>
                      <div>
                        <h3 className={EDITOR_PANEL_TITLE_CLASS}>Timing & Damage Overrides</h3>
                        <p className={EDITOR_PANEL_DESCRIPTION_CLASS}>
                          Multi-turn behavior and defender-type damage exceptions.
                        </p>
                      </div>
                    </div>
                  <div className="grid gap-3 rounded-md border bg-muted/10 p-3 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span>Continuous move</span>
                      <Switch
                        checked={!!workingMove?.continuous}
                        onCheckedChange={(checked) =>
                          handleContinuousToggle(Boolean(checked))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-continuous-min">Continuous min turns</Label>
                      <Input
                        id="move-continuous-min"
                        type="number"
                        min="1"
                        step="1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.continuous?.min ?? ''}
                        disabled={!workingMove?.continuous}
                        onChange={(event) =>
                          handleContinuousField('min', event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-continuous-max">Continuous max turns</Label>
                      <Input
                        id="move-continuous-max"
                        type="number"
                        min="1"
                        step="1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.continuous?.max ?? ''}
                        disabled={!workingMove?.continuous}
                        onChange={(event) =>
                          handleContinuousField('max', event.target.value)
                        }
                        />
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 rounded-md border bg-muted/10 p-3 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span>Repeat damage</span>
                      <Switch
                        checked={!!workingMove?.repeatDamage}
                        disabled={!workingMove?.continuous}
                        onCheckedChange={(checked) =>
                          handleRepeatDamageToggle(Boolean(checked))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-repeat-damage-percent">Per repeat damage %</Label>
                      <Input
                        id="move-repeat-damage-percent"
                        type="number"
                        step="1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.repeatDamage?.perUsePercent ?? ''}
                        disabled={!workingMove?.repeatDamage}
                        onChange={(event) =>
                          handleRepeatDamageField('perUsePercent', event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-repeat-damage-max">Max uses</Label>
                      <Input
                        id="move-repeat-damage-max"
                        type="number"
                        min="1"
                        step="1"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.repeatDamage?.maxUses ?? ''}
                        disabled={!workingMove?.repeatDamage}
                        onChange={(event) =>
                          handleRepeatDamageField('maxUses', event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 rounded-md border bg-muted/10 p-3 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span>End status</span>
                      <Switch
                        checked={!!workingMove?.continuousEnd?.status}
                        disabled={!workingMove?.continuous}
                        onCheckedChange={(checked) =>
                          handleContinuousEndStatusToggle(Boolean(checked))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>End Status</Label>
                      <Select
                        value={workingMove?.continuousEnd?.status?.id || 'confusion'}
                        disabled={!workingMove?.continuousEnd?.status}
                        onValueChange={(value) => handleContinuousEndStatusField('id', value)}
                      >
                        <SelectTrigger className={FIELD_CONTROL_CLASS}>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusIds.map((statusId) => (
                            <SelectItem key={statusId} value={statusId}>
                              {statusId}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="move-continuous-end-status-chance">Chance %</Label>
                      <Input
                        id="move-continuous-end-status-chance"
                        type="number"
                        min="0"
                        max="100"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.continuousEnd?.status?.chance ?? ''}
                        disabled={!workingMove?.continuousEnd?.status}
                        onChange={(event) =>
                          handleContinuousEndStatusField('chance', event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>End Status Target</Label>
                      <Select
                        value={workingMove?.continuousEnd?.status?.target || 'self'}
                        disabled={!workingMove?.continuousEnd?.status}
                        onValueChange={(value) => handleContinuousEndStatusField('target', value)}
                      >
                        <SelectTrigger className={FIELD_CONTROL_CLASS}>
                          <SelectValue placeholder="Target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">Self</SelectItem>
                          <SelectItem value="enemy">Enemy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-3 space-y-3 rounded-md border bg-muted/10 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <Label>Damage by defender type</Label>
                        <p className="text-xs text-muted-foreground">
                          Overrides the damage multiplier when the defender has a matching type.
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAddDamageByDefenderType}
                        disabled={
                          !workingMove ||
                          Object.keys(workingMove.damageByDefenderType ?? {}).length >=
                            SECONDARY_STATUS_ATTACK_TYPES.length
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add type
                      </Button>
                    </div>

                    {Object.entries(workingMove?.damageByDefenderType ?? {}).length > 0 ? (
                      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {Object.entries(workingMove?.damageByDefenderType ?? {}).map(
                          ([type, damage]) => (
                            <div
                              key={type}
                              className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2 rounded-md border bg-muted/20 p-2"
                            >
                              <div className="space-y-1">
                                <Label>Defender type</Label>
                                <Select
                                  value={type}
                                  onValueChange={(value) =>
                                    handleUpdateDamageByDefenderType(type, value, damage)
                                  }
                                >
                                  <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {SECONDARY_STATUS_ATTACK_TYPES.map((pokemonType) => (
                                      <SelectItem
                                        key={pokemonType}
                                        value={pokemonType}
                                        disabled={
                                          pokemonType !== type &&
                                          workingMove?.damageByDefenderType?.[pokemonType] !== undefined
                                        }
                                      >
                                        {pokemonType}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-1">
                                <Label>Damage</Label>
                                <Input
                                  type="number"
                                  step="0.1"
                                  className={FIELD_CONTROL_CLASS}
                                  value={damage}
                                  onChange={(event) =>
                                    handleUpdateDamageByDefenderType(
                                      type,
                                      type,
                                      parseNumericValue(event.target.value),
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Remove</Label>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() => handleRemoveDamageByDefenderType(type)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        No defender-type damage overrides.
                      </p>
                    )}
                  </div>
                  </section>

                  <section className={EDITOR_PANEL_CLASS}>
                    <div className={EDITOR_PANEL_HEADER_CLASS}>
                      <div>
                        <h3 className={EDITOR_PANEL_TITLE_CLASS}>Visibility & Battle Flags</h3>
                        <p className={EDITOR_PANEL_DESCRIPTION_CLASS}>
                          Rules that affect who can use the move and how it behaves in turn resolution.
                        </p>
                      </div>
                    </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Trainer Only</span>
                      <Switch
                        checked={!!workingMove?.trainerOnly}
                        onCheckedChange={(checked) =>
                          updateWorkingMove({ trainerOnly: checked ? true : undefined })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>AI Only</span>
                      <Switch
                        checked={!!workingMove?.aiOnly}
                        onCheckedChange={(checked) =>
                          updateWorkingMove({ aiOnly: checked ? true : undefined })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Manual Only</span>
                      <Switch
                        checked={!!workingMove?.manualOnly}
                        onCheckedChange={(checked) =>
                          updateWorkingMove({ manualOnly: checked ? true : undefined })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Ignore Type Effectiveness</span>
                      <Switch
                        checked={!!workingMove?.ignoreTypeEffectiveness}
                        onCheckedChange={(checked) => updateWorkingMove({ ignoreTypeEffectiveness: checked })}
                      />
                    </div>
                    <div className="space-y-1 rounded-md border p-3">
                      <div className="flex items-center justify-between gap-2 text-sm">
                          <span>Interrupt Enemy Move</span>
                          <Switch
                            checked={
                              Boolean(
                                (getInterruptEnemyMoveChanceValue(workingMove?.interruptEnemyMove) ?? 0) > 0,
                              )
                            }
                            onCheckedChange={(checked) =>
                              handleInterruptEnemyMoveToggle(Boolean(checked))
                            }
                          />
                        </div>
                      <div className="space-y-1">
                        <Label htmlFor="interrupt-enemy-move-chance">Chance (%)</Label>
                        <Input
                          id="interrupt-enemy-move-chance"
                          type="number"
                          min="0"
                          max="100"
                          className={FIELD_CONTROL_CLASS}
                          value={
                            getInterruptEnemyMoveChanceValue(workingMove?.interruptEnemyMove) ??
                            ''
                          }
                          disabled={
                            !(
                              (getInterruptEnemyMoveChanceValue(workingMove?.interruptEnemyMove) ?? 0) > 0
                            )
                          }
                          onChange={(event) =>
                            handleInterruptEnemyMoveChance(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Self Damage</span>
                      <Switch
                        checked={!!workingMove?.selfDamage}
                        onCheckedChange={(checked) => handleSelfDamageToggle(Boolean(checked))}
                      />
                    </div>
                  </div>

                  {workingMove?.selfDamage && (
                    <div className="mt-3 grid gap-2 rounded-md border bg-muted/10 p-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Chance (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={workingMove.selfDamage.chance ?? ''}
                          className={FIELD_CONTROL_CLASS}
                          onChange={(event) => handleSelfDamageValue('chance', event.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Fraction (1/X)</Label>
                        <Input
                          type="number"
                          min="1"
                          value={workingMove.selfDamage.fraction ?? ''}
                          className={FIELD_CONTROL_CLASS}
                          onChange={(event) => handleSelfDamageValue('fraction', event.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-3 space-y-3 rounded-md border bg-muted/10 p-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Called Move</Label>
                        <Select
                          value={workingMove?.calledMove?.mode || 'none'}
                          onValueChange={handleCalledMoveMode}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Called move" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {CALLED_MOVE_MODES.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.calledMove && (
                        <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                          <span>Exclude self</span>
                          <Switch
                            checked={!!workingMove.calledMove.excludeSelf}
                            onCheckedChange={(checked) =>
                              handleCalledMoveExcludeSelf(Boolean(checked))
                            }
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Damage Rule</Label>
                        <Select
                          value={workingMove?.damageRule?.type || 'none'}
                          onValueChange={handleDamageRuleType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Damage rule" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {DAMAGE_RULE_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.damageRule?.type === 'flat' && (
                        <div className="space-y-1">
                          <Label>Flat Damage</Label>
                          <Input
                            type="number"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.damageRule.amount}
                            onChange={(event) =>
                              handleDamageRuleNumber('amount', event.target.value)
                            }
                          />
                        </div>
                      )}
                      {workingMove?.damageRule?.type === 'target-current-hp-percent' && (
                        <div className="space-y-1">
                          <Label>Current HP %</Label>
                          <Input
                            type="number"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.damageRule.percent}
                            onChange={(event) =>
                              handleDamageRuleNumber('percent', event.target.value)
                            }
                          />
                        </div>
                      )}
                      {workingMove?.damageRule?.type === 'user-level' && (
                        <div className="space-y-1">
                          <Label>Level Multiplier</Label>
                          <Input
                            type="number"
                            step="0.1"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.damageRule.multiplier ?? 1}
                            onChange={(event) =>
                              handleDamageRuleNumber('multiplier', event.target.value)
                            }
                          />
                        </div>
                      )}
                      {workingMove?.damageRule?.type === 'last-damage-taken' && (
                        <div className="space-y-1">
                          <Label>Damage Taken Multiplier</Label>
                          <Input
                            type="number"
                            step="0.1"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.damageRule.multiplier ?? 1}
                            onChange={(event) =>
                              handleDamageRuleNumber('multiplier', event.target.value)
                            }
                          />
                        </div>
                      )}
                      {workingMove?.damageRule?.type === 'party-member-count' && (
                        <div className="space-y-1">
                          <Label>Damage Per Member</Label>
                          <Input
                            type="number"
                            step="0.05"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.damageRule.perMemberDamage}
                            onChange={(event) =>
                              handleDamageRuleNumber('perMemberDamage', event.target.value)
                            }
                          />
                        </div>
                      )}
                      {workingMove?.damageRule?.type === 'ohko' && (
                        <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                          <span>Fail if user lower level</span>
                          <Switch
                            checked={!!workingMove.damageRule.failIfUserLowerLevel}
                            onCheckedChange={(checked) =>
                              handleDamageRuleLowerLevel(Boolean(checked))
                            }
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Delayed damage</span>
                        <Switch
                          checked={!!workingMove?.delayedDamage}
                          onCheckedChange={(checked) =>
                            handleDelayedDamageToggle(Boolean(checked))
                          }
                        />
                      </div>
                      {workingMove?.delayedDamage && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1">
                            <Label>Delay Turns</Label>
                            <Input
                              type="number"
                              min={1}
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.delayedDamage.turns}
                              onChange={(event) =>
                                handleDelayedDamageNumber('turns', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Damage Multiplier</Label>
                            <Input
                              type="number"
                              min={1}
                              step="0.1"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.delayedDamage.damage}
                              onChange={(event) =>
                                handleDelayedDamageNumber('damage', event.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Dynamic Type</Label>
                        <Select
                          value={workingMove?.dynamicType?.type || 'none'}
                          onValueChange={handleDynamicTypeType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Dynamic type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {DYNAMIC_TYPE_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.dynamicType && (
                        <div className="space-y-1">
                          <Label>Dynamic Fallback Type</Label>
                          <Select
                            value={workingMove.dynamicType.fallbackType || 'none'}
                            onValueChange={handleDynamicTypeFallback}
                          >
                            <SelectTrigger className={FIELD_CONTROL_CLASS}>
                              <SelectValue placeholder="Fallback" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              {MOVE_FORCED_TYPES.filter((type) => type !== 'random').map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Weather damage multiplier</span>
                        <Switch
                          checked={!!workingMove?.weatherDamageMultiplier}
                          onCheckedChange={(checked) =>
                            handleWeatherDamageMultiplierEnabled(Boolean(checked))
                          }
                        />
                      </div>
                      {workingMove?.weatherDamageMultiplier && (
                        <div className="space-y-1">
                          <Label>Weather multiplier</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.weatherDamageMultiplier.multiplier}
                            onChange={(event) =>
                              handleWeatherDamageMultiplierValue(event.target.value)
                            }
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Battle Item Uses</Label>
                        <Select
                          value={workingMove?.itemUseEffect?.type || 'none'}
                          onValueChange={handleItemUseEffectType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Item use effect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {ITEM_USE_EFFECT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.itemUseEffect && (
                        <div className="space-y-1">
                          <Label>Item Use Amount</Label>
                          <Input
                            type="number"
                            min="0"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.itemUseEffect.amount}
                            onChange={(event) =>
                              handleItemUseEffectAmount(event.target.value)
                            }
                          />
                        </div>
                      )}
                      {workingMove?.itemUseEffect?.type === 'consume-self' && (
                        <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                          <span>Fail if unavailable</span>
                          <Switch
                            checked={!!workingMove.itemUseEffect.failIfUnavailable}
                            onCheckedChange={(checked) =>
                              handleItemUseEffectFailIfUnavailable(Boolean(checked))
                            }
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Held Item Effect</Label>
                        <Select
                          value={workingMove?.heldItemEffect?.type || 'none'}
                          onValueChange={handleHeldItemEffectType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Held item effect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="bestow">Bestow: give user's item to target</SelectItem>
                            <SelectItem value="remove-target">Remove target item</SelectItem>
                            <SelectItem value="steal-target">Steal target item</SelectItem>
                            <SelectItem value="swap">Swap held items</SelectItem>
                            <SelectItem value="recycle">Recycle consumed item</SelectItem>
                            <SelectItem value="consume-self">Consume user's held item</SelectItem>
                            <SelectItem value="consume-berries">Consume held berries</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Next Damage Modifier</span>
                        <Switch
                          checked={!!workingMove?.nextDamageModifier}
                          onCheckedChange={(checked) =>
                            handleNextDamageModifierToggle(Boolean(checked))
                          }
                        />
                      </div>
                      {workingMove?.nextDamageModifier && (
                        <>
                          <div className="space-y-1">
                            <Label htmlFor="move-next-damage-percent">Next Damage %</Label>
                            <Input
                              id="move-next-damage-percent"
                              type="number"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.nextDamageModifier.percent}
                              onChange={(event) =>
                                handleNextDamageModifierField('percent', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="move-next-damage-uses">Uses</Label>
                            <Input
                              id="move-next-damage-uses"
                              type="number"
                              min="1"
                              step="1"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.nextDamageModifier.uses ?? ''}
                              onChange={(event) =>
                                handleNextDamageModifierField('uses', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Modifier Target</Label>
                            <Select
                              value={workingMove.nextDamageModifier.target || 'self'}
                              onValueChange={(value) =>
                                handleNextDamageModifierField('target', value)
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Target" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="self">Self</SelectItem>
                                <SelectItem value="enemy">Enemy</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Ignore Defender Stat Stages</span>
                        <Switch
                          checked={!!workingMove?.ignoreDefenderStatStages}
                          onCheckedChange={(checked) =>
                            handleIgnoreDefenderStatStages(Boolean(checked))
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Damage Stat Source</Label>
                        <Select
                          value={workingMove?.damageStatSource || 'user'}
                          onValueChange={(value) =>
                            updateRuntimeMoveEffects({
                              damageStatSource:
                                value === 'target' ? 'target' : undefined,
                            })
                          }
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Damage stat source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="target">Target</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 rounded-md border p-3 md:col-span-2">
                        <div className="flex items-center justify-between gap-2">
                          <Label>Conditional Damage</Label>
                          <Select
                            value="none"
                            onValueChange={(value) =>
                              handleConditionalDamageModifierAdd(value as ConditionalDamageModifierConfig['type'])
                            }
                          >
                            <SelectTrigger className="h-8 w-44 text-sm">
                              <SelectValue placeholder="Add condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none" disabled>
                                Add condition
                              </SelectItem>
                              {CONDITIONAL_DAMAGE_MODIFIER_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {!workingMove?.conditionalDamageModifiers?.length ? (
                          <p className="text-xs text-muted-foreground">
                            No conditional damage modifiers.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {workingMove.conditionalDamageModifiers.map((modifier, modifierIndex) => (
                              <div
                                key={`${workingMove.id}-conditional-damage-${modifierIndex}`}
                                className="grid gap-2 rounded-md border bg-background/50 p-2 md:grid-cols-4"
                              >
                                <div className="space-y-1">
                                  <Label>Condition</Label>
                                  <Select
                                    value={modifier.type}
                                    onValueChange={(value) =>
                                      handleConditionalDamageModifierType(
                                        modifierIndex,
                                        value as ConditionalDamageModifierConfig['type'],
                                      )
                                    }
                                  >
                                    <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                      <SelectValue placeholder="Condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {CONDITIONAL_DAMAGE_MODIFIER_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                {modifier.type === 'user-current-hp-percent' ? (
                                  <>
                                    <div className="space-y-1">
                                      <Label>Full HP Multiplier</Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        className={FIELD_CONTROL_CLASS}
                                        value={modifier.multiplierAtFullHp}
                                        onChange={(event) =>
                                          handleConditionalDamageModifierNumber(
                                            modifierIndex,
                                            'multiplierAtFullHp',
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label>Minimum Multiplier</Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        className={FIELD_CONTROL_CLASS}
                                        value={modifier.minimumMultiplier ?? ''}
                                        onChange={(event) =>
                                          handleConditionalDamageModifierNumber(
                                            modifierIndex,
                                            'minimumMultiplier',
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="flex items-center gap-2 pt-6">
                                      <Checkbox
                                        checked={!!modifier.invert}
                                        onCheckedChange={(checked) =>
                                          handleConditionalDamageModifierInvert(
                                            modifierIndex,
                                            Boolean(checked),
                                          )
                                        }
                                      />
                                      <Label>Invert HP scaling</Label>
                                    </div>
                                  </>
                                ) : modifier.type === 'fainted-party-members' ? (
                                  <>
                                    <div className="space-y-1">
                                      <Label>Base Multiplier</Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        className={FIELD_CONTROL_CLASS}
                                        value={modifier.baseMultiplier ?? ''}
                                        onChange={(event) =>
                                          handleConditionalDamageModifierNumber(
                                            modifierIndex,
                                            'baseMultiplier',
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label>Per Fainted Multiplier</Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        className={FIELD_CONTROL_CLASS}
                                        value={modifier.perFaintedMultiplier}
                                        onChange={(event) =>
                                          handleConditionalDamageModifierNumber(
                                            modifierIndex,
                                            'perFaintedMultiplier',
                                            event.target.value,
                                          )
                                        }
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div className="space-y-1">
                                    <Label>Multiplier</Label>
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      className={FIELD_CONTROL_CLASS}
                                      value={modifier.multiplier}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierNumber(
                                          modifierIndex,
                                          'multiplier',
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                {modifier.type === 'remaining-move-uses-at-or-below' ? (
                                  <div className="space-y-1">
                                    <Label>Move Uses At Or Below</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      step="1"
                                      className={FIELD_CONTROL_CLASS}
                                      value={modifier.uses}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierNumber(
                                          modifierIndex,
                                          'uses',
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : modifier.type === 'target-current-hp-at-or-below-percent' ? (
                                  <div className="space-y-1">
                                    <Label>Target HP Percent</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="1"
                                      className={FIELD_CONTROL_CLASS}
                                      value={modifier.percent}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierNumber(
                                          modifierIndex,
                                          'percent',
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : modifier.type === 'chance' ? (
                                  <div className="space-y-1">
                                    <Label>Chance %</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      step="1"
                                      className={FIELD_CONTROL_CLASS}
                                      value={modifier.chance}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierNumber(
                                          modifierIndex,
                                          'chance',
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : modifier.type === 'weather' ? (
                                  <div className="space-y-1">
                                    <Label>Weather IDs</Label>
                                    <Input
                                      className={FIELD_CONTROL_CLASS}
                                      placeholder="rain, harsh-sunlight"
                                      value={modifier.weather.join(', ')}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierWeather(
                                          modifierIndex,
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : modifier.type === 'target-pokemon-type' ? (
                                  <div className="space-y-1">
                                    <Label>Pokemon Types</Label>
                                    <Input
                                      className={FIELD_CONTROL_CLASS}
                                      placeholder="water, steel"
                                      value={modifier.pokemonTypes.join(', ')}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierPokemonTypes(
                                          modifierIndex,
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : modifier.type === 'user-previous-successful-move' ? (
                                  <div className="space-y-1">
                                    <Label>Previous Move IDs</Label>
                                    <Input
                                      className={FIELD_CONTROL_CLASS}
                                      placeholder="fire-pledge, water-pledge"
                                      value={modifier.moveIds.join(', ')}
                                      onChange={(event) =>
                                        handleConditionalDamageModifierMoveIds(
                                          modifierIndex,
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : modifier.type === 'user-status' || modifier.type === 'target-status' ? (
                                  <div className="space-y-1">
                                    <Label>Status IDs</Label>
                                    <Input
                                      className={FIELD_CONTROL_CLASS}
                                      placeholder="All, or comma-separated IDs"
                                      value={
                                        modifier.statuses === 'all' || !modifier.statuses
                                          ? ''
                                          : modifier.statuses.join(', ')
                                      }
                                      onChange={(event) =>
                                        handleConditionalDamageModifierStatuses(
                                          modifierIndex,
                                          event.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    <Label>Extra</Label>
                                    <Input className={FIELD_CONTROL_CLASS} value="" disabled />
                                  </div>
                                )}
                                <div className="flex items-end">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleConditionalDamageModifierRemove(modifierIndex)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label>Next Accuracy Bypass</Label>
                        <Select
                          value={workingMove?.nextAccuracyBypass?.target || 'none'}
                          onValueChange={handleNextAccuracyBypassTarget}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Accuracy bypass" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self">Self</SelectItem>
                            <SelectItem value="enemy">Enemy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.nextAccuracyBypass && (
                        <div className="space-y-1">
                          <Label>Accuracy Bypass Uses</Label>
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.nextAccuracyBypass.uses ?? ''}
                            onChange={(event) => handleNextAccuracyBypassUses(event.target.value)}
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Disable Stance</Label>
                        <Select
                          value={workingMove?.disableStance?.stance || 'none'}
                          onValueChange={handleDisableStanceChoice}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Disable stance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {DISABLE_STANCE_CHOICES.map((stance) => (
                              <SelectItem key={stance} value={stance}>
                                {stance}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.disableStance && (
                        <div className="space-y-1">
                          <Label>Disable Turns</Label>
                          <Input
                            type="number"
                            min="1"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.disableStance.turns}
                            onChange={(event) => handleDisableStanceTurns(event.target.value)}
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Battle Condition</Label>
                        <Select
                          value={workingMove?.battleCondition?.type || 'none'}
                          onValueChange={handleBattleConditionType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Battle condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="user-status">User must have status</SelectItem>
                            <SelectItem value="target-status">Target must have status</SelectItem>
                            <SelectItem value="last-ally-fainted-previous-turn">
                              Ally fainted last turn
                            </SelectItem>
                            <SelectItem value="user-has-used-other-moves">
                              User has used other moves
                            </SelectItem>
                            <SelectItem value="not-last-used-move">
                              Not last used move
                            </SelectItem>
                            <SelectItem value="first-active-turn">
                              First active turn
                            </SelectItem>
                            <SelectItem value="opposite-gender-target">
                              Opposite-gender target
                            </SelectItem>
                            <SelectItem value="user-has-held-item">
                              User has held item
                            </SelectItem>
                            <SelectItem value="target-has-held-item">
                              Target has held item
                            </SelectItem>
                            <SelectItem value="user-has-consumed-held-item">
                              User consumed held item
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {(workingMove?.battleCondition?.type === 'user-status' ||
                        workingMove?.battleCondition?.type === 'target-status') && (
                        <div className="space-y-1">
                          <Label>Required Status</Label>
                          <Select
                            value={workingMove.battleCondition.statusId}
                            onValueChange={handleBattleConditionStatus}
                          >
                            <SelectTrigger className={FIELD_CONTROL_CLASS}>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusIds.map((statusId) => (
                                <SelectItem key={statusId} value={statusId}>
                                  {statusId}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Post-Damage Status Cure</Label>
                        <Select
                          value={workingMove?.postDamageStatusCure?.target || 'none'}
                          onValueChange={handlePostDamageStatusCureTarget}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Post-damage cure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self">Self</SelectItem>
                            <SelectItem value="enemy">Enemy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.postDamageStatusCure && (
                        <div className="space-y-1">
                          <Label>Post-Damage Cured Statuses</Label>
                          <Input
                            className={FIELD_CONTROL_CLASS}
                            placeholder="All, or comma-separated IDs"
                            value={
                              workingMove.postDamageStatusCure.statuses === 'all'
                                ? ''
                                : workingMove.postDamageStatusCure.statuses.join(', ')
                            }
                            onChange={(event) =>
                              handlePostDamageStatusCureStatuses(event.target.value)
                            }
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Post-Damage Stat Stage</Label>
                        <Select
                          value={workingMove?.postDamageStatStage?.target || 'none'}
                          onValueChange={handlePostDamageStatStageTarget}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Post-damage stat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self">Self on target KO</SelectItem>
                            <SelectItem value="enemy">Enemy on target KO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.postDamageStatStage && (
                        <>
                          <div className="space-y-1">
                            <Label>Post-Damage Stat</Label>
                            <Select
                              value={workingMove.postDamageStatStage.stat}
                              onValueChange={(value) =>
                                handlePostDamageStatStageField('stat', value)
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Stat" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUFF_STATS.map((stat) => (
                                  <SelectItem key={stat} value={stat}>
                                    {stat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Post-Damage Stages</Label>
                            <Input
                              type="number"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.postDamageStatStage.stages}
                              onChange={(event) =>
                                handlePostDamageStatStageField('stages', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Post-Damage Chance %</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.postDamageStatStage.chance ?? ''}
                              onChange={(event) =>
                                handlePostDamageStatStageField('chance', event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
                      <div className="space-y-1">
                        <Label>Stat Stage Effect</Label>
                        <Select
                          value={workingMove?.statStageEffect?.type || 'none'}
                          onValueChange={handleStatStageEffectType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Stat stage effect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="copy-target">Copy target stages</SelectItem>
                            <SelectItem value="swap-self">Swap user stages</SelectItem>
                            <SelectItem value="reset">Reset stages</SelectItem>
                            <SelectItem value="swap-target">Swap with target</SelectItem>
                            <SelectItem value="invert-target">Invert target stages</SelectItem>
                            <SelectItem value="boost-pokemon-type">Boost Pokemon type</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {(workingMove?.statStageEffect?.type === 'copy-target' ||
                        workingMove?.statStageEffect?.type === 'reset' ||
                        workingMove?.statStageEffect?.type === 'swap-target' ||
                        workingMove?.statStageEffect?.type === 'invert-target' ||
                        workingMove?.statStageEffect?.type === 'boost-pokemon-type') && (
                        <div className="space-y-1">
                          <Label>Stat Stage Target</Label>
                          <Select
                            value={workingMove.statStageEffect.target || 'self'}
                            onValueChange={handleStatStageEffectTarget}
                          >
                            <SelectTrigger className={FIELD_CONTROL_CLASS}>
                              <SelectValue placeholder="Target" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="self">Self</SelectItem>
                              <SelectItem value="enemy">Enemy</SelectItem>
                              {(workingMove.statStageEffect.type === 'reset' ||
                                workingMove.statStageEffect.type === 'boost-pokemon-type') && (
                                <SelectItem value="both">Both</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {workingMove?.statStageEffect?.type === 'boost-pokemon-type' && (
                        <>
                          <div className="space-y-1">
                            <Label>Required Pokemon Type</Label>
                            <Select
                              value={workingMove.statStageEffect.pokemonType}
                              onValueChange={(value) =>
                                handleBoostPokemonTypeField('pokemonType', value)
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Pokemon type" />
                              </SelectTrigger>
                              <SelectContent>
                                {POKEMON_TYPES.map((pokemonType) => (
                                  <SelectItem key={pokemonType} value={pokemonType}>
                                    {pokemonType}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Stage Change</Label>
                            <Input
                              type="number"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.statStageEffect.stages}
                              onChange={(event) =>
                                handleBoostPokemonTypeField('stages', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Stats</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {STAT_STAGE_EFFECT_STATS.map((stat) => (
                                <div
                                  key={stat}
                                  className="flex items-center gap-2 rounded border border-border px-2 py-1 text-xs"
                                >
                                  <Checkbox
                                    checked={(
                                      workingMove.statStageEffect as Extract<
                                        StatStageEffectConfig,
                                        { type: 'boost-pokemon-type' }
                                      >
                                    ).stats.includes(stat)}
                                    onCheckedChange={(checked) =>
                                      handleBoostPokemonTypeStat(stat, checked === true)
                                    }
                                  />
                                  <span>{stat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      {workingMove?.statStageEffect?.type === 'swap-self' && (
                        <>
                          <div className="space-y-1">
                            <Label>Swap First Stat</Label>
                            <Select
                              value={workingMove.statStageEffect.first}
                              onValueChange={(value) => handleStatStageEffectSwapStat('first', value)}
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="First stat" />
                              </SelectTrigger>
                              <SelectContent>
                                {STAT_STAGE_EFFECT_STATS.map((stat) => (
                                  <SelectItem key={stat} value={stat}>
                                    {stat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Swap Second Stat</Label>
                            <Select
                              value={workingMove.statStageEffect.second}
                              onValueChange={(value) => handleStatStageEffectSwapStat('second', value)}
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Second stat" />
                              </SelectTrigger>
                              <SelectContent>
                                {STAT_STAGE_EFFECT_STATS.map((stat) => (
                                  <SelectItem key={stat} value={stat}>
                                    {stat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Transform Into Target</span>
                        <Switch
                          checked={!!workingMove?.transformEffect}
                          onCheckedChange={(checked) => handleTransformEffectToggle(Boolean(checked))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Move Lock Effect</Label>
                        <Select
                          value={workingMove?.moveLockEffect?.target || 'none'}
                          onValueChange={handleMoveLockEffectTarget}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Move lock" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="enemy">Enemy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.moveLockEffect && (
                        <div className="space-y-1">
                          <Label>Move Lock Turns</Label>
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.moveLockEffect.turns}
                            onChange={(event) => handleMoveLockEffectTurns(event.target.value)}
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Move Use Depletion</Label>
                        <Select
                          value={workingMove?.moveUseEffect?.target || 'none'}
                          onValueChange={handleMoveUseEffectTarget}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Move use depletion" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self">Self</SelectItem>
                            <SelectItem value="enemy">Enemy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.moveUseEffect && (
                        <div className="space-y-1">
                          <Label>Move Uses Removed</Label>
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.moveUseEffect.amount}
                            onChange={(event) => handleMoveUseEffectAmount(event.target.value)}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Curse Type Branch</span>
                        <Switch
                          checked={!!workingMove?.curseEffect}
                          onCheckedChange={(checked) => handleCurseEffectToggle(Boolean(checked))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Type Change Effect</Label>
                        <Select
                          value={workingMove?.typeChangeEffect?.type || 'none'}
                          onValueChange={handleTypeChangeEffectType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Type change effect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="random">Random type</SelectItem>
                            <SelectItem value="first-known-move">First known move type</SelectItem>
                            <SelectItem value="resist-last-opponent-move">Resist last opponent move</SelectItem>
                            <SelectItem value="target-primary">Target primary type</SelectItem>
                            <SelectItem value="set">Set type</SelectItem>
                            <SelectItem value="add">Add type</SelectItem>
                            <SelectItem value="remove">Remove type</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.typeChangeEffect && (
                        <div className="space-y-1">
                          <Label>Type Change Target</Label>
                          <Select
                            value={workingMove.typeChangeEffect.target || 'self'}
                            onValueChange={handleTypeChangeEffectTarget}
                          >
                            <SelectTrigger className={FIELD_CONTROL_CLASS}>
                              <SelectValue placeholder="Target" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="self">Self</SelectItem>
                              <SelectItem value="enemy">Enemy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {workingMove?.typeChangeEffect &&
                        (workingMove.typeChangeEffect.type === 'set' ||
                          workingMove.typeChangeEffect.type === 'add' ||
                          workingMove.typeChangeEffect.type === 'remove') && (
                          <>
                            <div className="space-y-1">
                              <Label>Battle Type</Label>
                              <Select
                                value={workingMove.typeChangeEffect.pokemonType}
                                onValueChange={handleTypeChangeEffectPokemonType}
                              >
                                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                  <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {MOVE_TYPE_CHANGE_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label>Type Change Turns</Label>
                              <Input
                                type="number"
                                min="1"
                                step="1"
                                className={FIELD_CONTROL_CLASS}
                                value={workingMove.typeChangeEffect.turns ?? ''}
                                onChange={(event) => handleTypeChangeEffectTurns(event.target.value)}
                              />
                            </div>
                          </>
                        )}
                      <div className="space-y-1">
                        <Label>Status Cure</Label>
                        <Select
                          value={
                            workingMove?.statusCure
                              ? `${workingMove.statusCure.target}:${
                                  workingMove.statusCure.statuses === 'all' ? 'all' : 'specific'
                                }`
                              : 'none'
                          }
                          onValueChange={handleStatusCureMode}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Status cure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self:all">Self: all statuses</SelectItem>
                            <SelectItem value="self:specific">Self: selected statuses</SelectItem>
                            <SelectItem value="enemy:all">Enemy: all statuses</SelectItem>
                            <SelectItem value="enemy:specific">Enemy: selected statuses</SelectItem>
                            <SelectItem value="ally-party:all">Party: all statuses</SelectItem>
                            <SelectItem value="ally-party:specific">Party: selected statuses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.statusCure && (
                        <>
                          <div className="space-y-1">
                            <Label>Status Cure Heal User %</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.statusCure.healUserPercent ?? ''}
                              onChange={(event) =>
                                updateRuntimeMoveEffects({
                                  statusCure: {
                                    ...workingMove.statusCure!,
                                    healUserPercent: event.target.value
                                      ? Number(event.target.value)
                                      : undefined,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                            <span>Fail if no status</span>
                            <Switch
                              checked={!!workingMove.statusCure.failIfNoStatus}
                              onCheckedChange={(checked) =>
                                updateRuntimeMoveEffects({
                                  statusCure: {
                                    ...workingMove.statusCure!,
                                    failIfNoStatus: checked ? true : undefined,
                                  },
                                })
                              }
                            />
                          </div>
                        </>
                      )}
                      {workingMove?.statusCure && workingMove.statusCure.statuses !== 'all' && (
                        <div className="space-y-2 rounded-md border p-3 md:col-span-2">
                          <Label>Cured Statuses</Label>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {statusIds.map((statusId) => (
                              <div key={statusId} className="flex items-center gap-2 text-sm">
                                <Checkbox
                                  checked={workingMove.statusCure?.statuses !== 'all' &&
                                    !!workingMove.statusCure?.statuses.includes(statusId as StatusEffectId)}
                                  onCheckedChange={(checked) =>
                                    handleStatusCureStatusToggle(statusId, Boolean(checked))
                                  }
                                />
                                <span>{statusId}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Status Transfer</Label>
                        <Select
                          value={
                            workingMove?.statusTransfer
                              ? `self:enemy:${
                                  workingMove.statusTransfer.statuses === 'all' ? 'all' : 'specific'
                                }`
                              : 'none'
                          }
                          onValueChange={handleStatusTransferMode}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Status transfer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self:enemy:all">Self to enemy: all statuses</SelectItem>
                            <SelectItem value="self:enemy:specific">
                              Self to enemy: selected statuses
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.statusTransfer && (
                        <>
                          <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                            <span>Clear source on success</span>
                            <Switch
                              checked={workingMove.statusTransfer.clearSourceOnSuccess !== false}
                              onCheckedChange={(checked) =>
                                updateRuntimeMoveEffects({
                                  statusTransfer: {
                                    ...workingMove.statusTransfer!,
                                    clearSourceOnSuccess: !!checked,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                            <span>Fail if no status</span>
                            <Switch
                              checked={!!workingMove.statusTransfer.failIfNoStatus}
                              onCheckedChange={(checked) =>
                                updateRuntimeMoveEffects({
                                  statusTransfer: {
                                    ...workingMove.statusTransfer!,
                                    failIfNoStatus: checked ? true : undefined,
                                  },
                                })
                              }
                            />
                          </div>
                        </>
                      )}
                      {workingMove?.statusTransfer &&
                        workingMove.statusTransfer.statuses !== 'all' && (
                          <div className="space-y-2 rounded-md border p-3 md:col-span-2">
                            <Label>Transferred Statuses</Label>
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                              {statusIds.map((statusId) => (
                                <div key={statusId} className="flex items-center gap-2 text-sm">
                                  <Checkbox
                                    checked={
                                      workingMove.statusTransfer?.statuses !== 'all' &&
                                      !!workingMove.statusTransfer?.statuses.includes(
                                        statusId as StatusEffectId,
                                      )
                                    }
                                    onCheckedChange={(checked) =>
                                      handleStatusTransferStatusToggle(statusId, Boolean(checked))
                                    }
                                  />
                                  <span>{statusId}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      <div className="space-y-1">
                        <Label>Secondary Status Cure</Label>
                        <Select
                          value={workingMove?.secondaryStatusCure?.target || 'none'}
                          onValueChange={handleSecondaryStatusCureTarget}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Secondary status cure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="self">Self</SelectItem>
                            <SelectItem value="enemy">Enemy</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.secondaryStatusCure && (
                        <>
                          <div className="space-y-1">
                            <Label>Secondary Status Cure Scope</Label>
                            <Select
                              value={workingMove.secondaryStatusCure.scope || 'pokemon'}
                              onValueChange={handleSecondaryStatusCureScope}
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Secondary status cure scope" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pokemon">Pokemon</SelectItem>
                                <SelectItem value="side">Side</SelectItem>
                                <SelectItem value="pokemon-and-side">Pokemon + Side</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Secondary Status IDs</Label>
                            <Input
                              className={FIELD_CONTROL_CLASS}
                              placeholder="All, or comma-separated IDs"
                              value={workingMove.secondaryStatusCure.ids?.join(', ') ?? ''}
                              onChange={(event) =>
                                handleSecondaryStatusCureIds(event.target.value)
                              }
                            />
                          </div>
                        </>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Party Revive</span>
                        <Switch
                          checked={!!workingMove?.partyRevive}
                          onCheckedChange={(checked) =>
                            handlePartyReviveToggle(Boolean(checked))
                          }
                        />
                      </div>
                      {workingMove?.partyRevive && (
                        <div className="space-y-1">
                          <Label>Revive HP %</Label>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            className={FIELD_CONTROL_CLASS}
                            value={workingMove.partyRevive.hpPercent}
                            onChange={(event) =>
                              handlePartyReviveHpPercent(event.target.value)
                            }
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <Label>Switch Effect</Label>
                        <Select
                          value={workingMove?.switchEffect?.type || 'none'}
                          onValueChange={handleSwitchEffectType}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Switch effect" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {SWITCH_EFFECT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {workingMove?.switchEffect?.type === 'self-pending' && (
                        <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                          <span>Pass stat stages</span>
                          <Switch
                            checked={!!workingMove.switchEffect.passStatStages}
                            onCheckedChange={(checked) =>
                              handleSwitchEffectPassStages(Boolean(checked))
                            }
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                        <span>Battle Reward</span>
                        <Switch
                          checked={!!workingMove?.battleRewards?.rewards.length}
                          onCheckedChange={(checked) =>
                            handleBattleRewardsToggle(Boolean(checked))
                          }
                        />
                      </div>
                      {workingMove?.battleRewards?.rewards[0] && (
                        <>
                          <div className="space-y-1">
                            <Label>Reward Type</Label>
                            <Select
                              value={workingMove.battleRewards.rewards[0].type}
                              onValueChange={(value) => handleBattleRewardField('type', value)}
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Reward type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="currency">Currency</SelectItem>
                                <SelectItem value="item">Item</SelectItem>
                                <SelectItem value="xp">XP</SelectItem>
                                <SelectItem value="pokemon_research_xp">Pokemon Research XP</SelectItem>
                                <SelectItem value="task_complete">Task Complete</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Reward Target ID</Label>
                            <Input
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.battleRewards.rewards[0].targetId?.toString() ?? ''}
                              onChange={(event) =>
                                handleBattleRewardField('targetId', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Reward Quantity</Label>
                            <Input
                              type="number"
                              className={FIELD_CONTROL_CLASS}
                              value={
                                typeof workingMove.battleRewards.rewards[0].quantity === 'number'
                                  ? workingMove.battleRewards.rewards[0].quantity
                                  : ''
                              }
                              onChange={(event) =>
                                handleBattleRewardField('quantity', event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Reward Chance %</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className={FIELD_CONTROL_CLASS}
                              value={workingMove.battleRewards.rewards[0].dropChance ?? ''}
                              onChange={(event) =>
                                handleBattleRewardField('dropChance', event.target.value)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3 rounded-md border p-3 text-sm">
                            <span>Guaranteed</span>
                            <Switch
                              checked={!!workingMove.battleRewards.rewards[0].guaranteed}
                              onCheckedChange={(checked) =>
                                handleBattleRewardField('guaranteed', Boolean(checked))
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <details className="rounded-md border bg-background/60 p-3">
                      <summary className="cursor-pointer text-sm font-medium">
                        Advanced Runtime JSON
                      </summary>
                      <div className="mt-3 space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <p className="text-xs text-muted-foreground">
                            Optional escape hatch for the same fields shown above.
                          </p>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setRuntimeEffectsJson('')
                                updateWorkingMove(
                                  RUNTIME_MOVE_EFFECT_FIELDS.reduce((acc, field) => {
                                    ;(acc as Record<string, undefined>)[field] = undefined
                                    return acc
                                  }, {} as Partial<MoveConfig>),
                                )
                                setRuntimeEffectsJsonError('')
                              }}
                            >
                              Clear
                            </Button>
                            <Button type="button" size="sm" onClick={handleRuntimeEffectsJsonApply}>
                              Apply
                            </Button>
                          </div>
                        </div>
                        <Textarea
                          id="runtime-effects-json"
                          value={runtimeEffectsJson}
                          onChange={(event) => setRuntimeEffectsJson(event.target.value)}
                          className="min-h-32 font-mono text-xs"
                          placeholder='{"damageRule":{"type":"flat","amount":20}}'
                        />
                        {runtimeEffectsJsonError ? (
                          <p className="text-xs text-destructive">{runtimeEffectsJsonError}</p>
                        ) : null}
                      </div>
                    </details>
                  </div>

                  <div className="mt-3 grid gap-3 rounded-md border bg-muted/10 p-3 md:grid-cols-3">
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Heal</span>
                      <Switch
                        checked={!!workingMove?.heal}
                        onCheckedChange={(checked) => handleHealToggle(Boolean(checked))}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>Heal Full</span>
                      <Switch
                        checked={!!workingMove?.healFull}
                        disabled={!workingMove?.heal}
                        onCheckedChange={(checked) => handleHealFullToggle(Boolean(checked))}
                      />
                    </div>
                    <div className="space-y-1 rounded-md border p-3">
                      <Label htmlFor="move-absorb">Absorb damage (%)</Label>
                      <Input
                        id="move-absorb"
                        type="number"
                        min="0"
                        max="100"
                        className={FIELD_CONTROL_CLASS}
                        value={workingMove?.absorb ?? ''}
                        onChange={(event) => handleAbsorbValue(event.target.value)}
                      />
                    </div>
                  </div>
                  </section>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label>Buffs</Label>
                      <Button size="sm" variant="outline" onClick={handleAddBuff}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add buff
                      </Button>
                    </div>

                    {!workingMove?.buffs?.length ? (
                      <p className="text-xs text-muted-foreground">No buffs configured.</p>
                    ) : (
                      workingMove.buffs.map((buff, buffIndex) => (
                        <div
                          key={`${workingMove.id}-buff-${buffIndex}`}
                          className="grid gap-2 rounded-md border p-2 md:grid-cols-5"
                        >
                          <div className="space-y-1">
                            <Label>Stat</Label>
                            <Select
                              value={buff.stat}
                              onValueChange={(value) =>
                                handleUpdateBuff(buffIndex, {
                                  stat: value as BuffConfig['stat'],
                                })
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Stat" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUFF_STATS.map((stat) => (
                                  <SelectItem key={stat} value={stat}>
                                    {stat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Stages</Label>
                            <Input
                              type="number"
                              className={FIELD_CONTROL_CLASS}
                              value={buff.stages ?? ''}
                              onChange={(event) =>
                                handleUpdateBuff(buffIndex, {
                                  stages: event.target.value ? Number(event.target.value) : 0,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Chance (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className={FIELD_CONTROL_CLASS}
                              value={buff.chance ?? ''}
                              onChange={(event) =>
                                handleUpdateBuff(buffIndex, {
                                  chance: event.target.value ? Number(event.target.value) : undefined,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Target</Label>
                            <Select
                              value={buff.target || 'self'}
                              onValueChange={(value) =>
                                handleUpdateBuff(buffIndex, {
                                  target: value as BuffConfig['target'],
                                })
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Target" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUFF_TARGETS.map((target) => (
                                  <SelectItem key={target} value={target}>
                                    {target}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Remove</Label>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => handleRemoveBuff(buffIndex)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label>Debuffs</Label>
                      <Button size="sm" variant="outline" onClick={handleAddDebuff}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add debuff
                      </Button>
                    </div>

                    {!workingMove?.debuffs?.length ? (
                      <p className="text-xs text-muted-foreground">No debuffs configured.</p>
                    ) : (
                      workingMove.debuffs.map((debuff, debuffIndex) => (
                        <div
                          key={`${workingMove.id}-debuff-${debuffIndex}`}
                          className="grid gap-2 rounded-md border p-2 md:grid-cols-5"
                        >
                          <div className="space-y-1">
                            <Label>Stat</Label>
                            <Select
                              value={debuff.stat}
                              onValueChange={(value) =>
                                handleUpdateDebuff(debuffIndex, {
                                  stat: value as BuffConfig['stat'],
                                })
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Stat" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUFF_STATS.map((stat) => (
                                  <SelectItem key={stat} value={stat}>
                                    {stat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Stages</Label>
                            <Input
                              type="number"
                              className={FIELD_CONTROL_CLASS}
                              value={debuff.stages ?? ''}
                              onChange={(event) =>
                                handleUpdateDebuff(debuffIndex, {
                                  stages: event.target.value ? Number(event.target.value) : 0,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Chance (%)</Label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              className={FIELD_CONTROL_CLASS}
                              value={debuff.chance ?? ''}
                              onChange={(event) =>
                                handleUpdateDebuff(debuffIndex, {
                                  chance: event.target.value ? Number(event.target.value) : undefined,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Target</Label>
                            <Select
                              value={debuff.target || 'enemy'}
                              onValueChange={(value) =>
                                handleUpdateDebuff(debuffIndex, {
                                  target: value as BuffConfig['target'],
                                })
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Target" />
                              </SelectTrigger>
                              <SelectContent>
                                {BUFF_TARGETS.map((target) => (
                                  <SelectItem key={target} value={target}>
                                    {target}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Remove</Label>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => handleRemoveDebuff(debuffIndex)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label>Contest</Label>
                      <div className="flex items-center gap-2 text-xs">
                        <Switch
                          checked={Boolean(workingMove?.contest)}
                          onCheckedChange={(checked) => handleContestToggle(Boolean(checked))}
                        />
                        <span>Enabled</span>
                      </div>
                    </div>

                    {!workingMove?.contest ? (
                      <p className="text-xs text-muted-foreground">Contest disabled.</p>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid gap-2 md:grid-cols-3">
                          <div className="space-y-1">
                            <Label>Attacker metric</Label>
                            <Select
                              value={workingMove.contest.attackerMetric}
                              onValueChange={(value) =>
                                handleContestPatch((current) => ({
                                  ...current,
                                  attackerMetric: value as MoveContestMetric,
                                }))
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Metric" />
                              </SelectTrigger>
                              <SelectContent>
                                {MOVE_CONTEST_METRICS.map((metric) => (
                                  <SelectItem key={metric} value={metric}>
                                    {metric}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Defender metric</Label>
                            {typeof workingMove.contest.defenderMetric === 'number' ? (
                              <div className="space-y-2">
                                <Input
                                  type="number"
                                  className={FIELD_CONTROL_CLASS}
                                  value={
                                    isContestMetricValue(workingMove.contest.defenderMetric)
                                      ? String(workingMove.contest.defenderMetric)
                                      : ''
                                  }
                                  onChange={(event) => {
                                    const value = parseNumericValue(event.target.value)
                                    handleContestPatch((current) => ({
                                      ...current,
                                      defenderMetric: value ?? 0,
                                    }))
                                  }}
                                />
                              </div>
                            ) : null}
                            <Select
                              value={
                                isContestMetricValue(workingMove.contest.defenderMetric)
                                  ? CONTEST_CUSTOM_METRIC_VALUE
                                  : (workingMove.contest.defenderMetric ?? workingMove.contest.attackerMetric)
                              }
                              onValueChange={(value) =>
                                value === CONTEST_CUSTOM_METRIC_VALUE
                                  ? handleContestPatch((current) => ({
                                      ...current,
                                      defenderMetric: isContestMetricValue(current.defenderMetric)
                                        ? current.defenderMetric
                                        : 100,
                                    }))
                                  : handleContestPatch((current) => ({
                                      ...current,
                                      defenderMetric: value as MoveContestMetric,
                                    }))
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Metric" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={CONTEST_CUSTOM_METRIC_VALUE}>Custom number</SelectItem>
                                {MOVE_CONTEST_SELECTOR_METRICS.map((metric) => (
                                  <SelectItem key={metric} value={metric}>
                                    {metric}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label>Comparison</Label>
                            <Select
                              value={workingMove.contest.comparison}
                              onValueChange={(value) =>
                                handleContestPatch((current) => ({
                                  ...current,
                                  comparison: value as MoveContestComparison,
                                }))
                              }
                            >
                              <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                <SelectValue placeholder="Comparison" />
                              </SelectTrigger>
                              <SelectContent>
                                {MOVE_CONTEST_COMPARISONS.map((comparison) => (
                                  <SelectItem key={comparison} value={comparison}>
                                    {comparison}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          {renderContestOutcomeEditor(
                            'Success',
                            'success',
                            workingMove.contest,
                            (nextOutcome) =>
                              handleContestOutcomePatch('success', () => nextOutcome),
                            () => handleContestOutcomePatch('success', () => undefined),
                          )}
                          {renderContestOutcomeEditor(
                            'Failure',
                            'failure',
                            workingMove.contest,
                            (nextOutcome) =>
                              handleContestOutcomePatch('failure', () => nextOutcome),
                            () => handleContestOutcomePatch('failure', () => undefined),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="move-status">Status</Label>
                      <div className="flex items-center gap-2 text-xs">
                        <Checkbox
                          checked={Boolean(workingMove?.status)}
                          onCheckedChange={(checked) => handleStatusToggle(Boolean(checked))}
                        />
                        <span>Enabled</span>
                      </div>
                    </div>

                    <Select
                      value={workingMove?.status?.id || 'poison'}
                      disabled={!workingMove?.status}
                      onValueChange={(value) => {
                        if (!workingMove?.status) return
                        updateWorkingMove({
                          status: {
                            ...workingMove.status,
                            id: value as NonNullable<MoveConfig['status']>['id'],
                          },
                        })
                      }}
                    >
                      <SelectTrigger id="move-status" className={FIELD_CONTROL_CLASS}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusIds.map((statusId) => (
                          <SelectItem key={statusId} value={statusId}>
                            {statusId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Chance</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          className={FIELD_CONTROL_CLASS}
                          value={workingMove?.status?.chance ?? ''}
                          disabled={!workingMove?.status}
                          onChange={(event) => {
                            if (!workingMove?.status) return
                            const chance = event.target.value ? Number(event.target.value) : undefined
                            updateWorkingMove({
                              status: {
                                ...workingMove.status,
                                id: workingMove.status.id,
                                chance,
                                target: workingMove.status.target || 'enemy',
                                forceStatus: workingMove.status.forceStatus,
                              },
                            })
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Status target</Label>
                        <Select
                          value={workingMove?.status?.target || 'enemy'}
                          disabled={!workingMove?.status}
                          onValueChange={(value) => {
                            if (!workingMove?.status) return
                            updateWorkingMove({
                              status: {
                                ...workingMove.status,
                                id: workingMove.status.id,
                                target: value as StatusTarget,
                                chance: workingMove.status.chance,
                                forceStatus: workingMove.status.forceStatus,
                              },
                            })
                          }}
                        >
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Target" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_TARGETS.map((target) => (
                              <SelectItem key={target} value={target}>
                                {target}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-md border bg-muted/20 px-3 py-2 text-sm">
                      <Checkbox
                        id="move-force-status"
                        checked={Boolean(workingMove?.status?.forceStatus)}
                        disabled={!workingMove?.status}
                        onCheckedChange={(checked) => {
                          if (!workingMove?.status) return
                          updateWorkingMove({
                            status: {
                              ...workingMove.status,
                              forceStatus: Boolean(checked) || undefined,
                            },
                          })
                        }}
                      />
                      <Label htmlFor="move-force-status">Force status</Label>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <Label>Random statuses</Label>
                      <div className="flex items-center gap-2 text-xs">
                        <Checkbox
                          checked={Boolean(workingMove?.randomStatuses)}
                          onCheckedChange={(checked) => handleRandomStatusesToggle(Boolean(checked))}
                        />
                        <span>Enabled</span>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label htmlFor="move-random-status-chance">Chance (%)</Label>
                        <Input
                          id="move-random-status-chance"
                          type="number"
                          min="0"
                          max="100"
                          value={workingMove?.randomStatuses?.chance ?? ''}
                          className={FIELD_CONTROL_CLASS}
                          disabled={!workingMove?.randomStatuses}
                          onChange={(event) => handleRandomStatusesChance(event.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <Label>Options</Label>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!workingMove?.randomStatuses}
                            onClick={handleAddRandomStatus}
                          >
                            Add option
                          </Button>
                        </div>
                        {!workingMove?.randomStatuses?.options?.length && (
                          <p className="text-xs text-muted-foreground">
                            Add a random status option to configure possible effects.
                          </p>
                        )}
                      </div>
                    </div>

                    {workingMove?.randomStatuses?.options?.map((option, optionIndex) => (
                      <div key={`${workingMove.id}-random-${option.id}-${optionIndex}`} className="grid gap-2 rounded-md border p-2 sm:grid-cols-4">
                        <div className="space-y-1">
                          <Label>Status</Label>
                          <Select
                            value={option.id}
                            onValueChange={(value) =>
                              handleUpdateRandomStatus(optionIndex, {
                                id: value as RandomStatus['id'],
                              })
                            }
                          >
                            <SelectTrigger className={FIELD_CONTROL_CLASS}>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusIds.map((statusId) => (
                                <SelectItem key={statusId} value={statusId}>
                                  {statusId}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label>Chance</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={option.chance ?? ''}
                            className={FIELD_CONTROL_CLASS}
                            onChange={(event) => {
                              const numberValue =
                                event.target.value === '' ? undefined : Number(event.target.value)
                              if (event.target.value !== '' && Number.isNaN(numberValue)) return
                              handleUpdateRandomStatus(optionIndex, { chance: numberValue })
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Target</Label>
                          <Select
                            value={option.target || 'enemy'}
                            onValueChange={(value) =>
                              handleUpdateRandomStatus(optionIndex, {
                                target: value as RandomStatusTarget,
                              })
                            }
                          >
                            <SelectTrigger className={FIELD_CONTROL_CLASS}>
                              <SelectValue placeholder="Target" />
                            </SelectTrigger>
                            <SelectContent>
                              {RANDOM_STATUS_TARGETS.map((target) => (
                                <SelectItem key={target} value={target}>
                                  {target}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label>Remove</Label>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleRemoveRandomStatus(optionIndex)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <Label>Secondary statuses</Label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs">
                          <Checkbox
                            checked={Boolean(workingMove?.secondaryStatuses)}
                            onCheckedChange={(checked) => handleSecondaryStatusesToggle(Boolean(checked))}
                          />
                          <span>Enabled</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleAddSecondaryStatus}
                          disabled={!workingMove?.secondaryStatuses}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add status
                        </Button>
                      </div>
                    </div>

                    {workingMove?.secondaryStatuses?.map((secondaryStatus, statusIndex) => {
                      const turnsMode = secondaryStatus.turns === undefined
                        ? 'none'
                        : isSecondaryStatusTurnRange(secondaryStatus.turns)
                          ? 'range'
                          : 'fixed'

                      return (
                        <div
                          key={`${secondaryStatus.id}-${statusIndex}`}
                          className="space-y-3 rounded-md border bg-muted/20 p-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="text-sm font-medium">
                              {secondaryStatus.name || secondaryStatus.id || `Secondary status ${statusIndex + 1}`}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRemoveSecondaryStatus(statusIndex)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove status
                            </Button>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="space-y-1">
                              <Label>ID</Label>
                              <Input
                                className={FIELD_CONTROL_CLASS}
                                value={secondaryStatus.id}
                                onChange={(event) =>
                                  handleUpdateSecondaryStatus(statusIndex, { id: event.target.value })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Name</Label>
                              <Input
                                className={FIELD_CONTROL_CLASS}
                                value={secondaryStatus.name ?? ''}
                                onChange={(event) =>
                                  handleUpdateSecondaryStatus(statusIndex, { name: event.target.value || undefined })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Chance %</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                className={FIELD_CONTROL_CLASS}
                                value={secondaryStatus.chance ?? ''}
                                onChange={(event) =>
                                  handleUpdateSecondaryStatus(statusIndex, {
                                    chance: parseNumericValue(event.target.value),
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label>Target</Label>
                              <Select
                                value={secondaryStatus.target}
                                onValueChange={(value) =>
                                  handleUpdateSecondaryStatus(statusIndex, {
                                    target: value as SecondaryStatusTarget,
                                  })
                                }
                              >
                                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                  <SelectValue placeholder="Target" />
                                </SelectTrigger>
                                <SelectContent>
                                  {SECONDARY_STATUS_TARGETS.map((target) => (
                                    <SelectItem key={target} value={target}>
                                      {target}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="space-y-1">
                              <Label>Triggers</Label>
                              <div className="flex min-h-8 flex-wrap items-center gap-3 rounded-md border px-3 py-1.5">
                                {SECONDARY_STATUS_TRIGGERS.map((trigger) => (
                                  <div
                                    key={trigger}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <Checkbox
                                      checked={secondaryStatus.triggers.includes(trigger)}
                                      onCheckedChange={(checked) =>
                                        handleSecondaryStatusTriggerToggle(statusIndex, trigger, Boolean(checked))
                                      }
                                    />
                                    <span>{trigger}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label>Turn count</Label>
                              <Select
                                value={turnsMode}
                                onValueChange={(value) =>
                                  handleSecondaryStatusTurnsMode(
                                    statusIndex,
                                    value as 'none' | 'fixed' | 'range',
                                  )
                                }
                              >
                                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                  <SelectValue placeholder="Turn count" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">No turn limit</SelectItem>
                                  <SelectItem value="fixed">Fixed turns</SelectItem>
                                  <SelectItem value="range">Turn range</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {turnsMode === 'fixed' && (
                              <div className="space-y-1">
                                <Label>Turns</Label>
                                <Input
                                  type="number"
                                  min="1"
                                  className={FIELD_CONTROL_CLASS}
                                  value={typeof secondaryStatus.turns === 'number' ? secondaryStatus.turns : ''}
                                  onChange={(event) =>
                                    handleSecondaryStatusTurnsValue(statusIndex, 'fixed', event.target.value)
                                  }
                                />
                              </div>
                            )}
                            {turnsMode === 'range' && isSecondaryStatusTurnRange(secondaryStatus.turns) && (
                              <>
                                <div className="space-y-1">
                                  <Label>Min turns</Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    className={FIELD_CONTROL_CLASS}
                                    value={secondaryStatus.turns.min}
                                    onChange={(event) =>
                                      handleSecondaryStatusTurnsValue(statusIndex, 'min', event.target.value)
                                    }
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label>Max turns</Label>
                                  <Input
                                    type="number"
                                    min="1"
                                    className={FIELD_CONTROL_CLASS}
                                    value={secondaryStatus.turns.max}
                                    onChange={(event) =>
                                      handleSecondaryStatusTurnsValue(statusIndex, 'max', event.target.value)
                                    }
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <Label>Effects</Label>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAddSecondaryStatusEffect(statusIndex)}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add effect
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {secondaryStatus.effects.map((effect, effectIndex) => (
                                <div
                                  key={`${effect.type}-${effectIndex}`}
                                  className="grid gap-3 rounded-md border bg-background/60 p-3 md:grid-cols-2 xl:grid-cols-5"
                                >
                                  <div className="space-y-1">
                                    <Label>Effect</Label>
                                    <Select
                                      value={effect.type}
                                      onValueChange={(value) =>
                                        handleSecondaryStatusEffectType(
                                          statusIndex,
                                          effectIndex,
                                          value as SecondaryStatusEffectType,
                                        )
                                      }
                                    >
                                      <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                        <SelectValue placeholder="Effect" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {SECONDARY_STATUS_EFFECT_TYPES.map((effectType) => (
                                          <SelectItem key={effectType} value={effectType}>
                                            {effectType}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {renderSecondaryStatusEffectFields(statusIndex, effectIndex, effect)}

                                  <div className="space-y-1">
                                    <Label>Remove</Label>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="w-full"
                                      onClick={() => handleRemoveSecondaryStatusEffect(statusIndex, effectIndex)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-3 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <Label>Enemy AI rules</Label>
                      <div className="flex items-center gap-2 text-xs">
                        <Checkbox
                          checked={Boolean(workingMove?.aiUse)}
                          onCheckedChange={(checked) => handleAiUseToggle(Boolean(checked))}
                        />
                        <span>Enabled</span>
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-1">
                        <Label htmlFor="move-ai-chance">Use chance (%)</Label>
                        <Input
                          id="move-ai-chance"
                          type="number"
                          min="0"
                          max="100"
                          className={FIELD_CONTROL_CLASS}
                          value={workingMove?.aiUse?.chance ?? ''}
                          disabled={!workingMove?.aiUse}
                          onChange={(event) => handleAiUseChance(event.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="move-ai-mode">Mode</Label>
                        <Select
                          value={workingMove?.aiUse?.mode || 'all'}
                          disabled={!workingMove?.aiUse}
                          onValueChange={(value) => handleAiUseMode(value)}
                        >
                          <SelectTrigger id="move-ai-mode" className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            {AI_USE_MODES.map((mode) => (
                              <SelectItem key={mode} value={mode}>
                                {mode}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-md border p-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Label>Conditions</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!workingMove?.aiUse}
                            onClick={() => handleAiUseConditionAdd()}
                          >
                            Add condition
                          </Button>
                        </div>
                      </div>

                      {workingMove?.aiUse?.conditions?.length ? (
                        workingMove.aiUse.conditions.map((condition, index) =>
                          renderAiConditionEditor(
                            condition,
                            `#${index + 1}`,
                            (type) => handleAiUseConditionTypeChange(index, type),
                            (nextCondition) => handleAiUseConditionChange(index, nextCondition),
                            () => handleAiUseConditionRemove(index),
                          ),
                        )
                      ) : (
                        <p className="text-xs text-muted-foreground">No top-level conditions.</p>
                      )}
                    </div>

                    <div className="space-y-3 rounded-md border p-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Label>Condition Groups</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={!workingMove?.aiUse}
                            onClick={handleAiUseConditionGroupAdd}
                          >
                            Add group
                          </Button>
                        </div>
                      </div>

                      {!workingMove?.aiUse?.conditionGroups?.length && (
                        <p className="text-xs text-muted-foreground">No condition groups.</p>
                      )}

                      {workingMove?.aiUse?.conditionGroups?.map((group, groupIndex) => (
                        <div key={`group-${groupIndex}`} className="space-y-2 rounded-md border p-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Label>Group {groupIndex + 1}</Label>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAiUseConditionGroupConditionAdd(groupIndex)}
                              >
                                Add condition
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAiUseConditionGroupRemove(groupIndex)}
                              >
                                Remove group
                              </Button>
                            </div>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <div className="space-y-1">
                              <Label>Mode</Label>
                                <Select
                                value={group.mode || 'all'}
                                onValueChange={(value) => handleAiUseConditionGroupMode(groupIndex, value)}
                              >
                                <SelectTrigger className={FIELD_CONTROL_CLASS}>
                                  <SelectValue placeholder="Mode" />
                                </SelectTrigger>
                                <SelectContent>
                                  {AI_USE_MODES.map((mode) => (
                                    <SelectItem key={mode} value={mode}>
                                      {mode}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <Label>Chance (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                className={FIELD_CONTROL_CLASS}
                                value={group.chance ?? ''}
                                onChange={(event) =>
                                  handleAiUseConditionGroupChance(groupIndex, event.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            {group.conditions.map((condition, conditionIndex) =>
                              renderAiConditionEditor(
                                condition,
                                `G${groupIndex + 1}-${conditionIndex + 1}`,
                                (type) =>
                                  handleAiUseConditionGroupConditionTypeChange(
                                    groupIndex,
                                    conditionIndex,
                                    type,
                                  ),
                                (nextCondition) =>
                                  handleAiUseConditionGroupConditionChange(
                                    groupIndex,
                                    conditionIndex,
                                    nextCondition,
                                  ),
                                () =>
                                  handleAiUseConditionGroupConditionRemove(groupIndex, conditionIndex),
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="move-ai-json">AI rules (JSON)</Label>
                      <Textarea
                        id="move-ai-json"
                        className="h-40 font-mono text-xs"
                        value={aiUseJson}
                        disabled={!workingMove?.aiUse}
                        onChange={(event) => setAiUseJson(event.target.value)}
                      />
                      {aiUseJsonError && <p className="text-xs text-destructive">{aiUseJsonError}</p>}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={applyAiUseJson}
                          disabled={!workingMove?.aiUse}
                        >
                          Apply AI rules
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (!workingMove?.aiUse) return
                            setAiUseJson(JSON.stringify(workingMove.aiUse, null, 2))
                            setAiUseJsonError('')
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Advanced fallback: edit raw JSON for `conditions`, `conditionGroups`, `chance`, and `mode`.
                      </p>
                    </div>
                  </div>

                  <section className={EDITOR_PANEL_CLASS}>
                    <div className={EDITOR_PANEL_HEADER_CLASS}>
                      <div>
                        <h3 className={EDITOR_PANEL_TITLE_CLASS}>Move Text</h3>
                        <p className={EDITOR_PANEL_DESCRIPTION_CLASS}>
                          Player-facing description plus private authoring notes.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="move-description">Description</Label>
                      <Textarea
                        id="move-description"
                        value={workingMove?.description || ''}
                        onChange={(event) =>
                          updateWorkingMove({ description: event.target.value })
                        }
                        className="min-h-20 text-sm"
                        placeholder="Move description"
                      />
                    </div>

                    <div className="mt-3 space-y-3">
                      <Label htmlFor="move-notes">Notes</Label>
                      <Textarea
                        id="move-notes"
                        value={workingMove?.notes || ''}
                        onChange={(event) =>
                          updateWorkingMove({
                            notes: event.target.value.trim() ? event.target.value : undefined,
                          })
                        }
                        className="min-h-24 text-sm"
                        placeholder="Unlock notes, design notes, or authoring reminders"
                      />
                    </div>
                  </section>

                  <section className={EDITOR_PANEL_CLASS}>
                    <div className={EDITOR_PANEL_HEADER_CLASS}>
                      <div>
                        <h3 className={EDITOR_PANEL_TITLE_CLASS}>Pokemon Research Unlocks</h3>
                        <p className={EDITOR_PANEL_DESCRIPTION_CLASS}>
                          Edits `src/data/pokemon-research-level-rewards.json` for {workingMoveTmItemId || 'this move'}.
                        </p>
                      </div>
                      {researchRewardsDirty && (
                        <Badge variant="secondary" className="text-xs">
                          Unsaved unlock changes
                        </Badge>
                      )}
                    </div>

                    <div className="grid gap-3 rounded-lg border bg-muted/10 p-3 md:grid-cols-[minmax(0,1fr)_120px_auto_auto]">
                      <div className="space-y-1">
                        <Label>Pokemon form</Label>
                        <Select value={researchFormId} onValueChange={setResearchFormId}>
                          <SelectTrigger className={FIELD_CONTROL_CLASS}>
                            <SelectValue placeholder="Select form" />
                          </SelectTrigger>
                          <SelectContent>
                            {researchUnlockFormOptions.map((form) => (
                              <SelectItem key={form.id} value={form.id}>
                                {form.name} #{form.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Research level</Label>
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          className={FIELD_CONTROL_CLASS}
                          value={researchLevel}
                          onChange={(event) => setResearchLevel(Number(event.target.value) || 1)}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleAddResearchUnlock}
                          disabled={!workingMoveTmItemId || !researchFormId}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                      <div className="flex items-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleAddSelectedLearnersAsResearchUnlocks}
                          disabled={
                            !workingMoveTmItemId ||
                            !workingMoveFormIds?.length ||
                            !researchUnlockFormOptions.length
                          }
                        >
                          <CheckCheck className="mr-2 h-4 w-4" />
                          Add Learners
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
                      {selectedMoveResearchRewards.map((reward) => {
                        const form = pokemonFormById.get(reward.formId)
                        return (
                          <div
                            key={`${reward.formId}:${reward.level}:${reward.itemId}`}
                            className="grid grid-cols-[48px_minmax(0,1fr)_80px_auto] items-center gap-2 rounded-lg border bg-card p-2.5 shadow-sm"
                          >
                            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-muted">
                              {form ? (
                                <Image
                                  src={getPokemonImageUrl(form.id)}
                                  alt={form.name}
                                  fill
                                  sizes="40px"
                                  className="object-contain p-1"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                                  ?
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {form?.name || `Form #${reward.formId}`}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                #{reward.formId} unlocks {reward.itemId}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[11px]">Level</Label>
                              <Input
                                type="number"
                                min="1"
                                step="1"
                                className="h-8 text-sm"
                                value={reward.level}
                                onChange={(event) =>
                                  handleUpdateResearchUnlockLevel(reward, event.target.value)
                                }
                              />
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleRemoveResearchUnlock(reward)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                      {selectedMoveResearchRewards.length === 0 && (
                        <div className="rounded-lg border border-dashed bg-muted/10 p-4 text-center text-sm text-muted-foreground">
                          No Pokemon Research unlocks for this move.
                        </div>
                      )}
                    </div>
                  </section>

                  <section className={EDITOR_PANEL_CLASS}>
                    <div className={EDITOR_PANEL_HEADER_CLASS}>
                      <div>
                        <h3 className={EDITOR_PANEL_TITLE_CLASS}>Allowed Learner Forms</h3>
                        <p className={EDITOR_PANEL_DESCRIPTION_CLASS}>
                          Tap a form sprite to toggle selection. Empty selection or complete selection means
                          all Pokemon.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 rounded-md border bg-background/70 px-3 py-1.5 text-xs">
                          <span>Hide research assigned</span>
                          <Switch
                            checked={hideResearchAssignedLearnerForms}
                            onCheckedChange={(checked) =>
                              setHideResearchAssignedLearnerForms(Boolean(checked))
                            }
                          />
                        </div>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Filter pokemon/forms..."
                            value={formSearch}
                            className="h-8 w-48 text-sm pl-8"
                            onChange={(event) => setFormSearch(event.target.value)}
                          />
                        </div>
                        <Select value={bulkType} onValueChange={setBulkType}>
                          <SelectTrigger className="h-8 w-40 text-sm">
                            <Filter className="mr-2 h-4 w-4 opacity-70" />
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePokemonTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSelectAllByType}
                            disabled={
                              bulkType === ALL_TYPES_FILTER_VALUE ||
                              (bulkType === RECOMMENDED_TYPES_FILTER_VALUE && !selectedMoveRecommendedFormIds.size)
                            }
                          >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Select All Type
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleApplyRecommendations}
                          disabled={!selectedMoveRecommendedFormIds.size}
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Apply Recommendations
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleSetAllForms}>
                          <CheckCheck className="mr-2 h-4 w-4" />
                          Use All Pokemon
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary">
                        {isAllForms ? 'All Pokemon selected' : `${selectedFormIds.size} selected`}
                      </Badge>
                      <Badge variant="outline">
                        {filteredPokemonForms.length} visible
                      </Badge>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3">
                      {filteredPokemonForms.map((form) => (
                        <PokemonFormCard
                          key={form.id}
                          form={form}
                          selected={isFormSelected(form.id)}
                          recommended={isFormRecommended(form.id)}
                          researchMoveCount={researchMoveCountByFormId.get(form.id) ?? 0}
                          usableMoveCount={usableMoveCountByFormId.get(form.id) ?? 0}
                          onToggle={toggleForm}
                        />
                      ))}
                      {filteredPokemonForms.length === 0 && (
                        <div className="rounded-lg border border-dashed bg-muted/10 py-6 text-center text-sm text-muted-foreground">
                          No matching pokemon/forms.
                        </div>
                      )}
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="json" className="mt-0 p-4">
                  <div className="space-y-3">
                    <Textarea
                      className="h-[54rem] font-mono text-xs"
                      value={jsonValue}
                      onChange={(event) => setJsonValue(event.target.value)}
                    />
                    {jsonError && <p className="text-xs text-destructive">{jsonError}</p>}
                    <div className="flex gap-2">
                      <Button size="sm" onClick={applyRawJson}>
                        Apply JSON
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!workingMove) return
                          setJsonValue(JSON.stringify(workingMove, null, 2))
                          setJsonError('')
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          )}
        </section>
      </div>
      </div>
    </div>
  )
}
