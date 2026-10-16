import type { FishingKeepNetRequirement } from '@/data/games/fishing/types'

export interface FishingKeepNetItem {
  type: 'pokemon' | 'item'
  itemId?: string
  quantity?: number
}

export function meetsFishingKeepNetRequirements(
  requirements: FishingKeepNetRequirement[] | undefined,
  keepNet: readonly FishingKeepNetItem[],
): boolean {
  if (!requirements?.length) return true

  return requirements.every((requirement) => {
    const matching = keepNet.filter(
      (entry) =>
        entry.type === 'item' &&
        entry.itemId === requirement.itemId &&
        (entry.quantity ?? 1) > 0,
    )
    if (
      requirement.slots !== undefined &&
      matching.length < Math.max(1, Math.floor(requirement.slots))
    )
      return false
    if (requirement.quantity === undefined && requirement.slots !== undefined)
      return true
    const requiredQuantity = Math.max(1, Math.floor(requirement.quantity ?? 1))
    const netQuantity = keepNet.reduce((total, entry) => {
      if (entry.type !== 'item' || entry.itemId !== requirement.itemId) {
        return total
      }
      return total + Math.max(1, Math.floor(entry.quantity ?? 1))
    }, 0)

    return netQuantity >= requiredQuantity
  })
}
