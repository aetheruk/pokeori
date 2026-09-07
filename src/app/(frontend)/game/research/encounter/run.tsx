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
import type { RunGameConfig } from '@/data/games/run/types'

interface RunGameProps { encounter: RunGameConfig; initialState?: any }

export function RunGame({ encounter }: RunGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const session = useArcadeSession('run', encounter)
  const { simulation, countdown, saving, result, timeLeft } = session
  const canvasRef = useRef<HTMLDivElement>(null)
  // Sprite dimensions only; collisions are resolved by the shared simulator.
  const masksRef = useRef<Record<string, CollisionMask>>({})
  const score = simulation?.score || 0
  const playerY = simulation?.playerY ?? 0
  const collectibles = simulation?.collectibles || []
  const parallaxOffsets = simulation?.parallaxOffsets || encounter.settings.parallaxLayers.map(() => 0)
  const isEndlessMode = encounter.settings.endless?.enabled || false
  const PLAYER_X = 100
  const PLAYER_SIZE = 60
  const GROUND_Y = 5
  const renderedPlayerWidth = encounter.settings.player?.renderWidth || PLAYER_SIZE
  const renderedPlayerHeight = encounter.settings.player?.renderHeight || PLAYER_SIZE
  const obstacles = simulation?.obstacles || []
  const isJumping = simulation?.isJumping || false
  const isBoosting = !!simulation && simulation.tick < simulation.boostUntil
  const jump = useCallback(() => session.sendInput('jump'), [session.sendInput])
  const boost = useCallback(() => session.sendInput('boost'), [session.sendInput])
  // Load masks
  useEffect(() => {
    const loadMasks = async () => {
      const urls: string[] = []
      // Player
      if (encounter.settings.player?.sheetUrl)
        urls.push(encounter.settings.player.sheetUrl)
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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button, [role="dialog"]')) return
      if (event.repeat) return
      if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'w') {
        event.preventDefault()
        jump()
      } else if (event.key === 'Shift') { event.preventDefault(); boost() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
            <GameTimer
              timeLeft={timeLeft}
              totalTime={encounter.settings.timeLimit}
            />
          ) : undefined
        }
        overlay={countdown > 0 ? <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-ink/40"><GameTimer timeLeft={countdown} totalTime={3} size="xl" /></div> : undefined}
        onOutsideTap={jump}
        onOutsideSwipe={boost}
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
              (playerMask
                ? Math.floor(playerMask.height / playerConfig.frameHeight)
                : 1) ||
              1
            const frameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount

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
              (obsMask
                ? Math.floor(obsMask.height / obs.spriteConfig.frameHeight)
                : 1) ||
              1
            const frameIndex =
              Math.floor(Date.now() / frameDuration) % frameCount

            const scale =
              obs.spriteConfig.renderWidth / obs.spriteConfig.frameWidth
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

      {saving && <p role="status" className="fixed left-1/2 top-16 z-50 -translate-x-1/2 rounded-lg bg-game-surface-raised px-3 py-2 text-sm text-game-ink">Saving progress…</p>}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={session.close}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Fail'}
          secondaryAction={
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
