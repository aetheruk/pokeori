'use client'

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleDot,
  Footprints,
  RefreshCw,
  Undo2,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  RockPushGameConfig,
  RockPushScreenConfig,
} from '@/data/games/rock-push/types'
import { getIcon } from '@/data/user'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import {
  getRockPushPositionKey,
  getRockPushPrizeId,
  getRockPushPrizeReward,
  getRockPushScopedPrizeId,
} from '@/utilities/research/rock-push'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'
import { EndlessCollectibleSprite } from './endless-collectibles'

interface RockPushGameProps {
  encounter: RockPushGameConfig
  initialState?: any
}

type CellType = 'empty' | 'wall' | 'hole' | 'filled' | 'ice'

interface Position {
  x: number
  y: number
}

interface RockState extends Position {
  id: string
}

interface MoveSnapshot {
  activeScreenId: string
  screenStates: Record<string, ScreenRuntimeState>
  grid: CellType[][]
  rocks: RockState[]
  playerPos: Position
  rocksSolved: number
  moves: number
  collectedPrizeIds: string[]
}

interface ScreenRuntimeState {
  id: string
  grid: CellType[][]
  rocks: RockState[]
  rocksSolved: number
  gridSize: { w: number; h: number }
}

interface SlideResult {
  position: Position
  path: Position[]
}

interface MovementDurations {
  player: number
  rocks: Record<string, number>
}

const cloneGrid = (source: CellType[][]) => source.map((row) => [...row])

const cloneRocks = (source: RockState[]) => source.map((rock) => ({ ...rock }))

const cloneScreenStates = (source: Record<string, ScreenRuntimeState>) =>
  Object.fromEntries(
    Object.entries(source).map(([screenId, state]) => [
      screenId,
      {
        ...state,
        grid: cloneGrid(state.grid),
        rocks: cloneRocks(state.rocks),
        gridSize: { ...state.gridSize },
      },
    ]),
  )

const blockerCells: CellType[] = ['wall']
const defaultMoveDurationMs = 150

const isSamePosition = (a: Position, b: Position) => a.x === b.x && a.y === b.y

const getTileDistance = (from: Position, to: Position) =>
  Math.abs(from.x - to.x) + Math.abs(from.y - to.y)

const getSlideDuration = (from: Position, to: Position) => {
  const distance = getTileDistance(from, to)
  if (distance <= 1) return defaultMoveDurationMs
  return Math.min(720, 110 + distance * 95)
}

const detectDeadlockedRocks = (grid: CellType[][], rocks: RockState[]) => {
  const blocked = (x: number, y: number) =>
    y < 0 ||
    y >= grid.length ||
    x < 0 ||
    x >= (grid[0]?.length || 0) ||
    blockerCells.includes(grid[y][x])

  return new Set(
    rocks
      .filter((rock) => {
        if (grid[rock.y]?.[rock.x] === 'hole') return false

        const verticalBlocked =
          blocked(rock.x, rock.y - 1) || blocked(rock.x, rock.y + 1)
        const horizontalBlocked =
          blocked(rock.x - 1, rock.y) || blocked(rock.x + 1, rock.y)
        return verticalBlocked && horizontalBlocked
      })
      .map((rock) => rock.id),
  )
}

const getRockPushScreens = (
  settings: RockPushGameConfig['settings'],
): RockPushScreenConfig[] => {
  if (settings.screens?.length) return settings.screens

  return [
    {
      id: 'main',
      grid_size: settings.grid_size,
      boulders: settings.boulders || [],
      holes: settings.holes || [],
      barriers: settings.barriers || [],
      ice: settings.ice || [],
      winTiles: settings.winTiles || [],
      teleporters: settings.teleporters || [],
      prizes: settings.prizes || [],
    },
  ]
}

const buildScreenRuntimeState = (
  screen: RockPushScreenConfig,
  fallbackGridSize: number,
): ScreenRuntimeState => {
  const size = screen.grid_size || fallbackGridSize || 8
  const authoredGrid: CellType[][] = []

  for (let y = 0; y < size; y++) {
    const row: CellType[] = []
    for (let x = 0; x < size; x++) {
      row.push(
        x === 0 || x === size - 1 || y === 0 || y === size - 1
          ? 'wall'
          : 'empty',
      )
    }
    authoredGrid.push(row)
  }

  for (const barrier of screen.barriers || []) {
    if (authoredGrid[barrier.y]?.[barrier.x]) {
      authoredGrid[barrier.y][barrier.x] = 'wall'
    }
  }

  for (const ice of screen.ice || []) {
    if (authoredGrid[ice.y]?.[ice.x] === 'empty') {
      authoredGrid[ice.y][ice.x] = 'ice'
    }
  }

  for (const hole of screen.holes || []) {
    if (authoredGrid[hole.y]?.[hole.x] !== 'wall') {
      authoredGrid[hole.y][hole.x] = 'hole'
    }
  }

  return {
    id: screen.id,
    grid: authoredGrid,
    rocks: (screen.boulders || []).map((rock, index) => ({
      id: `${screen.id}-rock-${index}`,
      ...rock,
    })),
    rocksSolved: 0,
    gridSize: { w: size, h: size },
  }
}

