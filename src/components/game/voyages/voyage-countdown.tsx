'use client'

import { CheckCircle, Timer } from 'lucide-react'
import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/lib/utils'

interface VoyageCountdownProps {
  endTime: string
  className?: string
}

export function VoyageCountdown({ endTime, className }: VoyageCountdownProps) {
  const { formatted, isFinished } = useCountdown(endTime)

  if (isFinished) {
    return (
      <span
        className={cn(
          'flex items-center gap-1 font-black text-game-moss-strong',
          className,
        )}
      >
        <CheckCircle className="w-3 h-3" /> Check Results
      </span>
    )
  }

  return (
    <span
      className={cn(
        'flex items-center gap-1 font-mono font-black text-game-ochre',
        className,
      )}
    >
      <Timer className="w-3 h-3" /> {formatted}
    </span>
  )
}
