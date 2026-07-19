'use client'

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Progress } from '@/components/ui/progress'
import { useAudio } from '@/context/AudioContext'
import type { ResearchConfig } from '@/data/games'
import pokemonData from '@/data/pokemon-data'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { logger } from '@/utilities/logger'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

// Types for stats
type Stat =
  | 'height'
  | 'weight'
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

interface StatDefinition {
  key: Stat
  label: string
  unit?: string
  formatter?: (val: number) => string
  questions: {
    highest: string
    lowest: string
  }
}

const STATS: Record<Stat, StatDefinition> = {
  height: {
    key: 'height',
    label: 'Height',
    unit: 'm',
    formatter: (val) => `${val / 10}m`,
    questions: {
      highest: 'Who is the Tallest?',
      lowest: 'Who is the Shortest?',
    },
  },
  weight: {
    key: 'weight',
    label: 'Weight',
    unit: 'kg',
    formatter: (val) => `${val / 10}kg`,
    questions: {
      highest: 'Who is the Heaviest?',
      lowest: 'Who is the Lightest?',
    },
  },
  hp: {
    key: 'hp',
    label: 'HP',
    questions: {
      highest: 'Who has the most HP?',
      lowest: 'Who has the least HP?',
    },
  },
  attack: {
    key: 'attack',
    label: 'Attack',
    questions: {
      highest: 'Who has the highest Attack?',
      lowest: 'Who has the lowest Attack?',
    },
  },
  defense: {
    key: 'defense',
    label: 'Defense',
    questions: {
      highest: 'Who has the highest Defense?',
      lowest: 'Who has the lowest Defense?',
    },
  },
  specialAttack: {
    key: 'specialAttack',
    label: 'Sp. Atk',
    questions: {
      highest: 'Who has the highest Sp. Atk?',
      lowest: 'Who has the lowest Sp. Atk?',
    },
  },
  specialDefense: {
    key: 'specialDefense',
    label: 'Sp. Def',
    questions: {
      highest: 'Who has the highest Sp. Def?',
      lowest: 'Who has the lowest Sp. Def?',
    },
  },
  speed: {
    key: 'speed',
    label: 'Speed',
    questions: {
      highest: 'Who is the Fastest?',
      lowest: 'Who is the Slowest?',
    },
  },
}

// Draggable Card Component
function DraggablePokemonCard({
  pokemon,
  id,
  disabled,
  hidden,
}: {
  pokemon: any
  id: string
  disabled?: boolean
  hidden?: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: { pokemon },
      disabled,
    })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'group relative flex cursor-grab touch-none flex-col items-center gap-1 active:cursor-grabbing',
        isDragging && 'opacity-50 z-50',
        hidden && 'opacity-0 pointer-events-none',
        disabled && 'cursor-default',
      )}
    >
      <PokemonAnswerTile pokemon={pokemon} />
      <span className="max-w-[7rem] truncate text-center text-[10px] font-medium leading-tight text-game-muted sm:text-xs">
        {pokemon.name}
      </span>
    </div>
  )
}

function PokemonCardOverlay({ pokemon }: { pokemon: any }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <PokemonAnswerTile
        pokemon={pokemon}
        className="rotate-3 scale-110 cursor-grabbing border-game-moss shadow-xl"
      />
      <span className="max-w-[7rem] truncate text-center text-[10px] font-medium leading-tight text-game-muted sm:text-xs">
        {pokemon.name}
      </span>
    </div>
  )
}

function PokemonAnswerTile({
  pokemon,
  className,
}: {
  pokemon: any
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex h-24 w-24 items-center justify-center rounded-xl border-2 border-game-border bg-game-surface-raised p-2 shadow-sm sm:h-32 sm:w-32',
        className,
      )}
    >
      <Image
        src={getPokemonImageUrl(pokemon.id.toString(), 'home')}
        alt={pokemon.name}
        fill
        className="object-contain p-2"
      />
    </div>
  )
}

