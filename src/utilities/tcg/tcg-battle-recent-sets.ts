import type { TcgCardAttack } from '@/data/tcg/types'
import type { TcgBattleAttackEffect } from './tcg-battle'
import { inferPhantasmalFlamesTcgBattleAttackEffect } from './tcg-battle-phantasmal-flames'
import { inferAscendedHeroesTcgBattleAttackEffect } from './tcg-battle-ascended-heroes'
import { inferPerfectOrderTcgBattleAttackEffect } from './tcg-battle-perfect-order'
import { inferChaosRisingTcgBattleAttackEffect } from './tcg-battle-chaos-rising'

export function inferRecentTcgBattleAttackEffect(
  attack: TcgCardAttack,
  baseDamage: number,
  setId?: string,
): TcgBattleAttackEffect | null {
  if (setId === 'me2') return inferPhantasmalFlamesTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me2pt5') return inferAscendedHeroesTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me3') return inferPerfectOrderTcgBattleAttackEffect(attack, baseDamage)
  if (setId === 'me4') return inferChaosRisingTcgBattleAttackEffect(attack, baseDamage)
  return null
}
