export * from './types'
import { PrizeWheelGameConfig } from './types'

import { viridianCitychanseyEntries } from './entries/viridian-city'
import { pewterCitychanseyEntries } from './entries/pewter-city'
import { ceruleanCitychanseyEntries } from './entries/cerulean-city'
import { vermillionCitychanseyEntries } from './entries/vermillion-city'
import { lavenderTownchanseyEntries } from './entries/lavender-town'

export const chanseyEntries: PrizeWheelGameConfig[] = [
  ...viridianCitychanseyEntries,
  ...pewterCitychanseyEntries,
  ...ceruleanCitychanseyEntries,
  ...vermillionCitychanseyEntries,
  ...lavenderTownchanseyEntries,
]
