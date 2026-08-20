import type { ExpeditionConfig } from '../types'

const permitRequirement = {
  type: 'item_owned' as const,
  targetId: 'safari-catching-permit',
}

const fiveClears = (expeditionId: string) => ({
  type: 'expedition_result' as const,
  targetId: expeditionId,
  expeditionStatus: 'completed' as const,
  count: 5,
})

function safariExpedition({
  id,
  name,
  description,
  fieldResearchId,
  locationId,
  icon,
  requirements = [],
  strengthCache = false,
}: {
  id: string
  name: string
  description: string
  fieldResearchId: string
  locationId: string
  icon: string
  requirements?: ExpeditionConfig['requirements']
  strengthCache?: boolean
}): ExpeditionConfig {
  return {
    id,
    name,
    description,
    category: 'Kanto',
    subCategory: 'Safari Zone',
    icon: { type: 'pokemon', id: icon },
    background: '/backgrounds/safari-reserve.avif',
    maxLosses: 1,
    canAbandon: true,
    requirements: [permitRequirement, ...requirements],
    criteria: [
      { type: 'currency_owned', targetId: 'pokedollars', count: 500, consume: true },
    ],
    activityPool: {
      'field-research': [fieldResearchId],
      location: [locationId],
      ...(strengthCache ? { task: ['safari-north-strength-cache'] } : {}),
    },
    path: [
      { type: 'activity', id: `${id}-survey`, activityType: 'field-research', activityId: fieldResearchId },
      { type: 'activity', id: `${id}-catch`, activityType: 'location', activityId: locationId },
      ...(strengthCache
        ? [
            {
              type: 'activity' as const,
              id: `${id}-strength-cache`,
              activityType: 'task' as const,
              activityId: 'safari-north-strength-cache',
              secret: true,
              requirements: [
                { type: 'item_owned' as const, targetId: 'tm-strength', inverse: true },
              ],
            },
          ]
        : []),
    ],
    rewards: [
      { type: 'item', targetId: 'toxic-resin-t1', quantity: { min: 1, max: 3 }, dropChance: 100 },
      { type: 'item', targetId: 'soft-fluff-t1', quantity: 1, dropChance: 35 },
      ...(strengthCache
        ? [
            {
              type: 'item' as const,
              targetId: 'tm-strength',
              quantity: 1,
              dropChance: 100,
              secret: true,
              requirements: [
                { type: 'item_owned' as const, targetId: 'tm-strength', inverse: true },
              ],
            },
          ]
        : []),
    ],
  }
}

export const safariZoneExpeditions: ExpeditionConfig[] = [
  safariExpedition({
    id: 'safari-central-expedition',
    name: 'Central Survey',
    description:
      'Survey the busy gate paths and trampled grass, then make a Safari catch before returning with your field notes.',
    fieldResearchId: 'safari-central-expedition-field-observation',
    locationId: 'safari-central-catch',
    icon: '111',
  }),
  safariExpedition({
    id: 'safari-east-expedition',
    name: 'Eastern Survey',
    description:
      'Follow the eastern boardwalks through tall grass and pond edges, recording wildlife before attempting a catch.',
    fieldResearchId: 'safari-east-expedition-field-observation',
    locationId: 'safari-east-catch',
    icon: '115',
    requirements: [fiveClears('safari-central-expedition')],
  }),
  safariExpedition({
    id: 'safari-west-expedition',
    name: 'Western Survey',
    description:
      'Work through shaded woodland lanes and old shelters, gathering observations and attempting a Safari catch.',
    fieldResearchId: 'safari-west-expedition-field-observation',
    locationId: 'safari-west-catch',
    icon: '123',
    requirements: [fiveClears('safari-east-expedition')],
  }),
  safariExpedition({
    id: 'safari-north-expedition',
    name: 'Northern Survey',
    description:
      'Cross the northern ledges and old service paths, complete a habitat survey, and attempt a Safari catch.',
    fieldResearchId: 'safari-north-expedition-field-observation',
    locationId: 'safari-north-catch',
    icon: '128',
    requirements: [fiveClears('safari-west-expedition')],
    strengthCache: true,
  }),
]
