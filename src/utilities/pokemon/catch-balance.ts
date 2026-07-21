import type { AbilityEffect } from '@/data/abilities'
import { matchesAbilityEffectCondition } from '@/utilities/pokemon/encounter-ability-runtime'

export type ThrowQuality = 'poor' | 'nice' | 'great' | 'excellent'

export interface CaptureThrowInput {
  ringScale?: number
  aimOffset?: number
}

export interface CaptureThrowPoint {
  x: number
  y: number
}

interface BallQuestionBonusInput {
  ballId: string
  species: {
    types: string[]
    is_baby: boolean
    weight: number
    stats: { speed: number }
  } | null
  turnCount: number
  targetLevel: number
  userActiveLevel?: number
  isCaughtBefore?: boolean
  isNight?: boolean
  isUltraBeast?: boolean
  isMoonStoneEvolver?: boolean
}

interface CatchAbilityModifierInput {
  activeAbility?: {
    type: string
    value: number
    effects?: readonly AbilityEffect[]
    criteria?: {
      chance?: number
      formId?: string
      sourceFormId?: string
      speciesId?: number[]
      type?: string[]
      category?: string
      locationId?: string
      timeOfDay?: 'day' | 'night'
    }
  }
  formId: string
  speciesId?: number
  sourceFormId?: string
  locationId: string
  types?: string[]
  isNight?: boolean
}

const SECOND_CHANCE_RATE_UNLOCKS = [
  { level: 1, rate: 10 },
  { level: 28, rate: 15 },
  { level: 46, rate: 18 },
  { level: 72, rate: 20 },
] as const
const ONE_IN_ONE_THOUSAND_CATCH_RATE = 255 / 1000

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function getCatchStageValue(baseCaptureRate: number): number {
  return Math.min(10, baseCaptureRate / 6)
}

export function getThrowQuality(input?: CaptureThrowInput): ThrowQuality {
  const ringScale = clamp(typeof input?.ringScale === 'number' ? input.ringScale : 1, 0, 1)

  if (ringScale <= 0.07) return 'excellent'
  if (ringScale <= 0.3) return 'great'
  if (ringScale <= 0.58) return 'nice'
  return 'poor'
}

export function getThrowStageBonus(quality: ThrowQuality): number {
  if (quality === 'excellent') return 2
  if (quality === 'great') return 1
  if (quality === 'nice') return 0
  return -1
}

export function applyQuestionBonusToCatchRate(
  currentCatchRate: number,
  baseCaptureRate: number,
  questionBonus: number,
): number {
  const stageValue = getCatchStageValue(baseCaptureRate)
  return clamp(currentCatchRate + stageValue * questionBonus, 0, 255)
}

export function getHardBallCatchRate({
  ballId,
  isUltraBeast,
  isShadow,
}: {
  ballId: string
  isUltraBeast?: boolean
  isShadow?: boolean
}): number | undefined {
  if (isShadow) return ballId === 'rocket-ball' ? undefined : 0
  if (ballId === 'rocket-ball') return 0
  if (ballId === 'master-ball') return undefined
  if (isUltraBeast) return ONE_IN_ONE_THOUSAND_CATCH_RATE
  if (ballId === 'beast-ball') return ONE_IN_ONE_THOUSAND_CATCH_RATE
  return undefined
}

export function doesCatchAbilityApply({
  activeAbility,
  formId,
  speciesId,
  sourceFormId,
  locationId,
  types,
  isNight,
}: CatchAbilityModifierInput): boolean {
  if (activeAbility?.effects?.some((effect) => {
    if (effect.type !== 'catch-rate-multiplier') return false
    return matchesAbilityEffectCondition(effect, {
      formId,
      speciesId,
      sourceFormId,
      locationId,
      targetTypes: types,
      isNight,
    })
  })) {
    return true
  }

  if (
    activeAbility?.type !== 'catch' ||
    !activeAbility.value
  ) {
    return false
  }

  const criteria = activeAbility.criteria
  if (!criteria) return true
  if (criteria.formId && criteria.formId !== formId) return false
  if (criteria.sourceFormId && criteria.sourceFormId !== sourceFormId) return false
  if (criteria.speciesId?.length && !criteria.speciesId.includes(speciesId || 0)) return false
  if (criteria.locationId && criteria.locationId !== locationId) return false
  if (criteria.timeOfDay === 'night' && !isNight) return false
  if (criteria.timeOfDay === 'day' && isNight) return false
  if (criteria.type?.length) {
    const typeList = types || []
    if (!criteria.type.some((type) => typeList.includes(type))) return false
  }

  return true
}

