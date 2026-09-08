'use client'

import {
  getGridPlayerAppearance,
  type GridPlayerDirection,
} from '@/utilities/trainer-appearance'
import { cn } from '@/lib/utils'

export function GridPlayerSprite({
  gender,
  facing = 'down',
  step = 0,
  className,
}: {
  gender: unknown
  facing?: GridPlayerDirection
  step?: number
  className?: string
}) {
  const appearance = getGridPlayerAppearance(gender, facing, step)
  return (
    <div
      aria-hidden="true"
      data-grid-player-sprite={appearance.src}
      className={cn(
        'relative h-full w-full bg-no-repeat [image-rendering:pixelated]',
        className,
      )}
      style={{
        backgroundImage: `url('${appearance.src}')`,
        backgroundSize: appearance.backgroundSize,
        backgroundPosition: appearance.backgroundPosition,
      }}
    />
  )
}
