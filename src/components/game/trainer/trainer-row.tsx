import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { getIcon, getTitle } from '@/data/user'
import { cn } from '@/lib/utils'
import type { PublicTrainerSummary } from './types'

export function TrainerRow({
  trainer,
  onSelect,
  prefix,
  meta,
  action,
  className,
}: {
  trainer: Pick<PublicTrainerSummary, 'trainerName' | 'icon' | 'title'>
  onSelect?: () => void
  prefix?: ReactNode
  meta?: ReactNode
  action?: ReactNode
  className?: string
}) {
  const icon = getIcon(trainer.icon || 'ditto')
  const title = getTitle(trainer.title || 'new-beginnings')
  const content = (
    <>
      {prefix}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
        {icon?.icon ? (
          <TaskIconDisplay icon={icon.icon} className="h-8 w-8" />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-game-ink">
          {trainer.trainerName}
        </span>
        <span className="mt-0.5 block truncate text-xs text-game-moss-strong">
          {title?.name || 'Trainer'}
        </span>
      </span>
      {meta ? <span className="shrink-0 text-right">{meta}</span> : null}
      {action ||
        (onSelect ? (
          <ChevronRight
            className="h-4 w-4 shrink-0 text-game-muted"
            aria-hidden="true"
          />
        ) : null)}
    </>
  )

  if (!onSelect) {
    return (
      <div
        className={cn(
          'flex min-h-16 items-center gap-3 rounded-lg border border-game-border bg-game-surface px-3 py-2',
          className,
        )}
      >
        {content}
      </div>
    )
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`View ${trainer.trainerName}'s trainer profile`}
      onClick={onSelect}
      className={cn(
        'game-focus-ring flex min-h-16 w-full items-center gap-3 rounded-lg border border-game-border bg-game-surface px-3 py-2 text-left transition-colors hover:border-game-moss/40 hover:bg-game-surface-raised',
        className,
      )}
    >
      {content}
    </button>
  )
}
