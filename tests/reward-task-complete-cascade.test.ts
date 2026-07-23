import { beforeEach, describe, expect, mock, test } from 'bun:test'

let inventoryState: Record<string, number>
let pokedexState: Record<string, Record<string, any>>
let completedTasksState: Record<string, any>
let activityStatsState: Record<string, any>
let tcgState: Record<string, number>

const payloadMock = {
  find: mock(async () => ({ docs: [] })),
  count: mock(async () => ({ totalDocs: 0 })),
  findByID: mock(async () => ({
    id: 'user-1',
    skills: {},
    currency: {},
    unlockedBanners: ['lab'],
    unlockedIcons: ['trainer-red'],
    unlockedTitles: ['new-beginnings'],
  })),
  update: mock(async ({ data }) => data),
  create: mock(async ({ data }) => data),
}

const setInventoryMapMock = mock(async (_payload: unknown, _userId: string, inventory: any) => {
  inventoryState = { ...inventory }
})
const setPokedexMapMock = mock(async (_payload: unknown, _userId: string, pokedex: any) => {
  pokedexState = { ...pokedex }
})
const setCompletedTasksMapMock = mock(
  async (_payload: unknown, _userId: string, completedTasks: any) => {
    completedTasksState = { ...completedTasks }
  },
)
const setTcgMapMock = mock(async (_payload: unknown, _userId: string, tcg: any) => {
  tcgState = { ...tcg }
})

mock.module('@payload-config', () => ({
  default: {},
}))

mock.module('payload', () => ({
  getPayload: mock(async () => payloadMock),
}))

mock.module('@/utilities/weather', () => ({
  ensureUserWeatherSlot: mock(async () => ({
    slot: 1,
    updatedAt: new Date().toISOString(),
  })),
  resolveRequirementWeather: mock(() => 'clear'),
}))

const actualUserState = await import('@/utilities/user-state')

mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  USER_STATE_COLLECTIONS: {
    inventory: 'user-inventory-items',
    pokedex: 'user-pokedex-entries',
    abilityDex: 'user-abilitydex-entries',
    tasks: 'user-task-progress',
    activityStats: 'user-activity-stats',
    tcg: 'user-tcg-cards',
    shopPurchases: 'user-shop-purchases',
  },
  getUserInventoryMap: mock(async () => inventoryState),
  getUserPokedexMap: mock(async () => pokedexState),
  getUserCompletedTasksMap: mock(async () => completedTasksState),
  getUserTcgMap: mock(async () => tcgState),
  getUserActivityStatsMap: mock(async () => ({
    research: activityStatsState,
  })),
  setUserInventoryMap: setInventoryMapMock,
  setUserPokedexMap: setPokedexMapMock,
  setUserCompletedTasksMap: setCompletedTasksMapMock,
  setUserTcgMap: setTcgMapMock,
}))

describe('task_complete reward cascading', () => {
  beforeEach(() => {
    inventoryState = {}
    pokedexState = {}
    completedTasksState = {}
    activityStatsState = {}
    tcgState = {}
    payloadMock.find.mockClear()
    payloadMock.count.mockClear()
    payloadMock.findByID.mockClear()
    payloadMock.update.mockClear()
    payloadMock.create.mockClear()
    setInventoryMapMock.mockClear()
    setPokedexMapMock.mockClear()
    setCompletedTasksMapMock.mockClear()
    setTcgMapMock.mockClear()
  })

  test('grants rewards owned by a task completed from an activity reward', async () => {
    activityStatsState = {
      'rock-tunnel-b1f-se-field-observation': { wins: 5 },
    }
    const { grantRewards } = await import('@/utilities/rewards/reward-logic')

    const { summary } = await grantRewards('user-1', [
      {
        type: 'task_complete',
        targetId: 'rock-tunnel-dead-end-supplies',
        dropChance: 100,
        secret: true,
      },
    ])

    expect(summary.items).toContainEqual({
      id: 'battle-potion',
      name: 'Potion',
      quantity: 5,
    })
    expect(summary.tasksCompleted).toEqual([])
    expect(completedTasksState['rock-tunnel-dead-end-supplies']?.count).toBe(1)
    expect(inventoryState['battle-potion']).toBe(5)
  })

  test('queues exit modals and research XP from cascaded task rewards', async () => {
    activityStatsState = {
      'rock-tunnel-1f-ne-field-observation': { wins: 10 },
    }
    const { grantRewards } = await import('@/utilities/rewards/reward-logic')

    const { summary } = await grantRewards('user-1', [
      {
        type: 'task_complete',
        targetId: 'rock-tunnel-geodude-ladder',
        dropChance: 100,
        secret: true,
      },
    ])

    expect(summary.taskExitModals?.[0]?.title).toBe("Huh, What's That?")
    expect(summary.researchXp).toContainEqual(
      expect.objectContaining({
        formId: '74',
        formName: 'Geodude',
        amount: 30,
      }),
    )
    expect(completedTasksState['rock-tunnel-geodude-ladder']?.count).toBe(1)
    expect(pokedexState['74']?.['74']?.researchXp).toBe(30)
  })

  test('pokemon rewards roll a natural ability unless explicitly authored', async () => {
    const { grantRewards } = await import('@/utilities/rewards/reward-logic')

    await grantRewards('user-1', [
      {
        type: 'pokemon',
        targetId: '1',
        pokemonData: { level: 5 },
      },
      {
        type: 'pokemon',
        targetId: '1',
        pokemonData: { level: 5, ability: 'chlorophyll' },
      },
    ])

    const createdPokemon = payloadMock.create.mock.calls
      .filter(([args]) => args.collection === 'pokemon')
      .map(([args]) => args.data)

    expect(createdPokemon[0]).toMatchObject({
      speciesId: 1,
      formId: '1',
      ability: 'overgrow',
    })
    expect(createdPokemon[1]).toMatchObject({
      speciesId: 1,
      formId: '1',
      ability: 'chlorophyll',
    })
  })

  test('egg rewards create the requested variant egg', async () => {
    const { grantRewards } = await import('@/utilities/rewards/reward-logic')

    const { summary } = await grantRewards('user-1', [
      {
        type: 'egg',
        eggData: {
          rarity: 'galactic',
          sourceLocation: 'Celadon Day Care',
        },
      },
    ])

    const createdEgg = payloadMock.create.mock.calls
      .map(([args]) => args)
      .find((args) => args.collection === 'user-eggs')?.data

    expect(createdEgg).toMatchObject({
      user: 'user-1',
      rarity: 'galactic',
      sourceLocation: 'Celadon Day Care',
      status: 'incubating',
    })
    expect(summary.eggs).toContainEqual(
      expect.objectContaining({ rarity: 'galactic' }),
    )
  })
})
