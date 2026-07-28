import type { BattlePokemon } from './types'
import { recalculateBattlePokemonStats } from '@/utilities/battle/battle-logic'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

export const Z_MOVE_DAMAGE_MULTIPLIER = 5
export const ULTRA_NECROZMA_FORM_ID = '10157'

const ULTRA_BURST_SOURCE_FORM_IDS = new Set(['10155', '10156'])

export function activateZMoveCharge(mon: BattlePokemon): boolean {
  if (mon.zMoveReady) return false
  mon.zMoveReady = true
  return true
}

export function clearZMoveCharge(mon: BattlePokemon | undefined): void {
  if (!mon) return
  mon.zMoveReady = undefined
}

export function consumeZMoveCharge(mon: BattlePokemon | undefined): boolean {
  if (!mon?.zMoveReady) return false
  mon.zMoveReady = undefined
  transformUltraNecrozmaForZMove(mon)
  return true
}

export function transformUltraNecrozmaForZMove(mon: BattlePokemon): boolean {
  if (!ULTRA_BURST_SOURCE_FORM_IDS.has(mon.formId)) return false

  const ultraForm = getPokemonForm(ULTRA_NECROZMA_FORM_ID)
  if (!ultraForm?.stats) return false

  const hpRatio = mon.maxHp > 0 ? mon.currentHp / mon.maxHp : 1
  mon.originalFormId = mon.originalFormId || mon.formId
  mon.formId = ULTRA_NECROZMA_FORM_ID
  const nextStats = recalculateBattlePokemonStats(mon)
  mon.stats = nextStats
  mon.maxHp = nextStats.hp
  mon.currentHp = Math.max(1, Math.round(hpRatio * nextStats.hp))
  if (ultraForm.types) mon.types = ultraForm.types
  return true
}
