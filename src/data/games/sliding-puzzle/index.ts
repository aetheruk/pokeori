export * from './types'
import { SlidingPuzzleConfig } from './types'

import { vermillionCityslidingPuzzleGames } from './entries/vermillion-city'

export const slidingPuzzleGames: SlidingPuzzleConfig[] = [
  ...vermillionCityslidingPuzzleGames,
]
