import type { BattlePokemon, BattleState } from './types'

export const POKEMON_RESEARCH_ENDURE_LEVEL = 4
export const POKEMON_RESEARCH_ENDURE_CHANCE = 0.02

export function getPokemonResearchEndureMessage(pokemonName: string): string {
  return `You and ${pokemonName} feel connected. ${pokemonName} survives a powerful blow.`
}

/**
 * Research bond is a player progression reward. PvE opponents must never use
 * it, including rival teams backed by persisted Pokemon records. PvP has a
 * real player on both sides, so both sides remain eligible.
 */
export function canApplyPokemonResearchEndure(
  state: Pick<BattleState, 'isPvp'> | undefined,
  targetSide: 'player' | 'enemy' | undefined,
): boolean {
  return !!state && !!targetSide && (state.isPvp || targetSide === 'player')
}

export function applyPokemonResearchEndure(
  pokemon: BattlePokemon,
  incomingDamage: number,
  random: () => number = Math.random,
  canTrigger = false,
): { damage: number; message: string } {
  if (incomingDamage <= 0) return { damage: incomingDamage, message: '' }
  if (!canTrigger) return { damage: incomingDamage, message: '' }
  if ((pokemon.pokemonResearchLevel ?? 0) < POKEMON_RESEARCH_ENDURE_LEVEL) {
    return { damage: incomingDamage, message: '' }
  }
  if (pokemon.currentHp <= 1 || incomingDamage < pokemon.currentHp) {
    return { damage: incomingDamage, message: '' }
  }
  if (random() >= POKEMON_RESEARCH_ENDURE_CHANCE) {
    return { damage: incomingDamage, message: '' }
  }

  return {
    damage: pokemon.currentHp - 1,
    message: getPokemonResearchEndureMessage(pokemon.name),
  }
}
