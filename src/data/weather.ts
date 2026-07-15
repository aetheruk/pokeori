export const WEATHER_TYPES = [
  'clear',
  'harsh-sunlight',
  'extremely-harsh-sunlight',
  'rain',
  'heavy-rain',
  'thunderstorm',
  'sandstorm',
  'hail',
  'snow',
  'snowstorm',
  'fog',
  'strong-winds',
  'shadowy-aura',
] as const

export type WeatherType = (typeof WEATHER_TYPES)[number]

export const WEATHER_SLOT_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
] as const

export type WeatherSlot = (typeof WEATHER_SLOT_NUMBERS)[number]
export type WeatherSlotMap = Partial<Record<WeatherSlot, WeatherType>>

export const WEATHER_LABELS: Record<WeatherType, string> = {
  clear: 'Clear',
  'harsh-sunlight': 'Harsh Sunlight',
  'extremely-harsh-sunlight': 'Extreme Sunlight',
  rain: 'Rain',
  'heavy-rain': 'Heavy Rain',
  thunderstorm: 'Thunderstorm',
  sandstorm: 'Sandstorm',
  hail: 'Hail',
  snow: 'Snow',
  snowstorm: 'Snowstorm',
  fog: 'Fog',
  'strong-winds': 'Strong Winds',
  'shadowy-aura': 'Shadowy Aura',
}

export function isWeatherType(value: unknown): value is WeatherType {
  return typeof value === 'string' && WEATHER_TYPES.includes(value as WeatherType)
}

export function normalizeWeatherType(value: unknown): WeatherType {
  return isWeatherType(value) ? value : 'clear'
}
