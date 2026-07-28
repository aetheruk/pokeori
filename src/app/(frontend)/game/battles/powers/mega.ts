import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { recalculateBattlePokemonStats } from '@/utilities/battle/battle-logic'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

export const activateMegaEvolution = (
  mon: BattlePokemon,
  megaFormId: string,
  state?: BattleState,
) => {
  if (mon.isMega) return false

  const megaForm = getPokemonForm(megaFormId)
  if (!megaForm?.stats) return false

  mon.originalFormId = mon.formId
  mon.formId = megaFormId
  mon.isMega = true
  mon.megaTurnsRemaining = undefined

  // Update Stats
  const newStats = recalculateBattlePokemonStats(mon)
  const hpRatio = mon.currentHp / mon.maxHp
  mon.stats = newStats
  mon.maxHp = newStats.hp
  mon.currentHp = Math.max(1, Math.round(hpRatio * newStats.hp))

  if (megaForm.types) mon.types = megaForm.types

  if (state?.powers) {
    state.powers.megaEvolved = true
    state.powers.megaTurnsRemaining = 0
    state.powers.megaFormId = megaFormId
  }
  return true
}
