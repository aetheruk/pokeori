import { items } from '@/data/items'
import type {
  FishingItemEntry,
  FishingKeepNetRequirement,
  GlobalFishingItemEntry,
  RodType,
} from '@/data/games/fishing/types'
import { FISHING_KEEP_NET_CAPACITY, type FishingKeepNetEntry } from './keep-net'
import { meetsFishingKeepNetRequirements } from './keep-net-requirements'
import {
  NUMBERED_GOLDEN_SCALE_IDS,
  FISHING_RARE_ITEM_CHANCE,
  globalFishingCommonItemPools,
  globalFishingRareItemPools,
} from '@/data/games/fishing/item-pools'

export function getAvailableFishingItemEntries(
  entries: Array<
    FishingItemEntry & { keepNetRequirements?: FishingKeepNetRequirement[] }
  >,
  inventory: Record<string, number>,
  reservedItemIds: ReadonlySet<string> = new Set(),
  keepNet: readonly FishingKeepNetEntry[] = [],
): FishingItemEntry[] {
  const netItemIds = new Set([
    ...reservedItemIds,
    ...keepNet.flatMap((entry) =>
      entry.type === 'item' && entry.itemId ? [entry.itemId] : [],
    ),
  ])
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
      ((inventory[entry.itemId] || 0) <= 0 && !netItemIds.has(entry.itemId))
    )
  })
}

/** Once all numbered scales are owned, the material shares the rare table equally. */
export function addPostCollectionGoldenScaleDrop<T extends FishingItemEntry>(
  entries: T[],
  inventory: Record<string, number>,
): Array<T | FishingItemEntry> {
  if (
    !NUMBERED_GOLDEN_SCALE_IDS.every((itemId) => (inventory[itemId] || 0) > 0)
  ) {
    return entries
  }

  const totalWeight = entries.reduce((total, entry) => total + entry.weight, 0)
  const template = entries[0]
  if (!template || totalWeight <= 0) return entries

  return [
    ...entries,
    {
      itemId: 'golden-scale',
      weight: 1,
      symbol: '!!!',
      reactionTime: template.reactionTime,
      appearTime: template.appearTime,
      secret: true,
    },
  ]
}

export function getFishingRareItemChance(
  keepNet: readonly FishingKeepNetEntry[],
): number {
  const goldenScales = keepNet
    .slice(0, FISHING_KEEP_NET_CAPACITY)
    .reduce(
      (count, entry) =>
        count +
        (entry.type === 'item' && entry.itemId === 'golden-scale'
          ? Math.max(0, Math.floor(entry.quantity))
          : 0),
      0,
    )
  return Math.min(100, FISHING_RARE_ITEM_CHANCE + goldenScales * 0.3)
}

export function getGlobalFishingItemTables(
  rod: RodType,
  inventory: Record<string, number>,
  keepNet: readonly FishingKeepNetEntry[] = [],
) {
  return {
    common: getAvailableFishingItemEntries(
      globalFishingCommonItemPools[rod],
      inventory,
      new Set(),
      keepNet,
    ),
    rare: addPostCollectionGoldenScaleDrop(
      getAvailableFishingItemEntries(
        globalFishingRareItemPools[rod],
        inventory,
        new Set(),
        keepNet,
      ),
      inventory,
    ),
  }
}

/** Roll the table first, then an eligible entry; resolve bundle quantity only once. */
export function rollGlobalFishingItem(
  rod: RodType,
  inventory: Record<string, number>,
  keepNet: readonly FishingKeepNetEntry[],
  random: () => number = Math.random,
): FishingItemEntry {
  const tables = getGlobalFishingItemTables(rod, inventory, keepNet)
  const table =
    random() * 100 < getFishingRareItemChance(keepNet)
      ? tables.rare
      : tables.common
  let roll = random() * table.reduce((sum, entry) => sum + entry.weight, 0)
  let selected = table[table.length - 1]
  for (const entry of table) {
    roll -= entry.weight
    if (roll < 0) {
      selected = entry
      break
    }
  }
  const { quantityRange, ...entry } = selected as GlobalFishingItemEntry
  entry.dropTable = table === tables.rare ? 'rare' : 'common'
  return quantityRange
    ? {
        ...entry,
        quantity:
          quantityRange.min +
          Math.floor(random() * (quantityRange.max - quantityRange.min + 1)),
      }
    : { ...entry, quantity: entry.quantity ?? 1 }
}
