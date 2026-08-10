export * from './types'
import { RockPushGameConfig } from './types'

import { testbasicEntries } from './entries/test'
import { gymLeaderChronicleRockPushEntries } from './entries/gym-leader-chronicles'

export const basicEntries: RockPushGameConfig[] = [
  ...testbasicEntries,
  ...gymLeaderChronicleRockPushEntries,
]
