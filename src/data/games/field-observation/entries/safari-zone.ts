import type {
  FieldObservationConfig,
  FieldObservationPokemonPoolEntry,
} from '../types'

const centralPool: FieldObservationPokemonPoolEntry[] = [
  { speciesId: 102, formId: '102', weight: 18 },
  { speciesId: 111, formId: '111', weight: 17 },
  { speciesId: 29, formId: '29', weight: 14 },
  { speciesId: 32, formId: '32', weight: 14 },
  { speciesId: 48, formId: '48', weight: 10 },
  { speciesId: 33, formId: '33', weight: 8 },
  { speciesId: 47, formId: '47', weight: 8 },
  { speciesId: 30, formId: '30', weight: 5 },
  { speciesId: 46, formId: '46', weight: 2 },
  { speciesId: 114, formId: '114', weight: 1 },
  { speciesId: 123, formId: '123', weight: 1 },
  { speciesId: 127, formId: '127', weight: 1 },
  { speciesId: 113, formId: '113', weight: 1 },
]

const eastPool: FieldObservationPokemonPoolEntry[] = [
  { speciesId: 102, formId: '102', weight: 20 },
  { speciesId: 29, formId: '29', weight: 15 },
  { speciesId: 32, formId: '32', weight: 15 },
  { speciesId: 84, formId: '84', weight: 13 },
  { speciesId: 46, formId: '46', weight: 10 },
  { speciesId: 30, formId: '30', weight: 7 },
  { speciesId: 33, formId: '33', weight: 3 },
  { speciesId: 47, formId: '47', weight: 3 },
  { speciesId: 104, formId: '104', weight: 3 },
  { speciesId: 128, formId: '128', weight: 3 },
  { speciesId: 105, formId: '105', weight: 2 },
  { speciesId: 123, formId: '123', weight: 2 },
  { speciesId: 115, formId: '115', weight: 2 },
  { speciesId: 127, formId: '127', weight: 1 },
  { speciesId: 113, formId: '113', weight: 1 },
]

const westPool: FieldObservationPokemonPoolEntry[] = [
  { speciesId: 102, formId: '102', weight: 20 },
  { speciesId: 29, formId: '29', weight: 15 },
  { speciesId: 32, formId: '32', weight: 15 },
  { speciesId: 84, formId: '84', weight: 13 },
  { speciesId: 48, formId: '48', weight: 10 },
  { speciesId: 33, formId: '33', weight: 6 },
  { speciesId: 128, formId: '128', weight: 6 },
  { speciesId: 30, formId: '30', weight: 3 },
  { speciesId: 49, formId: '49', weight: 3 },
  { speciesId: 104, formId: '104', weight: 3 },
  { speciesId: 105, formId: '105', weight: 2 },
  { speciesId: 115, formId: '115', weight: 2 },
  { speciesId: 114, formId: '114', weight: 1 },
  { speciesId: 127, formId: '127', weight: 1 },
]

const northPool: FieldObservationPokemonPoolEntry[] = [
  { speciesId: 102, formId: '102', weight: 18 },
  { speciesId: 111, formId: '111', weight: 17 },
  { speciesId: 29, formId: '29', weight: 13 },
  { speciesId: 32, formId: '32', weight: 13 },
  { speciesId: 46, formId: '46', weight: 10 },
  { speciesId: 30, formId: '30', weight: 8 },
  { speciesId: 33, formId: '33', weight: 5 },
  { speciesId: 115, formId: '115', weight: 5 },
  { speciesId: 49, formId: '49', weight: 3 },
  { speciesId: 104, formId: '104', weight: 2 },
  { speciesId: 128, formId: '128', weight: 2 },
  { speciesId: 113, formId: '113', weight: 2 },
  { speciesId: 127, formId: '127', weight: 1 },
  { speciesId: 123, formId: '123', weight: 1 },
]

function discoveryReward(studyId: string, taskId: string) {
  return {
    type: 'task_complete' as const,
    targetId: taskId,
    dropChance: 15,
    requirements: [
      {
        type: 'field_research_result' as const,
        targetId: studyId,
        battleStatus: 'win' as const,
        count: 1,
      },
      { type: 'task_completed' as const, targetId: taskId, inverse: true },
    ],
  }
}

function safariStudy({
  id,
  name,
  description,
  icon,
  pokemonPool,
  requirements,
  discoveryTask,
}: {
  id: string
  name: string
  description: string
  icon: string
  pokemonPool: FieldObservationPokemonPoolEntry[]
  requirements: FieldObservationConfig['requirements']
  discoveryTask: string
}): FieldObservationConfig {
  return {
    id,
    name,
    description,
    category: 'Secret',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari-reserve.avif',
    requirements,
    rewards: [discoveryReward(id, discoveryTask)],
    skillXp: { skill: 'researching', level: 30 },
    settings: {
      pokemonPool,
      levelRange: { min: 25, max: 35 },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  }
}

const passRequirement = {
  type: 'item_owned' as const,
  targetId: 'safari-research-pass',
}

export const safariZoneFieldObservationEntries: FieldObservationConfig[] = [
  safariStudy({
    id: 'safari-central-field-observation',
    name: 'Central Habitat Survey',
    description:
      'Study the open grass, busy paths, and mixed habitats around Safari Central.',
    icon: '111',
    pokemonPool: centralPool,
    requirements: [
      passRequirement,
      { type: 'task_completed', targetId: 'safari-clue-last-sign-out' },
    ],
    discoveryTask: 'safari-discovery-east',
  }),
  safariStudy({
    id: 'safari-east-field-observation',
    name: 'Eastern Habitat Survey',
    description:
      'Observe the Pokémon living around the eastern ponds, tall grass, and raised boardwalks.',
    icon: '115',
    pokemonPool: eastPool,
    requirements: [
      passRequirement,
      { type: 'task_completed', targetId: 'safari-clue-reed-twice' },
    ],
    discoveryTask: 'safari-discovery-west',
  }),
  safariStudy({
    id: 'safari-west-field-observation',
    name: 'Western Habitat Survey',
    description:
      'Record the Pokémon sheltering among the western woods and quiet rest houses.',
    icon: '123',
    pokemonPool: westPool,
    requirements: [
      passRequirement,
      { type: 'task_completed', targetId: 'safari-clue-powder-boardwalk' },
    ],
    discoveryTask: 'safari-discovery-north',
  }),
  safariStudy({
    id: 'safari-north-field-observation',
    name: 'Northern Habitat Survey',
    description:
      'Survey the rocky ledges and narrow channels that shape Safari North.',
    icon: '128',
    pokemonPool: northPool,
    requirements: [
      passRequirement,
      { type: 'task_completed', targetId: 'safari-clue-purple-thread' },
    ],
    discoveryTask: 'safari-discovery-search-complete',
  }),
]
