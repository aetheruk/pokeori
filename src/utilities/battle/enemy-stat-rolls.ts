import type { BattleEnemy } from '@/data/types'
import type { PokemonStats } from '@/data/pokemon/types'
import { getVsSeekerDifficultySettings } from '@/utilities/vs-seeker-difficulty'

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

function rollVsSeekerIv(target: number, random: () => number): number {
  return randomIntInclusive(
    Math.max(0, target - 3),
    Math.min(31, target + 3),
    random,
  )
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

function getDifficultyMultiplier(difficulty: number | undefined): number {
  const normalizedDifficulty = Math.min(
    5,
    Math.max(1, Math.floor(Number.isFinite(difficulty) ? difficulty! : 1)),
  )

  return 1 + (normalizedDifficulty - 1) * 0.5
}

function resolveStatBlock(
  overrides: PartialStatBlock | undefined,
  rollStat: (stat: BattleStatKey) => number,
): StatBlock {
  return Object.fromEntries(
    BATTLE_STAT_KEYS.map((stat) => [stat, overrides?.[stat] ?? rollStat(stat)]),
  ) as StatBlock
}

export type VsSeekerPokemonRole = 'bulk' | 'power' | 'speed' | 'tech'

export function getVsSeekerPokemonRole(
  stats: PokemonStats | undefined,
): VsSeekerPokemonRole {
  if (!stats) return 'bulk'

  const offenseTotal =
    stats.attack + stats.speed + stats['special-attack']
  const bulkTotal = stats.hp + stats.defense + stats['special-defense']
  if (bulkTotal >= offenseTotal * 1.15) return 'bulk'

  if (stats.speed >= stats.attack && stats.speed >= stats['special-attack']) {
    return 'speed'
  }
  if (stats['special-attack'] > stats.attack) return 'tech'
  return 'power'
}

function allocateVsSeekerEvs(params: {
  overrides: PartialStatBlock | undefined
  baseStats: PokemonStats | undefined
  difficulty: number
}): StatBlock {
  const settings = getVsSeekerDifficultySettings(params.difficulty)
  const allocation = Object.fromEntries(
    BATTLE_STAT_KEYS.map((stat) => [
      stat,
      Math.max(0, Math.floor(params.overrides?.[stat] ?? 0)),
    ]),
  ) as StatBlock
  const originalOverrideTotal = BATTLE_STAT_KEYS.reduce(
    (total, stat) => total + (params.overrides?.[stat] ?? 0),
    0,
  )
  let remaining = Math.max(0, settings.evBudget - originalOverrideTotal)
  const distributableBudget = remaining
  const role = getVsSeekerPokemonRole(params.baseStats)
  const spreadByRole: Record<
    VsSeekerPokemonRole,
    Array<[BattleStatKey, number]>
  > = {
    bulk: [
      ['hp', 0.5],
      ['defense', 0.25],
      ['specialDefense', 0.25],
    ],
    power: [
      ['attack', 0.5],
      ['hp', 0.25],
      ['defense', 0.25],
    ],
    speed: [
      ['speed', 0.5],
      ['hp', 0.25],
      ['specialDefense', 0.25],
    ],
    tech: [
      ['specialAttack', 0.5],
      ['hp', 0.25],
      ['specialDefense', 0.25],
    ],
  }
  const spread = spreadByRole[role]

  for (const [stat, weight] of spread) {
    const planned = Math.floor(distributableBudget * weight)
    const capacity = Math.max(0, 252 - allocation[stat])
    const added = Math.min(capacity, planned)
    allocation[stat] += added
    remaining -= added
  }

  while (remaining > 0) {
    let addedAny = false
    for (const [stat] of spread) {
      const capacity = Math.max(0, 252 - allocation[stat])
      if (capacity === 0) continue
      const added = Math.min(capacity, remaining)
      allocation[stat] += added
      remaining -= added
      addedAny = true
      if (remaining === 0) break
    }
    if (!addedAny) break
  }

  return allocation
}

export function resolveEnemyBattleIvs(params: {
  enemy: Pick<BattleEnemy, 'ivs'>
  level: number
  isWildBattle?: boolean
  difficulty?: number
  random?: () => number
}): StatBlock {
  const random = params.random ?? Math.random
  if (!params.isWildBattle && params.difficulty !== undefined) {
    const settings = getVsSeekerDifficultySettings(params.difficulty)
    return resolveStatBlock(params.enemy.ivs, () =>
      rollVsSeekerIv(settings.ivTarget, random),
    )
  }

  const rolls = params.isWildBattle
    ? 1
    : Math.max(
        1,
        Math.ceil(
          getTrainerIvRolls(params.level) *
            getDifficultyMultiplier(params.difficulty),
        ),
      )
  return resolveStatBlock(params.enemy.ivs, () => rollIv(rolls, random))
}

export function resolveEnemyBattleEvs(params: {
  enemy: Pick<BattleEnemy, 'evs'>
  level: number
  isWildBattle?: boolean
  difficulty?: number
  baseStats?: PokemonStats
  random?: () => number
}): StatBlock {
  const random = params.random ?? Math.random
  if (params.isWildBattle && params.level <= 40) {
    return resolveStatBlock(params.enemy.evs, () => 0)
  }

  if (!params.isWildBattle && params.difficulty !== undefined) {
    return allocateVsSeekerEvs({
      overrides: params.enemy.evs,
      baseStats: params.baseStats,
      difficulty: params.difficulty,
    })
  }

  const baseRange = params.isWildBattle
    ? { min: 1, max: 100 }
    : getTrainerEvRange(params.level)
  const difficultyMultiplier = getDifficultyMultiplier(params.difficulty)
  const range = {
    min: Math.min(252, Math.ceil(baseRange.min * difficultyMultiplier)),
    max: Math.min(
      252,
      Math.max(
        Math.ceil(baseRange.min * difficultyMultiplier),
        Math.ceil(baseRange.max * difficultyMultiplier),
      ),
    ),
  }

  return resolveStatBlock(params.enemy.evs, () =>
    randomIntInclusive(range.min, range.max, random),
  )
}
