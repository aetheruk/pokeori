import type { User, Pokemon } from '@/payload-types'
import { regionCategories } from '@/data/region-map'
import type {
  TaskCondition,
  PokemonCriteria,
  StatRequirements,
  BattleTeamCheck,
} from '@/data/tasks'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  ExtendedUser,
  SkillsData,
  CurrencyData,
  UserStats,
  PowerUsageData,
  VoyageStats,
} from '@/types/user-data'
import { isToday } from '@/utilities/date-utils'
import { resolveRequirementWeather } from '@/utilities/weather'
import { isWeatherType, type WeatherType } from '@/data/weather'

export interface BattleResult {
  id: string
  user: string | User
  battleId: string
  wins: number
  losses: number
  createdAt: string
  updatedAt: string
}

export interface LocationEncounterResult {
  id: string
  user: string | User
  locationId: string
  wins: number
  losses: number
  createdAt: string
  updatedAt: string
}

export interface ResearchEncounterResult {
  id: string
  user: string | User
  encounterId: string
  wins: number
  losses: number
  createdAt: string
  updatedAt: string
}

export interface ExpeditionResult {
  expeditionId: string
  wins: number
  losses: number
  lastPlayed?: string
  updatedAt?: string
}

export interface RequirementData {
  user: User
  rivalTrainer?: {
    id: string
    trainerName?: string | null
    icon?: string | null
    banner?: string | null
  } | null
  currentTime?: string | number | Date
  currentTimeZone?: string
  inventory: { itemId: string; quantity: number }[]
  pokemon: Pokemon[]
  tcg: { cardId: string; quantity: number; setId?: string }[]
  pokedex: {
    speciesId: number
    seen: boolean
    caught: boolean
    formId: string
    researchXp?: number
    researchLevel?: number
  }[]
  abilityDex?: {
    abilityId: string
    registered: boolean
    firstRegisteredAt?: string
    source?: string
  }[]
  completedTasks: { taskId: string; completedAt: string; count: number; updatedAt?: string }[]
  battleResults: { battleId: string; wins: number; losses: number; lastPlayed?: string }[]
  locationEncounterResults: {
    locationId: string
    wins: number
    losses: number
    lastPlayed?: string
  }[]
  researchEncounterResults: {
    encounterId: string
    wins: number
    losses: number
    lastPlayed?: string
  }[]
  expeditionResults?: ExpeditionResult[]
  currency?: User['currency']
  shopPurchases?: Record<
    string,
    {
      count?: number
      purchasedAt?: string
      firstPurchasedAt?: string
      lastPurchasedAt?: string
      shopId?: string
      itemId?: string
    }
  >
  lastRoll?: number
  weatherSlot?: number
  weatherUpdatedAt?: string
  activeExpedition?: any
}

export interface RequirementEvaluationContext {
  category?: string
  subCategory?: string
  timeZone?: string
  weather?: WeatherType
}

const UTC_TIME_ZONE = 'UTC'

export function getRegionTimeZone(category?: string): string {
  if (!category) return UTC_TIME_ZONE
  return regionCategories[category]?.timeZone || UTC_TIME_ZONE
}

export function getRegionTimeLabel(category?: string): string {
  if (!category || !regionCategories[category]) return `${UTC_TIME_ZONE} time`
  return `${category} time`
}

function getTimeZoneMinutes(date: Date, timeZone: string): number {
  const { hour, minute } = getTimeZoneClockTime(date, timeZone)
  return hour * 60 + minute
}

export function getTimeZoneClockTime(
  dateInput: string | number | Date = new Date(),
  timeZone = UTC_TIME_ZONE,
): { hour: number; minute: number; timeZone: string } {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)

  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(date)

    const hour = Number(parts.find((part) => part.type === 'hour')?.value)
    const minute = Number(parts.find((part) => part.type === 'minute')?.value)

    if (Number.isFinite(hour) && Number.isFinite(minute)) {
      return { hour, minute, timeZone }
    }
  } catch {
    // Invalid or unsupported authored time zones fall back to UTC.
  }

  return {
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    timeZone: UTC_TIME_ZONE,
  }
}

function checkStatRequirements(
  actual: number,
  required?: number,
  operator: 'gte' | 'lte' | 'eq' = 'gte',
): boolean {
  if (required === undefined) return true
  if (operator === 'gte') return actual >= required
  if (operator === 'lte') return actual <= required
  return actual === required
}

