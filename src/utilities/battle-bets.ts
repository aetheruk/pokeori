import type { BattleState } from '@/utilities/battle/types'

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
  pot: number
  phase: 'inspect' | 'battle' | 'result'
  femaleTeam: BattleBetsTeamPreview
  maleTeam: BattleBetsTeamPreview
  femaleChance: number
  maleChance: number
  projectedFemalePayout: number
  projectedMalePayout: number
  selectedSide?: BattleBetsSide
  winner?: BattleBetsSide
  payout?: number
  battle?: BattleState
  createdAt: number
  expiresAt: number
}

export function calculateBattleBetsPayout(params: {
  pot: number
  selectedProbability: number
  houseEdge: number
}): number {
  if (
    !Number.isFinite(params.pot) ||
    !Number.isFinite(params.selectedProbability) ||
    !Number.isFinite(params.houseEdge) ||
    params.pot <= 0 ||
    params.selectedProbability <= 0
  ) {
    return 0
  }

  return Math.max(
    0,
    Math.floor(
      (params.pot * (1 - params.houseEdge)) / params.selectedProbability,
    ),
  )
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
