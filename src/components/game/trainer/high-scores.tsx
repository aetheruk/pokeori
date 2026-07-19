import { Loader2, Medal, Star, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getHighScores } from '@/app/(frontend)/game/trainer/actions'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { getIcon, getTitle } from '@/data/user'
import { cn } from '@/lib/utils'
import { TrainerModal } from './trainer-modal'

export function HighScores({ activeSkill }: { activeSkill: string }) {
  const [scores, setScores] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    const fetchScores = async () => {
      setIsLoading(true)
      setLoadError('')
      try {
        const result = await getHighScores(activeSkill as any)
        if (mounted && result.success && result.data) {
          setScores(result.data)
        } else if (mounted) {
          setLoadError(
            'Rankings could not be loaded. Try this page again shortly.',
          )
        }
      } catch (e) {
        console.error(e)
        if (mounted) {
          setLoadError(
            'Rankings could not be loaded. Check your connection and try again.',
          )
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    fetchScores()
    return () => {
      mounted = false
    }
  }, [activeSkill])

  return (
    <div className="game-paper-first game-paper-background flex flex-col h-full overflow-hidden bg-game-canvas text-game-ink">
      {/* List container */}
      <div className="relative z-10 mx-auto min-h-0 w-full max-w-3xl flex-1 space-y-4 overflow-y-auto px-4 pt-5 pb-6 md:px-6">
        {isLoading ? (
          <div
            className="flex flex-col items-center justify-center gap-4 py-20"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="h-7 w-7 animate-spin text-game-moss" />
            <p className="text-sm font-medium text-game-muted">
              Opening the league ledger…
            </p>
          </div>
        ) : loadError ? (
          <div
            className="rounded-lg border border-game-clay/35 bg-game-clay/10 px-5 py-8 text-center text-sm font-medium text-game-clay-strong"
            role="alert"
            aria-live="assertive"
          >
            {loadError}
          </div>
        ) : scores.length === 0 ? (
          <div
            className="rounded-lg border border-dashed border-game-border bg-game-surface-raised px-5 py-16 text-center font-medium text-game-muted"
            role="status"
            aria-live="polite"
          >
            No scores have reached the league ledger yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {scores.map((score, index) => {
              const iconData = getIcon(score.icon || 'ditto')
              const titleData = getTitle(score.title || 'new-beginnings')
              const rank = index + 1

              const isTop3 = rank <= 3
              const rankColor =
                rank === 1
                  ? 'text-game-ochre'
                  : rank === 2
                    ? 'text-game-muted'
                    : rank === 3
                      ? 'text-game-clay-strong'
                      : 'text-game-muted'
              const rankBg =
                rank === 1
                  ? 'bg-game-ochre/10'
                  : rank === 2
                    ? 'bg-game-canvas'
                    : rank === 3
                      ? 'bg-game-clay/10'
                      : 'bg-transparent'
              const rankBorder =
                rank === 1
                  ? 'border-game-ochre/40'
                  : rank === 2
                    ? 'border-game-border'
                    : rank === 3
                      ? 'border-game-clay/35'
                      : 'border-transparent'

              return (
                <button
                  type="button"
                  key={score.id || index}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedTrainer(score)}
                  className={cn(
                    'game-focus-ring group flex w-full cursor-pointer items-center gap-3 rounded-lg border bg-game-surface p-3 text-left transition-colors',
                    isTop3 ? 'border-game-ochre/45' : 'border-game-border',
                    'hover:border-game-moss/40 hover:bg-game-surface-raised',
                  )}
                >
                  {/* Rank Badge */}
                  <div
                    className={cn(
                      'flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg border font-black',
                      rankBg,
                      rankBorder,
                      rankColor,
                    )}
                  >
                    <span className="text-[11px] leading-none font-bold uppercase tracking-[0.08em] text-game-muted mb-0.5">
                      Pos.
                    </span>
                    <span className="text-xl leading-none">{index + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-game-border bg-game-surface-raised">
                      {iconData?.icon && (
                        <TaskIconDisplay
                          icon={iconData.icon}
                          className="w-9 h-9"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate font-display text-lg font-semibold tracking-tight text-game-ink">
                        {score.trainerName}
                      </span>
                      {rank === 1 && (
                        <Trophy className="h-4 w-4 shrink-0 text-game-ochre" />
                      )}
                      {rank === 2 && (
                        <Medal className="h-4 w-4 shrink-0 text-game-muted" />
                      )}
                      {rank === 3 && (
                        <Star className="h-4 w-4 shrink-0 text-game-clay-strong" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
                      <span className="text-game-moss-strong">
                        Level {score.level}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-game-border" />
                      <span className="uppercase tracking-widest text-game-muted">
                        {score.exp.toLocaleString()} XP
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
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
