import { beforeEach, describe, expect, mock, test } from 'bun:test'
import type { User } from '@/payload-types'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { createInitialPowersState } from '@/data/powers'

const redisStore = new Map<string, unknown>()
const getPayloadMock = mock(async () => ({
  auth: async () => ({ user }),
}))
const getUserInventoryMapMock = mock(async () => ({}))
const revalidatePathMock = mock(() => {})
const actualUserState = await import('@/utilities/user-state')

mock.module('@payload-config', () => ({
  default: {},
}))

mock.module('payload', () => ({
  getPayload: getPayloadMock,
}))

mock.module('next/cache', () => ({
  revalidatePath: revalidatePathMock,
}))

mock.module('next/headers', () => ({
  headers: mock(async () => new Headers()),
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
    async deleteIfValue(key: string, value: unknown): Promise<number> {
      if (redisStore.get(key) !== value) return 0
      return redisStore.delete(key) ? 1 : 0
    },
  },
}))

mock.module('@/utilities/user-state', () => ({
  ...actualUserState,
  getUserInventoryMap: getUserInventoryMapMock,
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

const user = {
  id: 'user-1',
  trainerName: 'Player',
  skills: { battling: { level: 10 }, researching: { level: 10 } },
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

function makeState(): BattleState {
  return {
    // This suite measures action dependency loading, not faint handling. Keep
    // both battlers safely above any single-turn damage so the randomized
    // enemy stance cannot send the test through persistence side effects.
    playerTeam: [makePokemon({ currentHp: 10_000, maxHp: 10_000 })],
    enemyTeam: [
      makePokemon({
        id: 'enemy-1',
        user: 'enemy',
        originalTrainer: 'enemy',
        name: 'Charmander',
        types: ['Fire'],
        currentHp: 10_000,
        maxHp: 10_000,
      }),
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
    powers: createInitialPowersState(),
  }
}

describe('PVE turn latency', () => {
  beforeEach(() => {
    redisStore.clear()
    getPayloadMock.mockClear()
    getUserInventoryMapMock.mockClear()
    revalidatePathMock.mockClear()
  })

  test('legacy non-power PVE turn calls do not load trainer inventory', async () => {
    const { submitPveTurn } = await import(
      '@/app/(frontend)/game/battles/pve/submit-turn'
    )

    const result = await submitPveTurn(user, makeState(), 'power', 'grass')

    expect(result.success).toBe(false)
    expect(result.error).toBe(
      'Basic attacks must be submitted through the battle move action',
    )
    expect(getPayloadMock).toHaveBeenCalledTimes(0)
    expect(getUserInventoryMapMock).toHaveBeenCalledTimes(0)
  })

  test('the real basic stance action resolves without loading trainer inventory', async () => {
    redisStore.set(`battle:${user.id}`, makeState())
    const { useBasicAttack } = await import(
      '@/app/(frontend)/game/battles/actions/use-move'
    )

    const result = await useBasicAttack('power', 'grass', 'basic-stance-action')

    expect(result.success).toBe(true)
    expect(result.state?.turn).toBe(2)
    expect(getPayloadMock).toHaveBeenCalledTimes(1)
    expect(getUserInventoryMapMock).toHaveBeenCalledTimes(0)
  })

  test('snapshotted authored moves resolve without reloading trainer inventory', async () => {
    const state = makeState()
    state.playerTeam[0].assignedMoves = [{ moveId: 'vine-whip' }]
    state.playerTeam[0].battleMoveIds = ['vine-whip']
    state.playerTeam[0].pokemonResearchLevel = 1
    redisStore.set(`battle:${user.id}`, state)
    const { useMove } = await import(
      '@/app/(frontend)/game/battles/actions/use-move'
    )

    const result = await useMove(
      'vine-whip',
      'grass',
      'snapshotted-move-action',
    )

    expect(result.success).toBe(true)
    expect(result.state?.turn).toBe(2)
    expect(getPayloadMock).toHaveBeenCalledTimes(1)
    expect(getUserInventoryMapMock).toHaveBeenCalledTimes(0)
  })

  test('power commands still load trainer inventory for validation', async () => {
    const { submitPveTurn } = await import(
      '@/app/(frontend)/game/battles/pve/submit-turn'
    )

    const result = await submitPveTurn(
      user,
      makeState(),
      'power',
      'power:mega:3',
    )

    expect(result.success).toBe(false)
    expect(getPayloadMock).toHaveBeenCalledTimes(1)
    expect(getUserInventoryMapMock).toHaveBeenCalledTimes(1)
  })
})
