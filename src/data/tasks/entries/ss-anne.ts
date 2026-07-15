import { Task } from '../../types'

const ssAnneBackground = '/backgrounds/ss-anne.avif'
const surgeIcon = 'gym-kanto-ltsurge'

export const ssAnneTasks: Task[] = [
  {
    id: 'ss-anne-boarding-briefing',
    name: 'Boarding Briefing',
    description: 'Lt. Surge has brought you aboard the stalled S.S. Anne.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: surgeIcon,
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Report In',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Lt. Surge',
        message:
          "Alright kid, here's the situation. The repairs are almost done, but the passengers are bored, cranky, and looking for a battle.",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'Got it',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Lt. Surge',
        message:
          "Keep the Trainers distracted while I finish the repairs. Stay sharp, don't wander off mission, and if anyone asks, this is official Gym Leader business.",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'Move Out',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'ss-anne-bin-chesto',
    name: 'Cabin Bin',
    description: 'Someone left something tucked in a cabin bin.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'chesto-berry',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Search Bin',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'chesto-berry',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: ssAnneBackground,
      title: 'Cabin Bin',
      icon: {
        type: 'item',
        id: 'chesto-berry',
      },
      message: 'You found a Chesto Berry tucked beneath a stack of napkins.',
      closeButtonText: 'Pocket It',
    },
  },
  {
    id: 'ss-anne-bin-cheri',
    name: 'Cabin Bin',
    description: 'A cabin bin has something bright red inside.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'cheri-berry',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Search Bin',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'cheri-berry',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: ssAnneBackground,
      title: 'Cabin Bin',
      icon: {
        type: 'item',
        id: 'cheri-berry',
      },
      message: 'You found a Cheri Berry rolling around in the bin.',
      closeButtonText: 'Pocket It',
    },
  },
  {
    id: 'ss-anne-surge-check-in-1',
    name: 'Surge Check-In',
    description: 'Lt. Surge has an update from the repair crew.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: surgeIcon,
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Check In',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Lt. Surge',
        message:
          "Good work. The cabin deck's calmer already. Bad news, the dining room is getting loud enough to rattle the panels.",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'Dining Room?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Lt. Surge',
        message:
          'Head through the galley and keep them busy. I need a few more minutes down here uninterrupted.',
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'On It',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'ss-anne-bin-great-ball',
    name: 'Galley Bin',
    description: 'There is a sturdy-looking ball in the galley bin.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'great-ball',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Search Bin',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'great-ball',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: ssAnneBackground,
      title: 'Galley Bin',
      icon: {
        type: 'item',
        id: 'great-ball',
      },
      message: 'You found a Great Ball hidden under a clean dish towel.',
      closeButtonText: 'Pocket It',
    },
  },
  {
    id: 'ss-anne-bin-pecha',
    name: 'Galley Bin',
    description: 'A sweet smell is coming from a galley bin.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'pecha-berry',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Search Bin',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'pecha-berry',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: ssAnneBackground,
      title: 'Galley Bin',
      icon: {
        type: 'item',
        id: 'pecha-berry',
      },
      message: 'You found a Pecha Berry wrapped in wax paper.',
      closeButtonText: 'Pocket It',
    },
  },
  {
    id: 'ss-anne-bin-x-attack',
    name: 'Storage Bin',
    description: 'A storage bin has battle supplies inside.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'x-attack',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Search Bin',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'x-attack',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: ssAnneBackground,
      title: 'Storage Bin',
      icon: {
        type: 'item',
        id: 'x-attack',
      },
      message: 'You found an X Attack packed between spare uniforms.',
      closeButtonText: 'Pocket It',
    },
  },
  {
    id: 'ss-anne-bin-stardust',
    name: 'Dining Room Bin',
    description: 'Something sparkles in a dining room bin.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'stardust',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Search Bin',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'stardust',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: ssAnneBackground,
      title: 'Dining Room Bin',
      icon: {
        type: 'item',
        id: 'stardust',
      },
      message: 'You found a pouch of Stardust glittering under a receipt.',
      closeButtonText: 'Pocket It',
    },
  },
  {
    id: 'ss-anne-surge-check-in-2',
    name: 'S.S Anne Repairs. Complete?',
    description: 'Lt. Surge has finished the main repair, but the ship still needs power.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: surgeIcon,
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Check In',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Lt. Surge',
        message:
          "That's the majority of the reapairs are finished. The ship won't move until we get some juice in the old girl",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'What Now?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Lt. Surge',
        message:
          "If you could head up to the top deck and let the Captain know we're almost done, and deal with any Trainers on the way, that would be great.",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'Moving',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'ss-anne-captain-seasick',
    name: 'The Captain',
    description: 'The Captain is grateful, but the S.S. Anne needs some juice!',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Speak to Captain',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'The Captain',
        message:
          'My thanks, Trainer. The passengers can finally start to enjoy the cruise again. I think we almost had a mutiny on our hands!',
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        buttons: [
          {
            text: 'Repairs Are Done',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'The Captain',
        message:
          'Thanks for keeping me updated. Please check on Lt. Surge and see if he needs any help now the Trainers have calmed down.',
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        buttons: [
          {
            text: 'Find Surge',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'ss-anne-power-the-ship',
    name: 'Power the S.S. Anne',
    description: 'The repaired ship needs a powerful bolt from a Pikachu to jumpstart the ship.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '25',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Power Up',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 25,
          formId: '25',
          minLevel: 20,
        },
        label: 'Bring a Level 20 Pikachu to start the power supply',
      },
    ],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Lt. Surge',
        message:
          "There you are. Do you have a Pikachu with you? Mine are worn out from the repair work, and we'll need a steady charge to kick this ship's grid back to life.",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'Ready',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'S.S. Anne',
        message:
          'Pikachu releases a powerful electric bolt, The lights flicker on, and the engines begin to hum.',
        background: ssAnneBackground,
        icon: {
          type: 'pokemon',
          id: '25',
        },
        buttons: [
          {
            text: 'It Worked!',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'ss-anne-captain-thanks',
    name: 'A Captain Thanks You',
    description: 'The Captain wants to thank you before the S.S. Anne departs.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'tm-cut',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Accept Thanks',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'The Captain',
        message:
          'You kept my passengers enertained, helped Lt. Surge finish the repairs, and restarted the S.S. Anne. I would be honored if you accepted this humble gift.',
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        buttons: [
          {
            text: 'HM Cut?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Lt. Surge',
        message:
          "HM Cut. It'll clear small trees, including that shrub outside my Gym. You earned it, kid. That's some SPARK you've got I wouldn't be SHOCKED if I saw you at my gym straight away, but why not explore more of the local area first? You may find it enLIGHTNING... (no wait darn that's not one)",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: surgeIcon,
        },
        buttons: [
          {
            text: 'Take HM Cut',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'ss-anne-evening-cruise-welcome',
    name: 'Evening at the Dock',
    description:
      'The S.S. Anne Captain welcomes returning Trainers aboard while the ship is docked.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'expert-m',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Board',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-repair-duty',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'The Captain',
        message:
          'Welcome back aboard the S.S. Anne. We remain docked in Vermilion for the evening, and the passengers are always glad to meet a capable Trainer.',
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        buttons: [
          {
            text: 'Step Aboard',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'rival-ss-anne-win-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word on the Vermilion dock.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: ssAnneBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-ss-anne',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: ssAnneBackground,
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message: "You handled the ship and still had enough left. I'll see you on the next road.",
      closeButtonText: 'Head Out',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    id: 'rival-ss-anne-loss-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word on the Vermilion dock.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: ssAnneBackground,
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-ss-anne',
        battleStatus: 'loss',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: ssAnneBackground,
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message: 'Long day? Same for me. Rest up before you try that again.',
      closeButtonText: 'Head Out',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    id: 'ss-anne-evening-cruise-farewell',
    name: "Captain's Credit",
    description:
      'The Captain thanks you for entertaining passengers while the S.S. Anne is docked.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'captains-credit',
    },
    background: ssAnneBackground,
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Head Ashore',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-repair-duty',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'The Captain',
        message:
          "Splendid work. The passengers had a fine evening aboard. Here's a little token of thanks from me.",
        background: ssAnneBackground,
        icon: {
          type: 'trainer',
          id: 'expert-m',
        },
        buttons: [
          {
            text: 'Thank You',
            type: 'success',
          },
        ],
      },
    ],
  },
]
