import { createHash, randomUUID } from 'node:crypto'
import configPromise from '@payload-config'
import * as PayloadAPI from 'payload'
import type { Payload, PayloadRequest } from 'payload'
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
): Promise<T | null> {
  const result = await (payload as any).find({
    collection: RECEIPT_COLLECTION,
    where: { key: { equals: receiptKey } },
    limit: 1,
    pagination: false,
    depth: 0,
    overrideAccess: true,
    ...(req ? { req } : {}),
  })
  return (result.docs?.[0]?.response as T | undefined) ?? null
}

/**
 * Serializes economic work per user, executes all durable writes in one Mongo
 * transaction, and stores the returned response as an idempotency receipt.
 */
export async function runEconomyAction<T>(
  options: RunEconomyActionOptions,
  operation: (context: EconomyTransactionContext) => Promise<T>,
): Promise<T> {
  if (
    !isValidEconomyActionToken(options.action) ||
    !isValidEconomyActionToken(options.requestId)
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
  const existing = await findReceipt<T>(payload, receiptKey)
  if (existing !== null) return existing

  const lock = await acquireActionLock(
    `lock:economy:${options.userId}`,
    ECONOMY_LOCK_SECONDS,
  )
  if (!lock.acquired) throw new EconomyActionBusyError()

  try {
    const repeated = await findReceipt<T>(payload, receiptKey)
    if (repeated !== null) return repeated

    for (let attempt = 1; attempt <= MAX_TRANSACTION_ATTEMPTS; attempt += 1) {
      const req = await PayloadAPI.createLocalReq({}, payload)
      const started = await PayloadAPI.initTransaction(req)
      if (!started) throw new EconomyTransactionsUnavailableError()

      try {
        const transactionalReceipt = await findReceipt<T>(
          payload,
          receiptKey,
          req,
        )
        if (transactionalReceipt !== null) {
          await PayloadAPI.commitTransaction(req)
          return transactionalReceipt
        }

        const response = await operation({
          payload: createTransactionPayload(payload, req),
          req,
          userId: options.userId,
          action: options.action,
          requestId: options.requestId,
          receiptKey,
        })

        await (payload as any).create({
          collection: RECEIPT_COLLECTION,
          data: {
            key: receiptKey,
            user: options.userId,
            action: options.action,
            requestId: options.requestId,
            response,
            committedAt: new Date().toISOString(),
          },
          depth: 0,
          overrideAccess: true,
          req,
        })

        await PayloadAPI.commitTransaction(req)
        return response
      } catch (error) {
        try {
          await PayloadAPI.killTransaction(req)
        } catch (rollbackError) {
          console.error(
            'Failed to roll back economy transaction',
            rollbackError,
          )
        }

        if (
          isDuplicateKeyError(error) ||
          (isTransientTransactionError(error) &&
            (error as { errorLabels?: string[] }).errorLabels?.includes(
              'UnknownTransactionCommitResult',
            ))
        ) {
          const committed = await findReceipt<T>(payload, receiptKey)
          if (committed !== null) return committed
        }

        if (
          isTransientTransactionError(error) &&
          attempt < MAX_TRANSACTION_ATTEMPTS
        ) {
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
