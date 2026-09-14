'use client'

import Image from 'next/image'
import * as React from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ItemSprite } from '@/components/ui/item-sprite'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  BadgeCheck,
  Clock,
  Coins,
  Copy,
  Eye,
  FlaskConical,
  Info,
  Loader2,
  Package,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
  WandSparkles,
} from 'lucide-react'
import {
  createAbilityEntry,
  getAbilityPokemonFormList,
  getCurrencyList,
  getItemList,
  getSkillList,
  readAbilityEditorData,
  saveAbilityEntry,
  type AbilityEditorEntry,
  type AbilityEditorSavePayload,
} from '../actions'
import { DataSelector } from './selectors/DataSelector'
import type { AbilityEffect, AbilityEffectCondition } from '@/data/abilities'
import type { LocationEncounter, LocationReward } from '@/data/types'

type EditableAbility = AbilityEditorSavePayload & { generated?: boolean }
type EditableEffect = AbilityEffect & Record<string, any>
type EditableCondition = AbilityEffectCondition & Record<string, any>
type EditableReward = LocationReward & Record<string, any>

type AbilityPokemonFormGroup = Awaited<ReturnType<typeof getAbilityPokemonFormList>>[number]
type FlattenedPokemonForm = AbilityPokemonFormGroup['forms'][number] & {
  speciesId: number
  speciesName: string
}

const ABILITY_TYPES = ['timer', 'reward', 'shiny', 'encounter', 'level', 'catch', 'escape', 'answer'] as const

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
}

const EFFECT_GROUPS = [
  {
    name: 'Encounter',
    types: [
      'temporary-copy-target-primary-ability',
      'encounter-replacement',
      'timer-delta',
      'level-delta',
      'shiny-chance-multiplier',
      'extra-shiny-roll',
      'catch-rate-multiplier',
      'active-escape',
      'quiz-decoration',
    ],
  },
  {
    name: 'Answer',
    types: [
      'answer-convert-wrong-to-correct',
      'answer-fail-encounter',
      'answer-skip-default',
      'answer-rate-delta',
      'answer-timer-delta',
      'answer-reset-correct-streak',
    ],
  },
  {
    name: 'Capture',
    types: [
      'capture-rewards',
      'capture-material-reward',
      'capture-currency-by-level',
      'capture-candy-by-level',
      'capture-source-form-item',
      'capture-random-item',
      'capture-research-xp',
    ],
  },
  {
    name: 'Research',
    types: [
      'research-session-time-delta',
      'research-answer-grace',
      'research-win-delta',
      'research-skill-xp-multiplier',
      'research-rewards',
    ],
  },
  {
    name: 'Field Observation',
    types: [
      'field-observation-duration-delta',
      'field-observation-pool-weight-multiplier',
      'field-observation-spawn-modifier',
      'field-observation-global-event-odds-multiplier',
      'field-observation-collectible-modifier',
      'field-observation-extra-collectible',
      'field-observation-reward-protection',
      'field-observation-research-xp-multiplier',
    ],
  },
] as const

const EFFECT_TYPES = EFFECT_GROUPS.flatMap((group) => group.types)
const EFFECT_GROUP_BY_TYPE = new Map(
  EFFECT_GROUPS.flatMap((group) => group.types.map((type) => [type, group.name])),
)

const EFFECT_HELP: Record<string, { title: string; description: string }> = {
  'temporary-copy-target-primary-ability': {
    title: 'Copy target ability',
    description: 'Temporarily gives the active Pokemon the wild Pokemon primary ability.',
  },
  'encounter-replacement': {
    title: 'Encounter replacement',
    description: 'Adds or replaces the wild encounter pool with specific Pokemon.',
  },
  'timer-delta': { title: 'Encounter timer', description: 'Adds or removes seconds from an encounter.' },
  'level-delta': { title: 'Encounter level', description: 'Changes the generated encounter level.' },
  'shiny-chance-multiplier': { title: 'Shiny multiplier', description: 'Multiplies shiny odds.' },
  'extra-shiny-roll': { title: 'Extra shiny roll', description: 'Adds another shiny roll for matching targets.' },
  'catch-rate-multiplier': { title: 'Catch multiplier', description: 'Multiplies catch progress or odds.' },
  'active-escape': { title: 'Escape chance', description: 'Lets the active Pokemon flee the encounter.' },
  'quiz-decoration': { title: 'Quiz decoration', description: 'Changes how quiz options are presented.' },
  'answer-convert-wrong-to-correct': {
    title: 'Answer forgiveness',
    description: 'Converts a wrong answer into a correct answer.',
  },
  'answer-fail-encounter': { title: 'Answer failure', description: 'Fails an encounter when the condition matches.' },
  'answer-skip-default': { title: 'Skip default answer', description: 'Suppresses the normal answer result behavior.' },
  'answer-rate-delta': { title: 'Catch progress', description: 'Adds or scales catch progress from answers.' },
  'answer-timer-delta': { title: 'Answer timer', description: 'Adds or removes milliseconds after an answer.' },
  'answer-reset-correct-streak': {
    title: 'Reset streak',
    description: 'Resets the current correct-answer streak.',
  },
  'capture-rewards': { title: 'Capture rewards', description: 'Drops authored rewards after a capture.' },
  'capture-material-reward': { title: 'Capture material', description: 'Drops typed material after a capture.' },
  'capture-currency-by-level': {
    title: 'Currency by level',
    description: 'Awards currency scaled by encounter level.',
  },
  'capture-candy-by-level': { title: 'Candy by level', description: 'Drops Pokemon candy after capture.' },
  'capture-source-form-item': {
    title: 'Source form item',
    description: 'Drops an item selected by the active Pokemon form.',
  },
  'capture-random-item': { title: 'Random item', description: 'Chooses one item from a visual item pool.' },
  'capture-research-xp': {
    title: 'Pokemon research XP',
    description: 'Awards research XP to the encounter form.',
  },
  'research-session-time-delta': {
    title: 'Research timer',
    description: 'Adds or removes seconds from a research game session.',
  },
  'research-answer-grace': {
    title: 'Research answer grace',
    description: 'Lets a research-game answer avoid a failure or penalty.',
  },
  'research-win-delta': {
    title: 'Research win delta',
    description: 'Changes win progress in supported research games.',
  },
  'research-skill-xp-multiplier': {
    title: 'Research skill XP',
    description: 'Multiplies skill XP earned from research games.',
  },
  'research-rewards': { title: 'Research rewards', description: 'Drops rewards from research game completion.' },
  'field-observation-duration-delta': {
    title: 'Field duration',
    description: 'Changes Field Observation duration or answer window.',
  },
  'field-observation-pool-weight-multiplier': {
    title: 'Field pool weight',
    description: 'Multiplies weighted Field Observation spawn pools.',
  },
  'field-observation-spawn-modifier': {
    title: 'Field spawn modifier',
    description: 'Adjusts spawn count, shiny odds, hidden odds, or event odds.',
  },
  'field-observation-global-event-odds-multiplier': {
    title: 'Field event odds',
    description: 'Multiplies Pokemon or item global event odds.',
  },
  'field-observation-collectible-modifier': {
    title: 'Field collectibles',
    description: 'Adjusts collectible drop chance, quantity, or duration.',
  },
  'field-observation-extra-collectible': {
    title: 'Extra collectible',
    description: 'Adds a visual reward to Field Observation collectible results.',
  },
  'field-observation-reward-protection': {
    title: 'Reward protection',
    description: 'Protects a Field Observation reward from loss.',
  },
  'field-observation-research-xp-multiplier': {
    title: 'Field research XP',
    description: 'Multiplies Pokemon research XP from Field Observation.',
  },
}

