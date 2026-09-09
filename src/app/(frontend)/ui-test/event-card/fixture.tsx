'use client'

import { PlayerEventsCard } from '@/components/game/events/player-events'
import { ExploreGrid } from '@/components/game/features/explore/ExploreGrid'
import type { RequirementData } from '@/utilities/requirements'

const userData = { pokemon: [] } as unknown as RequirementData
const noop = () => {}
export function EventCardFixture() {
  const data = {
    content: [],
    participation: [],
    announcements: Array.from({ length: 8 }, (_, index) => ({
      id: `event-${index}`,
      title: index === 0 ? 'Route 1 outbreak' : `Adventure ${index}`,
      description:
        'Explore new encounters and special opportunities around the region.',
      icon: { type: 'lucide' as const, id: 'CalendarDays' },
      startAt: '2026-09-10T12:00:00Z',
      endAt: '2026-09-11T12:00:00Z',
      phase: index === 0 ? ('active' as const) : ('scheduled' as const),
    })),
  }
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-game-canvas text-game-ink">
      <header className="shrink-0 border-b border-game-border p-4">
        Explore
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ExploreGrid
          filteredItems={[]}
          activeCategory="Kanto"
          activeVoyages={[]}
          activeExpedition={null}
          trainerName="Trainer"
          userData={userData}
          onAction={noop}
          playSelectSfx={noop}
          setActiveShop={noop}
          setSelectedItem={noop}
          vsSeekerEvent={{
            id: 'vs-seeker',
            name: 'VS Seeker',
            description: '',
            category: 'Kanto',
            type: 'vs-seeker',
            icon: { type: 'item', id: 'vs-seeker' },
            originalData: {},
          }}
          eventsCard={
            <PlayerEventsCard
              data={data}
              error=""
              userData={userData}
              trainerName="Trainer"
              playSelectSfx={noop}
            />
          }
        />
      </div>
      <footer className="shrink-0 border-t border-game-border p-4">
        Game sections
      </footer>
    </main>
  )
}
