export * from './types'

import type { RunGameConfig } from './types'

import { pewterCitybasicEntries } from './entries/pewter-city'
import { testbasicEntries } from './entries/test'

export const runGames: RunGameConfig[] = [...pewterCitybasicEntries, ...testbasicEntries]
