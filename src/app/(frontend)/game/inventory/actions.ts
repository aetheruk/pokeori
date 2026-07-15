'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { cookies, headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { items } from '@/data/items'
import { scratchCards } from '@/data/scratchcards'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import type { Reward } from '@/data/types'
import type { User } from '@/payload-types'
import { startBattle } from '@/app/(frontend)/game/battles/actions'
import { startEncounter } from '@/app/(frontend)/game/locations/encounter/actions'
import { startResearchEncounter } from '@/app/(frontend)/game/research/actions'
import { drawTcgBoosterPacks } from '@/utilities/tcg/tcg-card-draw'
import type { TcgCard } from '@/data/tcg/types'
import { getItemSkillLockReason } from '@/utilities/skills/unlocks'
import {
  getUserCompletedTasksMap,
  getUserInventoryMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'

function buildScratchRewardRequirementData(params: {
  user: User
  inventory: Record<string, number>
  completedTasks: Awaited<ReturnType<typeof getUserCompletedTasksMap>>
}): RequirementData {
  return {
    user: params.user as RequirementData['user'],
    inventory: Object.entries(params.inventory).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    })),
    pokemon: [],
    tcg: [],
    pokedex: [],
    completedTasks: Object.entries(params.completedTasks).map(
      ([taskId, task]) => ({
        taskId,
        completedAt: task.completedAt || '',
        updatedAt: task.updatedAt,
        count: task.count || 1,
      }),
    ),
    battleResults: [],
    locationEncounterResults: [],
    researchEncounterResults: [],
  }
}

function isScratchRewardConfigEligible(
  rewardConfig: { reward?: Reward[] },
  requirementData: RequirementData,
): boolean {
  const rewards = rewardConfig.reward || []
  if (rewards.length === 0) return true

  return rewards.some((reward) => {
    if (!reward.requirements || reward.requirements.length === 0) return true
    return reward.requirements.every((requirement) =>
      checkRequirement(requirementData, requirement),
    )
  })
}

export async function sellItem(itemId: string, quantity: number = 1) {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) {
    return { success: false, error: 'Unauthorized' }
  }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef) {
    return { success: false, error: 'Item not found' }
  }

  if (!itemDef.sellValue) {
    return { success: false, error: 'Item cannot be sold' }
  }

  // Check inventory
  const inventory = await getUserInventoryMap(payload, user.id)
  const currentQty = inventory[itemId] || 0

  if (currentQty < quantity) {
    return { success: false, error: 'Not enough items' }
  }

  const totalValue = itemDef.sellValue * quantity
  const currencyType = itemDef.sellCurrency || 'pokedollars'

  try {
    // Update user: remove item, add currency
    const newInventory = { ...inventory }
    newInventory[itemId] = currentQty - quantity
    if (newInventory[itemId] <= 0) {
      delete newInventory[itemId]
    }

    const currentCurrency = (user.currency as Record<string, number>) || {}
    const newCurrencyVal = (currentCurrency[currencyType] || 0) + totalValue

    await setUserInventoryMap(payload, user.id, newInventory)
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        currency: {
          ...currentCurrency,
          [currencyType]: newCurrencyVal,
        },
      },
    })

    revalidatePath('/game/inventory')
    return { success: true, newCurrency: newCurrencyVal, newInventory }
  } catch (error) {
    console.error('Error selling item:', error)
    return { success: false, error: 'Failed to process transaction' }
  }
}

export async function useScratchCard(itemId: string) {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) {
    return { success: false, error: 'Unauthorized' }
  }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef?.scratchCardId) {
    return { success: false, error: 'Invalid scratch card' }
  }

  const cardConfig = scratchCards[itemDef.scratchCardId]
  if (!cardConfig) {
    return { success: false, error: 'Scratch card configuration not found' }
  }

  // Check inventory
  const inventory = await getUserInventoryMap(payload, user.id)
  const currentQty = inventory[itemId] || 0

  if (currentQty < 1) {
    return { success: false, error: 'You do not have this scratch card' }
  }

  try {
    // 1. Remove item from inventory
    const newInventory = { ...inventory }
    newInventory[itemId] = currentQty - 1
    if (newInventory[itemId] <= 0) {
      delete newInventory[itemId]
    }

    await setUserInventoryMap(payload, user.id, newInventory)

    // 2. Determine Reward
    const completedTasks = await getUserCompletedTasksMap(payload, user.id)
    const requirementData = buildScratchRewardRequirementData({
      user,
      inventory: newInventory,
      completedTasks,
    })
    const eligibleRewards = cardConfig.rewards.filter((rewardConfig) =>
      isScratchRewardConfigEligible(rewardConfig, requirementData),
    )

    if (eligibleRewards.length === 0) {
      throw new Error('No eligible reward configuration found')
    }

    const roll = Math.random() * 100
    let cumulative = 0
    let selectedRewardConfig = null

    for (const r of eligibleRewards) {
      cumulative += r.chance
      if (roll < cumulative) {
        selectedRewardConfig = r
        break
      }
    }

    // Fallback to last if nothing selected
    if (!selectedRewardConfig) {
      selectedRewardConfig = eligibleRewards[eligibleRewards.length - 1]
    }

    if (!selectedRewardConfig) {
      throw new Error('No reward configuration found')
    }

    const rewardsToGrant = selectedRewardConfig.reward || []

    // 3. Grant Rewards
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let summary: any = null
    if (rewardsToGrant.length > 0) {
      const result = await grantRewards(user.id, rewardsToGrant, {
        source: 'scratch-card',
      })
      summary = result.summary
    }

    revalidatePath('/game/inventory')

    return {
      success: true,
      rewards: rewardsToGrant,
      icon: selectedRewardConfig.icon,
      summary,
      background: cardConfig.background,
    }
  } catch (error) {
    console.error('Error using scratch card:', error)
    return { success: false, error: 'Failed to process scratch card' }
  }
}

