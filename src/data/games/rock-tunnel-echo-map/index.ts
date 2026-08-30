export type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoMapSettings,
  RockTunnelEchoPosition,
} from './types'

import { RockTunnelEchoMapGameConfig } from './types'
import { rockTunnelEchoMapEntries } from './entries/rock-tunnel'
import { gymLeaderChronicleEchoMapEntries } from './entries/gym-leader-chronicles'

/** Echo Map ruleset entries; exposed to the app through grid-puzzle. */
export const rockTunnelEchoMapGames: RockTunnelEchoMapGameConfig[] = [
  ...rockTunnelEchoMapEntries,
  ...gymLeaderChronicleEchoMapEntries,
]
