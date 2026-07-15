'use client'

import { AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { ResearchConfig } from '@/data/games'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface SlidingPuzzleGameProps {
  encounter: ResearchConfig
  initialState?: any
}

export function SlidingPuzzleGame({
  encounter,
  initialState,
}: SlidingPuzzleGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const router = useRouter()
  const { refreshUser } = useUser()
  const winRateNum =
    typeof encounter.settings.winRate === 'number'
      ? encounter.settings.winRate
      : 5

  // Game State
  const [currentPokemon, setCurrentPokemon] = useState<number | null>(
    initialState?.nextPokemonId || initialState?.currentPokemonId || null,
  )
  const [correctCount, setCorrectCount] = useState(initialState?.wins || 0)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? (encounter.settings.timeLimit || 120),
  )
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  // Puzzle State
  const [tiles, setTiles] = useState<(number | null)[]>(
    initialState?.roundData?.tiles || [],
  )
  const [gridSize, setGridSize] = useState<number>(
    initialState?.roundData?.gridSize || encounter.settings.gridSize || 4,
  )
  // moveCount and emptyIdx are useful for optimistic updates although we usually rely on server roundData
  const [moveCount, setMoveCount] = useState(
    initialState?.roundData?.moveCount || 0,
  )
  const [solveFlash, setSolveFlash] = useState(false)
  const puzzleImage =
    typeof encounter.settings.image === 'string'
      ? encounter.settings.image
      : undefined

  // Start initialization
  const initGame = useCallback(async () => {
    if (gameStarted) return

    const result = await startResearchEncounter(encounter.id)

    if (!result.success) {
      console.error('Failed to start encounter:', result.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setCorrectCount(result.wins || 0)

    if (result.nextPokemonId) {
      setCurrentPokemon(result.nextPokemonId)
    }

    if (result.roundData) {
      setTiles(result.roundData.tiles)
      setGridSize(result.roundData.gridSize || 4)
      setMoveCount(result.roundData.moveCount || 0)
    }

    if (result.restored && result.expiry) {
      const remaining = Math.max(
        0,
        Math.floor((result.expiry - Date.now()) / 1000),
      )
      setTimeLeft(remaining)
      if (remaining <= 0) {
        setGameEnded(true)
        router.push('/game')
      }
    } else {
      setTimeLeft(encounter.settings.timeLimit || 120)
    }
  }, [encounter.id, encounter.settings.timeLimit, gameStarted, router])

  // Auto-start
  useEffect(() => {
    if (initialState) {
      // Already hydrated
    } else if (!gameStarted) {
      initGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Timer
  useEffect(() => {
    if (!gameStarted || gameEnded) return
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setGameEnded(true)
          playSfx('bad')
          completeResearchEncounter(encounter.id, false).then(() => {
            setResult({
              success: false,
              message: 'Time is up!',
            })
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStarted, gameEnded, encounter.id])

  // Optimistic Move Handler
  // It checks if move is valid, updates UI immediately, then syncs with server.
  const handleTileClick = async (tileIndex: number) => {
    if (gameEnded || isProcessing || !tiles || tiles[tileIndex] === null) return

    // Find empty spot locally
    const emptyIdx = tiles.indexOf(null)
    if (emptyIdx === -1) return

    const row = Math.floor(tileIndex / gridSize)
    const col = tileIndex % gridSize
    const emptyRow = Math.floor(emptyIdx / gridSize)
    const emptyCol = emptyIdx % gridSize

    // Check adjacency
    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)

    if (!isAdjacent) return

    // Lock UI
    setIsProcessing(true)

    // Optimistic UI update
    const newTiles = [...tiles]
    newTiles[emptyIdx] = newTiles[tileIndex]
    newTiles[tileIndex] = null
    setTiles(newTiles)
    setMoveCount((prev: number) => prev + 1)

    const result = await submitResearchAnswer({ moveTileIndex: tileIndex })

    if (!result.success) {
      setIsProcessing(false)
      return
    }

    if (result.partial) {
      if (result.roundData) {
        setTiles(result.roundData.tiles)
        setGridSize(result.roundData.gridSize || gridSize)
        setMoveCount(result.roundData.moveCount || 0)
      }
      setIsProcessing(false)
      return
    }

    // Solved round
    playSfx('good')
    setCorrectCount(result.wins || 0)

    // Brief green flash before transitioning
    setSolveFlash(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setSolveFlash(false)

    // Celebration delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (result.gameOver) {
      const completeResult = await completeResearchEncounter(
        encounter.id,
        (result.wins || 0) >= (result.requiredWins || 5),
      )
      setResult({
        success:
          completeResult.success &&
          (result.wins || 0) >= (result.requiredWins || 5),
        message: completeResult.success
          ? `You solved ${result.wins} puzzles!`
          : 'Game Over',
        rewards: completeResult.summary,
      })
      setGameEnded(true)
    } else {
      // Next level from server state
      if (result.nextPokemonId) setCurrentPokemon(result.nextPokemonId)
      if (result.roundData) {
        setTiles(result.roundData.tiles)
        setGridSize(result.roundData.gridSize || gridSize)
        setMoveCount(result.roundData.moveCount || 0)
      } else {
        setMoveCount(0)
      }
    }

    // We don't send every move to server anymore, just local state update
    // But we might want to verify session is still valid periodically?
    // For now, assume session is valid until win.
    setIsProcessing(false)
  }

  // Pre-calculate background positions for the tiles
  // 100 / (gridSize - 1) gives percentage steps if using background-size: cover/contain isn't enough
  // Actually, we want background-image with background-position and background-size: (gridSize * 100)%
  const tileBackgroundSize = `${gridSize * 100}%`

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          <div className="relative flex h-[40%] items-center justify-center overflow-hidden bg-[#0d1820]">
            {/* Timer - Top Right */}
            <div className="absolute top-4 right-4 z-10">
              <GameTimer
                timeLeft={timeLeft}
                totalTime={encounter.settings.timeLimit || 120}
              />
            </div>

            {/* Progress - Top Left */}
            <div className="absolute top-4 left-4 z-10">
              <GameProgressChip wins={correctCount} required={winRateNum} />
            </div>

            {/* Target Preview - Simple Centered */}
            {(puzzleImage || currentPokemon) && (
              <div
                className="relative z-10 h-64 w-64 overflow-hidden rounded-lg border-2 border-game-night-border shadow-xl"
                style={{
                  backgroundImage: puzzleImage
                    ? `url(${puzzleImage})`
                    : `url(${getPokemonImageUrl(currentPokemon!.toString(), 'home')}), url(${encounter.background})`,
                  backgroundSize: puzzleImage
                    ? '100% 100%'
                    : '100% 100%, 100% 100%',
                  backgroundPosition: puzzleImage ? 'center' : 'center, center',
                  backgroundRepeat: puzzleImage
                    ? 'no-repeat'
                    : 'no-repeat, no-repeat',
                  imageRendering: puzzleImage ? 'auto' : 'pixelated',
                }}
              />
            )}
          </div>
          {/* Puzzle Area (Bottom 60%) */}
          <div className="game-paper-texture relative flex h-[60%] flex-col items-center justify-center border-t border-game-border bg-game-surface p-4 text-game-ink">
            <div
              className="relative overflow-hidden rounded-xl border-4 border-[#40545c] bg-game-night-surface shadow-xl"
              style={{
                width: 'min(90vw, 360px)',
                height: 'min(90vw, 360px)',
                display: 'grid',
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                gap: '2px', // Slight gap for tile effect
                padding: '2px', // Inset for gap
              }}
            >
              {/* Solve Flash Overlay */}
              {solveFlash && (
                <div className="absolute inset-0 z-20 bg-green-400/40 border-2 border-green-400 animate-in fade-in duration-100 pointer-events-none" />
              )}
              {tiles.map((tileVal, idx) => {
                if (tileVal === null) {
                  return (
                    <div
                      key={`empty-${idx}`}
                      className="rounded-sm bg-[#22353d]/50"
                    />
                  )
                }

                // Calculate where this tile *should* be in the original image
                const correctRow = Math.floor(tileVal / gridSize)
                const correctCol = tileVal % gridSize

                // Calculate background position
                // If gridSize=4, positions are 0%, 33.3%, 66.6%, 100%
                // Formula: pos = index * (100 / (gridSize - 1))
                const xPos = correctCol * (100 / (gridSize - 1))
                const yPos = correctRow * (100 / (gridSize - 1))

                return (
                  <button
                    key={`tile-${tileVal}`} // Key by value so React animates movement potentially
                    type="button"
                    aria-label={`Puzzle tile ${tileVal + 1}, row ${Math.floor(idx / gridSize) + 1}, column ${(idx % gridSize) + 1}`}
                    onClick={() => handleTileClick(idx)}
                    disabled={isProcessing}
                    className={cn(
                      'relative w-full h-full rounded-sm overflow-hidden transition-transform active:scale-95 touch-manipulation',
                      // "shadow-sm border border-black/10"
                    )}
                  >
                    {(puzzleImage || currentPokemon) && (
                      <div
                        className="absolute inset-0 h-full w-full bg-[#e8dcc5]"
                        style={{
                          backgroundImage: puzzleImage
                            ? `url(${puzzleImage})`
                            : `url(${getPokemonImageUrl(currentPokemon!.toString(), 'home')}), url(${encounter.background})`,
                          backgroundSize: puzzleImage
                            ? `${tileBackgroundSize} ${tileBackgroundSize}`
                            : `${tileBackgroundSize} ${tileBackgroundSize}, ${tileBackgroundSize} ${tileBackgroundSize}`,
                          backgroundPosition: puzzleImage
                            ? `${xPos}% ${yPos}%`
                            : `${xPos}% ${yPos}%, ${xPos}% ${yPos}%`,
                          backgroundRepeat: puzzleImage
                            ? 'no-repeat'
                            : 'no-repeat, no-repeat',
                          imageRendering: puzzleImage ? 'auto' : 'pixelated', // Optional depending on sprite style
                        }}
                      />
                    )}

                    {/* Optional Number overlay for easier solving if desired */}
                    {/* <span className="absolute top-1 left-1 text-[10px] bg-black/50 text-white px-1 rounded">{tileVal + 1}</span> */}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 text-xs font-bold uppercase tracking-widest text-game-muted">
              Moves:{' '}
              <span className="ml-1 font-mono text-base text-game-ink">
                {moveCount}
              </span>
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
                  try {
                    const res = await startResearchEncounter(
                      (initialState?.encounter || encounter).id,
                      true,
                    )
                    if (res?.success) {
                      window.location.reload()
                    } else {
                      window.location.href = '/game/explore'
                    }
                  } catch (e) {
                    window.location.href = '/game/explore'
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
