import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import type { BattleState } from '@/utilities/battle/types'
import { getUser } from '../helpers/user'
import { getActiveBattleState, BATTLE_TTL } from '../helpers/state-management'
import { redis } from '@/utilities/redis'
import { battles } from '@/data/battles'
import { applyBattleItemEffect } from '@/utilities/battle/item-effects'
import {
  needsPlayerLeadSelection,
  needsPlayerReplacement,
} from '@/utilities/battle/switching'
import {
  getItemSkillLockReason,
  getSkillLevel,
  resolveTrainerBattleItemUseLimit,
} from '@/utilities/skills/unlocks'
import { applyObservedPreferredStance } from '@/utilities/battle/pokedex-observation'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  setUserInventoryMap,
  setUserPokedexMap,
} from '@/utilities/user-state'
import { clearZMoveCharge } from '@/utilities/battle/z-move'
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
import { runBattleActionWithGuard } from '../helpers/action-guard'
import { getChronicleBattleItemUseLimit } from '@/utilities/battle/chronicle-budgets'

export async function useBattleItem(
  itemId: string,
  clientActionId?: string,
): Promise<{
  success: boolean
  error?: string
  state?: BattleState
  message?: string
}> {
  const user = await getUser()
  if (!user) return { success: false, error: 'Not authenticated' }

  return runBattleActionWithGuard(user.id, clientActionId, async () => {
    const state = await getActiveBattleState(user)
    if (!state) return { success: false, error: 'No active battle' }

    if (state.status !== 'ongoing')
      return { success: false, error: 'Battle has ended' }
    if (state.isPvp)
      return {
        success: false,
        error: 'Battle items are not available in PVP yet',
      }
    if (needsPlayerLeadSelection(state)) {
      return {
        success: false,
        error: 'Choose which Pokemon to send out first',
        state,
      }
    }
    if (needsPlayerReplacement(state)) {
      return {
        success: false,
        error: 'Choose your next Pokemon before using an item',
        state,
      }
    }
    if (state.playerMoveLock) {
      return {
        success: false,
        error: 'Finish the current move before using an item',
        state,
      }
    }

    const battleConfig =
      state.dynamicBattleConfig || battles.find((b) => b.id === state.battleId)
    const trainerLevel = getSkillLevel(user.skills, 'battling')
    const maxItems = state.chronicle
      ? getChronicleBattleItemUseLimit({
          battleItems: state.chronicleInventory,
          usedCount: state.itemsUsedThisBattle.length,
          battleConfig,
        })
      : (state.config?.itemsPerBattle ??
        resolveTrainerBattleItemUseLimit(
          trainerLevel,
          battleConfig?.itemsPerBattle,
        ))
    if (!state.config) state.config = {}
    state.config.itemsPerBattle = maxItems

    const effectiveMaxItems = getBattleItemUseLimit(state, 'player')
    if (state.itemsUsedThisBattle.length >= effectiveMaxItems) {
      return {
        success: false,
        error: `You can only use ${effectiveMaxItems} items per battle`,
      }
    }

    const allowedItems =
      state.config?.allowedItems || battleConfig?.allowedItems
    if (allowedItems && allowedItems.length > 0) {
      if (!allowedItems.includes(itemId)) {
        return {
          success: false,
          error: 'This item is not allowed in this battle',
        }
      }
    }

    const { items } = await import('@/data/items')
    const item = items.find((i) => i.id === itemId)
    if (!item) return { success: false, error: 'Item not found' }
    if (!item.battleEffect)
      return { success: false, error: 'This item cannot be used in battle' }
    const skillLockReason = state.chronicle
      ? null
      : getItemSkillLockReason(item, user.skills)
    if (skillLockReason) return { success: false, error: skillLockReason }
    if (
      item.battleEffect.type === 'tera' ||
      item.battleEffect.type === 'z-move'
    ) {
      return { success: false, error: 'Use this item from the Power Up menu' }
    }

    const payload = state.chronicle
      ? null
      : await getPayload({ config: configPromise })

    // Check inventory
    const inventory = state.chronicle
      ? { ...(state.chronicleInventory || {}) }
      : await getUserInventoryMap(payload as any, user.id)
    const currentQty = inventory[itemId] || 0

    if (currentQty < 1) {
      return { success: false, error: 'You do not have this item' }
    }

    const playerMon = state.playerTeam[state.activePlayerIndex]
    const battleEffect = item.battleEffect
    let effectResult = applyBattleItemEffect({
      pokemon: playerMon,
      battleEffect,
    })

    if (battleEffect.type === 'reveal-stance') {
      const { getMostLikelyStance, getMostLikelyStanceForPokemonForm } =
        await import('@/utilities/battle/battle-logic')
      const enemyMon = state.enemyTeam[state.activeEnemyIndex]
      const { stance: likelyStance, percentage } = getMostLikelyStance(enemyMon)
      const enemyForm = getPokemonForm(enemyMon.formId)
      const pokedexReferenceStance = enemyForm
        ? getMostLikelyStanceForPokemonForm(enemyForm).stance
        : likelyStance
      state.revealedEnemyStance = likelyStance
      enemyMon.observedPreferredStance = likelyStance
      if (!state.chronicle) {
        const pokedex = await getUserPokedexMap(payload as any, user.id)
        const observed = applyObservedPreferredStance(
          pokedex as any,
          enemyMon,
          pokedexReferenceStance,
        )
        if (observed.updated) {
          await setUserPokedexMap(
            payload as any,
            user.id,
            observed.pokedex as any,
          )
        }
      }
      const stanceNames: Record<string, string> = {
        power: 'Power',
        speed: 'Speed',
        tech: 'Tech',
      }
      effectResult = {
        applied: true,
        message: `The Battle Observer reveals the enemy favors ${stanceNames[likelyStance]} (${percentage}% chance)!`,
      }
    }

    if (!effectResult.applied) {
      return {
        success: false,
        error: effectResult.message || "It won't have any effect.",
        state,
      }
    }

    const message = effectResult.message
    clearZMoveCharge(playerMon)

    // Update Inventory (Embedded Map Update)
    const nextQty = currentQty - 1
    if (nextQty > 0) {
      inventory[itemId] = nextQty
    } else {
      delete inventory[itemId]
    }
    if (state.chronicle) {
      state.chronicleInventory = inventory
    } else {
      await setUserInventoryMap(payload as any, user.id, inventory)
    }

    // Track item usage
    state.itemsUsedThisBattle.push({ itemId, turn: state.turn })

    if (battleEffect.skipsTurn !== false) {
      const enemyMon = state.enemyTeam[state.activeEnemyIndex]
      const { processEnemyAttackOnly } = await import('../pve/enemy-attack')
      await processEnemyAttackOnly(state, playerMon, enemyMon, user, message)
    } else {
      state.history.unshift({
        turn: state.turn,
        playerStance: 'tech',
        enemyStance: 'tech',
        result: 'tie',
        damageDealt: 0,
        damageTaken: 0,
        message,
      })
      await redis.set(`battle:${user.id}`, state, { ex: BATTLE_TTL })
    }

    if (state.status !== 'ongoing') {
      revalidatePath('/game/battles/encounter')
    }
    return { success: true, state, message }
  })
}
