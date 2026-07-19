'use client'

import React from 'react'
import { getBanner, getIcon, getTitle } from '@/data/user'
import { trainerSpriteById } from '@/data/trainers'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { cn } from '@/lib/utils'

interface TrainerCardProps {
  name: string
  icon?: string
  banner?: string
  title?: string
  className?: string
  children?: React.ReactNode
}

export function TrainerCard({ name, icon, banner, title, className, children }: TrainerCardProps) {
  // Helpers to resolve IDs to assets
  const currentBanner = getBanner(banner || 'lab')
  const currentIcon = getIcon(icon || 'ditto')
  const currentTitle = getTitle(title || 'new-beginnings')

  // Fallback for PVE custom assets if not found in user data
  const bannerImage =
    currentBanner?.imagePath || (banner?.startsWith('/') ? banner : '/backgrounds/lab.avif')
  // Battle configs often pass raw trainer sprite ids instead of user icon ids.
  const iconData =
    currentIcon?.icon ||
    (icon
      ? icon.startsWith('/')
        ? { type: 'local', id: icon }
        : icon in trainerSpriteById
          ? { type: 'trainer', id: icon }
          : { type: 'pokemon', id: icon }
      : { type: 'pokemon', id: '132' })

  // Title text fallback
  const titleText = currentTitle?.name || title || 'New Beginnings'

  return (
    <div
      className={cn(
        'relative bg-cover bg-center flex-shrink-0 rounded-xl overflow-hidden h-[200px] border border-game-border',
        className,
      )}
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-game-night-canvas/95 via-game-night-canvas/25 to-transparent" />
      {/* Profile content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-6 pt-8">
        {/* Icon */}
        <div className="relative mb-3">
          <div className="w-14 h-14 bg-game-night-ink/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-game-night-ink/20 shadow-xl backdrop-blur-md">
            <TaskIconDisplay icon={iconData as any} className="w-10 h-10" />
          </div>
        </div>
        {/* Name */}
        <h2 className="max-w-[calc(100%-1rem)] text-center font-display text-xl font-semibold leading-tight tracking-wide text-game-cream drop-shadow-[0_2px_4px_rgb(23_39_51_/_0.95)]">
          {name}
        </h2>
        {/* Title mark - kept light so the banner remains part of the card */}
        <div className="mt-2 flex max-w-full items-center gap-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-game-cream/90 drop-shadow-[0_1px_3px_rgb(23_39_51_/_0.95)] before:h-px before:w-4 before:shrink-0 before:bg-game-ochre after:h-px after:w-4 after:shrink-0 after:bg-game-ochre">
          {titleText}
        </div>
      </div>

      {/* Children (e.g. Edit Button) */}
      {children}
    </div>
  )
}
