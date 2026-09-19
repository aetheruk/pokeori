import type { BattlePokemon, BattleStance } from './types'
import { recalculateBattlePokemonStats } from '@/utilities/battle/battle-logic'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

export const Z_MOVE_DAMAGE_MULTIPLIER = 5
export const Z_STANCE_BASE_POWER = 250
export const MAX_STANCE_BASE_POWER = 100

export function getStanceBasePower(mon: BattlePokemon, zMoveReady = !!mon.zMoveReady): number {
  return zMoveReady ? Z_STANCE_BASE_POWER : mon.isDynamaxed ? MAX_STANCE_BASE_POWER : 50
}

export function getStanceAttackName(type: string, stance: BattleStance, mon: BattlePokemon, zMoveReady = !!mon.zMoveReady): string {
  const attack = stance === 'speed' ? 'Strike' : stance === 'power' ? 'Tackle' : 'Gambit'
  const typeName = type.replace(/\b\w/g, (letter) => letter.toUpperCase())
  return zMoveReady ? `${typeName} ${attack} Z` : mon.isDynamaxed ? `MAX ${typeName} ${attack}` : `${typeName} ${attack}`
}
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
