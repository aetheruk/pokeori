export * from './types'
import { SlidingPuzzleConfig } from './types'

import { testslidingpuzzlegamesEntries } from './entries/test'
import { vermillionCityslidingPuzzleGames } from './entries/vermillion-city'

export const slidingPuzzleGames: SlidingPuzzleConfig[] = [
  ...testslidingpuzzlegamesEntries,
  ...vermillionCityslidingPuzzleGames,
]
