'use client'

import { useGameMusic } from '@/hooks/useGameMusic'
import { useAudio } from '@/context/AudioContext'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { GameTimer } from '@/components/game/shared/game-timer'
import { getCollisionMask, CollisionMask } from '@/utilities/collision'
import type { RunGameConfig, SpriteConfig } from '@/data/games/run/types'
import { completeResearchEncounter, startResearchEncounter, submitResearchAnswer } from '../actions'
import { useUser } from '@/context/UserContext'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { SideScrollerStage } from './side-scroller-stage'
import {
  EndlessCollectibleSprite,
  type EndlessCollectible,
  getCollectibleSize,
  getEndlessCollectibleRewardConfigs,
  getNextCollectibleScore,
} from './endless-collectibles'
interface RunGameProps {
  encounter: RunGameConfig
  initialState?: any
}

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  isAerial?: boolean // True for flying obstacles
  id: number // Unique ID for reacting keys
  spriteConfig?: SpriteConfig
  creationTime: number // For synchronizing animation
}

export function RunGame({ encounter }: RunGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const isPageVisible = usePageVisibility()
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const frameCountRef = useRef(0)
  const lastGroundSpawnRef = useRef(0)
  const lastAerialSpawnRef = useRef(0)
  const obstacleIdCounterRef = useRef(0)
  const collectibleIdCounterRef = useRef(0)
  const lastFrameTimeRef = useRef<number>(0)
  const hasWonRef = useRef(false)
  const lastJumpTimeRef = useRef(0)

  // Game State
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 0)

  // Player State (using refs for physics to avoid re-renders)
  const playerYRef = useRef(0)
  const playerVelocityRef = useRef(0)
  const [playerY, setPlayerY] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const isJumpingRef = useRef(false)
  const [hasDoubleJumped, setHasDoubleJumped] = useState(false)
  const hasDoubleJumpedRef = useRef(false)
  const [isBoosting, setIsBoosting] = useState(false)
  const isBoostingRef = useRef(false)
  const [boostCooldown, setBoostCooldown] = useState(0)

  // Obstacles
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const obstaclesRef = useRef<Obstacle[]>([])
  const [collectibles, setCollectibles] = useState<EndlessCollectible[]>([])
  const collectiblesRef = useRef<EndlessCollectible[]>([])
  const collectibleSchedulesRef = useRef<Record<string, number>>({})
  const collectedEndlessRewardsRef = useRef<Record<string, number>>({})
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>(
    encounter.settings.parallaxLayers.map(() => 0),
  )
  const parallaxOffsetsRef = useRef<number[]>(encounter.settings.parallaxLayers.map(() => 0))
  const scoreRef = useRef(0)
  const masksRef = useRef<Record<string, CollisionMask>>({})

  // Constants
  const GRAVITY = -0.5 // Negative because we're using bottom positioning
  const JUMP_FORCE = 12 // Fixed jump force
  const DOUBLE_JUMP_FORCE = 8 // Smaller second jump
  const SCORE_PER_SECOND = 10 // Score increments per second (consistent regardless of FPS)
  const BOOST_MULTIPLIER = 3 // Speed multiplier during boost
  const BOOST_DURATION = 300 // Boost duration in ms
  const BOOST_COOLDOWN = 2000 // Cooldown in ms
  const PIXELS_PER_SECOND = 120 // Base game speed in pixels per second (frame-rate independent)
  const GROUND_Y = 5
  const PLAYER_X = 100
  const PLAYER_SIZE = 60
  const renderedPlayerWidth = encounter.settings.player?.renderWidth || PLAYER_SIZE
  const renderedPlayerHeight = encounter.settings.player?.renderHeight || PLAYER_SIZE
  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 600

  // Check if endless mode is enabled
  const isEndlessMode = (encounter.settings as any).endless?.enabled || false
  const milestones = (encounter.settings as any).endless?.milestones || []
  const collectibleRewardConfigs = useMemo(
    () => getEndlessCollectibleRewardConfigs(encounter.settings),
    [encounter.settings],
  )

  // Load masks
  useEffect(() => {
    const loadMasks = async () => {
      const urls: string[] = []
      // Player
      if (encounter.settings.player?.sheetUrl) urls.push(encounter.settings.player.sheetUrl)
      else if (encounter.settings.sprite) urls.push(encounter.settings.sprite)

      // Obstacles
      if (encounter.settings.groundObstacle.spriteConfig?.sheetUrl) {
        urls.push(encounter.settings.groundObstacle.spriteConfig.sheetUrl)
      } else if (encounter.settings.groundObstacle.sprite) {
        urls.push(encounter.settings.groundObstacle.sprite)
      }

      if (encounter.settings.aerialObstacle) {
        if (encounter.settings.aerialObstacle.spriteConfig?.sheetUrl) {
          urls.push(encounter.settings.aerialObstacle.spriteConfig.sheetUrl)
        } else if (encounter.settings.aerialObstacle.sprite) {
          urls.push(encounter.settings.aerialObstacle.sprite)
        }
      }

      for (const url of urls) {
        try {
          const mask = await getCollisionMask(url)
          masksRef.current[url] = mask
        } catch (e) {
          console.error('Failed to load mask:', url, e)
        }
      }
    }
    loadMasks()
  }, [encounter.settings])

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
    setPlayerY(0)
    playerYRef.current = 0
    playerVelocityRef.current = 0
    setIsJumping(false)
    setObstacles([])
    obstaclesRef.current = []
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
    lastGroundSpawnRef.current = 0
    lastAerialSpawnRef.current = 0
    lastFrameTimeRef.current = 0
    hasWonRef.current = false
    lastJumpTimeRef.current = 0

    if (res.restored && res.expiry) {
      const remaining = Math.max(0, Math.floor((res.expiry - Date.now()) / 1000))
      setTimeLeft(remaining)
    } else {
      setTimeLeft(encounter.settings.timeLimit || 0)
    }
  }, [
    encounter.id,
    encounter.settings.parallaxLayers,
    encounter.settings.timeLimit,
    GROUND_Y,
    collectibleRewardConfigs,
  ])

  useEffect(() => {
    if (!gameStarted) initGame()
  }, [gameStarted, initGame])

  // Timer
  useEffect(() => {
    if (!gameStarted || gameEnded || !isPageVisible || !encounter.settings.timeLimit || timeLeft <= 0)
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
  }, [gameStarted, gameEnded, isPageVisible, timeLeft, encounter.settings.timeLimit])

  const jump = useCallback(() => {
    const now = Date.now()
    if (!isJumpingRef.current && !gameEnded) {
      // First jump
      playerVelocityRef.current = JUMP_FORCE
      isJumpingRef.current = true
      setIsJumping(true)
      hasDoubleJumpedRef.current = false
      setHasDoubleJumped(false)
      lastJumpTimeRef.current = now
    } else if (isJumpingRef.current && !hasDoubleJumpedRef.current && !gameEnded) {
      // Double jump - 250ms cooldown to prevent accidental doubles
      if (now - lastJumpTimeRef.current < 250) return

      playerVelocityRef.current = DOUBLE_JUMP_FORCE
      hasDoubleJumpedRef.current = true
      setHasDoubleJumped(true)
    }
  }, [gameEnded, JUMP_FORCE, DOUBLE_JUMP_FORCE])

  const boost = useCallback(() => {
    if (!isBoostingRef.current && boostCooldown === 0 && !gameEnded) {
      isBoostingRef.current = true
      setIsBoosting(true)
      setBoostCooldown(BOOST_COOLDOWN)

      // End boost after duration
      setTimeout(() => {
        isBoostingRef.current = false
        setIsBoosting(false)
      }, BOOST_DURATION)
    }
  }, [boostCooldown, gameEnded, BOOST_DURATION, BOOST_COOLDOWN])

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
    // Pass final score for endless mode reward calculation - use scoreRef for up-to-date value
    const finalScore = isEndlessMode ? Math.floor(scoreRef.current) : undefined
    const res = await completeResearchEncounter(
      encounter.id,
      false,
      finalScore,
      undefined,
      collectedEndlessRewardsRef.current,
    )

    // In endless mode, show success if any rewards were earned
    const hasRewards =
      res.summary &&
      ((res.summary.items && res.summary.items.length > 0) ||
        (res.summary.pokemon && res.summary.pokemon.length > 0) ||
        (res.summary.currency && res.summary.currency.length > 0) ||
        (res.summary.cards && res.summary.cards.length > 0))
    const isSuccess = isEndlessMode && hasRewards

    setResult({
      success: isSuccess,
      message: isEndlessMode ? `Final Score: ${Math.floor(scoreRef.current)}` : 'Game Over!',
      rewards: res.summary, // Will contain milestone rewards for endless mode
    })
  }

  // Boost cooldown timer
  useEffect(() => {
    if (boostCooldown > 0 && gameStarted && !gameEnded && isPageVisible) {
      const timer = setInterval(() => {
        setBoostCooldown((prev) => Math.max(0, prev - 100))
      }, 100)
      return () => clearInterval(timer)
    }
  }, [boostCooldown, gameStarted, gameEnded, isPageVisible])

  useEffect(() => {
    if (!isPageVisible) {
      lastFrameTimeRef.current = 0
    }
  }, [isPageVisible])

  // Game Loop
  useEffect(() => {
    if (!gameStarted || gameEnded || !isPageVisible) return

    const gameLoop = (currentTime: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = currentTime
      }

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000 // Convert to seconds
      lastFrameTimeRef.current = currentTime

      frameCountRef.current++

      // Update player physics using refs (no re-render)
      playerVelocityRef.current += GRAVITY
      playerYRef.current += playerVelocityRef.current

      if (playerYRef.current <= 0) {
        playerYRef.current = 0
        playerVelocityRef.current = 0
        if (isJumpingRef.current) {
          isJumpingRef.current = false
          setIsJumping(false)
          setHasDoubleJumped(false)
        }
      }

      // Batch all state updates into one
      const baseSpeed = encounter.settings.speed || 120
      const currentSpeed = isBoostingRef.current ? baseSpeed * BOOST_MULTIPLIER : baseSpeed

      // Update parallax
      const newParallaxOffsets = parallaxOffsetsRef.current.map((offset, i) => {
        const layer = encounter.settings.parallaxLayers[i]
        return offset + currentSpeed * layer.speed * deltaTime
      })
      parallaxOffsetsRef.current = newParallaxOffsets

      // Spawn obstacles
      let newObstacles = obstaclesRef.current

      // Spawn ground obstacles
      const groundConfig = encounter.settings.groundObstacle
      const nextGroundSpawn =
        lastGroundSpawnRef.current +
        Math.random() * (groundConfig.spawnRate.max - groundConfig.spawnRate.min) +
        groundConfig.spawnRate.min

      if (frameCountRef.current >= nextGroundSpawn) {
        newObstacles = [
          ...newObstacles,
          {
            x: CANVAS_WIDTH,
            y: GROUND_Y,
            width: groundConfig.width || 30,
            height: groundConfig.height || 40,
            isAerial: false,
            id: obstacleIdCounterRef.current++,
            creationTime: Date.now(),
            spriteConfig: groundConfig.spriteConfig,
          },
        ]
        lastGroundSpawnRef.current = frameCountRef.current
      }

      // Spawn aerial obstacles (if configured)
      const aerialConfig = encounter.settings.aerialObstacle
      if (aerialConfig) {
        const nextAerialSpawn =
          lastAerialSpawnRef.current +
          Math.random() * (aerialConfig.spawnRate.max - aerialConfig.spawnRate.min) +
          aerialConfig.spawnRate.min

        if (frameCountRef.current >= nextAerialSpawn) {
          const aerialY = 60 + Math.random() * 60 // Random height between 60-120px
          newObstacles = [
            ...newObstacles,
            {
              x: CANVAS_WIDTH,
              y: aerialY,
              width: aerialConfig.width || 30,
              height: aerialConfig.height || 40,
              isAerial: true,
              id: obstacleIdCounterRef.current++,
              creationTime: Date.now(),
              spriteConfig: aerialConfig.spriteConfig,
            },
          ]
          lastAerialSpawnRef.current = frameCountRef.current
        }
      }

      // Update obstacle positions
      newObstacles = newObstacles
        .map((obs) => ({
          ...obs,
          x: obs.x - currentSpeed * deltaTime,
        }))
        .filter((obs) => obs.x + obs.width > 0)
      obstaclesRef.current = newObstacles

      // Update score
      const scoreIncrement = SCORE_PER_SECOND * deltaTime
      const newScore = scoreRef.current + scoreIncrement
      scoreRef.current = newScore

      let newCollectibles = collectiblesRef.current
      if (collectibleRewardConfigs.length > 0) {
        const playerWidth = encounter.settings.player?.renderWidth || PLAYER_SIZE
        const playerHeight = encounter.settings.player?.renderHeight || PLAYER_SIZE
        const collectibleSize = getCollectibleSize(playerWidth, playerHeight)
        const minY = 24
        const maxY = Math.min(CANVAS_HEIGHT * 0.42, playerHeight * 4.4)

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
          x: collectible.x - currentSpeed * deltaTime,
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

      // Batch update all state at once (2 setState calls instead of 6)
      setParallaxOffsets(newParallaxOffsets)
      setObstacles(newObstacles)
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
  }, [gameStarted, gameEnded, isPageVisible, encounter.settings, collectibleRewardConfigs])

  // Collision Detection
  useEffect(() => {
    if (gameEnded || !gameStarted || !isPageVisible) return

    // Add padding to make collision less aggressive
    const COLLISION_PADDING = 5 // Reduced padding since we have pixel perfect collision now

    // Define player box
    const playerWidth = encounter.settings.player?.renderWidth || PLAYER_SIZE
    const playerHeight = encounter.settings.player?.renderHeight || PLAYER_SIZE
    const playerBox = {
      x: PLAYER_X + COLLISION_PADDING,
      y: CANVAS_HEIGHT - GROUND_Y - playerY - playerHeight + COLLISION_PADDING,
      width: playerWidth - COLLISION_PADDING * 2,
      height: playerHeight - COLLISION_PADDING * 2,
    }

    // Determine current player frame
    const playerConfig = encounter.settings.player
    let playerFrameIndex = 0
    if (playerConfig) {
      const now = Date.now()
      const frameDuration = playerConfig.frameRate || 100
      const playerMask = masksRef.current[playerConfig.sheetUrl]
      const frameCount =
        playerConfig.frameCount ||
        (playerMask ? Math.floor(playerMask.height / playerConfig.frameHeight) : 1) ||
        1
      playerFrameIndex = Math.floor(now / frameDuration) % frameCount
    }

    for (const obs of obstacles) {
      const obsBox = {
        x: obs.x + COLLISION_PADDING,
        y: CANVAS_HEIGHT - obs.y - obs.height + COLLISION_PADDING,
        width: obs.width - COLLISION_PADDING * 2,
        height: obs.height - COLLISION_PADDING * 2,
      }

      // Broad Phase: AABB Check
      if (
        playerBox.x < obsBox.x + obsBox.width &&
        playerBox.x + playerBox.width > obsBox.x &&
        playerBox.y < obsBox.y + obsBox.height &&
        playerBox.y + playerBox.height > obsBox.y
      ) {
        // Narrow Phase: Pixel Check
        // Calculate intersection rectangle in screen coordinates
        const intersectX = Math.max(playerBox.x, obsBox.x)
        const intersectY = Math.max(playerBox.y, obsBox.y)
        const intersectW =
          Math.min(playerBox.x + playerBox.width, obsBox.x + obsBox.width) - intersectX
        const intersectH =
          Math.min(playerBox.y + playerBox.height, obsBox.y + obsBox.height) - intersectY

        if (intersectW > 0 && intersectH > 0) {
          // Get masks
          const playerUrl = playerConfig?.sheetUrl || encounter.settings.sprite
          const obsUrl =
            obs.spriteConfig?.sheetUrl ||
            (obs.isAerial
              ? encounter.settings.aerialObstacle?.sprite
              : encounter.settings.groundObstacle.sprite)

          // If no masks loaded yet, default to Hit (AABB overlap)
          // But technically effects run after render so masks might be ready
          const playerMask = masksRef.current[playerUrl]
          const obsMask = masksRef.current[obsUrl || '']

          // If either missing mask, assume collision (simple box fallback)
          if (!playerMask || !obsMask) {
            handleLoss()
            break
          }

          let pixelCollision = false
          // Check step size (higher = faster but less precise)
          const step = 2

          // Determine obstacle frame
          let obsFrameIndex = 0
          if (obs.spriteConfig) {
            const frameDuration = obs.spriteConfig.frameRate || 100
            const frameCount =
              obs.spriteConfig.frameCount ||
              (obsMask ? Math.floor(obsMask.height / obs.spriteConfig.frameHeight) : 1) ||
              1
            obsFrameIndex = Math.floor(Date.now() / frameDuration) % frameCount
          }

          for (let ix = 0; ix < intersectW; ix += step) {
            for (let iy = 0; iy < intersectH; iy += step) {
              const screenX = intersectX + ix
              const screenY = intersectY + iy

              // Player Pixel Check
              // Map screen pos relative to player box (unpadded)
              // We use the full render rect for mapping, so subtract padding logic offset
              const pRenderX = PLAYER_X
              const pRenderY = CANVAS_HEIGHT - GROUND_Y - playerY - playerHeight

              const pRelX = (screenX - pRenderX) / playerWidth
              const pRelY = (screenY - pRenderY) / playerHeight

              // Map to sheet coordinates
              let pOpaque = true // Assume opaque if simple sprite fallback
              if (playerConfig) {
                const pSheetX = Math.floor(pRelX * playerConfig.frameWidth)
                const pSheetY =
                  playerFrameIndex * playerConfig.frameHeight +
                  Math.floor(pRelY * playerConfig.frameHeight)
                pOpaque = playerMask.isOpaque(pSheetX, pSheetY)
              } else {
                // Fallback for simple image: check normalized coord
                pOpaque = playerMask.isOpaque(pRelX * playerMask.width, pRelY * playerMask.height)
              }

              if (!pOpaque) continue

              // Obstacle Pixel Check
              const oRenderX = obs.x
              const oRenderY = CANVAS_HEIGHT - obs.y - obs.height

              const oRelX = (screenX - oRenderX) / obs.width
              const oRelY = (screenY - oRenderY) / obs.height

              let oOpaque = true
              if (obs.spriteConfig) {
                const oSheetX = Math.floor(oRelX * obs.spriteConfig.frameWidth)
                const oSheetY =
                  obsFrameIndex * obs.spriteConfig.frameHeight +
                  Math.floor(oRelY * obs.spriteConfig.frameHeight)
                oOpaque = obsMask.isOpaque(oSheetX, oSheetY)
              } else {
                oOpaque = obsMask.isOpaque(oRelX * obsMask.width, oRelY * obsMask.height)
              }

              if (oOpaque) {
                pixelCollision = true
                break
              }
            }
            if (pixelCollision) break
          }

          if (pixelCollision) {
            handleLoss()
            break
          }
        }
      }
    }
  }, [obstacles, playerY, gameEnded, gameStarted, isPageVisible])

  useEffect(() => {
    if (gameEnded || !gameStarted || !isPageVisible || collectibles.length === 0) return

    const playerWidth = encounter.settings.player?.renderWidth || PLAYER_SIZE
    const playerHeight = encounter.settings.player?.renderHeight || PLAYER_SIZE
    const playerBox = {
      x: PLAYER_X,
      y: CANVAS_HEIGHT - GROUND_Y - playerY - playerHeight,
      width: playerWidth,
      height: playerHeight,
    }

    let collectedAny = false
    const remainingCollectibles = collectibles.filter((collectible) => {
      const collectibleBox = {
        x: collectible.x,
        y: CANVAS_HEIGHT - collectible.y - collectible.size,
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
  }, [collectibles, playerY, gameEnded, gameStarted, isPageVisible, encounter.settings.player, playSfx])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault()
        if (!e.repeat) {
          jump()
        }
      } else if (e.key === 'Shift') {
        e.preventDefault()
        if (!e.repeat) {
          boost()
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [jump, boost])

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
            <GameTimer timeLeft={timeLeft} totalTime={encounter.settings.timeLimit} />
          ) : undefined
        }
        onOutsideTap={jump}
        onOutsideSwipe={boost}
      >
            <Image
              src={encounter.settings.scene?.backdrop || '/games/run/backgrounds/sky.avif'}
              alt=""
              fill
              priority
              sizes="600px"
              className="object-cover"
            />
            {/* Parallax Backgrounds */}
            {encounter.settings.parallaxLayers.map((layer, i) => {
              const { backgroundPosition: backgroundAnchor = '0', ...layerStyle } =
                layer.style ?? {}

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
            <div
              className="absolute z-0 h-2 rounded-full bg-slate-950/22 blur-[2px] transition-transform"
              style={{
                left: `${PLAYER_X + 8}px`,
                bottom: `${GROUND_Y + 4}px`,
                width: `${renderedPlayerWidth * 0.75}px`,
                transform: isJumping ? 'scaleX(0.72)' : 'scaleX(1)',
              }}
            />
            {isBoosting && (
              <div
                className="absolute h-8 w-20 rounded-full bg-gradient-to-l from-white/0 via-white/34 to-white/0 blur-[2px]"
                style={{
                  left: `${PLAYER_X - 68}px`,
                  bottom: `${GROUND_Y + playerY + renderedPlayerHeight * 0.36}px`,
                }}
              />
            )}
            {(() => {
              const playerConfig = encounter.settings.player
              const isJumpingSprite = isJumping && encounter.settings.jumpSprite

              if (playerConfig && !isJumpingSprite) {
                const frameDuration = playerConfig.frameRate || 100
                const playerMask = masksRef.current[playerConfig.sheetUrl]
                const frameCount =
                  playerConfig.frameCount ||
                  (playerMask ? Math.floor(playerMask.height / playerConfig.frameHeight) : 1) ||
                  1
                const frameIndex = Math.floor(Date.now() / frameDuration) % frameCount

                // Calculate scaled frame height to insure perfect alignment
                const scale = playerConfig.renderWidth / playerConfig.frameWidth
                const scaledFrameHeight = playerConfig.frameHeight * scale

                return (
                  <div
                    className="absolute transition-none drop-shadow-lg"
                    style={{
                      left: `${PLAYER_X}px`,
                      bottom: `${GROUND_Y + playerY}px`,
                      width: `${playerConfig.renderWidth}px`,
                      height: `${playerConfig.renderHeight}px`,
                      backgroundImage: `url(${playerConfig.sheetUrl})`,
                      backgroundPosition: `0 -${frameIndex * scaledFrameHeight}px`,
                      backgroundSize: `${playerConfig.renderWidth}px auto`,
                      backgroundRepeat: 'no-repeat',
                      transform: 'scaleX(-1)', // Flip player sprite
                    }}
                  />
                )
              }

              return (
                <div
                  className="absolute transition-none"
                  style={{
                    left: `${PLAYER_X}px`,
                    bottom: `${GROUND_Y + playerY}px`,
                    width: `${PLAYER_SIZE}px`,
                    height: `${PLAYER_SIZE}px`,
                  }}
                >
                  <Image
                    src={
                      isJumping && encounter.settings.jumpSprite
                        ? encounter.settings.jumpSprite
                        : encounter.settings.sprite
                    }
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
                  bottom: `${collectible.y}px`,
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

            {/* Obstacles */}
            {obstacles.map((obs) => {
              if (obs.spriteConfig) {
                const frameDuration = obs.spriteConfig.frameRate || 100
                const obsMask = masksRef.current[obs.spriteConfig.sheetUrl]
                const frameCount =
                  obs.spriteConfig.frameCount ||
                  (obsMask ? Math.floor(obsMask.height / obs.spriteConfig.frameHeight) : 1) ||
                  1
                const frameIndex = Math.floor(Date.now() / frameDuration) % frameCount

                const scale = obs.spriteConfig.renderWidth / obs.spriteConfig.frameWidth
                const scaledFrameHeight = obs.spriteConfig.frameHeight * scale

                return (
                  <div
                    key={obs.id}
                    className="absolute"
                    style={{
                      left: `${obs.x}px`,
                      bottom: `${obs.y}px`,
                      width: `${obs.width}px`,
                      height: `${obs.height}px`,
                      backgroundImage: `url(${obs.spriteConfig.sheetUrl})`,
                      backgroundPosition: `0 -${frameIndex * scaledFrameHeight}px`,
                      backgroundSize: `${obs.spriteConfig.renderWidth}px auto`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                )
              }

              return (
                <div
                  key={obs.id}
                  className="absolute"
                  style={{
                    left: `${obs.x}px`,
                    bottom: `${obs.y}px`,
                    width: `${obs.width}px`,
                    height: `${obs.height}px`,
                  }}
                >
                  <Image
                    src={
                      obs.isAerial && encounter.settings.aerialObstacle
                        ? encounter.settings.aerialObstacle.sprite
                        : encounter.settings.groundObstacle.sprite
                    }
                    alt={obs.isAerial ? 'Aerial Obstacle' : 'Ground Obstacle'}
                    fill
                    sizes={`${obs.width}px`}
                    className="object-fill"
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
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  try {
                    const res = await startResearchEncounter(encounter.id, true)
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
