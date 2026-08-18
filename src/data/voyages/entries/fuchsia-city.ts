import { VoyageConfig } from '../types'

export const fuchsiaCityVoyages: VoyageConfig[] = [
  {
    id: 'route-14-flying-voyage',
    name: 'Sky Patrol',
    description:
      "Send three flying Pokemon up with Donald's flock to scout Route 14's skies. They bring back a feather from every bird they spot.",
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '83',
    },
    background: '/backgrounds/grassy-route.avif',
    durationMinutes: 60,
    isRepeatable: true,
    minPokemon: 3,
    maxPokemon: 3,
    successChance: 100,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-14-bird-gauntlet-clear',
      },
    ],
    pokemonCriteria: {
      allowedTypes: ['flying'],
    },
    rewards: [
      {
        type: 'item',
        targetId: 'health-feather',
        quantity: { min: 1, max: 5 },
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'muscle-feather',
        quantity: { min: 1, max: 5 },
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'resist-feather',
        quantity: { min: 1, max: 5 },
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'genius-feather',
        quantity: { min: 1, max: 5 },
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'clever-feather',
        quantity: { min: 1, max: 5 },
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'swift-feather',
        quantity: { min: 1, max: 5 },
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 300,
        dropChance: 100,
      },
    ],
  },
]
