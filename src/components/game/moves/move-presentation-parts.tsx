import { AlertTriangle, Crosshair, Sparkles, TimerReset } from 'lucide-react'
import type { ReactNode } from 'react'

import { StanceIcon } from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type {
  MovePresentation,
  MovePresentationDetail,
  MovePresentationMetric,
} from '@/utilities/pokemon/move-display'

export function MoveIdentity({
  presentation,
  compact = false,
  stackSource = false,
}: {
  presentation: MovePresentation
  compact?: boolean
  stackSource?: boolean
}) {
  const stance = presentation.identity.stance
  const type = presentation.identity.type

  return (
    <div className="min-w-0">
      <div
        className={cn(
          'flex min-w-0 gap-2',
          stackSource ? 'flex-col items-start gap-0' : 'items-center',
        )}
      >
        <h3
          className={cn(
            'truncate font-display font-bold text-game-ink',
            compact ? 'text-sm' : 'text-lg',
            stackSource && 'w-full',
          )}
        >
          {presentation.identity.name}
        </h3>
        {presentation.identity.source?.label ? (
          <span className="shrink-0 text-xs font-semibold text-game-muted">
            {presentation.identity.source.label}
          </span>
        ) : null}
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        <Badge
          variant="outline"
          data-move-type={type}
          className="border-game-border-strong bg-game-surface-raised text-game-ink"
        >
          {titleCase(type)} type
        </Badge>
        <Badge
          variant="outline"
          data-move-stance={stance}
          className="border-game-moss/30 bg-game-moss/10 text-game-moss-strong"
        >
          <StanceIcon stance={stance} className="size-3" aria-hidden="true" />
          {titleCase(stance)} stance
        </Badge>
      </div>
    </div>
  )
}

export function MoveMetrics({
  presentation,
  compact = false,
  inline = false,
}: {
  presentation: MovePresentation
  compact?: boolean
  inline?: boolean
}) {
  const metrics = [
    presentation.essentials.power,
    presentation.essentials.accuracy,
    ...(compact ? [] : [presentation.essentials.target]),
    presentation.essentials.offensiveValue,
  ].filter((metric): metric is MovePresentationMetric => Boolean(metric))

  return (
    <dl
      className={cn(
        inline
          ? 'flex flex-wrap items-baseline gap-x-3 gap-y-1'
          : 'grid gap-px overflow-hidden rounded-lg border border-game-border bg-game-border',
        !inline &&
          (compact
            ? 'grid-cols-2'
            : metrics.length >= 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3'),
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={cn(
            'min-w-0',
            inline
              ? 'flex items-baseline gap-1'
              : 'bg-game-surface-raised px-2.5 py-2',
          )}
        >
          <dt
            className={cn(
              'font-bold uppercase tracking-[0.06em] text-game-muted',
              inline ? 'text-[0.6rem]' : 'text-[0.65rem]',
            )}
          >
            {metric.label}
          </dt>
          <dd
            className={cn(
              'break-words font-mono font-bold text-game-ink',
              inline ? 'text-xs' : 'mt-0.5 text-sm',
            )}
          >
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

const DETAIL_ICONS = {
  effect: Sparkles,
  reward: Sparkles,
  condition: Crosshair,
  timing: TimerReset,
  risk: AlertTriangle,
  rule: Crosshair,
} as const

export function MoveDetailList({
  details,
  className,
}: {
  details: MovePresentationDetail[]
  className?: string
}) {
  return (
    <ul className={cn('space-y-2', className)}>
      {details.map((item) => {
        const Icon = DETAIL_ICONS[item.kind]
        return (
          <li
            key={item.id}
            className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2.5 rounded-lg border border-game-border bg-game-surface-raised p-2.5"
          >
            <span
              className={cn(
                'flex size-7 items-center justify-center rounded-md',
                item.kind === 'risk'
                  ? 'bg-game-danger/10 text-game-danger'
                  : item.kind === 'reward'
                    ? 'bg-game-ochre/15 text-game-ochre-strong'
                    : 'bg-game-moss/10 text-game-moss-strong',
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-bold text-game-ink">
                {item.label}
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-game-muted">
                {item.value}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function BattleContext({
  presentation,
}: {
  presentation: MovePresentation
}) {
  const battle = presentation.battle
  if (!battle) return null

  return (
    <div
      className="flex flex-wrap gap-2 rounded-lg border border-game-ochre/40 bg-game-ochre/10 p-2.5 text-xs text-game-ink"
      role="group"
      aria-label="Current battle information"
    >
      {battle.resolvedType ? (
        <span>
          Current type: <strong>{titleCase(battle.resolvedType)}</strong>
        </span>
      ) : null}
      {battle.effectiveness ? (
        <span>
          Matchup: <strong>{titleCase(battle.effectiveness)}</strong>
        </span>
      ) : null}
      {battle.availability ? (
        <span>
          <strong>
            {battle.availability.available ? 'Ready' : 'Unavailable'}
          </strong>
          {battle.availability.reason ? ` — ${battle.availability.reason}` : ''}
        </span>
      ) : null}
    </div>
  )
}

export function MoveSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h4 className="game-field-label mb-2">{title}</h4>
      {children}
    </section>
  )
}

function titleCase(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
