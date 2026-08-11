export * from './types'
import { CompareConfig } from './types'

import { palletTowncompareEntries } from './entries/pallet-town'
import { gymLeaderChronicleCompareEntries } from './entries/gym-leader-chronicles'

export const compareEntries: CompareConfig[] = [
  ...palletTowncompareEntries,
  ...gymLeaderChronicleCompareEntries,
]
