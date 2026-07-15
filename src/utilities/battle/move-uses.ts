import type { BattlePokemon, BattleState, PowersState } from './types'

function normalizeLimit(limit: number | null | undefined): number {
  if (typeof limit !== 'number' || !Number.isFinite(limit)) return 0
  return Math.max(0, Math.floor(limit))
}

export function initializePokemonMoveUses<T extends BattlePokemon>(
  pokemon: T,
  limit: number,
): T {
  pokemon.moveUsesRemaining = normalizeLimit(limit)
  return pokemon
}

export function initializeTeamMoveUses<T extends BattlePokemon>(
  team: T[],
  limit: number,
): T[] {
  return team.map((pokemon) => initializePokemonMoveUses(pokemon, limit))
}

export function getPokemonMoveUsesRemaining(
  pokemon: BattlePokemon | null | undefined,
  fallback?: number,
): number {
  if (pokemon && typeof pokemon.moveUsesRemaining === 'number') {
    return normalizeLimit(pokemon.moveUsesRemaining)
  }
  return normalizeLimit(fallback)
}

export function ensurePokemonMoveUses(
  pokemon: BattlePokemon,
  limit: number,
): number {
  if (typeof pokemon.moveUsesRemaining !== 'number') {
    pokemon.moveUsesRemaining = normalizeLimit(limit)
  }
  return pokemon.moveUsesRemaining
}

export function consumePokemonMoveUse(
  pokemon: BattlePokemon,
  fallbackPowerState?: Pick<PowersState, 'moveUsesRemaining'>,
): boolean {
  const fallback = fallbackPowerState?.moveUsesRemaining
  const remaining = ensurePokemonMoveUses(pokemon, fallback ?? 0)
  if (remaining <= 0) return false

  pokemon.moveUsesRemaining = remaining - 1
  if (fallbackPowerState) {
    fallbackPowerState.moveUsesRemaining = pokemon.moveUsesRemaining
  }
  return true
}

export function lowerPokemonMoveUses(params: {
  state: BattleState
  side: 'player' | 'enemy'
  pokemon: BattlePokemon
  amount: number
}): number {
  const { state, side, pokemon } = params
  const amount = normalizeLimit(params.amount)
  if (amount <= 0) return 0
  const fallback =
    side === 'player'
      ? state.powers?.moveUsesRemaining
      : state.enemyMoveUsesRemaining
  const before = getPokemonMoveUsesRemaining(pokemon, fallback)
  const after = Math.max(0, before - amount)
  pokemon.moveUsesRemaining = after
  if (side === 'player' && state.powers) state.powers.moveUsesRemaining = after
  if (side === 'enemy') state.enemyMoveUsesRemaining = after
  return before - after
}
