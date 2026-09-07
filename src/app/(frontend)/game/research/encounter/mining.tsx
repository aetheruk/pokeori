'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import type { MiningConfig } from '@/data/games/mining/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'

interface MiningGameProps { encounter: MiningConfig; initialState?: any }

export function MiningGame({ encounter, initialState }: MiningGameProps) {
  useGameMusic(encounter)
  const reducedMotion = useReducedMotion()
  const session = useArcadeSession('mining', encounter)
  const { simulation, countdown, saving, result, timeLeft } = session
  const gameStarted = Boolean(simulation)
  const gameEnded = Boolean(simulation && simulation.status !== 'playing')
  const lastHit = simulation?.lastHit && simulation.tick - simulation.lastHit.tick < 30 ? simulation.lastHit : null
  const barRef = useRef<HTMLDivElement>(null)
  const { itemHp, maxSwings, timeLimit, buttonIcon, miningTarget } = encounter.settings
  const currentHp = simulation?.hp ?? itemHp
  const swingsUsed = simulation?.swings || 0
  const chevronPosition = simulation?.miningPosition || 0
  const targetZone = { start: simulation?.targetStart || 0, end: (simulation?.targetStart || 0) + (simulation?.targetSize || 0) }
  const hpPercentage = currentHp / itemHp * 100
  const crackLevel = 100 - hpPercentage
  const isShattered = currentHp <= 0
  const shakeIntensity = !reducedMotion && lastHit?.type === 'PERFECT' ? 3 : 0
  const handleSwing = () => session.sendInput('mine')

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      {/* Shatter animation keyframes */}
      <style jsx global>{`
        @keyframes shatter {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--shatter-x), var(--shatter-y)) rotate(var(--shatter-rotate));
            opacity: 0;
          }
        }
      `}</style>
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Visual Area (Top 70% - includes background, rock, and bar) */}
          <div className="relative h-[70%] overflow-hidden bg-game-night-surface">
            {encounter.background && (
              <Image
                src={encounter.background}
                alt="Background"
                fill
                className="object-cover opacity-50"
              />
            )}

            {/* Timer - Top Right */}
            <div className="absolute top-4 right-4 z-50">
              <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
            </div>

            {/* HP and Swings - Top Left - App Style */}
            <div className="absolute top-4 left-4 z-50 flex gap-2">
              {/* HP Chip */}
              <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-3 py-1.5 shadow-sm backdrop-blur-sm">
                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-game-canvas">
                  <div
                    className="h-full bg-game-moss transition-all duration-300"
                    style={{ width: `${hpPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums text-game-ink">
                  {currentHp}
                </span>
              </div>

              {/* Swings Chip */}
              {maxSwings && (
                <div className="rounded-full border border-game-border bg-game-surface-raised px-3 py-1.5 shadow-sm backdrop-blur-sm">
                  <span className="text-xs font-medium tabular-nums text-game-ink">
                    {maxSwings - swingsUsed}
                  </span>
                </div>
              )}
            </div>

            {/* Mining Target Image - Centered */}
            <div
              className="absolute inset-0 flex items-center justify-center z-10 pb-20"
              style={{
                transform: `translate(${shakeIntensity * (Math.random() - 0.5)}px, ${shakeIntensity * (Math.random() - 0.5)}px)`,
              }}
            >
              {miningTarget && !isShattered && (
                <div className="relative drop-shadow-2xl">
                  <Image
                    src={miningTarget}
                    alt="Mining Target"
                    width={200}
                    height={200}
                    className="object-contain"
                    style={{
                      filter: `brightness(${Math.max(0.7, 1 - crackLevel / 300)}) saturate(${Math.max(0.85, 1 - crackLevel / 500)})`,
                    }}
                  />
                </div>
              )}

              {/* Shatter effect - image breaks into fragments */}
              {isShattered && miningTarget && (
                <div className="relative w-[200px] h-[200px]">
                  {/* Generate 9 shards (3x3 grid) */}
                  {[...Array(9)].map((_, i) => {
                    const row = Math.floor(i / 3)
                    const col = i % 3
                    // Random direction for each shard
                    const angle = i * 40 + Math.random() * 20
                    const distance = 80 + Math.random() * 60
                    const rotation = (Math.random() - 0.5) * 720
                    const delay = i * 30

                    return (
                      <div
                        key={i}
                        className="absolute w-[200px] h-[200px] motion-safe:animate-[shatter_0.8s_ease-out_forwards]"
                        style={{
                          clipPath: `polygon(
                            ${col * 33.33}% ${row * 33.33}%,
                            ${(col + 1) * 33.33}% ${row * 33.33}%,
                            ${(col + 1) * 33.33}% ${(row + 1) * 33.33}%,
                            ${col * 33.33}% ${(row + 1) * 33.33}%
                          )`,
                          animationDelay: `${delay}ms`,
                          ['--shatter-x' as any]: `${Math.cos((angle * Math.PI) / 180) * distance}px`,
                          ['--shatter-y' as any]: `${Math.sin((angle * Math.PI) / 180) * distance}px`,
                          ['--shatter-rotate' as any]: `${rotation}deg`,
                        }}
                      >
                        <Image
                          src={miningTarget}
                          alt=""
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Mining Bar - Bottom of visual area */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div
                ref={barRef}
                className="relative h-8 overflow-hidden rounded-full border border-game-border bg-game-canvas/90 backdrop-blur-sm"
              >
                {/* OK Zones (lighter teal) */}
                <div
                  className="absolute bottom-0 top-0 bg-game-moss/20"
                  style={{
                    left: `${Math.max(0, targetZone.start - (targetZone.end - targetZone.start) * 0.1)}%`,
                    width: `${(targetZone.end - targetZone.start) * 0.1}%`,
                  }}
                />
                <div
                  className="absolute bottom-0 top-0 bg-game-moss/20"
                  style={{
                    left: `${targetZone.end}%`,
                    width: `${Math.min((targetZone.end - targetZone.start) * 0.1, 100 - targetZone.end)}%`,
                  }}
                />

                {/* Perfect Zone (solid teal) */}
                <div
                  className="absolute bottom-0 top-0 bg-game-moss/55"
                  style={{
                    left: `${targetZone.start}%`,
                    width: `${targetZone.end - targetZone.start}%`,
                  }}
                />

                {/* Line Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-yellow-400 transition-none rounded-full"
                  style={{
                    left: `${chevronPosition}%`,
                    transform: 'translateX(-50%)',
                  }}
                />

                {/* Hit Feedback */}
                {lastHit && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-sm font-black pointer-events-none animate-pulse ${
                      lastHit.type === 'PERFECT'
                        ? 'text-game-ochre'
                        : lastHit.type === 'OK'
                          ? 'text-game-moss'
                          : 'text-red-400'
                    }`}
                  >
                    {lastHit.type}!
                  </div>
                )}
              </div>
            </div>

            {/* Countdown Overlay */}
            {countdown > 0 && gameStarted && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#081014]/55 backdrop-blur-sm">
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
            )}
          </div>

          {/* Button Area (Bottom 30%) */}
          <div className="game-paper-background flex h-[30%] items-center justify-center border-t border-game-border bg-game-surface p-6">
            <Button
              size="lg"
              className="h-24 w-24 touch-manipulation select-none rounded-full border-4 border-game-clay bg-game-clay text-game-cream shadow-md hover:bg-game-clay/90"
              onPointerDown={(e) => {
                if (gameEnded) return
                e.preventDefault()
                handleSwing()
              }}
              onClick={(event) => { if (event.detail === 0) handleSwing() }}
              aria-label="Swing pickaxe"
              disabled={gameEnded || countdown > 0 || saving}
            >
              <TaskIconDisplay icon={buttonIcon} className="w-12 h-12" />
            </Button>
          </div>
        </div>
      </main>

      {saving && <p role="status" className="fixed top-20 inset-x-0 text-center z-50">Saving progress…</p>}
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={session.close}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Game Over'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={session.replay}
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
