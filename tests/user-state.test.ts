import { describe, expect, test } from 'bun:test'
import type { User } from '@/payload-types'
import {
  addPokedexCaughtRarity,
  getPokedexCaughtRarities,
  getUserStateData,
  pokedexRowsToArray,
  toSlimUser,
  USER_STATE_COLLECTIONS,
} from '@/utilities/user-state'

function fakePayload(rowsByCollection: Record<string, any[]> = {}) {
  return {
    find: async ({ collection }: { collection: string }) => ({
      docs: rowsByCollection[collection] || [],
    }),
    create: async () => {
      throw new Error('dry-run test should not create')
    },
    update: async () => {
      throw new Error('dry-run test should not update')
    },
    delete: async () => {
      throw new Error('dry-run test should not delete')
    },
  }
}

describe('user state storage compatibility', () => {
  test('pokedex hydration treats caught or researched forms as seen', () => {
    expect(
      pokedexRowsToArray([
        {
          speciesId: 129,
          formId: '129',
          seen: false,
          caught: false,
          researchXp: 10,
          researchLevel: 1,
        },
        {
          speciesId: 19,
          formId: '19',
          seen: false,
          caught: true,
          researchXp: 0,
          researchLevel: 0,
        },
      ]),
    ).toEqual([
      expect.objectContaining({ formId: '129', seen: true, caught: false }),
      expect.objectContaining({ formId: '19', seen: true, caught: true }),
    ])
  })

  test('Pokedex rarity collections retain each obtained variant and legacy shinies', () => {
    const entry = addPokedexCaughtRarity(
      {
        seen: true,
        caught: true,
        shinyCaught: true,
      },
      'ruby',
    )

    expect(entry.raritiesCaught).toEqual(['ruby'])
    expect(getPokedexCaughtRarities(entry).sort()).toEqual([
      'normal',
      'ruby',
      'shiny',
    ])
  })

  test('runtime reads do not fall back to legacy user JSON after migration cutover', async () => {
    const user = {
      id: 'user-1',
      inventory: { 'poke-ball': 4 },
      pokedex: {
        '25': {
          '25': {
            seen: true,
            caught: true,
            researchXp: 80,
            researchLevel: 2,
            preferredBattleStance: 'speed',
          },
        },
      },
      completedTasks: {
        'route-10-voltorb-hard-1': {
          completedAt: '2026-06-01T00:00:00.000Z',
          count: 1,
          updatedAt: '2026-06-01T01:00:00.000Z',
        },
      },
      stats: {
        battles: {
          'brock-rematch': {
            wins: 2,
            losses: 1,
            updatedAt: '2026-06-01T02:00:00.000Z',
          },
        },
        research: {},
        locations: {},
        expeditions: {},
      },
      tcg: { 'base1-4': 2 },
      shopPurchases: {
        'pewter-rare-candy': {
          count: 1,
          lastPurchasedAt: '2026-06-01T03:00:00.000Z',
        },
      },
    } as unknown as User

    const state = await getUserStateData(fakePayload() as any, user, [
      'inventory',
      'pokedex',
      'completedTasks',
      'battleResults',
      'tcg',
      'shopPurchases',
    ])

    expect(state.inventory).toEqual([])
    expect(state.pokedex).toEqual([])
    expect(state.completedTasks).toEqual([])
    expect(state.battleResults).toEqual([])
    expect(state.tcg).toEqual([])
    expect(state.shopPurchases).toEqual({})
  })

  test('hydrates requirement data exclusively from split rows', async () => {
    const user = {
      id: 'user-1',
      inventory: { 'poke-ball': 4 },
      pokedex: {
        '25': {
          '25': {
            seen: false,
            caught: false,
          },
        },
      },
      completedTasks: {
        legacy: {
          completedAt: '2026-06-01T00:00:00.000Z',
          count: 1,
        },
      },
      stats: {
        battles: {
          legacy: { wins: 1, losses: 0 },
        },
      },
      tcg: { legacy: 9 },
      shopPurchases: {
        legacy: { count: 1 },
      },
    } as unknown as User

    const state = await getUserStateData(
      fakePayload({
        [USER_STATE_COLLECTIONS.inventory]: [{ itemId: 'great-ball', quantity: 2 }],
        [USER_STATE_COLLECTIONS.pokedex]: [
          {
            speciesId: 26,
            formId: '26',
            seen: true,
            caught: true,
            researchLevel: 3,
            preferredBattleStance: 'tech',
          },
        ],
        [USER_STATE_COLLECTIONS.tasks]: [
          {
            taskId: 'route-10-voltorb-hard-1',
            count: 2,
            completedAt: '2026-06-01T00:00:00.000Z',
          },
        ],
        [USER_STATE_COLLECTIONS.activityStats]: [
          {
            activityType: 'battle',
            activityId: 'migrated',
            wins: 3,
            losses: 1,
            updatedAt: '2026-06-02T00:00:00.000Z',
          },
        ],
        [USER_STATE_COLLECTIONS.tcg]: [{ cardId: 'base1-4', setId: 'base1', quantity: 2 }],
        [USER_STATE_COLLECTIONS.shopPurchases]: [
          {
            shopItemId: 'pewter-rare-candy',
            count: 1,
            lastPurchasedAt: '2026-06-01T03:00:00.000Z',
          },
        ],
      }) as any,
      user,
      ['inventory', 'pokedex', 'completedTasks', 'battleResults', 'tcg', 'shopPurchases'],
    )

    expect(state.inventory).toEqual([{ itemId: 'great-ball', quantity: 2 }])
    expect(state.pokedex).toContainEqual(
      expect.objectContaining({
        speciesId: 26,
        formId: '26',
        caught: true,
        researchLevel: 3,
        preferredBattleStance: 'tech',
      }),
    )
    expect(state.completedTasks).toEqual([
      {
        taskId: 'route-10-voltorb-hard-1',
        completedAt: '2026-06-01T00:00:00.000Z',
        count: 2,
        updatedAt: undefined,
      },
    ])
    expect(state.battleResults as any).toEqual([
      {
        battleId: 'migrated',
        wins: 3,
        losses: 1,
        highScore: undefined,
        lastPlayed: '2026-06-02T00:00:00.000Z',
        updatedAt: '2026-06-02T00:00:00.000Z',
      },
    ])
    expect(state.tcg).toEqual([{ cardId: 'base1-4', quantity: 2, setId: 'base1' }])
    expect(state.shopPurchases).toMatchObject({
      'pewter-rare-candy': {
        count: 1,
        lastPurchasedAt: '2026-06-01T03:00:00.000Z',
      },
    })
  })

  test('slim user removes heavy ledgers but keeps active runtime fields', () => {
    const user = {
      id: 'user-1',
      trainerName: 'Blue',
      inventory: { potion: 1 },
      pokedex: { '1': {} },
      stats: {
        battles: { legacy: { wins: 1 } },
        totalEvolutions: 3,
        vsSeeker: { lastUsedAt: '2026-06-01T00:00:00.000Z' },
      },
      completedTasks: { intro: { count: 1 } },
      tcg: { 'base1-1': 1 },
      friends: ['user-2'],
      activeDailyTasks: [{ id: 'daily-1' }],
      activeVoyages: [{ voyageId: 'v1' }],
      currency: { pokedollars: 100 },
    } as unknown as User

    const slimUser = toSlimUser(user) as any

    expect(slimUser.trainerName).toBe('Blue')
    expect(slimUser.currency).toEqual({ pokedollars: 100 })
    expect(slimUser.activeDailyTasks).toEqual([{ id: 'daily-1' }])
    expect(slimUser.activeVoyages).toEqual([{ voyageId: 'v1' }])
    expect(slimUser.stats).toEqual({
      totalEvolutions: 3,
      vsSeeker: { lastUsedAt: '2026-06-01T00:00:00.000Z' },
    })
    expect(slimUser.inventory).toBeUndefined()
    expect(slimUser.pokedex).toBeUndefined()
    expect(slimUser.completedTasks).toBeUndefined()
    expect(slimUser.tcg).toBeUndefined()
    expect(slimUser.friends).toBeUndefined()
    expect(slimUser.stats.battles).toBeUndefined()
  })
})
