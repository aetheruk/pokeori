import type { PokemonTypeName } from '@/data/items/types'
import type { SpiritChannelerRequirement } from '@/data/spirit-channeling'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

export type { SpiritChannelerRequirement } from '@/data/spirit-channeling'

export interface SpiritChannelerCandidate {
  formId: string
  level?: number | null
}

function formatPokemonType(type: PokemonTypeName): string {
  return `${type[0].toUpperCase()}${type.slice(1)}`
}

export function getSpiritChannelerRequirementLabel(
  requirement: SpiritChannelerRequirement,
): string {
  const formName = requirement.channelerFormId
    ? getPokemonForm(requirement.channelerFormId)?.name ||
      `form ${requirement.channelerFormId}`
    : null
  const identityRequirement = formName
    ? formName
    : requirement.channelerType
      ? `${formatPokemonType(requirement.channelerType)}-type Pokémon`
      : 'Any Pokémon'

  return `${identityRequirement} · Level ${requirement.channelerMinLevel}+`
}

export function getSpiritChannelerIneligibilityReason(
  pokemon: SpiritChannelerCandidate | null | undefined,
  requirement: SpiritChannelerRequirement,
): string | null {
  if (!pokemon) return 'Choose a Pokémon to channel this memory.'

  const form = getPokemonForm(pokemon.formId)
  if (
    requirement.channelerFormId &&
    pokemon.formId !== requirement.channelerFormId
  ) {
    const formName =
      getPokemonForm(requirement.channelerFormId)?.name ||
      `form ${requirement.channelerFormId}`
    return `This memory needs ${formName} at level ${requirement.channelerMinLevel} or higher.`
  }

  if (
    requirement.channelerType &&
    !form?.types?.some(
      (type) => type.toLowerCase() === requirement.channelerType,
    )
  ) {
    return `This memory needs a ${formatPokemonType(requirement.channelerType)}-type Pokémon at level ${requirement.channelerMinLevel} or higher.`
  }

  if (Number(pokemon.level || 0) < requirement.channelerMinLevel) {
    return `This memory needs a channeler at level ${requirement.channelerMinLevel} or higher.`
  }

  return null
}

export function canPokemonSpiritChannel(
  pokemon: SpiritChannelerCandidate | null | undefined,
  requirement: SpiritChannelerRequirement,
): boolean {
  return getSpiritChannelerIneligibilityReason(pokemon, requirement) === null
}
