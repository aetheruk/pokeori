'use client'

import { DoorOpen, RotateCcw, RotateCw } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import type { SnakeGameConfig, SnakePosition } from '@/data/games/snake/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { getSegmentHeading, getSnakeKeyboardHeading, getSnakePointerHeading, normalizeAngle } from '@/utilities/research/snake'
import { EndlessCollectibleSprite } from './endless-collectibles'

interface SnakeGameProps { encounter: SnakeGameConfig; initialState?: any }
type GamePhase = 'loading' | 'ready' | 'playing' | 'ended'

export function SnakeGame({ encounter, initialState }: SnakeGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const visible = usePageVisibility()
  const settings = encounter.settings
  const stageRef = useRef<HTMLElement>(null)
  const runtimePlayfield = settings.playfield
  const runtimePlayfieldRef = useRef(settings.playfield)
  const [phase, setPhase] = useState<GamePhase>('ready')
  const pressedKeysRef = useRef(new Set<string>())
  const touchTurnsRef = useRef(new Map<number, number>())
  const pointerTargetRef = useRef<SnakePosition | null>(null)
  const headingRef = useRef(settings.initialHeading)
  const targetHeadingRef = useRef(settings.initialHeading)
  const snakeRef = useRef<SnakePosition[]>([])
  const session = useArcadeSession('snake', encounter, undefined, { paused: phase !== 'playing', inputForTick: (simulation) => {
    const state = simulation.trajectory
    if (!state) return []
    const turn = Math.sign([...touchTurnsRef.current.values()].reduce((sum, value) => sum + value, 0))
    const keyboard = getSnakeKeyboardHeading(pressedKeysRef.current)
    if (turn) targetHeadingRef.current = normalizeAngle(state.heading + turn * settings.turnRate / 60)
    else if (keyboard !== null) targetHeadingRef.current = keyboard
    else if (pointerTargetRef.current) targetHeadingRef.current = getSnakePointerHeading(state.snake[0], pointerTargetRef.current, settings.headRadius * 2.75) ?? state.heading
    return [{ kind: 'heading', value: targetHeadingRef.current }]
  } })
  const { simulation, result, timeLeft } = session
  const state = simulation?.trajectory
  const snake = state?.snake || []
  const heading = state?.heading ?? settings.initialHeading
  headingRef.current = heading
  snakeRef.current = snake
  const food = state?.food || null
  const score = simulation?.score || 0
  const sceneRewards = (state?.pickups || []).map((pickup) => ({ ...pickup, position: {x: pickup.x, y: pickup.y} }))
  const runtimeObstacles = settings.obstacles || []
  const startError: string | null = null
  const status = session.saving ? 'Saving survey progress.' : session.countdown ? 'Preparing survey.' : 'Survey in progress.'
  const playAgain = session.replay
  const clearSteering = useCallback(() => {
    pressedKeysRef.current.clear()
    touchTurnsRef.current.clear()
    pointerTargetRef.current = null
    targetHeadingRef.current = headingRef.current
  }, [])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (phase !== 'ready' && phase !== 'playing') return
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          'input, textarea, select, [contenteditable="true"]',
        )
      )
        return
      const key = event.key.toLowerCase()
      if (
        [
          'arrowleft',
          'arrowright',
          'arrowup',
          'arrowdown',
          'w',
          'a',
          's',
          'd',
        ].includes(key)
      ) {
        event.preventDefault()
        pointerTargetRef.current = null
        touchTurnsRef.current.clear()
        pressedKeysRef.current.add(key)
        const nextHeading = getSnakeKeyboardHeading(pressedKeysRef.current)
        if (nextHeading !== null) targetHeadingRef.current = nextHeading
      }
      if (
        event.code === 'Space' &&
        phase === 'ready' &&
        !(event.target instanceof HTMLElement && event.target.closest('button'))
      ) {
        event.preventDefault()
        setPhase('playing')
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeysRef.current.delete(event.key.toLowerCase())
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearSteering)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearSteering)
    }
  }, [clearSteering, phase])

  useEffect(() => {
    if (!visible || phase !== 'playing') clearSteering()
  }, [clearSteering, phase, visible])

  const steerTowardPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (phase !== 'playing') return
    if (event.pointerType !== 'mouse' && event.buttons === 0) return
    if (touchTurnsRef.current.size > 0 || pressedKeysRef.current.size > 0)
      return
    const bounds = stageRef.current?.getBoundingClientRect()
    if (!bounds) return
    const target = {
      x:
        ((event.clientX - bounds.left) / bounds.width) *
        runtimePlayfieldRef.current.width,
      y:
        ((event.clientY - bounds.top) / bounds.height) *
        runtimePlayfieldRef.current.height,
    }
    const targetHeading = getSnakePointerHeading(
      snakeRef.current[0],
      target,
      settings.headRadius * 2.75,
    )
    if (targetHeading === null) {
      pointerTargetRef.current = null
      targetHeadingRef.current = headingRef.current
      return
    }
    pointerTargetRef.current = target
    targetHeadingRef.current = targetHeading
  }

  const clearPointerSteering = (event: React.PointerEvent<HTMLElement>) => {
    pointerTargetRef.current = null
    targetHeadingRef.current = headingRef.current
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div
      className="game-activity-chrome relative h-dvh touch-none overflow-hidden bg-cover bg-center text-game-ink select-none"
      style={{ backgroundImage: `url(${encounter.background})` }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        event.currentTarget.setPointerCapture(event.pointerId)
        steerTowardPointer(event)
      }}
      onPointerMove={(event) => {
        if ((event.target as HTMLElement).closest('button')) return
        steerTowardPointer(event)
      }}
      onPointerUp={clearPointerSteering}
      onPointerCancel={clearPointerSteering}
      onPointerLeave={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          clearPointerSteering(event)
        }
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-game-ink/25" />
      <header className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-start justify-end gap-2 p-3 sm:p-5">
        <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised/95 px-3 py-2 font-mono text-sm font-bold text-game-ink shadow-md backdrop-blur-sm">
          <output>{score} pts</output>
          {settings.timeLimit ? (
            <>
              <span aria-hidden className="h-4 w-px bg-game-line/50" />
              <span>{timeLeft}s</span>
            </>
          ) : null}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto border-game-border bg-game-surface-raised/95 text-game-ink shadow-md backdrop-blur-sm"
          aria-label="Leave game"
          onClick={() => router.push('/game/explore')}
        >
          <DoorOpen className="size-5" />
        </Button>
      </header>
      <section
        ref={stageRef}
        aria-label="Onix tunnel survey playfield"
        aria-describedby="snake-controls snake-status"
        className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 touch-none overflow-hidden"
        style={{ aspectRatio: `${runtimePlayfield.width} / ${runtimePlayfield.height}`, maxWidth: `${runtimePlayfield.width / runtimePlayfield.height * 100}dvh` }}
      >
        {runtimeObstacles.map((obstacle, index) => (
          <div
            key={`${obstacle.x}:${obstacle.y}:${index}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-game-line/30 bg-game-ink/75 shadow-lg"
            style={sceneCircleStyle(
              obstacle,
              obstacle.radius * 2,
              runtimePlayfield,
            )}
          />
        ))}

        {food ? (
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={sceneCircleStyle(
              food,
              settings.foodRadius * 2,
              runtimePlayfield,
            )}
          >
            <Image
              src={settings.sprites.food}
              alt="Cave stone"
              fill
              sizes="48px"
              className="object-contain drop-shadow-md"
            />
          </div>
        ) : null}

        {sceneRewards.map((reward) => (
          <div
            key={reward.id}
            className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-game-ochre/70 bg-game-ochre/20 shadow-[0_0_14px_rgba(181,138,67,0.48)]"
            style={sceneCircleStyle(
              reward.position,
              settings.rewardRadius * 2,
              runtimePlayfield,
            )}
          >
            <span className="pointer-events-none absolute inset-[10%] rounded-full border border-amber-200/35 motion-safe:animate-ping" />
            <span className="relative z-10 h-[72%] w-[72%]">
              <EndlessCollectibleSprite reward={reward.reward} size={50} />
            </span>
          </div>
        ))}

        {[...snake].reverse().map((segment, reverseIndex) => {
          const index = snake.length - 1 - reverseIndex
          const kind =
            index === 0 ? 'head' : index === snake.length - 1 ? 'tail' : 'body'
          const segmentHeading =
            kind === 'head'
              ? heading
              : getSegmentHeading(segment, snake[index - 1])
          const radius =
            kind === 'head' ? settings.headRadius : settings.bodyRadius
          return (
            <SnakeSegment
              key={index}
              src={settings.sprites[kind]}
              kind={kind}
              position={segment}
              heading={segmentHeading}
              radius={radius}
              playfield={runtimePlayfield}
            />
          )
        })}

        {phase === 'loading' || phase === 'ready' ? (
          <div className="absolute inset-0 z-50 grid place-items-center bg-game-ink/45 p-6 text-center">
            {phase === 'ready' ? (
              <div className="max-w-xs space-y-4 rounded-xl border border-game-border bg-game-surface-raised p-5 text-game-ink shadow-lg">
                <h2 className="text-lg font-bold">Onix tunnel survey</h2>
                <p id="snake-controls" className="text-sm">
                  Aim with the pointer or drag. Arrow keys / WASD steer in any
                  direction. Hold the turn buttons to curve left or right.
                </p>
                <p className="text-sm text-game-muted">
                  Eat cave stones to grow. Avoid the walls and your own tail.
                </p>
                <Button
                  className="pointer-events-auto min-h-11 w-full"
                  onClick={() => setPhase('playing')}
                >
                  Start survey
                </Button>
                <p className="text-xs text-game-muted">Or press Space</p>
              </div>
            ) : (
              <p className="rounded-lg border border-game-border bg-game-surface-raised px-3 py-2 text-sm font-bold text-game-ink shadow-md">
                {startError || 'Preparing…'}
              </p>
            )}
          </div>
        ) : null}
      </section>

      {phase === 'playing' ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-between gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {([-1, 1] as const).map((turn) => (
            <Button
              key={turn}
              variant="outline"
              className="pointer-events-auto min-h-14 min-w-20 touch-none border-game-border bg-game-surface-raised/95 text-game-ink shadow-md active:bg-game-moss active:text-game-surface-raised"
              aria-label={turn === -1 ? 'Curve left' : 'Curve right'}
              onPointerDown={(event) => {
                event.stopPropagation()
                event.preventDefault()
                event.currentTarget.setPointerCapture(event.pointerId)
                pressedKeysRef.current.clear()
                pointerTargetRef.current = null
                touchTurnsRef.current.set(event.pointerId, turn)
              }}
              onPointerUp={(event) => {
                event.stopPropagation()
                touchTurnsRef.current.delete(event.pointerId)
                targetHeadingRef.current = headingRef.current
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId)
                }
              }}
              onPointerCancel={(event) => {
                touchTurnsRef.current.delete(event.pointerId)
                targetHeadingRef.current = headingRef.current
              }}
              onLostPointerCapture={(event) => {
                touchTurnsRef.current.delete(event.pointerId)
                targetHeadingRef.current = headingRef.current
              }}
              onClick={(event) => {
                if (event.detail === 0) {
                  pointerTargetRef.current = null
                  targetHeadingRef.current = normalizeAngle(
                    headingRef.current + turn * 45,
                  )
                }
              }}
            >
              {turn === -1 ? (
                <RotateCcw className="size-6" />
              ) : (
                <RotateCw className="size-6" />
              )}
              <span>{turn === -1 ? 'Left' : 'Right'}</span>
            </Button>
          ))}
        </div>
      ) : null}
      {phase !== 'ready' ? (
        <p id="snake-controls" className="sr-only">
          Move the pointer or drag to steer. Arrow keys or WASD aim in any
          direction. Hold the turn buttons to curve left or right.
        </p>
      ) : null}
      <p id="snake-status" className="sr-only" aria-live="polite">
        {!visible && phase === 'playing' ? 'Survey paused.' : status}
      </p>

      {result ? (
        <RewardResultOverlay
          result={result}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Survey complete' : 'Survey ended'}
          onClose={session.close}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button
                size="lg"
                className="w-full"
                onClick={() => void playAgain()}
              >
                Play again
              </Button>
            ) : undefined
          }
        />
      ) : null}
    </div>
  )
}

function sceneCircleStyle(
  position: SnakePosition,
  diameter: number,
  playfield: { width: number; height: number },
) {
  return {
    left: `${(position.x / playfield.width) * 100}%`,
    top: `${(position.y / playfield.height) * 100}%`,
    width: `${(diameter / playfield.width) * 100}%`,
    aspectRatio: '1',
  }
}

function SnakeSegment({
  src,
  kind,
  position,
  heading,
  radius,
  playfield,
}: {
  src: string
  kind: 'head' | 'body' | 'tail'
  position: SnakePosition
  heading: number
  radius: number
  playfield: { width: number; height: number }
}) {
  const [imageAvailable, setImageAvailable] = useState(true)
  // The supplied head faces left; its face sits below the horn. The tail's
  // attachment is the large right-hand rock, with its tip extending backwards.
  const onixArt = src.startsWith('/games/snake/sprites/onix-')
  const width = radius * (onixArt && kind === 'tail' ? 4.2 : 2)
  const aspectRatio = onixArt
    ? kind === 'head'
      ? '107 / 158'
      : kind === 'tail'
        ? '81 / 34'
        : '55 / 49'
    : '1'
  const anchorX = onixArt && kind === 'tail' ? '82%' : '50%'
  const anchorY = onixArt && kind === 'head' ? '72%' : '50%'
  const rotation =
    heading +
    ((!onixArt && kind === 'tail') || (onixArt && kind === 'head') ? 180 : 0)
  return (
    <div
      className="pointer-events-none absolute z-30"
      style={{
        ...sceneCircleStyle(position, width, playfield),
        aspectRatio,
        transformOrigin: `${anchorX} ${anchorY}`,
        transform: `translate(-${anchorX}, -${anchorY}) rotate(${rotation}deg)`,
      }}
    >
      {imageAvailable ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="80px"
          draggable={false}
          className="object-contain drop-shadow-md"
          onError={() => setImageAvailable(false)}
        />
      ) : kind === 'head' ? (
        <Image
          src="/sprites/pokemon/home/normal/95.avif"
          alt=""
          fill
          sizes="80px"
          draggable={false}
          className="object-contain drop-shadow-md"
        />
      ) : (
        <div
          className={`absolute border-2 border-[#bfc3b4] bg-[#777d73] shadow-inner ${kind === 'tail' ? 'inset-[24%] rotate-45 rounded-sm' : 'inset-[10%] rounded-full'}`}
        />
      )}
    </div>
  )
}
