import { FishingGameConfig } from '../types'

export const fuchsiaCityFishing: FishingGameConfig[] = [
  {
    id: 'route-13-fishing',
    name: 'Route 13',
    description: 'Fish the water alongside the long east-west stretch of road.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    background: '/backgrounds/grassy-route.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'on-to-fuchsia-city',
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
        portraitBackground: '/backgrounds/fishing-rocky-lake-portrait.avif',
        waterStyle: 'rocky-lake',
        waterline: { portrait: 55 },
      },
      waterAnimationSpeed: 1.25,
      rods: {
        old: {
          levelRange: { min: 5, max: 5 },
          shinyChanceModifier: 1,
          catchRateModifier: 5,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 129,
                formId: '129',
                weight: 100,
                symbol: '!',
                reactionTime: 900,
                appearTime: { min: 1900, max: 5000 },
              },
            ],
          },
        },
        good: {
          levelRange: { min: 5, max: 15 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 116,
                formId: '116',
                weight: 60,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1700, max: 4500 },
              },
              {
                speciesId: 98,
                formId: '98',
                weight: 20,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1700, max: 4500 },
              },
              {
                speciesId: 129,
                formId: '129',
                weight: 20,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1700, max: 4500 },
              },
            ],
          },
        },
        super: {
          levelRange: { min: 15, max: 35 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 116,
                formId: '116',
                weight: 84,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 130,
                formId: '130',
                weight: 15,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 54,
                formId: '54',
                weight: 1,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
            ],
          },
        },
      },
    },
  },
]
