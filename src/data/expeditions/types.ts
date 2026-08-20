import type { TaskCondition, TaskIcon } from '@/data/tasks'
import type { Reward } from '@/data/types'
import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'

export type ExpeditionActivityType = 'battle' | 'location' | 'game' | 'field-research' | 'task'

export type ChronicleNarrativePhase =
  | 'backstory'
  | 'development'
  | 'conflict'
  | 'contemplation'
  | 'resolution'
  | 'reflection'

export type ExpeditionActivityPool = Partial<Record<ExpeditionActivityType, string[]>>

export interface ExpeditionTaskPoolEntry {
  id: string
  weight?: number
}

export interface ExpeditionTaskPoolChoice {
  pool: string
  weight?: number
}

export interface ExpeditionActivityNode {
  type: 'activity'
  id: string
  /** Omit this node when its user requirements are not met. */
  requirements?: TaskCondition[]
  // If true, UI should mask this step as unknown.
  secret?: boolean
  // Force a specific activity for this node.
  activityId?: string
  // Optional explicit type for forced activity selection.
  activityType?: ExpeditionActivityType
  // Activity categories to sample from (for example: ['battle'] or ['location']).
  categories?: ExpeditionActivityType[]
  // Backward-compatible alias for categories.
  activityTypes?: ExpeditionActivityType[]
  // Named task pool to sample when this is a task activity.
  taskPool?: string
  // Weighted task pools to choose between for this task activity.
  taskPoolChoices?: ExpeditionTaskPoolChoice[]
  phase?: ChronicleNarrativePhase
  phaseTitle?: string
}

export interface ExpeditionBranchOption {
  id: string
  weight?: number
  nodes: ExpeditionPathNode[]
}

export interface ExpeditionBranchNode {
  type: 'branch'
  id: string
  selection?: 'player' | 'random'
  branches: ExpeditionBranchOption[]
}

export type ExpeditionResultBranchResult = 'win' | 'loss'

export interface ExpeditionResultBranchOption {
  result: ExpeditionResultBranchResult
  label?: string
  end?: 'complete' | 'fail'
  nodes?: ExpeditionPathNode[]
}

export interface ExpeditionResultBranchNode {
  type: 'result_branch'
  id: string
  sourceStepId?: string
  results: ExpeditionResultBranchOption[]
}

export type ExpeditionPathNode =
  | ExpeditionActivityNode
  | ExpeditionBranchNode
  | ExpeditionResultBranchNode

export interface ExpeditionGeneratedStepPreview {
  activityType: ExpeditionActivityType
  activityName: string
}

export interface ExpeditionGeneratedBranchOption {
  branchId: string
  label: string
  steps: ExpeditionGeneratedStep[]
  previewActivities: ExpeditionGeneratedStepPreview[]
}

export interface ExpeditionGeneratedResultBranchOption {
  result: ExpeditionResultBranchResult
  label: string
  end?: 'complete' | 'fail'
  steps: ExpeditionGeneratedStep[]
  previewActivities: ExpeditionGeneratedStepPreview[]
}

export interface ExpeditionChroniclePokemonConfig {
  speciesId: number
  formId?: string
  name?: string
  level: number
  shiny?: boolean
  rarity?: PokemonRarityId
  ability?: string
  assignedMoves?: string[]
  heldItemId?: string
  isShadow?: boolean
  isRadiant?: boolean
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
}

export interface ExpeditionChronicleConfig {
  playerName?: string
  playerIcon?: string
  playerTitle?: string
  battleTeam?: ExpeditionChroniclePokemonConfig[]
  battleItems?: Record<string, number>
  balls?: Record<string, number>
  activityLoadouts?: Record<
    string,
    {
      battleTeam?: ExpeditionChroniclePokemonConfig[]
      battleItems?: Record<string, number>
      balls?: Record<string, number>
    }
  >
}

export interface ExpeditionConfig {
  id: string
  hide?: string
  name: string
  description: string
  category: string
  subCategory?: string
  buttonText?: string
  icon: TaskIcon
  requirements?: TaskCondition[]
  criteria?: TaskCondition[]
  mapItemId?: string
  maxLosses: number
  safariBallAllowance?: number
  activityPool: ExpeditionActivityPool
  taskPools?: Record<string, ExpeditionTaskPoolEntry[]>
  path: ExpeditionPathNode[]
  rewards: Reward[]
  daily?: boolean
  canAbandon?: boolean
  canFail?: boolean
  /** Retained only so runs created before a content replacement can finish safely. */
  legacyOnly?: boolean
  background?: string
  isRandomEvent?: boolean
  chronicle?: boolean | ExpeditionChronicleConfig
}

export interface ExpeditionGeneratedStep {
  type?: 'activity' | 'branch_choice' | 'result_branch'
  stepId: string
  stepNumber: number
  secret?: boolean
  activityType?: ExpeditionActivityType
  activityId?: string
  activityName?: string
  branchId?: string
  branchOptions?: ExpeditionGeneratedBranchOption[]
  sourceStepId?: string
  resultOptions?: ExpeditionGeneratedResultBranchOption[]
  attempts: number
  status: 'pending' | 'completed'
  completedAt?: string
  phase?: ChronicleNarrativePhase
  phaseTitle?: string
}

export type ExpeditionRunStatus = 'active' | 'ready_to_claim'

export interface ActiveExpeditionRun {
  id: string
  expeditionId: string
  expeditionName: string
  isChronicle?: boolean
  status: ExpeditionRunStatus
  currentStepIndex: number
  totalSteps: number
  losses: number
  maxLosses: number
  safariBallsRemaining?: number
  mapItemId?: string
  steps: ExpeditionGeneratedStep[]
}
