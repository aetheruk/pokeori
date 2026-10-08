import { describe, expect, test } from 'bun:test'
import { resolveEncounterMusic } from '@/utilities/pokemon/encounter-music'

describe('encounter music', () => {
  test('Alpha captures keep battle music instead of the location track', () => {
    expect(
      resolveEncounterMusic(
        { music: '/music/seaside.m4a', subCategory: 'Pallet Town' },
        true,
      ),
    ).toBe('/music/battle.m4a')
  })

  test('ordinary captures retain their location track', () => {
    expect(
      resolveEncounterMusic(
        { subCategory: 'Pallet Town' },
        false,
      ),
    ).toBe('/music/seaside.m4a')
  })
})
