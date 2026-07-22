'use server'

import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { revalidatePath } from 'next/cache'
import { checkUserAuth } from '@/utilities/auth/server-auth'
import { artisanRecipes, type ArtisanRecipe } from '@/data/artisan'
import { checkRequirement } from '@/utilities/requirements'
import { getGameUserData } from '@/utilities/game-data'
import { grantRewards } from '@/utilities/rewards/reward-logic'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { redis } from '@/utilities/redis'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import type { TaskCondition } from '@/data/types'
import {
  getArtisanBalanceQuality,
  getArtisanCraftQuality,
  getArtisanCrushQuality,
  getArtisanHoldQuality,
  getArtisanScatterQuality,
  getArtisanMixQuality,
} from '@/utilities/artisan/craft-quality'
import {
  getPrimaryOutputRewardIndex,
  getQuantityForQuality,
  getArtisanCraftRequiredLevel,
  resolveArtisanCraftMultiplier,
  resolveCraftRewards,
  scaleArtisanCosts,
  shouldConsumeCraftCosts,
  shouldFailCraft,
} from '@/utilities/artisan/rewards'
import type { ArtisanCraftSession } from '@/utilities/artisan/types'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { getUserInventoryMap, setUserInventoryMap } from '@/utilities/user-state'
import { recordDailyActivityProgress } from '@/utilities/tasks/daily-progress'

const SESSION_TTL_SECONDS = 20
const START_DELAY_MS = 650
const CRAFT_DURATION_MS = 1600
const PERFECT_WINDOW_MS = 55
const GOOD_WINDOW_MS = 190
const CRUSH_DURATION_MS = 2500
const CRUSH_GOOD_TAP_COUNT = 13
const CRUSH_PERFECT_TAP_COUNT = 16
const BALANCE_DURATION_MS = 15600
const BALANCE_PERIOD_MS = 1200
const BALANCE_GOOD_WINDOW = 0.084
const BALANCE_PERFECT_WINDOW = 0.084
const MIX_DURATION_MS = 3200
const MIX_GOOD_ROTATIONS = 6
const MIX_PERFECT_ROTATIONS = 9
const SCATTER_DURATION_MS = 4000
const SCATTER_GOOD_TAP_COUNT = 11
const SCATTER_PERFECT_TAP_COUNT = 15
const HOLD_TARGET_MIN_MS = 420
const HOLD_TARGET_MAX_MS = 1160
const HOLD_TARGET_MIN_SHIFT_MS = 180

function sessionKey(userId: string, sessionId: string) {
  return `artisan:craft:session:${userId}:${sessionId}`
}

function emptyRewardSummary(): RewardSummary {
  return {
    xp: {},
    items: [],
    pokemon: [],
    currency: [],
    cards: [],
    tasksCompleted: [],
    banners: [],
    icons: [],
    titles: [],
    upgrades: [],
    researchXp: [],
    researchBreakthroughs: [],
  }
}

function getPrimaryOutputQuantity(recipe: ArtisanRecipe): number {
  const primaryOutputRewardIndex = getPrimaryOutputRewardIndex(recipe)
  if (primaryOutputRewardIndex === null) return recipe.outputQuantity.min
  const reward = recipe.rewards[primaryOutputRewardIndex]
  if (typeof reward?.quantity === 'number') return reward.quantity
  return recipe.outputQuantity.min
}

function buildHoldTargetOffsets(): number[] {
  const targets: number[] = []

  for (let index = 0; index < 3; index += 1) {
    let target = HOLD_TARGET_MIN_MS + Math.floor(Math.random() * (HOLD_TARGET_MAX_MS - HOLD_TARGET_MIN_MS))
    for (let reroll = 0; reroll < 10 && index > 0; reroll += 1) {
      const previous = targets[index - 1]
      if (Math.abs(target - previous) >= HOLD_TARGET_MIN_SHIFT_MS) break
      target = HOLD_TARGET_MIN_MS + Math.floor(Math.random() * (HOLD_TARGET_MAX_MS - HOLD_TARGET_MIN_MS))
    }
    targets.push(target)
  }

  return targets
}

function recipeGateFailed(recipe: ArtisanRecipe, userData: Awaited<ReturnType<typeof getGameUserData>>) {
  const checks: TaskCondition[] = [
    ...(recipe.requirements || []),
    ...(recipe.criteria || []),
  ]

  return checks.some((condition) => !checkRequirement(userData, condition))
}

