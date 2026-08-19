import { IdentifyConfig } from '../types'

export const fuchsiaCityidentifyEntries: IdentifyConfig[] = [
  {
    id: 'fuchsia-research-institute-identify',
    name: 'Chartered Researcher Examination',
    description:
      'Record twenty correct identifications from the Institute’s Safari records within the field time limit.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: { type: 'trainer', id: 'researcher-f' },
    background: '/backgrounds/lab.avif',
    requirements: [
      { type: 'task_completed', targetId: 'fuchsia-research-institute-exam-briefing' },
      { type: 'skill_level', targetId: 'researching', count: 30 },
      {
        type: 'game_result',
        targetId: 'fuchsia-research-institute-identify',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    rewards: [],
    skillXp: { skill: 'researching', level: 30 },
    settings: {
      pokemonPool: [29, 32, 46, 48, 102, 111, 113, 115, 123, 127, 128],
      optionsPool: [],
      optionCount: 6,
      timeLimit: 35,
      winRate: 20,
    },
  },
]
