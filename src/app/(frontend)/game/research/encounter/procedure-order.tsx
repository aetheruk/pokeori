'use client'

import { ArrowDown, ArrowUp, GripVertical, ListChecks } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  completeGame,
  startGame,
  submitGameAnswer,
} from '@/app/(frontend)/game/games/actions'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  ProcedureOrderCard,
  ProcedureOrderGameConfig,
} from '@/data/games/procedure-order'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'

interface ProcedureOrderGameProps {
  encounter: ProcedureOrderGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
}

function moveCard(
  cards: ProcedureOrderCard[],
  fromIndex: number,
  toIndex: number,
) {
  if (toIndex < 0 || toIndex >= cards.length || fromIndex === toIndex) {
    return cards
  }
  const next = [...cards]
  const [card] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, card)
  return next
}

export function ProcedureOrderGame({
  encounter,
  initialState,
}: ProcedureOrderGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const completionRef = useRef(false)
  const dragIndexRef = useRef<number | null>(null)
  const timeLimit = encounter.settings.timeLimit ?? 90
  const maxSubmissions = encounter.settings.maxSubmissions ?? 3

  const [cards, setCards] = useState<ProcedureOrderCard[]>(
    initialState?.roundData?.cards || encounter.settings.cards,
  )
  const [timeLeft, setTimeLeft] = useState(initialState?.timeLeft ?? timeLimit)
  const [submissions, setSubmissions] = useState(
    initialState?.roundData?.submissions || 0,
  )
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [result, setResult] = useState<any | null>(null)

  const finish = useCallback(
    async (success: boolean, message: string) => {
      if (completionRef.current) return
      completionRef.current = true
      setGameEnded(true)
      const completion = await completeGame(encounter.id, success)
      const finalSuccess = success && completion.success
      setResult({
        success: finalSuccess,
        message: finalSuccess
          ? 'The sequence holds together.'
          : completion.error || message,
        rewards: completion.summary,
      })
      playSfx(finalSuccess ? 'good' : 'bad')
    },
    [encounter.id, playSfx],
  )

  const initialise = useCallback(async () => {
    if (gameStarted) return
    const start = await startGame(encounter.id)
    if (!start.success) {
      setResult({
        success: false,
        message: start.error || 'Could not begin this procedure.',
      })
      return
    }
    setCards(start.roundData?.cards || encounter.settings.cards)
    setSubmissions(start.roundData?.submissions || 0)
    setTimeLeft(
      start.restored && start.expiry
        ? Math.max(0, Math.floor((start.expiry - Date.now()) / 1000))
        : timeLimit,
    )
    setGameStarted(true)
  }, [encounter.id, encounter.settings.cards, gameStarted, timeLimit])

  useEffect(() => {
    void initialise()
  }, [initialise])

  useEffect(() => {
    if (!gameStarted || gameEnded) return
    const timer = window.setInterval(() => {
      setTimeLeft((current: number) => {
        if (current <= 1) {
          void finish(false, 'Time ran out before the sequence was complete.')
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [finish, gameEnded, gameStarted])

  const submit = useCallback(async () => {
    if (isSubmitting || gameEnded) return
    setIsSubmitting(true)
    setFeedback(null)
    const answer = await submitGameAnswer({
      cardIds: cards.map((card) => card.id),
    })
    setIsSubmitting(false)

    if (!answer.success) {
      setFeedback(answer.error || 'That sequence could not be checked.')
      return
    }

    const nextSubmissions = Number(answer.submissions || submissions + 1)
    setSubmissions(nextSubmissions)
    if (answer.correct) {
      await finish(true, 'The sequence is complete.')
      return
    }
    if (answer.gameOver) {
      await finish(false, 'The safe sequence was not completed.')
      return
    }
    setFeedback(
      answer.message || 'That order leaves an important dependency unresolved.',
    )
    playSfx('bad')
  }, [cards, finish, gameEnded, isSubmitting, playSfx, submissions])

  const shift = (index: number, delta: number) => {
    setCards((current) => moveCard(current, index, index + delta))
    setFeedback(null)
    playSfx('select')
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-game-night-canvas text-game-night-ink">
      <Image
        src={encounter.background || '/backgrounds/forest.avif'}
        alt=""
        fill
        priority
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-game-night-canvas/65" />

      <main className="game-desktop-activity-stage relative z-10 mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-5 md:px-8 md:py-8">
        <header className="mb-4 flex items-start justify-between gap-4 rounded-xl border border-game-border bg-game-surface/95 p-4 text-game-ink shadow-sm">
          <div className="min-w-0">
            <p className="game-field-label">Procedure</p>
            <h1 className="mt-1 font-display text-2xl font-semibold">
              {encounter.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-game-muted">
              {encounter.description}
            </p>
          </div>
          <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
        </header>

        <section className="game-panel flex-1 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-game-muted">
              <ListChecks className="h-4 w-4 text-game-moss-strong" />
              Arrange every step, then check the procedure.
            </div>
            <span className="rounded-full border border-game-border bg-game-surface-raised px-3 py-1 font-mono text-xs text-game-muted">
              {Math.max(0, maxSubmissions - submissions)} checks left
            </span>
          </div>

          <ol className="space-y-2" aria-label="Ordered procedure steps">
            {cards.map((card, index) => (
              <li
                key={card.id}
                draggable={!gameEnded}
                onDragStart={() => {
                  dragIndexRef.current = index
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  const fromIndex = dragIndexRef.current
                  if (fromIndex === null) return
                  setCards((current) => moveCard(current, fromIndex, index))
                  dragIndexRef.current = null
                  setFeedback(null)
                  playSfx('select')
                }}
                className={cn(
                  'grid grid-cols-[2.25rem_2.75rem_minmax(0,1fr)_5.5rem] items-center gap-2 rounded-lg border border-game-border bg-game-surface-raised p-2 text-game-ink shadow-sm',
                  !gameEnded && 'cursor-grab active:cursor-grabbing',
                )}
              >
                <span className="flex h-9 w-9 items-center justify-center font-mono text-sm font-bold text-game-moss-strong">
                  {index + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-game-border bg-game-surface">
                  {card.icon ? (
                    <TaskIconDisplay icon={card.icon} className="h-7 w-7" />
                  ) : (
                    <GripVertical className="h-5 w-5 text-game-muted" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{card.label}</span>
                  {card.description ? (
                    <span className="mt-0.5 block text-xs leading-relaxed text-game-muted">
                      {card.description}
                    </span>
                  ) : null}
                </span>
                <span className="flex justify-end gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    disabled={index === 0 || gameEnded}
                    onClick={() => shift(index, -1)}
                    aria-label={`Move ${card.label} earlier`}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    disabled={index === cards.length - 1 || gameEnded}
                    onClick={() => shift(index, 1)}
                    aria-label={`Move ${card.label} later`}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-5 min-h-12">
            {feedback ? (
              <p
                className="rounded-lg border border-game-clay/40 bg-game-clay/10 p-3 text-sm text-game-ink"
                role="status"
              >
                {feedback}
              </p>
            ) : null}
          </div>

          <Button
            type="button"
            onClick={() => void submit()}
            disabled={!gameStarted || gameEnded || isSubmitting}
            className="mt-2 min-h-11 w-full"
          >
            {isSubmitting ? 'Checking sequence…' : 'Check procedure'}
          </Button>
        </section>
      </main>

      {result ? (
        <RewardResultOverlay
          result={result}
          onClose={async () => {
            if (result.success) await refreshUser()
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Fail'}
        />
      ) : null}
    </div>
  )
}
