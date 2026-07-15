import type { BattleEnemy } from '@/data/types'

const BATTLE_STAT_KEYS = [
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const

type BattleStatKey = (typeof BATTLE_STAT_KEYS)[number]
type PartialStatBlock = Partial<Record<BattleStatKey, number>>
type StatBlock = Record<BattleStatKey, number>

function randomIntInclusive(
  min: number,
  max: number,
  random: () => number,
): number {
  return Math.floor(random() * (max - min + 1)) + min
}

function rollIv(rolls: number, random: () => number): number {
  let best = 0
  for (let i = 0; i < rolls; i += 1) {
    best = Math.max(best, randomIntInclusive(0, 31, random))
  }
  return best
}

function getTrainerIvRolls(level: number): number {
  if (level >= 50) return 3
  if (level >= 30) return 2
  return 1
}

function getTrainerEvRange(level: number): { min: number; max: number } {
  if (level >= 70) return { min: 100, max: 252 }
  if (level >= 50) return { min: 50, max: 252 }
  if (level >= 20) return { min: 1, max: 150 }
  return { min: 1, max: 70 }
}

function resolveStatBlock(
  overrides: PartialStatBlock | undefined,
  rollStat: (stat: BattleStatKey) => number,
): StatBlock {
  return Object.fromEntries(
    BATTLE_STAT_KEYS.map((stat) => [stat, overrides?.[stat] ?? rollStat(stat)]),
  ) as StatBlock
}

export function resolveEnemyBattleIvs(params: {
  enemy: Pick<BattleEnemy, 'ivs'>
  level: number
  isWildBattle?: boolean
  random?: () => number
}): StatBlock {
  const random = params.random ?? Math.random
  const rolls = params.isWildBattle ? 1 : getTrainerIvRolls(params.level)
  return resolveStatBlock(params.enemy.ivs, () => rollIv(rolls, random))
}

export function resolveEnemyBattleEvs(params: {
  enemy: Pick<BattleEnemy, 'evs'>
  level: number
  isWildBattle?: boolean
  random?: () => number
}): StatBlock {
  const random = params.random ?? Math.random
  if (params.isWildBattle && params.level <= 40) {
    return resolveStatBlock(params.enemy.evs, () => 0)
  }

  const range = params.isWildBattle
    ? { min: 1, max: 100 }
    : getTrainerEvRange(params.level)

  return resolveStatBlock(params.enemy.evs, () =>
    randomIntInclusive(range.min, range.max, random),
  )
}
