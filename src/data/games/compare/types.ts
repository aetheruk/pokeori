//
// Compare Game (formerly research-compare)
// Compare Pokemon stats (higher/lower)
//

import { BaseGameConfig } from '../shared'

export type ComparisonStat =
  | 'height'
  | 'weight'
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

export interface CompareSettings {
  pokemonPool?: number[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number
  maxPokemonShown?: number
  comparisonOperator?: ComparisonStat[]
  death?: boolean
  lose_points?: number
}

export interface CompareConfig extends BaseGameConfig {
  settings: CompareSettings
}
