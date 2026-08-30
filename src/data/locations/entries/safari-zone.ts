import { Location } from '../../types'

const permitRequirement = {
  type: 'item_owned' as const,
  targetId: 'safari-catching-permit',
}

const strangeSightingsRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-strange-sightings',
}

const chanseyAvailabilityRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-catch-partner-chansey',
}

function safariArea({
  id,
  name,
  description,
  icon,
  encounters,
  requirements = [],
}: {
  id: string
  name: string
  description: string
  icon: string
  encounters: Location['encounters']
  requirements?: Location['requirements']
}): Location {
  return {
    id,
    name,
    description,
    category: 'Secret',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari-reserve.avif',
    encounterMode: 'safari',
    expeditionOnly: true,
    timer: 45,
    fleeRate: 14,
    levelRange: { min: 25, max: 35 },
    requirements: [permitRequirement, ...requirements],
    encounters,
    rewards: [],
    skillXp: { skill: 'catching', level: 32 },
  }
}

const expeditionSafariLocations: Location[] = [
  safariArea({
    id: 'safari-central-catch',
    name: 'Safari Central',
    description:
      'Open grass and well-travelled paths make Pokémon easier to spot here. Choose a berry before committing to a throw.',
    icon: '111',
    encounters: [
      { speciesId: 102, formId: '102', chance: 18 },
      { speciesId: 111, formId: '111', chance: 17 },
      { speciesId: 29, formId: '29', chance: 14 },
      { speciesId: 32, formId: '32', chance: 14 },
      { speciesId: 48, formId: '48', chance: 10 },
      { speciesId: 33, formId: '33', chance: 8 },
      { speciesId: 47, formId: '47', chance: 8 },
      { speciesId: 30, formId: '30', chance: 5 },
      { speciesId: 46, formId: '46', chance: 2 },
      { speciesId: 114, formId: '114', chance: 1 },
      { speciesId: 123, formId: '123', chance: 1 },
      { speciesId: 127, formId: '127', chance: 1 },
      {
        speciesId: 113,
        formId: '113',
        chance: 1,
        requirements: [chanseyAvailabilityRequirement],
      },
    ],
  }),
  safariArea({
    id: 'safari-east-catch',
    name: 'Safari East',
    description:
      'Tall grass crowds the eastern ponds and raised boardwalks. An Oran or Tamato Berry may help before you throw.',
    icon: '115',
    encounters: [
      { speciesId: 102, formId: '102', chance: 20 },
      { speciesId: 29, formId: '29', chance: 15 },
      { speciesId: 32, formId: '32', chance: 15 },
      { speciesId: 84, formId: '84', chance: 13 },
      { speciesId: 46, formId: '46', chance: 10 },
      { speciesId: 30, formId: '30', chance: 7 },
      { speciesId: 33, formId: '33', chance: 3 },
      { speciesId: 47, formId: '47', chance: 3 },
      { speciesId: 104, formId: '104', chance: 3 },
      { speciesId: 128, formId: '128', chance: 2 },
      { speciesId: 105, formId: '105', chance: 2 },
      { speciesId: 123, formId: '123', chance: 2 },
      { speciesId: 115, formId: '115', chance: 2 },
      { speciesId: 127, formId: '127', chance: 1 },
      {
        speciesId: 128,
        formId: '10252',
        chance: 1,
        requirements: [strangeSightingsRequirement],
      },
      {
        speciesId: 113,
        formId: '113',
        chance: 1,
        requirements: [chanseyAvailabilityRequirement],
      },
    ],
  }),
  safariArea({
    id: 'safari-west-catch',
    name: 'Safari West',
    description:
      'Wooded lanes and abandoned shelters give wary Pokémon plenty of cover. Choose your berry carefully before the throw.',
    icon: '123',
    encounters: [
      { speciesId: 102, formId: '102', chance: 20 },
      { speciesId: 29, formId: '29', chance: 15 },
      { speciesId: 32, formId: '32', chance: 15 },
      { speciesId: 84, formId: '84', chance: 13 },
      { speciesId: 48, formId: '48', chance: 10 },
      { speciesId: 33, formId: '33', chance: 6 },
      { speciesId: 128, formId: '128', chance: 5 },
      { speciesId: 30, formId: '30', chance: 3 },
      { speciesId: 49, formId: '49', chance: 3 },
      { speciesId: 104, formId: '104', chance: 3 },
      { speciesId: 105, formId: '105', chance: 2 },
      { speciesId: 115, formId: '115', chance: 2 },
      { speciesId: 114, formId: '114', chance: 1 },
      { speciesId: 127, formId: '127', chance: 1 },
      {
        speciesId: 128,
        formId: '10251',
        chance: 1,
        requirements: [strangeSightingsRequirement],
      },
    ],
  }),
  safariArea({
    id: 'safari-north-catch',
    name: 'Safari North',
    description:
      'Rocky ledges funnel Pokémon through narrow northern channels. Pick a berry and time the throw before they bolt.',
    icon: '128',
    encounters: [
      { speciesId: 102, formId: '102', chance: 15 },
      { speciesId: 111, formId: '111', chance: 17 },
      { speciesId: 29, formId: '29', chance: 13 },
      { speciesId: 32, formId: '32', chance: 13 },
      { speciesId: 46, formId: '46', chance: 10 },
      { speciesId: 30, formId: '30', chance: 8 },
      { speciesId: 33, formId: '33', chance: 5 },
      { speciesId: 115, formId: '115', chance: 5 },
      { speciesId: 49, formId: '49', chance: 3 },
      { speciesId: 104, formId: '104', chance: 2 },
      { speciesId: 128, formId: '128', chance: 4 },
      {
        speciesId: 113,
        formId: '113',
        chance: 2,
        requirements: [chanseyAvailabilityRequirement],
      },
      { speciesId: 127, formId: '127', chance: 1 },
      { speciesId: 123, formId: '123', chance: 1 },
      {
        speciesId: 128,
        formId: '10250',
        chance: 1,
        requirements: [strangeSightingsRequirement],
      },
    ],
  }),
  safariArea({
    id: 'safari-grand-finale-catch',
    name: 'Safari Reserve',
    description:
      'A quiet stretch of reserve habitat where Pokémon move through the grass and brush. Take your time and make the throw count.',
    icon: '113',
    encounters: [
      {
        speciesId: 113,
        formId: '113',
        chance: 20,
        requirements: [chanseyAvailabilityRequirement],
      },
      { speciesId: 115, formId: '115', chance: 20 },
      { speciesId: 128, formId: '128', chance: 20 },
      { speciesId: 123, formId: '123', chance: 20 },
      { speciesId: 127, formId: '127', chance: 20 },
      { speciesId: 128, formId: '10250', chance: 20, requirements: [strangeSightingsRequirement] },
      { speciesId: 128, formId: '10251', chance: 20, requirements: [strangeSightingsRequirement] },
      { speciesId: 128, formId: '10252', chance: 20, requirements: [strangeSightingsRequirement] },
    ],
  }),
]

