import { BaseGameConfig } from '../shared'

export type TcgInspectionQuestionType =
  | 'name'
  | 'rarity'
  | 'supertype'
  | 'set'
  | 'number'
  | 'artist'
  | 'pokemonType'
  | 'hp'

export interface TcgInspectionGameSettings {
  allowedSetIds?: string[]
  allowedRarities?: string[]
  questionTypes?: TcgInspectionQuestionType[]
  packSize: number
  rounds: number
  countdownSeconds?: number
  attentionSeconds?: number
  previewSeconds: number
  timeLimit: number
  winScore: number
  pointsPerCorrect?: number
  themeColour?: string
}

export interface TcgInspectionGameConfig extends BaseGameConfig {
  settings: TcgInspectionGameSettings
}
