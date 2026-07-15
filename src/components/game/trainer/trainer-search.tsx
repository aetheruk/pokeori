'use client'

import { Loader2, Search, ShieldAlert, Users } from 'lucide-react'
import { useState } from 'react'
import { searchTrainers } from '@/app/(frontend)/game/trainer/actions'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionDivider } from '@/components/ui/section-divider'
import { getIcon, getTitle } from '@/data/user'
import { TrainerModal } from './trainer-modal'

export function TrainerSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || query.length < 3) return

    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      const result = await searchTrainers(query)
      if (result.success && result.data) {
        setResults(result.data)
        if (result.data.length === 0) {
          setError('No trainers found.')
        }
      } else {
        setError(result.error || 'Search failed')
      }
    } catch (err) {
      setError('An error occurred during search sync.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="relative z-10 mx-auto min-h-0 w-full max-w-3xl flex-1 space-y-6 overflow-y-auto px-4 py-5 md:px-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-game-border pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-game-moss/35 bg-game-moss/10 text-game-moss-strong">
              <Search className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold text-game-ink">
                Trainer registry
              </h2>
              <p className="text-xs text-game-muted">
                League network directory
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2 rounded-lg border border-game-border bg-game-surface p-1.5 focus-within:border-game-moss/35">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-game-muted transition-colors group-focus-within:text-game-moss" />
                <Input
                  type="text"
                  placeholder="Trainer name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-11 w-full border-none bg-transparent pl-11 text-base font-medium text-game-ink placeholder:text-game-muted focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || query.length < 3}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Search'
                )}
              </Button>
            </div>
          </form>
        </div>

        {error && (
          <div
            className={
              error === 'No trainers found.'
                ? 'mx-auto flex max-w-xl flex-col items-center gap-3 rounded-lg border border-dashed border-game-border-strong bg-game-canvas/60 px-4 py-10 text-center'
                : 'flex flex-col items-center gap-3 rounded-lg border border-game-danger/25 bg-game-danger/5 py-10'
            }
            role={error === 'No trainers found.' ? 'status' : 'alert'}
            aria-live={error === 'No trainers found.' ? 'polite' : 'assertive'}
          >
            <div
              className={
                error === 'No trainers found.'
                  ? 'flex h-14 w-14 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised text-game-muted'
                  : 'flex h-14 w-14 items-center justify-center rounded-lg border border-game-danger/25 bg-game-danger/10'
              }
            >
              {error === 'No trainers found.' ? (
                <Users className="h-7 w-7" aria-hidden="true" />
              ) : (
                <ShieldAlert className="h-7 w-7 text-game-danger" aria-hidden="true" />
              )}
            </div>
            <p
              className={
                error === 'No trainers found.'
                  ? 'text-sm font-medium text-game-muted'
                  : 'text-sm font-medium text-game-danger'
              }
            >
              {error}
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-game-moss-strong" />
              <SectionDivider>Results Found ({results.length})</SectionDivider>
            </div>
            <div className="grid gap-3">
              {results.map((trainer) => {
                const iconData = getIcon(trainer.icon || 'ditto')
                const titleData = getTitle(trainer.title || 'new-beginnings')

                return (
                  <button
                    type="button"
                    key={trainer.id}
                    aria-haspopup="dialog"
                    onClick={() => setSelectedTrainer(trainer)}
                    className="game-focus-ring flex w-full cursor-pointer items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 text-left transition-colors hover:border-game-moss/40 hover:bg-game-surface-raised"
                  >
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                        {iconData?.icon && (
                          <TaskIconDisplay
                            icon={iconData.icon}
                            className="w-9 h-9"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="truncate text-base font-semibold text-game-ink">
                        {trainer.trainerName}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-game-moss-strong">
                        {titleData?.name || 'Trainer'}
                      </div>
                    </div>

                    {/* Right Accent */}
                    <div
                      className="h-8 w-1 rounded-full bg-game-moss/45"
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Trainer Modal */}
      <TrainerModal
        trainer={selectedTrainer}
        open={!!selectedTrainer}
        onOpenChange={(open) => !open && setSelectedTrainer(null)}
      />
    </div>
  )
}
