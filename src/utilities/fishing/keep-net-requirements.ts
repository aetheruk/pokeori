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
