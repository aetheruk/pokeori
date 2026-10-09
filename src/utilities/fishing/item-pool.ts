import { items } from '@/data/items'
import type {
  FishingItemEntry,
  FishingKeepNetRequirement,
} from '@/data/games/fishing/types'
import type { FishingKeepNetEntry } from './keep-net'
import { meetsFishingKeepNetRequirements } from './keep-net-requirements'
import { NUMBERED_GOLDEN_SCALE_IDS } from '@/data/games/fishing/item-pools'

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

/** Adds a repeatable Golden Scale at exactly 1/50 of eligible global item rolls. */
export function addPostCollectionGoldenScaleDrop<T extends FishingItemEntry>(
  entries: T[],
  inventory: Record<string, number>,
): Array<T | FishingItemEntry> {
  if (!NUMBERED_GOLDEN_SCALE_IDS.every((itemId) => (inventory[itemId] || 0) > 0)) {
    return entries
  }

  const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0)
  const template = entries[0]
  if (!template || totalWeight <= 0) return entries

  return [
    ...entries,
    {
      itemId: 'golden-scale',
      weight: totalWeight / 49,
      symbol: '!!!',
      reactionTime: template.reactionTime,
      appearTime: template.appearTime,
      secret: true,
    },
  ]
}
