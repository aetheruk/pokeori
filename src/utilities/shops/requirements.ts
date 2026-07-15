import type { ShopConfig, ShopItem } from '@/data/shops/types'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'

function checkShopConditionList(
  userData: RequirementData,
  shop: Pick<ShopConfig, 'category' | 'subCategory'>,
  requirements?: ShopConfig['requirements'],
) {
  if (!requirements || requirements.length === 0) return true
  return requirements.every((requirement) =>
    checkRequirement(userData, requirement, {
      category: shop.category,
      subCategory: shop.subCategory,
    }),
  )
}

export function checkShopRequirements(userData: RequirementData, shop: ShopConfig) {
  return checkShopConditionList(userData, shop, shop.requirements)
}

export function checkShopItemRequirements(
  userData: RequirementData,
  shop: ShopConfig,
  item: ShopItem,
) {
  return checkShopConditionList(userData, shop, item.requirements)
}
