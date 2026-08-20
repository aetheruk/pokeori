'use client'

import { motion } from 'framer-motion'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'

export interface ItemFlickOption {
  id: string
  label: string
  description?: string
}

interface ItemFlickQteProps {
  title: string
  instruction: string
  options: ItemFlickOption[]
  onThrow: (itemId: string) => void
  disabled?: boolean
}

export function ItemFlickQte({
  title,
  instruction,
  options,
  onThrow,
  disabled = false,
}: ItemFlickQteProps) {
  const [drag, setDrag] = useState<{
    itemId: string
    dx: number
    dy: number
  } | null>(null)
  const [thrownItemId, setThrownItemId] = useState<string | null>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const completedRef = useRef(false)

  useEffect(() => {
    completedRef.current = false
    dragStartRef.current = null
    setDrag(null)
    setThrownItemId(null)
  }, [options.map((option) => option.id).join('|')])

  const startDrag = (
    event: React.PointerEvent<HTMLButtonElement>,
    itemId: string,
  ) => {
    if (disabled || completedRef.current) return
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    setDrag({ itemId, dx: 0, dy: 0 })
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (
    event: React.PointerEvent<HTMLButtonElement>,
    itemId: string,
  ) => {
    const start = dragStartRef.current
    if (!start || drag?.itemId !== itemId || disabled) return
    setDrag({
      itemId,
      dx: event.clientX - start.x,
      dy: event.clientY - start.y,
    })
  }

  const finishDrag = (itemId: string) => {
    const currentDrag = drag?.itemId === itemId ? drag : null
    dragStartRef.current = null
    setDrag(null)
    if (!currentDrag || disabled || completedRef.current) return

    const upwardDistance = -currentDrag.dy
    const sidewaysDistance = Math.abs(currentDrag.dx)
    if (upwardDistance < 48 || upwardDistance <= sidewaysDistance * 1.15) return

    completedRef.current = true
    setThrownItemId(itemId)
    window.setTimeout(() => onThrow(itemId), 180)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    itemId: string,
  ) => {
    if (disabled || completedRef.current) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    completedRef.current = true
    setThrownItemId(itemId)
    window.setTimeout(() => onThrow(itemId), 180)
  }

  return (
    <div className="relative z-10 flex h-full w-full max-w-3xl mx-auto flex-col justify-center">
      <SectionDivider
        className="mb-3 min-h-8 [&>div:first-child]:text-base [&>div:first-child]:font-bold [&>div:first-child]:leading-tight [&>div:first-child]:tracking-[0.04em]"
        textColor="text-game-ink"
      >
        {title}
      </SectionDivider>
      <p className="mx-auto mb-4 max-w-sm text-center text-sm text-game-muted">
        {instruction}
      </p>
      <div className="relative flex flex-1 items-center justify-center overflow-visible p-5">
        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:gap-6">
          {options.map((option) => {
            const isDragging = drag?.itemId === option.id
            const isThrown = thrownItemId === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-label={`Throw ${option.label}`}
                className="group relative flex min-h-40 touch-none flex-col items-center justify-center rounded-xl border border-game-border bg-game-surface-raised p-4 text-center shadow-sm transition-colors hover:border-game-moss/50 hover:bg-game-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-game-moss disabled:cursor-not-allowed disabled:opacity-50"
                disabled={disabled || completedRef.current}
                onPointerDown={(event) => startDrag(event, option.id)}
                onPointerMove={(event) => moveDrag(event, option.id)}
                onPointerUp={() => finishDrag(option.id)}
                onPointerCancel={() => {
                  dragStartRef.current = null
                  setDrag(null)
                }}
                onKeyDown={(event) => handleKeyDown(event, option.id)}
              >
                <motion.span
                  className="relative block h-20 w-20"
                  animate={{
                    x: isDragging ? drag.dx : 0,
                    y: isThrown ? -180 : isDragging ? drag.dy : 0,
                    opacity:
                      thrownItemId && !isThrown ? 0.35 : isThrown ? 0 : 1,
                    scale: isDragging || isThrown ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                >
                  <ItemSprite
                    itemId={option.id}
                    alt={option.label}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                </motion.span>
                <span className="mt-2 text-sm font-bold text-game-ink">
                  {option.label}
                </span>
                {option.description && (
                  <span className="mt-1 text-xs leading-tight text-game-muted">
                    {option.description}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
