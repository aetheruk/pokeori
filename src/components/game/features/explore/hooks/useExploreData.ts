import { useMemo } from 'react'
// Data Imports
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { allGames } from '@/data/games'
import { locations } from '@/data/locations'
import { shops } from '@/data/shops'
import { tasks } from '@/data/tasks'
import { voyages } from '@/data/voyages'
import type { RequirementData } from '@/utilities/requirements'
import { checkRequirement } from '@/utilities/requirements'
import { getTaskProgress } from '@/utilities/tasks/task-logic'
import {
  getVsSeekerCandyRewards,
  getVsSeekerCurrencyRewards,
  getSeenPokemonOptions,
  getVsSeekerCooldownRemaining,
  getVsSeekerTrainerLevel,
  hasVsSeeker,
} from '@/utilities/vs-seeker'
import type { ExploreItem } from '../types'

const STATIC_EXPLORE_ITEMS: ExploreItem[] = [
  ...locations.map((l) => ({
    ...l,
    type: 'location' as const,
    originalData: l,
  })),
  ...battles.map((b) => ({
    ...b,
    type: 'battle' as const,
    originalData: b,
  })),
  ...allGames.map((r) => ({
    ...r,
    type: 'research' as const,
    originalData: r,
  })),
  ...shops.map((s) => ({
    ...s,
    category: s.category || 'General',
    type: 'shop' as const,
    originalData: s,
  })),
  ...voyages.map((v) => ({
    ...v,
    type: 'voyage' as const,
    originalData: v,
  })),
  ...expeditions.map((expedition) => ({
    ...expedition,
    type: 'expedition' as const,
    originalData: expedition,
  })),
  ...tasks.map((t) => ({
    ...t,
    type: 'task' as const,
    originalData: t,
  })),
] as ExploreItem[]

const VS_SEEKER_EXPLORE_ITEM: ExploreItem = {
  id: 'vs-seeker-dynamic-battle',
  name: 'VS Seeker',
  description: 'A nearby trainer challenges you to a 3-on-3 battle.',
  category: 'Special',
  subCategory: 'Trainer Rematch',
  icon: { type: 'item', id: 'vs-seeker' },
  type: 'vs-seeker',
  originalData: {
    id: 'vs-seeker-dynamic-battle',
    isVsSeeker: true,
  },
  requirements: [],
}

function getRandomEventRarity(item: ExploreItem): number {
  const rollRequirements = (item.requirements || []).filter(
    (requirement: any) =>
      requirement.type === 'roll' &&
      !requirement.inverse &&
      typeof requirement.count === 'number',
  )

  if (rollRequirements.length === 0) return Number.MAX_SAFE_INTEGER
  return Math.min(
    ...rollRequirements.map((requirement: any) => requirement.count),
  )
}

function selectDeterministicRandomEvent(
  randomEvents: ExploreItem[],
  lastRoll: number,
) {
  if (randomEvents.length === 0) return null
  if (!Number.isFinite(lastRoll) || lastRoll <= 0) return null
  if (randomEvents.length === 1) return randomEvents[0] as ExploreItem

  const orderedEvents = [...randomEvents].sort((a, b) =>
    a.id.localeCompare(b.id),
  )
  if (orderedEvents.length === 1) return orderedEvents[0]!

  const normalizedRoll =
    Number.isFinite(lastRoll) && lastRoll > 0 ? lastRoll : 1
  const index = (normalizedRoll - 1) % orderedEvents.length
  return orderedEvents[index]!
}

export function shouldHideIncompleteSecretTask(
  item: ExploreItem,
  completedTaskIds: Set<string>,
): boolean {
  if (item.type !== 'task') return false

  const task = item.originalData as any
  if (!task.secret) return false
  if (task.isRandomEvent) return false

  return !completedTaskIds.has(item.id)
}

