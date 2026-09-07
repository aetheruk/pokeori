import { expect, test } from 'bun:test'
import { PokemonBoxQuery } from '@/utilities/pokemon/box-query'

test('box paging rejects unbounded and malformed caller-supplied queries', () => {
  expect(PokemonBoxQuery.parse({})).toEqual({ page: 1, limit: 24 })
  expect(PokemonBoxQuery.parse({ page: 2, limit: 18, boxId: null }).page).toBe(2)
  for (const input of [{ limit: 0 }, { limit: 10000 }, { page: -1 }, { page: NaN }, { page: 1.5 }, { boxId: { user: 'other' } }]) {
    expect(PokemonBoxQuery.safeParse(input).success).toBe(false)
  }
})
