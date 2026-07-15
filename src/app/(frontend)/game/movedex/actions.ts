'use server'

import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { items } from '@/data/items'
import { getRecoverableResearchTmRewards } from '@/utilities/research/research-levels'
import {
  getUserInventoryMap,
  getUserPokedexMap,
  setUserInventoryMap,
} from '@/utilities/user-state'

export async function recoverLostResearchTms(): Promise<{
  success: boolean
  message: string
  recovered: { itemId: string; name: string; quantity: number }[]
}> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return { success: false, message: 'Not authenticated', recovered: [] }
  }

  const [inventory, pokedex] = await Promise.all([
    getUserInventoryMap(payload as any, user.id),
    getUserPokedexMap(payload as any, user.id),
  ])
  const recoverable = getRecoverableResearchTmRewards(pokedex, inventory)

  if (recoverable.length === 0) {
    return {
      success: true,
      message: 'No missing research TMs found.',
      recovered: [],
    }
  }

  const recovered = recoverable.map((reward) => {
    const itemDef = items.find((item) => item.id === reward.itemId)
    inventory[reward.itemId] = Math.max(1, inventory[reward.itemId] || 0, reward.quantity)
    return {
      itemId: reward.itemId,
      name: itemDef?.name || reward.itemId,
      quantity: reward.quantity,
    }
  })

  await setUserInventoryMap(payload as any, user.id, inventory)
  revalidatePath('/game/movedex')
  revalidatePath('/game/inventory')

  return {
    success: true,
    message: `Recovered ${recovered.length} missing TM${recovered.length === 1 ? '' : 's'}.`,
    recovered,
  }
}
