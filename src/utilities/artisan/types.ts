export type ArtisanCraftQuality = 'bad' | 'good' | 'perfect'

export interface ArtisanCraftTimingWindow {
  targetAt: number
  startAt?: number
  holdTargetOffsetsMs?: number[]
  perfectWindowMs: number
  goodWindowMs: number
}

export interface ArtisanCraftSession extends ArtisanCraftTimingWindow {
  id: string
  userId: string
  recipeId: string
  craftMultiplier?: number
  craftType: 'precise' | 'crush' | 'balance' | 'mix' | 'scatter'
  createdAt: number
  startAt: number
  endAt: number
  goodTapCount?: number
  perfectTapCount?: number
  balanceTargets?: number[]
  balanceGoodWindow?: number
  balancePerfectWindow?: number
  balancePeriodMs?: number
  mixGoodRotations?: number
  mixPerfectRotations?: number
}
