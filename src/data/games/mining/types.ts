//
// Mining Game
// Tap when the chevron is in the random target zone to mine resources
//

import { BaseGameConfig, TaskIcon } from '../shared'

export interface MiningGameSettings {
  targetSize: { min: number; max: number } // % of bar width for target zone
  speed: { min: number; max: number } // oscillation speed (cycles per second)
  itemHp: number // HP to deplete for success
  perfectDamage: number // damage for perfect hit (center of zone)
  okDamage: number // damage for OK hit (10% boundary either side)
  maxSwings?: number // optional swing limit
  timeLimit: number // game duration in seconds
  winRate?: number // Required wins (default 1 for one-shot game)
  buttonIcon: TaskIcon // icon for the tap button
  miningTarget: string // image path for the mining target overlay
}

export interface MiningConfig extends BaseGameConfig {
  settings: MiningGameSettings
}