// Drop Zone Component
function DropZone({
  children,
  isOver,
  feedback,
}: {
  children?: React.ReactNode
  isOver: boolean
  feedback?: 'correct' | 'incorrect' | null
}) {
  const { setNodeRef } = useDroppable({
    id: 'answer-zone',
  })

  return (
    <motion.div
      ref={setNodeRef}
      animate={
        isOver && !feedback
          ? {
              scale: 1.02,
              backgroundColor: 'rgba(95, 121, 79, 0.1)',
              borderColor: '#5f794f',
            }
          : feedback === 'correct'
            ? {
                scale: 1.05,
                backgroundColor: 'rgba(95, 121, 79, 0.18)',
                borderColor: '#5f794f',
              }
            : feedback === 'incorrect'
              ? {
                  scale: [1, 1.05, 0.95, 1.05, 0.95, 1],
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  borderColor: '#ef4444',
                }
              : {
                  scale: 1,
                  backgroundColor: 'rgba(255, 248, 232, 0.72)',
                  borderColor: '#b58a43',
                }
      }
      transition={{ duration: 0.3 }}
      className={cn(
        'relative flex h-24 w-24 items-center justify-center overflow-visible rounded-xl border-4 border-dashed sm:h-32 sm:w-32',
      )}
    >
      {children ? (
        children
      ) : (
        <motion.div
          animate={
            isOver
              ? { scale: 1.1, color: '#405d3d' }
              : { scale: 1, color: '#667269' }
          }
          className="px-2 text-center text-[10px] sm:text-xs font-black pointer-events-none uppercase tracking-widest relative z-10"
        >
          Drop
        </motion.div>
      )}
    </motion.div>
  )
}

import { useUser } from '@/context/UserContext'

