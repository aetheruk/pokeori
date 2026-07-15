export type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoMapSettings,
  RockTunnelEchoPosition,
} from './types'

import { RockTunnelEchoMapGameConfig } from './types'
import { testRockTunnelEchoMapEntries } from './entries/test'
import { rockTunnelEchoMapEntries } from './entries/rock-tunnel'

export const rockTunnelEchoMapGames: RockTunnelEchoMapGameConfig[] = [
  ...testRockTunnelEchoMapEntries,
  ...rockTunnelEchoMapEntries,
]
