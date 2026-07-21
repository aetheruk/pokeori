'use client'

import { motion } from 'framer-motion'
import { Footprints } from 'lucide-react'
import Image from 'next/image'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ItemSprite } from '@/components/ui/item-sprite'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { items } from '@/data/items'
import { cn } from '@/lib/utils'
import type { CaptureThrowPoint } from '@/utilities/pokemon/catch-balance'
import type {
  EncounterQteCompletionPayload,
  PublicEncounterQte,
} from '@/utilities/pokemon/encounter-qte'
import {
  getFocusCircleProgress,
  isFocusCircleGesture,
  isFocusCircleProgressComplete,
} from '@/utilities/pokemon/focus-qte'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'

interface EncounterQteProps {
  qte: PublicEncounterQte
  pokemonName: string
  formId: string
  rarity?: PokemonRarityId
  shiny?: boolean
  gender?: 'male' | 'female' | 'genderless'
  onComplete: (payload: EncounterQteCompletionPayload) => void
}

function getItemName(itemId: string) {
  return items.find((item) => item.id === itemId)?.name || itemId
}

export function EncounterQte({
  qte,
  pokemonName,
  formId,
  rarity,
  shiny,
  gender,
  onComplete,
}: EncounterQteProps) {
  const [focusCircles, setFocusCircles] = useState(0)
  const [focusPath, setFocusPath] = useState<CaptureThrowPoint[]>([])
  const [focusTrails, setFocusTrails] = useState<
    Array<{ id: number; points: CaptureThrowPoint[]; success: boolean }>
  >([])
  const [focusLoopProgress, setFocusLoopProgress] = useState(0)
  const [calmDrag, setCalmDrag] = useState<{
    berryId: string
    dx: number
    dy: number
  } | null>(null)
  const [calmThrownBerryId, setCalmThrownBerryId] = useState<string | null>(
    null,
  )
  const [scared, setScared] = useState(0)
  const [scaredDecoys, setScaredDecoys] = useState<Set<number>>(new Set())
  const [chaseTaps, setChaseTaps] = useState(0)
  const completedRef = useRef(false)
  const pathRef = useRef<CaptureThrowPoint[]>([])
  const focusAreaRef = useRef<HTMLDivElement | null>(null)
  const lastCompletedCircleAtRef = useRef(0)
  const calmDragStartRef = useRef<CaptureThrowPoint | null>(null)
  const scareTimeoutsRef = useRef<number[]>([])

  const decoys = useMemo(
    () => qte.decoyFormIds || ['10', '16', '19', '21', '25', '29'],
    [qte.decoyFormIds],
  )

  const finish = (payload: EncounterQteCompletionPayload) => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete(payload)
  }

  useEffect(() => {
    completedRef.current = false
    setFocusCircles(0)
    setFocusPath([])
    setFocusTrails([])
    setFocusLoopProgress(0)
    setCalmDrag(null)
    setCalmThrownBerryId(null)
    setScared(0)
    setScaredDecoys(new Set())
    setChaseTaps(0)
    pathRef.current = []
    calmDragStartRef.current = null
    scareTimeoutsRef.current.forEach((timeoutId) =>
      window.clearTimeout(timeoutId),
    )
    scareTimeoutsRef.current = []
  }, [qte.id])

  useEffect(() => {
    if (qte.type === 'focus' && focusCircles >= 3)
      finish({ type: 'focus', completedCircles: focusCircles })
  }, [focusCircles, qte.type])

  useEffect(() => {
    if (qte.type === 'scare' && scared >= 6)
      finish({ type: 'scare', tappedDecoys: scared })
  }, [qte.type, scared])

  useEffect(() => {
    const tapTarget = qte.tapTarget || 12
    if (qte.type === 'chase' && chaseTaps >= tapTarget)
      finish({ type: 'chase', tapCount: chaseTaps })
  }, [chaseTaps, qte.tapTarget, qte.type])

  const getFocusPoint = (
    event: React.PointerEvent<HTMLDivElement>,
  ): CaptureThrowPoint => {
    const rect = focusAreaRef.current?.getBoundingClientRect()
    if (!rect) return { x: event.clientX, y: event.clientY }
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  const formatPoints = (points: CaptureThrowPoint[]) =>
    points
      .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
      .join(' ')

  const getFocusCenter = (): CaptureThrowPoint => {
    const rect = focusAreaRef.current?.getBoundingClientRect()
    return rect ? { x: rect.width / 2, y: rect.height / 2 } : { x: 0, y: 0 }
  }

  const addFocusTrail = (points: CaptureThrowPoint[], success: boolean) => {
    if (points.length < 2) return
    const trail = { id: Date.now() + Math.random(), points, success }
    setFocusTrails((current) => [...current.slice(-5), trail])
    window.setTimeout(() => {
      setFocusTrails((current) =>
        current.filter((entry) => entry.id !== trail.id),
      )
    }, 900)
  }

  const scareDecoy = (index: number) => {
    if (scaredDecoys.has(index)) return
    setScaredDecoys((current) => {
      if (current.has(index)) return current
      const next = new Set(current)
      next.add(index)
      return next
    })
    const timeoutId = window.setTimeout(() => {
      setScared((current) => current + 1)
      scareTimeoutsRef.current = scareTimeoutsRef.current.filter(
        (entry) => entry !== timeoutId,
      )
    }, 150)
    scareTimeoutsRef.current.push(timeoutId)
  }

  const completeFocusCircle = (points: CaptureThrowPoint[]) => {
    lastCompletedCircleAtRef.current = Date.now()
    addFocusTrail(points, true)
    setFocusCircles((current) => Math.min(3, current + 1))
    const lastPoint = points[points.length - 1]
    pathRef.current = lastPoint ? [lastPoint] : []
    setFocusPath(pathRef.current)
    setFocusLoopProgress(0)
  }

  const recordCircleEnd = () => {
    const points = pathRef.current
    pathRef.current = []
    setFocusPath([])
    setFocusLoopProgress(0)
    if (points.length < 12) return

    const center = getFocusCenter()
    const success =
      Date.now() - lastCompletedCircleAtRef.current < 120 ||
      isFocusCircleGesture(points, center) ||
      isFocusCircleProgressComplete(points, center)
    addFocusTrail(points, success)
    if (success) setFocusCircles((current) => Math.min(3, current + 1))
  }

  const startCalmFlick = (
    event: React.PointerEvent<HTMLButtonElement>,
    berryId: string,
  ) => {
    if (completedRef.current) return
    calmDragStartRef.current = { x: event.clientX, y: event.clientY }
    setCalmDrag({ berryId, dx: 0, dy: 0 })
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveCalmFlick = (
    event: React.PointerEvent<HTMLButtonElement>,
    berryId: string,
  ) => {
    const start = calmDragStartRef.current
    if (!start || calmDrag?.berryId !== berryId) return
    setCalmDrag({
      berryId,
      dx: event.clientX - start.x,
      dy: event.clientY - start.y,
    })
  }

  const finishCalmFlick = (berryId: string) => {
    const drag = calmDrag?.berryId === berryId ? calmDrag : null
    calmDragStartRef.current = null
    setCalmDrag(null)

    if (!drag) return

    const upwardDistance = -drag.dy
    const sidewaysDistance = Math.abs(drag.dx)
    if (upwardDistance >= 48 && upwardDistance > sidewaysDistance * 1.15) {
      if (completedRef.current) return
      completedRef.current = true
      setCalmThrownBerryId(berryId)
      window.setTimeout(() => onComplete({ type: 'calm', berryId }), 180)
    }
  }

  if (qte.type === 'calm') {
    return (
      <motion.div
        key={`qte-${qte.id}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 flex h-full w-full max-w-3xl mx-auto flex-col justify-center"
      >
        <SectionDivider
          className="mb-4 min-h-8 [&>div:first-child]:text-base [&>div:first-child]:font-bold [&>div:first-child]:leading-tight [&>div:first-child]:tracking-[0.04em]"
          textColor="text-game-ink"
        >
          Calm with {getItemName(qte.correctBerryId || '')}
        </SectionDivider>
        <div className="relative flex flex-1 items-center justify-center overflow-visible p-5">
          <div className="relative flex items-end justify-center gap-9 sm:gap-14">
            {qte.berryOptions?.map((berryId) => {
              const isDragging = calmDrag?.berryId === berryId
              const isThrown = calmThrownBerryId === berryId
              return (
                <button
                  key={berryId}
                  type="button"
                  aria-label={`Flick ${getItemName(berryId)}`}
                  className="group relative flex h-24 w-20 touch-none cursor-grab items-center justify-center active:cursor-grabbing"
                  onPointerDown={(event) => startCalmFlick(event, berryId)}
                  onPointerMove={(event) => moveCalmFlick(event, berryId)}
                  onPointerUp={() => finishCalmFlick(berryId)}
                  onPointerCancel={() => {
                    calmDragStartRef.current = null
                    setCalmDrag(null)
                  }}
                >
                  <motion.span
                    className="relative block h-16 w-16"
                    animate={{
                      x: isDragging ? calmDrag.dx : 0,
                      y: isThrown ? -180 : isDragging ? calmDrag.dy : 0,
                      opacity:
                        calmThrownBerryId && !isThrown
                          ? 0.35
                          : isThrown
                            ? 0
                            : 1,
                      scale: isDragging || isThrown ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 520, damping: 32 }}
                  >
                    <ItemSprite
                      itemId={berryId}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.28)]"
                    />
                  </motion.span>
                </button>
              )
            })}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      key={`qte-${qte.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.2 }}
      className="relative z-10 flex h-full w-full max-w-3xl mx-auto flex-col justify-center"
    >
      <SectionDivider
        className="mb-4 min-h-8 [&>div:first-child]:text-base [&>div:first-child]:font-bold [&>div:first-child]:leading-tight [&>div:first-child]:tracking-[0.04em]"
        textColor="text-game-ink"
      >
        {qte.type === 'focus'
          ? `Circle the ${pokemonName}`
          : qte.type === 'chase'
            ? `Chase after ${pokemonName}`
            : 'Scare the nearby Pokemon'}
      </SectionDivider>

      {qte.type === 'focus' && (
        <div
          ref={focusAreaRef}
          className="relative flex flex-1 touch-none items-center justify-center overflow-hidden p-5"
          onPointerDown={(event) => {
            const point = getFocusPoint(event)
            pathRef.current = [point]
            setFocusPath([point])
            setFocusLoopProgress(0)
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (pathRef.current.length === 0) return
            const point = getFocusPoint(event)
            pathRef.current = [...pathRef.current, point]
            setFocusPath(pathRef.current)
            const center = getFocusCenter()
            setFocusLoopProgress(
              getFocusCircleProgress(pathRef.current, center),
            )
            if (isFocusCircleProgressComplete(pathRef.current, center)) {
              completeFocusCircle(pathRef.current)
            }
          }}
          onPointerUp={recordCircleEnd}
          onPointerCancel={() => {
            pathRef.current = []
            setFocusPath([])
            setFocusLoopProgress(0)
          }}
        >
          <div className="absolute h-44 w-44 rounded-full border-2 border-dashed border-game-moss/60" />
          <div className="absolute h-28 w-28 rounded-full bg-game-moss/10" />
          <svg
            className="absolute h-48 w-48 -rotate-90"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(103,88,62,0.18)"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#b58a43"
              strokeLinecap="round"
              strokeWidth="5"
              strokeDasharray={`${Math.max(0.01, focusLoopProgress) * 282.7} 282.7`}
            />
          </svg>
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {focusTrails.map((trail) => (
              <polyline
                key={trail.id}
                points={formatPoints(trail.points)}
                fill="none"
                stroke={trail.success ? '#b58a43' : '#5f794f'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity={trail.success ? 0.82 : 0.34}
                strokeWidth={trail.success ? 9 : 6}
                className="animate-[focus-trail-fade_0.9s_ease-out_1]"
              />
            ))}
            {focusPath.length > 1 && (
              <polyline
                points={formatPoints(focusPath)}
                fill="none"
                stroke="#5f794f"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.9"
                strokeWidth="7"
              />
            )}
          </svg>
          <div className="relative h-28 w-28 pointer-events-none">
            <PokemonRaritySprite
              formId={formId}
              view="home"
              rarity={rarity}
              shiny={shiny}
              female={gender === 'female'}
              alt={pokemonName}
              className="h-full w-full"
              imageClassName="drop-shadow-2xl"
            />
          </div>
          <div className="absolute bottom-5 flex gap-2">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={cn(
                  'h-3 w-10 rounded-full border',
                  index < focusCircles
                    ? 'border-game-moss bg-game-moss'
                    : 'border-game-border bg-game-canvas',
                )}
              />
            ))}
          </div>
          <style jsx global>{`
            @keyframes focus-trail-fade {
              0% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {qte.type === 'scare' && (
        <div className="relative flex-1 overflow-hidden p-5">
          {decoys.map((formId, index) => {
            const isScared = scaredDecoys.has(index)

            return (
              <motion.button
                key={`${formId}-${index}`}
                type="button"
                className="absolute h-24 w-24 rounded-full bg-game-surface-raised/55"
                style={{
                  left: `${12 + ((index * 29) % 72)}%`,
                  top: `${15 + ((index * 23) % 68)}%`,
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={
                  isScared
                    ? {
                        scale: [1, 1.18, 0.72],
                        opacity: [1, 1, 0],
                        rotate: [0, -7, 8],
                      }
                    : { scale: 1, opacity: 1, rotate: 0 }
                }
                transition={{ duration: 0.16, ease: 'easeOut' }}
                disabled={isScared}
                onClick={() => {
                  scareDecoy(index)
                }}
              >
                <Image
                  src={getPokemonImageUrl(formId, 'sprite')}
                  alt="Nearby Pokemon"
                  fill
                  className="object-contain pixelated drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]"
                />
                {isScared && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-1 rounded-full border-2 border-game-moss/70"
                    initial={{ scale: 0.65, opacity: 0.9 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      )}

      {qte.type === 'chase' && (
        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-5">
          <motion.div
            className="absolute top-10 h-24 w-24 pointer-events-none"
            animate={{ x: [-72, 72, -72], y: [8, -12, 8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PokemonRaritySprite
              formId={formId}
              view="home"
              rarity={rarity}
              shiny={shiny}
              female={gender === 'female'}
              alt={pokemonName}
              className="h-full w-full"
              imageClassName="drop-shadow-2xl"
            />
          </motion.div>
          <button
            type="button"
            className="game-focus-ring group relative flex h-32 w-32 touch-manipulation select-none flex-col items-center justify-center gap-2 rounded-full border-2 border-game-clay bg-game-clay text-game-cream shadow-md transition active:translate-y-0.5"
            aria-label={`Chase after ${pokemonName}`}
            onClick={() => {
              if (completedRef.current) return
              setChaseTaps((current) =>
                Math.min(qte.tapTarget || 12, current + 1),
              )
            }}
          >
            <Footprints className="h-10 w-10 transition group-active:rotate-12" />
            <span className="px-3 text-center text-xs font-black uppercase leading-tight tracking-wide">
              Chase
            </span>
            <span className="font-mono text-sm font-black text-game-cream">
              {chaseTaps}/{qte.tapTarget || 12}
            </span>
          </button>
          <div className="absolute bottom-6 h-3 w-52 overflow-hidden rounded-full border border-game-border bg-game-canvas">
            <motion.div
              className="h-full rounded-full bg-game-moss"
              animate={{
                width: `${Math.min(100, (chaseTaps / (qte.tapTarget || 12)) * 100)}%`,
              }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}
