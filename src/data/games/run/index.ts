export * from './types'

import type { RunGameConfig } from './types'

import { pewterCitybasicEntries } from './entries/pewter-city'

export const runGames: RunGameConfig[] = [...pewterCitybasicEntries]
