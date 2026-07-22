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

export interface PurchaseItemResult {
  success: boolean
  message?: string
  rewards?: RewardSummary
}

export async function purchaseShopItem(
  shopId: string,
  itemId: string,
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

  const payload = await getPayload({ config: payloadConfig })

  // 1. Analyze Requirements to fetch needed user data
  const requirements = [...(shop.requirements || []), ...(item.requirements || [])]
  const requiredKeys = analyzeRequirements(requirements)

  // Always fetch currency and inventory for cost checking
  if (!requiredKeys.includes('currency')) requiredKeys.push('currency')
  if (!requiredKeys.includes('inventory')) requiredKeys.push('inventory')
  if (!requiredKeys.includes('shopPurchases')) requiredKeys.push('shopPurchases')

  const freshUser = await payload.findByID({ collection: 'users', id: user.id })
  const userData = await getGameUserData(freshUser, requiredKeys)

  // 2. Check Shop Requirements
  if (!checkShopRequirements(userData, shop)) {
    return { success: false, message: 'Shop locked' }
  }

  // 3. Check Item Requirements
  if (!checkShopItemRequirements(userData, shop, item)) {
    return { success: false, message: 'Item locked' }
  }

  // 4. Check Stock
  const shopPurchases = (userData.shopPurchases || {}) as Record<string, ShopPurchaseData>
  const purchaseData = shopPurchases[itemId]

  if (isOutOfStock(item, purchaseData)) {
    return { success: false, message: 'Out of stock' }
  }

  // 5. Check Costs (Currency & Items)
  const currencyToConsume: { id: string; quantity: number }[] = []
  const itemsToConsume: { id: string; quantity: number }[] = []

  for (const cost of item.cost) {
    if (cost.type === 'currency') {
      const currency = (userData.currency || {}) as Record<string, number>
      const current = currency[cost.id] || 0
      if (current < cost.amount) {
        return { success: false, message: `Not enough ${cost.id}` }
      }
      currencyToConsume.push({ id: cost.id, quantity: cost.amount })
    } else if (cost.type === 'item') {
      const inventoryItem = userData.inventory.find((i) => i.itemId === cost.id)
      const current = inventoryItem ? inventoryItem.quantity : 0
      if (current < cost.amount) {
        return { success: false, message: `Not enough item: ${cost.id}` }
      }
      itemsToConsume.push({ id: cost.id, quantity: cost.amount })
    }
  }

  // 6. Consume Resources
  try {
    // Consume Currency
    if (currencyToConsume.length > 0) {
      const newCurrency = { ...userData.currency }
      for (const c of currencyToConsume) {
        // @ts-expect-error - dynamic
        newCurrency[c.id] = (newCurrency[c.id] || 0) - c.quantity
      }

      await payload.update({
        collection: 'users',
        id: user.id,
        data: { currency: newCurrency },
      })
      // Update local Ref for subsequent logic if needed (or just assume success)
      userData.currency = newCurrency
    }

    // Consume Items
    if (itemsToConsume.length > 0) {
      const userInventory = await getUserInventoryMap(payload, user.id)

      for (const i of itemsToConsume) {
        userInventory[i.id] = Math.max(0, (userInventory[i.id] || 0) - i.quantity)
      }

      await setUserInventoryMap(payload, user.id, userInventory)
    }
  } catch (e) {
    console.error('Error consuming resources during purchase', e)
    return { success: false, message: 'Transaction failed' }
  }

  // 7. Update Stock / Purchase History
  try {
    const currentPurchases = (await getUserShopPurchasesRecord(payload, user.id)) as Record<
      string,
      ShopPurchaseData
    >

    const nowIso = new Date().toISOString()
    const prevData = currentPurchases[itemId]
    const nextCount = getEffectivePurchaseCount(item, prevData) + 1

    currentPurchases[itemId] = {
      count: nextCount,
      lastPurchasedAt: nowIso,
    }

    await setUserShopPurchasesRecord(payload, user.id, currentPurchases as any)
  } catch (e) {
    console.error('Error updating purchase history', e)
    // Don't fail the whole transaction if we already took money, but this is bad.
  }

  // 8. Grant Rewards
  const rewardsToGrant: Reward[] = item.rewards.map((r) => ({
    ...r,
    dropChance: 100, // Ensure they get what they bought
  }))

  const { summary } = await grantRewards(user.id, rewardsToGrant, { skipDropChance: true })

  await recordDailyActivityProgress(user.id, {
    kind: 'shop_purchase',
    sourceId: `${shop.id}:${item.id}`,
  })

  revalidatePath('/game')
  revalidatePath('/game/shops')

  return { success: true, rewards: summary }
}
