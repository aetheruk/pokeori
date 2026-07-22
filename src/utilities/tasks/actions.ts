'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { checkUserAuth } from '@/utilities/auth/server-auth'
import { tasks } from '@/data/tasks'
import type { TaskExitModal } from '@/data/tasks'
import {
  checkTaskRequirements,
  checkTaskCriteria,
  isPokemonEligible,
  type UserTaskData,
} from '@/utilities/tasks/task-logic'
import { grantRewards, type Reward, type RewardSummary } from '@/utilities/rewards/reward-logic'
import { revalidatePath } from 'next/cache'
import type { Pokemon, User } from '@/payload-types'
import { getGameUserData } from '@/utilities/game-data'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { resolveTaskPokemonOrigin } from '@/utilities/pokemon/origin'
import {
  getUserCompletedTasksMap,
  getUserInventoryMap,
  setUserCompletedTasksMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import { isToday } from '@/utilities/date-utils'
import { acquireActionLock, releaseActionLock } from '@/utilities/game-integrity'

// Server-side password map: taskId -> accepted passwords
// Passwords stored here only, never exposed to client
const TASK_PASSWORDS: Record<string, string[]> = {
  'debug-enter-modal': ['pikachu'],
  'pewter-school-glitch-teacher': ['missingno'],
  'day-care-security-helper-clue': ['arcanine'],
  'day-care-tutor-helper-clue': ['alakazam'],
  'day-care-nurse-helper-clue': ['chansey'],
  'day-care-playroom-helper-clue': ['mr mime', 'mr. mime', 'mrmime'],
  'day-care-naptime-helper-clue': ['hypno'],
}

function normalizeTaskPassword(password: string) {
  return password.trim().toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ')
}

export async function validateEnterModalPassword(
  taskId: string,
  password: string,
): Promise<{ success: boolean; correct: boolean }> {
  const { user } = await checkUserAuth()
  if (!user) return { success: false, correct: false }

  const correctPasswords = TASK_PASSWORDS[taskId]
  if (!correctPasswords) return { success: false, correct: false }

  // Sanitize and compare (case-insensitive, trimmed)
  const sanitizedInput = normalizeTaskPassword(password)
  const sanitizedCorrect = correctPasswords.map(normalizeTaskPassword)

  return { success: true, correct: sanitizedCorrect.includes(sanitizedInput) }
}

export interface CompleteTaskResult {
  success: boolean
  message?: string
  exitModal?: TaskExitModal
  rewards?: RewardSummary
}

export async function completeTask(
  taskId: string,
  selectedPokemonIds?: string[],
): Promise<CompleteTaskResult> {
  const { user } = await checkUserAuth()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const payload = await getPayload({ config: payloadConfig })

  let task = tasks.find((t) => t.id === taskId)
  let isGeneratedDaily = false
  if (!task) {
    const userRefetched = await payload.findByID({ collection: 'users', id: user.id })
    const activeDailies = ((userRefetched as any).activeDailyTasks as any[]) || []
    task = activeDailies.find((t: any) => t.id === taskId) as typeof task
    if (!task) {
      return { success: false, message: 'Task not found' }
    }
    isGeneratedDaily = true
  }

  // Fetch requirements + criteria + inventory/pokemon for consumption
  const rewardConditions = (task.rewards || []).flatMap((reward) => reward.requirements || [])
  const allConditions = [
    ...(task.requirements || []),
    ...(task.criteria || []),
    ...rewardConditions,
  ]
  const requiredKeys = analyzeRequirements(allConditions)

  if (!requiredKeys.includes('completedTasks')) requiredKeys.push('completedTasks')

  const userData = await getGameUserData(user as User, requiredKeys)

  // 1. Check Requirements (Can they even see/start this?)
  if (!checkTaskRequirements(userData, task)) {
    return { success: false, message: 'Requirements not met' }
  }

  // 2. Check Criteria (Have they done it?)
  if (!checkTaskCriteria(userData, task)) {
    return { success: false, message: 'Criteria not met' }
  }

  // 3. Check Repeatable
  const existingCompletion = userData.completedTasks.find((t) => t.taskId === taskId)
  if (existingCompletion && !task.repeatable) {
    return { success: false, message: 'Task already completed' }
  }

  // 4. Handle Consumption
  const pokemonToConsume: string[] = []
  const itemsToConsume: { id: string; quantity: number }[] = []
  const currencyToConsume: { id: string; quantity: number }[] = []

  const conditionsToCheck = [...(task.requirements || []), ...(task.criteria || [])]

  for (const crit of conditionsToCheck) {
    if (!crit.consume) continue

    if (crit.type === 'pokemon_owned') {
      const countNeeded = crit.count || 1
      const matches = userData.pokemon.filter((p) => {
        if (crit.pokemonCriteria) return isPokemonEligible(p, crit.pokemonCriteria)
        if (crit.targetId) return p.speciesId === Number(crit.targetId)
        return true
      })

      if (matches.length < countNeeded) {
        return { success: false, message: `Not enough eligible Pokemon for ${crit.type}` }
      }

      if (selectedPokemonIds && selectedPokemonIds.length > 0) {
        const selectedMatches = matches.filter((p) => selectedPokemonIds.includes(p.id))
        if (selectedMatches.length < countNeeded) {
          return {
            success: false,
            message: `Selected Pokemon do not match criteria or not enough selected.`,
          }
        }
        selectedMatches.slice(0, countNeeded).forEach((p) => pokemonToConsume.push(p.id))
      } else {
        return { success: false, message: 'Please select Pokemon to hand over.' }
      }
    } else if (crit.type === 'item_owned') {
      const item = userData.inventory.find((i) => i.itemId === crit.targetId)
      if (!item || item.quantity < (crit.count || 1)) {
        return { success: false, message: `Not enough items: ${crit.targetId}` }
      }
      // Use item.itemId as ID for embedded inventory consumption
      itemsToConsume.push({ id: item.itemId, quantity: crit.count || 1 })
    } else if (crit.type === 'currency_owned') {
      const currencyId = (crit.targetId as string) || 'crystals'
      // @ts-expect-error - dynamic key access
      const currentAmount = user.currency?.[currencyId] || 0
      if (currentAmount < (crit.count || 1)) {
        return { success: false, message: `Not enough ${currencyId}` }
      }
      currencyToConsume.push({ id: currencyId, quantity: crit.count || 1 })
    }
  }

  const uniquePokemonToConsume = [...new Set(pokemonToConsume)]

  // Execute Consumption
  try {
    // Delete Pokemon
    if (uniquePokemonToConsume.length > 0) {
      await Promise.all(
        uniquePokemonToConsume.map((id) =>
          payload.delete({
            collection: 'pokemon',
            id,
          }),
        ),
      )
    }

    // Reduce Items (Embedded)
    if (itemsToConsume.length > 0) {
      const userInventory = await getUserInventoryMap(payload, user.id)

      itemsToConsume.forEach(({ id: itemId, quantity }) => {
        userInventory[itemId] = Math.max(0, (userInventory[itemId] || 0) - quantity)
      })

      await setUserInventoryMap(payload, user.id, userInventory)
    }

    // Reduce Currency
    if (currencyToConsume.length > 0) {
      const newCurrency = { ...user.currency }
      let hasUpdate = false
      for (const c of currencyToConsume) {
        // @ts-expect-error - dynamic key access
        const current = newCurrency[c.id] || 0
        // @ts-expect-error - dynamic key access
        newCurrency[c.id] = Math.max(0, current - c.quantity)
        hasUpdate = true
      }

      if (hasUpdate) {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            currency: newCurrency,
          },
        })
        user.currency = newCurrency
      }
    }
  } catch (e) {
    console.error('Error consuming resources', e)
    return { success: false, message: 'Failed to consume resources' }
  }

  // 5. Grant Rewards
  const rewardsToGrant: Reward[] = task.rewards.map((r) => {
    const pokemonOrigin = r.type === 'pokemon' ? resolveTaskPokemonOrigin(task, r) : undefined
    const reward: Reward = {
      ...r,
      dropChance: r.dropChance || 100,
      pokemonData: pokemonOrigin
        ? {
            ...r.pokemonData,
            ...pokemonOrigin,
          }
        : r.pokemonData,
      skill: r.skill,
    }
    // if (r.type === 'currency') {
    //   reward.targetId = r.targetId || 'crystals'
    // }
    return reward
  })

  const { summary } = await grantRewards(user.id, rewardsToGrant)

  // 6. Record Completion
  const userRefetched = await payload.findByID({ collection: 'users', id: user.id })
  const updateData: Record<string, any> = {}

  if (!isGeneratedDaily) {
    const completedTasks = await getUserCompletedTasksMap(payload, user.id)
    const storageId = taskId
    const existing = completedTasks[storageId]

    if (existing) {
      existing.count = (existing.count || 0) + 1
      existing.updatedAt = new Date().toISOString()
      if (!existing.completedAt) existing.completedAt = existing.updatedAt
      completedTasks[storageId] = existing
    } else {
      completedTasks[storageId] = {
        count: 1,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
    await setUserCompletedTasksMap(payload, user.id, completedTasks)

    // Also update activeDailyTasks if it's a static daily task
    let activeDailyTasks = (userRefetched as any).activeDailyTasks as any[]
    if (task.daily && activeDailyTasks) {
      activeDailyTasks = activeDailyTasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, completed: true }
        }
        return t
      })
      updateData.activeDailyTasks = activeDailyTasks
    }
  } else {
    // Update activeDailyTasks for generated daily tasks
    let activeDailyTasks = (userRefetched as any).activeDailyTasks as any[]
    if (activeDailyTasks) {
      activeDailyTasks = activeDailyTasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, completed: true }
        }
        return t
      })
      updateData.activeDailyTasks = activeDailyTasks
    }
  }

  if (Object.keys(updateData).length > 0) {
    await payload.update({
      collection: 'users',
      id: user.id,
      data: updateData,
    })
  }

  await recordExpeditionActivityResult(user.id, 'task', taskId, true)

  revalidatePath('/game/tasks')
  return { success: true, rewards: summary, exitModal: task.exitModal }
}

