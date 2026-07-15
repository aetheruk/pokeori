import { beforeEach, describe, expect, mock, test } from 'bun:test'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

const pokemonBattleKOs: Record<string, number | null> = {}
const updates: any[] = []

mock.module('@payload-config', () => ({
  default: {},
}))

mock.module('payload', () => ({
  getPayload: mock(async () => ({
    async findByID({ id }: { id: string }) {
      return { id, battleKOs: pokemonBattleKOs[id] ?? null }
    },
    async update(args: any) {
      updates.push(args)
      return { id: args.id, ...args.data }
    },
  })),
}))

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

function makeState(overrides: Partial<BattleState> = {}): BattleState {
  return {
    playerTeam: [makePokemon({ id: 'pokemon-1', user: 'user-1' })],
    enemyTeam: [
      makePokemon({
        id: 'enemy-1',
        user: 'enemy',
        originalTrainer: 'enemy',
        currentHp: 0,
      }),
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'battle-1',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
    ...overrides,
  }
}

describe('pokemon battle KO credits', () => {
  beforeEach(() => {
    updates.length = 0
    for (const key of Object.keys(pokemonBattleKOs)) {
      delete pokemonBattleKOs[key]
    }
  })

  test('records a PVE enemy KO against the owned attacking Pokemon', async () => {
    const { recordPokemonKO } = await import(
      '@/app/(frontend)/game/battles/helpers/pokemon-ko-credit'
    )
    const state = makeState({
      moveHistory: {
        damage: {
          lastTakenBySide: {
            enemy: {
              id: '1:player:enemy:attack:pokemon-1:enemy-1',
              sourceSide: 'player',
              targetSide: 'enemy',
              sourcePokemonId: 'pokemon-1',
              targetPokemonId: 'enemy-1',
              turn: 1,
              damage: 100,
            },
          },
        },
      },
    })

    recordPokemonKO(state, 'enemy')

    expect(state.pokemonBattleKOs).toEqual({ 'pokemon-1': 1 })
  })

  test('records a PVP KO against the owned Pokemon on the enemy side', async () => {
    const { recordPokemonKO } = await import(
      '@/app/(frontend)/game/battles/helpers/pokemon-ko-credit'
    )
    const state = makeState({
      playerTeam: [
        makePokemon({ id: 'pokemon-1', user: 'user-1', currentHp: 0 }),
      ],
      enemyTeam: [makePokemon({ id: 'pokemon-2', user: 'user-2' })],
      moveHistory: {
        damage: {
          lastTakenBySide: {
            player: {
              id: '1:enemy:player:attack:pokemon-2:pokemon-1',
              sourceSide: 'enemy',
              targetSide: 'player',
              sourcePokemonId: 'pokemon-2',
              targetPokemonId: 'pokemon-1',
              turn: 1,
              damage: 100,
            },
          },
        },
      },
    })

    recordPokemonKO(state, 'player')

    expect(state.pokemonBattleKOs).toEqual({ 'pokemon-2': 1 })
  })

  test('persists KO credits to Pokemon documents once', async () => {
    const { persistPokemonBattleKOs } = await import(
      '@/app/(frontend)/game/battles/helpers/pokemon-ko-credit'
    )
    pokemonBattleKOs['pokemon-1'] = 3
    const state = makeState({
      pokemonBattleKOs: {
        'pokemon-1': 2,
      },
    })

    await persistPokemonBattleKOs(state)

    expect(updates).toHaveLength(1)
    expect(updates[0]).toMatchObject({
      collection: 'pokemon',
      id: 'pokemon-1',
      data: { battleKOs: 5 },
    })
    expect(state.pokemonBattleKOs).toBeUndefined()
    expect(state.pokemonBattleKOsPersisted).toBe(true)

    await persistPokemonBattleKOs(state)
    expect(updates).toHaveLength(1)
  })
})
