import { describe, expect, test } from 'bun:test'
import type { ShopItem } from '@/data/shops/types'
import { shouldDisplayShopItem } from '@/utilities/shops/stock'

function shopItem(stock?: number, daily?: boolean): Pick<ShopItem, 'stock' | 'daily'> {
  return { stock, daily }
}

describe('shop stock visibility', () => {
  test('keeps unlimited and available limited items visible', () => {
    expect(shouldDisplayShopItem(shopItem(), { count: 100 })).toBe(true)
    expect(shouldDisplayShopItem(shopItem(2), { count: 1 })).toBe(true)
  })

  test('hides permanently exhausted items', () => {
    expect(shouldDisplayShopItem(shopItem(1), { count: 1 })).toBe(false)
    expect(shouldDisplayShopItem(shopItem(5), { count: 8 })).toBe(false)
  })

  test('keeps exhausted daily items visible because they restock', () => {
    expect(
      shouldDisplayShopItem(shopItem(1, true), {
        count: 1,
        lastPurchasedAt: new Date().toISOString(),
      }),
    ).toBe(true)
  })
})