export function ResearchCompareGame({
  encounter,
  initialState,
}: {
  encounter: ResearchConfig
  initialState?: any
}) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const router = useRouter()
  const { refreshUser } = useUser()
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const winRateNum =
    typeof encounter.settings.winRate === 'number'
      ? encounter.settings.winRate
      : 5
  const [gameEnded, setGameEnded] = useState(false)
  const [score, setScore] = useState(initialState?.wins || 0)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? (encounter.settings.timeLimit || 60),
  )

  // Round State
  const [currentPokemon, setCurrentPokemon] = useState<any[]>([])
  const [currentStat, setCurrentStat] = useState<Stat | null>(null)
  const [isHighest, setIsHighest] = useState(true) // true = highest, false = lowest
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [droppedId, setDroppedId] = useState<string | null>(null)
  const droppedPokemon = droppedId
    ? currentPokemon.find((pokemon) => pokemon.id.toString() === droppedId)
    : null

  // Drag State
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isOverAnswerZone, setIsOverAnswerZone] = useState(false)

  // Result & Processing
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [success, setSuccess] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Start game / Restore Session
  const initGame = useCallback(async () => {
    if (gameStarted) return

    // Start or get existing session
    const result = await startResearchEncounter(encounter.id)
    logger.debug(
      '[ResearchClient] initGame result',
      result,
      'timeLimit',
      encounter.settings.timeLimit,
    )

    if (!result.success) {
      console.error('Failed to start encounter:', result.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setScore(result.wins || 0)
    setSuccess(false)

    if (result.restored && result.expiry) {
      logger.debug(
        '[ResearchClient] restoring timer from expiry',
        result.expiry,
      )
      const remaining = Math.max(
        0,
        Math.floor((result.expiry - Date.now()) / 1000),
      )
      setTimeLeft(remaining)
      if (remaining <= 0) {
        setGameEnded(true)
        router.push('/game')
      }
    } else {
      logger.debug(
        '[ResearchClient] starting new timer',
        encounter.settings.timeLimit,
      )
      setTimeLeft(encounter.settings.timeLimit || 60)
    }

    // Load Round Data
    if (result.roundData) {
      setRoundData(result.roundData)
    }
  }, [encounter.id, encounter.settings.timeLimit, gameStarted])

  const setRoundData = (roundData: any) => {
    if (roundData.pokemon) {
      const pokemonObjects = roundData.pokemon
        .map((id: number) => pokemonData.find((p) => p.id === id))
        .filter(Boolean)
      setCurrentPokemon(pokemonObjects)
    }
    if (roundData.stat) {
      setCurrentStat(roundData.stat)
    }
    if (roundData.isHighest !== undefined) {
      setIsHighest(roundData.isHighest)
    }
    setFeedback(null)
    setDroppedId(null)
    setIsProcessing(false)
  }

  useEffect(() => {
    if (initialState) {
      logger.debug('[ResearchCompare] Hydrating with state:', initialState)
      if (initialState.roundData) {
        setRoundData(initialState.roundData)
      } else {
        logger.debug('[ResearchCompare] initialState missing roundData')
      }
    } else if (!gameStarted) {
      initGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Timer
  useEffect(() => {
    if (!gameStarted || gameEnded || !encounter.settings.timeLimit) return
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setGameEnded(true)
          setSuccess(false)
          // Record failure on server
          completeResearchEncounter(encounter.id, false).then(() => {
            setResult({
              success: false,
              message: 'Time is up!',
            })
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStarted, gameEnded, encounter.settings.timeLimit, score])

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
    setIsOverAnswerZone(false)
  }

  const handleDragOver = (event: any) => {
    setIsOverAnswerZone(event.over?.id === 'answer-zone')
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event
    setActiveId(null)
    setIsOverAnswerZone(false)

    if (over && over.id === 'answer-zone' && !feedback && !isProcessing) {
      setIsProcessing(true)
      setDroppedId(active.id)

      const answerId = parseInt(active.id)
      const result = await submitResearchAnswer(answerId)

      if (!result.success) {
        if (result.error === 'Session expired or not found') {
          router.push('/game')
          return
        }
        if (result.gameOver) {
          setGameEnded(true)
          setIsProcessing(false)
          return
        }
      }

      const isCorrect = result.correct
      setScore(result.wins || 0)
      setFeedback(isCorrect ? 'correct' : 'incorrect')
      playSfx(isCorrect ? 'good' : 'bad')

      // Check Win Condition
      if (result.gameOver) {
        setTimeout(
          () =>
            endGame(
              (result.wins || 0) >= (result.requiredWins || 5),
              result.wins || 0,
            ),
          1000,
        )
        return
      }

      // Delay then Next Round
      setTimeout(() => {
        if (timeLeft > 2) {
          if (result.roundData) setRoundData(result.roundData)
        }
      }, 1200)
    }
  }

  const endGame = async (isWin: boolean, finalScore: number) => {
    setGameEnded(true)
    setSuccess(isWin)

    const result = await completeResearchEncounter(encounter.id, isWin)
    if (result?.success && result.summary) {
      setSuccess(true)
      setResult({
        success: true,
        rewards: result.summary,
        message: isWin
          ? `You Scored ${finalScore}!`
          : `You scored ${finalScore}. Needed ${winRateNum}.`,
      })
    } else {
      setSuccess(false)
      setResult({
        success: false,
        rewards: result?.summary,
        message: `You scored ${finalScore}. Needed ${winRateNum}.`,
      })
    }
    setIsProcessing(false)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-dvh flex flex-col game-night bg-game-night-canvas text-game-night-ink overflow-hidden">
        {/* Game Area (Top) */}
        <div className="relative flex h-[40%] flex-col items-center justify-center bg-game-night-surface p-4">
          {encounter.background && (
            <Image
              src={encounter.background}
              alt="Background"
              fill
              className="object-cover opacity-20 pointer-events-none"
            />
          )}

          {/* Timer - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <GameTimer
              timeLeft={timeLeft}
              totalTime={encounter.settings.timeLimit || 60}
            />
          </div>

          {/* Progress - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <GameProgressChip wins={score} required={winRateNum} />
          </div>

          {/* Drop Zone */}
          <div className="z-10 mt-8 flex flex-col items-center gap-3">
            <DropZone isOver={isOverAnswerZone} feedback={feedback}>
              {droppedPokemon && (
                <motion.div
                  className="relative"
                  initial={{ scale: 0.92, opacity: 0.85, y: 0 }}
                  animate={
                    feedback === 'correct'
                      ? {
                          scale: [1, 1.12, 1, 1.08, 1],
                          opacity: 1,
                          y: 0,
                        }
                      : feedback === 'incorrect'
                        ? {
                            scale: [1, 0.96, 0.9],
                            opacity: [1, 1, 0],
                            y: [0, 10, 120],
                            rotate: [0, -5, 10],
                          }
                        : { scale: 1, opacity: 1, y: 0, rotate: 0 }
                  }
                  transition={{
                    duration: feedback === 'incorrect' ? 0.75 : 0.9,
                    ease: 'easeOut',
                  }}
                >
                  <PokemonAnswerTile
                    pokemon={droppedPokemon}
                    className={cn(
                      feedback === 'correct' &&
                        'border-game-moss bg-game-moss/10 shadow-md',
                      feedback === 'incorrect' &&
                        'border-red-400 shadow-[0_0_28px_rgba(239,68,68,0.55)]',
                    )}
                  />
                  {feedback && (
                    <div
                      className={cn(
                        'absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[#0d1820] shadow-lg',
                        feedback === 'correct'
                          ? 'border-game-moss bg-game-surface-raised text-game-moss-strong'
                          : 'border-red-400 text-red-300',
                      )}
                    >
                      {feedback === 'correct' ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </DropZone>
            {feedback && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'text-sm font-black uppercase tracking-widest',
                  feedback === 'correct' ? 'text-game-moss-strong' : 'text-red-300',
                )}
              >
                {feedback === 'correct' ? 'Correct!' : 'Incorrect'}
              </motion.span>
            )}
          </div>
        </div>

        {/* Question & Cards Area (Bottom) */}
        <div className="game-paper-background flex h-[60%] flex-col items-center border-t border-game-border bg-game-surface p-6 text-game-ink">
          {currentStat ? (
            <motion.div
              key={currentStat + isHighest.toString()}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mb-6 w-full max-w-md"
            >
              <div className="rounded-xl border border-game-border bg-game-surface-raised px-4 py-3 text-center shadow-sm">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-game-moss-strong">
                  Compare {STATS[currentStat].label}
                </p>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="block font-display text-xl font-bold leading-tight text-game-ink sm:text-2xl"
                >
                  {isHighest
                    ? STATS[currentStat].questions.highest
                    : STATS[currentStat].questions.lowest}
                </motion.span>
              </div>
            </motion.div>
          ) : (
            <div className="h-20" /> // Spacer
          )}

          <motion.div
            className="grid grid-cols-2 gap-4 place-items-center"
            initial="hidden"
            animate="visible"
            key={currentPokemon.map((p) => p.id).join('-')} // Re-run animation when cards change
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {currentPokemon.map((p) => {
              return (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.5, y: 50 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: 'spring', damping: 15 },
                    },
                  }}
                >
                  <DraggablePokemonCard
                    id={p.id.toString()}
                    pokemon={p}
                    disabled={!!feedback || isProcessing}
                    hidden={droppedId === p.id.toString()}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <DragOverlay
          dropAnimation={{
            duration: 250,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeId ? (
            <PokemonCardOverlay
              pokemon={currentPokemon.find((p) => p.id.toString() === activeId)}
            />
          ) : null}
        </DragOverlay>
      </div>
      {result && (
        <RewardResultOverlay
          result={result}
          onClose={() => {
            refreshUser()
            router.push('/game/explore')
          }}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title={result.success ? 'Success' : 'Fail'}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  try {
                    const res = await startResearchEncounter(
                      (initialState?.encounter || encounter).id,
                      true,
                    )
                    if (res?.success) {
                      window.location.reload()
                    } else {
                      window.location.href = '/game/explore'
                    }
                  } catch (e) {
                    window.location.href = '/game/explore'
                  }
                }}
                className="w-full"
              >
                Play Again
              </Button>
            ) : undefined
          }
        />
      )}
    </DndContext>
  )
}
