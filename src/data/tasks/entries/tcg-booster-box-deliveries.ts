import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { Task } from '../../types'

export const TCG_BOOSTER_BOX_PACK_COUNT = 36
export const TCG_BOOSTER_BOX_REWARD = 8000

/**
 * Every authored TCG set gets the same wholesale delivery loop. Requirements
 * keep the task out of Explore until the player has a completed binder and a
 * full box of that set ready to ship; the criterion performs the pack
 * consumption when the task is completed.
 */
export const tcgBoosterBoxDeliveryTasks: Task[] = tcgSetSummaries.map((set) => ({
  id: `tcg-booster-box-delivery-${set.id}`,
  name: `${set.name} Booster Box Delivery`,
  description: `Deliver 36 ${set.name} Booster Packs to HQ for distribution.`,
  category: 'Underground',
  subCategory: 'Kanto Underground',
  icon: { type: 'item', id: `pack-${set.id}` },
  background: '/backgrounds/kanto-underground.avif',
  repeatable: true,
  secret: false,
  completionTrigger: 'manual',
  completeButtonText: 'Deliver Booster Box',
  requirements: [
    {
      type: 'task_completed',
      targetId: 'underground-tcg-my-very-own-set',
    },
    {
      type: 'item_owned',
      targetId: `binder-${set.id}`,
    },
    {
      type: 'card_collected_set',
      targetId: set.id,
      count: set.total,
      unique: true,
    },
    {
      type: 'item_owned',
      targetId: `pack-${set.id}`,
      count: TCG_BOOSTER_BOX_PACK_COUNT,
    },
  ],
  criteria: [
    {
      type: 'item_owned',
      targetId: `pack-${set.id}`,
      count: TCG_BOOSTER_BOX_PACK_COUNT,
      consume: true,
    },
  ],
  rewards: [
    {
      type: 'currency',
      targetId: 'pokedollars',
      quantity: TCG_BOOSTER_BOX_REWARD,
    },
  ],
}))
