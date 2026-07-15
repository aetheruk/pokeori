import type { BattlePokemon } from './types'

export const SHADOW_SCREAM_CHANCE = 0.2
export const SHADOW_SCREAM_DAMAGE_DIVISOR = 8

export function shouldShadowScream(
  pokemon: Pick<BattlePokemon, 'isShadow'>,
  random: () => number = Math.random,
): boolean {
  return Boolean(pokemon.isShadow) && random() < SHADOW_SCREAM_CHANCE
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
