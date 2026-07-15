'use client'

import { RotateCw, Zap } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  MagnemiteCircuitGameConfig,
  MagnemiteCircuitPosition,
  MagnemiteCircuitTile,
  MagnemiteCircuitTileType,
} from '@/data/games/magnemite-circuit'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { completeResearchEncounter, startResearchEncounter } from '../actions'

interface MagnemiteCircuitGameProps {
  encounter: MagnemiteCircuitGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
}

type Direction = 'up' | 'right' | 'down' | 'left'

const directionDeltas: Record<Direction, MagnemiteCircuitPosition> = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
}

const oppositeDirection: Record<Direction, Direction> = {
  up: 'down',
  right: 'left',
  down: 'up',
  left: 'right',
}

const baseConnections: Record<MagnemiteCircuitTileType, Direction[]> = {
  straight: ['up', 'down'],
  corner: ['up', 'right'],
  tee: ['up', 'right', 'down'],
  cross: ['up', 'right', 'down', 'left'],
}

const orderedDirections: Direction[] = ['up', 'right', 'down', 'left']

function positionKey(position: MagnemiteCircuitPosition) {
  return `${position.x},${position.y}`
}

function rotateDirection(direction: Direction, rotation: number): Direction {
  const index = orderedDirections.indexOf(direction)
  return orderedDirections[(index + rotation) % orderedDirections.length]
}

function getConnections(tile: MagnemiteCircuitTile): Direction[] {
  const rotation = tile.rotation || 0
  return baseConnections[tile.type].map((direction) =>
    rotateDirection(direction, rotation),
  )
}

function isSamePosition(
  a: MagnemiteCircuitPosition,
  b: MagnemiteCircuitPosition,
) {
  return a.x === b.x && a.y === b.y
}

function getTargetSprite(
  target: { formId?: string; sprite?: string } | undefined,
) {
  if (!target) return null
  if (target.formId) return getPokemonImageUrl(target.formId, 'home')
  return target.sprite || null
}

function getPoweredTiles(
  source: MagnemiteCircuitPosition,
  tilesByKey: Map<string, MagnemiteCircuitTile>,
) {
  const powered = new Set<string>()
  const queue = [positionKey(source)]

  while (queue.length > 0) {
    const currentKey = queue.shift()
    if (!currentKey || powered.has(currentKey)) continue

    const tile = tilesByKey.get(currentKey)
    if (!tile) continue

    powered.add(currentKey)
    for (const direction of getConnections(tile)) {
      const delta = directionDeltas[direction]
      const next = { x: tile.x + delta.x, y: tile.y + delta.y }
      const nextKey = positionKey(next)
      const nextTile = tilesByKey.get(nextKey)
      if (!nextTile) continue

      if (getConnections(nextTile).includes(oppositeDirection[direction])) {
        queue.push(nextKey)
      }
    }
  }

  return powered
}

