import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DexFilterBar({
  label,
  children,
  footer,
  className,
}: {
  label: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <section
      aria-label={label}
      className={cn(
        'rounded-xl border border-game-border bg-game-surface/80 p-3',
        className,
      )}
    >
      {children}
      {footer ? (
        <div className="mt-2 flex min-h-8 flex-wrap items-center gap-2 border-t border-game-border pt-2">
          {footer}
        </div>
      ) : null}
    </section>
  )
}
