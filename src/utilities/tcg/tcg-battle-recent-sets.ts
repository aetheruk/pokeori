import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'
import { infer30thCelebrationTcgBattleAttackEffect } from './tcg-battle-30th-celebration'
import { inferPhantasmalFlamesTcgBattleAttackEffect } from './tcg-battle-phantasmal-flames'
import { inferAscendedHeroesTcgBattleAttackEffect } from './tcg-battle-ascended-heroes'
import { inferPerfectOrderTcgBattleAttackEffect } from './tcg-battle-perfect-order'
import { inferChaosRisingTcgBattleAttackEffect } from './tcg-battle-chaos-rising'
import { inferPitchBlackTcgBattleAttackEffect } from './tcg-battle-pitch-black'

export function inferRecentTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  if (setId === 'me2') return inferPhantasmalFlamesTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me2pt5') return inferAscendedHeroesTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me3') return inferPerfectOrderTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me4') return inferChaosRisingTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me5') return inferPitchBlackTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me55' || setId === 'me55c') {
    return infer30thCelebrationTcgBattleAttackEffect(attack, baseDamage, setId)
  }
  return null
}
