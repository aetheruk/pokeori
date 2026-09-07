import { createHash, randomUUID } from 'node:crypto'
import configPromise from '@payload-config'
import * as PayloadAPI from 'payload'
import type { Payload, PayloadRequest } from 'payload'
import { decodeReceiptResponse, encodeReceiptResponse } from './receipt-response'
import { startActionPerformance } from '@/utilities/action-performance'
import {
  acquireActionLock,
  releaseActionLock,
} from '@/utilities/game-integrity'

const RECEIPT_COLLECTION = 'economy-action-receipts'
const ECONOMY_LOCK_SECONDS = 60
const MAX_TRANSACTION_ATTEMPTS = 3
const ACTION_TOKEN_PATTERN = /^[a-z0-9][a-z0-9:_-]{0,127}$/i

export interface EconomyTransactionContext {
  payload: Payload
  req: PayloadRequest
  userId: string
  action: string
  requestId: string
  receiptKey: string
}

export interface RunEconomyActionOptions {
  userId: string
  action: string
  requestId: string
  payload?: Payload
  /** Server-derived semantic identities for the same logical action. */
  aliasRequestIds?: string[]
}

export class EconomyActionBusyError extends Error {
  constructor() {
    super('Another account action is already being processed.')
    this.name = 'EconomyActionBusyError'
  }
}

export class EconomyTransactionsUnavailableError extends Error {
  constructor() {
    super('Transactional account updates are unavailable.')
    this.name = 'EconomyTransactionsUnavailableError'
  }
}

export function getEconomyActionErrorMessage(error: unknown): string {
  if (error instanceof EconomyActionBusyError) return error.message
  if (error instanceof EconomyTransactionsUnavailableError) {
    return 'Account updates are temporarily unavailable. Please try again shortly.'
  }
  return 'The account update could not be completed.'
}

export function isValidEconomyActionToken(value: unknown): value is string {
  return typeof value === 'string' && ACTION_TOKEN_PATTERN.test(value)
}

export function createEconomyActionId(): string {
  return randomUUID()
}

export function createEconomyRequestId(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

export function hasEconomyTransactionSupport(payload: Payload): boolean {
  const database = (payload as Payload | undefined)?.db
  return (
    typeof database?.beginTransaction === 'function' &&
    (database as { transactionOptions?: unknown }).transactionOptions !== false
  )
}

/**
 * Adapts legacy helpers that accept a Payload instance so their local API calls
 * participate in the current request transaction.
 */
export function createTransactionPayload(
  payload: Payload,
  req: PayloadRequest,
): Payload {
  let operationQueue: Promise<unknown> = Promise.resolve()
  const transactionalMethods = new Set([
    'count',
    'create',
    'delete',
    'find',
    'findByID',
    'update',
    'updateGlobal',
  ])

  return new Proxy(payload, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver)
      if (
        typeof property !== 'string' ||
        !transactionalMethods.has(property) ||
        typeof value !== 'function'
      ) {
        return value
      }

      return (args: Record<string, unknown>) => {
        const execute = () => value.call(target, {
          ...args,
          // Payload's paginated Mongo find runs its document and count queries
          // concurrently. MongoDB does not permit parallel operations on one
          // transaction session, so transactional reads must be unpaginated.
          ...(property === 'find' ? { pagination: false } : {}),
          req: args.req || req,
        })
        const result = operationQueue.then(execute, execute)
        operationQueue = result.then(
          () => undefined,
          () => undefined,
        )
        return result
      }
    },
  })
}

function buildReceiptKey(userId: string, action: string, requestId: string) {
  return createHash('sha256')
    .update(`${userId}\u0000${action}\u0000${requestId}`)
    .digest('hex')
}

function isTransientTransactionError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const labels = (error as { errorLabels?: unknown }).errorLabels
  if (!Array.isArray(labels)) return false
  return labels.some(
    (label) =>
      label === 'TransientTransactionError' ||
      label === 'UnknownTransactionCommitResult',
  )
}

function isDuplicateKeyError(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code?: unknown }).code === 11000,
  )
}

async function findReceipt<T>(
  payload: Payload,
  receiptKey: string,
  req?: PayloadRequest,
): Promise<{ response: T } | null> {
  const result = await (payload as any).find({
    collection: RECEIPT_COLLECTION,
    where: { key: { equals: receiptKey } },
    limit: 1,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    ...(req ? { req } : {}),
  })
  const receipt = result.docs?.[0]
  return receipt ? { response: await decodeReceiptResponse(receipt) as T } : null
}

/** Reads a durable settlement inside an optional existing transaction. */
export async function getEconomyActionResult<T>(
  options: RunEconomyActionOptions,
  req?: PayloadRequest,
): Promise<T | null> {
  const payload = options.payload || (await PayloadAPI.getPayload({ config: configPromise }))
  const receipt = await findReceipt<T>(
    payload,
    buildReceiptKey(options.userId, options.action, options.requestId),
    req,
  )
  return receipt ? receipt.response : null
}