export function RockPushGame({ encounter, initialState }: RockPushGameProps) {
  useGameMusic(encounter)
  const { user, refreshUser } = useUser()
  const { playSfx } = useAudio()
  const router = useRouter()
  const screenConfigs = useMemo(
    () => getRockPushScreens(encounter.settings),
    [encounter.settings],
  )
  const hasAuthoredScreens = !!encounter.settings.screens?.length

  // Game State
  const [activeScreenId, setActiveScreenId] = useState(
    encounter.settings.startScreen || screenConfigs[0]?.id || 'main',
  )
  const [screenStates, setScreenStates] = useState<
    Record<string, ScreenRuntimeState>
  >({})
  const [grid, setGrid] = useState<CellType[][]>([])
  const [rocks, setRocks] = useState<RockState[]>([])
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 })
  const [gridSize, setGridSize] = useState({ w: 8, h: 8 }) // Fixed size for now
  const [facing, setFacing] = useState<'up' | 'down' | 'left' | 'right'>('down')
  const [history, setHistory] = useState<MoveSnapshot[]>([])
  const [blockedOffset, setBlockedOffset] = useState<Position | null>(null)
  const [fallingRock, setFallingRock] = useState<RockState | null>(null)
  const [pushedRockId, setPushedRockId] = useState<string | null>(null)
  const [isSliding, setIsSliding] = useState(false)
  const [movementDurations, setMovementDurations] = useState<MovementDurations>(
    {
      player: defaultMoveDurationMs,
      rocks: {},
    },
  )
  const [deadlockedRockIds, setDeadlockedRockIds] = useState<Set<string>>(
    new Set(),
  )
  const [collectedPrizeIds, setCollectedPrizeIds] = useState<Set<string>>(
    new Set(),
  )
  const blockedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slidingRef = useRef(false)

  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const [rocksSolved, setRocksSolved] = useState(0)
  const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 120)
  const [moves, setMoves] = useState(0)
  const [maxMoves, setMaxMoves] = useState<number | null>(null)
  const totalRocks = screenConfigs.reduce(
    (sum, screen) => sum + (screen.holes || []).length,
    0,
  )
  const activeScreenConfig =
    screenConfigs.find((screen) => screen.id === activeScreenId) ||
    screenConfigs[0]
  const prizes = activeScreenConfig?.prizes || []
  const teleporters = activeScreenConfig?.teleporters || []
  const winTiles = activeScreenConfig?.winTiles || []
  const displayRocksSolved = Object.entries(screenStates).reduce(
    (sum, [screenId, state]) =>
      sum + (screenId === activeScreenId ? rocksSolved : state.rocksSolved),
    0,
  )

  // Resolve Player Icon
  const currentIcon = getIcon(user?.icon || 'ditto')
  const iconData = currentIcon?.icon || { type: 'pokemon', id: '132' }

  // Initialize Game Logic
  const initGame = useCallback(async () => {
    const res = await startResearchEncounter(encounter.id)
    if (!res.success) {
      console.error('Failed to start:', res.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setResult(null)
    setMoves(0)
    setRocksSolved(0) // Reset logical progress for the puzzle
    setHistory([])
    setBlockedOffset(null)
    setFallingRock(null)
    setPushedRockId(null)
    setIsSliding(false)
    slidingRef.current = false
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current)
    setMovementDurations({
      player: defaultMoveDurationMs,
      rocks: {},
    })
    setCollectedPrizeIds(new Set())

    if (res.restored && res.expiry) {
      const remaining = Math.max(
        0,
        Math.floor((res.expiry - Date.now()) / 1000),
      )
      setTimeLeft(remaining)
    } else {
      setTimeLeft(encounter.settings.timeLimit || 120)
    }

    const nextScreenStates = Object.fromEntries(
      screenConfigs.map((screen) => [
        screen.id,
        buildScreenRuntimeState(screen, encounter.settings.grid_size || 8),
      ]),
    )
    const startScreenId =
      encounter.settings.startScreen &&
      nextScreenStates[encounter.settings.startScreen]
        ? encounter.settings.startScreen
        : screenConfigs[0]?.id || 'main'
    const startScreen = nextScreenStates[startScreenId]

    setScreenStates(nextScreenStates)
    setActiveScreenId(startScreenId)
    setGrid(startScreen?.grid || [])
    setRocks(startScreen?.rocks || [])
    setPlayerPos({ ...encounter.settings.playerStart })
    setGridSize(startScreen?.gridSize || { w: 8, h: 8 })
    setDeadlockedRockIds(
      detectDeadlockedRocks(startScreen?.grid || [], startScreen?.rocks || []),
    )

    if (encounter.settings.maxMoves) {
      setMaxMoves(encounter.settings.maxMoves)
    } else {
      setMaxMoves(null)
    }
  }, [encounter, screenConfigs])

  useEffect(() => {
    if (!gameStarted) initGame()
  }, [gameStarted, initGame])

  // Timer
  useEffect(() => {
    if (!gameStarted || gameEnded || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) {
          setGameEnded(true)
          setResult({ success: false, message: 'Time up!' })
          return 0
        }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStarted, gameEnded, timeLeft])

  const handleWin = async (prizeIds = collectedPrizeIds) => {
    playSfx('good')
    setGameEnded(true)
    // Submit final answer to verify
    await submitResearchAnswer(true)
    const res = await completeResearchEncounter(
      encounter.id,
      true,
      undefined,
      undefined,
      undefined,
      Array.from(prizeIds),
    )

    setResult({
      success: true,
      message: 'Level Complete!',
      rewards: res.summary,
    })
  }

  const handleLoss = async (message = 'Max moves exceeded!') => {
    playSfx('bad')
    setGameEnded(true)
    // Submit loss to clean up server state
    await submitResearchAnswer(false)
    await completeResearchEncounter(encounter.id, false)

    setResult({
      success: false,
      message,
      rewards: undefined, // No rewards on loss
    })
  }

  const signalBlocked = (dx: number, dy: number) => {
    if (blockedTimerRef.current) clearTimeout(blockedTimerRef.current)
    setBlockedOffset({ x: dx * 8, y: dy * 8 })
    blockedTimerRef.current = setTimeout(() => setBlockedOffset(null), 90)
  }

  const lockSlidingInput = (durationMs: number) => {
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current)
    slidingRef.current = true
    setIsSliding(true)
    slideTimerRef.current = setTimeout(() => {
      slidingRef.current = false
      setIsSliding(false)
    }, durationMs)
  }

  const setMoveDurations = ({
    playerFrom,
    playerTo,
    rockId,
    rockFrom,
    rockTo,
  }: {
    playerFrom: Position
    playerTo: Position
    rockId?: string
    rockFrom?: Position
    rockTo?: Position
  }) => {
    const playerDuration = getSlideDuration(playerFrom, playerTo)
    const rockDuration =
      rockFrom && rockTo ? getSlideDuration(rockFrom, rockTo) : 0
    const maxDuration = Math.max(playerDuration, rockDuration)

    setMovementDurations({
      player: playerDuration,
      rocks: rockId && rockDuration ? { [rockId]: rockDuration } : {},
    })
    lockSlidingInput(maxDuration)
    return maxDuration
  }

  const saveSnapshot = () => {
    setHistory((prev) => [
      ...prev.slice(-59),
      {
        activeScreenId,
        screenStates: {
          ...cloneScreenStates(screenStates),
          [activeScreenId]: {
            id: activeScreenId,
            grid: cloneGrid(grid),
            rocks: cloneRocks(rocks),
            rocksSolved,
            gridSize: { ...gridSize },
          },
        },
        grid: cloneGrid(grid),
        rocks: cloneRocks(rocks),
        playerPos: { ...playerPos },
        rocksSolved,
        moves,
        collectedPrizeIds: Array.from(collectedPrizeIds),
      },
    ])
  }

  const getCollectedPrizeIdsAfterMove = (
    positions: Position | Position[],
    screenId = activeScreenId,
    baseCollected = collectedPrizeIds,
  ) => {
    const nextCollected = new Set(baseCollected)
    const path = Array.isArray(positions) ? positions : [positions]
    const screen = screenConfigs.find((entry) => entry.id === screenId)
    const screenPrizes = screen?.prizes || []

    for (const position of path) {
      const prizeIndex = screenPrizes.findIndex((prize, index) => {
        const prizeId = hasAuthoredScreens
          ? getRockPushScopedPrizeId(prize, index, screenId)
          : getRockPushPrizeId(prize, index)
        return !nextCollected.has(prizeId) && isSamePosition(prize, position)
      })

      if (prizeIndex !== -1) {
        const prize = screenPrizes[prizeIndex]
        nextCollected.add(
          hasAuthoredScreens
            ? getRockPushScopedPrizeId(prize, prizeIndex, screenId)
            : getRockPushPrizeId(prize, prizeIndex),
        )
      }
    }

    return nextCollected
  }

  const isBlockedForPlayer = (position: Position, rockList = rocks) =>
    position.x < 0 ||
    position.x >= gridSize.w ||
    position.y < 0 ||
    position.y >= gridSize.h ||
    grid[position.y][position.x] === 'wall' ||
    grid[position.y][position.x] === 'hole' ||
    rockList.some((rock) => isSamePosition(rock, position))

  const isBlockedCellForPlayer = (position: Position) =>
    position.x < 0 ||
    position.x >= gridSize.w ||
    position.y < 0 ||
    position.y >= gridSize.h ||
    grid[position.y][position.x] === 'wall' ||
    grid[position.y][position.x] === 'hole'

  const isBlockedForRock = (
    position: Position,
    ignoredRockId: string,
    rockList = rocks,
  ) =>
    position.x < 0 ||
    position.x >= gridSize.w ||
    position.y < 0 ||
    position.y >= gridSize.h ||
    grid[position.y][position.x] === 'wall' ||
    rockList.some(
      (rock) => rock.id !== ignoredRockId && isSamePosition(rock, position),
    )

  const getPlayerSlide = (
    start: Position,
    dx: number,
    dy: number,
    rockList = rocks,
  ): SlideResult => {
    const path: Position[] = [start]
    let current = start

    while (grid[current.y]?.[current.x] === 'ice') {
      const next = { x: current.x + dx, y: current.y + dy }
      if (isBlockedForPlayer(next, rockList)) {
        return { position: current, path }
      }

      path.push(next)
      current = next
      if (grid[current.y]?.[current.x] !== 'ice') break
    }

    return { position: current, path }
  }

  const getRockSlide = (
    start: Position,
    dx: number,
    dy: number,
    ignoredRockId: string,
    rockList = rocks,
  ): SlideResult => {
    const path: Position[] = [start]
    let current = start

    while (grid[current.y]?.[current.x] === 'ice') {
      const next = { x: current.x + dx, y: current.y + dy }
      if (isBlockedForRock(next, ignoredRockId, rockList)) {
        return { position: current, path }
      }

      path.push(next)
      current = next
      if (grid[current.y]?.[current.x] !== 'ice') break
    }

    return { position: current, path }
  }

  const applyCollectedPrizeIds = (nextCollected: Set<string>) => {
    if (nextCollected.size > collectedPrizeIds.size) {
      playSfx('select')
    }
    setCollectedPrizeIds(nextCollected)
  }

  const getScopedPrizeId = (
    prize: (typeof prizes)[number],
    index: number,
    screenId = activeScreenId,
  ) =>
    hasAuthoredScreens
      ? getRockPushScopedPrizeId(prize, index, screenId)
      : getRockPushPrizeId(prize, index)

  const isWinTile = (position: Position, screenId = activeScreenId) => {
    const screen = screenConfigs.find((entry) => entry.id === screenId)
    return (screen?.winTiles || []).some((tile) =>
      isSamePosition(tile, position),
    )
  }

  const pathTouchesWinTile = (path: Position[], screenId = activeScreenId) =>
    path.some((position) => isWinTile(position, screenId))

  const getSolvedRockTotal = (
    nextScreenStates = screenStates,
    nextActiveSolved = rocksSolved,
    nextActiveScreenId = activeScreenId,
  ) =>
    Object.entries(nextScreenStates).reduce(
      (sum, [screenId, state]) =>
        sum +
        (screenId === nextActiveScreenId
          ? nextActiveSolved
          : state.rocksSolved),
      0,
    )

  const getTeleportTarget = (
    position: Position,
    rockList = rocks,
    originGrid = grid,
    originScreenId = activeScreenId,
  ) => {
    const screen = screenConfigs.find((entry) => entry.id === originScreenId)
    const teleporter = (screen?.teleporters || []).find((entry) =>
      isSamePosition(entry, position),
    )
    if (!teleporter) return null

    const targetScreenId = teleporter.target.screen || originScreenId
    const targetState =
      targetScreenId === originScreenId
        ? {
            id: originScreenId,
            grid: originGrid,
            rocks: rockList,
            rocksSolved,
            gridSize,
          }
        : screenStates[targetScreenId]
    if (!targetState) return null

    const targetPosition = { x: teleporter.target.x, y: teleporter.target.y }
    const targetCell = targetState.grid[targetPosition.y]?.[targetPosition.x]
    const targetBlocked =
      !targetCell ||
      targetCell === 'wall' ||
      targetCell === 'hole' ||
      targetState.rocks.some((rock) => isSamePosition(rock, targetPosition))

    if (targetBlocked) return null
    return { screenId: targetScreenId, position: targetPosition }
  }

  const applyTeleport = (
    target: { screenId: string; position: Position },
    originState: ScreenRuntimeState,
    prizeIds: Set<string>,
  ) => {
    const nextScreenStates = {
      ...screenStates,
      [activeScreenId]: {
        ...originState,
        grid: cloneGrid(originState.grid),
        rocks: cloneRocks(originState.rocks),
      },
    }
    const targetState =
      target.screenId === activeScreenId
        ? originState
        : nextScreenStates[target.screenId]
    if (!targetState) return

    setScreenStates(nextScreenStates)
    setActiveScreenId(target.screenId)
    setGrid(cloneGrid(targetState.grid))
    setRocks(cloneRocks(targetState.rocks))
    setRocksSolved(targetState.rocksSolved)
    setGridSize({ ...targetState.gridSize })
    setPlayerPos({ ...target.position })
    setMovementDurations({
      player: defaultMoveDurationMs,
      rocks: {},
    })
    setDeadlockedRockIds(
      detectDeadlockedRocks(targetState.grid, targetState.rocks),
    )

    const targetCollected = getCollectedPrizeIdsAfterMove(
      target.position,
      target.screenId,
      prizeIds,
    )
    applyCollectedPrizeIds(targetCollected)

    if (isWinTile(target.position, target.screenId)) {
      setTimeout(() => handleWin(targetCollected), defaultMoveDurationMs)
    }
  }

  const undoMove = () => {
    if (gameEnded || isSliding || history.length === 0) return
    const snapshot = history[history.length - 1]
    playSfx('select')
    setHistory((prev) => prev.slice(0, -1))
    setActiveScreenId(snapshot.activeScreenId)
    setScreenStates(cloneScreenStates(snapshot.screenStates))
    setGrid(cloneGrid(snapshot.grid))
    setRocks(cloneRocks(snapshot.rocks))
    setPlayerPos({ ...snapshot.playerPos })
    setRocksSolved(snapshot.rocksSolved)
    setMoves(snapshot.moves)
    setGridSize(
      snapshot.screenStates[snapshot.activeScreenId]?.gridSize || gridSize,
    )
    setFallingRock(null)
    setBlockedOffset(null)
    setPushedRockId(null)
    setMovementDurations({
      player: defaultMoveDurationMs,
      rocks: {},
    })
    setCollectedPrizeIds(new Set(snapshot.collectedPrizeIds))
    setDeadlockedRockIds(detectDeadlockedRocks(snapshot.grid, snapshot.rocks))
  }

  const move = async (dx: number, dy: number) => {
    if (gameEnded || slidingRef.current) return

    // Update facing
    if (dy < 0) setFacing('up')
    else if (dy > 0) setFacing('down')
    else if (dx < 0) setFacing('left')
    else if (dx > 0) setFacing('right')

    const nextPlayerPos = { x: playerPos.x + dx, y: playerPos.y + dy }

    if (isBlockedCellForPlayer(nextPlayerPos)) {
      signalBlocked(dx, dy)
      return
    }

    const rockIndex = rocks.findIndex((r) => isSamePosition(r, nextPlayerPos))

    if (rockIndex !== -1) {
      const rock = rocks[rockIndex]
      const initialRockPos = { x: rock.x + dx, y: rock.y + dy }

      if (isBlockedForRock(initialRockPos, rock.id)) {
        signalBlocked(dx, dy)
        return
      }

      const rockSlide = getRockSlide(initialRockPos, dx, dy, rock.id)
      setBlockedOffset(null)
      saveSnapshot()
      setPushedRockId(rock.id)
      if (pushTimerRef.current) clearTimeout(pushTimerRef.current)
      pushTimerRef.current = setTimeout(() => setPushedRockId(null), 160)

      if (grid[rockSlide.position.y][rockSlide.position.x] === 'hole') {
        playSfx('good')
        const movingRocks = [...rocks]
        movingRocks[rockIndex] = {
          ...rock,
          ...rockSlide.position,
        }
        setRocks(movingRocks)

        // Move player
        const playerSlide = getPlayerSlide(nextPlayerPos, dx, dy, movingRocks)
        const movedPlayerPos = playerSlide.position
        const moveDuration = setMoveDurations({
          playerFrom: playerPos,
          playerTo: movedPlayerPos,
          rockId: rock.id,
          rockFrom: rock,
          rockTo: rockSlide.position,
        })
        const nextCollectedPrizeIds = getCollectedPrizeIdsAfterMove(
          playerSlide.path,
        )
        const winsByTile = pathTouchesWinTile(playerSlide.path)
        setPlayerPos(movedPlayerPos)
        applyCollectedPrizeIds(nextCollectedPrizeIds)
        const nextMoves = moves + 1
        setMoves(nextMoves)

        if (winsByTile) {
          setTimeout(() => handleWin(nextCollectedPrizeIds), moveDuration)
          return
        }

        setTimeout(() => {
          setFallingRock({ ...rock, ...rockSlide.position })
          setTimeout(() => setFallingRock(null), 240)
          const newRocks = [...rocks]
          newRocks.splice(rockIndex, 1) // Remove rock
          setRocks(newRocks)

          // Update Wins
          const newSolved = rocksSolved + 1
          setRocksSolved(newSolved)

          // Generate new grid with filled hole
          const newGrid = grid.map((row) => [...row])
          newGrid[rockSlide.position.y][rockSlide.position.x] = 'filled'
          setGrid(newGrid)
          setDeadlockedRockIds(detectDeadlockedRocks(newGrid, newRocks))
          const nextScreenStates = {
            ...screenStates,
            [activeScreenId]: {
              id: activeScreenId,
              grid: newGrid,
              rocks: newRocks,
              rocksSolved: newSolved,
              gridSize,
            },
          }

          if (maxMoves && nextMoves > maxMoves) {
            handleLoss()
            return
          }

          // Check Win
          if (
            totalRocks > 0 &&
            getSolvedRockTotal(nextScreenStates, newSolved) >= totalRocks
          ) {
            handleWin(nextCollectedPrizeIds)
          }
        }, moveDuration)
      } else {
        const newRocks = [...rocks]
        newRocks[rockIndex] = {
          ...rock,
          ...rockSlide.position,
        }
        setRocks(newRocks)
        const playerSlide = getPlayerSlide(nextPlayerPos, dx, dy, newRocks)
        const movedPlayerPos = playerSlide.position
        const moveDuration = setMoveDurations({
          playerFrom: playerPos,
          playerTo: movedPlayerPos,
          rockId: rock.id,
          rockFrom: rock,
          rockTo: rockSlide.position,
        })
        const nextCollectedPrizeIds = getCollectedPrizeIdsAfterMove(
          playerSlide.path,
        )
        const winsByTile = pathTouchesWinTile(playerSlide.path)
        const teleportTarget = getTeleportTarget(movedPlayerPos, newRocks, grid)
        setPlayerPos(movedPlayerPos)
        applyCollectedPrizeIds(nextCollectedPrizeIds)
        setDeadlockedRockIds(detectDeadlockedRocks(grid, newRocks))
        const nextMoves = moves + 1
        setMoves(nextMoves)

        if (winsByTile) {
          setTimeout(() => handleWin(nextCollectedPrizeIds), moveDuration)
          return
        }

        if (maxMoves && nextMoves > maxMoves) {
          setTimeout(() => handleLoss(), moveDuration)
          return
        }

        if (teleportTarget) {
          setTimeout(
            () =>
              applyTeleport(
                teleportTarget,
                {
                  id: activeScreenId,
                  grid,
                  rocks: newRocks,
                  rocksSolved,
                  gridSize,
                },
                nextCollectedPrizeIds,
              ),
            moveDuration,
          )
        }
      }
    } else {
      const playerSlide = getPlayerSlide(nextPlayerPos, dx, dy)
      setBlockedOffset(null)
      saveSnapshot()
      const movedPlayerPos = playerSlide.position
      const moveDuration = setMoveDurations({
        playerFrom: playerPos,
        playerTo: movedPlayerPos,
      })
      const nextCollectedPrizeIds = getCollectedPrizeIdsAfterMove(
        playerSlide.path,
      )
      const winsByTile = pathTouchesWinTile(playerSlide.path)
      const teleportTarget = getTeleportTarget(movedPlayerPos, rocks, grid)
      setPlayerPos(movedPlayerPos)
      applyCollectedPrizeIds(nextCollectedPrizeIds)
      const nextMoves = moves + 1
      setMoves(nextMoves)

      if (winsByTile) {
        setTimeout(() => handleWin(nextCollectedPrizeIds), moveDuration)
        return
      }

      if (maxMoves && nextMoves > maxMoves) {
        setTimeout(() => handleLoss(), moveDuration)
        return
      }

      if (teleportTarget) {
        setTimeout(
          () =>
            applyTeleport(
              teleportTarget,
              {
                id: activeScreenId,
                grid,
                rocks,
                rocksSolved,
                gridSize,
              },
              nextCollectedPrizeIds,
            ),
          moveDuration,
        )
      }
    }
  }

  // Key Listeners
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w'].includes(e.key)) {
        e.preventDefault()
        move(0, -1)
      }
      if (['ArrowDown', 's'].includes(e.key)) {
        e.preventDefault()
        move(0, 1)
      }
      if (['ArrowLeft', 'a'].includes(e.key)) {
        e.preventDefault()
        move(-1, 0)
      }
      if (['ArrowRight', 'd'].includes(e.key)) {
        e.preventDefault()
        move(1, 0)
      }
      if (e.key.toLowerCase() === 'z') {
        e.preventDefault()
        undoMove()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPos, rocks, gameEnded, history])

  const floorSprite =
    encounter.settings.floorSprite || '/games/rockpush/floor.avif'
  const iceSprite = encounter.settings.iceSprite || '/games/rockpush/ice.avif'
  const barrierSprite =
    encounter.settings.barrierSprite || '/games/rockpush/barrier.avif'
  const boulderSprite =
    encounter.settings.boulderSprite || '/games/rockpush/boulder.avif'
  const holeSprite =
    encounter.settings.holeSprite || '/games/rockpush/hole.avif'
  const filledHoleSprite =
    encounter.settings.filledHoleSprite || '/games/rockpush/filled-hole.avif'
  const winTileSprite =
    encounter.settings.winTileSprite || '/games/rockpush/win-tile.png'
  const teleporterSprite =
    encounter.settings.teleporterSprite || '/games/rockpush/teleporter.png'
  const cellWidth = `${100 / Math.max(gridSize.w, 1)}%`
  const cellHeight = `${100 / Math.max(gridSize.h, 1)}%`
  const entityStyle = (
    position: Position,
    extraTransform = '',
    transitionDurationMs = defaultMoveDurationMs,
  ) => ({
    width: cellWidth,
    height: cellHeight,
    transform: `translate(${position.x * 100}%, ${position.y * 100}%)${extraTransform}`,
    transitionDuration: `${transitionDurationMs}ms`,
  })

  return (
    <div className="relative min-h-dvh flex flex-col font-sans overflow-hidden game-night bg-game-night-canvas">
      <style jsx global>{`
        @keyframes rock-push-drop {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: brightness(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(0.28) translateY(10%);
            filter: brightness(0.55);
          }
        }

        @keyframes rock-push-warning {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.85;
          }
        }
      `}</style>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh w-full p-4">
        {/* Header Stats / Chips */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-row gap-3 z-50 pointer-events-none">
          {/* Rocks Chip */}
          <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm">
            <CircleDot className="h-3 w-3 text-game-moss" />
            <span>
              {displayRocksSolved} / {totalRocks}
            </span>
          </div>

          {/* Moves Chip */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1 text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm transition-colors',
              maxMoves && moves >= maxMoves * 0.9
                ? 'border-game-danger/50 bg-game-danger/15'
                : '',
            )}
          >
            <Footprints
              className={cn(
                'w-3 h-3',
                maxMoves && moves > maxMoves * 0.9
                  ? 'text-game-danger'
                  : 'text-game-moss',
              )}
            />
            <span>
              {moves}{' '}
              {maxMoves && (
                <span className="text-game-muted">/ {maxMoves}</span>
              )}
            </span>
          </div>
        </div>

        {/* Absolute Timer */}
        <div className="absolute top-4 right-4 z-50">
          <GameTimer
            timeLeft={timeLeft}
            totalTime={encounter.settings.timeLimit || 120}
          />
        </div>

        {/* Game Board Container */}
        <div className="flex-1 flex items-center justify-center w-full z-40 my-4">
          <div
            className="relative isolate overflow-hidden rounded-lg bg-game-night-surface shadow-2xl ring-4 ring-[#081014]/35"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize.w}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize.h}, 1fr)`,
              width: 'min(90vw, 500px)',
              aspectRatio: '1/1',
              gap: '0',
            }}
          >
            {grid.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={cn(
                    'relative w-full h-full flex items-center justify-center [image-rendering:pixelated] bg-[length:100%_100%]',
                    cell === 'wall' &&
                      'shadow-[inset_0_-6px_10px_rgba(0,0,0,0.35)]',
                  )}
                  style={{
                    backgroundImage:
                      cell === 'wall'
                        ? `url('${barrierSprite}')`
                        : cell === 'ice'
                          ? `url('${iceSprite}')`
                          : cell === 'empty' ||
                              cell === 'hole' ||
                              cell === 'filled'
                            ? `url('${floorSprite}')`
                            : undefined,
                  }}
                >
                  {cell === 'hole' && (
                    <div className="absolute inset-[12%]">
                      {holeSprite ? (
                        <Image
                          src={holeSprite}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-contain [image-rendering:pixelated]"
                        />
                      ) : (
                        <div className="h-full w-full rounded-full border-2 border-[#081014]/30 bg-[#081014]/70 shadow-[inset_0_0_10px_rgba(0,0,0,0.9)]" />
                      )}
                    </div>
                  )}

                  {cell === 'filled' && (
                    <div className="absolute inset-[16%]">
                      {filledHoleSprite ? (
                        <Image
                          src={filledHoleSprite}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-contain [image-rendering:pixelated]"
                        />
                      ) : (
                        <div className="h-full w-full rounded-full border border-[#081014]/40 bg-[#46545a]/85 shadow-[inset_0_4px_6px_rgba(255,255,255,0.12),inset_0_-5px_8px_rgba(0,0,0,0.45)]" />
                      )}
                    </div>
                  )}
                </div>
              )),
            )}

            <div className="pointer-events-none absolute inset-0 z-20">
              {winTiles.map((tile, index) => (
                <div
                  key={`win:${activeScreenId}:${index}:${getRockPushPositionKey(tile)}`}
                  className="absolute z-0 p-[0.12rem]"
                  style={entityStyle(tile)}
                  aria-hidden="true"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={winTileSprite}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain [image-rendering:pixelated]"
                    />
                  </div>
                </div>
              ))}

              {teleporters.map((teleporter) => (
                <div
                  key={`teleporter:${activeScreenId}:${teleporter.id}`}
                  className="absolute z-0 p-[0.12rem]"
                  style={entityStyle(teleporter)}
                  aria-hidden="true"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={teleporterSprite}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain [image-rendering:pixelated]"
                    />
                  </div>
                </div>
              ))}

              {prizes.map((prize, index) => {
                const prizeId = getScopedPrizeId(prize, index)
                if (collectedPrizeIds.has(prizeId)) return null

                return (
                  <div
                    key={`${prizeId}:${getRockPushPositionKey(prize)}`}
                    className="absolute z-10 p-[0.34rem]"
                    style={entityStyle(prize)}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-[18%] rounded-full bg-game-ochre/20 blur-sm" />
                    <div className="relative h-full w-full rounded-md border border-game-ochre/45 bg-[#081014]/20 p-1">
                      <EndlessCollectibleSprite
                        reward={getRockPushPrizeReward(prize)}
                        size={42}
                      />
                    </div>
                  </div>
                )
              })}

              {rocks.map((rock) => {
                const isDeadlocked = deadlockedRockIds.has(rock.id)
                return (
                  <div
                    key={rock.id}
                    className="absolute p-[0.22rem] transition-transform duration-150 ease-out"
                    style={entityStyle(
                      rock,
                      '',
                      movementDurations.rocks[rock.id] || defaultMoveDurationMs,
                    )}
                  >
                    <div className="absolute inset-[18%] translate-y-[12%] rounded-full bg-[#081014]/30 blur-[3px]" />
                    <div
                      className={cn(
                        'relative h-full w-full transition-transform duration-150',
                        pushedRockId === rock.id && 'scale-105',
                      )}
                    >
                      {isDeadlocked && (
                        <div className="absolute inset-0 z-30 rounded-full ring-2 ring-game-danger/90 shadow-[0_0_14px_rgba(184,97,72,0.65)] [animation:rock-push-warning_1.2s_ease-in-out_infinite]" />
                      )}
                      <Image
                        src={boulderSprite}
                        alt="Boulder"
                        fill
                        sizes="64px"
                        className="object-contain drop-shadow-lg [image-rendering:pixelated]"
                      />
                    </div>
                  </div>
                )
              })}

              {fallingRock && (
                <div
                  className="absolute z-20 p-[0.22rem]"
                  style={entityStyle(fallingRock)}
                  aria-hidden="true"
                >
                  <div className="relative h-full w-full [animation:rock-push-drop_240ms_ease-in_forwards]">
                    <Image
                      src={boulderSprite}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain [image-rendering:pixelated]"
                    />
                  </div>
                </div>
              )}

              <div
                className="absolute z-30 p-0.5 transition-transform duration-150 ease-out"
                style={entityStyle(
                  playerPos,
                  blockedOffset
                    ? ` translate(${blockedOffset.x}px, ${blockedOffset.y}px)`
                    : '',
                  blockedOffset
                    ? defaultMoveDurationMs
                    : movementDurations.player,
                )}
              >
                <div className="relative h-full w-full">
                  <div className="absolute inset-[20%] translate-y-[18%] rounded-full bg-[#081014]/25 blur-[3px]" />
                  {encounter.settings.playerSprite ? (
                    <div
                      className="relative h-full w-full [image-rendering:pixelated]"
                      style={{
                        backgroundImage: `url('${encounter.settings.playerSprite}')`,
                        backgroundSize: '200% 200%',
                        backgroundPosition:
                          facing === 'down'
                            ? '0% 0%'
                            : facing === 'up'
                              ? '0% 100%'
                              : facing === 'left'
                                ? '100% 100%'
                                : '100% 0%', // right
                      }}
                    />
                  ) : (
                    <TaskIconDisplay
                      icon={iconData as any}
                      className="relative h-full w-full drop-shadow-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Board Actions */}
        <div className="flex-none mt-2 mb-12 z-50 flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-full border-game-border bg-game-surface-raised text-game-muted shadow-sm hover:border-game-moss hover:text-game-moss disabled:opacity-35"
            onClick={undoMove}
            disabled={history.length === 0 || gameEnded || isSliding}
            aria-label="Undo move"
            title="Undo move"
          >
            <Undo2 className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full border-2 border-game-clay bg-game-clay text-game-cream shadow-sm hover:bg-game-clay/90"
            onClick={() => initGame()}
            disabled={isSliding}
            aria-label="Restart puzzle"
            title="Restart puzzle"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex-none max-w-[200px] w-full z-40 mb-8">
          <div className="grid grid-cols-3 gap-2 mx-auto">
            <div />
            <Button
              size="lg"
              className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
              onClick={() => move(0, -1)}
              disabled={isSliding}
              aria-label="Move up"
              title="Move up"
            >
              <ArrowUp />
            </Button>
            <div />
            <Button
              size="lg"
              className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
              onClick={() => move(-1, 0)}
              disabled={isSliding}
              aria-label="Move left"
              title="Move left"
            >
              <ArrowLeft />
            </Button>
            <Button
              size="lg"
              className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
              onClick={() => move(0, 1)}
              disabled={isSliding}
              aria-label="Move down"
              title="Move down"
            >
              <ArrowDown />
            </Button>
            <Button
              size="lg"
              className="h-16 border border-game-moss bg-game-surface-raised text-game-moss hover:bg-game-moss/10"
              onClick={() => move(1, 0)}
              disabled={isSliding}
              aria-label="Move right"
              title="Move right"
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>

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
