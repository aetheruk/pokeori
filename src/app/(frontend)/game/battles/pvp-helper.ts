import type { BattleState } from '@/utilities/battle/types'
import { initializeSharedPvpBattle as initializeSharedPvpBattleImpl } from './pvp/start-battle'
import { resolvePvpTurn as resolvePvpTurnImpl } from './pvp/resolution'
import { useDimensionalShift as useDimensionalShiftImpl } from './powers/dimensional'
import type { PvpMove } from './pvp/resolution'

// Backward-compatible shim: route legacy helper imports to canonical PVP modules.
export async function initializeSharedPvpBattle(
  battleId: string,
  matchData: { player1: string; player2: string; configId: string },
): Promise<BattleState | null> {
  return initializeSharedPvpBattleImpl(battleId, matchData)
}

export async function resolvePvpTurn(
  state: BattleState,
  p1Move: PvpMove,
  p2Move: PvpMove,
): Promise<BattleState> {
  return resolvePvpTurnImpl(state, p1Move, p2Move)
}

export async function useDimensionalShift(
  state: BattleState,
  userId: string,
  type: 'time' | 'space' | 'chaos',
): Promise<{ success: boolean; error?: string; state?: BattleState }> {
  return useDimensionalShiftImpl(state, userId, type)
}
