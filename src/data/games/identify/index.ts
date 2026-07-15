export * from './types'
import { IdentifyConfig } from './types'

import { palletTownidentifyEntries } from './entries/pallet-town'
import { pewterCityidentifyEntries } from './entries/pewter-city'

export const identifyEntries: IdentifyConfig[] = [
  ...palletTownidentifyEntries,
  ...pewterCityidentifyEntries,
]
