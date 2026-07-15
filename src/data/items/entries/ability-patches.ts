import { Item } from '../types'
import { ABILITIES, type AbilityConfig, resolveAbilityForms } from '../../abilities'

function getAbilityPatchId(abilityId: string): string {
  return `${abilityId.replace(/_/g, '-')}-ability-patch`
}

function getUsableByForms(ability: AbilityConfig): string[] | undefined {
  const forms = resolveAbilityForms(ability)
  return forms.length ? forms : undefined
}

function getItemEffects(ability: AbilityConfig) {
  const usableByForms = getUsableByForms(ability)
  if (usableByForms) {
    return {
      teachAbility: ability.id,
      usableByForms,
    }
  }

  return {
    teachAbility: ability.id,
  }
}

export const abilityPatchItems: Item[] = Object.entries(ABILITIES)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([abilityId, ability]) => ({
    id: getAbilityPatchId(abilityId),
    name: `${ability.name} Ability Patch`,
    description: `Teaches the ${ability.name} ability to a Pokemon.`,
    category: 'ability-patch',
    spriteId: 'ability-patch',
    effects: getItemEffects(ability),
  }))
