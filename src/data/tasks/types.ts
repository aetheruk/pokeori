import type { Reward } from '../types'
import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'

export type TaskRequirementType =
  | 'user_level'
  | 'item_owned'
  | 'currency_owned'
  | 'pokemon_owned'
  | 'card_collected_total'
  | 'card_collected_set'
  | 'card_collected_specific'
  | 'pokedex_seen_total'
  | 'pokedex_caught_total'
  | 'pokedex_seen_specific'
  | 'pokedex_caught_specific'
  | 'task_completed'
  | 'task_active'
  | 'time_range'
  | 'date_range'
  | 'battle_result'
  | 'location_encounter_result'
  | 'research_encounter_result'
  | 'expedition_result'
  | 'power_usage'
  | 'total_evolutions'
  | 'voyage_completed'
  | 'skill_level'
  | 'user_banner'
  | 'user_icon'
  | 'user_title'
  | 'battle_team'
  | 'companion'
  | 'research_level'
  | 'research_level_total'
  | 'total_battles_won'
  | 'daily_catch'
  | 'daily_battle'
  | 'daily_card'
  | 'daily_crystalize'
  | 'daily_activity'
  | 'daily_not_completed'
  | 'rival_selected'
  | 'weather'
  | 'roll'
  | 'any_of'

export interface StatRequirements {
  hp?: number
  attack?: number
  defense?: number
  specialAttack?: number
  specialDefense?: number
  speed?: number
}

export interface PokemonCriteria {
  type?: string
  speciesId?: number
  region?: string | string[]
  location?: string | string[]
  locationId?: string | string[]
  minLevel?: number
  maxLevel?: number
  size?: 'XS' | 'S' | 'L' | 'XL'
  shiny?: boolean
  rarity?: PokemonRarityId
  isShadow?: boolean
  isRadiant?: boolean
  identified?: boolean
  partner?: boolean
  form?: string
  formId?: string
  stats?: StatRequirements
  ivs?: StatRequirements
  evs?: StatRequirements
}

export interface BattleTeamCheck {
  position: number | 'any' // 1-6 or 'any'
  speciesId?: number
  formId?: string
  type?: string
  region?: string | string[]
  location?: string | string[]
  locationId?: string | string[]
  isShadow?: boolean
  isRadiant?: boolean
  rarity?: PokemonRarityId
  stats?: StatRequirements
  qty?: number // Defaults to 1
}

export type DailyActivityKind =
  | 'catch'
  | 'battle_win'
  | 'research_win'
  | 'fishing_catch'
  | 'craft_success'
  | 'shop_purchase'
  | 'voyage_success'
  | 'card_collected'
  | 'card_crystalized'

export interface DailyActivityConfig {
  kind: DailyActivityKind
  /** Restrict progress to these authored activity IDs when present. */
  sourceIds?: string[]
}

export interface DailyTaskMetadata {
  family: string
  templateId: string
  /** Stable per-objective value used for daily rotation. */
  signature: string
  sourceHint: string
  /** The one daily challenge that awards twice the normal Professor Scrip. */
  isBonus?: boolean
}

export interface TaskCondition {
  type: TaskRequirementType
  targetId?: string | number | string[]
  count?: number
  progress?: number // Used for explicit progress tracking (like dailies)
  consume?: boolean
  unique?: boolean
  secret?: boolean // If true, shows as "???" in the UI
  pokemonCriteria?: PokemonCriteria
  battleTeamCheck?: BattleTeamCheck
  companionCheck?: PokemonCriteria
  battleStatus?: 'win' | 'loss'
  expeditionStatus?: 'completed' | 'failed'
  timeRange?: {
    start: string // HH:mm (24h format)
    end: string // HH:mm (24h format)
  }
  dateRange?: {
    start: string // YYYY-MM-DD
    end: string // YYYY-MM-DD
  }
  powerType?: 'tera' | 'mega' | 'z-move' | 'dynamax' | 'shout' | 'victory' | 'weather' | 'circadian'
  battleType?: 'wild' | 'trainer'
  dailyActivity?: DailyActivityConfig
  level?: number
  inverse?: boolean
  label?: string
  conditions?: TaskCondition[]
}

export interface TaskCardRewardParams {
  allowedSetIds?: string[]
  allowedPokemonIds?: Array<number | string>
  allowedCardIds?: string[]
  rarityModifier?: number
  qty?: number
  bonusThreshold?: number
  allowedRarities?: string[]
  guaranteed?: boolean
}

// Backwards compatibility alias - use Reward from ../types for all reward configurations
export type TaskReward = Reward

export type TaskCategory = string

export interface TaskIcon {
  type: 'item' | 'pokemon' | 'trainer' | 'local' | 'lucide'
  id: string // For lucide, this is the icon name (e.g. 'ChevronsUp')
}

export interface TaskExitModal {
  icon?: TaskIcon
  dynamicOpponent?: 'rival'
  title: string
  message: string
  closeButtonText: string
  background?: string
}

// Enter Modal Types (multi-step dialog before task completion)
export type TaskEnterModalButtonType = 'navigate' | 'success' | 'password' | 'fail'

export interface TaskEnterModalButton {
  text: string
  type: TaskEnterModalButtonType
  id?: number // For 'navigate': step to go to. For 'password': step on success
  fail?: number // For 'password': step to go to on incorrect password
}

export interface TaskEnterModalStep {
  id: number // Step identifier, id=1 is always shown first
  icon?: TaskIcon
  title: string
  message: string
  background?: string
  buttons: TaskEnterModalButton[] // Max 4 buttons
}

export interface Task {
  id: string
  name: string
  description: string
  category: TaskCategory
  subCategory?: string
  icon: TaskIcon
  repeatable: boolean
  secret?: boolean
  completionTrigger?: 'manual' | 'auto'
  requirements: TaskCondition[]
  criteria: TaskCondition[]
  rewards: TaskReward[]
  exitModal?: TaskExitModal
  enterModal?: TaskEnterModalStep[]
  completeButtonText?: string
  chat?: boolean
  rivalSelection?: boolean
  hide?: string
  background?: string
  daily?: boolean
  isRandomEvent?: boolean
  dailyMetadata?: DailyTaskMetadata
}
