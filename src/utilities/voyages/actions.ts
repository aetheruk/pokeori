'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getGameUserData } from '@/utilities/game-data'
import { getVoyage, voyages } from '@/data/voyages'
import { ActiveVoyage, VoyageConfig } from '@/data/voyages/types'
import { revalidatePath } from 'next/cache'
import { checkTaskRequirements } from '@/utilities/tasks/task-logic'
import { RequirementData } from '@/utilities/requirements'
import { StartVoyageSchema } from '@/utilities/validators'
import { getExplorerVoyageSlotCount, getSkillLevel } from '@/utilities/skills/unlocks'
import { recordDailyActivityProgress } from '@/utilities/tasks/daily-progress'

export type VoyageResult = {
  success: boolean
  message?: string
  rewards?: any
  completed?: boolean
}

export async function startVoyage(voyageId: string, pokemonIds: string[]): Promise<VoyageResult> {
  const validated = StartVoyageSchema.safeParse({ voyageId, pokemonIds })
  if (!validated.success) {
    return { success: false, message: 'Invalid data' }
  }

  const payload = await getPayload({ config: configPromise })
  const { user: currentUser } = await payload.auth({ headers: await headers() })

  if (!currentUser) return { success: false, message: 'User not logged in' }

  // Use full gameData to ensure RequirementData shape is met (completedTasks as array etc)
  const gameData = await getGameUserData(currentUser)
  const { user } = gameData

  if (!user) return { success: false, message: 'User not found' }

  const voyage = getVoyage(voyageId)
  if (!voyage) return { success: false, message: 'Voyage not found' }

  // 1. Check if user already has THIS active voyage
  const activeVoyages = (user.activeVoyages || []) as ActiveVoyage[]
  if (activeVoyages.some((v) => v.voyageId === voyageId)) {
    return { success: false, message: 'You already have this voyage active!' }
  }

  // Check max concurrent voyages from Explorer progression.
  const maxVoyages = getExplorerVoyageSlotCount(getSkillLevel(user.skills, 'catching'))
  if (activeVoyages.length >= maxVoyages) {
    return { success: false, message: `Active voyage limit reached (${maxVoyages})` }
  }

  // 2. Check Requirements for Unlock
  // Cast gameData to any/RequirementData to satisfy checkTaskRequirements
  if (
    voyage.requirements &&
    !checkTaskRequirements(
      gameData as unknown as RequirementData,
      { requirements: voyage.requirements } as any,
    )
  ) {
    return { success: false, message: 'Voyage requirements not met' }
  }

  // 3. Validate Pokemon
  // Fetch full pokemon data
  const { docs: userPokemon } = await payload.find({
    collection: 'pokemon',
    where: {
      id: { in: pokemonIds },
      user: { equals: user.id },
    },
    limit: 100,
  })

  if (userPokemon.length !== pokemonIds.length) {
    return { success: false, message: 'Invalid pokemon selection' }
  }

  const min = voyage.minPokemon || 1
  if (userPokemon.length < min) {
    return { success: false, message: `Not enough Pokemon selected (Min ${min})` }
  }

  if (userPokemon.length > voyage.maxPokemon) {
    return { success: false, message: `Too many Pokemon selected (Max ${voyage.maxPokemon})` }
  }

  // Check Criteria (Individual)
  if (voyage.pokemonCriteria) {
    for (const p of userPokemon) {
      if (
        voyage.pokemonCriteria.allowedSpeciesIds &&
        !voyage.pokemonCriteria.allowedSpeciesIds.includes(p.speciesId)
      ) {
        return { success: false, message: `Pokemon ${p.name} is not allowed (wrong species)` }
      }
      // Add other checks (level etc) if needed
    }
  }

  // Check Team Requirements (Aggregate)
  if (voyage.teamRequirements) {
    for (const req of voyage.teamRequirements) {
      let total = 0
      if (req.type === 'total_stat') {
        const statName = req.stat
        // Sum stat across team
        for (const p of userPokemon) {
          // Stats are in p.stats object usually
          let val = 0
          if (statName === 'level') {
            val = p.level
          } else {
            const pokeStats = (p.stats || {}) as any
            val = pokeStats[statName] || 0
          }
          total += val
        }

        if (req.comparison === 'lte') {
          if (total > req.value)
            return {
              success: false,
              message: `Team ${req.stat} too high (Max ${req.value}, Got ${total})`,
            }
        } else {
          // Default gte
          if (total < req.value)
            return {
              success: false,
              message: `Team ${req.stat} too low (Min ${req.value}, Got ${total})`,
            }
        }
      }
    }
  }

  // 4. Start Voyage
  const startTime = new Date()
  const endTime = new Date(startTime.getTime() + voyage.durationMinutes * 60000)

  // DELETE Pokemon (Consumption)
  for (const pid of pokemonIds) {
    await payload.delete({
      collection: 'pokemon',
      id: pid,
    })
  }

  const newActiveVoyage: ActiveVoyage = {
    voyageId,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    pokemonIds, // keeping IDs just for record, they are gone from inventory
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      activeVoyages: [...activeVoyages, newActiveVoyage],
    },
  })

  revalidatePath('/game/voyages')
  return { success: true, message: 'Voyage started!' }
}

