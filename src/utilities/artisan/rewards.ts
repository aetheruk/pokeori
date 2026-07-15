import type { ArtisanCraftQuality } from '@/utilities/artisan/types'
import type { ArtisanCost, ArtisanRecipe } from '@/data/artisan'
import type { LocationReward } from '@/data/types'
import {
  calculateContentSkillXp,
  resolveSkillXpConfig,
} from '@/data/skills/xp'

function scaleQuantity(
  quantity: LocationReward['quantity'],
  multiplier: number,
): LocationReward['quantity'] {
  if (typeof quantity === 'number') return quantity * multiplier
  if (quantity && typeof quantity === 'object') {
    return {
      min: quantity.min * multiplier,
      max: quantity.max * multiplier,
    }
  }
  return quantity
}

export function resolveArtisanCraftMultiplier(
  recipe: Pick<ArtisanRecipe, 'bulk'>,
  requestedMultiplier?: number,
): number {
  const bulk = recipe.bulk
  if (!Number.isInteger(bulk) || !bulk || bulk <= 1) return 1
  return requestedMultiplier === bulk ? bulk : 1
}

export function getArtisanCraftRequiredLevel(
  recipe: Pick<ArtisanRecipe, 'artisanLevel' | 'bulk'>,
  multiplier = 1,
): number {
  const bulk = recipe.bulk
  return bulk && bulk > 1 && multiplier === bulk
    ? recipe.artisanLevel + 5
    : recipe.artisanLevel
}

export function scaleArtisanCosts(costs: ArtisanCost[], multiplier: number): ArtisanCost[] {
  return costs.map((cost) => ({
    ...cost,
    amount: cost.amount * multiplier,
  }))
}

export function getPrimaryOutputRewardIndex(recipe: ArtisanRecipe): number | null {
  if (recipe.primaryOutputRewardIndex === null) return null
  if (typeof recipe.primaryOutputRewardIndex === 'number') {
    const reward = recipe.rewards[recipe.primaryOutputRewardIndex]
    return reward?.type === 'item' ? recipe.primaryOutputRewardIndex : null
  }

  const firstItemIndex = recipe.rewards.findIndex((entry) => entry.type === 'item')
  return firstItemIndex >= 0 ? firstItemIndex : null
}

export function getQuantityForQuality(recipe: ArtisanRecipe, quality: ArtisanCraftQuality): number {
  const qualityQuantity = recipe.qualityOutputQuantity?.[quality]
  if (typeof qualityQuantity === 'number') return qualityQuantity

  if (quality === 'perfect') return recipe.outputQuantity.max
  if (quality === 'good') {
    return Math.max(
      recipe.outputQuantity.min,
      Math.round((recipe.outputQuantity.min + recipe.outputQuantity.max) / 2),
    )
  }
  return recipe.outputQuantity.min
}

export function shouldFailCraft(recipe: ArtisanRecipe, quality: ArtisanCraftQuality): boolean {
  const qualityRank: Record<ArtisanCraftQuality, number> = { bad: 0, good: 1, perfect: 2 }
  if (recipe.minimumQuality && qualityRank[quality] < qualityRank[recipe.minimumQuality]) {
    return true
  }

  return quality === 'bad' && recipe.fail === true
}

export function shouldConsumeCraftCosts(recipe: ArtisanRecipe, quality: ArtisanCraftQuality): boolean {
  if (!shouldFailCraft(recipe, quality)) return true
  if (recipe.materialFailQualities) return recipe.materialFailQualities.includes(quality)
  return recipe.materialFail === true
}

export function resolveCraftRewards(
  recipe: ArtisanRecipe,
  quality: ArtisanCraftQuality,
  multiplier = 1,
): LocationReward[] {
  if (shouldFailCraft(recipe, quality)) return []

  const safeMultiplier = Math.max(1, Math.floor(multiplier))
  const primaryOutputRewardIndex = getPrimaryOutputRewardIndex(recipe)
  const quantity = getQuantityForQuality(recipe, quality)
  const rewardsToGrant = recipe.rewards.map((reward, index) => ({
    ...reward,
    quantity:
      index === primaryOutputRewardIndex
        ? quantity * safeMultiplier
        : scaleQuantity(reward.quantity, safeMultiplier),
  }))

  const xpConfig = resolveSkillXpConfig(
    'artisan',
    recipe.artisanLevel,
    recipe.skillXp,
  )
  const xpQualityModifier =
    xpConfig.skill === 'artisan'
      ? quality === 'perfect'
        ? 1.3
        : quality === 'good'
          ? 1.15
          : 1
      : 1
  const skillXp = calculateContentSkillXp(xpConfig.skill, xpConfig.level, xpQualityModifier)
  if (skillXp > 0) {
    rewardsToGrant.push({
      type: 'xp',
      skill: xpConfig.skill,
      quantity: skillXp * safeMultiplier,
      dropChance: 100,
    })
  }

  return rewardsToGrant
}
