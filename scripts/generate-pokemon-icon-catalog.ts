import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { allPokemon } from '../src/data/pokemon'

const entries = allPokemon.flatMap((species) =>
  species.forms.map((form) => ({
    formId: form.id,
    speciesId: species.id,
    name: form.name,
  })),
)

const ids = new Set<string>()
for (const entry of entries) {
  if (ids.has(entry.formId)) {
    throw new Error(`Duplicate Pokémon form ID in icon catalog: ${entry.formId}`)
  }
  ids.add(entry.formId)
}

writeFileSync(
  join(import.meta.dir, '../src/data/user/pokemon-icon-catalog.json'),
  `${JSON.stringify(entries, null, 2)}\n`,
)

console.info(`Generated ${entries.length} Pokémon form icon records.`)
