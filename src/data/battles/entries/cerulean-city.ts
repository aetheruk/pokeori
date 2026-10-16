import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

export const ceruleanCityBattles: BattleConfig[] = [
  {
    id: 'route-5-battle',
    allowVariantCatches: true,
    name: 'Route 5',
    description: 'Wild Pokemon roam the grassy road south of Cerulean City.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '52',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      {
        speciesId: 16,
        formId: '16',
        level: {
          min: 13,
          max: 16,
        },
      },
      {
        speciesId: 43,
        formId: '43',
        level: {
          min: 13,
          max: 16,
        },
      },
      {
        speciesId: 52,
        formId: '52',
        level: {
          min: 13,
          max: 16,
        },
      },
      {
        speciesId: 56,
        formId: '56',
        level: {
          min: 13,
          max: 16,
        },
      },
      {
        speciesId: 69,
        formId: '69',
        level: {
          min: 13,
          max: 16,
        },
      },
    ],
    rewards: [],
    maxPokemon: 1,
  },
  {
    id: 'route-9-battle',
    allowVariantCatches: true,
    name: 'Route 9',
    description: 'Wild Pokemon roam the rocky road east of Cerulean City.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '27',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-shrub',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      {
        speciesId: 19,
        formId: '19',
        level: {
          min: 11,
          max: 17,
        },
      },
      {
        speciesId: 16,
        formId: '16',
        level: {
          min: 11,
          max: 17,
        },
      },
      {
        speciesId: 27,
        formId: '27',
        level: {
          min: 11,
          max: 17,
        },
      },
      {
        speciesId: 23,
        formId: '23',
        level: {
          min: 11,
          max: 17,
        },
      },
    ],
    rewards: [],
    maxPokemon: 1,
  },
  {
    id: 'route-9-pass-picnicker-alicia',
    winMessage: 'I tried buying Pokeballs the other day, but they had ran out, can you believe it?!',
    trainerClassId: 'picnicker',
    name: 'Picnicker Alicia',
    description: 'A Picnicker near the pass is testing teams against the mountain wind.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'picnicker',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 43, formId: '43', level: 18 },
      { speciesId: 69, formId: '69', level: 18 },
      { speciesId: 43, formId: '43', level: 18 },
      { speciesId: 69, formId: '69', level: 18 },
    ],
    rewards: [trainerPokeDollarReward('picnicker', 18)],
    maxPokemon: 4,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-hiker-jeremy',
    winMessage: 'I wonder if there\'s different type of Machop in the world.',
    trainerClassId: 'hiker',
    name: 'Hiker Jeremy',
    description: 'A Hiker blocks the easier footing with a grin and a challenge.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 66, formId: '66', level: 20 },
      { speciesId: 95, formId: '95', level: 20 },
    ],
    rewards: [trainerPokeDollarReward('hiker', 20)],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-camper-chris',
    winMessage: 'I know where to find Charmander\'s do you?',
    trainerClassId: 'camper',
    name: 'Camper Chris',
    description: 'A Camper has fire in his team and too much confidence on the trail.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'camper',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 58, formId: '58', level: 21 },
      { speciesId: 4, formId: '4', level: 21 },
    ],
    rewards: [trainerPokeDollarReward('camper', 21)],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-bug-catcher-brent',
    winMessage: 'I knew I should have gone with Butterfree',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Brent',
    description: 'A Bug Catcher has trained his Beedrill for quick strikes between the rocks.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 15, formId: '15', level: 19 },
      { speciesId: 15, formId: '15', level: 19 },
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 19)],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-hiker-alan',
    winMessage: 'It\'s so hard to evolve my Onix!',
    trainerClassId: 'hiker',
    name: 'Hiker Alan',
    description: 'A Hiker trusts rock-solid partners to hold the trail.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 74, formId: '74', level: 21 },
      { speciesId: 95, formId: '95', level: 21 },
    ],
    rewards: [trainerPokeDollarReward('hiker', 21)],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-bug-catcher-conner',
    winMessage: 'I caught my Pokemon, in the Safari Zone!',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Conner',
    description: 'A Bug Catcher shows how many small Pokemon can fill a narrow path.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 10, formId: '10', level: 20 },
      { speciesId: 13, formId: '13', level: 20 },
      { speciesId: 48, formId: '48', level: 20 },
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 20)],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-camper-drew',
    winMessage: 'My Parents said it\'s not safe to camp outside because of Alpha Pokemon.',
    trainerClassId: 'camper',
    name: 'Camper Drew',
    description: 'A Camper has a mixed team ready for anyone crossing the pass.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'camper',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 19, formId: '19', level: 19 },
      { speciesId: 27, formId: '27', level: 19 },
      { speciesId: 23, formId: '23', level: 19 },
      { speciesId: 27, formId: '27', level: 19 },
    ],
    rewards: [trainerPokeDollarReward('camper', 19)],
    maxPokemon: 4,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-hiker-brice',
    winMessage: 'Did you know there\'s a secret chamber in Rock Tunnel but it\'s fully closed off.',
    trainerClassId: 'hiker',
    name: 'Hiker Brice',
    description: 'A Hiker digs in with Geodude and Machop before the final climb.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [
      { speciesId: 74, formId: '74', level: 20 },
      { speciesId: 74, formId: '74', level: 20 },
      { speciesId: 66, formId: '66', level: 20 },
    ],
    rewards: [trainerPokeDollarReward('hiker', 20)],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-9-pass-picnicker-caitlin',
    winMessage: 'I saw a super weird Meowth the other day, I swear it was trying to tell me something.',
    trainerClassId: 'picnicker',
    name: 'Picnicker Caitlin',
    description: 'A Picnicker waits near the far side with one sharp Meowth.',
    category: 'Secret',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'picnicker',
    },
    background: '/backgrounds/rocky-path.avif',
    title: 'Route 9 Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      },
    ],
    enemyTeam: [{ speciesId: 52, formId: '52', level: 23 }],
    rewards: [trainerPokeDollarReward('picnicker', 23)],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-4-battle',
    allowVariantCatches: true,
    name: 'Route 4',
    description: 'A rocky path leading from Mt. Moon to Cerulean City.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '23',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      {
        speciesId: 19,
        level: {
          min: 8,
          max: 12,
        },
      },
      {
        speciesId: 23,
        level: {
          min: 8,
          max: 12,
        },
      },
      {
        speciesId: 21,
        level: {
          min: 8,
          max: 12,
        },
      },
      {
        speciesId: 27,
        level: {
          min: 8,
          max: 12,
        },
      },
      {
        speciesId: 56,
        level: {
          min: 8,
          max: 12,
        },
      },
    ],
    maxPokemon: 1,
    rewards: [],
  },
  {
    id: 'nugget-bridge-1',
    winMessage: 'Wow you\'re a great candidate! They promised me they\'d tell me how to make my Bug\'s the strongest in the world if I won!',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Cale',
    description: "Let's go Nugget Bridge Challenge! oh surprise, surprise another bug catcher...",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-1',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-challenge',
      },
    ],
    enemyTeam: [
      {
        speciesId: 10,
        level: 10,
      },
      {
        speciesId: 13,
        level: 10,
      },
      {
        speciesId: 11,
        level: 10,
      },
      {
        speciesId: 14,
        level: 10,
      },
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 10)],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'rival-cerulean',
    name: 'Battle on the Big Bridge',
    description:
      'Oh great, them again. Do they not realise we’ve got a CODE BLUE on our hands?!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/cerulean.avif',
    title: 'Battle on the Big Bridge',
    dynamicOpponent: 'rival',
    winMessage:
      'You’re strong okay I get it, but be careful there’s something weird about those guys ahead. Their pokemon are unnaturally strong',
    loseMessage:
      'Expected. We’re leagues apart. I’m Pokemon League. You’re more Little League. If you can’t beat me you have no chance against those creeps ahead, there’s something really weird going on with their Pokemon',
    rivalLevel: 18,
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
    requirements: [
      {
        type: 'rival_selected',
      },
      {
        type: 'task_completed',
        targetId: 'cerulean-gym-2',
      },
      {
        type: 'battle_result',
        targetId: 'rival-cerulean',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'rival-cerulean',
        battleStatus: 'loss',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [],
    rewards: [],
  },
  {
    id: 'nugget-bridge-2',
    winMessage: 'Imagine If my Pokemon could be like that too, Nobody would bully me at school!',
    trainerClassId: 'lass',
    name: 'Lass Ali',
    description: 'I swear that bug catcher referred to me as a great candidate... ominous.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-2',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-1',
        battleStatus: 'win',
        count: 1,
      },
    ],
    enemyTeam: [
      {
        speciesId: 16,
        level: 12,
      },
      {
        speciesId: 43,
        level: 12,
      },
      {
        speciesId: 69,
        level: 12,
      },
    ],
    rewards: [trainerPokeDollarReward('lass', 12)],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'nugget-bridge-3',
    winMessage: 'How did you beat me, They said nobody would be able to beat me!',
    trainerClassId: 'youngster',
    name: 'Youngster Timmy',
    description: 'One Golden Nugget coming my way!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-3',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-2',
        battleStatus: 'win',
        count: 1,
      },
    ],
    enemyTeam: [
      {
        speciesId: 27,
        level: 10,
      },
      {
        speciesId: 23,
        level: 13,
        isShadow: true,
      },
    ],
    rewards: [trainerPokeDollarReward('youngster', 13)],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'nugget-bridge-4',
    winMessage: 'Why would you even want a stupid nugget, it doesnt do anything?',
    trainerClassId: 'lass',
    name: 'Lass Reli',
    description: 'What was up with that kids Pokemon?!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-4',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-3',
        battleStatus: 'win',
        count: 1,
      },
    ],
    enemyTeam: [
      {
        speciesId: 32,
        level: 16,
      },
      {
        speciesId: 29,
        level: 16,
      },
    ],
    rewards: [trainerPokeDollarReward('lass', 16)],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'nugget-bridge-5',
    winMessage: 'I must have done something wrong? But I followed all the instructions!',
    trainerClassId: 'camper',
    name: 'Camper Ethan',
    description:
      'My last opponent, and I can get away from these weirdos, somethings not right here...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'camper',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-5',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-4',
        battleStatus: 'win',
        count: 1,
      },
    ],
    enemyTeam: [
      {
        speciesId: 56,
        level: 18,
        isShadow: true,
        evs: {
          attack: 252,
          speed: 252,
        },
        ivs: {
          attack: 31,
          speed: 31,
        },
      },
    ],
    rewards: [trainerPokeDollarReward('camper', 18)],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'nugget-bridge-6',
    winMessage: 'You win this round kid, I was done here anyway.',
    trainerClassId: 'rocket-grunt',
    name: 'Rocket Recruiter',
    description: "I'm putting an end to this creep once and for all.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-6',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-refuse',
        battleStatus: 'win',
        count: 1,
      },
    ],
    enemyTeam: [
      {
        speciesId: 23,
        level: 15,
        isShadow: true,
        formId: '23',
        initialStatus: 'shield',
      },
      {
        speciesId: 41,
        level: 15,
        formId: '41',
        isShadow: true,
      },
    ],
    rewards: [
      trainerPokeDollarReward('rocket-grunt', 15),
      {
        type: 'item',
        quantity: 1,
        targetId: 'nugget',
      },
      {
        type: 'task_complete',
        quantity: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
    title: 'Creepy Weirdo',
  },
  {
    id: 'route-24-battle',
    allowVariantCatches: true,
    name: 'Route 24',
    description:
      "A small route connecting Cerulean City to route 25 There's an ominous looking cave just across the water.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '63',
    },
    maxPokemon: 1,
    allowSwapping: false,
    enemyAttackTelegraphChance: 2,
    isWildBattle: true,
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    enemyTeam: [
      {
        speciesId: 10,
        level: 8,
        formId: '10',
      },
      {
        speciesId: 11,
        level: 11,
        formId: '11',
      },
      {
        speciesId: 13,
        level: 8,
        formId: '13',
      },
      {
        speciesId: 14,
        level: 11,
        formId: '14',
      },
      {
        speciesId: 16,
        level: 13,
        formId: '16',
      },
      {
        speciesId: 43,
        level: 14,
        formId: '43',
      },
      {
        speciesId: 63,
        level: 14,
        formId: '63',
      },
      {
        speciesId: 69,
        level: 14,
        formId: '69',
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'charred-wood',
        dropChance: 90,
        requirements: [
          {
            type: 'task_completed',
            count: 1,
            targetId: 'charred-hiker',
            secret: false,
          },
          {
            type: 'task_completed',
            targetId: 'growlithe-knows-the-way',
            inverse: true,
          },
        ],
      },
    ],
    background: '/backgrounds/grassy-route.avif',
  },
  {
    id: 'route-25-battle',
    allowVariantCatches: true,
    name: 'Route 25',
    description: 'A lovely route with a sea view, leading to a beautiful cottage.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    maxPokemon: 1,
    allowSwapping: false,
    enemyAttackTelegraphChance: 2,
    isWildBattle: true,
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'abra-teleport',
      },
    ],
    enemyTeam: [
      {
        speciesId: 10,
        level: 8,
        formId: '10',
      },
      {
        speciesId: 11,
        level: 11,
        formId: '11',
      },
      {
        speciesId: 13,
        level: 8,
        formId: '13',
      },
      {
        speciesId: 14,
        level: 11,
        formId: '14',
      },
      {
        speciesId: 16,
        level: 13,
        formId: '16',
      },
      {
        speciesId: 43,
        level: 14,
        formId: '43',
      },
      {
        speciesId: 63,
        level: 14,
        formId: '63',
      },
      {
        speciesId: 69,
        level: 14,
        formId: '69',
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'manics-journal-pg-322',
        dropChance: 1,
        secret: true,
      },
    ],
    background: '/backgrounds/grassy-route.avif',
  },
  {
    id: 'hiker-franklin',
    winMessage: 'Clearly not strong enough.',
    trainerClassId: 'hiker',
    name: 'Hiker Franklin',
    description: 'I just got back from Mt. Moon, my Pokemon are stronger than ever!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'hiker-franklin',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 74,
        level: 15,
      },
      {
        speciesId: 66,
        level: 15,
      },
    ],
    rewards: [
      trainerPokeDollarReward('hiker', 15),
      {
        type: 'item',
        quantity: 1,
        targetId: 'pack-base3',
      },
    ],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'hiker-wayne',
    winMessage: 'You\'ve seen bigger?!',
    trainerClassId: 'hiker',
    name: 'Hiker Wayne',
    description: 'Have you seen how big my Onix is?',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'hiker-wayne',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 95,
        level: 17,
      },
    ],
    rewards: [
      trainerPokeDollarReward('hiker', 17),
      {
        type: 'item',
        quantity: 1,
        targetId: 'small-stone-t1',
      },
    ],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'cer-youngster-joey',
    winMessage: 'Whoa, you got even stronger since last time!',
    trainerClassId: 'youngster',
    name: 'Youngster Joey',
    description: "Hey {Trainer} fancy seeing you here! Let's Rematch! Rattatas Only!",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'cer-youngster-joey',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 19,
        level: 20,
      },
    ],
    rewards: [trainerPokeDollarReward('youngster', 20)],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
    criteria: [
      {
        type: 'battle_team',
        count: 1,
        battleTeamCheck: {
          speciesId: 19,
          position: 1,
          formId: '19',
        },
      },
    ],
  },
  {
    id: 'youngster-dan',
    winMessage: 'One day my Pokemon will be King!',
    trainerClassId: 'youngster',
    name: 'Youngster Dan',
    description: 'Slow and steady wins the race, right?',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'youngster-dan',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 79,
        level: 17,
        formId: '79',
      },
    ],
    rewards: [trainerPokeDollarReward('youngster', 17)],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'picknicker-kelsey',
    winMessage: 'I met a guy who wouldn\'t stop talking to my Nidoran♂ He was kinda intense',
    trainerClassId: 'picnicker',
    name: 'Picknicker Kelsey',
    description: "My Nidoran are so cute, but they're tough too!",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'picknicker',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'picknicker-kelsey',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 32,
        level: 15,
      },
      {
        speciesId: 29,
        level: 15,
      },
    ],
    rewards: [trainerPokeDollarReward('picnicker', 15)],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'hiker-nob',
    winMessage: 'My parents are the worst.',
    trainerClassId: 'hiker',
    name: 'Hiker Nob',
    description:
      'Rock and roll! CI know everything about Geodude, beat me and I might just teach you!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'hiker-nob',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 74,
        level: 13,
      },
      {
        speciesId: 74,
        level: 13,
      },
      {
        speciesId: 74,
        level: 13,
      },
      {
        speciesId: 66,
        level: 13,
      },
    ],
    rewards: [
      trainerPokeDollarReward('hiker', 13),
      {
        type: 'pokemon_research_xp',
        quantity: 20,
        targetId: '74',
      },
    ],
    maxPokemon: 3,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'camper-flint',
    winMessage: 'I guess I\'ll keep training',
    trainerClassId: 'camper',
    name: 'Camper Flint',
    description: "I'm training hard to be a master!",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'camper',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'camper-flint',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 19,
        level: 14,
      },
      {
        speciesId: 23,
        level: 14,
      },
    ],
    rewards: [trainerPokeDollarReward('camper', 14)],
    maxPokemon: 1,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'youngster-chad',
    winMessage: 'I let my Ekans out of his Pokeball on a flight to Alola once, that wasn\'t a good combination.',
    trainerClassId: 'youngster',
    name: 'Youngster Chad',
    description: 'Snakes and sand, my favorite combination!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'youngster-chad',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 23,
        level: 14,
      },
      {
        speciesId: 27,
        level: 14,
      },
    ],
    rewards: [trainerPokeDollarReward('youngster', 14)],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'lass-haley',
    winMessage: 'I heard there\'s a Beautiful flower pokemon that can transform and grow wings!',
    trainerClassId: 'lass',
    name: 'Lass Haley',
    description: 'Flowers and birds make for a beautiful battle!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
      {
        type: 'battle_result',
        targetId: 'lass-haley',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 43,
        level: 13,
      },
      {
        speciesId: 16,
        level: 13,
      },
      {
        speciesId: 43,
        level: 13,
      },
    ],
    rewards: [trainerPokeDollarReward('lass', 13)],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'cerulean-gym-swimmer',
    winMessage: 'Elegant, Beautiful I love it!.',
    trainerClassId: 'swimmer',
    name: 'Gym Trainer Luis',
    description: "Misty's gym trainer is ready to make sure I can handle a real water battle.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'swimmer-f',
    },
    background: '/backgrounds/gym-water.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mistys-lost-earrings',
      },
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-swimmer',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 60,
        formId: '60',
        level: 17,
      },
      {
        speciesId: 118,
        formId: '118',
        level: 17,
      },
    ],
    rewards: [
      trainerPokeDollarReward('swimmer', 17),
      {
        type: 'item',
        targetId: 'water-gem',
        quantity: 1,
        dropChance: 30,
      },
    ],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
    title: 'Gym Trainer',
  },
  {
    id: 'cerulean-gym-misty',
    winMessage: 'CODE AQUAMARINE! CODE AQUAMARINE!',
    trainerClassId: 'gym-leader',
    name: 'Gym Leader Misty',
    description: 'The Cascade Badge is on the line.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-misty',
    },
    background: '/backgrounds/gym-water.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-swimmer',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'skill_level',
        targetId: 'battling',
        count: 10,
      },
    ],
    enemyTeam: [
      {
        speciesId: 120,
        formId: '120',
        level: 19,
        evs: {
          specialAttack: 80,
          speed: 80,
        },
      },
      {
        speciesId: 121,
        formId: '121',
        level: 21,
        evs: {
          specialAttack: 120,
          speed: 120,
        },
        ivs: {
          specialAttack: 20,
          speed: 20,
        },
      },
    ],
    rewards: [
      trainerPokeDollarReward('gym-leader', 21),
      {
        type: 'item',
        targetId: 'badge-kanto-cascade',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'league-ticket',
        quantity: 10,
        dropChance: 100,
      },
    ],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
    title: 'Cascade Badge',
  },
  {
    id: 'cerulean-robbery-rocket',
    winMessage: 'You need to know who you\'re dealing with kid. Sooner or later you\'ll be in over your head.',
    trainerClassId: 'rocket-grunt',
    name: 'Rocket Thief',
    description: 'The Rocket behind the robbed house is not leaving quietly.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cerulean.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'robbed-house',
      },
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-refuse',
      },
      {
        type: 'battle_result',
        targetId: 'cerulean-robbery-rocket',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 66,
        formId: '66',
        level: 17,
        isShadow: true,
      },
      {
        speciesId: 96,
        formId: '96',
        level: 17,
        isShadow: true,
      },
    ],
    rewards: [
      trainerPokeDollarReward('rocket-grunt', 17),
      {
        type: 'item',
        targetId: 'tm-dig',
        quantity: 1,
      },
      {
        type: 'task_complete',
        targetId: 'cerulean-city-complete',
        quantity: 1,
        secret: true,
      },
    ],
    maxPokemon: 2,
    enemyAttackTelegraphChance: 2,
    title: 'Rocket Thief',
  },
]
