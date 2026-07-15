//
// Snap Game (formerly pokemon-snap)
// Take photos of Pokemon that appear on screen
//

import { BaseGameConfig } from '../shared'

export interface SnapSettings {
  target?: number
  targetMissMessage?: string
  pokemonPool?: number[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number
  successThreshold?: number
  death?: boolean
  lose_points?: number
}

export interface SnapConfig extends BaseGameConfig {
  settings: SnapSettings
}
