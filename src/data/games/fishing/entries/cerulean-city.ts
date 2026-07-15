import { FishingGameConfig } from '../types'

export const ceruleanCityFishing: FishingGameConfig[] = [
  {
    id: 'cerulean-gym-pool',
    name: 'Cerulean Gym',
    description: "Misty's gym pool is surprisingly full of lost things.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/gym-water.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mistys-lost-earrings',
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'bill-old-rod',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'old-rod',
      },
    ],
    rewards: [],
    gameType: 'fishing',
    settings: {
      sky: '/games/run/backgrounds/sky.avif',
      scene: {
        portraitBackground: '/backgrounds/fishing-gym-pool-portrait.avif',
        waterStyle: 'pool',
        waterline: { portrait: 48 },
      },
      waterAnimationSpeed: 1.4,
      rods: {
        old: {
          levelRange: { min: 5, max: 10 },
          shinyChanceModifier: 1,
          catchRateModifier: 15,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 129,
                formId: '129',
                weight: 70,
                symbol: '!',
                reactionTime: 900,
                appearTime: { min: 1600, max: 4200 },
              },
              {
                speciesId: 60,
                formId: '60',
                weight: 30,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1600, max: 4200 },
              },
            ],
          },
          items: {
            entries: [
              {
                itemId: 'mistys-earrings',
                weight: 100,
                symbol: '!!!',
                reactionTime: 750,
                appearTime: { min: 2200, max: 5200 },
              },
            ],
          },
        },
      },
    },
  },
  {
    id: 'cerulean-gym-pool-daily',
    name: 'Cerulean Gym',
    description: 'Misty lets trusted trainers fish useful scales out of the gym pool.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/gym-water.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'old-rod',
      },
    ],
    rewards: [],
    gameType: 'fishing',
    settings: {
      sky: '/games/run/backgrounds/sky.avif',
      scene: {
        portraitBackground: '/backgrounds/fishing-gym-pool-portrait.avif',
        waterStyle: 'pool',
        waterline: { portrait: 48 },
      },
      waterAnimationSpeed: 1.4,
      rods: {
        old: {
          levelRange: { min: 8, max: 14 },
          shinyChanceModifier: 1,
          catchRateModifier: 10,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 129,
                formId: '129',
                weight: 50,
                symbol: '!',
                reactionTime: 850,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 60,
                formId: '60',
                weight: 35,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 118,
                formId: '118',
                weight: 15,
                symbol: '!',
                reactionTime: 750,
                appearTime: { min: 1500, max: 4000 },
              },
            ],
          },
          items: {
            entries: [
              {
                itemId: 'cerulean-pool-scale',
                weight: 100,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1500, max: 4000 },
              },
            ],
          },
        },
      },
    },
  },
]
