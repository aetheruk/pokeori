import { describe, expect, test } from 'bun:test'
import {
  createTransactionPayload,
  hasEconomyTransactionSupport,
  isValidEconomyActionToken,
} from '@/utilities/economy/transactions'

describe('economy transaction infrastructure', () => {
  test('accepts bounded action identifiers and rejects unsafe values', () => {
    expect(isValidEconomyActionToken('purchase-shop-item')).toBe(true)
    expect(
      isValidEconomyActionToken('550e8400-e29b-41d4-a716-446655440000'),
    ).toBe(true)
    expect(isValidEconomyActionToken('')).toBe(false)
    expect(isValidEconomyActionToken('../purchase')).toBe(false)
    expect(isValidEconomyActionToken('x'.repeat(129))).toBe(false)
  })

  test('fails closed when the Payload adapter disables transactions', () => {
    const supported = {
      db: { beginTransaction() {}, transactionOptions: {} },
    }
    const disabled = {
      db: { beginTransaction() {}, transactionOptions: false },
    }
    const unavailable = { db: {} }

    expect(hasEconomyTransactionSupport(supported as any)).toBe(true)
    expect(hasEconomyTransactionSupport(disabled as any)).toBe(false)
    expect(hasEconomyTransactionSupport(unavailable as any)).toBe(false)
  })

  test('injects the active request into legacy Payload local API calls', async () => {
    const calls: any[] = []
    const payload = {
      db: {},
      async update(args: any) {
        calls.push(args)
        return args
      },
    }
    const req = { transactionID: 'transaction-1' }
    const transactionalPayload = createTransactionPayload(
      payload as any,
      req as any,
    )

    await transactionalPayload.update({
      collection: 'users',
      id: 'user-1',
      data: { currency: { crystals: 10 } },
    } as any)

    expect(calls).toHaveLength(1)
    expect(calls[0].req).toBe(req)
  })

  test('disables pagination for transactional MongoDB reads', async () => {
    const calls: any[] = []
    let inFlight = 0
    let maxInFlight = 0
    const payload = {
      db: {},
      async find(args: any) {
        inFlight += 1
        maxInFlight = Math.max(maxInFlight, inFlight)
        calls.push(args)
        await new Promise((resolve) => setTimeout(resolve, 1))
        inFlight -= 1
        return { docs: [] }
      },
    }
    const req = { transactionID: 'transaction-1' }
    const transactionalPayload = createTransactionPayload(
      payload as any,
      req as any,
    )

    await Promise.all([
      transactionalPayload.find({
        collection: 'pokemon',
        pagination: true,
      } as any),
      transactionalPayload.find({
        collection: 'user-inventory-items',
      } as any),
    ])

    expect(calls).toHaveLength(2)
    expect(calls[0].req).toBe(req)
    expect(calls[0].pagination).toBe(false)
    expect(calls[1].pagination).toBe(false)
    expect(maxInFlight).toBe(1)
  })
})
