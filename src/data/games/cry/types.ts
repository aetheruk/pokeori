//
// Cry Game (formerly cry-recognition)
// Identify Pokemon by their cry/sound
//

import { BaseGameConfig } from '../shared'

export interface CrySettings {
  pokemonPool?: number[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number
  maxPokemonShown?: number
  death?: boolean
  lose_points?: number
}

export interface CryConfig extends BaseGameConfig {
  settings: CrySettings
}
