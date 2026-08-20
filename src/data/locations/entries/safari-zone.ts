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
    category: 'Secret',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari-reserve.avif',
    encounterMode: 'safari',
    expeditionOnly: true,
    timer: 45,
    fleeRate: 10,
    levelRange: { min: 25, max: 35 },
    requirements: [permitRequirement, ...requirements],
    encounters,
    rewards: [],
    skillXp: { skill: 'catching', level: 32 },
  }
}

export const safariZoneLocations: Location[] = [
  safariArea({
    id: 'safari-central-catch',
    name: 'Safari Central',
    description:
      'Open grass and well-travelled paths make Pokémon easier to spot here. Use Bait or Shout before committing to a throw.',
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
      { speciesId: 113, formId: '113', chance: 1 },
    ],
  }),
  safariArea({
    id: 'safari-east-catch',
    name: 'Safari East',
    description:
      'Tall grass crowds the eastern ponds and raised boardwalks. Use Bait or Shout to manage a nervous Pokémon before throwing.',
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
      { speciesId: 128, formId: '128', chance: 3 },
      { speciesId: 105, formId: '105', chance: 2 },
      { speciesId: 123, formId: '123', chance: 2 },
      { speciesId: 115, formId: '115', chance: 2 },
      { speciesId: 127, formId: '127', chance: 1 },
      { speciesId: 113, formId: '113', chance: 1 },
    ],
  }),
  safariArea({
    id: 'safari-west-catch',
    name: 'Safari West',
    description:
      'Wooded lanes and abandoned shelters give wary Pokémon plenty of cover. Choose Bait or Shout carefully before your throw.',
    icon: '123',
    encounters: [
      { speciesId: 102, formId: '102', chance: 20 },
      { speciesId: 29, formId: '29', chance: 15 },
      { speciesId: 32, formId: '32', chance: 15 },
      { speciesId: 84, formId: '84', chance: 13 },
      { speciesId: 48, formId: '48', chance: 10 },
      { speciesId: 33, formId: '33', chance: 6 },
      { speciesId: 128, formId: '128', chance: 6 },
      { speciesId: 30, formId: '30', chance: 3 },
      { speciesId: 49, formId: '49', chance: 3 },
      { speciesId: 104, formId: '104', chance: 3 },
      { speciesId: 105, formId: '105', chance: 2 },
      { speciesId: 115, formId: '115', chance: 2 },
      { speciesId: 114, formId: '114', chance: 1 },
      { speciesId: 127, formId: '127', chance: 1 },
    ],
  }),
  safariArea({
    id: 'safari-north-catch',
    name: 'Safari North',
    description:
      'Rocky ledges funnel Pokémon through narrow northern channels. Use Bait or Shout, then time the throw before they bolt.',
    icon: '128',
    encounters: [
      { speciesId: 102, formId: '102', chance: 18 },
      { speciesId: 111, formId: '111', chance: 17 },
      { speciesId: 29, formId: '29', chance: 13 },
      { speciesId: 32, formId: '32', chance: 13 },
      { speciesId: 46, formId: '46', chance: 10 },
      { speciesId: 30, formId: '30', chance: 8 },
      { speciesId: 33, formId: '33', chance: 5 },
      { speciesId: 115, formId: '115', chance: 5 },
      { speciesId: 49, formId: '49', chance: 3 },
      { speciesId: 104, formId: '104', chance: 2 },
      { speciesId: 128, formId: '128', chance: 2 },
      { speciesId: 113, formId: '113', chance: 2 },
      { speciesId: 127, formId: '127', chance: 1 },
      { speciesId: 123, formId: '123', chance: 1 },
    ],
  }),
  safariArea({
    id: 'safari-grand-finale-catch',
    name: 'Safari Grand Finale',
    description:
      'A secluded habitat opens at the end of the expedition. Before Strength, the usual northern species gather here; afterwards, only the reserve’s prized encounters remain.',
    icon: '113',
    encounters: [
      { speciesId: 102, formId: '102', chance: 18, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 111, formId: '111', chance: 17, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 29, formId: '29', chance: 13, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 32, formId: '32', chance: 13, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 46, formId: '46', chance: 10, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 30, formId: '30', chance: 8, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 33, formId: '33', chance: 5, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 115, formId: '115', chance: 5, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 49, formId: '49', chance: 3, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 104, formId: '104', chance: 2, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 128, formId: '128', chance: 2, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 113, formId: '113', chance: 2, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 127, formId: '127', chance: 1, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 123, formId: '123', chance: 1, requirements: [{ type: 'item_owned', targetId: 'tm-strength', inverse: true }] },
      { speciesId: 113, formId: '113', chance: 20, requirements: [{ type: 'item_owned', targetId: 'tm-strength' }] },
      { speciesId: 115, formId: '115', chance: 20, requirements: [{ type: 'item_owned', targetId: 'tm-strength' }] },
      { speciesId: 128, formId: '128', chance: 20, requirements: [{ type: 'item_owned', targetId: 'tm-strength' }] },
      { speciesId: 123, formId: '123', chance: 20, requirements: [{ type: 'item_owned', targetId: 'tm-strength' }] },
      { speciesId: 127, formId: '127', chance: 20, requirements: [{ type: 'item_owned', targetId: 'tm-strength' }] },
    ],
  }),
]
