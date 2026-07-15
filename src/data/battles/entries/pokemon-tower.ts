import { BattleConfig } from '../../types'

export const pokemonTowerBattles: BattleConfig[] = [
  {
    id: 'fuji-chronicle-rocket-scouts',
    trainerClassId: 'rocket-grunt',
    name: 'Rocket Goon',
    description: 'Defeat the Rocket goon blocking the first floor.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/pkmn-tower.avif',
    title: 'Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    enemyTeam: [{ speciesId: 20, formId: '20', level: 24 }],
    rewards: [],
    maxPokemon: 4,
    levelCap: 40,
    enemyAttackTelegraphChance: 2,
    allowedItems: ['battle-potion', 'battle-super-potion'],
  },
  {
    id: 'fuji-chronicle-shadow-prototype',
    trainerClassId: 'rocket-grunt',
    name: 'Cable Guard I',
    description: 'Defeat the first Rocket guard on the cable-lined floors.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/pkmn-tower.avif',
    title: 'Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    enemyTeam: [
      { speciesId: 41, formId: '41', level: 25 },
      { speciesId: 109, formId: '109', level: 26 },
    ],
    rewards: [],
    maxPokemon: 4,
    levelCap: 40,
    enemyAttackTelegraphChance: 2,
    allowedItems: ['battle-potion', 'battle-super-potion'],
  },
  {
    id: 'fuji-chronicle-upper-guard',
    trainerClassId: 'rocket-grunt',
    name: 'Cable Guard II',
    description: 'Defeat the Rocket guards defending the tower devices.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/pkmn-tower.avif',
    title: 'Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    enemyTeam: [
      { speciesId: 20, formId: '20', level: 27 },
      { speciesId: 88, formId: '88', level: 27 },
    ],
    rewards: [],
    maxPokemon: 4,
    levelCap: 40,
    enemyAttackTelegraphChance: 2,
    allowedItems: ['battle-potion', 'battle-super-potion'],
  },
  {
    id: 'fuji-chronicle-final-climb',
    trainerClassId: 'rocket-grunt',
    name: 'Cable Guard III',
    description: 'Defeat the last guards below the source of the green light.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/pkmn-tower.avif',
    title: 'Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    enemyTeam: [
      { speciesId: 42, formId: '42', level: 29 },
      { speciesId: 89, formId: '89', level: 30 },
      { speciesId: 109, formId: '109', level: 29, name: 'Shadow Koffing', isShadow: true },
    ],
    rewards: [],
    maxPokemon: 4,
    levelCap: 40,
    enemyAttackTelegraphChance: 2,
    allowedItems: ['battle-potion', 'battle-super-potion'],
  },
]
