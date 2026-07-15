import type { BattleLogEntry, BattleState } from './types'

export const MAX_BATTLE_HISTORY = 120

export function trimBattleHistory(
  history: BattleLogEntry[],
  limit: number = MAX_BATTLE_HISTORY,
): BattleLogEntry[] {
  if (!Array.isArray(history)) return []
  if (history.length <= limit) return history
  return history.slice(0, limit)
}

export function prependBattleHistory(
  history: BattleLogEntry[],
  entry: BattleLogEntry,
  limit: number = MAX_BATTLE_HISTORY,
): BattleLogEntry[] {
  const nextHistory = [entry, ...history]
  if (nextHistory.length <= limit) return nextHistory
  return nextHistory.slice(0, limit)
}

export function trimBattleStateHistory(
  state: BattleState,
  limit: number = MAX_BATTLE_HISTORY,
): BattleState {
  if (!state.history || state.history.length <= limit) return state
  return {
    ...state,
    history: trimBattleHistory(state.history, limit),
  }
}
