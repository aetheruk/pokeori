'use client'

import { DoorOpen, Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import type { BrickBreakerGameConfig } from '@/data/games/brick-breaker/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { EndlessCollectibleSprite } from './endless-collectibles'

interface BrickBreakerGameProps { encounter: BrickBreakerGameConfig; initialState?: any }

export function BrickBreakerGame({ encounter, initialState }: BrickBreakerGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const settings = encounter.settings
  const { width, height } = settings.playfield
  const paddleY = height - 48
  const stageRef = useRef<HTMLDivElement>(null)
  const keysRef = useRef(new Set<string>())
  const session = useArcadeSession('brick-breaker', encounter, undefined, { inputForTick: () => {
    const left = keysRef.current.has('ArrowLeft') || keysRef.current.has('a')
    const right = keysRef.current.has('ArrowRight') || keysRef.current.has('d')
    return left !== right ? [{ kind: 'paddle', value: left ? 0 : 1 }] : []
  } })
  const { simulation, countdown, result, timeLeft } = session
  const state = simulation?.trajectory
  const score = simulation?.score || 0
  const lives = state?.lives ?? settings.lives
  const wave = state?.wave || 1
  const paddleX = state?.paddleX ?? (width - settings.paddle.width) / 2
  const paddleRef = useRef(paddleX)
  paddleRef.current = paddleX
  const ball = state?.ball || null
  const bricks = state?.bricks || []
  const docked = state?.docked ?? true
  const specimens = state?.pickups || []
  const ended = Boolean(simulation && simulation.status !== 'playing')
  const error: string | null = null
  const launch = () => session.sendInput('launch')
  const replay = session.replay
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button, [role="dialog"]')) return
      if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) { event.preventDefault(); keysRef.current.add(event.key) }
      if (event.code === 'Space' && !event.repeat) { event.preventDefault(); session.sendInput('launch') }
    }
    const keyup = (event: KeyboardEvent) => {
      if (!keysRef.current.delete(event.key)) return
      session.sendInput('paddle', paddleRef.current / (width - settings.paddle.width))
    }
    const blur = () => keysRef.current.clear()
    window.addEventListener('keydown', keydown)
    window.addEventListener('keyup', keyup)
    window.addEventListener('blur', blur)
    return () => { window.removeEventListener('keydown', keydown); window.removeEventListener('keyup', keyup); window.removeEventListener('blur', blur) }
  }, [session.sendInput, settings.paddle.width, width])
  const movePaddleToPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const designX = (event.clientX - bounds.left) / bounds.width * width
    session.sendInput('paddle', Math.max(0, Math.min(1, (designX - settings.paddle.width / 2) / (width - settings.paddle.width))))
  }

  return (
    <main className="relative h-dvh min-h-0 w-full overflow-hidden bg-[#18211e] text-[#fff8e8]">
      <Image
        src={encounter.background || '/backgrounds/cave.avif'}
        alt="A dim geological survey cave"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#18211e]/28" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2 rounded-lg border border-game-border/80 bg-game-surface-raised/95 px-3 py-2 text-sm font-bold text-game-ink shadow-md backdrop-blur-sm">
          <span className="font-mono tabular-nums">Score {score}</span>
          <span aria-hidden className="h-4 w-px bg-game-border" />
          <span className="flex items-center gap-1">
            <span className="sr-only">{lives} survey balls remaining</span>
            {Array.from({ length: lives }, (_, index) => (
              <Heart
                key={index}
                className="size-4 fill-game-clay text-game-clay"
              />
            ))}
          </span>
          <span aria-hidden className="h-4 w-px bg-game-border" />
          {settings.timeLimit ? (
            <span className="font-mono tabular-nums">{timeLeft}s</span>
          ) : (
            <span>Wave {wave}</span>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto bg-game-surface-raised/95 text-game-ink shadow-md backdrop-blur-sm"
          aria-label="Leave game"
          disabled={!simulation || ended || Boolean(result)}
          onClick={() => void session.abandon()}
        >
          <DoorOpen className="size-5" />
        </Button>
      </header>

      <div
        ref={stageRef}
        role="application"
        aria-label="Brick Breaker. Drag or use Left and Right to move. Tap or press Space to launch."
        className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 touch-none overflow-hidden select-none"
        style={{
          aspectRatio: `${width} / ${height}`,
          maxWidth: `${(width / height) * 100}dvh`,
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          movePaddleToPointer(event)
          launch()
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            movePaddleToPointer(event)
        }}
      >
        {bricks.map((brick) => {
          const [row, column] = brick.id.split(':').map(Number)
          const pokemonId =
            settings.brickPokemonIds[
              (row * settings.layout[0].length + column) %
                settings.brickPokemonIds.length
            ]
          const crystalColor =
            brick.durability >= 3
              ? '#b56342'
              : brick.durability === 2
                ? '#9a7643'
                : '#6f8c5e'
          return (
            <div
              key={brick.id}
              aria-hidden
              className="absolute flex items-center justify-center rounded-lg"
              style={{
                left: `${(brick.x / width) * 100}%`,
                top: `${(brick.y / height) * 100}%`,
                width: `${(brick.width / width) * 100}%`,
                aspectRatio: '1 / 1',
                background: brick.indestructible
                  ? 'linear-gradient(135deg, #a29b8c 0%, #5c625d 35%, #343b38 72%, #222926 100%)'
                  : `linear-gradient(135deg,
                      color-mix(in srgb, ${crystalColor} 70%, white) 0%,
                      ${crystalColor} 30%,
                      color-mix(in srgb, ${crystalColor} 60%, black) 70%,
                      color-mix(in srgb, ${crystalColor} 40%, black) 100%)`,
                boxShadow:
                  'inset 2px 2px 4px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)',
                border: brick.indestructible
                  ? '1px solid #8a857b'
                  : `1px solid color-mix(in srgb, ${crystalColor} 80%, white)`,
              }}
            >
              {!brick.indestructible && (
                <Image
                  src={getPokemonImageUrl(pokemonId, 'sprite')}
                  alt=""
                  width={64}
                  height={64}
                  className="pixelated relative z-10 h-[78%] w-[78%] object-contain opacity-90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.45)]"
                />
              )}
              <span className="absolute left-[14%] top-[10%] h-[10%] w-[42%] -rotate-12 rounded-full bg-white/35" />
            </div>
          )
        })}
        {specimens.map((specimen) => (
          <div
            key={specimen.id}
            className="absolute flex items-center justify-center rounded-full border border-game-ochre/70 bg-game-ochre/20 shadow-[0_0_18px_rgba(181,138,67,0.55)]"
            style={{
              left: `${((specimen.x - specimen.size / 2) / width) * 100}%`,
              top: `${((specimen.y - specimen.size / 2) / height) * 100}%`,
              width: `${(specimen.size / width) * 100}%`,
              aspectRatio: '1',
            }}
          >
            <span className="absolute inset-1 rounded-full border border-amber-200/35 motion-safe:animate-ping" />
            <span className="relative z-10 h-[76%] w-[76%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
              <EndlessCollectibleSprite
                reward={specimen.reward}
                size={Math.round(specimen.size * 0.76)}
              />
            </span>
          </div>
        ))}
        <div
          aria-hidden
          className="absolute overflow-hidden rounded-full border-2 border-[#202826] bg-white shadow-[0_3px_6px_rgba(13,20,18,0.55)]"
          style={{
            left: `${(paddleX / width) * 100}%`,
            top: `${(paddleY / height) * 100}%`,
            width: `${(settings.paddle.width / width) * 100}%`,
            height: `${(settings.paddle.height / height) * 100}%`,
          }}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 bg-[#c84d43]" />
          <span className="absolute inset-x-0 top-1/2 h-[18%] -translate-y-1/2 bg-[#202826]" />
          <span className="absolute left-1/2 top-1/2 aspect-square h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#202826] bg-white" />
        </div>
        {ball && (
          <div
            className="absolute rounded-full border border-[#f8e7b4] bg-[#f4d276] shadow-[0_0_8px_rgba(244,210,118,0.8)]"
            style={{
              left: `${((ball.x - ball.radius) / width) * 100}%`,
              top: `${((ball.y - ball.radius) / height) * 100}%`,
              width: `${((ball.radius * 2) / width) * 100}%`,
              aspectRatio: '1',
            }}
          />
        )}

        {countdown > 0 && (
          <div
            className="absolute inset-0 grid place-items-center bg-game-ink/25 backdrop-blur-[1px]"
            aria-live="polite"
          >
            <GameTimer timeLeft={countdown} totalTime={3} size="xl" />
          </div>
        )}
        {!ended && countdown === 0 && docked && (
          <button
            type="button"
            onClick={launch}
            className="absolute bottom-[20%] left-1/2 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-lg border border-game-border bg-game-surface-raised/95 px-4 py-2 font-bold text-game-ink shadow-md backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-game-clay"
          >
            Tap or Space to launch
          </button>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-lg border border-red-700/30 bg-red-50 p-3 text-sm text-red-800 shadow-md"
        >
          {error}
        </p>
      )}

      {result && (
        <RewardResultOverlay
          result={result}
          onClose={session.close}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Survey complete' : 'Survey ended'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button size="lg" onClick={() => void replay()}>
                Try again
              </Button>
            ) : undefined
          }
        />
      )}
    </main>
  )
}
