import { subCategories } from '@/data/sub-region-map'
import {
  WEATHER_LABELS,
  WEATHER_SLOT_NUMBERS,
  normalizeWeatherType,
  type WeatherSlot,
  type WeatherType,
} from '@/data/weather'
import type { User } from '@/payload-types'

export const WEATHER_ROLL_MAX = 1_000_000
export const WEATHER_SLOT_COUNT = 20
export const WEATHER_SLOT_SIZE = WEATHER_ROLL_MAX / WEATHER_SLOT_COUNT
export const WEATHER_TTL_MS = 30 * 60 * 1000

export interface WeatherSlotState {
  slot: WeatherSlot
  updatedAt: string
  expiresAt: string
  rolled: boolean
  roll?: number
}

export interface WeatherSnapshot {
  slot: WeatherSlot
  weather: WeatherType
  label: string
  updatedAt?: string
  expiresAt?: string
  subCategory?: string
  source?: 'region' | 'power' | 'ability' | 'rarity'
  originalWeather?: WeatherType
  overriddenAtTurn?: number
  overriddenBy?: string
}

type WeatherUser = Pick<User, 'id'> & {
  weatherSlot?: number | null
  weatherUpdatedAt?: string | null
}

type PayloadLike = {
  update: (args: any) => Promise<any>
}

function toWeatherSlot(value: unknown): WeatherSlot | null {
  if (typeof value !== 'number' || !Number.isInteger(value)) return null
  return WEATHER_SLOT_NUMBERS.includes(value as WeatherSlot) ? (value as WeatherSlot) : null
}

export function rollWeatherNumber(random: () => number = Math.random): number {
  const raw = Math.floor(random() * WEATHER_ROLL_MAX) + 1
  return Math.min(WEATHER_ROLL_MAX, Math.max(1, raw))
}

export function getWeatherSlotFromRoll(roll: number): WeatherSlot {
  const normalizedRoll = Math.min(WEATHER_ROLL_MAX, Math.max(1, Math.floor(roll)))
  const slot = Math.ceil(normalizedRoll / WEATHER_SLOT_SIZE)
  return Math.min(WEATHER_SLOT_COUNT, Math.max(1, slot)) as WeatherSlot
}

export function getActiveStoredWeatherSlot(
  user: WeatherUser,
  now: Date = new Date(),
): WeatherSlotState | null {
  const slot = toWeatherSlot(user.weatherSlot)
  if (!slot || !user.weatherUpdatedAt) return null

  const updatedAtTime = new Date(user.weatherUpdatedAt).getTime()
  if (!Number.isFinite(updatedAtTime)) return null

  const expiresAtTime = updatedAtTime + WEATHER_TTL_MS
  if (now.getTime() >= expiresAtTime) return null

  return {
    slot,
    updatedAt: new Date(updatedAtTime).toISOString(),
    expiresAt: new Date(expiresAtTime).toISOString(),
    rolled: false,
  }
}

export async function ensureUserWeatherSlot(
  payload: PayloadLike,
  user: WeatherUser,
  now: Date = new Date(),
  random: () => number = Math.random,
): Promise<WeatherSlotState> {
  const active = getActiveStoredWeatherSlot(user, now)
  if (active) return active

  const roll = rollWeatherNumber(random)
  const slot = getWeatherSlotFromRoll(roll)
  const updatedAt = now.toISOString()
  const expiresAt = new Date(now.getTime() + WEATHER_TTL_MS).toISOString()

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      weatherSlot: slot,
      weatherUpdatedAt: updatedAt,
    },
    overrideAccess: true,
  })

  return {
    slot,
    updatedAt,
    expiresAt,
    rolled: true,
    roll,
  }
}

export function resolveSubRegionWeather(
  subCategory: string | null | undefined,
  slot: number | null | undefined,
): WeatherSnapshot {
  const weatherSlot = toWeatherSlot(slot) || 1
  const authoredWeather = subCategory
    ? subCategories[subCategory]?.weatherSlots?.[weatherSlot]
    : undefined
  const weather = normalizeWeatherType(authoredWeather)

  return {
    slot: weatherSlot,
    weather,
    label: WEATHER_LABELS[weather],
    subCategory: subCategory || undefined,
  }
}

export function resolveRequirementWeather(
  subCategory: string | null | undefined,
  slot: number | null | undefined,
  explicitWeather?: WeatherType,
): WeatherType {
  if (explicitWeather) return explicitWeather
  return resolveSubRegionWeather(subCategory, slot).weather
}
