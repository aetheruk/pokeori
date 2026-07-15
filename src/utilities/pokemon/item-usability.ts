import type { Item } from '@/data/items/types'
import { ABILITIES } from '@/data/abilities'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import {
  getItemSkillLockReason,
  type SkillDataMap,
} from '@/utilities/skills/unlocks'
import { canPokemonUseFusionItem } from '@/utilities/pokemon/fusion'

type PokemonStatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

const POKEMON_STAT_LABELS: Record<PokemonStatName, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Sp. Atk',
  specialDefense: 'Sp. Def',
  speed: 'Speed',
}

export type PokemonItemUseTarget = {
  speciesId?: number | null
  formId?: string | null
  level?: number | null
  evs?: Partial<
    Record<
      | 'hp'
      | 'attack'
      | 'defense'
      | 'specialAttack'
      | 'specialDefense'
      | 'speed',
      number | null
    >
  > | null
  ivs?: Partial<
    Record<
      | 'hp'
      | 'attack'
      | 'defense'
      | 'specialAttack'
      | 'specialDefense'
      | 'speed',
      number | null
    >
  > | null
  nature?: string | null
  friendship?: number | null
  ability?: string | null
  teraType?: string | null
  fusionItemId?: string | null
  fusionBaseFormId?: string | null
  fusedWithPokemonId?: string | null
  fusedIntoPokemonId?: string | null
}

export function isPokemonTargetedInventoryItem(item: Item): boolean {
  return (
    item.category === 'vitamin' ||
    item.category === 'candy' ||
    item.category === 'ability-patch' ||
    !!item.effects?.changeForm ||
    !!item.effects?.fusePokemon ||
    !!item.effects?.setTeraType ||
    !!(
      item.effects?.grantPokemonResearchXp &&
      !item.effects.grantPokemonResearchXp.formId
    )
  )
}

function formatAmount(amount: number): string {
  return amount >= 0 ? `+ ${amount}` : `- ${Math.abs(amount)}`
}

function formatRangeAmount(
  amount: number | { min: number; max: number },
): string {
  if (typeof amount === 'number') return formatAmount(amount)
  if (amount.min === amount.max) return formatAmount(amount.min)
  return `+ ${amount.min}-${amount.max}`
}

