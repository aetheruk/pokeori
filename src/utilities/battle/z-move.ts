import type { BattlePokemon } from './types'
import { calculateStatsFromBase } from '@/utilities/battle/battle-logic'
import { applyHeldItemStatModifiers } from '@/utilities/pokemon/held-items'
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
  const nextStats = applyHeldItemStatModifiers(
    calculateStatsFromBase(
      ultraForm.stats,
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

  mon.originalFormId = mon.originalFormId || mon.formId
  mon.formId = ULTRA_NECROZMA_FORM_ID
  mon.stats = nextStats
  mon.maxHp = nextStats.hp
  mon.currentHp = Math.max(1, Math.round(hpRatio * nextStats.hp))
  if (ultraForm.types) mon.types = ultraForm.types
  return true
}
