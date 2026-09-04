import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { MovePresentation } from '@/utilities/pokemon/move-display'
import {
  BattleContext,
  MoveDetailList,
  MoveIdentity,
  MoveMetrics,
  MoveSection,
} from './move-presentation-parts'

export interface MoveFieldNoteProps {
  presentation: MovePresentation
  className?: string
  children?: ReactNode
}

export function MoveFieldNote({
  presentation,
  className,
  children,
}: MoveFieldNoteProps) {
  const advanced = [...presentation.rules, ...presentation.risks]

  return (
    <article
      className={cn(
        'game-panel-raised min-w-0 space-y-5 p-4 sm:p-5',
        className,
      )}
    >
      <header className="border-b border-game-border pb-4">
        <p className="game-field-label mb-2">Move field note</p>
        <MoveIdentity presentation={presentation} />
      </header>

      <MoveMetrics presentation={presentation} />
      <BattleContext presentation={presentation} />

      <MoveSection title="What it does">
        <p className="text-sm leading-relaxed text-game-ink">
          {presentation.summary}
        </p>
      </MoveSection>

      {presentation.effects.length ? (
        <MoveSection title="Action and result">
          <MoveDetailList details={presentation.effects} />
        </MoveSection>
      ) : null}

      {presentation.conditions.length || presentation.timing.length ? (
        <MoveSection title="Conditions and timing">
          <MoveDetailList
            details={[...presentation.conditions, ...presentation.timing]}
          />
        </MoveSection>
      ) : null}

      {advanced.length ? (
        <MoveSection title="Costs and advanced rules">
          <MoveDetailList details={advanced} />
        </MoveSection>
      ) : null}

      {children ? (
        <div className="border-t border-game-border pt-4">{children}</div>
      ) : null}
    </article>
  )
}
