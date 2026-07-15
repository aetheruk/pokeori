import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import { getPrimaryFormAbilityId, rollNaturalFormAbility } from '../src/data/abilities'
import { registerAbilityDexEntry } from '../src/utilities/pokemon/abilitydex'

const PAGE_SIZE = 100

function usage() {
  console.log(`Usage: bun scripts/backfill-pokemon-abilities.ts [--dry-run] [--limit=N]

Assigns a natural ability to owned Pokemon whose ability field is missing, null, or empty.
The script is idempotent and never overwrites an existing ability.`)
}

function parseLimit(): number | undefined {
  const arg = process.argv.find((value) => value.startsWith('--limit='))
  if (!arg) return undefined
  const value = Number(arg.slice('--limit='.length))
  return Number.isInteger(value) && value > 0 ? value : undefined
}

function getUserId(user: unknown): string | undefined {
  if (!user) return undefined
  if (typeof user === 'string') return user
  if (typeof user === 'object' && 'id' in user && typeof user.id === 'string') {
    return user.id
  }
  return undefined
}

function resolveBackfillAbility(formId: string): string | undefined {
  return rollNaturalFormAbility(formId) || getPrimaryFormAbilityId(formId)
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    usage()
    return
  }

  const dryRun = process.argv.includes('--dry-run')
  const limit = parseLimit()
  const payload = await getPayload({ config: payloadConfig })
  const skippedIds = new Set<string>()
  const abilityCounts = new Map<string, number>()
  let scanned = 0
  let updated = 0
  let skipped = 0
  let page = 1

  console.log(
    `${dryRun ? 'Dry run: scanning' : 'Backfilling'} Pokemon without abilities...`,
  )

  while (!limit || scanned < limit) {
    const remaining = limit ? Math.min(PAGE_SIZE, limit - scanned) : PAGE_SIZE
    const queryPage = dryRun ? page : page
    const result = await payload.find({
      collection: 'pokemon',
      depth: 0,
      limit: remaining,
      page: queryPage,
      where: {
        or: [
          { ability: { equals: '' } },
          { ability: { equals: null } },
          { ability: { exists: false } },
        ],
      },
      overrideAccess: true,
    })

    const docs = result.docs.filter((pokemon) => !skippedIds.has(pokemon.id))
    if (!docs.length) {
      if (!result.hasNextPage) break
      page += 1
      continue
    }

    let updatedThisPage = 0
    for (const pokemon of docs) {
      if (limit && scanned >= limit) break
      scanned += 1

      const abilityId = resolveBackfillAbility(pokemon.formId)
      const userId = getUserId(pokemon.user)
      if (!abilityId || !userId) {
        skipped += 1
        skippedIds.add(pokemon.id)
        console.warn(
          `Skipped ${pokemon.id}: ${!abilityId ? `no natural ability for form ${pokemon.formId}` : 'missing user id'}`,
        )
        continue
      }

      abilityCounts.set(abilityId, (abilityCounts.get(abilityId) || 0) + 1)

      if (!dryRun) {
        await payload.update({
          collection: 'pokemon',
          id: pokemon.id,
          data: { ability: abilityId },
          overrideAccess: true,
        })
        await registerAbilityDexEntry(payload as any, userId, abilityId, 'pokemon-backfill')
      }

      updated += 1
      updatedThisPage += 1
    }

    if (dryRun) {
      if (!result.hasNextPage) break
      page += 1
    } else {
      page = updatedThisPage > 0 ? 1 : page + 1
      if (!result.hasNextPage && updatedThisPage === 0) break
    }
  }

  const abilitySummary = [...abilityCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([abilityId, count]) => `${abilityId}:${count}`)
    .join(', ')

  console.log(
    `${dryRun ? 'Dry run complete' : 'Backfill complete'}: ${scanned} Pokemon scanned, ${updated} ${dryRun ? 'would be updated' : 'updated'}, ${skipped} skipped.`,
  )
  if (abilitySummary) console.log(`Rolled abilities: ${abilitySummary}`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Pokemon ability backfill failed:', error)
    process.exit(1)
  })
