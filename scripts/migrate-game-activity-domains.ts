import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import { allGames } from '../src/data/games'
import { classifyLegacyActivityId } from '../src/utilities/games/activity-domain'

const PAGE_SIZE = 100
const knownGameIds = new Set(allGames.map((entry) => entry.id))

function relationId(value: unknown): string {
  if (value && typeof value === 'object' && 'id' in value) {
    return String((value as { id: unknown }).id)
  }
  return String(value || '')
}

function latestDate(left: unknown, right: unknown): string | null {
  const values = [left, right]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .sort()
  return values.at(-1) || null
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`Usage: bun scripts/migrate-game-activity-domains.ts [--dry-run]

Splits legacy user activity rows from "research" into "game" and
"field-research". The migration is idempotent. Run with --dry-run first.`)
    return
  }

  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config: payloadConfig })
  let page = 1
  let scanned = 0
  let migrated = 0
  let merged = 0
  let unknown = 0

  while (true) {
    const result = await payload.find({
      collection: 'user-activity-stats',
      where: { activityType: { equals: 'research' } },
      depth: 0,
      limit: PAGE_SIZE,
      page: dryRun ? page : 1,
      sort: 'id',
      overrideAccess: true,
    })

    if (result.docs.length === 0) break

    for (const legacy of result.docs as any[]) {
      scanned += 1
      const activityId = String(legacy.activityId)
      const userId = relationId(legacy.user)
      const activityType = classifyLegacyActivityId(activityId)
      if (!knownGameIds.has(activityId)) unknown += 1

      const canonical = await payload.find({
        collection: 'user-activity-stats',
        where: {
          and: [
            { user: { equals: userId } },
            { activityType: { equals: activityType } },
            { activityId: { equals: activityId } },
          ],
        },
        depth: 0,
        limit: 1,
        overrideAccess: true,
      })
      const existing = canonical.docs[0] as any

      if (existing) {
        merged += 1
        if (!dryRun) {
          await payload.update({
            collection: 'user-activity-stats',
            id: existing.id,
            data: {
              wins: Number(existing.wins || 0) + Number(legacy.wins || 0),
              losses: Number(existing.losses || 0) + Number(legacy.losses || 0),
              highScore: Math.max(
                Number(existing.highScore || 0),
                Number(legacy.highScore || 0),
              ) || undefined,
              lastPlayed: latestDate(existing.lastPlayed, legacy.lastPlayed),
              metadata: {
                ...(legacy.metadata || {}),
                ...(existing.metadata || {}),
              },
            },
            overrideAccess: true,
          })
          await payload.delete({
            collection: 'user-activity-stats',
            id: legacy.id,
            overrideAccess: true,
          })
        }
      } else if (!dryRun) {
        await payload.update({
          collection: 'user-activity-stats',
          id: legacy.id,
          data: { activityType },
          overrideAccess: true,
        })
      }

      migrated += 1
    }

    if (dryRun) {
      if (!result.hasNextPage) break
      page += 1
    }
  }

  console.log(
    `${dryRun ? 'Dry run' : 'Migration'} complete: ${scanned} legacy rows scanned, ` +
      `${migrated} classified, ${merged} canonical duplicates ${dryRun ? 'would be ' : ''}merged, ` +
      `${unknown} unknown IDs classified as game.`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Game activity domain migration failed:', error)
    process.exit(1)
  })
