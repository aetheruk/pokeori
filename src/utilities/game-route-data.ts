import { getPayload, type Payload } from 'payload'
import type { User } from '@/payload-types'
import { getGameUserData } from '@/utilities/game-data'
import { getGameRequestContext } from '@/utilities/game-request-context'
import {
  GAME_DATA_SCOPE_KEYS,
  getPokemonPayloadForScope,
  type GameDataScope,
} from '@/utilities/game-data-scopes'

export const GAME_ROUTE_USER_SELECT = {
  id: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  isAdmin: true,
  trainerName: true,
  banner: true,
  trainerGender: true,
  icon: true,
  title: true,
  unlockedBanners: true,
  unlockedIcons: true,
  unlockedTitles: true,
  skills: true,
  guilds: true,
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
} as const

export async function getGameRouteData(
  scope: GameDataScope,
  requestHeaders?: Headers,
) {
  const { payload, user } = await getGameRequestContext(requestHeaders)

  if (!user) return null

  return getGameRouteDataForUser(scope, payload, user)
}

/** Server-only helper for callers that have already authenticated this request. */
export async function getGameRouteDataForUser(
  scope: GameDataScope,
  payload: Payload,
  user: Pick<User, 'id'>,
) {
  const freshUser = await payload.findByID({
    collection: 'users',
    id: user.id,
    depth: 0,
    select: GAME_ROUTE_USER_SELECT,
  })

  return getGameUserData({ ...freshUser, collection: 'users' }, GAME_DATA_SCOPE_KEYS[scope], {
    payload,
    pokemonPayload: getPokemonPayloadForScope(scope),
  })
}
