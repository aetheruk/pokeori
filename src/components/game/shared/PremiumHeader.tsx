import { cn } from '@/lib/utils'

interface PremiumHeaderProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  showEffects?: boolean
}

export function PremiumHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  showEffects: _showEffects = false,
}: PremiumHeaderProps) {
  return (
    <div
      className={cn(
        'game-rule relative flex min-h-[5.25rem] w-full shrink-0 items-end overflow-hidden bg-game-canvas px-4 pb-4 pt-3 text-game-ink md:min-h-24 md:px-6 md:pb-5',
        className,
      )}
    >
      <div className="pointer-events-none absolute bottom-4 left-0 top-4 w-1 rounded-r-sm bg-game-moss" />
      <div className="relative min-w-0 pl-3 md:pl-4">
        {subtitle && (
          <p
            className={cn(
              'game-field-label mb-1.5 truncate before:hidden',
              subtitleClassName,
            )}
          >
            {subtitle}
          </p>
        )}
        <h1
          className={cn(
            'truncate font-display text-2xl font-semibold leading-none text-game-ink md:text-3xl',
            titleClassName,
          )}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}
