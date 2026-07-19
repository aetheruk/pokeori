'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Timer, Volume2, VolumeX, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Progress } from '@/components/ui/progress'
import { SectionDivider } from '@/components/ui/section-divider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

interface CryRecognitionGameProps {
  encounter: ResearchConfig
  initialState?: any
}

import { useUser } from '@/context/UserContext'

export function CryRecognitionGame({
  encounter,
  initialState,
}: CryRecognitionGameProps) {
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
  const [guess, setGuess] = useState('')
  const [correctCount, setCorrectCount] = useState(initialState?.wins || 0)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? (encounter.settings.timeLimit || 60),
  )
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [success, setSuccess] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [pokemonPool, setPokemonPool] = useState<number[]>([])
  const [topSpriteVisible, setTopSpriteVisible] = useState(false)
  const [pulseActive, setPulseActive] = useState(false)
  const [answerFeedback, setAnswerFeedback] = useState<
    'correct' | 'incorrect' | null
  >(null)

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

    if (result.nextPokemonId) {
      setCurrentPokemon(result.nextPokemonId)
      // Auto-play cry for new pokemon? Optional.
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

    setGuess('')
    setIsPlaying(false)
    setTopSpriteVisible(false)
    setPulseActive(false)
  }, [encounter.id, encounter.settings.timeLimit, gameStarted])

  // Auto-start the encounter on mount
  useEffect(() => {
    if (initialState) {
      // Hydrated
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
  }, [gameStarted, gameEnded, encounter.id])

  // Play cry (attempt to play local asset, else synth a tone)
  const playCry = useCallback(async () => {
    if (!currentPokemon || isPlaying) return

    setIsPlaying(true)
    const id = currentPokemon

    const tryAudioPlay = async (src: string) => {
      try {
        const audio = new Audio(src)
        await audio.play()
        return new Promise<void>((resolve) => {
          audio.addEventListener('ended', () => resolve())
          // fallback resolve in case no ended event
          setTimeout(() => resolve(), 2000)
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }

    const candidates = [
      `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
      `/cries/${id}.mp3`,
      `/cries/${id}.ogg`,
      `/sounds/cries/${id}.mp3`,
    ]
    let played = false
    for (const candidate of candidates) {
      try {
        // Try loading & playing
        // eslint-disable-next-line no-await-in-loop
        await tryAudioPlay(candidate)
        played = true
        break
      } catch (e) {
        // try next
      }
    }

    // Fallback to synth if no audio file available
    if (!played) {
      try {
        const AudioContext =
          (window as any).AudioContext || (window as any).webkitAudioContext
        if (AudioContext) {
          const ctx = new AudioContext()
          const o = ctx.createOscillator()
          const g = ctx.createGain()
          o.type = 'sawtooth'
          o.frequency.value = 220 + (id % 40) * 6
          o.connect(g)
          g.connect(ctx.destination)
          g.gain.value = 0
          o.start()
          g.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02)
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0)
          // Wait for the tone to play
          // eslint-disable-next-line no-await-in-loop
          await new Promise((res) => setTimeout(res, 1000))
          o.stop()
          ctx.close()
          played = true
        }
      } catch (err) {
        // ignore
      }
    }

    setIsPlaying(false)
  }, [currentPokemon, isPlaying])

  // Make guess
  const makeGuess = useCallback(async () => {
    if (!currentPokemon || !guess || isProcessing) return
    setIsProcessing(true)

    // Find the ID of the guess (which is a name)
    const guessedPokemon = pokemonData.find((p) => {
      const name =
        p.forms.find((f) => f.form === 'base')?.name ||
        p.forms[0]?.name ||
        '???'
      return name === guess
    })

    // We send the ID of the guessed pokemon as the answer
    const answerId = guessedPokemon ? guessedPokemon.id : guess

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

    // Show the correct Pokemon sprite (which is currentPokemon, verifying it logic-wise)
    setTopSpriteVisible(true)
    setAnswerFeedback(isCorrect ? 'correct' : 'incorrect')

    if (isCorrect) {
      playSfx('good')
      setCorrectCount(result.wins)
      setPulseActive(true)

      // Check win condition
      if (result.gameOver) {
        // Completed
        const completeResult = await completeResearchEncounter(
          encounter.id,
          result.wins >= (result.requiredWins || 5),
        )
        if (completeResult.success && completeResult.summary) {
          setSuccess(true)
          setResult({
            success: true,
            rewards: completeResult.summary,
            message: `You correctly identified ${result.wins} Pokémon!`,
          })
        } else {
          setSuccess(false)
          setResult({
            success: false,
            rewards: completeResult?.summary,
            message: `You identified ${result.wins || 0} of ${winRateNum} required.`,
          })
        }

        setGameEnded(true)
      } else {
        // Fast-paced: display pulse animation then hide before picking next
        await new Promise((resolve) => setTimeout(resolve, 300))
        setAnswerFeedback(null)
        setPulseActive(false)
        await new Promise((resolve) => setTimeout(resolve, 80))
        setTopSpriteVisible(false)
        await new Promise((resolve) => setTimeout(resolve, 80))

        // Next Pokemon
        if (result.nextPokemonId) {
          setCurrentPokemon(result.nextPokemonId)
          setGuess('')
        }
      }
    } else {
      // wrong answer — show correct Pokemon briefly, then immediately pick next pokemon
      playSfx('bad')
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAnswerFeedback(null)

      if (result.gameOver) {
        const completeResult = await completeResearchEncounter(
          encounter.id,
          false,
        )
        setSuccess(false)
        setResult({
          success: false,
          rewards: completeResult?.summary,
          message:
            result.message ||
            `You identified ${result.wins || 0} of ${winRateNum} required.`,
        })
        setGameEnded(true)
      } else {
        setTopSpriteVisible(false)

        // Next Pokemon
        if (result.nextPokemonId) {
          setCurrentPokemon(result.nextPokemonId)
          setGuess('')
        }
      }
    }

    setIsProcessing(false)
  }, [currentPokemon, guess, encounter.id, isProcessing])

  // Pokemon options for select
  const pokemonOptions = useMemo(() => {
    return pokemonData
      .filter((p) => pokemonPool.includes(p.id))
      .map((pokemon) => {
        const name =
          pokemon.forms.find((f) => f.form === 'base')?.name ||
          pokemon.forms[0]?.name ||
          '???'
        return {
          value: name,
          label: name,
          id: pokemon.id,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [pokemonPool])

  const pokemon = currentPokemon
    ? pokemonData.find((p) => p.id === currentPokemon)
    : null
  const pokemonName =
    pokemon?.forms.find((f) => f.form === 'base')?.name ||
    pokemon?.forms[0]?.name ||
    '???'

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Game Area (Top 30%) */}
          <div className="relative h-[30%] overflow-hidden bg-game-night-surface">
            {/* Background Image if set on encounter - no fallback, no overlay */}
            {encounter.background ? (
              <Image
                src={encounter.background}
                alt="Background"
                fill
                className="object-cover"
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

            {/* Scanner overlay when processing */}
            {isProcessing && (
              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute left-0 right-0 z-20 h-1 bg-[#d3ad63]/60 shadow-[0_0_15px_rgba(211,173,99,0.65)]"
              />
            )}

            {/* Top center sprite (appears over the background when a guess is made) */}
            <AnimatePresence>
              {pokemon && topSpriteVisible && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    y: 20,
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    opacity: 1,
                    scale: pulseActive ? 1.1 : 1,
                    y: 0,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.2,
                    filter: 'blur(10px)',
                    transition: { duration: 0.2 },
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <div
                    className={cn(
                      'relative w-40 h-40 transition-all duration-300',
                      answerFeedback === 'correct' &&
                        'drop-shadow-[0_0_28px_rgba(74,222,128,0.8)]',
                      answerFeedback === 'incorrect' &&
                        'drop-shadow-[0_0_28px_rgba(248,113,113,0.8)]',
                    )}
                  >
                    <Image
                      src={getPokemonImageUrl(pokemon.id.toString(), 'home')}
                      alt={pokemonName}
                      fill
                      className="object-contain drop-shadow-2xl scale-110"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!topSpriteVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-full flex items-center justify-center"
                >
                  {isPlaying && (
                    <>
                      <motion.div
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                        className="pointer-events-none absolute h-20 w-20 rounded-full border-2 border-[#c9d8a7]/55"
                      />
                      <motion.div
                        initial={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 2.5 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'easeOut',
                          delay: 0.2,
                        }}
                        className="pointer-events-none absolute h-20 w-20 rounded-full border-2 border-[#d3ad63]/35"
                      />
                    </>
                  )}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-lg border border-[#f7ecd6]/20 bg-[#172733]/85 backdrop-blur-sm">
                    <div aria-hidden="true">
                      {isPlaying ? (
                        <Volume2 className="h-8 w-8 animate-pulse text-[#d3ad63]" />
                      ) : (
                        <Volume2 className="h-8 w-8 text-[#f7ecd6]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Answer Area (Bottom 70%) */}
          <div className="game-paper-background h-[70%] overflow-y-auto border-t border-game-border bg-game-surface px-4 py-5 text-game-ink">
            <div className="mx-auto flex h-full max-w-md flex-col lg:max-w-2xl">
              <SectionDivider>Identify the Pokemon</SectionDivider>
              <div className="flex items-center justify-center mb-6">
                {/* Play Cry Button */}
                <div className="text-center mb-0">
                  <Button
                    type="button"
                    onClick={playCry}
                    disabled={isPlaying}
                    aria-pressed={isPlaying}
                    aria-busy={isPlaying}
                    size="lg"
                    variant="outline"
                    className="w-auto px-6"
                  >
                    {isPlaying ? (
                      <VolumeX className="w-6 h-6 mr-2" />
                    ) : (
                      <Volume2 className="w-6 h-6 mr-2" />
                    )}
                    {isPlaying ? 'Listen...' : 'Play Cry'}
                  </Button>
                </div>
              </div>

              {/* Horizontal Rule */}
              <hr className="mb-auto" />

              <div className="space-y-6 pb-8">
                <div className="space-y-4">
                  <Select value={guess} onValueChange={setGuess}>
                    <SelectTrigger className="w-full h-12 text-sm">
                      <SelectValue placeholder="Select a Pokémon..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <div className="px-2 py-2">
                        <input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={(e) => e.stopPropagation()}
                          placeholder="Search Pokémon..."
                          className="game-focus-ring mb-2 w-full rounded-md border border-game-border bg-game-surface-raised px-3 py-2 text-sm text-game-ink placeholder:text-game-muted"
                        />
                      </div>
                      {pokemonOptions
                        .filter((o) =>
                          o.label
                            .toLowerCase()
                            .includes(searchTerm.trim().toLowerCase()),
                        )
                        .map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.value}
                            className="text-lg"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="default"
                    type="button"
                    onClick={makeGuess}
                    disabled={!guess || isProcessing}
                    aria-busy={isProcessing}
                    className="h-12 w-full bg-game-clay text-base font-bold tracking-wide text-game-cream shadow-sm hover:bg-game-clay/90"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Guess'
                    )}
                  </Button>
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
                type="button"
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