export function MagnemiteCircuitGame({
  encounter,
  initialState,
}: MagnemiteCircuitGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const { cols, rows } = encounter.settings.gridSize
  const timeLimit = encounter.settings.timeLimit || 75
  const maxRotations = encounter.settings.maxRotations
  const themeColour = encounter.settings.themeColour || '#facc15'

  const [tiles, setTiles] = useState<MagnemiteCircuitTile[]>(
    encounter.settings.tiles,
  )
  const [rotations, setRotations] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const completionRef = useRef(false)

  const tilesByKey = useMemo(
    () => new Map(tiles.map((tile) => [positionKey(tile), tile])),
    [tiles],
  )
  const poweredKeys = useMemo(
    () => getPoweredTiles(encounter.settings.source, tilesByKey),
    [encounter.settings.source, tilesByKey],
  )
  const poweredTargetCount = encounter.settings.targets.filter((target) =>
    poweredKeys.has(positionKey(target)),
  ).length
  const allTargetsPowered = encounter.settings.targets.every((target) =>
    poweredKeys.has(positionKey(target)),
  )

  const completeGame = useCallback(
    async (success: boolean, message: string) => {
      if (completionRef.current) return
      completionRef.current = true
      setGameEnded(true)

      const completion = await completeResearchEncounter(encounter.id, success)
      const finalSuccess = success && completion.success
      setResult({
        success: finalSuccess,
        message: finalSuccess ? 'Circuit restored.' : message,
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
        message: start.error || 'Could not start Magnemite Circuit.',
      })
      return
    }

    completionRef.current = false
    setTiles(encounter.settings.tiles)
    setRotations(0)
    setGameStarted(true)
    setGameEnded(false)
    setResult(null)
    setTimeLeft(
      start.restored && start.expiry
        ? Math.max(0, Math.floor((start.expiry - Date.now()) / 1000))
        : timeLimit,
    )
  }, [encounter.id, encounter.settings.tiles, timeLimit])

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
          void completeGame(false, 'The charge faded.')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [completeGame, gameEnded, gameStarted, timeLeft])

  useEffect(() => {
    if (gameStarted && !gameEnded && allTargetsPowered) {
      void completeGame(true, 'Circuit restored.')
    }
  }, [allTargetsPowered, completeGame, gameEnded, gameStarted])

  const rotateTile = useCallback(
    (tileKey: string) => {
      if (!gameStarted || gameEnded) return
      const tile = tilesByKey.get(tileKey)
      if (!tile || tile.locked) return

      const nextRotations = rotations + 1
      const nextTiles = tiles.map((entry) =>
        positionKey(entry) === tileKey
          ? { ...entry, rotation: ((entry.rotation || 0) + 1) % 4 }
          : entry,
      )
      const nextTilesByKey = new Map(
        nextTiles.map((entry) => [positionKey(entry), entry]),
      )
      const nextPoweredKeys = getPoweredTiles(
        encounter.settings.source,
        nextTilesByKey,
      )
      const nextSolved = encounter.settings.targets.every((target) =>
        nextPoweredKeys.has(positionKey(target)),
      )

      setRotations(nextRotations)
      setTiles(nextTiles)
      playSfx('select')

      if (nextSolved) {
        void completeGame(true, 'Circuit restored.')
      } else if (maxRotations && nextRotations >= maxRotations) {
        void completeGame(false, 'The circuit locked up.')
      }
    },
    [
      completeGame,
      encounter.settings.source,
      encounter.settings.targets,
      gameEnded,
      gameStarted,
      maxRotations,
      playSfx,
      rotations,
      tiles,
      tilesByKey,
    ],
  )

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
            '/backgrounds/gym-electric.avif'
          }
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-[#081014]/65" />
      </div>

      <main className="relative z-10 flex min-h-dvh flex-col">
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 flex -translate-x-1/2 flex-row gap-3">
          <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm">
            <Zap className="h-3 w-3 text-game-ochre" />
            <span>
              {poweredTargetCount} / {encounter.settings.targets.length}
            </span>
          </div>
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm transition-colors',
              maxRotations && rotations >= maxRotations * 0.9
                ? 'border-red-500/50 bg-red-500/70'
                : '',
            )}
          >
            <RotateCw
              className={cn(
                'h-3 w-3',
                maxRotations && rotations > maxRotations * 0.9
                  ? 'text-game-cream'
                  : 'text-game-ochre',
              )}
            />
            <span>
              {rotations}
              {maxRotations && (
                <span className="text-game-muted"> / {maxRotations}</span>
              )}
            </span>
          </div>
        </div>

        <div className="absolute right-4 top-4 z-50">
          <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-6">
          <div
            className="grid max-w-[92vw] rounded-lg border border-[#f1cf7a]/20 bg-[#081014]/55 p-3 shadow-2xl backdrop-blur"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              width: 'min(92vw, 560px)',
              aspectRatio: `${cols} / ${rows}`,
              gap: 6,
            }}
          >
            {cells.map((cell) => {
              const key = positionKey(cell)
              const tile = tilesByKey.get(key)
              const powered = poweredKeys.has(key)
              const source = isSamePosition(cell, encounter.settings.source)
              const target = encounter.settings.targets.find((entry) =>
                isSamePosition(entry, cell),
              )
              const targetSprite = getTargetSprite(target)

              return (
                <button
                  key={key}
                  type="button"
                  disabled={!tile || tile.locked || gameEnded}
                  onClick={() => rotateTile(key)}
                  className={cn(
                    'relative aspect-square overflow-hidden rounded-md border transition',
                    tile
                      ? 'border-[#5b686b] bg-[#172733]'
                      : 'border-[#40545c] bg-[#0d1820]/80',
                    tile &&
                      !tile.locked &&
                      'hover:border-[#c9d8a7]/60 hover:bg-[#f7ecd6]/10',
                    powered &&
                      'border-yellow-200 bg-yellow-300/15 shadow-[0_0_18px_rgba(250,204,21,0.35)]',
                    target &&
                      powered &&
                      'border-emerald-200 shadow-[0_0_18px_rgba(52,211,153,0.45)]',
                  )}
                  style={{
                    color: powered ? themeColour : undefined,
                  }}
                  aria-label={
                    tile ? 'Rotate circuit tile' : 'Empty circuit tile'
                  }
                >
                  {tile && (
                    <div className="absolute inset-0">
                      {getConnections(tile).map((direction) => (
                        <div
                          key={direction}
                          className={cn(
                            'absolute bg-current opacity-80',
                            direction === 'up' &&
                              'left-1/2 top-0 h-1/2 w-2 -translate-x-1/2',
                            direction === 'down' &&
                              'bottom-0 left-1/2 h-1/2 w-2 -translate-x-1/2',
                            direction === 'left' &&
                              'left-0 top-1/2 h-2 w-1/2 -translate-y-1/2',
                            direction === 'right' &&
                              'right-0 top-1/2 h-2 w-1/2 -translate-y-1/2',
                          )}
                        />
                      ))}
                      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                    </div>
                  )}

                  {source && (
                    <Image
                      src={getPokemonImageUrl('81', 'home')}
                      alt="Magnemite"
                      width={42}
                      height={42}
                      className="absolute inset-0 m-auto h-[70%] w-[70%] object-contain"
                    />
                  )}
                  {targetSprite ? (
                    <div className="absolute inset-[15%] z-20">
                      <Image
                        src={targetSprite}
                        alt=""
                        fill
                        sizes="48px"
                        className={cn(
                          'object-contain [image-rendering:pixelated] transition',
                          powered
                            ? 'drop-shadow-[0_0_12px_rgba(250,204,21,0.75)]'
                            : 'grayscale opacity-75',
                        )}
                      />
                    </div>
                  ) : (
                    target && (
                      <Zap className="absolute right-1 top-1 h-4 w-4 text-emerald-200" />
                    )
                  )}
                </button>
              )
            })}
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
