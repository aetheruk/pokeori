import { describe, expect, test } from 'bun:test'
import { ALL_ABILITY_DEX_ENTRIES } from '@/utilities/pokemon/abilitydex'
import { getAbilityDexDisplayEntries } from '@/utilities/pokemon/abilitydex-view'

const FIXTURE_ENTRIES = [...ALL_ABILITY_DEX_ENTRIES]
  .sort((left, right) => right.abilityId.localeCompare(left.abilityId))
  .slice(0, 8)

describe('AbilityDex display filtering', () => {
  test('known view contains only registered records in stable name order', () => {
    const registered = new Set(
      FIXTURE_ENTRIES.slice(0, 3).map((entry) => entry.abilityId),
    )

    const result = getAbilityDexDisplayEntries({
      entries: FIXTURE_ENTRIES,
      registeredAbilityIds: registered,
      view: 'known',
      query: '',
    })

    expect(result.map(({ entry }) => entry.abilityId).sort()).toEqual(
      [...registered].sort(),
    )
    expect(result.every((ability) => ability.isKnown)).toBe(true)
    expect(result.map(({ entry }) => entry.ability.name)).toEqual(
      result
        .map(({ entry }) => entry.ability.name)
        .sort((left, right) => left.localeCompare(right)),
    )
  })

  test('all view places registered records first and orders each group deterministically', () => {
    const registered = new Set([
      FIXTURE_ENTRIES[1]!.abilityId,
      FIXTURE_ENTRIES[4]!.abilityId,
    ])

    const result = getAbilityDexDisplayEntries({
      entries: FIXTURE_ENTRIES,
      registeredAbilityIds: registered,
      view: 'all',
      query: '',
    })
    const known = result.filter((ability) => ability.isKnown)
    const unknown = result.filter((ability) => !ability.isKnown)

    expect(
      result.slice(0, known.length).every((ability) => ability.isKnown),
    ).toBe(true)
    expect(known.map(({ entry }) => entry.ability.name)).toEqual(
      known
        .map(({ entry }) => entry.ability.name)
        .sort((left, right) => left.localeCompare(right)),
    )
    expect(unknown.map(({ entry }) => entry.abilityId)).toEqual(
      unknown
        .map(({ entry }) => entry.abilityId)
        .sort((left, right) => left.localeCompare(right)),
    )
  })

  test('search never matches the concealed name of an unknown record', () => {
    const knownEntry = FIXTURE_ENTRIES[0]!
    const hiddenEntry = FIXTURE_ENTRIES[1]!
    const result = getAbilityDexDisplayEntries({
      entries: FIXTURE_ENTRIES,
      registeredAbilityIds: new Set([knownEntry.abilityId]),
      view: 'all',
      query: hiddenEntry.ability.name,
    })

    expect(
      result.some(({ entry }) => entry.abilityId === hiddenEntry.abilityId),
    ).toBe(false)
    expect(result.every((ability) => ability.isKnown)).toBe(true)
  })

  test('search is trimmed and case-insensitive for registered records', () => {
    const knownEntry = FIXTURE_ENTRIES[0]!
    const result = getAbilityDexDisplayEntries({
      entries: FIXTURE_ENTRIES,
      registeredAbilityIds: new Set([knownEntry.abilityId]),
      view: 'known',
      query: `  ${knownEntry.ability.name.toUpperCase()}  `,
    })

    expect(result.map(({ entry }) => entry.abilityId)).toEqual([
      knownEntry.abilityId,
    ])
  })
})
