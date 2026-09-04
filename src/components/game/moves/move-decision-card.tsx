import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { MovePresentation } from '@/utilities/pokemon/move-display'
import {
  BattleContext,
  MoveDetailList,
  MoveIdentity,
  MoveMetrics,
} from './move-presentation-parts'

export interface MoveDecisionCardProps {
  presentation: MovePresentation
  className?: string
  primaryAction?: ReactNode
  detailsAction?: ReactNode
}

export function MoveDecisionCard({
  presentation,
  className,
  primaryAction,
  detailsAction,
}: MoveDecisionCardProps) {
  const decisiveDetails = [
    presentation.effects[0],
    presentation.conditions[0] ?? presentation.risks[0],
  ].filter((detail): detail is NonNullable<typeof detail> => Boolean(detail))

  return (
    <article
      className={cn(
        'game-panel-raised flex min-w-0 flex-col gap-4 p-4',
        className,
      )}
    >
      <MoveIdentity presentation={presentation} />
      <MoveMetrics presentation={presentation} />
      <p className="text-sm leading-relaxed text-game-muted">
        {presentation.summary}
      </p>
      <BattleContext presentation={presentation} />
      {decisiveDetails.length ? (
        <MoveDetailList details={decisiveDetails} />
      ) : null}
      {primaryAction || detailsAction ? (
        <div className="mt-auto flex flex-wrap items-center justify-end gap-2 border-t border-game-border pt-3">
          {detailsAction}
          {primaryAction}
        </div>
      ) : null}
    </article>
  )
}
