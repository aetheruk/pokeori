import {
  AlertCircle,
  Box,
  Coins,
  HelpCircle,
  Lock,
  Package,
  Scroll,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Badge } from '@/components/ui/badge'
import { ItemSprite } from '@/components/ui/item-sprite'
import { getCurrency } from '@/data/currencies'
import { items } from '@/data/items'
import { getSkill } from '@/data/skills'
import { tasks } from '@/data/tasks'
import { getBanner, getIcon, getTitle } from '@/data/user'
import { getPokemonForm, getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

const BACKGROUND_REWARD_SPRITE = '/sprites/items/forest-photo.avif'
const TITLE_REWARD_SPRITE = '/sprites/items/certificate.avif'

// Define a compatible Reward interface if the strict Payload type isn't easily available or too complex
// Based on usage in LocationList/TaskList: { type: string, targetId?: string, quantity?: number | {min, max}, label?: string, dropChance?: number }
export interface DisplayableReward {
  type: string
  targetId?: string | number
  quantity?: number | { min: number; max: number }
  label?: string
  dropChance?: number
  shiny?: boolean
  secret?: boolean
  requirements?: Array<{ type: string; [key: string]: unknown }>
  // Additional properties used in specific reward types
  pokemonData?: { shiny?: boolean; [key: string]: unknown }
  skill?: string
  currencyType?: string
}

export interface RewardDisplayItem {
  label: string | React.ReactNode
  subLabel?: string
  icon: React.ReactNode
}

export interface RewardMappingContext {
  completedTasks?: string[] // IDs of completed tasks
  checkRequirements?: (requirements?: any[]) => boolean
  userInventory?: Record<string, number>
  user?: any
}

export function mapRewardToDisplayItem(
  reward: DisplayableReward,
  context?: RewardMappingContext,
): RewardDisplayItem | null {
  if (
    reward.type !== 'task_complete' &&
    reward.requirements &&
    reward.requirements.length > 0 &&
    context?.checkRequirements &&
    !context.checkRequirements(reward.requirements)
  ) {
    return null
  }

  let label: string | React.ReactNode = reward.label || reward.type
  let icon: React.ReactNode = <Box className="w-8 h-8 text-game-muted" />

  // By default show percentage, but some types might override this
  let subLabel = reward.dropChance ? `${reward.dropChance}%` : ''

  const formatQuantity = (q?: number | { min: number; max: number }) => {
    if (!q) return ''
    if (typeof q === 'number') return `x${q}`
    return `x${q.min}-${q.max}`
  }

  const quantityStr = formatQuantity(reward.quantity)

  switch (reward.type) {
    case 'item': {
      const itemDef = items.find((i) => i.id === reward.targetId)

      // Filter unique items if owned
      if (
        itemDef?.unique &&
        context?.userInventory?.[itemDef.id] &&
        context.userInventory[itemDef.id] > 0
      ) {
        return null
      }

      label = itemDef ? itemDef.name : (reward.targetId as string)
      if (quantityStr) label += ` ${quantityStr}`

      if (itemDef) {
        icon = (
          <div className="relative w-8 h-8">
            <ItemSprite
              itemId={itemDef.id}
              alt={label as string}
              className="object-contain pixelated"
              width={32}
              height={32}
            />
          </div>
        )
      } else {
        icon = <Box className="w-6 h-6 text-game-moss-strong" />
      }
      break
    }
    case 'pokemon': {
      // Look up pokemon data
      const targetId = reward.targetId || '1'
      const pokemon = getPokemonForm(targetId)

      const isShiny = reward.shiny || reward.pokemonData?.shiny

      if (pokemon) {
        label = pokemon.name
      } else {
        label = `Pokemon`
      }

      if (isShiny) {
        label = (
          <span className="flex items-center gap-1">
            <span>{label}</span>
            <Star className="w-3 h-3 text-game-ochre fill-game-ochre" />
          </span>
        )
      }

      icon = (
        <div className="relative w-8 h-8">
          <Image
            src={getPokemonImageUrl(targetId.toString(), 'sprite', isShiny)}
            alt="Pokemon"
            fill
            className="object-contain pixelated"
          />
        </div>
      )
      break
    }
    case 'xp': {
      // Format: "50x Researcher XP"
      const lookupId = reward.targetId || reward.skill
      const skill = getSkill(lookupId as string)
      const qty = typeof reward.quantity === 'number' ? reward.quantity : 0

      if (skill?.iconId) {
        label = `${qty}x ${skill.name} XP`
        if (skill.iconId.match(/\.(?:avif|png|webp|jpe?g)$/)) {
          icon = (
            <div className="relative w-8 h-8">
              <Image
                src={`/fallback/skills/${skill.iconId}`}
                alt={skill.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          )
        } else {
          icon = (
            <div className="relative w-8 h-8">
              <ItemSprite
                itemId={skill.iconId}
                alt={skill.name}
                className="object-contain pixelated"
                width={32}
                height={32}
              />
            </div>
          )
        }
      } else {
        label = `${qty}x XP`
        icon = <Star className="w-6 h-6 text-game-ochre" />
      }
      break
    }
    case 'currency': {
      // Use targetId if present, otherwise try currencyType (common in older configs)
      const lookupId = reward.targetId || reward.currencyType
      const currency = getCurrency(lookupId as string)

      if (!currency) {
        if (process.env.NODE_ENV === 'development')
          console.warn('Currency not found for targetId:', reward.targetId)
      }

      label = currency ? `${currency.name}` : `Coins`
      if (quantityStr) label += ` ${quantityStr}`

      // Use local sprite for currency if iconId is available
      if (currency?.iconId) {
        icon = (
          <div className="relative w-8 h-8">
            <ItemSprite
              itemId={currency.iconId}
              alt={currency.name}
              className="object-contain pixelated"
              width={32}
              height={32}
            />
          </div>
        )
      } else {
        icon = <Coins className="w-6 h-6 text-game-ochre" />
      }
      break
    }
    case 'card': {
      label = `TCG Card${(typeof reward.quantity === 'number' && reward.quantity > 1) || typeof reward.quantity === 'object' ? '(s)' : ''}`
      if (quantityStr) label += ` ${quantityStr}`
      icon = (
        <div className="relative w-8 h-8">
          <Image
            src="/sprites/card.avif"
            alt="TCG Card"
            width={32}
            height={32}
            className="object-contain pixelated"
          />
        </div>
      )
      break
    }
    case 'task_complete': {
      // Logic: If task is completed, show name. Else "Secret to Unlock"
      // requires passing completed tasks to this function context
      const taskId = reward.targetId as string
      const taskDef = tasks.find((t) => t.id === taskId)
      const isCompleted = context?.completedTasks?.includes(taskId)

      // Determine requirements status
      const requirementsToCheck = reward.requirements || taskDef?.requirements

      // If no checker provided, default to true
      const requirementsMet = context?.checkRequirements
        ? context.checkRequirements(requirementsToCheck)
        : true

      if (isCompleted && taskDef && !taskDef.repeatable) {
        return null // Don't show rewards for completed tasks
      } else {
        // If not completed:
        if (requirementsMet) {
          // Met requirements but not found yet -> ?
          if (taskDef?.secret) {
            label = 'Secret to Unlock'
            icon = <HelpCircle className="w-6 h-6 text-game-muted" />
          } else {
            label = `Unlock: ${taskDef?.name || taskId}`
            icon = taskDef?.icon ? (
              <TaskIconDisplay icon={taskDef.icon} className="w-8 h-8" />
            ) : (
              <HelpCircle className="w-6 h-6 text-game-ochre" />
            )
          }
        } else {
          // Requirements NOT met -> Lock
          label = 'Requirements not met'
          icon = <Lock className="w-6 h-6 text-game-muted" />
        }
      }

      // Hide percentage for task rewards
      subLabel = ''

      break
    }
    case 'banner': {
      if (context?.user?.unlockedBanners?.includes(reward.targetId as string)) {
        return null
      }
      const bannerDef = getBanner(reward.targetId as string)
      label = `Banner: ${bannerDef?.name || 'Unknown'}`
      icon = (
        <Image
          src={BACKGROUND_REWARD_SPRITE}
          alt="Background award"
          width={32}
          height={32}
          className="h-8 w-8 object-contain pixelated"
        />
      )
      subLabel = ''
      break
    }
    case 'icon': {
      if (context?.user?.unlockedIcons?.includes(reward.targetId as string)) {
        return null
      }
      const iconDef = getIcon(reward.targetId as string)
      label = `Icon: ${iconDef?.name || 'Unknown'}`
      icon = iconDef ? (
        <TaskIconDisplay icon={iconDef.icon} className="h-8 w-8" />
      ) : (
        <Box className="w-8 h-8 text-game-muted" />
      )
      subLabel = ''
      break
    }
    case 'title': {
      if (context?.user?.unlockedTitles?.includes(reward.targetId as string)) {
        return null
      }
      const titleDef = getTitle(reward.targetId as string)
      label = `Title: ${titleDef?.name || 'Unknown'}`
      icon = (
        <Image
          src={TITLE_REWARD_SPRITE}
          alt="Title certificate"
          width={32}
          height={32}
          className="h-8 w-8 object-contain pixelated"
        />
      )
      subLabel = ''
      break
    }
    case 'increase_max_pokemon': {
      const qty = typeof reward.quantity === 'number' ? reward.quantity : 1
      label = `+${qty} Pokemon Storage`
      icon = <Package className="w-6 h-6 text-game-moss-strong" />
      subLabel = 'Storage Upgrade'
      break
    }
    case 'increase_max_boxes': {
      const qty = typeof reward.quantity === 'number' ? reward.quantity : 1
      label = `+${qty} PC Box${qty > 1 ? 'es' : ''}`
      icon = <Package className="w-6 h-6 text-game-moss-strong" />
      subLabel = 'Storage Upgrade'
      break
    }
    case 'pokemon_research_xp': {
      const formData = reward.targetId ? getPokemonForm(reward.targetId) : null
      label = formData ? `${formData.name} Research XP` : 'Research XP'
      if (quantityStr) label += ` ${quantityStr}`
      if (formData && reward.targetId) {
        icon = (
          <div className="relative w-8 h-8">
            <Image
              src={getPokemonImageUrl(
                reward.targetId.toString(),
                'sprite',
                false,
              )}
              alt={formData.name}
              fill
              className="object-contain pixelated"
            />
          </div>
        )
      } else {
        icon = <Scroll className="w-6 h-6 text-game-moss-strong" />
      }
      break
    }
    default: {
      label =
        reward.type.charAt(0).toUpperCase() +
        reward.type.slice(1).replace(/_/g, ' ')
      icon = (
        <Badge variant="outline" className="text-[10px] h-6">
          {reward.type}
        </Badge>
      )
    }
  }

  if (reward.secret) {
    return {
      icon: <Box className="w-8 h-8 text-game-muted" />,
      label: '???',
      subLabel: 'Secret Reward',
    }
  }

  return {
    label,
    subLabel,
    icon,
  }
}
