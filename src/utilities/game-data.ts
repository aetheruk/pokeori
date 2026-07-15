import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User, Pokemon } from '@/payload-types'
import type { RequirementData } from '@/utilities/requirements'
import type { GameDataKeys } from '@/utilities/requirements/analysis'
import { CHANNELING_POKEMON_SELECT, EXPLORE_POKEMON_SELECT } from '@/utilities/game-data-scopes'
import { getUserStateData, toSlimUser } from '@/utilities/user-state'
import { ensureUserWeatherSlot } from '@/utilities/weather'

interface ActiveExpeditionData {
  id: string
  expeditionId: string
  expeditionName: string
  status: 'active' | 'ready_to_claim'
  mapItemId?: string
  maxLosses: number
  losses: number
  currentStepIndex: number
  totalSteps: number
  steps: any[]
}

interface RivalTrainerDisplayData {
  id: string
  trainerName?: string | null
  icon?: string | null
  banner?: string | null
}

type GameUserDataOptions = {
  pokemonPayload?: 'full' | 'explore' | 'channeling'
}

export async function getGameUserData(
  user: User,
  requiredData?: GameDataKeys[],
  options: GameUserDataOptions = {},
): Promise<RequirementData> {
  const payload = await getPayload({ config: configPromise })
  const fetchAll = !requiredData || requiredData.length === 0
  const keys = new Set(requiredData || [])

  // Helper to check if we should fetch a key
  const shouldFetch = (key: GameDataKeys) => fetchAll || keys.has(key)

  // Join field 'pokemon' should be populated if depth > 0
  // If user.pokemon is present, use it.
  // Note: Payload join field returns a paginated response type object usually { docs: [], ... }
  let pokemonData: Pokemon[] = []

  if (shouldFetch('pokemon')) {
    // Always manual fetch to avoid pagination limits on the join field.
    // The explore payload keeps only fields needed for requirements and selection UI.
    const manualFetch = await payload.find({
      collection: 'pokemon',
      where: {
        and: [
          { user: { equals: user.id } },
          {
            or: [
              { fusedIntoPokemonId: { exists: false } },
              { fusedIntoPokemonId: { equals: null } },
              { fusedIntoPokemonId: { equals: '' } },
            ],
          },
        ],
      },
      pagination: false,
      ...(options.pokemonPayload === 'explore' || options.pokemonPayload === 'channeling'
        ? {
            depth: 0,
            select:
              options.pokemonPayload === 'channeling'
                ? CHANNELING_POKEMON_SELECT
                : EXPLORE_POKEMON_SELECT,
          }
        : {}),
    } as any)
    pokemonData = manualFetch.docs as Pokemon[]
  }

  const userState = await getUserStateData(payload as any, user, requiredData)
  const weatherState = await ensureUserWeatherSlot(payload as any, user as User)

  let activeExpedition: ActiveExpeditionData | null = null

  if (shouldFetch('activeExpedition')) {
    const runs = await (payload as any).find({
      collection: 'expedition-runs',
      where: {
        user: { equals: user.id },
      },
      sort: '-createdAt',
      limit: 10,
    })

    const runDoc = (runs.docs || []).find(
      (run: any) => run.status === 'active' || run.status === 'ready_to_claim',
    )

    if (runDoc) {
      activeExpedition = {
        id: runDoc.id,
        expeditionId: runDoc.expeditionId,
        expeditionName: runDoc.expeditionName,
        status: runDoc.status,
        mapItemId: runDoc.mapItemId,
        maxLosses: runDoc.maxLosses || 0,
        losses: runDoc.losses || 0,
        currentStepIndex: runDoc.currentStepIndex || 0,
        totalSteps: runDoc.totalSteps || 0,
        steps: runDoc.steps || [],
      }
    }
  }

  let rivalTrainer: RivalTrainerDisplayData | null = null

  if (
    shouldFetch('rivalTrainer') &&
    typeof user.rivalTrainerId === 'string' &&
    user.rivalTrainerId
  ) {
    const rivalUser =
      user.rivalTrainerId === user.id
        ? user
        : await payload
            .findByID({
              collection: 'users',
              id: user.rivalTrainerId,
              depth: 0,
            })
            .catch(() => null)

    if (rivalUser) {
      rivalTrainer = {
        id: rivalUser.id,
        trainerName: rivalUser.trainerName,
        icon: rivalUser.icon,
        banner: rivalUser.banner,
      }
    }
  }

  const slimUser = {
    ...(toSlimUser(user) as any),
    weatherSlot: weatherState.slot,
    weatherUpdatedAt: weatherState.updatedAt,
  } as User

  return {
    user: slimUser,
    rivalTrainer,
    currency: user.currency,
    inventory: userState.inventory,
    pokemon: pokemonData,
    tcg: userState.tcg,
    pokedex: userState.pokedex,
    abilityDex: userState.abilityDex,
    completedTasks: userState.completedTasks,
    battleResults: userState.battleResults,
    locationEncounterResults: userState.locationEncounterResults,
    researchEncounterResults: userState.researchEncounterResults,
    expeditionResults: userState.expeditionResults,
    shopPurchases: userState.shopPurchases,
    lastRoll: (user as any).lastRoll,
    weatherSlot: weatherState.slot,
    weatherUpdatedAt: weatherState.updatedAt,
    activeExpedition,
  }
}
