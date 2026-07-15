import type { AbilityAssignment, AbilityConfig } from './types'
import { POKEMON_TYPES, resolveAbilityForms } from './forms'

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
  const getPrimaryFormAbilityId = (formId: string): string | undefined => {
    return (
      formMap[formId]
        ?.filter((assignment) => !assignment.hidden)
        .sort((a, b) => (a.slot ?? 1) - (b.slot ?? 1))[0]?.id ||
      formMap[formId]?.[0]?.id
    )
  }

  const rollNaturalFormAbility = (
    formId: string,
    random: () => number = Math.random,
    options?: {
      hiddenEligible?: boolean
      hiddenChance?: number
    },
  ): string | undefined => {
    const assignments = formMap[formId] || []
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

  const isNaturalFormAbilityForForm = (formId: string, abilityId?: string | null): boolean => {
    if (!abilityId) return false
    return formMap[formId]?.some((assignment) => assignment.id === abilityId) || false
  }

  const getNaturalFormAbilityAssignment = (
    formId: string,
    abilityId?: string | null,
  ): AbilityAssignment | undefined => {
    if (!abilityId) return undefined
    return formMap[formId]?.find((assignment) => assignment.id === abilityId)
  }

  const getPrimaryMatchingVisibilityAssignment = (
    formId: string,
    hidden: boolean,
  ): AbilityAssignment | undefined => {
    return formMap[formId]
      ?.filter((assignment) => !!assignment.hidden === hidden)
      .sort((a, b) => (a.slot ?? 1) - (b.slot ?? 1))[0]
  }

  const resolveEvolvedAbility = (
    sourceFormId: string,
    sourceAbilityId: string | null | undefined,
    targetFormId: string,
    random: () => number = Math.random,
  ): string | undefined => {
    const sourceAssignment = getNaturalFormAbilityAssignment(sourceFormId, sourceAbilityId)
    if (!sourceAssignment) return rollNaturalFormAbility(targetFormId, random)

    const sourceHidden = !!sourceAssignment.hidden
    const targetAssignments = formMap[targetFormId] || []
    const matchingSlotAssignment = targetAssignments.find(
      (assignment) =>
        assignment.slot === sourceAssignment.slot && !!assignment.hidden === sourceHidden,
    )

    return (
      matchingSlotAssignment?.id ||
      getPrimaryMatchingVisibilityAssignment(targetFormId, sourceHidden)?.id ||
      rollNaturalFormAbility(targetFormId, random)
    )
  }

  return {
    getPrimaryFormAbilityId,
    rollNaturalFormAbility,
    isNaturalFormAbilityForForm,
    resolveEvolvedAbility,
  }
}
