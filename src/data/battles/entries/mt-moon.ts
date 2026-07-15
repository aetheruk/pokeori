import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

const rockShieldTmBattleDrop = {
  type: 'item' as const,
  targetId: 'tm-rock-shield',
  quantity: 1,
  dropChance: 1,
}

const mtMoonCoreBattles: BattleConfig[] = [
  {
    id: 'mt-moon-1f',
    name: 'Mt. Moon 1F',
    description: 'A complex cave system rumoured to be home of pokemon from another world.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '41',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 1,
    levelCap: 12,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-pokemon-center',
      },
    ],
    isWildBattle: true,
    enemyTeam: [
      { speciesId: 27, level: { min: 12, max: 12 } }, // Sandshrew
      { speciesId: 35, level: { min: 9, max: 9 } }, // Clefairy
      { speciesId: 41, level: { min: 6, max: 11 } }, // Zubat
      { speciesId: 46, level: { min: 8, max: 8 } }, // Paras
      { speciesId: 74, level: { min: 8, max: 10 } }, // Geodude
    ],
    rewards: [],
    gemConfig: {
      base: {
        min: 1,
        max: 3,
        dropRate: 50,
      },
      shining: {
        min: 1,
        max: 3,
        dropRate: 2,
      },
      pristine: {
        min: 0,
        max: 0,
        dropRate: 0,
      },
    },
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'mt-moon-b1f',
    name: 'Mt. Moon B1F',
    description: 'Deeper down in the cave, so many Zubats!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '46',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 1,
    levelCap: 12,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-a',
      },
    ],
    isWildBattle: true,
    enemyTeam: [
      { speciesId: 35, level: { min: 9, max: 9 } }, // Clefairy
      { speciesId: 41, level: { min: 7, max: 11 } }, // Zubat
      { speciesId: 46, level: { min: 9, max: 9 } }, // Paras
      { speciesId: 74, level: { min: 7, max: 9 } }, // Geodude
    ],
    rewards: [],
    gemConfig: {
      base: {
        min: 1,
        max: 3,
        dropRate: 50,
      },
      shining: {
        min: 1,
        max: 3,
        dropRate: 2,
      },
      pristine: {
        min: 0,
        max: 0,
        dropRate: 0,
      },
    },
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'mt-moon-b2f',
    name: 'Mt. Moon B2F',
    description: 'Somehow the pokemon seem slightly tougher down here...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '35',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 1,
    levelCap: 12,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-e',
      },
    ],
    isWildBattle: true,
    enemyTeam: [
      { speciesId: 35, level: { min: 10, max: 12 } }, // Clefairy
      { speciesId: 41, level: { min: 9, max: 12 } }, // Zubat
      { speciesId: 46, level: { min: 10, max: 12 } }, // Paras
      { speciesId: 74, level: { min: 9, max: 10 } }, // Geodude
    ],
    rewards: [],
    gemConfig: {
      base: {
        min: 1,
        max: 3,
        dropRate: 50,
      },
      shining: {
        min: 1,
        max: 3,
        dropRate: 2,
      },
      pristine: {
        min: 0,
        max: 0,
        dropRate: 0,
      },
    },
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'bug-catcher-kent',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Kent',
    description: 'There doesnt seem to be any bug Pokemon here!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'bug-catcher-kent',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-pokemon-center',
      },
    ],
    criteria: [
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-1f',
        battleStatus: 'win',
        count: 1,
      },
    ],
    enemyTeam: [
      { speciesId: 13, level: 11 }, // Weedle
      { speciesId: 14, level: 11 }, // Kakuna
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 11)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'lass-iris',
    trainerClassId: 'lass',
    name: 'Lass Iris',
    description: 'You can find super rare Pokemon here! I know because I have one!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 3,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'lass-iris',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'bug-catcher-kent',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-1f',
        battleStatus: 'win',
        count: 3,
      },
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-1f',
        battleStatus: 'win',
        count: 3,
      },
    ],
    enemyTeam: [
      { speciesId: 35, level: 14 }, // Clefairy
    ],
    rewards: [trainerPokeDollarReward('lass', 14)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'mt-moon-grunt-1',
    trainerClassId: 'rocket-grunt',
    name: 'Team Rocket Grunt',
    description: 'Hey kid, this fossil survey route is Rocket property now!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 3,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-1',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-b',
      },
    ],
    enemyTeam: [
      { speciesId: 27, level: 11 },
      { speciesId: 19, level: 11 },
      { speciesId: 41, level: 11 },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'hp-up',
        quantity: 1,
      },
      trainerPokeDollarReward('rocket-grunt', 11),
    ],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'super-nerd-jovan',
    trainerClassId: 'super-nerd',
    name: 'Super Nerd Jovan',
    description: 'I cant wait to find some fossils of my own!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'super-nerd',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'super-nerd-jovan',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-dead-end-1',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-1f',
        battleStatus: 'win',
        count: 5,
      },
    ],
    enemyTeam: [
      { speciesId: 81, level: 11 }, // Magnemite
      { speciesId: 100, level: 11 }, // Voltorb
    ],
    rewards: [trainerPokeDollarReward('super-nerd', 11)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'bug-catcher-robby',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Robby',
    description: 'Man, my bug types are getting squished by Geodudes!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'bug-catcher-robby',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'super-nerd-jovan',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-1f',
        battleStatus: 'win',
        count: 6,
      },
    ],
    enemyTeam: [
      { speciesId: 10, level: 10 }, // Caterpie
      { speciesId: 11, level: 10 }, // Metapod
      { speciesId: 10, level: 10 }, // Caterpie
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 10)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'lass-miriam',
    trainerClassId: 'lass',
    name: 'Lass Miriam',
    description: 'Hey do you know where the exit is?',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'lass-miriam',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'bug-catcher-robby',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-1f',
        battleStatus: 'win',
        count: 7,
      },
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-1f',
        battleStatus: 'win',
        count: 5,
      },
    ],
    enemyTeam: [
      { speciesId: 43, level: 11 }, // Oddish
      { speciesId: 69, level: 11 }, // Bellsprout
    ],
    rewards: [trainerPokeDollarReward('lass', 11)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'mt-moon-grunt-2',
    trainerClassId: 'rocket-grunt',
    name: 'Team Rocket Grunt',
    description: 'Aghhh! This place is so confusing, and the boss wants those fossil crates moved now!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-2',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-d',
      },
    ],
    enemyTeam: [
      { speciesId: 41, level: 11 }, // Zubat
      { speciesId: 23, level: 11 }, // Ekans
    ],
    rewards: [trainerPokeDollarReward('rocket-grunt', 11)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'youngster-josh',
    trainerClassId: 'youngster',
    name: 'Youngster Josh',
    description: 'Some people say Rattata are no good for battling.. but some people are idiots.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'youngster-josh',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-dead-end-2',
      },
    ],
    enemyTeam: [
      { speciesId: 19, level: 10 }, // Rattata
      { speciesId: 19, level: 10 }, // Rattata
      { speciesId: 41, level: 10 }, // Zubat
    ],
    rewards: [trainerPokeDollarReward('youngster', 10)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'hiker-marcos',
    trainerClassId: 'hiker',
    name: 'Hiker Marcos',
    description: 'Brock wishes he was as rock hard as me!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 13,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'hiker-marcos',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-hiker-block',
      },
    ],
    enemyTeam: [
      { speciesId: 74, level: 10 }, // Geodude
      { speciesId: 74, level: 10 }, // Geodude
      { speciesId: 95, level: 10 }, // Onix
    ],
    rewards: [trainerPokeDollarReward('hiker', 10)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'mt-moon-grunt-3',
    trainerClassId: 'rocket-grunt',
    name: 'Team Rocket Grunt',
    description: "Stop! You can't go any further. These fossils belong to Team Rocket now!",
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 13,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-3',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-e',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-b2f',
        battleStatus: 'win',
        count: 3,
      },
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-b2f',
        battleStatus: 'win',
        count: 3,
      },
    ],
    enemyTeam: [
      { speciesId: 19, level: 13 }, // Rattata
      { speciesId: 27, level: 13 }, // Sandshrew
    ],
    rewards: [trainerPokeDollarReward('rocket-grunt', 13)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'mt-moon-grunt-4',
    trainerClassId: 'rocket-grunt',
    name: 'Team Rocket Grunt',
    description: 'How did you make it this far? The researcher and the fossil records are not leaving with you!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 13,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-4',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-3',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-b2f',
        battleStatus: 'win',
        count: 5,
      },
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-b2f',
        battleStatus: 'win',
        count: 5,
      },
    ],
    enemyTeam: [
      { speciesId: 19, level: 13 }, // Rattata
      { speciesId: 41, level: 13 }, // Zubat
    ],
    rewards: [trainerPokeDollarReward('rocket-grunt', 13)],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'researcher-miguel',
    trainerClassId: 'super-nerd',
    name: 'Researcher Miguel',
    description:
      'For the low low price of 20 Crystals Researcher Miguel will re-battle me for more cards. Why is it always crystals with these TCG guys.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 2,
    levelCap: 12,
    disableCandyRewards: true,
    generatedXpMultiplier: 0.5,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-fossils',
      },
      {
        type: 'card_collected_set',
        targetId: 'base3',
        count: 62,
        unique: true,
        inverse: true,
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'crystals',
        count: 20,
        consume: true,
      },
    ],
    enemyTeam: [
      { speciesId: 88, level: 12 }, // Magnemite
      { speciesId: 100, level: 12 }, // Voltorb
      { speciesId: 109, level: 12 }, // Koffing
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-base3',
        quantity: 1,
      },
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 45,
        dropChance: 100,
      },
    ],
    enemyAttackTelegraphChance: 2,
  },
]

