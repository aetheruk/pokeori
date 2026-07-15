import type {
  FieldObservationGlobalItemEvent,
  FieldObservationGlobalPokemonEvent,
  FieldObservationItemDrop,
} from '@/data/games/field-observation/types'
import type { RequirementData } from '@/utilities/requirements'
import { checkRequirement } from '@/utilities/requirements'
import type { WeatherSnapshot } from '@/utilities/weather'

type RandomFn = () => number

export function rollFieldObservationGlobalPokemonEvent(
  events: FieldObservationGlobalPokemonEvent[],
  userData: RequirementData,
  category: string,
  subCategory?: string | RandomFn,
  weather?: WeatherSnapshot | RandomFn,
  random: RandomFn = Math.random,
): FieldObservationGlobalPokemonEvent | null {
  if (typeof subCategory === 'function') {
    random = subCategory
    subCategory = undefined
  } else if (typeof weather === 'function') {
    random = weather
    weather = undefined
  }
  const resolvedSubCategory = typeof subCategory === 'string' ? subCategory : undefined
  const resolvedWeather = typeof weather === 'function' ? undefined : weather
  const rolled = events.filter((event) =>
    isFieldObservationGlobalEventEligible(
      event,
      userData,
      category,
      resolvedSubCategory,
      resolvedWeather,
      random,
    ),
  )
  if (rolled.length === 0) return null
  return rolled[Math.floor(random() * rolled.length)] || null
}

export function rollFieldObservationGlobalItemEvents(
  events: FieldObservationGlobalItemEvent[],
  userData: RequirementData,
  category: string,
  subCategory?: string | RandomFn,
  weather?: WeatherSnapshot | RandomFn,
  random: RandomFn = Math.random,
): FieldObservationGlobalItemEvent[] {
  if (typeof subCategory === 'function') {
    random = subCategory
    subCategory = undefined
  } else if (typeof weather === 'function') {
    random = weather
    weather = undefined
  }
  const resolvedSubCategory = typeof subCategory === 'string' ? subCategory : undefined
  const resolvedWeather = typeof weather === 'function' ? undefined : weather
  return rollFieldObservationItemDrops(
    events,
    userData,
    category,
    resolvedSubCategory,
    resolvedWeather,
    random,
  )
}

export function rollFieldObservationItemDrops<T extends FieldObservationItemDrop>(
  events: T[],
  userData: RequirementData,
  category: string,
  subCategory?: string | RandomFn,
  weather?: WeatherSnapshot | RandomFn,
  random: RandomFn = Math.random,
): T[] {
  if (typeof subCategory === 'function') {
    random = subCategory
    subCategory = undefined
  } else if (typeof weather === 'function') {
    random = weather
    weather = undefined
  }
  const resolvedSubCategory = typeof subCategory === 'string' ? subCategory : undefined
  const resolvedWeather = typeof weather === 'function' ? undefined : weather
  return events.filter((event) =>
    isFieldObservationItemDropEligible(
      event,
      userData,
      category,
      resolvedSubCategory,
      resolvedWeather,
      random,
    ),
  )
}

function isFieldObservationGlobalEventEligible(
  event: FieldObservationGlobalPokemonEvent,
  userData: RequirementData,
  category: string,
  subCategory: string | undefined,
  weather: WeatherSnapshot | undefined,
  random: RandomFn,
) {
  if (
    (event.requirements || []).some(
      (requirement) =>
        !checkRequirement(userData, requirement, {
          category,
          subCategory,
          weather: weather?.weather,
        }),
    )
  ) {
    return false
  }

  const odds = Math.max(1, Math.floor(event.odds || 1))
  return random() < 1 / odds
}

function isFieldObservationItemDropEligible(
  event: FieldObservationItemDrop,
  userData: RequirementData,
  category: string,
  subCategory: string | undefined,
  weather: WeatherSnapshot | undefined,
  random: RandomFn,
) {
  if (
    (event.requirements || []).some(
      (requirement) =>
        !checkRequirement(userData, requirement, {
          category,
          subCategory,
          weather: weather?.weather,
        }),
    )
  ) {
    return false
  }

  const dropChance = Math.min(100, Math.max(0, event.dropChance || 0))
  return random() * 100 < dropChance
}
