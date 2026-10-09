import { items } from '@/data/items'
import type {
  FishingItemEntry,
  FishingKeepNetRequirement,
} from '@/data/games/fishing/types'
import type { FishingKeepNetEntry } from './keep-net'
import { meetsFishingKeepNetRequirements } from './keep-net-requirements'

export function getAvailableFishingItemEntries(
  entries: Array<
    FishingItemEntry & { keepNetRequirements?: FishingKeepNetRequirement[] }
  >,
  inventory: Record<string, number>,
  reservedItemIds: ReadonlySet<string> = new Set(),
  keepNet: readonly FishingKeepNetEntry[] = [],
): FishingItemEntry[] {
  return entries.filter((entry) => {
    if (
      !meetsFishingKeepNetRequirements(
        'keepNetRequirements' in entry ? entry.keepNetRequirements : undefined,
        keepNet,
      )
    ) {
      return false
    }
    if (!entry.itemId) return true
    const item = items.find((candidate) => candidate.id === entry.itemId)
    return (
      !item?.unique ||
      ((inventory[entry.itemId] || 0) <= 0 &&
        !reservedItemIds.has(entry.itemId))
    )
  })
}
