import { CryConfig } from '../types'

export const ceruleanCitycryEntries: CryConfig[] = [
  {
    id: 'charming-growlithe',
    name: 'A CHARming Growlithe',
    description:
      "Growlithe will lead the way I just need to listen out for Pokemon, If I run out of branches I guess I'll have to go get more",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '58',
    },
    background: '/backgrounds/cave.avif',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'charming-growlithe',
        count: 10,
        inverse: true,
      },
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'charred-hiker-2',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        count: 1,
        consume: true,
        targetId: 'charred-wood',
      },
    ],
    skillXp: { skill: 'researching', level: 15 },
    rewards: [],
    settings: {
      pokemonPool: [4, 41, 42, 95, 46, 27],
      optionsPool: [],
      timeLimit: 20,
      winRate: 3,
      death: true,
    },
  },
]
