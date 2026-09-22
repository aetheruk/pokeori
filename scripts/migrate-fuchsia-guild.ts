import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import { grantRewards } from '../src/utilities/rewards/reward-logic'
import {
  getUserCompletedTasksMap,
  getUserInventoryMap,
  getUserShopPurchasesRecord,
} from '../src/utilities/user-state'
import {
  calculateLegacyFuchsiaGuildXp,
  FUCHSIA_GUILD_ID,
} from '../src/utilities/guilds/legacy-fuchsia'
import type { GuildsData } from '../src/types/user-data'

const PAGE_SIZE = 100

function usage() {
  console.log(`Usage: bun run migrate:fuchsia-guild [--dry-run]

Converts legacy Safari Notes plus recorded Research Exchange spending into
cumulative Fuchsia Research Guild XP. The migration is idempotent.`)
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
      if (guilds[FUCHSIA_GUILD_ID]?.legacyImportedAt) continue

      const [completedTasks, purchases, inventory] = await Promise.all([
        getUserCompletedTasksMap(payload as any, user.id),
        getUserShopPurchasesRecord(payload as any, user.id),
        getUserInventoryMap(payload as any, user.id),
      ])
      const isMember =
        Boolean(completedTasks['fuchsia-research-institute-membership']) ||
        (inventory['safari-research-pass'] || 0) > 0 ||
        (guilds[FUCHSIA_GUILD_ID]?.rank || 0) > 0
      if (!isMember) continue

      eligible += 1
      const legacy = calculateLegacyFuchsiaGuildXp({
        safariNotes: (user.currency as any)?.['safari-notes'],
        completedTasks,
        shopPurchases: purchases,
        unlockedIcons: user.unlockedIcons,
        unlockedTitles: user.unlockedTitles,
      })
      const current = guilds[FUCHSIA_GUILD_ID]
      const currentXp = Math.max(0, Math.floor(current?.xp || 0))
      const targetXp = Math.max(currentXp, legacy.xp)
      updated += 1

      if (dryRun) {
        console.log(
          `[dry-run] ${user.id}: ${currentXp} -> ${targetXp} XP (Rank ${legacy.rank})`,
        )
        continue
      }

      if (!current?.rank) {
        const joinedAt =
          completedTasks['fuchsia-research-institute-membership']?.completedAt ||
          new Date().toISOString()
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            guilds: {
              ...guilds,
              [FUCHSIA_GUILD_ID]: {
                rank: 1,
                xp: 0,
                joinedAt,
                rewardedThroughRank: 1,
              },
            },
          } as any,
          overrideAccess: true,
        })
      }

      await grantRewards(
        user.id,
        [
          {
            type: 'guild_xp',
            targetId: FUCHSIA_GUILD_ID,
            quantity: Math.max(0, targetXp - currentXp),
          },
        ],
        {
          payload,
          skipDropChance: true,
          idempotencyKey: `migrate-fuchsia-guild:${user.id}`,
        },
      )

      const freshUser = await payload.findByID({
        collection: 'users',
        id: user.id,
        depth: 0,
        overrideAccess: true,
      })
      const freshGuilds = ((freshUser as any).guilds || {}) as GuildsData
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          guilds: {
            ...freshGuilds,
            [FUCHSIA_GUILD_ID]: {
              ...freshGuilds[FUCHSIA_GUILD_ID],
              legacyImportedAt: new Date().toISOString(),
            },
          },
        } as any,
        overrideAccess: true,
      })
    }

    if (!result.hasNextPage) break
    page += 1
  }

  console.log(
    `${dryRun ? 'Dry run complete' : 'Migration complete'}: ${scanned} users scanned, ${eligible} eligible, ${updated} ${dryRun ? 'would be ' : ''}updated.`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fuchsia guild migration failed:', error)
    process.exit(1)
  })
