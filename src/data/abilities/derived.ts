import type { AbilityAssignment, AbilityConfig } from './types'
import { POKEMON_TYPES, resolveAbilityForms } from './forms'
import type { PokemonGender, PokemonSex } from '../pokemon/types'

export const ABILITY_TYPE_MAP: Record<string, AbilityAssignment[]> = Object.fromEntries(
  POKEMON_TYPES.map((type) => [type, []]),
)

export const ABILITY_GLOBAL_MAP: AbilityAssignment[] = []

export function buildAbilityFormMap(
  abilities: Record<string, AbilityConfig>,
): Record<string, AbilityAssignment[]> {
  const map: Record<string, AbilityAssignment[]> = {}

  for (const [abilityId, ability] of Object.entries(abilities)) {
    if (ability.naturalAssignments?.length) {
      for (const naturalAssignment of ability.naturalAssignments) {
        for (const formId of resolveAbilityForms({ forms: naturalAssignment.forms })) {
          if (!map[formId]) {
            map[formId] = []
          }
          map[formId].push({
            id: abilityId,
            rate: naturalAssignment.chance,
            hidden: naturalAssignment.hidden,
            slot: naturalAssignment.slot,
            gender: naturalAssignment.gender,
          })
        }
      }
      continue
    }

    if (typeof ability.naturalChance !== 'number') continue

    for (const formId of resolveAbilityForms(ability)) {
      if (!map[formId]) {
        map[formId] = []
      }
      map[formId].push({ id: abilityId, rate: ability.naturalChance })
    }
  }

  return map
}

export function createAbilityFormResolvers(formMap: Record<string, AbilityAssignment[]>) {
  const getAssignmentsForGender = (
    formId: string,
    gender?: PokemonGender | null,
  ): AbilityAssignment[] => {
    const assignments = formMap[formId] || []
    if (!assignments.some((assignment) => assignment.gender)) return assignments

    // Older records and authored opponents without a gender retain the male
    // default used before gender-specific ability data was represented.
    const selectedGender: PokemonSex = gender === 'female' ? 'female' : 'male'
    return assignments.filter(
      (assignment) => !assignment.gender || assignment.gender === selectedGender,
    )
  }

  const getPrimaryFormAbilityId = (
    formId: string,
    gender?: PokemonGender | null,
  ): string | undefined => {
    const assignments = getAssignmentsForGender(formId, gender)
    return (
      assignments
        .filter((assignment) => !assignment.hidden)
        .sort((a, b) => (a.slot ?? 1) - (b.slot ?? 1))[0]?.id ||
      assignments[0]?.id
    )
  }

  const rollNaturalFormAbility = (
    formId: string,
    random: () => number = Math.random,
    options?: {
      hiddenEligible?: boolean
      hiddenChance?: number
      gender?: PokemonGender | null
    },
  ): string | undefined => {
    const assignments = getAssignmentsForGender(formId, options?.gender)
    const orderedAssignments = [
      ...assignments.filter((assignment) => assignment.hidden),
      ...assignments
        .filter((assignment) => !assignment.hidden)
        .sort((a, b) => (a.slot ?? 1) - (b.slot ?? 1)),
    ]
    for (const assignment of orderedAssignments) {
      if (assignment.hidden && options?.hiddenEligible === false) continue
      const rate =
        assignment.hidden && typeof options?.hiddenChance === 'number'
          ? options.hiddenChance
          : assignment.rate
      if (random() < rate / 100) return assignment.id
    }
    return undefined
  }

  const isNaturalFormAbilityForForm = (
    formId: string,
    abilityId?: string | null,
    gender?: PokemonGender | null,
  ): boolean => {
    if (!abilityId) return false
    return getAssignmentsForGender(formId, gender).some(
      (assignment) => assignment.id === abilityId,
    )
  }

  const isGenderCompatibleFormAbility = (
    formId: string,
    abilityId: string | null | undefined,
    gender?: PokemonGender | null,
  ): boolean => {
    if (!abilityId) return false
    const assignments = (formMap[formId] || []).filter(
      (assignment) => assignment.id === abilityId,
    )
    if (assignments.length === 0) return true
    const selectedGender: PokemonSex = gender === 'female' ? 'female' : 'male'
    return assignments.some(
      (assignment) => !assignment.gender || assignment.gender === selectedGender,
    )
  }

  const resolveGenderCompatibleFormAbility = (
    formId: string,
    abilityId: string | null | undefined,
    gender?: PokemonGender | null,
  ): string | undefined => {
    if (!abilityId) return undefined
    const assignments = (formMap[formId] || []).filter(
      (assignment) => assignment.id === abilityId,
    )
    if (assignments.length === 0) return undefined

    const selectedGender: PokemonSex = gender === 'female' ? 'female' : 'male'
    if (
      assignments.some(
        (assignment) => !assignment.gender || assignment.gender === selectedGender,
      )
    ) {
      return undefined
    }

    const incompatibleAssignment = assignments[0]
    return getAssignmentsForGender(formId, gender).find(
      (assignment) =>
        assignment.slot === incompatibleAssignment.slot &&
        !!assignment.hidden === !!incompatibleAssignment.hidden,
    )?.id
  }

  const getNaturalFormAbilityAssignment = (
    formId: string,
    abilityId?: string | null,
    gender?: PokemonGender | null,
  ): AbilityAssignment | undefined => {
    if (!abilityId) return undefined
    return getAssignmentsForGender(formId, gender).find(
      (assignment) => assignment.id === abilityId,
    )
  }

  const getPrimaryMatchingVisibilityAssignment = (
    formId: string,
    hidden: boolean,
    gender?: PokemonGender | null,
  ): AbilityAssignment | undefined => {
    return getAssignmentsForGender(formId, gender)
      ?.filter((assignment) => !!assignment.hidden === hidden)
      .sort((a, b) => (a.slot ?? 1) - (b.slot ?? 1))[0]
  }

  const resolveEvolvedAbility = (
    sourceFormId: string,
    sourceAbilityId: string | null | undefined,
    targetFormId: string,
    random: () => number = Math.random,
    hiddenEligible = false,
    gender?: PokemonGender | null,
  ): string | undefined => {
    // Retain the source slot when a previously saved Pokemon has an ability
    // that became gender-incompatible after gender-specific data was added.
    const sourceAssignment =
      getNaturalFormAbilityAssignment(sourceFormId, sourceAbilityId, gender) ||
      (sourceAbilityId
        ? (formMap[sourceFormId] || []).find(
            (assignment) => assignment.id === sourceAbilityId,
          )
        : undefined)
    if (!sourceAssignment) {
      return rollNaturalFormAbility(targetFormId, random, { hiddenEligible, gender })
    }

    const sourceHidden = !!sourceAssignment.hidden
    const targetAssignments = getAssignmentsForGender(targetFormId, gender)
    const matchingSlotAssignment = targetAssignments.find(
      (assignment) =>
        assignment.slot === sourceAssignment.slot && !!assignment.hidden === sourceHidden,
    )

    return (
      matchingSlotAssignment?.id ||
      getPrimaryMatchingVisibilityAssignment(targetFormId, sourceHidden, gender)?.id ||
      rollNaturalFormAbility(targetFormId, random, { hiddenEligible, gender })
    )
  }

  return {
    getPrimaryFormAbilityId,
    rollNaturalFormAbility,
    isNaturalFormAbilityForForm,
    isGenderCompatibleFormAbility,
    resolveGenderCompatibleFormAbility,
    resolveEvolvedAbility,
  }
}
