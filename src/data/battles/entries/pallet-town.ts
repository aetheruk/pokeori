import { BattleConfig } from '../../types'

const palletOrientationRequirements: BattleConfig['requirements'] = [
  {
    type: 'pokedex_caught_total',
    count: 1,
  },
  {
    type: 'task_completed',
    targetId: 'tutorial-16',
    inverse: true,
  },
  {
    type: 'expedition_result',
    targetId: 'pallet-town-orientation',
    expeditionStatus: 'completed',
    count: 1,
    inverse: true,
  },
]

export const palletTownBattles: BattleConfig[] = [
  {
    id: 'pallet-orientation-lab-rattata',
    name: 'Lab Rattata',
    description: 'A Rattata is chewing through the lab wiring. Scare it away with your partner.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    icon: {
      type: 'pokemon',
      id: '19',
    },
    background: '/backgrounds/lab.avif',
    maxPokemon: 1,
    levelCap: 5,
    requirements: palletOrientationRequirements,
    isWildBattle: true,
    enemyAttackTelegraphChance: 80,
    enemyTeam: [
      {
        speciesId: 19,
        formId: '19',
        level: 1,
        name: 'Lab Rattata',
        ivs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        evs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
      },
    ],
    rewards: [],
  },
  {
    id: 'rival-pallet-town',
    name: 'Rival Battle',
    description: "A familiar face waits outside Oak's lab for one first battle.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    title: 'Rival Battle',
    dynamicOpponent: 'rival',
    rivalLevel: 5,
    maxPokemon: 3,
    levelCap: 7,
    enemyAttackTelegraphChance: 80,
    requirements: [
      {
        type: 'rival_selected',
      },
      {
        type: 'task_completed',
        targetId: 'tutorial-16',
      },
      {
        type: 'battle_result',
        targetId: 'rival-pallet-town',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'rival-pallet-town',
        battleStatus: 'loss',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [],
    rewards: [],
  },
  {
    name: 'Rocky Cave EX+',
    description:
      'I’m not sure how knowing an Rhydon is taller than a Rhyhorn is going to help me out here… Oh man it looks even angrier this time.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'pokemon',
      id: '112',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 6,
    levelCap: 50,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'tutorial-battle-5',
        battleStatus: 'loss',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'tutorial-battle-4',
        battleStatus: 'win',
        count: 3,
        inverse: true,
      },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-14',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 80,
    enemyTeam: [
      {
        speciesId: 112,
        formId: '112',
        level: 80,
        name: 'Raging Rhydon',
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
    id: 'tutorial-battle-5',
  },
  {
    id: 'route-1-battle',
    name: 'Route 1',
    description: 'Small Pokémon from the local area hide in the long grass around here.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass-v2.png',
    },
    background: '/backgrounds/grassy-route.avif',
    maxPokemon: 1,
    levelCap: 7,
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-16',
      },
    ],
    gemConfig: {
      base: {
        min: 1,
        max: 1,
        dropRate: 100,
      },
      shining: {
        min: 1,
        max: 1,
        dropRate: 0,
      },
      pristine: {
        min: 1,
        max: 1,
        dropRate: 0,
      },
    },
    isWildBattle: true,
    enemyTeam: [
      {
        speciesId: 19, // Rattata
        level: { min: 2, max: 5 },
      },
      {
        speciesId: 16, // Pidgey
        level: { min: 2, max: 5 },
      },
      {
        speciesId: 19,
        formId: '10091',
        level: { min: 2, max: 5 },
        requirements: [
          {
            type: 'time_range',
            timeRange: {
              start: '18:00',
              end: '06:00',
            },
          },
          {
            type: 'skill_level',
            targetId: 'researching',
            count: 5,
          },
          {
            type: 'skill_level',
            targetId: 'catching',
            count: 5,
          },
        ],
      },
    ],
    rewards: [],
    enemyAttackTelegraphChance: 80,
  },
  {
    name: 'Rocky Cave EX',
    description:
      'What the hell is going on, Brock’s cheering me on and asking to see my signature move?! I can’t see this going well…',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'pokemon',
      id: '112',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 3,
    levelCap: 5,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'tutorial-battle-4',
        battleStatus: 'loss',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        battleStatus: 'win',
        count: 3,
        targetId: 'tutorial-battle-3',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 80,
    enemyTeam: [
      {
        speciesId: 112,
        formId: '112',
        level: 50,
      },
    ],
    rewards: [],
    id: 'tutorial-battle-4',
  },
  {
    name: 'Rocky Cave',
    description:
      'I’m not sure about this, but Brock seems really confident in my abilities. I’ve got a hunch that if I can beat 3 Pokemon in battle the Rhydon will show up.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 3,
    levelCap: 7,
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-12',
      },
      {
        type: 'battle_result',
        battleStatus: 'win',
        count: 3,
        targetId: 'tutorial-battle-3',
        inverse: true,
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 80,
    enemyTeam: [
      {
        speciesId: 74,
        formId: '74',
        level: 4,
        name: 'Geodude',
        ivs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        evs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
      },
      {
        speciesId: 41,
        formId: '41',
        level: 4,
        ivs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        evs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
      },
      {
        speciesId: 95,
        formId: '95',
        level: 7,
        ivs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        evs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
      },
    ],
    rewards: [],
    id: 'tutorial-battle-3',
  },
  {
    name: 'Lab Rats',
    description:
      'My first battle, and it’s against Rattata. This seems underwhelming but I guess we all have to start somewhere.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'pokemon',
      id: '19',
    },
    background: '/backgrounds/lab.avif',
    maxPokemon: 1,
    levelCap: 5,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'tutorial-battle',
        battleStatus: 'win',
        count: 5,
        inverse: true,
      },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-4',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 80,
    enemyTeam: [
      {
        speciesId: 19,
        level: 1,
        name: 'Lab Rattata',
        ivs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        evs: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
      },
    ],
    rewards: [],
    id: 'tutorial-battle',
  },
]
