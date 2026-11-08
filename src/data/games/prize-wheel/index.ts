export * from './types'
import { PrizeWheelGameConfig } from './types'

import { viridianCitychanseyEntries } from './entries/viridian-city'
import { celadonGameCornerPrizeWheelEntries } from './entries/celadon-game-corner'

export const chanseyEntries: PrizeWheelGameConfig[] = [
  ...viridianCitychanseyEntries,
  ...celadonGameCornerPrizeWheelEntries,
]
