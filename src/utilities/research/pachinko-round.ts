import type { PachinkoBucket } from '@/data/games/pachinko/types'
import { PACHINKO_BONUS_BALL_COUNT } from './pachinko-physics'

export type PachinkoRoundRequest = {
  roundId: string
  triggerBucketId?: string
  outcomeBucketIds: Array<string | null>
}

export type ResolvedPachinkoRound =
  | {
      valid: true
      isBonus: boolean
      hitBuckets: PachinkoBucket[]
      hitCounts: Record<string, number>
    }
  | {
      valid: false
      error: string
    }

export function resolvePachinkoRound(
  buckets: PachinkoBucket[],
  request: PachinkoRoundRequest,
): ResolvedPachinkoRound {
  if (!Array.isArray(request.outcomeBucketIds)) {
    return { valid: false, error: 'Invalid round outcomes' }
  }
  if (
    request.triggerBucketId !== undefined &&
    typeof request.triggerBucketId !== 'string'
  ) {
    return { valid: false, error: 'Invalid bonus bucket' }
  }

  const isBonus = request.triggerBucketId !== undefined
  const expectedOutcomes = isBonus ? PACHINKO_BONUS_BALL_COUNT : 1

  if (request.outcomeBucketIds.length !== expectedOutcomes) {
    return {
      valid: false,
      error: isBonus
        ? `Bonus drops must resolve ${PACHINKO_BONUS_BALL_COUNT} balls`
        : 'Normal drops must resolve one ball',
    }
  }

  if (request.triggerBucketId !== undefined) {
    const triggerBucket = buckets.find(
      (bucket) => bucket.id === request.triggerBucketId,
    )
    if (triggerBucket?.kind !== 'bonus') {
      return { valid: false, error: 'Invalid bonus bucket' }
    }
  }

  const hitBuckets: PachinkoBucket[] = []
  const hitCounts: Record<string, number> = {}

  for (const bucketId of request.outcomeBucketIds) {
    if (!bucketId) continue

    const bucket = buckets.find((entry) => entry.id === bucketId)
    if (!bucket || bucket.kind === 'bonus') {
      return { valid: false, error: 'Invalid outcome bucket' }
    }

    hitBuckets.push(bucket)
    hitCounts[bucket.id] = (hitCounts[bucket.id] || 0) + 1
  }

  return { valid: true, isBonus, hitBuckets, hitCounts }
}