async function getValidatedCraftContext(
  userId: string,
  recipe: ArtisanRecipe,
  options: { checkCosts?: boolean; craftMultiplier?: number } = {},
) {
  const payload = await getPayload({ config: payloadConfig })
  const freshUser = await payload.findByID({ collection: 'users', id: userId })
  const userData = await getGameUserData(freshUser)

  const artisanLevel = getSkillLevel(freshUser.skills as any, 'artisan')
  const requiredArtisanLevel = getArtisanCraftRequiredLevel(recipe, options.craftMultiplier || 1)
  if (artisanLevel < requiredArtisanLevel) {
    return {
      success: false as const,
      error: `Artisan Level ${requiredArtisanLevel} required`,
    }
  }

  if (recipeGateFailed(recipe, userData)) {
    return { success: false as const, error: 'Recipe requirements not met' }
  }

  const inventory = await getUserInventoryMap(payload as any, userId)
  const currency = (freshUser.currency || {}) as Record<string, number>
  if (options.checkCosts !== false) {
    const costs = scaleArtisanCosts(recipe.costs, options.craftMultiplier || 1)
    for (const cost of costs) {
      if (cost.type === 'currency') {
        if ((currency[cost.id] || 0) < cost.amount) {
          return { success: false as const, error: `Missing ${cost.id}` }
        }
        continue
      }
      if ((inventory[cost.id] || 0) < cost.amount) {
        return { success: false as const, error: `Missing ${cost.id}` }
      }
    }
  }

  return {
    success: true as const,
    payload,
    freshUser,
    inventory,
    currency,
  }
}

export async function beginArtisanCraft(recipeId: string, requestedMultiplier?: number) {
  const { user } = await checkUserAuth()
  if (!user) return { success: false, error: 'Not authenticated' }

  const recipe = artisanRecipes.find((entry) => entry.id === recipeId)
  if (!recipe) return { success: false, error: 'Recipe not found' }
  const craftMultiplier = resolveArtisanCraftMultiplier(recipe, requestedMultiplier)

  const rate = await checkActionRateLimit(user.id, 'artisan-craft-begin', 90, 60)
  if (!rate.allowed) return { success: false, error: 'Too many crafting requests. Please wait.' }

  const validation = await getValidatedCraftContext(user.id, recipe, { craftMultiplier })
  if (!validation.success) return validation

  const now = Date.now()
  const startAt = now + START_DELAY_MS
  const duration =
    recipe.craftType === 'crush'
      ? CRUSH_DURATION_MS
      : recipe.craftType === 'balance'
        ? BALANCE_DURATION_MS
        : recipe.craftType === 'mix'
          ? MIX_DURATION_MS
          : recipe.craftType === 'scatter'
            ? SCATTER_DURATION_MS
            : CRAFT_DURATION_MS
  const holdTargetOffsetsMs = recipe.craftType === 'precise' ? buildHoldTargetOffsets() : undefined
  const targetAt =
    startAt +
    (holdTargetOffsetsMs?.[0] || HOLD_TARGET_MIN_MS + Math.floor(Math.random() * (HOLD_TARGET_MAX_MS - HOLD_TARGET_MIN_MS)))
  const session: ArtisanCraftSession = {
    id: crypto.randomUUID(),
    userId: user.id,
    recipeId,
    craftMultiplier,
    craftType: recipe.craftType,
    createdAt: now,
    startAt,
    targetAt,
    holdTargetOffsetsMs,
    endAt: startAt + duration,
    perfectWindowMs: PERFECT_WINDOW_MS,
    goodWindowMs: GOOD_WINDOW_MS,
    goodTapCount:
      recipe.craftType === 'crush'
        ? CRUSH_GOOD_TAP_COUNT
        : recipe.craftType === 'scatter'
          ? SCATTER_GOOD_TAP_COUNT
          : undefined,
    perfectTapCount:
      recipe.craftType === 'crush'
        ? CRUSH_PERFECT_TAP_COUNT
        : recipe.craftType === 'scatter'
          ? SCATTER_PERFECT_TAP_COUNT
          : undefined,
    balanceTargets:
      recipe.craftType === 'balance'
        ? [0, 1, 2].map(() => 0.25 + Math.random() * 0.5)
        : undefined,
    balanceGoodWindow: recipe.craftType === 'balance' ? BALANCE_GOOD_WINDOW : undefined,
    balancePerfectWindow: recipe.craftType === 'balance' ? BALANCE_PERFECT_WINDOW : undefined,
    balancePeriodMs: recipe.craftType === 'balance' ? BALANCE_PERIOD_MS : undefined,
    mixGoodRotations: recipe.craftType === 'mix' ? MIX_GOOD_ROTATIONS : undefined,
    mixPerfectRotations: recipe.craftType === 'mix' ? MIX_PERFECT_ROTATIONS : undefined,
  }

  await redis.set(sessionKey(user.id, session.id), session, { ex: SESSION_TTL_SECONDS })

  return {
    success: true,
    session,
    preview: {
      outputMin: recipe.outputQuantity.min * craftMultiplier,
      outputMax: recipe.outputQuantity.max * craftMultiplier,
      previousQuantity: getPrimaryOutputQuantity(recipe) * craftMultiplier,
    },
  }
}