export function useExploreData(
  userData: RequirementData | null,
  activeCategory: string,
  activeSubCategory: string,
) {
  // Combined Data
  const allItems: ExploreItem[] = useMemo(() => {
    const items: ExploreItem[] = [...STATIC_EXPLORE_ITEMS]

    // Active Daily Tasks (dynamically generated for the user)
    if (userData?.user && 'activeDailyTasks' in userData.user) {
      const dailyTasks = (userData.user.activeDailyTasks as any[]) || []
      dailyTasks.forEach((t) => {
        items.push({
          ...t,
          type: 'task',
          isChallenge: true,
          originalData: t,
        })
      })
    }

    return items
  }, [userData?.user])

  // Filter Unlocked Items
  const availableItems = useMemo(() => {
    if (!userData) return []

    const completedTaskIds = new Set(
      userData.completedTasks.map((task) => task.taskId),
    )
    const activeVoyages = (userData.user as any).activeVoyages || []
    const activeExpedition = (userData as any).activeExpedition
    const itemById = new Map(allItems.map((item) => [item.id, item]))

    const isItemUnlocked = (
      item: ExploreItem,
      visited = new Set<string>(),
    ): boolean => {
      if (visited.has(item.id)) return false
      visited.add(item.id)

      // Filter out Secret category items (never show on explore list)
      if (item.category === 'Secret') return false

      // Check Hide Condition
      if (item.hide) {
        const isHidden = completedTaskIds.has(item.hide)
        if (isHidden) return false
      }

      // Check requirements
      const reqs = item.requirements
      let ownReqsMet =
        !reqs ||
        reqs.length === 0 ||
        reqs.every((req: any) =>
          checkRequirement(userData, req, {
            category: item.category,
            subCategory: item.subCategory,
          }),
        )

      // EXCEPTION: If it's an active voyage, it's always considered "unlocked"
      // so it doesn't disappear if the roll changes while it's in progress.
      if (!ownReqsMet && item.type === 'voyage') {
        if (activeVoyages.some((v: any) => v.voyageId === item.id)) {
          ownReqsMet = true
        }
      }

      // EXCEPTION: If this expedition is currently active/claimable,
      // keep it visible even if requirement state changes mid-run.
      if (!ownReqsMet && item.type === 'expedition') {
        if (activeExpedition && activeExpedition.expeditionId === item.id) {
          ownReqsMet = true
        }
      }

      // Special logic for Secret Tasks
      if (shouldHideIncompleteSecretTask(item, completedTaskIds)) return false

      if (!ownReqsMet) return false

      // Check Overrides (Recursive)
      if (item.overrides) {
        const overriddenItem = itemById.get(item.overrides)
        if (overriddenItem) {
          return isItemUnlocked(overriddenItem, visited)
        }
      }
      return true
    }

    // First pass
    const unlocked = allItems.filter((item) => isItemUnlocked(item))

    // Second pass: Filter out items overwritten by other UNLOCKED items
    const valid = unlocked.filter((item) => {
      const isOverridden = unlocked.some((other) => other.overrides === item.id)
      return !isOverridden
    })

    return valid
  }, [userData, allItems])

  // Random Event logic
  const randomEvent = useMemo(() => {
    if (!userData) return null

    const randomEvents = availableItems.filter((item) => {
      return item.originalData.isRandomEvent === true
    })

    if (randomEvents.length === 0) return null

    // Filter out ineligible events (completed tasks, etc)
    const eligibleEvents = randomEvents.filter((item) => {
      if (item.type === 'task') {
        const task = item.originalData
        const { isCompleted } = getTaskProgress(userData, task)
        if (isCompleted && (!task.repeatable || task.daily)) {
          return false
        }
      }
      return true
    })

    if (eligibleEvents.length === 0) return null

    // EXCEPTION: If any of these eligible events is an ACTIVE VOYAGE,
    // we MUST show it until it is completed.
    const activeVoyages = (userData.user as any).activeVoyages || []
    const activeRandomVoyage = eligibleEvents.find((item) => {
      if (item.type !== 'voyage') return false
      return activeVoyages.some((v: any) => v.voyageId === item.id)
    })

    if (activeRandomVoyage) {
      return activeRandomVoyage
    }

    const activeExpedition = (userData as any).activeExpedition
    if (activeExpedition) {
      const activeRandomExpedition = eligibleEvents.find((item) => {
        if (item.type !== 'expedition') return false
        return activeExpedition.expeditionId === item.id
      })

      if (activeRandomExpedition) {
        return activeRandomExpedition
      }
    }

    const rarestThreshold = Math.min(
      ...eligibleEvents.map(getRandomEventRarity),
    )
    const rarestEvents = eligibleEvents.filter(
      (item) => getRandomEventRarity(item) === rarestThreshold,
    )
    return selectDeterministicRandomEvent(rarestEvents, userData.lastRoll || 0)
  }, [availableItems, userData])

  const vsSeekerEvent = useMemo(() => {
    if (!userData) return null

    const inventoryMap = Object.fromEntries(
      userData.inventory.map((item) => [item.itemId, item.quantity]),
    )
    if (!hasVsSeeker(inventoryMap)) return null

    const pokedexMap = userData.pokedex.reduce<
      Record<string, Record<string, any>>
    >((map, { speciesId, formId, ...entry }) => {
      const speciesKey = String(speciesId)
      map[speciesKey] ||= {}
      map[speciesKey][formId] = entry
      return map
    }, {})
    if (getSeenPokemonOptions(pokedexMap).length < 3) return null

    const stats = ((userData.user as any).stats || {}) as any
    const cooldownRemaining = getVsSeekerCooldownRemaining(
      stats.vsSeeker?.lastUsedAt,
    )
    if (cooldownRemaining > 0) return null

    const trainerLevel = getVsSeekerTrainerLevel(inventoryMap)

    return {
      ...VS_SEEKER_EXPLORE_ITEM,
      description: 'A nearby trainer challenges you to a 3-on-3 battle.',
      originalData: {
        ...VS_SEEKER_EXPLORE_ITEM.originalData,
        rewards: [
          ...getVsSeekerCurrencyRewards(),
          ...getVsSeekerCandyRewards(trainerLevel),
        ],
        maxPokemon: 3,
        levelCap: trainerLevel,
      },
    }
  }, [userData])

  // Final Filter
  const filteredItems = useMemo(() => {
    return availableItems.filter((item) => {
      // Filter out items that are marked as Random Events (they show in their own section)
      if (item.originalData.isRandomEvent) return false

      if (!activeCategory) return false

      const isDailyView = activeCategory === 'Dailies'

      if (!isDailyView) {
        if (item.category !== activeCategory) return false
        if (
          activeSubCategory &&
          (item.subCategory || 'unassigned') !== activeSubCategory
        )
          return false
      } else {
        if (!item.originalData.daily) return false
      }

      // Filter out completed tasks
      if (item.type === 'task') {
        if (!userData) return false
        const task = item.originalData
        const { isCompleted } = getTaskProgress(userData, task)

        // Hide if completed (and not repeatable), OR if it's a daily and done today
        if (isCompleted) {
          if (!task.repeatable || task.daily) {
            return false
          }
        }
      }

      return true
    })
  }, [availableItems, activeCategory, activeSubCategory, userData])

  return {
    allItems,
    availableItems,
    filteredItems,
    randomEvent,
    vsSeekerEvent,
  }
}
