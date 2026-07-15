import { FieldObservationConfig } from '../types'

const oneFPool = [
  { speciesId: 74, formId: '74', weight: 35 },
  { speciesId: 41, formId: '41', weight: 30 },
  { speciesId: 56, formId: '56', weight: 15 },
  { speciesId: 66, formId: '66', weight: 15 },
  { speciesId: 95, formId: '95', weight: 5 },
]

const b1fPool = [
  { speciesId: 74, formId: '74', weight: 35 },
  { speciesId: 41, formId: '41', weight: 30 },
  { speciesId: 56, formId: '56', weight: 15 },
  { speciesId: 66, formId: '66', weight: 10 },
  { speciesId: 95, formId: '95', weight: 10 },
]

const levelRange = {
  min: 13,
  max: 17,
}

const studySettings = {
  levelRange,
  timeLimit: 12,
  answerTimeLimit: 12,
  difficulty: 3,
}

function echoMapWin(targetId: string) {
  return {
    type: 'research_encounter_result' as const,
    targetId,
    battleStatus: 'win' as const,
    count: 1,
  }
}

function totemDrop(targetId: string) {
  return {
    id: `${targetId}-field-observation`,
    itemId: targetId,
    dropChance: 4,
    secret: true,
  }
}

function studyWinRequirement(studyId: string, wins: number) {
  return {
    type: 'research_encounter_result' as const,
    targetId: studyId,
    battleStatus: 'win' as const,
    count: wins,
  }
}

function secretTaskReward(taskId: string, studyId: string, wins: number) {
  return {
    type: 'task_complete' as const,
    targetId: taskId,
    dropChance: 100,
    secret: true,
    requirements: [studyWinRequirement(studyId, wins)],
  }
}

export const rockTunnelFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'rock-tunnel-1f-ne-field-observation',
    name: 'Rock Tunnel 1F Northeast',
    description: 'Study the first stretch of Rock Tunnel by Flash-light.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '74' },
    background: '/backgrounds/cave.avif',
    requirements: [echoMapWin('rock-tunnel-echo-map-entrance')],
    rewards: [
      secretTaskReward(
        'rock-tunnel-geodude-ladder',
        'rock-tunnel-1f-ne-field-observation',
        10,
      ),
    ],
    settings: {
      ...studySettings,
      pokemonPool: oneFPool,
      itemDrops: [totemDrop('onix-totem-1')],
    },
  },
  {
    id: 'rock-tunnel-b1f-se-field-observation',
    name: 'Rock Tunnel B1F Southeast',
    description: 'Study the lower southeast passage where Onix shadows cross the walls.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '95' },
    background: '/backgrounds/cave.avif',
    requirements: [echoMapWin('rock-tunnel-echo-map-southeast')],
    rewards: [
      secretTaskReward(
        'rock-tunnel-dead-end-supplies',
        'rock-tunnel-b1f-se-field-observation',
        5,
      ),
      secretTaskReward(
        'rock-tunnel-onix-crystal',
        'rock-tunnel-b1f-se-field-observation',
        10,
      ),
    ],
    settings: {
      ...studySettings,
      pokemonPool: b1fPool,
      itemDrops: [totemDrop('onix-totem-2')],
    },
  },
  {
    id: 'rock-tunnel-1f-west-field-observation',
    name: 'Rock Tunnel 1F West',
    description: 'Study the western corridor and the Pokemon following its echoes.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '66' },
    background: '/backgrounds/cave.avif',
    requirements: [echoMapWin('rock-tunnel-echo-map-west')],
    rewards: [
      secretTaskReward(
        'rock-tunnel-escape-rope-cache',
        'rock-tunnel-1f-west-field-observation',
        5,
      ),
      secretTaskReward(
        'rock-tunnel-machop-arm-wrestle',
        'rock-tunnel-1f-west-field-observation',
        10,
      ),
    ],
    settings: {
      ...studySettings,
      pokemonPool: oneFPool,
      itemDrops: [totemDrop('onix-totem-3')],
    },
  },
  {
    id: 'rock-tunnel-b1f-nw-field-observation',
    name: 'Rock Tunnel B1F Northwest',
    description: 'Study the cold northwest passage and the Zubat above it.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '41' },
    background: '/backgrounds/cave.avif',
    requirements: [echoMapWin('rock-tunnel-echo-map-northwest')],
    rewards: [
      secretTaskReward(
        'rock-tunnel-bright-cache',
        'rock-tunnel-b1f-nw-field-observation',
        5,
      ),
      secretTaskReward(
        'rock-tunnel-zubat-again',
        'rock-tunnel-b1f-nw-field-observation',
        10,
      ),
    ],
    settings: {
      ...studySettings,
      pokemonPool: b1fPool,
      itemDrops: [totemDrop('onix-totem-4')],
    },
  },
  {
    id: 'rock-tunnel-1f-south-field-observation',
    name: 'Rock Tunnel 1F South',
    description: 'Study the southern corridor where the air starts to move again.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '56' },
    background: '/backgrounds/cave.avif',
    requirements: [echoMapWin('rock-tunnel-echo-map-final-corridor')],
    rewards: [
      secretTaskReward(
        'rock-tunnel-mushroom-cache',
        'rock-tunnel-1f-south-field-observation',
        5,
      ),
      secretTaskReward(
        'rock-tunnel-mankey-echo',
        'rock-tunnel-1f-south-field-observation',
        10,
      ),
    ],
    settings: {
      ...studySettings,
      pokemonPool: oneFPool,
      itemDrops: [totemDrop('onix-totem-5')],
    },
  },
]
