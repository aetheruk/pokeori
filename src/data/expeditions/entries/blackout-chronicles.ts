import type { ExpeditionConfig } from '../types'

export const blackoutChronicleExpeditions: ExpeditionConfig[] = [
  {
    id: 'chronicle-rocket-assassination',
    name: 'Team Rocket: Order to Eliminate',
    description:
      'A recollection of shadow command: from the quiet top of Pokemon Tower to the order issued against an interfering trainer.',
    category: '???',
    subCategory: '???',
    buttonText: 'Recall Memory',
    icon: {
      type: 'trainer',
      id: 'ariana',
    },
    background: '/backgrounds/pkmn-tower.avif',
    maxLosses: 3,
    chronicle: {
      playerName: 'Executive Ariana',
      playerIcon: '/sprites/trainers/special/ariana.avif',
      playerTitle: 'Team Rocket Executive',
      battleTeam: [
        {
          speciesId: 24,
          formId: '24',
          name: 'Arbok',
          level: 38,
          assignedMoves: ['poison-sting', 'wrap', 'bite', 'screech'],
          heldItemId: 'sitrus-berry',
        },
        {
          speciesId: 198,
          formId: '198',
          name: 'Murkrow',
          level: 35,
          assignedMoves: ['drill-peck', 'pursuit', 'wing-attack'],
          heldItemId: 'sitrus-berry',
        },
        {
          speciesId: 45,
          formId: '45',
          name: 'Vileplume',
          level: 36,
          assignedMoves: ['mega-drain', 'acid', 'sleep-powder', 'toxic'],
        },
      ],
      battleItems: {
        'battle-potion': 3,
        'battle-super-potion': 2,
      },
      balls: {
        'poke-ball': 2,
      },
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'golden-glow',
      },
      {
        type: 'expedition_result',
        targetId: 'chronicle-rocket-assassination',
        expeditionStatus: 'completed',
        count: 1,
        inverse: true,
      },
    ],
    activityPool: {
      task: [
        'rocket-chronicle-pokemon-tower-summit',
        'rocket-chronicle-celadon-reports',
        'rocket-chronicle-poison-order',
        'rocket-chronicle-saffron-ambush-set',
      ],
      battle: ['rocket-chronicle-ambush-drill'],
    },
    path: [
      {
        type: 'activity',
        id: 'rocket-chronicle-step-1-tower-summit',
        activityType: 'task',
        activityId: 'rocket-chronicle-pokemon-tower-summit',
        secret: true,
      },
      {
        type: 'activity',
        id: 'rocket-chronicle-step-2-celadon-reports',
        activityType: 'task',
        activityId: 'rocket-chronicle-celadon-reports',
        secret: true,
      },
      {
        type: 'activity',
        id: 'rocket-chronicle-step-3-poison-order',
        activityType: 'task',
        activityId: 'rocket-chronicle-poison-order',
        secret: true,
      },
      {
        type: 'activity',
        id: 'rocket-chronicle-step-4-ambush-drill',
        activityType: 'battle',
        activityId: 'rocket-chronicle-ambush-drill',
        secret: true,
      },
      {
        type: 'activity',
        id: 'rocket-chronicle-step-5-ambush-set',
        activityType: 'task',
        activityId: 'rocket-chronicle-saffron-ambush-set',
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
        dropChance: 100,
      },
    ],
  },
  {
    id: 'chronicle-ray-choo-pursuit',
    name: "Detective Choo: The Saffron Pursuit",
    description:
      'Follow Detective Ray Choo as he races toward Saffron City with his Arcanine, only to be struck down alongside {trainer}.',
    category: '???',
    subCategory: '???',
    buttonText: 'Recall Memory',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/saffron.avif',
    maxLosses: 3,
    chronicle: {
      playerName: 'Detective Ray Choo',
      playerIcon: '/sprites/trainers/special/detective.avif',
      playerTitle: 'Private Investigator',
      battleTeam: [
        {
          speciesId: 59,
          formId: '59',
          name: 'Arcanine',
          level: 46,
          assignedMoves: ['flamethrower', 'bite', 'take-down', 'roar'],
          heldItemId: 'sitrus-berry',
        },
        {
          speciesId: 164,
          formId: '164',
          name: 'Noctowl',
          level: 42,
          assignedMoves: ['hypnosis', 'confusion', 'air-slash'],
          heldItemId: 'sitrus-berry',
        },
      ],
      battleItems: {
        'battle-potion': 3,
        'battle-super-potion': 2,
      },
      balls: {
        'poke-ball': 2,
      },
    },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'golden-glow',
      },
      {
        type: 'expedition_result',
        targetId: 'chronicle-ray-choo-pursuit',
        expeditionStatus: 'completed',
        count: 1,
        inverse: true,
      },
    ],
    activityPool: {
      task: [
        'choo-chronicle-departing-celadon',
        'choo-chronicle-approaching-saffron',
        'choo-chronicle-breaching-saffron',
        'choo-chronicle-witnessing-the-strike',
      ],
      battle: ['choo-chronicle-gate-grunt-battle'],
    },
    path: [
      {
        type: 'activity',
        id: 'choo-chronicle-step-1-departing-celadon',
        activityType: 'task',
        activityId: 'choo-chronicle-departing-celadon',
        secret: true,
      },
      {
        type: 'activity',
        id: 'choo-chronicle-step-2-approaching-saffron',
        activityType: 'task',
        activityId: 'choo-chronicle-approaching-saffron',
        secret: true,
      },
      {
        type: 'activity',
        id: 'choo-chronicle-step-3-gate-battle',
        activityType: 'battle',
        activityId: 'choo-chronicle-gate-grunt-battle',
        secret: true,
      },
      {
        type: 'activity',
        id: 'choo-chronicle-step-4-breaching-saffron',
        activityType: 'task',
        activityId: 'choo-chronicle-breaching-saffron',
        secret: true,
      },
      {
        type: 'activity',
        id: 'choo-chronicle-step-5-witnessing-strike',
        activityType: 'task',
        activityId: 'choo-chronicle-witnessing-the-strike',
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
        dropChance: 100,
      },
    ],
  },
]
