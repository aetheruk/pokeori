//
// Silhouette Game (formerly whos-that-pokemon)
// Show a silhouette and identify the Pokemon
//

import { BaseGameConfig } from '../shared'

export interface SilhouetteSettings {
  pokemonPool?: number[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number
  death?: boolean
  lose_points?: number
}

export interface SilhouetteConfig extends BaseGameConfig {
  settings: SilhouetteSettings
}
