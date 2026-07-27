import type { BaseGameConfig } from '../shared'

export interface BattleBetsSettings {
  houseEdge: number
  simulationCount: number
  minimumWinChance: number
  maximumWinChance: number
}

export interface BattleBetsGameConfig extends BaseGameConfig {
  settings: BattleBetsSettings
}
