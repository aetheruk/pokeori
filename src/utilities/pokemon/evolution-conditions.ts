import type { EvolutionCondition } from '@/data/evolutions'
import { regionCategories } from '@/data/region-map'
import type { Pokemon } from '@/payload-types'
import type { PokemonGender } from './gender'

const EVOLUTION_GENDER_LABELS: Record<number, PokemonGender> = {
  1: 'female',
  2: 'male',
}

const DEFAULT_EVOLUTION_TIME_REGION = 'Kanto'
const UTC_TIME_ZONE = 'UTC'

type EvolutionTimeRegionSource = Pick<Pokemon, 'obtainedRegion'>

export function getEvolutionConditionGender(
  conditions: Pick<EvolutionCondition, 'gender'>,
): PokemonGender | undefined {
  return typeof conditions.gender === 'number'
    ? EVOLUTION_GENDER_LABELS[conditions.gender]
    : undefined
}

export function matchesEvolutionGender(
  conditions: Pick<EvolutionCondition, 'gender'>,
  pokemonGender: PokemonGender,
): boolean {
  const requiredGender = getEvolutionConditionGender(conditions)
  return !requiredGender || pokemonGender === requiredGender
}

export function getEvolutionTimeOfDay(hour = new Date().getHours()) {
  if (hour >= 17 && hour < 18) return 'dusk'
  if (hour >= 6 && hour < 17) return 'day'
  return 'night'
}

export function resolveEvolutionTimeRegion(
  source?: EvolutionTimeRegionSource | string | null,
): string {
  const region =
    typeof source === 'string' ? source.trim() : source?.obtainedRegion?.trim()

  return region && regionCategories[region]
    ? region
    : DEFAULT_EVOLUTION_TIME_REGION
}

export function getEvolutionTimeRegionLabel(
  source?: EvolutionTimeRegionSource | string | null,
): string {
  return `${resolveEvolutionTimeRegion(source)} time`
}

export function getEvolutionRegionHour(
  source?: EvolutionTimeRegionSource | string | null,
  dateInput: string | number | Date = new Date(),
): number {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  const timeZone =
    regionCategories[resolveEvolutionTimeRegion(source)]?.timeZone ||
    UTC_TIME_ZONE

  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date)
    const hour = Number(parts.find((part) => part.type === 'hour')?.value)

    if (Number.isFinite(hour)) return hour
  } catch {
    // Invalid or unsupported authored time zones fall back to UTC.
  }

  return date.getUTCHours()
}

export function getEvolutionTimeOfDayForRegion(
  source?: EvolutionTimeRegionSource | string | null,
  dateInput: string | number | Date = new Date(),
) {
  return getEvolutionTimeOfDay(getEvolutionRegionHour(source, dateInput))
}

export function matchesEvolutionTimeOfDay(
  conditions: Pick<EvolutionCondition, 'timeOfDay'>,
  hour = new Date().getHours(),
): boolean {
  return !conditions.timeOfDay || conditions.timeOfDay === getEvolutionTimeOfDay(hour)
}

export function matchesEvolutionTimeOfDayForRegion(
  conditions: Pick<EvolutionCondition, 'timeOfDay'>,
  source?: EvolutionTimeRegionSource | string | null,
  dateInput: string | number | Date = new Date(),
): boolean {
  return (
    !conditions.timeOfDay ||
    conditions.timeOfDay === getEvolutionTimeOfDayForRegion(source, dateInput)
  )
}

export function getEvolutionTimeOfDayLabel(timeOfDay: string) {
  switch (timeOfDay) {
    case 'day':
      return 'Daytime (6am-5pm)'
    case 'dusk':
      return 'Dusk (5pm-6pm)'
    case 'night':
      return 'Nighttime (6pm-6am)'
    default:
      return timeOfDay
  }
}
