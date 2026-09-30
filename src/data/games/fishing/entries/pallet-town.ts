import { FishingGameConfig } from '../types'

export const palletTownFishing: FishingGameConfig[] = [
  {
    id: 'pallet-town-seafront',
    name: 'Pallet Town Coastline',
    description: 'Cast a line along Pallet Town’s quiet southern shoreline.',
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
          levelRange: { min: 5, max: 10 },
          catchRateModifier: 0,
          timer: 30,
          encounters: {
            entries: [
              {
                speciesId: 129, // Magikarp
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
          levelRange: { min: 5, max: 15 },
          catchRateModifier: 0,
          timer: 30,
          encounters: {
            entries: [
              {
                speciesId: 129, // Magikarp
                formId: '129',
                weight: 20,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                speciesId: 98, // Krabby
                formId: '98',
                weight: 40,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
              {
                speciesId: 116, // Horsea
                formId: '116',
                weight: 40,
                symbol: '!',
                reactionTime: 800,
                appearTime: { min: 2000, max: 5000 },
              },
            ],
          },
        },
        super: {
          levelRange: { min: 15, max: 35 },
          catchRateModifier: 0,
          timer: 30,
          encounters: {
            entries: [
              {
                speciesId: 116, // Horsea (FireRed)
                formId: '116',
                weight: 40,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 98, // Krabby (LeafGreen)
                formId: '98',
                weight: 40,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 90, // Shellder (FireRed)
                formId: '90',
                weight: 40,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 120, // Staryu (LeafGreen)
                formId: '120',
                weight: 40,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 130, // Gyarados
                formId: '130',
                weight: 30,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 117, // Seadra (FireRed)
                formId: '117',
                weight: 4,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 99, // Kingler (LeafGreen)
                formId: '99',
                weight: 4,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 54, // Psyduck (FireRed)
                formId: '54',
                weight: 1,
                symbol: '!',
                reactionTime: 700,
                appearTime: { min: 1500, max: 4000 },
              },
              {
                speciesId: 79, // Slowpoke (LeafGreen)
                formId: '79',
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
