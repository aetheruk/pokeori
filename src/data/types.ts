import { TaskCondition, TaskIcon, TaskCardRewardParams } from './tasks/types'
import { StatusEffectId } from './moves/types'
import type { SkillXpConfig } from './skills/xp'
import type { TrainerClassId } from './trainers'

export * from './tasks/types'
export * from './moves/types'

export interface LocationEncounter {
  speciesId: number
  formId?: string
  chance: number // 0-100 percentage
  requirements?: TaskCondition[]
  secret?: boolean // If true, locked preview does not reveal requirements
}

export interface LocationEncounterShield {
  type: 'consecutive' | 'total'
  requiredCorrectAnswers: number
  regenSeconds?: number
  bubbleColor?: string
}

export interface Reward {
  type:
    | 'item'
    | 'pokemon'
    | 'card'
    | 'xp'
    | 'currency'
    | 'task_complete'
    | 'banner'
    | 'icon'
    | 'title'
    | 'increase_max_pokemon'
    | 'increase_max_boxes'
    | 'pokemon_research_xp'
  targetId?: string | number // Changed: Now used for currency type (e.g. 'crystals')
  skill?: string
  quantity?: number | { min: number; max: number }
  cardDrawParams?: TaskCardRewardParams
  requirements?: TaskCondition[]
  dropChance?: number // 0-100 percentage, defaults to 100 if not specified
  guaranteed?: boolean // If true, reward selection logic should not roll this reward out
  secret?: boolean // If true, shows as "???" in the UI
  label?: string
  icon?: TaskIcon
  isCompanion?: boolean
  pokemonData?: {
    level?: number
    formId?: string
    ability?: string
    shiny?: boolean
    ivs?: {
      hp?: number
      attack?: number
      defense?: number
      specialAttack?: number
      specialDefense?: number
      speed?: number
    }
    evs?: {
      hp?: number
      attack?: number
      defense?: number
      specialAttack?: number
      specialDefense?: number
      speed?: number
    }
    nature?: string
    ballType?: string
    background?: string
    isShadow?: boolean
    isRadiant?: boolean
    partner?: boolean
    gender?: 'male' | 'female' | 'genderless'
    obtainedMethod?: 'caught' | 'trade' | 'gift' | 'starter' | 'purchased' | 'reward'
    obtainedRegion?: string
    obtainedLocation?: string
    obtainedSourceId?: string
  }
}

// Backwards compatibility alias
export type LocationReward = Reward

export type LocationCategory = string

export interface Location {
  id: string
  hide?: string
  overrides?: string
  name: string
  description: string
  category: LocationCategory
  subCategory?: string
  icon: TaskIcon
  requirements: TaskCondition[]
  criteria?: TaskCondition[]
  requiredItem?: {
    id: string
    useOnCatch?: boolean
    breakChance?: number // 0-100
  }
  encounters: LocationEncounter[]
  rewards: LocationReward[]
  background?: string // Background image filename (e.g. 'forest.png', 'cave.png')
  shinyChanceModifier?: number // Multiplier for shiny rate (e.g. 1.0 = standard, 2.0 = double)
  catchRateModifier?: number // 0-255, modifies the catch rate calculation
  shield?: LocationEncounterShield // Optional catch shield that blocks catch-rate progress until broken
  fleeRate?: number // Optional 0-100 chance for the Pokemon to flee after an incorrect answer
  timer?: number // Encounter duration in seconds (default 30)
  levelRange?: { min: number; max: number } // Level range for encounters
  daily?: boolean
  isRandomEvent?: boolean
  keyEncounter?: boolean // If true, encounter abilities cannot replace the configured encounter.
  specialEncounter?: {
    type: 'silph-scope-ghost'
    requiredItemId: string
    failMessage?: string
  }
  music?: string // Custom background music URL (default: '/music/battle.mp3')
  skillXp?: SkillXpConfig
}

export interface BattleEnemy {
  speciesId: number
  formId?: string
  level: number | { min: number; max: number }
  name?: string // Optional override
  requirements?: TaskCondition[]
  ivs?: {
    hp?: number
    attack?: number
    defense?: number
    specialAttack?: number
    specialDefense?: number
    speed?: number
  }
  evs?: {
    hp?: number
    attack?: number
    defense?: number
    specialAttack?: number
    specialDefense?: number

    speed?: number
  }
  shiny?: boolean
  initialStatus?: StatusEffectId
  heldItemId?: string
  aiMoves?: string[]
  isShadow?: boolean
  isRadiant?: boolean
  gender?: 'male' | 'female' | 'genderless'
}

