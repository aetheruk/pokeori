export * from './types'
import { SilhouetteConfig } from './types'

import { palletTownsilhouetteEntries } from './entries/pallet-town'
import { pewterCitysilhouetteEntries } from './entries/pewter-city'

export const silhouetteEntries: SilhouetteConfig[] = [
  ...palletTownsilhouetteEntries,
  ...pewterCitysilhouetteEntries,
]