export async function refreshDailyTasks(): Promise<{ success: boolean; message?: string }> {
  const { user } = await checkUserAuth()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const refreshLock = await acquireActionLock(`lock:daily-refresh:${user.id}`, 15)
  if (!refreshLock.acquired) {
    return { success: false, message: 'Daily challenges are already refreshing' }
  }

  try {
    const payload = await getPayload({ config: payloadConfig })
    const userRefetched = await payload.findByID({ collection: 'users', id: user.id })

    const completedTasks = await getUserCompletedTasksMap(payload, user.id)
    const hasTutorial16 = Boolean(completedTasks['tutorial-16'])

    if (!hasTutorial16) {
      return { success: false, message: 'Daily challenges are locked until tutorial completion' }
    }

    // Check if we already refreshed in the current UTC daily reset window.
    const lastRefresh = (userRefetched as any).lastDailyRefresh
      ? ((userRefetched as any).lastDailyRefresh as string)
      : null
    const today = new Date()

    if (isToday(lastRefresh, today)) {
      return { success: false, message: 'Already refreshed today' }
    }

    // A full requirement snapshot is intentional: daily source selection spans
    // locations, battles, games, shops, recipes, voyages, and TCG state.
    const { generateDailyTasks } = require('@/utilities/tasks/daily-generator')
    const userData = await getGameUserData(userRefetched as User)
    const yesterday = new Date(today)
    yesterday.setUTCDate(yesterday.getUTCDate() - 1)
    const previousTasks = isToday(lastRefresh, yesterday)
      ? (((userRefetched as any).activeDailyTasks as any[]) || [])
      : undefined

    const newTasks = generateDailyTasks(userData, { previousTasks })

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        lastDailyRefresh: today.toISOString(),
        activeDailyTasks: newTasks,
      } as any,
    })

    revalidatePath('/game/tasks')
    return { success: true }
  } finally {
    await releaseActionLock(refreshLock)
  }
}
