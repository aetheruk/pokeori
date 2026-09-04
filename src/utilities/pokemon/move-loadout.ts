import type { MoveConfig, MoveStance } from '@/data/moves/types'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'
import { selectBattleMoveLoadoutFromCandidates } from '@/utilities/battle/enemy-ai'
import type { BattlePokemon } from '@/utilities/battle/types'
import type { MovePresentationSource } from '@/utilities/pokemon/move-display'

export type MoveLoadoutRole =
  | 'damage'
  | 'status'
  | 'healing'
  | 'setup'
  | 'utility'

export type MoveLoadoutSort = 'assigned' | 'name' | 'power' | 'accuracy'

export interface MoveLoadoutEntry {
  move: MoveConfig
  source: MovePresentationSource
  sourceLabel: string
}

export interface MoveLoadoutFilters {
  query: string
  type: string
  stance: 'all' | MoveStance
  role: 'all' | MoveLoadoutRole
  source: 'all' | MovePresentationSource
  sort: MoveLoadoutSort
}

export function getMoveLoadoutRoles(move: MoveConfig): MoveLoadoutRole[] {
  const roles: MoveLoadoutRole[] = []

  if (
    move.damage > 0 ||
    move.damageRange ||
    move.damageRule ||
    move.delayedDamage
  ) {
    roles.push('damage')
  }
  if (
    move.heal ||
    move.healFull ||
    move.weatherHeal ||
    move.absorb ||
    move.partyRevive ||
    move.healByTargetStat
  ) {
    roles.push('healing')
  }
  if (
    move.status ||
    move.additionalStatuses?.length ||
    move.randomStatuses?.options.length ||
    move.secondaryStatuses?.length ||
    move.statusTransfer
  ) {
    roles.push('status')
  }
  if (
    move.buffs?.length ||
    move.debuffs?.length ||
    move.onUserDamagedSameTurn?.length ||
    move.statStageEffect
  ) {
    roles.push('setup')
  }

  return roles.length ? roles : ['utility']
}

export function getMoveLoadoutBasePower(move: MoveConfig): number {
  if (move.damage <= 0) return 0
  return Math.round(move.damage * BASE_BATTLE_POWER)
}

export function filterMoveLoadoutEntries(params: {
  entries: MoveLoadoutEntry[]
  filters: MoveLoadoutFilters
  selectedMoveIds?: string[]
}): MoveLoadoutEntry[] {
  const { entries, filters, selectedMoveIds = [] } = params
  const normalizedQuery = filters.query.trim().toLocaleLowerCase()
  const selected = new Set(selectedMoveIds)

  return entries
    .filter(({ move, source, sourceLabel }) => {
      if (
        filters.type !== 'all' &&
        (move.forcedType || 'normal') !== filters.type
      ) {
        return false
      }
      if (filters.stance !== 'all' && move.stance !== filters.stance) {
        return false
      }
      if (
        filters.role !== 'all' &&
        !getMoveLoadoutRoles(move).includes(filters.role)
      ) {
        return false
      }
      if (filters.source !== 'all' && source !== filters.source) return false

      if (!normalizedQuery) return true
      return [move.name, move.description, sourceLabel]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase().includes(normalizedQuery))
    })
    .sort((a, b) => {
      if (filters.sort === 'assigned') {
        const assignedDifference =
          Number(selected.has(b.move.id)) - Number(selected.has(a.move.id))
        if (assignedDifference) return assignedDifference
      }
      if (filters.sort === 'power') {
        const difference =
          getMoveLoadoutBasePower(b.move) - getMoveLoadoutBasePower(a.move)
        if (difference) return difference
      }
      if (filters.sort === 'accuracy') {
        const difference =
          Number(b.move.alwaysHits ? 101 : b.move.accuracy) -
          Number(a.move.alwaysHits ? 101 : a.move.accuracy)
        if (difference) return difference
      }
      return a.move.name.localeCompare(b.move.name)
    })
}

export function autoPickMoveLoadout(params: {
  pokemon: BattlePokemon
  moveIds: string[]
  maxMoves: number
}): string[] {
  const moveIds = Array.from(new Set(params.moveIds))
  if (params.maxMoves <= 0 || moveIds.length === 0) return []

  const recommended = selectBattleMoveLoadoutFromCandidates({
    self: params.pokemon,
    moveIds,
    maxMoves: params.maxMoves,
  })
  const recommendedSet = new Set(recommended)

  return [
    ...recommended,
    ...moveIds.filter((moveId) => !recommendedSet.has(moveId)),
  ].slice(0, params.maxMoves)
}
