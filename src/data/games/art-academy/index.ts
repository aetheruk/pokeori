export type { ArtAcademyGameConfig, ArtAcademySettings } from './types'

import { testArtAcademyEntries } from './entries/test'
import { kantoUndergroundArtAcademyEntries } from './entries/kanto-underground'
import { gymLeaderChronicleArtAcademyEntries } from './entries/gym-leader-chronicles'
import type { ArtAcademyGameConfig } from './types'

export const artAcademyGames: ArtAcademyGameConfig[] = [
  ...testArtAcademyEntries,
  ...kantoUndergroundArtAcademyEntries,
  ...gymLeaderChronicleArtAcademyEntries,
]
