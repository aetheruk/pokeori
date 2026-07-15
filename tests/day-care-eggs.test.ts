import { describe, expect, test } from 'bun:test'
import {
  DAY_CARE_EGG_POOLS,
  getEggPoolCandidates,
  rollEggHatch,
} from '@/utilities/day-care/eggs'

describe('Day Care eggs', () => {
  const pokedex = {
    '1': { '1': { caught: true, seen: true } },
    '4': { '4': { caught: false, seen: true } },
    '144': { '144': { caught: true, seen: true } },
  } as any

  test('excludes legendary and mythical forms from caught candidates', () => {
    const caught = getEggPoolCandidates(DAY_CARE_EGG_POOLS[0], pokedex)
    expect(caught).toEqual(['1'])
  })

  test('uses the configured pool weights and resolves at hatch time', () => {
    const result = rollEggHatch(pokedex, 1, () => 0, DAY_CARE_EGG_POOLS)
    expect(result).toMatchObject({ poolId: 'caught', formId: '1', speciesId: 1 })
  })
})
