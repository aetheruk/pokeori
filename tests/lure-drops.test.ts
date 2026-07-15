import { describe, expect, test } from 'bun:test'
import {
  buildFieldObservationLureRewards,
  getLureDropChanceFromPokemonLevel,
} from '@/utilities/research/lure-drops'
import type { FieldObservationRewardSubject } from '@/utilities/research/field-observation'

describe('field observation lure drops', () => {
  test('uses the authored sliding level-based lure drop chance', () => {
    expect(getLureDropChanceFromPokemonLevel(1)).toBe(8)
    expect(getLureDropChanceFromPokemonLevel(50)).toBe(19)
    expect(getLureDropChanceFromPokemonLevel(100)).toBe(30)
  })

  test('field observation no longer drops direct lures', () => {
    const subjects: FieldObservationRewardSubject[] = [
      { speciesId: 16, formId: '16', level: 100, pokemonResearchXp: 1 }, // normal/flying
      { speciesId: 25, formId: '25', level: 100, pokemonResearchXp: 1 }, // electric
      { speciesId: 149, formId: '149', level: 100, pokemonResearchXp: 1 }, // dragon/flying
    ]

    expect(buildFieldObservationLureRewards(subjects, 100)).toEqual([])
  })
})
