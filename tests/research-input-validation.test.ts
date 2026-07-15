import { describe, expect, test } from 'bun:test'
import {
  validateResearchEncounterId,
  validateResearchAnswer,
  validateResearchCompletionInput,
  validateResearchStartInput,
} from '@/utilities/research/input-validation'

describe('research input validation', () => {
  test('accepts only bounded id answers for id-based games', () => {
    expect(validateResearchAnswer('identify', 25).success).toBe(true)
    expect(validateResearchAnswer('identify', 'poke-ball').success).toBe(true)
    expect(
      validateResearchAnswer('field-observation', 'species:16').success,
    ).toBe(true)
    expect(
      validateResearchAnswer('field-observation', {
        type: 'count-survey',
        counts: { '16:16': 2, '19:19': 0 },
      }).success,
    ).toBe(true)
    expect(
      validateResearchAnswer('field-observation', {
        type: 'count-survey',
        counts: { '../bad': 1 },
      }).success,
    ).toBe(false)
    expect(
      validateResearchAnswer('identify', ''.padEnd(129, 'x')).success,
    ).toBe(false)
    expect(validateResearchAnswer('identify', { answer: 25 }).success).toBe(
      false,
    )
  })

  test('accepts boolean answers for realtime games', () => {
    expect(validateResearchAnswer('run', true).success).toBe(true)
    expect(validateResearchAnswer('flap', false).success).toBe(true)
    expect(validateResearchAnswer('mining', 'true').success).toBe(false)
  })

  test('validates structured spelling and sliding puzzle payloads', () => {
    expect(validateResearchAnswer('spelling', { letter: 'A' }).success).toBe(
      true,
    )
    expect(validateResearchAnswer('spelling', { letter: 'AB' }).success).toBe(
      false,
    )
    expect(
      validateResearchAnswer('sliding-puzzle', { moveTileIndex: 15 }).success,
    ).toBe(true)
    expect(
      validateResearchAnswer('sliding-puzzle', { moveTileIndex: -1 }).success,
    ).toBe(false)
  })

  test('rejects unsupported submit paths and invalid completion numbers', () => {
    expect(validateResearchAnswer('slots', true).success).toBe(false)
    expect(validateResearchCompletionInput(true, 500, 3).success).toBe(true)
    expect(
      validateResearchCompletionInput(true, 500, 0, { '0:0': 2 }).success,
    ).toBe(true)
    expect(
      validateResearchCompletionInput(true, undefined, undefined, undefined, [
        'debug-poke-ball',
        'debug-poke-ball',
        'debug-battle-potion',
      ]).value?.collectedRockPushRewardIds,
    ).toEqual(['debug-poke-ball', 'debug-battle-potion'])
    expect(validateResearchCompletionInput('true', 500, 3).success).toBe(false)
    expect(validateResearchCompletionInput(true, Number.NaN, 0).success).toBe(
      false,
    )
    expect(validateResearchCompletionInput(true, 100, 1001).success).toBe(false)
    expect(
      validateResearchCompletionInput(true, 100, 0, { bad: 1 }).success,
    ).toBe(false)
    expect(
      validateResearchCompletionInput(true, 100, 0, { '0:0': 10_001 }).success,
    ).toBe(false)
    expect(
      validateResearchCompletionInput(true, undefined, undefined, undefined, [
        '../bad',
      ]).success,
    ).toBe(false)
  })

  test('bounds encounter ids and deduplicates consumed Pokemon ids', () => {
    expect(validateResearchEncounterId('run:pewter-city-1').success).toBe(true)
    expect(validateResearchEncounterId('../bad').success).toBe(false)

    const result = validateResearchStartInput('run:pewter-city-1', false, [
      'abc',
      'abc',
      'def',
    ])
    expect(result.success).toBe(true)
    expect(result.value?.forceReset).toBe(false)
    expect(result.value?.consumedPokemonIds).toEqual(['abc', 'def'])

    expect(
      validateResearchStartInput('run:pewter-city-1', 'false').success,
    ).toBe(false)
    expect(
      validateResearchStartInput(
        'run:pewter-city-1',
        false,
        Array(101).fill('abc'),
      ).success,
    ).toBe(false)
  })
})
