import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { GAME_DATA_SCOPES, type GameDataScope } from '@/utilities/game-data-scopes'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getClientIp, rateLimit } from '@/utilities/rate-limiter'
import { validateQuery } from '@/utilities/validators'
import { z } from 'zod'
import { createRequestId, errorResponse, jsonResponse } from '@/utilities/api-response'

const SyncQuerySchema = z.object({
  scope: z.enum(GAME_DATA_SCOPES).default('core'),
})

export async function GET(request: Request) {
  const requestId = createRequestId()
  const { searchParams } = new URL(request.url)
  let scope: z.infer<typeof SyncQuerySchema>['scope']
  try {
    scope = validateQuery(searchParams, SyncQuerySchema).scope
  } catch {
    return errorResponse('Invalid query parameters', 400, requestId)
  }
  const requestHeaders = await headers()
  const ip = getClientIp(requestHeaders)
  const ipLimit = await rateLimit('game-sync-ip', ip, 120, 60)
  if (!ipLimit.allowed) {
    return errorResponse('Rate limit exceeded', 429, requestId)
  }

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return errorResponse('Unauthorized', 401, requestId)
  }

  const userLimit = await rateLimit('game-sync-user', String(user.id), 30, 60)
  if (!userLimit.allowed) {
    return errorResponse('Rate limit exceeded', 429, requestId)
  }

  try {
    const resolvedScope = scope as GameDataScope
    const gameData = await getGameRouteData(resolvedScope, requestHeaders)
    if (!gameData) return errorResponse('Unauthorized', 401, requestId)
    return jsonResponse(gameData, {}, requestId)
  } catch (error) {
    console.error(`[${requestId}] Error syncing game data:`, error)
    return errorResponse('Internal Server Error', 500, requestId)
  }
}
