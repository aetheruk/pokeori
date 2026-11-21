import type { Task } from '../../types'
import { FORTUNE_CHANNELING_CONTENT } from '@/data/spirit-channeling-public'

export const fortuneExchangeTasks: Task[] = FORTUNE_CHANNELING_CONTENT.map(
  (ritual) => ({
    id: ritual.taskId,
    name: ritual.taskName,
    description: ritual.taskDescription,
    category: 'Kanto',
    subCategory: ritual.subCategory,
    icon: { type: 'trainer', id: ritual.trainerIconId },
    background: ritual.background,
    repeatable: true,
    secret: false,
    criteriaGateVisibility: true,
    completionTrigger: 'manual',
    completeButtonText: 'Exchange Item',
    requirements: [
      {
        type: 'item_owned',
        targetId: ritual.mementoItemId,
        count: 1,
        consume: true,
      },
    ],
    criteria: [{ type: 'item_owned', targetId: ritual.bookItemId }],
    rewards: [
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: ritual.payout,
        dropChance: 100,
      },
    ],
    exitModal: {
      title: ritual.exitTitle,
      icon: { type: 'trainer', id: ritual.trainerIconId },
      background: ritual.background,
      message: ritual.exitMessage,
      closeButtonText: ritual.closeButtonText,
    },
  }),
)
