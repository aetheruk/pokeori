import { cn } from '@/lib/utils'

export function SecondaryControlBar({
  children,
  className,
  desktopInline = false,
}: {
  children: React.ReactNode
  className?: string
  desktopInline?: boolean
}) {
  return (
    <div
      className={cn(
        'relative z-30 w-full shrink-0 border-t border-game-border bg-game-surface/96 px-4 py-3 shadow-[0_-10px_30px_rgba(75,62,39,0.14)] backdrop-blur-xl md:px-6',
        desktopInline && 'xl:static xl:border-t-0 xl:border-b xl:shadow-none xl:bg-game-surface/80',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </div>
  )
}
