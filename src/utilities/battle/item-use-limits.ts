import type { BattleState } from './types'

export type BattleSide = 'player' | 'enemy'

export function getBattleItemUseLimit(
  state: Pick<BattleState, 'config' | 'itemUseModifiers' | 'trainerItems' | 'trainerItemInitialQuantities'>,
  side: BattleSide = 'player',
): number {
  if (side === 'enemy' && state.trainerItems?.length) {
    const initial = state.trainerItemInitialQuantities
    return state.trainerItems.reduce((sum, entry) => {
      const key = trainerItemKey(entry.itemId)
      return sum + Math.max(0, initial?.[key] ?? entry.quantity ?? 0)
    }, 0)
  }

  const baseLimit = state.config?.itemsPerBattle ?? 0
  const modifier = state.itemUseModifiers?.[side] ?? 0
  return Math.max(0, baseLimit + modifier)
}

export function getBattleItemUsesRemaining(
  state: Pick<
    BattleState,
    | 'config'
    | 'itemUseModifiers'
    | 'itemUseAvailabilityModifiers'
    | 'itemsUsedThisBattle'
    | 'trainerItems'
    | 'trainerItemInitialQuantities'
  >,
  side: BattleSide = 'player',
): number {
  if (side !== 'player') {
    const remaining = state.trainerItems?.length
      ? state.trainerItems.reduce((sum, entry) => sum + Math.max(0, entry.quantity ?? 0), 0)
      : getBattleItemUseLimit(state, side)
    return Math.max(0, remaining + (state.itemUseAvailabilityModifiers?.[side] ?? 0))
  }

  const max = getBattleItemUseLimit(state, side)
  const available =
    max -
    (state.itemsUsedThisBattle?.length || 0) +
    (state.itemUseAvailabilityModifiers?.[side] ?? 0)

  return Math.max(0, Math.min(max, available))
}

export function trainerItemKey(itemId: string): string {
  return itemId
}

export function ensureTrainerItemInitialQuantities(state: BattleState): void {
  if (!state.trainerItems?.length) return
  state.trainerItemInitialQuantities ??= {}
  for (const entry of state.trainerItems) {
    const key = trainerItemKey(entry.itemId)
    if (state.trainerItemInitialQuantities[key] === undefined) {
      state.trainerItemInitialQuantities[key] = Math.max(0, entry.quantity ?? 0)
    }
  }
}

function adjustPlayerAvailableItemUses(state: BattleState, amount: number): number {
  state.itemUseAvailabilityModifiers ??= {}
  const before = getBattleItemUsesRemaining(state, 'player')
  const max = getBattleItemUseLimit(state, 'player')
  const used = state.itemsUsedThisBattle?.length || 0
  const currentModifier = state.itemUseAvailabilityModifiers.player ?? 0
  const nextModifier = Math.max(used - max, Math.min(used, currentModifier + amount))
  state.itemUseAvailabilityModifiers.player = nextModifier
  return getBattleItemUsesRemaining(state, 'player') - before
}

function adjustEnemyTrainerItemUses(state: BattleState, amount: number): number {
  ensureTrainerItemInitialQuantities(state)
  const items = state.trainerItems || []
  if (!items.length || amount === 0) return 0

  let remaining = Math.abs(amount)
  let changed = 0

  if (amount < 0) {
    for (const entry of items) {
      if (remaining <= 0) break
      const available = Math.max(0, entry.quantity ?? 0)
      const used = Math.min(available, remaining)
      if (used <= 0) continue
      entry.quantity = available - used
      remaining -= used
      changed -= used
    }
    return changed
  }

  for (const entry of items) {
    if (remaining <= 0) break
    const key = trainerItemKey(entry.itemId)
    const max = state.trainerItemInitialQuantities?.[key] ?? entry.quantity ?? 0
    const available = Math.max(0, entry.quantity ?? 0)
    const room = Math.max(0, max - available)
    const restored = Math.min(room, remaining)
    if (restored <= 0) continue
    entry.quantity = available + restored
    remaining -= restored
    changed += restored
  }

  return changed
}

export function adjustBattleItemUsesRemaining(
  state: BattleState,
  side: BattleSide,
  amount: number,
): number {
  if (side === 'enemy' && state.trainerItems?.length) {
    return adjustEnemyTrainerItemUses(state, amount)
  }

  return adjustPlayerAvailableItemUses(state, amount)
}

export function adjustBattleItemUseLimit(
  state: BattleState,
  side: BattleSide,
  amount: number,
): number {
  state.itemUseModifiers ??= {}
  const currentLimit = getBattleItemUseLimit(state, side)
  const baseLimit = state.config?.itemsPerBattle ?? 0
  const used = side === 'player' ? state.itemsUsedThisBattle.length : 0
  const nextLimit = Math.max(used, Math.min(baseLimit, currentLimit + amount))
  state.itemUseModifiers[side] = nextLimit - baseLimit
  return nextLimit
}
