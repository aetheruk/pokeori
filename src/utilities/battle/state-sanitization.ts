import type { BattleState } from './types'

type MutableBattlePokemon = BattleState['playerTeam'][number] & {
  assignedMoves?: unknown
  aiMoves?: unknown
  aiMoveLoadout?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object')
}

function normalizeMoveId(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function normalizeMoveIdList(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  const seen = new Set<string>()
  const moveIds: string[] = []

  for (const entry of value) {
    const moveId = normalizeMoveId(
      typeof entry === 'string'
        ? entry
        : isRecord(entry)
          ? entry.moveId
          : undefined,
    )
    if (!moveId || seen.has(moveId)) continue
    seen.add(moveId)
    moveIds.push(moveId)
  }

  return moveIds
}

function normalizeAssignedMoveRows(value: unknown): { moveId: string }[] {
  if (!Array.isArray(value)) return []

  const seen = new Set<string>()
  const rows: { moveId: string }[] = []

  for (const entry of value) {
    const moveId = normalizeMoveId(
      typeof entry === 'string'
        ? entry
        : isRecord(entry)
          ? entry.moveId
          : undefined,
    )
    if (!moveId || seen.has(moveId)) continue
    seen.add(moveId)
    rows.push({ moveId })
  }

  return rows
}

function arraysEqual<T>(a: T[] | undefined, b: T[]): boolean {
  if (!Array.isArray(a)) return a === undefined && b.length === 0
  if (a.length !== b.length) return false
  return a.every((entry, index) => entry === b[index])
}

function assignedRowsEqual(a: unknown, b: { moveId: string }[]): boolean {
  if (!Array.isArray(a)) return a === undefined && b.length === 0
  if (a.length !== b.length) return false
  return a.every((entry, index) => {
    const moveId =
      typeof entry === 'string'
        ? entry
        : isRecord(entry)
          ? entry.moveId
          : undefined
    return moveId === b[index]?.moveId
  })
}

function sanitizePokemonMoveState(pokemon: MutableBattlePokemon): boolean {
  let changed = false

  if ('assignedMoves' in pokemon) {
    const normalized = normalizeAssignedMoveRows(pokemon.assignedMoves)
    if (!assignedRowsEqual(pokemon.assignedMoves, normalized)) {
      pokemon.assignedMoves = normalized
      changed = true
    }
  }

  if ('aiMoves' in pokemon) {
    const normalized = normalizeMoveIdList(pokemon.aiMoves)
    if (!arraysEqual(pokemon.aiMoves as string[] | undefined, normalized)) {
      pokemon.aiMoves = normalized
      changed = true
    }
  }

  if ('aiMoveLoadout' in pokemon) {
    const normalized = normalizeMoveIdList(pokemon.aiMoveLoadout)
    if (
      !arraysEqual(pokemon.aiMoveLoadout as string[] | undefined, normalized)
    ) {
      pokemon.aiMoveLoadout = normalized
      changed = true
    }
  }

  return changed
}

export function sanitizeBattleMoveState(state: BattleState): {
  state: BattleState
  changed: boolean
} {
  let changed = false

  for (const pokemon of state.playerTeam || []) {
    changed =
      sanitizePokemonMoveState(pokemon as MutableBattlePokemon) || changed
  }

  for (const pokemon of state.enemyTeam || []) {
    changed =
      sanitizePokemonMoveState(pokemon as MutableBattlePokemon) || changed
  }

  const usedByPokemon = state.moveHistory?.usedByPokemon
  if (usedByPokemon) {
    for (const [key, value] of Object.entries(usedByPokemon)) {
      const normalized = normalizeMoveIdList(value)
      if (!arraysEqual(value, normalized)) {
        usedByPokemon[key] = normalized
        changed = true
      }
    }
  }

  return { state, changed }
}
