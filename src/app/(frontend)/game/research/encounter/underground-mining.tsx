'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { submitUndergroundMiningStrike } from '@/app/(frontend)/game/research/games/underground-mining'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  UndergroundMiningConfig,
  UndergroundMiningTool,
} from '@/data/games/underground-mining/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import {
  completeGame as completeGameActivity,
  startGame,
} from '@/utilities/games/client-action-recovery'
import type { UndergroundMiningPublicRound } from '@/utilities/research/underground-mining'
import type { GameDataKeys } from '@/utilities/requirements/analysis'
import { UndergroundMiningStage } from './underground-mining-stage'

const defaultActions = {
  start: startGame,
  strike: submitUndergroundMiningStrike,
  complete: completeGameActivity,
}
export type UndergroundMiningActions = typeof defaultActions

interface UndergroundMiningGameProps {
  encounter: UndergroundMiningConfig & { isEligibleForReplay?: boolean }
  initialState?: any
  actions?: UndergroundMiningActions
  onExit?: () => void
}

export function UndergroundMiningGame({
  encounter,
  actions = defaultActions,
  onExit,
}: UndergroundMiningGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const [round, setRound] = useState<UndergroundMiningPublicRound | null>(null)
  const [selectedTool, setSelectedTool] =
    useState<UndergroundMiningTool>('pickaxe')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [strikeError, setStrikeError] = useState<string | null>(null)
  const [isStriking, setIsStriking] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [isFinishing, setIsFinishing] = useState(false)
  const [finishError, setFinishError] = useState<string | null>(null)
  const [isReplaying, setIsReplaying] = useState(false)
  const strikePendingRef = useRef(false)
  const replayPendingRef = useRef(false)
  const completionRef = useRef(false)
  const completionInvalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)

  useEffect(() => {
    let disposed = false
    void (async () => {
      try {
        const response = await actions.start(encounter.id)
        if (disposed) return
        if (
          !response.success ||
          response.roundData?.kind !== 'underground-mining'
        ) {
          setLoadingError(response.error || 'The mining wall is unavailable.')
          return
        }
        setStartTime(response.startTime || Date.now())
        setRound(response.roundData as UndergroundMiningPublicRound)
      } catch {
        if (!disposed) setLoadingError('The mining wall could not be opened.')
      }
    })()
    return () => {
      disposed = true
    }
  }, [encounter.id, actions])

  const finish = useCallback(
    async (finalRound: UndergroundMiningPublicRound) => {
      if (completionRef.current) return
      completionRef.current = true
      setIsFinishing(true)
      setFinishError(null)
      try {
        const completion = await actions.complete(
          encounter.id,
          finalRound.status === 'cleared',
        )
        if (completion.error) throw new Error(completion.error)
        completionInvalidatesRef.current = completion.invalidates
        const cleared = finalRound.status === 'cleared' && completion.success
        setResult({
          success: cleared,
          message:
            completion.message ||
            (finalRound.status === 'cleared'
              ? `All ${finalRound.treasureCount} treasures recovered!`
              : encounter.settings.complete
                ? 'The wall collapsed before every treasure was recovered. No rewards earned.'
                : `${finalRound.foundItems.length} of ${finalRound.treasureCount} treasures recovered. Complete finds were saved.`),
          rewards: completion.summary,
        })
        playSfx(cleared ? 'good' : 'bad')
      } catch (error) {
        completionRef.current = false
        setFinishError(
          error instanceof Error
            ? error.message
            : 'Your finds could not be saved. Retry this result.',
        )
      } finally {
        setIsFinishing(false)
      }
    },
    [actions, encounter.id, encounter.settings.complete, playSfx],
  )

  useEffect(() => {
    if (!round || round.status === 'playing') return
    void finish(round)
  }, [finish, round])

  const strike = async (x: number, y: number) => {
    if (
      !round ||
      startTime === null ||
      strikePendingRef.current ||
      round.status !== 'playing'
    )
      return
    strikePendingRef.current = true
    setIsStriking(true)
    setStrikeError(null)
    playSfx('select')
    try {
      const response = await recoverGameAction(
        () =>
          actions.strike({
            encounterId: encounter.id,
            startTime,
            revision: round.revision,
            x,
            y,
            tool: selectedTool,
          }),
        'The strike could not be saved. Retry to continue this same wall.',
        (value) => (value.success ? undefined : value.error),
      )
      if (response.success) {
        setRound(response.round)
        if (response.round.foundItems.length > round.foundItems.length)
          playSfx('good')
      }
    } catch {
      setStrikeError('The strike could not be saved. Please try again.')
    } finally {
      strikePendingRef.current = false
      setIsStriking(false)
    }
  }

  const close = () => {
    if (onExit) {
      onExit()
      return
    }
    void refreshUser(true, completionInvalidatesRef.current)
    router.push('/game/explore')
  }

  const replay = async () => {
    if (replayPendingRef.current) return
    replayPendingRef.current = true
    setIsReplaying(true)
    try {
      const next = await actions.start(encounter.id, true)
      if (!next.success || next.roundData?.kind !== 'underground-mining') {
        setLoadingError(
          next.error || 'A new mining wall could not be prepared.',
        )
        return
      }
      completionRef.current = false
      completionInvalidatesRef.current = undefined
      setLoadingError(null)
      setStrikeError(null)
      setFinishError(null)
      setSelectedTool('pickaxe')
      setStartTime(next.startTime || Date.now())
      setRound(next.roundData as UndergroundMiningPublicRound)
      setResult(null)
    } finally {
      replayPendingRef.current = false
      setIsReplaying(false)
    }
  }

  if (!round) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-game-canvas px-5 text-game-ink">
        <div className="flex max-w-sm flex-col items-center gap-3 text-center">
          {loadingError ? (
            <>
              <p role="alert" className="text-sm text-game-danger">
                {loadingError}
              </p>
              <Button onClick={() => router.refresh()}>Try again</Button>
              <Button variant="outline" onClick={close}>
                Return to Explore
              </Button>
            </>
          ) : (
            <>
              <LoadingSpinner size="lg" />
              <p role="status" className="sr-only">
                Preparing the mining wall
              </p>
            </>
          )}
        </div>
      </main>
    )
  }

  return (
    <>
      <UndergroundMiningStage
        name={encounter.name}
        settings={encounter.settings}
        round={round}
        selectedTool={selectedTool}
        busy={isStriking || isFinishing}
        error={strikeError || loadingError}
        onToolChange={setSelectedTool}
        onStrike={strike}
      />
      {finishError && !result ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-game-charcoal/55 p-5">
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-xl border border-game-border bg-game-surface-raised px-6 py-5 text-center text-game-ink shadow-sm">
            <p className="font-semibold">
              {round.status === 'cleared'
                ? 'Treasures recovered!'
                : 'The wall collapsed'}
            </p>
            <p role="alert" className="text-sm text-game-danger">
              {finishError}
            </p>
            <Button onClick={() => void finish(round)}>Retry saving</Button>
            <Button variant="outline" onClick={close}>
              Return to Explore
            </Button>
          </div>
        </div>
      ) : null}
      {result ? (
        <RewardResultOverlay
          result={result}
          onClose={close}
          icon={encounter.icon}
          iconAlt={encounter.name}
          background={encounter.settings.wallTexture || encounter.background}
          title={result.success ? 'Treasures recovered!' : 'The wall collapsed'}
          secondaryAction={
            encounter.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={replay}
                className="w-full"
                disabled={isReplaying}
              >
                {isReplaying ? 'Preparing…' : 'Mine again'}
              </Button>
            ) : undefined
          }
        />
      ) : null}
    </>
  )
}
