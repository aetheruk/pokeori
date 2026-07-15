import { Task } from '../../types'

const diglettsCaveUnlockRequirement = {
  type: 'task_completed' as const,
  targetId: 'vermilion-rumours',
}

export const diglettsCaveTasks: Task[] = [
  {
    id: 'digletts-cave-rubber-mallet',
    name: 'No Way!!!',
    description: "I can't believe my luck!",
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'item',
      id: 'rubber-mallet',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Inspect Mallet',
    requirements: [
      diglettsCaveUnlockRequirement,
      {
        type: 'item_owned',
        targetId: 'rubber-mallet',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'No Way!!!',
      icon: {
        type: 'item',
        id: 'rubber-mallet',
      },
      message:
        "I can't believe someone casually left a giant rubber mallet in this cave. How fortuitous!",
      closeButtonText: 'Fortuitous!',
    },
  },
]
