import { getCatchStageValue } from './catch-balance'

export type SafariEncounterAction = 'feed' | 'rock'

export const SAFARI_BALL_ID = 'safari-ball'
export const SAFARI_BALL_ALLOWANCE = 30
export const SAFARI_BASE_FLEE_RATE = 20
// Safari encounters have no gameplay timer. This is only an inactivity lease
// for the Redis encounter state so an abandoned run cannot remain forever.
export const SAFARI_ENCOUNTER_TTL_SECONDS = 30 * 60
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export function getSafariFleeChance({
  baseFleeRate,
}: {
  baseFleeRate: number
}) {
  return clamp(baseFleeRate, 10, 50)
}

export function resolveSafariFlee({
  baseFleeRate,
  random = Math.random,
}: {
  baseFleeRate: number
  random?: () => number
}) {
  const fleeChance = getSafariFleeChance({ baseFleeRate })

  return {
    fleeChance,
    fled: random() * 100 < fleeChance,
  }
}

export function resolveSafariAction({
  action,
  currentStage,
  baseCaptureRate,
  currentCatchRate,
  baseFleeRate,
  random = Math.random,
}: {
  action: SafariEncounterAction
  currentStage: number
  baseCaptureRate: number
  currentCatchRate: number
  baseFleeRate: number
  random?: () => number
}) {
  const catchAnswerEquivalent = action === 'rock' ? 5 : 1
  const stage = currentStage + catchAnswerEquivalent
  const catchRate = clamp(
    currentCatchRate +
      getCatchStageValue(baseCaptureRate) * catchAnswerEquivalent,
    0,
    255,
  )
  const fleeRate =
    action === 'rock'
      ? getSafariFleeChance({ baseFleeRate: baseFleeRate + 10 })
      : getSafariFleeChance({
          baseFleeRate: baseFleeRate - (Math.floor(random() * 3) + 1),
        })
  const flee = resolveSafariFlee({ baseFleeRate: fleeRate, random })

  return {
    stage,
    catchRate,
    fleeChance: flee.fleeChance,
    fled: flee.fled,
  }
}
