'use client'

import {
  ArrowDown,
  ArrowUp,
  CircleHelp,
  GripVertical,
  ListChecks,
} from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  const [helpOpen, setHelpOpen] = useState(false)

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
    <div className="relative h-dvh min-h-0 overflow-hidden bg-game-night-canvas text-game-night-ink">
      <Image
        src={encounter.background || '/backgrounds/forest.avif'}
        alt=""
        fill
        priority
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-game-night-canvas/65" />

      <div className="absolute left-4 top-4 z-30">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-game-border-strong bg-game-surface-raised/95 text-game-moss-strong shadow-sm backdrop-blur-sm"
          onClick={() => setHelpOpen(true)}
          aria-label="How to play"
        >
          <CircleHelp className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute right-4 top-4 z-30">
        <GameTimer timeLeft={timeLeft} totalTime={timeLimit} />
      </div>

      <main className="game-desktop-activity-stage relative z-10 mx-auto flex h-dvh min-h-0 w-full max-w-5xl flex-col px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-20 sm:px-4 md:px-8 md:pb-8 md:pt-20">
        <section className="game-panel mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden p-3 md:p-5">
          <div className="mb-3 flex shrink-0 items-start justify-between gap-3 border-b border-game-border pb-3">
            <div className="min-w-0">
              <h1 className="truncate font-display text-lg font-semibold text-game-ink sm:text-xl">
                {encounter.name}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-xs text-game-muted sm:text-sm">
                <ListChecks className="h-4 w-4 shrink-0 text-game-moss-strong" />
                <span>Arrange the steps, then check your order.</span>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-game-border bg-game-surface-raised px-2.5 py-1 font-mono text-xs text-game-muted">
              {Math.max(0, maxSubmissions - submissions)} checks
            </span>
          </div>

          <ol
            className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1"
            aria-label="Ordered procedure steps"
          >
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
                  'grid grid-cols-[1.75rem_2.5rem_minmax(0,1fr)_5.25rem] items-center gap-1.5 rounded-lg border border-game-border bg-game-surface-raised p-1.5 text-game-ink shadow-sm sm:grid-cols-[2.25rem_2.75rem_minmax(0,1fr)_5.5rem] sm:gap-2 sm:p-2',
                  !gameEnded && 'cursor-grab active:cursor-grabbing',
                )}
              >
                <span className="flex h-9 items-center justify-center font-mono text-sm font-bold text-game-moss-strong">
                  {index + 1}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-game-border bg-game-surface sm:h-10 sm:w-10">
                  {card.icon ? (
                    <TaskIconDisplay icon={card.icon} className="h-7 w-7" />
                  ) : (
                    <GripVertical className="h-5 w-5 text-game-muted" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-tight sm:text-base">
                    {card.label}
                  </span>
                  {card.description ? (
                    <span className="mt-0.5 hidden text-xs leading-relaxed text-game-muted sm:block">
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

          <div className="mt-3 shrink-0 border-t border-game-border pt-3">
            {feedback ? (
              <p
                className="mb-3 rounded-lg border border-game-clay/40 bg-game-clay/10 p-3 text-sm text-game-ink"
                role="status"
              >
                {feedback}
              </p>
            ) : null}

            <Button
              type="button"
              onClick={() => void submit()}
              disabled={!gameStarted || gameEnded || isSubmitting}
              className="min-h-11 w-full"
            >
              {isSubmitting ? 'Checking sequence…' : 'Check procedure'}
            </Button>
          </div>
        </section>
      </main>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to play {encounter.name}</DialogTitle>
            <DialogDescription>{encounter.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm leading-relaxed text-game-ink">
            <p>
              Arrange all of the steps so each ingredient is prepared before it
              is used. More than one order may be safe when two steps do not
              depend on one another.
            </p>
            <p>
              Drag a step into place, or use its arrow buttons. You have{' '}
              <strong>{maxSubmissions} checks</strong> before the attempt ends.
            </p>
          </div>
        </DialogContent>
      </Dialog>

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
