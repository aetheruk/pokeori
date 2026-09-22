import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import {
  calculateFuchsiaInstituteBalanceV2,
  FUCHSIA_GUILD_ID,
  needsFuchsiaSafariBallBackfill,
} from '../src/utilities/guilds/legacy-fuchsia'
import {
  getUserCompletedTasksMap,
  getUserInventoryMap,
  setUserCompletedTasksMap,
} from '../src/utilities/user-state'
import type { GuildsData } from '../src/types/user-data'

const PAGE_SIZE = 100

function usage() {
  console.log(`Usage: bun run migrate:fuchsia-institute-v2 [--dry-run]

Grants the new 100 Institute XP Catching Permit award and preserves rewards
earned before the Institute rank ladder shifted upward. It also reconciles the
Rank 9 Safari Ball profile icon. The migration is idempotent.`)
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
    const result = await payload.find({
      collection: 'users',
      depth: 0,
      limit: PAGE_SIZE,
      page,
      pagination: true,
      overrideAccess: true,
    })

    for (const user of result.docs) {
      scanned += 1
      const guilds = ((user as any).guilds || {}) as GuildsData
      const progress = guilds[FUCHSIA_GUILD_ID]
      if (!progress?.rank) continue

      const needsBalance = !progress.instituteBalanceV2MigratedAt
      const unlockedIcons = Array.isArray((user as any).unlockedIcons)
        ? ((user as any).unlockedIcons as string[])
        : []
      const needsSafariBall = needsFuchsiaSafariBallBackfill({
        progress,
        unlockedIcons,
      })
      if (!needsBalance && !needsSafariBall) continue

      eligible += 1
      const completedTasks = needsBalance
        ? await getUserCompletedTasksMap(payload as any, user.id)
        : {}
      const inventory = needsBalance
        ? await getUserInventoryMap(payload as any, user.id)
        : {}
      const next = needsBalance
        ? calculateFuchsiaInstituteBalanceV2({
            progress,
            hasCatchingPermit:
              (inventory['safari-catching-permit'] || 0) > 0 ||
              Boolean(completedTasks['fuchsia-koga-study-toxin']),
          })
        : {
            xp: Math.max(0, Math.floor(progress.xp || 0)),
            rank: Math.max(1, Math.floor(progress.rank || 1)),
            rewardedThroughRank: Math.max(
              1,
              Math.floor(progress.rewardedThroughRank || progress.rank || 1),
            ),
          }
      const currentStaminaNotes = Math.max(
        0,
        Math.floor(completedTasks['safari-stamina-notes']?.count || 0),
      )
      const expectedStaminaNotes = Math.min(5, Math.max(0, next.rank - 2))
      const targetStaminaNotes = Math.max(
        currentStaminaNotes,
        expectedStaminaNotes,
      )

      if (dryRun) {
        console.log(
          `[dry-run] ${user.id}: ${progress.xp || 0} -> ${next.xp} XP, ` +
            `Rank ${progress.rank} -> ${next.rank}, rewards through ${next.rewardedThroughRank}, ` +
            `Safari Ball ${needsSafariBall ? 'to grant' : 'already owned'}`,
        )
        continue
      }

      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          ...(needsBalance
            ? {
                guilds: {
                  ...guilds,
                  [FUCHSIA_GUILD_ID]: {
                    ...progress,
                    ...next,
                    instituteBalanceV2MigratedAt: new Date().toISOString(),
                  },
                },
              }
            : {}),
          ...(needsSafariBall
            ? { unlockedIcons: [...unlockedIcons, 'safari-ball'] }
            : {}),
        } as any,
        overrideAccess: true,
      })
      if (needsBalance && targetStaminaNotes > currentStaminaNotes) {
        completedTasks['safari-stamina-notes'] = {
          ...completedTasks['safari-stamina-notes'],
          count: targetStaminaNotes,
          completedAt:
            completedTasks['safari-stamina-notes']?.completedAt ||
            new Date().toISOString(),
        }
        await setUserCompletedTasksMap(
          payload as any,
          user.id,
          completedTasks,
        )
      }
      updated += 1
    }

    if (!result.hasNextPage) break
    page += 1
  }

  console.log(
    `${dryRun ? 'Dry run complete' : 'Migration complete'}: ${scanned} users scanned, ` +
      `${eligible} eligible, ${updated} ${dryRun ? 'would be ' : ''}updated.`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fuchsia Institute balance migration failed:', error)
    process.exit(1)
  })
