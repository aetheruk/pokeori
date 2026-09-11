'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { SideScrollerCanvas } from './side-scroller-canvas'
import { SideScrollerStage } from './side-scroller-stage'
import type { FlapGameConfig } from '@/data/games/flap/types'

interface FlapGameProps {
  encounter: FlapGameConfig
  initialState?: any
  actions?: Parameters<typeof useArcadeSession>[2]
}

export function FlapGame({ encounter, initialState, actions }: FlapGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const session = useArcadeSession('flap', encounter, actions, {
    publishEveryTicks: 6,
  })
  const { simulation, renderFrameRef, countdown, result, timeLeft } = session
  const stageRef = useRef<HTMLDivElement>(null)
  const score = simulation?.score || 0
  const isEndlessMode = encounter.settings.endless?.enabled || false
  const startError: string | null = null
  const flap = useCallback(() => session.sendInput('flap'), [session.sendInput])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, textarea, select, button, [role="dialog"]')
      )
        return
      if (event.repeat) return
      if (
        event.key === ' ' ||
        event.key === 'ArrowUp' ||
        event.key === 'w'
      ) {
        event.preventDefault()
        flap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flap])

  const backdrop =
    encounter.settings.scene?.backdrop || '/games/run/backgrounds/sky.avif'

  return (
    <div className="game-night relative min-h-dvh overflow-hidden bg-game-night-canvas">
      <SideScrollerStage
        category={encounter.category}
        scene={encounter.settings.scene}
        fallbackBackdrop="/games/run/backgrounds/sky.avif"
        stageRef={stageRef}
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
        <SideScrollerCanvas
          gameType="flap"
          settings={encounter.settings}
          renderFrameRef={renderFrameRef}
          backdrop={backdrop}
          label={`${encounter.name} playfield`}
          active={countdown <= 0}
        />
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
