export type { Match3GameConfig, Match3GameSettings, Match3Crystal } from './types'

import { ceruleanCitymatch3gamesEntries } from './entries/cerulean-city'
import { celadonGameCornermatch3gamesEntries } from './entries/celadon-game-corner'

export * from './types'
import { Match3GameConfig } from './types'

export const match3Games: Match3GameConfig[] = [
  ...ceruleanCitymatch3gamesEntries,
  ...celadonGameCornermatch3gamesEntries,
]
