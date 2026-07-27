export * from './types'
import { SnapConfig } from './types'

import { palletTownsnapEntries } from './entries/pallet-town'
import { specialEventSnapEntries } from './entries/special-events'
import { viridianForestsnapEntries } from './entries/viridian-forest'
import { vermillionCitysnapEntries } from './entries/vermillion-city'

export const snapEntries: SnapConfig[] = [
  ...specialEventSnapEntries,
  ...palletTownsnapEntries,
  ...viridianForestsnapEntries,
  ...vermillionCitysnapEntries,
]
