'use client'

import { useCallback, useEffect, useRef } from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useGameMusic } from '@/hooks/useGameMusic'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { SideScrollerCanvas } from './side-scroller-canvas'
import { SideScrollerStage } from './side-scroller-stage'
import type { RunGameConfig } from '@/data/games/run/types'

interface RunGameProps {
  encounter: RunGameConfig
  initialState?: any
  actions?: Parameters<typeof useArcadeSession>[2]
}

export function RunGame({ encounter, actions }: RunGameProps) {
  useGameMusic(encounter)
  const session = useArcadeSession('run', encounter, actions, {
    publishEveryTicks: 6,
  })
  const { simulation, renderFrameRef, countdown, result, timeLeft } = session
  const stageRef = useRef<HTMLDivElement>(null)
  const score = simulation?.score || 0
  const isEndlessMode = encounter.settings.endless?.enabled || false
  const jump = useCallback(() => session.sendInput('jump'), [session.sendInput])
  const boost = useCallback(
    () => session.sendInput('boost'),
    [session.sendInput],
  )

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
        jump()
      } else if (event.key === 'Shift') {
        event.preventDefault()
        boost()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jump, boost])

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
        overlay={
          countdown > 0 ? (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-ink/40">
              <GameTimer timeLeft={countdown} totalTime={3} size="xl" />
            </div>
          ) : undefined
        }
        onOutsideTap={jump}
        onOutsideSwipe={boost}
      >
        <SideScrollerCanvas
          gameType="run"
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
