import {
  eventContentId,
  eventContentSchemas,
  eventPhase,
  type EventConfigMap,
  type EventKind,
  type EventModifier,
  type GameEventDefinition,
} from './model'

export type EventContext = { id: string; title: string; endAt: string }
export type EffectiveConfig<K extends EventKind> = EventConfigMap[K] & {
  eventContexts?: EventContext[]
}
const forbiddenFields = new Set([
  'id',
  'requirements',
  'hide',
  'overrides',
  'dynamicOpponent',
  'pvp',
  'expeditionOnly',
  'dailyMetadata',
  'rivalSelection',
])
const numericBoostFields = new Set([
  'shinyChanceModifier',
  'generatedXpMultiplier',
])
const appendFields = new Set([
  'items',
  'rewards',
  'encounters',
  'enemyTeam',
  'settings.itemDrops',
  'settings.pokemonPool',
])
function parts(path: string) {
  const keys = path.split('.')
  if (
    keys.some(
      (key) =>
        !/^[a-zA-Z][a-zA-Z0-9]*$/.test(key) ||
        ['__proto__', 'prototype', 'constructor'].includes(key),
    )
  )
    throw new Error('Invalid modifier field')
  return keys
}
function read(object: any, path: string): any {
  return parts(path).reduce((value, key) => value?.[key], object)
}
function write(object: any, path: string, value: unknown) {
  const keys = parts(path)
  let target = object
  for (const key of keys.slice(0, -1)) target = target[key] ||= {}
  target[keys.at(-1)!] = structuredClone(value)
}
export function validateModifier(modifier: EventModifier, base: unknown) {
  const root = parts(modifier.field)[0]
  if (forbiddenFields.has(root)) throw new Error(`Cannot modify ${root}`)
  if (
    modifier.operation === 'boost' &&
    !numericBoostFields.has(modifier.field) &&
    !modifier.field.startsWith('rarityChances.')
  )
    throw new Error('Unsupported boost field')
  if (modifier.operation === 'discount' && modifier.field !== 'items')
    throw new Error('Discount applies to shop prices')
  if (modifier.operation === 'append' && !appendFields.has(modifier.field))
    throw new Error('Unsupported addition')
  if (
    modifier.operation === 'boost' &&
    (typeof modifier.value !== 'number' ||
      !Number.isFinite(modifier.value) ||
      modifier.value < 0)
  )
    throw new Error('Invalid boost')
  if (
    modifier.operation === 'discount' &&
    (typeof modifier.value !== 'number' ||
      modifier.value <= 0 ||
      modifier.value > 1)
  )
    throw new Error('Discount factor must be greater than zero and at most one')
  const effective = applyModifiers(base, [modifier])
  const parsed = eventContentSchemas[modifier.kind].safeParse(effective)
  if (!parsed.success)
    throw new Error(
      parsed.error.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join('; '),
    )
}
export function applyModifiers<T>(base: T, modifiers: EventModifier[]): T {
  const result = structuredClone(base)
  const grouped = new Map<string, EventModifier[]>()
  for (const modifier of modifiers)
    grouped.set(modifier.field, [
      ...(grouped.get(modifier.field) || []),
      modifier,
    ])
  for (const [field, entries] of grouped) {
    const replacements = entries.filter(
      (entry) => entry.operation === 'replace',
    )
    if (replacements.length) write(result, field, replacements[0].value)
    const boosts = entries.filter((entry) => entry.operation === 'boost')
    if (boosts.length)
      write(
        result,
        field,
        Math.max(
          Number(
            read(result, field) ??
              (field.startsWith('rarityChances.')
                ? field === 'rarityChances.shiny' &&
                  (boosts[0].kind === 'location' ||
                    (result as any).isWildBattle)
                  ? 1 / 512
                  : 0
                : 1),
          ),
          ...boosts.map((entry) => Number(entry.value)),
        ),
      )
    const additions = entries.filter((entry) => entry.operation === 'append')
    if (additions.length)
      write(result, field, [
        ...(read(result, field) || []),
        ...additions.flatMap((entry) => entry.value as unknown[]),
      ])
    const discounts = entries.filter((entry) => entry.operation === 'discount')
    if (discounts.length) {
      const factor = Math.min(...discounts.map((entry) => Number(entry.value)))
      write(
        result,
        field,
        read(result, field).map((item: any) => ({
          ...item,
          cost: item.cost.map((cost: any) => ({
            ...cost,
            amount: Math.max(1, Math.floor(cost.amount * factor)),
          })),
        })),
      )
    }
  }
  return result
}
export function assertNoEventConflicts(
  candidate: GameEventDefinition,
  others: GameEventDefinition[],
) {
  const check = (left: EventModifier, right: EventModifier, title: string) => {
    if (left.kind !== right.kind || left.targetId !== right.targetId) return
    if (
      !(
        left.field === right.field ||
        left.field.startsWith(`${right.field}.`) ||
        right.field.startsWith(`${left.field}.`)
      )
    )
      return
    if (
      left.field === right.field &&
      left.operation === right.operation &&
      (['boost', 'discount', 'append'].includes(left.operation) ||
        JSON.stringify(left.value) === JSON.stringify(right.value))
    )
      return
    throw new Error(
      `Conflicting ${left.field} on ${left.targetId} with ${title}`,
    )
  }
  candidate.modifiers.forEach((left, index) =>
    candidate.modifiers
      .slice(index + 1)
      .forEach((right) => check(left, right, candidate.title)),
  )
  for (const other of others) {
    if (
      other.id === candidate.id ||
      other.status !== 'published' ||
      Date.parse(candidate.startAt) >= Date.parse(other.endAt) ||
      Date.parse(other.startAt) >= Date.parse(candidate.endAt)
    )
      continue
    for (const left of candidate.modifiers)
      for (const right of other.modifiers) check(left, right, other.title)
  }
}
function scopeReferences(value: any, ids: Map<string, string>): any {
  if (Array.isArray(value))
    return value.map((entry) => scopeReferences(entry, ids))
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key,
      (key === 'targetId' &&
        [
          'task_completed',
          'task_active',
          'task_complete',
          'battle_result',
          'location_encounter_result',
          'field_research_result',
          'game_result',
        ].includes(value.type)) ||
      ['sourceIds', 'hide', 'overrides', 'sourceResearchId'].includes(key)
        ? Array.isArray(entry)
          ? entry.map((id) => ids.get(id) || id)
          : ids.get(String(entry)) || entry
        : scopeReferences(entry, ids),
    ]),
  )
}
export function resolveEventCatalog<K extends EventKind>(
  kind: K,
  base: EventConfigMap[K][],
  events: GameEventDefinition[],
  now = Date.now(),
): EffectiveConfig<K>[] {
  const active = events.filter((event) => eventPhase(event, now) === 'active')
  const configs: EffectiveConfig<K>[] = structuredClone(base)
  for (const event of active) {
    const ids = new Map(
      event.content.map((entry) => [
        String(entry.config.id),
        eventContentId(event.id, String(entry.config.id)),
      ]),
    )
    for (const entry of event.content.filter((entry) => entry.kind === kind)) {
      const config = scopeReferences(entry.config, ids)
      config.id = ids.get(String(entry.config.id))
      config.requirements = [
        ...(config.requirements || []),
        ...event.requirements,
      ]
      if (kind === 'shop')
        config.items = config.items.map((item: any) => ({
          ...item,
          id: eventContentId(event.id, `${entry.config.id}:${item.id}`),
        }))
      configs.push({
        ...config,
        eventContexts: [
          { id: event.id, title: event.title, endAt: event.endAt },
        ],
      })
    }
  }
  return configs.map((config) => {
    const affecting = active.filter((event) =>
      event.modifiers.some(
        (modifier) => modifier.kind === kind && modifier.targetId === config.id,
      ),
    )
    const modifiers = affecting.flatMap((event) =>
      event.modifiers
        .filter(
          (modifier) =>
            modifier.kind === kind && modifier.targetId === config.id,
        )
        .map((modifier) => ({
          ...modifier,
          value: scopeReferences(
            modifier.value,
            new Map(event.content.map((entry) => [
              String(entry.config.id),
              eventContentId(event.id, String(entry.config.id)),
            ])),
          ),
        }))
        .map((modifier) =>
          ['append', 'replace'].includes(modifier.operation) &&
          modifier.field === 'items'
            ? {
                ...modifier,
                value: (modifier.value as any[]).map((item) => ({
                  ...item,
                  id:
                    modifier.operation === 'replace' &&
                    ((config as any).items || []).some(
                      (existing: any) => existing.id === item.id,
                    )
                      ? item.id
                      : eventContentId(
                          event.id,
                          `${modifier.targetId}:${item.id}`,
                        ),
                })),
              }
            : modifier,
        ),
    )
    return {
      ...applyModifiers(config, modifiers),
      eventContexts: [
        ...(config.eventContexts || []),
        ...affecting.map((event) => ({
          id: event.id,
          title: event.title,
          endAt: event.endAt,
        })),
      ],
    }
  })
}
