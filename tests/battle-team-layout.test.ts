import { describe, expect, test } from 'bun:test'
import { validateBattleTeamPlacements } from '@/utilities/pokemon/battle-team'

describe('battle team layout validation', () => {
  const teamIds = ['pokemon-1', 'pokemon-2', 'pokemon-3']

  test('allows sparse positions while requiring every current team member', () => {
    expect(
      validateBattleTeamPlacements(
        [
          { pokemonId: 'pokemon-1', position: 4 },
          { pokemonId: 'pokemon-2', position: 1 },
          { pokemonId: 'pokemon-3', position: 6 },
        ],
        teamIds,
      ),
    ).toEqual({
      valid: true,
      placements: [
        { pokemonId: 'pokemon-1', position: 4 },
        { pokemonId: 'pokemon-2', position: 1 },
        { pokemonId: 'pokemon-3', position: 6 },
      ],
    })
  })

  test('rejects duplicate slots and unknown or missing team members', () => {
    expect(
      validateBattleTeamPlacements(
        [
          { pokemonId: 'pokemon-1', position: 2 },
          { pokemonId: 'pokemon-2', position: 2 },
          { pokemonId: 'pokemon-3', position: 5 },
        ],
        teamIds,
      ),
    ).toEqual({ valid: false, message: 'Duplicate battle team placement' })

    expect(
      validateBattleTeamPlacements(
        [
          { pokemonId: 'pokemon-1', position: 1 },
          { pokemonId: 'pokemon-2', position: 3 },
          { pokemonId: 'pokemon-unknown', position: 6 },
        ],
        teamIds,
      ),
    ).toEqual({ valid: false, message: 'Battle team is out of date' })
  })

  test('rejects malformed or out-of-range positions', () => {
    expect(
      validateBattleTeamPlacements(
        [
          { pokemonId: 'pokemon-1', position: 0 },
          { pokemonId: 'pokemon-2', position: 2 },
          { pokemonId: 'pokemon-3', position: 3 },
        ],
        teamIds,
      ),
    ).toEqual({ valid: false, message: 'Invalid battle team placement' })

    expect(
      validateBattleTeamPlacements(
        [{ pokemonId: 'pokemon-1', position: 1 }],
        teamIds,
      ),
    ).toEqual({ valid: false, message: 'Battle team is out of date' })
  })

  test('allows swaps only within the currently occupied slots', () => {
    expect(
      validateBattleTeamPlacements(
        [
          { pokemonId: 'pokemon-1', position: 3 },
          { pokemonId: 'pokemon-2', position: 1 },
          { pokemonId: 'pokemon-3', position: 6 },
        ],
        teamIds,
        [1, 3, 6],
      ).valid,
    ).toBe(true)

    expect(
      validateBattleTeamPlacements(
        [
          { pokemonId: 'pokemon-1', position: 5 },
          { pokemonId: 'pokemon-2', position: 1 },
          { pokemonId: 'pokemon-3', position: 6 },
        ],
        teamIds,
        [1, 3, 6],
      ),
    ).toEqual({
      valid: false,
      message: 'Battle team cards may only swap occupied slots',
    })
  })
})
