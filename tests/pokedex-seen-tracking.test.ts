import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, test } from 'bun:test'

describe('location encounter Pokedex tracking', () => {
  test('persists seen counters through split Pokedex state', () => {
    const source = readFileSync(
      join(
        process.cwd(),
        'src/app/(frontend)/game/locations/encounter/actions/init.ts',
      ),
      'utf8',
    )

    const seenUpdate = source.indexOf('updates.pokedex = pokedexMap')
    const splitStateSave = source.indexOf(
      'await setUserPokedexMap(payload as any, user.id, updates.pokedex)',
    )

    expect(seenUpdate).toBeGreaterThan(-1)
    expect(splitStateSave).toBeGreaterThan(seenUpdate)
  })
})
