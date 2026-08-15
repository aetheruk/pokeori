'use client'

import Image from 'next/image'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import {
  SAFFRON_TAKEOVER_MEMORIES,
  type SaffronTakeoverMemory,
} from '@/data/saffron-takeover'
import { cn } from '@/lib/utils'
import type { RequirementData } from '@/utilities/requirements'
import { hasCompletedTakeoverChronicle } from '@/utilities/story-state'

interface SaffronTakeoverViewProps {
  userData: RequirementData
}

export function SaffronTakeoverView({ userData }: SaffronTakeoverViewProps) {
  const isRevealed = (id: string) =>
    hasCompletedTakeoverChronicle(userData.expeditionResults, id)

  return (
    <div className="game-night relative h-full min-h-0 overflow-hidden bg-game-canvas text-game-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/backgrounds/saffron.avif"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-game-canvas/75" />
      </div>

      <div className="relative z-10 h-full min-h-0 overflow-y-auto px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-game-border bg-game-surface/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-game-muted">
            Saffron City · Blackout
          </div>
          <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-game-ink md:text-3xl">
            The Lights Went Out
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-game-muted">
            You wake on a cold floor with no memory of how you got here. Two
            accounts of the night are still sealed — Ariana’s and Detective Ray
            Choo’s. Recover both records and the city will remember with you.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {SAFFRON_TAKEOVER_MEMORIES.map((memory) => {
              const revealed =
                !memory.requiresCompleted ||
                memory.requiresCompleted.every((id) => isRevealed(id))
              return (
                <SaffronMemoryCard
                  key={memory.id}
                  memory={memory}
                  revealed={revealed}
                />
              )
            })}
          </div>

          <p className="mt-6 border-t border-dashed border-game-border pt-4 text-xs leading-relaxed text-game-muted">
            Explore is closed while the blackout lasts. Nothing else in the
            city is available — not yet.
          </p>
        </div>
      </div>
    </div>
  )
}

function SaffronMemoryCard({
  memory,
  revealed,
}: {
  memory: SaffronTakeoverMemory
  revealed: boolean
}) {
  return (
    <div
      role="note"
      aria-label={`${memory.speaker}: ${memory.title}`}
      className={cn(
        'rounded-lg border p-4',
        revealed
          ? 'border-game-moss/40 bg-game-surface/90'
          : 'border-game-border bg-game-surface/60',
      )}
    >
      <div className="flex items-start gap-3">
        <TaskIconDisplay
          icon={memory.icon}
          className={cn(
            'h-12 w-12 shrink-0 rounded-md border border-game-border bg-game-canvas/60',
            !revealed && 'opacity-70 grayscale',
          )}
        />
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-game-muted">
            {memory.speaker}
          </div>
          <h2 className="mt-1 font-serif text-base font-semibold text-game-ink">
            {memory.title}
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-game-muted">
        {memory.description}
      </p>
      <div
        className={cn(
          'mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium',
          revealed
            ? 'border-game-moss/40 bg-game-moss/10 text-game-moss-strong'
            : 'border-game-clay/40 bg-game-clay/10 text-game-clay',
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        {revealed ? 'Recovered' : 'Sealed memory'}
      </div>
    </div>
  )
}
