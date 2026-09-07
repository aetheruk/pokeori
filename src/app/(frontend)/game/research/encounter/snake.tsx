'use client'

import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { GameTimer } from '@/components/game/shared/game-timer'
import { Button } from '@/components/ui/button'
import type { SnakeGameConfig, SnakePosition } from '@/data/games/snake/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { getSegmentHeading, getSnakeKeyboardHeading, normalizeAngle } from '@/utilities/research/snake'
import { EndlessCollectibleSprite } from './endless-collectibles'
import { SnakeJoystick } from './snake-joystick'

interface SnakeGameProps { encounter: SnakeGameConfig; initialState?: any; actions?: Parameters<typeof useArcadeSession>[2] }

export function SnakeGame({ encounter, initialState, actions }: SnakeGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const visible = usePageVisibility()
  const settings = encounter.settings
  const runtimePlayfield = settings.playfield
  const pressedKeysRef = useRef(new Set<string>())
  const headingRef = useRef(normalizeAngle(settings.initialHeading))
  const targetHeadingRef = useRef(normalizeAngle(settings.initialHeading))
  const session = useArcadeSession('snake', encounter, actions, { inputForTick: (simulation) => {
    const state = simulation.trajectory
    if (!state) return []
    const keyboard = getSnakeKeyboardHeading(pressedKeysRef.current)
    if (keyboard !== null) targetHeadingRef.current = normalizeAngle(keyboard)
    return [{ kind: 'heading', value: targetHeadingRef.current }]
  } })
  const { simulation, countdown, result, timeLeft } = session
  const playing = Boolean(simulation?.status === 'playing' && !countdown && !result)
  const state = simulation?.trajectory
  const snake = state?.snake || []
  const heading = state?.heading ?? settings.initialHeading
  headingRef.current = heading
  const food = state?.food || null
  const score = simulation?.score || 0
  const sceneRewards = (state?.pickups || []).map((pickup) => ({ ...pickup, position: {x: pickup.x, y: pickup.y} }))
  const runtimeObstacles = settings.obstacles || []
  const status = session.countdown ? 'Preparing survey.' : 'Survey in progress.'
  const playAgain = session.replay
  const clearSteering = useCallback(() => {
    pressedKeysRef.current.clear()
    targetHeadingRef.current = normalizeAngle(headingRef.current)
  }, [])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!playing) return
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
        pressedKeysRef.current.add(key)
        const nextHeading = getSnakeKeyboardHeading(pressedKeysRef.current)
        if (nextHeading !== null) targetHeadingRef.current = nextHeading
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
  }, [clearSteering, playing])

  useEffect(() => {
    if (!visible || !playing) clearSteering()
  }, [clearSteering, playing, visible])

  return (
    <div
      className="game-activity-chrome relative h-dvh touch-none overflow-hidden bg-cover bg-center text-game-ink select-none"
      style={{ backgroundImage: `url(${encounter.background})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-game-ink/25" />
      <header className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-start justify-between gap-2 px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised/95 px-3 py-1.5 font-mono text-sm font-bold text-game-ink shadow-md backdrop-blur-sm">
          <output aria-label="Score">Score {score}</output>
          {settings.timeLimit ? <span>{timeLeft}s</span> : null}
        </div>
        <Button type="button" variant="ghost" size="icon"
          className="pointer-events-auto h-10 w-10 rounded-full border border-game-border bg-game-surface-raised/95 text-game-ink shadow-lg backdrop-blur-md hover:bg-game-surface"
          aria-label="Leave game"
          onClick={() => router.push('/game/explore')}>
          <DoorOpen className="size-4" />
        </Button>
      </header>
      <section
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

        {countdown > 0 && !result ? <div className="pointer-events-none absolute inset-0 z-50 grid place-items-center">
          <GameTimer timeLeft={countdown} totalTime={3} size="xl" colorOverride="text-game-moss" />
        </div> : null}
      </section>

      {!result && <div className="absolute inset-x-0 bottom-0 z-40 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <SnakeJoystick disabled={!playing || !visible} onDirection={(angle) => {
          pressedKeysRef.current.clear()
          targetHeadingRef.current = normalizeAngle(angle)
        }} onRelease={clearSteering} />
      </div>}
      <p id="snake-controls" className="sr-only">
        Drag the joystick around its centre to steer clockwise or counterclockwise.
        Release to continue straight. Arrow keys or WASD aim in screen directions.
        Eat cave stones and avoid the walls and your own tail.
      </p>
      <p id="snake-status" className="sr-only" aria-live="polite">
        {!visible && playing ? 'Survey paused.' : status}
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
