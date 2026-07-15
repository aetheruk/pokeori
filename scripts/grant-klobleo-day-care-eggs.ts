import 'dotenv/config'
import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'
import { DAY_CARE_EGG_HATCH_DELAY_MS } from '../src/utilities/day-care/eggs'

async function main() {
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({ collection: 'users', limit: 1000, pagination: false })
  const user = docs.find((candidate) => candidate.trainerName?.toLowerCase() === 'klobleo')
  if (!user) throw new Error('Trainer "klobleo" was not found.')
  const existing = await payload.count({ collection: 'user-eggs' as any, where: { and: [{ user: { equals: user.id } }, { status: { equals: 'incubating' } }] } })
  const missing = Math.max(0, 5 - existing.totalDocs)
  const now = Date.now()
  for (let index = 0; index < missing; index += 1) {
    const hatchAt = index < 2 ? new Date(now - (index + 1) * 60_000) : new Date(now + DAY_CARE_EGG_HATCH_DELAY_MS)
    await payload.create({ collection: 'user-eggs' as any, data: { user: user.id, foundAt: new Date(now).toISOString(), hatchAt: hatchAt.toISOString(), status: 'incubating', sourceResearchId: 'test-grant' } })
  }
  console.log(`klobleo now has ${existing.totalDocs + missing} active Day Care eggs.`)
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
