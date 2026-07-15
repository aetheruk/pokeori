export * from './types'
import { CompareConfig } from './types'

import { palletTowncompareEntries } from './entries/pallet-town'

export const compareEntries: CompareConfig[] = [
  ...palletTowncompareEntries,
]
