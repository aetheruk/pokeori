export * from './types'
import { SnapConfig } from './types'

import { palletTownsnapEntries } from './entries/pallet-town'
import { safariZonesnapEntries } from './entries/safari-zone'
import { specialEventSnapEntries } from './entries/special-events'
import { viridianForestsnapEntries } from './entries/viridian-forest'
import { vermillionCitysnapEntries } from './entries/vermillion-city'

export const snapEntries: SnapConfig[] = [
  ...specialEventSnapEntries,
  ...palletTownsnapEntries,
  ...safariZonesnapEntries,
  ...viridianForestsnapEntries,
  ...vermillionCitysnapEntries,
]