const QUIZ_DECORATION_MODES = [
  'hide-option-labels',
  'scramble-question-and-options',
  'remove-wrong-option',
  'replace-wrong-option',
  'disable-wrong-options',
  'highlight-random-option',
  'highlight-correct-option',
  'rotate-options',
  'swap-correct-with-last-position',
]

const REWARD_TYPES = ['item', 'currency', 'xp', 'pokemon_research_xp'] as const
const TRIGGERS = ['any', 'correct', 'wrong', 'complete'] as const
const TIME_OF_DAY = ['any', 'day', 'night'] as const
const BOOLEAN_FILTERS = [
  'firstAnswer',
  'sameSourceForm',
  'activeLevelBeatsTarget',
  'noWrongAnswers',
  'caught',
  'timeRemaining',
] as const

const EFFECT_DEFAULTS: Record<string, EditableEffect> = {
  'temporary-copy-target-primary-ability': {
    type: 'temporary-copy-target-primary-ability',
    chance: 50,
  },
  'encounter-replacement': {
    type: 'encounter-replacement',
    chance: 1,
    encounters: [{ speciesId: 25, formId: '25', chance: 100 }],
  },
  'timer-delta': { type: 'timer-delta', seconds: 5 },
  'level-delta': { type: 'level-delta', levels: 1 },
  'shiny-chance-multiplier': { type: 'shiny-chance-multiplier', multiplier: 1.1 },
  'extra-shiny-roll': { type: 'extra-shiny-roll', mode: 'same-source-form' },
  'catch-rate-multiplier': { type: 'catch-rate-multiplier', multiplier: 1.1 },
  'active-escape': { type: 'active-escape', chance: 30 },
  'quiz-decoration': { type: 'quiz-decoration', mode: 'remove-wrong-option', chance: 10 },
  'answer-convert-wrong-to-correct': {
    type: 'answer-convert-wrong-to-correct',
    chance: 10,
  },
  'answer-fail-encounter': { type: 'answer-fail-encounter', abilityLost: false },
  'answer-skip-default': { type: 'answer-skip-default' },
  'answer-rate-delta': {
    type: 'answer-rate-delta',
    amount: 1,
    condition: { trigger: 'correct' },
  },
  'answer-timer-delta': { type: 'answer-timer-delta', milliseconds: -1000 },
  'answer-reset-correct-streak': { type: 'answer-reset-correct-streak' },
  'capture-rewards': {
    type: 'capture-rewards',
    rewards: [{ type: 'item', targetId: 'battle-potion', quantity: 1, dropChance: 10 }],
  },
  'capture-material-reward': {
    type: 'capture-material-reward',
    materialType: 'normal',
    quantity: 3,
    dropChance: 100,
  },
  'capture-currency-by-level': {
    type: 'capture-currency-by-level',
    currencyId: 'pokedollars',
    levelMultiplier: 3,
  },
  'capture-candy-by-level': { type: 'capture-candy-by-level', dropChance: 30 },
  'capture-source-form-item': {
    type: 'capture-source-form-item',
    sourceFormItems: {},
    fallbackItemId: 'tiny-mushroom',
    chance: 1,
  },
  'capture-random-item': {
    type: 'capture-random-item',
    itemIds: ['fire-stone', 'water-stone'],
    chance: 1,
  },
  'capture-research-xp': {
    type: 'capture-research-xp',
    target: 'encounter-form',
    amount: 5,
  },
  'research-session-time-delta': { type: 'research-session-time-delta', seconds: 5 },
  'research-answer-grace': { type: 'research-answer-grace', chance: 10 },
  'research-win-delta': { type: 'research-win-delta', amount: 1 },
  'research-skill-xp-multiplier': {
    type: 'research-skill-xp-multiplier',
    multiplier: 1.05,
  },
  'research-rewards': {
    type: 'research-rewards',
    rewards: [{ type: 'item', targetId: 'research-kit', quantity: 1, dropChance: 5 }],
  },
  'field-observation-duration-delta': {
    type: 'field-observation-duration-delta',
    observationSeconds: 5,
  },
  'field-observation-pool-weight-multiplier': {
    type: 'field-observation-pool-weight-multiplier',
    multiplier: 1.5,
  },
  'field-observation-spawn-modifier': {
    type: 'field-observation-spawn-modifier',
    spawnCountMultiplier: 1.1,
  },
  'field-observation-global-event-odds-multiplier': {
    type: 'field-observation-global-event-odds-multiplier',
    pokemonEventMultiplier: 1.2,
  },
  'field-observation-collectible-modifier': {
    type: 'field-observation-collectible-modifier',
    dropChanceMultiplier: 1.1,
  },
  'field-observation-extra-collectible': {
    type: 'field-observation-extra-collectible',
    reward: { type: 'item', targetId: 'pearl', quantity: 1, dropChance: 5 },
    kind: 'item',
  },
  'field-observation-reward-protection': {
    type: 'field-observation-reward-protection',
    chance: 20,
  },
  'field-observation-research-xp-multiplier': {
    type: 'field-observation-research-xp-multiplier',
    multiplier: 1.05,
  },
}

const EFFECT_TEMPLATES: { label: string; icon: React.ReactNode; effect: EditableEffect }[] = [
  {
    label: 'Catch multiplier',
    icon: <Sparkles className="h-4 w-4" />,
    effect: EFFECT_DEFAULTS['catch-rate-multiplier'],
  },
  {
    label: 'Answer bonus',
    icon: <WandSparkles className="h-4 w-4" />,
    effect: EFFECT_DEFAULTS['answer-rate-delta'],
  },
  {
    label: 'Capture item',
    icon: <Package className="h-4 w-4" />,
    effect: EFFECT_DEFAULTS['capture-rewards'],
  },
  {
    label: 'Research time',
    icon: <FlaskConical className="h-4 w-4" />,
    effect: EFFECT_DEFAULTS['research-session-time-delta'],
  },
  {
    label: 'Field timer',
    icon: <Eye className="h-4 w-4" />,
    effect: EFFECT_DEFAULTS['field-observation-duration-delta'],
  },
  {
    label: 'Field drop',
    icon: <Plus className="h-4 w-4" />,
    effect: EFFECT_DEFAULTS['field-observation-extra-collectible'],
  },
]

