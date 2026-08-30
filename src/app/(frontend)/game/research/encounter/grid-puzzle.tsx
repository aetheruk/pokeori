'use client'

import { RockPushGame } from './rock-push'
import { RockTunnelEchoMapGame } from './rock-tunnel-echo-map'
import { VoltorbGridGame } from './voltorb-grid'
import type {
  GridPuzzleGameConfig,
  GridPuzzleSettings,
} from '@/data/games/grid-puzzle'

interface GridPuzzleGameProps {
  encounter: GridPuzzleGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
  state?: any
}

/** Routes every spatial puzzle through one game mode while keeping rulesets isolated. */
export function GridPuzzleGame({
  encounter,
  initialState,
}: GridPuzzleGameProps) {
  const settings = encounter.settings as GridPuzzleSettings

  switch (settings.variant) {
    case 'rock-push':
      return (
        <RockPushGame
          encounter={encounter as any}
          initialState={initialState}
        />
      )
    case 'voltorb':
      return (
        <VoltorbGridGame
          encounter={encounter as any}
          initialState={initialState}
        />
      )
    case 'echo-map':
      return (
        <RockTunnelEchoMapGame
          encounter={encounter as any}
          initialState={initialState}
        />
      )
  }

  return null
}
