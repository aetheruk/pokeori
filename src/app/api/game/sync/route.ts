import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getGameUserData } from '@/utilities/game-data'
import {
  CHANNELING_SYNC_KEYS,
  DEFAULT_SYNC_KEYS,
  EXPLORE_SYNC_KEYS,
  POKEMON_BOX_SYNC_KEYS,
} from '@/utilities/game-data-scopes'
import { getClientIp, getRateLimiter } from '@/utilities/rate-limiter'
import { validateQuery } from '@/utilities/validators'
import { z } from 'zod'
import { createRequestId, errorResponse, jsonResponse } from '@/utilities/api-response'

const SyncQuerySchema = z.object({
  scope: z.enum(['pokemon-box', 'explore', 'channeling']).optional(),
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
  // Rate limiting
  const requestHeaders = await headers()
  const ip = getClientIp(requestHeaders)
  const limiter = getRateLimiter(ip)

  try {
    await limiter.schedule(() => Promise.resolve())
  } catch {
    return errorResponse('Rate limit exceeded', 429, requestId)
  }

  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return errorResponse('Unauthorized', 401, requestId)
  }

  try {
    const freshUser = await payload.findByID({
      collection: 'users',
      id: user.id,
    })

    const gameData =
      scope === 'pokemon-box'
        ? await getGameUserData(freshUser, POKEMON_BOX_SYNC_KEYS)
        : scope === 'explore'
          ? await getGameUserData(freshUser, EXPLORE_SYNC_KEYS, {
              pokemonPayload: 'explore',
            })
          : scope === 'channeling'
            ? await getGameUserData(freshUser, CHANNELING_SYNC_KEYS, {
                pokemonPayload: 'channeling',
              })
          : await getGameUserData(freshUser, DEFAULT_SYNC_KEYS)
    return jsonResponse(gameData, {}, requestId)
  } catch (error) {
    console.error(`[${requestId}] Error syncing game data:`, error)
    return errorResponse('Internal Server Error', 500, requestId)
  }
}
