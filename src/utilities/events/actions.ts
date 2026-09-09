'use server'

import { randomUUID } from 'node:crypto'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { z } from 'zod'
import { items } from '@/data/items'
import { allPokemon } from '@/data/pokemon'
import { getAllMoves } from '@/data/moves'
import { ABILITIES } from '@/data/abilities'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import {
  getAbilityShinyMultiplier,
  getExtraShinyRollChance,
  isNightHour,
} from '@/utilities/pokemon/encounter-ability-runtime'
import {
  getResearcherShinyModifier,
  getSkillLevel,
} from '@/utilities/skills/unlocks'
import { getUserPokedexMap } from '@/utilities/user-state'
import {
  combinedShinyChance,
  hasFixedPokemonRarity,
  rarityProbabilities,
  resolveRarityChances,
} from '@/utilities/pokemon/rarity-chances'
import {
  BASE_SHINY_CHANCE,
  getShinyChance,
} from '@/utilities/pokemon/shiny-odds'
import { resolvePokemonRarity } from '@/utilities/pokemon/rarity-effects'
import config from '@payload-config'
import {
  acquireActionLock,
  checkActionRateLimit,
  releaseActionLock,
} from '@/utilities/game-integrity'
import { runEconomyAction } from '@/utilities/economy/transactions'
import { eventCatalog } from './catalog'
import {
  eventContentSchemas,
  eventDraftSchema,
  eventPhase,
  type EventKind,
  type GameEventDefinition,
} from './model'
import {
  assertNoEventConflicts,
  resolveEventCatalog,
  validateModifier,
} from './resolve'
import { eligibleGameEvents, loadGameEvents } from './server'
import { acceptEventTaskForUser } from './participation'
import { validateEventReferences } from './references'

function validateEffectiveSchedule(candidate: GameEventDefinition, others: GameEventDefinition[]) {
  assertNoEventConflicts(candidate, others)
  const events = [...others.filter((event) => event.id !== candidate.id), candidate]
  const boundaries = new Set([
    Date.parse(candidate.startAt),
    ...events.flatMap((event) => [Date.parse(event.startAt), Date.parse(event.endAt)]),
  ])
  for (const boundary of boundaries) {
    if (boundary < Date.parse(candidate.startAt) || boundary >= Date.parse(candidate.endAt)) continue
    for (const kind of Object.keys(eventCatalog) as EventKind[]) {
      for (const effective of resolveEventCatalog(kind, eventCatalog[kind], events, boundary)) {
        if (!effective.eventContexts?.length) continue
        const { eventContexts: _, ...content } = effective
        const result = eventContentSchemas[kind].safeParse(content)
        if (!result.success) throw new Error(`Invalid effective ${kind} ${effective.name}: ${result.error.message}`)
      }
    }
  }
}

