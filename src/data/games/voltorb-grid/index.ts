export type {
  VoltorbGridGameConfig,
  VoltorbGridPosition,
  VoltorbGridProtectedPokemon,
  VoltorbGridSettings,
  VoltorbGridVoltorb,
} from './types'

import { VoltorbGridGameConfig } from './types'
import { testVoltorbGridEntries } from './entries/test'
import { route10VoltorbGridEntries } from './entries/route-10'

export const voltorbGridGames: VoltorbGridGameConfig[] = [
  ...route10VoltorbGridEntries,
  ...testVoltorbGridEntries,
]
