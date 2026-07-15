import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

export const pewterCityBattles: BattleConfig[] = [
  {
    id: 'route-2-battle',
    name: 'Route 2',
    description: 'A route connecting Viridian City and Pewter City. Wild Pokémon roam here.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass-v2.png',
    },
    background: '/backgrounds/rocky-path.avif',
    maxPokemon: 1,
    levelCap: 10,
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'viridian-exit',
      },
    ],
    isWildBattle: true,
    enemyTeam: [
      { speciesId: 10, level: { min: 3, max: 7 }, formId: '10' }, // Caterpie
      { speciesId: 13, level: { min: 3, max: 7 }, formId: '13' }, // Weedle
      { speciesId: 16, level: { min: 3, max: 7 }, formId: '16' }, // Pidgey
      { speciesId: 19, level: { min: 3, max: 7 }, formId: '19' }, // Rattata
      { speciesId: 29, level: { min: 3, max: 7 }, formId: '29' }, // NidoranF
      { speciesId: 32, level: { min: 3, max: 7 }, formId: '32' }, // NidoranM
    ],
    rewards: [],
    gemConfig: {
      base: {
        min: 1,
        max: 2,
        dropRate: 30,
      },
      shining: {
        min: 1,
        max: 1,
        dropRate: 1,
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
    id: 'pewter-gym-jerry',
    trainerClassId: 'camper',
    name: 'Pewter Gym: Jerry',
    description: 'Can you work out how to defeat my Ground types with only 1 Pokemon?',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'camper',
    },
    background: '/backgrounds/gym-rock.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-gym',
      },
      {
        type: 'battle_result',
        targetId: 'pewter-gym-jerry',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    maxPokemon: 1,
    levelCap: 10,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 50, level: 11, formId: '50' }, // Diglett
      { speciesId: 27, level: 11, formId: '27' }, // Sandshrew
    ],
    rewards: [trainerPokeDollarReward('camper', 11)],
  },
  {
    id: 'pewter-gym-brock',
    trainerClassId: 'gym-leader',
    name: 'Gym Leader Brock',
    description: 'The Rock Solid Pokemon Trainer! Defeat him to earn the Boulder Badge.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    background: '/backgrounds/gym-rock.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pewter-gym-brock',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'pewter-gym',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'pewter-gym-jerry',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'skill_level',
        targetId: 'battling',
        count: 5,
      },
    ],
    maxPokemon: 3,
    levelCap: 15,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 74, level: 12, formId: '74' }, // Geodude
      { speciesId: 95, level: 14, formId: '95' }, // Onix
    ],
    rewards: [
      trainerPokeDollarReward('gym-leader', 14),
      {
        type: 'item',
        targetId: 'badge-kanto-boulder',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'binder-gym1',
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
  },
  {
    id: 'route-3-battle',
    name: 'Route 3',
    description:
      'A rocky route leading towards Mt. Moon, faint singing can be heard in the distance.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/tall_grass-v2.png',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-roadblock',
      },
    ],
    maxPokemon: 1,
    isWildBattle: true,
    levelCap: 12,
    enemyTeam: [
      { speciesId: 16, level: { min: 6, max: 9 }, formId: '16' }, // Pidgey
      { speciesId: 21, level: { min: 6, max: 9 }, formId: '21' }, // Spearow
      { speciesId: 19, level: { min: 6, max: 9 }, formId: '19' }, // Rattata
      { speciesId: 27, level: { min: 10, max: 12 }, formId: '27' }, // Sandshrew
      { speciesId: 39, level: 10, formId: '39' }, // Jigglypuff
    ],
    rewards: [
    ],
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-3-trainer-1',
    trainerClassId: 'lass',
    name: 'Lass Janice',
    description: 'A trainer looking for a battle on Route 3.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-1',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'pewter-roadblock',
      },
    ],
    maxPokemon: 1,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 16, level: 9, formId: '16' }, // Pidgey
      { speciesId: 16, level: 9, formId: '16' }, // Pidgey
    ],
    rewards: [trainerPokeDollarReward('lass', 9)],
  },
  {
    id: 'route-3-trainer-2',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Colton',
    description: 'He loves bug pokemon!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-2',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-1',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 2,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 10, level: 10, formId: '10' }, // Caterpie
      { speciesId: 13, level: 10, formId: '13' }, // Weedle
      { speciesId: 10, level: 10, formId: '10' }, // Caterpie
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 10)],
  },
  {
    id: 'route-3-trainer-3',
    trainerClassId: 'youngster',
    name: 'Youngster Joey',
    description: 'Shorts are comfy and easy to wear!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-3',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-2',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 1,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 19, level: 11, formId: '19' }, // Rattata
      { speciesId: 23, level: 11, formId: '23' }, // Ekans
    ],
    rewards: [trainerPokeDollarReward('youngster', 11)],
  },
  {
    id: 'route-3-trainer-4',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher Greg',
    description: 'More bugs!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-4',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-3',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 2,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 13, level: 9, formId: '13' }, // Weedle
      { speciesId: 14, level: 9, formId: '14' }, // Kakuna
      { speciesId: 10, level: 9, formId: '10' }, // Caterpie
      { speciesId: 11, level: 9, formId: '11' }, // Metapod
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 9)],
  },
  {
    id: 'route-3-trainer-5',
    trainerClassId: 'youngster',
    name: 'Youngster Calvin',
    description: 'Look at my bird pokemon!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-5',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-4',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 1,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 21, level: 14, formId: '21' }, // Spearow
    ],
    rewards: [trainerPokeDollarReward('youngster', 14)],
  },
  {
    id: 'route-3-trainer-6',
    trainerClassId: 'lass',
    name: 'Lass Sally',
    description: 'Eek! Did you touch me?',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-6',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-5',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 1,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 19, level: 10, formId: '19' }, // Rattata
      { speciesId: 32, level: 10, formId: '32' }, // NidoranM
    ],
    rewards: [trainerPokeDollarReward('lass', 10)],
  },
  {
    id: 'route-3-trainer-7',
    trainerClassId: 'bug-catcher',
    name: 'Bug Catcher James',
    description: 'Have you seen any rare bugs?',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'bug-catcher',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-7',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-6',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 1,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 10, level: 11, formId: '10' }, // Caterpie
      { speciesId: 11, level: 11, formId: '11' }, // Metapod
    ],
    rewards: [trainerPokeDollarReward('bug-catcher', 11)],
  },
  {
    id: 'route-3-trainer-8',
    trainerClassId: 'lass',
    name: 'Lass Robin',
    description: 'My Jigglypuff is so cute!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-8',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-7',
        battleStatus: 'win',
        count: 1,
      },
    ],
    maxPokemon: 2,
    levelCap: 12,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 39, level: 14, formId: '39' }, // Jigglypuff
    ],
    rewards: [trainerPokeDollarReward('lass', 14)],
  },
]
