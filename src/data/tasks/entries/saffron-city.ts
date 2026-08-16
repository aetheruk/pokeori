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
    background: '/backgrounds/cosmos.avif',
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
  // Unlocked by Struggle; id was changed after earlier test completions.
  {
    id: 'golden-glow',
    name: 'A Golden Glow',
    description: '???',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'local',
      id: '/sprites/items/egg.avif',
    },
    background: '/backgrounds/cosmos-gold.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: '…',
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
    enterModal: [
      {
        id: 1,
        title: '…',
        message: 'Well now, Quite the spirit in you {Trainer}',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: '…',
        message:
          "I'm afraid though it's not your day at all, No no no my child in fact The long and short of it is well… you have ended up rather, how can I put this lightly. Dead.",
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: '…',
        message: 'Perhaps it is for the best though.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        title: '…',
        message:
          'Hmm not particularly chatty are we. Then again I suppose it is difficult getting used to the lack of form or matter.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 5,
          },
        ],
      },
      {
        id: 5,
        title: '…',
        message: 'Focus {Trainer}.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 6,
          },
        ],
      },
      {
        id: 6,
        title: '…',
        message: 'First do you remember how you came to be here?',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: 'No',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/cosmos-gold.avif',
      title: '…',
      icon: {
        type: 'local',
        id: '/sprites/items/egg.avif',
      },
      message: 'Impressive I felt that. Please allow me to me show you.',
      closeButtonText: '…',
    },
  },
]
