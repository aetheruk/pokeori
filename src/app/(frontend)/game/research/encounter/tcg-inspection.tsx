'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type {
  TcgInspectionGameConfig,
  TcgInspectionQuestionType,
} from '@/data/games'
import type { TcgCard, TcgSet } from '@/data/tcg/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { getAllTcgSets } from '@/utilities/tcg/tcg'
import { QuestionPrompt } from '../../locations/encounter/_components/question-prompt'
import { completeResearchEncounter, startResearchEncounter } from '../actions'

interface TcgInspectionGameProps {
  encounter: TcgInspectionGameConfig
  initialState?: any
}

interface InspectionCard extends TcgCard {
  setId: string
  setName: string
}

interface InspectionQuestion {
  type: TcgInspectionQuestionType
  prompt: string
  targetIndex: number
  answer: string
  options: string[]
}

type Phase = 'countdown' | 'attention' | 'reveal' | 'question'

const DEFAULT_QUESTION_TYPES: TcgInspectionQuestionType[] = [
  'name',
  'rarity',
  'supertype',
  'number',
  'artist',
  'pokemonType',
  'hp',
]

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

function sample<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, Math.min(count, items.length))
}

function buildCardPool(
  sets: TcgSet[],
  config: TcgInspectionGameConfig,
): InspectionCard[] {
  const allowedSetIds = config.settings.allowedSetIds
  const allowedRarities = config.settings.allowedRarities

  return sets
    .filter((set) => !allowedSetIds?.length || allowedSetIds.includes(set.id))
    .flatMap((set) =>
      set.cards.map((card) => ({
        ...card,
        setId: set.id,
        setName: set.name,
      })),
    )
    .filter((card) => {
      if (!card.images?.small) return false
      if (
        allowedRarities?.length &&
        (!card.rarity || !allowedRarities.includes(card.rarity))
      ) {
        return false
      }
      return true
    })
}

function buildOptions(
  correct: string,
  candidates: string[],
  size = 4,
): string[] {
  const wrong = sample(
    unique(candidates).filter((candidate) => candidate !== correct),
    size - 1,
  )
  return shuffle(unique([correct, ...wrong])).slice(0, size)
}

