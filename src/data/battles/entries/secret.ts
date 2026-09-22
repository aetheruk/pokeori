import { BattleConfig } from '../../types'

export const secretBattles: BattleConfig[] = [
  {
    id: 'hoopa-unbound-battle',
    name: 'The Boundless Void',
    description:
      'A terrifying rift in space-time has opened, revealing a malicious entity from another dimension.',
    category: 'Secret',
    subCategory: 'Summons',
    icon: {
      type: 'pokemon',
      id: '720',
    },
    background: '/backgrounds/twisted-dimension.avif',
    maxPokemon: 6,
    levelCap: 100,
    enemyAttackTelegraphChance: 2,
    requirements: [],
    enemyTeam: [
      {
        speciesId: 720,
        formId: '10086',
        level: 100,
        name: 'Hoopa Unbound',
        ivs: {
          hp: 31,
          attack: 31,
          defense: 31,
          specialAttack: 31,
          specialDefense: 31,
          speed: 31,
        },
        evs: {
          hp: 252,
          attack: 252,
          defense: 252,
          specialAttack: 252,
          specialDefense: 252,
          speed: 252,
        },
      },
    ],
    rewards: [],
  },
]
