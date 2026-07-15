import { FieldObservationConfig } from '../types'

function studyWinRequirement() {
  return {
    type: 'research_encounter_result' as const,
    targetId: 'route-7-field-observation',
    battleStatus: 'win' as const,
    count: 1,
  }
}

function secretStudyTaskReward(taskId: string) {
  return {
    type: 'task_complete' as const,
    targetId: taskId,
    dropChance: 10,
    secret: true,
    requirements: [studyWinRequirement()],
  }
}

export const celadonCityFieldObservationEntries: FieldObservationConfig[] = [
  {
    id: 'route-7-field-observation',
    name: 'Route 7',
    description: 'Study the Pokemon foraging in the grass outside Celadon City.',
    category: 'Kanto',
    subCategory: 'Celadon City',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    background: '/backgrounds/grassy-route.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'underground-path-route-8',
      },
    ],
    rewards: [
      secretStudyTaskReward('route-7-growlithe-study'),
      secretStudyTaskReward('route-7-vulpix-study'),
    ],
    settings: {
      pokemonPool: [
        { speciesId: 16, formId: '16', weight: 20 },
        { speciesId: 17, formId: '17', weight: 10 },
        { speciesId: 43, formId: '43', weight: 15 },
        { speciesId: 69, formId: '69', weight: 15 },
        { speciesId: 56, formId: '56', weight: 15 },
        { speciesId: 58, formId: '58', weight: 10 },
        { speciesId: 37, formId: '37', weight: 10 },
        { speciesId: 63, formId: '63', weight: 5 },
      ],
      levelRange: {
        min: 18,
        max: 22,
      },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  },
]
