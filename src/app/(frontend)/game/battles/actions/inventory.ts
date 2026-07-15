import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getUser } from '../helpers/user'
import { getActiveBattleState } from '../helpers/state-management'
import { battles } from '@/data/battles'
import type { BattleInventoryItem } from '@/utilities/battle/types'
import { canUseItemWithSkillRequirements } from '@/utilities/skills/unlocks'
import { getUserInventoryMap } from '@/utilities/user-state'
export type { BattleInventoryItem }

export async function getBattleInventory(): Promise<{
  success: boolean
  items: BattleInventoryItem[]
}> {
  const user = await getUser()
  if (!user) return { success: false, items: [] }

  const state = await getActiveBattleState(user)
  if (!state || state.isPvp || state.status !== 'ongoing')
    return { success: true, items: [] }

  const { items } = await import('@/data/items')

  const battleInventory: BattleInventoryItem[] = []
  const userInventory = state.chronicle
    ? state.chronicleInventory || {}
    : await getUserInventoryMap(
        (await getPayload({ config: configPromise })) as any,
        user.id,
      )
  const battleConfig = battles.find((battle) => battle.id === state.battleId)
  const configuredAllowedItems =
    state.config?.allowedItems || battleConfig?.allowedItems
  const allowedItems = configuredAllowedItems?.length
    ? new Set(configuredAllowedItems)
    : undefined

  items.forEach((itemDef) => {
    if (
      !itemDef.battleEffect ||
      itemDef.battleEffect.type === 'tera' ||
      itemDef.battleEffect.type === 'z-move'
    ) {
      return
    }
    if (allowedItems && !allowedItems.has(itemDef.id)) return
    if (
      !state.chronicle &&
      !canUseItemWithSkillRequirements(itemDef, user.skills)
    ) {
      return
    }

    const quantity = userInventory[itemDef.id] || 0
    if (quantity > 0) {
      battleInventory.push({
        itemId: itemDef.id,
        name: itemDef.name,
        quantity,
        spriteId: itemDef.spriteId,
        battleEffect: itemDef.battleEffect,
      })
    }
  })

  return { success: true, items: battleInventory }
}
