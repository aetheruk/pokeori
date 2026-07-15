import type { PokemonTypeName } from '../items/types'
import type { WeatherType } from '../weather'
import type { TerrainType } from '../terrain'
import { BattleStance } from '@/utilities/battle/types'
import type { BattleAiUseConfig } from '../battle-ai'
import type { Reward } from '../types'

export type MoveStance = BattleStance | 'random'
export type MoveForcedType = PokemonTypeName | 'random'
export type MoveContestMetric =
  | 'level'
  | 'currentHp'
  | 'maxHp'
  | 'height'
  | 'weight'
  | 'size'
  | 'friendship'
  | 'stat:attack'
  | 'stat:defense'
  | 'stat:specialAttack'
  | 'stat:specialDefense'
  | 'stat:speed'
  | 'effective-stat:attack'
  | 'effective-stat:defense'
  | 'effective-stat:specialAttack'
  | 'effective-stat:specialDefense'
  | 'effective-stat:speed'
export type MoveContestComparison =
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'equal'
  | 'notEqual'
export type MoveContestResult = 'win' | 'loss' | 'tie'
export type MoveContestMetricValue = MoveContestMetric | number

export interface WeightedMoveStatusChoice {
  id: StatusEffectId
  chance?: number
  target?: 'self' | 'enemy' | 'random'
}

export interface MoveRandomStatusConfig {
  chance: number
  options: WeightedMoveStatusChoice[]
}

export interface MoveDamageRangeConfig {
  min: number
  max: number
}

export interface MoveMultiHitConfig {
  minHits: number
  maxHits: number
}

export interface MoveWeatherDamageMultiplierConfig {
  multiplier: number
  weather?: WeatherType[]
}

export interface MoveWeatherHealConfig {
  defaultPercent: number
  weather?: Partial<Record<WeatherType, number>>
}

export interface MoveContinuousConfig {
  min: number
  max: number
}

export interface MoveRepeatDamageConfig {
  perUsePercent: number
  maxUses?: number
}

export interface MoveContinuousEndConfig {
  status?: {
    id: StatusEffectId
    chance?: number
    target?: 'self' | 'enemy'
    forceStatus?: boolean
  }
}

export type StatusEffectId =
  | 'burn'
  | 'frostbite'
  | 'paralysis'
  | 'poison'
  | 'bad-poison'
  | 'sleep'
  | 'veil'
  | 'confusion'
  | 'freeze'
  | 'regen'
  | 'mystic-veil'
  | 'shield'
  | 'shield-plus'
  | 'shield-ex'
  | 't-shield'
  | 't-shield-plus'
  | 't-shield-ex'
  | 's-shield'
  | 's-shield-plus'
  | 's-shield-ex'
  | 'victory'
  | 'vanished'

// Status Config Definition
export interface StatusEffectConfig {
  id: StatusEffectId
  name: string
  description: string
  color: string // For UI chip
  damagePerTurn?: number // Fraction of Max HP (e.g. 1/8)
  healingPerTurn?: number // Fraction of Max HP (e.g. 1/8)
  cantMoveChance?: number // 0-1 (e.g. 0.25 for Paralysis)
  statMultiplier?: {
    stat: 'speed' | 'attack' | 'specialAttack'
    multiplier: number
  }
  // Immunity checking
  immuneTypes?: PokemonTypeName[]
}

export interface BuffConfig {
  stat:
    | 'attack'
    | 'defense'
    | 'specialAttack'
    | 'specialDefense'
    | 'speed'
    | 'crit'
    | 'accuracy'
    | 'evasion'
  stages: number // +/- stages
  chance?: number // 0-100 chance to apply, defaults to 100
  target?: 'self' | 'enemy'
}

export interface MoveSelfDamageConfig {
  chance?: number // 0-100, defaults to 100
  fraction?: number // 1/X of max HP (1 => full HP, 8 => 1/8 HP, etc.)
}

