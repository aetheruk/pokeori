'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GameErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GameError({ error, reset }: GameErrorProps) {
  return (
    <main
      className="game-paper-texture flex min-h-[min(520px,78dvh)] items-center justify-center bg-game-canvas p-6 text-game-ink"
      role="alert"
      aria-live="assertive"
    >
      <section className="game-folio-section flex w-full max-w-lg flex-col items-center gap-5 p-6 text-center sm:p-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-game-danger/25 bg-game-danger/10">
          <AlertTriangle
            className="h-8 w-8 text-game-danger"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="game-field-label mb-2 before:hidden">Field note</p>
          <h1 className="font-display text-2xl font-semibold text-game-ink">
            This page needs another look
          </h1>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-game-muted">
          The expedition page could not finish loading. Try the page again, or
          reload the journal if the problem persists.
        </p>
        {error.message && (
          <p
            className="max-h-24 w-full max-w-md overflow-auto rounded-lg border border-game-danger/25 bg-game-danger/5 p-3 text-left font-mono text-xs text-game-danger"
            data-selectable="true"
          >
            {error.message}
          </p>
        )}
        <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <Button className="min-h-11 flex-1" onClick={reset}>
            Try again
          </Button>
          <Button
            variant="outline"
            className="min-h-11 flex-1"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            Reload page
          </Button>
        </div>
      </section>
    </main>
  )
}
