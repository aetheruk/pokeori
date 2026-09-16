import { cn } from '@/lib/utils'

interface SectionDividerProps {
  children?: React.ReactNode
  className?: string
  textColor?: string
}

export function SectionDivider({
  children,
  className,
  textColor = 'text-game-ink',
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
          textColor,
        )}
      >
        {children}
      </div>
      <div className="h-px min-w-5 flex-1 bg-game-border" aria-hidden="true" />
    </div>
  )
}
