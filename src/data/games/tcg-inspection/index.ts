import { testTcgInspectionEntries } from './entries/test'
import { kantoUndergroundTcgInspectionEntries } from './entries/kanto-underground'
import { TcgInspectionGameConfig } from './types'

export const tcgInspectionGames: TcgInspectionGameConfig[] = [
  ...testTcgInspectionEntries,
  ...kantoUndergroundTcgInspectionEntries,
]
