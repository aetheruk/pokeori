import type { BattlePokemon } from '@/utilities/battle/types'

export const applyStartTurnHealing = (pokemon: BattlePokemon) => {
  if (!pokemon.status) return ''
  let healAmount = 0
  let healMsg = ''

  if (pokemon.status.id === 'regen') {
    healAmount = Math.floor(pokemon.maxHp / 8)
    if (healAmount < 1) healAmount = 1
    healMsg = `${pokemon.name} restored HP due to Regeneration!`
  } else if (pokemon.status.id === 'mystic-veil') {
    healAmount = Math.floor(pokemon.maxHp / 16)
    if (healAmount < 1) healAmount = 1
    healMsg = `${pokemon.name} restored HP due to Mystic Veil!`
  }

  if (healAmount > 0) {
    const oldHp = pokemon.currentHp
    pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healAmount)
    if (pokemon.currentHp > oldHp) {
      return `\n${healMsg}`
    }
  }
  return ''
}
