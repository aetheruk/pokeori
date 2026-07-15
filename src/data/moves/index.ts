export * from './types'
export * from './entries/status-effects'
export * from './tms'

import { PokemonTypeName } from '../items'
import type { WeatherType } from '../weather'
import { ALL_TM_MOVES } from './tms'
import type { MoveConfig } from './types'
import type { BattleStance } from '@/utilities/battle/types'

export const POKEMON_TYPES: PokemonTypeName[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

export const MOVE_STANCES: BattleStance[] = ['power', 'speed', 'tech']

export const MOVES: Record<string, MoveConfig> = {}
ALL_TM_MOVES.forEach((move) => {
  MOVES[move.id] = move
})

export function getAllMoves(): MoveConfig[] {
  return Object.values(MOVES)
}

export function getMove(id: string): MoveConfig | undefined {
  return MOVES[id]
}

export function getRandomMoveStance(): BattleStance {
  return MOVE_STANCES[Math.floor(Math.random() * MOVE_STANCES.length)]
}

export function getRandomMoveType(): PokemonTypeName {
  return POKEMON_TYPES[Math.floor(Math.random() * POKEMON_TYPES.length)]
}

export interface ResolvedMoveDamageMultiplier {
  damageMultiplier: number
  hitCount: number
  hitDamageMultipliers: number[]
}

function getResolvedMultiHitCount(
  move: MoveConfig,
  random: () => number,
  forceMaxDamageRange: boolean,
): number {
  if (!move.multiHit) return 1
  const minHits = Math.max(1, Math.floor(Math.min(move.multiHit.minHits, move.multiHit.maxHits)))
  const maxHits = Math.max(minHits, Math.floor(Math.max(move.multiHit.minHits, move.multiHit.maxHits)))
  if (forceMaxDamageRange || minHits === maxHits) return maxHits

  const roll = Math.max(0, Math.min(0.999999, random()))
  if (minHits === 2 && maxHits === 5) {
    if (roll < 0.35) return 2
    if (roll < 0.7) return 3
    if (roll < 0.85) return 4
    return 5
  }

  return minHits + Math.floor(roll * (maxHits - minHits + 1))
}

function getMoveDamageMultiplierForHitCount(
  move: MoveConfig,
  hitCount: number,
): number {
  const range = move.damageRange
  if (!move.multiHit) return move.damage
  if (!range) return move.damage * hitCount

  const min = Math.min(range.min, range.max)
  const max = Math.max(range.min, range.max)
  if (min === max) return min

  const minHits = Math.max(1, Math.floor(Math.min(move.multiHit.minHits, move.multiHit.maxHits)))
  const maxHits = Math.max(minHits, Math.floor(Math.max(move.multiHit.minHits, move.multiHit.maxHits)))
  if (maxHits === minHits) return max

  const hitProgress = (Math.max(minHits, Math.min(maxHits, hitCount)) - minHits) / (maxHits - minHits)
  return min + hitProgress * (max - min)
}

function applyMoveDamageMultiplierOverrides(
  move: MoveConfig,
  baseMultiplier: number,
  defenderTypes: string[] | undefined,
  weather?: WeatherType,
): number {
  let damageMultiplier = baseMultiplier

  if (move.damageByDefenderType && defenderTypes?.length) {
    const normalizedDefenderTypes = defenderTypes.map((type) => type.toLowerCase())
    for (const [type, damage] of Object.entries(move.damageByDefenderType)) {
      if (normalizedDefenderTypes.includes(type.toLowerCase())) {
        damageMultiplier = damage
        break
      }
    }
  }

  const weatherMultiplier = move.weatherDamageMultiplier
  if (
    weatherMultiplier &&
    weather &&
    weather !== 'clear' &&
    (!weatherMultiplier.weather?.length || weatherMultiplier.weather.includes(weather))
  ) {
    damageMultiplier *= weatherMultiplier.multiplier
  }

  return damageMultiplier
}

function splitMultiplierAcrossHits(totalMultiplier: number, hitCount: number): number[] {
  const count = Math.max(1, Math.floor(hitCount))
  if (count === 1) return [totalMultiplier]
  const perHit = totalMultiplier / count
  return Array.from({ length: count }, () => perHit)
}

export function resolveMoveDamageMultiplier(
  move: MoveConfig,
  defenderTypes: string[] | undefined,
  random: () => number = Math.random,
  weather?: WeatherType,
  options: { forceMaxDamageRange?: boolean } = {},
): ResolvedMoveDamageMultiplier {
  const forceMaxDamageRange = options.forceMaxDamageRange === true
  if (move.multiHit) {
    const hitCount = getResolvedMultiHitCount(move, random, forceMaxDamageRange)
    const damageMultiplier = applyMoveDamageMultiplierOverrides(
      move,
      getMoveDamageMultiplierForHitCount(move, hitCount),
      defenderTypes,
      weather,
    )
    return {
      damageMultiplier,
      hitCount,
      hitDamageMultipliers: splitMultiplierAcrossHits(damageMultiplier, hitCount),
    }
  }

  const range = move.damageRange
  let baseMultiplier = move.damage

  if (range) {
    const min = Math.min(range.min, range.max)
    const max = Math.max(range.min, range.max)
    baseMultiplier = forceMaxDamageRange
      ? max
      : min + random() * (max - min)
  }

  const damageMultiplier = applyMoveDamageMultiplierOverrides(
    move,
    baseMultiplier,
    defenderTypes,
    weather,
  )

  return {
    damageMultiplier,
    hitCount: 1,
    hitDamageMultipliers: [damageMultiplier],
  }
}

export function getMoveDamageMultiplier(
  move: MoveConfig,
  defenderTypes: string[] | undefined,
  random: () => number = Math.random,
  weather?: WeatherType,
  options: { forceMaxDamageRange?: boolean } = {},
): number {
  return resolveMoveDamageMultiplier(
    move,
    defenderTypes,
    random,
    weather,
    options,
  ).damageMultiplier
}
