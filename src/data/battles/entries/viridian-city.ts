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
      id: 'expert-m',
    },
    background: '/backgrounds/town.avif',
    maxPokemon: 3,
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
      id: '/sprites/tall_grass-v2.avif',
    },
    background: '/backgrounds/rocky-path.avif',
    maxPokemon: 1,
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
    name: 'Route 22 Rematch',
    description:
      'Your rival has been testing their team against Route 22’s tougher wild Pokémon. Before either of you heads toward Cerulean, they want to see if you have caught up since the lab.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 22 Rematch',
    dynamicOpponent: 'rival',
    winMessage:
      "That was close. You've started reading my team, so I'll have to change things up. Nugget Bridge is our next checkpoint. Don't get too comfortable in front.",
    loseMessage:
      "A point for me this round. Route 22 was a warm-up; Nugget Bridge has five trainers waiting, and they won't give either of us time to regroup. Tune up your team, then meet me there.",
    rivalLevel: 8,
    maxPokemon: 3,
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
