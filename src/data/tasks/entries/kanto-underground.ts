import { Task } from '../../types'

const undergroundBackground = '/backgrounds/kanto-underground.avif'

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
        title: 'Mina',
        message:
          'Beyond the hidden door, the passage immediately drops into a steep stairway carved through the rock. Mina starts down without checking whether either of you is following. “Mind the first seven hundred steps. They can be slippery.”',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-f',
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
          'After several flights of stairs, two ladders, and a rattling lift, a painted sign reads: DEEP UNDERGROUND. Gideon pauses beside it proudly. Mina walks straight past. “That is the visitor level. We are not visiting.”',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
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
          'A much older sign eventually reads: DEEP, DEEP UNDERGROUND. Someone has pinned a smaller notice beneath it: HEAD OFFICE: THIS WAY. Below that, in different handwriting: YES, STILL UNDERGROUND.',
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
          'At last, the tunnel opens into a vast, warmly lit cavern filled with card presses, packing tables, towering binders, and hundreds of cheerful collectors. “Here we are!” Mina announces, as though the journey took five minutes.',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'This is enormous',
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
        'Nobody asks who you are. Several collectors congratulate Gideon on finding you, one hands you a blank membership form, and another asks whether you brought crystals. Beyond the busy tables, a simple railing surrounds a perfectly black opening in the cavern floor.',
      closeButtonText: 'Approach the Gathering',
    },
  },
  {
    id: 'kanto-underground-somehow-deeper',
    name: 'Somehow, Deeper',
    description: 'The deepest gathering place has been built around something deeper still.',
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
    ],
    enterModal: [
      {
        id: 1,
        title: 'Mina',
        message:
          'Mina leads you to the railing. The opening below is wider than a house and so deep that its torchlight disappears without touching anything. “And this is the pit,” she says brightly. A collector beside her checks a clipboard.',
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
        message: 'MORE CRYSTALS.',
        background: undergroundBackground,
        buttons: [
          {
            text: 'Step Back',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Mina',
        message:
          '“It does that,” Mina explains. “The pit wants crystals. Trainers find crystals. Trainers also like Pokemon. So we print Pokemon on cards and encourage the trainers to bring their crystals to us.” Nobody nearby looks surprised or concerned.',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-f',
        },
        buttons: [
          {
            text: 'You invented the TCG?',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        title: 'Gideon',
        message:
          '“Invented, distributed, promoted, and tastefully monetised,” Gideon says. “Gathering crystals ourselves was slow. Making the entire world want our cards is much more efficient.” Behind him, a worker tips a barrow of crystals into the darkness.',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-m',
        },
        buttons: [
          {
            text: 'And nobody questions this?',
            type: 'navigate',
            id: 5,
          },
        ],
      },
      {
        id: 5,
        title: 'Mina',
        message:
          'Mina opens your Promo binder to the first empty sleeve. “Questions are covered after Basic Training. Mostly by Basic Training. Right then. Let’s make this official.”',
        background: undergroundBackground,
        icon: {
          type: 'trainer',
          id: 'tcg-maniac-f',
        },
        buttons: [
          {
            text: 'Apparently I work here',
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
        'Mina slides Promo No. 38, Unown [J], into the first empty sleeve. “J is for Join. Or Journey. The filing cabinet says Join.” Behind her, the enormous organization carries on feeding crystals to the talking hole in the ground.',
      closeButtonText: 'Take the Card',
    },
  },
]
