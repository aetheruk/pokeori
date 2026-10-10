import { BattleConfig } from '../../types'

export const saffronCityBattles: BattleConfig[] = [
  {
    id: 'choo-chronicle-gate-grunt-battle',
    trainerClassId: 'rocket-grunt',
    name: 'Perimeter Guard',
    description:
      'No further words were spoken before Ray orders his Arcanine to attack.',
    winMessage: 'Sorry boy, Now’s not the time.',
    loseMessage: 'A minor setback.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/saffron.avif',
    title: 'Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'golden-glow',
      },
    ],
    enemyTeam: [
      { speciesId: 20, formId: '20', level: 32 },
      { speciesId: 109, formId: '109', level: 30 },
    ],
    rewards: [],
    maxPokemon: 2,
    levelCap: 46,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'rocket-chronicle-ambush-drill',
    trainerClassId: 'rocket-grunt',
    name: 'Ambush Strike Squad',
    description:
      'The vision continues. Ariana is checking the readiness of the strike squad.',
    winMessage: "You went a few rounds against me, I'm impressed.",
    loseMessage: 'Impeccable performance.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/saffron.avif',
    title: 'Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'golden-glow',
      },
    ],
    enemyTeam: [
      { speciesId: 42, formId: '42', level: 33 },
      { speciesId: 97, formId: '97', level: 34 },
    ],
    rewards: [],
    maxPokemon: 3,
    levelCap: 40,
    enemyAttackTelegraphChance: 2,
  },
]
