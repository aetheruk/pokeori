'use client'

import { useEffect, useState } from 'react'
import {
  Swords,
  MapPin,
  ShoppingBag,
  Binoculars,
  ScrollText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  changeGameEvent,
  getEventContentTemplate,
  getEventStudio,
  saveGameEvent,
  previewGameEvent,
  previewEventRarity,
} from '@/utilities/events/actions'
import {
  eventPhase,
  type EventDraft,
  type EventKind,
  type GameEventDefinition,
} from '@/utilities/events/model'
import { SchemaForm, formDefault, fieldLabel } from './schema-form'
import { ActivityEditor } from './activity-editor'
import { RANDOM_POKEMON_RARITIES } from '@/utilities/pokemon/rarity-chances'

const field =
  'game-focus-ring min-h-11 w-full rounded-lg border border-game-border bg-game-canvas px-3 py-2 text-sm'
const kinds: EventKind[] = [
  'battle',
  'location',
  'shop',
  'field-research',
  'task',
]
const labels: Record<EventKind, string> = {
  battle: 'Battle',
  location: 'Capture encounter',
  shop: 'Shop',
  'field-research': 'Field research',
  task: 'Task',
}
const steps = ['Details', 'Content', 'Schedule', 'Review']
const kindPresentation = {
  battle: { icon: Swords, description: 'A trainer challenge or wild battle' },
  location: { icon: MapPin, description: 'A place to find and catch Pokémon' },
  shop: { icon: ShoppingBag, description: 'Limited-time offers and stock' },
  'field-research': {
    icon: Binoculars,
    description: 'Pokémon to observe and study',
  },
  task: {
    icon: ScrollText,
    description: 'An objective with completion rewards',
  },
}
function freshDraft(): EventDraft {
  const now = Date.now()
  return {
    name: '',
    title: '',
    description: '',
    icon: { type: 'local', id: 'app-icon.avif' },
    startAt: new Date(now + 3600000).toISOString(),
    endAt: new Date(now + 90000000).toISOString(),
    visibleAt: new Date(now).toISOString(),
    requirements: [],
    notify: false,
    notificationBody: '',
    content: [],
    modifiers: [],
  }
}
function localDate(value: string) {
  const date = new Date(value)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}
function DateField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block text-sm">
      {label}
      <input
        className={field}
        type="datetime-local"
        value={localDate(value)}
        onChange={(event) => {
          if (event.target.value)
            onChange(new Date(event.target.value).toISOString())
        }}
      />
    </label>
  )
}

const defaultTransport = {
  getEventStudio,
  getEventContentTemplate,
  saveGameEvent,
  changeGameEvent,
  previewGameEvent,
}

