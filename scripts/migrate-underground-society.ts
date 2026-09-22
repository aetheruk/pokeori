import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import { getUserCompletedTasksMap } from '../src/utilities/user-state'
import { UNDERGROUND_SOCIETY_GUILD_ID } from '../src/data/guilds/underground-society'
import type { GuildsData } from '../src/types/user-data'

const PAGE_SIZE = 100

function usage() {
  console.log(`Usage: bun run migrate:underground-society [--dry-run]

Adds Rank 1 Underground Society membership for existing Society recruits.
The migration does not award historical XP and does not mark set showcase
tasks complete, so completed collections remain claimable. It is idempotent.`)
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
  let eligible = 0
  let updated = 0

  while (true) {
    const result = await payload.find({ collection: 'users', depth: 0, limit: PAGE_SIZE, page, pagination: true, overrideAccess: true })
    for (const user of result.docs) {
      scanned += 1
      const guilds = ((user as any).guilds || {}) as GuildsData
      const current = guilds[UNDERGROUND_SOCIETY_GUILD_ID]
      if (current?.undergroundSocietyMigratedAt) continue
      const completedTasks = await getUserCompletedTasksMap(payload as any, user.id)
      const membershipTask = completedTasks['underground-tcg-basic-training']
      if (!current?.rank && !membershipTask) continue
      eligible += 1
      updated += 1
      if (dryRun) {
        console.log(`[dry-run] ${user.id}: Underground Society -> Rank 1, 0 XP`)
        continue
      }
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          guilds: {
            ...guilds,
            [UNDERGROUND_SOCIETY_GUILD_ID]: {
              rank: 1,
              xp: 0,
              joinedAt: current?.joinedAt || membershipTask?.completedAt || new Date().toISOString(),
              rewardedThroughRank: 1,
              undergroundSocietyMigratedAt: new Date().toISOString(),
            },
          },
        } as any,
        overrideAccess: true,
      })
    }
    if (!result.hasNextPage) break
    page += 1
  }
  console.log(`${dryRun ? 'Dry run complete' : 'Migration complete'}: ${scanned} users scanned, ${eligible} eligible, ${updated} ${dryRun ? 'would be ' : ''}updated.`)
}

main().then(() => process.exit(0)).catch((error) => {
  console.error('Underground Society migration failed:', error)
  process.exit(1)
})
