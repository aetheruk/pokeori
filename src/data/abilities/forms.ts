import pokemonData from '../pokemon-data'
import type { AbilityConfig } from './types'

export const POKEMON_TYPES = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Steel',
  'Dark',
  'Fairy',
] as const

export type PokemonType = (typeof POKEMON_TYPES)[number]

function formsByType(type: PokemonType): readonly string[] {
  return pokemonData.flatMap((species) =>
    species.forms.filter((form) => form.types.includes(type)).map((form) => form.id),
  )
}

export const TypeNormal = formsByType('Normal')
export const TypeFire = formsByType('Fire')
export const TypeWater = formsByType('Water')
export const TypeElectric = formsByType('Electric')
export const TypeGrass = formsByType('Grass')
export const TypeIce = formsByType('Ice')
export const TypeFighting = formsByType('Fighting')
export const TypePoison = formsByType('Poison')
export const TypeGround = formsByType('Ground')
export const TypeFlying = formsByType('Flying')
export const TypePsychic = formsByType('Psychic')
export const TypeBug = formsByType('Bug')
export const TypeRock = formsByType('Rock')
export const TypeGhost = formsByType('Ghost')
export const TypeDragon = formsByType('Dragon')
export const TypeSteel = formsByType('Steel')
export const TypeDark = formsByType('Dark')
export const TypeFairy = formsByType('Fairy')

export const FORMS_BY_TYPE: Record<PokemonType, readonly string[]> = {
  Normal: TypeNormal,
  Fire: TypeFire,
  Water: TypeWater,
  Electric: TypeElectric,
  Grass: TypeGrass,
  Ice: TypeIce,
  Fighting: TypeFighting,
  Poison: TypePoison,
  Ground: TypeGround,
  Flying: TypeFlying,
  Psychic: TypePsychic,
  Bug: TypeBug,
  Rock: TypeRock,
  Ghost: TypeGhost,
  Dragon: TypeDragon,
  Steel: TypeSteel,
  Dark: TypeDark,
  Fairy: TypeFairy,
}

function flattenForms(forms: readonly (string | readonly string[])[] = []): string[] {
  return forms.flatMap((entry) => (Array.isArray(entry) ? entry : [entry]))
}

export function resolveAbilityForms(
  ability: Pick<AbilityConfig, 'forms' | 'naturalAssignments'>,
): string[] {
  const forms = [
    ...flattenForms(ability.forms),
    ...(ability.naturalAssignments || []).flatMap((assignment) =>
      flattenForms(assignment.forms),
    ),
  ]
  return [...new Set(forms)]
}
