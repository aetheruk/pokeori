import type { AbilityAssignment, AbilityConfig } from './abilities/types'
import { CANONICAL_ABILITIES } from './abilities/canonical-generated'
import {
  ABILITY_GLOBAL_MAP,
  ABILITY_TYPE_MAP,
  buildAbilityFormMap,
  createAbilityFormResolvers,
} from './abilities/derived'
import { resolveAbilityEffects } from './abilities/effects'

export type {
  AbilityAssignment,
  AbilityConfig,
  AbilityCriteria,
  AbilityEffect,
  AbilityEffectCondition,
} from './abilities/types'
export { ABILITY_GLOBAL_MAP, ABILITY_TYPE_MAP } from './abilities/derived'
export { resolveAbilityEffects, getDefaultAbilityEffects } from './abilities/effects'
export {
  FORMS_BY_TYPE,
  POKEMON_TYPES,
  TypeBug,
  TypeDark,
  TypeDragon,
  TypeElectric,
  TypeFairy,
  TypeFighting,
  TypeFire,
  TypeFlying,
  TypeGhost,
  TypeGrass,
  TypeGround,
  TypeIce,
  TypeNormal,
  TypePoison,
  TypePsychic,
  TypeRock,
  TypeSteel,
  TypeWater,
  resolveAbilityForms,
} from './abilities/forms'

const ALL_ABILITIES: AbilityConfig[] = [...CANONICAL_ABILITIES]

export const ABILITIES: Record<string, AbilityConfig> = Object.fromEntries(
  ALL_ABILITIES.map((ability) => [
    ability.id,
    { ...ability, effects: resolveAbilityEffects(ability) },
  ]),
)

export const ABILITY_FORM_MAP: Record<string, AbilityAssignment[]> = buildAbilityFormMap(ABILITIES)

export const {
  getPrimaryFormAbilityId,
  rollNaturalFormAbility,
  isNaturalFormAbilityForForm,
  resolveEvolvedAbility,
} = createAbilityFormResolvers(ABILITY_FORM_MAP)
