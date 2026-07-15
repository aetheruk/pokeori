'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import {
  getMaxResearchLevelForXp,
  getPokemonResearchLevelItemRewards,
  getResearchXpForLevel,
} from '@/utilities/research/research-levels'
import { items } from '@/data/items'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  setUserInventoryMap,
  setUserPokedexMap,
} from '@/utilities/user-state'

export async function levelUpResearch(formId: string) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: authUser } = await payload.auth({ headers: headersList })
  if (!authUser) throw new Error('Unauthorized')

  // Find the pokedex entry for this form
  const pokedex = await getUserPokedexMap(payload as any, authUser.id)

  // Search all species for this formId
  let speciesKey: string | null = null
  let formEntry: any = null
  for (const [sid, species] of Object.entries(pokedex)) {
    if (species[formId]) {
      speciesKey = sid
      formEntry = species[formId]
      break
    }
  }

  if (!speciesKey || !formEntry) {
    return { success: false, message: 'Pokemon not found in Pokedex' }
  }

  const currentXp = formEntry.researchXp || 0
  const currentLevel = formEntry.researchLevel || 0

  // Check if player has enough XP for the next level
  const maxAchievableLevel = getMaxResearchLevelForXp(currentXp)

  if (maxAchievableLevel <= currentLevel) {
    const nextThreshold = getResearchXpForLevel(currentLevel + 1)
    return {
      success: false,
      message: `Not enough Research XP. Need ${nextThreshold} XP (currently ${currentXp}).`,
    }
  }

  // Level up one level at a time
  const newLevel = currentLevel + 1

  // Update pokedex entry
  pokedex[speciesKey][formId] = {
    ...formEntry,
    researchLevel: newLevel,
  }

  await setUserPokedexMap(payload as any, authUser.id, pokedex)

  const levelRewards = getPokemonResearchLevelItemRewards(
    formId,
    currentLevel,
    newLevel,
  )
  const grantedItems: { id: string; name: string; quantity: number }[] = []

  if (levelRewards.length > 0) {
    const inventory = await getUserInventoryMap(payload as any, authUser.id)
    let inventoryChanged = false

    for (const reward of levelRewards) {
      if (reward.type !== 'item' || !reward.targetId) continue

      const itemId = reward.targetId.toString()
      const quantity =
        typeof reward.quantity === 'number' ? reward.quantity : 1
      const itemDef = items.find((item) => item.id === itemId)

      if (itemDef?.unique && (inventory[itemId] || 0) > 0) continue

      inventory[itemId] = (inventory[itemId] || 0) + quantity
      inventoryChanged = true
      grantedItems.push({
        id: itemId,
        name: itemDef?.name || itemId,
        quantity,
      })
    }

    if (inventoryChanged) {
      await setUserInventoryMap(payload as any, authUser.id, inventory)
    }
  }

  revalidatePath('/game/pokedex')
  if (grantedItems.length > 0) {
    revalidatePath('/game/inventory')
  }
  return {
    success: true,
    newLevel,
    skillXpGranted: 0,
    items: grantedItems,
    message: `Research Level ${newLevel} achieved!`,
  }
}
