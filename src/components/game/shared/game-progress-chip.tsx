import { cn } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'

interface GameProgressChipProps {
  wins: number
  required: number
  className?: string
}

/**
 * Compact progress chip showing `wins / required` progress.
 * Consistent with the score chips used in Rhythm, Mining, Rock Push, Match3, Flap, and Run.
 */
export function GameProgressChip({ wins, required, className }: GameProgressChipProps) {
  const isComplete = wins >= required

  return (
    <div
      className={cn(
        'game-night flex min-h-8 items-center gap-1.5 rounded-full border border-game-night-border bg-game-night-surface/90 px-3 py-1 text-xs font-bold text-game-night-ink shadow-sm backdrop-blur-md transition-colors',
        isComplete && 'border-game-ochre/45 bg-game-ochre/15 text-game-night-ink',
        className,
      )}
    >
      <CheckCircle2 className={cn('h-3.5 w-3.5', isComplete ? 'text-game-ochre' : 'text-game-moss')} />
      <span>
        {wins} / {required}
      </span>
    </div>
  )
}
