'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ExploreDrawerHeaderProps {
  background?: string
  label?: ReactNode
  icon: ReactNode
  badge?: ReactNode
  iconClassName?: string
  children?: ReactNode
}

/**
 * Legacy scenic header kept for embedded Explore content. Full-screen panels
 * use the shared ResponsivePanel title frame so they have one close control
 * and no bottom-sheet gesture.
 */
export function ExploreDrawerHeader({
  background,
  label,
  icon,
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
        <div className="absolute bottom-4 left-1/2 z-20 max-w-[80%] -translate-x-1/2">
          <span className="game-icon-orb game-icon-orb-art inline-flex max-w-full items-center justify-center gap-2 px-4 py-1.5 text-center text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-game-ink">
            {label}
          </span>
        </div>
      )}

      <div className="absolute left-1/2 top-3 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-game-cream/30" />

      {children}

      <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
        <div className="relative">
          <div
            className={cn(
              'game-icon-orb game-icon-orb-art relative h-16 w-16 overflow-hidden border-game-border/60',
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
