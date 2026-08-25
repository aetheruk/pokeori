import { Task } from '../../types'

const JUNGLE_SET_ID = 'base2'
const JUNGLE_SET_UNIQUE_CARD_COUNT = 64

export const viridianForestTasks: Task[] = [
  {
    name: 'The Bug Maniac!',
    description: 'You found a strange man obsessed with bugs...',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-maniac',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Talk to Maniac',
    requirements: [],
    criteria: [],
    rewards: [],
    id: 'bug-maniac-discovery',
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'The Bug Maniac',
      message: 'You got Bugs I need BUUUUGS! Ill make it worth your while!',
      closeButtonText: 'Hear Him Out',
      icon: {
        type: 'trainer',
        id: 'bug-maniac',
      },
    },
  },
  {
    id: 'evolution-catalyst-tutorial',
    name: 'A Little Help Growing',
    description:
      'Benny has more to say about the strange crystal he found beneath the forest canopy.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Listen to Benny',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'evolution-catalyst',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'A Little Help Growing',
        message:
          'Benny keeps glancing at the bright crystal in your pack. “Funny thing about bugs,” he says. “They spend ages looking like they’re doing nothing, then one day they split their old skin and come out completely different.”',
        background: '/backgrounds/forest.avif',
        icon: {
          type: 'trainer',
          id: 'bug-catcher',
        },
        buttons: [
          {
            text: 'Go On',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'A Little Help Growing',
        message:
          '“Some Pokémon hit that moment and need a bit of help finding the next shape of themselves. That crystal doesn’t do the growing for them. It just gives the change somewhere steady to begin.”',
        background: '/backgrounds/forest.avif',
        icon: {
          type: 'trainer',
          id: 'bug-catcher',
        },
        buttons: [
          {
            text: 'And Then?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'A Little Help Growing',
        message:
          '“Use it when the moment comes, and don’t expect to see it again afterwards. The little one spends the whole crystal in the change. If you ever meet a Pokémon that’s grown much further, there are stronger pieces out there too.”',
        background: '/backgrounds/forest.avif',
        icon: {
          type: 'trainer',
          id: 'bug-catcher',
        },
        buttons: [
          {
            text: 'I’ll Remember',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'A Little Help Growing',
      message:
        'Benny nods toward the path out of the forest. “That’s all it is. A steady place for a big change to start.”',
      closeButtonText: 'Thanks, Benny',
      icon: {
        type: 'trainer',
        id: 'bug-catcher',
      },
    },
  },
  {
    id: 'evolution-catalyst-handoff',
    name: 'Benny’s Spare Find',
    description:
      'Benny kept one last strange crystal aside for anyone who left the forest before he could explain it.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Take the Crystal',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'binder-base2',
      },
      {
        type: 'item_owned',
        targetId: 'evolution-catalyst',
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'evolution-catalyst-recipe',
        inverse: true,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'evolution-catalyst',
        quantity: 1,
      },
      {
        type: 'task_complete',
        targetId: 'evolution-catalyst-recipe',
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Benny’s Spare Find',
      message:
        '“You made it out with the binder, but I never got to show you this.” Benny places the bright crystal in your hand. “Keep it for one of those big changes. It’s better than letting it sit under a leaf forever.”',
      closeButtonText: 'Thank Benny',
      icon: {
        type: 'trainer',
        id: 'bug-catcher',
      },
    },
  },
  {
    name: 'Bugs for the Bug God I',
    description: 'Wow, this guy is intense. He wants five Bug Pokemon for some kind of collection.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-maniac',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Bugs',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bug-maniac-discovery',
      },
      {
        type: 'any_of',
        conditions: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
            inverse: true,
          },
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
            inverse: true,
          },
        ],
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        pokemonCriteria: {
          type: 'bug',
        },
        count: 5,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'bug-gem',
        quantity: 5,
      },
      {
        type: 'item',
        targetId: 'chitin-fragment-t1',
        quantity: 5,
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Bug Maniac',
      message: 'YESSS!!! The swarm grows. Take these. Then bring me more bugs!',
      closeButtonText: 'Take Materials',
      icon: {
        type: 'trainer',
        id: 'bug-maniac',
      },
    },
    id: 'bug-maniac-trade-1',
  },
  {
    name: 'Bugs for the Bug God II',
    description: 'The Bug Maniac is not satisfied. This time he wants ten Bug Pokemon.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-maniac',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Bugs',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bug-maniac-trade-1',
      },
      {
        type: 'any_of',
        conditions: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
            inverse: true,
          },
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
            inverse: true,
          },
        ],
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        pokemonCriteria: {
          type: 'bug',
        },
        count: 10,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'bug-gem',
        quantity: 10,
      },
      {
        type: 'item',
        targetId: 'chitin-fragment-t1',
        quantity: 10,
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Bug Maniac',
      message: 'Better. Much better. But the Bug God demands a true offering.',
      closeButtonText: 'Take Materials',
      icon: {
        type: 'trainer',
        id: 'bug-maniac',
      },
    },
    id: 'bug-maniac-trade-2',
  },
  {
    name: 'Bugs for the Bug God III',
    description:
      'The Bug Maniac has one final request: twenty Bug Pokemon. He says the reward is worth it.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-maniac',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Complete the Offering',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bug-maniac-trade-2',
      },
      {
        type: 'any_of',
        conditions: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
            inverse: true,
          },
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
            inverse: true,
          },
        ],
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        pokemonCriteria: {
          type: 'bug',
        },
        count: 20,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'net-ball-manual',
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Bug Maniac',
      message:
        'THE BUG GOD IS PLEASED! Take this manual. Net Balls are the only proper way to honour the swarm.',
      closeButtonText: 'Take Manual',
      icon: {
        type: 'trainer',
        id: 'bug-maniac',
      },
    },
    id: 'bug-maniac-trade-3',
  },
  {
    name: 'The Buggy 4 Found!',
    description: 'You stumbled upon the training grounds of The Buggy 4!',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Inspect Grounds',
    requirements: [],
    criteria: [],
    rewards: [],
    id: 'buggy-4-discovery',
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'The Buggy 4',
      message:
        'You look lost! If you can defeat us, the Buggy 4, we will show you the way out of Viridian Forest.',
      closeButtonText: 'Face the Buggy 4',
      icon: {
        type: 'trainer',
        id: 'bug-catcher',
      },
    },
  },
  {
    id: 'task-photo-exchange',
    name: 'Pics for Benny',
    description:
      'Bug Catcher Benny is looking for high quality photos of Bug Pokémon found in the forest.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    repeatable: true,
    requirements: [
      {
        type: 'item_owned',
        targetId: 'binder-base2',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'quality-forest-photo',
        count: 3,
        consume: true,
      },
      {
        type: 'currency_owned',
        targetId: 'crystals',
        count: 10,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-base2',
        quantity: 1,
        requirements: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
            inverse: true,
          },
        ],
      },
      {
        type: 'item',
        targetId: 'net-ball',
        quantity: 1,
        requirements: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
          },
        ],
      },
      {
        type: 'currency',
        quantity: 65,
        targetId: 'pokedollars',
      },
    ],
    completeButtonText: 'Exchange Photos',
    background: '/backgrounds/forest.avif',
  },
  {
    id: 'bug-god-tiny-armour',
    name: 'Armour for the Swarm',
    description:
      'The Bug Maniac says the swarm needs tiny armour. He is being very serious about the tiny part.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-maniac',
    },
    background: '/backgrounds/forest.avif',
    repeatable: true,
    completionTrigger: 'manual',
    completeButtonText: 'Arm the Swarm',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bug-maniac-trade-3',
      },
      {
        type: 'item_owned',
        targetId: 'binder-base2',
      },
      {
        type: 'any_of',
        conditions: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
            inverse: true,
          },
          {
            type: 'task_completed',
            targetId: 'bug-god-tiny-armour',
            inverse: true,
          },
        ],
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'tiny-bug-armour',
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-base2',
        quantity: 1,
        requirements: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
            inverse: true,
          },
        ],
      },
      {
        type: 'item',
        targetId: 'chitin-fragment-t1',
        quantity: 2,
        requirements: [
          {
            type: 'card_collected_set',
            targetId: JUNGLE_SET_ID,
            count: JUNGLE_SET_UNIQUE_CARD_COUNT,
            unique: true,
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Bug Maniac',
      message:
        'YES. YES! Look at them. Armoured. Magnificent. Terrifying. The Bug God nods. Probably. Take this.',
      closeButtonText: 'Take Reward',
      icon: {
        type: 'trainer',
        id: 'bug-maniac',
      },
    },
  },
  {
    id: 'bug-out',
    name: 'Bug Out',
    description: 'The Weird Bug guy is muttering to himself.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-maniac',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Listen In',
    requirements: [
      {
        type: 'card_collected_set',
        targetId: JUNGLE_SET_ID,
        count: JUNGLE_SET_UNIQUE_CARD_COUNT,
        unique: true,
      },
      {
        type: 'task_completed',
        targetId: 'bug-god-tiny-armour',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Bug Maniac',
      message: 'Hahaha The Swarm is ready... Later {Trainer} Perhaps we will meet again.',
      closeButtonText: 'Later',
      icon: {
        type: 'trainer',
        id: 'bug-maniac',
      },
    },
  },
  {
    id: 'viridian-exit',
    name: 'A Way Out',
    description: 'As promised, The Buggy 4 have showed me to the exit, Next stop, Pewter City!',
    category: 'Kanto',
    repeatable: false,
    subCategory: 'Viridian Forest',
    chat: true,
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    requirements: [
      {
        type: 'item_owned',
        targetId: 'binder-base2',
      },
    ],
    criteria: [],
    rewards: [],
    completeButtonText: 'Onward!',
    background: '/backgrounds/forest.avif',
  },
  {
    id: 'bulbasaur-2',
    name: 'The Secret Spot',
    description:
      'The Picknicker told me she was with her Pikachu researching Pokemon when it ran off and found the secret picnic spot.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '25',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bulbasaur-1',
      },
    ],
    criteria: [
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 25,
          formId: '25',
        },
        secret: true,
      },
      {
        type: 'research_level',
        count: 1,
        targetId: '13',
        secret: true,
      },
      {
        type: 'research_level',
        count: 1,
        targetId: '10',
        secret: true,
      },
      {
        type: 'research_level',
        count: 1,
        targetId: '11',
        secret: true,
      },
      {
        type: 'research_level',
        count: 1,
        targetId: '14',
        secret: true,
      },
      {
        type: 'research_level',
        count: 2,
        targetId: '25',
        secret: true,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Secret Garden',
      message:
        "Pikachu Ran off chasing a Pokemon I couldn't make out deep into Viridian Forest. Following it I found a beautiful garden bathed in morning light.",
      closeButtonText: 'Enter Garden',
      icon: {
        type: 'pokemon',
        id: '1',
      },
    },
    completeButtonText: 'Wait, Pikachu!',
  },
  {
    id: 'secret-garden-trust',
    name: 'Garden Trust',
    description: 'The Bulbasaur in the secret garden have stopped treating me like a stranger',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '1',
    },
    background: '/backgrounds/forest.avif',
    repeatable: false,
    secret: false,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bulbasaur-2',
      },
      {
        type: 'location_encounter_result',
        targetId: 'viridian-secret-garden',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [],
    completeButtonText: 'Visit the Garden',
    exitModal: {
      background: '/backgrounds/forest.avif',
      title: 'Garden Trust',
      message:
        'The Bulbasaur no longer slip away when the morning light fades. The garden feels less like a secret now and more like somewhere you have been invited back to.',
      closeButtonText: 'Return Anytime',
      icon: {
        type: 'pokemon',
        id: '1',
      },
    },
  },
]