import { grantRewards } from '@/utilities/rewards/reward-logic'

// ... (existing imports)

export async function completeVoyage(voyageId: string): Promise<VoyageResult> {
  const payload = await getPayload({ config: configPromise })
  const { user: currentUser } = await payload.auth({ headers: await headers() })

  if (!currentUser) return { success: false, message: 'Not authenticated' }

  const { user } = await getGameUserData(currentUser)

  const activeVoyages = (user.activeVoyages || []) as ActiveVoyage[]
  if (process.env.NODE_ENV === 'development') console.log('Completing Voyage:', {
    inputId: voyageId,
    activeVoyages: JSON.stringify(activeVoyages),
  })

  const active = activeVoyages.find((v) => v.voyageId === voyageId)

  if (!user || !active) {
    return { success: false, message: 'No active voyage found' }
  }

  const voyage = getVoyage(active.voyageId)

  if (!voyage) {
    // Error state, maybe clear it?
    return { success: false, message: 'Invalid voyage data' }
  }

  const now = new Date()
  const end = new Date(active.endTime)

  if (now < end) {
    return { success: false, message: 'Voyage not finished yet!' }
  }

  // Success Roll
  const roll = Math.random() * 100
  const isSuccess = roll <= voyage.successChance

  // Calculate Rewards using grantRewards
  const rewardsToGrant: any[] = []

  if (isSuccess) {
    // Since grantRewards handles dropChance internally if we pass it,
    // BUT we want to know WHICH rewards we are granting to display them.
    // AND grantRewards returns a summary of what was actually granted.
    // So we can map all potential rewards and let grantRewards handle drop chance.

    // HOWEVER, standard grantRewards treats `dropChance` < 100 as probability.
    // We should pass all rewards from voyage.rewards to grantRewards.

    // Mapping: VoyageReward -> Reward (LocationReward compatible)
    // types are compatible now.

    voyage.rewards.forEach((r) => rewardsToGrant.push(r))
  }

  let summary: any = { items: [], pokemon: [], currency: [], cards: [], tasksCompleted: [], xp: {} }

  if (isSuccess && rewardsToGrant.length > 0) {
    const result = await grantRewards(user.id, rewardsToGrant, { source: 'voyage' })
    if (result.success) {
      summary = result.summary
    }
  }

  // Clear Completed Voyage & Update Stats
  // We remove only the completed voyage from the list
  const updatedActiveVoyages = activeVoyages.filter((v) => v.voyageId !== voyageId)

  const currentStats = (user.voyageStats || { totalCompleted: 0, completedVoyages: {} }) as any
  const newStats = {
    totalCompleted: (currentStats.totalCompleted || 0) + 1,
    completedVoyages: {
      ...currentStats.completedVoyages,
      [voyage.id]: (currentStats.completedVoyages?.[voyage.id] || 0) + 1,
    },
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    data: {
      activeVoyages: updatedActiveVoyages,
      voyageStats: newStats,
    },
  })

  if (isSuccess) {
    await recordDailyActivityProgress(user.id, {
      kind: 'voyage_success',
      sourceId: voyage.id,
    })
  }

  revalidatePath('/game/voyages')

  return {
    success: true,
    completed: true,
    rewards: summary,
    message: isSuccess ? 'SUCCESS' : 'FAILURE',
  }
}