async function context(admin = true) {
  const payload = await getPayload({ config })
  const { user: authenticated } = await payload.auth({
    headers: await headers(),
  })
  if (!authenticated) throw new Error('Please sign in')
  const user = await payload.findByID({
    collection: 'users',
    id: authenticated.id,
    depth: 0,
  })
  if (admin && !user.isAdmin) throw new Error('Admin access required')
  const rate = await checkActionRateLimit(
    user.id,
    admin ? 'event-admin' : 'event-list',
    60,
    60,
  )
  if (!rate.allowed) throw new Error('Please wait before trying again')
  return { payload, user }
}
function definition(document: any): GameEventDefinition {
  return {
    ...document.definition,
    id: document.id,
    status: document.status,
    revision: document.revision,
    updatedAt: document.updatedAt,
  }
}
export async function getEventStudio() {
  const { payload } = await context()
  const documents = await payload.find({
    collection: 'game-events',
    sort: '-updatedAt',
    limit: 100,
    depth: 0,
  })
  return {
    events: documents.docs.map(definition),
    catalog: Object.fromEntries(
      Object.entries(eventCatalog).map(([kind, configs]) => [
        kind,
        configs.map((entry) => ({
          id: entry.id,
          name: entry.name,
          category: entry.category,
          subCategory: entry.subCategory,
        })),
      ]),
    ),
    schemas: Object.fromEntries(
      Object.entries(eventContentSchemas).map(([kind, schema]) => {
        const json = z.toJSONSchema(schema, {
          io: 'input',
          unrepresentable: 'any',
        }) as any
        if (kind === 'field-research') {
          json.properties.gameType = {
            type: 'string',
            const: 'field-observation',
          }
        }
        return [kind, JSON.parse(JSON.stringify(json))]
      }),
    ),
  }
}
export async function getEventContentTemplate(kind: EventKind, id: string) {
  await context()
  if (!Object.hasOwn(eventCatalog, kind))
    throw new Error('Unknown content type')
  const entry = eventCatalog[kind].find((value) => value.id === id)
  if (!entry) throw new Error('Content not found')
  // Only fields supported by the event editor are copied; engine-specific scripts are excluded.
  const schema = z.toJSONSchema(eventContentSchemas[kind], {
    io: 'input',
    unrepresentable: 'any',
  }) as any
  return Object.fromEntries(
    Object.entries(structuredClone(entry)).filter(([key]) =>
      Object.hasOwn(schema.properties || {}, key),
    ),
  )
}
export async function saveGameEvent(
  input: unknown,
  options: {
    id?: string
    revision?: number
    publish?: boolean
    requestId: string
  },
) {
  const { payload, user } = await context()
  const parsed = eventDraftSchema.parse(input)
  if (JSON.stringify(parsed).length > 500_000)
    throw new Error('Event is too large')
  const lock = await acquireActionLock('game-events:publication', 60)
  if (!lock.acquired)
    throw new Error('Another event is being edited; try again')
  try {
    return await runEconomyAction(
      {
        userId: user.id,
        action: 'event-save',
        requestId: options.requestId,
        payload,
      },
      async ({ req }) => {
        const old = options.id
          ? await payload.findByID({
              collection: 'game-events',
              id: options.id,
              req,
            })
          : null
        if (old && old.revision !== options.revision)
          throw new Error('This event changed. Reload before saving.')
        if (
          old &&
          eventPhase(definition(old)) !== 'draft' &&
          eventPhase(definition(old)) !== 'scheduled'
        )
          throw new Error('Gameplay settings are frozen after activation')
        const id = old?.id || randomUUID()
        const status: GameEventDefinition['status'] =
          options.publish || old?.status === 'published' ? 'published' : 'draft'
        const candidate: GameEventDefinition = {
          ...parsed,
          id,
          status,
          revision: (old?.revision || 0) + 1,
        }
        if (status === 'published' && Date.parse(candidate.endAt) <= Date.now())
          throw new Error('Event must end in the future')
        const localIds = new Set(
          candidate.content.map((entry) => String(entry.config.id)),
        )
        for (const entry of candidate.content)
          validateEventReferences(entry.config, localIds)
        validateEventReferences(candidate.requirements, localIds)
        for (const modifier of candidate.modifiers) {
          const target = eventCatalog[modifier.kind].find(
            (entry) => entry.id === modifier.targetId,
          )
          if (!target) throw new Error(`Missing target ${modifier.targetId}`)
          validateModifier(modifier, target)
          validateEventReferences(modifier.value, localIds)
        }
        if (status === 'published') {
          const others = await payload.find({
            collection: 'game-events',
            where: {
              status: { equals: 'published' },
              endAt: { greater_than: candidate.startAt },
              startAt: { less_than: candidate.endAt },
            },
            pagination: false,
            req,
          })
          validateEffectiveSchedule(candidate, others.docs.map(definition))
        }
        const data = {
          status,
          startAt: candidate.startAt,
          endAt: candidate.endAt,
          definition: parsed,
          revision: candidate.revision,
          createdBy: old?.createdBy || user.id,
        }
        const saved = old
          ? await payload.update({ collection: 'game-events', id, data, req })
          : await payload.create({
              collection: 'game-events',
              data: { ...data, id },
              req,
            })
        await payload.create({
          collection: 'event-audit',
          data: {
            eventId: id,
            actor: user.id,
            action: options.publish ? 'publish' : 'save',
            revision: candidate.revision,
          },
          req,
        })
        return definition(saved)
      },
    )
  } finally {
    await releaseActionLock(lock)
  }
}
export async function changeGameEvent(
  id: string,
  revision: number,
  change: {
    action: 'cancel' | 'end' | 'update'
    title?: string
    description?: string
    endAt?: string
  },
  requestId: string,
) {
  const { payload, user } = await context()
  const lock = await acquireActionLock('game-events:publication', 60)
  if (!lock.acquired)
    throw new Error('Another event is being edited; try again')
  try {
    return await runEconomyAction(
      { userId: user.id, action: 'event-change', requestId, payload },
      async ({ req }) => {
        const old = await payload.findByID({
          collection: 'game-events',
          id,
          req,
        })
        if (old.revision !== revision)
          throw new Error('This event changed. Reload before saving.')
        const event = definition(old)
        const phase = eventPhase(event)
        if (change.action === 'cancel') {
          if (!['draft', 'scheduled'].includes(phase))
            throw new Error('Only unstarted events can be cancelled')
          event.status = 'cancelled'
        } else {
          if (phase !== 'active')
            throw new Error('Only active events can be changed here')
          if (change.action === 'end') event.endAt = new Date().toISOString()
          else {
            if (change.title !== undefined)
              event.title = z.string().min(1).max(150).parse(change.title)
            if (change.description !== undefined)
              event.description = z.string().max(4000).parse(change.description)
            if (change.endAt !== undefined) {
              const end = z.iso.datetime().parse(change.endAt)
              if (Date.parse(end) < Date.parse(event.endAt))
                throw new Error('Use End now to shorten an active event')
              event.endAt = end
              const others = await payload.find({
                collection: 'game-events',
                where: {
                  status: { equals: 'published' },
                  endAt: { greater_than: event.startAt },
                  startAt: { less_than: event.endAt },
                },
                pagination: false,
                req,
              })
              validateEffectiveSchedule(event, others.docs.map(definition))
            }
          }
        }
        event.revision++
        const {
          id: _,
          status,
          revision: nextRevision,
          updatedAt: __,
          ...draft
        } = event
        const saved = await payload.update({
          collection: 'game-events',
          id,
          data: {
            status,
            revision: nextRevision,
            endAt: event.endAt,
            definition: draft,
          },
          req,
        })
        await payload.create({
          collection: 'event-audit',
          data: {
            eventId: id,
            actor: user.id,
            action: change.action,
            revision: nextRevision,
          },
          req,
        })
        return definition(saved)
      },
    )
  } finally {
    await releaseActionLock(lock)
  }
}
export async function getPlayerEvents() {
  const { payload, user } = await context(false)
  const events = await eligibleGameEvents(user)
  const allEvents = await loadGameEvents()
  const now = Date.now()
  const participation = await payload.find({
    collection: 'event-participation',
    where: { user: { equals: user.id } },
    sort: '-acceptedAt',
    limit: 200,
    depth: 0,
  })
  const content = (Object.keys(eventCatalog) as EventKind[]).flatMap((kind) =>
    resolveEventCatalog(kind, eventCatalog[kind], events, now)
      .filter((entry) => entry.eventContexts?.length)
      .map((entry) => ({ ...entry, type: kind, originalData: entry })),
  )
  for (const record of participation.docs) {
    if (
      record.claimedAt ||
      content.some((entry) => entry.id === record.activityId)
    )
      continue
    const event = allEvents.find((event) => event.id === record.eventId)
    if (
      !event ||
      now >= Date.parse(event.endAt) + 86400000 ||
      (now >= Date.parse(event.endAt) && !record.readyAt)
    )
      continue
    const task = record.snapshot as any
    content.push({ ...task, type: 'task', originalData: task })
  }
  for (const item of content) {
    if (item.type !== 'task') continue
    const record = participation.docs.find(
      (record) =>
        record.activityId === item.id &&
        allEvents.some(
          (event) =>
            event.id === record.eventId &&
            (Date.parse(event.endAt) > now ||
              (record.readyAt && Date.parse(event.endAt) + 86400000 > now)),
        ),
    )
    const accepted = record && !record.claimedAt
    const task = (accepted ? record.snapshot : item.originalData) as any
    const progress = (record?.progress || {}) as Record<string, number>
    const criteria = accepted
      ? task.criteria.map((condition: any, index: number) =>
          condition.consume
            ? condition
            : {
                type: 'daily_activity',
                count: condition.count || 1,
                progress: progress[String(index)] || 0,
                label: condition.label,
              },
        )
      : []
    const presentation = {
      ...task,
      criteria,
      requirements: accepted
        ? task.requirements.filter((condition: any) => condition.consume)
        : task.requirements,
      completionTrigger: 'manual',
      eventTaskState: accepted ? 'accepted' : 'accept',
      completeButtonText: accepted
        ? 'Claim event rewards'
        : 'Accept event task',
    }
    Object.assign(item, presentation, { originalData: presentation })
  }
  return {
    participation: participation.docs.map((record) => ({
      activityId: record.activityId,
      eventId: record.eventId,
      readyAt: record.readyAt,
      claimedAt: record.claimedAt,
      progress: record.progress,
    })),
    announcements: events
      .filter(
        (event) =>
          event.visibleAt &&
          Date.parse(event.visibleAt) <= now &&
          Date.parse(event.endAt) > now,
      )
      .map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        icon: event.icon,
        startAt: event.startAt,
        endAt: event.endAt,
        phase: eventPhase(event, now),
      })),
    content,
  }
}

