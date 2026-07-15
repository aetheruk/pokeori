import { IdentifyConfig } from '../types'

const workingInTheLabPokemonPool = [1, 4, 7, 10, 13, 16, 19, 21, 25]
const workingInTheLabStarterResearchXpRewards = [1, 4, 7].map((pokemonId) => ({
  type: 'pokemon_research_xp' as const,
  targetId: pokemonId.toString(),
  quantity: 2,
  dropChance: 100,
  requirements: [
    {
      type: 'research_level' as const,
      targetId: pokemonId.toString(),
      count: 1,
      inverse: true,
    },
  ],
}))

export const palletTownidentifyEntries: IdentifyConfig[] = [
  // Pallet Town - Brock's Research
  {
    id: 'tutorial-identify',
    overrides: '',
    name: "Brock's Research",
    description:
      "Time to take a look at the list Brock gave me, It would be handy to know what I'm going to be up against.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'tutorial-identify',
        count: 1,
        inverse: true,
      },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-11',
      },
    ],
    skillXp: { skill: 'researching', level: 1 },
    rewards: [],
    settings: {
      pokemonPool: [41, 50, 74, 95],
      optionsPool: [],
      timeLimit: 35,
      winRate: 10,
    },
  },
  {
    id: 'first-research-job',
    name: 'Working in the Lab',
    description:
      'Time to help with the research on the Pokedex! 50 PokeDollars for every program run, not bad!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'researcher-life-1',
      },
    ],
    rewards: [
      {
        type: 'item',
        dropChance: 100,
        targetId: 'electric-component-t1',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 100,
        targetId: 'metal-scrap-t1',
        quantity: 1,
      },
      {
        type: 'item',
        dropChance: 10,
        targetId: 'research-kit',
        quantity: 1,
        requirements: [{ type: 'skill_level', targetId: 'researching', count: 35 }],
      },
      {
        type: 'currency',
        dropChance: 100,
        targetId: 'pokedollars',
        quantity: 50,
      },
      ...workingInTheLabStarterResearchXpRewards,
    ],
    skillXp: { skill: 'researching', level: 2 },
    settings: {
      pokemonPool: workingInTheLabPokemonPool,
      optionsPool: [],
      timeLimit: 25,
      winRate: 10,
    },
  },
  {
    id: 'first-research-job-ex',
    name: 'Working in the Lab EX',
    description:
      'The lab has a bigger Pokedex batch ready to process. More Pokemon, more pressure, and better research tools on the line.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/lab.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        targetId: 'first-research-job',
        count: 10,
      },
    ],
    rewards: [
      {
        type: 'item',
        dropChance: 100,
        targetId: 'electric-component-t1',
        quantity: 2,
      },
      {
        type: 'item',
        dropChance: 100,
        targetId: 'metal-scrap-t1',
        quantity: 2,
      },
      {
        type: 'item',
        dropChance: 22,
        targetId: 'research-kit',
        quantity: 1,
        requirements: [{ type: 'skill_level', targetId: 'researching', count: 35 }],
      },
      {
        type: 'currency',
        dropChance: 100,
        targetId: 'pokedollars',
        quantity: 125,
      },
      ...workingInTheLabStarterResearchXpRewards,
    ],
    skillXp: { skill: 'researching', level: 5 },
    settings: {
      pokemonPool: workingInTheLabPokemonPool,
      optionsPool: [],
      timeLimit: 50,
      winRate: 25,
    },
  },
]
