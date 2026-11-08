export * from './types'
import { kantoUndergroundTcgBattleEntries } from './entries/kanto-underground'
import { kantoWorldTcgBattleEntries } from './entries/kanto-world'
import { testTcgBattleGames } from './entries/test'

export const tcgBattleGames = [
  ...testTcgBattleGames,
  ...kantoUndergroundTcgBattleEntries,
  ...kantoWorldTcgBattleEntries,
]
