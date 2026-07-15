import type { Item } from '@/data/items/types'
import type { Pokemon } from '@/payload-types'

export type PokemonFusionConfig = NonNullable<
  NonNullable<Item['effects']>['fusePokemon']
>
export type PokemonFusionOption = PokemonFusionConfig['fusions'][number]

export type PokemonFusionTarget = Pick<
  Pokemon,
  | 'id'
  | 'formId'
  | 'fusionItemId'
  | 'fusionBaseFormId'
  | 'fusedWithPokemonId'
  | 'fusedIntoPokemonId'
  | 'onBattleTeam'
  | 'isCompanion'
  | 'identified'
> & {
  user?: Pokemon['user']
}

export function getFusionOptionForPartnerForm(
  config: PokemonFusionConfig,
  partnerFormId: string | null | undefined,
): PokemonFusionOption | null {
  if (!partnerFormId) return null
  return (
    config.fusions.find((fusion) => fusion.partnerFormId === partnerFormId) ||
    null
  )
}

export function getFusionOptionForFusedForm(
  config: PokemonFusionConfig,
  fusedFormId: string | null | undefined,
): PokemonFusionOption | null {
  if (!fusedFormId) return null
  return (
    config.fusions.find((fusion) => fusion.fusedFormId === fusedFormId) || null
  )
}

export function canPokemonUseFusionItem(
  item: Item,
  pokemon: Partial<Omit<PokemonFusionTarget, 'formId'>> & {
    formId?: string | null
  },
): boolean {
  const config = item.effects?.fusePokemon
  if (!config) return false
  if (pokemon.fusedIntoPokemonId) return false
  if (pokemon.formId === config.baseFormId && !pokemon.fusedWithPokemonId)
    return true
  return Boolean(
    pokemon.fusionItemId === item.id &&
      pokemon.fusedWithPokemonId &&
      pokemon.fusionBaseFormId === config.baseFormId &&
      getFusionOptionForFusedForm(config, pokemon.formId),
  )
}

export function isValidFusionPartner(
  config: PokemonFusionConfig,
  basePokemon: PokemonFusionTarget,
  partnerPokemon: PokemonFusionTarget,
): boolean {
  if (basePokemon.id === partnerPokemon.id) return false
  if (basePokemon.formId !== config.baseFormId) return false
  if (basePokemon.fusedWithPokemonId || basePokemon.fusedIntoPokemonId)
    return false
  if (partnerPokemon.fusedWithPokemonId || partnerPokemon.fusedIntoPokemonId)
    return false
  if (partnerPokemon.onBattleTeam || partnerPokemon.isCompanion) return false
  if (partnerPokemon.identified === false) return false
  return Boolean(getFusionOptionForPartnerForm(config, partnerPokemon.formId))
}
