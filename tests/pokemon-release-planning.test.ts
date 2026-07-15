import { describe, expect, test } from 'bun:test'
import {
  buildPokemonReleaseRewards,
  getPokemonReleaseBlockMessage,
} from '@/utilities/pokemon/release-planning'

describe('pokemon release planning', () => {
  test('blocks locked, battle team, and partner pokemon from release', () => {
    expect(getPokemonReleaseBlockMessage({ locked: true })).toBe(
      'Cannot release a locked Pokemon!',
    )
    expect(getPokemonReleaseBlockMessage({ onBattleTeam: true })).toBe(
      'Cannot release a Pokemon in your battle team!',
    )
    expect(getPokemonReleaseBlockMessage({ partner: true })).toBe(
      'Cannot release a Partner Pokemon!',
    )
    expect(getPokemonReleaseBlockMessage({ isCompanion: true })).toBe(
      'Cannot release a Partner Pokemon!',
    )
    expect(getPokemonReleaseBlockMessage({})).toBeNull()
  })

  test('unresearched release rewards only include candy and broken ball casing', () => {
    const rewards = buildPokemonReleaseRewards({
      pokemon: {
        level: 5,
        speciesId: 25,
        formId: '25',
      },
      pokedex: {},
      researchingLevel: 1,
    })

    expect(rewards).toEqual([
      {
        type: 'item',
        targetId: 'rare-candy-xs',
        quantity: 1,
        dropChance: 80,
      },
      {
        type: 'item',
        targetId: 'broken-ball-t1',
        quantity: 1,
        dropChance: 100,
      },
    ])
  })

  test('held items are returned as guaranteed release rewards', () => {
    const rewards = buildPokemonReleaseRewards({
      pokemon: {
        level: 5,
        speciesId: 25,
        formId: '25',
        heldItemId: 'hard-stone',
      },
      pokedex: {},
      researchingLevel: 1,
    })

    expect(rewards[0]).toEqual({
      type: 'item',
      targetId: 'hard-stone',
      quantity: 1,
      dropChance: 100,
    })
    expect(rewards).toHaveLength(3)
  })

  test('researched release rewards add five material rolls for that pokemon type', () => {
    const rewards = buildPokemonReleaseRewards({
      pokemon: {
        level: 5,
        speciesId: 25,
        formId: '25',
      },
      pokedex: {
        25: {
          25: { researchLevel: 2 },
        },
      },
      researchingLevel: 1,
    })

    expect(rewards).toHaveLength(7)
    expect(
      rewards.filter((reward) => reward.targetId === 'electric-component-t1'),
    ).toHaveLength(5)
  })
})