function buildQuestion(
  cards: InspectionCard[],
  cardPool: InspectionCard[],
  allSets: TcgSet[],
  questionTypes: TcgInspectionQuestionType[],
): InspectionQuestion {
  const targetIndex = Math.floor(Math.random() * cards.length)
  const target = cards[targetIndex]
  const possibleTypes = questionTypes.filter((type) => {
    if (type === 'rarity') return !!target.rarity
    if (type === 'supertype') return !!target.supertype
    if (type === 'set')
      return unique(cardPool.map((card) => card.setName)).length > 1
    if (type === 'number') return !!target.number
    if (type === 'artist') return !!target.artist
    if (type === 'pokemonType') return !!target.types?.length
    if (type === 'hp') return !!target.hp
    return true
  })
  const type =
    possibleTypes[Math.floor(Math.random() * possibleTypes.length)] || 'name'
  const slot = targetIndex + 1

  if (type === 'rarity') {
    const answer = target.rarity || 'Unknown'
    return {
      type,
      targetIndex,
      answer,
      prompt: `What rarity was card ${slot}?`,
      options: buildOptions(
        answer,
        cardPool.map((card) => card.rarity || '').filter(Boolean),
      ),
    }
  }

  if (type === 'supertype') {
    return {
      type,
      targetIndex,
      answer: target.supertype,
      prompt: `What type was card ${slot}?`,
      options: buildOptions(
        target.supertype,
        cardPool.map((card) => card.supertype),
      ),
    }
  }

  if (type === 'set') {
    return {
      type,
      targetIndex,
      answer: target.setName,
      prompt: `Which set was card ${slot} from?`,
      options: buildOptions(
        target.setName,
        allSets.map((set) => set.name),
      ),
    }
  }

  if (type === 'artist') {
    const answer = target.artist || 'Unknown'
    return {
      type,
      targetIndex,
      answer,
      prompt: `Who illustrated card ${slot}?`,
      options: buildOptions(
        answer,
        cardPool.map((card) => card.artist || '').filter(Boolean),
      ),
    }
  }

  if (type === 'pokemonType') {
    const answer = target.types?.[0] || 'Unknown'
    return {
      type,
      targetIndex,
      answer,
      prompt: `What Pokémon type was card ${slot}?`,
      options: buildOptions(
        answer,
        cardPool.flatMap((card) => card.types || []),
      ),
    }
  }

  if (type === 'hp') {
    const answer = target.hp || 'Unknown'
    return {
      type,
      targetIndex,
      answer,
      prompt: `How much HP did card ${slot} have?`,
      options: buildOptions(
        answer,
        cardPool.map((card) => card.hp || '').filter(Boolean),
      ),
    }
  }

  if (type === 'number') {
    return {
      type,
      targetIndex,
      answer: target.number,
      prompt: `What collector number was card ${slot}?`,
      options: buildOptions(
        target.number,
        cardPool.map((card) => card.number),
      ),
    }
  }

  return {
    type: 'name',
    targetIndex,
    answer: target.name,
    prompt: `Which card was shown as card ${slot}?`,
    options: buildOptions(
      target.name,
      cardPool.map((card) => card.name),
    ),
  }
}

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
  const questionCount = settings.rounds
  const countdownSeconds = settings.countdownSeconds || 3
  const attentionSeconds = settings.attentionSeconds || 1
  const revealSeconds = settings.previewSeconds
  const pointsPerCorrect = settings.pointsPerCorrect || 100

  const allSets = useMemo(() => getAllTcgSets(), [])
  const cardPool = useMemo(
    () => buildCardPool(allSets, encounter),
    [allSets, encounter],
  )
  const questionTypes = settings.questionTypes?.length
    ? settings.questionTypes
    : DEFAULT_QUESTION_TYPES

  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [phase, setPhase] = useState<Phase>('countdown')
  const [countdownLeft, setCountdownLeft] = useState(countdownSeconds)
  const [revealIndex, setRevealIndex] = useState(0)
  const [revealLeft, setRevealLeft] = useState(revealSeconds)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
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

  const scoreRef = useRef(0)
  const endingRef = useRef(false)

  const createSession = useCallback(() => {
    if (cardPool.length < packSize) {
      setError('Not enough TCG cards are available for this configuration.')
      return
    }

    const sessionCards = sample(cardPool, packSize)
    const sessionQuestions = Array.from({ length: questionCount }, () =>
      buildQuestion(sessionCards, cardPool, allSets, questionTypes),
    )
    setCards(sessionCards)
    setQuestions(sessionQuestions)
    setAnswerStatus(null)
    setRevealIndex(0)
    setRevealLeft(revealSeconds)
    setQuestionIndex(0)
    setCountdownLeft(countdownSeconds)
    setPhase('countdown')
  }, [
    allSets,
    cardPool,
    countdownSeconds,
    packSize,
    questionCount,
    questionTypes,
    revealSeconds,
  ])

  const finishGame = useCallback(
    async (finalScore: number) => {
      if (endingRef.current) return
      endingRef.current = true
      setGameEnded(true)

      const success = finalScore >= settings.winScore
      const res = await completeResearchEncounter(
        encounter.id,
        success,
        finalScore,
      )
      setResult({
        success: success && res.success,
        message:
          success && res.success
            ? `Inspection passed: ${finalScore}`
            : `Final score: ${finalScore}`,
        rewards: res.summary,
      })
      playSfx(success && res.success ? 'good' : 'bad')
    },
    [encounter.id, playSfx, settings.winScore],
  )

  const advanceQuestion = useCallback(
    (nextScore: number) => {
      if (questionIndex >= questions.length - 1) {
        void finishGame(nextScore)
        return
      }
      setQuestionIndex((value) => value + 1)
      setAnswerStatus(null)
    },
    [finishGame, questionIndex, questions.length],
  )

  const handleAnswer = useCallback(
    (answer: string) => {
      const question = questions[questionIndex]
      if (!question || answerStatus || gameEnded) return

      const correct = answer === question.answer
      setAnswerStatus(correct ? 'correct' : 'incorrect')
      const nextScore = correct
        ? scoreRef.current + pointsPerCorrect
        : scoreRef.current
      if (correct) {
        setScore(nextScore)
        scoreRef.current = nextScore
        playSfx('good')
      } else {
        playSfx('bad')
      }

      window.setTimeout(() => advanceQuestion(nextScore), 1350)
    },
    [
      advanceQuestion,
      gameEnded,
      playSfx,
      pointsPerCorrect,
      questionIndex,
      questions,
      answerStatus,
    ],
  )

  useEffect(() => {
    let mounted = true

    async function start() {
      const res = await startResearchEncounter(encounter.id)
      if (!mounted) return
      if (!res.success) {
        setError(res.error || 'Could not start booster inspection.')
        return
      }
      setGameStarted(true)
      createSession()
    }

    void start()
    return () => {
      mounted = false
    }
  }, [createSession, encounter.id])

  useEffect(() => {
    if (!gameStarted || gameEnded) return
    if (timeLeft <= 0) {
      void finishGame(scoreRef.current)
      return
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((value: number) => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [finishGame, gameEnded, gameStarted, timeLeft])

  useEffect(() => {
    if (!gameStarted || gameEnded || phase !== 'countdown') return
    if (countdownLeft <= 0) {
      setPhase('attention')
      return
    }

    const timer = window.setTimeout(() => {
      setCountdownLeft((value) => value - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [countdownLeft, gameEnded, gameStarted, phase])

  useEffect(() => {
    if (!gameStarted || gameEnded || phase !== 'attention') return
    const timer = window.setTimeout(() => {
      setPhase('reveal')
      setRevealLeft(revealSeconds)
    }, attentionSeconds * 1000)
    return () => window.clearTimeout(timer)
  }, [attentionSeconds, gameEnded, gameStarted, phase, revealSeconds])

  useEffect(() => {
    if (!gameStarted || gameEnded || phase !== 'reveal') return
    if (revealLeft <= 0) {
      if (revealIndex >= cards.length - 1) {
        setPhase('question')
        return
      }
      setRevealIndex((value) => value + 1)
      setRevealLeft(revealSeconds)
      return
    }

    const timer = window.setTimeout(() => {
      setRevealLeft((value) => value - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [
    cards.length,
    gameEnded,
    gameStarted,
    phase,
    revealIndex,
    revealLeft,
    revealSeconds,
  ])

  const returnToExplore = () => {
    refreshUser()
    router.push('/game/explore')
  }

  const currentCard = cards[revealIndex]
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
            <GameProgressChip wins={score} required={settings.winScore} />
          </div>
          <div className="absolute right-4 top-4 z-20">
            <GameTimer timeLeft={timeLeft} totalTime={settings.timeLimit} />
          </div>

          {phase === 'countdown' && (
            <div className="relative z-10 flex items-center justify-center">
              <div className="animate-pulse">
                <GameTimer
                  timeLeft={Math.max(1, countdownLeft)}
                  totalTime={countdownSeconds}
                  size="xl"
                  className="text-[#f7ecd6] drop-shadow-2xl"
                  colorOverride="text-[#d3ad63]"
                />
              </div>
            </div>
          )}

          {phase === 'attention' && (
            <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center">
              <Eye className="h-12 w-12 text-[#d3ad63] drop-shadow-lg" />
              <p className="rounded-full bg-[#081014]/55 px-4 py-2 text-xl font-black uppercase tracking-wide text-[#f7ecd6] backdrop-blur">
                Pay attention
              </p>
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

        <main className="game-paper-texture relative flex flex-1 flex-col justify-center overflow-hidden border-t border-game-border bg-game-surface p-4 text-game-ink">
          {phase === 'question' && currentQuestion && (
            <div className="relative z-10 mx-auto flex h-full min-h-[60dvh] w-full max-w-3xl flex-col justify-center">
              <QuestionPrompt
                currentQuestion={promptQuestion}
                questionLoading={false}
                answerStatus={answerStatus}
                handleAnswer={handleAnswer as any}
              />
            </div>
          )}

          {phase !== 'question' && (
            <div className="relative z-10 flex min-h-[40dvh] flex-col items-center justify-center text-center">
              {phase === 'reveal' && currentCard ? (
                <div className="flex w-full flex-col items-center justify-center">
                  <div className="relative aspect-[2.5/3.5] h-[44dvh] max-h-[520px] min-h-[320px] overflow-hidden rounded-lg bg-[#0d1820] shadow-xl">
                    <Image
                      src={currentCard.images.small}
                      alt={currentCard.name}
                      fill
                      priority
                      sizes="(max-width: 640px) 82vw, 360px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <p className="max-w-xs text-sm font-semibold text-game-muted">
                  The inspection will begin shortly.
                </p>
              )}
            </div>
          )}
        </main>
      </div>

      <RewardResultOverlay result={result} onClose={returnToExplore} />
    </div>
  )
}
