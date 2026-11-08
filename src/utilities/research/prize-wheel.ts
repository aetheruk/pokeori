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

  const fixedPercentage = eligibleSlots.reduce(
    (total, slot) => total + (slot.fixedPercentage || 0),
    0,
  )
  const groups = new Map<
    string,
    { weight: number; slots: PrizeWheelSlot[]; slotWeight: number }
  >()
  let ungroupedWeight = 0

  for (const slot of eligibleSlots) {
    if (slot.fixedPercentage !== undefined) continue
    if (!slot.weightGroup) {
      ungroupedWeight += slot.percentage
      continue
    }

    const group = groups.get(slot.weightGroup.id) || {
      weight: slot.weightGroup.weight,
      slots: [],
      slotWeight: 0,
    }
    group.slots.push(slot)
    group.slotWeight += slot.percentage
    groups.set(slot.weightGroup.id, group)
  }

  const flexibleWeight =
    ungroupedWeight +
    [...groups.values()].reduce((total, group) => total + group.weight, 0)
  if (flexibleWeight <= 0) {
    return fixedPercentage > 0
      ? eligibleSlots.map((slot) => ({
          ...slot,
          percentage: slot.fixedPercentage || 0,
        }))
      : []
  }

  const flexiblePercentage = Math.max(0, 100 - fixedPercentage)

  return eligibleSlots.map((slot) => {
    if (slot.fixedPercentage !== undefined) {
      return { ...slot, percentage: slot.fixedPercentage }
    }

    if (slot.weightGroup) {
      const group = groups.get(slot.weightGroup.id)
      const groupPercentage = group
        ? (group.weight / flexibleWeight) * flexiblePercentage
        : 0
      return {
        ...slot,
        percentage:
          group && group.slotWeight > 0
            ? (slot.percentage / group.slotWeight) * groupPercentage
            : 0,
      }
    }

    return {
      ...slot,
      percentage:
        totalPercentage > 0
          ? (slot.percentage / flexibleWeight) * flexiblePercentage
          : 0,
    }
  })
}
