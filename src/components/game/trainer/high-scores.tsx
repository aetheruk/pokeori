import { Loader2, Medal, Star, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getHighScores } from '@/app/(frontend)/game/trainer/actions'
import { cn } from '@/lib/utils'
import { TrainerModal } from './trainer-modal'
import { TrainerRow } from './trainer-row'
import type { PublicTrainerSummary } from './types'

export function HighScores({ activeSkill }: { activeSkill: string }) {
  const [scores, setScores] = useState<PublicTrainerSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [selectedTrainer, setSelectedTrainer] =
    useState<PublicTrainerSummary | null>(null)

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
              Opening the skill rankings…
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
            No trainers have reached these skill rankings yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {scores.map((score, index) => {
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

              const rankIcon =
                rank === 1 ? (
                  <Trophy className="h-3.5 w-3.5" />
                ) : rank === 2 ? (
                  <Medal className="h-3.5 w-3.5" />
                ) : rank === 3 ? (
                  <Star className="h-3.5 w-3.5" />
                ) : null
              return (
                <TrainerRow
                  key={score.id || index}
                  trainer={score}
                  onSelect={() => setSelectedTrainer(score)}
                  className={isTop3 ? 'border-game-ochre/45' : undefined}
                  prefix={
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center gap-1 rounded-lg border font-mono text-base font-bold',
                        rankBg,
                        rankBorder,
                        rankColor,
                      )}
                    >
                      {rankIcon}
                      {rank}
                    </span>
                  }
                  meta={
                    <>
                      <span className="block font-mono text-xs font-bold text-game-moss-strong">
                        Rank {score.level || 1}
                      </span>
                      <span className="block font-mono text-[11px] text-game-muted">
                        {(score.exp || 0).toLocaleString()} XP
                      </span>
                    </>
                  }
                />
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
