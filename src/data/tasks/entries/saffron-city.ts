import { Task } from '../../types'

export const saffronCityTasks: Task[] = [
  {
    id: 'saffron-gym-ambush',
    name: 'Reaching Sabrina',
    description:
      'There sure is a lot of Rocket about in this town fortunately the Gym was easy to find.',
    category: 'Kanto',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'a-stone-for-a-friend',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 250,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Ahead of Choo',
        message: "Choo will be right behind me, I'll go on ahead.",
        background: '/backgrounds/saffron.avif',
        icon: {
          type: 'trainer',
          id: 'rocket',
        },
        buttons: [
          {
            type: 'success',
            text: 'Go Ahead',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/saffron.avif',
      title: 'Sabrina?',
      icon: {
        type: 'trainer',
        id: 'rocket',
      },
      message: 'Hello is anyo.........',
      closeButtonText: '....',
    },
  },
  // Hidden story trigger: completed silently by the blackout glow mechanic.
  {
    id: 'struggle',
    name: 'Struggle',
    description: 'A faint struggle against the dark.',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'lucide',
      id: 'HelpCircle',
    },
    background: '/backgrounds/twisted-dimension.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'saffron-gym-ambush',
      },
    ],
    criteria: [],
    rewards: [],
  },
  // Placeholder repeatable task unlocked by Struggle; content not authored yet.
  {
    id: 'a-golden-glow',
    name: 'A Golden Glow',
    description: '???',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'local',
      id: '/sprites/items/egg.avif',
    },
    background: '/backgrounds/twisted-dimension.avif',
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'struggle',
      },
      {
        type: 'task_completed',
        targetId: 'saffron-gym-ambush',
      },
    ],
    criteria: [],
    rewards: [],
  },
]
