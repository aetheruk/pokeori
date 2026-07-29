import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { User, Pokemon } from '@/payload-types'
import type { RequirementData } from '@/utilities/requirements'
import type { GameDataKeys } from '@/utilities/requirements/analysis'
import {
  CHANNELING_POKEMON_SELECT,
  EXPLORE_POKEMON_SELECT,
} from '@/utilities/game-data-scopes'
import { getUserStateData, toSlimUser } from '@/utilities/user-state'
import { ensureUserWeatherSlot } from '@/utilities/weather'
import { normalizeKidModeExpeditionSteps } from '@/utilities/expeditions/path-builder'

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
  const fetchAll = requiredData === undefined
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
      ...(options.pokemonPayload === 'explore' ||
      options.pokemonPayload === 'channeling'
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
  const weatherState = shouldFetch('weather')
    ? await ensureUserWeatherSlot(payload as any, user as User)
    : null

  let activeExpedition: ActiveExpeditionData | null = null

  if (shouldFetch('activeExpedition')) {
    const runs = await (payload as any).find({
      collection: 'expedition-runs',
      where: {
        and: [
          { user: { equals: user.id } },
          {
            status: {
              in: ['active', 'ready_to_claim'],
            },
          },
        ],
      },
      sort: '-createdAt',
      limit: 1,
      depth: 0,
      select: {
        expeditionId: true,
        expeditionName: true,
        status: true,
        mapItemId: true,
        maxLosses: true,
        losses: true,
        currentStepIndex: true,
        totalSteps: true,
        steps: true,
      },
    })

    const runDoc = runs.docs?.[0]

    if (runDoc) {
      const normalized = normalizeKidModeExpeditionSteps({
        expeditionId: runDoc.expeditionId,
        steps: runDoc.steps || [],
        currentStepIndex: runDoc.currentStepIndex || 0,
        kidMode: user.kidMode === true,
      })
      if (normalized.changed) {
        await (payload as any).update({
          collection: 'expedition-runs',
          id: runDoc.id,
          data: {
            steps: normalized.steps,
            currentStepIndex: normalized.currentStepIndex,
            totalSteps: normalized.steps.length,
          },
        })
      }

      activeExpedition = {
        id: runDoc.id,
        expeditionId: runDoc.expeditionId,
        expeditionName: runDoc.expeditionName,
        status: runDoc.status,
        mapItemId: runDoc.mapItemId,
        maxLosses: runDoc.maxLosses || 0,
        losses: runDoc.losses || 0,
        currentStepIndex: normalized.currentStepIndex,
        totalSteps: normalized.steps.length,
        steps: normalized.steps,
      }
    }
  }

  let rivalTrainer: RivalTrainerDisplayData | null = null

  if (
    shouldFetch('rivalTrainer') &&
    user.kidMode !== true &&
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
              select: {
                trainerName: true,
                icon: true,
                banner: true,
                kidMode: true,
              },
            })
            .catch(() => null)

    if (rivalUser && rivalUser.kidMode !== true) {
      rivalTrainer = {
        id: rivalUser.id,
        trainerName: rivalUser.trainerName,
        icon: rivalUser.icon,
        banner: rivalUser.banner,
      }
    }
  }

  const slimUser = toSlimUser(user)
  if (weatherState) {
    ;(slimUser as any).weatherSlot = weatherState.slot
    ;(slimUser as any).weatherUpdatedAt = weatherState.updatedAt
  }

  const result: Record<string, unknown> = {
    snapshotAt: new Date().toISOString(),
    user: slimUser,
    currency: user.currency,
    lastRoll: (user as any).lastRoll,
  }
  if (shouldFetch('pokemon')) result.pokemon = pokemonData
  for (const [key, value] of Object.entries(userState)) {
    result[key] = value
  }
  if (shouldFetch('rivalTrainer')) result.rivalTrainer = rivalTrainer
  if (shouldFetch('activeExpedition'))
    result.activeExpedition = activeExpedition
  if (weatherState) {
    result.weatherSlot = weatherState.slot
    result.weatherUpdatedAt = weatherState.updatedAt
  }

  return result as unknown as RequirementData
}
