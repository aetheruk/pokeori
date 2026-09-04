'use client'

import { BookOpen } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { MovePresentation } from '@/utilities/pokemon/move-display'
import { MoveIdentity, MoveMetrics } from './move-presentation-parts'

export interface MoveCompactRowProps {
  presentation: MovePresentation
  className?: string
  onDetails?: () => void
  detailsLabel?: string
  detailsText?: string
  primaryAction?: ReactNode
  density?: 'default' | 'tight'
  showEffect?: boolean
}

export function MoveCompactRow({
  presentation,
  className,
  onDetails,
  detailsLabel = `View ${presentation.identity.name} details`,
  detailsText,
  primaryAction,
  density = 'default',
  showEffect = true,
}: MoveCompactRowProps) {
  const decisiveEffect = presentation.effects[0] ?? presentation.conditions[0]
  const tight = density === 'tight'

  return (
    <article
      className={cn(
        'game-panel grid min-w-0 gap-3 p-3',
        tight
          ? 'grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1.5'
          : 'sm:grid-cols-[minmax(0,1fr)_15rem_auto] sm:items-center',
        className,
      )}
    >
      <MoveIdentity presentation={presentation} compact stackSource={tight} />
      <div
        className={cn(
          'min-w-0',
          tight && 'col-span-2 border-t border-game-border pt-1.5',
        )}
      >
        <MoveMetrics presentation={presentation} compact inline={tight} />
        {showEffect && decisiveEffect ? (
          <p className="mt-1.5 line-clamp-1 text-xs text-game-muted">
            <span className="font-bold text-game-ink">
              {decisiveEffect.label}:
            </span>{' '}
            {decisiveEffect.value}
          </p>
        ) : null}
      </div>
      {onDetails || primaryAction ? (
        <div
          className={cn(
            'flex items-center justify-end gap-1.5',
            tight ? 'row-start-1 col-start-2' : 'justify-self-end',
          )}
        >
          {onDetails ? (
            <Button
              type="button"
              variant="ghost"
              size={detailsText ? 'sm' : 'icon'}
              onClick={onDetails}
              aria-label={detailsLabel}
              title={detailsLabel}
              className="min-h-10"
            >
              <BookOpen aria-hidden="true" />
              {detailsText ? <span>{detailsText}</span> : null}
            </Button>
          ) : null}
          {primaryAction}
        </div>
      ) : null}
    </article>
  )
}
