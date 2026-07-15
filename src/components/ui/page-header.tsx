import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
  action?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  eyebrow,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'game-rule mb-6 flex items-end justify-between gap-4 px-1 pb-4 text-left',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && <p className="game-field-label mb-1.5">{eyebrow}</p>}
        <h1 className="font-display text-2xl font-semibold leading-[1.1] text-game-ink md:text-[1.75rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-sm font-normal leading-relaxed text-game-muted">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
