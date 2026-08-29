import { describe, expect, test } from 'bun:test'
import { shouldShowShopPurchaseOverlay } from '@/utilities/shops/purchase-presentation'

describe('shop purchase presentation', () => {
  test('uses the result overlay for card rewards', () => {
    expect(
      shouldShowShopPurchaseOverlay({ rewards: { cards: [{ id: 'base1-1' }] } }),
    ).toBe(true)
  })

  test('uses the result overlay for task exit modals without card rewards', () => {
    expect(
      shouldShowShopPurchaseOverlay({
        rewards: {
          cards: [],
          taskExitModals: [{ title: 'Field Notes' }],
        },
      }),
    ).toBe(true)
  })

  test('keeps simple purchases on the toast flow', () => {
    expect(shouldShowShopPurchaseOverlay({})).toBe(false)
    expect(
      shouldShowShopPurchaseOverlay({
        rewards: { cards: [], taskExitModals: [] },
      }),
    ).toBe(false)
  })
})
