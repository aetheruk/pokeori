import { Task } from '../../types'

const undergroundBackground = '/backgrounds/underground.avif'

export const kantoUndergroundTasks: Task[] = [
  {
    id: 'kanto-underground-deep-deep-underground',
    name: 'Deep, Deep Underground',
    description:
      'The hidden passage keeps descending much farther than any sensible passage should.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Start Descending',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'digletts-cave-secret-knock',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Underground',
        message:
          '“This way. It isn’t far,” says the male Maniac. The passage immediately drops into a steep stairway carved through the rock.',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'Head Down',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Deep Underground',
        message:
          'After several flights of stairs, two ladders, and a rattling lift, a painted sign reads: DEEP UNDERGROUND. The woman walks straight past it. “We’re not there yet.”',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-f',
        },
        buttons: [
          {
            text: 'Keep Descending',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Deep, Deep Underground',
        message:
          'A much older sign reads: DEEP, DEEP UNDERGROUND. Far below it, somebody has added another arrow and the words YES, STILL UNDERGROUND.',
        background: undergroundBackground,
        icon: {
          type: 'local',
          id: '/sprites/sign.avif',
        },
        buttons: [
          {
            text: 'Follow the Arrow',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        title: 'Kanto Underground',
        message:
          'At last, the tunnel opens into a bright cavern filled with card tables, binders, trading, and cheerful conversation. “Here we are,” says the male Maniac, as though the journey took five minutes.',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'Enter the Gathering',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'Deep, Deep Underground',
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-f',
      },
      message:
        'The collectors welcome you without asking your name. Beyond the card tables, a simple railing surrounds a perfectly black opening in the cavern floor.',
      closeButtonText: 'Approach the Gathering',
    },
  },
  {
    id: 'kanto-underground-somehow-deeper',
    name: 'Somehow, Deeper',
    description:
      'The deepest gathering place has been built around something deeper still.',
    category: 'Underground',
    subCategory: 'Kanto Underground',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-f',
    },
    background: undergroundBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Approach the Pit',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'kanto-underground-deep-deep-underground',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'card',
        quantity: 1,
        dropChance: 100,
        cardDrawParams: {
          allowedCardIds: ['basep-38'],
          guaranteed: true,
        },
      },
      {
        type: 'pokemon_research_xp',
        targetId: '201-j',
        quantity: 1,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Somehow, Deeper',
        message:
          'The woman leads you to the railing. The pit below is wider than a house and so deep that torchlight disappears without touching anything. “And this is the pit,” she says brightly.',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-f',
        },
        buttons: [
          {
            text: 'Look Into the Pit',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'The Pit',
        message: 'MORE CRYSTALS. BRING THEM.',
        background: undergroundBackground,
        buttons: [
          {
            text: 'Listen',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'The Pit',
        message: 'TRADING WITH OTHER TRAINERS IS MUCH FASTER THAN GATHERING THEM YOURSELF. CONTINUE.',
        background: undergroundBackground,
        buttons: [
          {
            text: 'Turn to the Collectors',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        title: 'Underground Collectors',
        message:
          '“Exactly,” says the male Maniac. “The pit wants more crystals, so we trade with other trainers. It’s much faster than gathering them yourself.” Nobody nearby looks surprised or concerned. The woman smiles and opens your binder. “Right then. Let’s make this official.”',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'Join the Collectors',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: undergroundBackground,
      title: 'J Is for Join',
      icon: {
        type: 'pokemon',
        id: '201-j',
      },
      message:
        'The woman slides Promo No. 38, Unown [J], into the first empty sleeve. “J is for Join. Everyone starts somewhere.” Behind her, the gathering carries on as if a bottomless talking pit were the most ordinary thing in Kanto.',
      closeButtonText: 'Take the Card',
    },
  },
]
