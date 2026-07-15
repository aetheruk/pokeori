import { BattleConfig } from '../../types'

const route7Gate = {
  type: 'task_completed' as const,
  targetId: 'underground-path-route-8',
}

export const celadonCityBattles: BattleConfig[] = [
  {
    id: 'route-7-battle',
    name: 'Route 7',
    description: 'Wild Pokemon rustle in the grass just outside Celadon City.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [route7Gate],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 16, formId: '16', level: { min: 18, max: 22 } },
      { speciesId: 17, formId: '17', level: { min: 18, max: 22 } },
      { speciesId: 43, formId: '43', level: { min: 18, max: 22 } },
      { speciesId: 69, formId: '69', level: { min: 18, max: 22 } },
      { speciesId: 56, formId: '56', level: { min: 18, max: 22 } },
      { speciesId: 58, formId: '58', level: { min: 18, max: 22 } },
      { speciesId: 37, formId: '37', level: { min: 18, max: 22 } },
      { speciesId: 63, formId: '63', level: { min: 18, max: 22 } },
    ],
    rewards: [],
    maxPokemon: 1,
    levelCap: 30,
  },
]
