export * from './types'
import { RhythmConfig } from './types'

import { ceruleanCityrhythmEntries } from './entries/cerulean-city'
import { pokemonTowerrhythmEntries } from './entries/pokemon-tower'
import { gymLeaderChronicleRhythmEntries } from './entries/gym-leader-chronicles'

export const rhythmEntries: RhythmConfig[] = [
  ...ceruleanCityrhythmEntries,
  ...pokemonTowerrhythmEntries,
  ...gymLeaderChronicleRhythmEntries,
]
