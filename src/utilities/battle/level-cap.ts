import type { BattleConfig } from '@/data/types'

/**
 * Ordinary battles give the player a small level advantage over the opposing
 * roster. Formal encounters can still provide an authored `levelCap` when
 * they need a tighter sync.
 */
export const TRAINER_BATTLE_LEVEL_ADVANTAGE = 5
export const WILD_BATTLE_LEVEL_ADVANTAGE = 10

export interface ResolveBattleLevelCapOptions {
  authoredLevelCap?: number | null
  badgeLevelCap?: number | null
  enemyLevels: number[]
  isWildBattle?: boolean
}

/**
 * Resolve the effective combat level used for player-side stat syncing.
 *
 * An authored cap remains an explicit override for gyms, bosses, PVP and
 * other special encounters. Ordinary battles derive their cap from the
 * highest rolled enemy level. The persistent badge cap always bounds the
 * result when it is available.
 */
export function resolveBattleLevelCap({
  authoredLevelCap,
  badgeLevelCap,
  enemyLevels,
  isWildBattle = false,
}: ResolveBattleLevelCapOptions): number | undefined {
  const authored = normalizeLevel(authoredLevelCap)
  const badgeCap = normalizeLevel(badgeLevelCap)
  const highestEnemyLevel = enemyLevels.reduce(
    (highest, level) => Math.max(highest, normalizeLevel(level) || 0),
    0,
  )

  const derived = highestEnemyLevel > 0
    ? highestEnemyLevel +
      (isWildBattle
        ? WILD_BATTLE_LEVEL_ADVANTAGE
        : TRAINER_BATTLE_LEVEL_ADVANTAGE)
    : undefined
  const cap = authored ?? derived
  if (cap === undefined) return badgeCap

  return Math.max(1, badgeCap ? Math.min(cap, badgeCap) : cap)
}

function normalizeLevel(value: number | null | undefined): number | undefined {
  if (!Number.isFinite(value)) return undefined
  return Math.max(1, Math.floor(value as number))
}

/** Resolve a cap directly from a battle config and its rolled enemy levels. */
export function getBattleLevelCap(
  battleConfig: Pick<BattleConfig, 'isWildBattle' | 'levelCap'>,
  enemyLevels: number[],
  badgeLevelCap?: number | null,
): number | undefined {
  return resolveBattleLevelCap({
    authoredLevelCap: battleConfig.levelCap,
    badgeLevelCap,
    enemyLevels,
    isWildBattle: battleConfig.isWildBattle,
  })
}
