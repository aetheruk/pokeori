import type { UndergroundMiningConfig } from './types'
import { testUndergroundMiningEntries } from './entries/test'
import { mtMoonUndergroundMiningEntries } from './entries/mt-moon'
import { rockTunnelUndergroundMiningEntries } from './entries/rock-tunnel'
import { gymLeaderChronicleUndergroundMiningEntries } from './entries/gym-leader-chronicles'

export * from './types'

export const undergroundMiningGames: UndergroundMiningConfig[] = [
  ...testUndergroundMiningEntries,
  ...mtMoonUndergroundMiningEntries,
  ...rockTunnelUndergroundMiningEntries,
  ...gymLeaderChronicleUndergroundMiningEntries,
]
