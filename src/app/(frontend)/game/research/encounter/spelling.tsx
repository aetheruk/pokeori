'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { ResearchConfig } from '@/data/games'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface SpellingGameProps {
  encounter: ResearchConfig
  initialState?: any
}

export function SpellingGame({ encounter, initialState }: SpellingGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const router = useRouter()
  const { refreshUser } = useUser()
  const winRateNum =
    typeof encounter.settings.winRate === 'number'
      ? encounter.settings.winRate
      : 5
  const [currentPokemon, setCurrentPokemon] = useState<number | null>(
    initialState?.nextPokemonId || initialState?.currentPokemonId || null,
  )
  const [correctCount, setCorrectCount] = useState(initialState?.wins || 0)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? (encounter.settings.timeLimit || 60),
  )
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  // Round key to force remount of tiles when Pokemon changes
  const [roundKey, setRoundKey] = useState(0)

  // Round data
  const [roundData, setRoundData] = useState<{
    targetName: string
    revealedIndices: number[]
    hiddenIndices: number[]
    filledLetters: (string | null)[]
    currentIndex: number
    letterPool: string[]
  } | null>(initialState?.roundData || null)

  // Feedback state - 'correct' turns tiles green, 'incorrect' triggers fall animation
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)

  // Start game
  const initGame = useCallback(async () => {
    if (gameStarted) return

    const result = await startResearchEncounter(encounter.id)

    if (!result.success) {
      console.error('Failed to start encounter:', result.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setCorrectCount(result.wins || 0)

    if (result.nextPokemonId) {
      setCurrentPokemon(result.nextPokemonId)
    }

    if (result.roundData) {
      setRoundData(result.roundData)
    }

    if (result.restored && result.expiry) {
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
      setTimeLeft(encounter.settings.timeLimit || 60)
    }
  }, [encounter.id, encounter.settings.timeLimit, gameStarted, router])

  // Auto-start
  useEffect(() => {
    if (initialState) {
      // Already hydrated
    } else if (!gameStarted) {
      initGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Timer
  useEffect(() => {
    if (!gameStarted || gameEnded) return
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setGameEnded(true)
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
  }, [gameStarted, gameEnded, encounter.id])

  // Handle letter selection
  const selectLetter = useCallback(
    async (letter: string, poolIndex: number) => {
      if (!roundData || isProcessing || feedback) return
      setIsProcessing(true)

      const result = await submitResearchAnswer({ letter })

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

      if (result.correct) {
        if (result.partial) {
          // Letter was correct, word not complete yet - just update round data
          setRoundData(result.roundData)
          setIsProcessing(false)
        } else {
          // Word complete! Show green feedback
          setFeedback('correct')
          playSfx('good')
          setCorrectCount(result.wins)

          // Hold green state
          await new Promise((resolve) => setTimeout(resolve, 1200))

          if (result.gameOver) {
            const completeResult = await completeResearchEncounter(
              encounter.id,
              result.wins >= (result.requiredWins || 5),
            )
            if (completeResult.success && completeResult.summary) {
              setResult({
                success: true,
                rewards: completeResult.summary,
                message: `You spelled ${result.wins} Pokémon correctly!`,
              })
            } else {
              setResult({
                success: false,
                message: `You spelled ${result.wins} Pokémon correctly.`,
              })
            }
            setGameEnded(true)
          } else {
            // Next Pokemon - increment key to force remount, then update data
            setFeedback(null)
            setRoundKey((k) => k + 1)
            if (result.nextPokemonId) setCurrentPokemon(result.nextPokemonId)
            setRoundData(result.roundData)
          }
          setIsProcessing(false)
        }
      } else {
        // Wrong letter - trigger fall animation
        setFeedback('incorrect')
        playSfx('bad')

        // Hold the falling animation
        await new Promise((resolve) => setTimeout(resolve, 1200))

        if (result.gameOver) {
          const completeResult = await completeResearchEncounter(
            encounter.id,
            false,
          )
          setResult({
            success: false,
            message: result.message || 'Game Over!',
            rewards: completeResult?.summary,
          })
          setGameEnded(true)
        } else {
          // Move to next Pokemon - increment key to force remount
          setFeedback(null)
          setRoundKey((k) => k + 1)
          if (result.nextPokemonId) setCurrentPokemon(result.nextPokemonId)
          setRoundData(result.roundData)
          setCorrectCount(result.wins)
        }
        setIsProcessing(false)
      }
    },
    [roundData, isProcessing, feedback, encounter.id, router],
  )

  // Generate random fall animations for each tile - regenerate on roundKey change
  const fallAnimations = useMemo(() => {
    if (!roundData) return []
    return roundData.targetName.split('').map((_, idx) => ({
      rotation: Math.random() * 60 - 30,
      delay: idx * 50,
      xOffset: Math.random() * 100 - 50,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundData?.targetName, roundKey])

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <style jsx>{`
        @keyframes tiltFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          20% {
            transform: translateY(-10px) rotate(var(--rotation));
          }
          100% {
            transform: translateY(300px) translateX(var(--x-offset))
              rotate(calc(var(--rotation) * 3));
            opacity: 0;
          }
        }
        .animate-tilt-fall {
          animation: tiltFall 1s ease-in forwards;
        }
        @keyframes pulseGreen {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(34, 197, 94, 0.3);
          }
        }
        .animate-pulse-green {
          animation: pulseGreen 0.6s ease-in-out;
        }
      `}</style>
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Game Area (Top 40%) - Just Pokemon image */}
          <div className="relative flex h-[40%] items-center justify-center overflow-hidden bg-game-night-surface">
            {/* Background */}
            {encounter.background && (
              <Image
                src={encounter.background}
                alt="Background"
                fill
                className="object-cover opacity-50"
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
              <GameProgressChip wins={correctCount} required={winRateNum} />
            </div>

            {/* Pokemon Display */}
            {currentPokemon && (
              <div className="relative w-48 h-48 z-10">
                <Image
                  src={getPokemonImageUrl(currentPokemon.toString(), 'home')}
                  alt="Pokemon"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Answer Area (Bottom 60%) */}
          <div className="game-paper-texture h-[60%] overflow-y-auto border-t border-game-border bg-game-surface px-4 py-5 text-game-ink">
            <div className="h-full flex flex-col max-w-md mx-auto lg:max-w-2xl">
              {/* Name Tiles Section */}
              <SectionDivider>Spell the Name</SectionDivider>

              {/* Name Tiles - keyed by roundKey to force remount */}
              {roundData && (
                <div
                  key={roundKey}
                  className="flex gap-1 mt-4 flex-wrap justify-center"
                  style={{ perspective: 1000 }}
                >
                  {roundData.targetName.split('').map((char, idx) => {
                    const isRevealed = roundData.revealedIndices.includes(idx)
                    const filledLetter = roundData.filledLetters[idx]
                    const fallStyle = fallAnimations[idx]
                    const isNextEmpty =
                      !isRevealed &&
                      !filledLetter &&
                      idx ===
                        roundData.targetName
                          .split('')
                          .findIndex(
                            (c, i) =>
                              !roundData.revealedIndices.includes(i) &&
                              !roundData.filledLetters[i],
                          )

                    return (
                      <motion.div
                        key={idx}
                        layout
                        initial={false}
                        animate={
                          feedback === 'correct'
                            ? {
                                rotateX: 360,
                                backgroundColor: '#16a34a',
                                borderColor: '#4ade80',
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.6,
                          type: 'spring',
                          delay: idx * 0.05,
                        }}
                        className={cn(
                          'relative flex h-12 w-10 items-center justify-center rounded-md border text-xl font-semibold transition-colors',
                          // Normal states
                          !feedback &&
                            isRevealed &&
                            'border-game-border bg-game-canvas text-game-muted',
                          !feedback &&
                            !isRevealed &&
                            filledLetter &&
                            'border-game-moss bg-game-moss text-game-cream',
                          !feedback &&
                            !isRevealed &&
                            !filledLetter &&
                            'border-game-border bg-game-canvas text-game-muted',
                          // Correct feedback uses framer motion now
                          feedback === 'correct' && 'text-game-cream',
                          // Incorrect feedback - tiles turn red and fall
                          feedback === 'incorrect' &&
                            'bg-red-600 border-red-400 text-game-cream animate-tilt-fall',
                          // Focus indicator for next empty
                          !feedback &&
                            isNextEmpty &&
                            'ring-2 ring-game-moss ring-offset-2 ring-offset-game-surface',
                        )}
                        style={{
                          transformStyle: 'preserve-3d',
                          ...(feedback === 'incorrect'
                            ? ({
                                '--rotation': `${fallStyle?.rotation || 0}deg`,
                                '--x-offset': `${fallStyle?.xOffset || 0}px`,
                                animationDelay: `${fallStyle?.delay || 0}ms`,
                              } as React.CSSProperties)
                            : {}),
                        }}
                      >
                        {/* Blinking cursor for next empty tile */}
                        {!feedback && isNextEmpty && (
                          <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute bottom-2 h-1 w-4 rounded-full bg-game-moss/70"
                          />
                        )}
                        {feedback === 'correct'
                          ? char
                          : isRevealed
                            ? char
                            : filledLetter || ''}
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* Letter Pool Section */}
              <SectionDivider className="mt-6">
                Tap the Missing Letters
              </SectionDivider>

              {/* Letter Pool Grid */}
              {roundData && (
                <div className="grid grid-cols-5 gap-3 mt-4 px-2">
                  <AnimatePresence>
                    {roundData.letterPool.map((letter, idx) => (
                      <motion.button
                        key={`${roundKey}-${letter}-${idx}`}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{
                          type: 'spring',
                          damping: 20,
                          stiffness: 200,
                          delay: idx * 0.02,
                        }}
                        onClick={() => selectLetter(letter, idx)}
                        disabled={isProcessing || !!feedback}
                        className={cn(
                          'game-focus-ring aspect-square rounded-xl border-2 border-game-border bg-game-surface-raised text-2xl font-bold text-game-ink shadow-sm transition-colors',
                          'hover:border-game-moss hover:bg-game-moss/10',
                          'disabled:opacity-50 disabled:cursor-not-allowed',
                        )}
                      >
                        {letter}
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

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
    </div>
  )
}
