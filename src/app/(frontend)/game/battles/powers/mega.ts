import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { calculateStatsFromBase } from '@/utilities/battle/battle-logic'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { applyHeldItemStatModifiers } from '@/utilities/pokemon/held-items'

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
  const newStats = applyHeldItemStatModifiers(
    calculateStatsFromBase(
      megaForm.stats,
      mon.level,
      {
        hp: mon.ivs?.hp ?? 15,
        attack: mon.ivs?.attack ?? 15,
        defense: mon.ivs?.defense ?? 15,
        specialAttack: mon.ivs?.specialAttack ?? 15,
        specialDefense: mon.ivs?.specialDefense ?? 15,
        speed: mon.ivs?.speed ?? 15,
      },
      {
        hp: mon.evs?.hp ?? 0,
        attack: mon.evs?.attack ?? 0,
        defense: mon.evs?.defense ?? 0,
        specialAttack: mon.evs?.specialAttack ?? 0,
        specialDefense: mon.evs?.specialDefense ?? 0,
        speed: mon.evs?.speed ?? 0,
      },
    ),
    mon.heldItem?.id || mon.heldItemId,
  )
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
