export * from './types'
import { IdentifyConfig } from './types'

import { palletTownidentifyEntries } from './entries/pallet-town'
import { pewterCityidentifyEntries } from './entries/pewter-city'
import { fuchsiaCityidentifyEntries } from './entries/fuchsia-city'
import { gymLeaderChronicleIdentifyEntries } from './entries/gym-leader-chronicles'

export const identifyEntries: IdentifyConfig[] = [
  ...palletTownidentifyEntries,
  ...pewterCityidentifyEntries,
  ...fuchsiaCityidentifyEntries,
  ...gymLeaderChronicleIdentifyEntries,
]
