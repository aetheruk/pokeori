import { describe, expect, test } from 'bun:test'
import {
  makeBattlePokemon,
  makePveBattleState,
} from './helpers/battle-fixtures'
import {
  needsPlayerLeadSelection,
  needsPlayerReplacement,
} from '@/utilities/battle/switching'
import { buildWildBattleSelectedTeam } from '@/utilities/battle/lead-selection'

describe('wild battle lead selection', () => {
  test('lead selection is distinct from faint replacement', () => {
    const state = makePveBattleState({
      isWildBattle: true,
      pendingPlayerSwitch: true,
      pendingPlayerSwitchReason: 'lead',
      playerParticipantIndexes: [],
      playerTeam: [
        makeBattlePokemon({ id: 'lead-1', name: 'Bulbasaur' }),
        makeBattlePokemon({ id: 'lead-2', name: 'Squirtle' }),
      ],
    })

    expect(needsPlayerLeadSelection(state)).toBe(true)
    expect(needsPlayerReplacement(state)).toBe(false)
  })

  test('lead selection is valid with a single healthy battle-team Pokemon', () => {
    const state = makePveBattleState({
      isWildBattle: true,
      pendingPlayerSwitch: true,
      pendingPlayerSwitchReason: 'lead',
      playerParticipantIndexes: [],
      playerTeam: [makeBattlePokemon({ id: 'lead-1', name: 'Bulbasaur' })],
    })

    expect(needsPlayerLeadSelection(state)).toBe(true)
    expect(needsPlayerReplacement(state)).toBe(false)
  })

  test('wild lead selection can choose any loaded battle-team Pokemon before applying the battle size cap', () => {
    const team = [
      makeBattlePokemon({ id: 'lead-1', name: 'Bulbasaur' }),
      makeBattlePokemon({ id: 'lead-2', name: 'Squirtle' }),
      makeBattlePokemon({ id: 'lead-3', name: 'Charmander' }),
    ]

    const selectedTeam = buildWildBattleSelectedTeam(team, 2, 1)

    expect(selectedTeam).toHaveLength(1)
    expect(selectedTeam[0].id).toBe('lead-3')
  })

  test('lead selection clears when no longer pending', () => {
    const state = makePveBattleState({
      isWildBattle: true,
      pendingPlayerSwitch: false,
      pendingPlayerSwitchReason: undefined,
      playerParticipantIndexes: [1],
      activePlayerIndex: 1,
      playerTeam: [
        makeBattlePokemon({ id: 'lead-1', name: 'Bulbasaur' }),
        makeBattlePokemon({ id: 'lead-2', name: 'Squirtle' }),
      ],
    })

    expect(needsPlayerLeadSelection(state)).toBe(false)
  })
})
