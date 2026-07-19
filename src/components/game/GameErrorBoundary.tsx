'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Component, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class GameErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Game Error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className="game-paper-background flex min-h-[min(400px,70dvh)] flex-col items-center justify-center p-6 text-center text-game-ink"
          role="alert"
        >
          <div className="game-folio-section flex w-full max-w-md flex-col items-center gap-4 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-game-danger/25 bg-game-danger/10">
              <AlertTriangle
                className="h-7 w-7 text-game-danger"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="game-field-label mb-1.5 before:hidden">
                Expedition interrupted
              </p>
              <h2 className="font-display text-xl font-semibold text-game-ink">
                This page could not be opened
              </h2>
            </div>
            <p
              className="max-w-md text-sm leading-relaxed text-game-muted"
              data-selectable="true"
            >
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex w-full max-w-xs flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                className="min-h-11 flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload page
              </Button>
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="min-h-11 flex-1"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// HOC wrapper for easier use
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  const WrappedComponent = (props: P) => (
    <GameErrorBoundary fallback={fallback}>
      <Component {...props} />
    </GameErrorBoundary>
  )
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}
