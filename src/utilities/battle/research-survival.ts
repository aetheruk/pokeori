import type { BattlePokemon } from './types'

export const POKEMON_RESEARCH_ENDURE_LEVEL = 4
export const POKEMON_RESEARCH_ENDURE_CHANCE = 0.02

export function getPokemonResearchEndureMessage(pokemonName: string): string {
  return `You and ${pokemonName} feel connected. ${pokemonName} survives a powerful blow.`
}

export function applyPokemonResearchEndure(
  pokemon: BattlePokemon,
  incomingDamage: number,
  random: () => number = Math.random,
): { damage: number; message: string } {
  if (incomingDamage <= 0) return { damage: incomingDamage, message: '' }
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
