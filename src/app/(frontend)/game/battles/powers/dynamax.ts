import { DYNAMAX_DURATION } from '@/data/powers'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { applyDynamaxHpBoost } from '@/utilities/battle/dynamax'

export const activateDynamax = (
  mon: BattlePokemon,
  dynamaxFormId?: string, // If GMAX
  state?: BattleState,
) => {
  if (mon.isDynamaxed) return false

  mon.isDynamaxed = true
  mon.dynamaxTurnsRemaining = DYNAMAX_DURATION

  if (dynamaxFormId) {
    // GMAX
    mon.originalFormId = mon.originalFormId || mon.formId
    mon.formId = dynamaxFormId
  }

  applyDynamaxHpBoost(mon)

  // Update state powers if provided?
  if (state?.powers) {
    state.powers.dynamaxActive = true
    state.powers.dynamaxTurnsRemaining = DYNAMAX_DURATION
    if (dynamaxFormId) {
      state.powers.gigantamaxFormId = dynamaxFormId
    }
  }

  return true
}
