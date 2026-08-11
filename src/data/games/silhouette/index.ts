export * from './types'
import { SilhouetteConfig } from './types'

import { palletTownsilhouetteEntries } from './entries/pallet-town'
import { pewterCitysilhouetteEntries } from './entries/pewter-city'
import { gymLeaderChronicleSilhouetteEntries } from './entries/gym-leader-chronicles'

export const silhouetteEntries: SilhouetteConfig[] = [
  ...palletTownsilhouetteEntries,
  ...pewterCitysilhouetteEntries,
  ...gymLeaderChronicleSilhouetteEntries,
]
