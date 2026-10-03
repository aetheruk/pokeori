import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'

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
  appearance?: 'default' | 'explore'
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
  appearance = 'default',
}: ScenicChoiceCardProps) {
  const iconOnLeft = iconPosition === 'left'
  const selectionButton = (
    <button
      type="button"
      data-haptic="selection"
      aria-pressed={ariaPressed ?? selected}
      onClick={onClick}
      className={cn(
        'game-focus-ring flex size-11 shrink-0 items-center justify-center rounded-lg border bg-game-surface-raised/50 p-0 text-game-charcoal backdrop-blur-[2px] hover:border-game-charcoal/30 hover:bg-game-surface-raised/75 active:bg-game-surface-raised/90',
        selected ? 'border-game-charcoal/45' : 'border-game-charcoal/15',
      )}
    >
      <span className="sr-only">{title}</span>
      <span aria-hidden="true">
        <TaskIconDisplay
          icon={{ type: 'item', id: 'poke-ball' }}
          normalizeVisibleBounds
          className="h-7 w-7"
        />
      </span>
    </button>
  )

  if (appearance === 'explore') {
    return (
      <div
        className={cn(
          'relative flex min-h-24 w-full items-center gap-4 overflow-hidden rounded-md rounded-tr-none border bg-game-surface p-4 text-right',
          selected
            ? 'border-game-charcoal/65 ring-1 ring-game-charcoal/15'
            : 'border-game-card-border',
          className,
        )}
      >
        {background && (
          <Image
            src={background}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="pointer-events-none object-cover opacity-70"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-game-surface-raised/76 via-game-surface/56 to-game-surface/10"
        />
        {icon && (
          <span className="relative z-10 flex size-14 shrink-0 items-center justify-center text-game-charcoal-strong">
            {icon}
          </span>
        )}
        <span className="relative z-10 flex min-w-0 flex-1 flex-col items-end self-stretch">
          <span className="-mr-4 -mt-4 line-clamp-2 w-fit max-w-full rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-xs font-bold leading-tight tracking-[0.12em] text-white">
            {title}
          </span>
          {description && (
            <span className="mt-2 text-xs font-medium text-game-ink">
              {description}
            </span>
          )}
          <span className="mt-auto flex items-center justify-end pt-3">
            {selectionButton}
          </span>
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex min-h-24 w-full items-stretch overflow-hidden rounded-lg border text-left md:min-h-28',
        selected
          ? 'border-game-charcoal/65 ring-1 ring-game-charcoal/15'
          : 'border-game-card-border',
        className,
      )}
    >
      {background ? (
        <Image
          src={background}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          className="pointer-events-none object-cover opacity-75"
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
          <span className="game-icon-orb game-icon-orb-art flex size-14 shrink-0 text-game-charcoal-strong">
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
          <span className="mt-3 flex justify-end">{selectionButton}</span>
        </span>
      </span>
    </div>
  )
}
