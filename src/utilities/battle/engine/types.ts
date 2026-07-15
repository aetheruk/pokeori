export type { BattleState, BattleStance } from '../types'
import type { TcgCard } from '@/data/tcg/types'
import type { TaskExitModal } from '@/data/tasks'

export type BattleEventType =
  | 'SET_INITIAL_STATE'   // Force immediate state sync (no anim)
  | 'PLAY_SEQUENCE'       // A complex sequence of animations + state updates
  | 'UPDATE_VISUAL_HP'    // Specifically trigger an HP bar drop
  | 'ADD_LOG_ENTRY'       // Add a single log entry to the visual log
  | 'KO_SEQUENCE'         // Proper fainting logic
  | 'BATTLE_END'          // Final transition to results

export interface BattleEvent {
  type: BattleEventType
  payload?: any
  delay?: number // Optional override for how long to wait after this event
}

export interface AnimationState {
  playerAttacking: boolean
  enemyAttacking: boolean
  playerHit: boolean
  enemyHit: boolean
  playerFainting: boolean
  enemyFainting: boolean
  playerSwitchingOut: boolean
  enemySwitchingOut: boolean
  playerSwitchingIn: boolean
  enemySwitchingIn: boolean
  playerDamageSplat: number | null
  enemyDamageSplat: number | null
  playerStatusDamageSplat: number | null
  enemyStatusDamageSplat: number | null
  playerImpactType: string | null
  enemyImpactType: string | null
}

export const INITIAL_ANIMATION_STATE: AnimationState = {
  playerAttacking: false,
  enemyAttacking: false,
  playerHit: false,
  enemyHit: false,
  playerFainting: false,
  enemyFainting: false,
  playerSwitchingOut: false,
  enemySwitchingOut: false,
  playerSwitchingIn: false,
  enemySwitchingIn: false,
  playerDamageSplat: null,
  enemyDamageSplat: null,
  playerStatusDamageSplat: null,
  enemyStatusDamageSplat: null,
  playerImpactType: null,
  enemyImpactType: null,
}
