'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { completeGame, startGame } from '@/app/(frontend)/game/games/actions'
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
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard, TcgSet } from '@/data/tcg/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { APP_VERSION } from '@/utilities/app-version'
import { QuestionPrompt } from '../../locations/encounter/_components/question-prompt'

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

type CatalogCard = { card: TcgCard; set: TcgSet }
type CatalogResponse<T> = { items: T[] }

type Phase = 'study' | 'question'

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
  catalogCards: CatalogCard[],
  config: TcgInspectionGameConfig,
): InspectionCard[] {
  const allowedRarities = config.settings.allowedRarities

  return catalogCards
    .map(({ card, set }) => ({
      ...card,
      setId: set.id,
      setName: set.name,
    }))
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
  allSets: Array<{ name: string }>,
  questionTypes: TcgInspectionQuestionType[],
  previousQuestion?: InspectionQuestion,
): InspectionQuestion {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const question = buildQuestionCandidate(
      cards,
      cardPool,
      allSets,
      questionTypes,
    )
    if (
      question.options.length > 1 &&
      (!previousQuestion ||
        question.type !== previousQuestion.type ||
        question.targetIndex !== previousQuestion.targetIndex ||
        question.answer !== previousQuestion.answer)
    ) {
      return question
    }
  }

  return buildQuestionCandidate(cards, cardPool, allSets, ['name'])
}

function buildQuestionCandidate(
  cards: InspectionCard[],
  cardPool: InspectionCard[],
  allSets: Array<{ name: string }>,
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
  const requiredAnswers = settings.requiredAnswers
  const studySeconds = settings.studySeconds || 30
  const maxLives = settings.lives || 2

  const selectedSetIds = useMemo(() => {
    if (settings.allowedSetIds?.length) return settings.allowedSetIds

    const start = Array.from(encounter.id).reduce(
      (total, character) => total + character.charCodeAt(0),
      0,
    )
    return Array.from(
      { length: Math.min(8, tcgSetSummaries.length) },
      (_, i) => tcgSetSummaries[(start + i) % tcgSetSummaries.length].id,
    )
  }, [encounter.id, settings.allowedSetIds])
  const allSets = useMemo(
    () => tcgSetSummaries.filter((set) => selectedSetIds.includes(set.id)),
    [selectedSetIds],
  )
  const questionTypes = settings.questionTypes?.length
    ? settings.questionTypes
    : DEFAULT_QUESTION_TYPES

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
  const [questionPool, setQuestionPool] = useState<InspectionCard[]>([])
  const [answerStatus, setAnswerStatus] = useState<
    'correct' | 'incorrect' | null
  >(null)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const correctAnswersRef = useRef(0)
  const endingRef = useRef(false)

  const createSession = useCallback(
    (availableCards: InspectionCard[]) => {
      if (availableCards.length < packSize) {
        setError('Not enough TCG cards are available for this configuration.')
        return
      }

      const sessionCards = sample(availableCards, packSize)
      const firstQuestion = buildQuestion(
        sessionCards,
        availableCards,
        allSets,
        questionTypes,
      )
      setCards(sessionCards)
      setQuestionPool(availableCards)
      setQuestions([firstQuestion])
      setAnswerStatus(null)
      setPreviewIndex(0)
      setPreviewDirection(1)
      setQuestionIndex(0)
      setCorrectAnswers(0)
      correctAnswersRef.current = 0
      setLives(maxLives)
      setStudyLeft(studySeconds)
      setTimeLeft(settings.timeLimit)
      setPhase('study')
    },
    [
      allSets,
      maxLives,
      packSize,
      questionTypes,
      settings.timeLimit,
      studySeconds,
    ],
  )

  const finishGame = useCallback(
    async (finalCorrectAnswers: number) => {
      if (endingRef.current) return
      endingRef.current = true
      setGameEnded(true)

      const success = finalCorrectAnswers >= requiredAnswers
      const res = await completeGame(encounter.id, success, finalCorrectAnswers)
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

  const advanceQuestion = useCallback(
    (nextCorrectAnswers: number, nextLives: number) => {
      if (
        endingRef.current ||
        nextLives <= 0 ||
        nextCorrectAnswers >= requiredAnswers
      ) {
        void finishGame(nextCorrectAnswers)
        return
      }
      setQuestions((currentQuestions) => [
        ...currentQuestions,
        buildQuestion(
          cards,
          questionPool,
          allSets,
          questionTypes,
          currentQuestions.at(-1),
        ),
      ])
      setQuestionIndex((value) => value + 1)
      setAnswerStatus(null)
    },
    [allSets, cards, finishGame, questionPool, questionTypes, requiredAnswers],
  )

  const handleAnswer = useCallback(
    (answer: string) => {
      const question = questions[questionIndex]
      if (!question || answerStatus || gameEnded) return

      const correct = answer === question.answer
      setAnswerStatus(correct ? 'correct' : 'incorrect')
      const nextCorrectAnswers = correct
        ? correctAnswersRef.current + 1
        : correctAnswersRef.current
      const nextLives = correct ? lives : Math.max(0, lives - 1)
      setLives(nextLives)
      if (correct) {
        setCorrectAnswers(nextCorrectAnswers)
        correctAnswersRef.current = nextCorrectAnswers
        playSfx('good')
      } else {
        playSfx('bad')
      }

      window.setTimeout(
        () => advanceQuestion(nextCorrectAnswers, nextLives),
        1350,
      )
    },
    [
      advanceQuestion,
      gameEnded,
      lives,
      playSfx,
      questionIndex,
      questions,
      answerStatus,
    ],
  )

  useEffect(() => {
    let mounted = true

    async function start() {
      const params = new URLSearchParams({
        v: APP_VERSION,
        setIds: selectedSetIds.join(','),
        limit: '80',
        sampleSeed: encounter.id,
      })
      if (settings.allowedRarities?.length) {
        params.set('rarities', settings.allowedRarities.join(','))
      }
      const [res, catalogResponse] = await Promise.all([
        startGame(encounter.id),
        fetch(`/api/game/catalog/tcg?${params}`, {
          cache: 'force-cache',
        }),
      ])
      if (!mounted) return
      if (!res.success) {
        setError(res.error || 'Could not start booster inspection.')
        return
      }
      if (!catalogResponse.ok) {
        setError('Could not load the inspection card catalog.')
        return
      }
      const catalog =
        (await catalogResponse.json()) as CatalogResponse<CatalogCard>
      if (!mounted) return
      const loadedPool = buildCardPool(catalog.items, encounter)
      setGameStarted(true)
      createSession(loadedPool)
    }

    void start()
    return () => {
      mounted = false
    }
  }, [createSession, encounter, selectedSetIds])

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
      await refreshUser(false)
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
                questionLoading={false}
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