export interface GemDropTier {
  min: number
  max: number
  dropRate: number // 0-100 percentage
}

export interface GemRewardConfig {
  base?: GemDropTier
  shining?: GemDropTier
  pristine?: GemDropTier
}

export interface TrainerBattleItemConfig {
  itemId: string
  quantity?: number
}

export type BattleAiProfileId = 'wild' | 'trainer' | 'advanced' | 'boss'

export interface BattleConfig {
  id: string
  hide?: string
  overrides?: string
  dynamicOpponent?: 'rival'
  rivalLevel?: number
  trainerClassId?: TrainerClassId
  trainerName?: string
  name: string
  description: string
  category: string
  subCategory?: string
  icon: TaskIcon
  background: string
  title?: string // If set, triggers VS animation with this title text/id
  requirements: TaskCondition[]
  criteria?: TaskCondition[]
  enemyTeam: BattleEnemy[]
  trainerItems?: TrainerBattleItemConfig[]
  rewards: LocationReward[]
  levelCap?: number // Optional level cap for player?
  maxPokemon: number // Required, 1-6
  itemsPerBattle?: number // Optional hard cap against the Trainer skill item-use limit
  allowedItems?: string[] // Item IDs allowed in battle, empty = all battle items
  allowSwapping?: boolean // Whether Pokemon swapping is allowed (default: true)
  aiProfile?: BattleAiProfileId // Optional enemy AI difficulty override
  enemyAttackTelegraphChance?: number // 1-100 chance to prepare the next enemy stance when the player ends a turn below half HP
  isWildBattle?: boolean // Whether this is a random encounter (pick one Pokemon from enemyTeam)
  // Limit Overrides
  movesPerBattle?: number // Optional per-Pokemon hard cap against the Trainer skill move-use limit
  enemyMovesPerBattle?: number // Optional per-enemy-Pokemon override for enemy TM/manual AI move uses
  teraUsesPerBattle?: number // Default 1
  dynamaxPerBattle?: number // Default 1
  megaEvolutionsPerBattle?: number // Default 1
  zMovesPerBattle?: number // Default 1
  victoryUses?: number // Number of times Victory Power can be used (default 1)
  weatherUses?: number // Number of times Weather Control can be used (default 1)
  shoutsPerBattle?: number // Number of times Shouts can be used (default 1)
  circadianUses?: number // Number of times Circadian Power can be used (default 1)
  gemConfig?: GemRewardConfig
  pvp?: boolean
  pvp_type?: 'friendly' | 'ranked'
  daily?: boolean
  isRandomEvent?: boolean
  disableRewards?: boolean
  disableCandyRewards?: boolean
  generatedXpMultiplier?: number
  music?: string // Custom background music URL (default: '/music/battle.mp3')
  skillXp?: SkillXpConfig
}

export interface ResearchConfig {
  id: string
  hide?: string
  name: string
  description: string
  category: string
  subCategory?: string
  type:
    | 'whos-that-pokemon'
    | 'quick-identify'
    | 'pokemon-snap'
    | 'cry-recognition'
    | 'research-compare'
  icon: TaskIcon
  requirements: TaskCondition[]
  criteria?: TaskCondition[]
  rewards: LocationReward[] // Uses existing reward system
  overrides?: string
  skillXp?: SkillXpConfig

  // Game-specific settings
  settings: {
    pokemonPool?: number[] // Species IDs for correct answers (empty = all)
    optionsPool?: number[] // Additional species IDs to show as wrong options (empty = show all)
    timeLimit?: number // Seconds for timed games
    winRate?: number // Number of correct identifications needed to win
    successThreshold?: number // For reaction-based games (ms)
    maxPokemonShown?: number // For compare games: 2-6 (default 2)
    comparisonOperator?: (
      | 'height'
      | 'weight'
      | 'hp'
      | 'attack'
      | 'defense'
      | 'specialAttack'
      | 'specialDefense'
      | 'speed'
    )[] // Stats to include in comparison pool
    death?: boolean // If true, game ends on first wrong answer
    lose_points?: number // Points to lose on wrong answer
  }
  background?: string
  isRandomEvent?: boolean
}
