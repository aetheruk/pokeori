'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import type { ResearchConfig } from '@/data/games'
import pokemonData from '@/data/pokemon-data'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface WhosThatPokemonGameProps {
  encounter: ResearchConfig
  initialState?: any // Using any to avoid type circular dep for now, or define ResearchState path
}

type SpeechRecognitionResultLike = ArrayLike<{ transcript: string }>

type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

function fillAvailableLetterSlots(currentSlots: string[], letters: string[]) {
  const next = [...currentSlots]
  let cursor = 0

  for (
    let index = 0;
    index < next.length && cursor < letters.length;
    index += 1
  ) {
    if (next[index]) continue
    next[index] = letters[cursor]
    cursor += 1
  }

  return next
}

function areSlotsComplete(slots: string[], targetName: string) {
  return (
    targetName.length > 0 &&
    slots.length === targetName.length &&
    slots.every((letter, index) => letter === targetName[index])
  )
}

import { useUser } from '@/context/UserContext'

export function WhosThatPokemonGame({
  encounter,
  initialState,
}: WhosThatPokemonGameProps) {
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
  const [pokemonPool, setPokemonPool] = useState<number[]>([])
  const [revealed, setRevealed] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState<
    'correct' | 'incorrect' | null
  >(null)
  const [letterSlots, setLetterSlots] = useState<string[]>([])
  const [roundSequence, setRoundSequence] = useState(0)
  const [submittedRoundKey, setSubmittedRoundKey] = useState<string | null>(
    null,
  )
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const fillLettersRef = useRef<(letters: string) => void>(() => {})
  const letterSlotsRef = useRef<string[]>([])
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const submittedRoundKeyRef = useRef<string | null>(null)
  const submitCompletedGuessRef = useRef<() => void>(() => {})

  const keyboardRows = useMemo(
    () => ['QWERTYUIOP'.split(''), 'ASDFGHJKL'.split(''), 'ZXCVBNM'.split('')],
    [],
  )

  // Initialize pokemon pool
  useEffect(() => {
    let pool = encounter.settings.pokemonPool || []
    if (pool.length === 0) {
      pool = pokemonData.map((p) => p.id)
    }
    setPokemonPool(pool)
  }, [encounter.settings.pokemonPool])

  // Start game / Restore Session
  const initGame = useCallback(async () => {
    if (gameStarted) return

    // Start or get existing session
    const result = await startResearchEncounter(encounter.id)

    if (!result.success) {
      console.error('Failed to start encounter:', result.error)
      return
    }

    setGameStarted(true)
    setGameEnded(false)
    setCorrectCount(result.wins || 0)
    setRevealed(false)

    if (result.nextPokemonId) {
      setCurrentPokemon(result.nextPokemonId)
    }

    if (result.restored && result.expiry) {
      // Calculate remaining time
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

    setLetterSlots([])
  }, [encounter.id, encounter.settings.timeLimit, gameStarted])

  // Auto-start the encounter on mount
  useEffect(() => {
    if (initialState) {
      // already hydrated via state init
    } else if (!gameStarted && pokemonPool.length > 0) {
      initGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonPool])

  // Timer effect for game time limit
  useEffect(() => {
    if (!gameStarted || gameEnded) return
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          setGameEnded(true)
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
  }, [gameStarted, gameEnded, encounter.id])

  const pokemon = currentPokemon
    ? pokemonData.find((p) => p.id === currentPokemon)
    : null
  const pokemonName =
    pokemon?.forms.find((f) => f.form === 'base')?.name ||
    pokemon?.forms[0]?.name ||
    '???'
  const normalizedPokemonName = useMemo(
    () => pokemonName.toUpperCase().replace(/[^A-Z]/g, ''),
    [pokemonName],
  )
  const roundKey = currentPokemon
    ? `${roundSequence}:${currentPokemon}:${normalizedPokemonName}`
    : ''
  const isCompletedGuess = areSlotsComplete(letterSlots, normalizedPokemonName)

  useEffect(() => {
    letterSlotsRef.current = letterSlots
  }, [letterSlots])

  const fillLetters = useCallback(
    (letters: string) => {
      if (isProcessing || revealed || answerFeedback) return

      const normalizedLetters = letters
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .split('')
      if (normalizedLetters.length === 0) return

      const nextSlots = fillAvailableLetterSlots(
        letterSlotsRef.current,
        normalizedLetters,
      )
      setLetterSlots(nextSlots)
      letterSlotsRef.current = nextSlots

      if (areSlotsComplete(nextSlots, normalizedPokemonName)) {
        submitCompletedGuessRef.current()
      }
    },
    [answerFeedback, isProcessing, normalizedPokemonName, revealed],
  )

  useEffect(() => {
    fillLettersRef.current = fillLetters
  }, [fillLetters])

  useEffect(() => {
    setLetterSlots(Array(normalizedPokemonName.length).fill(''))
    letterSlotsRef.current = Array(normalizedPokemonName.length).fill('')
    setSubmittedRoundKey(null)
    submittedRoundKeyRef.current = null
  }, [roundKey, normalizedPokemonName.length])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor
      webkitSpeechRecognition?: SpeechRecognitionConstructor
    }
    const SpeechRecognition =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setVoiceSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || ''
      fillLettersRef.current(transcript)
    }
    recognition.onerror = () => {
      setIsListening(false)
    }
    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    setVoiceSupported(true)

    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      recognition.abort()
      recognitionRef.current = null
    }
  }, [])

  // Make guess
  const makeGuess = useCallback(
    async (forceSubmit = false) => {
      if (
        !currentPokemon ||
        (!forceSubmit && !isCompletedGuess) ||
        submittedRoundKeyRef.current === roundKey ||
        submittedRoundKey === roundKey ||
        isProcessing
      ) {
        return
      }
      setIsProcessing(true)
      setSubmittedRoundKey(roundKey)
      submittedRoundKeyRef.current = roundKey

      let result: any
      try {
        result = await submitResearchAnswer(currentPokemon)
      } catch {
        setSubmittedRoundKey(null)
        submittedRoundKeyRef.current = null
        setIsProcessing(false)
        return
      }

      if (!result.success) {
        if (result.error === 'Session expired or not found') {
          router.push('/game')
          return
        }
        setSubmittedRoundKey(null)
        submittedRoundKeyRef.current = null
        setAnswerFeedback(null)
        setRevealed(false)
        if (result.gameOver) {
          setGameEnded(true)
        }
        setIsProcessing(false)
        return
      }

      const isCorrect = result.correct

      // Reveal Pokemon with feedback flash
      setRevealed(true)
      setAnswerFeedback(isCorrect ? 'correct' : 'incorrect')

      if (isCorrect) {
        playSfx('good')
      } else {
        playSfx('bad')
      }

      // Wait briefly to show result
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setAnswerFeedback(null)

      if (isCorrect) {
        setCorrectCount(result.wins)

        // Check win condition
        if (result.gameOver) {
          // Completed
          const completeResult = await completeResearchEncounter(
            encounter.id,
            result.wins >= (result.requiredWins || 5),
          )
          if (completeResult.success && completeResult.summary) {
            setResult({
              success: true,
              rewards: completeResult.summary,
              message: `You correctly identified ${result.wins} Pokémon!`,
            })
          } else {
            setResult({
              success: false,
              message: `You correctly identified ${result.wins} Pokémon.`,
            })
          }

          setGameEnded(true)
        } else {
          // Next Round
          if (result.nextPokemonId) {
            setCurrentPokemon(result.nextPokemonId)
            setRoundSequence((sequence) => sequence + 1)
            setRevealed(false)
          }
        }
      } else {
        // Wrong answer — Next Round
        if (result.nextPokemonId) {
          setCurrentPokemon(result.nextPokemonId)
          setRoundSequence((sequence) => sequence + 1)
          setRevealed(false)
        }
      }

      setIsProcessing(false)
    },
    [
      isCompletedGuess,
      currentPokemon,
      encounter.id,
      isProcessing,
      roundKey,
      submittedRoundKey,
    ],
  )

  useEffect(() => {
    submitCompletedGuessRef.current = () => {
      void makeGuess(true)
    }
  }, [makeGuess])

  useEffect(() => {
    if (
      !isCompletedGuess ||
      revealed ||
      isProcessing ||
      submittedRoundKey === roundKey
    )
      return
    void makeGuess()
  }, [
    isCompletedGuess,
    isProcessing,
    makeGuess,
    revealed,
    roundKey,
    submittedRoundKey,
  ])

  const fillNextBlank = useCallback(
    (letter: string) => {
      fillLetters(letter)
    },
    [fillLetters],
  )

  const removeEnteredLetter = useCallback(
    (index: number) => {
      if (isProcessing || revealed || answerFeedback) return

      setLetterSlots((prev) => {
        if (!prev[index]) return prev
        const next = [...prev]
        next[index] = ''
        return next
      })
    },
    [answerFeedback, isProcessing, revealed],
  )

  const toggleVoiceInput = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition || isProcessing || revealed || answerFeedback) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
      return
    }

    try {
      recognition.start()
      setIsListening(true)
    } catch {
      setIsListening(false)
    }
  }, [answerFeedback, isListening, isProcessing, revealed])

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Game Area (Top 40%) */}
          <div className="relative flex h-[40%] items-center justify-center overflow-hidden bg-game-night-surface">
            {/* Background Image if set on encounter - no fallback, no overlay */}
            {encounter.background ? (
              <Image
                src={encounter.background}
                alt="Background"
                fill
                className="object-cover opacity-50"
              />
            ) : null}

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
            {pokemon && (
              <div className="relative w-64 h-64 z-10 transition-all duration-300 flex items-center justify-center">
                {/* Mysterious Aura */}
                {!revealed && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.3 }}
                    animate={{ scale: 1.2, opacity: 0.6 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-fuchsia-500/30 rounded-full blur-3xl pointer-events-none"
                  />
                )}

                {/* White Flash on Reveal */}
                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="pointer-events-none absolute inset-x-[-50%] inset-y-[-50%] z-20 rounded-full bg-[#fffaf0] blur-2xl"
                    />
                  )}
                </AnimatePresence>

                <Image
                  src={getPokemonImageUrl(pokemon.id.toString(), 'home')}
                  alt={pokemonName}
                  fill
                  className={`object-contain transition-all duration-500 z-10 ${
                    revealed
                      ? 'brightness-100 blur-0 scale-110 drop-shadow-2xl'
                      : 'brightness-0 blur-[2px] pb-12 scale-100 drop-shadow-none'
                  }`}
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            )}
          </div>

          {/* Answer Area (Bottom 60%) */}
          <div className="game-paper-background h-[60%] overflow-y-auto border-t border-game-border bg-game-surface px-4 py-5 text-game-ink">
            <div className="h-full flex flex-col max-w-md mx-auto lg:max-w-2xl">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.6, duration: 0.8 }}
                className="w-full"
              >
                <SectionDivider>Who's That Pokemon?</SectionDivider>
              </motion.div>

              {/* Horizontal Rule */}
              <hr className="mb-6 opacity-30" />

              <div className="flex min-h-0 flex-1 flex-col justify-between gap-5 pb-4">
                <div className="flex flex-wrap justify-center gap-1.5">
                  {normalizedPokemonName.split('').map((_, index) => {
                    const letter = letterSlots[index] || ''
                    const isNextBlank =
                      !letter && index === letterSlots.indexOf('')

                    return (
                      <button
                        key={`${roundKey}-${index}`}
                        type="button"
                        onClick={() => removeEnteredLetter(index)}
                        disabled={
                          !letter ||
                          revealed ||
                          isProcessing ||
                          Boolean(answerFeedback)
                        }
                        aria-label={letter ? `Remove ${letter}` : undefined}
                        className={cn(
                          'relative flex h-11 w-9 items-center justify-center rounded-md border text-lg font-semibold transition-colors sm:h-12 sm:w-10 sm:text-xl',
                          !letter &&
                            'border-game-border bg-game-canvas text-game-muted',
                          letter &&
                            'border-game-moss bg-game-moss text-game-cream',
                          isNextBlank &&
                            !answerFeedback &&
                            'ring-2 ring-game-moss ring-offset-2 ring-offset-game-surface',
                          !letter && 'cursor-default',
                        )}
                      >
                        {letter}
                        {isNextBlank && !letter && !answerFeedback && (
                          <motion.span
                            aria-hidden="true"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute bottom-2 h-1 w-4 rounded-full bg-game-moss"
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="space-y-2">
                  {voiceSupported && (
                    <div className="flex justify-center pb-1">
                      <button
                        type="button"
                        onClick={toggleVoiceInput}
                        disabled={
                          revealed || isProcessing || Boolean(answerFeedback)
                        }
                        aria-label={
                          isListening ? 'Stop voice input' : 'Start voice input'
                        }
                        title={
                          isListening ? 'Stop voice input' : 'Start voice input'
                        }
                        aria-pressed={isListening}
                        aria-busy={isProcessing}
                        className={cn(
                          'game-focus-ring flex h-11 w-11 items-center justify-center rounded-lg border text-game-cream transition-colors',
                          isListening
                            ? 'border-game-clay bg-game-clay'
                            : 'border-game-moss bg-game-moss hover:bg-game-moss-strong',
                          'disabled:cursor-not-allowed disabled:opacity-45',
                        )}
                      >
                        {isListening ? (
                          <MicOff className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <Mic className="h-5 w-5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  )}

                  {keyboardRows.map((row, rowIndex) => (
                    <div
                      key={row.join('')}
                      className={cn(
                        'grid gap-1.5',
                        rowIndex === 0 && 'grid-cols-10',
                        rowIndex === 1 && 'mx-[5%] grid-cols-9',
                        rowIndex === 2 && 'mx-[15%] grid-cols-7',
                      )}
                    >
                      {row.map((letter) => (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => fillNextBlank(letter)}
                          disabled={
                            revealed ||
                            isProcessing ||
                            Boolean(answerFeedback) ||
                            !letterSlots.includes('')
                          }
                          aria-busy={isProcessing}
                          className={cn(
                            'game-focus-ring flex h-11 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised text-base font-black text-game-ink shadow-sm transition-colors',
                            'hover:border-game-moss hover:bg-game-moss/10',
                            'disabled:cursor-not-allowed disabled:opacity-45',
                          )}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
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
