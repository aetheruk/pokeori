import { describe, expect, test } from 'bun:test'
import { getFormattedRewards } from '@/components/game/features/explore/ExploreModalHelpers'
import { isLocationEntryMastered } from '@/components/game/features/explore/location-completion'
import type { ExploreDisplayItem, ExploreItem } from '@/components/game/features/explore/types'
import { battles } from '@/data/battles'
import { allGames } from '@/data/games'
import { locations } from '@/data/locations'
import type { RequirementData } from '@/utilities/requirements'

const baseItems: ExploreItem[] = [
  {
    id: 'test-route-catch',
    name: 'Test Route',
    description: 'Catch Pokemon on Test Route.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '16' },
    type: 'location',
    originalData: {
      rewards: [
        {
          type: 'task_complete',
          targetId: 'weak-magnet-recipe',
        },
        {
          type: 'item',
          targetId: 'water-gem',
        },
      ],
      encounters: [{ speciesId: 16, formId: '16' }],
    },
  },
  {
    id: 'test-route-battle',
    name: 'Test Route',
    description: 'Battle Pokemon on Test Route.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '19' },
    type: 'battle',
    originalData: {
      isWildBattle: true,
      rewards: [],
      enemyTeam: [{ speciesId: 19, formId: '19' }],
    },
  },
  {
    id: 'test-route-study',
    name: 'Test Route',
    description: 'Study Pokemon on Test Route.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '21' },
    type: 'research',
    originalData: {
      gameType: 'field-observation',
      rewards: [],
      settings: {
        pokemonPool: [{ speciesId: 21, formId: '21' }],
        itemDrops: [{ itemId: 'onix-totem-1' }],
      },
    },
  },
  {
    id: 'test-route-fish',
    name: 'Test Route',
    description: 'Fish on Test Route.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '129' },
    type: 'research',
    originalData: {
      gameType: 'fishing',
      rewards: [],
      settings: {
        rods: {
          old: {
            encounters: {
              entries: [{ speciesId: 129, formId: '129' }],
            },
            items: {
              entries: [
                { itemId: 'water-gem' },
                { itemId: 'golden-scale-1', secret: true },
              ],
            },
          },
        },
      },
    },
  },
]

const entry: ExploreDisplayItem = {
  kind: 'group',
  group: {
    id: 'group:test-route',
    name: 'Test Route',
    category: 'Kanto',
    subCategory: 'Test',
    icon: { type: 'pokemon', id: '16' },
    items: baseItems,
  },
}

const fallbackFishingItem: ExploreItem = {
  id: 'test-route-fish-global-items',
  name: 'Test Route Global Items',
  description: 'Fish on Test Route with the global item fallback.',
  category: 'Kanto',
  subCategory: 'Test',
  icon: { type: 'pokemon', id: '129' },
  type: 'research',
  originalData: {
    gameType: 'fishing',
    rewards: [],
    settings: {
      rods: {
        old: {
          encounters: {
            entries: [{ speciesId: 129, formId: '129' }],
          },
        },
      },
    },
  },
}

const masteredPokedex = ['16', '19', '21', '129'].map((formId) => ({
  speciesId: Number(formId),
  formId,
  seen: true,
  caught: true,
  researchLevel: 1,
}))

function makeUserData(overrides: Partial<RequirementData> = {}) {
  return {
    user: {
      id: 'user-1',
      unlockedBanners: [],
      unlockedIcons: [],
      unlockedTitles: [],
    },
    inventory: [
      { itemId: 'onix-totem-1', quantity: 1 },
      { itemId: 'golden-scale-1', quantity: 1 },
    ],
    pokemon: [],
    tcg: [],
    pokedex: masteredPokedex,
    completedTasks: [
      {
        taskId: 'weak-magnet-recipe',
        completedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
        count: 1,
      },
    ],
    battleResults: [],
    locationEncounterResults: [],
    researchEncounterResults: [],
    ...overrides,
  } as unknown as RequirementData
}

