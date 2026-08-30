import type { BaseGameConfig } from '../shared'
import type { RockPushGameConfig } from '../rock-push/types'
import type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoMapSettings,
} from '../rock-tunnel-echo-map/types'
import type { VoltorbGridGameConfig, VoltorbGridSettings } from '../voltorb-grid/types'

/** Ruleset implemented by the shared grid-puzzle game mode. */
export type GridPuzzleVariant = 'rock-push' | 'voltorb' | 'echo-map'

export type GridPuzzleRockPushSettings = RockPushGameConfig['settings'] & {
  variant: 'rock-push'
}

export type GridPuzzleVoltorbSettings = VoltorbGridSettings & {
  variant: 'voltorb'
}

export type GridPuzzleEchoMapSettings = RockTunnelEchoMapSettings & {
  variant: 'echo-map'
}

export type GridPuzzleSettings =
  | GridPuzzleRockPushSettings
  | GridPuzzleVoltorbSettings
  | GridPuzzleEchoMapSettings

export interface GridPuzzleGameConfig extends BaseGameConfig {
  gameType: 'grid-puzzle'
  settings: GridPuzzleSettings
}

export type GridPuzzleRockPushGameConfig = Omit<
  GridPuzzleGameConfig,
  'settings'
> & { settings: GridPuzzleRockPushSettings }

export type GridPuzzleVoltorbGameConfig = Omit<
  GridPuzzleGameConfig,
  'settings'
> & { settings: GridPuzzleVoltorbSettings }

export type GridPuzzleEchoMapGameConfig = Omit<
  GridPuzzleGameConfig,
  'settings'
> & { settings: GridPuzzleEchoMapSettings }

export type GridPuzzlePosition =
  | RockPushGameConfig['settings']['playerStart']
  | VoltorbGridGameConfig['settings']['playerStart']
  | RockTunnelEchoMapGameConfig['settings']['playerStart']
