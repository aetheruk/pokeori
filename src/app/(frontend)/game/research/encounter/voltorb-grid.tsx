'use client'

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleDot,
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
  VoltorbGridGameConfig,
  VoltorbGridPosition,
  VoltorbGridProtectedPokemon,
  VoltorbGridVoltorb,
} from '@/data/games/voltorb-grid'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { completeResearchEncounter, startResearchEncounter } from '../actions'

interface VoltorbGridGameProps {
  encounter: VoltorbGridGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
}

type Direction = 'up' | 'down' | 'left' | 'right'

interface RuntimeVoltorb extends Required<VoltorbGridVoltorb> {}

interface RuntimeProtectedPokemon
  extends Required<VoltorbGridProtectedPokemon> {}

const directions: Record<Direction, VoltorbGridPosition> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function positionKey(position: VoltorbGridPosition) {
  return `${position.x},${position.y}`
}

function samePosition(a: VoltorbGridPosition, b: VoltorbGridPosition) {
  return a.x === b.x && a.y === b.y
}

function isInsideGrid(
  position: VoltorbGridPosition,
  cols: number,
  rows: number,
) {
  return (
    position.x >= 0 && position.x < cols && position.y >= 0 && position.y < rows
  )
}

function buildRuntimeVoltorbs(
  voltorbs: VoltorbGridVoltorb[],
): RuntimeVoltorb[] {
  return voltorbs.map((voltorb, index) => ({
    id: voltorb.id || `voltorb-${index}`,
    x: voltorb.x,
    y: voltorb.y,
    blastRadius: voltorb.blastRadius || 2,
  }))
}

function buildRuntimeProtectedPokemon(
  protectedPokemon: VoltorbGridProtectedPokemon[] = [],
): RuntimeProtectedPokemon[] {
  return protectedPokemon.map((pokemon, index) => ({
    id: pokemon.id || `protected-pokemon-${index}`,
    speciesId: pokemon.speciesId,
    formId: pokemon.formId || String(pokemon.speciesId),
    x: pokemon.x,
    y: pokemon.y,
  }))
}

