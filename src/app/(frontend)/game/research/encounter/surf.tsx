'use client'

import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import type { SurfGameConfig } from '@/data/games/surf/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { clampSurfPlayerX, getSurfCoursePosition, getSurfEmergenceOpacity, getSurfParallaxFrames } from '@/utilities/research/surf'
import { EndlessCollectibleSprite } from './endless-collectibles'

const DESIGN_WIDTH = 390
const DESIGN_HEIGHT = 844
const PLAYER_Y = 0.79
interface SurfGameProps { encounter: SurfGameConfig; initialState?: any }

export function SurfGame({ encounter, initialState }: SurfGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const session = useArcadeSession('surf', encounter)
  const { simulation, countdown, saving, result, timeLeft } = session
  const settings = encounter.settings
  const stageRef = useRef<HTMLDivElement>(null)
  const targetXRef = useRef(0.5)
  const playerXRef = useRef(0.5)
  const [spriteFramesFailed, setSpriteFramesFailed] = useState(false)
  const playerX = simulation?.playerX ?? 0.5
  playerXRef.current = playerX
  targetXRef.current = simulation?.targetX ?? 0.5
  const waterOffset = simulation?.distance || 0
  const score = simulation?.score || 0
  const obstacles = simulation?.surfObstacles || []
  const collectibles = simulation?.collectibles || []
  const gameEnded = Boolean(simulation && simulation.status !== 'playing')
  const startError: string | null = null
  const isEndlessMode = settings.endless?.enabled === true
  const playerWidth = settings.playerWidth || 104
  const playerHeight = settings.playerHeight || 104
  const normalizedPlayerWidth = playerWidth / DESIGN_WIDTH
  const normalizedPlayerHeight = playerHeight / DESIGN_HEIGHT
  const spriteFrameIndex = settings.spriteFrames?.length
    ? Math.floor(waterOffset / (settings.spriteFrameDistance || 24)) % settings.spriteFrames.length : 0
  const replay = session.replay

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select, button, [role="dialog"]')) return
      if (!['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) return
      event.preventDefault()
      if (event.repeat) return
      session.sendInput('steer', event.type === 'keyup' ? playerXRef.current : ['ArrowLeft', 'a'].includes(event.key) ? 0 : 1)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey) }
  }, [session.sendInput])

  const steerToPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (gameEnded || countdown > 0 || saving) return
    const bounds = event.currentTarget.getBoundingClientRect()
    session.sendInput('steer', clampSurfPlayerX((event.clientX - bounds.left) / bounds.width, normalizedPlayerWidth))
  }

  const waterMotionOffset = waterOffset % 2400
  const scenePhase = (waterMotionOffset / 2400) * Math.PI * 2
  const waterSway = Math.sin(scenePhase * 3) * 10
  const parallax = settings.scene.parallax
  const horizonY = parallax?.horizonY ?? 0.28
  const islandFrames = getSurfParallaxFrames(waterOffset, 3000)
  const farCloudFrames = getSurfParallaxFrames(waterOffset, 5200)
  const nearCloudFrames = getSurfParallaxFrames(waterOffset, 4200)
  const cloudDrift = Math.sin(waterOffset / 900) * 1.8
  const steeringLean = Math.max(
    -1,
    Math.min(1, (targetXRef.current - playerX) * 7),
  )

  return (
    <main className="game-night relative flex h-dvh min-h-0 w-full overflow-hidden bg-game-night-canvas text-game-night-ink">
      <Image
        src={encounter.background || settings.scene.backdrop}
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-55 blur-2xl"
      />
      <div className="absolute inset-0 bg-[#071923]/45" />

      <div
        ref={stageRef}
        role="application"
        aria-label={`${encounter.name}. Drag horizontally or use the left and right arrow keys to steer.`}
        className="relative mx-auto h-dvh w-full max-w-[520px] touch-none overflow-hidden bg-[#1d8da8] shadow-[0_0_60px_rgba(2,20,31,0.65)] select-none"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          steerToPointer(event)
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            steerToPointer(event)
          }
        }}
      >
        <Image
          src={settings.scene.backdrop}
          alt="A sunlit Kanto coastal route"
          fill
          priority
          sizes="(max-width: 520px) 100vw, 520px"
          className="object-cover"
        />

        {parallax ? (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {farCloudFrames.map((frame, index) => (
              <div
                key={`far-cloud-${index}`}
                className={`surf-parallax-layer absolute inset-0 ${index === 1 ? 'surf-parallax-previous' : ''}`}
                style={{
                  opacity: frame.opacity,
                  transform: `translate3d(${cloudDrift}%, 0, 0) scale(${1 + frame.phase * 0.035})`,
                  transformOrigin: `50% ${horizonY * 100}%`,
                }}
              >
                <Image
                  src={parallax.cloudsFar}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 520px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
            ))}

            <div
              className="absolute inset-x-0 top-0 overflow-hidden"
              style={{ height: `${horizonY * 100}%` }}
            >
              {nearCloudFrames.map((frame, index) => (
                <div
                  key={`near-cloud-${index}`}
                  className={`surf-parallax-layer absolute inset-0 ${index === 1 ? 'surf-parallax-previous' : ''}`}
                  style={{
                    opacity: frame.opacity,
                    transform: `translate3d(${cloudDrift * 1.35}%, 0, 0) scale(${1 + frame.phase * 0.06})`,
                    transformOrigin: '50% 100%',
                  }}
                >
                  <div className="absolute inset-x-0 top-[-35%] h-[351%]">
                    <Image
                      src={parallax.cloudsNear}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 520px) 100vw, 520px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {islandFrames.map((frame, index) => (
              <div
                key={`islands-${index}`}
                className={`surf-parallax-layer absolute inset-0 ${index === 1 ? 'surf-parallax-previous' : ''}`}
                style={{
                  opacity: frame.opacity,
                  transform: `scale(${1 + frame.phase * 0.23})`,
                  transformOrigin: `50% ${horizonY * 100}%`,
                }}
              >
                <Image
                  src={parallax.islands}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 520px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
            ))}

            <div
              className="absolute inset-x-[-8%] h-[5%] bg-[linear-gradient(to_bottom,transparent,rgba(228,251,250,0.34)_48%,transparent)] blur-[3px] mix-blend-screen"
              style={{ top: `${(horizonY - 0.022) * 100}%` }}
            />
          </div>
        ) : null}

        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[38%] opacity-35 mix-blend-screen motion-reduce:hidden"
          style={{
            backgroundImage:
              'repeating-linear-gradient(176deg, transparent 0 34px, rgba(255,255,255,0.3) 36px, transparent 40px 68px)',
            backgroundPosition: `center ${waterMotionOffset}px`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-[43%] opacity-30 mix-blend-screen motion-reduce:hidden"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, transparent 0 30%, rgba(219,252,255,0.3) 32%, transparent 36%), repeating-linear-gradient(4deg, transparent 0 44px, rgba(202,248,250,0.2) 46px, transparent 50px 82px)',
            backgroundPosition: `${waterSway}px ${waterMotionOffset * 0.68}px`,
            backgroundSize: '150% 118px, 112% 132px',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-[-12%] bottom-[-8%] h-[44%] opacity-35 mix-blend-screen motion-reduce:hidden"
          style={{
            backgroundImage:
              'repeating-radial-gradient(ellipse at center top, transparent 0 29px, rgba(238,255,255,0.27) 31px, transparent 35px 65px)',
            backgroundPosition: `${-waterSway}px ${waterMotionOffset * 1.12}px`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,37,48,0.08),transparent_42%,rgba(3,42,55,0.18))]"
        />

        {obstacles.map((obstacle) => {
          const position = getSurfCoursePosition(obstacle.x, obstacle.progress)
          const emergenceOpacity = getSurfEmergenceOpacity(obstacle.progress)
          const width = obstacle.config.width * position.scale
          const height = obstacle.config.height * position.scale
          return (
            <div
              key={obstacle.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                width,
                height,
                opacity: emergenceOpacity,
                filter: `blur(${(1 - emergenceOpacity) * 1.4}px) saturate(${0.82 + emergenceOpacity * 0.18})`,
              }}
            >
              <div className="absolute inset-x-[14%] bottom-[8%] z-0 h-[18%] rounded-[50%] bg-[#073b49]/35 blur-[2px] mix-blend-multiply" />
              <Image
                src={obstacle.config.sprite}
                alt=""
                fill
                sizes={`${Math.ceil(width)}px`}
                className="z-10 object-contain drop-shadow-[0_10px_9px_rgba(0,36,48,0.28)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 z-20 bg-[linear-gradient(to_top,rgba(189,247,250,0.34),rgba(157,231,239,0.1)_38%,transparent_66%)] mix-blend-screen"
                style={{
                  WebkitMaskImage: `url("${obstacle.config.sprite}")`,
                  maskImage: `url("${obstacle.config.sprite}")`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </div>
          )
        })}

        {collectibles.map((collectible) => {
          const position = getSurfCoursePosition(
            collectible.x,
            collectible.progress,
          )
          const emergenceOpacity = getSurfEmergenceOpacity(collectible.progress)
          const size = 46 * position.scale
          return (
            <div
              key={collectible.id}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x * 100}%`,
                top: `${position.y * 100}%`,
                width: size,
                height: size,
                opacity: emergenceOpacity,
                filter: `blur(${(1 - emergenceOpacity) * 1.2}px) saturate(${0.86 + emergenceOpacity * 0.14})`,
              }}
            >
              <div className="absolute inset-x-[12%] bottom-[-2%] h-[22%] rounded-[50%] bg-[#073b49]/30 blur-[2px] mix-blend-multiply" />
              <div className="relative z-10 h-full w-full">
                <EndlessCollectibleSprite
                  reward={collectible.reward}
                  size={size}
                />
              </div>
            </div>
          )
        })}

        <div
          aria-hidden
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${playerX * 100}%`,
            top: `${PLAYER_Y * 100}%`,
            width: playerWidth,
            height: playerHeight,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[166%] w-[138%]"
            style={{
              transform: `translate(-50%, -50%) rotate(${steeringLean * 4}deg)`,
            }}
          >
            <div className="surf-wake-soft absolute left-1/2 top-[43%] h-[112%] w-[118%] motion-reduce:opacity-60" />
            <div className="surf-wake-plume surf-wake-plume-left absolute left-[15%] top-[62%] h-[116%] w-[42%] motion-reduce:opacity-40" />
            <div className="surf-wake-plume surf-wake-plume-right absolute right-[15%] top-[62%] h-[116%] w-[42%] motion-reduce:opacity-40" />
            <div className="surf-spray surf-spray-left absolute left-[8%] top-[57%] h-2.5 w-2.5 rounded-full bg-white/55 shadow-[16px_13px_5px_-2px_rgba(232,255,255,0.58),-7px_27px_6px_-3px_rgba(232,255,255,0.46)] blur-[1px] motion-reduce:hidden" />
            <div className="surf-spray surf-spray-right absolute right-[8%] top-[57%] h-2.5 w-2.5 rounded-full bg-white/55 shadow-[-16px_13px_5px_-2px_rgba(232,255,255,0.58),7px_27px_6px_-3px_rgba(232,255,255,0.46)] blur-[1px] motion-reduce:hidden" />
          </div>
          <div
            className="absolute left-1/2 top-1/2 h-[166%] w-[138%]"
            style={{
              transform: `translate(-50%, -50%) rotate(${steeringLean * 4}deg)`,
            }}
          >
            <div className="surf-player-art relative h-full w-full">
              <Image
                src={settings.sprite}
                alt=""
                fill
                priority
                sizes={`${Math.ceil(playerWidth * 1.4)}px`}
                className={`object-contain drop-shadow-[0_10px_7px_rgba(1,35,47,0.42)] ${
                  settings.spriteFrames?.length && !spriteFramesFailed
                    ? 'hidden motion-reduce:block'
                    : ''
                }`}
              />
              {settings.spriteFrames?.map((frame, index) => (
                <Image
                  key={frame}
                  src={frame}
                  alt=""
                  fill
                  loading="eager"
                  sizes={`${Math.ceil(playerWidth * 1.4)}px`}
                  onError={() => setSpriteFramesFailed(true)}
                  className={`surf-player-frame object-contain drop-shadow-[0_10px_7px_rgba(1,35,47,0.42)] motion-reduce:hidden ${
                    spriteFramesFailed
                      ? 'hidden'
                      : index === spriteFrameIndex
                        ? 'opacity-100'
                        : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <header className="pointer-events-none absolute inset-x-0 top-0 z-40 grid grid-cols-[minmax(2.75rem,1fr)_auto_minmax(2.75rem,1fr)] items-start gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="min-w-11">
            {settings.timeLimit ? (
              <GameTimer timeLeft={timeLeft} totalTime={settings.timeLimit} />
            ) : null}
          </div>
          <div className="rounded-lg border border-game-border/70 bg-game-surface/90 px-4 py-2 text-center text-game-ink shadow-lg backdrop-blur-md">
            <p className="text-[10px] font-semibold text-game-muted">
              Distance
            </p>
            <p className="font-mono text-lg font-bold leading-none">
              {Math.floor(score)}
              {!isEndlessMode && settings.winScore
                ? ` / ${settings.winScore}`
                : ''}
            </p>
          </div>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={`Leave ${encounter.name}`}
            className="pointer-events-auto justify-self-end rounded-full border border-game-night-border/60 bg-game-night-surface/85 text-game-night-ink shadow-lg backdrop-blur-md transition-colors hover:bg-game-night-surface-raised hover:text-game-night-ink"
            onClick={() => router.push('/game/explore')}
          >
            <DoorOpen className="h-4 w-4" />
          </Button>
        </header>

        {countdown > 0 && !startError ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#071923]/35 px-6 backdrop-blur-[2px]">
            <GameTimer
              timeLeft={countdown}
              totalTime={3}
              size="xl"
              className="text-[#fff8e8] drop-shadow-xl"
              colorOverride="text-[#f0cc75]"
            />
            <p className="mt-5 rounded-lg border border-[#fff8e8]/25 bg-[#102f3a]/75 px-4 py-2 text-center text-sm font-semibold text-[#fff8e8] shadow-lg">
              Drag side to side to steer
            </p>
          </div>
        ) : null}

        {startError ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#071923]/60 p-6 backdrop-blur-sm">
            <div className="max-w-sm rounded-xl border border-game-border bg-game-surface p-5 text-center text-game-ink shadow-xl">
              <p className="font-semibold">Unable to start</p>
              <p className="mt-2 text-sm text-game-muted">{startError}</p>
              <Button
                className="mt-4"
                onClick={() => router.push('/game/explore')}
              >
                Back to Explore
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      {saving ? <p role="status" className="absolute inset-x-0 top-20 z-50 text-center text-sm text-white">Saving progress…</p> : null}
      {result ? (
        <RewardResultOverlay
          result={result}
          onClose={session.close}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Surf complete' : 'Course ended'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button size="lg" className="w-full" onClick={replay}>
                Surf again
              </Button>
            ) : undefined
          }
        />
      ) : null}
      <style>{`
        @keyframes surf-player-bob {
          0%, 100% { transform: translateY(2px) rotate(-0.65deg) scaleY(0.992); }
          50% { transform: translateY(-6px) rotate(0.65deg) scaleY(1.014); }
        }
        @keyframes surf-wake-breathe {
          0%, 100% { transform: translateX(-50%) scale(0.94, 0.97); opacity: 0.62; }
          50% { transform: translateX(-50%) scale(1.05, 1.03); opacity: 0.86; }
        }
        @keyframes surf-plume-left {
          0%, 100% { transform: rotate(9deg) scaleX(0.86); opacity: 0.42; }
          50% { transform: rotate(12deg) scaleX(1.08); opacity: 0.68; }
        }
        @keyframes surf-plume-right {
          0%, 100% { transform: rotate(-9deg) scaleX(0.86); opacity: 0.42; }
          50% { transform: rotate(-12deg) scaleX(1.08); opacity: 0.68; }
        }
        @keyframes surf-spray-left {
          0% { transform: translate(10px, 4px) scale(0.55); opacity: 0; }
          35% { opacity: 0.9; }
          100% { transform: translate(-18px, 34px) scale(1.1); opacity: 0; }
        }
        @keyframes surf-spray-right {
          0% { transform: translate(-10px, 4px) scale(0.55); opacity: 0; }
          35% { opacity: 0.9; }
          100% { transform: translate(18px, 34px) scale(1.1); opacity: 0; }
        }
        .surf-parallax-layer { will-change: transform, opacity; }
        .surf-player-art { animation: surf-player-bob 1.18s ease-in-out infinite; transform-origin: 50% 58%; }
        .surf-wake-soft {
          animation: surf-wake-breathe 1.04s ease-in-out infinite;
          transform: translateX(-50%);
          background:
            radial-gradient(ellipse at 50% 8%, transparent 0 4%, rgba(247,255,255,0.78) 15%, rgba(199,244,248,0.38) 34%, rgba(122,218,231,0.12) 56%, transparent 76%),
            radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.38), rgba(190,241,247,0.12) 48%, transparent 72%);
          filter: blur(7px);
        }
        .surf-wake-plume {
          background: radial-gradient(ellipse at 50% 8%, transparent 0 3%, rgba(241,255,255,0.52) 14%, rgba(181,237,245,0.2) 35%, rgba(121,213,227,0.07) 58%, transparent 76%);
          filter: blur(9px);
          transform-origin: 50% 5%;
        }
        .surf-wake-plume-left { animation: surf-plume-left 0.86s ease-in-out infinite; }
        .surf-wake-plume-right { animation: surf-plume-right 0.86s ease-in-out infinite; }
        .surf-spray-left { animation: surf-spray-left 1.05s ease-out infinite; }
        .surf-spray-right { animation: surf-spray-right 1.05s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .surf-parallax-layer,
          .surf-player-art,
          .surf-wake-soft,
          .surf-wake-plume,
          .surf-spray-left,
          .surf-spray-right { animation: none; }
          .surf-parallax-layer { transform: none !important; opacity: 1 !important; }
          .surf-parallax-previous { display: none; }
        }
      `}</style>
    </main>
  )
}
