import { FishingGameConfig } from '../types'

export const route10Fishing: FishingGameConfig[] = [
  {
    id: 'route-10-fishing',
    name: 'Route 10',
    description: 'Fish the water below the mountain road at the mouth of Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'route-9-pass-expedition',
        expeditionStatus: 'completed',
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
        portraitBackground: '/backgrounds/fishing-rocky-lake-portrait.avif',
        waterStyle: 'rocky-lake',
        waterline: { portrait: 55 },
      },
      waterAnimationSpeed: 1.25,
      rods: {
        old: {
          levelRange: { min: 10, max: 14 },
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
          levelRange: { min: 14, max: 18 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 60,
                formId: '60',
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1700, max: 4500 },
              },
              {
                speciesId: 118,
                formId: '118',
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1700, max: 4500 },
              },
            ],
          },
        },
        super: {
          levelRange: { min: 18, max: 22 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 54,
                formId: '54',
                weight: 35,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 79,
                formId: '79',
                weight: 35,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 98,
                formId: '98',
                weight: 30,
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
