import { items } from '@/data/items'
import { tasks } from '@/data/tasks'
import type { FishingItemEntry } from '@/data/games/fishing/types'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'
import type { ExploreDisplayItem, ExploreItem } from './types'

type RewardLike = {
  type: string
  targetId?: string | number
  itemId?: string
  requirements?: any[]
}

type PokemonTarget = {
  formId: string
  speciesId?: number
  requiresCaught: boolean
}

function isLocationMode(item: ExploreItem) {
  return (
    item.type === 'location' ||
    (item.type === 'battle' && (item.originalData as any).isWildBattle) ||
    (item.type === 'research' &&
      ((item.originalData as any).gameType === 'fishing' ||
        (item.originalData as any).gameType === 'field-observation'))
  )
}

function getEntryItems(entry: ExploreDisplayItem) {
  const items = entry.kind === 'group' ? entry.group.items : [entry.item]
  return items.filter(isLocationMode)
}

function getFormId(entry: any) {
  if (entry?.formId) return String(entry.formId)
  if (entry?.speciesId !== undefined && entry?.speciesId !== null) {
    return String(entry.speciesId)
  }
  return null
}

function getPokemonTarget(entry: any, requiresCaught: boolean): PokemonTarget | null {
  const formId = getFormId(entry)
  if (!formId) return null
  return {
    formId,
    requiresCaught,
    speciesId:
      entry?.speciesId !== undefined && entry?.speciesId !== null
        ? Number(entry.speciesId)
        : undefined,
  }
}

function addPokemonTarget(
  pokemonTargets: Map<string, PokemonTarget>,
  target: PokemonTarget | null,
) {
  if (!target) return

  const existing = pokemonTargets.get(target.formId)
  pokemonTargets.set(target.formId, {
    ...target,
    speciesId: existing?.speciesId ?? target.speciesId,
    requiresCaught: Boolean(existing?.requiresCaught || target.requiresCaught),
  })
}

function getPokedexEntry(
  userData: RequirementData,
  target: Pick<PokemonTarget, 'formId' | 'speciesId'>,
) {
  const exactMatch = userData.pokedex.find(
    (entry) =>
      String(entry.formId) === target.formId &&
      (target.speciesId === undefined ||
        Number(entry.speciesId) === target.speciesId),
  )
  if (exactMatch) return exactMatch

  return (
    userData.pokedex.find((entry) => String(entry.formId) === target.formId) ||
    null
  )
}

function areRequirementsMet(
  requirements: any[] | undefined,
  item: ExploreItem,
  userData: RequirementData,
) {
  return (
    !requirements?.length ||
    requirements.every((requirement) =>
      checkRequirement(userData, requirement, {
        category: item.category,
        subCategory: item.subCategory,
      }),
    )
  )
}

function addPokemonFormIds(
  pokemonTargets: Map<string, PokemonTarget>,
  item: ExploreItem,
  userData: RequirementData,
) {
  const data = item.originalData as any

  if (item.type === 'location') {
    for (const encounter of data.encounters || []) {
      if (!areRequirementsMet(encounter.requirements, item, userData)) continue
      addPokemonTarget(pokemonTargets, getPokemonTarget(encounter, true))
    }
    return
  }

  if (item.type === 'battle' && data.isWildBattle) {
    for (const enemy of data.enemyTeam || []) {
      if (!areRequirementsMet(enemy.requirements, item, userData)) continue
      addPokemonTarget(pokemonTargets, getPokemonTarget(enemy, false))
    }
    return
  }

  if (item.type === 'research' && data.gameType === 'field-observation') {
    for (const entry of data.settings?.pokemonPool || []) {
      if (!areRequirementsMet(entry.requirements, item, userData)) continue
      addPokemonTarget(pokemonTargets, getPokemonTarget(entry, false))
    }
    return
  }

  if (item.type === 'research' && data.gameType === 'fishing') {
    for (const rodConfig of Object.values(data.settings?.rods || {}) as any[]) {
      for (const encounter of rodConfig?.encounters?.entries || []) {
        if (!areRequirementsMet(encounter.requirements, item, userData)) continue
        addPokemonTarget(pokemonTargets, getPokemonTarget(encounter, true))
      }
    }
  }
}

