import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { User } from '@/payload-types'
import { getGameUserData } from '@/utilities/game-data'
import { checkRequirement } from '@/utilities/requirements'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import { eventCatalog } from './catalog'
import type { EventKind, GameEventDefinition } from './model'
import { resolveEventCatalog } from './resolve'
import { cache } from 'react'

export const loadGameEvents = cache(async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'game-events',
    where: {
      status: { equals: 'published' },
      endAt: { greater_than: new Date(Date.now() - 86400000).toISOString() },
    },
    pagination: false,
    depth: 0,
  })
  return result.docs.map(
    (document) =>
      ({
        ...(document.definition as any),
        id: document.id,
        status: document.status,
        revision: document.revision,
      }) as GameEventDefinition,
  )
})
export async function eligibleGameEvents(user: User) {
  const events = await loadGameEvents()
  if (!events.length) return events
  const data = await getGameUserData(
    user,
    analyzeRequirements(events.flatMap((event) => event.requirements)),
  )
  return events.filter((event) =>
    event.requirements.every((condition) => checkRequirement(data, condition)),
  )
}
export async function getEffectiveContent<K extends EventKind>(
  kind: K,
  id: string,
  user: User,
) {
  return resolveEventCatalog(
    kind,
    eventCatalog[kind],
    await eligibleGameEvents(user),
  ).find((entry) => entry.id === id)
}
