import { SilhouetteConfig } from '../types'

const FOSSIL_RESEARCH_FORM_IDS = ['142', '140', '141', '138', '139']

const fossilResearchIncompleteRequirement = (formId: string) => ({
  type: 'research_level' as const,
  targetId: formId,
  count: 1,
  inverse: true,
})

const fossilCollectionIncompleteRequirement = () => ({
  type: 'card_collected_set' as const,
  targetId: 'base3',
  count: 62,
  unique: true,
  inverse: true,
})

export const pewterCitysilhouetteEntries: SilhouetteConfig[] = [
  {
    id: 'pewter-fossil-identify',
    name: 'Identifying Fossil Pokemon',
    description: 'Help Identify these ancient Pokemon!',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/museum.avif',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pewter-research-museum',
      },
      {
        type: 'any_of',
        label: 'Fossil research or collection remains',
        conditions: [
          fossilCollectionIncompleteRequirement(),
          ...FOSSIL_RESEARCH_FORM_IDS.map((formId) =>
            fossilResearchIncompleteRequirement(formId),
          ),
        ],
      },
    ],
    rewards: [
      ...FOSSIL_RESEARCH_FORM_IDS.map((formId) => ({
        type: 'pokemon_research_xp' as const,
        targetId: formId,
        quantity: 1,
        dropChance: 100,
        requirements: [fossilResearchIncompleteRequirement(formId)],
      })),
      {
        type: 'item',
        targetId: 'pack-base3',
        quantity: 1,
        dropChance: 100,
        requirements: [
          {
            type: 'item_owned',
            targetId: 'binder-base3',
          },
          fossilCollectionIncompleteRequirement(),
        ],
      },
    ],
    skillXp: { skill: 'researching', level: 10 },
    settings: {
      pokemonPool: FOSSIL_RESEARCH_FORM_IDS.map(Number),
      optionsPool: [],
      winRate: 3,
    },
  },
]
