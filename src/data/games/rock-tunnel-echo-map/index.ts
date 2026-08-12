export type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoMapSettings,
  RockTunnelEchoPosition,
} from './types'

import { RockTunnelEchoMapGameConfig } from './types'
import { rockTunnelEchoMapEntries } from './entries/rock-tunnel'
import { gymLeaderChronicleEchoMapEntries } from './entries/gym-leader-chronicles'

export const rockTunnelEchoMapGames: RockTunnelEchoMapGameConfig[] = [
  ...rockTunnelEchoMapEntries,
  ...gymLeaderChronicleEchoMapEntries,
]
