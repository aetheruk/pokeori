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
import { testVoltorbGridEntries } from './entries/test'

/** Voltorb ruleset entries; exposed to the app through grid-puzzle. */
export const voltorbGridGames: VoltorbGridGameConfig[] = [
  ...testVoltorbGridEntries,
  ...route10VoltorbGridEntries,
  ...gymLeaderChronicleVoltorbGridEntries,
]
