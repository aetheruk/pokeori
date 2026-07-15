import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import pokemonData from '@/data/pokemon-data'

const formIds = new Set(
  pokemonData.flatMap((species) => species.forms.map((form) => form.id)),
)

const pokemonFormExclusions = JSON.parse(
  readFileSync(
    join(process.cwd(), 'scripts/pokemon-form-exclusions.json'),
    'utf-8',
  ),
) as {
  excludedFormIds?: unknown[]
}

describe('Pokemon form exclusions', () => {
  test('generated Pokemon data does not include deliberately excluded form IDs', () => {
    expect(Array.isArray(pokemonFormExclusions.excludedFormIds)).toBe(true)

    for (const formId of pokemonFormExclusions.excludedFormIds || []) {
      expect(typeof formId).toBe('string')
      if (typeof formId !== 'string') continue
      expect(formIds.has(formId)).toBe(false)
    }
  })
})