export async function useBoosterPack(itemId: string) {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) return { success: false, error: 'Unauthorized' }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return { success: false, error: 'Unauthorized' }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef?.boosterPack) {
    return { success: false, error: 'Invalid booster pack' }
  }

  const { setId, cardsPerPack } = itemDef.boosterPack

  // Check inventory
  const inventory = await getUserInventoryMap(payload, user.id)
  const currentQty = inventory[itemId] || 0
  if (currentQty < 1)
    return { success: false, error: 'You do not have this booster pack' }

  // Require binder ownership before opening
  const binderId = `binder-${setId}`
  const hasBinder = (inventory[binderId] || 0) > 0
  if (!hasBinder) {
    return {
      success: false,
      error: `You need the ${itemDef.name.replace('Booster Pack', 'Binder')} to open this pack! Obtain the binder first.`,
    }
  }

  try {
    // 1. Remove pack from inventory
    const newInventory = { ...inventory }
    newInventory[itemId] = currentQty - 1
    if (newInventory[itemId] <= 0) delete newInventory[itemId]

    await setUserInventoryMap(payload, user.id, newInventory)

    // 2. Draw cards
    const drawResult = await drawTcgBoosterPacks({
      setId,
      cardsPerPack,
      packCount: 1,
      userInventory: newInventory,
    })

    const drawnCards: TcgCard[] = drawResult.packs.flatMap((pack) => pack.cards)

    revalidatePath('/game/inventory')
    revalidatePath('/game/tcg')
    return {
      success: true,
      cards: drawnCards,
      godPack: drawResult.packs.some((pack) => pack.godPack),
    }
  } catch (error) {
    console.error('Error opening booster pack:', error)
    return { success: false, error: 'Failed to open booster pack' }
  }
}

export async function useAllBoosterPacks(itemId: string) {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) return { success: false, error: 'Unauthorized' }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return { success: false, error: 'Unauthorized' }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef?.boosterPack) {
    return { success: false, error: 'Invalid booster pack' }
  }

  const { setId, cardsPerPack } = itemDef.boosterPack
  const inventory = await getUserInventoryMap(payload, user.id)
  const currentQty = inventory[itemId] || 0
  if (currentQty < 1) {
    return { success: false, error: 'You do not have this booster pack' }
  }

  const binderId = `binder-${setId}`
  const hasBinder = (inventory[binderId] || 0) > 0
  if (!hasBinder) {
    return {
      success: false,
      error: `You need the ${itemDef.name.replace('Booster Pack', 'Binder')} to open this pack! Obtain the binder first.`,
    }
  }

  try {
    const newInventory = { ...inventory }
    delete newInventory[itemId]

    await setUserInventoryMap(payload, user.id, newInventory)

    const drawnCards: TcgCard[] = []
    let packsRemaining = currentQty
    let godPacks = 0
    const chunkSize = 100

    while (packsRemaining > 0) {
      const packCount = Math.min(chunkSize, packsRemaining)
      const drawResult = await drawTcgBoosterPacks({
        setId,
        cardsPerPack,
        packCount,
        bulkPenalty: true,
        userInventory: newInventory,
      })

      drawnCards.push(...drawResult.packs.flatMap((pack) => pack.cards))
      godPacks += drawResult.packs.filter((pack) => pack.godPack).length
      packsRemaining -= packCount
    }

    revalidatePath('/game/inventory')
    revalidatePath('/game/tcg')
    return { success: true, cards: drawnCards, packsOpened: currentQty, godPacks }
  } catch (error) {
    console.error('Error opening booster pack stack:', error)
    return { success: false, error: 'Failed to open booster packs' }
  }
}

import { getLevelFromExp } from '@/data/skills/xp'

