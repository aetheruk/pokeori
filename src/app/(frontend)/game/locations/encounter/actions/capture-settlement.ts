import 'server-only'
import type { Payload, PayloadRequest } from 'payload'
import type { User } from '@/payload-types'
import { redis } from '@/utilities/redis'
import { createEconomyRequestId, getEconomyActionResult, runEconomyAction } from '@/utilities/economy/transactions'
import type { EncounterState } from './types'

type Write = { key: string; value: unknown; ttlSeconds: number }
export interface CaptureSettlementContext {
  payload: Payload; req: PayloadRequest; user: User; state: EncounterState
  redis: { set: (key: string, value: unknown, options: { ex: number }) => Promise<string>; del: (key: string) => Promise<number> }
  setIdempotentResult: (key: string, value: unknown, seconds: number) => Promise<void>
}
type Settlement = { kind: string; response: any; previous: EncounterState; writes: Write[] }
function options(userId: string, actionId: string, kind = 'capture') { return { userId, action: 'settle-encounter-step', requestId: createEconomyRequestId(`${kind}:${actionId}`) } }
class EncounterActionRejected extends Error {
  constructor(readonly response: any) { super('Encounter action rejected') }
}
async function publish(userId: string, settlement: Settlement) {
  // Redis cleanup/checkpoint and response publication are atomic. A late replay
  // can return its durable response without replacing a newer encounter.
  const key = `encounter:${userId}`
  const current = await redis.get<EncounterState>(key)
  if (current && current.startTime === settlement.previous.startTime && current.locationId === settlement.previous.locationId &&
      (current.settlementRevision || 0) === (settlement.previous.settlementRevision || 0)) {
    await redis.setManyIfValue(key, current, settlement.writes)
  }
  return settlement.response
}
export async function replayCaptureSettlement(userId: string, actionId: string, kind = 'capture') {
  const result = await getEconomyActionResult<Settlement>(options(userId, actionId, kind))
  return result ? publish(userId, result) : null
}
export async function runCaptureSettlement(userId: string, actionId: string, previous: EncounterState, operation: (context: CaptureSettlementContext) => Promise<any>, kind = 'capture') {
  try {
  const revision = previous.settlementRevision || 0
  const settlement = await runEconomyAction({ ...options(userId, actionId, kind), aliasRequestIds: [createEconomyRequestId(`${previous.locationId}:${previous.startTime}:${revision}`)] }, async ({ payload, req }) => {
    const writes: Write[] = []
    const user = await payload.findByID({ collection: 'users', id: userId, req })
    const result = await operation({ payload, req, user, state: structuredClone(previous),
      redis: {
        set: async (key, value, opts) => {
          const stored = structuredClone(value)
          if (key === `encounter:${userId}` && stored && typeof stored === 'object') Object.assign(stored, { settlementRevision: revision + 1 })
          writes.push({ key, value: stored, ttlSeconds: Math.max(1, opts.ex) }); return 'OK'
        },
        del: async (key) => { writes.push({ key, value: null, ttlSeconds: 1 }); return 1 },
      },
      setIdempotentResult: async (key, value, seconds) => { writes.push({ key, value: structuredClone(value), ttlSeconds: seconds }) },
    })
    if (result?.success === false) throw new EncounterActionRejected(result)
    return { kind, response: result, previous, writes }
  })
  const response = await publish(userId, settlement)
  if (settlement.kind !== kind) return { success: false, error: 'The previous encounter action was restored. Reopen the encounter to continue.', code: 'ENCOUNTER_RESTORED' }
  return response
  } catch (error) {
    if (error instanceof EncounterActionRejected) return error.response
    throw error
  }
}
