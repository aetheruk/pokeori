export * from './types'
import { RockPushGameConfig } from './types'

import { testbasicEntries } from './entries/test'

export const basicEntries: RockPushGameConfig[] = [
  ...testbasicEntries,
]
