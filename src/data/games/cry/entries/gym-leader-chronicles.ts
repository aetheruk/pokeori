import type { CryConfig } from '../types'

export const gymLeaderChronicleCryEntries: CryConfig[] = [
  {
    id: 'chronicle-misty-listen-across-the-water',
    name: 'Listen Across the Water',
    description: 'Pick the stranded Horsea out from the cries carrying across Cerulean Cape.',
    category: 'Secret',
    subCategory: 'Misty Chronicle',
    icon: { type: 'pokemon', id: '116' },
    background: '/backgrounds/chronicle-misty-cerulean-cape.avif',
    requirements: [{ type: 'task_completed', targetId: 'cascade-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [54, 86, 116, 118, 120, 129],
      optionsPool: [],
      timeLimit: 30,
      winRate: 5,
    },
  },
  {
    id: 'chronicle-surge-voices-in-the-dark',
    name: 'Voices in the Dark',
    description: 'Identify the Pokémon calling from different rooms while the Gym shelters Vermilion.',
    category: 'Secret',
    subCategory: 'Lt. Surge Chronicle',
    icon: { type: 'pokemon', id: '26' },
    background: '/backgrounds/chronicle-surge-gym-shelter.avif',
    requirements: [{ type: 'task_completed', targetId: 'thunder-badge-memory-revealed' }],
    criteria: [],
    rewards: [],
    settings: {
      pokemonPool: [25, 26, 81, 82, 100, 125],
      optionsPool: [],
      timeLimit: 30,
      winRate: 5,
    },
  },
]
