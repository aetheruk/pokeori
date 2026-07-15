import { VoyageConfig } from '../types'

export const mtMoonVoyages: VoyageConfig[] = [
  {
    id: 'mt-moon-fossil-hunt',
    name: 'Fossil Hunting',
    description:
      'Send your Geodude deep into Mt. Moon to search for rare fossils and valuable stones.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'item',
      id: 'dome-fossil',
    },
    durationMinutes: 60,
    isRepeatable: true,
    minPokemon: 3,
    maxPokemon: 3,
    successChance: 100,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-fossil-hunter',
      },
    ],
    pokemonCriteria: {
      allowedSpeciesIds: [74], // Only Geodude
    },
    rewards: [
      {
        type: 'item',
        targetId: 'small-stone-t1',
        quantity: { min: 5, max: 15 },
        dropChance: 100,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '74',
        quantity: 20,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'moon-stone',
        quantity: 1,
        dropChance: 5,
      },
      {
        type: 'item',
        targetId: 'dome-fossil',
        quantity: 1,
        dropChance: 2,
      },
      {
        type: 'item',
        targetId: 'helix-fossil',
        quantity: 1,
        dropChance: 2,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 300,
        dropChance: 100,
      },
    ],
    background: '/backgrounds/cave.avif',
  },
]
