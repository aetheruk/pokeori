import { getPokemonSpecies } from './pokedex'

export type PokemonGender = 'male' | 'female' | 'genderless'

const VALID_GENDERS = new Set<PokemonGender>(['male', 'female', 'genderless'])

export function normalizePokemonGender(value: unknown): PokemonGender | null {
  return typeof value === 'string' && VALID_GENDERS.has(value as PokemonGender)
    ? (value as PokemonGender)
    : null
}

export function getPokemonGenderRate(speciesId: string | number): number {
  const species = getPokemonSpecies(Number(speciesId))
  return species?.gender_rate ?? 0
}

export function getDefaultPokemonGender(speciesId: string | number): PokemonGender {
  const genderRate = getPokemonGenderRate(speciesId)
  if (genderRate === -1) return 'genderless'
  if (genderRate === 8) return 'female'
  return 'male'
}

export function rollPokemonGender(
  speciesId: string | number,
  rng: () => number = Math.random,
): PokemonGender {
  const genderRate = getPokemonGenderRate(speciesId)
  if (genderRate === -1) return 'genderless'
  if (genderRate <= 0) return 'male'
  if (genderRate >= 8) return 'female'
  return rng() < genderRate / 8 ? 'female' : 'male'
}

export function getOwnedPokemonGender(pokemon: { gender?: unknown }): PokemonGender {
  return normalizePokemonGender(pokemon.gender) || 'male'
}

export function hasOppositeNonGenderlessGenders(
  source: { gender?: unknown },
  target: { gender?: unknown },
): boolean {
  const sourceGender = getOwnedPokemonGender(source)
  const targetGender = getOwnedPokemonGender(target)
  if (sourceGender === 'genderless' || targetGender === 'genderless') return false
  return sourceGender !== targetGender
}

export function isFemalePokemon(pokemon: { gender?: unknown }): boolean {
  return getOwnedPokemonGender(pokemon) === 'female'
}
