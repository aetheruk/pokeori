export type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoMapSettings,
  RockTunnelEchoPosition,
} from './types'

import { RockTunnelEchoMapGameConfig } from './types'
import { rockTunnelEchoMapEntries } from './entries/rock-tunnel'

export const rockTunnelEchoMapGames: RockTunnelEchoMapGameConfig[] = [
  ...rockTunnelEchoMapEntries,
]
