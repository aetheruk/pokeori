import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

export const viridianCityBattles: BattleConfig[] = [
  {
    id: 'battle-grumpy-man',
    trainerClassId: 'gentleman',
    name: 'The Grumpy Old Man',
    description:
      'This grumpy old man won’t let you enter Viridian Forest until you defeat him in a Pokemon Battle!',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    background: '/backgrounds/town.avif',
    maxPokemon: 3,
    levelCap: 7,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'battle-grumpy-man',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'grumpy-man-viridian',
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 50,
    enemyTeam: [
      { speciesId: 19, level: 5, formId: '19' },
      { speciesId: 19, level: 5, formId: '19' },
      { speciesId: 19, level: 5, formId: '19' },
    ],
    rewards: [trainerPokeDollarReward('gentleman', 5)],
  },
  {
    id: 'route-22-battle',
    name: 'Route 22',
    description: 'The Outskirts of Viridian City, wild Pokémon roam the grassy areas.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass.avif',
    },
    background: '/backgrounds/rocky-path.avif',
    maxPokemon: 1,
    levelCap: 7,
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'explore-viridian',
      },
    ],
    isWildBattle: true,
    enemyTeam: [
      { speciesId: 19, level: { min: 2, max: 5 }, formId: '19' }, // Rattata
      { speciesId: 21, level: { min: 2, max: 5 }, formId: '21' }, // Spearow
      { speciesId: 29, level: { min: 2, max: 5 }, formId: '29' }, // NidoranF
      { speciesId: 32, level: { min: 2, max: 5 }, formId: '32' }, // NidoranM
      { speciesId: 56, level: { min: 2, max: 5 }, formId: '56' }, // Mankey
    ],
    rewards: [],
    gemConfig: {
      base: {
        min: 1,
        max: 2,
        dropRate: 40,
      },
      shining: {
        min: 1,
        max: 1,
        dropRate: 1,
      },
      pristine: {
        min: 0,
        max: 0,
        dropRate: 0,
      },
    },
    enemyAttackTelegraphChance: 50,
  },
  {
    id: 'rival-route-22',
    name: 'Rival Battle',
    description: 'Your rival is training on Route 22.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Rival Battle',
    dynamicOpponent: 'rival',
    rivalLevel: 8,
    maxPokemon: 3,
    levelCap: 8,
    enemyAttackTelegraphChance: 50,
    requirements: [
      {
        type: 'rival_selected',
      },
      {
        type: 'task_completed',
        targetId: 'explore-viridian',
      },
      {
        type: 'battle_result',
        targetId: 'rival-route-22',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'rival-route-22',
        battleStatus: 'loss',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [],
    rewards: [],
  },
]
