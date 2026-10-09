import type { BattlePokemon } from './types'

export const SHADOW_SCREAM_DAMAGE_DIVISOR = 8

export function shouldShadowScream(pokemon: Pick<BattlePokemon, 'isShadow'>) {
  return Boolean(pokemon.isShadow)
}

export function applyShadowScreamDamage(
  pokemon: Pick<BattlePokemon, 'currentHp' | 'maxHp'>,
): number {
  const damage = Math.max(
    1,
    Math.ceil(pokemon.maxHp / SHADOW_SCREAM_DAMAGE_DIVISOR),
  )
  pokemon.currentHp = Math.max(0, pokemon.currentHp - damage)
  return damage
}

export function applyShadowTurnPain(
  pokemon: Pick<BattlePokemon, 'isShadow' | 'currentHp' | 'maxHp' | 'name'>,
  trainerName: string,
): string | undefined {
  if (!shouldShadowScream(pokemon) || pokemon.currentHp <= 0) return undefined

  const damage = applyShadowScreamDamage(pokemon)
  return `${trainerName}'s ${pokemon.name} screams out in pain! [icon:damage:${damage}]`
}
