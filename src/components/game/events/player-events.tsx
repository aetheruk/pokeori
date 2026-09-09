'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getPlayerEvents } from '@/utilities/events/actions'
import { ExploreCard } from '@/components/game/features/explore/ExploreCard'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import type { RequirementData } from '@/utilities/requirements'
import type { ExploreItem } from '@/components/game/features/explore/types'

export function usePlayerEvents() {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof getPlayerEvents>
  > | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    let disposed = false
    let timer: ReturnType<typeof setTimeout>
    const refresh = async () => {
      clearTimeout(timer)
      try {
        const next = await getPlayerEvents()
        if (disposed) return
        setData(next)
        setError('')
        const boundaries = next.announcements
          .flatMap((event) => [
            Date.parse(event.startAt),
            Date.parse(event.endAt),
          ])
          .filter((time) => time > Date.now())
        const delay = Math.max(
          1000,
          Math.min(30000, ...boundaries.map((time) => time - Date.now() + 50)),
        )
        timer = setTimeout(() => void refresh(), delay)
      } catch {
        if (!disposed) {
          setError(
            'Event updates are unavailable. Actions will recheck availability.',
          )
          timer = setTimeout(() => void refresh(), 30000)
        }
      }
    }
    const onRefresh = () => {
      if (!document.hidden) void refresh()
    }
    void refresh()
    window.addEventListener('focus', onRefresh)
    window.addEventListener('game-events-refresh', onRefresh)
    return () => {
      disposed = true
      clearTimeout(timer)
      window.removeEventListener('focus', onRefresh)
      window.removeEventListener('game-events-refresh', onRefresh)
    }
  }, [])
  return { data, error }
}
export function PlayerEventsCard({
  data,
  error,
  userData,
  trainerName,
  playSelectSfx,
}: ReturnType<typeof usePlayerEvents> & {
  userData: RequirementData
  trainerName: string
  playSelectSfx: () => void
}) {
  const [open, setOpen] = useState(false)
  const openedTarget = useRef<string | null>(null)
  const scrolledTarget = useRef<string | null>(null)
  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get('event')
    if (
      target &&
      target !== openedTarget.current &&
      data?.announcements.some((event) => event.id === target)
    ) {
      openedTarget.current = target
      setOpen(true)
    }
  }, [data])
  const targetRef = useCallback((element: HTMLElement | null) => {
    if (
      element &&
      element.id === `event-${openedTarget.current}` &&
      scrolledTarget.current !== element.id
    ) {
      scrolledTarget.current = element.id
      element.scrollIntoView({ block: 'nearest' })
    }
  }, [])
  if (!data?.announcements.length && !error) return null
  const active =
    data?.announcements.filter((event) => event.phase === 'active').length || 0
  const upcoming = (data?.announcements.length || 0) - active
  const summary = error
    ? 'Updates unavailable'
    : [active ? `${active} active` : '', upcoming ? `${upcoming} upcoming` : '']
        .filter(Boolean)
        .join(' · ')
  const item: ExploreItem = {
    id: 'active-events',
    name: 'Active Events',
    description: 'See what is happening around the world.',
    category: 'Events',
    type: 'events',
    icon: { type: 'lucide', id: 'CalendarDays' },
    originalData: { summary },
  }
  return (
    <section aria-label="Game events">
      <SectionDivider>Events</SectionDivider>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <ExploreCard
          entry={{ kind: 'single', item }}
          trainerName={trainerName}
          userData={userData}
          activeVoyages={[]}
          activeExpedition={null}
          onAction={() => setOpen(true)}
          playSelectSfx={playSelectSfx}
          setActiveShop={() => {}}
          setSelectedItem={() => setOpen(true)}
        />
      </div>
      <ResponsivePanel
        open={open}
        onOpenChange={setOpen}
        title="Active Events"
        description="Current events and upcoming adventures."
        className="flex flex-col overflow-hidden"
      >
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 pb-8 md:p-6">
          {error && (
            <p role="status" className="text-sm text-game-muted">
              {error}
            </p>
          )}
          {data?.announcements.map((event) => (
            <article
              key={event.id}
              id={`event-${event.id}`}
              ref={targetRef}
              className="rounded-lg border border-game-border bg-game-surface p-4"
            >
              <p className="mb-1 text-xs font-semibold text-game-moss-strong">
                {event.phase === 'active' ? 'Active now' : 'Upcoming'}
              </p>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm">
                {event.description}
              </p>
              <p className="mt-3 text-xs text-game-muted">
                Starts {new Date(event.startAt).toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-game-muted">
                {event.timingMode === 'manual'
                  ? 'Until switched off by an admin'
                  : `Ends ${new Date(event.endAt).toLocaleString()}`}
              </p>
            </article>
          ))}
        </div>
      </ResponsivePanel>
    </section>
  )
}
