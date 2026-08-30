export * from './types'

import { basicEntries as rockPushEntries } from '../rock-push'
import { voltorbGridGames } from '../voltorb-grid'
import { rockTunnelEchoMapGames } from '../rock-tunnel-echo-map'
import type { GridPuzzleGameConfig } from './types'

/**
 * All authored spatial puzzles. The ruleset is selected by settings.variant;
 * the public game mode remains `grid-puzzle` for every entry.
 */
export const gridPuzzleGames: GridPuzzleGameConfig[] = [
  ...rockPushEntries.map(
    (entry) =>
      ({ ...entry, gameType: 'grid-puzzle' as const }) as unknown as GridPuzzleGameConfig,
  ),
  ...voltorbGridGames.map(
    (entry) =>
      ({ ...entry, gameType: 'grid-puzzle' as const }) as unknown as GridPuzzleGameConfig,
  ),
  ...rockTunnelEchoMapGames.map(
    (entry) =>
      ({ ...entry, gameType: 'grid-puzzle' as const }) as unknown as GridPuzzleGameConfig,
  ),
]
