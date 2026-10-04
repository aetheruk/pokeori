import { cn } from '@/lib/utils'

interface SectionDividerProps {
  children?: React.ReactNode
  className?: string
  textColor?: string
  textClassName?: string
  variant?: 'divider' | 'chip'
}

export function SectionDivider({
  children,
  className,
  textColor = 'text-game-ink',
  textClassName,
  variant = 'divider',
}: SectionDividerProps) {
  if (!children) {
    return (
      <div className={cn('mb-3 flex min-h-5 min-w-0 flex-1 items-center', className)}>
        <div className="h-px w-full bg-game-border" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className={cn('mb-3 flex min-h-5 min-w-0 flex-1 items-center gap-3', className)}>
      <div className="h-px min-w-5 flex-1 bg-game-border" aria-hidden="true" />
      <div
        className={cn(
          'min-w-0 text-center text-sm font-semibold uppercase tracking-[0.08em]',
          variant === 'chip' &&
            'rounded-full border border-current/30 px-3 py-0.5 text-xs font-extrabold tracking-[0.14em]',
          textColor,
          textClassName,
        )}
      >
        {children}
      </div>
      <div className="h-px min-w-5 flex-1 bg-game-border" aria-hidden="true" />
    </div>
  )
}
