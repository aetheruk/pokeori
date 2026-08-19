import { Location } from '../../types'

const permitRequirement = {
  type: 'item_owned' as const,
  targetId: 'safari-catching-permit',
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
    category: 'Kanto',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari.avif',
    encounterMode: 'safari',
    timer: 45,
    fleeRate: 10,
    levelRange: { min: 25, max: 35 },
    requirements: [permitRequirement, ...requirements],
    encounters,
    rewards: [],
    skillXp: { skill: 'catching', level: 32 },
  }
}

const fiveClears = (expeditionId: string): Location['requirements'][number] => ({
  type: 'expedition_result',
  targetId: expeditionId,
  expeditionStatus: 'completed',
  count: 5,
})

export const safariZoneLocations: Location[] = [
  safariArea({
    id: 'safari-central-catch',
    name: 'Safari Central',
    description:
      'Open grass and well-travelled paths make Pokémon easier to spot here. Use Bait or Shout before committing to a throw.',
    icon: '111',
    encounters: [
      { speciesId: 29, formId: '29', chance: 18 },
      { speciesId: 32, formId: '32', chance: 18 },
      { speciesId: 46, formId: '46', chance: 15 },
      { speciesId: 102, formId: '102', chance: 15 },
      { speciesId: 111, formId: '111', chance: 14 },
      { speciesId: 113, formId: '113', chance: 5 },
      { speciesId: 115, formId: '115', chance: 8 },
      { speciesId: 128, formId: '128', chance: 7 },
    ],
  }),
  safariArea({
    id: 'safari-east-catch',
    name: 'Safari East',
    description:
      'Tall grass crowds the eastern ponds and raised boardwalks. Use Bait or Shout to manage a nervous Pokémon before throwing.',
    icon: '115',
    requirements: [fiveClears('safari-central-expedition')],
    encounters: [
      { speciesId: 30, formId: '30', chance: 14 },
      { speciesId: 33, formId: '33', chance: 14 },
      { speciesId: 47, formId: '47', chance: 12 },
      { speciesId: 84, formId: '84', chance: 18 },
      { speciesId: 102, formId: '102', chance: 14 },
      { speciesId: 111, formId: '111', chance: 10 },
      { speciesId: 113, formId: '113', chance: 4 },
      { speciesId: 115, formId: '115', chance: 14 },
    ],
  }),
  safariArea({
    id: 'safari-west-catch',
    name: 'Safari West',
    description:
      'Wooded lanes and abandoned shelters give wary Pokémon plenty of cover. Choose Bait or Shout carefully before your throw.',
    icon: '123',
    requirements: [fiveClears('safari-east-expedition')],
    encounters: [
      { speciesId: 48, formId: '48', chance: 18 },
      { speciesId: 49, formId: '49', chance: 8 },
      { speciesId: 102, formId: '102', chance: 16 },
      { speciesId: 111, formId: '111', chance: 14 },
      { speciesId: 113, formId: '113', chance: 5 },
      { speciesId: 123, formId: '123', chance: 10 },
      { speciesId: 127, formId: '127', chance: 10 },
      { speciesId: 128, formId: '128', chance: 19 },
    ],
  }),
  safariArea({
    id: 'safari-north-catch',
    name: 'Safari North',
    description:
      'Rocky ledges funnel Pokémon through narrow northern channels. Use Bait or Shout, then time the throw before they bolt.',
    icon: '128',
    requirements: [fiveClears('safari-west-expedition')],
    encounters: [
      { speciesId: 47, formId: '47', chance: 12 },
      { speciesId: 49, formId: '49', chance: 12 },
      { speciesId: 102, formId: '102', chance: 15 },
      { speciesId: 111, formId: '111', chance: 16 },
      { speciesId: 113, formId: '113', chance: 8 },
      { speciesId: 115, formId: '115', chance: 12 },
      { speciesId: 123, formId: '123', chance: 10 },
      { speciesId: 128, formId: '128', chance: 15 },
    ],
  }),
  safariArea({
    id: 'safari-area-five-catch',
    name: 'Safari Area 5',
    description:
      'Dense growth shelters the Safari Zone’s rarest Pokémon. Bait may draw them close; a Shout may stop them slipping away.',
    icon: '113',
    requirements: [fiveClears('safari-north-expedition')],
    encounters: [
      { speciesId: 49, formId: '49', chance: 12 },
      { speciesId: 102, formId: '102', chance: 14 },
      { speciesId: 111, formId: '111', chance: 15 },
      { speciesId: 113, formId: '113', chance: 14 },
      { speciesId: 115, formId: '115', chance: 14 },
      { speciesId: 123, formId: '123', chance: 10 },
      { speciesId: 127, formId: '127', chance: 10 },
      { speciesId: 128, formId: '128', chance: 11 },
    ],
  }),
]
