import { FishingGameConfig } from '../types'

export const viridianCityFishing: FishingGameConfig[] = [
  {
    id: 'viridian-city-pond',
    name: 'Viridian City Pond',
    description: 'A tiny pond in Viridian City',
    category: 'Kanto',
    subCategory: 'Viridian City',
    background: '/backgrounds/pond.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'explore-viridian',
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
      rods: {
        old: {
          levelRange: { min: 5, max: 5 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 30,
          encounters: {
            entries: [
              {
                speciesId: 129, // Magikarp
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
          timer: 30,
          encounters: {
            entries: [
              {
                speciesId: 60, // Poliwag
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                speciesId: 118, // Goldeen
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
            ],
          },
        },
        super: {
          levelRange: { min: 5, max: 20 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 30,
          encounters: {
            entries: [
              {
                speciesId: 60, // Poliwag
                weight: 50,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 72, // Tentacool
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
    id: 'route-22-lake',
    name: 'Route 22',
    description: 'A lake on Route 22',
    category: 'Kanto',
    subCategory: 'Viridian City',
    background: '/backgrounds/pond.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'explore-viridian',
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
      rods: {
        old: {
          levelRange: { min: 5, max: 5 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 20,
          encounters: {
            entries: [
              {
                speciesId: 129, // Magikarp
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
          timer: 20,
          encounters: {
            entries: [
              {
                speciesId: 60, // Poliwag
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                speciesId: 118, // Goldeen
                weight: 50,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
            ],
          },
        },
        super: {
          levelRange: { min: 15, max: 15 },
          shinyChanceModifier: 1,
          catchRateModifier: 0,
          timer: 20,
          encounters: {
            entries: [
              {
                speciesId: 60, // Poliwag
                weight: 50,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 61, // Poliwhirl
                weight: 10,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 118, // Goldeen
                weight: 40,
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
