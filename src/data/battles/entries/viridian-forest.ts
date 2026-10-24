import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

export const viridianForestBattles: BattleConfig[] = [
  {
    id: 'samurai-showdown',
    winMessage: 'What a magnificent battle! You\'re no Metapod anymore. You have emerged a beautiful Butterfree!',
    trainerClassId: 'bug-catcher',
    trainerName: 'Samurai',
    name: 'Samurai Showdown',
    description: 'This may take a while…',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    icon: { type: 'trainer', id: 'bug-catcher' },
    background: '/backgrounds/forest.avif',
    title: 'Samurai Showdown',
    maxPokemon: 1,
    levelCap: 20,
    enemyAttackTelegraphChance: 30,
    requirements: [
      { type: 'task_completed', targetId: 'battle-hardened' },
      {
        type: 'battle_result',
        targetId: 'samurai-showdown',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    criteria: [
      {
        type: 'battle_team',
        battleTeamCheck: {
          position: 1,
          speciesId: 11,
          formId: '11',
        },
      },
    ],
    enemyTeam: [{ speciesId: 11, level: 20, formId: '11' }],
    rewards: [
      {
        type: 'icon',
        targetId: 'metapod',
        quantity: 1,
        dropChance: 100,
      },
    ],
  },
  // The Buggy 4 Battles
  {
    id: 'buggy-4-battle-1',
    winMessage: 'Oh wait, Speed beats Power! I always get that wrong!',
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
    winMessage: 'Stance battles are dumb, My Dad said back in his day he used to battle with his PP.',
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
    winMessage: 'I\'m starting to think maybe we should have varied our Pokemon types.',
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
    winMessage: 'Did you know there\'s a secret area in Viridian Forest... Actually two!',
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
      {
        type: 'item',
        dropChance: 100,
        targetId: 'evolution-catalyst',
        quantity: 1,
      },
      {
        type: 'task_complete',
        dropChance: 100,
        targetId: 'evolution-catalyst-recipe',
      },
    ],
  },
  {
    id: 'buggy-champion',
    winMessage: 'Wow! With skill like that, maybe you should be battling, the real League Champion!',
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
  // Secret Bug Gauntlet rematches used by the repeatable Grid Adventure.
  {
    id: 'bug-gauntlet-barry',
    name: 'Bug Gauntlet: Barry',
    description: 'Gauntlet rematch against Bug Catcher Barry.',
    category: 'Secret',
    gridAdventureOnly: true,
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
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
  },
  {
    id: 'bug-gauntlet-billy',
    name: 'Bug Gauntlet: Billy',
    description: 'Gauntlet rematch against Bug Catcher Billy.',
    category: 'Secret',
    gridAdventureOnly: true,
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 3,
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
  },
  {
    id: 'bug-gauntlet-berry',
    name: 'Bug Gauntlet: Berry',
    description: 'Gauntlet rematch against Bug Catcher Berry.',
    category: 'Secret',
    gridAdventureOnly: true,
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 2,
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
  },
  {
    id: 'bug-gauntlet-benny',
    name: 'Bug Gauntlet: Benny',
    description: 'Gauntlet rematch against Bug Catcher Benny.',
    category: 'Secret',
    gridAdventureOnly: true,
    subCategory: 'Viridian Forest',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/forest.avif',
    maxPokemon: 2,
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
  },
  {
    id: 'bug-gauntlet-paras-day',
    name: 'Alpha Butterfree',
    description: 'A mighty Butterfree sweeps through the forest canopy, its wings stirring up a storm of leaves.',
    category: 'Kanto',
    gridAdventureOnly: true,
    subCategory: 'Viridian Forest',
    icon: { type: 'pokemon', id: '12' },
    background: '/backgrounds/forest.avif',
    maxPokemon: 1,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'time_range',
        timeRange: { start: '06:00', end: '17:59' },
      },
    ],
    isWildBattle: true,
    allowAlpha: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [{ speciesId: 12, level: 12, formId: '12', isAlpha: true }],
    rewards: [{ type: 'icon', targetId: 'pokemon-12', quantity: 1, dropChance: 100 }],
  },
  {
    id: 'bug-gauntlet-venonat-night',
    name: 'Alpha Beedrill',
    description: 'A huge Beedrill darts between the trees, its wings buzzing as it guards the forest at night.',
    category: 'Kanto',
    gridAdventureOnly: true,
    subCategory: 'Viridian Forest',
    icon: { type: 'pokemon', id: '15' },
    background: '/backgrounds/forest.avif',
    maxPokemon: 1,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'buggy-champion',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'time_range',
        timeRange: { start: '18:00', end: '05:59' },
      },
    ],
    isWildBattle: true,
    allowAlpha: false,
    enemyAttackTelegraphChance: 30,
    enemyTeam: [{ speciesId: 15, level: 12, formId: '15', isAlpha: true }],
    rewards: [{ type: 'icon', targetId: 'pokemon-15', quantity: 1, dropChance: 100 }],
  },
  {
    id: 'viridian-forest-battle',
    allowVariantCatches: true,
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
        speciesId: 127,
        level: { min: 3, max: 6 },
        formId: '127',
        requirements: [
          { type: 'task_completed', targetId: 'tree-top-tyke-build' },
        ],
      }, // Pinsir
      {
        speciesId: 123,
        level: { min: 3, max: 6 },
        formId: '123',
        requirements: [
          { type: 'task_completed', targetId: 'tree-top-tyke-build' },
        ],
      }, // Scyther
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
