import { expect, test } from 'bun:test'
import type { Pokemon } from '../src/payload-types'
import { serializePokemon } from '../src/utilities/pokemon/serialize'

test('mutation serialization strips private data from populated trainer relations', () => {
  const pokemon = {
    id: 'pokemon', user: { id: 'owner', email: 'owner@example.test' },
    originalTrainer: { id: 'trainer', trainerName: 'Public Name', email: 'private@example.test',
      currency: { coins: 900 }, isAdmin: true, activeDailyTasks: [{ id: 'secret' }] },
    level: 10,
  } as unknown as Pokemon
  const serialized = serializePokemon(pokemon)
  expect(serialized.user).toBe('owner')
  expect(Object.keys(serialized.originalTrainer)).toEqual(['id', 'trainerName'])
  expect((serialized.originalTrainer as { trainerName: string }).trainerName).toBe('Public Name')
  expect(serialized.level).toBe(10)
  expect(serializePokemon({ ...pokemon, originalTrainer: 'trainer' }).originalTrainer).toBe('trainer')
})
