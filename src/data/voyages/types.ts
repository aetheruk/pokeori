import { TaskCondition } from '@/data/tasks'
import { Reward } from '@/data/types'

// VoyageReward replaced by global Reward type

export interface VoyageRequirement {
  type: string
  battleStatus?: 'win' | 'loss'
  targetId?: string
  count?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface VoyageCriteria {
  allowedSpeciesIds?: number[]
  allowedFormIds?: string[]
  allowedTypes?: string[] // e.g. 'fire'
  minLevel?: number
  minIv?: number
}

export interface TeamRequirement {
  type: 'total_stat'
  stat: 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'level'
  value: number
  comparison?: 'gte' | 'lte' | 'eq' // default gte
}

export interface VoyageConfig {
  id: string
  hide?: string
  name: string
  description: string
  category: string
  subCategory?: string
  icon: {
    type: 'item' | 'pokemon' | 'local'
    id: string
  }

  durationMinutes: number
  isRepeatable: boolean
  minPokemon?: number // Default 1
  maxPokemon: number
  successChance: number // 0-100

  // Requirement to UNLOCK the voyage
  requirements?: VoyageRequirement[]
  criteria?: TaskCondition[]

  // Criteria for INDIVIDUAL pokemon eligibility
  pokemonCriteria?: VoyageCriteria

  // Requirements for the SELECTED TEAM to start
  teamRequirements?: TeamRequirement[]

  rewards: Reward[]
  background?: string
  isRandomEvent?: boolean
}

// User state interface extension
export interface ActiveVoyage {
  voyageId: string
  startTime: string // ISO date
  endTime: string // ISO date
  pokemonIds: string[] // IDs of pokemon sent (and deleted/held)
}
