import { BattleConfig } from '../../types'
import { trainerPokeDollarReward } from '../trainer-payouts'

function unbeatenBattle(id: string) {
  return {
    type: 'battle_result' as const,
    targetId: id,
    battleStatus: 'win' as const,
    count: 1,
    inverse: true,
  }
}

const route8OpenRoadRequirement = {
  type: 'task_completed' as const,
  targetId: 'route-8-open-road',
}

const route8TrainerRequirements = (battleId: string): BattleConfig['requirements'] => [
  route8OpenRoadRequirement,
  unbeatenBattle(battleId),
]

const route8TrainerBattle = ({
  id,
  trainerClassId,
  trainerName,
  name,
  description,
  iconId = trainerClassId,
  enemyTeam,
  payoutClassId = trainerClassId,
  payoutLevel,
  maxPokemon = 3,
}: {
  id: string
  trainerClassId: NonNullable<BattleConfig['trainerClassId']>
  trainerName: string
  name: string
  description: string
  iconId?: string
  enemyTeam: NonNullable<BattleConfig['enemyTeam']>
  payoutClassId?: Parameters<typeof trainerPokeDollarReward>[0]
  payoutLevel: number
  maxPokemon?: number
}): BattleConfig => ({
  id,
  trainerClassId,
  trainerName,
  name,
  description,
  category: 'Kanto',
  subCategory: 'Lavender Town',
  icon: {
    type: 'trainer',
    id: iconId,
  },
  background: '/backgrounds/grassy-route.avif',
  requirements: route8TrainerRequirements(id),
  enemyTeam,
  rewards: [trainerPokeDollarReward(payoutClassId, payoutLevel)],
  maxPokemon,
  levelCap: 30,
  enemyAttackTelegraphChance: 2,
})

