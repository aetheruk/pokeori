'use client'

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Footprints,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoPosition,
} from '@/data/games/rock-tunnel-echo-map'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { completeResearchEncounter, startResearchEncounter } from '../actions'

interface RockTunnelEchoMapGameProps {
  encounter: RockTunnelEchoMapGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
}

type Direction = 'up' | 'down' | 'left' | 'right'
type IntroPhase = 'partner' | 'flash' | 'reveal' | 'ready'

const directionDeltas: Record<Direction, RockTunnelEchoPosition> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function positionKey(position: RockTunnelEchoPosition) {
  return `${position.x},${position.y}`
}

function samePosition(a: RockTunnelEchoPosition, b: RockTunnelEchoPosition) {
  return a.x === b.x && a.y === b.y
}

export function RockTunnelEchoMapGame({
  encounter,
  initialState,
}: RockTunnelEchoMapGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { gameData, refreshUser } = useUser()
  const router = useRouter()
  const { cols, rows } = encounter.settings.gridSize
  const timeLimit = encounter.settings.timeLimit || 80
  const maxMoves = encounter.settings.maxMoves
  const revealDurationMs = encounter.settings.revealDurationMs || 1400
  const themeColour = encounter.settings.themeColour || '#818cf8'
  const floorSprite =
    encounter.settings.floorSprite || '/games/rockpush/floor.avif'
  const barrierSprite =
    encounter.settings.barrierSprite || '/games/rockpush/barrier.avif'
  const holeSprite =
    encounter.settings.holeSprite || '/games/rockpush/hole.avif'
  const winTileSprite =
    encounter.settings.winTileSprite || '/games/rockpush/win-tile.png'
  const playerSprite =
    encounter.settings.playerSprite || '/games/rockpush/trainer.avif'
  const wallKeys = useMemo(
    () => new Set(encounter.settings.walls.map(positionKey)),
    [encounter.settings.walls],
  )
  const holeKeys = useMemo(
    () => new Set((encounter.settings.holes || []).map(positionKey)),
    [encounter.settings.holes],
  )

  const [player, setPlayer] = useState<RockTunnelEchoPosition>(
    encounter.settings.playerStart,
  )
  const [facing, setFacing] = useState<Direction>('down')
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [revealActive, setRevealActive] = useState(false)
  const [introPhase, setIntroPhase] = useState<IntroPhase>('partner')
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const completionRef = useRef(false)
  const partnerPokemon = useMemo(
    () =>
      ((gameData as any)?.pokemon || []).find(
        (pokemon: any) =>
          pokemon.isCompanion === true || pokemon.partner === true,
      ),
    [gameData],
  )
  const partnerFormId =
    partnerPokemon?.formId ||
    (partnerPokemon?.speciesId ? String(partnerPokemon.speciesId) : '25')
  const partnerSprite = getPokemonImageUrl(
    partnerFormId,
    'home',
    !!partnerPokemon?.shiny,
    (partnerPokemon as any)?.gender,
  )
  const partnerName = partnerPokemon?.name || 'Pikachu'
  const movementEnabled = gameStarted && !gameEnded && introPhase === 'ready'
  const introBlocksMap = introPhase === 'partner' || introPhase === 'flash'
  const introText =
    introPhase === 'partner'
      ? `${partnerName} used Flash!`
      : introPhase === 'flash'
        ? ''
        : introPhase === 'reveal'
          ? 'Remember the route.'
          : ''

  const completeGame = useCallback(
    async (success: boolean, message: string) => {
      if (completionRef.current) return
      completionRef.current = true
      setGameEnded(true)

      const completion = await completeResearchEncounter(encounter.id, success)
      const finalSuccess = success && completion.success
      setResult({
        success: finalSuccess,
        message: finalSuccess ? 'Exit found.' : message,
        rewards: completion.summary,
      })
      playSfx(finalSuccess ? 'good' : 'bad')
    },
    [encounter.id, playSfx],
  )

  const initGame = useCallback(async () => {
    const start = await startResearchEncounter(encounter.id)
    if (!start.success) {
      setResult({
        success: false,
        message: start.error || 'Could not start Echo Map.',
      })
      return
    }

    completionRef.current = false
    setPlayer(encounter.settings.playerStart)
    setFacing('down')
    setMoves(0)
    setRevealActive(false)
    setIntroPhase('partner')
    setGameStarted(true)
    setGameEnded(false)
    setResult(null)
    setTimeLeft(
      start.restored && start.expiry
        ? Math.max(0, Math.floor((start.expiry - Date.now()) / 1000))
        : timeLimit,
    )
  }, [encounter.id, encounter.settings.playerStart, timeLimit])

  useEffect(() => {
    if (!gameStarted) {
      void initGame()
    }
  }, [gameStarted, initGame])

  useEffect(() => {
    if (!movementEnabled || timeLeft <= 0) return

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          void completeGame(false, 'The echoes faded.')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [completeGame, movementEnabled, timeLeft])

  useEffect(() => {
    if (!gameStarted || gameEnded) return

    setRevealActive(false)
    setIntroPhase('partner')

    const flashTimeout = window.setTimeout(() => {
      setIntroPhase('flash')
      playSfx('good')
    }, 700)
    const revealTimeout = window.setTimeout(() => {
      setIntroPhase('reveal')
      setRevealActive(true)
    }, 950)
    const readyTimeout = window.setTimeout(() => {
      setRevealActive(false)
      setIntroPhase('ready')
    }, 950 + revealDurationMs)

    return () => {
      window.clearTimeout(flashTimeout)
      window.clearTimeout(revealTimeout)
      window.clearTimeout(readyTimeout)
    }
  }, [gameEnded, gameStarted, playSfx, revealDurationMs])

  const movePlayer = useCallback(
    (direction: Direction) => {
      if (!movementEnabled) return

      setFacing(direction)
      const delta = directionDeltas[direction]
      const next = { x: player.x + delta.x, y: player.y + delta.y }
      const nextKey = positionKey(next)

      if (
        next.x < 0 ||
        next.x >= cols ||
        next.y < 0 ||
        next.y >= rows ||
        wallKeys.has(nextKey)
      ) {
        playSfx('bad')
        return
      }

      const nextMoves = moves + 1
      setPlayer(next)
      setMoves(nextMoves)

      if (holeKeys.has(nextKey)) {
        void completeGame(false, 'I stepped into a hidden hole.')
        return
      }

      playSfx('select')

      if (samePosition(next, encounter.settings.exit)) {
        void completeGame(true, 'Exit found.')
        return
      }

      if (maxMoves && nextMoves >= maxMoves) {
        void completeGame(false, 'I lost the route through the dark.')
      }
    },
    [
      cols,
      completeGame,
      encounter.settings.exit,
      gameEnded,
      gameStarted,
      holeKeys,
      maxMoves,
      moves,
      movementEnabled,
      playSfx,
      player,
      rows,
      wallKeys,
    ],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
        event.preventDefault()
        movePlayer('up')
      } else if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
        event.preventDefault()
        movePlayer('down')
      } else if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault()
        movePlayer('left')
      } else if (
        event.key === 'ArrowRight' ||
        event.key.toLowerCase() === 'd'
      ) {
        event.preventDefault()
        movePlayer('right')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePlayer])

  const cells = Array.from({ length: rows * cols }, (_, index) => ({
    x: index % cols,
    y: Math.floor(index / cols),
  }))

  return (
    <div className="relative min-h-dvh overflow-hidden game-night bg-game-night-canvas text-game-night-ink">
      <div className="absolute inset-0">
        <Image
          src={
            encounter.settings.background ||
            encounter.background ||
            '/backgrounds/cave.avif'
          }
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-[#081014]/80" />
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col">
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 flex -translate-x-1/2 flex-row gap-3">
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm transition-colors',
              maxMoves && moves >= maxMoves * 0.9
                ? 'border-game-danger/60 bg-game-danger/20'
                : '',
            )}
            role="status"
            aria-live="polite"
          >
            <Footprints
              className={cn(
                'h-3 w-3',
                maxMoves && moves > maxMoves * 0.9
                  ? 'text-game-cream'
                  : 'text-game-moss',
              )}
            />
            <span>
              {moves}
              {maxMoves && (
                <span className="text-game-muted"> / {maxMoves}</span>
              )}
            </span>
          </div>
        </div>

        <div className="absolute right-4 top-4 z-50">
          <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 pb-6">
          <div
            className="grid max-w-[92vw] overflow-hidden rounded-lg bg-[#0d1820] shadow-2xl ring-4 ring-[#081014]/40"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              width: 'min(90vw, 500px)',
              aspectRatio: `${cols} / ${rows}`,
              gap: 0,
            }}
          >
            {cells.map((cell) => {
              const key = positionKey(cell)
              const wall = wallKeys.has(key)
              const hole = holeKeys.has(key)
              const playerHere = samePosition(player, cell)
              const exitHere = samePosition(encounter.settings.exit, cell)
              const visible = !introBlocksMap && (revealActive || playerHere)

              return (
                <div
                  key={key}
                  className={cn(
                    'relative h-full w-full overflow-hidden [image-rendering:pixelated] bg-[length:100%_100%] transition duration-300',
                    visible ? 'opacity-100' : 'opacity-95',
                    wall &&
                      visible &&
                      'shadow-[inset_0_-6px_10px_rgba(0,0,0,0.35)]',
                    playerHere && 'ring-2 ring-sky-200/80 ring-inset',
                  )}
                  style={{
                    backgroundImage: `url('${visible && wall ? barrierSprite : floorSprite}')`,
                    boxShadow: revealActive
                      ? `0 0 14px color-mix(in srgb, ${themeColour} 30%, transparent)`
                      : undefined,
                  }}
                >
                  {!visible && (
                    <div className="absolute inset-0 z-30 bg-[#081014]/95" />
                  )}

                  {exitHere && visible && (
                    <div className="absolute inset-[12%] z-10">
                      <Image
                        src={winTileSprite}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain [image-rendering:pixelated]"
                      />
                    </div>
                  )}

                  {hole && visible && (
                    <div className="absolute inset-[12%] z-20">
                      <Image
                        src={holeSprite}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain [image-rendering:pixelated]"
                      />
                    </div>
                  )}

                  {playerHere && (
                    <div className="absolute inset-0 z-40 p-0.5">
                      <div className="absolute inset-[20%] translate-y-[18%] rounded-full bg-[#081014]/30 blur-[3px]" />
                      <div
                        className="relative h-full w-full [image-rendering:pixelated]"
                        style={{
                          backgroundImage: `url('${playerSprite}')`,
                          backgroundSize: '200% 200%',
                          backgroundPosition:
                            facing === 'down'
                              ? '0% 0%'
                              : facing === 'up'
                                ? '0% 100%'
                                : facing === 'left'
                                  ? '100% 100%'
                                  : '100% 0%',
                        }}
                      />
                    </div>
                  )}

                  {visible && !playerHere && (
                    <div
                      className={cn(
                        'pointer-events-none absolute inset-0 z-20 transition-opacity',
                        revealActive ? 'bg-indigo-300/5' : 'bg-[#081014]/18',
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex-none max-w-[200px] w-full z-40 mb-8">
            <div className="grid grid-cols-3 gap-2 mx-auto">
              <div />
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('up')}
                disabled={!movementEnabled}
                aria-label="Move up"
              >
                <ArrowUp />
              </Button>
              <div />
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('left')}
                disabled={!movementEnabled}
                aria-label="Move left"
              >
                <ArrowLeft />
              </Button>
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('down')}
                disabled={!movementEnabled}
                aria-label="Move down"
              >
                <ArrowDown />
              </Button>
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('right')}
                disabled={!movementEnabled}
                aria-label="Move right"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {introPhase !== 'ready' && !result && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#081014] transition-opacity duration-300',
            introPhase === 'reveal' ? 'opacity-0' : 'opacity-100',
          )}
        >
          {introPhase === 'partner' && (
            <div className="relative h-48 w-48 animate-in fade-in zoom-in-95 duration-500">
              <div className="absolute inset-[18%] rounded-full bg-indigo-300/15 blur-xl" />
              <Image
                src={partnerSprite}
                alt={partnerName}
                fill
                sizes="192px"
                className="object-contain drop-shadow-[0_0_28px_rgba(199,210,254,0.55)] [image-rendering:pixelated]"
                priority
              />
            </div>
          )}
          {introText && (
            <div
              className="mt-6 rounded-full border border-[#f7ecd6]/15 bg-[#f7ecd6]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f7ecd6]"
              role="status"
              aria-live="polite"
            >
              {introText}
            </div>
          )}
        </div>
      )}

      {introPhase === 'flash' && !result && (
        <div className="pointer-events-none absolute inset-0 z-50 animate-[echo-map-flash_450ms_ease-out_forwards] bg-white" />
      )}

      <style jsx>{`
        @keyframes echo-map-flash {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>

      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser()
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Fail'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  const replay = await startResearchEncounter(
                    encounter.id,
                    true,
                  )
                  if (replay.success) window.location.reload()
                  else router.push('/game/explore')
                }}
                className="w-full"
              >
                Play Again
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  )
}
