import { BattleConfig } from '../../types'

export const diglettsCaveBattles: BattleConfig[] = [
  {
    id: 'digletts-cave-battle',
    name: "Diglett's Cave",
    description: 'A narrow tunnel where Diglett and Dugtrio constantly churn the earth.',
    category: 'Kanto',
    subCategory: 'Digletts Cave',
    icon: {
      type: 'pokemon',
      id: '50',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-rumours',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      {
        speciesId: 50,
        formId: '50',
        level: {
          min: 16,
          max: 21,
        },
      },
      {
        speciesId: 51,
        formId: '51',
        level: {
          min: 19,
          max: 21,
        },
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'binder-basep',
        quantity: 1,
        dropChance: 2,
        secret: true,
      },
    ],
    maxPokemon: 1,
    levelCap: 25,
  },
]
