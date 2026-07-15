import type { ShopItem } from '@/data/shops/types'
import { isToday } from '@/utilities/date-utils'

export interface ShopPurchaseData {
  count?: number
  lastPurchasedAt?: string
}

function normalizeCount(count?: number): number {
  if (!Number.isFinite(count)) return 0
  return Math.max(0, Math.floor(count as number))
}

export function getEffectivePurchaseCount(
  item: Pick<ShopItem, 'daily'>,
  purchaseData?: ShopPurchaseData | null,
): number {
  if (!purchaseData) return 0

  const currentCount = normalizeCount(purchaseData.count)
  if (!item.daily) return currentCount

  if (!purchaseData.lastPurchasedAt) return 0
  return isToday(purchaseData.lastPurchasedAt) ? currentCount : 0
}

export function isOutOfStock(
  item: Pick<ShopItem, 'stock' | 'daily'>,
  purchaseData?: ShopPurchaseData | null,
): boolean {
  if (item.stock === undefined) return false
  const stockLimit = Math.max(0, Math.floor(item.stock))
  return getEffectivePurchaseCount(item, purchaseData) >= stockLimit
}

export function getRemainingStock(
  item: Pick<ShopItem, 'stock' | 'daily'>,
  purchaseData?: ShopPurchaseData | null,
): number | undefined {
  if (item.stock === undefined) return undefined
  const stockLimit = Math.max(0, Math.floor(item.stock))
  const used = getEffectivePurchaseCount(item, purchaseData)
  return Math.max(0, stockLimit - used)
}
