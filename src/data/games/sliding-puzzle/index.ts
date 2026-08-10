export * from './types'
import { SlidingPuzzleConfig } from './types'

import { vermillionCityslidingPuzzleGames } from './entries/vermillion-city'
import { gymLeaderChronicleSlidingPuzzleGames } from './entries/gym-leader-chronicles'

export const slidingPuzzleGames: SlidingPuzzleConfig[] = [
  ...vermillionCityslidingPuzzleGames,
  ...gymLeaderChronicleSlidingPuzzleGames,
]