export function applyCatchAbilityModifier(
  catchRate: number,
  input: CatchAbilityModifierInput,
): number {
  const { activeAbility } = input
  if (!activeAbility) return catchRate

  const effectMultiplier = (activeAbility.effects || []).reduce((multiplier, effect) => {
    if (effect.type !== 'catch-rate-multiplier') return multiplier
    return matchesAbilityEffectCondition(effect, {
      formId: input.formId,
      speciesId: input.speciesId,
      sourceFormId: input.sourceFormId,
      locationId: input.locationId,
      targetTypes: input.types,
      isNight: input.isNight,
    })
      ? multiplier * effect.multiplier
      : multiplier
  }, 1)

  if (effectMultiplier !== 1) return clamp(catchRate * effectMultiplier, 0, 255)
  if (!doesCatchAbilityApply(input)) return catchRate
  return clamp(catchRate * (activeAbility.value || 1), 0, 255)
}

export function getSecondChanceBaseRate(explorerLevel: number): number {
  let rate: number = SECOND_CHANCE_RATE_UNLOCKS[0].rate
  for (const unlock of SECOND_CHANCE_RATE_UNLOCKS) {
    if (explorerLevel >= unlock.level) rate = unlock.rate
  }
  return rate
}

export function getSecondChanceRate(
  explorerLevel: number,
  itemModifier: number = 0,
): number {
  return clamp(getSecondChanceBaseRate(explorerLevel) + itemModifier, 0, 100)
}

export function getBallQuestionBonus(input: BallQuestionBonusInput): number {
  const {
    ballId,
    species,
    turnCount,
    targetLevel,
    userActiveLevel,
    isCaughtBefore,
    isNight,
    isUltraBeast,
    isMoonStoneEvolver,
  } = input

  // Core progression balls.
  if (ballId === 'poke-ball') return 0
  if (ballId === 'great-ball') return 3
  if (ballId === 'ultra-ball') return 7

  // Flavor balls with small baseline value.
  if (ballId === 'premier-ball' || ballId === 'cherish-ball') return 1

  // Condition balls.
  if (ballId === 'net-ball') {
    return species?.types.includes('Bug') ? 8 : 0
  }
  if (ballId === 'dive-ball') {
    return species?.types.includes('Water') ? 8 : 0
  }
  if (ballId === 'dusk-ball') {
    return isNight ? 6 : 0
  }
  if (ballId === 'dream-ball') {
    return species?.types.includes('Psychic') ? 8 : 0
  }
  if (ballId === 'love-ball') {
    return species?.types.includes('Fairy') ? 10 : 0
  }
  if (ballId === 'lure-ball') {
    return species?.is_baby ? 8 : 0
  }
  if (ballId === 'repeat-ball') {
    return isCaughtBefore ? 8 : 0
  }
  if (ballId === 'fast-ball') {
    return species && species.stats.speed >= 100 ? 8 : 0
  }
  if (ballId === 'moon-ball') {
    return isMoonStoneEvolver ? 8 : 0
  }

  // Progressive / variable balls.
  if (ballId === 'nest-ball') {
    const bonus = Math.floor((41 - targetLevel) / 5)
    return clamp(bonus, 0, 8)
  }
  if (ballId === 'level-ball') {
    if (typeof userActiveLevel !== 'number' || userActiveLevel <= targetLevel) return 0
    if (userActiveLevel > targetLevel * 4) return 10
    if (userActiveLevel > targetLevel * 2) return 7
    return 4
  }
  if (ballId === 'timer-ball') {
    return clamp(Math.floor(turnCount / 2), 0, 8)
  }
  if (ballId === 'quick-ball') {
    return turnCount === 0 ? 8 : 0
  }
  if (ballId === 'heavy-ball') {
    const weight = species?.weight || 0
    if (weight < 1000) return -3
    if (weight < 2000) return 0
    if (weight < 3000) return 3
    return 6
  }

  if (ballId === 'beast-ball') {
    return 0
  }

  // Neutral balls.
  if (ballId === 'luxury-ball' || ballId === 'friend-ball' || ballId === 'rocket-ball') {
    return 0
  }

  return 0
}
