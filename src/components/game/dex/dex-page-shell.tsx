import type { ReactNode } from 'react'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { cn } from '@/lib/utils'

export function DexPageShell({
  title,
  subtitle,
  children,
  className,
  contentClassName,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <div
      className={cn(
        'game-paper-first game-paper-background flex h-full min-h-0 flex-col overflow-hidden bg-game-canvas text-game-ink',
        className,
      )}
    >
      <PremiumHeader title={title} subtitle={subtitle} />
      <main
        className={cn(
          'game-desktop-workspace flex min-h-0 w-full flex-1 flex-col px-4 pb-3 pt-4 md:px-6',
          contentClassName,
        )}
      >
        {children}
      </main>
    </div>
  )
}
