export * from './types'
import { kantoUndergroundTcgBattleEntries } from './entries/kanto-underground'
import { celadonGameCornerTcgBattleEntries } from './entries/celadon-game-corner'
import { testTcgBattleGames } from './entries/test'

export const tcgBattleGames = [
  ...testTcgBattleGames,
  ...kantoUndergroundTcgBattleEntries,
  ...celadonGameCornerTcgBattleEntries,
]
