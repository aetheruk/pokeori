export type {
  MagnemiteCircuitGameConfig,
  MagnemiteCircuitPosition,
  MagnemiteCircuitSettings,
  MagnemiteCircuitTile,
  MagnemiteCircuitTileType,
} from './types'

import { MagnemiteCircuitGameConfig } from './types'
import { testMagnemiteCircuitEntries } from './entries/test'
import { gymLeaderChronicleCircuitEntries } from './entries/gym-leader-chronicles'

export const magnemiteCircuitGames: MagnemiteCircuitGameConfig[] = [
  ...testMagnemiteCircuitEntries,
  ...gymLeaderChronicleCircuitEntries,
]
