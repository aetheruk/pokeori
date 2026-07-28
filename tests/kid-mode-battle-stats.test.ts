import { describe, expect, test } from 'bun:test'
import type { Pokemon } from '@/payload-types'
import { initializeBattlePokemon } from '@/utilities/battle/stats-calc'
import { activateMegaEvolution } from '@/app/(frontend)/game/battles/powers/mega'
import { KID_MODE_PVE_STAT_MULTIPLIER } from '@/utilities/kid-mode'

const charizard = {
  id: 'charizard-1',
  user: 'user-1',
  originalTrainer: 'user-1',
  speciesId: 6,
  formId: '6',
  level: 50,
  name: 'Charizard',
  ivs: {
    hp: 15,
    attack: 15,
    defense: 15,
    specialAttack: 15,
    specialDefense: 15,
    speed: 15,
  },
  evs: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
} as unknown as Pokemon

const statKeys = [
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const

describe('Kid Mode PvE battle stats', () => {
  test('boosts all six stats once and preserves the boost after Mega Evolution', () => {
    const standard = initializeBattlePokemon(charizard, 50, true)
    const kidMode = initializeBattlePokemon(
      charizard,
      50,
      true,
      undefined,
      undefined,
      KID_MODE_PVE_STAT_MULTIPLIER,
    )

    for (const stat of statKeys) {
      expect(kidMode.stats[stat]).toBe(
        Math.floor(standard.stats[stat] * KID_MODE_PVE_STAT_MULTIPLIER),
      )
    }
    expect(kidMode.currentHp).toBe(kidMode.maxHp)

    expect(activateMegaEvolution(standard, '10034')).toBe(true)
    expect(activateMegaEvolution(kidMode, '10034')).toBe(true)
    for (const stat of statKeys) {
      expect(kidMode.stats[stat]).toBe(
        Math.floor(standard.stats[stat] * KID_MODE_PVE_STAT_MULTIPLIER),
      )
    }
    expect(kidMode.battleStatMultiplier).toBe(
      KID_MODE_PVE_STAT_MULTIPLIER,
    )
  })
})
