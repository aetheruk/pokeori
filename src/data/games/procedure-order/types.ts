import type { BaseGameConfig, TaskIcon } from '../shared'

export interface ProcedureOrderCard {
  id: string
  label: string
  description?: string
  icon?: TaskIcon
}

export interface ProcedureOrderSettings {
  cards: ProcedureOrderCard[]
  timeLimit: number
  maxSubmissions: number
  themeColour?: string
  background?: string
}

export interface ProcedureOrderGameConfig extends BaseGameConfig {
  settings: ProcedureOrderSettings
}
