'use client'

import type React from 'react'
import { ItemSprite } from '@/components/ui/item-sprite'
import type { Item } from '@/data/items'
import type { CaptureThrowPayload } from './draggable-pokeball'
import { DraggablePokeball } from './draggable-pokeball'

interface SafariBallControlProps {
  ball?: Item
  quantity: number
  targetRef: React.RefObject<HTMLElement | null>
  disabled?: boolean
  onThrow: (input: CaptureThrowPayload) => void
}

export function SafariBallControl({
  ball,
  quantity,
  targetRef,
  disabled = false,
  onThrow,
}: SafariBallControlProps) {
  if (!ball || quantity <= 0) return null

  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-game-border/70 bg-game-surface/55 p-2 hover:border-game-moss/50 hover:bg-game-surface-raised sm:h-24 sm:w-24 sm:p-3">
      <div className="h-14 w-14 sm:h-16 sm:w-16">
        <DraggablePokeball
          targetRef={targetRef}
          disabled={disabled}
          onThrow={onThrow}
        >
          <div className="h-full w-full cursor-grab active:cursor-grabbing">
            <ItemSprite
              itemId={ball.id}
              alt={ball.name}
              width={56}
              height={56}
              className="h-full w-full object-contain pixelated drop-shadow-xl"
            />
          </div>
        </DraggablePokeball>
      </div>
      <span
        className="absolute -bottom-2 left-1/2 inline-flex h-6 min-w-10 -translate-x-1/2 items-center justify-center rounded-full border border-game-border bg-game-surface-raised px-2 text-[11px] font-bold tabular-nums text-game-muted shadow-sm"
        title={`${quantity} Safari Balls remaining`}
      >
        ×{quantity}
      </span>
    </div>
  )
}
