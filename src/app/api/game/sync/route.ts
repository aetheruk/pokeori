import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getGameUserData } from '@/utilities/game-data'
import {
  GAME_DATA_SCOPES,
  GAME_DATA_SCOPE_KEYS,
  getPokemonPayloadForScope,
  type GameDataScope,
} from '@/utilities/game-data-scopes'
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
    const freshUser = await payload.findByID({
      collection: 'users',
      id: user.id,
      depth: 0,
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isAdmin: true,
        trainerName: true,
        banner: true,
        icon: true,
        title: true,
        unlockedBanners: true,
        unlockedIcons: true,
        unlockedTitles: true,
        skills: true,
        currency: true,
        maxPokemon: true,
        maxBoxes: true,
        boxes: true,
        kidMode: true,
        powerUsage: true,
        stats: true,
        lastDailyRefresh: true,
        activeDailyTasks: true,
        rivalTrainerId: true,
        activeVoyages: true,
        voyageStats: true,
        lastRoll: true,
        weatherSlot: true,
        weatherUpdatedAt: true,
      },
    })

    const resolvedScope = scope as GameDataScope
    const gameData = await getGameUserData(
      freshUser,
      GAME_DATA_SCOPE_KEYS[resolvedScope],
      {
        pokemonPayload: getPokemonPayloadForScope(resolvedScope),
      },
    )
    return jsonResponse(gameData, {}, requestId)
  } catch (error) {
    console.error(`[${requestId}] Error syncing game data:`, error)
    return errorResponse('Internal Server Error', 500, requestId)
  }
}
