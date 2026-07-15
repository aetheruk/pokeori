import { Location } from '../../types'

function caveRewardsWithTotem(totemId: string) {
  return [
    {
      type: 'item' as const,
      targetId: totemId,
      quantity: 1,
      dropChance: 6,
      secret: true,
    },
  ]
}

const oneFEncounters = [
  { speciesId: 74, formId: '74', chance: 35 },
  { speciesId: 41, formId: '41', chance: 30 },
  { speciesId: 56, formId: '56', chance: 15 },
  { speciesId: 66, formId: '66', chance: 15 },
  { speciesId: 95, formId: '95', chance: 5 },
]

const b1fEncounters = [
  { speciesId: 74, formId: '74', chance: 35 },
  { speciesId: 41, formId: '41', chance: 30 },
  { speciesId: 56, formId: '56', chance: 15 },
  { speciesId: 66, formId: '66', chance: 10 },
  { speciesId: 95, formId: '95', chance: 10 },
]

function echoMapWin(targetId: string) {
  return {
    type: 'research_encounter_result' as const,
    targetId,
    battleStatus: 'win' as const,
    count: 1,
  }
}

export const rockTunnelLocations: Location[] = [
  {
    id: 'exp-rock-tunnel-1f-ne',
    name: 'Rock Tunnel 1F Northeast',
    description: 'The first dark stretch of Rock Tunnel, where every sound seems too close.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '74' },
    background: '/backgrounds/cave.avif',
    timer: 18,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: { min: 13, max: 17 },
    requirements: [echoMapWin('rock-tunnel-echo-map-entrance')],
    encounters: oneFEncounters,
    rewards: caveRewardsWithTotem('onix-totem-1'),
  },
  {
    id: 'exp-rock-tunnel-b1f-se',
    name: 'Rock Tunnel B1F Southeast',
    description: 'A lower tunnel where the walls seem to answer every footstep.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '95' },
    background: '/backgrounds/cave.avif',
    timer: 18,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: { min: 13, max: 17 },
    requirements: [echoMapWin('rock-tunnel-echo-map-southeast')],
    encounters: b1fEncounters,
    rewards: caveRewardsWithTotem('onix-totem-2'),
  },
  {
    id: 'exp-rock-tunnel-1f-west',
    name: 'Rock Tunnel 1F West',
    description: 'A looping western corridor marked by scratched stone and loose gravel.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '66' },
    background: '/backgrounds/cave.avif',
    timer: 18,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: { min: 13, max: 17 },
    requirements: [echoMapWin('rock-tunnel-echo-map-west')],
    encounters: oneFEncounters,
    rewards: caveRewardsWithTotem('onix-totem-3'),
  },
  {
    id: 'exp-rock-tunnel-b1f-nw',
    name: 'Rock Tunnel B1F Northwest',
    description: 'A colder branch of the lower tunnel with long shadows on the floor.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '41' },
    background: '/backgrounds/cave.avif',
    timer: 18,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: { min: 13, max: 17 },
    requirements: [echoMapWin('rock-tunnel-echo-map-northwest')],
    encounters: b1fEncounters,
    rewards: caveRewardsWithTotem('onix-totem-4'),
  },
  {
    id: 'exp-rock-tunnel-1f-south',
    name: 'Rock Tunnel 1F South',
    description: 'The southern passage where the air finally starts to move.',
    category: 'Kanto',
    subCategory: 'Rock Tunnel',
    icon: { type: 'pokemon', id: '56' },
    background: '/backgrounds/cave.avif',
    timer: 18,
    shinyChanceModifier: 1,
    catchRateModifier: 1,
    levelRange: { min: 13, max: 17 },
    requirements: [echoMapWin('rock-tunnel-echo-map-final-corridor')],
    encounters: oneFEncounters,
    rewards: caveRewardsWithTotem('onix-totem-5'),
  },
]
