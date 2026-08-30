export * from './types'
import { SilhouetteConfig } from './types'

import { palletTownsilhouetteEntries } from './entries/pallet-town'
import { pewterCitysilhouetteEntries } from './entries/pewter-city'
import { gymLeaderChronicleSilhouetteEntries } from './entries/gym-leader-chronicles'
import { safariZoneSilhouetteEntries } from './entries/safari-zone'

export const silhouetteEntries: SilhouetteConfig[] = [
  ...palletTownsilhouetteEntries,
  ...pewterCitysilhouetteEntries,
  ...gymLeaderChronicleSilhouetteEntries,
  ...safariZoneSilhouetteEntries,
]