export function VoltorbGridGame({
  encounter,
  initialState,
}: VoltorbGridGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const { cols, rows } = encounter.settings.gridSize
  const maxMoves = encounter.settings.maxMoves
  const maxDischarges = encounter.settings.maxDischarges
  const themeColour = encounter.settings.themeColour || '#facc15'
  const timeLimit = encounter.settings.timeLimit || 90
  const floorSprite =
    encounter.settings.floorSprite || '/games/rockpush/floor.avif'
  const barrierSprite =
    encounter.settings.barrierSprite || '/games/rockpush/barrier.avif'
  const boulderSprite =
    encounter.settings.boulderSprite || '/games/rockpush/boulder.avif'
  const winTileSprite =
    encounter.settings.winTileSprite || '/games/rockpush/win-tile.png'
  const playerSprite =
    encounter.settings.playerSprite || '/games/rockpush/trainer.avif'

  const wallKeys = useMemo(
    () => new Set((encounter.settings.walls || []).map(positionKey)),
    [encounter.settings.walls],
  )
  const initialDebrisKeys = useMemo(
    () => new Set((encounter.settings.debris || []).map(positionKey)),
    [encounter.settings.debris],
  )
  const initialVoltorbs = useMemo(
    () => buildRuntimeVoltorbs(encounter.settings.voltorbs),
    [encounter.settings.voltorbs],
  )
  const initialProtectedPokemon = useMemo(
    () => buildRuntimeProtectedPokemon(encounter.settings.protectedPokemon),
    [encounter.settings.protectedPokemon],
  )
  const detonatingVoltorbId = initialVoltorbs[0]?.id
  const requiredCleared = Math.min(
    encounter.settings.requiredCleared ?? initialDebrisKeys.size,
    initialDebrisKeys.size,
  )

  const [player, setPlayer] = useState<VoltorbGridPosition>(
    encounter.settings.playerStart,
  )
  const [facing, setFacing] = useState<Direction>('down')
  const [debrisKeys, setDebrisKeys] = useState<Set<string>>(
    new Set(initialDebrisKeys),
  )
  const [voltorbs, setVoltorbs] = useState<RuntimeVoltorb[]>(initialVoltorbs)
  const [protectedPokemon, setProtectedPokemon] = useState<
    RuntimeProtectedPokemon[]
  >(initialProtectedPokemon)
  const [blastKeys, setBlastKeys] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  const [discharges, setDischarges] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [isBlasting, setIsBlasting] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const completionRef = useRef(false)

  const voltorbByKey = useMemo(
    () => new Map(voltorbs.map((voltorb) => [positionKey(voltorb), voltorb])),
    [voltorbs],
  )
  const protectedPokemonByKey = useMemo(
    () =>
      new Map(
        protectedPokemon.map((pokemon) => [positionKey(pokemon), pokemon]),
      ),
    [protectedPokemon],
  )
  const clearedDebris = initialDebrisKeys.size - debrisKeys.size
  const exitOpen = clearedDebris >= requiredCleared

  const completeGame = useCallback(
    async (success: boolean, message: string) => {
      if (completionRef.current) return
      completionRef.current = true
      setGameEnded(true)
      setIsBlasting(false)

      const completion = await completeResearchEncounter(encounter.id, success)
      const finalSuccess = success && completion.success
      setResult({
        success: finalSuccess,
        message: finalSuccess ? 'Route cleared.' : message,
        rewards: completion.summary,
      })

      playSfx(finalSuccess ? 'good' : 'bad')
    },
    [encounter.id, playSfx],
  )

  const resetBoard = useCallback(() => {
    setPlayer(encounter.settings.playerStart)
    setFacing('down')
    setDebrisKeys(new Set(initialDebrisKeys))
    setVoltorbs(initialVoltorbs)
    setProtectedPokemon(initialProtectedPokemon)
    setBlastKeys(new Set())
    setMoves(0)
    setDischarges(0)
    setTimeLeft(timeLimit)
    setGameEnded(false)
    setIsBlasting(false)
    setResult(null)
    completionRef.current = false
  }, [
    encounter.settings.playerStart,
    initialDebrisKeys,
    initialProtectedPokemon,
    initialVoltorbs,
    timeLimit,
  ])

  const initGame = useCallback(async () => {
    const start = await startResearchEncounter(encounter.id)
    if (!start.success) {
      setResult({
        success: false,
        message: start.error || 'Could not start Voltorb Grid.',
      })
      return
    }

    resetBoard()
    setGameStarted(true)

    if (start.restored && start.expiry) {
      setTimeLeft(Math.max(0, Math.floor((start.expiry - Date.now()) / 1000)))
    }
  }, [encounter.id, resetBoard])

  useEffect(() => {
    if (!gameStarted) {
      void initGame()
    }
  }, [gameStarted, initGame])

  useEffect(() => {
    if (!gameStarted || gameEnded || timeLeft <= 0) return

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          void completeGame(false, 'The Voltorb puzzle timed out.')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [completeGame, gameEnded, gameStarted, timeLeft])

  const canVoltorbOccupy = useCallback(
    (position: VoltorbGridPosition, movingId: string) => {
      const key = positionKey(position)
      if (!isInsideGrid(position, cols, rows)) return false
      if (wallKeys.has(key)) return false
      if (debrisKeys.has(key)) return false
      if (protectedPokemonByKey.has(key)) return false
      if (samePosition(position, encounter.settings.exit)) return false

      return !voltorbs.some(
        (voltorb) => voltorb.id !== movingId && samePosition(voltorb, position),
      )
    },
    [
      cols,
      debrisKeys,
      encounter.settings.exit,
      protectedPokemonByKey,
      rows,
      voltorbs,
      wallKeys,
    ],
  )

  const canProtectedPokemonOccupy = useCallback(
    (position: VoltorbGridPosition, movingId: string) => {
      const key = positionKey(position)
      if (!isInsideGrid(position, cols, rows)) return false
      if (wallKeys.has(key)) return false
      if (debrisKeys.has(key)) return false
      if (voltorbByKey.has(key)) return false
      if (samePosition(position, encounter.settings.exit)) return false

      return !protectedPokemon.some(
        (pokemon) => pokemon.id !== movingId && samePosition(pokemon, position),
      )
    },
    [
      cols,
      debrisKeys,
      encounter.settings.exit,
      protectedPokemon,
      rows,
      voltorbByKey,
      wallKeys,
    ],
  )

  const isPlayerBlocked = useCallback(
    (position: VoltorbGridPosition) => {
      const key = positionKey(position)
      if (!isInsideGrid(position, cols, rows)) return true
      if (wallKeys.has(key)) return true
      if (debrisKeys.has(key)) return true
      if (protectedPokemonByKey.has(key)) return true
      if (!exitOpen && samePosition(position, encounter.settings.exit))
        return true
      return false
    },
    [
      cols,
      debrisKeys,
      encounter.settings.exit,
      exitOpen,
      protectedPokemonByKey,
      rows,
      wallKeys,
    ],
  )

  const movePlayer = useCallback(
    (direction: Direction) => {
      if (!gameStarted || gameEnded || isBlasting) return

      setFacing(direction)
      const delta = directions[direction]
      const next = { x: player.x + delta.x, y: player.y + delta.y }
      const nextKey = positionKey(next)
      const pushedVoltorb = voltorbByKey.get(nextKey)
      const pushedProtectedPokemon = protectedPokemonByKey.get(nextKey)

      if (pushedVoltorb) {
        const pushedPosition = {
          x: pushedVoltorb.x + delta.x,
          y: pushedVoltorb.y + delta.y,
        }
        if (!canVoltorbOccupy(pushedPosition, pushedVoltorb.id)) {
          playSfx('bad')
          return
        }

        const nextMoves = moves + 1
        setMoves(nextMoves)
        setPlayer(next)
        setVoltorbs((current) =>
          current.map((voltorb) =>
            voltorb.id === pushedVoltorb.id
              ? { ...voltorb, ...pushedPosition }
              : voltorb,
          ),
        )
        playSfx('select')

        if (maxMoves && nextMoves >= maxMoves) {
          void completeGame(false, 'No safe route found before the move limit.')
        }
        return
      }

      if (pushedProtectedPokemon) {
        const pushedPosition = {
          x: pushedProtectedPokemon.x + delta.x,
          y: pushedProtectedPokemon.y + delta.y,
        }
        if (
          !canProtectedPokemonOccupy(pushedPosition, pushedProtectedPokemon.id)
        ) {
          playSfx('bad')
          return
        }

        const nextMoves = moves + 1
        setMoves(nextMoves)
        setPlayer(next)
        setProtectedPokemon((current) =>
          current.map((pokemon) =>
            pokemon.id === pushedProtectedPokemon.id
              ? { ...pokemon, ...pushedPosition }
              : pokemon,
          ),
        )
        playSfx('select')

        if (maxMoves && nextMoves >= maxMoves) {
          void completeGame(false, 'No safe route found before the move limit.')
        }
        return
      }

      if (isPlayerBlocked(next)) {
        playSfx('bad')
        return
      }

      const nextMoves = moves + 1
      setMoves(nextMoves)
      setPlayer(next)
      playSfx('select')

      if (samePosition(next, encounter.settings.exit) && exitOpen) {
        void completeGame(true, 'Route cleared.')
        return
      }

      if (maxMoves && nextMoves >= maxMoves) {
        void completeGame(false, 'No safe route found before the move limit.')
      }
    },
    [
      canVoltorbOccupy,
      canProtectedPokemonOccupy,
      completeGame,
      encounter.settings.exit,
      exitOpen,
      gameEnded,
      gameStarted,
      isBlasting,
      isPlayerBlocked,
      maxMoves,
      moves,
      playSfx,
      player,
      protectedPokemonByKey,
      voltorbByKey,
    ],
  )

  const calculateBlast = useCallback(() => {
    const blast = new Set<string>()
    const destroyed = new Set<string>()
    const triggeredVoltorbIds = new Set<string>()
    const hitProtectedPokemonKeys = new Set<string>()
    const voltorbByPosition = new Map(
      voltorbs.map((voltorb) => [positionKey(voltorb), voltorb]),
    )
    const firstVoltorb = voltorbs.find(
      (voltorb) => voltorb.id === detonatingVoltorbId,
    )
    const queue = firstVoltorb ? [firstVoltorb] : []

    for (let index = 0; index < queue.length; index += 1) {
      const voltorb = queue[index]
      if (triggeredVoltorbIds.has(voltorb.id)) continue

      triggeredVoltorbIds.add(voltorb.id)
      blast.add(positionKey(voltorb))

      Object.values(directions).forEach((delta) => {
        for (let step = 1; step <= voltorb.blastRadius; step++) {
          const next = {
            x: voltorb.x + delta.x * step,
            y: voltorb.y + delta.y * step,
          }
          if (!isInsideGrid(next, cols, rows)) break

          const key = positionKey(next)
          if (wallKeys.has(key)) break

          blast.add(key)

          if (protectedPokemonByKey.has(key)) {
            hitProtectedPokemonKeys.add(key)
            break
          }

          const chainedVoltorb = voltorbByPosition.get(key)
          if (chainedVoltorb && !triggeredVoltorbIds.has(chainedVoltorb.id)) {
            queue.push(chainedVoltorb)
          }

          if (debrisKeys.has(key)) {
            destroyed.add(key)
            break
          }
        }
      })
    }

    return { blast, destroyed, hitProtectedPokemonKeys, triggeredVoltorbIds }
  }, [
    cols,
    debrisKeys,
    detonatingVoltorbId,
    protectedPokemonByKey,
    rows,
    voltorbs,
    wallKeys,
  ])

  const triggerDischarge = useCallback(() => {
    if (!gameStarted || gameEnded || isBlasting) return
    if (maxDischarges && discharges >= maxDischarges) {
      playSfx('bad')
      return
    }

    const { blast, destroyed, hitProtectedPokemonKeys, triggeredVoltorbIds } =
      calculateBlast()
    const nextDischarges = discharges + 1
    const hitPlayer = blast.has(positionKey(player))
    const hitProtectedPokemon = hitProtectedPokemonKeys.size > 0
    const remainingDebris = debrisKeys.size - destroyed.size
    const opensExit =
      initialDebrisKeys.size - remainingDebris >= requiredCleared

    setDischarges(nextDischarges)
    setIsBlasting(true)
    setBlastKeys(blast)
    playSfx(destroyed.size > 0 ? 'good' : 'select')

    window.setTimeout(() => {
      setBlastKeys(new Set())
      setDebrisKeys((current) => {
        const next = new Set(current)
        destroyed.forEach((key) => next.delete(key))
        return next
      })
      setVoltorbs((current) =>
        current.filter((voltorb) => !triggeredVoltorbIds.has(voltorb.id)),
      )

      if (hitPlayer) {
        void completeGame(false, 'A Voltorb discharge caught you in the open.')
        return
      }

      if (hitProtectedPokemon) {
        void completeGame(false, 'A Pokemon was caught in the blast chain.')
        return
      }

      if (maxDischarges && nextDischarges >= maxDischarges && !opensExit) {
        void completeGame(
          false,
          'The charge faded before enough rubble was cleared.',
        )
        return
      }

      setIsBlasting(false)
    }, 520)
  }, [
    calculateBlast,
    completeGame,
    debrisKeys.size,
    discharges,
    gameEnded,
    gameStarted,
    initialDebrisKeys.size,
    isBlasting,
    maxDischarges,
    playSfx,
    player,
    requiredCleared,
  ])

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
      } else if (event.key === ' ' || event.key.toLowerCase() === 'e') {
        event.preventDefault()
        triggerDischarge()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [movePlayer, triggerDischarge])

  const boardCells = Array.from({ length: rows * cols }, (_, index) => ({
    x: index % cols,
    y: Math.floor(index / cols),
  }))

  return (
    <div className="relative min-h-dvh overflow-hidden game-night bg-game-night-canvas text-game-night-ink">
      <style jsx global>{`
        @keyframes voltorb-grid-blast {
          0%,
          100% {
            opacity: 0.72;
            transform: scale(0.92);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
        @keyframes voltorb-grid-detonator {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          20% {
            transform: translateX(-3px) rotate(-4deg);
          }
          40% {
            transform: translateX(3px) rotate(4deg);
          }
          60% {
            transform: translateX(-2px) rotate(-3deg);
          }
          80% {
            transform: translateX(2px) rotate(3deg);
          }
        }
      `}</style>
      <div className="absolute inset-0">
        <Image
          src={
            encounter.settings.background ||
            encounter.background ||
            '/backgrounds/rocky-path.avif'
          }
          alt=""
          fill
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-[#0d1820]/70" />
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col">
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 flex -translate-x-1/2 flex-row gap-3">
          <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm">
            <CircleDot className="h-3 w-3 text-game-moss" />
            <span>
              {clearedDebris}{' '}
              <span className="text-game-muted">/ {requiredCleared}</span>
            </span>
          </div>

          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm transition-colors',
              maxMoves && moves >= maxMoves * 0.9
                ? 'border-game-danger/60 bg-game-danger/20'
                : '',
            )}
          >
            <Footprints className="h-3 w-3 text-game-moss" />
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

        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 pb-4">
          <div
            className="grid max-w-[92vw] overflow-hidden rounded-lg bg-game-night-surface shadow-2xl ring-4 ring-[#081014]/35"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              width: 'min(90vw, 500px)',
              aspectRatio: `${cols} / ${rows}`,
              gap: 0,
            }}
          >
            {boardCells.map((position) => {
              const key = positionKey(position)
              const isWall = wallKeys.has(key)
              const isDebris = debrisKeys.has(key)
              const voltorb = voltorbByKey.get(key)
              const protectedPokemon = protectedPokemonByKey.get(key)
              const isPlayer = samePosition(player, position)
              const isExit = samePosition(encounter.settings.exit, position)
              const isBlast = blastKeys.has(key)

              return (
                <div
                  key={key}
                  className={cn(
                    'relative h-full w-full overflow-hidden [image-rendering:pixelated] bg-[length:100%_100%]',
                    isWall && 'shadow-[inset_0_-6px_10px_rgba(0,0,0,0.35)]',
                  )}
                  style={{
                    backgroundImage: `url('${isWall ? barrierSprite : floorSprite}')`,
                  }}
                >
                  {isExit && (
                    <div
                      className={cn(
                        'absolute inset-[12%] z-10 transition-opacity',
                        exitOpen ? 'opacity-100' : 'opacity-35 grayscale',
                      )}
                    >
                      <Image
                        src={winTileSprite}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain [image-rendering:pixelated]"
                      />
                    </div>
                  )}

                  {isDebris && (
                    <div className="absolute inset-[10%] z-20">
                      <Image
                        src={boulderSprite}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain drop-shadow-lg [image-rendering:pixelated]"
                      />
                    </div>
                  )}

                  {protectedPokemon && (
                    <div className="absolute inset-[8%] z-[25]">
                      <Image
                        src={getPokemonImageUrl(
                          protectedPokemon.formId,
                          'home',
                        )}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                      />
                    </div>
                  )}

                  {voltorb && (
                    <div className="absolute inset-[8%] z-30">
                      <div
                        className="absolute inset-[18%] rounded-full blur-sm"
                        style={{
                          backgroundColor: themeColour,
                          opacity: 0.24,
                        }}
                      />
                      <Image
                        src={getPokemonImageUrl('100', 'home')}
                        alt="Voltorb"
                        fill
                        sizes="64px"
                        className={cn(
                          'object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]',
                          voltorb.id === detonatingVoltorbId &&
                            !isBlasting &&
                            '[animation:voltorb-grid-detonator_540ms_ease-in-out_infinite]',
                        )}
                      />
                    </div>
                  )}

                  {isBlast && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center bg-yellow-300/35">
                      <div className="h-[58%] w-[58%] rounded-full bg-yellow-100 shadow-[0_0_22px_rgba(250,204,21,0.95)] [animation:voltorb-grid-blast_280ms_ease-in-out_infinite]" />
                    </div>
                  )}

                  {isPlayer && (
                    <div className="absolute inset-0 z-50 p-0.5">
                      <div className="absolute inset-[20%] translate-y-[18%] rounded-full bg-[#081014]/25 blur-[3px]" />
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
                </div>
              )
            })}
          </div>

          <div className="flex-none z-50 flex items-center gap-3">
            <Button
              type="button"
              size="icon"
              onClick={triggerDischarge}
              disabled={!gameStarted || gameEnded || isBlasting}
              aria-label="Discharge Voltorb"
              title="Discharge Voltorb"
              className="h-12 w-12 rounded-full border-2 border-game-ochre bg-game-night-surface text-game-ochre shadow-lg hover:bg-game-night-surface-raised disabled:opacity-35"
            >
              <Image
                src={getPokemonImageUrl('100', 'sprite')}
                alt=""
                width={34}
                height={34}
                className="h-9 w-9 object-contain pixelated"
              />
            </Button>
          </div>

          <div className="flex-none max-w-[200px] w-full z-40 mb-8">
            <div className="grid grid-cols-3 gap-2 mx-auto">
              <div />
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('up')}
                disabled={!gameStarted || gameEnded || isBlasting}
                aria-label="Move up"
              >
                <ArrowUp />
              </Button>
              <div />
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('left')}
                disabled={!gameStarted || gameEnded || isBlasting}
                aria-label="Move left"
              >
                <ArrowLeft />
              </Button>
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('down')}
                disabled={!gameStarted || gameEnded || isBlasting}
                aria-label="Move down"
              >
                <ArrowDown />
              </Button>
              <Button
                size="lg"
                className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
                onClick={() => movePlayer('right')}
                disabled={!gameStarted || gameEnded || isBlasting}
                aria-label="Move right"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </main>

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
                  if (replay.success) {
                    window.location.reload()
                  } else {
                    router.push('/game/explore')
                  }
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
