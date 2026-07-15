/**
 * Battle Actions - Main Entry Point
 *
 * This file re-exports all battle-related functions from modularized files.
 * Import from this file for backward compatibility.
 */

// ============================================================================
// HELPERS
// ============================================================================

export { getUser } from './helpers/user'
export { getActiveBattleState } from './helpers/state-management'
export { finalizeTurn } from './helpers/turn-finalization'

// ============================================================================
// ACTIONS
// ============================================================================

export { surrenderBattle, clearBattleState } from './actions/surrender'
export { getBattleInventory } from './actions/inventory'
export type { BattleInventoryItem } from './actions/inventory'
export { swapPokemon } from './actions/pokemon-swap'
export { getAvailableMoves } from './actions/moves'
export { useBattleItem } from './actions/item-usage'
export { useMove } from './actions/use-move'

// ============================================================================
// PVE
// ============================================================================

// Redirect wrappers to actions.ts
export { processEnemyAttackOnly } from './pve/enemy-attack'
export { startBattle, getBattleState, submitTurn } from './actions'

// ============================================================================
// POWER SYSTEMS - COMPLETE ✅
// ============================================================================

export { getBattlePowers } from './powers/powers-data'
export type {
  MegaStoneData,
  VictoryPowerData,
  WeatherPowerData,
  BattlePowersData,
} from './powers/powers-data'

export {
  useTeraOrb,
  useMegaEvolution,
  useZMove,
  useDynamax,
  useVictoryPower,
  useWeatherPower,
  useShout,
  useCircadian,
} from './actions'

// ============================================================================
// 100% COMPLETE ✅
// ============================================================================
