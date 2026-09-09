'use client'

import { useMemo } from 'react'
import { EventStudio } from '@/components/game/events/event-studio'
import {
  eventDraftSchema,
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
        const event: GameEventDefinition = {
          ...draft,
          id: 'fixture-event',
          status: options.publish ? 'published' : 'draft',
          revision: 1,
        }
        events.splice(0, events.length, event)
        return event
      },
      changeGameEvent: async () => events[0],
      previewGameEvent: async () => [],
    }
  }, [schemas])
  return (
    <main className="min-h-screen bg-game-canvas text-game-ink">
      <EventStudio transport={transport} />
    </main>
  )
}
