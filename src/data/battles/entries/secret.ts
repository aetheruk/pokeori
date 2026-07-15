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
          hp: 255,
          attack: 255,
          defense: 255,
          specialAttack: 255,
          specialDefense: 255,
          speed: 255,
        },
      },
    ],
    rewards: [],
  },
]
