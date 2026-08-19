export type SafariEncounterAction = 'bait' | 'shout'

export const MAX_SAFARI_ACTIONS = 5
export const MIN_SAFARI_STAGE = -3
export const MAX_SAFARI_STAGE = 3

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

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
  const catchMultiplier = stage >= 0 ? 1.35 ** stage : 0.75 ** Math.abs(stage)
  const fleeMultiplier = stage >= 0 ? 1.5 ** stage : 0.6 ** Math.abs(stage)
  const catchRate = clamp(Math.round(baseCatchRate * catchMultiplier), 1, 255)
  const fleeChance = clamp(baseFleeRate * fleeMultiplier, 1, 90)

  return {
    stage,
    catchRate,
    fleeChance,
    fled: random() * 100 < fleeChance,
  }
}
