import type { FieldObservationConfig } from '../types'

const basePool = [
  { speciesId: 29, formId: '29', weight: 12 },
  { speciesId: 32, formId: '32', weight: 12 },
  { speciesId: 46, formId: '46', weight: 12 },
  { speciesId: 48, formId: '48', weight: 12 },
  { speciesId: 102, formId: '102', weight: 12 },
  { speciesId: 111, formId: '111', weight: 10 },
  { speciesId: 113, formId: '113', weight: 4 },
  { speciesId: 115, formId: '115', weight: 8 },
  { speciesId: 123, formId: '123', weight: 5 },
  { speciesId: 127, formId: '127', weight: 5 },
  { speciesId: 128, formId: '128', weight: 8 },
]

function discoveryReward(studyId: string, taskId: string) {
  return {
    type: 'task_complete' as const,
    targetId: taskId,
    dropChance: 15,
    secret: true,
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
  requirements,
  discoveryTask,
}: {
  id: string
  name: string
  description: string
  icon: string
  requirements: FieldObservationConfig['requirements']
  discoveryTask?: string
}): FieldObservationConfig {
  return {
    id,
    name,
    description,
    category: 'Kanto',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari.avif',
    requirements,
    rewards: discoveryTask ? [discoveryReward(id, discoveryTask)] : [],
    skillXp: { skill: 'researching', level: 30 },
    settings: {
      pokemonPool: basePool,
      levelRange: { min: 25, max: 35 },
      timeLimit: 12,
      answerTimeLimit: 12,
      difficulty: 2,
    },
  }
}

const passRequirement = { type: 'item_owned' as const, targetId: 'safari-research-pass' }
const permitRequirement = { type: 'item_owned' as const, targetId: 'safari-catching-permit' }

export const safariZoneFieldObservationEntries: FieldObservationConfig[] = [
  safariStudy({
    id: 'safari-institute-field-observation',
    name: 'Institute Sightings Archive',
    description:
      'Work through the institute’s recent sightings and ranger reports to find where Koga and Janine signed in last.',
    icon: '113',
    requirements: [
      passRequirement,
      { type: 'task_completed', targetId: 'safari-zone-search-begins' },
    ],
    discoveryTask: 'safari-discovery-central',
  }),
  safariStudy({
    id: 'safari-central-field-observation',
    name: 'Central Habitat Survey',
    description:
      'Read the busy central paths for a quieter trail: bent grass, hurried footprints, and a reed tied twice.',
    icon: '111',
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
      'Compare the eastern ponds and boardwalks for the powder trail hidden among the water Pokémon’s movements.',
    icon: '115',
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
      'Examine the shaded western shelters and wooded lanes for a trace the resident Bug Pokémon did not leave.',
    icon: '123',
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
      'Search the rocky northern channels for the final thread of Koga and Janine’s disappearing trail.',
    icon: '128',
    requirements: [
      passRequirement,
      { type: 'task_completed', targetId: 'safari-clue-purple-thread' },
    ],
    discoveryTask: 'safari-discovery-search-complete',
  }),
  safariStudy({
    id: 'safari-area-five-field-observation',
    name: 'Area 5 Habitat Survey',
    description:
      'Document the secluded fifth area, where old service trails and dense growth conceal unusually rare finds.',
    icon: '113',
    requirements: [
      permitRequirement,
      {
        type: 'expedition_result',
        targetId: 'safari-north-expedition',
        expeditionStatus: 'completed',
        count: 5,
      },
    ],
  }),
]
