import type {
  MoveConfig,
  MoveContestComparison,
  MoveContestMetric,
  MoveContestMetricValue,
  MoveContestResult,
} from '@/data/moves/types'
import type { TerrainType } from '@/data/terrain'
import type { BattlePokemon } from './types'
import {
  DEFAULT_STAT_STAGES,
  getStatStageMultiplier,
} from './stats-calc'
import { getBattleAbilityPriorityMoveContest } from './abilities'
import {
  getTerrainMoveBlockMessage,
  getTerrainPriorityBlockMessage,
} from './terrain-effects'

type ContestBattleStat =
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

export interface MoveContestResolution {
  configured: boolean
  success: boolean
  damageMultiplier?: number
  failMove: boolean
  preventCounter: boolean
  result: 'win' | 'loss' | 'tie'
  message: string
}

export function shouldFailMoveFromStance(params: {
  result: MoveContestResult
  failOnStance?: 'loss' | 'tie'
}): boolean {
  const { result, failOnStance } = params
  if (failOnStance === 'tie') return result === 'loss' || result === 'tie'
  if (failOnStance === 'loss') return result === 'loss'
  return false
}

const SIZE_RANK: Record<string, number> = {
  XS: 1,
  S: 2,
  M: 3,
  L: 4,
  XL: 5,
}

function getPokemonFieldValue(
  pokemon: BattlePokemon,
  metric: MoveContestMetricValue,
): number {
  if (typeof metric === 'number') return metric

  if (metric.startsWith('effective-stat:')) {
    const stat = metric.replace('effective-stat:', '') as ContestBattleStat
    const base = pokemon.stats?.[stat] || 0
    const stage = pokemon.statStages?.[stat] ?? DEFAULT_STAT_STAGES[stat]
    return Math.floor(base * getStatStageMultiplier(stage))
  }

  if (metric.startsWith('stat:')) {
    const stat = metric.replace('stat:', '') as ContestBattleStat
    return pokemon.stats?.[stat] || 0
  }

  if (metric === 'level') return pokemon.level || 1
  if (metric === 'currentHp') return pokemon.currentHp || 0
  if (metric === 'maxHp') return pokemon.maxHp || 0
  if (metric === 'height') return Number(pokemon.height) || 0
  if (metric === 'weight') return Number(pokemon.weight) || 0
  if (metric === 'size') return SIZE_RANK[pokemon.size || 'M'] || SIZE_RANK.M
  if (metric === 'friendship') return Number(pokemon.friendship) || 0

  return 0
}

function compareValues(
  attackerValue: number,
  defenderValue: number,
  comparison: MoveContestComparison,
): boolean {
  if (comparison === 'greaterThan') return attackerValue > defenderValue
  if (comparison === 'greaterThanOrEqual')
    return attackerValue >= defenderValue
  if (comparison === 'lessThan') return attackerValue < defenderValue
  if (comparison === 'lessThanOrEqual') return attackerValue <= defenderValue
  if (comparison === 'equal') return attackerValue === defenderValue
  if (comparison === 'notEqual') return attackerValue !== defenderValue
  return false
}

function formatContestMessage(
  message: string | undefined,
  params: {
    attacker: BattlePokemon
    defender: BattlePokemon
    move: MoveConfig
    attackerValue: number
    defenderValue: number
  },
): string {
  if (!message) return ''

  return message
    .replaceAll('{attacker}', params.attacker.name)
    .replaceAll('{defender}', params.defender.name)
    .replaceAll('{move}', params.move.name)
    .replaceAll('{attackerValue}', String(params.attackerValue))
    .replaceAll('{defenderValue}', String(params.defenderValue))
}

export function resolveMoveContest(params: {
  move: MoveConfig | undefined
  attacker: BattlePokemon
  defender: BattlePokemon
  attackType?: string
  terrain?: TerrainType
  random?: () => number
}): MoveContestResolution {
  const { move, attacker, defender } = params
  const contest = move?.contest

  const terrainMoveBlockMessage = getTerrainMoveBlockMessage({
    terrain: params.terrain,
    move,
    defender,
  })
  if (terrainMoveBlockMessage) {
    return {
      configured: true,
      success: false,
      failMove: true,
      preventCounter: false,
      result: 'loss',
      message: terrainMoveBlockMessage,
    }
  }

  if (!move || !contest) {
    const priorityContest = getBattleAbilityPriorityMoveContest({
      pokemon: attacker,
      move,
      attackType: params.attackType,
      random: params.random,
    })

    if (move && priorityContest) {
      const terrainBlockMessage = getTerrainPriorityBlockMessage({
        terrain: params.terrain,
        move,
        defender,
      })
      if (terrainBlockMessage) {
        return {
          configured: true,
          success: false,
          failMove: true,
          preventCounter: false,
          result: 'loss',
          message: terrainBlockMessage,
        }
      }

      return {
        configured: true,
        success: true,
        damageMultiplier: 1,
        failMove: false,
        preventCounter: true,
        result: 'win',
        message: `${attacker.name}'s ${priorityContest.abilityName} let ${move.name} move first!`,
      }
    }

    return {
      configured: false,
      success: true,
      failMove: false,
      preventCounter: false,
      result: 'tie',
      message: '',
    }
  }

  const attackerValue = getPokemonFieldValue(attacker, contest.attackerMetric)
  const defenderMetric = contest.defenderMetric ?? contest.attackerMetric
  const defenderValue = getPokemonFieldValue(defender, defenderMetric)
  const success = compareValues(
    attackerValue,
    defenderValue,
    contest.comparison,
  )
  const outcome = success ? contest.success : contest.failure

  return {
    configured: true,
    success,
    damageMultiplier: outcome?.damageMultiplier,
    failMove: outcome?.failMove ?? false,
    preventCounter: outcome?.preventCounter ?? false,
    result: outcome?.result ?? (success ? 'win' : 'loss'),
    message: formatContestMessage(outcome?.message, {
      attacker,
      defender,
      move,
      attackerValue,
      defenderValue,
    }),
  }
}