export function EventStudio({
  transport = defaultTransport,
}: {
  transport?: typeof defaultTransport
} = {}) {
  const {
    getEventStudio,
    getEventContentTemplate,
    saveGameEvent,
    changeGameEvent,
    previewGameEvent,
  } = transport
  const [studio, setStudio] = useState<Awaited<
    ReturnType<typeof getEventStudio>
  > | null>(null)
  const [draft, setDraft] = useState<EventDraft | null>(null)
  const [selected, setSelected] = useState<GameEventDefinition | null>(null)
  const [tab, setTab] = useState('Details')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<EventKind>('battle')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState<Awaited<
    ReturnType<typeof previewGameEvent>
  > | null>(null)
  useEffect(() => {
    setPreview(null)
  }, [draft])
  const load = async () => setStudio(await getEventStudio())
  useEffect(() => {
    void getEventStudio()
      .then(setStudio)
      .catch((error) => setMessage(error.message))
  }, [getEventStudio])
  const run = async (operation: () => Promise<unknown>) => {
    setBusy(true)
    setMessage('')
    try {
      await operation()
      await load()
      setMessage('Saved.')
    } catch (error) {
      setMessage(
        error && typeof error === 'object' && 'issues' in error
          ? (error.issues as any[])
              .map((issue) => `${issue.path.join(' › ')}: ${issue.message}`)
              .join('\n')
          : error instanceof Error
            ? error.message
            : 'Unable to save',
      )
    } finally {
      setBusy(false)
    }
  }
  const edit = (event: GameEventDefinition, duplicate = false) => {
    const {
      id: _,
      revision: __,
      status: ___,
      updatedAt: ____,
      ...value
    } = event
    setSelected(duplicate ? null : event)
    setDraft(
      duplicate
        ? {
            ...value,
            ...(value.timingMode === 'manual' ? { enabled: false } : {}),
            name: `${value.name} copy`,
            ...{
              startAt: freshDraft().startAt,
              endAt: freshDraft().endAt,
              visibleAt: freshDraft().visibleAt,
            },
          }
        : value,
    )
    setTab('Details')
  }
  const save = (publish: boolean) =>
    run(async () => {
      if (!draft) return
      const saved = await saveGameEvent(draft, {
        id: selected?.id,
        revision: selected?.revision,
        publish,
        requestId: crypto.randomUUID(),
      })
      edit(saved)
      setTab(tab)
    })
  const live = selected && eventPhase(selected) === 'active'
  const frozen =
    selected &&
    !['draft', 'scheduled', 'disabled'].includes(eventPhase(selected))
  const choices = (studio?.catalog[kind] || []).filter((entry: any) =>
    `${entry.name} ${entry.category} ${entry.subCategory}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  return (
    <section
      aria-label="Event studio"
      className="mx-auto h-full min-h-0 w-full max-w-6xl space-y-5 overflow-y-auto overscroll-contain p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Events</h2>
          <p className="text-sm text-game-muted">
            Create temporary adventures and changes to the world.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelected(null)
            setDraft(freshDraft())
            setTab('Details')
          }}
        >
          Create event
        </Button>
      </div>
      <p role="status" className="whitespace-pre-wrap text-sm">
        {message}
      </p>
      {!draft ? (
        <>
          <select
            aria-label="Event status"
            className={field}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {[
              'all',
              'draft',
              'scheduled',
              'active',
              'disabled',
              'ended',
              'cancelled',
            ].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <div className="space-y-3">
            {studio?.events
              .filter(
                (event) => filter === 'all' || eventPhase(event) === filter,
              )
              .map((event) => (
                <article
                  key={event.id}
                  className="rounded-lg border border-game-border bg-game-surface p-4"
                >
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-game-muted">
                    {eventPhase(event)} ·{' '}
                    {event.timingMode === 'manual'
                      ? 'Manual on/off'
                      : `${new Date(event.startAt).toLocaleString()} – ${new Date(event.endAt).toLocaleString()}`}
                  </p>
                  <p className="text-sm">
                    {event.content.length} additions · {event.modifiers.length}{' '}
                    modifiers ·{' '}
                    {event.notify
                      ? 'Start notification enabled'
                      : 'No push notification'}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" onClick={() => edit(event)}>
                      Open
                    </Button>
                    <Button variant="outline" onClick={() => edit(event, true)}>
                      Duplicate
                    </Button>
                  </div>
                </article>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="sticky top-0 z-10 flex flex-wrap gap-2 border-b border-game-border bg-game-canvas py-3">
            {steps.map((value) => (
              <Button
                key={value}
                variant={tab === value ? 'default' : 'outline'}
                aria-current={tab === value ? 'step' : undefined}
                onClick={() => setTab(value)}
              >
                {value}
              </Button>
            ))}
            <Button variant="ghost" onClick={() => setDraft(null)}>
              Back to events
            </Button>
          </div>
          <fieldset
            disabled={busy || Boolean(frozen && !live)}
            className="space-y-4"
          >
            {tab === 'Details' && (
              <>
                <label className="block text-sm">
                  Internal name
                  <span className="block text-xs text-game-muted">
                    A private name to help you find this event later.
                  </span>
                  <input
                    className={field}
                    disabled={Boolean(frozen)}
                    value={draft.name}
                    onChange={(event) =>
                      setDraft({ ...draft, name: event.target.value })
                    }
                  />
                </label>
                <label className="block text-sm">
                  Player title
                  <input
                    className={field}
                    value={draft.title}
                    onChange={(event) =>
                      setDraft({ ...draft, title: event.target.value })
                    }
                  />
                </label>
                <label className="block text-sm">
                  Description
                  <textarea
                    className={field}
                    value={draft.description}
                    onChange={(event) =>
                      setDraft({ ...draft, description: event.target.value })
                    }
                  />
                </label>
                {!frozen && studio && (
                  <SchemaForm
                    schema={
                      studio.schemas.battle.properties?.requirements || {
                        type: 'array',
                      }
                    }
                    value={draft.requirements}
                    label="Event requirements"
                    onChange={(requirements) =>
                      setDraft({ ...draft, requirements })
                    }
                    root={studio.schemas.battle}
                  />
                )}
              </>
            )}
            {tab === 'Content' && (
              <fieldset disabled={Boolean(frozen)} className="space-y-4">
                <div>
                  <h3 className="font-semibold">
                    What happens during this event?
                  </h3>
                  <p className="text-sm text-game-muted">
                    Add a temporary activity, copy one as a starting point, or
                    change an existing activity below.
                  </p>
                </div>
                <fieldset
                  aria-label="Content type"
                  className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {kinds.map((value) => {
                    const Icon = kindPresentation[value].icon
                    return (
                      <button
                        type="button"
                        key={value}
                        aria-pressed={kind === value}
                        onClick={() => setKind(value)}
                        className={`game-focus-ring flex min-h-20 items-center gap-3 rounded-lg border p-3 text-left ${kind === value ? 'border-game-moss bg-game-surface' : 'border-game-border bg-game-canvas'}`}
                      >
                        <Icon className="h-6 w-6 shrink-0" />
                        <span>
                          <span className="block text-sm font-semibold">
                            {labels[value]}
                          </span>
                          <span className="block text-xs text-game-muted">
                            {kindPresentation[value].description}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </fieldset>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!studio) return
                    const config = formDefault(studio.schemas[kind])
                    config.id = `activity-${crypto.randomUUID()}`
                    config.icon = {
                      type: 'lucide',
                      id:
                        kind === 'battle'
                          ? 'Swords'
                          : kind === 'shop'
                            ? 'ShoppingBag'
                            : 'MapPin',
                    }
                    config.category = 'Events'
                    if (kind === 'location')
                      config.encounters = [{ speciesId: 1, chance: 1 }]
                    if (kind === 'battle') {
                      config.enemyTeam = [{ speciesId: 1, level: 5 }]
                      config.maxPokemon = 6
                    }
                    setDraft({
                      ...draft,
                      content: [...draft.content, { kind, config }],
                    })
                  }}
                >
                  Create {labels[kind].toLowerCase()} from scratch
                </Button>
                <input
                  className={field}
                  placeholder="Search existing content by name or area"
                  aria-label="Search content"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <select
                  aria-label="Copy existing content"
                  className={field}
                  value=""
                  onChange={(event) => {
                    const id = event.target.value
                    if (id)
                      void run(async () => {
                        const config = await getEventContentTemplate(kind, id)
                        config.id = `activity-${crypto.randomUUID()}`
                        setDraft({
                          ...draft,
                          content: [...draft.content, { kind, config }],
                        })
                      })
                  }}
                >
                  <option value="">Copy existing content…</option>
                  {choices.map((entry: any) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.name} · {entry.subCategory || entry.category}
                    </option>
                  ))}
                </select>
                {draft.content.map((entry, index) => (
                  <details
                    key={index}
                    open
                    className="rounded-lg border border-game-border bg-game-surface p-3"
                  >
                    <summary className="cursor-pointer py-2 font-semibold">
                      {labels[entry.kind]}:{' '}
                      {String(entry.config.name || 'New content')}
                    </summary>
                    {studio && (
                      <ActivityEditor
                        schema={studio.schemas[entry.kind]}
                        value={entry.config}
                        onChange={(config) =>
                          setDraft({
                            ...draft,
                            content: draft.content.map((old, position) =>
                              position === index ? { ...old, config } : old,
                            ),
                          })
                        }
                      />
                    )}
                    {(entry.kind === 'battle' || entry.kind === 'location') && (
                      <RarityPreview kind={entry.kind} config={entry.config} />
                    )}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          content: draft.content.filter(
                            (_, position) => position !== index,
                          ),
                        })
                      }
                    >
                      Remove content
                    </Button>
                  </details>
                ))}
                <h3 className="font-semibold">Change an existing activity</h3>
                <p className="text-sm text-game-muted">
                  Choose an activity to temporarily change its Pokémon, rarity
                  chances, rewards or shop offers. Original settings return when
                  the event ends.
                </p>
                <select
                  aria-label="Add modifier target"
                  className={field}
                  value=""
                  onChange={(event) => {
                    if (event.target.value)
                      setDraft({
                        ...draft,
                        modifiers: [
                          ...draft.modifiers,
                          {
                            kind,
                            targetId: event.target.value,
                            field: 'rewards',
                            operation: 'replace',
                            value: [],
                          },
                        ],
                      })
                  }}
                >
                  <option value="">Modify existing content…</option>
                  {choices.map((entry: any) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.name}
                    </option>
                  ))}
                </select>
                {draft.modifiers.map((modifier, index) => (
                  <ModifierEditor
                    key={index}
                    modifier={modifier}
                    studio={studio}
                    onChange={(next) =>
                      setDraft({
                        ...draft,
                        modifiers: draft.modifiers.map((old, position) =>
                          position === index ? next : old,
                        ),
                      })
                    }
                    onRemove={() =>
                      setDraft({
                        ...draft,
                        modifiers: draft.modifiers.filter(
                          (_, position) => position !== index,
                        ),
                      })
                    }
                  />
                ))}
              </fieldset>
            )}
            {tab === 'Schedule' && (
              <>
                <label className="block text-sm">
                  Timing mode
                  <select
                    className={field}
                    disabled={selected?.status === 'published'}
                    value={draft.timingMode || 'scheduled'}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        timingMode: event.target.value as
                          | 'manual'
                          | 'scheduled',
                        enabled: false,
                        startAt: freshDraft().startAt,
                        endAt: freshDraft().endAt,
                      })
                    }
                  >
                    <option value="scheduled">Scheduled start and end</option>
                    <option value="manual">Manual on/off</option>
                  </select>
                </label>
                {draft.timingMode === 'manual' ? (
                  <div className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
                    <h3 className="font-semibold">
                      Available until you switch it off
                    </h3>
                    <p className="text-sm text-game-muted">
                      No dates or duration needed. Disabling hides the event and
                      stops new entries. Existing battles and encounters can
                      finish. Re-enabling keeps task progress and shop stock
                      history.
                    </p>
                    {!selected || selected.status === 'draft' ? (
                      <label className="flex min-h-11 items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(draft.enabled)}
                          onChange={(event) =>
                            setDraft({
                              ...draft,
                              enabled: event.target.checked,
                            })
                          }
                        />
                        Enable when published
                      </label>
                    ) : (
                      <p className="text-sm font-semibold">
                        Currently {selected.enabled ? 'on' : 'off'}. Use{' '}
                        {selected.enabled ? 'Disable event' : 'Enable event'}{' '}
                        below.
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-game-muted">
                      Times shown in{' '}
                      {Intl.DateTimeFormat().resolvedOptions().timeZone}.
                    </p>
                    <fieldset disabled={Boolean(frozen)} className="space-y-3">
                      <DateField
                        label="Starts"
                        value={draft.startAt}
                        onChange={(startAt) => setDraft({ ...draft, startAt })}
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            startAt: new Date().toISOString(),
                          })
                        }
                      >
                        Start now when published
                      </Button>
                    </fieldset>
                    <DateField
                      label="Ends"
                      value={draft.endAt}
                      onChange={(endAt) => setDraft({ ...draft, endAt })}
                    />
                    <label className="block text-sm">
                      Duration (hours)
                      <input
                        className={field}
                        type="number"
                        min="0.01"
                        step="any"
                        value={
                          (Date.parse(draft.endAt) -
                            Date.parse(draft.startAt)) /
                          3600000
                        }
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            endAt: new Date(
                              Date.parse(draft.startAt) +
                                Math.max(0.01, Number(event.target.value)) *
                                  3600000,
                            ).toISOString(),
                          })
                        }
                      />
                    </label>
                  </>
                )}
                <fieldset disabled={Boolean(frozen)} className="space-y-3">
                  <label className="flex min-h-11 items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.visibleAt !== null}
                      onChange={(event) =>
                        setDraft({
                          ...draft,
                          visibleAt: event.target.checked
                            ? new Date().toISOString()
                            : null,
                        })
                      }
                    />
                    Show an Explore announcement
                  </label>
                  {draft.visibleAt && draft.timingMode !== 'manual' && (
                    <DateField
                      label="Announcement visible from"
                      value={draft.visibleAt}
                      onChange={(visibleAt) =>
                        setDraft({ ...draft, visibleAt })
                      }
                    />
                  )}
                  <label className="flex min-h-11 items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft.notify}
                      onChange={(event) =>
                        setDraft({ ...draft, notify: event.target.checked })
                      }
                    />
                    Notify opted-in devices at activation
                  </label>
                  {draft.notify && (
                    <label className="block text-sm">
                      Notification message
                      <input
                        className={field}
                        maxLength={240}
                        value={draft.notificationBody}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            notificationBody: event.target.value,
                          })
                        }
                      />
                    </label>
                  )}
                </fieldset>
              </>
            )}
            {tab === 'Review' && (
              <article className="space-y-3 rounded-lg border border-game-border bg-game-surface p-4">
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() => {
                    setBusy(true)
                    setMessage('')
                    void previewGameEvent(draft, selected?.id)
                      .then((result) => {
                        setPreview(result)
                        setMessage('Preview validated.')
                      })
                      .catch((error) => setMessage(error.message))
                      .finally(() => setBusy(false))
                  }}
                >
                  Validate and preview effective content
                </Button>
                {preview?.map((entry, index) => (
                  <details key={index}>
                    <summary className="cursor-pointer py-2">
                      Effective {labels[entry.kind]}: {entry.config.name}
                    </summary>
                    <fieldset disabled>
                      {studio && (
                        <SchemaForm
                          schema={studio.schemas[entry.kind]}
                          value={entry.config}
                          label={labels[entry.kind]}
                          onChange={() => {}}
                        />
                      )}
                    </fieldset>
                    {(entry.kind === 'battle' || entry.kind === 'location') && (
                      <RarityPreview kind={entry.kind} config={entry.config} />
                    )}
                  </details>
                ))}
                <h3 className="text-lg font-semibold">
                  {draft.title || 'Untitled event'}
                </h3>
                <p>{draft.description}</p>
                <p>
                  {draft.timingMode === 'manual'
                    ? `Manual event · ${draft.enabled ? 'On until switched off' : 'Off until enabled by an admin'}`
                    : `${new Date(draft.startAt).toLocaleString()} – ${new Date(draft.endAt).toLocaleString()}`}
                </p>
                {draft.content.map((entry, index) => (
                  <p key={index}>
                    {labels[entry.kind]}: {String(entry.config.name)} ·{' '}
                    {String(entry.config.category)}
                  </p>
                ))}
                {draft.modifiers.map((entry, index) => (
                  <p key={index}>
                    {entry.targetId}: {entry.operation} {entry.field}
                  </p>
                ))}
                {draft.notify && (
                  <p>
                    Push: {draft.title} —{' '}
                    {draft.notificationBody || draft.description.slice(0, 240)}
                  </p>
                )}
                <p className="text-sm text-game-muted">
                  Publishing checks all configuration fields, target conflicts,
                  and overlapping schedules. Gameplay settings freeze when the
                  event starts.
                </p>
              </article>
            )}
          </fieldset>
          <div className="flex flex-wrap gap-2 border-t border-game-border pt-4">
            {tab !== 'Review' && (
              <Button onClick={() => setTab(steps[steps.indexOf(tab) + 1])}>
                Continue to {steps[steps.indexOf(tab) + 1].toLowerCase()}
              </Button>
            )}
            {!frozen && (
              <>
                <Button
                  disabled={busy}
                  variant="outline"
                  onClick={() => void save(false)}
                >
                  {selected?.status === 'published'
                    ? 'Save changes'
                    : 'Save draft'}
                </Button>
                {selected?.status !== 'published' && (
                  <Button
                    disabled={
                      busy ||
                      tab !== 'Review' ||
                      (draft.modifiers.length > 0 && !preview)
                    }
                    onClick={() => void save(true)}
                  >
                    Publish event
                  </Button>
                )}
              </>
            )}
            {live && (
              <>
                <Button
                  disabled={busy}
                  onClick={() =>
                    void run(async () =>
                      setSelected(
                        await changeGameEvent(
                          selected.id,
                          selected.revision,
                          {
                            action: 'update',
                            title: draft.title,
                            description: draft.description,
                            ...(draft.timingMode !== 'manual'
                              ? { endAt: draft.endAt }
                              : {}),
                          },
                          crypto.randomUUID(),
                        ),
                      ),
                    )
                  }
                >
                  Save live details
                </Button>
                {selected.timingMode !== 'manual' && (
                  <Button
                    disabled={busy}
                    variant="outline"
                    onClick={() =>
                      void run(async () => {
                        await changeGameEvent(
                          selected.id,
                          selected.revision,
                          { action: 'end' },
                          crypto.randomUUID(),
                        )
                        setDraft(null)
                      })
                    }
                  >
                    End now
                  </Button>
                )}
              </>
            )}
            {selected?.status === 'published' &&
              selected.timingMode === 'manual' && (
                <Button
                  disabled={busy}
                  variant={selected.enabled ? 'outline' : 'default'}
                  onClick={() =>
                    void run(async () => {
                      const next = await changeGameEvent(
                        selected.id,
                        selected.revision,
                        { action: selected.enabled ? 'disable' : 'enable' },
                        crypto.randomUUID(),
                      )
                      edit(next)
                    })
                  }
                >
                  {selected.enabled ? 'Disable event' : 'Enable event'}
                </Button>
              )}
            {selected &&
              ['draft', 'scheduled'].includes(eventPhase(selected)) && (
                <Button
                  disabled={busy}
                  variant="outline"
                  onClick={() =>
                    void run(async () => {
                      await changeGameEvent(
                        selected.id,
                        selected.revision,
                        { action: 'cancel' },
                        crypto.randomUUID(),
                      )
                      setDraft(null)
                    })
                  }
                >
                  Cancel event
                </Button>
              )}
          </div>
        </>
      )}
    </section>
  )
}

function RarityPreview({
  kind,
  config,
}: {
  kind: 'location' | 'battle'
  config: any
}) {
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof previewEventRarity>
  > | null>(null)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const entries = kind === 'location' ? config.encounters : config.enemyTeam
  useEffect(() => {
    setResult(null)
  }, [config, index])
  return (
    <details className="my-3 rounded-lg border border-game-border p-3">
      <summary className="cursor-pointer py-2 font-semibold">
        Rarity preview for my trainer
      </summary>
      <select
        className={field}
        aria-label="Preview Pokémon entry"
        value={index}
        onChange={(event) => setIndex(Number(event.target.value))}
      >
        {entries?.map((entry: any, position: number) => (
          <option key={position} value={position}>
            Pokémon {entry.formId || entry.speciesId} · Entry {position + 1}
          </option>
        ))}
      </select>
      <Button
        variant="outline"
        disabled={busy}
        onClick={() => {
          setBusy(true)
          setMessage('')
          const { eventContexts: _, ...input } = config
          void previewEventRarity(kind, input, index)
            .then(setResult)
            .catch((error) => setMessage(error.message))
            .finally(() => setBusy(false))
        }}
      >
        Calculate probabilities
      </Button>
      <p role="status" className="text-sm">
        {message}
      </p>
      {result && (
        <>
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th>Rarity</th>
                <th>Base</th>
                <th>My trainer</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.base)
                .filter(
                  ([rarity, chance]) =>
                    chance > 0 ||
                    result.current[rarity as keyof typeof result.current] > 0,
                )
                .map(([rarity, chance]) => (
                  <tr key={rarity}>
                    <td>{rarity}</td>
                    <td>{(chance * 100).toFixed(4)}%</td>
                    <td>
                      {(
                        result.current[rarity as keyof typeof result.current] *
                        100
                      ).toFixed(4)}
                      %
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <p className="text-sm text-game-muted">{result.note}</p>
        </>
      )}
    </details>
  )
}

function ModifierEditor({
  modifier,
  studio,
  onChange,
  onRemove,
}: {
  modifier: EventDraft['modifiers'][number]
  studio: Awaited<ReturnType<typeof getEventStudio>> | null
  onChange: (value: EventDraft['modifiers'][number]) => void
  onRemove: () => void
}) {
  const schema = studio?.schemas[modifier.kind] as any
  const fields = Object.keys(schema?.properties || {}).filter(
    (key) =>
      !['id', 'requirements', 'gameType', 'hide', 'overrides'].includes(key),
  )
  if (schema?.properties?.rarityChances)
    fields.push(
      ...RANDOM_POKEMON_RARITIES.map((rarity) => `rarityChances.${rarity}`),
    )
  if (schema?.properties?.settings?.properties)
    fields.push(
      ...Object.keys(schema.properties.settings.properties).map(
        (key) => `settings.${key}`,
      ),
    )
  const schemaAt = (path: string) =>
    path.startsWith('rarityChances.')
      ? { type: 'number', minimum: 0, maximum: 1 }
      : path
          .split('.')
          .reduce(
            (node: any, key: string) => node?.properties?.[key],
            schema,
          ) || { type: 'string' }
  const valueSchema =
    modifier.operation === 'discount' || modifier.operation === 'boost'
      ? {
          type: 'number',
          minimum: 0,
          maximum: modifier.operation === 'discount' ? 1 : undefined,
        }
      : schemaAt(modifier.field)
  return (
    <fieldset className="space-y-3 rounded-lg border border-game-border p-3">
      <legend className="font-semibold">
        {studio?.catalog[modifier.kind]?.find(
          (entry: any) => entry.id === modifier.targetId,
        )?.name || modifier.targetId}
      </legend>
      <p className="text-sm text-game-muted">
        Choose what changes and how it applies during the event.
      </p>
      <select
        aria-label="Modifier field"
        className={field}
        value={modifier.field}
        onChange={(event) => {
          const key = event.target.value
          onChange({
            ...modifier,
            field: key,
            operation: 'replace',
            value: formDefault(schemaAt(key)),
          })
        }}
      >
        {fields.map((key) => (
          <option key={key} value={key}>
            {fieldLabel(key)}
          </option>
        ))}
      </select>
      <select
        aria-label="Modifier operation"
        className={field}
        value={modifier.operation}
        onChange={(event) => {
          const operation = event.target.value as typeof modifier.operation
          onChange({
            ...modifier,
            operation,
            value: ['boost', 'discount'].includes(operation)
              ? 1
              : formDefault(schemaAt(modifier.field)),
          })
        }}
      >
        <option value="replace">Replace while active</option>
        {[
          'items',
          'rewards',
          'encounters',
          'enemyTeam',
          'settings.itemDrops',
          'settings.pokemonPool',
        ].includes(modifier.field) && (
          <option value="append">Add entries</option>
        )}
        {(modifier.field.startsWith('rarityChances.') ||
          modifier.field === 'generatedXpMultiplier') && (
          <option value="boost">Strongest boost wins</option>
        )}
        {modifier.kind === 'shop' && modifier.field === 'items' && (
          <option value="discount">Price factor (0–1)</option>
        )}
      </select>
      <SchemaForm
        schema={valueSchema}
        value={modifier.value}
        label={modifier.field}
        root={schema}
        onChange={(value) => onChange({ ...modifier, value })}
      />
      <Button variant="outline" onClick={onRemove}>
        Remove modifier
      </Button>
    </fieldset>
  )
}
