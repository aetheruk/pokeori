import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import {
  GAME_DATA_SCOPES,
  type GameDataScope,
} from '@/utilities/game-data-scopes'
import { getGameRouteDataForUser } from '@/utilities/game-route-data'
import { getClientIp, rateLimit } from '@/utilities/rate-limiter'
import { validateQuery } from '@/utilities/validators'
import { z } from 'zod'
import { createRequestId, errorResponse } from '@/utilities/api-response'

const SyncQuerySchema = z.object({
  scope: z.enum(GAME_DATA_SCOPES).default('core'),
})

export async function GET(request: Request) {
  const requestId = createRequestId()
  const requestStartedAt = performance.now()
  const { searchParams } = new URL(request.url)
  let scope: z.infer<typeof SyncQuerySchema>['scope']
  try {
    scope = validateQuery(searchParams, SyncQuerySchema).scope
  } catch {
    return errorResponse('Invalid query parameters', 400, requestId)
  }
  try {
    const requestHeaders = await headers()
    const ip = getClientIp(requestHeaders)
    const ipLimit = await rateLimit('game-sync-ip', ip, 120, 60)
    if (!ipLimit.allowed) {
      return errorResponse('Rate limit exceeded', 429, requestId)
    }

    const authStartedAt = performance.now()
    const payload = await getPayload({ config: configPromise })
    const { user } = await payload.auth({ headers: requestHeaders })
    const authenticationMs = performance.now() - authStartedAt

    if (!user) {
      return errorResponse('Unauthorized', 401, requestId)
    }

    const userLimit = await rateLimit('game-sync-user', String(user.id), 30, 60)
    if (!userLimit.allowed) {
      return errorResponse('Rate limit exceeded', 429, requestId)
    }

    const resolvedScope = scope as GameDataScope
    const startedAt = performance.now()
    const gameData = await getGameRouteDataForUser(resolvedScope, payload, user)
    if (!gameData) return errorResponse('Unauthorized', 401, requestId)
    const gameDataMs = performance.now() - startedAt
    const serializationStartedAt = performance.now()
    const body = JSON.stringify(gameData)
    const serializationMs = performance.now() - serializationStartedAt
    const totalMs = performance.now() - requestStartedAt
    const responseBytes = new TextEncoder().encode(body).byteLength
    if (process.env.GAME_PERFORMANCE_LOGS === 'true') {
      console.info(
        JSON.stringify({
          event: 'game-sync',
          requestId,
          scope: resolvedScope,
          authenticationMs,
          gameDataMs,
          serializationMs,
          totalMs,
          responseBytes,
        }),
      )
    }
    return new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-store',
        'x-request-id': requestId,
        'Server-Timing': [
          `game-data;dur=${gameDataMs.toFixed(1)}`,
          `auth;dur=${authenticationMs.toFixed(1)}`,
          `serialize;dur=${serializationMs.toFixed(1)}`,
          `total;dur=${totalMs.toFixed(1)}`,
        ].join(', '),
      },
    })
  } catch (error) {
    console.error(`[${requestId}] Error syncing game data:`, error)
    return errorResponse('Internal Server Error', 500, requestId)
  }
}
