'use client'

import { useEffect, useRef, useState } from 'react'
import { RotateCcw, RotateCw } from 'lucide-react'
import { normalizeAngle } from '@/utilities/research/snake'

export function SnakeJoystick({ disabled, onDirection, onRelease }: {
  disabled: boolean
  onDirection: (heading: number) => void
  onRelease: () => void
}) {
  const activePointer = useRef<number | null>(null)
  const [thumb, setThumb] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (!disabled) return
    activePointer.current = null
    setThumb({ x: 0, y: 0 })
    onRelease()
  }, [disabled, onRelease])
  const release = () => {
    activePointer.current = null
    setThumb({ x: 0, y: 0 })
    onRelease()
  }
  const move = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointer.current !== event.pointerId) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const radius = bounds.width / 2
    const x = (event.clientX - bounds.left - radius) / radius
    const y = (event.clientY - bounds.top - radius) / radius
    const length = Math.hypot(x, y)
    const scale = Math.max(1, length)
    setThumb({ x: x / scale, y: y / scale })
    if (length < 0.18) onRelease()
    else onDirection(normalizeAngle(Math.atan2(y, x) * 180 / Math.PI))
  }
  return <div className="flex items-center gap-3">
    <RotateCcw aria-hidden className="size-5 text-game-ink" />
    <button
      type="button"
      aria-label="Steering joystick"
      aria-describedby="snake-controls"
      disabled={disabled}
      className="game-focus-ring relative size-28 touch-none rounded-full border border-game-border bg-game-surface-raised/95 shadow-md disabled:opacity-60"
      onPointerDown={(event) => {
        if (activePointer.current !== null) return
        event.preventDefault()
        event.currentTarget.focus({ preventScroll: true })
        activePointer.current = event.pointerId
        event.currentTarget.setPointerCapture(event.pointerId)
        move(event)
      }}
      onPointerMove={move}
      onPointerUp={(event) => {
        if (activePointer.current !== event.pointerId) return
        release()
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      }}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onBlur={release}
      onClick={(event) => { if (event.detail === 0) release() }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-3 rounded-full border border-game-border bg-game-canvas" />
      <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-12 rounded-full border border-game-moss bg-game-moss shadow-sm" style={{ transform: `translate(calc(-50% + ${thumb.x * 30}px), calc(-50% + ${thumb.y * 30}px))` }} />
    </button>
    <RotateCw aria-hidden className="size-5 text-game-ink" />
  </div>
}