function getAuthoredFishingItemRewards(rodConfig: any): FishingItemEntry[] {
  return rodConfig?.items?.entries || []
}

function getCollectibleRewards(item: ExploreItem): RewardLike[] {
  const data = item.originalData as any
  const rewards: RewardLike[] = [...(data.rewards || [])]

  if (item.type === 'research' && data.gameType === 'field-observation') {
    for (const drop of data.settings?.itemDrops || []) {
      rewards.push({
        type: 'item',
        targetId: drop.itemId,
        requirements: drop.requirements,
      })
    }
  }

  if (item.type === 'research' && data.gameType === 'fishing') {
    for (const rodConfig of Object.values(data.settings?.rods || {})) {
      for (const entry of getAuthoredFishingItemRewards(rodConfig)) {
        rewards.push({
          type: 'item',
          targetId: entry.itemId,
          requirements: (entry as any).requirements,
        })
      }
    }
  }

  return rewards
}

function hasRewardLeftToClaim(
  reward: RewardLike,
  item: ExploreItem,
  userData: RequirementData,
  inventoryByItemId: Map<string, number>,
  completedTaskIds: Set<string>,
) {
  if (!areRequirementsMet(reward.requirements, item, userData)) return false

  if (reward.type === 'task_complete') {
    const taskId = String(reward.targetId || '')
    if (!taskId) return false
    const task = tasks.find((entry) => entry.id === taskId)
    return !completedTaskIds.has(taskId) || !!task?.repeatable
  }

  if (reward.type === 'item') {
    const itemId = String(reward.targetId || reward.itemId || '')
    const itemDef = items.find((entry) => entry.id === itemId)
    return !!itemDef?.unique && (inventoryByItemId.get(itemId) || 0) <= 0
  }

  if (reward.type === 'banner') {
    return !((userData.user as any).unlockedBanners || []).includes(reward.targetId)
  }

  if (reward.type === 'icon') {
    return !((userData.user as any).unlockedIcons || []).includes(reward.targetId)
  }

  if (reward.type === 'title') {
    return !((userData.user as any).unlockedTitles || []).includes(reward.targetId)
  }

  if (reward.type === 'pokemon') {
    const formId = String(reward.targetId || '')
    const pokedexEntry = getPokedexEntry(userData, { formId })
    return !pokedexEntry?.caught
  }

  return false
}

export function isLocationEntryMastered(
  entry: ExploreDisplayItem,
  userData: RequirementData,
) {
  const locationItems = getEntryItems(entry)
  if (locationItems.length === 0) return false

  const pokemonTargets = new Map<string, PokemonTarget>()
  const inventoryByItemId = new Map(
    (userData.inventory || []).map((item) => [item.itemId, item.quantity]),
  )
  const completedTaskIds = new Set(
    (userData.completedTasks || []).map((task) => task.taskId),
  )

  for (const item of locationItems) {
    addPokemonFormIds(pokemonTargets, item, userData)

    for (const reward of getCollectibleRewards(item)) {
      if (
        hasRewardLeftToClaim(
          reward,
          item,
          userData,
          inventoryByItemId,
          completedTaskIds,
        )
      ) {
        return false
      }
    }
  }

  if (pokemonTargets.size === 0) return false

  for (const target of pokemonTargets.values()) {
    const pokedexEntry = getPokedexEntry(userData, target)
    const researchLevel = pokedexEntry?.researchLevel || 0
    const isCaught =
      !!pokedexEntry?.caught || Number((pokedexEntry as any)?.totalCaught || 0) > 0

    if (!pokedexEntry || researchLevel < 1 || (target.requiresCaught && !isCaught)) {
      return false
    }
  }

  return true
}
