import 'dotenv/config'

import Redis from 'ioredis'
import { MongoClient } from 'mongodb'

const expeditionIds = [
  'brock-boulder-badge-chronicle',
  'misty-cascade-badge-chronicle',
  'surge-thunder-badge-chronicle',
  'erika-rainbow-badge-chronicle',
  'koga-soul-badge-chronicle',
  'sabrina-marsh-badge-chronicle',
  'blaine-volcano-badge-chronicle',
  'giovanni-earth-badge-chronicle',
] as const

const legacyActivityPattern =
  /^chronicle-(brock|misty|surge|erika|koga|sabrina|blaine|giovanni)-/

function requireEnvironment(name: 'DATABASE_URI'): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('Usage: bun scripts/reset-gym-chronicles-v2.js [--dry-run]')
    return
  }

  const dryRun = process.argv.includes('--dry-run')
  const mongo = new MongoClient(requireEnvironment('DATABASE_URI'))
  await mongo.connect()

  try {
    const database = mongo.db()
    const expeditionRuns = database.collection('expedition-runs')
    const activityStats = database.collection('user-activity-stats')
    const runFilter = { expeditionId: { $in: [...expeditionIds] } }
    const statsFilter = {
      $or: [
        {
          activityType: 'expedition',
          activityId: { $in: [...expeditionIds] },
        },
        { activityId: legacyActivityPattern },
      ],
    }

    const [runs, stats] = await Promise.all([
      expeditionRuns.find(runFilter).project({ user: 1 }).toArray(),
      activityStats.find(statsFilter).project({ user: 1 }).toArray(),
    ])
    const users = new Set(
      [...runs, ...stats]
        .map((document) => String(document.user || ''))
        .filter(Boolean),
    )

    let deletedRuns = runs.length
    let deletedStats = stats.length
    if (!dryRun) {
      const [runResult, statsResult] = await Promise.all([
        expeditionRuns.deleteMany(runFilter),
        activityStats.deleteMany(statsFilter),
      ])
      deletedRuns = runResult.deletedCount
      deletedStats = statsResult.deletedCount
    }

    let redisKeys = 0
    if (process.env.REDIS_URL && users.size > 0) {
      const redis = new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
      })
      await redis.connect()
      try {
        const keys = [...users].flatMap((userId) => [
          `game:${userId}`,
          `research:${userId}`,
          `battle:${userId}`,
        ])
        redisKeys = dryRun
          ? (await Promise.all(keys.map((key) => redis.exists(key)))).reduce(
              (sum, exists) => sum + exists,
              0,
            )
          : await redis.del(...keys)
      } finally {
        await redis.quit()
      }
    }

    console.log(
      `${dryRun ? 'Dry run' : 'Reset'} complete: ${deletedRuns} Chronicle runs, ` +
        `${deletedStats} legacy activity rows, ${redisKeys} active Redis sessions, ` +
        `${users.size} affected players.`,
    )
  } finally {
    await mongo.close()
  }
}

main().catch((error) => {
  console.error('Gym Chronicle v2 reset failed:', error)
  process.exitCode = 1
})
