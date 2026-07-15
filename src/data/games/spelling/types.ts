//
// Spelling Game
// Show a Pokemon and spell its name by filling in missing letters
//

import { BaseGameConfig } from '../shared'

export interface SpellingSettings {
  pokemonPool?: number[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number
  missingLetters?: number // How many letters to hide (default: 3)
  extraLetters?: number // Random wrong letters in pool (default: 4)
  death?: boolean
  lose_points?: number
}

export interface SpellingConfig extends BaseGameConfig {
  settings: SpellingSettings
}
