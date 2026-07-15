'use client'

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
import { completeResearchEncounter, startResearchEncounter } from '../actions'

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
  const router = useRouter()

  const { cols, rows } = encounter.settings.gridSize
  const crystalTypes = encounter.settings.crystalTypes
  const pointsPerMatch = encounter.settings.pointsPerMatch || 10
  const cascadeMultiplier = encounter.settings.cascadeMultiplier || 1.5
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
  const [firstMoveMade, setFirstMoveMade] = useState(false) // For endless mode - timer starts after first move
  const [swappingCells, setSwappingCells] = useState<{
    from: { row: number; col: number }
    to: { row: number; col: number }
  } | null>(null)

  const keyCounterRef = useRef(0)
  const scoreRef = useRef(0)
  const gameEndingRef = useRef(false) // Prevent duplicate handleGameEnd calls
  const touchStartRef = useRef<{
    row: number
    col: number
    x: number
    y: number
  } | null>(null)

  // Calculate total spawn weight for weighted random
  const totalSpawnWeight = crystalTypes.reduce(
    (sum, c) => sum + (c.spawnWeight ?? 1),
    0,
  )

  // Generate a random crystal using weighted spawn rates
  const getRandomCrystal = useCallback((): Cell => {
    let random = Math.random() * totalSpawnWeight
    for (const crystal of crystalTypes) {
      const weight = crystal.spawnWeight ?? 1
      if (random < weight) {
        return { crystalId: crystal.id, key: keyCounterRef.current++ }
      }
      random -= weight
    }
    // Fallback to last crystal
    const lastCrystal = crystalTypes[crystalTypes.length - 1]
    return { crystalId: lastCrystal.id, key: keyCounterRef.current++ }
  }, [crystalTypes, totalSpawnWeight])

  // Initialize grid
  const initializeGrid = useCallback((): Cell[][] => {
    const newGrid: Cell[][] = []
    for (let r = 0; r < rows; r++) {
      const row: Cell[] = []
      for (let c = 0; c < cols; c++) {
        let cell = getRandomCrystal()
        // Avoid initial matches of 3+
        while (
          (c >= 2 &&
            row[c - 1].crystalId === cell.crystalId &&
            row[c - 2].crystalId === cell.crystalId) ||
          (r >= 2 &&
            newGrid[r - 1][c].crystalId === cell.crystalId &&
            newGrid[r - 2][c].crystalId === cell.crystalId)
        ) {
          cell = getRandomCrystal()
        }
        row.push(cell)
      }
      newGrid.push(row)
    }
    return newGrid
  }, [rows, cols, getRandomCrystal])

  // Find all matches in the grid
  const findMatches = useCallback(
    (currentGrid: Cell[][]): Set<string> => {
      const matches = new Set<string>()

      // Check horizontal matches
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
          const id = currentGrid[r][c].crystalId
          if (
            id === currentGrid[r][c + 1].crystalId &&
            id === currentGrid[r][c + 2].crystalId
          ) {
            matches.add(`${r},${c}`)
            matches.add(`${r},${c + 1}`)
            matches.add(`${r},${c + 2}`)
            // Check for 4+ matches
            let extend = c + 3
            while (extend < cols && currentGrid[r][extend].crystalId === id) {
              matches.add(`${r},${extend}`)
              extend++
            }
          }
        }
      }

      // Check vertical matches
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
          const id = currentGrid[r][c].crystalId
          if (
            id === currentGrid[r + 1][c].crystalId &&
            id === currentGrid[r + 2][c].crystalId
          ) {
            matches.add(`${r},${c}`)
            matches.add(`${r + 1},${c}`)
            matches.add(`${r + 2},${c}`)
            // Check for 4+ matches
            let extend = r + 3
            while (extend < rows && currentGrid[extend][c].crystalId === id) {
              matches.add(`${extend},${c}`)
              extend++
            }
          }
        }
      }

      return matches
    },
    [rows, cols],
  )

  // Check if any valid moves exist
  const hasValidMoves = useCallback(
    (currentGrid: Cell[][]): boolean => {
      // Try all possible swaps
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Try swap right
          if (c < cols - 1) {
            const testGrid = currentGrid.map((row) => [...row])
            const temp = testGrid[r][c]
            testGrid[r][c] = testGrid[r][c + 1]
            testGrid[r][c + 1] = temp
            if (findMatches(testGrid).size > 0) return true
          }
          // Try swap down
          if (r < rows - 1) {
            const testGrid = currentGrid.map((row) => [...row])
            const temp = testGrid[r][c]
            testGrid[r][c] = testGrid[r + 1][c]
            testGrid[r + 1][c] = temp
            if (findMatches(testGrid).size > 0) return true
          }
        }
      }
      return false
    },
    [rows, cols, findMatches],
  )

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
    const res = await completeResearchEncounter(
      encounter.id,
      isSuccess,
      finalScore,
    )

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

  // Process matches and cascades
  const processMatches = useCallback(
    async (currentGrid: Cell[][], level: number = 0) => {
      if (gameEndingRef.current) return

      const matches = findMatches(currentGrid)

      if (matches.size === 0) {
        setCascadeLevel(0)
        setIsProcessing(false)

        // Check for valid moves - if none, reshuffle the board
        if (!hasValidMoves(currentGrid)) {
          // Reset the board with new crystals
          setGrid(initializeGrid())
        }
        return
      }

      // In endless mode, reset the turn timer when a match is made (only on first level, not cascades)
      if (isEndlessMode && level === 0 && encounter.settings.timeLimit) {
        if (!firstMoveMade) {
          setFirstMoveMade(true)
        }
        setTimeLeft(encounter.settings.timeLimit)
      }

      // Calculate points with cascade multiplier and per-crystal points
      const multiplier = level > 0 ? cascadeMultiplier ** level : 1
      // Sum up points for each matched crystal (using per-crystal points or default)
      let basePoints = 0
      matches.forEach((pos) => {
        const [r, c] = pos.split(',').map(Number)
        const cell = currentGrid[r]?.[c]
        if (cell) {
          const crystalType = crystalTypes.find(
            (ct) => ct.id === cell.crystalId,
          )
          basePoints += crystalType?.points ?? pointsPerMatch
        }
      })
      const points = Math.floor(basePoints * multiplier)
      const newScore = scoreRef.current + points
      scoreRef.current = newScore
      setScore(newScore)

      if (!isEndlessMode && winScore && newScore >= winScore) {
        void handleGameEnd()
        return
      }

      // Mark matched cells
      const markedGrid = currentGrid.map((row, r) =>
        row.map((cell, c) => ({
          ...cell,
          isMatched: matches.has(`${r},${c}`),
        })),
      )
      setGrid(markedGrid)
      setCascadeLevel(level + 1)

      // Wait for match animation
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Remove matched cells and apply gravity
      const afterRemoval = markedGrid.map((row) =>
        row.map((cell) => (cell.isMatched ? null : cell)),
      ) as (Cell | null)[][]

      // Apply gravity - move cells down
      for (let c = 0; c < cols; c++) {
        const column: (Cell | null)[] = []
        for (let r = rows - 1; r >= 0; r--) {
          if (afterRemoval[r][c] !== null) {
            column.push(afterRemoval[r][c])
          }
        }
        // Fill from bottom
        for (let r = rows - 1; r >= 0; r--) {
          afterRemoval[r][c] = column[rows - 1 - r] || null
        }
      }

      // Fill empty cells with new crystals
      const filledGrid = afterRemoval.map((row) =>
        row.map((cell) => cell || getRandomCrystal()),
      ) as Cell[][]

      setGrid(filledGrid)

      // Wait for fall animation
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Recursively process new matches (cascade)
      void processMatches(filledGrid, level + 1)
    },
    [
      findMatches,
      hasValidMoves,
      cascadeMultiplier,
      pointsPerMatch,
      cols,
      rows,
      getRandomCrystal,
      isEndlessMode,
      winScore,
      handleGameEnd,
      firstMoveMade,
      encounter.settings.timeLimit,
      initializeGrid,
    ],
  )

  // Handle cell selection and swap
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (isProcessing || gameEnded) return

      if (!selectedCell) {
        setSelectedCell({ row, col })
        return
      }

      // Check if adjacent
      const dr = Math.abs(selectedCell.row - row)
      const dc = Math.abs(selectedCell.col - col)
      const isAdjacent = (dr === 1 && dc === 0) || (dr === 0 && dc === 1)

      if (!isAdjacent) {
        // Select new cell instead
        setSelectedCell({ row, col })
        return
      }

      // Start visual swap animation
      const startRow = selectedCell.row
      const startCol = selectedCell.col
      setSwappingCells({
        from: { row: startRow, col: startCol },
        to: { row, col },
      })
      setIsProcessing(true)

      // After animation, perform actual swap
      setTimeout(() => {
        setSwappingCells(null)
        const newGrid = grid.map((r) => [...r])
        const temp = newGrid[startRow][startCol]
        newGrid[startRow][startCol] = newGrid[row][col]
        newGrid[row][col] = temp

        // Check if swap creates a match
        const matches = findMatches(newGrid)
        if (matches.size === 0) {
          // Swap back with animation
          setSwappingCells({
            from: { row, col },
            to: { row: startRow, col: startCol },
          })
          setTimeout(() => {
            setSwappingCells(null)
            setIsProcessing(false)
          }, 200)
        } else {
          setGrid(newGrid)
          processMatches(newGrid, 0)
        }
        setSelectedCell(null)
      }, 200)
    },
    [selectedCell, grid, isProcessing, gameEnded, findMatches, processMatches],
  )

  // Handle swipe - perform swap based on swipe direction
  const handleSwipeSwap = useCallback(
    (startRow: number, startCol: number, endRow: number, endCol: number) => {
      if (isProcessing || gameEnded) return
      // Only allow adjacent swaps
      const dr = endRow - startRow
      const dc = endCol - startCol
      if (Math.abs(dr) + Math.abs(dc) !== 1) return

      // Start visual swap animation
      setSwappingCells({
        from: { row: startRow, col: startCol },
        to: { row: endRow, col: endCol },
      })
      setIsProcessing(true)

      // After animation, perform actual swap
      setTimeout(() => {
        setSwappingCells(null)
        const newGrid = grid.map((r) => [...r])
        const temp = newGrid[startRow][startCol]
        newGrid[startRow][startCol] = newGrid[endRow][endCol]
        newGrid[endRow][endCol] = temp

        // Check if swap creates a match
        const matches = findMatches(newGrid)
        if (matches.size === 0) {
          // Swap back with animation
          setSwappingCells({
            from: { row: endRow, col: endCol },
            to: { row: startRow, col: startCol },
          })
          setTimeout(() => {
            setSwappingCells(null)
            setIsProcessing(false)
          }, 200)
        } else {
          setGrid(newGrid)
          processMatches(newGrid, 0)
        }
        setSelectedCell(null)
      }, 200)
    },
    [grid, isProcessing, gameEnded, findMatches, processMatches],
  )

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

  // Initialize game
  const initGame = useCallback(async () => {
    const res = await startResearchEncounter(encounter.id)
    if (!res.success) {
      console.error('Failed to start:', res.error)
      return
    }

    setGrid(initializeGrid())
    setScore(0)
    scoreRef.current = 0
    setGameStarted(true)
    setGameEnded(false)
    gameEndingRef.current = false
    setResult(null)
    setSelectedCell(null)
    setIsProcessing(false)
    setCascadeLevel(0)

    if (res.restored && res.expiry) {
      const remaining = Math.max(
        0,
        Math.floor((res.expiry - Date.now()) / 1000),
      )
      setTimeLeft(remaining)
    } else {
      setTimeLeft(encounter.settings.timeLimit || 0)
    }
  }, [encounter.id, encounter.settings.timeLimit, initializeGrid])

  useEffect(() => {
    if (!gameStarted) initGame()
  }, [gameStarted, initGame])

  // Timer
  useEffect(() => {
    // In endless mode, don't start timer until first move is made
    if (
      !gameStarted ||
      gameEnded ||
      !encounter.settings.timeLimit ||
      timeLeft <= 0
    )
      return
    if (isEndlessMode && !firstMoveMade) return
    // Pause timer during cascade processing so player doesn't lose during chains
    if (isProcessing) return

    const timer = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          handleGameEnd()
          return 0
        }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [
    gameStarted,
    gameEnded,
    timeLeft,
    encounter.settings.timeLimit,
    isEndlessMode,
    firstMoveMade,
    isProcessing,
    handleGameEnd,
  ])

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
