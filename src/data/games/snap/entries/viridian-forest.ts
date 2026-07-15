import { SnapConfig } from '../types'

export const viridianForestsnapEntries: SnapConfig[] = [
  // Viridian Forest - Photos in the Forest
  {
    id: 'research-forest-photos',
    name: 'Photos in the Forest',
    description: 'A perfect spot to get out my camera and snap the local wildlife.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'local',
      id: 'sprites/items/forest-photo.avif',
    },
    requirements: [
      {
        type: 'item_owned',
        targetId: 'binder-base2',
      },
    ],
    criteria: [
      {
        type: 'user_level',
        targetId: 'researching',
        count: 6,
      },
    ],
    settings: {
      pokemonPool: [10, 11, 13, 14, 25],
      timeLimit: 60,
      winRate: 3,
      successThreshold: 700,
    },
    rewards: [
      {
        type: 'item',
        targetId: 'quality-forest-photo',
        quantity: { min: 3, max: 5 },
        dropChance: 100,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '10',
        quantity: 1,
        dropChance: 50,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '11',
        quantity: 1,
        dropChance: 10,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '13',
        quantity: 1,
        dropChance: 50,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '14',
        quantity: 1,
        dropChance: 10,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '25',
        quantity: 1,
        dropChance: 25,
      },
    ],
    skillXp: { skill: 'catching', level: 6 },
    background: '/backgrounds/forest.avif',
  },
  {
    id: 'research-forest-photos-ex',
    name: 'Photos in the Forest EX',
    description: 'A perfect spot to get out my camera and snap the local wildlife.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'local',
      id: 'sprites/items/forest-photo.avif',
    },
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'research-forest-photos',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'user_level',
        targetId: 'researching',
        count: 10,
      },
      {
        type: 'research_encounter_result',
        targetId: 'research-forest-photos',
        battleStatus: 'win',
        count: 30,
      },
    ],
    settings: {
      pokemonPool: [10, 11, 13, 14, 25],
      timeLimit: 30,
      winRate: 2,
      successThreshold: 550,
      death: true,
    },
    rewards: [
      {
        type: 'item',
        targetId: 'quality-forest-photo',
        quantity: { min: 5, max: 7 },
        dropChance: 100,
      },
      {
        type: 'currency',
        quantity: 20,
        dropChance: 100,
        targetId: 'crystals',
      },
      {
        type: 'pokemon_research_xp',
        targetId: '10',
        quantity: 2,
        dropChance: 50,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '11',
        quantity: 2,
        dropChance: 10,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '13',
        quantity: 2,
        dropChance: 50,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '14',
        quantity: 2,
        dropChance: 10,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '25',
        quantity: 2,
        dropChance: 25,
      },
    ],
    skillXp: { skill: 'catching', level: 6 },
    background: '/backgrounds/forest.avif',
  },
]
