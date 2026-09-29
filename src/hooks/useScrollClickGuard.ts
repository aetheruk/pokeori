'use client'

import { useCallback, useEffect, useRef } from 'react'
import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'

const SCROLL_MOVEMENT_THRESHOLD = 8
const CLICK_SUPPRESSION_TIMEOUT_MS = 700

type TrackedPointer = {
  id: number
  pointerType: string
  startX: number
  startY: number
  moved: boolean
}

/** Prevent a touch scroll that starts on a clickable card from opening it. */
export function useScrollClickGuard() {
  const trackedPointerRef = useRef<TrackedPointer | null>(null)
  const suppressClickRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearSuppression = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    suppressClickRef.current = false
  }, [])

  const trackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      clearSuppression()
      trackedPointerRef.current = {
        id: event.pointerId,
        pointerType: event.pointerType,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
      }
    },
    [clearSuppression],
  )

  const trackPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const pointer = trackedPointerRef.current
      if (!pointer || pointer.id !== event.pointerId) return

      const distance = Math.hypot(
        event.clientX - pointer.startX,
        event.clientY - pointer.startY,
      )
      if (distance >= SCROLL_MOVEMENT_THRESHOLD) pointer.moved = true
    },
    [],
  )

  const finishPointer = useCallback(
    (event: ReactPointerEvent<HTMLElement>, cancelled = false) => {
      const pointer = trackedPointerRef.current
      if (!pointer || pointer.id !== event.pointerId) return

      const distance = Math.hypot(
        event.clientX - pointer.startX,
        event.clientY - pointer.startY,
      )
      const moved = pointer.moved || distance >= SCROLL_MOVEMENT_THRESHOLD

      trackedPointerRef.current = null

      // Safari can hand a touch gesture to native scrolling before emitting
      // pointermove, so pointercancel also needs to suppress the resulting tap.
      if (!moved && !(cancelled && pointer.pointerType === 'touch')) return

      suppressClickRef.current = true
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(
        clearSuppression,
        CLICK_SUPPRESSION_TIMEOUT_MS,
      )
    },
    [clearSuppression],
  )

  const suppressScrolledClick = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      // Keep keyboard activation available, even if a recent drag is waiting
      // for its synthetic click to arrive.
      if (event.detail === 0 || !suppressClickRef.current) return

      event.preventDefault()
      event.stopPropagation()
      clearSuppression()
    },
    [clearSuppression],
  )

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  return {
    onPointerDown: trackPointerDown,
    onPointerMove: trackPointerMove,
    onPointerUp: finishPointer,
    onPointerCancel: (event: ReactPointerEvent<HTMLElement>) =>
      finishPointer(event, true),
    onClickCapture: suppressScrolledClick,
  }
}
