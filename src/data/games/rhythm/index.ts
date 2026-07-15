export * from './types'
import { RhythmConfig } from './types'

import { ceruleanCityrhythmEntries } from './entries/cerulean-city'
import { pokemonTowerrhythmEntries } from './entries/pokemon-tower'

export const rhythmEntries: RhythmConfig[] = [
  ...ceruleanCityrhythmEntries,
  ...pokemonTowerrhythmEntries,
]
