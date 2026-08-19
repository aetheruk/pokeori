import { PrizeWheelGameConfig } from '../types'

const xItemSlots = [
  { id: 'x-attack', label: 'X Attack', percentage: 16 },
  { id: 'x-defense', label: 'X Defense', percentage: 16 },
  { id: 'x-sp-atk', label: 'X Sp. Atk', percentage: 16 },
  { id: 'x-sp-def', label: 'X Sp. Def', percentage: 16 },
  { id: 'x-speed', label: 'X Speed', percentage: 15 },
  { id: 'dire-hit', label: 'Dire Hit', percentage: 16 },
] as const

export const fuchsiaCitychanseyEntries: PrizeWheelGameConfig[] = [
  {
    id: 'chansey-wheel-fuchsia',
    name: 'Fuchsia Chansey Wheel',
    gameType: 'prize-wheel',
    description:
      'Visit Chansey in the Fuchsia City Pokémon Center for battle tonics and a rare chance to discover a Revive recipe.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    background: '/backgrounds/chansey.avif',
    icon: { type: 'pokemon', id: '113' },
    requirements: [{ type: 'task_completed', targetId: 'explore-fuchsia-city' }],
    criteria: [],
    rewards: [],
    settings: {
      spinTime: { min: 5, max: 10 },
      background: '/scratchcard/chansey.avif',
      themeColour: '#FAC0CC',
      cost: { amount: 2, currencyType: 'league-ticket' },
      slots: [
        ...xItemSlots.map((slot) => ({
          id: slot.id,
          label: slot.label,
          color: '#F1AEC6',
          percentage: slot.percentage,
          icon: { type: 'item' as const, id: slot.id },
          rewards: [{ type: 'item' as const, targetId: slot.id, quantity: 1, dropChance: 100 }],
        })),
        {
          id: 'revive-recipe',
          label: 'Revive Recipe',
          color: '#f7cf05',
          percentage: 5,
          icon: { type: 'item' as const, id: 'revive' },
          rewards: [
            {
              type: 'task_complete' as const,
              targetId: 'revive-recipe-discovery',
              quantity: 1,
              dropChance: 100,
            },
            {
              type: 'task_complete' as const,
              targetId: 'revive-recipe',
              quantity: 1,
              dropChance: 100,
            },
          ],
        },
      ],
    },
  },
]