const mtMoonExpeditionTrainerBattleIds = [
  'bug-catcher-kent',
  'lass-iris',
  'mt-moon-grunt-1',
  'super-nerd-jovan',
  'bug-catcher-robby',
  'lass-miriam',
  'mt-moon-grunt-2',
  'youngster-josh',
  'hiker-marcos',
  'mt-moon-grunt-3',
  'mt-moon-grunt-4',
  'researcher-miguel',
] as const

const mtMoonExpeditionWildBattleIds = ['mt-moon-1f', 'mt-moon-b1f', 'mt-moon-b2f'] as const

const mtMoonExpeditionSpecialBattles: BattleConfig[] = [
  {
    id: 'exp-mt-moon-clefairy-boss',
    name: 'Lass Agent Mira',
    description:
      'The mysterious lass drops the act and reveals herself as the Rocket agent who ran the fossil operation, commanding a Shadow Clefairy.',
    category: 'Secret',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 1,
    levelCap: 18,
    enemyAttackTelegraphChance: 2,
    title: 'Team Rocket Agent',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
    ],
    enemyTeam: [{ speciesId: 35, level: 20, isShadow: true, name: 'Shadow Clefairy' }],
    rewards: [],
  },
  {
    id: 'exp-mt-moon-clefable-boss',
    name: 'Lass Agent Mira',
    description:
      'The mysterious lass drops the act and reveals herself as the Rocket agent who ran the fossil operation, commanding a Shadow Clefable.',
    category: 'Secret',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cave.avif',
    maxPokemon: 1,
    levelCap: 18,
    enemyAttackTelegraphChance: 2,
    title: 'Team Rocket Agent',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
    ],
    enemyTeam: [{ speciesId: 36, level: 20, isShadow: true, name: 'Shadow Clefable' }],
    rewards: [],
  },
]

