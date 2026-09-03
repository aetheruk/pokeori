import { describe, expect, test } from 'bun:test'
import type { ShopConfig } from '@/data/shops/types'
import type { RequirementData } from '@/utilities/requirements'
import { tasks } from '@/data/tasks'
import { shops } from '@/data/shops'
import {
  checkShopItemRequirements,
  checkShopRequirements,
} from '@/utilities/shops/requirements'

const baseRequirementData = {
  user: { id: 'user-1' },
  inventory: [],
  pokemon: [],
  tcg: [],
  pokedex: [],
  completedTasks: [],
  battleResults: [],
  locationEncounterResults: [],
  gameResults: [],
  fieldResearchResults: [],
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

  test("Prof's Scrip Shop only exposes starter cosmetics the player missed", () => {
    const shop = shops.find((entry) => entry.id === 'retro-trainer-cards')
    const starterTasks = tasks.filter((task) => task.id.startsWith('starter-'))

    expect(shop).toBeDefined()
    expect(starterTasks).toHaveLength(27)
    const starterIconItemIds = new Set(
      starterTasks.flatMap((task) =>
        task.rewards
          .filter((reward) => reward.type === 'icon')
          .map((reward) => `icon-${String(reward.targetId)}`),
      ),
    )

    for (const starterTask of starterTasks) {
      const data = {
        ...baseRequirementData,
        completedTasks: [
          {
            taskId: 'tutorial-16',
            completedAt: new Date().toISOString(),
            count: 1,
          },
          {
            taskId: starterTask.id,
            completedAt: new Date().toISOString(),
            count: 1,
          },
        ],
      } as RequirementData
      const starterIconId = String(
        starterTask.rewards.find((reward) => reward.type === 'icon')?.targetId,
      )
      const starterTitleId = String(
        starterTask.rewards.find((reward) => reward.type === 'title')?.targetId,
      )

      for (const item of shop!.items.filter(
        (entry) =>
          starterIconItemIds.has(entry.id) ||
          entry.id.startsWith('title-starter-'),
      )) {
        const expectedAvailable = starterIconItemIds.has(item.id)
          ? item.id !== `icon-${starterIconId}`
          : item.id !== `title-${starterTitleId}`

        expect(checkShopItemRequirements(data, shop!, item)).toBe(
          expectedAvailable,
        )
      }
    }
  })
})
