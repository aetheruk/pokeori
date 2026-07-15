import { Task } from '../../types'
import {
  BOOK_OF_CHANNELING_ITEM_ID,
  DEV_CHANNELING_MEMENTO_ITEM_ID,
} from '@/data/spirit-channeling'

export const testTasks: Task[] = [
  {
    id: 'test-spirit-channeling-supplies',
    name: 'Spirit Channeling Supplies Test',
    description: 'A quick test task that grants the basic channeling key items.',
    category: 'Kanto',
    subCategory: 'Test',
    icon: {
      type: 'item',
      id: BOOK_OF_CHANNELING_ITEM_ID,
    },
    background: '/backgrounds/lab.avif',
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Take Supplies',
    requirements: [],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: BOOK_OF_CHANNELING_ITEM_ID,
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: DEV_CHANNELING_MEMENTO_ITEM_ID,
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'incense-dev',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Channeling Supplies',
      icon: {
        type: 'item',
        id: BOOK_OF_CHANNELING_ITEM_ID,
      },
      message: 'Book of Channeling, Dev Memento, and Dev Incense added for testing.',
      closeButtonText: 'Done',
    },
  },
]
