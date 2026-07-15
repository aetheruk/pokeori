import { DYNAMAX_HP_MULTIPLIER } from '@/data/powers'
import type { BattlePokemon } from './types'

export function applyDynamaxHpBoost(pokemon: BattlePokemon): void {
  if (pokemon.dynamaxOriginalMaxHp === undefined) {
    pokemon.dynamaxOriginalMaxHp = pokemon.maxHp
  }

  pokemon.maxHp = Math.max(1, Math.floor(pokemon.dynamaxOriginalMaxHp * DYNAMAX_HP_MULTIPLIER))
  pokemon.currentHp =
    pokemon.currentHp <= 0
      ? 0
      : Math.max(1, Math.min(pokemon.maxHp, Math.floor(pokemon.currentHp * DYNAMAX_HP_MULTIPLIER)))
}

export function revertDynamaxHpBoost(pokemon: BattlePokemon): void {
  const originalMaxHp =
    pokemon.dynamaxOriginalMaxHp ?? Math.max(1, Math.round(pokemon.maxHp / DYNAMAX_HP_MULTIPLIER))
  const boostedMaxHp = Math.max(1, pokemon.maxHp)
  const hpRatio = pokemon.currentHp / boostedMaxHp

  pokemon.maxHp = originalMaxHp
  pokemon.currentHp =
    pokemon.currentHp <= 0
      ? 0
      : Math.max(1, Math.min(originalMaxHp, Math.round(originalMaxHp * hpRatio)))
  pokemon.dynamaxOriginalMaxHp = undefined
}

export function clearDynamaxState(pokemon: BattlePokemon): void {
  const wasDynamaxed = pokemon.isDynamaxed || pokemon.dynamaxOriginalMaxHp !== undefined

  if (wasDynamaxed) {
    revertDynamaxHpBoost(pokemon)
  }

  pokemon.isDynamaxed = false
  pokemon.dynamaxTurnsRemaining = undefined
  if (wasDynamaxed && pokemon.originalFormId) {
    pokemon.formId = pokemon.originalFormId
    pokemon.originalFormId = undefined
  }
}
