import { BattleConfig } from '../../types'

export const pvpBattles: BattleConfig[] = [
  {
    id: 'pvp_friendly_test',
    name: 'Friend Battle',
    description:
      'Challenge a friend to a battle, with nothing at stake! | [3 Pokemon auto set to level 50]',
    category: 'Pokemon Center',
    subCategory: 'Battles',
    icon: { type: 'item', id: 'vs-seeker' },
    background: '/backgrounds/friend-stadium.avif',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'vs-seeker',
      },
    ],
    enemyTeam: [],
    rewards: [],
    maxPokemon: 3,
    levelCap: 50,
    enemyAttackTelegraphChance: 2,
    pvp: true,
    pvp_type: 'friendly',
  },
  {
    id: 'pvp_ranked_test',
    name: 'Crystal League',
    description: 'Take part in ranked battles in the Crystal League',
    category: 'Pokemon Center',
    subCategory: 'Battles',
    icon: { type: 'item', id: 'vs-seeker' },
    background: '/backgrounds/crystal-stadium.avif',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'vs-seeker',
      },
    ],
    enemyTeam: [],
    rewards: [
      { type: 'currency', targetId: 'pokedollars', quantity: 100 },
      { type: 'currency', targetId: 'battle-points', quantity: 5 },
      { type: 'xp', skill: 'ranked-battling', quantity: 50 },
    ],
    maxPokemon: 3,
    levelCap: 20,
    enemyAttackTelegraphChance: 2,
    pvp: true,
    pvp_type: 'ranked',
  },
]
