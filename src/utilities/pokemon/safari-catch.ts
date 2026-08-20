export type SafariEncounterAction = 'bait' | 'shout'

export const SAFARI_BALL_ID = 'safari-ball'
export const SAFARI_BALL_ALLOWANCE = 30
export const MIN_SAFARI_STAGE = -3
export const MAX_SAFARI_STAGE = 3

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

/**
 * Safari flee chance is target-specific while still allowing an area to tune
 * the overall reserve danger. Low-capture-rate Pokémon are more skittish.
 */
export function deriveSafariBaseFleeRate({
  captureRate,
  locationFleeRate = 10,
}: {
  captureRate: number
  locationFleeRate?: number
}) {
  const rarityPressure = clamp((255 - captureRate) / 255, 0, 1)
  return clamp(locationFleeRate * (1 + rarityPressure), 5, 35)
}

function getStageMultipliers(stage: number) {
  if (stage < 0) {
    const baitStages = Math.abs(stage)
    return {
      catchMultiplier: 1.05 ** baitStages,
      fleeMultiplier: 0.85 ** baitStages,
    }
  }

  return {
    catchMultiplier: 1.35 ** stage,
    fleeMultiplier: 1.5 ** stage,
  }
}

export function resolveSafariFlee({
  currentStage,
  baseFleeRate,
  random = Math.random,
}: {
  currentStage: number
  baseFleeRate: number
  random?: () => number
}) {
  const stage = clamp(currentStage, MIN_SAFARI_STAGE, MAX_SAFARI_STAGE)
  const { fleeMultiplier } = getStageMultipliers(stage)
  const fleeChance = clamp(baseFleeRate * fleeMultiplier, 1, 90)

  return {
    fleeChance,
    fled: random() * 100 < fleeChance,
  }
}

export function resolveSafariAction({
  action,
  currentStage,
  baseCatchRate,
  baseFleeRate,
  random = Math.random,
}: {
  action: SafariEncounterAction
  currentStage: number
  baseCatchRate: number
  baseFleeRate: number
  random?: () => number
}) {
  const stage = clamp(
    currentStage + (action === 'shout' ? 1 : -1),
    MIN_SAFARI_STAGE,
    MAX_SAFARI_STAGE,
  )
  const { catchMultiplier } = getStageMultipliers(stage)
  const flee = resolveSafariFlee({ currentStage: stage, baseFleeRate, random })

  return {
    stage,
    catchRate: clamp(Math.round(baseCatchRate * catchMultiplier), 1, 255),
    fleeChance: flee.fleeChance,
    fled: flee.fled,
  }
}
