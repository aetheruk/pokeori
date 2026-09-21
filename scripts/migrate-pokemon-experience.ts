import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import {
  getPokemonForm,
  getPokemonSpecies,
} from '../src/utilities/pokemon/pokedex'
import { getTotalPokemonExperienceForLevel } from '../src/utilities/pokemon/experience'

const PAGE_SIZE = 100

function usage() {
  console.log(`Usage: bun scripts/migrate-pokemon-experience.ts [--dry-run]

Backfills cumulative Pokémon experience from each owned Pokémon's current
level. The migration is idempotent and never lowers an existing experience
value or level.`)
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    usage()
    return
  }

  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config: payloadConfig })
  let page = 1
  let scanned = 0
  let updated = 0

  while (true) {
    const result = await payload.find({
      collection: 'pokemon',
      depth: 0,
      limit: PAGE_SIZE,
      page,
      pagination: true,
      overrideAccess: true,
    })

    for (const pokemon of result.docs) {
      scanned += 1
      const level = Math.max(1, Math.min(100, pokemon.level || 1))
      const growthRate =
        getPokemonForm(pokemon.formId)?.growth_rate ||
        getPokemonSpecies(pokemon.speciesId)?.growth_rate
      const minimumExperience = getTotalPokemonExperienceForLevel(
        growthRate,
        level,
      )
      const currentExperience =
        typeof pokemon.experience === 'number' ? pokemon.experience : 0

      if (currentExperience >= minimumExperience) continue
      updated += 1
      if (!dryRun) {
        await payload.update({
          collection: 'pokemon',
          id: pokemon.id,
          data: { experience: minimumExperience },
          overrideAccess: true,
        })
      }
    }

    if (!result.hasNextPage) break
    page += 1
  }

  console.log(
    `${dryRun ? 'Dry run complete' : 'Migration complete'}: ${scanned} Pokémon scanned, ${updated} ${dryRun ? 'would be ' : ''}updated.`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Pokémon experience migration failed:', error)
    process.exit(1)
  })
