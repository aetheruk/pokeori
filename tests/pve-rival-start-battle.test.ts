import { beforeEach, describe, expect, mock, test } from 'bun:test'

import type { BattleConfig } from '@/data/types'
import type { Pokemon, User } from '@/payload-types'

const redisStore = new Map<string, unknown>()

const playerUser = {
  id: 'player-1',
  trainerName: 'Player',
  rivalTrainerId: 'rival-1',
  skills: {},
  email: 'player@example.test',
  collection: 'users',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as User

const rivalUser = {
  id: 'rival-1',
  trainerName: 'Blue',
  skills: {},
  email: 'rival@example.test',
  collection: 'users',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as User

function makePokemon(id: string, userId: string, speciesId: number, position: number): Pokemon {
  return {
    id,
    user: userId,
    originalTrainer: userId,
    speciesId,
    formId: String(speciesId),
    level: 12,
    onBattleTeam: true,
    battleTeamPosition: position,
    ivs: {
      hp: 10,
      attack: 10,
      defense: 10,
      specialAttack: 10,
      specialDefense: 10,
      speed: 10,
    },
    evs: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Pokemon
}

const playerPokemon = [makePokemon('player-bulbasaur', 'player-1', 1, 1)]
const rivalPokemon = [makePokemon('rival-charmander', 'rival-1', 4, 1)]
const pokedexRows = [
  {
    user: 'player-1',
    speciesId: 1,
    formId: '1',
    seen: true,
    caught: true,
  },
  {
    user: 'player-1',
    speciesId: 4,
    formId: '4',
    seen: true,
    caught: false,
  },
  {
    user: 'rival-1',
    speciesId: 4,
    formId: '4',
    seen: true,
    caught: true,
  },
]

mock.module('@payload-config', () => ({
  default: {},
}))

mock.module('next/cache', () => ({
  revalidatePath: mock(() => {}),
}))

mock.module('@/utilities/redis', () => ({
  redis: {
    async get<T>(key: string): Promise<T | null> {
      return (redisStore.get(key) as T | undefined) ?? null
    },
    async set(key: string, value: unknown): Promise<void> {
      redisStore.set(key, value)
    },
    async del(key: string): Promise<void> {
      redisStore.delete(key)
    },
  },
}))

mock.module('payload', () => ({
  getPayload: mock(async () => ({
    async findByID({ collection, id }: { collection: string; id: string }) {
      if (collection === 'users' && id === 'rival-1') return rivalUser
      return null
    },
    async find({
      collection,
      where,
      limit,
    }: {
      collection: string
      where: { user?: { equals?: string }; onBattleTeam?: { equals?: boolean } }
      limit?: number
    }) {
      if (collection === 'user-pokedex-entries') {
        const userId = where.user?.equals
        return { docs: pokedexRows.filter((row) => row.user === userId) }
      }

      if (collection !== 'pokemon') return { docs: [] }

      const userId = where.user?.equals
      const docs =
        userId === 'player-1' ? playerPokemon : userId === 'rival-1' ? rivalPokemon : []

      return { docs: typeof limit === 'number' ? docs.slice(0, limit) : docs }
    },
    async update() {
      return {}
    },
    async create({ data }: { data: unknown }) {
      return data
    },
  })),
}))

describe('PVE battle start', () => {
  beforeEach(() => {
    redisStore.clear()
  })

  test('ordinary wild Alphas add five levels, keep their rarity and allow two team members', async () => {
    const { startBattleFromConfig } = await import('@/app/(frontend)/game/battles/pve/start-battle')
    const battleConfig: BattleConfig = {
      id: 'alpha-test-route', name: 'Route', description: '', category: 'Kanto',
      icon: { type: 'pokemon', id: '19' }, background: '/backgrounds/grassy-route.avif',
      maxPokemon: 1, isWildBattle: true, requirements: [], rewards: [],
      enemyTeam: [{ speciesId: 19, level: { min: 4, max: 8 }, rarity: 'shiny' }],
    }
    const originalRandom = Math.random
    Math.random = () => 0.01
    try {
      const result = await startBattleFromConfig(playerUser, battleConfig)
      expect(result.success).toBe(true)
      expect(result.state?.config?.maxPokemon).toBe(2)
      expect(result.state?.config?.levelCap).toBe(14)
      expect(result.state?.enemyTeam[0]).toMatchObject({ level: 9, isAlpha: true, rarity: 'shiny', evs: { hp: 252 } })
      expect(result.state?.alphaCapturePokemon).toMatchObject({ level: 9, rarity: 'shiny', background: battleConfig.background, size: 'XXL' })
      redisStore.clear()
      const eventResult = await startBattleFromConfig(playerUser, { ...battleConfig, isRandomEvent: true })
      expect(eventResult.state?.enemyTeam[0]).toMatchObject({ level: 4, isAlpha: false, rarity: 'shiny' })
      expect(eventResult.state?.config?.maxPokemon).toBe(1)
      expect(eventResult.state?.alphaCapturePokemon).toBeUndefined()
    } finally { Math.random = originalRandom }
  })

  test('opted-in wild battles snapshot a generated variant for the capture attempt', async () => {
    const { startBattleFromConfig } = await import('@/app/(frontend)/game/battles/pve/start-battle')
    const battleConfig: BattleConfig = {
      id: 'variant-test-route', name: 'Route', description: '', category: 'Kanto',
      icon: { type: 'pokemon', id: '19' }, background: '/backgrounds/grassy-route.avif',
      maxPokemon: 1, isWildBattle: true, allowVariantCatches: true,
      rarityChances: { shiny: 1 }, requirements: [], rewards: [],
      enemyTeam: [{ speciesId: 19, level: { min: 4, max: 8 } }],
    }
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const result = await startBattleFromConfig(playerUser, battleConfig)
      expect(result.success).toBe(true)
      expect(result.state?.battleCapturePokemon).toMatchObject({
        speciesId: 19,
        rarity: 'shiny',
        shiny: true,
        isAlpha: false,
        background: battleConfig.background,
      })
      expect(result.state?.alphaCapturePokemon).toBeUndefined()
      expect(result.state?.battleCapturePokemon?.ivs?.hp).toBe(
        result.state?.enemyTeam[0].ivs?.hp ?? undefined,
      )
      expect(result.state?.battleCapturePokemon?.evs?.hp).toBe(
        result.state?.enemyTeam[0].evs?.hp ?? undefined,
      )
    } finally {
      Math.random = originalRandom
      redisStore.clear()
    }
  })

  test('uses the dynamic rival team when the authored enemy team is empty', async () => {
    const { startBattleFromConfig } = await import(
      '@/app/(frontend)/game/battles/pve/start-battle'
    )

    const battleConfig = {
      id: 'rival-cerulean',
      name: 'Rival Battle',
      description: 'A dynamic rival battle.',
      category: 'Kanto',
      subCategory: 'Cerulean City',
      icon: { type: 'trainer', id: 'youngster' },
      background: '/backgrounds/cerulean.avif',
      title: 'Rival Battle',
      dynamicOpponent: 'rival',
      rivalLevel: 18,
      maxPokemon: 3,
      levelCap: 20,
      requirements: [],
      enemyTeam: [],
      rewards: [],
    } satisfies BattleConfig

    const result = await startBattleFromConfig(playerUser, battleConfig, { dynamic: true })

    expect(result.success).toBe(true)
    expect(result.error).toBeUndefined()
    expect(result.state?.enemyName).toBe('Blue')
    expect(result.state?.enemyTeam).toHaveLength(1)
    expect(result.state?.enemyTeam[0]).toMatchObject({
      id: 'rival-charmander',
      user: 'rival-1',
      level: 18,
      speciesId: 4,
    })
  })

  test('uses an authored trainer name instead of the battle title', async () => {
    const { startBattleFromConfig } = await import(
      '@/app/(frontend)/game/battles/pve/start-battle'
    )

    const battleConfig = {
      id: 'chronicle-erika-exhibition-rival',
      name: 'A Graceful Answer',
      trainerName: 'Celia',
      description: 'An exhibition battle against Celia.',
      category: 'Secret',
      subCategory: 'Erika Chronicle',
      icon: { type: 'trainer', id: 'beauty' },
      background: '/backgrounds/chronicle-erika-flower-exhibition.avif',
      maxPokemon: 1,
      levelCap: 20,
      requirements: [],
      enemyTeam: [{ speciesId: 4, formId: '4', level: 12 }],
      rewards: [],
    } satisfies BattleConfig

    const result = await startBattleFromConfig(playerUser, battleConfig)

    expect(result.success).toBe(true)
    expect(result.state?.enemyName).toBe('Celia')
  })
})
