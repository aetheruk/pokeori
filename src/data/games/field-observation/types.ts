import { BaseGameConfig } from '../shared'
import type { TaskCondition } from '@/data/tasks/types'

export interface FieldObservationPokemonPoolEntry {
  speciesId: number
  formId?: string
  weight: number
  requirements?: TaskCondition[]
}

export interface FieldObservationTimeRange {
  min: number
  max: number
}

export interface FieldObservationSettings {
  pokemonPool: FieldObservationPokemonPoolEntry[]
  levelRange: {
    min: number
    max: number
  }
  timeLimit: number | FieldObservationTimeRange
  answerTimeLimit?: number | FieldObservationTimeRange
  difficulty?: number
  itemDrops?: FieldObservationItemDrop[]
}

export interface FieldObservationConfig extends BaseGameConfig {
  settings: FieldObservationSettings
}

export interface FieldObservationGlobalPokemonEvent {
  id: string
  speciesId: number
  formId?: string
  odds: number
  requirements?: TaskCondition[]
}

export interface FieldObservationItemDrop {
  id: string
  itemId: string
  dropChance: number
  quantity?: number | { min: number; max: number }
  secret?: boolean
  requirements?: TaskCondition[]
}

export interface FieldObservationGlobalItemEvent extends FieldObservationItemDrop {}