const wardenPermitRequirement = {
  type: 'task_completed' as const,
  targetId: 'safari-wardens-permit',
}

const standardSafariAreaDefinitions = [
  {
    sourceId: 'safari-central-catch',
    id: 'safari-central-standard-catch',
    name: 'Central Habitat Survey',
    description: 'Enter Safari Central and catch Pokémon from the open grass and mixed habitats with reserve Safari supplies.',
  },
  {
    sourceId: 'safari-east-catch',
    id: 'safari-east-standard-catch',
    name: 'Eastern Habitat Survey',
    description: 'Enter the eastern ponds, tall grass, and raised boardwalks to catch Pokémon with reserve Safari supplies.',
  },
  {
    sourceId: 'safari-west-catch',
    id: 'safari-west-standard-catch',
    name: 'Western Habitat Survey',
    description: 'Enter the western woods and quiet rest houses to catch Pokémon with reserve Safari supplies.',
  },
  {
    sourceId: 'safari-north-catch',
    id: 'safari-north-standard-catch',
    name: 'Northern Habitat Survey',
    description: 'Enter the rocky ledges and narrow channels around Safari North to catch Pokémon with reserve Safari supplies.',
  },
] as const

const standardSafariLocations: Location[] = standardSafariAreaDefinitions.map(
  ({ sourceId, id, name, description }) => {
    const source = expeditionSafariLocations.find((location) => location.id === sourceId)
    if (!source) throw new Error(`Missing Safari source location: ${sourceId}`)

    const { expeditionOnly: _expeditionOnly, ...standardSource } = source

    return {
      ...standardSource,
      id,
      name,
      description,
      category: 'Kanto',
      requirements: [wardenPermitRequirement],
      criteria: [
        {
          type: 'currency_owned',
          targetId: 'pokedollars',
          count: 200,
          consume: true,
        },
      ],
      safariBallAllowance: 5,
    }
  },
)

export const safariZoneLocations: Location[] = [
  ...expeditionSafariLocations,
  ...standardSafariLocations,
]
