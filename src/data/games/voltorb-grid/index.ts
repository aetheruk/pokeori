export type {
  VoltorbGridGameConfig,
  VoltorbGridPosition,
  VoltorbGridProtectedPokemon,
  VoltorbGridSettings,
  VoltorbGridVoltorb,
} from './types'

import { VoltorbGridGameConfig } from './types'
import { route10VoltorbGridEntries } from './entries/route-10'
import { gymLeaderChronicleVoltorbGridEntries } from './entries/gym-leader-chronicles'

export const voltorbGridGames: VoltorbGridGameConfig[] = [
  ...route10VoltorbGridEntries,
  ...gymLeaderChronicleVoltorbGridEntries,
]
