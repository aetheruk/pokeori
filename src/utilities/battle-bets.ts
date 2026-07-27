import type { BattleState } from '@/utilities/battle/types'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'

export type BattleBetsSide = 'female' | 'male'

export interface BattleBetsPokemonPreview {
  speciesId: number
  formId: string
  name: string
  level: number
  types: string[]
  heldItemId?: string
  isShadow: true
}

export interface BattleBetsTeamPreview {
  trainerName: string
  trainerSpriteId: 'rocket-grunt-f' | 'rocket-grunt-m'
  pokemon: BattleBetsPokemonPreview[]
  trainerItemId?: string
}

export interface BattleBetsPublicState {
  gameId: string
  sessionId: string
  tokenBalance: number
  phase: 'inspect' | 'battle' | 'result'
  femaleTeam: BattleBetsTeamPreview
  maleTeam: BattleBetsTeamPreview
  femaleOdds: number
  maleOdds: number
  selectedSide?: BattleBetsSide
  stake?: number
  potentialPayout?: number
  won?: boolean
  payout?: number
  rewardSummary?: RewardSummary
  battle?: BattleState
  createdAt: number
  expiresAt: number
}

export function calculateBattleBetsDecimalOdds(params: {
  selectedProbability: number
  houseEdge: number
}): number {
  if (
    !Number.isFinite(params.selectedProbability) ||
    !Number.isFinite(params.houseEdge) ||
    params.selectedProbability <= 0
  ) {
    return 0
  }

  return Math.max(0, (1 - params.houseEdge) / params.selectedProbability)
}

export function calculateBattleBetsPayout(params: {
  stake: number
  selectedProbability: number
  houseEdge: number
}): number {
  if (
    !Number.isFinite(params.stake) ||
    !Number.isFinite(params.selectedProbability) ||
    !Number.isFinite(params.houseEdge) ||
    params.stake <= 0 ||
    params.selectedProbability <= 0
  ) {
    return 0
  }

  return Math.max(
    0,
    Math.floor(
      params.stake *
        calculateBattleBetsDecimalOdds({
          selectedProbability: params.selectedProbability,
          houseEdge: params.houseEdge,
        }),
    ),
  )
}

export function calculateBattleBetsSettlement(params: {
  won: boolean
  stake: number
  selectedProbability: number
  houseEdge: number
}): number {
  if (!params.won) return 0
  return calculateBattleBetsPayout(params)
}

export function mirrorBattleBetsBattleState(state: BattleState): BattleState {
  const playerId = String(state.playerTeam[0]?.user || 'battle-bets-player')
  const enemyId = String(state.enemyTeam[0]?.user || 'battle-bets-enemy')

  return {
    ...state,
    playerTeam: state.enemyTeam,
    enemyTeam: state.playerTeam,
    activePlayerIndex: state.activeEnemyIndex,
    activeEnemyIndex: state.activePlayerIndex,
    playerName: state.enemyName,
    enemyName: state.playerName,
    playerTrainer: state.enemyTrainer,
    enemyTrainer: state.playerTrainer,
    powers: state.pvpPowers?.[enemyId] ?? state.powers,
    pvpPowers: state.pvpPowers
      ? {
          ...state.pvpPowers,
          [playerId]: state.pvpPowers[playerId],
          [enemyId]: state.pvpPowers[enemyId],
        }
      : undefined,
  }
}

export function getBattleBetsFallbackWinner(params: {
  femaleRemainingHp: number
  femaleMaximumHp: number
  maleRemainingHp: number
  maleMaximumHp: number
  random?: () => number
}): BattleBetsSide {
  const femaleRatio =
    params.femaleMaximumHp > 0
      ? params.femaleRemainingHp / params.femaleMaximumHp
      : 0
  const maleRatio =
    params.maleMaximumHp > 0 ? params.maleRemainingHp / params.maleMaximumHp : 0

  if (femaleRatio > maleRatio) return 'female'
  if (maleRatio > femaleRatio) return 'male'
  return (params.random ?? Math.random)() < 0.5 ? 'female' : 'male'
}
