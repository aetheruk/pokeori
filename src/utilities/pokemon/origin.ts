import { fishingGames } from '@/data/games/fishing'
import { locations } from '@/data/locations'
import { subCategories } from '@/data/sub-region-map'
import type { Reward, Task } from '@/data/types'

export type PokemonObtainedMethod =
  | 'caught'
  | 'trade'
  | 'gift'
  | 'starter'
  | 'purchased'
  | 'reward'
  | 'hatched'

export interface PokemonOriginData {
  obtainedMethod?: PokemonObtainedMethod
  obtainedRegion?: string
  obtainedLocation?: string
  obtainedSourceId?: string
}

interface AreaOriginSource {
  id?: string
  name?: string
  category?: string
  subCategory?: string
}

export function resolveRegion(category?: string, subCategory?: string) {
  if (category && category !== 'Secret') return category
  if (subCategory) return subCategories[subCategory]?.region || category
  return category
}

export function resolveAreaOrigin(source: AreaOriginSource): PokemonOriginData {
  return {
    obtainedRegion: resolveRegion(source.category, source.subCategory),
    obtainedLocation: source.name || source.subCategory,
    obtainedSourceId: source.id,
  }
}

export function resolveEncounterOrigin(locationId: string): PokemonOriginData {
  if (locationId.startsWith('fishing:')) {
    const fishingId = locationId.replace('fishing:', '')
    const fishingGame = fishingGames.find((game) => game.id === fishingId)
    return {
      obtainedMethod: 'caught',
      ...resolveAreaOrigin({
        id: fishingGame?.id || locationId,
        name: fishingGame?.name,
        category: fishingGame?.category,
        subCategory: fishingGame?.subCategory,
      }),
    }
  }

  const location = locations.find((entry) => entry.id === locationId)
  return {
    obtainedMethod: 'caught',
    ...resolveAreaOrigin({
      id: location?.id || locationId,
      name: location?.name,
      category: location?.category,
      subCategory: location?.subCategory,
    }),
  }
}

export function resolveEncounterBackground(
  locationId: string,
  stateBackground?: string,
): string | undefined {
  if (stateBackground) return stateBackground

  if (locationId.startsWith('fishing:')) {
    const fishingId = locationId.replace('fishing:', '')
    return fishingGames.find((game) => game.id === fishingId)?.background
  }

  return locations.find((entry) => entry.id === locationId)?.background
}

export function resolveTaskPokemonOrigin(task: Task, reward: Reward): PokemonOriginData {
  const explicitOrigin = {
    obtainedMethod: reward.pokemonData?.obtainedMethod as PokemonObtainedMethod | undefined,
    obtainedRegion: reward.pokemonData?.obtainedRegion,
    obtainedLocation: reward.pokemonData?.obtainedLocation,
    obtainedSourceId: reward.pokemonData?.obtainedSourceId,
  }

  if (explicitOrigin.obtainedMethod) return explicitOrigin

  const areaOrigin = resolveAreaOrigin({
    id: task.id,
    name: task.subCategory || task.name,
    category: task.category,
    subCategory: task.subCategory,
  })

  if (task.id.startsWith('starter-')) {
    return {
      obtainedMethod: 'starter',
      obtainedSourceId: task.id,
    }
  }

  const consumesPokemon = (task.criteria || []).some(
    (criterion) => criterion.type === 'pokemon_owned' && criterion.consume,
  )
  if (consumesPokemon) {
    return {
      obtainedMethod: 'trade',
      obtainedSourceId: task.id,
    }
  }

  if (task.id === 'magikarp-secret-deal') {
    return {
      obtainedMethod: 'purchased',
      ...areaOrigin,
      obtainedSourceId: task.id,
    }
  }

  if (task.id === 'day-care-garden-restored' || task.name.toLowerCase().includes('gift')) {
    return {
      obtainedMethod: 'gift',
      ...areaOrigin,
      obtainedSourceId: task.id,
    }
  }

  return {
    obtainedMethod: 'reward',
    ...areaOrigin,
    obtainedSourceId: task.id,
  }
}