export async function acceptEventTask(taskId: string, requestId: string) {
  const { payload, user } = await context(false)
  await runEconomyAction(
    { userId: user.id, action: 'event-task-accept', requestId, payload },
    async ({ req }) => {
      await acceptEventTaskForUser(payload, user, taskId, req)
      return { success: true }
    },
  )
  return { success: true }
}

export async function searchEventReferences(type: string, query: string) {
  await context()
  const search = z.string().max(100).parse(query).toLowerCase()
  let entries: { id: string; name: string }[]
  if (type === 'speciesId')
    entries = allPokemon.map((pokemon) => ({
      id: String(pokemon.id),
      name: pokemon.forms[0]?.name || String(pokemon.id),
    }))
  else if (type === 'formId')
    entries = allPokemon.flatMap((pokemon) =>
      pokemon.forms.map((form) => ({
        id: form.id,
        name: `${form.name} ${form.form}`,
      })),
    )
  else if (['itemId', 'heldItemId', 'allowedItems'].includes(type))
    entries = items.map((item) => ({ id: item.id, name: item.name }))
  else if (type === 'aiMoves')
    entries = getAllMoves().map((move) => ({ id: move.id, name: move.name }))
  else if (['background', 'music'].includes(type))
    entries = [
      ...new Set(
        Object.values(eventCatalog).flatMap((configs) =>
          configs.flatMap((entry) => {
            const value = (entry as any)[type]
            return typeof value === 'string' && value ? [value] : []
          }),
        ),
      ),
    ].map((id) => ({ id, name: id }))
  else
    entries = Object.values(eventCatalog).flatMap((configs) =>
      configs.map((entry) => ({ id: entry.id, name: entry.name })),
    )
  return entries
    .filter((entry) =>
      `${entry.id} ${entry.name}`.toLowerCase().includes(search),
    )
    .slice(0, 40)
}

