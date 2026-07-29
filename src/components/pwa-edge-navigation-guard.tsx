'use client'

import { useEffect } from 'react'

export const PWA_NAVIGATION_EDGE_WIDTH_PX = 36
export const PWA_NAVIGATION_SWIPE_THRESHOLD_PX = 4

export type PwaNavigationEdge = 'left' | 'right'

type TouchPoint = {
  x: number
  y: number
}

export function getPwaNavigationEdge(
  clientX: number,
  viewportWidth: number,
): PwaNavigationEdge | null {
  if (viewportWidth <= 0) return null
  if (clientX <= PWA_NAVIGATION_EDGE_WIDTH_PX) return 'left'
  if (clientX >= viewportWidth - PWA_NAVIGATION_EDGE_WIDTH_PX) return 'right'
  return null
}

export function shouldBlockPwaNavigationSwipe(
  edge: PwaNavigationEdge,
  start: TouchPoint,
  current: TouchPoint,
): boolean {
  const deltaX = current.x - start.x
  const deltaY = current.y - start.y

  if (
    Math.abs(deltaX) < PWA_NAVIGATION_SWIPE_THRESHOLD_PX ||
    Math.abs(deltaX) <= Math.abs(deltaY)
  ) {
    return false
  }

  return edge === 'left' ? deltaX > 0 : deltaX < 0
}

function isStandalonePwa(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

export function PwaEdgeNavigationGuard() {
  useEffect(() => {
    if (!isStandalonePwa()) return

    let trackedTouch:
      | {
          identifier: number
          edge: PwaNavigationEdge
          start: TouchPoint
        }
      | undefined

    const resetTrackedTouch = () => {
      trackedTouch = undefined
    }

    const handleTouchStart = (event: TouchEvent) => {
      resetTrackedTouch()
      if (event.touches.length !== 1) return

      const touch = event.touches[0]
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth
      const edge = getPwaNavigationEdge(touch.clientX, viewportWidth)
      if (!edge) return

      trackedTouch = {
        identifier: touch.identifier,
        edge,
        start: { x: touch.clientX, y: touch.clientY },
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (!trackedTouch || event.touches.length !== 1) return

      const touch = Array.from(event.touches).find(
        (candidate) => candidate.identifier === trackedTouch?.identifier,
      )
      if (!touch) {
        resetTrackedTouch()
        return
      }

      if (
        event.cancelable &&
        shouldBlockPwaNavigationSwipe(trackedTouch.edge, trackedTouch.start, {
          x: touch.clientX,
          y: touch.clientY,
        })
      ) {
        event.preventDefault()
      }
    }

    document.addEventListener('touchstart', handleTouchStart, {
      capture: true,
      passive: false,
    })
    document.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: false,
    })
    document.addEventListener('touchend', resetTrackedTouch, {
      capture: true,
      passive: true,
    })
    document.addEventListener('touchcancel', resetTrackedTouch, {
      capture: true,
      passive: true,
    })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, true)
      document.removeEventListener('touchmove', handleTouchMove, true)
      document.removeEventListener('touchend', resetTrackedTouch, true)
      document.removeEventListener('touchcancel', resetTrackedTouch, true)
    }
  }, [])

  return null
}
