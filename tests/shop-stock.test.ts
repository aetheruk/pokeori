import { describe, expect, test } from 'bun:test'
import { celadonCityShops } from '@/data/shops/entries/celadon-city'
import type { ShopItem } from '@/data/shops/types'
import {
  shouldDisplayShop,
  shouldDisplayShopItem,
} from '@/utilities/shops/stock'

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

  test('hides configured shops only after every permanent offer is exhausted', () => {
    const shop = {
      hideWhenSoldOut: true,
      items: [
        { id: 'first', stock: 1, daily: false },
        { id: 'second', stock: 1, daily: false },
      ],
    }

    expect(shouldDisplayShop(shop, { first: { count: 1 } })).toBe(true)
    expect(
      shouldDisplayShop(shop, {
        first: { count: 1 },
        second: { count: 1 },
      }),
    ).toBe(false)
  })

  test('keeps normal shops visible when their stock is exhausted', () => {
    expect(
      shouldDisplayShop({
        hideWhenSoldOut: false,
        items: [{ id: 'limited', stock: 1, daily: false }],
      }, { limited: { count: 1 } }),
    ).toBe(true)
  })

  test('hides Celadon 2F, 4F, and Rooftop after all one-time offers are bought', () => {
    const hiddenShopIds = [
      'celadon-department-store-2f',
      'celadon-department-store-4f',
      'celadon-department-store-rooftop',
    ]

    for (const shopId of hiddenShopIds) {
      const shop = celadonCityShops.find((entry) => entry.id === shopId)
      expect(shop).toBeDefined()
      const firstItem = shop?.items[0]
      if ((shop?.items.length || 0) > 1) {
        expect(
          shouldDisplayShop(shop!, {
            ...(firstItem
              ? { [firstItem.id]: { count: firstItem.stock } }
              : {}),
          }),
        ).toBe(true)
      }
      expect(
        shouldDisplayShop(
          shop!,
          Object.fromEntries(
            (shop?.items || []).map((item) => [item.id, { count: item.stock }]),
          ),
        ),
      ).toBe(false)
    }
  })
})
