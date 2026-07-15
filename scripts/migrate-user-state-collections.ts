import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import {
  syncUserStateCollectionsFromLegacyUser,
  type UserStateSyncSummary,
} from '../src/utilities/user-state'

const PAGE_SIZE = 50

function usage() {
  console.log(`Usage: bun scripts/migrate-user-state-collections.ts [--dry-run]

Expands legacy users JSON state into normalized user state collections.
The migration is idempotent and does not remove legacy users fields.`)
}

function mergeSummary(
  summary: UserStateSyncSummary,
  nextSummary: UserStateSyncSummary,
): UserStateSyncSummary {
  return {
    created: summary.created + nextSummary.created,
    updated: summary.updated + nextSummary.updated,
    deleted: summary.deleted + nextSummary.deleted,
  }
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    usage()
    return
  }

  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config: payloadConfig })
  let page = 1
  let processedUsers = 0
  let totals: UserStateSyncSummary = { created: 0, updated: 0, deleted: 0 }

  console.log(`${dryRun ? 'Dry run: scanning' : 'Migrating'} user state collections...`)

  while (true) {
    const users = await payload.find({
      collection: 'users',
      depth: 0,
      limit: PAGE_SIZE,
      page,
      overrideAccess: true,
    })

    for (const user of users.docs) {
      const summary = await syncUserStateCollectionsFromLegacyUser(payload as any, user, {
        dryRun,
      })
      totals = mergeSummary(totals, summary)
      processedUsers += 1

      if (summary.created || summary.updated || summary.deleted) {
        console.log(
          `${user.id}: create ${summary.created}, update ${summary.updated}, delete ${summary.deleted}`,
        )
      }
    }

    if (!users.hasNextPage) break
    page += 1
  }

  console.log(
    `${dryRun ? 'Dry run complete' : 'Migration complete'}: ${processedUsers} users scanned, ${totals.created} rows to create, ${totals.updated} rows to update, ${totals.deleted} rows to delete.`,
  )
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('User state migration failed:', error)
    process.exit(1)
  })
