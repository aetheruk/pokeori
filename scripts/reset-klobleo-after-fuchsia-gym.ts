import 'dotenv/config'

import Redis from 'ioredis'
import { MongoClient, ObjectId } from 'mongodb'

import {
  safariExtraTaskPoolIds,
  safariFlavorTaskPoolIds,
  safariItemTaskPoolIds,
  safariResearchTaskPoolIds,
} from '@/data/tasks/entries/safari-zone-expedition'

const userId = new ObjectId('6a2d77e99fb351e028e0db21')
const userIdString = userId.toHexString()

const postGymTaskIds = new Set([
  'fuchsia-koga-study-toxin',
  'fuchsia-koga-unknown-compound',
  'fuchsia-koga-egg-request',
  'fuchsia-research-institute-chansey-request',
  'safari-chansey-search-complete',
  'safari-chansey-lure',
  'safari-chansey-makes-friends',
  'safari-catch-partner-chansey',
  'safari-strength-check-on-koga',
  'fuchsia-accidental-offense',
  'fuchsia-crudely-drawn-flyer',
  'fuchsia-billiam-storage-upgrade',
  'fuchsia-build-in-bulk',
  'good-rod-recipe',
  'safari-researcher-responsibility',
  'safari-explorers-research-notes',
  'safari-material-deposit-reports',
  'safari-notes-on-poachers',
  'safari-fishing-research-notes',
  'safari-extra-habitat-field-notes',
  'safari-rare-item-rumours',
  'safari-rewilding',
  'safari-stamina-notes',
])

const expeditionTaskIds = new Set([
  ...safariResearchTaskPoolIds.common,
  ...safariResearchTaskPoolIds.uncommon,
  ...safariResearchTaskPoolIds.rare,
  ...Object.values(safariFlavorTaskPoolIds).flat(),
  ...safariItemTaskPoolIds.materials,
  ...safariItemTaskPoolIds.balls,
  ...safariItemTaskPoolIds.gems,
  ...safariItemTaskPoolIds.currency,
  ...safariItemTaskPoolIds.safariBalls,
  ...safariItemTaskPoolIds.rare,
  ...safariExtraTaskPoolIds.flavor,
  ...safariExtraTaskPoolIds.research,
  ...safariExtraTaskPoolIds.materials,
  ...safariExtraTaskPoolIds.safariBalls,
  ...safariExtraTaskPoolIds.rare,
  ...safariExtraTaskPoolIds.rests,
])

const resetTaskIds = new Set([...postGymTaskIds, ...expeditionTaskIds])

function requireEnvironment(name: 'DATABASE_URI'): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const mongo = new MongoClient(requireEnvironment('DATABASE_URI'))
  await mongo.connect()

  try {
    const database = mongo.db()
    const users = database.collection('users')
    const taskProgress = database.collection('user-task-progresses')
    const activityStats = database.collection('user-activity-stats')
    const expeditionRuns = database.collection('expedition-runs')
    const inventory = database.collection('user-inventory-items')

    const taskFilter = { user: userId, taskId: { $in: [...resetTaskIds] } }
    const activityFilter = {
      user: userId,
      $or: [
        { activityType: 'expedition', activityId: 'safari-zone-grand-expedition' },
        { activityType: 'game', activityId: 'safari-chansey-search-snap' },
      ],
    }
    const runFilter = {
      user: userId,
      expeditionId: 'safari-zone-grand-expedition',
    }

    const [tasks, activities, runs, user, inventoryRows] = await Promise.all([
      taskProgress.find(taskFilter).project({ taskId: 1, count: 1 }).toArray(),
      activityStats.find(activityFilter).project({ activityType: 1, activityId: 1 }).toArray(),
      expeditionRuns.find(runFilter).project({ _id: 1, status: 1 }).toArray(),
      users.findOne({ _id: userId }, { projection: { username: 1, maxPokemon: 1 } }),
      inventory.find({
        user: userId,
        itemId: { $in: ['safari-catching-permit', 'rocket-poison-vial', 'red-berry-candy', 'tm-strength'] },
      }).project({ itemId: 1, quantity: 1 }).toArray(),
    ])

    if (!user) throw new Error(`User ${userIdString} was not found`)

    console.log(JSON.stringify({
      dryRun,
      user: { id: userIdString, username: user.username, maxPokemon: user.maxPokemon },
      taskRows: tasks,
      activityRows: activities,
      expeditionRuns: runs,
      inventory: inventoryRows,
      resetTaskCount: resetTaskIds.size,
    }, null, 2))

    if (!dryRun) {
      await Promise.all([
        taskProgress.deleteMany(taskFilter),
        activityStats.deleteMany(activityFilter),
        expeditionRuns.deleteMany(runFilter),
        users.updateOne({ _id: userId }, { $set: { maxPokemon: 100 } }),
        inventory.deleteMany({
          user: userId,
          itemId: { $in: ['safari-catching-permit', 'tm-strength'] },
        }),
        inventory.updateOne(
          { user: userId, itemId: 'rocket-poison-vial' },
          { $set: { quantity: 1, user: userId, itemId: 'rocket-poison-vial' } },
          { upsert: true },
        ),
        inventory.updateOne(
          { user: userId, itemId: 'red-berry-candy' },
          { $set: { quantity: 10, user: userId, itemId: 'red-berry-candy' } },
          { upsert: true },
        ),
      ])
    }

    if (process.env.REDIS_URL) {
      const redis = new Redis(process.env.REDIS_URL, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
      })
      await redis.connect()
      try {
        let cursor = '0'
        const keys = new Set<string>()
        do {
          const [nextCursor, matched] = await redis.scan(cursor, 'MATCH', `*${userIdString}*`, 'COUNT', 500)
          cursor = nextCursor
          matched.forEach((key) => keys.add(key))
        } while (cursor !== '0')

        const directKeys = [
          `game:${userIdString}`,
          `research:${userIdString}`,
          `battle:${userIdString}`,
          `fishing:${userIdString}`,
          `encounter:${userIdString}`,
          `lock:expedition:progress:${userIdString}`,
        ]
        directKeys.forEach((key) => keys.add(key))
        console.log(JSON.stringify({ dryRun, redisKeys: [...keys].sort() }, null, 2))
        if (!dryRun && keys.size > 0) await redis.del(...keys)
      } finally {
        await redis.quit()
      }
    } else {
      console.log('REDIS_URL is not configured; no Redis keys inspected.')
    }
  } finally {
    await mongo.close()
  }
}

main().catch((error) => {
  console.error('Klobleo Fuchsia reset failed:', error)
  process.exitCode = 1
})
