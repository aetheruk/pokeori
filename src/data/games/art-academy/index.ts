export type { ArtAcademyGameConfig, ArtAcademySettings } from './types'

import { testArtAcademyEntries } from './entries/test'
import { kantoUndergroundArtAcademyEntries } from './entries/kanto-underground'
import type { ArtAcademyGameConfig } from './types'

export const artAcademyGames: ArtAcademyGameConfig[] = [
  ...testArtAcademyEntries,
  ...kantoUndergroundArtAcademyEntries,
]
