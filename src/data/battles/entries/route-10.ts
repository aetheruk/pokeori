import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

export const route10Battles: BattleConfig[] = [
  {
    id: 'route-10-battle',
    name: 'Route 10',
    description: 'Wild Pokemon patrol the rocky path near Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'route-9-pass-expedition',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 100, formId: '100', level: { min: 14, max: 18 } },
      { speciesId: 21, formId: '21', level: { min: 14, max: 18 } },
      { speciesId: 23, formId: '23', level: { min: 14, max: 18 } },
      { speciesId: 27, formId: '27', level: { min: 14, max: 18 } },
    ],
    rewards: [],
    maxPokemon: 1,
    levelCap: 25,
  },
  {
    id: 'route-10-picknicker-heidi',
    trainerClassId: 'picnicker',
    trainerName: 'Heidi',
    name: 'Picknicker Heidi',
    description:
      'A very unhappy Picnicker wants answers after the Route 10 landslide clearing.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'picnicker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-open-road',
      },
      {
        type: 'battle_result',
        targetId: 'route-10-picknicker-heidi',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      { speciesId: 25, formId: '25', level: 21 },
      { speciesId: 35, formId: '35', level: 21 },
    ],
    rewards: [trainerPokeDollarReward('picnicker', 21)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
]