function checkStats(
  actualStats:
    | {
        hp?: number | null
        attack?: number | null
        defense?: number | null
        specialAttack?: number | null
        specialDefense?: number | null
        speed?: number | null
      }
    | undefined
    | null,
  requiredStats?: StatRequirements,
): boolean {
  if (!requiredStats) return true
  if (!actualStats) return false

  return (
    checkStatRequirements(actualStats.hp ?? 0, requiredStats.hp) &&
    checkStatRequirements(actualStats.attack ?? 0, requiredStats.attack) &&
    checkStatRequirements(actualStats.defense ?? 0, requiredStats.defense) &&
    checkStatRequirements(actualStats.specialAttack ?? 0, requiredStats.specialAttack) &&
    checkStatRequirements(actualStats.specialDefense ?? 0, requiredStats.specialDefense) &&
    checkStatRequirements(actualStats.speed ?? 0, requiredStats.speed)
  )
}

function matchesPokemonOriginValue(
  actual: string | null | undefined,
  expected?: string | string[],
): boolean {
  if (expected === undefined) return true
  if (!actual) return false

  const normalizedActual = actual.toLowerCase()
  const expectedValues = Array.isArray(expected) ? expected : [expected]
  return expectedValues.some((value) => normalizedActual === value.toLowerCase())
}

export function isPokemonEligible(pokemon: Pokemon, criteria: PokemonCriteria): boolean {
  if (criteria.speciesId && pokemon.speciesId !== criteria.speciesId) return false
  if (!matchesPokemonOriginValue(pokemon.obtainedRegion, criteria.region)) return false
  if (!matchesPokemonOriginValue(pokemon.obtainedLocation, criteria.location)) return false
  if (!matchesPokemonOriginValue(pokemon.obtainedSourceId, criteria.locationId)) return false
  if (criteria.minLevel && pokemon.level < criteria.minLevel) return false
  if (criteria.maxLevel && pokemon.level > criteria.maxLevel) return false
  if (criteria.size && pokemon.size !== criteria.size) return false
  if (criteria.shiny !== undefined && pokemon.shiny !== criteria.shiny) return false
  if (criteria.isShadow !== undefined && pokemon.isShadow !== criteria.isShadow) return false
  if (criteria.isRadiant !== undefined && pokemon.isRadiant !== criteria.isRadiant) return false
  if (criteria.identified !== undefined && pokemon.identified !== criteria.identified) return false
  if (criteria.partner !== undefined && pokemon.partner !== criteria.partner) return false
  if (criteria.formId && pokemon.formId !== criteria.formId) return false

  // Type check requires looking up the form data
  if (criteria.type) {
    const formData = getPokemonForm(pokemon.formId)
    if (!formData) return false

    const normalizedCriteriaType = criteria.type.toLowerCase()
    const match = formData.types.some((t) => t.toLowerCase() === normalizedCriteriaType)
    if (!match) return false
  }

  // Stats check
  if (criteria.stats && !checkStats(pokemon.stats, criteria.stats)) return false
  if (criteria.ivs && !checkStats(pokemon.ivs, criteria.ivs)) return false
  if (criteria.evs && !checkStats(pokemon.evs, criteria.evs)) return false

  return true
}