function formatNatureLabel(nature: string): string {
  return nature
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function getPokemonItemEffectLabel(item: Item): string {
  const effects = item.effects
  if (!effects) return 'Pokemon effect'

  if (effects.increaseLevel) {
    return `Level +${effects.increaseLevel}`
  }

  if (effects.increaseEv) {
    return `${POKEMON_STAT_LABELS[effects.increaseEv.stat]} EV ${formatAmount(
      effects.increaseEv.amount,
    )}`
  }

  if (effects.decreaseEv) {
    return `${POKEMON_STAT_LABELS[effects.decreaseEv.stat]} EV - ${effects.decreaseEv.amount}`
  }

  if (effects.changeNature) {
    return `${formatNatureLabel(effects.changeNature)} Nature`
  }

  if (effects.changeForm) {
    return effects.changeForm.label || 'Change Form'
  }

  if (effects.fusePokemon) {
    return effects.fusePokemon.label || 'Fuse Pokemon'
  }

  if (effects.setTeraType) {
    return `${formatNatureLabel(effects.setTeraType)} Tera Type`
  }

  if (effects.maximizeIv) {
    return 'All IVs to 31'
  }

  if (effects.maximizeOneIv) {
    return 'Choose IV to 31'
  }

  if (effects.increaseFriendship) {
    return `Friendship ${formatAmount(effects.increaseFriendship)}`
  }

  if (effects.teachAbility) {
    return 'New Ability'
  }

  if (
    effects.grantPokemonResearchXp &&
    !effects.grantPokemonResearchXp.formId
  ) {
    return `Research XP ${formatRangeAmount(effects.grantPokemonResearchXp.amount)}`
  }

  return 'Pokemon effect'
}

export function getPokemonItemUnavailableReason(
  item: Item,
  pokemon: PokemonItemUseTarget,
  skills?: SkillDataMap | null,
): string | null {
  if (!isPokemonTargetedInventoryItem(item)) {
    return `${item.name} cannot be used on Pokemon.`
  }

  const skillLockReason = getItemSkillLockReason(item, skills)
  if (skillLockReason) return skillLockReason

  const effects = item.effects
  if (!effects) return `${item.name} has no Pokemon effect.`

  const level = Math.max(1, Math.floor(pokemon.level || 1))

  if (effects.increaseLevel) {
    if (level >= 100) return 'Pokemon is already at max level.'
    if (effects.minLevel !== undefined && level < effects.minLevel) {
      return `This candy can only be used from level ${effects.minLevel}.`
    }
    if (effects.maxLevel !== undefined && level > effects.maxLevel) {
      return `This candy can only be used up to level ${effects.maxLevel}.`
    }
  }

  if (effects.increaseEv) {
    const stat = effects.increaseEv.stat
    const currentEv = pokemon.evs?.[stat] || 0
    const totalEvs = Object.values(pokemon.evs || {}).reduce<number>(
      (total, value) => total + (value || 0),
      0,
    )

    if (currentEv >= 255) return `${stat} is already maxed out.`
    if (totalEvs >= 510) return 'Total EVs are already maxed out.'
  }

  if (effects.decreaseEv) {
    const stat = effects.decreaseEv.stat
    if ((pokemon.evs?.[stat] || 0) <= 0) return `${stat} EVs are already at 0.`
  }

  if (effects.changeNature && pokemon.nature === effects.changeNature) {
    return `This Pokemon is already ${effects.changeNature}.`
  }

  if (effects.changeForm) {
    const formId = pokemon.formId || ''
    if (
      !effects.changeForm.transitions.some(
        (transition) => transition.fromFormId === formId,
      )
    ) {
      return 'This item cannot be used on this Pokemon.'
    }
  }

  if (effects.fusePokemon && !canPokemonUseFusionItem(item, pokemon)) {
    return 'This item cannot be used on this Pokemon.'
  }

  if (effects.setTeraType && pokemon.teraType === effects.setTeraType) {
    return `This Pokemon already has ${effects.setTeraType} Tera type.`
  }

  if (effects.maximizeIv) {
    const ivs = Object.values(pokemon.ivs || {})
    if (ivs.length > 0 && ivs.every((iv) => iv === 31)) {
      return 'All IVs are already maximized.'
    }
  }

  if (effects.maximizeOneIv) {
    const ivs = Object.values(pokemon.ivs || {})
    if (ivs.length > 0 && ivs.every((iv) => iv === 31)) {
      return 'All IVs are already maximized.'
    }
  }

  if (effects.increaseFriendship && (pokemon.friendship || 0) >= 255) {
    return 'Pokemon is already at max friendship.'
  }

  if (effects.teachAbility) {
    if (pokemon.ability === effects.teachAbility) {
      return `${item.name} is already applied to this Pokemon.`
    }
    if (pokemon.ability && ABILITIES[pokemon.ability]?.locked) {
      return `${ABILITIES[pokemon.ability].name} cannot be overwritten.`
    }

    const formId = pokemon.formId || ''
    const speciesId = pokemon.speciesId || 0
    const speciesData = getPokemonForm(formId) || getPokemonSpecies(speciesId)

    if (
      effects.usableByForms?.length &&
      !effects.usableByForms.includes(formId)
    ) {
      return 'This item cannot be used on this Pokemon.'
    }

    if (effects.usableByTypes?.length) {
      const hasAllowedType = speciesData?.types?.some((type) =>
        effects.usableByTypes?.includes(type.toLowerCase() as any),
      )
      if (!hasAllowedType) return 'This item cannot be used on this Pokemon.'
    }
  }

  if (
    effects.grantPokemonResearchXp &&
    !effects.grantPokemonResearchXp.formId
  ) {
    const formInfo = getPokemonForm(pokemon.formId || '')
    if (formInfo?.is_legendary || formInfo?.is_mythical) {
      return `${item.name} cannot be used on Legendary or Mythical Pokemon.`
    }

    const requiredLevel = effects.grantPokemonResearchXp.minSkillLevel
    if (requiredLevel) {
      const researcherLevel = skills?.researching?.level || 1
      if (researcherLevel < requiredLevel) {
        return `Researcher Level ${requiredLevel} required to use this item.`
      }
    }
  }

  return null
}
