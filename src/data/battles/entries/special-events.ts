import { BattleConfig } from '../../types'

const RANDOM_ROLL_MAX = 1_000_000
const oneIn = (odds: number) => Math.floor(RANDOM_ROLL_MAX / odds)

const legendaryBeastRollRequirement = {
  type: 'roll' as const,
  count: oneIn(256),
}
const clearBellRequirement = { type: 'item_owned' as const, targetId: 'clear-bell' }

type LegendaryBirdBattle = {
  id: string
  name: string
  speciesId: number
  iconPokemon: string
  background: string
  rewardItem: string
}

const legendaryBirdBattles: LegendaryBirdBattle[] = [
  {
    id: 'legendary-bird-moltres',
    name: 'A Flaming Cry!',
    speciesId: 146,
    iconPokemon: '146',
    background: '/backgrounds/volcano.avif',
    rewardItem: 'flaming-branch',
  },
  {
    id: 'legendary-bird-zapdos',
    name: 'A Charged Cry!',
    speciesId: 145,
    iconPokemon: '145',
    background: '/backgrounds/power-plant.avif',
    rewardItem: 'charged-branch',
  },
  {
    id: 'legendary-bird-articuno',
    name: 'A Frozen Cry!',
    speciesId: 144,
    iconPokemon: '144',
    background: '/backgrounds/snow-field.avif',
    rewardItem: 'frozen-branch',
  },
]

export const specialEventBattles: BattleConfig[] = [
  {
    id: 'legendary-beast-entei',
    name: 'A Fiery Roar!',
    description: "Whooooa what is that Pokemon I've never seen anything like it!?",
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon',
      id: '244',
    },
    background: '/backgrounds/rocky-path.avif',
    maxPokemon: 2,
    levelCap: 30,
    isRandomEvent: true,
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    requirements: [
      clearBellRequirement,
      legendaryBeastRollRequirement,
      {
        type: 'battle_result',
        targetId: 'legendary-beast-entei',
        battleStatus: 'win',
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 244,
        level: 30,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'mark-of-fire',
        quantity: 1,
      },
      {
        type: 'xp',
        skill: 'battling',
        quantity: 1000,
        dropChance: 100,
      },
    ],
  },
  {
    id: 'legendary-beast-raikou',
    name: 'A Thunderous Roar!',
    description: "Whooooa what is that Pokemon I've never seen anything like it!?",
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon',
      id: '243',
    },
    background: '/backgrounds/rocky-path.avif',
    maxPokemon: 2,
    levelCap: 30,
    isRandomEvent: true,
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    requirements: [
      clearBellRequirement,
      legendaryBeastRollRequirement,
      {
        type: 'battle_result',
        targetId: 'legendary-beast-raikou',
        battleStatus: 'win',
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 243,
        level: 30,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'mark-of-thunder',
        quantity: 1,
      },
      {
        type: 'xp',
        skill: 'battling',
        quantity: 1000,
        dropChance: 100,
      },
    ],
  },
  {
    id: 'legendary-beast-suicune',
    name: 'A Mystic Breeze!',
    description: "Whooooa what is that Pokemon I've never seen anything like it!?",
    category: 'Special',
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon',
      id: '245',
    },
    background: '/backgrounds/rocky-lake.avif',
    maxPokemon: 2,
    levelCap: 30,
    isRandomEvent: true,
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    requirements: [
      clearBellRequirement,
      legendaryBeastRollRequirement,
      {
        type: 'battle_result',
        targetId: 'legendary-beast-suicune',
        battleStatus: 'win',
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: 245,
        level: 30,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'mark-of-water',
        quantity: 1,
      },
      {
        type: 'xp',
        skill: 'battling',
        quantity: 1000,
        dropChance: 100,
      },
    ],
  },
  ...legendaryBirdBattles.map((entry) => ({
    id: entry.id,
    name: entry.name,
    description: "Whooooa what is that Pokemon I've never seen anything like it!?",
    category: 'Special' as const,
    subCategory: 'Legendary',
    icon: {
      type: 'pokemon' as const,
      id: entry.iconPokemon,
    },
    background: entry.background,
    maxPokemon: 2,
    levelCap: 30,
    isRandomEvent: true,
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    requirements: [
      legendaryBeastRollRequirement,
      {
        type: 'battle_result' as const,
        targetId: entry.id,
        battleStatus: 'win' as const,
        inverse: true,
      },
    ],
    enemyTeam: [
      {
        speciesId: entry.speciesId,
        level: 30,
      },
    ],
    rewards: [
      {
        type: 'item' as const,
        targetId: entry.rewardItem,
        quantity: 1,
      },
      {
        type: 'xp' as const,
        skill: 'battling' as const,
        quantity: 1000,
        dropChance: 100,
      },
    ],
  })),
]
