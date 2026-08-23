import { items } from '@/data/items'
import type { FishingItemEntry } from '@/data/games/fishing/types'

export function getAvailableFishingItemEntries(
  entries: FishingItemEntry[],
  inventory: Record<string, number>,
): FishingItemEntry[] {
  return entries.filter((entry) => {
    const item = items.find((candidate) => candidate.id === entry.itemId)
    return !item?.unique || (inventory[entry.itemId] || 0) <= 0
  })
}