async function getAbilityFormOptionList() {
  const groups = await getAbilityPokemonFormList()
  return groups.flatMap((group) =>
    group.forms.map((form) => ({
      id: form.id,
      name: `${form.name} (${form.id})`,
    })),
  )
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

function stringifyEffects(effects: readonly EditableEffect[]) {
  return JSON.stringify(effects, null, 2)
}

function parseCsv(value: string): string[] | undefined {
  const values = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  return values.length ? values : undefined
}

function formatCsv(value: unknown): string {
  return Array.isArray(value) ? value.join(', ') : ''
}

function toNumber(value: string, fallback = 0): number {
  if (value.trim() === '') return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeAbilityIdInput(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function setOrDelete(object: Record<string, any>, key: string, value: unknown): Record<string, any> {
  const next = { ...object }
  if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
    delete next[key]
  } else {
    next[key] = value
  }
  return next
}

function normalizeReward(reward: Partial<EditableReward>): EditableReward {
  return {
    type: reward.type || 'item',
    targetId: reward.targetId ?? '',
    skill: reward.skill,
    quantity: reward.quantity ?? 1,
    dropChance: reward.dropChance ?? 100,
  } as EditableReward
}

function sortNumericStringIds(a: string, b: string) {
  const ai = Number(a)
  const bi = Number(b)
  if (Number.isNaN(ai) || Number.isNaN(bi)) return a.localeCompare(b)
  return ai - bi
}

function getTypeLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function getTypeChipClass(type: string) {
  return POKEMON_TYPE_CHIP_STYLES[type.toLowerCase()] || 'bg-zinc-700/20 text-zinc-100 border-zinc-500/30'
}

function flattenForms(groups: AbilityPokemonFormGroup[]): FlattenedPokemonForm[] {
  return groups.flatMap((group) =>
    group.forms.map((form) => ({
      ...form,
      speciesId: group.speciesId,
      speciesName: group.speciesName,
    })),
  )
}

function abilityFromEntry(entry: AbilityEditorEntry): EditableAbility {
  return {
    id: entry.id,
    name: entry.name,
    description: entry.description,
    type: entry.type,
    value: entry.value,
    rate: entry.rate,
    naturalChance: entry.naturalChance,
    failureRate: entry.failureRate,
    criteria: entry.criteria ? clone(entry.criteria) : undefined,
    rewards: entry.rewards ? clone(entry.rewards) : undefined,
    encounters: entry.encounters ? clone(entry.encounters) : undefined,
    forms: Array.isArray(entry.forms) ? entry.forms.flat().map(String).sort(sortNumericStringIds) : undefined,
    effects: (entry.effects || []).map((effect) => clone(effect as EditableEffect)),
    generated: entry.generated,
  }
}

function makeNewAbility(): EditableAbility {
  return {
    id: `new_ability_${Date.now()}`,
    name: 'New Ability',
    description: '',
    type: 'answer',
    value: 1,
    rate: 100,
    naturalChance: 1,
    forms: [],
    effects: [clone(EFFECT_DEFAULTS['answer-rate-delta'])],
    generated: false,
  }
}

function describeEffect(effect: EditableEffect) {
  switch (effect.type) {
    case 'timer-delta':
    case 'research-session-time-delta':
      return `${effect.seconds ?? 0} seconds`
    case 'field-observation-duration-delta':
      return `${effect.observationSeconds ?? 0} observation seconds`
    case 'answer-timer-delta':
      return `${effect.milliseconds ?? 0} ms`
    case 'level-delta':
      return `${effect.levels ?? 0} levels`
    case 'catch-rate-multiplier':
    case 'shiny-chance-multiplier':
    case 'research-skill-xp-multiplier':
    case 'field-observation-pool-weight-multiplier':
    case 'field-observation-research-xp-multiplier':
      return `${effect.multiplier ?? 1}x multiplier`
    case 'answer-rate-delta':
      return `${effect.amount ?? effect.changeAmountMultiplier ?? 0} catch progress`
    case 'capture-rewards':
    case 'research-rewards':
      return `${effect.rewards?.length || 0} reward${effect.rewards?.length === 1 ? '' : 's'}`
    case 'encounter-replacement':
      return `${effect.encounters?.length || 0} encounter${effect.encounters?.length === 1 ? '' : 's'}`
    case 'capture-random-item':
      return `${effect.itemIds?.length || 0} random item${effect.itemIds?.length === 1 ? '' : 's'}`
    case 'capture-source-form-item':
      return `${Object.keys(effect.sourceFormItems || {}).length} form item${Object.keys(effect.sourceFormItems || {}).length === 1 ? '' : 's'}`
    case 'field-observation-extra-collectible':
      return `${String(effect.reward?.type || 'item')} collectible`
    case 'quiz-decoration':
      return String(effect.mode || 'quiz decoration')
    default:
      return EFFECT_HELP[effect.type]?.title || effect.type
  }
}

function EffectTypeBadge({ type }: { type: string }) {
  return (
    <Badge variant="outline">
      {EFFECT_GROUP_BY_TYPE.get(type as (typeof EFFECT_TYPES)[number]) || 'Effect'}
    </Badge>
  )
}

function NumberField({
  label,
  value,
  onChange,
  step = '1',
  disabled,
}: {
  label: string
  value: unknown
  onChange: (value: number) => void
  step?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        type="number"
        step={step}
        value={typeof value === 'number' || typeof value === 'string' ? value : ''}
        disabled={disabled}
        onChange={(event) => onChange(toNumber(event.target.value))}
      />
    </div>
  )
}

function TextField({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string
  value: unknown
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        value={typeof value === 'number' || typeof value === 'string' ? String(value) : ''}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

function BooleanSelect({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string
  value: boolean | undefined
  onChange: (value: boolean | undefined) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select
        value={value === undefined ? 'any' : value ? 'true' : 'false'}
        disabled={disabled}
        onValueChange={(next) => {
          if (next === 'any') onChange(undefined)
          else onChange(next === 'true')
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="true">Required</SelectItem>
          <SelectItem value="false">Blocked</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function RewardIcon({ reward }: { reward: EditableReward }) {
  if (reward.type === 'item' && reward.targetId) {
    return (
      <ItemSprite
        itemId={String(reward.targetId)}
        alt={String(reward.targetId)}
        width={42}
        height={42}
        className="h-10 w-10"
      />
    )
  }

  if (reward.type === 'currency') return <Coins className="h-6 w-6 text-amber-300" />
  if (reward.type === 'xp' || reward.type === 'pokemon_research_xp') {
    return <FlaskConical className="h-6 w-6 text-sky-300" />
  }
  return <Package className="h-6 w-6 text-muted-foreground" />
}

function RewardTargetSelector({
  reward,
  onChange,
  disabled,
}: {
  reward: EditableReward
  onChange: (patch: Partial<EditableReward>) => void
  disabled?: boolean
}) {
  if (reward.type === 'item') {
    return (
      <DataSelector
        value={String(reward.targetId || '')}
        onSelect={(id) => !disabled && onChange({ targetId: id })}
        fetcher={getItemList}
        placeholder="Select item"
      />
    )
  }

  if (reward.type === 'currency') {
    return (
      <DataSelector
        value={String(reward.targetId || '')}
        onSelect={(id) => !disabled && onChange({ targetId: id })}
        fetcher={getCurrencyList}
        placeholder="Select currency"
      />
    )
  }

  if (reward.type === 'xp') {
    return (
      <DataSelector
        value={reward.skill || ''}
        onSelect={(id) => !disabled && onChange({ skill: id })}
        fetcher={getSkillList}
        placeholder="Select skill"
      />
    )
  }

  return (
    <Input
      value={String(reward.targetId || '')}
      disabled={disabled}
      placeholder="Target form or source"
      onChange={(event) => onChange({ targetId: event.target.value })}
    />
  )
}

function RewardsEditor({
  rewards,
  onChange,
  disabled,
  title = 'Rewards',
}: {
  rewards: EditableReward[]
  onChange: (rewards: EditableReward[]) => void
  disabled?: boolean
  title?: string
}) {
  const updateReward = (index: number, patch: Partial<EditableReward>) => {
    onChange(
      rewards.map((reward, rewardIndex) =>
        rewardIndex === index ? normalizeReward({ ...reward, ...patch }) : reward,
      ),
    )
  }

  return (
    <div className="space-y-2 rounded-lg border bg-background/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Label className="text-xs font-medium">{title}</Label>
          <p className="text-xs text-muted-foreground">Use item and currency selectors so reward IDs stay readable.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() =>
            onChange([
              ...rewards,
              { type: 'item', targetId: '', quantity: 1, dropChance: 100 } as EditableReward,
            ])
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      {rewards.length === 0 ? (
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">No rewards configured.</div>
      ) : null}
      {rewards.map((reward, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-md border bg-card p-3 md:grid-cols-[52px_140px_minmax(190px,1fr)_90px_100px_36px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/40">
            <RewardIcon reward={reward} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Type</Label>
            <Select
              value={String(reward.type || 'item')}
              disabled={disabled}
              onValueChange={(value) =>
                updateReward(index, {
                  type: value as EditableReward['type'],
                  targetId: value === 'xp' ? undefined : '',
                  skill: undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REWARD_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Target</Label>
            <RewardTargetSelector
              reward={reward}
              disabled={disabled}
              onChange={(patch) => updateReward(index, patch)}
            />
          </div>
          <NumberField
            label="Quantity"
            value={typeof reward.quantity === 'number' ? reward.quantity : ''}
            disabled={disabled}
            onChange={(quantity) => updateReward(index, { quantity })}
          />
          <NumberField
            label="Drop %"
            value={reward.dropChance}
            step="0.01"
            disabled={disabled}
            onChange={(dropChance) => updateReward(index, { dropChance })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={() => onChange(rewards.filter((_, rewardIndex) => rewardIndex !== index))}
            aria-label="Remove reward"
            className="mt-6"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

function EncountersEditor({
  encounters,
  onChange,
  disabled,
}: {
  encounters: LocationEncounter[]
  onChange: (encounters: LocationEncounter[]) => void
  disabled?: boolean
}) {
  const updateEncounter = (index: number, patch: Partial<LocationEncounter>) => {
    onChange(
      encounters.map((encounter, encounterIndex) =>
        encounterIndex === index ? { ...encounter, ...patch } : encounter,
      ),
    )
  }

  return (
    <div className="space-y-2 rounded-lg border bg-background/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Label className="text-xs font-medium">Replacement encounters</Label>
          <p className="text-xs text-muted-foreground">Each row shows the replacement Pokemon sprite and roll chance.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onChange([...encounters, { speciesId: 25, formId: '25', chance: 100 }])}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      {encounters.map((encounter, index) => (
        <div
          key={index}
          className="grid gap-3 rounded-md border bg-card p-3 md:grid-cols-[52px_1fr_1fr_100px_36px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/40">
            {encounter.formId ? (
              <Image
                src={getPokemonImageUrl(encounter.formId, 'sprite')}
                alt={encounter.formId}
                width={48}
                height={48}
                className="h-11 w-11"
              />
            ) : (
              <Package className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <NumberField
            label="Species ID"
            value={encounter.speciesId}
            disabled={disabled}
            onChange={(speciesId) => updateEncounter(index, { speciesId })}
          />
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Form</Label>
            <DataSelector
              value={encounter.formId || ''}
              onSelect={(formId) => !disabled && updateEncounter(index, { formId })}
              fetcher={getAbilityFormOptionList}
              placeholder="Select form"
            />
          </div>
          <NumberField
            label="Chance %"
            value={encounter.chance}
            disabled={disabled}
            onChange={(chance) => updateEncounter(index, { chance })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={() =>
              onChange(encounters.filter((_, encounterIndex) => encounterIndex !== index))
            }
            aria-label="Remove encounter"
            className="mt-6"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

function SourceFormItemsEditor({
  value,
  fallbackItemId,
  onChange,
  onFallbackChange,
  disabled,
}: {
  value: Record<string, string>
  fallbackItemId?: string
  onChange: (value: Record<string, string>) => void
  onFallbackChange: (value: string) => void
  disabled?: boolean
}) {
  const entries = Object.entries(value || {})

  return (
    <div className="space-y-3 rounded-lg border bg-background/60 p-3">
      <div className="grid gap-3 md:grid-cols-[1fr_160px]">
        <div>
          <Label className="text-xs font-medium">Source form item drops</Label>
          <p className="text-xs text-muted-foreground">Map the active Pokemon form to the item that drops after capture.</p>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Fallback item</Label>
          <DataSelector
            value={fallbackItemId || ''}
            onSelect={(id) => !disabled && onFallbackChange(id)}
            fetcher={getItemList}
            placeholder="Fallback item"
          />
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => onChange({ ...value, '25': 'tiny-mushroom' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add form item
      </Button>
      {entries.map(([formId, itemId]) => (
        <div
          key={formId}
          className="grid gap-3 rounded-md border bg-card p-3 md:grid-cols-[52px_1fr_52px_1fr_36px]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/40">
            <Image
              src={getPokemonImageUrl(formId, 'sprite')}
              alt={formId}
              width={48}
              height={48}
              className="h-11 w-11"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Source form</Label>
            <DataSelector
              value={formId}
              onSelect={(nextFormId) => {
                if (disabled) return
                const next = { ...value }
                delete next[formId]
                next[nextFormId] = itemId
                onChange(next)
              }}
              fetcher={getAbilityFormOptionList}
              placeholder="Select form"
            />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/40">
            {itemId ? (
              <ItemSprite itemId={itemId} alt={itemId} width={42} height={42} className="h-10 w-10" />
            ) : (
              <Package className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Reward item</Label>
            <DataSelector
              value={itemId}
              onSelect={(nextItemId) => {
                if (disabled) return
                onChange({ ...value, [formId]: nextItemId })
              }}
              fetcher={getItemList}
              placeholder="Select item"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={() => {
              const next = { ...value }
              delete next[formId]
              onChange(next)
            }}
            aria-label="Remove source form item"
            className="mt-6"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

function RandomItemEditor({
  itemIds,
  onChange,
  disabled,
}: {
  itemIds: string[]
  onChange: (itemIds: string[]) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-2 rounded-lg border bg-background/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Label className="text-xs font-medium">Random item pool</Label>
          <p className="text-xs text-muted-foreground">One of these item sprites is selected when the effect triggers.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onChange([...itemIds, 'battle-potion'])}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
      {itemIds.map((itemId, index) => (
        <div key={`${itemId}-${index}`} className="grid gap-3 rounded-md border bg-card p-3 md:grid-cols-[52px_1fr_36px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/40">
            {itemId ? (
              <ItemSprite itemId={itemId} alt={itemId} width={42} height={42} className="h-10 w-10" />
            ) : (
              <Package className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <DataSelector
            value={itemId}
            onSelect={(nextItemId) => {
              if (!disabled) onChange(itemIds.map((candidate, itemIndex) => (itemIndex === index ? nextItemId : candidate)))
            }}
            fetcher={getItemList}
            placeholder="Select item"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={() => onChange(itemIds.filter((_, itemIndex) => itemIndex !== index))}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

function ConditionEditor({
  condition,
  onChange,
  disabled,
}: {
  condition?: EditableCondition
  onChange: (condition: EditableCondition | undefined) => void
  disabled?: boolean
}) {
  const value = condition || {}
  const update = (key: string, nextValue: unknown) => {
    const next = setOrDelete(value, key, nextValue)
    onChange(Object.keys(next).length ? next : undefined)
  }

  return (
    <details className="rounded-lg border bg-background/60 p-3">
      <summary className="cursor-pointer text-sm font-medium">Trigger and conditions</summary>
      <p className="mt-2 text-xs text-muted-foreground">
        Conditions limit where an effect applies. Leave fields as Any or blank for global behavior.
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Trigger</Label>
          <Select
            value={value.trigger || 'any'}
            disabled={disabled}
            onValueChange={(next) => update('trigger', next === 'any' ? undefined : next)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TRIGGERS.map((trigger) => (
                <SelectItem key={trigger} value={trigger}>
                  {trigger}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <NumberField label="Chance %" value={value.chance} disabled={disabled} onChange={(next) => update('chance', next)} />
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Time of day</Label>
          <Select
            value={value.timeOfDay || 'any'}
            disabled={disabled}
            onValueChange={(next) => update('timeOfDay', next === 'any' ? undefined : next)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_OF_DAY.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <TextField label="Target form" value={value.formId} disabled={disabled} onChange={(next) => update('formId', next)} />
        <TextField
          label="Source form"
          value={value.sourceFormId}
          disabled={disabled}
          onChange={(next) => update('sourceFormId', next)}
        />
        <TextField
          label="Species IDs"
          value={formatCsv(value.speciesId)}
          disabled={disabled}
          placeholder="25, 133"
          onChange={(next) =>
            update(
              'speciesId',
              parseCsv(next)?.map((entry) => Number(entry)).filter(Number.isFinite),
            )
          }
        />
        <TextField
          label="Types"
          value={formatCsv(value.type)}
          disabled={disabled}
          placeholder="fire, flying"
          onChange={(next) => update('type', parseCsv(next))}
        />
        <TextField label="Location" value={value.locationId} disabled={disabled} onChange={(next) => update('locationId', next)} />
        <TextField label="Category" value={value.category} disabled={disabled} onChange={(next) => update('category', next)} />
        <TextField
          label="Sub-category"
          value={value.subCategory}
          disabled={disabled}
          onChange={(next) => update('subCategory', next)}
        />
        <TextField
          label="Game types"
          value={formatCsv(value.gameType)}
          disabled={disabled}
          onChange={(next) => update('gameType', parseCsv(next))}
        />
        <TextField
          label="Research IDs"
          value={formatCsv(value.researchId)}
          disabled={disabled}
          onChange={(next) => update('researchId', parseCsv(next))}
        />
        <TextField
          label="Weather"
          value={formatCsv(value.weather)}
          disabled={disabled}
          onChange={(next) => update('weather', parseCsv(next))}
        />
        <TextField
          label="Survey focus"
          value={formatCsv(value.surveyFocus)}
          disabled={disabled}
          onChange={(next) => update('surveyFocus', parseCsv(next))}
        />
        <NumberField
          label="Min correct answers"
          value={value.minimumCorrectAnswers}
          disabled={disabled}
          onChange={(next) => update('minimumCorrectAnswers', next)}
        />
        <NumberField
          label="Exact correct answers"
          value={value.exactCorrectAnswers}
          disabled={disabled}
          onChange={(next) => update('exactCorrectAnswers', next)}
        />
        <NumberField
          label="Streak at most"
          value={value.correctStreakAtMost}
          disabled={disabled}
          onChange={(next) => update('correctStreakAtMost', next)}
        />
        <NumberField
          label="Streak modulo"
          value={value.correctStreakModulo}
          disabled={disabled}
          onChange={(next) => update('correctStreakModulo', next)}
        />
        {BOOLEAN_FILTERS.map((key) => (
          <BooleanSelect
            key={key}
            label={key}
            value={value[key]}
            disabled={disabled}
            onChange={(next) => update(key, next)}
          />
        ))}
      </div>
    </details>
  )
}

function EffectFields({
  effect,
  onChange,
  disabled,
}: {
  effect: EditableEffect
  onChange: (effect: EditableEffect) => void
  disabled?: boolean
}) {
  const patch = (key: string, value: unknown) =>
    onChange(setOrDelete(effect, key, value) as EditableEffect)
  const setCondition = (condition: EditableCondition | undefined) => patch('condition', condition)

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-3">
        {['chance', 'seconds', 'levels', 'multiplier', 'amount', 'milliseconds'].map((key) =>
          key in effect ? (
            <NumberField
              key={key}
              label={key}
              value={effect[key]}
              disabled={disabled}
              step={key === 'multiplier' ? '0.01' : '1'}
              onChange={(next) => patch(key, next)}
            />
          ) : null,
        )}
        {[
          'changeAmountMultiplier',
          'dropChance',
          'quantity',
          'levelMultiplier',
          'observationSeconds',
          'answerSeconds',
          'spawnCountMultiplier',
          'shinyChanceMultiplier',
          'hiddenChanceMultiplier',
          'eventChanceMultiplier',
          'pokemonEventMultiplier',
          'itemEventMultiplier',
          'dropChanceMultiplier',
          'quantityBonus',
          'durationMultiplier',
        ].map((key) =>
          key in effect ? (
            <NumberField
              key={key}
              label={key}
              value={effect[key]}
              disabled={disabled}
              step={key.includes('Multiplier') ? '0.01' : '1'}
              onChange={(next) => patch(key, next)}
            />
          ) : null,
        )}
        {['message', 'label', 'materialType'].map((key) =>
          key in effect ? (
            <TextField
              key={key}
              label={key}
              value={effect[key]}
              disabled={disabled}
              onChange={(next) => patch(key, next)}
            />
          ) : null,
        )}
      </div>

      {effect.type === 'capture-currency-by-level' ? (
        <div className="grid gap-3 md:grid-cols-[1fr_160px]">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Currency</Label>
            <DataSelector
              value={effect.currencyId}
              onSelect={(id) => !disabled && patch('currencyId', id)}
              fetcher={getCurrencyList}
              placeholder="Select currency"
            />
          </div>
          <NumberField
            label="Level multiplier"
            value={effect.levelMultiplier}
            disabled={disabled}
            onChange={(next) => patch('levelMultiplier', next)}
          />
        </div>
      ) : null}

      {effect.type === 'quiz-decoration' ? (
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Mode</Label>
            <Select value={effect.mode} disabled={disabled} onValueChange={(value) => patch('mode', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {QUIZ_DECORATION_MODES.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <NumberField label="Disabled ms" value={effect.disabledMs} disabled={disabled} onChange={(next) => patch('disabledMs', next)} />
          <NumberField
            label="Highlighted ms"
            value={effect.highlightedMs}
            disabled={disabled}
            onChange={(next) => patch('highlightedMs', next)}
          />
        </div>
      ) : null}

      {effect.type === 'extra-shiny-roll' ? (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Roll mode</Label>
          <Select value={effect.mode} disabled={disabled} onValueChange={(value) => patch('mode', value)}>
            <SelectTrigger className="max-w-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="same-source-form">same-source-form</SelectItem>
              <SelectItem value="fixed-chance">fixed-chance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : null}

      {effect.type === 'answer-fail-encounter' || effect.type === 'capture-source-form-item' ? (
        <BooleanSelect
          label="Ability lost"
          value={effect.abilityLost}
          disabled={disabled}
          onChange={(next) => patch('abilityLost', next)}
        />
      ) : null}

      {'rewards' in effect ? (
        <RewardsEditor
          rewards={(effect.rewards || []).map((reward: EditableReward) => normalizeReward(reward))}
          disabled={disabled}
          onChange={(rewards) => patch('rewards', rewards)}
        />
      ) : null}

      {effect.type === 'field-observation-extra-collectible' ? (
        <div className="space-y-3 rounded-lg border bg-background/60 p-3">
          <div>
            <Label className="text-xs font-medium">Extra collectible</Label>
            <p className="text-xs text-muted-foreground">The reward sprite shown here is added to Field Observation drops.</p>
          </div>
          <RewardsEditor
            title="Collectible reward"
            rewards={[normalizeReward(effect.reward || {})]}
            disabled={disabled}
            onChange={(rewards) => patch('reward', rewards[0])}
          />
          <TextField label="Kind" value={effect.kind} disabled={disabled} onChange={(next) => patch('kind', next)} />
        </div>
      ) : null}

      {effect.type === 'encounter-replacement' ? (
        <EncountersEditor
          encounters={effect.encounters || []}
          disabled={disabled}
          onChange={(encounters) => patch('encounters', encounters)}
        />
      ) : null}

      {effect.type === 'capture-random-item' ? (
        <RandomItemEditor
          itemIds={effect.itemIds || []}
          disabled={disabled}
          onChange={(itemIds) => patch('itemIds', itemIds)}
        />
      ) : null}

      {effect.type === 'capture-source-form-item' ? (
        <SourceFormItemsEditor
          value={effect.sourceFormItems || {}}
          fallbackItemId={effect.fallbackItemId}
          disabled={disabled}
          onChange={(sourceFormItems) => patch('sourceFormItems', sourceFormItems)}
          onFallbackChange={(fallbackItemId) => patch('fallbackItemId', fallbackItemId)}
        />
      ) : null}

      {effect.type === 'capture-research-xp' ? (
        <div className="grid gap-3 md:grid-cols-2">
          <NumberField label="Amount" value={effect.amount} disabled={disabled} onChange={(next) => patch('amount', next)} />
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Target</Label>
            <Select value={effect.target} disabled={disabled} onValueChange={(value) => patch('target', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="encounter-form">encounter-form</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : null}

      <ConditionEditor condition={effect.condition} disabled={disabled} onChange={setCondition} />
    </div>
  )
}

function EffectCard({
  effect,
  index,
  onChange,
  onDuplicate,
  onRemove,
  disabled,
}: {
  effect: EditableEffect
  index: number
  onChange: (effect: EditableEffect) => void
  onDuplicate: () => void
  onRemove: () => void
  disabled?: boolean
}) {
  const help = EFFECT_HELP[effect.type]

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b p-3">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">#{index + 1}</Badge>
            <EffectTypeBadge type={effect.type} />
            <Badge variant="outline">{describeEffect(effect)}</Badge>
          </div>
          <div className="grid gap-2 md:grid-cols-[minmax(220px,1fr)_minmax(240px,1.3fr)]">
            <Select
              value={effect.type}
              disabled={disabled}
              onValueChange={(type) => onChange(clone(EFFECT_DEFAULTS[type]))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EFFECT_GROUPS.map((group) => (
                  <React.Fragment key={group.name}>
                    {group.types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {group.name}: {EFFECT_HELP[type]?.title || type}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-start gap-2 rounded-md bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{help?.description || 'Custom data-driven ability effect.'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" disabled={disabled} onClick={onDuplicate}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" disabled={disabled} onClick={onRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <EffectFields effect={effect} disabled={disabled} onChange={onChange} />
      </div>
    </div>
  )
}

function PokemonFormCard({
  form,
  selected,
  abilityCount,
  abilityNames,
  onToggle,
  disabled,
}: {
  form: FlattenedPokemonForm
  selected: boolean
  abilityCount: number
  abilityNames: string[]
  onToggle: (formId: string) => void
  disabled?: boolean
}) {
  const typeChips = Array.from(new Set(form.types.map((type) => type.toLowerCase()).filter(Boolean)))

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        'group relative rounded-md border p-3 text-left transition',
        selected ? 'border-primary/80 bg-primary/12' : 'border-border hover:bg-muted/20',
        disabled && 'cursor-not-allowed opacity-60',
      )}
      onClick={() => onToggle(form.id)}
    >
      {abilityCount > 0 ? (
        <div
          className="absolute right-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/15 px-1.5 text-xs font-semibold text-sky-300 shadow-sm"
          title={`${abilityCount} assigned ability${abilityCount === 1 ? '' : 's'}${abilityNames.length ? `: ${abilityNames.join(', ')}` : ''}`}
        >
          {abilityCount}
        </div>
      ) : null}
      {selected ? (
        <div className="absolute left-2 top-2 rounded-full bg-primary/15 p-1 text-primary ring-1 ring-primary/30">
          <BadgeCheck className="h-3.5 w-3.5" />
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
      <p className="truncate text-center text-sm text-muted-foreground">{form.id}</p>
      <p className="truncate text-center text-sm font-medium">{form.name}</p>
      <p className="truncate text-xs text-muted-foreground/80">{form.speciesName}</p>
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
}

function AbilityDashboard({
  ability,
  forms,
}: {
  ability: EditableAbility
  forms: FlattenedPokemonForm[]
}) {
  const selectedForms = new Set(Array.isArray(ability.forms) ? ability.forms.flat().map(String) : [])
  const previewForms = forms.filter((form) => selectedForms.has(form.id)).slice(0, 8)

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="rounded-lg border bg-background/70 p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BadgeCheck className="h-4 w-4" />
          Pokemon
        </div>
        <p className="mt-2 text-2xl font-semibold">{selectedForms.size}</p>
      </div>
      <div className="rounded-lg border bg-background/70 p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <WandSparkles className="h-4 w-4" />
          Effects
        </div>
        <p className="mt-2 text-2xl font-semibold">{ability.effects.length}</p>
      </div>
      <div className="rounded-lg border bg-background/70 p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-4 w-4" />
          Rate
        </div>
        <p className="mt-2 text-2xl font-semibold">{ability.rate}%</p>
      </div>
      <div className="rounded-lg border bg-background/70 p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          Natural
        </div>
        <p className="mt-2 text-2xl font-semibold">{ability.naturalChance ?? 0}%</p>
      </div>
      <div className="rounded-lg border bg-background/70 p-3 md:col-span-4">
        <div className="mb-2 text-xs font-medium text-muted-foreground">Assigned Pokemon preview</div>
        <div className="flex min-h-14 flex-wrap gap-2">
          {previewForms.length ? (
            previewForms.map((form) => (
              <div key={form.id} className="flex h-14 w-14 items-center justify-center rounded-md border bg-muted/30">
                <Image
                  src={getPokemonImageUrl(form.id, 'sprite')}
                  alt={form.name}
                  width={54}
                  height={54}
                  className="h-12 w-12"
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No Pokemon assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export function AbilityDataEditor() {
  const [abilities, setAbilities] = React.useState<AbilityEditorEntry[]>([])
  const [pokemonGroups, setPokemonGroups] = React.useState<AbilityPokemonFormGroup[]>([])
  const [selectedId, setSelectedId] = React.useState('')
  const [draft, setDraft] = React.useState<EditableAbility | null>(null)
  const [query, setQuery] = React.useState('')
  const [formQuery, setFormQuery] = React.useState('')
  const [typeFilter, setTypeFilter] = React.useState('all')
  const [advancedJson, setAdvancedJson] = React.useState('[]')
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    Promise.all([readAbilityEditorData(), getAbilityPokemonFormList()])
      .then(([data, formGroups]) => {
        if (cancelled) return
        setAbilities(data.abilities)
        setPokemonGroups(formGroups)
        const first = data.abilities[0]
        if (first) selectAbility(first)
      })
      .catch((error) => toast.error(error instanceof Error ? error.message : 'Failed to load abilities'))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const allForms = React.useMemo(() => flattenForms(pokemonGroups), [pokemonGroups])
  const selectedFormIds = React.useMemo(
    () => new Set(Array.isArray(draft?.forms) ? draft.forms.flat().map(String) : []),
    [draft?.forms],
  )
  const abilityAssignmentsByForm = React.useMemo(() => {
    const byForm = new Map<string, string[]>()
    for (const ability of abilities) {
      if (ability.generated || !Array.isArray(ability.forms)) continue
      for (const formId of ability.forms.flat().map(String)) {
        if (!byForm.has(formId)) byForm.set(formId, [])
        byForm.get(formId)?.push(ability.name)
      }
    }
    return byForm
  }, [abilities])
  const allPokemonTypes = React.useMemo(
    () =>
      Array.from(
        new Set(allForms.flatMap((form) => form.types.map((type) => type.toLowerCase()).filter(Boolean))),
      ).sort(),
    [allForms],
  )
  const visibleForms = React.useMemo(() => {
    const normalizedQuery = formQuery.toLowerCase().trim()
    return allForms.filter((form) => {
      const matchesType =
        typeFilter === 'all' ||
        (typeFilter === 'assigned' && (abilityAssignmentsByForm.get(form.id)?.length || 0) > 0) ||
        (typeFilter === 'unassigned' && (abilityAssignmentsByForm.get(form.id)?.length || 0) === 0) ||
        form.types.some((type) => type.toLowerCase() === typeFilter)
      if (!matchesType) return false
      if (!normalizedQuery) return true
      return `${form.id} ${form.name} ${form.speciesName}`.toLowerCase().includes(normalizedQuery)
    })
  }, [abilityAssignmentsByForm, allForms, formQuery, typeFilter])

  const filteredAbilities = abilities.filter((ability) => {
    const haystack = `${ability.name} ${ability.id} ${ability.type}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
  })
  const selectedAbilityExists = abilities.some((ability) => ability.id === selectedId)

  function updateDraft(patch: Partial<EditableAbility>) {
    setDraft((current) => (current ? { ...current, ...patch } : current))
  }

  function syncEffects(nextEffects: EditableEffect[]) {
    updateDraft({ effects: nextEffects })
    setAdvancedJson(stringifyEffects(nextEffects))
  }

  function selectAbility(ability: AbilityEditorEntry) {
    const next = abilityFromEntry(ability)
    setSelectedId(ability.id)
    setDraft(next)
    setAdvancedJson(stringifyEffects(next.effects as EditableEffect[]))
  }

  function startNewAbility() {
    const next = makeNewAbility()
    setSelectedId(next.id)
    setDraft(next)
    setAdvancedJson(stringifyEffects(next.effects as EditableEffect[]))
  }

  function duplicateAbility() {
    if (!draft) return
    const nextId = normalizeAbilityIdInput(`${draft.id}_copy_${Date.now()}`)
    const next = {
      ...clone(draft),
      id: nextId,
      name: `${draft.name} Copy`,
      generated: false,
    }
    setSelectedId(next.id)
    setDraft(next)
    setAdvancedJson(stringifyEffects(next.effects as EditableEffect[]))
  }

  function appendEffect(effect: EditableEffect) {
    if (!draft) return
    syncEffects([...(draft.effects as EditableEffect[]), clone(effect)])
  }

  function updateEffect(index: number, effect: EditableEffect) {
    if (!draft) return
    syncEffects(
      (draft.effects as EditableEffect[]).map((candidate, effectIndex) =>
        effectIndex === index ? effect : candidate,
      ),
    )
  }

  function toggleForm(formId: string) {
    if (!draft || draft.generated) return
    const next = new Set(selectedFormIds)
    if (next.has(formId)) next.delete(formId)
    else next.add(formId)
    updateDraft({ forms: Array.from(next).sort(sortNumericStringIds) })
  }

  function setForms(formIds: string[]) {
    if (!draft || draft.generated) return
    updateDraft({ forms: Array.from(new Set(formIds)).sort(sortNumericStringIds) })
  }

  function applyAdvancedJson() {
    try {
      const parsed = JSON.parse(advancedJson)
      if (!Array.isArray(parsed)) throw new Error('Effects JSON must be an array')
      const invalidType = parsed.find((effect) => !EFFECT_TYPES.includes(effect.type))
      if (invalidType) throw new Error(`Unknown effect type: ${invalidType.type}`)
      syncEffects(parsed)
      toast.success('Effects JSON applied')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid effects JSON')
    }
  }

  async function save() {
    if (!draft) return
    if (draft.generated) {
      toast.error('Generated abilities are read-only in this editor.')
      return
    }

    const existing = abilities.some((ability) => ability.id === draft.id && !ability.generated)
    setSaving(true)
    const result = existing
      ? await saveAbilityEntry(draft)
      : await createAbilityEntry({ ...draft, id: normalizeAbilityIdInput(draft.id) })
    setSaving(false)

    if (!result.success || !result.ability) {
      toast.error(result.error || 'Failed to save ability')
      return
    }

    const saved = {
      ...result.ability,
      explicitEffects: result.ability.effects,
      generated: false,
    } satisfies AbilityEditorEntry
    setAbilities((current) =>
      [...current.filter((ability) => ability.id !== saved.id), saved].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    )
    setSelectedId(saved.id)
    setDraft({ ...result.ability, generated: false })
    setAdvancedJson(stringifyEffects(result.ability.effects as EditableEffect[]))
    toast.success(existing ? 'Ability saved' : 'Ability created')
  }

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid min-h-[calc(100vh-9rem)] gap-4 lg:grid-cols-[320px_1fr]">
      <aside className="flex min-h-0 flex-col rounded-lg border bg-card">
        <div className="space-y-3 border-b p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-8"
              placeholder="Search abilities"
            />
          </div>
          <Button type="button" variant="outline" className="w-full justify-start" onClick={startNewAbility}>
            <Plus className="mr-2 h-4 w-4" />
            New ability
          </Button>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-1 p-2">
            {filteredAbilities.map((ability) => (
              <button
                key={ability.id}
                type="button"
                onClick={() => selectAbility(ability)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted',
                  ability.id === selectedId ? 'bg-muted' : '',
                )}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium">{ability.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{ability.id}</span>
                </span>
                <Badge variant="outline" className="ml-2 shrink-0">
                  {ability.type}
                </Badge>
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="min-w-0 rounded-lg border bg-card">
        {draft ? (
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b p-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold">{draft.name}</h1>
                  <Badge>{draft.id}</Badge>
                  <Badge variant="outline">{draft.type}</Badge>
                  {draft.generated ? <Badge variant="secondary">generated read-only</Badge> : null}
                </div>
                <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
                  {draft.description || 'No description authored yet.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={duplicateAbility}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button onClick={save} disabled={saving || draft.generated}>
                  {saving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="min-h-0 flex-1">
              <div className="border-b px-4 pt-3">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="pokemon">Pokemon Assignment</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                  <TabsTrigger value="json">Advanced JSON</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0 space-y-4 p-4">
                <AbilityDashboard ability={draft} forms={allForms} />

                <div className="rounded-lg border bg-background/60 p-4">
                  <div className="mb-3">
                    <h2 className="text-sm font-semibold">Identity</h2>
                    <p className="text-xs text-muted-foreground">
                      These fields define the authored ability record saved to src/data/abilities.ts.
                    </p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextField
                      label="ID"
                      value={draft.id}
                      disabled={draft.generated || selectedAbilityExists}
                      onChange={(id) => updateDraft({ id: normalizeAbilityIdInput(id) })}
                    />
                    <TextField
                      label="Name"
                      value={draft.name}
                      disabled={draft.generated}
                      onChange={(name) => updateDraft({ name })}
                    />
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Type</Label>
                      <Select
                        value={draft.type}
                        disabled={draft.generated}
                        onValueChange={(type) => updateDraft({ type: type as EditableAbility['type'] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ABILITY_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <NumberField
                      label="Value"
                      value={draft.value}
                      disabled={draft.generated}
                      step="0.01"
                      onChange={(value) => updateDraft({ value })}
                    />
                    <NumberField
                      label="Activation rate %"
                      value={draft.rate}
                      disabled={draft.generated}
                      step="0.01"
                      onChange={(rate) => updateDraft({ rate })}
                    />
                    <NumberField
                      label="Natural roll chance %"
                      value={draft.naturalChance}
                      disabled={draft.generated}
                      step="0.01"
                      onChange={(naturalChance) => updateDraft({ naturalChance })}
                    />
                    <NumberField
                      label="Failure rate %"
                      value={draft.failureRate}
                      disabled={draft.generated}
                      step="0.01"
                      onChange={(failureRate) => updateDraft({ failureRate })}
                    />
                    <div className="space-y-1 md:col-span-2">
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Textarea
                        value={draft.description}
                        disabled={draft.generated}
                        className="min-h-24"
                        onChange={(event) => updateDraft({ description: event.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-background/60 p-4">
                  <div className="mb-3">
                    <h2 className="text-sm font-semibold">Legacy rewards and encounters</h2>
                    <p className="text-xs text-muted-foreground">
                      Prefer effects for new behavior. These fields remain editable for existing authored records.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <RewardsEditor
                      title="Base rewards"
                      rewards={(draft.rewards || []).map((reward) => normalizeReward(reward as EditableReward))}
                      disabled={draft.generated}
                      onChange={(rewards) => updateDraft({ rewards })}
                    />
                    <EncountersEditor
                      encounters={draft.encounters || []}
                      disabled={draft.generated}
                      onChange={(encounters) => updateDraft({ encounters })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pokemon" className="mt-0 space-y-4 p-4">
                <div className="rounded-lg border bg-background/60 p-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold">Pokemon assignment</h2>
                      <p className="text-xs text-muted-foreground">
                        Select the Pokemon forms that can naturally roll this ability or receive this patch.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={draft.generated}
                        onClick={() => setForms(visibleForms.map((form) => form.id))}
                      >
                        Select visible
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={draft.generated}
                        onClick={() => setForms([])}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_120px]">
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={formQuery}
                        onChange={(event) => setFormQuery(event.target.value)}
                        className="pl-8"
                        placeholder="Search Pokemon forms"
                      />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="assigned">Has ability</SelectItem>
                        <SelectItem value="unassigned">No ability</SelectItem>
                        {allPokemonTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {getTypeLabel(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Badge variant="outline" className="flex h-10 items-center justify-center text-sm">
                      {selectedFormIds.size} selected
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                  {visibleForms.map((form) => (
                    <PokemonFormCard
                      key={form.id}
                      form={form}
                      selected={selectedFormIds.has(form.id)}
                      abilityCount={abilityAssignmentsByForm.get(form.id)?.length || 0}
                      abilityNames={abilityAssignmentsByForm.get(form.id) || []}
                      disabled={draft.generated}
                      onToggle={toggleForm}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="effects" className="mt-0 space-y-4 p-4">
                <div className="rounded-lg border bg-background/60 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-semibold">Effect templates</h2>
                      <p className="text-xs text-muted-foreground">
                        Add common encounter, research, or Field Observation behavior.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={draft.generated}
                      onClick={() => appendEffect(EFFECT_DEFAULTS['answer-rate-delta'])}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Blank effect
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {EFFECT_TEMPLATES.map((template) => (
                      <Button
                        key={template.label}
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={draft.generated}
                        onClick={() => appendEffect(template.effect)}
                      >
                        <span className="mr-2">{template.icon}</span>
                        {template.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {draft.effects.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    No effects configured.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(draft.effects as EditableEffect[]).map((effect, index) => (
                      <EffectCard
                        key={`${effect.type}-${index}`}
                        effect={effect}
                        index={index}
                        disabled={draft.generated}
                        onChange={(nextEffect) => updateEffect(index, nextEffect)}
                        onDuplicate={() => appendEffect(effect)}
                        onRemove={() =>
                          syncEffects(
                            (draft.effects as EditableEffect[]).filter(
                              (_, effectIndex) => effectIndex !== index,
                            ),
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="json" className="mt-0 p-4">
                <div className="rounded-lg border bg-background/60 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-semibold">Effects JSON</h2>
                      <p className="text-xs text-muted-foreground">
                        Raw effect array for debugging or bulk edits. The visual tabs remain the source of truth after Apply.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={draft.generated}
                      onClick={applyAdvancedJson}
                    >
                      Apply JSON
                    </Button>
                  </div>
                  <Textarea
                    value={advancedJson}
                    onChange={(event) => setAdvancedJson(event.target.value)}
                    className="min-h-[520px] resize-y font-mono text-xs"
                    disabled={draft.generated}
                    spellCheck={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </main>
    </div>
  )
}
