import 'server-only'
import { createHash } from 'node:crypto'
import type { Payload, PayloadRequest } from 'payload'
import type { User, EventParticipation as Participation } from '@/payload-types'
import type { Task, TaskCondition } from '@/data/types'
import type { DailyActivityEvent } from '@/utilities/tasks/daily-progress'
import { getGameUserData } from '@/utilities/game-data'
import {
  checkRequirement,
  getRequirementProgress,
  isPokemonEligible,
} from '@/utilities/requirements'
import { getEffectiveContent } from './server'

export function participationId(userId: string, activityId: string) {
  return createHash('sha256').update(`${userId}:${activityId}`).digest('hex')
}
const actionTypes: Record<string, string> = {
  daily_catch: 'catch',
  daily_battle: 'battle_win',
  daily_card: 'card_collected',
  daily_crystalize: 'card_crystalized',
  battle_result: 'battle_win',
  location_encounter_result: 'catch',
  field_research_result: 'field_research_win',
  game_result: 'game_win',
  voyage_completed: 'voyage_success',
  total_battles_won: 'battle_win',
}
const cumulativeTypes = new Set(['total_evolutions', 'power_usage'])
export type EventActivityEvent = Omit<DailyActivityEvent, 'kind'> & {
  kind: DailyActivityEvent['kind'] | 'battle_loss'
}
export function isEventCounter(condition: TaskCondition) {
  return (
    condition.type === 'daily_activity' ||
    Object.hasOwn(actionTypes, condition.type)
  )
}
export function eventCounterMatches(
  condition: TaskCondition,
  event: EventActivityEvent,
) {
  const kind =
    condition.type === 'daily_activity'
      ? condition.dailyActivity?.kind
      : condition.type === 'battle_result' && condition.battleStatus === 'loss'
        ? 'battle_loss'
        : actionTypes[condition.type]
  if (kind !== event.kind) return false
  const sourceIds =
    condition.dailyActivity?.sourceIds ||
    ([
      'battle_result',
      'location_encounter_result',
      'field_research_result',
      'game_result',
      'voyage_completed',
    ].includes(condition.type) && condition.targetId
      ? [condition.targetId].flat().map(String)
      : [])
  if (sourceIds.length && !sourceIds.includes(event.sourceId || ''))
    return false
  if (
    condition.pokemonCriteria &&
    event.pokemon &&
    !isPokemonEligible(event.pokemon, condition.pokemonCriteria)
  )
    return false
  if (
    condition.pokemonCriteria &&
    !event.pokemon &&
    Object.keys(condition.pokemonCriteria).some(
      (key) => !['speciesId', 'type'].includes(key),
    )
  )
    return false
  if (condition.battleType === 'trainer' && !event.isTrainer) return false
  if (condition.battleType === 'wild' && event.isTrainer) return false
  if (
    condition.pokemonCriteria?.speciesId &&
    condition.pokemonCriteria.speciesId !== event.speciesId
  )
    return false
  if (
    condition.pokemonCriteria?.type &&
    !event.types?.includes(condition.pokemonCriteria.type)
  )
    return false
  return true
}
async function refreshProgress(
  payload: Payload,
  user: User,
  record: Participation,
  event?: EventActivityEvent,
  req?: PayloadRequest,
) {
  const document = await payload.findByID({
    collection: 'game-events',
    id: record.eventId,
    req,
  })
  if (
    record.claimedAt ||
    record.readyAt ||
    document.status !== 'published' ||
    Date.now() >= Date.parse(document.endAt)
  )
    return record
  const task = record.snapshot as unknown as Task
  const progress = { ...((record.progress as Record<string, number>) || {}) }
  const data = await getGameUserData(user, undefined, { payload, req })
  task.criteria.forEach((condition, index) => {
    if (condition.consume) return
    const key = String(index)
    if (isEventCounter(condition)) {
      if (event && eventCounterMatches(condition, event))
        progress[key] = Math.min(
          condition.count || 1,
          (progress[key] || 0) + Math.max(1, Math.floor(event.amount || 1)),
        )
    } else if (cumulativeTypes.has(condition.type)) {
      progress[key] = Math.min(
        condition.count || 1,
        Math.max(
          0,
          getRequirementProgress(data, condition, task).current -
            (progress[`baseline:${index}`] || 0),
        ),
      )
    } else if (checkRequirement(data, condition, task))
      progress[key] = condition.count || 1
  })
  const ready = task.criteria.every(
    (condition, index) =>
      condition.consume ||
      (progress[String(index)] || 0) >= (condition.count || 1),
  )
  return payload.update({
    collection: 'event-participation',
    id: record.id,
    data: { progress, readyAt: ready ? new Date().toISOString() : undefined },
    req,
  })
}
export async function acceptEventTaskForUser(
  payload: Payload,
  user: User,
  taskId: string,
  req: PayloadRequest,
) {
  const task = await getEffectiveContent('task', taskId, user)
  if (!task?.eventContexts?.length) throw new Error('Event task is unavailable')
  const eventId = [...task.eventContexts].sort(
    (a, b) => Date.parse(a.endAt) - Date.parse(b.endAt),
  )[0].id
  const id = participationId(user.id, `${eventId}:${taskId}`)
  const existing = await payload.findByID({
    collection: 'event-participation',
    id,
    disableErrors: true,
    req,
  })
  if (existing && (!existing.claimedAt || !task.repeatable)) return existing
  const data = await getGameUserData(user, undefined, { payload, req })
  if (
    !task.requirements.every((condition) =>
      checkRequirement(data, condition, task),
    )
  )
    throw new Error('Requirements not met')
  const value = {
    user: user.id,
    eventId,
    activityId: taskId,
    acceptedAt: new Date().toISOString(),
    snapshot: task as any,
    progress: Object.fromEntries(
      task.criteria.flatMap((condition, index) =>
        cumulativeTypes.has(condition.type)
          ? [
              [
                `baseline:${index}`,
                getRequirementProgress(data, condition, task).current,
              ],
            ]
          : [],
      ),
    ),
    readyAt: null,
    claimedAt: null,
  }
  const record = existing
    ? await payload.update({
        collection: 'event-participation',
        id,
        data: value,
        req,
      })
    : await payload.create({
        collection: 'event-participation',
        data: { ...value, id },
        req,
      })
  return refreshProgress(payload, user, record, undefined, req)
}
/** Freeze state-based objectives in the same transaction as the gameplay change. */
export async function recordEventStateProgress(
  payload: Payload,
  userId: string,
  req: PayloadRequest,
) {
  const records = await payload.find({
    collection: 'event-participation',
    where: {
      user: { equals: userId },
      and: [
        {
          or: [
            { claimedAt: { exists: false } },
            { claimedAt: { equals: null } },
          ],
        },
        { or: [{ readyAt: { exists: false } }, { readyAt: { equals: null } }] },
      ],
    },
    pagination: false,
    req,
  })
  if (!records.docs.length) return
  const user = await payload.findByID({ collection: 'users', id: userId, req })
  for (const record of records.docs)
    await refreshProgress(payload, user, record, undefined, req)
}
export async function recordEventActivityProgress(
  payload: Payload,
  user: User,
  event: EventActivityEvent,
  req?: PayloadRequest,
) {
  const records = await payload.find({
    collection: 'event-participation',
    where: {
      user: { equals: user.id },
      or: [{ claimedAt: { exists: false } }, { claimedAt: { equals: null } }],
    },
    pagination: false,
    req,
  })
  for (const record of records.docs)
    await refreshProgress(payload, user, record, event, req)
}
export async function resolveEventTaskClaim(
  payload: Payload,
  user: User,
  taskId: string,
  req: PayloadRequest,
) {
  const records = await payload.find({
    collection: 'event-participation',
    where: { user: { equals: user.id }, activityId: { equals: taskId } },
    sort: '-acceptedAt',
    limit: 1,
    req,
  })
  let record = records.docs[0]
  if (!record) return null
  const event = await payload.findByID({
    collection: 'game-events',
    id: record.eventId,
    req,
  })
  const ended = Date.now() >= Date.parse(event.endAt)
  if (!taskId.startsWith('event:') && ended && !record.readyAt) return null
  if (record.claimedAt)
    throw new Error('Accept the task again before repeating it')
  if (
    event.status !== 'published' ||
    Date.now() >= Date.parse(event.endAt) + 86400000
  )
    throw new Error('Event task has expired')
  record = await refreshProgress(payload, user, record, undefined, req)
  if (!record.readyAt) throw new Error('Event objectives are not complete')
  const task = structuredClone(record.snapshot) as unknown as Task
  // Earned objectives are frozen; consumable costs are checked and paid by completeTask.
  task.criteria = task.criteria.filter((condition) => condition.consume)
  task.requirements = task.requirements.filter((condition) => condition.consume)
  return { task, record }
}
