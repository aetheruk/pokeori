export * from './types'
import { RockPushGameConfig } from './types'

import { testbasicEntries } from './entries/test'
import { gymLeaderChronicleRockPushEntries } from './entries/gym-leader-chronicles'
import { fuchsiaCitybasicEntries } from './entries/fuchsia-city'

/** Rock Push ruleset entries; exposed to the app through grid-puzzle. */
export const basicEntries: RockPushGameConfig[] = [
  ...testbasicEntries,
  ...gymLeaderChronicleRockPushEntries,
  ...fuchsiaCitybasicEntries,
]
