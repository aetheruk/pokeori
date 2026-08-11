'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { checkUserAuth } from '@/utilities/auth/server-auth'
import { shops } from '@/data/shops'
import { grantRewards, type Reward, type RewardSummary } from '@/utilities/rewards/reward-logic'
import { revalidatePath } from 'next/cache'
import { getGameUserData } from '@/utilities/game-data'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import {
  getEffectivePurchaseCount,
  isOutOfStock,
  type ShopPurchaseData,
} from '@/utilities/shops/stock'
import { checkShopItemRequirements, checkShopRequirements } from '@/utilities/shops/requirements'
import {
  getUserInventoryMap,
  getUserShopPurchasesRecord,
  setUserInventoryMap,
  setUserShopPurchasesRecord,
} from '@/utilities/user-state'
import { recordDailyActivityProgress } from '@/utilities/tasks/daily-progress'
import {
  getEconomyActionErrorMessage,
  runEconomyAction,
} from '@/utilities/economy/transactions'

export interface PurchaseItemResult {
  success: boolean
  message?: string
  rewards?: RewardSummary
  purchaseData?: ShopPurchaseData
}

export async function purchaseShopItem(
  shopId: string,
  itemId: string,
  clientActionId: string,
): Promise<PurchaseItemResult> {
  const { user } = await checkUserAuth()
  if (!user) {
    return { success: false, message: 'Not authenticated' }
  }

  const shop = shops.find((s) => s.id === shopId)
  if (!shop) {
    return { success: false, message: 'Shop not found' }
  }

  const item = shop.items.find((i) => i.id === itemId)
  if (!item) {
    return { success: false, message: 'Item not found' }
  }

  try {
    const payload = await getPayload({ config: payloadConfig })
    const result = await runEconomyAction<PurchaseItemResult>(
      {
        userId: user.id,
        action: 'shop-purchase',
        requestId: clientActionId,
        payload,
      },
      async ({ req }) => {
        const requirements = [
          ...(shop.requirements || []),
          ...(item.requirements || []),
        ]
        const requiredKeys = analyzeRequirements(requirements)
        if (!requiredKeys.includes('currency')) requiredKeys.push('currency')
        if (!requiredKeys.includes('inventory')) requiredKeys.push('inventory')
        if (!requiredKeys.includes('shopPurchases')) {
          requiredKeys.push('shopPurchases')
        }

        const freshUser = await payload.findByID({
          collection: 'users',
          id: user.id,
          req,
        })
        const userData = await getGameUserData(freshUser, requiredKeys, {
          payload,
          req,
        })

        if (!checkShopRequirements(userData, shop)) {
          return { success: false, message: 'Shop locked' }
        }
        if (!checkShopItemRequirements(userData, shop, item)) {
          return { success: false, message: 'Item locked' }
        }

        const shopPurchases = (userData.shopPurchases || {}) as Record<
          string,
          ShopPurchaseData
        >
        if (isOutOfStock(item, shopPurchases[itemId])) {
          return { success: false, message: 'Out of stock' }
        }

        const currency = {
          ...((userData.currency || {}) as Record<string, number>),
        }
        const inventory = await getUserInventoryMap(payload, user.id, { req })

        for (const cost of item.cost) {
          if (!Number.isSafeInteger(cost.amount) || cost.amount <= 0) {
            throw new Error(`Invalid shop cost for ${shop.id}:${item.id}`)
          }
          if (cost.type === 'currency') {
            const current = currency[cost.id] || 0
            if (current < cost.amount) {
              return { success: false, message: `Not enough ${cost.id}` }
            }
            currency[cost.id] = current - cost.amount
          } else {
            const current = inventory[cost.id] || 0
            if (current < cost.amount) {
              return {
                success: false,
                message: `Not enough item: ${cost.id}`,
              }
            }
            inventory[cost.id] = current - cost.amount
          }
        }

        if (item.cost.some((cost) => cost.type === 'currency')) {
          await payload.update({
            collection: 'users',
            id: user.id,
            data: { currency },
            req,
          })
        }
        if (item.cost.some((cost) => cost.type === 'item')) {
          await setUserInventoryMap(payload, user.id, inventory, { req })
        }

        const currentPurchases = (await getUserShopPurchasesRecord(
          payload,
          user.id,
          { req },
        )) as Record<string, ShopPurchaseData>
        const nowIso = new Date().toISOString()
        const nextPurchaseData: ShopPurchaseData = {
          count:
            getEffectivePurchaseCount(item, currentPurchases[itemId]) + 1,
          lastPurchasedAt: nowIso,
        }
        currentPurchases[itemId] = nextPurchaseData
        await setUserShopPurchasesRecord(
          payload,
          user.id,
          currentPurchases as any,
          { req },
        )

        const rewardsToGrant: Reward[] = item.rewards.map((reward) => ({
          ...reward,
          dropChance: 100,
        }))
        const { summary } = await grantRewards(user.id, rewardsToGrant, {
          skipDropChance: true,
          payload,
          req,
        })

        await recordDailyActivityProgress(
          user.id,
          {
            kind: 'shop_purchase',
            sourceId: `${shop.id}:${item.id}`,
          },
          { payload, req },
        )

        return {
          success: true,
          rewards: summary,
          purchaseData: nextPurchaseData,
        }
      },
    )

    if (result.success) {
      revalidatePath('/game')
      revalidatePath('/game/shops')
    }
    return result
  } catch (error) {
    console.error('Shop purchase transaction failed', error)
    return { success: false, message: getEconomyActionErrorMessage(error) }
  }
}
