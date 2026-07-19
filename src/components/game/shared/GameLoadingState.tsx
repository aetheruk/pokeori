import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { cn } from '@/lib/utils'

export function GameLoadingState({
  label = 'Loading',
  fullscreen = false,
  className,
}: {
  label?: string
  fullscreen?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'game-paper-background flex w-full items-center justify-center bg-game-canvas text-game-ink',
        fullscreen ? 'h-dvh' : 'h-full',
        className,
      )}
    >
      <div
        className="game-folio-section flex min-w-48 flex-col items-center gap-3 px-6 py-5"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="md" />
        <div className="text-center">
          <p className="game-field-label before:hidden">Field notes</p>
          <p className="mt-1 text-sm font-medium text-game-muted">{label}…</p>
        </div>
      </div>
    </div>
  )
}
