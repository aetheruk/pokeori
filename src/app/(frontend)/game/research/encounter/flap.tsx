'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import {
  SIDE_SCROLLER_TRANSITION,
  SideScrollerParallaxLayer,
  SideScrollerStage,
} from './side-scroller-stage'
import { EndlessCollectibleSprite } from './endless-collectibles'
import type { FlapGameConfig } from '@/data/games/flap/types'

interface FlapGameProps { encounter: FlapGameConfig; initialState?: any }

export function FlapGame({ encounter, initialState }: FlapGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const session = useArcadeSession('flap', encounter)
  const { simulation, countdown, result, timeLeft } = session
  const canvasRef = useRef<HTMLDivElement>(null)
  const spriteSheetHeightsRef = useRef<Record<string, number>>({})
  const score = simulation?.score || 0
  const playerY = simulation?.playerY ?? 200
  const collectibles = simulation?.collectibles || []
  const parallaxOffsets = simulation?.parallaxOffsets || encounter.settings.parallaxLayers.map(() => 0)
  const isEndlessMode = encounter.settings.endless?.enabled || false
  const PLAYER_X = 100
  const PLAYER_SIZE = 60
  const CANVAS_HEIGHT = 600
  const walls = simulation?.walls || []
  const enemies = simulation?.enemies || []
  const startError: string | null = null
  const flap = useCallback(() => session.sendInput('flap'), [session.sendInput])
  // Only the sheet height is needed to derive frame counts. Collision is
  // resolved by the shared simulator, so avoid an expensive canvas readback.
  useEffect(() => {
    let disposed = false

    const loadSpriteSheetHeights = async () => {
      const settings = encounter.settings
      const toLoad = new Set<string>()

      // Player Sprite
      if (typeof settings.sprite !== 'string') {
        toLoad.add(settings.sprite.sheetUrl)
      }

      // Enemy Sprite
      if (typeof settings.enemySprite !== 'string') {
        toLoad.add(settings.enemySprite.sheetUrl)
      }

      await Promise.all(
        [...toLoad].map(
          (url) =>
            new Promise<void>((resolve) => {
              const image = new window.Image()
              image.onload = () => {
                if (!disposed) {
                  spriteSheetHeightsRef.current[url] = image.naturalHeight
                }
                resolve()
              }
              image.onerror = () => resolve()
              image.src = url
            }),
        ),
      )
    }

    void loadSpriteSheetHeights()
    return () => {
      disposed = true
    }
  }, [encounter.settings])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button, [role="dialog"]')) return
      if (event.repeat) return
      if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'w') {
        event.preventDefault()
        flap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
          startError ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#081014]/60 p-6 backdrop-blur-sm">
              <div className="max-w-sm rounded-xl border border-game-border bg-game-surface p-5 text-center text-game-ink shadow-xl">
                <p className="font-semibold">Unable to start</p>
                <p className="mt-2 text-sm text-game-ink-muted">{startError}</p>
                <Button
                  className="mt-4"
                  onClick={() => router.push('/game/explore')}
                >
                  Back to Explore
                </Button>
              </div>
            </div>
          ) : countdown > 0 ? (
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
        {encounter.settings.parallaxLayers.map((layer, i) => (
          <SideScrollerParallaxLayer
            key={`${layer.url}:${i}`}
            layer={layer}
            offset={parallaxOffsets[i]}
          />
        ))}

        {/* Player */}
        {(simulation?.velocity || 0) < -1 && countdown <= 0 && (
          <div
            className="absolute h-8 w-24 rounded-full bg-gradient-to-l from-white/0 via-white/32 to-white/0 blur-[2px] will-change-transform"
            style={{
              left: `${PLAYER_X - 70}px`,
              top: `${PLAYER_SIZE * 0.35}px`,
              transform: `translate3d(0, ${playerY}px, 0)`,
              transition: SIDE_SCROLLER_TRANSITION,
            }}
          />
        )}
        {(() => {
          const spriteConfig = encounter.settings.sprite
          if (typeof spriteConfig !== 'string') {
            const frameDuration = spriteConfig.frameRate || 100
            const sheetHeight =
              spriteSheetHeightsRef.current[spriteConfig.sheetUrl]
            const frameCount =
              spriteConfig.frameCount ||
              (sheetHeight
                ? Math.floor(sheetHeight / spriteConfig.frameHeight)
                : 1) ||
              1
            const frameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount

            const scale = spriteConfig.renderWidth / spriteConfig.frameWidth
            const scaledFrameHeight = spriteConfig.frameHeight * scale

            return (
              <div
                className="absolute will-change-transform"
                style={{
                  left: `${PLAYER_X}px`,
                  top: '0px',
                  width: `${spriteConfig.renderWidth}px`,
                  height: `${spriteConfig.renderHeight}px`,
                  backgroundImage: `url(${spriteConfig.sheetUrl})`,
                  backgroundPosition: `0 -${frameIndex * scaledFrameHeight}px`,
                  backgroundSize: `${spriteConfig.renderWidth}px auto`,
                  backgroundRepeat: 'no-repeat',
                  transform: `translate3d(0, ${playerY}px, 0) scaleX(-1)`,
                  transition: SIDE_SCROLLER_TRANSITION,
                }}
              />
            )
          }

          return (
            <div
              className="absolute will-change-transform"
              style={{
                left: `${PLAYER_X}px`,
                top: '0px',
                width: `${PLAYER_SIZE}px`,
                height: `${PLAYER_SIZE}px`,
                transform: `translate3d(0, ${playerY}px, 0)`,
                transition: SIDE_SCROLLER_TRANSITION,
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
            className="absolute left-0 top-0 z-20 will-change-transform"
            style={{
              width: `${collectible.size}px`,
              height: `${collectible.size}px`,
              transform: `translate3d(${collectible.x}px, ${collectible.y}px, 0)`,
              transition: SIDE_SCROLLER_TRANSITION,
            }}
          >
            <EndlessCollectibleSprite
              reward={collectible.reward}
              size={collectible.size}
            />
          </div>
        ))}

        {/* Walls */}
        {walls.map((wall, index) => (
          <div
            key={wall.id ?? `legacy-wall:${index}`}
            className="absolute inset-y-0 left-0 will-change-transform"
            style={{
              width: `${wall.width}px`,
              transform: `translate3d(${wall.x}px, 0, 0)`,
              transition: SIDE_SCROLLER_TRANSITION,
            }}
          >
            {/* Top wall */}
            <div
              className="absolute left-0 top-0 w-full"
              style={{
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
              className="absolute left-0 w-full"
              style={{
                top: `${wall.gapY + wall.gapSize / 2}px`,
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
        {enemies.map((enemy, index) => {
          const enemyConfig = encounter.settings.enemySprite
          if (typeof enemyConfig !== 'string') {
            const frameDuration = enemyConfig.frameRate || 100
            const sheetHeight =
              spriteSheetHeightsRef.current[enemyConfig.sheetUrl]
            const frameCount =
              enemyConfig.frameCount ||
              (sheetHeight
                ? Math.floor(sheetHeight / enemyConfig.frameHeight)
                : 1) ||
              1
            const frameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount

            const scale = enemyConfig.renderWidth / enemyConfig.frameWidth
            const scaledFrameHeight = enemyConfig.frameHeight * scale

            return (
              <div
                key={enemy.id ?? `legacy-enemy:${index}`}
                className="absolute left-0 top-0 will-change-transform"
                style={{
                  width: `${enemyConfig.renderWidth}px`,
                  height: `${enemyConfig.renderHeight}px`,
                  backgroundImage: `url(${enemyConfig.sheetUrl})`,
                  backgroundPosition: `0 -${frameIndex * scaledFrameHeight}px`,
                  backgroundSize: `${enemyConfig.renderWidth}px auto`,
                  backgroundRepeat: 'no-repeat',
                  transform: `translate3d(${enemy.x}px, ${enemy.y}px, 0)`,
                  transition: SIDE_SCROLLER_TRANSITION,
                }}
              />
            )
          }

          return (
            <div
              key={enemy.id ?? `legacy-enemy:${index}`}
              className="absolute left-0 top-0 will-change-transform"
              style={{
                width: `${enemy.size}px`,
                height: `${enemy.size}px`,
                transform: `translate3d(${enemy.x}px, ${enemy.y}px, 0)`,
                transition: SIDE_SCROLLER_TRANSITION,
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
          onClose={session.close}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Fail'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={() => void session.replay()}
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
