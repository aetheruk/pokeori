'use client'

import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { toast } from 'sonner'
import { clearBattleState } from '@/app/(frontend)/game/battles/actions'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class BattleErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Battle Interface:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="h-full w-full flex flex-col items-center justify-center game-night bg-game-night-canvas text-game-night-ink p-6 gap-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex flex-col items-center gap-2 text-center max-w-md">
            <div className="w-16 h-16 rounded-full border border-game-danger/25 bg-game-danger/10 flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8 text-game-danger" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Battle interrupted
            </h2>
            <p className="text-sm text-game-night-muted">
              The battle interface could not continue. You can reload the page or clear the saved battle state.
            </p>
            {this.state.error && (
              <pre className="mt-2 w-full p-2 bg-game-danger/10 border border-game-danger/30 rounded text-xs text-game-danger font-mono overflow-auto max-h-32 text-left" data-selectable="true">
                {this.state.error.message}
              </pre>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2 border-game-night-border bg-game-night-surface text-game-night-ink hover:border-game-moss/50 hover:bg-game-moss/10"
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>

            <ClearBattleButton />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function ClearBattleButton() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleClear = async () => {
    try {
      setLoading(true)
      await clearBattleState()
      toast.success('Battle state cleared')
      router.replace('/game/explore')
    } catch (e) {
      toast.error('Failed to clear battle state')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      className="game-accent-button flex-1 gap-2 border border-game-clay-strong/60 bg-game-clay/80 hover:bg-game-clay-strong"
      onClick={handleClear}
      disabled={loading}
      aria-busy={loading}
    >
      <Trash2 className="w-4 h-4" />
      {loading ? 'Clearing...' : 'Clear Battle'}
    </Button>
  )
}
