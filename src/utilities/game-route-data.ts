import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getGameUserData } from '@/utilities/game-data'
import {
  GAME_DATA_SCOPE_KEYS,
  getPokemonPayloadForScope,
  type GameDataScope,
} from '@/utilities/game-data-scopes'

export async function getGameRouteData(
  scope: GameDataScope,
  requestHeaders?: Headers,
) {
  const resolvedHeaders = requestHeaders || (await headers())
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: resolvedHeaders })

  if (!user) return null

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

  return getGameUserData(freshUser, GAME_DATA_SCOPE_KEYS[scope], {
    pokemonPayload: getPokemonPayloadForScope(scope),
  })
}
