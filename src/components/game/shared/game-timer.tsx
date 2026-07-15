import { cn } from '@/lib/utils'

interface GameTimerProps {
  timeLeft: number
  totalTime: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  colorOverride?: string
  tone?: 'paper' | 'scene'
}

export function GameTimer({
  timeLeft,
  totalTime,
  size = 'md',
  className,
  colorOverride,
  tone = 'paper',
}: GameTimerProps) {
  // Size map
  const sizeMap = {
    sm: { w: 32, h: 32, cx: 16, cy: 16, r: 14, width: 3 }, // w-8 h-8
    md: { w: 48, h: 48, cx: 24, cy: 24, r: 20, width: 4 }, // w-12 h-12
    lg: { w: 64, h: 64, cx: 32, cy: 32, r: 28, width: 5 }, // w-16 h-16
    xl: { w: 128, h: 128, cx: 64, cy: 64, r: 56, width: 8 }, // w-32 h-32
  }

  const { w, h, cx, cy, r, width } = sizeMap[size]
  const circumference = 2 * Math.PI * r

  // Calculate offset (progress)
  // When timeLeft = totalTime, offset = 0 (full circle)
  // When timeLeft = 0, offset = circumference (empty circle)
  const offset = circumference * (1 - Math.max(0, timeLeft) / Math.max(1, totalTime))

  // Coloring (turns red when low)
  const isLowTime = timeLeft <= 5
  const strokeColor = colorOverride || (isLowTime ? 'text-game-danger' : 'text-game-moss')

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        className,
      )}
      style={{ width: w, height: h }}
      role="timer"
      aria-label={`${Math.max(0, timeLeft)} seconds remaining`}
    >
      <svg className="h-full w-full -rotate-90 transform overflow-visible">
        {/* Background Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="currentColor"
          strokeWidth={width}
          fill={isLowTime ? 'rgba(169,71,60,0.16)' : tone === 'scene' ? 'rgba(23,39,51,0.76)' : 'rgba(247,239,223,0.92)'}
          className={tone === 'scene' ? 'text-white/25' : 'text-game-border-strong'}
        />
        {/* Progress Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="currentColor"
          strokeWidth={width}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(strokeColor, 'transition-all duration-1000 ease-linear')}
        />
      </svg>
      <span
        className={cn(
          'absolute font-mono font-semibold',
          tone === 'scene' ? 'text-game-night-ink' : 'text-game-ink',
          size === 'sm' ? 'text-xs' : size === 'xl' ? 'text-4xl' : 'text-sm',
        )}
      >
        {timeLeft}
      </span>
    </div>
  )
}