describe('Explore location completion star', () => {
  test('marks grouped catch, battle, study, and fish content as mastered', () => {
    expect(isLocationEntryMastered(entry, makeUserData())).toBe(true)
  })

  test('waits for incomplete task unlock rewards', () => {
    expect(
      isLocationEntryMastered(entry, makeUserData({ completedTasks: [] })),
    ).toBe(false)
  })

  test('waits for unowned unique item drops', () => {
    expect(isLocationEntryMastered(entry, makeUserData({ inventory: [] }))).toBe(false)
  })

  test('waits until every Pokemon form is seen, caught, and research level one', () => {
    expect(
      isLocationEntryMastered(
        entry,
        makeUserData({
          pokedex: masteredPokedex.map((pokemon) =>
            pokemon.formId === '21' ? { ...pokemon, researchLevel: 0 } : pokemon,
          ),
        }),
      ),
    ).toBe(false)
  })

  test('does not mark non-location Explore entries', () => {
    expect(
      isLocationEntryMastered(
        {
          kind: 'single',
          item: {
            id: 'trainer',
            name: 'Trainer',
            description: 'A trainer battle.',
            category: 'Kanto',
            icon: { type: 'trainer', id: 'youngster' },
            type: 'battle',
            originalData: { rewards: [], enemyTeam: [{ speciesId: 16 }] },
          },
        },
        makeUserData(),
      ),
    ).toBe(false)
  })

  test('fishing reward previews omit repeatable auto item drops', () => {
    const fishingItem = baseItems.find((item) => item.id === 'test-route-fish')!
    const rewards = getFormattedRewards(fishingItem, makeUserData({ inventory: [] }), [])
    const labels = (rewards || []).map((reward: { label: unknown }) => reward.label)

    expect(labels).toContain('???')
    expect(labels).not.toContain('Water Gem')
  })

  test('fishing reward previews omit global fallback item pools', () => {
    const rewards = getFormattedRewards(
      fallbackFishingItem,
      makeUserData({ inventory: [] }),
      [],
    )
    const labels = (rewards || []).map((reward: { label: unknown }) => reward.label)

    expect(labels).not.toContain('???')
    expect(labels).not.toContain('Water Gem')
  })

  test('global fallback fishing item pools do not block location mastery', () => {
    expect(
      isLocationEntryMastered(
        {
          kind: 'single',
          item: fallbackFishingItem,
        },
        makeUserData({ inventory: [] }),
      ),
    ).toBe(true)
  })

  test('marks actual Route 2 as mastered with exact species and form rows', () => {
    const route2Location = locations.find((item) => item.id === 'route-2')!
    const route2Battle = battles.find((item) => item.id === 'route-2-battle')!
    const route2Study = allGames.find(
      (item) => item.id === 'route-2-field-observation',
    )!
    const route2Entry: ExploreDisplayItem = {
      kind: 'group',
      group: {
        id: 'group:route-2',
        name: 'Route 2',
        category: 'Kanto',
        subCategory: 'Pewter City',
        icon: route2Location.icon,
        items: [
          { ...route2Location, type: 'location', originalData: route2Location },
          { ...route2Battle, type: 'battle', originalData: route2Battle },
          { ...route2Study, type: 'research', originalData: route2Study },
        ] as ExploreItem[],
      },
    }
    const route2Pokedex = [10, 13, 16, 19, 29, 32].map((speciesId) => ({
      speciesId,
      formId: String(speciesId),
      seen: true,
      caught: true,
      researchLevel: 1,
    }))

    expect(
      isLocationEntryMastered(
        route2Entry,
        makeUserData({ inventory: [], completedTasks: [], pokedex: route2Pokedex }),
      ),
    ).toBe(true)
  })

  test('marks actual Route 1 as mastered with optional Alolan Rattata complete', () => {
    const route1Location = locations.find((item) => item.id === 'tutorial-1')!
    const route1Battle = battles.find((item) => item.id === 'route-1-battle')!
    const route1Study = allGames.find(
      (item) => item.id === 'route-1-field-observation',
    )!
    const route1Entry: ExploreDisplayItem = {
      kind: 'group',
      group: {
        id: 'group:route-1',
        name: 'Route 1',
        category: 'Kanto',
        subCategory: 'Pallet Town',
        icon: route1Location.icon,
        items: [
          { ...route1Location, type: 'location', originalData: route1Location },
          { ...route1Battle, type: 'battle', originalData: route1Battle },
          { ...route1Study, type: 'research', originalData: route1Study },
        ] as ExploreItem[],
      },
    }
    const route1Pokedex = [
      { speciesId: 16, formId: '16' },
      { speciesId: 19, formId: '19' },
      { speciesId: 19, formId: '10091' },
      { speciesId: 129, formId: '129', caught: false, seen: false },
    ].map((pokemon) => ({
      ...pokemon,
      seen: pokemon.seen ?? true,
      caught: pokemon.caught ?? true,
      researchLevel: 1,
    }))

    expect(
      isLocationEntryMastered(
        route1Entry,
        makeUserData({
          inventory: [],
          completedTasks: [
            {
              taskId: 'rattatas-burrow',
              completedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
              count: 1,
            },
          ],
          pokedex: route1Pokedex,
          currentTime: '2026-06-23T20:00:00.000Z',
          user: {
            id: 'user-1',
            unlockedBanners: [],
            unlockedIcons: [],
            unlockedTitles: [],
            skills: {
              catching: { level: 5 },
              researching: { level: 5 },
            },
          } as any,
        }),
      ),
    ).toBe(true)
  })

  test('Route 1 Study-only Magikarp still needs research level one', () => {
    const route1Location = locations.find((item) => item.id === 'tutorial-1')!
    const route1Battle = battles.find((item) => item.id === 'route-1-battle')!
    const route1Study = allGames.find(
      (item) => item.id === 'route-1-field-observation',
    )!
    const route1Entry: ExploreDisplayItem = {
      kind: 'group',
      group: {
        id: 'group:route-1',
        name: 'Route 1',
        category: 'Kanto',
        subCategory: 'Pallet Town',
        icon: route1Location.icon,
        items: [
          { ...route1Location, type: 'location', originalData: route1Location },
          { ...route1Battle, type: 'battle', originalData: route1Battle },
          { ...route1Study, type: 'research', originalData: route1Study },
        ] as ExploreItem[],
      },
    }
    const route1Pokedex = [
      { speciesId: 16, formId: '16', caught: true, researchLevel: 1 },
      { speciesId: 19, formId: '19', caught: true, researchLevel: 1 },
      { speciesId: 19, formId: '10091', caught: true, researchLevel: 1 },
      { speciesId: 129, formId: '129', caught: false, researchLevel: 0 },
    ].map((pokemon) => ({
      ...pokemon,
      seen: true,
    }))

    expect(
      isLocationEntryMastered(
        route1Entry,
        makeUserData({
          inventory: [],
          completedTasks: [
            {
              taskId: 'rattatas-burrow',
              completedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
              count: 1,
            },
          ],
          pokedex: route1Pokedex,
          currentTime: '2026-06-23T20:00:00.000Z',
          user: {
            id: 'user-1',
            unlockedBanners: [],
            unlockedIcons: [],
            unlockedTitles: [],
            skills: {
              catching: { level: 5 },
              researching: { level: 5 },
            },
          } as any,
        }),
      ),
    ).toBe(false)
  })

  test('Route 1 mastery accepts form-complete alternate forms with mismatched stored species id', () => {
    const route1Location = locations.find((item) => item.id === 'tutorial-1')!
    const route1Battle = battles.find((item) => item.id === 'route-1-battle')!
    const route1Study = allGames.find(
      (item) => item.id === 'route-1-field-observation',
    )!
    const route1Entry: ExploreDisplayItem = {
      kind: 'group',
      group: {
        id: 'group:route-1',
        name: 'Route 1',
        category: 'Kanto',
        subCategory: 'Pallet Town',
        icon: route1Location.icon,
        items: [
          { ...route1Location, type: 'location', originalData: route1Location },
          { ...route1Battle, type: 'battle', originalData: route1Battle },
          { ...route1Study, type: 'research', originalData: route1Study },
        ] as ExploreItem[],
      },
    }
    const route1Pokedex = [
      { speciesId: 16, formId: '16', caught: true },
      { speciesId: 19, formId: '19', caught: true },
      { speciesId: 10091, formId: '10091', caught: true },
      { speciesId: 129, formId: '129', caught: false },
    ].map((pokemon) => ({
      ...pokemon,
      seen: true,
      researchLevel: 1,
    }))

    expect(
      isLocationEntryMastered(
        route1Entry,
        makeUserData({
          inventory: [],
          completedTasks: [
            {
              taskId: 'rattatas-burrow',
              completedAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
              count: 1,
            },
          ],
          pokedex: route1Pokedex,
          currentTime: '2026-06-23T20:00:00.000Z',
          user: {
            id: 'user-1',
            unlockedBanners: [],
            unlockedIcons: [],
            unlockedTitles: [],
            skills: {
              catching: { level: 5 },
              researching: { level: 5 },
            },
          } as any,
        }),
      ),
    ).toBe(true)
  })
})
