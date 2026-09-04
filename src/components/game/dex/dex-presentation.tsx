import { CircleHelp } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type DexStatusTone = 'registered' | 'discovery' | 'unknown' | 'neutral'

const STATUS_TONES: Record<DexStatusTone, string> = {
  registered: 'border-game-moss/30 bg-game-moss/10 text-game-moss-strong',
  discovery: 'border-game-ochre/35 bg-game-ochre/10 text-game-ochre-strong',
  unknown: 'border-game-border bg-game-canvas text-game-muted',
  neutral: 'border-game-border bg-game-surface-raised text-game-ink',
}

export function DexStatusChip({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: DexStatusTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex min-h-6 items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]',
        STATUS_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function DexCountSummary({
  count,
  singular = 'record',
  plural = 'records',
  detail,
  className,
}: {
  count: number
  singular?: string
  plural?: string
  detail?: ReactNode
  className?: string
}) {
  return (
    <p
      className={cn('text-xs text-game-muted', className)}
      role="status"
      aria-live="polite"
    >
      <span className="font-mono font-bold text-game-ink">{count}</span>{' '}
      {count === 1 ? singular : plural}
      {detail ? <> · {detail}</> : null}
    </p>
  )
}

export function DexEmptyState({
  title,
  description,
  action,
  icon,
  className,
}: {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'game-folio-section mx-auto flex w-full max-w-xl flex-col items-center p-6 text-center',
        className,
      )}
    >
      <div className="mb-3 flex size-11 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised text-game-muted">
        {icon ?? <CircleHelp className="size-5" aria-hidden="true" />}
      </div>
      <h2 className="font-display text-lg font-semibold text-game-ink">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-game-muted">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

export function DexInspectorSection({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center gap-3">
        <h2 className="game-field-label shrink-0">{title}</h2>
        <div
          className="h-px min-w-4 flex-1 bg-game-border"
          aria-hidden="true"
        />
      </div>
      {children}
    </section>
  )
}