export async function completeArtisanCraft(sessionId: string, craftInput?: number | number[]) {
  const { user } = await checkUserAuth()
  if (!user) return { success: false, error: 'Not authenticated' }

  const lock = await acquireActionLock(`lock:artisan:craft:${user.id}`, 10)
  if (!lock.acquired) return { success: false, error: 'Another craft request is in progress' }

  try {
    const idemKey = `artisan:craft:complete:${user.id}:${sessionId}`
    const cached = await getIdempotentResult<any>(idemKey)
    if (cached) return cached

    const session = await redis.get<ArtisanCraftSession>(sessionKey(user.id, sessionId))
    if (!session || session.userId !== user.id) {
      return { success: false, error: 'Crafting session expired' }
    }

    const recipe = artisanRecipes.find((entry) => entry.id === session.recipeId)
    if (!recipe) return { success: false, error: 'Recipe not found' }
    const craftMultiplier = resolveArtisanCraftMultiplier(recipe, session.craftMultiplier)

    const duration = session.endAt - session.startAt
    const quality =
      session.craftType === 'crush'
        ? getArtisanCrushQuality(
            typeof craftInput === 'number' && Number.isFinite(craftInput) ? craftInput : 0,
            session,
          )
        : session.craftType === 'balance'
          ? getArtisanBalanceQuality(
              Array.isArray(craftInput)
                ? craftInput.map((entry) => Math.min(duration, Math.max(0, entry)))
                : [],
              session,
            )
          : session.craftType === 'mix'
            ? getArtisanMixQuality(
                typeof craftInput === 'number' && Number.isFinite(craftInput) ? craftInput : 0,
                session,
              )
            : session.craftType === 'scatter'
              ? getArtisanScatterQuality(
                  typeof craftInput === 'number' && Number.isFinite(craftInput) ? craftInput : 0,
                  session,
                )
              : Array.isArray(craftInput)
                ? getArtisanHoldQuality(
                    craftInput.map((entry) => Math.min(duration, Math.max(0, entry))),
                    session,
                  )
                : getArtisanCraftQuality(
                    typeof craftInput === 'number' && Number.isFinite(craftInput)
                      ? session.startAt + Math.min(duration, Math.max(0, craftInput))
                      : Date.now(),
                    session,
                  )
    const failed = shouldFailCraft(recipe, quality)
    const materialsLost = shouldConsumeCraftCosts(recipe, quality)
    const primaryOutputRewardIndex = getPrimaryOutputRewardIndex(recipe)
    const quantity = failed
      ? primaryOutputRewardIndex === null
        ? null
        : 0
      : primaryOutputRewardIndex === null
        ? null
        : getQuantityForQuality(recipe, quality) * craftMultiplier

    const validation = await getValidatedCraftContext(user.id, recipe, {
      checkCosts: materialsLost,
      craftMultiplier,
    })
    if (!validation.success) return validation

    if (materialsLost) {
      const nextCurrency = { ...validation.currency }
      let currencyChanged = false
      for (const cost of scaleArtisanCosts(recipe.costs, craftMultiplier)) {
        if (cost.type === 'currency') {
          nextCurrency[cost.id] = Math.max(0, (nextCurrency[cost.id] || 0) - cost.amount)
          currencyChanged = true
          continue
        }
        validation.inventory[cost.id] = Math.max(0, (validation.inventory[cost.id] || 0) - cost.amount)
      }

      await setUserInventoryMap(validation.payload as any, user.id, validation.inventory)
      if (currencyChanged) {
        await validation.payload.update({
          collection: 'users',
          id: user.id,
          data: { currency: nextCurrency },
          depth: 0,
        })
      }
    }
    const rewardsToGrant = resolveCraftRewards(recipe, quality, craftMultiplier)
    const { summary } =
      rewardsToGrant.length > 0
        ? await grantRewards(user.id, rewardsToGrant)
        : { summary: emptyRewardSummary() }

    await redis.del(sessionKey(user.id, sessionId))

    const result = {
      success: true,
      failed,
      materialsLost,
      summary,
      quality,
      quantity,
      recipeId: recipe.id,
      recipeName: recipe.name,
    }
    await setIdempotentResult(idemKey, result, 30)

    if (!failed) {
      await recordDailyActivityProgress(user.id, {
        kind: 'craft_success',
        sourceId: recipe.id,
      })
    }

    revalidatePath('/game/artisan')
    revalidatePath('/game/inventory')
    revalidatePath('/game/explore')

    return result
  } finally {
    await releaseActionLock(lock)
  }
}
