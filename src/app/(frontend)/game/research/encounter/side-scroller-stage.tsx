'use client'

import Image from 'next/image'
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { SideScrollerSceneConfig } from '@/data/games/shared'
import { cn } from '@/lib/utils'
import {
  getRegionTimeZone,
  getTimeZoneClockTime,
} from '@/utilities/requirements'

const STAGE_SIZE = 600
const TAP_DISTANCE_PX = 24
const SWIPE_DISTANCE_PX = 45

interface OutsidePointerStart {
  pointerId: number
  x: number
  y: number
}

export interface OutsideStageSwipe {
  direction: 'left' | 'right'
  distanceX: number
  distanceY: number
}

function getTimeTint(category: string) {
  const { hour } = getTimeZoneClockTime(new Date(), getRegionTimeZone(category))

  if (hour >= 5 && hour < 8) {
    return 'bg-[linear-gradient(to_bottom,rgba(251,146,60,0.2),rgba(255,255,255,0.02)_45%,rgba(20,83,45,0.12))]'
  }
  if (hour >= 8 && hour < 17) {
    return 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0)_45%,rgba(13,148,136,0.08))]'
  }
  if (hour >= 17 && hour < 20) {
    return 'bg-[linear-gradient(to_bottom,rgba(251,146,60,0.18),rgba(88,28,135,0.14)_52%,rgba(15,23,42,0.18))]'
  }
  return 'bg-[linear-gradient(to_bottom,rgba(2,6,23,0.42),rgba(15,23,42,0.22)_55%,rgba(2,44,34,0.24))]'
}

function getAtmosphere(scene?: SideScrollerSceneConfig) {
  switch (scene?.atmosphere) {
    case 'sky':
      return 'from-sky-200/25 via-white/8 to-blue-950/20'
    case 'mountain':
      return 'from-slate-100/18 via-sky-200/8 to-slate-950/24'
    default:
      return 'from-emerald-100/18 via-sky-100/8 to-emerald-950/22'
  }
}

interface SideScrollerStageProps {
  category: string
  scene?: SideScrollerSceneConfig
  fallbackBackdrop: string
  stageRef: React.RefObject<HTMLDivElement | null>
  score: ReactNode
  timer?: ReactNode
  onOutsideTap?: () => void
  onOutsideSwipe?: (swipe: OutsideStageSwipe) => void
  overlay?: ReactNode
  children: ReactNode
}

export function SideScrollerStage({
  category,
  scene,
  fallbackBackdrop,
  stageRef,
  score,
  timer,
  onOutsideTap,
  onOutsideSwipe,
  overlay,
  children,
}: SideScrollerStageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const outsidePointerStartRef = useRef<OutsidePointerStart | null>(null)
  const [stageSize, setStageSize] = useState(STAGE_SIZE)
  const backdrop = scene?.backdrop || fallbackBackdrop
  const scale = stageSize / STAGE_SIZE

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    const updateSize = () => {
      const rect = node.getBoundingClientRect()
      setStageSize(Math.max(1, Math.min(STAGE_SIZE, rect.width)))
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const isInsideStage = (target: EventTarget | null) => {
    const node = wrapperRef.current
    return !!node && target instanceof Node && node.contains(target)
  }

  const handleOutsidePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (isInsideStage(event.target)) {
      outsidePointerStartRef.current = null
      return
    }

    outsidePointerStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    }
  }

  const handleOutsidePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = outsidePointerStartRef.current
    outsidePointerStartRef.current = null

    if (
      !start ||
      start.pointerId !== event.pointerId ||
      isInsideStage(event.target)
    )
      return

    const distanceX = event.clientX - start.x
    const distanceY = event.clientY - start.y
    const absoluteX = Math.abs(distanceX)
    const absoluteY = Math.abs(distanceY)
    const distance = Math.hypot(distanceX, distanceY)

    if (absoluteX >= SWIPE_DISTANCE_PX && absoluteX > absoluteY * 1.2) {
      onOutsideSwipe?.({
        direction: distanceX > 0 ? 'right' : 'left',
        distanceX,
        distanceY,
      })
      return
    }

    if (distance <= TAP_DISTANCE_PX) {
      onOutsideTap?.()
    }
  }

  const handleOutsidePointerCancel = () => {
    outsidePointerStartRef.current = null
  }

  return (
    <div className="game-activity-chrome relative min-h-dvh overflow-hidden bg-slate-950 select-none touch-none">
      <Image
        src={backdrop}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover scale-110 blur-xl opacity-65"
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b',
          getAtmosphere(scene),
        )}
      />
      <div
        className={cn(
          'absolute inset-0 mix-blend-multiply',
          getTimeTint(category),
        )}
      />

      <div
        className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-start gap-3 px-3 py-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
        onPointerDown={handleOutsidePointerDown}
        onPointerUp={handleOutsidePointerUp}
        onPointerCancel={handleOutsidePointerCancel}
      >
        <div className="grid w-full max-w-[640px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-1">
          <div />
          <div className="rounded-full border border-game-night-border/60 bg-game-night-surface/75 px-4 py-2 text-sm font-bold text-game-night-ink shadow-lg backdrop-blur-md">
            {score}
          </div>
          <div className="justify-self-end">{timer}</div>
        </div>

        <div
          ref={wrapperRef}
          className="relative aspect-square max-w-[600px] overflow-hidden rounded-lg border border-[#f7ecd6]/18 bg-game-night-surface"
          style={{ width: 'min(94vw, calc(100dvh - 12.25rem), 600px)' }}
        >
          <div
            ref={stageRef}
            className="absolute left-0 top-0 h-[600px] w-[600px] origin-top-left overflow-hidden bg-sky-200"
            style={{ transform: `scale(${scale})` }}
          >
            {children}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/15" />
          {overlay}
        </div>

        <div className="mt-auto h-[max(4.5rem,env(safe-area-inset-bottom))]" />
      </div>
    </div>
  )
}
