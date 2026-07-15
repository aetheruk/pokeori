import { BaseGameConfig } from '../shared'

export interface DiglettTunnelTapSettings {
  gridSize: {
    cols: number
    rows: number
  }
  targetScore: number
  timeLimit: number
  spawnIntervalMs: number
  visibleMs: number
  diglettScore?: number
  dugtrioPenalty?: number
  hazardPokemonId?: string
  maxLives?: number
  winRate?: number
  themeColour?: string
  background?: string
}

export interface DiglettTunnelTapGameConfig extends BaseGameConfig {
  settings: DiglettTunnelTapSettings
}
