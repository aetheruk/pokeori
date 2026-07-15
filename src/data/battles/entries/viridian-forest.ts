import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

export const viridianForestBattles: BattleConfig[] = [
  // The Buggy 4 Battles
  {
    id: 'buggy-4-battle-1',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Barry',
    description:
      'The first member of The Buggy 4, I need to defeat them to make it out of the forest!',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
    levelCap: 7,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-4-battle-1',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'buggy-4-discovery',
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 10, level: 5, formId: '10' }, // Caterpie
      { speciesId: 13, level: 5, formId: '13' }, // Weedle
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 5)],
  },
  {
    id: 'buggy-4-battle-2',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Billy',
    description: 'Barry was a breeze, Ill be out of this forest in no time!',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
    levelCap: 8,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-4-battle-2',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'buggy-4-battle-1',
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 11, level: 7, formId: '11' }, // Metapod
      { speciesId: 14, level: 7, formId: '14' }, // Kakuna
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 7)],
  },
  {
    id: 'buggy-4-battle-3',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Berry',
    description: 'Im not sure Berry is a real name...',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 2,
    levelCap: 9,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-4-battle-3',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'buggy-4-battle-2',
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 15, level: 10, formId: '15' }, // Beedrill
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 10)],
  },
  {
    id: 'buggy-4-battle-4',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Benny',
    description: 'Only Benny to go and I can finally leave this place!',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 2,
    levelCap: 9,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-4-battle-4',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'buggy-4-battle-3',
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 123, level: 10, formId: '123' }, // Scyther
    ],
    rewards: [
      trainerPokeDollarReward('bug-catcher', 10),
      {
        type: 'item',
        dropChance: 100, // Guaranteed reward as requested
        targetId: 'binder-base2', // Jungle Binder
        quantity: 1,
      },
    ],
  },
  {
    id: 'buggy-champion',
    trainerClassId: 'bug-catcher',
    name: 'The Buggy Champion',
    description:
      'Ahh a secret champion how unexpected! Well at least I can leave without dealing with them...',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'buggy-4-battle-4',
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 12, level: 12, formId: '12' }, // Butterfree
      { speciesId: 15, level: 12, formId: '15' }, // Beedrill
      { speciesId: 123, level: 13, formId: '123' }, // Scyther
    ],
    rewards: [
      trainerPokeDollarReward('bug-catcher', 13),
      {
        type: 'task_complete',
        targetId: 'aluminium-powder-recipe',
        dropChance: 100,
      },
    ],
  },
  // Expedition-only Bug Gauntlet rematches (no direct battle rewards)
  {
    id: 'bug-gauntlet-barry',
    name: 'Bug Gauntlet: Barry',
    description: 'Gauntlet rematch against Bug Catcher Barry.',
    category: 'Secret',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
    levelCap: 7,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 10, level: 5, formId: '10' },
      { speciesId: 10, level: 5, formId: '13' },
    ],
    rewards: [],
    disableRewards: true,
  },
  {
    id: 'bug-gauntlet-billy',
    name: 'Bug Gauntlet: Billy',
    description: 'Gauntlet rematch against Bug Catcher Billy.',
    category: 'Secret',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
    levelCap: 8,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 11, level: 7, formId: '11' },
      { speciesId: 14, level: 7, formId: '14' },
    ],
    rewards: [],
    disableRewards: true,
  },
  {
    id: 'bug-gauntlet-berry',
    name: 'Bug Gauntlet: Berry',
    description: 'Gauntlet rematch against Bug Catcher Berry.',
    category: 'Secret',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 2,
    levelCap: 9,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [{ speciesId: 15, level: 10, formId: '15' }],
    rewards: [],
    disableRewards: true,
  },
  {
    id: 'bug-gauntlet-benny',
    name: 'Bug Gauntlet: Benny',
    description: 'Gauntlet rematch against Bug Catcher Benny.',
    category: 'Secret',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 2,
    levelCap: 9,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [{ speciesId: 123, level: 10, formId: '123' }],
    rewards: [],
    disableRewards: true,
  },
  {
    id: 'bug-gauntlet-champion',
    name: 'Bug Gauntlet: Champion',
    description: 'Final gauntlet rematch against The Buggy Champion.',
    category: 'Secret',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
    levelCap: 12,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
    ],
    isWildBattle: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [
      { speciesId: 12, level: 12, formId: '12' },
      { speciesId: 15, level: 12, formId: '15' },
      { speciesId: 123, level: 13, formId: '123' },
    ],
    rewards: [],
    disableRewards: true,
  },
  {
    id: 'viridian-forest-battle',
    name: 'Viridian Forest',
    description: 'A deep and sprawling forest, home to many Bug-type Pokémon.',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: {
      type: 'pokemon',
      id: '10',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 1,
    levelCap: 8,
    requirements: [
      {
        type: 'battle_result',
        battleStatus: 'win',
        targetId: 'battle-grumpy-man',
        count: 1,
      },
    ],
    isWildBattle: true,
    enemyTeam: [
      { speciesId: 10, level: { min: 3, max: 6 } }, // Caterpie
      { speciesId: 13, level: { min: 3, max: 6 } }, // Weedle
      { speciesId: 11, level: { min: 3, max: 6 } }, // Metapod
      { speciesId: 14, level: { min: 3, max: 6 } }, // Kakuna
      { speciesId: 25, level: { min: 3, max: 6 } }, // Pikachu
      {
        speciesId: 12,
        level: { min: 3, max: 6 },
        formId: '12',
        requirements: [
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
          },
          {
            type: 'battle_result',
            targetId: 'buggy-champion',
            battleStatus: 'win',
            count: 1,
          },
          {
            type: 'skill_level',
            targetId: 'catching',
            count: 10,
          },
          {
            type: 'skill_level',
            targetId: 'researching',
            count: 10,
          },
        ],
      }, // Butterfree
      {
        speciesId: 15,
        level: { min: 3, max: 6 },
        formId: '15',
        requirements: [
          {
            type: 'task_completed',
            targetId: 'bug-maniac-trade-3',
          },
          {
            type: 'battle_result',
            targetId: 'buggy-champion',
            battleStatus: 'win',
            count: 1,
          },
          {
            type: 'skill_level',
            targetId: 'catching',
            count: 10,
          },
          {
            type: 'skill_level',
            targetId: 'researching',
            count: 10,
          },
        ],
      }, // Beedrill
    ],
    rewards: [
      {
        type: 'task_complete',
        targetId: 'buggy-4-discovery',
        dropChance: 20,
      },
      {
        type: 'item',
        targetId: 'broken-bike',
        dropChance: 1,
        quantity: 1,
        requirements: [
          {
            type: 'item_owned',
            targetId: 'broken-bike',
            inverse: true,
          },
          {
            type: 'task_completed',
            targetId: 'bike-shop-trade',
            inverse: true,
          },
        ],
      },
    ],
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
    enemyAttackTelegraphChance: 30,
  },
]
