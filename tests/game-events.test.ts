import { describe, expect, test } from 'bun:test'
import {
  eventDraftSchema,
  eventPhase,
  setManualEventEnabled,
  MANUAL_EVENT_END,
  eventNotificationRun,
  type GameEventDefinition,
} from '@/utilities/events/model'
import {
  applyModifiers,
  assertNoEventConflicts,
  resolveEventCatalog,
  validateModifier,
} from '@/utilities/events/resolve'
import {
  GameEvents,
  EventParticipation,
  EventAudit,
  EventDeliveries,
} from '@/collections/GameEvents'
import { resolveTrainerSection } from '@/components/game/trainer/trainer-sections'
import { locations } from '@/data/locations'
import { battles } from '@/data/battles'
import { rarityChancesSchema } from '@/utilities/pokemon/rarity-chances'

const now = Date.parse('2026-09-09T12:00:00Z')
const encounter = {
  id: 'route-1',
  name: 'Route 1',
  description: 'Grass',
  category: 'Kanto',
  icon: { type: 'item' as const, id: 'poke-ball' },
  requirements: [],
  rewards: [],
  encounters: [{ speciesId: 25, chance: 100 }],
}
function event(
  overrides: Partial<GameEventDefinition> = {},
): GameEventDefinition {
  return {
    id: 'test',
    name: 'Test',
    title: 'Outbreak',
    description: 'Test event',
    icon: { type: 'local', id: 'app-icon.avif' },
    status: 'published',
    revision: 1,
    startAt: new Date(now).toISOString(),
    endAt: new Date(now + 3600000).toISOString(),
    visibleAt: new Date(now).toISOString(),
    requirements: [],
    notify: false,
    notificationBody: '',
    content: [],
    modifiers: [],
    ...overrides,
  }
}
describe('game events', () => {
  test('manual events toggle indefinitely without replacing content identities', () => {
    const disabled = event({ timingMode: 'manual', enabled: false, content: [{ kind: 'location', config: encounter }] })
    expect(eventPhase(disabled, now)).toBe('disabled')
    expect(resolveEventCatalog('location', [], [disabled], now)).toHaveLength(0)
    const enabled = setManualEventEnabled(disabled, true, now)
    expect(enabled.endAt).toBe(MANUAL_EVENT_END)
    const first = resolveEventCatalog('location', [], [enabled], now)[0]
    expect(eventPhase(enabled, now + 365 * 86400000)).toBe('active')
    expect(first.eventContexts?.[0].timingMode).toBe('manual')
    const paused = setManualEventEnabled(enabled, false, now + 1000)
    expect(Date.parse(paused.endAt)).toBe(now + 1000)
    expect(resolveEventCatalog('location', [], [paused], now + 1000)).toHaveLength(0)
    const resumed = setManualEventEnabled(paused, true, now + 2000)
    expect(resolveEventCatalog('location', [], [resumed], now + 2000)[0].id).toBe(first.id)
    expect(eventNotificationRun(resumed)).not.toBe(eventNotificationRun(enabled))
    expect(eventNotificationRun(event())).toBe('test')
    expect(() => setManualEventEnabled(event(), true)).toThrow('manual')
    expect(() => setManualEventEnabled({ ...disabled, status: 'draft' }, true)).toThrow('published')
    expect(() => setManualEventEnabled(enabled, true)).toThrow('already enabled')
  })
  test('manual events reserve future modifier windows only while enabled', () => {
    const manual = setManualEventEnabled(event({ timingMode: 'manual', enabled: false, modifiers: [{ kind: 'location', targetId: 'route-1', field: 'timer', operation: 'replace', value: 30 }] }), true, now)
    const future = event({ id: 'future', startAt: new Date(now + 86400000).toISOString(), endAt: new Date(now + 2 * 86400000).toISOString(), modifiers: [{ ...manual.modifiers[0], value: 60 }] })
    expect(() => assertNoEventConflicts(manual, [future])).toThrow('Conflicting')
    expect(() => assertNoEventConflicts(future, [manual])).toThrow('Conflicting')
    const off = setManualEventEnabled(manual, false, now + 1000)
    expect(() => assertNoEventConflicts(off, [future])).not.toThrow()
    expect(() => assertNoEventConflicts(future, [off])).not.toThrow()
  })
  test('modifier activity references use the run identity without rewriting item rewards', () => {
    const definition = event({
      content: [{ kind: 'location', config: encounter }],
      modifiers: [{
        kind: 'location', targetId: encounter.id, field: 'rewards', operation: 'append',
        value: [
          { type: 'task_complete', targetId: encounter.id },
          { type: 'item', targetId: encounter.id, amount: 1 },
        ],
      }],
    })
    const resolved = resolveEventCatalog('location', [encounter], [definition], now)
    expect(resolved[0].rewards[0].targetId).toBe('event:test:route-1')
    expect(resolved[0].rewards[1].targetId).toBe('route-1')
  })
  test('server timestamps determine half-open activation independent of a worker', () => {
    expect(eventPhase(event(), now - 1)).toBe('scheduled')
    expect(eventPhase(event(), now)).toBe('active')
    expect(eventPhase(event(), now + 3600000)).toBe('ended')
    expect(eventPhase(event({ status: 'cancelled' }), now)).toBe('cancelled')
  })
  test('new content gets a run identity and disappears at expiry without mutating the catalog', () => {
    const definition = event({
      content: [{ kind: 'location', config: encounter }],
    })
    const active = resolveEventCatalog(
      'location',
      [encounter],
      [definition],
      now,
    )
    expect(active.map((entry) => entry.id)).toEqual([
      'route-1',
      'event:test:route-1',
    ])
    expect(
      resolveEventCatalog('location', [encounter], [definition], now + 3600000),
    ).toHaveLength(1)
    expect(encounter.id).toBe('route-1')
    expect(active[1].eventContexts?.[0].endAt).toBe(definition.endAt)
  })
  test('strongest independent rarity boosts win', () => {
    const modifiers = [0.1, 0.2].map((value) => ({
      kind: 'location' as const,
      targetId: 'route-1',
      field: 'rarityChances.shadow',
      operation: 'boost' as const,
      value,
    }))
    const events = modifiers.map((modifier, index) =>
      event({ id: String(index), modifiers: [modifier] }),
    )
    expect(
      resolveEventCatalog('location', [encounter], events, now)[0].rarityChances
        ?.shadow,
    ).toBe(0.2)
    expect(() =>
      assertNoEventConflicts(events[0], events.slice(1)),
    ).not.toThrow()
  })
  test('conflicting overlapping replacements are rejected but adjacent schedules work', () => {
    const a = event({
      modifiers: [
        {
          kind: 'location',
          targetId: 'route-1',
          field: 'timer',
          operation: 'replace',
          value: 30,
        },
      ],
    })
    const b = event({
      id: 'other',
      modifiers: [{ ...a.modifiers[0], value: 60 }],
    })
    expect(() => assertNoEventConflicts(a, [b])).toThrow('Conflicting')
    expect(() =>
      assertNoEventConflicts(a, [{ ...b, startAt: a.endAt }]),
    ).not.toThrow()
  })
  test('rejects invalid odds, forbidden paths and unsupported modifiers', () => {
    expect(() =>
      validateModifier(
        {
          kind: 'location',
          targetId: encounter.id,
          field: 'rarityChances.shadow',
          operation: 'boost',
          value: 2,
        },
        encounter,
      ),
    ).toThrow()
    expect(() =>
      validateModifier(
        {
          kind: 'location',
          targetId: encounter.id,
          field: '__proto__.polluted',
          operation: 'replace',
          value: true,
        },
        encounter,
      ),
    ).toThrow()
    expect(() =>
      validateModifier(
        {
          kind: 'location',
          targetId: encounter.id,
          field: 'id',
          operation: 'replace',
          value: 'other',
        },
        encounter,
      ),
    ).toThrow()
  })
  test('discounts preserve identity and round to a positive integer cost', () => {
    const shop = {
      items: [{ id: 'offer', cost: [{ id: 'crystals', amount: 11 }] }],
    }
    const discounted = applyModifiers(shop, [
      {
        kind: 'shop',
        targetId: 'shop',
        field: 'items',
        operation: 'discount',
        value: 0.5,
      },
    ])
    expect(discounted.items[0]).toEqual({
      id: 'offer',
      cost: [{ id: 'crystals', amount: 5 }],
    })
    expect(shop.items[0].cost[0].amount).toBe(11)
  })
  test('draft validation rejects duplicate content and invalid schedules', () => {
    const {
      id: _,
      revision: __,
      status: ___,
      ...draft
    } = event({ content: [{ kind: 'location', config: encounter }] })
    expect(eventDraftSchema.safeParse(draft).success).toBe(true)
    expect(
      eventDraftSchema.safeParse({ ...draft, endAt: draft.startAt }).success,
    ).toBe(false)
    expect(
      eventDraftSchema.safeParse({
        ...draft,
        content: [...draft.content, ...draft.content],
      }).success,
    ).toBe(false)
  })
  test('event storage is private and Trainer navigation requires admin', () => {
    for (const collection of [
      GameEvents,
      EventParticipation,
      EventAudit,
      EventDeliveries,
    ])
      for (const operation of ['read', 'create', 'update', 'delete'] as const)
        expect((collection.access![operation] as () => boolean)()).toBe(false)
    expect(
      resolveTrainerSection('events', { hasDeckBox: false, isKidMode: false }),
    ).toBe('profile')
    expect(
      resolveTrainerSection('events', {
        hasDeckBox: false,
        isKidMode: false,
        isAdmin: true,
      }),
    ).toBe('events')
  })
  test('all authored encounter and battle chance maps validate', () => {
    for (const location of locations) {
      if (location.rarityChances)
        expect(
          rarityChancesSchema.safeParse(location.rarityChances).success,
        ).toBe(true)
      for (const entry of location.encounters)
        if (entry.rarityChances)
          expect(
            rarityChancesSchema.safeParse(entry.rarityChances).success,
          ).toBe(true)
    }
    for (const battle of battles) {
      if (battle.rarityChances)
        expect(
          rarityChancesSchema.safeParse(battle.rarityChances).success,
        ).toBe(true)
      for (const entry of battle.enemyTeam)
        if (entry.rarityChances)
          expect(
            rarityChancesSchema.safeParse(entry.rarityChances).success,
          ).toBe(true)
    }
  })
})
