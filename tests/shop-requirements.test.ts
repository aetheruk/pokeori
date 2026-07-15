import { describe, expect, test } from 'bun:test'
import type { ShopConfig } from '@/data/shops/types'
import type { RequirementData } from '@/utilities/requirements'
import { checkShopItemRequirements, checkShopRequirements } from '@/utilities/shops/requirements'

const baseRequirementData = {
  user: { id: 'user-1' },
  inventory: [],
  pokemon: [],
  tcg: [],
  pokedex: [],
  completedTasks: [],
  battleResults: [],
  locationEncounterResults: [],
  researchEncounterResults: [],
  expeditionResults: [],
} as unknown as RequirementData

describe('shop requirements', () => {
  test('time range requirements use the shop region timezone', () => {
    const shop = {
      id: 'kanto-morning-shop',
      name: 'Kanto Morning Shop',
      description: '',
      category: 'Kanto',
      icon: { type: 'item', id: 'poke-ball' },
      requirements: [
        {
          type: 'time_range',
          timeRange: { start: '07:00', end: '08:00' },
        },
      ],
      items: [
        {
          id: 'morning-stock',
          name: 'Morning Stock',
          icon: { type: 'item', id: 'poke-ball' },
          cost: [],
          rewards: [],
          requirements: [
            {
              type: 'time_range',
              timeRange: { start: '07:00', end: '08:00' },
            },
          ],
        },
      ],
    } as ShopConfig

    const data = {
      ...baseRequirementData,
      currentTime: '2026-05-12T22:30:00.000Z',
    } as RequirementData

    expect(checkShopRequirements(data, shop)).toBe(true)
    expect(checkShopItemRequirements(data, shop, shop.items[0])).toBe(true)
  })
})
