import type { PokemonTypeName } from '@/data/items/types'
import type { SpiritChannelingConfig } from '@/data/spirit-channeling'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

export type SpiritChannelerRequirement = Pick<
  SpiritChannelingConfig,
  'channelerMinLevel' | 'channelerType' | 'channelerFormId'
>

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
  const identityRequirements = [
    formName,
    requirement.channelerType
      ? `${formatPokemonType(requirement.channelerType)}-type Pokemon`
      : null,
  ].filter((value): value is string => Boolean(value))
  const identityRequirement =
    identityRequirements.length > 0
      ? identityRequirements.join(' and ')
      : 'Any Pokemon'

  return `${identityRequirement}, level ${requirement.channelerMinLevel}+`
}

export function getSpiritChannelerIneligibilityReason(
  pokemon: SpiritChannelerCandidate | null | undefined,
  requirement: SpiritChannelerRequirement,
): string | null {
  if (!pokemon) return 'Choose a Pokemon to channel the memory.'

  const form = getPokemonForm(pokemon.formId)
  if (
    requirement.channelerFormId &&
    pokemon.formId !== requirement.channelerFormId
  ) {
    const formName =
      getPokemonForm(requirement.channelerFormId)?.name ||
      `form ${requirement.channelerFormId}`
    return `This channeling requires ${formName}.`
  }

  if (
    requirement.channelerType &&
    !form?.types?.some(
      (type) => type.toLowerCase() === requirement.channelerType,
    )
  ) {
    return `This channeling requires a ${formatPokemonType(requirement.channelerType)}-type Pokemon.`
  }

  if (Number(pokemon.level || 0) < requirement.channelerMinLevel) {
    return `This channeling requires a level ${requirement.channelerMinLevel}+ Pokemon.`
  }

  return null
}

export function canPokemonSpiritChannel(
  pokemon: SpiritChannelerCandidate | null | undefined,
  requirement: SpiritChannelerRequirement,
): boolean {
  return getSpiritChannelerIneligibilityReason(pokemon, requirement) === null
}
