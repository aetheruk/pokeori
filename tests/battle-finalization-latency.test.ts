import { beforeEach, describe, expect, mock, test } from 'bun:test'
import type { User } from '@/payload-types'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

const redisStore = new Map<string, unknown>()
const revalidatePathMock = mock(() => {})
const actualUserState = await import('@/utilities/user-state')

mock.module('@payload-config', () => ({
  default: {},
}))

mock.module('next/cache', () => ({
  revalidatePath: revalidatePathMock,
}))

mock.module('@/utilities/redis', () => ({
  redis: {
    async get<T>(key: string): Promise<T | null> {
      return (redisStore.get(key) as T | undefined) ?? null
    },
    async set(key: string, value: unknown): Promise<string> {
      redisStore.set(key, value)
      return 'OK'
    },
    async del(key: string): Promise<number> {
      return redisStore.delete(key) ? 1 : 0
    },
  },
}))

mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  getUserInventoryMap: mock(async () => ({})),
  setUserInventoryMap: mock(async () => {}),
  getUserTcgMap: mock(async () => ({})),
  setUserTcgMap: mock(async () => {}),
  getUserPokedexMap: mock(async () => ({})),
  setUserPokedexMap: mock(async () => {}),
  getUserAbilityDexMap: mock(async () => ({})),
  setUserAbilityDexMap: mock(async () => {}),
  getUserCompletedTasksMap: mock(async () => ({})),
  setUserCompletedTasksMap: mock(async () => {}),
  getUserShopPurchasesRecord: mock(async () => ({})),
  setUserShopPurchasesRecord: mock(async () => {}),
  getUserActivityStatsMap: mock(async () => ({})),
  setUserActivityStatsMap: mock(async () => {}),
  incrementUserActivityResult: mock(async () => {}),
  getUserProfileStats: mock(() => ({})),
}))

mock.module('payload', () => ({
  getPayload: mock(async () => ({
    async findByID() {
      return user
    },
  })),
}))

const user = {
  id: 'user-1',
  trainerName: 'Player',
  skills: {},
  email: 'player@example.test',
  collection: 'users',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
} as User

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 1,
    formId: '1',
    level: 50,
    name: 'Bulbasaur',
    types: ['Grass'],
    stats: {
      hp: 100,
      attack: 60,
      defense: 60,
      specialAttack: 60,
      specialDefense: 60,
      speed: 60,
    },
    currentHp: 100,
    maxHp: 100,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  } as BattlePokemon
}

function makeState(status: BattleState['status']): BattleState {
  return {
    playerTeam: [makePokemon()],
    enemyTeam: [
      makePokemon({
        id: 'enemy-1',
        user: 'enemy',
        originalTrainer: 'enemy',
        name: 'Charmander',
        types: ['Fire'],
      }),
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [
      {
        turn: 1,
        playerStance: 'power',
        enemyStance: 'tech',
        result: 'win',
        damageDealt: 10,
        damageTaken: 0,
        message: 'Turn resolved.',
      },
    ],
    status,
    battleId: 'battle',
    dynamicBattleConfig: {
      id: 'battle',
      rewards: [],
    } as any,
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
  }
}

describe('battle finalization latency', () => {
  beforeEach(() => {
    redisStore.clear()
    revalidatePathMock.mockClear()
  })

  test('ongoing turns persist without revalidating the encounter route', async () => {
    const { finalizeTurn } = await import(
      '@/app/(frontend)/game/battles/helpers/turn-finalization'
    )

    await finalizeTurn(makeState('ongoing'), user.id, user)

    expect(redisStore.has(`battle:${user.id}`)).toBe(true)
    expect(revalidatePathMock).toHaveBeenCalledTimes(0)
  })

  test('terminal turns still revalidate the encounter route', async () => {
    const { finalizeTurn } = await import(
      '@/app/(frontend)/game/battles/helpers/turn-finalization'
    )

    await finalizeTurn(makeState('won'), user.id, user)

    expect(redisStore.has(`battle:${user.id}`)).toBe(true)
    expect(revalidatePathMock).toHaveBeenCalledWith('/game/battles/encounter')
  })
})
