'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ExploreDrawerHeaderProps {
  background?: string
  label?: ReactNode
  icon: ReactNode
  onClose: () => void
  closeAriaLabel?: string
  badge?: ReactNode
  iconClassName?: string
  children?: ReactNode
}

/**
 * The single drawer header used by every Explore-style panel (expeditions,
 * chronicles, locations, tasks, games, battles and field research). The
 * unstarted Chronicle drawer is the canonical look: tall art header with a
 * visible background, top-left label chip, top-right close button, and a
 * centered icon that clears the rounded top corners.
 */
export function ExploreDrawerHeader({
  background,
  label,
  icon,
  onClose,
  closeAriaLabel = 'Close',
  badge,
  iconClassName,
  children,
}: ExploreDrawerHeaderProps) {
  return (
    <div className="relative h-56 w-full shrink-0 overflow-hidden border-b border-game-border bg-game-night-surface md:h-64">
      <div className="absolute inset-0 z-0">
        <Image
          src={background || '/backgrounds/forest.avif'}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70 brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-game-night-surface/5 via-game-night-surface/25 to-game-surface" />
      </div>

      {label && (
        <div className="absolute left-7 top-7 z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-game-ochre/45 bg-game-surface-raised/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-game-clay-strong backdrop-blur-md">
            {label}
          </span>
        </div>
      )}

      <div className="absolute left-1/2 top-3 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-game-cream/30" />

      <button
        type="button"
        onClick={onClose}
        className="game-focus-ring absolute right-7 top-7 z-20 rounded-md border border-game-border/60 bg-game-surface-raised/90 p-2 text-game-ink backdrop-blur-md transition-colors hover:bg-game-surface hover:text-game-clay-strong"
        aria-label={closeAriaLabel}
      >
        <X className="h-6 w-6" />
      </button>

      {children}

      <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <div className="relative">
          <div
            className={cn(
              'relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-game-border/60 bg-game-surface-raised/90 backdrop-blur-sm',
              iconClassName,
            )}
          >
            <div className="scale-125">{icon}</div>
          </div>
          {badge && (
            <div className="absolute -bottom-2 -right-2 z-20">{badge}</div>
          )}
        </div>
      </div>
    </div>
  )
}
