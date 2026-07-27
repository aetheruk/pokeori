import type { BaseGameConfig } from '../shared'

export interface BattleBetsSettings {
  buyIn: number
  houseEdge: number
  simulationCount: number
  minimumWinChance: number
  maximumWinChance: number
}

export interface BattleBetsGameConfig extends BaseGameConfig {
  settings: BattleBetsSettings
}
