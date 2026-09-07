'use client'

import type { GameDataKeys } from '@/utilities/requirements/analysis'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { Match3Crystal, Match3GameConfig } from '@/data/games/match3/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { completeGame, startGame } from '@/utilities/games/client-action-recovery'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import { submitMatch3Move } from '../games/match3'
import type { Match3RoundState } from '@/utilities/research/match3'

interface Match3GameProps {
  encounter: Match3GameConfig
  initialState?: any
}

interface Cell {
  crystalId: string
  key: number // Unique key for animation
  isMatched?: boolean
  isFalling?: boolean
}

export function Match3Game({ encounter, initialState }: Match3GameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const completionInvalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)
  const router = useRouter()

  const { cols, rows } = encounter.settings.gridSize
  const crystalTypes = encounter.settings.crystalTypes
  const themeColour = encounter.settings.themeColour || '#14b8a6'

  const isEndlessMode = encounter.settings.endless?.enabled || false
  const milestones = encounter.settings.endless?.milestones || []
  const winScore = encounter.settings.winScore

  // Game state
  const [grid, setGrid] = useState<Cell[][]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [selectedCell, setSelectedCell] = useState<{
    row: number
    col: number
  } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cascadeLevel, setCascadeLevel] = useState(0)
  const [swappingCells, setSwappingCells] = useState<{
    from: { row: number; col: number }
    to: { row: number; col: number }
  } | null>(null)

  const roundRef = useRef<Match3RoundState | null>(null)
  const sessionStartRef = useRef(0)
  const movePendingRef = useRef(false)
  const mountedRef = useRef(true)
  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false } }, [])
  const scoreRef = useRef(0)
  const gameEndingRef = useRef(false) // Prevent duplicate handleGameEnd calls
  const touchStartRef = useRef<{
    row: number
    col: number
    x: number
    y: number
  } | null>(null)

  const handleGameEnd = useCallback(async () => {
    // Use ref to prevent race condition with duplicate calls
    if (gameEndingRef.current) return
    gameEndingRef.current = true
    setGameEnded(true)

    const finalScore = Math.floor(scoreRef.current)

    // For non-endless mode, check if winScore was reached
    const hasWonNormal = !isEndlessMode && !!winScore && finalScore >= winScore

    // For endless mode, check if any milestone was reached (this determines win)
    let hasReachedMilestone = false
    if (isEndlessMode && milestones.length > 0) {
      const lowestMilestone = Math.min(...milestones.map((m: any) => m.score))
      hasReachedMilestone = finalScore >= lowestMilestone
    }

    // Always pass finalScore so score-based games can be verified server-side.
    const isSuccess = hasWonNormal || hasReachedMilestone
    const res = await completeGame(encounter.id, isSuccess, finalScore)
    completionInvalidatesRef.current = res.invalidates

    setResult({
      success: isSuccess && res.success,
      message: isEndlessMode
        ? `Final Score: ${finalScore}`
        : isSuccess && res.success
          ? 'You Win!'
          : 'Game Over',
      rewards: res.summary,
    })

    if (isSuccess && res.success) {
      playSfx('good')
    } else {
      playSfx('bad')
    }
  }, [encounter.id, isEndlessMode, milestones, playSfx, winScore])

  // The server owns the board, score, deadline and refill RNG. The client only
  // animates the committed move receipt, which is replayable after response loss.
  const handleSwipeSwap = useCallback(async (startRow: number, startCol: number, endRow: number, endCol: number) => {
    const current = roundRef.current
    if (!current || movePendingRef.current || gameEnded || gameEndingRef.current) return
    if (Math.abs(endRow - startRow) + Math.abs(endCol - startCol) !== 1) return
    if (Date.now() < current.availableAt) return
    movePendingRef.current = true
    setIsProcessing(true)
    setSelectedCell(null)
    const from = { row: startRow, col: startCol }
    const to = { row: endRow, col: endCol }
    const request = { encounterId: encounter.id, startTime: sessionStartRef.current, revision: current.revision, from, to, actionId: crypto.randomUUID() }
    const response = await recoverGameAction(
      () => submitMatch3Move(request),
      'The move could not be confirmed. Retry to recover the same board.',
      (result) => result.error === 'Time is up' ? undefined : result.error || (!result.round ? 'Unable to recover the board.' : undefined),
    )
    if (!mountedRef.current) return
    if (!response.round) {
      setIsProcessing(false)
      movePendingRef.current = false
      void handleGameEnd()
      return
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pause = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, reducedMotion ? 0 : ms))
    setSwappingCells({ from, to })
    await pause(200)
    if (!mountedRef.current) return
    setSwappingCells(null)
    if (!response.accepted) {
      setSwappingCells({ from: to, to: from })
      await pause(200)
      setSwappingCells(null)
    }
    const cascades = response.cascades || []
    for (let index = 0; index < cascades.length; index++) {
      if (!mountedRef.current) return
      const cascade = cascades[index]
      const matches = new Set(cascade.matched.map(([row, col]) => `${row},${col}`))
      setGrid(cascade.grid.map((row, r) => row.map((cell, c) => ({ ...cell, isMatched: matches.has(`${r},${c}`) }))))
      setCascadeLevel(index + 1)
      setScore(cascade.score)
      await pause(300)
      if (!mountedRef.current) return
      setGrid(cascades[index + 1]?.grid || response.round.grid)
      await pause(200)
    }
    if (!mountedRef.current) return
    roundRef.current = response.round
    scoreRef.current = response.round.score
    setScore(response.round.score)
    setGrid(response.round.grid)
    setCascadeLevel(0)
    const settleDelay = Math.max(0, response.round.availableAt - Date.now())
    if (settleDelay) await new Promise<void>((resolve) => setTimeout(resolve, settleDelay))
    if (!mountedRef.current) return
    setIsProcessing(false)
    movePendingRef.current = false
    if (!isEndlessMode && winScore && response.round.score >= winScore) void handleGameEnd()
  }, [encounter.id, gameEnded, handleGameEnd, isEndlessMode, winScore])

  const handleCellClick = useCallback((row: number, col: number) => {
    if (movePendingRef.current || gameEnded) return
    if (!selectedCell || Math.abs(selectedCell.row - row) + Math.abs(selectedCell.col - col) !== 1) {
      setSelectedCell({ row, col })
      return
    }
    void handleSwipeSwap(selectedCell.row, selectedCell.col, row, col)
  }, [gameEnded, handleSwipeSwap, selectedCell])

  // Touch handlers for swipe
  const handleTouchStart = useCallback(
    (row: number, col: number, e: React.TouchEvent) => {
      if (isProcessing || gameEnded) return
      const touch = e.touches[0]
      touchStartRef.current = { row, col, x: touch.clientX, y: touch.clientY }
    },
    [isProcessing, gameEnded],
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current || isProcessing || gameEnded) return
      const touch = e.changedTouches[0]
      const {
        row: startRow,
        col: startCol,
        x: startX,
        y: startY,
      } = touchStartRef.current
      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      const minSwipeDistance = 20 // pixels

      // Determine swipe direction
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
        // Horizontal swipe
        const endCol = startCol + (dx > 0 ? 1 : -1)
        if (endCol >= 0 && endCol < cols) {
          handleSwipeSwap(startRow, startCol, startRow, endCol)
        }
      } else if (
        Math.abs(dy) > Math.abs(dx) &&
        Math.abs(dy) > minSwipeDistance
      ) {
        // Vertical swipe
        const endRow = startRow + (dy > 0 ? 1 : -1)
        if (endRow >= 0 && endRow < rows) {
          handleSwipeSwap(startRow, startCol, endRow, startCol)
        }
      }
      touchStartRef.current = null
    },
    [cols, rows, isProcessing, gameEnded, handleSwipeSwap],
  )

  // Restoring a session restores its exact authoritative board and score.
  const initGame = useCallback(async () => {
    const response = await recoverGameAction(() => startGame(encounter.id), 'Unable to restore this board.', (result) => result.roundData?.kind === 'match3' ? undefined : 'The saved board is unavailable. Retry or return to Explore.')
    const restored = response.roundData as Match3RoundState | undefined
    if (!mountedRef.current || restored?.kind !== 'match3') return
    roundRef.current = restored
    sessionStartRef.current = response.startTime
    setGrid(restored.grid)
    setScore(restored.score)
    scoreRef.current = restored.score
    setGameStarted(true)
    setGameEnded(false)
    gameEndingRef.current = false
    setResult(null)
    setSelectedCell(null)
    setIsProcessing(false)
    setCascadeLevel(0)
    setTimeLeft(restored.deadline === null ? encounter.settings.timeLimit || 0 : Math.max(0, Math.ceil((restored.deadline - Date.now()) / 1000)))
  }, [encounter.id, encounter.settings.timeLimit])

  useEffect(() => { if (!gameStarted) void initGame() }, [gameStarted, initGame])

  useEffect(() => {
    if (!gameStarted || gameEnded || isProcessing) return
    const tick = () => {
      const round = roundRef.current
      if (!round) return
      if (!isEndlessMode && winScore && round.score >= winScore) { void handleGameEnd(); return }
      if (round.deadline === null) return
      const remaining = Math.max(0, Math.ceil((round.deadline - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining === 0) void handleGameEnd()
    }
    tick()
    const timer = setInterval(tick, 250)
    return () => clearInterval(timer)
  }, [gameStarted, gameEnded, isProcessing, handleGameEnd, isEndlessMode, winScore])

  // Get crystal config by ID
  const getCrystal = (id: string): Match3Crystal | undefined => {
    return crystalTypes.find((c) => c.id === id)
  }

  // Calculate cell size based on available space - larger cells
  const cellSize = 48
  const gap = 4
  const padding = 12
  const gridWidth = cols * cellSize + (cols - 1) * gap
  const gridHeight = rows * cellSize + (rows - 1) * gap

  return (
    <div className="relative min-h-dvh flex flex-col font-sans overflow-hidden game-night bg-game-night-canvas select-none touch-none">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {encounter.settings.background ? (
          <Image
            src={encounter.settings.background}
            alt="Background"
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-950 via-zinc-950 to-black" />
        )}
      </div>

      {/* UI Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-center items-start z-50">
        <div className="flex flex-col gap-2 items-center w-full pointer-events-none">
          {/* Score Display */}
          <div className="flex items-center gap-3 rounded-full border border-game-border bg-game-surface-raised px-4 py-1.5 shadow-lg backdrop-blur-sm">
            <div className="font-mono text-sm font-bold text-game-ink">
              {isEndlessMode ? (
                <>Score: {Math.floor(score)}</>
              ) : (
                <>
                  Score: {Math.floor(score)} / {winScore}
                </>
              )}
            </div>
          </div>
          {/* Combo removed from score bar — see floating overlay below */}
        </div>

        {/* Timer */}
        {encounter.settings.timeLimit && encounter.settings.timeLimit > 0 && (
          <div className="absolute top-4 right-4">
            <GameTimer
              timeLeft={timeLeft}
              totalTime={encounter.settings.timeLimit}
            />
          </div>
        )}
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-16">
        {/* Grid + floating combo overlay */}
        <div className="relative">
          {/* Floating Combo Overlay */}
          {cascadeLevel > 1 && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in zoom-in-75 duration-200">
              <div
                className="bg-game-ochre/90 !text-game-cream text-sm font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase whitespace-nowrap"
                role="status"
                aria-live="polite"
              >
                x{cascadeLevel} COMBO!
              </div>
            </div>
          )}
          {/* Grid */}
          <div
            className="relative rounded-xl overflow-visible shadow-2xl"
            style={{
              width: gridWidth + padding * 2,
              height: gridHeight + padding * 2,
              backgroundColor: `color-mix(in srgb, ${themeColour} 10%, black)`,
              padding: padding,
            }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                gap: gap,
              }}
            >
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const crystal = getCrystal(cell.crystalId)
                  const isSelected =
                    selectedCell?.row === r && selectedCell?.col === c

                  // Calculate swap transform
                  let swapTransform = ''
                  if (swappingCells) {
                    const { from, to } = swappingCells
                    if (from.row === r && from.col === c) {
                      // This cell is moving to the 'to' position
                      const dx = (to.col - from.col) * (cellSize + gap)
                      const dy = (to.row - from.row) * (cellSize + gap)
                      swapTransform = `translate(${dx}px, ${dy}px)`
                    } else if (to.row === r && to.col === c) {
                      // This cell is moving to the 'from' position
                      const dx = (from.col - to.col) * (cellSize + gap)
                      const dy = (from.row - to.row) * (cellSize + gap)
                      swapTransform = `translate(${dx}px, ${dy}px)`
                    }
                  }

                  return (
                    <button
                      key={cell.key}
                      type="button"
                      aria-label={`Crystal ${crystal?.id ?? 'empty'} at row ${r + 1}, column ${c + 1}`}
                      aria-pressed={isSelected}
                      onClick={() => handleCellClick(r, c)}
                      onTouchStart={(e) => handleTouchStart(r, c, e)}
                      onTouchEnd={handleTouchEnd}
                      disabled={isProcessing || gameEnded}
                      className={cn(
                        'relative rounded-lg flex items-center justify-center',
                        'hover:border-game-moss/40 active:opacity-80',
                        cell.isMatched && 'animate-ping opacity-0',
                        isSelected &&
                          'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110',
                      )}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        background: crystal
                          ? `linear-gradient(135deg, 
                            color-mix(in srgb, ${crystal.color} 70%, white) 0%, 
                            ${crystal.color} 30%, 
                            color-mix(in srgb, ${crystal.color} 60%, black) 70%, 
                            color-mix(in srgb, ${crystal.color} 40%, black) 100%)`
                          : 'transparent',
                        boxShadow: crystal
                          ? `inset 2px 2px 4px rgba(255,255,255,0.3), 
                           inset -2px -2px 4px rgba(0,0,0,0.3),
                           0 2px 4px rgba(0,0,0,0.3)`
                          : 'none',
                        border: crystal
                          ? `1px solid color-mix(in srgb, ${crystal.color} 80%, white)`
                          : 'none',
                        transform: swapTransform || undefined,
                        transition: swapTransform
                          ? 'transform 200ms ease-out'
                          : 'all 200ms',
                        zIndex: swapTransform ? 10 : 1,
                      }}
                    >
                      {crystal && (
                        <TaskIconDisplay
                          icon={crystal.icon}
                          className={cn(
                            'w-[80%] h-[80%] transition-transform',
                            cell.isFalling && 'animate-bounce',
                          )}
                        />
                      )}
                    </button>
                  )
                }),
              )}
            </div>
          </div>
          {/* end grid + combo relative wrapper */}
        </div>
      </div>

      {/* Result Overlay */}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser(true, completionInvalidatesRef.current)
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
                    const res = await startGame(
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
