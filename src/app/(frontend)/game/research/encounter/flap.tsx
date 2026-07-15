'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { FlapGameConfig } from '@/data/games/flap/types'
import { SpriteConfig } from '@/data/games/shared'
import { useGameMusic } from '@/hooks/useGameMusic'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { CollisionMask, getCollisionMask } from '@/utilities/collision'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'
import {
  type EndlessCollectible,
  EndlessCollectibleSprite,
  getCollectibleSize,
  getEndlessCollectibleRewardConfigs,
  getNextCollectibleScore,
} from './endless-collectibles'
import { SideScrollerStage } from './side-scroller-stage'

interface FlapGameProps {
  encounter: FlapGameConfig
  initialState?: any
}

interface Wall {
  x: number
  gapY: number // Center Y position of the gap
  gapSize: number
  width: number
  passed: boolean // Track if player passed through for scoring
}

interface Enemy {
  x: number
  y: number
  size: number
}

export function FlapGame({ encounter, initialState }: FlapGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const isPageVisible = usePageVisibility()
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const frameCountRef = useRef(0)
  const lastFrameTimeRef = useRef<number>(0)
  const hasWonRef = useRef(false)
  const collectibleIdCounterRef = useRef(0)

  // Game State
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 0)
  const [countdown, setCountdown] = useState(3) // 3 second countdown

  // Player State (using refs for physics to avoid re-renders)
  const playerYRef = useRef(200) // Start mid-air
  const playerVelocityRef = useRef(0)
  const [playerY, setPlayerY] = useState(200)

  // Obstacles
  const [walls, setWalls] = useState<Wall[]>([])
  const wallsRef = useRef<Wall[]>([])
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const enemiesRef = useRef<Enemy[]>([])
  const [collectibles, setCollectibles] = useState<EndlessCollectible[]>([])
  const collectiblesRef = useRef<EndlessCollectible[]>([])
  const collectibleSchedulesRef = useRef<Record<string, number>>({})
  const collectedEndlessRewardsRef = useRef<Record<string, number>>({})
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>(
    encounter.settings.parallaxLayers.map(() => 0),
  )
  const parallaxOffsetsRef = useRef<number[]>(
    encounter.settings.parallaxLayers.map(() => 0),
  )
  const scoreRef = useRef(0)
  const lastWallSpawnRef = useRef(0)
  const lastEnemySpawnRef = useRef(0)

  // Collision Masks
  const masksRef = useRef<Record<string, CollisionMask>>({})

  // Load Sprites
  useEffect(() => {
    const loadMasks = async () => {
      const settings = encounter.settings
      const toLoad: string[] = []

      // Player Sprite
      if (typeof settings.sprite !== 'string') {
        toLoad.push(settings.sprite.sheetUrl)
      } else {
        toLoad.push(settings.sprite)
      }

      // Enemy Sprite
      if (typeof settings.enemySprite !== 'string') {
        toLoad.push(settings.enemySprite.sheetUrl)
      } else {
        toLoad.push(settings.enemySprite)
      }

      await Promise.all(
        toLoad.map(async (url) => {
          if (!url) return
          if (masksRef.current[url]) return
          try {
            const mask = await getCollisionMask(url)
            masksRef.current[url] = mask
          } catch (e) {
            console.error('Failed to load mask:', url, e)
          }
        }),
      )
    }

    loadMasks()
  }, [encounter.settings])

  // Constants
  const GRAVITY = encounter.settings.gravity || 0.6
  const FLAP_FORCE = -(encounter.settings.flapForce || 12) // Negative = upward
  const TERMINAL_VELOCITY = encounter.settings.terminalVelocity || 15
  const SCORE_PER_SECOND = 10
  const PLAYER_X = 100
  const PLAYER_SIZE = 60
  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 600
  const CEILING_Y = CANVAS_HEIGHT
  const FLOOR_Y = 0

  // Check if endless mode is enabled
  const isEndlessMode = (encounter.settings as any).endless?.enabled || false
  const milestones = (encounter.settings as any).endless?.milestones || []
  const collectibleRewardConfigs = useMemo(
    () => getEndlessCollectibleRewardConfigs(encounter.settings),
    [encounter.settings],
  )

  const initGame = useCallback(async () => {
    const res = await startResearchEncounter(encounter.id)
    if (!res.success) {
      console.error('Failed to start:', res.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setResult(null)
    setScore(0)
    scoreRef.current = 0
    setPlayerY(200)
    playerYRef.current = 200
    playerVelocityRef.current = 0
    setWalls([])
    wallsRef.current = []
    setEnemies([])
    enemiesRef.current = []
    setCollectibles([])
    collectiblesRef.current = []
    collectedEndlessRewardsRef.current = {}
    collectibleIdCounterRef.current = 0
    collectibleSchedulesRef.current = Object.fromEntries(
      collectibleRewardConfigs.map((config) => [
        config.key,
        getNextCollectibleScore(0, config.everyScore),
      ]),
    )
    setParallaxOffsets(encounter.settings.parallaxLayers.map(() => 0))
    parallaxOffsetsRef.current = encounter.settings.parallaxLayers.map(() => 0)
    frameCountRef.current = 0
    lastWallSpawnRef.current = 0
    lastEnemySpawnRef.current = 0
    lastFrameTimeRef.current = 0
    hasWonRef.current = false
    setCountdown(3) // Reset countdown

    // If walls are disabled, set next spawn to Infinity
    if (encounter.settings.wallFrequency.max <= 0) {
      lastWallSpawnRef.current = Infinity
    }

    if (res.restored && res.expiry) {
      const remaining = Math.max(
        0,
        Math.floor((res.expiry - Date.now()) / 1000),
      )
      setTimeLeft(remaining)
    } else {
      setTimeLeft(encounter.settings.timeLimit || 0)
    }
  }, [
    encounter.id,
    encounter.settings.parallaxLayers,
    encounter.settings.timeLimit,
    collectibleRewardConfigs,
  ])

  useEffect(() => {
    if (!gameStarted) initGame()
  }, [gameStarted, initGame])

  // Countdown before game starts
  useEffect(() => {
    if (!gameStarted || gameEnded || !isPageVisible || countdown <= 0) return
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [gameStarted, gameEnded, isPageVisible, countdown])

  // Timer
  useEffect(() => {
    if (
      !gameStarted ||
      gameEnded ||
      !isPageVisible ||
      !encounter.settings.timeLimit ||
      timeLeft <= 0
    )
      return
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
  }, [
    gameStarted,
    gameEnded,
    isPageVisible,
    timeLeft,
    encounter.settings.timeLimit,
  ])

  const flap = useCallback(() => {
    if (!gameEnded) {
      playerVelocityRef.current = FLAP_FORCE
    }
  }, [gameEnded, FLAP_FORCE])

  const handleWin = async () => {
    playSfx('good')
    setGameEnded(true)
    await submitResearchAnswer(true)
    const res = await completeResearchEncounter(encounter.id, true)

    setResult({
      success: true,
      message: 'Level Complete!',
      rewards: res.summary,
    })
  }

  const handleLoss = async () => {
    playSfx('bad')
    setGameEnded(true)
    await submitResearchAnswer(false)
    // Use scoreRef.current for the most up-to-date score value
    const finalScore = isEndlessMode ? Math.floor(scoreRef.current) : undefined
    const res = await completeResearchEncounter(
      encounter.id,
      false,
      finalScore,
      undefined,
      collectedEndlessRewardsRef.current,
    )

    const hasRewards =
      res.summary &&
      ((res.summary.items && res.summary.items.length > 0) ||
        (res.summary.pokemon && res.summary.pokemon.length > 0) ||
        (res.summary.currency && res.summary.currency.length > 0) ||
        (res.summary.cards && res.summary.cards.length > 0))
    const isSuccess = isEndlessMode && hasRewards

    setResult({
      success: isSuccess,
      message: isEndlessMode
        ? `Final Score: ${Math.floor(scoreRef.current)}`
        : 'Game Over!',
      rewards: res.summary,
    })
  }

  useEffect(() => {
    if (!isPageVisible) {
      lastFrameTimeRef.current = 0
    }
  }, [isPageVisible])

  // Game Loop
  useEffect(() => {
    if (!gameStarted || gameEnded || !isPageVisible || countdown > 0) return // Don't start until countdown finishes

    const gameLoop = (currentTime: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = currentTime
      }

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000
      lastFrameTimeRef.current = currentTime
      frameCountRef.current++

      // Update player physics - constant gravity
      playerVelocityRef.current += GRAVITY
      // Apply terminal velocity
      if (playerVelocityRef.current > TERMINAL_VELOCITY) {
        playerVelocityRef.current = TERMINAL_VELOCITY
      }
      playerYRef.current += playerVelocityRef.current

      // Check ceiling and floor collision
      if (playerYRef.current >= CEILING_Y - PLAYER_SIZE) {
        handleLoss()
        return
      }
      if (playerYRef.current <= FLOOR_Y) {
        handleLoss()
        return
      }

      // Update parallax
      const baseSpeed = encounter.settings.speed || 200
      const newParallaxOffsets = parallaxOffsetsRef.current.map((offset, i) => {
        const layer = encounter.settings.parallaxLayers[i]
        return offset + baseSpeed * layer.speed * deltaTime
      })
      parallaxOffsetsRef.current = newParallaxOffsets

      // Spawn and update walls
      let newWalls = wallsRef.current
      const wallFreq = encounter.settings.wallFrequency
      const nextWallSpawn =
        lastWallSpawnRef.current +
        Math.random() * (wallFreq.max - wallFreq.min) +
        wallFreq.min

      if (wallFreq.max > 0 && frameCountRef.current >= nextWallSpawn) {
        const gapSize =
          Math.random() *
            (encounter.settings.wallGap.max - encounter.settings.wallGap.min) +
          encounter.settings.wallGap.min
        const gapY =
          gapSize / 2 + Math.random() * (CANVAS_HEIGHT - gapSize - 100) + 50

        newWalls = [
          ...newWalls,
          {
            x: CANVAS_WIDTH,
            gapY,
            gapSize,
            width: encounter.settings.wallWidth || 60,
            passed: false,
          },
        ]
        lastWallSpawnRef.current = frameCountRef.current
      }

      // Update wall positions and check for scoring
      newWalls = newWalls
        .map((wall) => {
          const newWall = { ...wall, x: wall.x - baseSpeed * deltaTime }
          // Check if player passed the wall
          if (!wall.passed && newWall.x + newWall.width < PLAYER_X) {
            newWall.passed = true
            scoreRef.current += 10 // Score for passing through wall
          }
          return newWall
        })
        .filter((wall) => wall.x + wall.width > 0)
      wallsRef.current = newWalls

      // Spawn and update enemies
      let newEnemies = enemiesRef.current
      const enemyFreq = encounter.settings.enemyFrequency
      const nextEnemySpawn =
        lastEnemySpawnRef.current +
        Math.random() * (enemyFreq.max - enemyFreq.min) +
        enemyFreq.min

      if (frameCountRef.current >= nextEnemySpawn) {
        const enemySize = encounter.settings.enemySize || 50
        const enemyY = Math.random() * (CANVAS_HEIGHT - enemySize - 100) + 50

        newEnemies = [
          ...newEnemies,
          {
            x: CANVAS_WIDTH,
            y: enemyY,
            size: enemySize,
          },
        ]
        lastEnemySpawnRef.current = frameCountRef.current
      }

      // Update enemy positions
      newEnemies = newEnemies
        .map((enemy) => ({
          ...enemy,
          x: enemy.x - baseSpeed * deltaTime,
        }))
        .filter((enemy) => enemy.x + enemy.size > 0)
      enemiesRef.current = newEnemies

      // Update score (time-based)
      const scoreIncrement = SCORE_PER_SECOND * deltaTime
      const newScore = scoreRef.current + scoreIncrement
      scoreRef.current = newScore

      let newCollectibles = collectiblesRef.current
      if (collectibleRewardConfigs.length > 0) {
        const sprite = encounter.settings.sprite
        const playerWidth =
          typeof sprite === 'string' ? PLAYER_SIZE : sprite.renderWidth
        const playerHeight =
          typeof sprite === 'string' ? PLAYER_SIZE : sprite.renderHeight
        const collectibleSize = getCollectibleSize(playerWidth, playerHeight)
        const minY = 80
        const maxY = CANVAS_HEIGHT - collectibleSize - 80

        collectibleRewardConfigs.forEach((config) => {
          let nextScore = collectibleSchedulesRef.current[config.key]
          while (nextScore !== undefined && newScore >= nextScore) {
            newCollectibles = [
              ...newCollectibles,
              {
                id: collectibleIdCounterRef.current++,
                rewardKey: config.key,
                reward: config.reward,
                x: CANVAS_WIDTH,
                y: minY + Math.random() * Math.max(0, maxY - minY),
                size: collectibleSize,
              },
            ]
            nextScore = getNextCollectibleScore(nextScore, config.everyScore)
            collectibleSchedulesRef.current[config.key] = nextScore
          }
        })
      }

      newCollectibles = newCollectibles
        .map((collectible) => ({
          ...collectible,
          x: collectible.x - baseSpeed * deltaTime,
        }))
        .filter((collectible) => collectible.x + collectible.size > 0)
      collectiblesRef.current = newCollectibles

      // Check for win condition (only in non-endless mode)
      if (
        !isEndlessMode &&
        encounter.settings.winScore &&
        newScore >= encounter.settings.winScore &&
        !hasWonRef.current
      ) {
        hasWonRef.current = true
        setTimeout(() => handleWin(), 0)
      }

      // Batch update all state
      setParallaxOffsets(newParallaxOffsets)
      setWalls(newWalls)
      setEnemies(newEnemies)
      setCollectibles(newCollectibles)
      setScore(newScore)
      setPlayerY(playerYRef.current)

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    gameStarted,
    gameEnded,
    isPageVisible,
    countdown,
    encounter.settings,
    GRAVITY,
    TERMINAL_VELOCITY,
    FLAP_FORCE,
    isEndlessMode,
    SCORE_PER_SECOND,
    collectibleRewardConfigs,
  ])

  // Collision Detection
  useEffect(() => {
    if (gameEnded || !gameStarted) return

    const COLLISION_PADDING = 10

    // Determine current player dimensions
    const playerConfig = encounter.settings.sprite
    let playerWidth = PLAYER_SIZE
    let playerHeight = PLAYER_SIZE
    let playerUrl = ''

    if (typeof playerConfig !== 'string') {
      playerWidth = playerConfig.renderWidth
      playerHeight = playerConfig.renderHeight
      playerUrl = playerConfig.sheetUrl
    } else {
      playerUrl = playerConfig
    }

    const playerBox = {
      x: PLAYER_X + COLLISION_PADDING,
      y: playerY + COLLISION_PADDING,
      width: playerWidth - COLLISION_PADDING * 2,
      height: playerHeight - COLLISION_PADDING * 2,
    }

    // Calculate player frame index for collision
    let playerFrameIndex = 0
    if (typeof playerConfig !== 'string') {
      const frameDuration = playerConfig.frameRate || 100
      const mask = masksRef.current[playerConfig.sheetUrl]
      const frameCount =
        playerConfig.frameCount ||
        (mask ? Math.floor(mask.height / playerConfig.frameHeight) : 1) ||
        1
      playerFrameIndex = Math.floor(Date.now() / frameDuration) % frameCount
    }

    // Check wall collisions (Simple AABB is enough for rectangular walls)
    for (const wall of walls) {
      const wallLeft = wall.x
      const wallRight = wall.x + wall.width
      const gapTop = wall.gapY - wall.gapSize / 2
      const gapBottom = wall.gapY + wall.gapSize / 2

      // Check intersection
      if (playerBox.x < wallRight && playerBox.x + playerBox.width > wallLeft) {
        // If outside the vertical gap, it's a hit
        // The hitbox is effectively the union of TopWall and BottomWall.
        // AABB check simplifies to: are we NOT vertically inside the gap?
        if (
          playerBox.y < gapTop ||
          playerBox.y + playerBox.height > gapBottom
        ) {
          // Refinement: If we want pixel precision for player hitting wall, we could check mask here too,
          // but walls are usually solid blocks. For now, strict box is safer for walls.
          handleLoss()
          return
        }
      }
    }

    // Check enemy collisions (Hybrid Pixel Perfect)
    for (const enemy of enemies) {
      const enemyConfig = encounter.settings.enemySprite
      let enemyWidth = enemy.size
      let enemyHeight = enemy.size
      let enemyUrl = ''

      if (typeof enemyConfig !== 'string') {
        enemyWidth = enemyConfig.renderWidth
        enemyHeight = enemyConfig.renderHeight
        enemyUrl = enemyConfig.sheetUrl
      } else {
        enemyUrl = enemyConfig as string
      }

      const enemyBox = {
        x: enemy.x + COLLISION_PADDING,
        y: enemy.y + COLLISION_PADDING,
        width: enemyWidth - COLLISION_PADDING * 2,
        height: enemyHeight - COLLISION_PADDING * 2,
      }

      // Broad Phase
      if (
        playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.y + playerBox.height > enemyBox.y
      ) {
        // Narrow Phase: Pixel Collision

        // 1. Calculate intersection rect
        const intersectX = Math.max(playerBox.x, enemyBox.x)
        const intersectY = Math.max(playerBox.y, enemyBox.y)
        const intersectW =
          Math.min(playerBox.x + playerBox.width, enemyBox.x + enemyBox.width) -
          intersectX
        const intersectH =
          Math.min(
            playerBox.y + playerBox.height,
            enemyBox.y + enemyBox.height,
          ) - intersectY

        if (intersectW > 0 && intersectH > 0) {
          const playerMask = masksRef.current[playerUrl]
          const enemyMask = masksRef.current[enemyUrl]

          // If masks aren't loaded, default to AABB hit
          if (!playerMask || !enemyMask) {
            handleLoss()
            return
          }

          // Calculate Enemy Frame
          let enemyFrameIndex = 0
          if (typeof enemyConfig !== 'string') {
            const frameDuration = enemyConfig.frameRate || 100
            const mask = masksRef.current[enemyConfig.sheetUrl]
            const frameCount =
              enemyConfig.frameCount ||
              (mask ? Math.floor(mask.height / enemyConfig.frameHeight) : 1) ||
              1
            enemyFrameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount
          }

          const step = 2 // Performance optimization
          let pixelHit = false

          for (let ix = 0; ix < intersectW; ix += step) {
            for (let iy = 0; iy < intersectH; iy += step) {
              const screenX = intersectX + ix
              const screenY = intersectY + iy

              // Helper to check pixel opaque
              const isPlayerPixelOpaque = (() => {
                const pRenderX = PLAYER_X // Start X (unpadded)
                const pRenderY = playerY // Start Y (unpadded)
                // Wait, playerBox included Padding. We need RELATIVE to Render Box
                // screenX is absolute.
                // Relative to Sprite Origin:
                const relX = (screenX - pRenderX) / playerWidth // Norm X
                const relY = (screenY - pRenderY) / playerHeight // Norm Y

                if (typeof playerConfig !== 'string') {
                  const pSheetX = Math.floor(relX * playerConfig.frameWidth)
                  const pSheetY =
                    playerFrameIndex * playerConfig.frameHeight +
                    Math.floor(relY * playerConfig.frameHeight)
                  return playerMask.isOpaque(pSheetX, pSheetY)
                } else {
                  // Fallback
                  return playerMask.isOpaque(
                    relX * playerMask.width,
                    relY * playerMask.height,
                  )
                }
              })()

              const isEnemyPixelOpaque = (() => {
                const eRenderX = enemy.x
                const eRenderY = enemy.y
                const relX = (screenX - eRenderX) / enemyWidth
                const relY = (screenY - eRenderY) / enemyHeight

                if (typeof enemyConfig !== 'string') {
                  const eSheetX = Math.floor(relX * enemyConfig.frameWidth)
                  const eSheetY =
                    enemyFrameIndex * enemyConfig.frameHeight +
                    Math.floor(relY * enemyConfig.frameHeight)
                  return enemyMask.isOpaque(eSheetX, eSheetY)
                } else {
                  return enemyMask.isOpaque(
                    relX * enemyMask.width,
                    relY * enemyMask.height,
                  )
                }
              })()

              if (isPlayerPixelOpaque && isEnemyPixelOpaque) {
                pixelHit = true
                break
              }
            }
            if (pixelHit) break
          }

          if (pixelHit) {
            handleLoss()
            return
          }
        }
      }
    }
  }, [walls, enemies, playerY, gameEnded, gameStarted])

  useEffect(() => {
    if (gameEnded || !gameStarted || collectibles.length === 0) return

    const sprite = encounter.settings.sprite
    const playerWidth =
      typeof sprite === 'string' ? PLAYER_SIZE : sprite.renderWidth
    const playerHeight =
      typeof sprite === 'string' ? PLAYER_SIZE : sprite.renderHeight
    const playerBox = {
      x: PLAYER_X,
      y: playerY,
      width: playerWidth,
      height: playerHeight,
    }

    let collectedAny = false
    const remainingCollectibles = collectibles.filter((collectible) => {
      const collectibleBox = {
        x: collectible.x,
        y: collectible.y,
        width: collectible.size,
        height: collectible.size,
      }

      const overlaps =
        playerBox.x < collectibleBox.x + collectibleBox.width &&
        playerBox.x + playerBox.width > collectibleBox.x &&
        playerBox.y < collectibleBox.y + collectibleBox.height &&
        playerBox.y + playerBox.height > collectibleBox.y

      if (!overlaps) return true

      collectedEndlessRewardsRef.current[collectible.rewardKey] =
        (collectedEndlessRewardsRef.current[collectible.rewardKey] || 0) + 1
      collectedAny = true
      return false
    })

    if (collectedAny) {
      playSfx('good')
      collectiblesRef.current = remainingCollectibles
      setCollectibles(remainingCollectibles)
    }
  }, [
    collectibles,
    playerY,
    gameEnded,
    gameStarted,
    encounter.settings.sprite,
    playSfx,
  ])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault()
        if (!e.repeat) {
          flap()
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [flap])

  return (
    <div className="relative min-h-dvh overflow-hidden game-night bg-game-night-canvas">
      <SideScrollerStage
        category={encounter.category}
        scene={encounter.settings.scene}
        fallbackBackdrop="/games/run/backgrounds/sky.avif"
        stageRef={canvasRef}
        score={
          <span className="text-sm">
            {isEndlessMode ? (
              <>Score: {Math.floor(score)}</>
            ) : (
              <>
                Score: {Math.floor(score)} / {encounter.settings.winScore}
              </>
            )}
          </span>
        }
        timer={
          encounter.settings.timeLimit ? (
            <GameTimer
              timeLeft={timeLeft}
              totalTime={encounter.settings.timeLimit}
            />
          ) : undefined
        }
        onOutsideTap={flap}
        overlay={
          countdown > 0 ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#081014]/50 backdrop-blur-sm">
              <div className="animate-pulse">
                <GameTimer
                  timeLeft={countdown}
                  totalTime={3}
                  size="xl"
                  className="text-[#f7ecd6] drop-shadow-2xl"
                  colorOverride="text-[#d3ad63]"
                />
              </div>
            </div>
          ) : undefined
        }
      >
        <Image
          src={
            encounter.settings.scene?.backdrop ||
            '/games/run/backgrounds/sky.avif'
          }
          alt=""
          fill
          priority
          sizes="600px"
          className="object-cover"
        />
        {/* Parallax Backgrounds */}
        {encounter.settings.parallaxLayers.map((layer, i) => {
          const {
            backgroundPosition: backgroundAnchor = 'center',
            ...layerStyle
          } = layer.style ?? {}

          return (
            <div
              key={i}
              className="absolute inset-0 bg-repeat-x"
              style={{
                ...layerStyle,
                backgroundImage: `url(${layer.url})`,
                backgroundPosition: `${-parallaxOffsets[i]}px ${backgroundAnchor}`,
                backgroundSize: layerStyle.backgroundSize || 'auto 100%',
                backgroundRepeat: layerStyle.backgroundRepeat || 'repeat-x',
              }}
            />
          )
        })}

        {/* Player */}
        {playerVelocityRef.current < -1 && countdown <= 0 && (
          <div
            className="absolute h-8 w-24 rounded-full bg-gradient-to-l from-white/0 via-white/32 to-white/0 blur-[2px]"
            style={{
              left: `${PLAYER_X - 70}px`,
              top: `${playerY + PLAYER_SIZE * 0.35}px`,
            }}
          />
        )}
        {(() => {
          const spriteConfig = encounter.settings.sprite
          if (typeof spriteConfig !== 'string') {
            const frameDuration = spriteConfig.frameRate || 100
            const mask = masksRef.current[spriteConfig.sheetUrl]
            const frameCount =
              spriteConfig.frameCount ||
              (mask ? Math.floor(mask.height / spriteConfig.frameHeight) : 1) ||
              1
            const frameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount

            const scale = spriteConfig.renderWidth / spriteConfig.frameWidth
            const scaledFrameHeight = spriteConfig.frameHeight * scale

            return (
              <div
                className="absolute transition-none"
                style={{
                  left: `${PLAYER_X}px`,
                  top: `${playerY}px`,
                  width: `${spriteConfig.renderWidth}px`,
                  height: `${spriteConfig.renderHeight}px`,
                  backgroundImage: `url(${spriteConfig.sheetUrl})`,
                  backgroundPosition: `0 -${frameIndex * scaledFrameHeight}px`,
                  backgroundSize: `${spriteConfig.renderWidth}px auto`,
                  backgroundRepeat: 'no-repeat',
                  transform: 'scaleX(-1)',
                }}
              />
            )
          }

          return (
            <div
              className="absolute transition-none"
              style={{
                left: `${PLAYER_X}px`,
                top: `${playerY}px`,
                width: `${PLAYER_SIZE}px`,
                height: `${PLAYER_SIZE}px`,
              }}
            >
              <Image
                src={encounter.settings.sprite as string}
                alt="Player"
                fill
                sizes="60px"
                className="object-contain drop-shadow-lg scale-x-[-1]"
              />
            </div>
          )
        })()}

        {/* Collectible Rewards */}
        {collectibles.map((collectible) => (
          <div
            key={collectible.id}
            className="absolute z-20"
            style={{
              left: `${collectible.x}px`,
              top: `${collectible.y}px`,
              width: `${collectible.size}px`,
              height: `${collectible.size}px`,
            }}
          >
            <EndlessCollectibleSprite
              reward={collectible.reward}
              size={collectible.size}
            />
          </div>
        ))}

        {/* Walls */}
        {walls.map((wall, i) => (
          <div key={i}>
            {/* Top wall */}
            <div
              className="absolute"
              style={{
                left: `${wall.x}px`,
                top: '0px',
                width: `${wall.width}px`,
                height: `${wall.gapY - wall.gapSize / 2}px`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* Use background image for tiling */}
              <div
                className="w-full h-full [image-rendering:pixelated]"
                style={{
                  backgroundImage: `url(${encounter.settings.wallSprite})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: 'auto',
                }}
              />
            </div>
            {/* Bottom wall */}
            <div
              className="absolute"
              style={{
                left: `${wall.x}px`,
                top: `${wall.gapY + wall.gapSize / 2}px`,
                width: `${wall.width}px`,
                height: `${CANVAS_HEIGHT - (wall.gapY + wall.gapSize / 2)}px`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {/* Use background image for tiling */}
              <div
                className="w-full h-full [image-rendering:pixelated]"
                style={{
                  backgroundImage: `url(${encounter.settings.wallSprite})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: 'auto',
                }}
              />
            </div>
          </div>
        ))}

        {/* Enemies */}
        {enemies.map((enemy, i) => {
          const enemyConfig = encounter.settings.enemySprite
          if (typeof enemyConfig !== 'string') {
            const frameDuration = enemyConfig.frameRate || 100
            const mask = masksRef.current[enemyConfig.sheetUrl]
            const frameCount =
              enemyConfig.frameCount ||
              (mask ? Math.floor(mask.height / enemyConfig.frameHeight) : 1) ||
              1
            const frameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount

            const scale = enemyConfig.renderWidth / enemyConfig.frameWidth
            const scaledFrameHeight = enemyConfig.frameHeight * scale

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${enemy.x}px`,
                  top: `${enemy.y}px`,
                  width: `${enemyConfig.renderWidth}px`,
                  height: `${enemyConfig.renderHeight}px`,
                  backgroundImage: `url(${enemyConfig.sheetUrl})`,
                  backgroundPosition: `0 -${frameIndex * scaledFrameHeight}px`,
                  backgroundSize: `${enemyConfig.renderWidth}px auto`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )
          }

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${enemy.x}px`,
                top: `${enemy.y}px`,
                width: `${enemy.size}px`,
                height: `${enemy.size}px`,
              }}
            >
              <Image
                src={encounter.settings.enemySprite as string}
                alt="Enemy"
                fill
                sizes={`${enemy.size}px`}
                className="object-contain"
              />
            </div>
          )
        })}
      </SideScrollerStage>

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
