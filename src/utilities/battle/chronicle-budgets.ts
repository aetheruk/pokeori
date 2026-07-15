import type { BattleConfig } from '@/data/types'
import type { BattleState } from './types'

export const DEFAULT_CHRONICLE_MOVE_USES = 100

function normalizeLimit(limit: number | null | undefined): number | undefined {
  if (typeof limit !== 'number' || !Number.isFinite(limit)) return undefined
  return Math.max(0, Math.floor(limit))
}

function getInventoryQuantityTotal(
  inventory: Record<string, number> | undefined,
): number {
  if (!inventory) return 0
  return Object.values(inventory).reduce(
    (sum, quantity) => sum + Math.max(0, Math.floor(quantity || 0)),
    0,
  )
}

export function getChronicleMoveUseLimit(
  battleConfig?: Pick<BattleConfig, 'movesPerBattle'>,
): number {
  return (
    normalizeLimit(battleConfig?.movesPerBattle) ??
    DEFAULT_CHRONICLE_MOVE_USES
  )
}

export function getChronicleBattleItemUseLimit(params: {
  battleItems?: Record<string, number>
  usedCount?: number
  battleConfig?: Pick<BattleConfig, 'itemsPerBattle'>
}): number {
  const configuredLimit = normalizeLimit(params.battleConfig?.itemsPerBattle)
  if (configuredLimit !== undefined) return configuredLimit

  return (
    getInventoryQuantityTotal(params.battleItems) +
    Math.max(0, Math.floor(params.usedCount || 0))
  )
}

export function normalizeChronicleBattleBudgets(
  state: BattleState,
  battleConfig?: Pick<BattleConfig, 'itemsPerBattle' | 'movesPerBattle'>,
): boolean {
  if (!state.chronicle) return false

  let changed = false
  state.config ??= {}

  const targetMoveLimit = getChronicleMoveUseLimit(battleConfig)
  const currentMoveLimit = normalizeLimit(state.config.movesPerBattle)
  const moveDelta =
    currentMoveLimit === undefined
      ? undefined
      : targetMoveLimit - currentMoveLimit

  if (currentMoveLimit === undefined || currentMoveLimit < targetMoveLimit) {
    state.config.movesPerBattle = targetMoveLimit
    changed = true
  }

  if (state.powers) {
    if (moveDelta !== undefined && moveDelta > 0) {
      state.powers.moveUsesRemaining += moveDelta
      changed = true
    } else if (currentMoveLimit === undefined) {
      state.powers.moveUsesRemaining = Math.max(
        state.powers.moveUsesRemaining,
        targetMoveLimit,
      )
      changed = true
    }
  }

  for (const pokemon of state.playerTeam) {
    if (moveDelta !== undefined && moveDelta > 0) {
      pokemon.moveUsesRemaining =
        (pokemon.moveUsesRemaining ?? currentMoveLimit ?? 0) + moveDelta
      changed = true
    } else if (pokemon.moveUsesRemaining === undefined) {
      pokemon.moveUsesRemaining = targetMoveLimit
      changed = true
    }
  }

  const targetItemLimit = getChronicleBattleItemUseLimit({
    battleItems: state.chronicleInventory,
    usedCount: state.itemsUsedThisBattle?.length || 0,
    battleConfig,
  })
  const currentItemLimit = normalizeLimit(state.config.itemsPerBattle)
  if (currentItemLimit === undefined || currentItemLimit < targetItemLimit) {
    state.config.itemsPerBattle = targetItemLimit
    changed = true
  }

  return changed
}
