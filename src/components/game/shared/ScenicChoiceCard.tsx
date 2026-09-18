import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScenicChoiceCardProps {
  background?: string | StaticImageData
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  selected?: boolean
  onClick: () => void
  ariaPressed?: boolean
  className?: string
}

/**
 * A compact field-journal selector: scenic artwork carries the left side,
 * while a raised-paper fade keeps the choice readable on the right.
 */
export function ScenicChoiceCard({
  background,
  title,
  description,
  icon,
  iconPosition = 'right',
  selected = false,
  onClick,
  ariaPressed,
  className,
}: ScenicChoiceCardProps) {
  const iconOnLeft = iconPosition === 'left'

  return (
    <button
      type="button"
      aria-pressed={ariaPressed ?? selected}
      onClick={onClick}
      className={cn(
        'game-focus-ring group relative flex min-h-24 w-full items-stretch overflow-hidden rounded-lg border text-left transition-colors md:min-h-28',
        selected
          ? 'border-game-charcoal/65 ring-1 ring-game-charcoal/15'
          : 'border-game-card-border hover:border-game-charcoal/40',
        className,
      )}
    >
      {background ? (
        <Image
          src={background}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-cover opacity-75 transition-opacity group-hover:opacity-85"
        />
      ) : (
        <div className="absolute inset-0 bg-game-surface-raised" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-l from-game-surface-raised/98 via-game-surface-raised/78 to-game-surface-raised/8"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-game-ink/18 via-transparent to-game-surface/10"
      />

      <span
        className={cn(
          'relative z-10 flex min-w-0 flex-1 items-center gap-3 p-4 md:p-5',
          iconOnLeft ? 'justify-between' : 'justify-end',
        )}
      >
        {icon && (
          <span className="game-icon-orb game-icon-orb-art flex size-10 shrink-0 text-game-charcoal-strong md:size-11">
            {icon}
          </span>
        )}
        <span
          className={cn(
            'min-w-0 text-right',
            iconOnLeft ? 'flex-1' : 'max-w-[78%]',
          )}
        >
          <span className="block truncate font-display text-base font-semibold leading-tight text-game-ink md:text-lg">
            {title}
          </span>
          {description && (
            <span className="mt-1 block truncate text-xs font-medium text-game-muted md:text-sm">
              {description}
            </span>
          )}
        </span>
      </span>
    </button>
  )
}
