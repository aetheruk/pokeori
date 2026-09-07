import { getPayload } from 'payload'
import config from '../src/payload.config'
import { encodeReceiptResponse } from '../src/utilities/economy/receipt-response'
import { ObjectId } from 'mongodb'

// Read-only by default. Never expire keys or replace the original result with a
// tombstone: an old client retry must still return the original committed value.
const apply = process.argv.includes('--apply')
const afterId = process.argv.find((argument) => argument.startsWith('--after-id='))?.slice('--after-id='.length)
if (afterId && !/^[a-f0-9]{24}$/i.test(afterId)) throw new Error('Invalid --after-id cursor')
const payload = await getPayload({ config })
try {
  const collection = (payload.db as any).collections['economy-action-receipts'].collection
  const cutoff = new Date(Date.now() - 30 * 86400_000)
  const totals = await collection.aggregate([
    { $group: {
      _id: '$action', count: { $sum: 1 }, bytes: { $sum: { $bsonSize: '$$ROOT' } },
      oldest: { $min: '$committedAt' }, newest: { $max: '$committedAt' },
    } },
    { $sort: { bytes: -1 } },
  ], { maxTimeMS: 20_000 }).toArray()
  console.log(JSON.stringify({ mode: apply ? 'compact' : 'read-only', cutoff, totals }, null, 2))
  if (apply) {
    const cursor = collection.find({
      committedAt: { $lt: cutoff }, responseEncoding: { $exists: false },
      ...(afterId ? { _id: { $gt: new ObjectId(afterId) } } : {}),
    }).sort({ _id: 1 }).limit(1000).batchSize(50)
    let compacted = 0
    let scanned = 0
    let nextAfterId: string | undefined
    for await (const receipt of cursor) {
      scanned++
      nextAfterId = String(receipt._id)
      const encoded = await encodeReceiptResponse(receipt.response)
      if (!encoded.responseEncoding) continue
      const result = await collection.updateOne({
        _id: receipt._id, updatedAt: receipt.updatedAt, responseEncoding: { $exists: false },
      }, { $set: encoded })
      compacted += result.modifiedCount
    }
    console.log(JSON.stringify({ compacted, scanned, nextAfterId: scanned === 1000 ? nextAfterId : null, batchLimit: 1000 }))
  }
} finally {
  await payload.destroy()
}
