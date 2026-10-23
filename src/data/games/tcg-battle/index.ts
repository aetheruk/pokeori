export * from './types'
import { kantoUndergroundTcgBattleEntries } from './entries/kanto-underground'
import { testTcgBattleGames } from './entries/test'

export const tcgBattleGames = [
  ...testTcgBattleGames,
  ...kantoUndergroundTcgBattleEntries,
]