/**
 * Serializes economic work per user, executes all durable writes in one Mongo
 * transaction, and stores the returned response as an idempotency receipt.
 */
export async function runEconomyAction<T>(
  options: RunEconomyActionOptions,
  operation: (context: EconomyTransactionContext) => Promise<T>,
): Promise<T> {
  const timing = startActionPerformance('economy')
  let replayed = false
  try {
    const response = await executeEconomyAction(options, operation, timing, () => { replayed = true })
    timing.finish(replayed ? 'replay' : 'success')
    return response
  } catch (error) {
    timing.finish(error instanceof EconomyActionBusyError ? 'busy' :
      error instanceof EconomyTransactionsUnavailableError ? 'unavailable' : 'error')
    throw error
  }
}

async function executeEconomyAction<T>(
  options: RunEconomyActionOptions,
  operation: (context: EconomyTransactionContext) => Promise<T>,
  timing: ReturnType<typeof startActionPerformance>,
  replay: () => void,
): Promise<T> {
  if (
    !isValidEconomyActionToken(options.action) ||
    !isValidEconomyActionToken(options.requestId) ||
    (options.aliasRequestIds !== undefined &&
      (!Array.isArray(options.aliasRequestIds) || options.aliasRequestIds.length > 8 ||
        options.aliasRequestIds.some((id) => !isValidEconomyActionToken(id))))
  ) {
    throw new Error('Invalid economy action identity.')
  }

  const payload =
    options.payload || (await PayloadAPI.getPayload({ config: configPromise }))
  if (!hasEconomyTransactionSupport(payload)) {
    throw new EconomyTransactionsUnavailableError()
  }

  const receiptKey = buildReceiptKey(
    options.userId,
    options.action,
    options.requestId,
  )
  const identities = [...new Set([options.requestId, ...(options.aliasRequestIds || [])])]
  const receiptKeys = identities.map((id) => buildReceiptKey(options.userId, options.action, id))
  async function findCommitted(req?: PayloadRequest): Promise<{ response: T } | null> {
    for (const key of receiptKeys) {
      const response = await findReceipt<T>(payload, key, req)
      if (response !== null) return response
    }
    return null
  }
  const existing = await findCommitted()
  if (existing !== null) { replay(); return existing.response }

  const lock = await acquireActionLock(
    `lock:economy:${options.userId}`,
    ECONOMY_LOCK_SECONDS,
  )
  if (!lock.acquired) throw new EconomyActionBusyError()

  try {
    const repeated = await findCommitted()
    if (repeated !== null) { replay(); return repeated.response }

    for (let attempt = 1; attempt <= MAX_TRANSACTION_ATTEMPTS; attempt += 1) {
      timing.attempt()
      const req = await PayloadAPI.createLocalReq({}, payload)
      const started = await PayloadAPI.initTransaction(req)
      if (!started) throw new EconomyTransactionsUnavailableError()

      try {
        const transactionalReceipt = await findCommitted(req)
        if (transactionalReceipt !== null) {
          await PayloadAPI.commitTransaction(req)
          replay()
          return transactionalReceipt.response
        }

        const response = await operation({
          payload: createTransactionPayload(payload, req),
          req,
          userId: options.userId,
          action: options.action,
          requestId: options.requestId,
          receiptKey,
        })

        const storedResponse = await encodeReceiptResponse(response)
        for (const [index, requestId] of identities.entries()) {
          await (payload as any).create({
          collection: RECEIPT_COLLECTION,
          data: {
            key: receiptKeys[index],
            user: options.userId,
            action: options.action,
            requestId,
            ...storedResponse,
            committedAt: new Date().toISOString(),
          },
          depth: 0,
          overrideAccess: true,
          req,
        })
        }

        await PayloadAPI.commitTransaction(req)
        return response
      } catch (error) {
        try {
          await PayloadAPI.killTransaction(req)
        } catch {
          timing.rollbackError()
          console.error('Failed to roll back economy transaction')
        }

        if (
          isDuplicateKeyError(error) ||
          (isTransientTransactionError(error) &&
            (error as { errorLabels?: string[] }).errorLabels?.includes(
              'UnknownTransactionCommitResult',
            ))
        ) {
          const committed = await findCommitted()
          if (committed !== null) { replay(); return committed.response }
        }

        if (
          isTransientTransactionError(error) &&
          attempt < MAX_TRANSACTION_ATTEMPTS
        ) {
          timing.retry()
          continue
        }
        throw error
      }
    }

    throw new Error('Economy transaction retry limit exceeded.')
  } finally {
    await releaseActionLock(lock)
  }
}
