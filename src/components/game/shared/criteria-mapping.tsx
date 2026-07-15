import {
  BookOpen,
  Calendar,
  Clock,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Cloudy,
  Flag,
  Heart,
  Search,
  ShoppingBag,
  Star,
  Sun,
  Swords,
  ThermometerSun,
  Trophy,
  Users,
  Wind,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import type React from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import { RewardItem } from '@/components/game/reward-carousel'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { ItemSprite } from '@/components/ui/item-sprite'
import { battles } from '@/data/battles'
import { getCurrency } from '@/data/currencies'
import { expeditions } from '@/data/expeditions'
import { research } from '@/data/games'
import { items } from '@/data/items'
import { locations } from '@/data/locations'
import { getSkill } from '@/data/skills'
import { TaskCondition, tasks } from '@/data/tasks'
import type { TaskIcon } from '@/data/tasks/types'
import { getBanner, getIcon, getTitle } from '@/data/user'
import { isWeatherType, WEATHER_LABELS, type WeatherType } from '@/data/weather'
import {
  getPokemonForm,
  getPokemonImageUrl,
  getPokemonSpecies,
} from '@/utilities/pokemon/pokedex'
import { getRegionTimeLabel } from '@/utilities/requirements'

function countLabel(count: number): string {
  return count > 1 ? `${count}x ` : ''
}

function pluralize(word: string, count: number): string {
  return count === 1 ? word : `${word}s`
}

function pokemonNoun(count: number): string {
  return pluralize('Pokemon', count)
}

function getContentIcon(
  icon?: TaskIcon,
  fallback?: React.ReactNode,
): React.ReactNode {
  if (icon) return <TaskIconDisplay icon={icon} className="w-7 h-7" />
  return fallback || <BookOpen className="w-5 h-5 text-game-moss-strong" />
}

function getLocationCatchTarget(location?: {
  encounters?: Array<{ speciesId: number }>
}) {
  const speciesIds = [
    ...new Set((location?.encounters || []).map((entry) => entry.speciesId)),
  ]
  if (speciesIds.length !== 1) return null
  return getPokemonSpecies(speciesIds[0])?.name || null
}

function getLocationPreposition(locationName?: string) {
  return locationName?.toLowerCase().startsWith('route ') ? 'on' : 'in'
}

function formatPowerName(powerType?: string) {
  const labels: Record<string, string> = {
    tera: 'Tera Power',
    mega: 'Mega Evolution',
    'z-move': 'Z-Move',
    dynamax: 'Dynamax',
    shout: 'Shout',
    victory: 'Victory Power',
    weather: 'Weather Control',
    circadian: 'Circadian Power',
  }
  return powerType ? labels[powerType] || powerType : 'Power'
}

function formatGameAction(gameType?: string): string {
  const labels: Record<string, string> = {
    silhouette: 'Identify',
    identify: 'Identify',
    snap: 'Photograph',
    cry: 'Complete',
    compare: 'Compare',
    'rock-push': 'Solve',
    run: 'Run',
    flap: 'Score in',
    slots: 'Play',
    pachinko: 'Play',
    'prize-wheel': 'Spin',
    fishing: 'Fish',
    match3: 'Clear',
    spelling: 'Spell through',
    'sliding-puzzle': 'Solve',
    rhythm: 'Complete',
    mining: 'Mine in',
    'tcg-inspection': 'Inspect',
    'tcg-battle': 'Win',
    'field-observation': 'Study',
  }
  return gameType ? labels[gameType] || 'Complete' : 'Complete'
}

function getTcgSetCollectionLabel(setId?: string): string {
  if (!setId) return 'TCG Collection'

  const binder = items.find((item) => item.id === `binder-${setId}`)
  const binderSetName = binder?.name.match(/\((.+)\)$/)?.[1]
  return `${binderSetName || setId} Collection`
}

function getPokemonTraitLabel(criteria?: {
  shiny?: boolean
  isShadow?: boolean
  isRadiant?: boolean
}): string {
  if (!criteria) return ''
  const traits = []
  if (criteria.shiny) traits.push('Shiny')
  if (criteria.isShadow) traits.push('Shadow')
  if (criteria.isRadiant) traits.push('Radiant')
  return traits.length > 0 ? `${traits.join(' ')} ` : ''
}

function getPokemonOriginLabel(criteria?: {
  region?: string | string[]
  location?: string | string[]
  locationId?: string | string[]
}): string {
  if (!criteria) return ''
  const origins = []
  if (criteria.region) {
    const region = Array.isArray(criteria.region)
      ? criteria.region.join('/')
      : criteria.region
    origins.push(region)
  }
  if (criteria.location || criteria.locationId) {
    const location = criteria.location || criteria.locationId
    const locationLabel = Array.isArray(location)
      ? location.join('/')
      : location
    origins.push(locationLabel)
  }
  return origins.length > 0 ? ` from ${origins.join(' / ')}` : ''
}

function getWeatherIcon(weather: WeatherType): React.ReactNode {
  const className = 'w-5 h-5 text-game-moss-strong'
  switch (weather) {
    case 'harsh-sunlight':
      return <Sun className={className} />
    case 'extremely-harsh-sunlight':
      return <ThermometerSun className={className} />
    case 'rain':
      return <CloudRain className={className} />
    case 'heavy-rain':
      return <CloudRainWind className={className} />
    case 'thunderstorm':
      return <CloudLightning className={className} />
    case 'sandstorm':
      return <Wind className={className} />
    case 'hail':
      return <CloudHail className={className} />
    case 'snow':
    case 'snowstorm':
      return <CloudSnow className={className} />
    case 'fog':
      return <CloudFog className={className} />
    case 'strong-winds':
      return <Wind className={className} />
    case 'shadowy-aura':
      return <Cloudy className={className} />
    default:
      return <CloudSun className={className} />
  }
}

function getWeatherRequirementLabel(targetId: TaskCondition['targetId']): {
  icon: React.ReactNode
  label: string
} {
  const weatherIds = (Array.isArray(targetId) ? targetId : [targetId]).filter(
    isWeatherType,
  )
  const weather = weatherIds[0] || 'clear'
  return {
    icon: getWeatherIcon(weather),
    label:
      weatherIds.map((id) => WEATHER_LABELS[id]).join(' / ') ||
      WEATHER_LABELS.clear,
  }
}

export function mapCriteriaToDisplayItem(
  condition: TaskCondition,
  context: { category?: string; subCategory?: string } = {},
): RewardItem {
  // Handle secret conditions
  if (condition.secret) {
    return {
      icon: <BookOpen className="w-5 h-5 text-game-moss-strong" />,
      label: '???',
      subLabel: 'Secret Requirement',
    }
  }

  const count = condition.count || 1

  switch (condition.type) {
    case 'user_level':
    case 'skill_level': {
      const skillId = condition.targetId as string
      const skill = skillId ? getSkill(skillId) : undefined
      const skillName =
        skill?.name ||
        (skillId
          ? skillId.charAt(0).toUpperCase() + skillId.slice(1)
          : 'Trainer')

      return {
        icon: skill?.iconId ? (
          <Image
            src={`/fallback/skills/${skill.iconId}`}
            alt={skillName}
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
          />
        ) : (
          <Star className="w-5 h-5 text-game-moss-strong" />
        ),
        label: `Reach Level ${count} ${skillId ? `in ${skillName}` : skillName}`,
        subLabel: 'Skill Requirement',
      }
    }
    case 'item_owned': {
      const itemId = Array.isArray(condition.targetId)
        ? condition.targetId[0]
        : condition.targetId?.toString() || ''
      const item = items.find((i) => i.id === itemId)
      const verb = condition.consume ? 'Spend' : 'Have'
      return {
        icon: itemId ? (
          <ItemSprite
            itemId={itemId}
            alt={item?.name || 'Item'}
            className="w-6 h-6"
          />
        ) : (
          <ShoppingBag className="w-5 h-5 text-game-moss-strong" />
        ),
        label: `${verb} ${countLabel(count)}${item?.name || 'Item'}`,
        subLabel: 'Item Required',
      }
    }
    case 'currency_owned': {
      const currencyId = condition.targetId?.toString() || ''
      const currency = getCurrency(currencyId)
      return {
        icon: currency?.iconId ? (
          <ItemSprite
            itemId={currency.iconId}
            alt={currency.name}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-game-ochre" />
        ),
        label: `${condition.consume ? 'Pay' : 'Have'} ${countLabel(count)}${currency?.name || condition.targetId || 'Currency'}`,
        subLabel: 'Funds Required',
      }
    }
    case 'pokemon_owned': {
      const traitLabel = getPokemonTraitLabel(condition.pokemonCriteria)
      const originLabel = getPokemonOriginLabel(condition.pokemonCriteria)
      const verb = condition.consume ? 'Trade' : 'Have'
      // 1. Check for specific species requirement
      if (condition.pokemonCriteria?.speciesId || condition.targetId) {
        const speciesId =
          condition.pokemonCriteria?.speciesId || Number(condition.targetId)
        const species = getPokemonSpecies(speciesId)
        return {
          icon: (
            <Image
              src={getPokemonImageUrl(speciesId.toString(), 'sprite', false)}
              alt="Pokemon"
              width={32}
              height={32}
              className="pixelated"
            />
          ),
          label: `${verb} ${countLabel(count)}${traitLabel}${species?.name || 'Pokemon'}${originLabel}`,
          subLabel: 'Collection Requirement',
        }
      }

      // 2. Check for type requirement
      if (condition.pokemonCriteria?.type) {
        return {
          icon: <MdCatchingPokemon className="w-5 h-5 text-game-moss-strong" />,
          label: `${verb} ${countLabel(count)}${traitLabel}${condition.pokemonCriteria.type}-type ${pokemonNoun(count)}${originLabel}`,
          subLabel: 'Collection Requirement',
        }
      }

      // 3. Fallback for generic Pokemon requirement
      return {
        icon: <MdCatchingPokemon className="w-5 h-5 text-game-muted" />,
        label: `${verb} ${countLabel(count)}${traitLabel}${pokemonNoun(count)}${originLabel}`,
        subLabel: 'Collection Requirement',
      }
    }
    case 'task_completed': {
      const task = tasks.find((t) => t.id === condition.targetId)
      const verb = condition.inverse ? 'Do not complete' : 'Complete'
      return {
        icon: getContentIcon(task?.icon),
        label: `${verb} ${countLabel(count)}${task?.name || condition.targetId || 'Task'}`,
        subLabel: 'Task Requirement',
      }
    }
    case 'task_active': {
      const task = tasks.find((t) => t.id === condition.targetId)
      return {
        icon: getContentIcon(task?.icon),
        label: `Start ${task?.name || condition.targetId || 'Task'}`,
        subLabel: 'Active Task',
      }
    }
    case 'time_range':
      return {
        icon: <Clock className="w-5 h-5 text-game-moss-strong" />,
        label: `${condition.timeRange?.start} - ${condition.timeRange?.end} ${getRegionTimeLabel(context.category)}`,
        subLabel: 'Available Time',
      }
    case 'weather': {
      const weatherRequirement = getWeatherRequirementLabel(condition.targetId)
      return {
        icon: weatherRequirement.icon,
        label: `${condition.inverse ? 'Not ' : ''}${weatherRequirement.label}`,
        subLabel: context.subCategory
          ? `${context.subCategory} Weather`
          : 'Weather',
      }
    }
    case 'date_range':
      return {
        icon: <Calendar className="w-5 h-5 text-game-moss-strong" />,
        label: `${condition.dateRange?.start} to ${condition.dateRange?.end}`,
        subLabel: 'Available Dates',
      }
    case 'battle_result': {
      const battle = battles.find((b) => b.id === condition.targetId)
      const isLoss = condition.battleStatus === 'loss'
      const action = isLoss ? 'Lose to' : 'Defeat'
      const target = battle?.isWildBattle
        ? `${count === 1 ? 'a Pokemon' : `${count} Pokemon`} on ${battle.name}`
        : `${battle?.name || 'Opponent'}${count > 1 ? ` ${count} times` : ''}`
      return {
        icon: getContentIcon(
          battle?.icon,
          <Swords className="w-5 h-5 text-game-moss-strong" />,
        ),
        label: isLoss ? `${action} ${target}` : `${action} ${target}`,
        subLabel: 'Battle Requirement',
      }
    }
    case 'location_encounter_result': {
      const locationId = Array.isArray(condition.targetId)
        ? condition.targetId[0]
        : condition.targetId
      const location = locations.find((l) => l.id === locationId)
      const catchTarget = getLocationCatchTarget(location)
      const target =
        catchTarget && count === 1
          ? catchTarget
          : catchTarget
            ? `${count} ${catchTarget}`
            : count === 1
              ? 'a Pokemon'
              : `${count} Pokemon`
      return {
        icon: getContentIcon(
          location?.icon,
          <MdCatchingPokemon className="w-5 h-5 text-game-moss-strong" />,
        ),
        label:
          condition.battleStatus === 'loss'
            ? `Fail a catch ${getLocationPreposition(location?.name)} ${location?.name || 'Location'}`
            : `Catch ${target} ${getLocationPreposition(location?.name)} ${location?.name || 'Location'}`,
        subLabel: 'Catch Requirement',
      }
    }
    case 'research_encounter_result': {
      const encounter = research.find((r) => r.id === condition.targetId)
      const action = formatGameAction((encounter as any)?.gameType)
      return {
        icon: getContentIcon(
          encounter?.icon,
          <Search className="w-5 h-5 text-game-moss-strong" />,
        ),
        label:
          condition.battleStatus === 'loss'
            ? `Fail ${countLabel(count)}${encounter?.name || 'Research'}`
            : `${action} ${countLabel(count)}${encounter?.name || 'Research'}`,
        subLabel: 'Research Requirement',
      }
    }
    case 'expedition_result': {
      const expedition = expeditions.find(
        (entry) => entry.id === condition.targetId,
      )
      const statusLabel =
        condition.expeditionStatus === 'failed' ? 'Fail' : 'Complete'
      return {
        icon: getContentIcon(
          expedition?.icon,
          <Flag className="w-5 h-5 text-game-moss-strong" />,
        ),
        label: `${statusLabel} ${countLabel(count)}${expedition?.name || condition.targetId || 'Expedition'}`,
        subLabel: 'Expedition Requirement',
      }
    }
    case 'pokedex_caught_total':
      return {
        icon: <MdCatchingPokemon className="w-5 h-5 text-game-moss-strong" />,
        label: `Catch ${count} Pokemon`,
        subLabel: 'Pokedex Requirement',
      }
    case 'pokedex_seen_total':
      return {
        icon: <BookOpen className="w-5 h-5 text-game-moss-strong" />,
        label: `See ${count} Pokemon`,
        subLabel: 'Pokedex Requirement',
      }
    case 'pokedex_caught_specific': {
      const speciesId = Number(condition.targetId)
      const species = getPokemonSpecies(speciesId)
      return {
        icon: (
          <Image
            src={getPokemonImageUrl(speciesId.toString(), 'sprite', false)}
            alt="Pokemon"
            width={32}
            height={32}
            className="pixelated"
          />
        ),
        label: `Catch ${countLabel(count)}${species?.name || 'Pokemon'}`,
        subLabel: 'Pokedex Requirement',
      }
    }
    case 'pokedex_seen_specific': {
      const speciesId = Number(condition.targetId)
      const species = getPokemonSpecies(speciesId)
      return {
        icon: (
          <Image
            src={getPokemonImageUrl(speciesId.toString(), 'sprite', false)}
            alt="Pokemon"
            width={32}
            height={32}
            className="pixelated opacity-70"
          />
        ),
        label: `See ${countLabel(count)}${species?.name || 'Pokemon'}`,
        subLabel: 'Pokedex Requirement',
      }
    }
    case 'card_collected_total':
      return {
        icon: (
          <Image
            src="/sprites/card.avif"
            alt="TCG Card"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        ),
        label: `Collect ${count} TCG Cards`,
        subLabel: 'Collection Requirement',
      }
    case 'card_collected_set':
      return {
        icon: (
          <Image
            src="/sprites/card.avif"
            alt="TCG Card"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        ),
        label: getTcgSetCollectionLabel(condition.targetId?.toString()),
        subLabel: 'Collection Requirement',
      }
    case 'card_collected_specific':
      return {
        icon: (
          <Image
            src="/sprites/card.avif"
            alt="TCG Card"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        ),
        label: `Collect ${countLabel(count)}${condition.targetId}`,
        subLabel: 'Collection Requirement',
      }
    case 'power_usage':
      return {
        icon: <Zap className="w-5 h-5 text-game-moss-strong" />,
        label: `Use ${formatPowerName(condition.powerType)} ${count} ${pluralize('time', count)}`,
        subLabel: 'Battle Requirement',
      }
    case 'total_evolutions':
      return {
        icon: <Zap className="w-5 h-5 text-game-moss-strong" />,
        label: `Evolve ${count} Pokemon`,
        subLabel: 'Evolution Requirement',
      }
    case 'voyage_completed':
      return {
        icon: <Flag className="w-5 h-5 text-game-moss-strong" />,
        label: condition.targetId
          ? `Complete ${countLabel(count)}${condition.targetId}`
          : `Complete ${count} ${pluralize('Voyage', count)}`,
        subLabel: 'Voyage Requirement',
      }
    case 'user_banner': {
      const bannerDef = getBanner(condition.targetId as string)
      return {
        icon: <ShoppingBag className="w-5 h-5 text-game-moss-strong" />,
        label: `Set Banner: ${bannerDef?.name || condition.targetId}`,
        subLabel: 'Profile Customization',
      }
    }
    case 'user_icon': {
      const iconDef = getIcon(condition.targetId as string)
      return {
        icon: <ShoppingBag className="w-5 h-5 text-game-moss-strong" />,
        label: `Set Icon: ${iconDef?.name || condition.targetId}`,
        subLabel: 'Profile Customization',
      }
    }
    case 'user_title': {
      const titleDef = getTitle(condition.targetId as string)
      return {
        icon: <Trophy className="w-5 h-5 text-game-moss-strong" />,
        label: `Set Title: ${titleDef?.name || condition.targetId}`,
        subLabel: 'Profile Customization',
      }
    }
    case 'battle_team': {
      const check = condition.battleTeamCheck
      if (!check) {
        return {
          icon: <Users className="w-5 h-5 text-game-moss-strong" />,
          label: 'Battle Team Requirement',
          subLabel: 'Team Composition',
        }
      }

      const qty = check.qty || 1
      const traitLabel = getPokemonTraitLabel(check)
      const originLabel = getPokemonOriginLabel(check)
      let description = `Put ${countLabel(qty)}${traitLabel}`

      // Add species/type info
      if (check.speciesId) {
        const species = getPokemonSpecies(check.speciesId)
        description += `${species?.name || 'Pokemon'}${originLabel}`
        return {
          icon: (
            <Image
              src={getPokemonImageUrl(
                check.speciesId.toString(),
                'sprite',
                false,
              )}
              alt="Pokemon"
              width={32}
              height={32}
              className="pixelated"
            />
          ),
          label: `${description}${check.position !== 'any' ? ` in battle slot ${check.position}` : ' on your battle team'}`,
          subLabel: 'Team Composition',
        }
      } else if (check.type) {
        description += `${check.type}-type ${pokemonNoun(qty)}${originLabel}`
      } else {
        description += `${pokemonNoun(qty)}${originLabel}`
      }

      // Add position info if specific
      if (check.position !== 'any') {
        description += ` in battle slot ${check.position}`
      } else {
        description += ' on your battle team'
      }

      return {
        icon: <Users className="w-5 h-5 text-game-moss-strong" />,
        label: description,
        subLabel: 'Team Composition',
      }
    }
    case 'companion': {
      const check = condition.companionCheck
      const label = condition.label?.trim()
      if (!check) {
        return {
          icon: <Heart className="w-5 h-5 text-game-moss-strong" />,
          label: label || 'Companion Requirement',
          subLabel: 'Active Companion',
        }
      }

      let description = 'Set'
      const traitLabel = getPokemonTraitLabel(check)
      const originLabel = getPokemonOriginLabel(check)

      // Add species/type info
      if (check.speciesId) {
        const species = getPokemonSpecies(check.speciesId)
        description += ` ${traitLabel}${species?.name || 'Pokemon'}${originLabel}`
        return {
          icon: (
            <Image
              src={getPokemonImageUrl(
                check.speciesId.toString(),
                'sprite',
                false,
              )}
              alt="Pokemon"
              width={32}
              height={32}
              className="pixelated"
            />
          ),
          label: label || `${description} as your companion`,
          subLabel: 'Active Companion',
        }
      } else if (check.type) {
        description += ` a ${traitLabel}${check.type}-type Pokemon${originLabel}`
      } else {
        description += ` a ${traitLabel}Pokemon${originLabel}`
      }

      return {
        icon: <Heart className="w-5 h-5 text-game-moss-strong" />,
        label: label || `${description} as your companion`,
        subLabel: 'Active Companion',
      }
    }
    case 'research_level': {
      const formId = condition.targetId?.toString() || ''
      const formData = formId ? getPokemonForm(formId) : null
      return {
        icon: formId ? (
          <Image
            src={getPokemonImageUrl(formId, 'sprite', false)}
            alt={formData?.name || 'Pokemon'}
            width={32}
            height={32}
            className="pixelated"
          />
        ) : (
          <Search className="w-5 h-5 text-game-moss-strong" />
        ),
        label: `Reach Research Level ${count} with ${formData?.name || formId}`,
        subLabel: 'Research Requirement',
      }
    }
    case 'research_level_total': {
      const minLvl = condition.level || 1
      return {
        icon: <BookOpen className="w-5 h-5 text-game-moss-strong" />,
        label: `Research ${count} ${pluralize('form', count)} to level ${minLvl}+`,
        subLabel: 'Research Requirement',
      }
    }

    case 'total_battles_won': {
      return {
        icon: <Swords className="w-5 h-5 text-game-moss-strong" />,
        label: `Win ${count} total ${pluralize('battle', count)}`,
        subLabel: 'Battle Requirement',
      }
    }

    case 'daily_not_completed': {
      return {
        icon: <Calendar className="w-5 h-5 text-game-moss-strong" />,
        label: 'Daily Activity',
        subLabel: 'Once per day',
      }
    }

    // Explicit Daily Trackers
    case 'daily_catch': {
      let description = `Catch ${count}`
      if (condition.pokemonCriteria?.speciesId || condition.targetId) {
        const speciesId =
          condition.pokemonCriteria?.speciesId || Number(condition.targetId)
        const species = getPokemonSpecies(speciesId)
        description += ` ${species?.name || 'Pokemon'}`
      } else if (condition.pokemonCriteria?.type) {
        description += ` ${condition.pokemonCriteria.type} Type Pokemon`
      } else {
        description += ' Pokemon'
      }

      return {
        icon: <MdCatchingPokemon className="w-5 h-5 text-game-moss-strong" />,
        label: description,
        subLabel: 'Target Practice',
      }
    }
    case 'daily_battle': {
      let label = `Win ${count}`
      if (condition.battleType === 'wild') {
        label = `Defeat ${count} wild ${pokemonNoun(count)}`
      } else if (condition.battleType === 'trainer') {
        label += ` trainer ${pluralize('battle', count)}`
      } else {
        label += ` ${pluralize('battle', count)}`
      }

      return {
        icon: <Swords className="w-5 h-5 text-game-moss-strong" />,
        label,
        subLabel: 'Combat Drill',
      }
    }
    case 'daily_card': {
      return {
        icon: (
          <Image
            src="/sprites/card.avif"
            alt="TCG Card"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
        ),
        label: `Collect ${count} Cards`,
        subLabel: 'TCG Discovery',
      }
    }
    case 'daily_crystalize': {
      return {
        icon: <Zap className="w-5 h-5 text-game-moss-strong" />,
        label: `Crystalize ${count} Cards`,
        subLabel: 'TCG Mastery',
      }
    }

    case 'rival_selected':
      return {
        icon: <Users className="w-5 h-5 text-game-moss-strong" />,
        label: 'Choose a rival',
        subLabel: 'Story Requirement',
      }

    case 'roll':
      return {
        icon: <Star className="w-5 h-5 text-game-ochre" />,
        label: 'Random event',
        subLabel: condition.count
          ? `1:${condition.count} chance`
          : 'Chance Encounter',
      }

    case 'any_of':
      return {
        icon: <BookOpen className="w-5 h-5 text-game-moss-strong" />,
        label: condition.label || 'Meet any listed requirement',
        subLabel: 'Alternative Requirement',
      }

    default:
      return {
        icon: <BookOpen className="w-5 h-5 text-game-moss-strong" />,
        label: 'Unknown Requirement',
        subLabel: 'Criteria',
      }
  }
}