const mtMoonExpeditionWildBattles = mtMoonExpeditionWildBattleIds.reduce<BattleConfig[]>(
  (battles, battleId) => {
    const sourceBattle = mtMoonCoreBattles.find((battle) => battle.id === battleId)
    if (!sourceBattle) {
      return battles
    }

    battles.push({
      ...sourceBattle,
      id: `exp-${sourceBattle.id}-battle`,
      name: `${sourceBattle.name}`,
      description: `Expedition encounter in ${sourceBattle.name}.`,
      category: 'Secret',
      requirements: [
        {
          type: 'task_completed',
          targetId: 'explore-cerulean-city',
        },
      ],
      rewards: [],
    })

    return battles
  },
  [],
)

const mtMoonExpeditionTrainerBattles = mtMoonExpeditionTrainerBattleIds.reduce<BattleConfig[]>(
  (battles, battleId) => {
    const sourceBattle = mtMoonCoreBattles.find((battle) => battle.id === battleId)
    if (!sourceBattle) {
      return battles
    }

    battles.push({
      ...sourceBattle,
      id: `exp-${sourceBattle.id}`,
      name: `${sourceBattle.name}`,
      description: `Expedition rematch against ${sourceBattle.name}.`,
      category: 'Secret',
      requirements: [
        {
          type: 'task_completed',
          targetId: 'mt-moon-exit',
        },
      ],
      rewards: [],
    })

    return battles
  },
  [],
)

const mtMoonCoreBattlesWithRockShieldDrop = mtMoonCoreBattles.map((battle) => ({
  ...battle,
  rewards: [...(battle.rewards ?? []), rockShieldTmBattleDrop],
}))

export const mtMoonBattles: BattleConfig[] = [
  ...mtMoonCoreBattlesWithRockShieldDrop,
  ...mtMoonExpeditionWildBattles,
  ...mtMoonExpeditionTrainerBattles,
  ...mtMoonExpeditionSpecialBattles,
]
