export * from './types'
import { MiningConfig } from './types'

import { mtMoonminingEntries } from './entries/mt-moon'
import { ceruleanCityminingEntries } from './entries/cerulean-city'
import { rockTunnelminingEntries } from './entries/rock-tunnel'
import { gymLeaderChronicleMiningEntries } from './entries/gym-leader-chronicles'

export const miningEntries: MiningConfig[] = [
  ...mtMoonminingEntries,
  ...ceruleanCityminingEntries,
  ...rockTunnelminingEntries,
  ...gymLeaderChronicleMiningEntries,
]
