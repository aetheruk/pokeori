import { items, type BattleEffect } from '@/data/items'
import type { TrainerBattleItemConfig } from '@/data/types'
import { Z_MOVE_DAMAGE_MULTIPLIER } from '@/data/powers'
import { applyBattleItemEffect } from './item-effects'
import { ensureTrainerItemInitialQuantities } from './item-use-limits'
import type { BattlePokemon, BattleStance, BattleState } from './types'

export type TrainerItemContext = 'enemy-action' | 'after-player-action'

export interface TrainerItemUseResult {
  used: boolean
  message?: string
  zMoveStance?: BattleStance
  skipsEnemyAction?: boolean
}

export function normalizeTrainerBattleItems(
  trainerItems: TrainerBattleItemConfig[] | undefined,
): TrainerBattleItemConfig[] | undefined {
  if (!trainerItems?.length) return undefined

  const normalized = trainerItems
    .map((entry) => ({
      ...entry,
      quantity: Math.max(0, Math.floor(entry.quantity ?? 1)),
    }))
    .filter((entry) => entry.quantity && entry.quantity > 0)

  return normalized.length ? normalized : undefined
}

export function getTrainerItemZMoveMultiplier(result: TrainerItemUseResult): number {
  return result.zMoveStance ? Z_MOVE_DAMAGE_MULTIPLIER : 1
}

function getItemDefinition(itemId: string) {
  return items.find((item) => item.id === itemId && item.battleEffect)
}

function statusMatches(
  status: string,
  clearStatus: NonNullable<BattleEffect['clearStatus']>,
): boolean {
  return (
    clearStatus === 'all' ||
    (Array.isArray(clearStatus)
      ? clearStatus.includes(status)
      : clearStatus === status)
  )
}

function shouldTryTrainerItem(params: {
  pokemon: BattlePokemon
  item: NonNullable<ReturnType<typeof getItemDefinition>>
  context: TrainerItemContext
}): boolean {
  const { pokemon, item, context } = params
  if (pokemon.currentHp <= 0) return false
  if (!item.battleEffect) return false
  if (context === 'after-player-action' && item.battleEffect.type !== 'heal') {
    return false
  }

  const effect = item.battleEffect
  if (effect.type === 'heal') {
    const canHeal =
      Boolean(effect.healFull || effect.healAmount) &&
      pokemon.currentHp < pokemon.maxHp
    const canCure =
      Boolean(effect.clearStatus && pokemon.status) &&
      statusMatches(
        pokemon.status!.id,
        effect.clearStatus as NonNullable<BattleEffect['clearStatus']>,
      )
    return canHeal || canCure
  }

  if (effect.type === 'buff' && effect.buffStat && effect.buffStages) {
    const current = pokemon.statStages?.[effect.buffStat] ?? 0
    const max = effect.buffStat === 'crit' ? 3 : 6
    return current < max
  }

  return false
}

export function applyTrainerBattleItem(params: {
  state: BattleState
  pokemon: BattlePokemon
  itemName: string
  effect: BattleEffect
}): TrainerItemUseResult {
  const { state, pokemon, itemName, effect } = params

  if (effect.type === 'z-move' && effect.zMoveStance) {
    if (state.enemyZMoveStance) return { used: false }

    state.enemyZMoveStance = effect.zMoveStance
    return {
      used: true,
      message: `${state.enemyName || 'Enemy'} used ${itemName} on ${pokemon.name}!\n${pokemon.name} is surrounded by Z-Power!`,
      zMoveStance: effect.zMoveStance,
      skipsEnemyAction: effect.skipsTurn !== false,
    }
  }

  if (effect.type === 'reveal-stance') {
    return {
      used: true,
      message: `${state.enemyName || 'Enemy'} used ${itemName} on ${pokemon.name}!\n${pokemon.name} studied the battle carefully!`,
      skipsEnemyAction: effect.skipsTurn !== false,
    }
  }

  const effectResult = applyBattleItemEffect({ pokemon, battleEffect: effect })
  if (!effectResult.applied) return { used: false }

  return {
    used: true,
    message: `${state.enemyName || 'Enemy'} used ${itemName} on ${pokemon.name}!\n${effectResult.message}`,
    skipsEnemyAction: effect.skipsTurn !== false,
  }
}

export function applyTrainerBattleItemById(
  state: BattleState,
  itemId: string,
): TrainerItemUseResult {
  const trainerItems = state.trainerItems
  if (!trainerItems?.length || state.status !== 'ongoing') return { used: false }
  if (state.trainerItemLastUsedTurn === state.turn) return { used: false }
  ensureTrainerItemInitialQuantities(state)

  const entry = trainerItems.find(
    (candidate) => candidate.itemId === itemId && (candidate.quantity ?? 0) > 0,
  )
  if (!entry) return { used: false }

  const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
  if (!activeEnemy) return { used: false }

  const item = getItemDefinition(itemId)
  if (!item?.battleEffect) return { used: false }

  const result = applyTrainerBattleItem({
    state,
    pokemon: activeEnemy,
    itemName: item.name,
    effect: item.battleEffect,
  })
  if (!result.used) return result

  entry.quantity = Math.max(0, (entry.quantity ?? 1) - 1)
  state.trainerItemLastUsedTurn = state.turn
  return result
}

export function applyTrainerItemIfTriggered(
  state: BattleState,
  context: TrainerItemContext,
): TrainerItemUseResult {
  const trainerItems = state.trainerItems
  if (!trainerItems?.length || state.status !== 'ongoing') return { used: false }
  if (state.trainerItemLastUsedTurn === state.turn) return { used: false }
  ensureTrainerItemInitialQuantities(state)

  const activeEnemy = state.enemyTeam[state.activeEnemyIndex]
  if (!activeEnemy) return { used: false }

  for (const entry of trainerItems) {
    if (!entry.quantity || entry.quantity <= 0) continue

    const item = getItemDefinition(entry.itemId)
    if (!item?.battleEffect) continue

    if (
      !shouldTryTrainerItem({
        pokemon: activeEnemy,
        item,
        context,
      })
    ) {
      continue
    }

    const result = applyTrainerBattleItem({
      state,
      pokemon: activeEnemy,
      itemName: item.name,
      effect: item.battleEffect,
    })
    if (!result.used) continue

    entry.quantity -= 1
    state.trainerItemLastUsedTurn = state.turn
    return result
  }

  return { used: false }
}
