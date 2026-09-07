'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import type { RhythmConfig } from '@/data/games/rhythm/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'

interface RhythmGameProps { encounter: RhythmConfig; initialState?: any }

export function RhythmGame({ encounter, initialState }: RhythmGameProps) {
  useGameMusic(encounter)
  const session = useArcadeSession('rhythm', encounter)
  const { simulation, countdown, result, timeLeft } = session
  const gameStarted = Boolean(simulation)
  const gameEnded = Boolean(simulation && simulation.status !== 'playing')
  const lastHit = simulation?.lastHit && simulation.tick - simulation.lastHit.tick < 30 ? simulation.lastHit : null
  const trackRef = useRef<HTMLDivElement>(null)
  const { icons, winScore } = encounter.settings
  const isEndlessMode = encounter.settings.endless?.enabled || false
  const score = simulation?.score || 0
  const movingIcons = (simulation?.rhythmIcons || []).map((icon) => ({ ...icon, iconData: icons[icon.iconIndex] }))
  const TARGET_POSITION = 85
  const PERFECT_THRESHOLD = 8
  const GREAT_THRESHOLD = 23
  const GOOD_THRESHOLD = 33
  const handleIconClick = (id: string) => session.sendInput('rhythm', icons.findIndex((icon) => icon.id === id))

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Track Area (Top 40%) */}
          <div className="relative h-[40%] overflow-hidden bg-game-night-surface">
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
              <GameTimer
                timeLeft={timeLeft}
                totalTime={encounter.settings.timeLimit}
              />
            </div>

            {/* Score Display (Pill Style) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-row gap-3 z-50 pointer-events-none">
              <div className="flex items-center gap-2 rounded-full border border-game-border bg-game-surface-raised px-4 py-2 font-bold text-game-ink shadow-sm backdrop-blur-sm">
                <span className="text-sm">
                  {isEndlessMode ? (
                    <>Score: {Math.floor(score)}</>
                  ) : (
                    <>
                      Score: {Math.floor(score)} / {winScore || 0}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Track */}
            <div
              ref={trackRef}
              className="absolute bottom-8 left-1/2 h-24 w-[calc(100%-2rem)] max-w-[450px] -translate-x-1/2 overflow-hidden rounded-lg border-2 border-[#5b686b] bg-[#22353d]/90"
            >
              {/* Target Shadow Zone - Dynamic color based on closest icon */}
              {(() => {
                // Calculate what the current hit quality would be
                const trackWidth = 300
                const targetX = (TARGET_POSITION / 100) * trackWidth

                // Find the closest icon to target
                let closestDistance = Infinity
                for (const icon of movingIcons) {
                  const iconCenter = icon.x + 32
                  const distance = Math.abs(iconCenter - targetX)
                  if (distance < closestDistance) {
                    closestDistance = distance
                  }
                }

                // Determine ring color based on distance
                let ringColor = 'border-[#748083] bg-[#46545a]/50'
                if (closestDistance <= PERFECT_THRESHOLD) {
                  ringColor = 'border-yellow-400 bg-yellow-500/30'
                } else if (closestDistance <= GREAT_THRESHOLD) {
                  ringColor = 'border-green-400 bg-green-500/30'
                } else if (closestDistance <= GOOD_THRESHOLD) {
                  ringColor = 'border-blue-400 bg-blue-500/30'
                }

                return (
                  <div
                    className="absolute bottom-0 top-0 flex w-20 items-center justify-center border-l-2 border-r-2 border-dashed border-[#748083] bg-[#5b686b]/50"
                    style={{
                      left: `${TARGET_POSITION}%`,
                      width: `${80 / 3}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div
                      className={`w-4/5 aspect-square rounded-full border-2 border-dashed transition-colors duration-100 ${ringColor}`}
                    />
                  </div>
                )
              })()}

              {/* Moving Icons - Circular containers matching target ring */}
              {movingIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="absolute top-1/2 flex aspect-square items-center justify-center rounded-full border-2 border-[#5b686b] bg-[#22353d]/90 transition-none"
                  style={{
                    left: `${icon.x / 3}%`,
                    width: `${64 / 3}%`,
                    transform: 'translateY(-50%)',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    zIndex: 10,
                  }}
                >
                  <TaskIconDisplay
                    icon={icon.iconData}
                    className="w-10 h-10 drop-shadow-lg"
                  />
                </div>
              ))}

              {/* Hit Feedback */}
              {lastHit && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-lg font-black pointer-events-none animate-in zoom-in-50 fade-out-0 duration-500 ${
                    lastHit.type === 'PERFECT'
                      ? 'text-yellow-400'
                      : lastHit.type === 'GREAT'
                        ? 'text-green-400'
                        : lastHit.type === 'GOOD'
                          ? 'text-blue-400'
                          : 'text-red-400'
                  }`}
                  style={{ left: '85%' }}
                >
                  {lastHit.type}!
                </div>
              )}
            </div>

            {/* Countdown Overlay - Outside track to prevent clipping */}
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

          {/* Icon Selection Area (Bottom 60%) */}
          <div className="game-paper-background h-[60%] border-t border-game-border bg-game-surface p-6 text-game-ink">
            <div className="h-full flex flex-col">
              <div className="text-center mb-6">
                <p className="text-xs uppercase tracking-wider text-game-muted">
                  Tap the matching icon
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-game-ink">
                  when it reaches the target!
                </h3>
                <hr className="mt-4 border-game-border" />
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-wrap gap-4 justify-center">
                  {icons.map((icon) => (
                    <Button
                      key={icon.id}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-center justify-center gap-2 min-w-28 touch-manipulation select-none"
                      onPointerDown={(e) => {
                        if (gameEnded) return
                        e.preventDefault()
                        handleIconClick(icon.id)
                      }}
                      onClick={(event) => { if (event.detail === 0) handleIconClick(icon.id) }}
                      aria-label={icon.label || `Play ${icon.id}`}
                      disabled={gameEnded || countdown > 0}
                    >
                      <div className="w-20 h-20 relative flex items-center justify-center">
                        <TaskIconDisplay icon={icon} className="w-16 h-16" />
                      </div>
                      {icon.label && (
                        <span className="text-xs text-game-muted">
                          {icon.label}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
