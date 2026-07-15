import { WEATHER_LABELS, type WeatherType } from '@/data/weather'
import type { BattlePokemon, BattleStance } from './types'
import { getTypeEffectiveness } from './type-chart'
import { getEffectiveBattleTypes } from './tera'
import { blocksBattleWeatherDamageByAbility } from './abilities'

const SUNLIGHT_WEATHERS = new Set<WeatherType>([
  'harsh-sunlight',
  'extremely-harsh-sunlight',
])

const RAIN_WEATHERS = new Set<WeatherType>([
  'rain',
  'heavy-rain',
  'thunderstorm',
])

const SNOW_WEATHERS = new Set<WeatherType>(['snow', 'snowstorm'])
const HAIL_DAMAGE_WEATHERS = new Set<WeatherType>(['hail', 'snowstorm'])

function normalizeType(type: string): string {
  return type.toLowerCase()
}

function hasType(pokemon: BattlePokemon, type: string): boolean {
  const normalizedType = normalizeType(type)
  return getEffectiveBattleTypes(pokemon).some(
    (pokemonType) => normalizeType(pokemonType) === normalizedType,
  )
}

export function isSunlightWeather(weather?: WeatherType): boolean {
  return !!weather && SUNLIGHT_WEATHERS.has(weather)
}

export function isRainWeather(weather?: WeatherType): boolean {
  return !!weather && RAIN_WEATHERS.has(weather)
}

export function getWeatherTypeEffectiveness(
  attackType: string,
  defender: BattlePokemon,
  weather?: WeatherType,
): number {
  const normalizedAttackType = normalizeType(attackType)
  let multiplier = 1

  for (const defenderType of getEffectiveBattleTypes(defender)) {
    const normalizedDefenderType = normalizeType(defenderType)
    if (
      weather === 'strong-winds' &&
      normalizedDefenderType === 'flying' &&
      ['electric', 'ice', 'rock'].includes(normalizedAttackType)
    ) {
      multiplier *= 1
      continue
    }

    multiplier *= getTypeEffectiveness(normalizedAttackType, normalizedDefenderType)
  }

  return multiplier
}

export function getWeatherAttackMultiplier(
  attackType: string,
  weather?: WeatherType,
): number {
  const normalizedAttackType = normalizeType(attackType)

  if (weather === 'extremely-harsh-sunlight' && normalizedAttackType === 'water') {
    return 0
  }
  if (weather === 'heavy-rain' && normalizedAttackType === 'fire') {
    return 0
  }
  if (isSunlightWeather(weather)) {
    if (normalizedAttackType === 'fire') return 1.5
    if (normalizedAttackType === 'water') return 0.5
  }
  if (isRainWeather(weather)) {
    if (normalizedAttackType === 'water') return 1.5
    if (normalizedAttackType === 'fire') return 0.5
  }

  return 1
}

export function getWeatherDefenseMultiplier(
  defender: BattlePokemon,
  stance: BattleStance,
  weather?: WeatherType,
): number {
  if (weather === 'sandstorm' && stance === 'tech' && hasType(defender, 'rock')) {
    return 1.5
  }

  if (SNOW_WEATHERS.has(weather as WeatherType) && stance === 'power' && hasType(defender, 'ice')) {
    return 1.5
  }

  return 1
}

export function getWeatherAccuracy(
  baseAccuracy: number,
  weather?: WeatherType,
): number {
  const boundedAccuracy = Math.max(0, Math.min(100, baseAccuracy))
  if (boundedAccuracy >= 100) return boundedAccuracy
  if (weather === 'fog') return Math.floor(boundedAccuracy * 0.6)
  return boundedAccuracy
}

export function blocksStatusByWeather(
  statusId: string,
  weather?: WeatherType,
): boolean {
  return statusId === 'freeze' && isSunlightWeather(weather)
}

export function getWeatherDamageBlockMessage(
  attackType: string,
  weather?: WeatherType,
): string {
  const normalizedAttackType = normalizeType(attackType)
  if (weather === 'extremely-harsh-sunlight' && normalizedAttackType === 'water') {
    return 'The extreme sunlight evaporated the Water attack!'
  }
  if (weather === 'heavy-rain' && normalizedAttackType === 'fire') {
    return 'The heavy rain smothered the Fire attack!'
  }
  return ''
}

function getWeatherResidualDamage(
  pokemon: BattlePokemon,
  weather?: WeatherType,
): number {
  if (!weather || pokemon.currentHp <= 0) return 0
  if (blocksBattleWeatherDamageByAbility(pokemon, weather)) return 0

  if (weather === 'sandstorm') {
    if (hasType(pokemon, 'rock') || hasType(pokemon, 'ground') || hasType(pokemon, 'steel')) {
      return 0
    }
    return Math.max(1, Math.floor(pokemon.maxHp / 16))
  }

  if (HAIL_DAMAGE_WEATHERS.has(weather)) {
    if (hasType(pokemon, 'ice')) return 0
    return Math.max(1, Math.floor(pokemon.maxHp / 16))
  }

  if (weather === 'shadowy-aura') {
    if (pokemon.isShadow) return 0
    return Math.max(1, Math.floor(pokemon.maxHp / 16))
  }

  return 0
}

export function processEndTurnWeatherDamage(params: {
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  playerName: string
  enemyName: string
  weather?: WeatherType
}): string[] {
  const { playerMon, enemyMon, playerName, enemyName, weather } = params
  if (!weather || weather === 'clear') return []

  const weatherLabel = WEATHER_LABELS[weather]
  const messages: string[] = []

  const processPokemon = (pokemon: BattlePokemon, ownerName: string) => {
    const damage = getWeatherResidualDamage(pokemon, weather)
    if (damage <= 0) return

    pokemon.currentHp = Math.max(0, pokemon.currentHp - damage)
    messages.push(
      `${ownerName}'s ${pokemon.name} is buffeted by ${weatherLabel}! [icon:damage:${damage}]`,
    )
  }

  processPokemon(playerMon, playerName)
  processPokemon(enemyMon, enemyName)

  return messages
}
