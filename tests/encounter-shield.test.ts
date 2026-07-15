import { describe, expect, test } from 'bun:test'
import type { EncounterState } from '@/app/(frontend)/game/locations/encounter/actions/types'
import {
  applyCorrectAnswerToShield,
  applyIncorrectAnswerToShield,
  refreshEncounterShield,
  serializeEncounterShield,
} from '@/app/(frontend)/game/locations/encounter/actions/shield'

function buildShieldedState(
  type: 'consecutive' | 'total',
  requiredCorrectAnswers: number,
): EncounterState {
  return {
    userId: 'user-1',
    locationId: 'test-location',
    pokemonId: 150,
    formId: '150',
    isShiny: false,
    startTime: 1000,
    expiry: 61000,
    baseCatchRate: 30,
    currentCatchRate: 0,
    questionsAnswered: [],
    itemsUsed: [],
    totalCorrectAnswers: 0,
    consecutiveCorrectAnswers: 0,
    shield: {
      config: {
        type,
        requiredCorrectAnswers,
      },
      active: true,
      correctAnswers: 0,
      consecutiveCorrectAnswers: 0,
      brokenCount: 0,
    },
  }
}

describe('encounter shield helpers', () => {
  test('consecutive shields reset progress on incorrect answers', () => {
    const state = buildShieldedState('consecutive', 2)

    expect(applyCorrectAnswerToShield(state, 2000)).toEqual({
      wasShielded: true,
      brokeShield: false,
    })
    expect(state.shield?.consecutiveCorrectAnswers).toBe(1)

    expect(applyIncorrectAnswerToShield(state)).toBe(true)
    expect(state.shield?.correctAnswers).toBe(1)
    expect(state.shield?.consecutiveCorrectAnswers).toBe(0)

    expect(applyCorrectAnswerToShield(state, 3000).brokeShield).toBe(false)
    expect(applyCorrectAnswerToShield(state, 4000).brokeShield).toBe(true)
    expect(state.shield).toBeUndefined()
    expect(state.currentCatchRate).toBe(30)
  })

  test('total shields count all correct answers in the current bubble cycle', () => {
    const state = buildShieldedState('total', 2)

    expect(applyCorrectAnswerToShield(state, 2000).brokeShield).toBe(false)
    expect(applyIncorrectAnswerToShield(state)).toBe(true)
    expect(applyCorrectAnswerToShield(state, 3000).brokeShield).toBe(true)
    expect(state.shield).toBeUndefined()
    expect(state.currentCatchRate).toBe(30)
  })

  test('non-regenerating shields stay gone after the first break', () => {
    const state = buildShieldedState('consecutive', 1)

    expect(applyCorrectAnswerToShield(state, 2000)).toEqual({
      wasShielded: true,
      brokeShield: true,
    })
    expect(state.shield).toBeUndefined()

    state.currentCatchRate = 45
    expect(refreshEncounterShield(state, 3000)).toBe(false)
    expect(applyCorrectAnswerToShield(state, 3000)).toEqual({
      wasShielded: false,
      brokeShield: false,
    })
    expect(state.shield).toBeUndefined()
    expect(state.currentCatchRate).toBe(45)
  })

  test('regenerating shields come back without resetting catch rate', () => {
    const state = buildShieldedState('consecutive', 1)
    state.shield!.config.regenSeconds = 5

    expect(applyCorrectAnswerToShield(state, 2000).brokeShield).toBe(true)
    state.currentCatchRate = 45
    expect(state.shield?.nextRegenAt).toBe(7000)

    expect(refreshEncounterShield(state, 6999)).toBe(false)
    expect(state.shield?.active).toBe(false)

    expect(refreshEncounterShield(state, 7000)).toBe(true)
    expect(state.shield?.active).toBe(true)
    expect(state.shield?.correctAnswers).toBe(0)
    expect(state.shield?.consecutiveCorrectAnswers).toBe(0)
    expect(state.currentCatchRate).toBe(45)
  })

  test('serialized shields include custom bubble colors', () => {
    const state = buildShieldedState('consecutive', 3)
    state.shield!.config.bubbleColor = '#a78bfa'

    expect(serializeEncounterShield(state)?.bubbleColor).toBe('#a78bfa')
  })
})
