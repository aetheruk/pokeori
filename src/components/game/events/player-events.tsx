'use client'

import { useEffect, useState } from 'react'
import { getPlayerEvents } from '@/utilities/events/actions'

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
        const target = new URLSearchParams(window.location.search).get('event')
        if (target)
          requestAnimationFrame(() => {
            const element = document.getElementById(`event-${target}`)
            if (element instanceof HTMLDetailsElement) {
              element.open = true
              element.scrollIntoView({ block: 'nearest' })
            }
          })
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
export function PlayerEventAnnouncements({
  data,
  error,
}: ReturnType<typeof usePlayerEvents>) {
  if (!data?.announcements.length && !error) return null
  return (
    <section
      aria-label="Game events"
      className="max-h-52 shrink-0 overflow-y-auto border-b border-game-border bg-game-surface px-4 py-3"
    >
      <h2 className="mb-2 font-semibold">Upcoming and active events</h2>
      {error && (
        <p role="status" className="text-sm text-game-muted">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        {data?.announcements.map((event) => (
          <details
            key={event.id}
            id={`event-${event.id}`}
            className="min-w-56 flex-1 rounded-lg border border-game-border p-3"
          >
            <summary className="cursor-pointer font-semibold">
              {event.title}{' '}
              <span className="text-xs font-normal text-game-muted">
                {event.phase}
              </span>
            </summary>
            <p className="mt-2 text-sm">{event.description}</p>
            <p className="mt-1 text-xs text-game-muted">
              {new Date(event.startAt).toLocaleString()} –{' '}
              {new Date(event.endAt).toLocaleString()}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
