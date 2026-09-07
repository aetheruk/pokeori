import { getPayload } from 'payload'
import config from '../src/payload.config'

// Run with NODE_ENV=production so Payload's automatic index creation stays off.
// This report issues metadata reads only: no migrations, scans of player data,
// index creation, receipt mutation or connection-string output.
if (process.env.NODE_ENV !== 'production') throw new Error('Set NODE_ENV=production to disable automatic index creation')
const payload = await getPayload({ config })
try {
  const models = (payload.db as any).collections
  const rows = []
  for (const slug of ['users', 'pokemon', 'economy-action-receipts', 'expedition-runs']) {
    const collection = models[slug].collection
    const indexes = await collection.listIndexes().toArray()
    const stats = await collection.aggregate([{ $collStats: { storageStats: { scale: 1 } } }], { maxTimeMS: 10_000 }).toArray()
    const storage = stats[0]?.storageStats
    rows.push({ collection: slug, count: storage?.count, logicalBytes: storage?.size,
      storageBytes: storage?.storageSize, indexBytes: storage?.totalIndexSize,
      indexes: indexes.map((index: any) => ({ key: index.key, unique: !!index.unique, ttlSeconds: index.expireAfterSeconds })) })
  }
  console.log(JSON.stringify({ capturedAt: new Date().toISOString(), mode: 'metadata-only', collections: rows }, null, 2))
} finally {
  await payload.destroy()
}
