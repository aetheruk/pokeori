'use client'

import { Check, Eye, Search } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import type { MoveConfig } from '@/data/moves/types'
import { cn } from '@/lib/utils'
import { getMoveLearnersForMove } from '@/utilities/pokemon/movedex'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'

export type MoveLearnerProgress = Record<
  string,
  { seen?: boolean | null; caught?: boolean | null }
>

export function MoveLearnerList({
  move,
  progressByForm,
}: {
  move: MoveConfig
  progressByForm: MoveLearnerProgress
}) {
  const { learners } = useMemo(() => getMoveLearnersForMove(move), [move])
  const [query, setQuery] = useState('')
  const [caughtOnly, setCaughtOnly] = useState(false)
  const normalizedQuery = query.trim().toLowerCase()
  const visibleLearners = useMemo(
    () =>
      learners.filter((learner) => {
        const progress = progressByForm[learner.form.id]
        if (caughtOnly && !progress?.caught) return false
        if (!normalizedQuery) return true
        if (!progress?.seen && !progress?.caught) return false
        return (
          learner.form.name.toLowerCase().includes(normalizedQuery) ||
          String(learner.speciesId).includes(normalizedQuery)
        )
      }),
    [caughtOnly, learners, normalizedQuery, progressByForm],
  )

  return (
    <section className="space-y-3" aria-labelledby={`move-learners-${move.id}`}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-game-muted">
            Compatibility
          </p>
          <h3
            id={`move-learners-${move.id}`}
            className="font-display text-lg text-game-ink"
          >
            {learners.length} Pokémon can learn this move
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-semibold text-game-muted">
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" /> Seen
          </span>
          <span className="inline-flex items-center gap-1">
            <Check className="size-3.5 text-game-moss-strong" /> Caught
          </span>
        </div>
      </div>

      {learners.length > 8 && (
        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
          <div className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-game-muted" />
            <Input
              aria-label="Search compatible Pokémon"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search seen Pokémon"
              className="h-11 border-game-border bg-game-surface-raised pl-9"
            />
          </div>
          <button
            type="button"
            aria-pressed={caughtOnly}
            onClick={() => setCaughtOnly((current) => !current)}
            className={cn(
              'game-focus-ring min-h-11 rounded-lg border px-3 text-xs font-bold transition-colors',
              caughtOnly
                ? 'border-game-moss/50 bg-game-moss/10 text-game-moss-strong'
                : 'border-game-border bg-game-surface-raised text-game-muted hover:border-game-moss/35',
            )}
          >
            Caught only
          </button>
        </div>
      )}

      <div className="max-h-[min(23rem,45dvh)] overflow-y-auto rounded-lg border border-game-border bg-game-surface p-2 custom-scrollbar">
        {visibleLearners.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-game-muted">
            No compatible Pokémon match these filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {visibleLearners.map((learner) => {
              const progress = progressByForm[learner.form.id]
              const seen = Boolean(progress?.seen || progress?.caught)
              const caught = Boolean(progress?.caught)
              const state = caught ? 'Caught' : seen ? 'Seen' : 'Not yet seen'

              return (
                <div
                  key={`${learner.speciesId}-${learner.form.id}`}
                  className={cn(
                    'flex min-w-0 items-center gap-2 rounded-lg border bg-game-surface-raised p-2',
                    caught ? 'border-game-moss/40' : 'border-game-border',
                  )}
                >
                  <div className="relative size-11 shrink-0">
                    {seen ? (
                      <Image
                        src={getPokemonImageUrl(learner.form.id, 'sprite')}
                        alt=""
                        fill
                        sizes="44px"
                        className={cn(
                          'object-contain',
                          !caught && 'grayscale opacity-70',
                        )}
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center text-xl font-bold text-game-muted">
                        ?
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-game-ink">
                      {seen
                        ? learner.form.name
                        : `Pokémon #${learner.speciesId}`}
                    </p>
                    <p className="mt-0.5 text-[10px] text-game-muted">
                      #{learner.speciesId} · {state}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
