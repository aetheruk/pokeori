import { VoyageConfig } from '../types'

export const palletTownVoyages: VoyageConfig[] = [
  {
    id: 'rattata-scavenge',
    name: 'Rattata Scavenge',
    description:
      'Send a team of Rattata to scavenge in the burrow for supplies. They are fast and sneaky!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'pokemon',
      id: '19', // Rattata
    },
    background: '/backgrounds/grassy-route.avif',
    durationMinutes: 45,
    isRepeatable: true,
    minPokemon: 1,
    maxPokemon: 6,
    successChance: 100,

    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'rattatas-burrow', // Requires finding the burrow
      },
    ],

    pokemonCriteria: {
      allowedSpeciesIds: [19], // Only Rattata
    },

    teamRequirements: [
      {
        type: 'total_stat',
        stat: 'speed',
        value: 30,
      },
    ],

    rewards: [
      { type: 'xp', skill: 'catching', quantity: 150, dropChance: 100 },
      {
        type: 'item',
        quantity: { min: 2, max: 5 },
        targetId: 'broken-ball-t1',
        dropChance: 100,
      },
      {
        type: 'item',
        quantity: { min: 1, max: 3 },
        targetId: 'nut-red',
        dropChance: 70,
      },
      {
        type: 'item',
        quantity: { min: 1, max: 2 },
        targetId: 'nut-purple',
        dropChance: 50,
      },
      {
        type: 'item',
        quantity: { min: 3, max: 8 },
        targetId: 'soft-fluff-t1',
        dropChance: 100,
      },
      {
        type: 'item',
        quantity: { min: 3, max: 10 },
        targetId: 'normal-gem',
        dropChance: 100,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '19',
        quantity: 10,
        dropChance: 100,
      },
    ],
  },
]
