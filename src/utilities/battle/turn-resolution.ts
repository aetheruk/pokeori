import type { BattleStance, StanceResult } from './types'

// Battle Resolution
export function resolveStance(playerStance: BattleStance, enemyStance: BattleStance): StanceResult {
  if (playerStance === enemyStance) {
    return { result: 'tie', damageMultiplier: 1.0 }
  }

  if (
    (playerStance === 'power' && enemyStance === 'tech') ||
    (playerStance === 'speed' && enemyStance === 'power') ||
    (playerStance === 'tech' && enemyStance === 'speed')
  ) {
    return { result: 'win', damageMultiplier: 1.35 }
  }

  return { result: 'loss', damageMultiplier: 0.75 }
}
