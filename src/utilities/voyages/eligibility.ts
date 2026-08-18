import type { VoyageCriteria } from '@/data/voyages/types'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'

export function isVoyagePokemonEligible(
  pokemon: {
    speciesId: number
    formId?: string | null
    level?: number | null
  },
  criteria: VoyageCriteria,
): boolean {
  if (
    criteria.allowedSpeciesIds?.length &&
    !criteria.allowedSpeciesIds.includes(pokemon.speciesId)
  ) {
    return false
  }
  if (
    criteria.allowedFormIds?.length &&
    (!pokemon.formId || !criteria.allowedFormIds.includes(pokemon.formId))
  ) {
    return false
  }
  if (criteria.allowedTypes?.length) {
    const formData =
      (pokemon.formId
        ? getPokemonForm(pokemon.formId)
        : null) || getPokemonSpecies(pokemon.speciesId)
    const types = formData?.types || []
    const normalizedTypes = types.map((type) => type.toLowerCase())
    if (
      !criteria.allowedTypes.some((type) =>
        normalizedTypes.includes(type.toLowerCase()),
      )
    ) {
      return false
    }
  }
  const level = pokemon.level || 1
  if (criteria.minLevel && level < criteria.minLevel) return false
  return true
}
