export type {
  MagnemiteCircuitGameConfig,
  MagnemiteCircuitPosition,
  MagnemiteCircuitSettings,
  MagnemiteCircuitTile,
  MagnemiteCircuitTileType,
} from './types'

import { MagnemiteCircuitGameConfig } from './types'
import { testMagnemiteCircuitEntries } from './entries/test'

export const magnemiteCircuitGames: MagnemiteCircuitGameConfig[] = [
  ...testMagnemiteCircuitEntries,
]
