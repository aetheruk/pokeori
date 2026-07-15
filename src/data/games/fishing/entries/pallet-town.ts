import { FishingGameConfig } from '../types'

export const palletTownFishing: FishingGameConfig[] = [
  {
    id: 'pallet-town-seafront',
    name: 'Pallet Town',
    description: 'A quiet fishing spot along the southern coast of Pallet Town.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/beach.avif',
    icon: { type: 'item', id: 'old-rod' },
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-6',
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
        portraitBackground: '/backgrounds/fishing-beach-portrait.avif',
        waterStyle: 'ocean',
        waterline: { portrait: 52 },
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
                weight: 35,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 72, // Tentacool
                weight: 40,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 120, // Staryu
                weight: 25,
                symbol: '!',
                reactionTime: 600,
                appearTime: { min: 1500, max: 4000 },
              },
            ],
          },
        },
      },
    },
  },
]
