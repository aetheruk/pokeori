import type { MoveStance } from '@/data/moves/types'
import { getStatStageMultiplier } from './battle-logic'

interface OffensiveStats {
  attack: number
  speed: number
  specialAttack: number
}

interface OffensiveStatStages {
  attack?: number
  speed?: number
  specialAttack?: number
}

function effectiveStat(
  value: number,
  stage: number | undefined,
  damageMultiplier: number,
): number {
  return Math.max(
    0,
    Math.floor(value * getStatStageMultiplier(stage || 0) * damageMultiplier),
  )
}

export function getMoveEffectivePower(
  move: { stance: MoveStance; damage: number },
  stats: OffensiveStats,
  statStages?: OffensiveStatStages,
): string {
  if (move.damage <= 0) return 'Status'

  const powers = {
    power: effectiveStat(stats.attack, statStages?.attack, move.damage),
    speed: effectiveStat(stats.speed, statStages?.speed, move.damage),
    tech: effectiveStat(
      stats.specialAttack,
      statStages?.specialAttack,
      move.damage,
    ),
  }

  if (move.stance !== 'random') return String(powers[move.stance])

  const values = Object.values(powers)
  const min = Math.min(...values)
  const max = Math.max(...values)
  return min === max ? String(min) : `${min}–${max}`
}
