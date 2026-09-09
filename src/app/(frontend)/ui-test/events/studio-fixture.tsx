'use client'

import { useMemo } from 'react'
import { EventStudio } from '@/components/game/events/event-studio'
import { EventReferenceSearch } from '@/components/game/events/schema-form'
import {
  eventDraftSchema,
  eventContentSchemas,
  setManualEventEnabled,
  MANUAL_EVENT_END,
  type GameEventDefinition,
} from '@/utilities/events/model'

export function EventStudioFixture({
  schemas,
}: {
  schemas: Record<string, any>
}) {
  const transport = useMemo(() => {
    const events: GameEventDefinition[] = []
    return {
      getEventStudio: async () => ({
        events: [...events],
        schemas,
        catalog: {},
      }),
      getEventContentTemplate: async () => ({}),
      saveGameEvent: async (value: unknown, options: any) => {
        const draft = eventDraftSchema.parse(value)
        for (const entry of draft.content)
          eventContentSchemas[entry.kind].parse(entry.config)
        const event: GameEventDefinition = {
          ...draft,
          ...(draft.timingMode === 'manual'
            ? {
                startAt: new Date().toISOString(),
                endAt: draft.enabled
                  ? MANUAL_EVENT_END
                  : new Date().toISOString(),
              }
            : {}),
          id: 'fixture-event',
          status: options.publish ? 'published' : 'draft',
          revision: 1,
        }
        events.splice(0, events.length, event)
        return event
      },
      changeGameEvent: async (
        _id: string,
        _revision: number,
        change: { action: string },
      ) => {
        events[0] = {
          ...setManualEventEnabled(events[0], change.action === 'enable'),
          revision: events[0].revision + 1,
        }
        return events[0]
      },
      previewGameEvent: async () => [],
    }
  }, [schemas])
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-game-canvas text-game-ink">
      <header className="shrink-0 border-b border-game-border p-4">
        Trainer journal
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="h-full min-h-0 min-w-0 overflow-hidden">
          <EventReferenceSearch.Provider
            value={async (_type, query) =>
              [
                { id: '1', name: 'Bulbasaur' },
                { id: '25', name: 'Pikachu' },
                { id: '133', name: 'Eevee' },
              ].filter((entry) =>
                `${entry.id} ${entry.name}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
            }
          >
            <EventStudio transport={transport} />
          </EventReferenceSearch.Provider>
        </div>
      </div>
      <footer className="shrink-0 border-t border-game-border p-4">
        Trainer sections
      </footer>
    </main>
  )
}
