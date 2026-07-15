//
// Identify Game (formerly quick-identify)
// Quickly identify a Pokemon from its image
//

import { BaseGameConfig } from '../shared'

export interface IdentifySettings {
  pokemonPool?: number[]
  itemPool?: string[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number
  death?: boolean
  lose_points?: number
}

export interface IdentifyConfig extends BaseGameConfig {
  settings: IdentifySettings
}
