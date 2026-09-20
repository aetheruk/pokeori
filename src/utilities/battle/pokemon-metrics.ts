import type { BattlePokemon, BattleState } from './types'

export type BattleTurnResult = 'win' | 'loss' | 'tie'

/** Counters stored on an individual owned Pokémon document. */
export interface PokemonBattleMetrics {
  superEffectiveHitsLanded: number
  stanceVictories: number
  stanceLosses: number
  battleKOs: number
  timesKOd: number
  movesUsed: number
}

export type PokemonBattleMetric = keyof PokemonBattleMetrics

/**
 * Return the persistent owned-Pokémon id represented by a battle Pokémon.
 * Wild/enemy projections and chronicle copies must never write player data.
 */
export function getPersistentPokemonId(
  pokemon: BattlePokemon | undefined,
): string | null {
  if (!pokemon?.id || pokemon.id.startsWith('enemy-')) return null
  if (pokemon.id.startsWith('chronicle:')) return null
  if (!pokemon.user || pokemon.user === 'enemy') return null
  return pokemon.id
}

function getMetricBucket(
  state: BattleState,
  pokemon: BattlePokemon | undefined,
): PokemonBattleMetrics | undefined {
  const pokemonId = getPersistentPokemonId(pokemon)
  if (!pokemonId || state.chronicle) return undefined

  state.pokemonBattleMetrics ??= {}
  if (!state.pokemonBattleMetrics[pokemonId]) {
    state.pokemonBattleMetrics[pokemonId] = {}
  }
  const bucket = state.pokemonBattleMetrics[pokemonId]
  return bucket as PokemonBattleMetrics
}

/** Add a battle-local metric for an owned Pokémon. */
export function recordPokemonBattleMetric(
  state: BattleState,
  pokemon: BattlePokemon | undefined,
  metric: PokemonBattleMetric,
  amount = 1,
): void {
  if (!Number.isFinite(amount) || amount <= 0) return
  const bucket = getMetricBucket(state, pokemon)
  if (!bucket) return
  const current = bucket[metric]
  bucket[metric] = (typeof current === 'number' ? current : 0) + amount
}

export function recordPokemonMoveUse(
  state: BattleState,
  pokemon: BattlePokemon | undefined,
): void {
  recordPokemonBattleMetric(state, pokemon, 'movesUsed')
}

export function recordPokemonSuperEffectiveHit(
  state: BattleState,
  pokemon: BattlePokemon | undefined,
): void {
  recordPokemonBattleMetric(state, pokemon, 'superEffectiveHitsLanded')
}

export function recordPokemonStanceResult(
  state: BattleState,
  pokemon: BattlePokemon | undefined,
  result: BattleTurnResult,
): void {
  if (result === 'win') {
    recordPokemonBattleMetric(state, pokemon, 'stanceVictories')
  } else if (result === 'loss') {
    recordPokemonBattleMetric(state, pokemon, 'stanceLosses')
  }
}
