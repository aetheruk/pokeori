import type { BattlePokemon } from '@/utilities/battle/types'

export const TERA_TURNS = 3

export function activateTeraOnPokemon(
  mon: BattlePokemon,
  currentTurn?: number,
): boolean {
  if (!mon.teraType) return false

  mon.teraTypeOverride = mon.teraType
  mon.teraTurnsRemaining = TERA_TURNS
  mon.teraActivatedTurn = currentTurn
  mon.teraUsed = true
  return true
}

export function advanceTeraDuration(
  mon: BattlePokemon | undefined,
  currentTurn?: number,
): void {
  if (!mon?.teraTypeOverride) return
  if (
    currentTurn !== undefined &&
    mon.teraActivatedTurn !== undefined &&
    mon.teraActivatedTurn === currentTurn
  ) {
    return
  }

  const turnsRemaining = mon.teraTurnsRemaining ?? 0
  mon.teraTurnsRemaining = Math.max(0, turnsRemaining - 1)

  if (mon.teraTurnsRemaining <= 0) {
    mon.teraTypeOverride = undefined
    mon.teraTurnsRemaining = undefined
    mon.teraActivatedTurn = undefined
  }
}

export function getEffectiveBattleTypes(
  pokemon: Pick<BattlePokemon, 'types' | 'teraTypeOverride' | 'battleTypeOverride'>,
): string[] {
  if (pokemon.teraTypeOverride) return [pokemon.teraTypeOverride]
  if (pokemon.battleTypeOverride?.length) return pokemon.battleTypeOverride
  return pokemon.types
}

export function resetBattleTypeChange(mon: BattlePokemon | undefined): void {
  if (!mon) return
  if (mon.battleTypeOriginalTypes?.length) {
    mon.types = [...mon.battleTypeOriginalTypes]
  }
  mon.battleTypeOverride = undefined
  mon.battleTypeOriginalTypes = undefined
  mon.battleTypeTurnsRemaining = undefined
}

export function advanceBattleTypeChangeDuration(mon: BattlePokemon | undefined): void {
  if (!mon?.battleTypeOverride?.length) return
  if (typeof mon.battleTypeTurnsRemaining !== 'number') return

  mon.battleTypeTurnsRemaining -= 1
  if (mon.battleTypeTurnsRemaining <= 0) {
    resetBattleTypeChange(mon)
  }
}
