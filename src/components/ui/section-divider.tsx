import { cn } from '@/lib/utils'

interface SectionDividerProps {
  children?: React.ReactNode
  className?: string
  textColor?: string
}

export function SectionDivider({
  children,
  className,
  textColor = 'text-game-moss-strong',
}: SectionDividerProps) {
  return (
    <div className={cn('mb-3 flex min-h-5 items-center gap-2.5', className)}>
      {children && (
        <div
          className={cn(
            'flex min-w-0 items-center text-sm font-semibold uppercase tracking-[0.08em] before:mr-2 before:block before:size-1.5 before:shrink-0 before:rotate-45 before:rounded-[1px] before:bg-game-ochre',
            textColor,
          )}
        >
          {children}
        </div>
      )}
      <div className="h-px min-w-5 flex-1 bg-game-border" aria-hidden="true" />
    </div>
  )
}