const route8Battles: BattleConfig[] = [
  {
    id: 'route-8-battle',
    name: 'Route 8',
    description: 'Wild Pokemon prowl the long grass on the road to Celadon.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '37',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [route8OpenRoadRequirement],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [
      { speciesId: 16, formId: '16', level: { min: 18, max: 22 } },
      { speciesId: 17, formId: '17', level: { min: 18, max: 22 } },
      { speciesId: 52, formId: '52', level: { min: 18, max: 22 } },
      { speciesId: 56, formId: '56', level: { min: 18, max: 22 } },
      { speciesId: 58, formId: '58', level: { min: 18, max: 22 } },
      { speciesId: 37, formId: '37', level: { min: 18, max: 22 } },
      { speciesId: 63, formId: '63', level: { min: 18, max: 22 } },
      { speciesId: 64, formId: '64', level: { min: 18, max: 22 } },
    ],
    rewards: [],
    maxPokemon: 1,
    levelCap: 30,
  },
  route8TrainerBattle({
    id: 'route-8-lass-julia',
    trainerClassId: 'lass',
    trainerName: 'Julia',
    name: 'Lass Julia',
    description: 'A Route 8 Lass waits near the eastern grass.',
    enemyTeam: [
      { speciesId: 35, formId: '35', level: 22 },
      { speciesId: 35, formId: '35', level: 22 },
    ],
    payoutLevel: 22,
  }),
  route8TrainerBattle({
    id: 'route-8-gamer-rich',
    trainerClassId: 'gamer',
    trainerName: 'Rich',
    name: 'Gamer Rich',
    description: 'A Route 8 Gamer has a fiery pair ready to battle.',
    enemyTeam: [
      { speciesId: 58, formId: '58', level: 24 },
      { speciesId: 37, formId: '37', level: 24 },
    ],
    payoutLevel: 24,
  }),
  route8TrainerBattle({
    id: 'route-8-super-nerd-glenn',
    trainerClassId: 'super-nerd',
    trainerName: 'Glenn',
    name: 'Super Nerd Glenn',
    description: 'A Route 8 Super Nerd brings a sticky Poison-type lineup.',
    enemyTeam: [
      { speciesId: 88, formId: '88', level: 22 },
      { speciesId: 89, formId: '89', level: 22 },
      { speciesId: 88, formId: '88', level: 22 },
    ],
    payoutLevel: 22,
  }),
  route8TrainerBattle({
    id: 'route-8-twins-eli-anne',
    trainerClassId: 'twins',
    trainerName: 'Eli & Anne',
    name: 'Twins Eli & Anne',
    description: 'The Route 8 Twins challenge you together.',
    enemyTeam: [
      { speciesId: 35, formId: '35', level: 22 },
      { speciesId: 39, formId: '39', level: 22 },
    ],
    payoutLevel: 22,
  }),
  route8TrainerBattle({
    id: 'route-8-lass-paige',
    trainerClassId: 'lass',
    trainerName: 'Paige',
    name: 'Lass Paige',
    description: 'A Route 8 Lass shows off her Nidoran family training.',
    enemyTeam: [
      { speciesId: 29, formId: '29', level: 23 },
      { speciesId: 30, formId: '30', level: 23 },
    ],
    payoutLevel: 23,
  }),
  route8TrainerBattle({
    id: 'route-8-super-nerd-leslie',
    trainerClassId: 'super-nerd',
    trainerName: 'Leslie',
    name: 'Super Nerd Leslie',
    description: 'A Route 8 Super Nerd relies on a single well-trained Koffing.',
    enemyTeam: [{ speciesId: 109, formId: '109', level: 26 }],
    payoutLevel: 26,
  }),
  route8TrainerBattle({
    id: 'route-8-lass-andrea',
    trainerClassId: 'lass',
    trainerName: 'Andrea',
    name: 'Lass Andrea',
    description: 'A Route 8 Lass has trained a trio of Meowth.',
    enemyTeam: [
      { speciesId: 52, formId: '52', level: 24 },
      { speciesId: 52, formId: '52', level: 24 },
      { speciesId: 52, formId: '52', level: 24 },
    ],
    payoutLevel: 24,
  }),
  route8TrainerBattle({
    id: 'route-8-lass-megan',
    trainerClassId: 'lass',
    trainerName: 'Megan',
    name: 'Lass Megan',
    description: 'A Route 8 Lass brings a wide team of small Pokemon.',
    enemyTeam: [
      { speciesId: 16, formId: '16', level: 19 },
      { speciesId: 19, formId: '19', level: 19 },
      { speciesId: 32, formId: '32', level: 19 },
      { speciesId: 52, formId: '52', level: 19 },
      { speciesId: 25, formId: '25', level: 19 },
    ],
    payoutLevel: 19,
    maxPokemon: 5,
  }),
  route8TrainerBattle({
    id: 'route-8-biker-jaren',
    trainerClassId: 'cyclist-m',
    trainerName: 'Jaren',
    name: 'Biker Jaren',
    description: 'A Route 8 Biker blocks the path with a pair of Grimer.',
    enemyTeam: [
      { speciesId: 88, formId: '88', level: 24 },
      { speciesId: 88, formId: '88', level: 24 },
    ],
    payoutLevel: 24,
  }),
  route8TrainerBattle({
    id: 'route-8-biker-ricardo',
    trainerClassId: 'cyclist-m',
    trainerName: 'Ricardo',
    name: 'Biker Ricardo',
    description: 'A Route 8 Biker rides with Koffing and Grimer.',
    enemyTeam: [
      { speciesId: 109, formId: '109', level: 22 },
      { speciesId: 109, formId: '109', level: 22 },
      { speciesId: 88, formId: '88', level: 23 },
    ],
    payoutLevel: 23,
  }),
  route8TrainerBattle({
    id: 'route-8-gamer-stan',
    trainerClassId: 'gamer',
    trainerName: 'Stan',
    name: 'Gamer Stan',
    description: 'A Route 8 Gamer is betting on Poliwag and Poliwhirl.',
    enemyTeam: [
      { speciesId: 60, formId: '60', level: 22 },
      { speciesId: 60, formId: '60', level: 22 },
      { speciesId: 61, formId: '61', level: 22 },
    ],
    payoutLevel: 22,
  }),
  route8TrainerBattle({
    id: 'route-8-super-nerd-aidan',
    trainerClassId: 'super-nerd',
    trainerName: 'Aidan',
    name: 'Super Nerd Aidan',
    description: 'A Route 8 Super Nerd tests electric and poison experiments.',
    enemyTeam: [
      { speciesId: 100, formId: '100', level: 20 },
      { speciesId: 100, formId: '100', level: 20 },
      { speciesId: 81, formId: '81', level: 20 },
      { speciesId: 109, formId: '109', level: 20 },
    ],
    payoutLevel: 20,
    maxPokemon: 4,
  }),
]

const lavenderTownGate = {
  type: 'task_completed' as const,
  targetId: 'rock-tunnel-exit',
}