export interface MoveContestOutcomeConfig {
  damageMultiplier?: number
  failMove?: boolean
  preventCounter?: boolean
  result?: MoveContestResult
  message?: string
}

export type MoveFailOnStance = 'loss' | 'tie'
export type SecondaryStatusTrigger = 'turn-end' | 'switch'
export type SecondaryStatusTarget =
  | 'self-pokemon'
  | 'enemy-pokemon'
  | 'self-side'
  | 'enemy-side'
  | 'both-pokemon'
  | 'both-sides'
  | 'field'

export type SecondaryStatusEffect =
  | {
      type: 'damage'
      percentMaxHp?: number
      flatDamage?: number
      pokemonTypes?: PokemonTypeName[]
    }
  | {
      type: 'absorb'
      percentMaxHp?: number
      flatDamage?: number
      healPercent?: number
      pokemonTypes?: PokemonTypeName[]
    }
  | {
      type: 'apply-status'
      statusId: StatusEffectId
      chance?: number
    }
  | {
      type: 'heal'
      percentMaxHp?: number
      flatHealing?: number
    }
  | {
      type: 'status-immunity'
      statuses?: StatusEffectId[] | 'all'
    }
  | {
      type: 'wake-status'
      statuses?: StatusEffectId[]
    }
  | {
      type: 'stat'
      stat: BuffConfig['stat']
      stages: number
      chance?: number
      pokemonType?: PokemonTypeName
    }
  | {
      type: 'damage-reduction'
      percent: number
      stance?: BattleStance
      attackType?: PokemonTypeName
    }
  | {
      type: 'damage-modifier'
      percent: number
      stance?: BattleStance
      attackType?: PokemonTypeName
    }
  | {
      type: 'damage-taken-modifier'
      percent: number
      stance?: BattleStance
      attackType?: PokemonTypeName
    }
  | {
      type: 'type-immunity-bypass'
      attackTypes?: PokemonTypeName[]
    }
  | {
      type: 'accuracy-bypass'
    }
  | {
      type: 'infatuation'
      chance?: number
    }
  | {
      type: 'switch-prevention'
    }
  | {
      type: 'move-block'
      mode: 'zero-damage' | 'move-id' | 'last-used' | 'healing' | 'attack-type'
      moveIds?: string[]
      attackTypes?: PokemonTypeName[]
      damagePercentMaxHp?: number
      removeOnBlock?: boolean
    }
  | {
      type: 'snatch-beneficial-move'
    }
  | {
      type: 'faint-bond'
    }
  | {
      type: 'faint-move-use-depletion'
      amount: number
    }

export interface SecondaryStatusTurnRange {
  min: number
  max: number
}

export interface MoveSecondaryStatusConfig {
  id: string
  name?: string
  chance?: number
  target: SecondaryStatusTarget
  triggers: SecondaryStatusTrigger[]
  delayTurns?: number
  turns?: number | SecondaryStatusTurnRange
  effects: SecondaryStatusEffect[]
}

export interface MoveContestConfig {
  attackerMetric: MoveContestMetric
  defenderMetric?: MoveContestMetricValue
  comparison: MoveContestComparison
  success?: MoveContestOutcomeConfig
  failure?: MoveContestOutcomeConfig
}
export type MoveInterruptEnemyMoveChance = number
export type MoveCalledMoveMode =
  | 'random-authored'
  | 'opponent-last-successful'
  | 'self-known-random'
  | 'opponent-last-successful-boosted'
export type MoveDamageRule =
  | { type: 'flat'; amount: number }
  | { type: 'target-current-hp-percent'; percent: number }
  | { type: 'user-level'; multiplier?: number }
  | { type: 'user-current-hp' }
  | { type: 'last-damage-taken'; multiplier?: number }
  | { type: 'party-member-count'; perMemberDamage: number; includeFainted?: boolean }
  | { type: 'match-user-hp' }
  | { type: 'average-active-hp' }
  | { type: 'ohko'; failIfUserLowerLevel?: boolean }