export async function previewEventRarity(
  kind: 'location' | 'battle',
  input: unknown,
  entryIndex: number,
) {
  const { payload, user } = await context()
  if (!['location', 'battle'].includes(kind))
    throw new Error('Unsupported rarity source')
  const config = eventContentSchemas[kind].parse(input) as any
  const entry = (kind === 'location' ? config.encounters : config.enemyTeam)[
    z.number().int().nonnegative().parse(entryIndex)
  ]
  if (!entry) throw new Error('Choose a Pokémon entry')
  const base = resolveRarityChances(
    config.rarityChances,
    entry.rarityChances,
    kind === 'location' || config.isWildBattle === true,
  )
  const current = { ...base }
  if (kind === 'location') {
    const companions = await payload.find({
      collection: 'pokemon',
      where: { user: { equals: user.id }, isCompanion: { equals: true } },
      limit: 1,
      depth: 0,
    })
    const companion = companions.docs[0]
    const ability = companion?.ability
      ? ABILITIES[companion.ability]
      : undefined
    const formId = entry.formId || String(entry.speciesId)
    const form = getPokemonForm(formId)
    const dex = await getUserPokedexMap(payload, user.id)
    const researchLevel =
      (dex[String(entry.speciesId)] as any)?.[formId]?.researchLevel || 0
    const shiny = getShinyChance({
      sourceModifier:
        (config.shinyChanceModifier ?? 1) * (base.shiny! / BASE_SHINY_CHANCE),
      researcherModifier: getResearcherShinyModifier(
        getSkillLevel(user.skills, 'researching'),
      ),
      abilityModifier: getAbilityShinyMultiplier({
        ability,
        formId,
        speciesId: entry.speciesId,
        sourceFormId: companion?.formId,
        locationId: config.id,
        targetTypes: form?.types,
        isNight: isNightHour(),
      }),
    })
    current.shiny =
      base.shiny === 0
        ? 0
        : combinedShinyChance(
            shiny,
            researchLevel >= 5 ? 2 : 1,
            getExtraShinyRollChance({
              ability,
              sourceFormId: companion?.formId,
              targetFormId: formId,
              shinyChance: shiny,
            }),
          )
    base.shiny = Math.min(1, base.shiny! * (config.shinyChanceModifier ?? 1))
  }
  const probabilities = (chances: typeof base) => {
    const result = rarityProbabilities(chances)
    if (!hasFixedPokemonRarity(entry)) return result
    for (const key of Object.keys(result))
      result[key as keyof typeof result] =
        key === resolvePokemonRarity(entry) ? 1 : 0
    return result
  }
  return {
    base: probabilities(base),
    current: probabilities(current),
    note: 'Current-trainer preview uses this entry, current companion, research and time of day. Random ability copying or encounter replacement can change the generated entry.',
  }
}

export async function previewGameEvent(input: unknown, existingId?: string) {
  await context()
  const draft = eventDraftSchema.parse(input)
  const candidate: GameEventDefinition = {
    ...draft,
    id: existingId || 'preview',
    status: 'published',
    revision: 1,
  }
  const others = (await loadGameEvents()).filter(
    (event) => event.id !== candidate.id,
  )
  assertNoEventConflicts(candidate, others)
  for (const modifier of candidate.modifiers) {
    const base = eventCatalog[modifier.kind].find(
      (entry) => entry.id === modifier.targetId,
    )
    if (!base) throw new Error(`Missing target ${modifier.targetId}`)
    validateModifier(modifier, base)
  }
  return (Object.keys(eventCatalog) as EventKind[]).flatMap((kind) =>
    resolveEventCatalog(
      kind,
      eventCatalog[kind],
      [...others, candidate],
      Math.max(Date.now(), Date.parse(candidate.startAt)),
    )
      .filter((entry) =>
        entry.eventContexts?.some((event) => event.id === candidate.id),
      )
      .map((config) => ({ kind, config })),
  )
}
