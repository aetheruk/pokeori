import { describe, expect, test } from 'bun:test'

import type { Pokemon } from '@/payload-types'
import {
  buildRivalBattleRewards,
  getFirstRivalBattleTeam,
  scaleRivalPokemonForBattle,
} from '@/utilities/rivals'
import type { BattleConfig } from '@/data/types'

function makePokemon(
  id: string,
  position: number | undefined,
  onBattleTeam = true,
): Pokemon {
  return {
    id,
    user: 'trainer-1',
    originalTrainer: 'trainer-1',
    speciesId: 1,
    formId: '1',
    level: 12,
    onBattleTeam,
    battleTeamPosition: position,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Pokemon
}

describe('rival helpers', () => {
  test('uses the first three live battle team slots and allows smaller teams', () => {
    const team = getFirstRivalBattleTeam([
      makePokemon('bench', 1, false),
      makePokemon('third', 3),
      makePokemon('first', 1),
      makePokemon('fourth', 4),
      makePokemon('second', 2),
    ])

    expect(team.map((pokemon) => pokemon.id)).toEqual(['first', 'second', 'third'])
    expect(getFirstRivalBattleTeam([makePokemon('solo', 1)])).toHaveLength(1)
  })

  test('scales copied rival Pokemon to the battle level', () => {
    const original = makePokemon('bulbasaur', 1)
    const scaled = scaleRivalPokemonForBattle(original, 18)

    expect(scaled.level).toBe(18)
    expect(original.level).toBe(12)
  })

  test('adds a dynamic rival payout without mutating the authored battle config', () => {
    const battle = {
      id: 'rival-test',
      name: 'Rival Test',
      description: '',
      category: 'Kanto',
      icon: { type: 'trainer', id: 'youngster' },
      background: '/backgrounds/rocky-path.avif',
      requirements: [],
      enemyTeam: [],
      rewards: [],
      maxPokemon: 3,
      rivalLevel: 20,
    } as BattleConfig

    const rewards = buildRivalBattleRewards(battle)

    expect(battle.rewards).toEqual([])
    expect(rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 1300,
      dropChance: 100,
    })
  })
})
