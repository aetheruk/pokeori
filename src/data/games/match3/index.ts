export type { Match3GameConfig, Match3GameSettings, Match3Crystal } from './types'

import { testmatch3gamesEntries } from './entries/test'
import { ceruleanCitymatch3gamesEntries } from './entries/cerulean-city'

export * from './types'
import { Match3GameConfig } from './types'

export const match3Games: Match3GameConfig[] = [
  ...testmatch3gamesEntries,
  ...ceruleanCitymatch3gamesEntries,
]
