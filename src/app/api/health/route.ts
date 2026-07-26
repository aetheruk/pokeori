import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redis } from '@/utilities/redis'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const HEALTH_TIMEOUT_MS = 2_000

async function withTimeout<T>(promise: Promise<T>, label: string): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error(`${label} health check timed out`)),
          HEALTH_TIMEOUT_MS,
        )
      }),
    ])
  } finally {
    if (timeout) clearTimeout(timeout)
  }
}

async function checkDependencies() {
  const payload = await withTimeout(
    getPayload({ config: configPromise }),
    'MongoDB connection',
  )
  const mongo = await withTimeout(
    payload.db.connection.db?.admin().ping() ?? Promise.reject(new Error('MongoDB is unavailable')),
    'MongoDB',
  )
  const dragonfly = await withTimeout(redis.ping(), 'Dragonfly')

  return {
    mongo: mongo.ok === 1,
    dragonfly,
  }
}

async function response(includeBody: boolean) {
  try {
    const dependencies = await checkDependencies()
    const healthy = dependencies.mongo && dependencies.dragonfly
    return new Response(
      includeBody ? JSON.stringify({ status: healthy ? 'ok' : 'degraded', dependencies }) : null,
      {
        status: healthy ? 200 : 503,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Health check failed:', error)
    return new Response(
      includeBody
        ? JSON.stringify({
            status: 'unhealthy',
          })
        : null,
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      },
    )
  }
}

export function GET() {
  return response(true)
}

export function HEAD() {
  return response(false)
}
