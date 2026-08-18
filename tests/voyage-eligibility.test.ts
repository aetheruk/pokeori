import { describe, expect, test } from 'bun:test'
import type { VoyageCriteria } from '@/data/voyages/types'
import { isVoyagePokemonEligible } from '@/utilities/voyages/eligibility'

const pidgey = { speciesId: 16, formId: '16', level: 20 }
const oddish = { speciesId: 43, formId: '43', level: 20 }
const pikachu = { speciesId: 25, formId: '25', level: 20 }

describe('voyage pokemon eligibility', () => {
  test('allowedTypes filters by form type case-insensitively', () => {
    const flyingOnly: VoyageCriteria = { allowedTypes: ['flying'] }
    expect(isVoyagePokemonEligible(pidgey, flyingOnly)).toBe(true)
    expect(isVoyagePokemonEligible(oddish, flyingOnly)).toBe(false)
  })

  test('allowedSpeciesIds filters by species', () => {
    expect(
      isVoyagePokemonEligible(pidgey, { allowedSpeciesIds: [16] }),
    ).toBe(true)
    expect(
      isVoyagePokemonEligible(oddish, { allowedSpeciesIds: [16] }),
    ).toBe(false)
  })

  test('allowedFormIds filters by form', () => {
    expect(isVoyagePokemonEligible(pikachu, { allowedFormIds: ['25'] })).toBe(
      true,
    )
    expect(isVoyagePokemonEligible(pidgey, { allowedFormIds: ['25'] })).toBe(
      false,
    )
  })

  test('min level bound is enforced', () => {
    expect(isVoyagePokemonEligible(pidgey, { minLevel: 15 })).toBe(true)
    expect(isVoyagePokemonEligible(pidgey, { minLevel: 25 })).toBe(false)
  })

  test('empty criteria allows everything', () => {
    expect(isVoyagePokemonEligible(oddish, {})).toBe(true)
  })
})
