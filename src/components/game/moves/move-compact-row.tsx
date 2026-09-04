'use client'

import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { MovePresentation } from '@/utilities/pokemon/move-display'
import { MoveIdentity, MoveMetrics } from './move-presentation-parts'

export interface MoveCompactRowProps {
  presentation: MovePresentation
  className?: string
  onDetails?: () => void
  detailsLabel?: string
}

export function MoveCompactRow({
  presentation,
  className,
  onDetails,
  detailsLabel = `View ${presentation.identity.name} details`,
}: MoveCompactRowProps) {
  const decisiveEffect = presentation.effects[0] ?? presentation.conditions[0]

  return (
    <article
      className={cn(
        'game-panel grid min-w-0 gap-3 p-3 sm:grid-cols-[minmax(0,1fr)_15rem_auto] sm:items-center',
        className,
      )}
    >
      <MoveIdentity presentation={presentation} compact />
      <div className="min-w-0">
        <MoveMetrics presentation={presentation} compact />
        {decisiveEffect ? (
          <p className="mt-1.5 line-clamp-1 text-xs text-game-muted">
            <span className="font-bold text-game-ink">
              {decisiveEffect.label}:
            </span>{' '}
            {decisiveEffect.value}
          </p>
        ) : null}
      </div>
      {onDetails ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onDetails}
          aria-label={detailsLabel}
          title={detailsLabel}
          className="justify-self-end"
        >
          <BookOpen aria-hidden="true" />
        </Button>
      ) : null}
    </article>
  )
}