export const lavenderTownBattles: BattleConfig[] = [
  ...route8Battles,
  {
    id: 'route-10-south-picnicker-carol',
    trainerClassId: 'picnicker',
    trainerName: 'Carol',
    name: 'Picnicker Carol',
    description: 'A Picnicker waits on the shorter southern path out of Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'picnicker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [lavenderTownGate, unbeatenBattle('route-10-south-picnicker-carol')],
    enemyTeam: [
      { speciesId: 16, formId: '16', level: 21 },
      { speciesId: 17, formId: '17', level: 21 },
    ],
    rewards: [trainerPokeDollarReward('picnicker', 21)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-10-south-hiker-clark',
    trainerClassId: 'hiker',
    trainerName: 'Clark',
    name: 'Hiker Clark',
    description: 'A Hiker blocks the rocky southern trail toward Lavender Town.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [lavenderTownGate, unbeatenBattle('route-10-south-hiker-clark')],
    enemyTeam: [
      { speciesId: 74, formId: '74', level: 21 },
      { speciesId: 95, formId: '95', level: 21 },
    ],
    rewards: [trainerPokeDollarReward('hiker', 21)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-10-south-hiker-trent',
    trainerClassId: 'hiker',
    trainerName: 'Trent',
    name: 'Hiker Trent',
    description: 'A Hiker with a sturdy cave team patrols Route 10 south.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [lavenderTownGate, unbeatenBattle('route-10-south-hiker-trent')],
    enemyTeam: [
      { speciesId: 95, formId: '95', level: 19 },
      { speciesId: 75, formId: '75', level: 19 },
    ],
    rewards: [trainerPokeDollarReward('hiker', 19)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-10-south-pokemaniac-herman',
    trainerClassId: 'pokemaniac',
    trainerName: 'Herman',
    name: 'Pokemaniac Herman',
    description: 'A Pokemaniac studies unusual Pokemon on Route 10 south.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'pokemaniac',
    },
    background: '/backgrounds/rocky-path.avif',
    requirements: [lavenderTownGate, unbeatenBattle('route-10-south-pokemaniac-herman')],
    enemyTeam: [
      { speciesId: 104, formId: '104', level: 20 },
      { speciesId: 79, formId: '79', level: 20 },
    ],
    rewards: [trainerPokeDollarReward('pokemaniac', 20)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-12-fisherman-ned',
    trainerClassId: 'fisherman',
    trainerName: 'Ned',
    name: 'Fisherman Ned',
    description: 'A Fisherman tests anyone heading south from Lavender along Silence Bridge.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'fisherman',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'lavender-silence-bridge-rumour',
      },
      unbeatenBattle('route-12-fisherman-ned'),
    ],
    enemyTeam: [
      { speciesId: 118, formId: '118', level: 22 },
      { speciesId: 60, formId: '60', level: 22 },
      { speciesId: 118, formId: '118', level: 22 },
    ],
    rewards: [trainerPokeDollarReward('fisherman', 22)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-12-fisherman-chip',
    trainerClassId: 'fisherman',
    trainerName: 'Chip',
    name: 'Fisherman Chip',
    description: 'A second Fisherman keeps watch on the northern stretch of Route 12.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'fisherman',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-fisherman-ned',
        battleStatus: 'win',
        count: 1,
      },
      unbeatenBattle('route-12-fisherman-chip'),
    ],
    enemyTeam: [
      { speciesId: 72, formId: '72', level: 24 },
      { speciesId: 118, formId: '118', level: 24 },
    ],
    rewards: [trainerPokeDollarReward('fisherman', 24)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-12-fisherman-hank',
    trainerClassId: 'fisherman',
    trainerName: 'Hank',
    name: 'Fisherman Hank',
    description: 'A powerful Fisherman waits deeper along Silence Bridge.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'fisherman',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-fisherman-chip',
        battleStatus: 'win',
        count: 1,
      },
      unbeatenBattle('route-12-fisherman-hank'),
    ],
    enemyTeam: [{ speciesId: 118, formId: '118', level: 27 }],
    rewards: [trainerPokeDollarReward('fisherman', 27)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-12-fisherman-elliot',
    trainerClassId: 'fisherman',
    trainerName: 'Elliot',
    name: 'Fisherman Elliot',
    description: 'A Fisherman near the sleeping Snorlax is the last clear path south.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'fisherman',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-fisherman-hank',
        battleStatus: 'win',
        count: 1,
      },
      unbeatenBattle('route-12-fisherman-elliot'),
    ],
    enemyTeam: [
      { speciesId: 60, formId: '60', level: 21 },
      { speciesId: 90, formId: '90', level: 21 },
      { speciesId: 118, formId: '118', level: 21 },
      { speciesId: 116, formId: '116', level: 21 },
    ],
    rewards: [trainerPokeDollarReward('fisherman', 21)],
    maxPokemon: 3,
    levelCap: 25,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-12-nido-fan-battle',
    trainerClassId: 'old-couple',
    trainerName: 'Nido Fans',
    name: 'Nido Fan Reunion',
    description:
      'The Route 5 sketcher and Route 11 writer put their King-and-Queen battle notes into practice.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '31',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-12-nido-fan-wrapup',
      },
      unbeatenBattle('route-12-nido-fan-battle'),
    ],
    enemyTeam: [
      { speciesId: 34, formId: '34', level: 35 },
      { speciesId: 31, formId: '31', level: 35 },
    ],
    rewards: [trainerPokeDollarReward('old-couple', 35)],
    maxPokemon: 3,
    levelCap: 35,
    enemyAttackTelegraphChance: 2,
  },
  {
    id: 'route-12-furious-snorlax',
    name: 'Furious Snorlax',
    description: 'The woken Snorlax is furious and blocking Route 12.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '143',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-furious-snorlax',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        targetId: 'route-12-sleeping-snorlax',
      },
    ],
    isWildBattle: true,
    enemyAttackTelegraphChance: 2,
    enemyTeam: [{ speciesId: 143, formId: '143', level: 30 }],
    rewards: [],
    maxPokemon: 1,
    levelCap: 30,
  },
]
