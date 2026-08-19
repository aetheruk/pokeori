import type { RequirementData, RequirementEvaluationContext } from '@/utilities/requirements'
import { checkRequirement } from '@/utilities/requirements'
import type { PrizeWheelSlot } from '@/data/games/prize-wheel/types'

export function getEligiblePrizeWheelSlots(
  slots: PrizeWheelSlot[],
  userData: RequirementData,
  context: RequirementEvaluationContext = {},
): PrizeWheelSlot[] {
  const eligibleSlots = slots.filter((slot) =>
    (slot.requirements || []).every((requirement) =>
      checkRequirement(userData, requirement, context),
    ),
  )

  const totalPercentage = eligibleSlots.reduce(
    (total, slot) => total + slot.percentage,
    0,
  )

  if (totalPercentage <= 0) return []

  return eligibleSlots.map((slot) => ({
    ...slot,
    percentage: (slot.percentage / totalPercentage) * 100,
  }))
}