export function getRequirementProgress(
  data: RequirementData,
  condition: TaskCondition,
  context: RequirementEvaluationContext = {},
): { current: number; target: number; completed: boolean } {
  const { user, inventory, pokemon, tcg, pokedex, completedTasks } = data
  let current = 0
  let target = condition.count || 1

  switch (condition.type) {
    case 'user_level':
    case 'skill_level': {
      const skillId = typeof condition.targetId === 'string' ? condition.targetId : 'catching'
      const extendedUser = user as ExtendedUser
      const userSkills: SkillsData = extendedUser.skills || {}
      current = userSkills[skillId]?.level || 1
      break
    }

    case 'item_owned': {
      if (Array.isArray(condition.targetId)) {
        // Check if user has ANY of the items in the array
        const hasAny = condition.targetId.some((id) => {
          const item = inventory.find((i) => i.itemId === id)
          return (item?.quantity || 0) >= target
        })
        current = hasAny ? target : 0
      } else {
        const item = inventory.find((i) => i.itemId === condition.targetId)
        current = item?.quantity || 0
      }
      break
    }

    case 'currency_owned': {
      const currencyId = (condition.targetId as string) || 'crystals'
      const extendedUser = user as ExtendedUser
      const currency: CurrencyData = extendedUser.currency || {}
      current = currency[currencyId] || 0
      break
    }

    case 'pokemon_owned': {
      current = pokemon.filter((p) => {
        if (condition.pokemonCriteria) {
          return isPokemonEligible(p, condition.pokemonCriteria)
        }
        if (condition.targetId) {
          return p.speciesId === Number(condition.targetId)
        }
        return true
      }).length
      break
    }

    case 'card_collected_total': {
      if (condition.unique) {
        current = tcg.filter((entry) => (entry.quantity || 0) > 0).length
      } else {
        current = tcg.reduce((sum, entry) => sum + (entry.quantity || 0), 0)
      }
      break
    }

    case 'card_collected_set': {
      const setCards = tcg.filter((entry) => entry.setId === condition.targetId)
      if (condition.unique) {
        current = setCards.filter((entry) => (entry.quantity || 0) > 0).length
      } else {
        current = setCards.reduce((sum, entry) => sum + (entry.quantity || 0), 0)
      }
      break
    }

    case 'card_collected_specific': {
      const card = tcg.find((entry) => entry.cardId === condition.targetId)
      current = card?.quantity || 0
      break
    }

    case 'pokedex_seen_total': {
      current = pokedex.filter((entry) => entry.seen).length
      break
    }

    case 'pokedex_caught_total': {
      current = pokedex.filter((entry) => entry.caught).length
      break
    }

    case 'pokedex_seen_specific': {
      const entry = pokedex.find((e) => e.speciesId === Number(condition.targetId))
      current = entry?.seen ? 1 : 0
      break
    }

    case 'pokedex_caught_specific': {
      const entry = pokedex.find((e) => e.speciesId === Number(condition.targetId))
      current = entry?.caught ? 1 : 0
      break
    }

    case 'task_completed': {
      const task = completedTasks.find((t) => t.taskId === condition.targetId)
      current = task ? (typeof task.count === 'number' ? task.count : 1) : 0
      break
    }

    case 'time_range': {
      if (!condition.timeRange) {
        current = 0
        break
      }
      const now = data.currentTime ? new Date(data.currentTime) : new Date()
      const timeZone =
        context.timeZone || data.currentTimeZone || getRegionTimeZone(context.category)
      const currentMinutes = getTimeZoneMinutes(now, timeZone)

      const [startHour, startMinute] = condition.timeRange.start.split(':').map(Number)
      const [endHour, endMinute] = condition.timeRange.end.split(':').map(Number)
      const startTotal = startHour * 60 + startMinute
      const endTotal = endHour * 60 + endMinute

      let inRange = false
      if (startTotal <= endTotal) {
        inRange = currentMinutes >= startTotal && currentMinutes <= endTotal
      } else {
        // Crosses midnight
        inRange = currentMinutes >= startTotal || currentMinutes <= endTotal
      }
      current = inRange ? 1 : 0
      break
    }

    case 'date_range': {
      if (!condition.dateRange) {
        current = 0
        break
      }
      const now = new Date()
      const currentDate = now.toISOString().split('T')[0] // YYYY-MM-DD

      const inRange =
        currentDate >= condition.dateRange.start && currentDate <= condition.dateRange.end
      current = inRange ? 1 : 0
      break
    }

    case 'battle_result': {
      const battleId = condition.targetId as string
      const result = data.battleResults.find((r) => r.battleId === battleId)
      if (condition.battleStatus === 'loss') {
        current = result?.losses || 0
      } else {
        current = result?.wins || 0
      }
      break
    }

    case 'location_encounter_result': {
      const locationIds = Array.isArray(condition.targetId)
        ? condition.targetId.map(String)
        : [String(condition.targetId)]
      current = locationIds.reduce((sum, locationId) => {
        const result = data.locationEncounterResults.find((r) => r.locationId === locationId)
        return sum + (condition.battleStatus === 'loss' ? result?.losses || 0 : result?.wins || 0)
      }, 0)
      break
    }

    case 'research_encounter_result': {
      const encounterId = condition.targetId as string
      const result = data.researchEncounterResults.find((r) => r.encounterId === encounterId)
      if (condition.battleStatus === 'loss') {
        current = result?.losses || 0
      } else {
        current = result?.wins || 0
      }
      break
    }

    case 'expedition_result': {
      const results = data.expeditionResults || []
      const status = condition.expeditionStatus || 'completed'

      if (condition.targetId) {
        const expeditionId = String(condition.targetId)
        const result = results.find((r) => r.expeditionId === expeditionId)
        current = status === 'failed' ? result?.losses || 0 : result?.wins || 0
      } else {
        current = results.reduce(
          (sum, result) => sum + (status === 'failed' ? result.losses || 0 : result.wins || 0),
          0,
        )
      }

      break
    }

    case 'power_usage': {
      const powerType = condition.powerType
      const extendedUser = user as ExtendedUser
      const powerUsage: PowerUsageData = extendedUser.powerUsage || {}

      if (!powerType) {
        current = 0
        break
      }

      switch (powerType) {
        case 'tera':
          current = powerUsage.teraUses || 0
          break
        case 'mega':
          current = powerUsage.megaUses || 0
          break
        case 'z-move':
          current = powerUsage.zMoveUses || 0
          break
        case 'dynamax':
          current = powerUsage.dynamaxUses || 0
          break
        case 'shout':
          current = powerUsage.shoutUses || 0
          break
        case 'victory':
          current = powerUsage.victoryUses || 0
          break
        case 'weather':
          current = powerUsage.weatherUses || 0
          break
        case 'circadian':
          current = powerUsage.circadianUses || 0
          break
        default:
          current = 0
      }
      break
    }

    case 'total_evolutions': {
      const extendedUser = user as ExtendedUser
      const userStats: UserStats = extendedUser.stats || {}
      current = (userStats as any).totalEvolutions || 0
      break
    }

    case 'total_battles_won': {
      current = data.battleResults.reduce((sum, r) => sum + r.wins, 0)
      break
    }

    case 'voyage_completed': {
      const extendedUser = user as ExtendedUser
      const voyageStats: VoyageStats = extendedUser.voyageStats || {
        completedVoyages: {},
        totalCompleted: 0,
      }

      if (condition.targetId) {
        // Check specific voyage
        const voyageData = voyageStats.completedVoyages?.[condition.targetId as string]
        current = voyageData?.count || 0
      } else {
        // Check total voyages
        current = voyageStats.totalCompleted || 0
      }
      break
    }

    case 'user_banner': {
      const extendedUser = user as ExtendedUser
      const currentBanner = extendedUser.banner || 'lab'
      current = currentBanner === condition.targetId ? 1 : 0
      break
    }

    case 'user_icon': {
      const extendedUser = user as ExtendedUser
      const currentIcon = extendedUser.icon || 'trainer-red'
      current = currentIcon === condition.targetId ? 1 : 0
      break
    }

    case 'user_title': {
      const extendedUser = user as ExtendedUser
      const currentTitle = extendedUser.title || 'new-beginnings'
      current = currentTitle === condition.targetId ? 1 : 0
      break
    }

    case 'battle_team': {
      if (!condition.battleTeamCheck) {
        current = 0
        break
      }

      const check = condition.battleTeamCheck
      target = check.qty || 1 // Override target for battle_team

      // Filter Pokemon that are on the battle team
      let battleTeamPokemon = pokemon.filter((p) => p.onBattleTeam === true)

      // If position is specified (not 'any'), filter by position
      if (check.position !== 'any') {
        battleTeamPokemon = battleTeamPokemon.filter((p) => p.battleTeamPosition === check.position)
      }

      // Apply species/form/type filtering using isPokemonEligible
      const eligiblePokemon = battleTeamPokemon.filter((p) => {
        // Build criteria object from battleTeamCheck
        const criteria: PokemonCriteria = {}
        if (check.speciesId !== undefined) criteria.speciesId = check.speciesId
        if (check.formId !== undefined) criteria.formId = check.formId
        if (check.type !== undefined) criteria.type = check.type
        if (check.region !== undefined) criteria.region = check.region
        if (check.location !== undefined) criteria.location = check.location
        if (check.locationId !== undefined) criteria.locationId = check.locationId
        if (check.isShadow !== undefined) criteria.isShadow = check.isShadow
        if (check.isRadiant !== undefined) criteria.isRadiant = check.isRadiant
        if (check.stats !== undefined) criteria.stats = check.stats

        // Check if Pokemon matches criteria
        return isPokemonEligible(p, criteria)
      })

      current = eligiblePokemon.length
      break
    }

    case 'companion': {
      if (!condition.companionCheck) {
        current = pokemon.some((p) => p.isCompanion) ? 1 : 0
        break
      }

      const check = condition.companionCheck
      target = 1

      const companionPokemon = pokemon.find((p) => p.isCompanion === true)

      if (!companionPokemon) {
        current = 0
        break
      }

      const eligible = isPokemonEligible(companionPokemon, check)
      current = eligible ? 1 : 0
      break
    }

    case 'research_level': {
      // Check a specific form's research level
      // targetId = formId, count = minimum level required
      const targetFormId = condition.targetId?.toString()
      if (targetFormId) {
        current = pokedex
          .filter((p) => p.formId === targetFormId)
          .reduce((highest, entry) => Math.max(highest, entry.researchLevel || 0), 0)
      }
      break
    }

    case 'research_level_total': {
      // Count how many forms have reached at least level X
      // count = number of forms required, level = minimum research level
      const minLevel = condition.level || 1
      target = condition.count || 1
      current = pokedex.filter((p) => (p.researchLevel || 0) >= minLevel).length
      break
    }

    case 'daily_not_completed': {
      const activityId = condition.targetId as string
      target = 1

      let playedToday = false

      // Check battle results
      const battleResult = data.battleResults.find((r) => r.battleId === activityId)
      if (battleResult && battleResult.wins > 0) {
        const lastDate = (battleResult as any).updatedAt || battleResult.lastPlayed
        playedToday = isToday(lastDate)
      }

      // Check location encounter results
      if (!playedToday) {
        const locationResult = data.locationEncounterResults.find(
          (r) => r.locationId === activityId,
        )
        if (locationResult && locationResult.wins > 0) {
          const lastDate = (locationResult as any).updatedAt || locationResult.lastPlayed
          playedToday = isToday(lastDate)
        }
      }

      // Check research encounter results
      if (!playedToday) {
        const researchResult = data.researchEncounterResults.find(
          (r) => r.encounterId === activityId,
        )
        if (researchResult && researchResult.wins > 0) {
          const lastDate = (researchResult as any).updatedAt || researchResult.lastPlayed
          playedToday = isToday(lastDate)
        }
      }

      // Check expedition results
      if (!playedToday) {
        const expeditionResult = (data.expeditionResults || []).find(
          (r) => r.expeditionId === activityId,
        )
        if (expeditionResult && (expeditionResult.wins || 0) + (expeditionResult.losses || 0) > 0) {
          const lastDate = expeditionResult.updatedAt || expeditionResult.lastPlayed
          playedToday = isToday(lastDate)
        }
      }

      // Check completed tasks
      if (!playedToday) {
        const taskResult = completedTasks.find((t) => t.taskId === activityId)
        if (taskResult) {
          const lastDate = taskResult.updatedAt || taskResult.completedAt
          playedToday = isToday(lastDate)
        }
      }

      // "Not completed today" requirement is met when NOT played today
      current = playedToday ? 0 : 1
      break
    }

    case 'daily_catch':
    case 'daily_battle':
    case 'daily_card':
    case 'daily_crystalize': {
      current = condition.progress || 0
      break
    }

    case 'rival_selected': {
      const extendedUser = user as ExtendedUser
      current = extendedUser.rivalTrainerId ? 1 : 0
      break
    }

    case 'weather': {
      target = 1
      const currentWeather = resolveRequirementWeather(
        context.subCategory,
        data.weatherSlot || (data.user as any).weatherSlot,
        context.weather,
      )
      const expectedWeather = Array.isArray(condition.targetId)
        ? condition.targetId
        : [condition.targetId]
      current = expectedWeather.some((value) => isWeatherType(value) && value === currentWeather)
        ? 1
        : 0
      break
    }

    case 'roll': {
      current = data.lastRoll || 0
      break
    }

    case 'any_of': {
      target = 1
      current = (condition.conditions || []).some((nestedCondition) =>
        checkRequirement(data, nestedCondition, context),
      )
        ? 1
        : 0
      break
    }

    default:
      current = 0
      break
  }

  let completed = condition.inverse ? current < target : current >= target

  // Special handling for roll: we want current <= target (where target is rarity threshold)
  if (condition.type === 'roll') {
    completed = condition.inverse ? current > target : current > 0 && current <= target
  }

  return {
    current,
    target,
    completed,
  }
}

export function checkRequirement(
  data: RequirementData,
  condition: TaskCondition,
  context: RequirementEvaluationContext = {},
): boolean {
  return getRequirementProgress(data, condition, context).completed
}
