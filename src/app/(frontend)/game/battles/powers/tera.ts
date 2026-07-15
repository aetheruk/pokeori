import type { BattlePokemon } from '@/utilities/battle/types'
import { activateTeraOnPokemon } from '@/utilities/battle/tera'

export const activateTera = (mon: BattlePokemon, currentTurn?: number) => {
  return activateTeraOnPokemon(mon, currentTurn)
}
