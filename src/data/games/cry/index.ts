export * from './types'
import { CryConfig } from './types'

import { palletTowncryEntries } from './entries/pallet-town'
import { ceruleanCitycryEntries } from './entries/cerulean-city'
import { gymLeaderChronicleCryEntries } from './entries/gym-leader-chronicles'

export const cryEntries: CryConfig[] = [
  ...palletTowncryEntries,
  ...ceruleanCitycryEntries,
  ...gymLeaderChronicleCryEntries,
]