export type MoveDelayedDamage = {
  turns: number
  damage: number
}
export interface MovePostDamageStatStage {
  condition: 'target-ko'
  stat: BuffConfig['stat']
  stages: number
  chance?: number
  target?: 'self' | 'enemy'
}
export type MoveDynamicType =
  | { type: 'held-plate'; fallbackType?: PokemonTypeName }
  | { type: 'held-memory'; fallbackType?: PokemonTypeName }
  | { type: 'held-drive'; fallbackType?: PokemonTypeName }
  | { type: 'weather'; fallbackType?: PokemonTypeName }
  | { type: 'tera'; fallbackType?: PokemonTypeName }
  | { type: 'user-primary'; fallbackType?: PokemonTypeName }
  | { type: 'target-primary'; fallbackType?: PokemonTypeName }
export type MoveItemUseEffect =
  | { type: 'restore-self'; amount: number }
  | { type: 'remove-enemy'; amount: number }
  | { type: 'consume-self'; amount: number; failIfUnavailable?: boolean }
export type MoveHeldItemEffect =
  | { type: 'bestow' }
  | { type: 'remove-target' }
  | { type: 'steal-target' }
  | { type: 'swap' }
  | { type: 'recycle' }
  | { type: 'consume-self' }
  | { type: 'consume-berries'; target: 'self' | 'enemy' | 'both' }
export type MoveStatusCure =
  | {
      target: 'self' | 'enemy' | 'ally-party'
      statuses: StatusEffectId[] | 'all'
      healUserPercent?: number
      failIfNoStatus?: boolean
    }
export type MoveStatusTransfer = {
  from: 'self'
  to: 'enemy'
  statuses: StatusEffectId[] | 'all'
  clearSourceOnSuccess?: boolean
  failIfNoStatus?: boolean
}
export type MovePartyRevive = {
  target: 'ally-party'
  hpPercent: number
}
export type MoveBattleCondition =
  | { type: 'user-status'; statusId: StatusEffectId }
  | { type: 'target-status'; statusId: StatusEffectId }
  | { type: 'last-ally-fainted-previous-turn' }
  | { type: 'user-has-used-other-moves' }
  | { type: 'not-last-used-move' }
  | { type: 'first-active-turn' }
  | { type: 'opposite-gender-target' }
  | { type: 'user-has-held-item' }
  | { type: 'target-has-held-item' }
  | { type: 'user-has-consumed-held-item' }
export type MoveSwitchEffect =
  | { type: 'force-enemy-random' }
  | { type: 'self-pending'; passStatStages?: boolean }
export type MoveTypeChangeEffect =
  | { type: 'random'; target?: 'self' | 'enemy'; types?: PokemonTypeName[] }
  | { type: 'first-known-move'; target?: 'self' | 'enemy' }
  | { type: 'resist-last-opponent-move'; target?: 'self' | 'enemy' }
  | { type: 'target-primary'; target?: 'self' | 'enemy' }
  | { type: 'set'; target?: 'self' | 'enemy'; pokemonType: PokemonTypeName; turns?: number }
  | { type: 'add'; target?: 'self' | 'enemy'; pokemonType: PokemonTypeName; turns?: number }
  | { type: 'remove'; target?: 'self' | 'enemy'; pokemonType: PokemonTypeName; turns?: number }
