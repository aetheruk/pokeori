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
import { startGame } from '@/app/(frontend)/game/games/actions'
import { startFieldResearch } from '@/app/(frontend)/game/field-research/actions'
import { allGames } from '@/data/games'
import {
  getGameActivityDomain,
  getGameActivityRoute,
} from '@/utilities/games/activity-domain'
import { drawTcgBoosterPacks } from '@/utilities/tcg/tcg-card-draw'
import type { TcgCard } from '@/data/tcg/types'
import { getItemSkillLockReason } from '@/utilities/skills/unlocks'
import {
  getUserCompletedTasksMap,
  getUserInventoryMap,
  setUserInventoryMap,
} from '@/utilities/user-state'
import type { RequirementData } from '@/utilities/requirements'
import {
  getEligibleScratchCardRewards,
  selectScratchCardReward,
} from '@/utilities/research/scratch-cards'
import {
  getEconomyActionErrorMessage,
  runEconomyAction,
} from '@/utilities/economy/transactions'

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
    gameResults: [],
    fieldResearchResults: [],
  }
}

export async function sellItem(
  itemId: string,
  quantity: number,
  clientActionId: string,
) {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) {
    return { success: false, error: 'Unauthorized' }
  }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    return { success: false, error: 'Quantity must be a positive whole number' }
  }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef) {
    return { success: false, error: 'Item not found' }
  }

  if (!itemDef.sellValue) {
    return { success: false, error: 'Item cannot be sold' }
  }

  const totalValue = itemDef.sellValue * quantity
  const currencyType = itemDef.sellCurrency || 'pokedollars'

  try {
    const result = await runEconomyAction(
      {
        userId: user.id,
        action: 'inventory-sell',
        requestId: clientActionId,
        payload,
      },
      async ({ req }) => {
        const inventory = await getUserInventoryMap(payload, user.id, { req })
        const currentQty = inventory[itemId] || 0
        if (currentQty < quantity) {
          return { success: false, error: 'Not enough items' }
        }

        const freshUser = await payload.findByID({
          collection: 'users',
          id: user.id,
          req,
        })
        const currentCurrency =
          (freshUser.currency as Record<string, number>) || {}
        const newCurrencyVal =
          (currentCurrency[currencyType] || 0) + totalValue
        const newInventory = { ...inventory }
        newInventory[itemId] = currentQty - quantity
        if (newInventory[itemId] <= 0) delete newInventory[itemId]

        await setUserInventoryMap(payload, user.id, newInventory, { req })
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            currency: {
              ...currentCurrency,
              [currencyType]: newCurrencyVal,
            },
          },
          req,
        })

        return { success: true, newCurrency: newCurrencyVal, newInventory }
      },
    )

    if (result.success) revalidatePath('/game/inventory')
    return result
  } catch (error) {
    console.error('Error selling item:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}

export async function useScratchCard(itemId: string, clientActionId: string) {
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

  try {
    const result = await runEconomyAction(
      {
        userId: user.id,
        action: 'inventory-scratch-card',
        requestId: clientActionId,
        payload,
      },
      async ({ req }) => {
        const freshUser = await payload.findByID({
          collection: 'users',
          id: user.id,
          req,
        })
        const inventory = await getUserInventoryMap(payload, user.id, { req })
        const currentQty = inventory[itemId] || 0
        if (currentQty < 1) {
          return {
            success: false,
            error: 'You do not have this scratch card',
          }
        }

        const newInventory = { ...inventory }
        newInventory[itemId] = currentQty - 1
        if (newInventory[itemId] <= 0) delete newInventory[itemId]
        await setUserInventoryMap(payload, user.id, newInventory, { req })

        const completedTasks = await getUserCompletedTasksMap(
          payload,
          user.id,
          { req },
        )
        const requirementData = buildScratchRewardRequirementData({
          user: freshUser,
          inventory: newInventory,
          completedTasks,
        })
        const eligibleRewards = getEligibleScratchCardRewards(
          cardConfig.rewards,
          {
            inventory: newInventory,
            unlockedBanners: freshUser.unlockedBanners,
            unlockedIcons: freshUser.unlockedIcons,
            unlockedTitles: freshUser.unlockedTitles,
          },
          requirementData,
        )
        if (eligibleRewards.length === 0) {
          throw new Error('No eligible reward configuration found')
        }

        const selectedRewardConfig = selectScratchCardReward(
          eligibleRewards,
          Math.random(),
        )

        const rewardsToGrant = selectedRewardConfig?.reward || []
        let summary: any = null
        if (rewardsToGrant.length > 0) {
          const rewardResult = await grantRewards(user.id, rewardsToGrant, {
            source: 'scratch-card',
            payload,
            req,
          })
          summary = rewardResult.summary
        }

        return {
          success: true,
          rewards: rewardsToGrant,
          icon: selectedRewardConfig?.icon,
          summary,
          background: cardConfig.background,
        }
      },
    )

    if (result.success) revalidatePath('/game/inventory')
    return result
  } catch (error) {
    console.error('Error using scratch card:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}

export async function useBoosterPack(itemId: string, clientActionId: string) {
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

  try {
    const result = await runEconomyAction(
      {
        userId: user.id,
        action: 'inventory-open-booster',
        requestId: clientActionId,
        payload,
      },
      async ({ req }) => {
        const inventory = await getUserInventoryMap(payload, user.id, { req })
        const currentQty = inventory[itemId] || 0
        if (currentQty < 1) {
          return {
            success: false,
            error: 'You do not have this booster pack',
          }
        }

        const binderId = `binder-${setId}`
        if ((inventory[binderId] || 0) < 1) {
          return {
            success: false,
            error: `You need the ${itemDef.name.replace('Booster Pack', 'Binder')} to open this pack! Obtain the binder first.`,
          }
        }

        const newInventory = { ...inventory }
        newInventory[itemId] = currentQty - 1
        if (newInventory[itemId] <= 0) delete newInventory[itemId]
        await setUserInventoryMap(payload, user.id, newInventory, { req })

        const drawResult = await drawTcgBoosterPacks({
          setId,
          cardsPerPack,
          packCount: 1,
          userInventory: newInventory,
          payload,
          req,
        })
        const drawnCards: TcgCard[] = drawResult.packs.flatMap(
          (pack) => pack.cards,
        )
        return {
          success: true,
          cards: drawnCards,
          godPack: drawResult.packs.some((pack) => pack.godPack),
        }
      },
    )

    if (result.success) {
      revalidatePath('/game/inventory')
      revalidatePath('/game/tcg')
    }
    return result
  } catch (error) {
    console.error('Error opening booster pack:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}

export async function useAllBoosterPacks(
  itemId: string,
  clientActionId: string,
) {
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

  try {
    const result = await runEconomyAction(
      {
        userId: user.id,
        action: 'inventory-open-all-boosters',
        requestId: clientActionId,
        payload,
      },
      async ({ req }) => {
        const inventory = await getUserInventoryMap(payload, user.id, { req })
        const currentQty = inventory[itemId] || 0
        if (currentQty < 1) {
          return {
            success: false,
            error: 'You do not have this booster pack',
          }
        }
        const binderId = `binder-${setId}`
        if ((inventory[binderId] || 0) < 1) {
          return {
            success: false,
            error: `You need the ${itemDef.name.replace('Booster Pack', 'Binder')} to open this pack! Obtain the binder first.`,
          }
        }

        const newInventory = { ...inventory }
        delete newInventory[itemId]
        await setUserInventoryMap(payload, user.id, newInventory, { req })

        const drawnCards: TcgCard[] = []
        let packsRemaining = currentQty
        let godPacks = 0
        while (packsRemaining > 0) {
          const packCount = Math.min(100, packsRemaining)
          const drawResult = await drawTcgBoosterPacks({
            setId,
            cardsPerPack,
            packCount,
            bulkPenalty: true,
            userInventory: newInventory,
            payload,
            req,
          })
          drawnCards.push(...drawResult.packs.flatMap((pack) => pack.cards))
          godPacks += drawResult.packs.filter((pack) => pack.godPack).length
          packsRemaining -= packCount
        }

        return {
          success: true,
          cards: drawnCards,
          packsOpened: currentQty,
          godPacks,
        }
      },
    )

    if (result.success) {
      revalidatePath('/game/inventory')
      revalidatePath('/game/tcg')
    }
    return result
  } catch (error) {
    console.error('Error opening booster pack stack:', error)
    return { success: false, error: getEconomyActionErrorMessage(error) }
  }
}

import { getLevelFromExp } from '@/data/skills/xp'

export async function useConsumable(
  itemId: string,
  clientActionId: string,
): Promise<{
  success: boolean
  error?: string
  message?: string
  summary?: any
  redirect?: string
}> {
  const payload = await getPayload({ config: payloadConfig })
  const token = (await cookies()).get('payload-token')?.value

  if (!token) return { success: false, error: 'Unauthorized' }

  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return { success: false, error: 'Unauthorized' }
  if (!clientActionId) return { success: false, error: 'Missing action identifier' }

  const itemDef = items.find((i) => i.id === itemId)
  if (!itemDef) return { success: false, error: 'Item not found' }
  if (itemDef.effects?.grantSkillXp) {
    const { skill, amount } = itemDef.effects.grantSkillXp

    try {
      const response = await runEconomyAction(
        { userId: user.id, action: 'use-skill-consumable', requestId: clientActionId },
        async ({ payload: transactionPayload, req }) => {
          const freshUser = await transactionPayload.findByID({ collection: 'users', id: user.id, req })
          const skillLockReason = getItemSkillLockReason(itemDef, freshUser.skills)
          if (skillLockReason) return { success: false, error: skillLockReason }
          const inventory = await getUserInventoryMap(transactionPayload, user.id, { req })
          const currentQty = inventory[itemId] || 0
          if (currentQty < 1) return { success: false, error: 'You do not have this item' }
          if (itemDef.consume !== false) {
            inventory[itemId] = currentQty - 1
            if (inventory[itemId] <= 0) delete inventory[itemId]
            await setUserInventoryMap(transactionPayload, user.id, inventory, { req })
          }
          const rewardsToGrant: Reward[] = [{ type: 'xp', skill, quantity: amount }]
          const result = await grantRewards(user.id, rewardsToGrant, {
            source: 'consumable', payload: transactionPayload, req,
          })
          return { success: true, message: `Gained ${amount} ${skill} XP!`, summary: result.summary }
        },
      )

      revalidatePath('/game/inventory')
      return response
    } catch (error) {
      console.error('Error using consumable:', error)
      return { success: false, error: 'Failed to use item' }
    }
  }

  if (itemDef.effects?.grantPokemonResearchXp?.formId) {
    const { formId, amount } = itemDef.effects.grantPokemonResearchXp

    try {
      const response = await runEconomyAction(
        { userId: user.id, action: 'use-research-consumable', requestId: clientActionId },
        async ({ payload: transactionPayload, req }) => {
          const freshUser = await transactionPayload.findByID({ collection: 'users', id: user.id, req })
          const skillLockReason = getItemSkillLockReason(itemDef, freshUser.skills)
          if (skillLockReason) return { success: false, error: skillLockReason }
          const inventory = await getUserInventoryMap(transactionPayload, user.id, { req })
          const currentQty = inventory[itemId] || 0
          if (currentQty < 1) return { success: false, error: 'You do not have this item' }
          if (itemDef.consume !== false) {
            inventory[itemId] = currentQty - 1
            if (inventory[itemId] <= 0) delete inventory[itemId]
            await setUserInventoryMap(transactionPayload, user.id, inventory, { req })
          }
          const actualAmount = typeof amount === 'number'
            ? amount
            : Math.floor(Math.random() * (amount.max - amount.min + 1)) + amount.min
          const rewardsToGrant: Reward[] = [{ type: 'pokemon_research_xp', targetId: formId, quantity: actualAmount }]
          const result = await grantRewards(user.id, rewardsToGrant, {
            source: 'consumable', payload: transactionPayload, req,
          })
          return { success: true, message: `Gained ${actualAmount} Research XP!`, summary: result.summary }
        },
      )

      revalidatePath('/game/inventory')
      return response
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
      const consumed = await runEconomyAction(
        { userId: user.id, action: 'consume-event-item', requestId: clientActionId },
        async ({ payload: transactionPayload, req }) => {
          const freshUser = await transactionPayload.findByID({ collection: 'users', id: user.id, req })
          const skillLockReason = getItemSkillLockReason(itemDef, freshUser.skills)
          if (skillLockReason) return { success: false, error: skillLockReason, consumed: false }
          const inventory = await getUserInventoryMap(transactionPayload, user.id, { req })
          const currentQty = inventory[itemId] || 0
          if (currentQty < 1) return { success: false, error: 'You do not have this item', consumed: false }
          if (itemDef.consume !== false) {
            inventory[itemId] = currentQty - 1
            if (inventory[itemId] <= 0) delete inventory[itemId]
            await setUserInventoryMap(transactionPayload, user.id, inventory, { req })
          }
          return { success: true, consumed: itemDef.consume !== false }
        },
      )
      if (!consumed.success) return consumed

      // 2. Start the game session and determine redirect
      let redirect = ''
      if (itemDef.effects.startBattle) {
        const battleResult = await startBattle(itemDef.effects.startBattle.id)
        if (!battleResult.success) {
          if (consumed.consumed) await refundConsumedEventItem(user.id, itemId, clientActionId)
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
          if (consumed.consumed) await refundConsumedEventItem(user.id, itemId, clientActionId)
          return { success: false, error: 'Failed to start encounter' }
        }
        redirect = '/game/locations/encounter'
      } else if (
        itemDef.effects.startResearch ||
        itemDef.effects.startMinigame
      ) {
        const researchStart =
          itemDef.effects.startResearch || itemDef.effects.startMinigame
        if (!researchStart) {
          if (consumed.consumed) await refundConsumedEventItem(user.id, itemId, clientActionId)
          return { success: false, error: 'Failed to start research' }
        }
        const activity = allGames.find((entry) => entry.id === researchStart.id)
        if (!activity) {
          if (consumed.consumed) await refundConsumedEventItem(user.id, itemId, clientActionId)
          return { success: false, error: 'Game not found' }
        }
        const domain = getGameActivityDomain(activity.gameType)
        const activityResult =
          domain === 'game'
            ? await startGame(researchStart.id)
            : await startFieldResearch(researchStart.id)
        if (!activityResult.success) {
          if (consumed.consumed) await refundConsumedEventItem(user.id, itemId, clientActionId)
          return {
            success: false,
            error: activityResult.error || 'Failed to start activity',
          }
        }
        redirect = getGameActivityRoute(activity.gameType)
      }

      revalidatePath('/game/inventory')
      return {
        success: true,
        redirect,
      }
    } catch (error) {
      console.error('Error starting event from item:', error)
      return { success: false, error: getEconomyActionErrorMessage(error) }
    }
  }

  return { success: false, error: 'This item cannot be used' }
}

async function refundConsumedEventItem(userId: string, itemId: string, clientActionId: string) {
  await runEconomyAction(
    { userId, action: 'refund-event-item', requestId: clientActionId },
    async ({ payload, req }) => {
      const inventory = await getUserInventoryMap(payload, userId, { req })
      inventory[itemId] = (inventory[itemId] || 0) + 1
      await setUserInventoryMap(payload, userId, inventory, { req })
      return { refunded: true }
    },
  )
}
