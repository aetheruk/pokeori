'use client'

import { useEffect, useId, useRef, type PointerEvent } from 'react'
import { Loader2 } from 'lucide-react'

import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { cn } from '@/lib/utils'
import type { MovePresentation } from '@/utilities/pokemon/move-display'

const DETAILS_HOLD_MS = 550
const HOLD_MOVE_TOLERANCE_PX = 12

export interface MoveBattleCommandProps {
  presentation: MovePresentation
  onDetails: () => void
  onSelect: () => void
  disabled?: boolean
  pending?: boolean
  className?: string
}

export function MoveBattleCommand({
  presentation,
  onDetails,
  onSelect,
  disabled = false,
  pending = false,
  className,
}: MoveBattleCommandProps) {
  const { identity } = presentation
  const Icon = STANCE_ICON_CONFIG[identity.stance]?.Icon
  const detailsHintId = useId()
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdOrigin = useRef<{ x: number; y: number } | null>(null)
  const suppressClick = useRef(false)

  const cancelHold = () => {
    if (holdTimer.current !== null) clearTimeout(holdTimer.current)
    holdTimer.current = null
    holdOrigin.current = null
  }

  useEffect(() => cancelHold, [])

  const openDetails = (suppressNextClick: boolean) => {
    cancelHold()
    suppressClick.current = suppressNextClick
    onDetails()
  }

  const startHold = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    cancelHold()
    suppressClick.current = false
    holdOrigin.current = { x: event.clientX, y: event.clientY }
    holdTimer.current = setTimeout(() => openDetails(true), DETAILS_HOLD_MS)
  }

  const checkHoldMovement = (event: PointerEvent<HTMLButtonElement>) => {
    if (!holdOrigin.current) return
    const distance = Math.hypot(
      event.clientX - holdOrigin.current.x,
      event.clientY - holdOrigin.current.y,
    )
    if (distance > HOLD_MOVE_TOLERANCE_PX) cancelHold()
  }

  return (
    <button
      type="button"
      data-type={identity.type.toLowerCase()}
      data-stance={identity.stance}
      data-pending={pending || undefined}
      aria-label={`Use ${identity.name}`}
      aria-describedby={detailsHintId}
      aria-keyshortcuts="I"
      aria-disabled={disabled}
      aria-busy={pending}
      title="Hold for move details"
      className={cn(
        'game-battle-stance game-battle-move relative w-full min-w-0 border text-left',
        className,
      )}
      onPointerDown={startHold}
      onPointerMove={checkHoldMovement}
      onPointerUp={cancelHold}
      onPointerCancel={cancelHold}
      onPointerLeave={cancelHold}
      onContextMenu={(event) => {
        event.preventDefault()
        if (event.button === 2 || !suppressClick.current) {
          openDetails(event.button !== 2)
        }
      }}
      onKeyDown={(event) => {
        if (event.key.toLowerCase() !== 'i' || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return
        event.preventDefault()
        openDetails(false)
      }}
      onClick={(event) => {
        if (suppressClick.current && event.detail !== 0) {
          suppressClick.current = false
          event.preventDefault()
          return
        }
        if (!disabled) onSelect()
      }}
    >
      <span className="game-battle-stance-icon relative inline-flex size-10 shrink-0 items-center justify-center" aria-hidden="true">
        {Icon ? <Icon className="relative z-10 size-7 [&_*]:stroke-[1.8]" /> : null}
      </span>
      <span className="game-battle-stance-name min-w-0 text-right">
        <strong className="block truncate font-display text-lg font-black leading-tight sm:text-xl">
          {identity.name}
        </strong>
      </span>
      {pending ? <Loader2 className="absolute top-2 right-2 z-10 size-4 animate-spin text-game-cream" aria-hidden="true" /> : null}
      <span id={detailsHintId} className="sr-only">
        {identity.type} type, {identity.stance} stance. Press and hold, right click, or press I for move details.
      </span>
    </button>
  )
}
