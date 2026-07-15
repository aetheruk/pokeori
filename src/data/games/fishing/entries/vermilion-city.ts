import { FishingGameConfig } from '../types'

export const vermilionCityFishing: FishingGameConfig[] = [
  {
    id: 'route-6-fishing',
    name: 'Route 6',
    description: 'A quiet pond tucked into Route 6.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    background: '/backgrounds/pond.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'underground-path-route-5',
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
        portraitBackground: '/backgrounds/fishing-pond-portrait.avif',
        waterStyle: 'pond',
        waterline: { portrait: 58 },
      },
      waterAnimationSpeed: 1.2,
      rods: {
        old: {
          levelRange: { min: 5, max: 5 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 129,
                formId: '129',
                weight: 100,
                symbol: '!',
                reactionTime: 900,
                appearTime: { min: 2000, max: 5000 },
              },
            ],
          },
        },
        good: {
          levelRange: { min: 10, max: 10 },
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
                appearTime: { min: 1800, max: 4500 },
              },
              {
                speciesId: 118,
                formId: '118',
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1800, max: 4500 },
              },
            ],
          },
        },
        super: {
          levelRange: { min: 15, max: 15 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 90,
                formId: '90',
                weight: 50,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 98,
                formId: '98',
                weight: 50,
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
  {
    id: 'vermilion-city-fishing',
    name: 'Vermilion City',
    description: 'A salty fishing spot beside the Vermilion waterfront.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    background: '/backgrounds/vermillion.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-fishing-maniac',
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
        portraitBackground: '/backgrounds/fishing-harbor-portrait.avif',
        waterStyle: 'harbor',
        waterline: { portrait: 54 },
      },
      waterAnimationSpeed: 1.3,
      rods: {
        old: {
          levelRange: { min: 5, max: 5 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 129,
                formId: '129',
                weight: 100,
                symbol: '!',
                reactionTime: 900,
                appearTime: { min: 2000, max: 5000 },
              },
            ],
          },
          items: {
            entries: [
              {
                itemId: 'water-gem',
                weight: 90,
                symbol: '!',
                reactionTime: 900,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                itemId: 'unknown-tm',
                weight: 10,
                symbol: '!!!',
                reactionTime: 750,
                appearTime: { min: 2200, max: 5200 },
                secret: true,
              },
            ],
          },
        },
        good: {
          levelRange: { min: 10, max: 10 },
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
                appearTime: { min: 1800, max: 4500 },
              },
              {
                speciesId: 118,
                formId: '118',
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 1800, max: 4500 },
              },
            ],
          },
          items: {
            entries: [
              {
                itemId: 'water-gem',
                weight: 90,
                symbol: '!',
                reactionTime: 850,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                itemId: 'unknown-tm',
                weight: 10,
                symbol: '!!!',
                reactionTime: 700,
                appearTime: { min: 2200, max: 5200 },
                secret: true,
              },
            ],
          },
        },
        super: {
          levelRange: { min: 15, max: 15 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 25,
          encounters: {
            entries: [
              {
                speciesId: 90,
                formId: '90',
                weight: 50,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 98,
                formId: '98',
                weight: 50,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
            ],
          },
          items: {
            entries: [
              {
                itemId: 'water-gem',
                weight: 90,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                itemId: 'unknown-tm',
                weight: 10,
                symbol: '!!!',
                reactionTime: 650,
                appearTime: { min: 2200, max: 5200 },
                secret: true,
              },
            ],
          },
        },
      },
    },
  },
]