export type MoveBattleRewards = {
  rewards: Reward[]
}
export type MoveSecondaryStatusCure = {
  target: 'self' | 'enemy' | 'both'
  scope?: 'pokemon' | 'side' | 'pokemon-and-side'
  ids?: string[]
}
export type MoveConditionalDamageModifier =
  | {
      type: 'user-status'
      statuses?: StatusEffectId[] | 'all'
      multiplier: number
    }
  | {
      type: 'user-no-held-item'
      multiplier: number
    }
  | {
      type: 'target-pokemon-type'
      pokemonTypes: PokemonTypeName[]
      multiplier: number
    }
  | {
      type: 'target-status'
      statuses?: StatusEffectId[] | 'all'
      multiplier: number
    }
  | {
      type: 'remaining-move-uses-at-or-below'
      uses: number
      multiplier: number
    }
  | {
      type: 'target-current-hp-at-or-below-percent'
      percent: number
      multiplier: number
    }
  | {
      type: 'user-current-hp-percent'
      multiplierAtFullHp: number
      minimumMultiplier?: number
      invert?: boolean
    }
  | {
      type: 'weather'
      weather: WeatherType[]
      multiplier: number
    }
  | {
      type: 'super-effective'
      multiplier: number
    }
  | {
      type: 'target-positive-stat-stages'
      multiplier: number
    }
  | {
      type: 'user-positive-stat-stages'
      multiplier: number
    }
  | {
      type: 'fainted-party-members'
      baseMultiplier?: number
      perFaintedMultiplier: number
    }
  | {
      type: 'target-dynamaxed'
      multiplier: number
    }
  | {
      type: 'user-took-damage'
      multiplier: number
    }
  | {
      type: 'user-stat-lowered-this-turn'
      multiplier: number
    }
  | {
      type: 'target-switching-out'
      multiplier: number
    }
  | {
      type: 'user-previous-move-failed'
      multiplier: number
    }
  | {
      type: 'user-previous-successful-move'
      moveIds: string[]
      multiplier: number
    }
  | {
      type: 'chance'
      chance: number
      multiplier: number
    }
export type MovePostDamageStatusCure = {
  target: 'self' | 'enemy'
  statuses: StatusEffectId[] | 'all'
}
export type MoveStatStageEffect =
  | { type: 'copy-target'; target?: 'self' | 'enemy' }
  | {
      type: 'swap-self'
      first: Exclude<BuffConfig['stat'], 'crit'>
      second: Exclude<BuffConfig['stat'], 'crit'>
    }
  | { type: 'reset'; target?: 'self' | 'enemy' | 'both' }
  | {
      type: 'swap-target'
      target?: 'self' | 'enemy'
      stats?: Exclude<BuffConfig['stat'], 'crit'>[]
    }
  | { type: 'invert-target'; target?: 'self' | 'enemy' }
  | {
      type: 'boost-pokemon-type'
      target?: 'self' | 'enemy' | 'both'
      pokemonType: PokemonTypeName
      stats: Exclude<BuffConfig['stat'], 'crit'>[]
      stages: number
    }
export type MoveNextAccuracyBypass = {
  target: 'self' | 'enemy'
  uses?: number
}
export type MoveTransformEffect = {
  target: 'enemy'
}
export type MoveLockEffect = {
  target: 'enemy'
  turns: number
}
export type MoveUseEffect = {
  target: 'self' | 'enemy'
  amount: number
}
export type MoveTerrainEffect = {
  terrain: TerrainType
}
export type MoveCurseEffect = {
  ghostType: PokemonTypeName
  ghostHpFraction: number
  ghostDamagePercentMaxHp: number
  ghostTurns: number
  nonGhostBuffs: BuffConfig[]
}

