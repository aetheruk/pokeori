'use client'

import { useLayoutEffect, useRef } from 'react'
import {
  getGridPlayerAppearance,
  type GridPlayerDirection,
} from '@/utilities/trainer-appearance'
import { cn } from '@/lib/utils'

export const GRID_PLAYER_MOVE_MS = 150

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

export function GridPlayerToken({
  gender,
  facing = 'down',
  step = 0,
  position,
  durationMs = GRID_PLAYER_MOVE_MS,
  blockedOffset,
  className,
}: {
  gender: unknown
  facing?: GridPlayerDirection
  step?: number
  position: { x: number; y: number }
  durationMs?: number
  blockedOffset?: { x: number; y: number } | null
  className?: string
}) {
  const appearance = getGridPlayerAppearance(gender, facing, 0)
  const playerRef = useRef<HTMLDivElement>(null)
  const spriteRef = useRef<HTMLDivElement>(null)
  const previousRef = useRef({ ...position, step })

  useLayoutEffect(() => {
    const previous = previousRef.current
    previousRef.current = { x: position.x, y: position.y, step }
    const player = playerRef.current
    const sprite = spriteRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Resets, undo, and non-linear teleports should never walk across the board.
    const dx = position.x - previous.x
    const dy = position.y - previous.y
    if (
      !player ||
      !sprite ||
      reducedMotion.matches ||
      step <= previous.step ||
      (dx === 0 && dy === 0) ||
      (dx !== 0 && dy !== 0)
    )
      return

    const movement = player.animate(
      [
        { transform: `translate(${previous.x * 100}%, ${previous.y * 100}%)` },
        { transform: `translate(${position.x * 100}%, ${position.y * 100}%)` },
      ],
      { duration: durationMs, easing: 'linear' },
    )
    const walk = sprite.animate(
      [0, 1, 2, 3, 0].map((frame) => ({
        backgroundPosition: getGridPlayerAppearance(gender, facing, frame)
          .backgroundPosition,
        easing: 'steps(1, end)',
      })),
      {
        duration: durationMs / Math.ceil(durationMs / GRID_PLAYER_MOVE_MS),
        iterations: Math.ceil(durationMs / GRID_PLAYER_MOVE_MS),
      },
    )
    const cancel = () => {
      movement.cancel()
      walk.cancel()
    }
    reducedMotion.addEventListener('change', cancel)
    return () => {
      cancel()
      reducedMotion.removeEventListener('change', cancel)
    }
  }, [position.x, position.y, step, durationMs, gender, facing])

  return (
    <div
      ref={playerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute left-0 top-0 z-50 p-0.5',
        className,
      )}
      style={{
        width: 'var(--grid-tile-px)',
        height: 'var(--grid-tile-px)',
        transform: `translate(${position.x * 100}%, ${position.y * 100}%)`,
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-150 ease-out motion-reduce:!transform-none motion-reduce:transition-none"
        style={{
          transform: blockedOffset
            ? `translate(${blockedOffset.x}px, ${blockedOffset.y}px)`
            : undefined,
        }}
      >
        <div className="absolute inset-[20%] translate-y-[18%] rounded-full bg-[#081014]/25 blur-[3px]" />
        <div
          ref={spriteRef}
          data-grid-player-sprite={appearance.src}
          className="relative h-full w-full bg-no-repeat [image-rendering:pixelated]"
          style={{
            backgroundImage: `url('${appearance.src}')`,
            backgroundSize: appearance.backgroundSize,
            backgroundPosition: appearance.backgroundPosition,
          }}
        />
      </div>
    </div>
  )
}