export async function useConsumable(itemId: string) {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) return { success: false, error: 'Unauthorized' }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return { success: false, error: 'Unauthorized' }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef) return { success: false, error: 'Item not found' }
  const skillLockReason = getItemSkillLockReason(itemDef, user.skills)
  if (skillLockReason) return { success: false, error: skillLockReason }

  // Check inventory
  const inventory = await getUserInventoryMap(payload, user.id)
  const currentQty = inventory[itemId] || 0
  if (currentQty < 1)
    return { success: false, error: 'You do not have this item' }

  if (itemDef.effects?.grantSkillXp) {
    const { skill, amount } = itemDef.effects.grantSkillXp

    try {
      // 1. Remove Item
      if (itemDef.consume !== false) {
        const newInventory = { ...inventory }
        newInventory[itemId] = currentQty - 1
        if (newInventory[itemId] <= 0) {
          delete newInventory[itemId]
        }

        await setUserInventoryMap(payload, user.id, newInventory)
      }

      // 2. Grant XP via grantRewards
      const rewardsToGrant: Reward[] = [
        {
          type: 'xp',
          skill,
          quantity: amount,
        },
      ]

      const result = await grantRewards(user.id, rewardsToGrant, {
        source: 'consumable',
      })

      revalidatePath('/game/inventory')
      return {
        success: true,
        message: `Gained ${amount} ${skill} XP!`,
        summary: result.summary,
      }
    } catch (error) {
      console.error('Error using consumable:', error)
      return { success: false, error: 'Failed to use item' }
    }
  }

  if (itemDef.effects?.grantPokemonResearchXp?.formId) {
    const { formId, amount } = itemDef.effects.grantPokemonResearchXp

    try {
      // 1. Remove Item
      if (itemDef.consume !== false) {
        const newInventory = { ...inventory }
        newInventory[itemId] = currentQty - 1
        if (newInventory[itemId] <= 0) {
          delete newInventory[itemId]
        }

        await setUserInventoryMap(payload, user.id, newInventory)
      }

      // 2. Resolve amount
      let actualAmount = 0
      if (typeof amount === 'number') {
        actualAmount = amount
      } else {
        actualAmount =
          Math.floor(Math.random() * (amount.max - amount.min + 1)) + amount.min
      }

      // 3. Grant XP via grantRewards
      const rewardsToGrant: Reward[] = [
        {
          type: 'pokemon_research_xp',
          targetId: formId,
          quantity: actualAmount,
        },
      ]

      const result = await grantRewards(user.id, rewardsToGrant, {
        source: 'consumable',
      })

      revalidatePath('/game/inventory')
      return {
        success: true,
        message: `Gained ${actualAmount} Research XP!`,
        summary: result.summary,
      }
    } catch (error) {
      console.error('Error using research consumable:', error)
      return { success: false, error: 'Failed to use item' }
    }
  }

  if (
    itemDef.effects?.startBattle ||
    itemDef.effects?.startEncounter ||
    itemDef.effects?.startResearch ||
    itemDef.effects?.startMinigame
  ) {
    try {
      // 1. Remove Item
      if (itemDef.consume !== false) {
        const newInventory = { ...inventory }
        newInventory[itemId] = currentQty - 1
        if (newInventory[itemId] <= 0) {
          delete newInventory[itemId]
        }

        await setUserInventoryMap(payload, user.id, newInventory)
      }

      // 2. Start the game session and determine redirect
      let redirect = ''
      if (itemDef.effects.startBattle) {
        const battleResult = await startBattle(itemDef.effects.startBattle.id)
        if (!battleResult.success) {
          return {
            success: false,
            error: battleResult.error || 'Failed to start battle',
          }
        }
        redirect = '/game/battles/encounter'
      } else if (itemDef.effects.startEncounter) {
        const encounterResult = await startEncounter(
          itemDef.effects.startEncounter.id,
        )
        if (!encounterResult.success) {
          return { success: false, error: 'Failed to start encounter' }
        }
        redirect = '/game/locations/encounter'
      } else if (itemDef.effects.startResearch || itemDef.effects.startMinigame) {
        const researchStart =
          itemDef.effects.startResearch || itemDef.effects.startMinigame
        if (!researchStart) {
          return { success: false, error: 'Failed to start research' }
        }
        const researchResult = await startResearchEncounter(
          researchStart.id,
        )
        if (!researchResult.success) {
          return {
            success: false,
            error: researchResult.error || 'Failed to start research',
          }
        }
        redirect = '/game/research/encounter'
      }

      revalidatePath('/game/inventory')
      return {
        success: true,
        redirect,
      }
    } catch (error) {
      console.error('Error starting event from item:', error)
      return { success: false, error: 'Failed to trigger event' }
    }
  }

  return { success: false, error: 'This item cannot be used' }
}