export interface MoveConfig {
  id: string
  name: string
  description: string
  notes?: string
  trainerOnly?: boolean // Enemy AI can only use this move in trainer battles, not wild battles.
  aiOnly?: boolean // Excluded from generated TMs, MoveDex, and player assignment pools.
  manualOnly?: boolean // Excluded from automatic enemy AI pools unless directly listed on a battle Pokemon.
  stance: MoveStance
  damage: number // Multiplier: 1 for normal, 2 for double etc. (as per prompt/requirement)
  damageRange?: MoveDamageRangeConfig
  multiHit?: MoveMultiHitConfig
  weatherDamageMultiplier?: MoveWeatherDamageMultiplierConfig
  conditionalDamageModifiers?: MoveConditionalDamageModifier[]
  charged?: number // Number of turns spent charging before the move is unleashed.
  recharge?: number // Number of turns spent recharging after the move is unleashed.
  continuous?: MoveContinuousConfig // Total turn range for repeat-use moves.
  repeatDamage?: MoveRepeatDamageConfig // Damage scaling for repeated successful uses.
  continuousEnd?: MoveContinuousEndConfig // Effects applied when a continuous move naturally ends.
  critChance?: number // Optional per-move critical hit chance, 0-100 percentage.
  damageByDefenderType?: Partial<Record<PokemonTypeName, number>>
  target: 'self' | 'enemy'
  heal?: boolean // If true, heals instead of damages
  healFull?: boolean // If true with heal, restores the user to full HP
  weatherHeal?: MoveWeatherHealConfig
  absorb?: number // Percentage of damage dealt restored to the attacker.
  forcedType?: MoveForcedType // If set, attack always uses this type, or random when configured
  ignoreTypeEffectiveness?: boolean
  ignoreDefenderStatStages?: boolean
  damageStatSource?: 'user' | 'target'
  formId?: string[] // Authored form IDs that can learn this move; missing/empty means no learners
  level?: number // Minimum level required to use this move
  accuracy: number // 0-100 percentage
  alwaysHits?: boolean // If true, bypasses normal move accuracy checks.
  buffs?: BuffConfig[] // Array of buffs to user (target: self)
  debuffs?: BuffConfig[] // Array of debuffs to enemy (target: enemy)
  status?: {
    id: StatusEffectId
    chance?: number // 0-100, defaults to 100
    target?: 'self' | 'enemy'
    forceStatus?: boolean // If true, replaces the target's current main status.
  }
  selfDamage?: MoveSelfDamageConfig
  additionalStatuses?: {
    id: StatusEffectId
    chance?: number // 0-100, defaults to 100
    target?: 'self' | 'enemy'
  }[]
  randomStatuses?: MoveRandomStatusConfig
  disableStance?: {
    stance: BattleStance | 'random'
    turns: number
  }
  secondaryStatuses?: MoveSecondaryStatusConfig[]
  interruptEnemyMove?: MoveInterruptEnemyMoveChance // 0-100 chance to interrupt the opponent AI move on a same-turn response.
  failOnStance?: MoveFailOnStance
  preventCounterOnStanceWin?: boolean // If true, a successful stance win prevents the opponent's same-turn attack.
  contest?: MoveContestConfig
  calledMove?: {
    mode: MoveCalledMoveMode
    excludeSelf?: boolean
  }
  damageRule?: MoveDamageRule
  delayedDamage?: MoveDelayedDamage
  dynamicType?: MoveDynamicType
  itemUseEffect?: MoveItemUseEffect
  heldItemEffect?: MoveHeldItemEffect
  nextDamageModifier?: {
    percent: number
    uses?: number
    target?: 'self' | 'enemy'
  }
  nextAccuracyBypass?: MoveNextAccuracyBypass
  postDamageStatusCure?: MovePostDamageStatusCure
  postDamageStatStage?: MovePostDamageStatStage
  statStageEffect?: MoveStatStageEffect
  transformEffect?: MoveTransformEffect
  moveLockEffect?: MoveLockEffect
  moveUseEffect?: MoveUseEffect
  terrainEffect?: MoveTerrainEffect
  curseEffect?: MoveCurseEffect
  statusCure?: MoveStatusCure
  statusTransfer?: MoveStatusTransfer
  secondaryStatusCure?: MoveSecondaryStatusCure
  partyRevive?: MovePartyRevive
  battleCondition?: MoveBattleCondition
  switchEffect?: MoveSwitchEffect
  typeChangeEffect?: MoveTypeChangeEffect
  battleRewards?: MoveBattleRewards
  aiUse?: BattleAiUseConfig
}
