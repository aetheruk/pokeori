import type { LocationReward } from '@/data/types'
import type { BaseGameConfig, TaskIcon } from '../shared'

export type UfoCatcherCurrencyType =
  | 'crystals'
  | 'mega-shards'
  | 'pokedollars'
  | 'fun-tokens'
  | 'battle-points'
  | 'berry-powder'
  | 'prof-scrip'
  | 'league-ticket'

export interface UfoCatcherAnchor {
  id: string
  x: number
  y: number
}

export interface UfoCatcherPrizeTier {
  id: string
  label: string
  icon: TaskIcon
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra-rare'
  weight: number
  hitRadius: number
  edgeGripChance: number
  centerGripChance: number
  rewards: LocationReward[]
}

export interface UfoCatcherSettings {
  board: {
    width: number
    depth: number
    clawBounds: {
      minX: number
      maxX: number
      minY: number
      maxY: number
    }
    anchors: UfoCatcherAnchor[]
    positionJitter: {
      x: number
      y: number
    }
  }
  cost: {
    currencyType: UfoCatcherCurrencyType
    amount: number
  }
  xTravelMs: number
  yTravelMs: number
  gripCurveExponent: number
  prizeCount: number
  tiers: UfoCatcherPrizeTier[]
  timeLimit?: number
  background?: string
  themeColour?: string
}

export interface UfoCatcherGameConfig extends BaseGameConfig {
  gameType: 'ufo-catcher'
  settings: UfoCatcherSettings
}

export interface UfoCatcherPlacedPrize {
  instanceId: string
  tierId: string
  label: string
  icon: TaskIcon
  rarity: UfoCatcherPrizeTier['rarity']
  x: number
  y: number
  hitRadius: number
}

export interface UfoCatcherPublicAttempt {
  attemptId: string
  encounterId: string
  createdAt: number
  prizes: UfoCatcherPlacedPrize[]
  xTravelMs: number
  yTravelMs: number
}
