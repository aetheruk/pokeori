'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { getCollisionMask, type CollisionMask } from '@/utilities/collision'
import { SideScrollerStage } from './side-scroller-stage'
import { EndlessCollectibleSprite } from './endless-collectibles'
import type { FlapGameConfig } from '@/data/games/flap/types'

interface FlapGameProps {
  encounter: FlapGameConfig
  initialState?: any
}

export function FlapGame({ encounter, initialState }: FlapGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const session = useArcadeSession('flap', encounter)
  const { simulation, countdown, result, timeLeft } = session
  const canvasRef = useRef<HTMLDivElement>(null)
  // Sprite dimensions only; collisions are resolved by the shared simulator.
  const masksRef = useRef<Record<string, CollisionMask>>({})
  const score = simulation?.score || 0
  const playerY = simulation?.playerY ?? 200
  const collectibles = simulation?.collectibles || []
  const parallaxOffsets =
    simulation?.parallaxOffsets ||
    encounter.settings.parallaxLayers.map(() => 0)
  const isEndlessMode = encounter.settings.endless?.enabled || false
  const PLAYER_X = 100
  const PLAYER_SIZE = 60
  const CANVAS_HEIGHT = 600
  const walls = simulation?.walls || []
  const enemies = simulation?.enemies || []
  const startError: string | null = null
  const flap = useCallback(() => session.sendInput('flap'), [session.sendInput])
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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, textarea, select, button, [role="dialog"]')
      )
        return
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
        {(simulation?.velocity || 0) < -1 && countdown <= 0 && (
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
