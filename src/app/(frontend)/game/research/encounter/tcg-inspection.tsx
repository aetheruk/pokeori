'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { completeGame, startGame } from '@/utilities/games/client-action-recovery'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { TcgInspectionGameConfig } from '@/data/games'
import type { InspectionCard, InspectionQuestion, InspectionRound } from '@/utilities/research/tcg-inspection'
import { submitTcgInspectionAnswer } from '../games/tcg-inspection'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import type { GameDataKeys } from '@/utilities/requirements/analysis'
import { useGameMusic } from '@/hooks/useGameMusic'
import { QuestionPrompt } from '../../locations/encounter/_components/question-prompt'

interface TcgInspectionGameProps {
  encounter: TcgInspectionGameConfig
  initialState?: any
}

type Phase = 'study' | 'question'

export function TcgInspectionGame({
  encounter,
  initialState,
}: TcgInspectionGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()

  const settings = encounter.settings
  const packSize = settings.packSize
  const requiredAnswers = settings.requiredAnswers
  const studySeconds = settings.studySeconds || 30
  const maxLives = settings.lives || 2

  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [phase, setPhase] = useState<Phase>('study')
  const [studyLeft, setStudyLeft] = useState(studySeconds)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [previewDirection, setPreviewDirection] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [lives, setLives] = useState(maxLives)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft || settings.timeLimit,
  )
  const [cards, setCards] = useState<InspectionCard[]>([])
  const [questions, setQuestions] = useState<InspectionQuestion[]>([])
  const [answerStatus, setAnswerStatus] = useState<
    'correct' | 'incorrect' | null
  >(null)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const correctAnswersRef = useRef(0)
  const endingRef = useRef(false)
  const roundRef = useRef<InspectionRound | null>(null)
  const startTimeRef = useRef(0)
  const submittingRef = useRef(false)
  const completionInvalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const applyRound = useCallback((round: InspectionRound) => {
    roundRef.current = round
    setCards(round.cards)
    setQuestions(round.questions)
    setQuestionIndex(round.index)
    setCorrectAnswers(round.score)
    correctAnswersRef.current = round.score
    setLives(round.lives)
  }, [])

  const finishGame = useCallback(
    async (finalCorrectAnswers: number) => {
      if (endingRef.current) return
      endingRef.current = true
      setGameEnded(true)

      const success = finalCorrectAnswers >= requiredAnswers
      const res = await completeGame(encounter.id, success, finalCorrectAnswers)
      completionInvalidatesRef.current = res.invalidates
      setResult({
        success: success && res.success,
        message:
          success && res.success
            ? `Inspection passed: ${finalCorrectAnswers} correct answers`
            : `Correct answers: ${finalCorrectAnswers}`,
        rewards: res.summary,
      })
      playSfx(success && res.success ? 'good' : 'bad')
    },
    [encounter.id, playSfx, requiredAnswers],
  )

  const handleAnswer = useCallback(async (answer: string) => {
    const round = roundRef.current
    if (!round || answerStatus || gameEnded || submittingRef.current) return
    submittingRef.current = true
    setIsSubmitting(true)
    const request = { encounterId: encounter.id, startTime: startTimeRef.current,
      revision: round.revision, answer, actionId: crypto.randomUUID() }
    try {
      const response = await recoverGameAction(
        () => submitTcgInspectionAnswer(request),
        'We could not confirm this answer. Retry to save the same answer.',
        (result) => result.error === 'Time is up' ? undefined : result.success ? undefined : result.error,
      )
      if (!response.success || !response.round) {
        if (response.error === 'Time is up') await finishGame(round.score)
        return
      }
      roundRef.current = response.round
      setAnswerStatus(response.correct ? 'correct' : 'incorrect')
      setCorrectAnswers(response.round.score)
      correctAnswersRef.current = response.round.score
      setLives(response.round.lives)
      playSfx(response.correct ? 'good' : 'bad')
      await new Promise((resolve) => setTimeout(resolve, Math.max(0, response.round!.availableAt - Date.now())))
      applyRound(response.round)
      setAnswerStatus(null)
      if (response.gameOver) await finishGame(response.round.score)
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }, [answerStatus, gameEnded, encounter.id, applyRound, finishGame, playSfx])

  useEffect(() => {
    let mounted = true
    async function start() {
      const res = await startGame(encounter.id)
      if (!mounted) return
      if (!res.success || res.roundData?.kind !== 'tcg-inspection') {
        setError(res.error || 'Could not restore this inspection.')
        return
      }
      const round = res.roundData as InspectionRound
      startTimeRef.current = res.startTime || 0
      applyRound(round)
      setGameStarted(true)
      setStudyLeft(Math.max(0, Math.ceil((round.studyUntil - Date.now()) / 1000)))
      setTimeLeft(Math.max(0, Math.ceil((round.deadline - Date.now()) / 1000)))
      setPhase(round.index > 0 || Date.now() >= round.studyUntil ? 'question' : 'study')
      if (round.lives <= 0 || round.score >= requiredAnswers) await finishGame(round.score)
    }
    void start()
    return () => { mounted = false }
  }, [encounter.id, applyRound, finishGame, requiredAnswers])

  useEffect(() => {
    if (!gameStarted || gameEnded) return
    if (phase !== 'question') return
    if (timeLeft <= 0) {
      void finishGame(correctAnswersRef.current)
      return
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((value: number) => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [finishGame, gameEnded, gameStarted, phase, timeLeft])

  useEffect(() => {
    if (!gameStarted || gameEnded || phase !== 'study') return
    if (studyLeft <= 0) {
      setPhase('question')
      setTimeLeft(settings.timeLimit)
      return
    }

    const timer = window.setTimeout(() => {
      setStudyLeft((value) => value - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [gameEnded, gameStarted, phase, settings.timeLimit, studyLeft])

  const startQuiz = useCallback(() => {
    if (gameEnded || !gameStarted || phase !== 'study') return
    setTimeLeft(settings.timeLimit)
    setPhase('question')
  }, [gameEnded, gameStarted, phase, settings.timeLimit])

  const showPreviousCard = useCallback(() => {
    setPreviewDirection(-1)
    setPreviewIndex((value) => (value === 0 ? cards.length - 1 : value - 1))
  }, [cards.length])

  const showNextCard = useCallback(() => {
    setPreviewDirection(1)
    setPreviewIndex((value) => (value >= cards.length - 1 ? 0 : value + 1))
  }, [cards.length])

  const returnToExplore = async () => {
    try {
      await refreshUser(false, completionInvalidatesRef.current)
    } catch (refreshError) {
      console.error('Failed to refresh TCG inspection progress', refreshError)
    }
    router.push('/game/explore')
  }

  const currentCard = cards[previewIndex]
  const currentQuestion = questions[questionIndex]
  const questionCard = currentQuestion
    ? cards[currentQuestion.targetIndex]
    : null
  const promptQuestion = currentQuestion
    ? {
        id: `${questionIndex}-${currentQuestion.type}-${currentQuestion.targetIndex}`,
        question: currentQuestion.prompt,
        options: currentQuestion.options,
      }
    : null

  if (error) {
    return (
      <div className="flex min-h-dvh items-center justify-center game-night bg-game-night-canvas p-4 text-game-night-ink">
        <div className="w-full max-w-sm rounded-lg border border-game-clay/40 bg-game-surface p-4 text-center text-game-ink shadow-sm">
          <p className="mb-4 text-sm">{error}</p>
          <Button onClick={() => router.push('/game/explore')}>Return</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-night min-h-[100dvh] bg-game-canvas text-game-ink">
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden bg-game-surface">
        <section className="relative flex h-[32dvh] min-h-[220px] max-h-[340px] shrink-0 items-center justify-center overflow-hidden bg-game-night-surface">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${encounter.background || '/backgrounds/town.avif'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 z-0 bg-[#081014]/40" />

          <div className="absolute left-3 top-3 z-20">
            <GameProgressChip
              wins={correctAnswers}
              required={requiredAnswers}
            />
          </div>
          <div className="absolute right-4 top-4 z-20">
            <GameTimer
              timeLeft={phase === 'study' ? studyLeft : timeLeft}
              totalTime={phase === 'study' ? studySeconds : settings.timeLimit}
              tone="scene"
            />
          </div>
          <div
            className="absolute left-3 top-12 z-20 flex items-center gap-1.5 rounded-full border border-game-night-border bg-game-night-surface/90 px-3 py-1 text-game-night-ink shadow-sm backdrop-blur-md"
            role="status"
          >
            <span className="sr-only">{lives} lives remaining</span>
            {Array.from({ length: maxLives }).map((_, index) => (
              <Heart
                key={index}
                className={
                  index < lives ? 'text-game-clay' : 'text-game-night-muted'
                }
                fill="currentColor"
                size={14}
              />
            ))}
          </div>

          {phase === 'study' && (
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 text-center text-game-night-ink">
              <Eye className="h-12 w-12 text-game-ochre drop-shadow-lg" />
              <div className="rounded-lg border border-game-night-border bg-game-night-surface/75 px-5 py-3 backdrop-blur">
                <p className="font-serif text-xl font-bold">Study the cards</p>
                <p className="mt-1 text-sm text-game-night-muted">
                  Review each card, then press Ready when you are prepared.
                </p>
              </div>
            </div>
          )}

          {phase === 'question' && questionCard && (
            <div className="relative z-10 flex h-full w-full items-center justify-center pt-8">
              <AnimatePresence mode="wait">
                {!answerStatus && (
                  <motion.div
                    key={`back-${questionIndex}`}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative aspect-[2.5/3.5] h-[70%] max-h-[230px] overflow-hidden rounded-md bg-[#0d1820] shadow-2xl"
                  >
                    <Image
                      src="/images/tcg-back.avif"
                      alt="Card back"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </motion.div>
                )}

                {answerStatus === 'correct' && (
                  <motion.div
                    key={`correct-${questionIndex}`}
                    initial={{ opacity: 1, rotateY: 90, y: 0, scale: 0.98 }}
                    animate={{
                      opacity: [1, 1, 0],
                      rotateY: [90, 0, 0],
                      y: [0, 0, -190],
                      scale: [0.98, 1.05, 0.9],
                    }}
                    transition={{
                      duration: 1.2,
                      times: [0, 0.45, 1],
                      ease: 'easeOut',
                    }}
                    className="relative aspect-[2.5/3.5] h-[70%] max-h-[230px] overflow-hidden rounded-md bg-[#0d1820] shadow-2xl"
                  >
                    <Image
                      src={questionCard.images.small}
                      alt={questionCard.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </motion.div>
                )}

                {answerStatus === 'incorrect' && (
                  <motion.div
                    key={`incorrect-${questionIndex}`}
                    initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: [0, -12, 12, -10, 10, 0],
                      y: [0, 0, 0, 0, 25, 240],
                      rotate: [0, -4, 4, -4, 4, 8],
                    }}
                    transition={{ duration: 1.2, ease: 'easeIn' }}
                    className="relative aspect-[2.5/3.5] h-[70%] max-h-[230px] overflow-hidden rounded-md bg-[#0d1820] shadow-2xl"
                  >
                    <Image
                      src="/images/tcg-back.avif"
                      alt="Card back"
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>

        <main className="game-paper-background relative flex flex-1 flex-col justify-center overflow-hidden border-t border-game-border bg-game-surface p-4 text-game-ink">
          {phase === 'question' && currentQuestion && (
            <div className="relative z-10 mx-auto flex h-full min-h-[60dvh] w-full max-w-3xl flex-col justify-center">
              <QuestionPrompt
                currentQuestion={promptQuestion}
                questionLoading={isSubmitting}
                answerStatus={answerStatus}
                handleAnswer={handleAnswer as any}
              />
            </div>
          )}

          {phase === 'study' && currentCard && (
            <div className="relative z-10 flex min-h-[40dvh] flex-col items-center justify-center gap-4 text-center">
              <div className="flex w-full items-center justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={showPreviousCard}
                  aria-label="Previous card"
                >
                  <ChevronLeft />
                </Button>
                <AnimatePresence
                  initial={false}
                  custom={previewDirection}
                  mode="wait"
                >
                  <motion.div
                    key={currentCard.id}
                    initial={{
                      opacity: 0,
                      x: previewDirection * 80,
                      scale: 0.96,
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: previewDirection * -80,
                      scale: 0.96,
                    }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="relative aspect-[2.5/3.5] h-[38dvh] max-h-[440px] min-h-[260px] overflow-hidden rounded-lg border border-game-border bg-game-night-surface shadow-xl"
                  >
                    <Image
                      src={currentCard.images.large || currentCard.images.small}
                      alt={currentCard.name}
                      fill
                      priority
                      sizes="(max-width: 640px) 62vw, 300px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={showNextCard}
                  aria-label="Next card"
                >
                  <ChevronRight />
                </Button>
              </div>
              <p className="text-sm font-semibold text-game-muted">
                Card {previewIndex + 1} of {cards.length}
              </p>
              <Button type="button" size="lg" onClick={startQuiz}>
                Ready
              </Button>
            </div>
          )}
        </main>
      </div>

      <RewardResultOverlay
        result={result}
        onClose={returnToExplore}
        icon={encounter.icon}
        iconAlt={encounter.name}
      />
    </div>
  )
}
