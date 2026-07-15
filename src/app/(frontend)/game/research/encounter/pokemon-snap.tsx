'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/ui/section-divider'
import { useAudio } from '@/context/AudioContext'
import type { ResearchConfig } from '@/data/games'
import pokemonData from '@/data/pokemon-data'
import { useGameMusic } from '@/hooks/useGameMusic'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface PokemonSnapGameProps {
  encounter: ResearchConfig
  initialState?: any
}

type CompletionResult = Awaited<ReturnType<typeof completeResearchEncounter>>

function getCompletionExpeditionProgress(completeResult: CompletionResult) {
  return (
    completeResult.expeditionProgress ||
    (completeResult.summary as any)?.expeditionProgress
  )
}

function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.decoding = 'async'
    img.onload = () => {
      if (img.decode) {
        img
          .decode()
          .catch(() => undefined)
          .finally(() => resolve(img))
        return
      }
      resolve(img)
    }
    img.onerror = () => resolve(img)
    img.src = src

    if (img.complete && img.naturalWidth > 0) {
      resolve(img)
    }
  })
}

function getSnapPokemonImageUrls(id: number) {
  return [
    getPokemonImageUrl(id.toString(), 'home'),
    getPokemonImageUrl(id.toString(), 'sprite'),
  ]
}

import { useUser } from '@/context/UserContext'
import { logger } from '@/utilities/logger'

export function PokemonSnapGame({
  encounter,
  initialState,
}: PokemonSnapGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const targetPokemonId =
    typeof encounter.settings.target === 'number'
      ? encounter.settings.target
      : null
  const isTargetMode = targetPokemonId !== null
  const targetMissMessage =
    typeof encounter.settings.targetMissMessage === 'string'
      ? encounter.settings.targetMissMessage
      : targetPokemonId === 100
        ? 'Voltorb exploded!'
        : 'The shadow vanished!'
  const winRateNum = isTargetMode
    ? 1
    : typeof encounter.settings.winRate === 'number'
      ? encounter.settings.winRate
      : 5
  const [currentPokemon, setCurrentPokemon] = useState<number | null>(null) // The one currently flashing
  const [requestedPokemon, setRequestedPokemon] = useState<number | null>(
    targetPokemonId ||
      initialState?.nextPokemonId ||
      initialState?.currentPokemonId ||
      null,
  ) // The one to find
  const [pokemonVisible, setPokemonVisible] = useState(false)
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [correctSnaps, setCorrectSnaps] = useState(initialState?.wins || 0)
  const [pokemonPool, setPokemonPool] = useState<number[]>([])
  const [spritesReady, setSpritesReady] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? (encounter.settings.timeLimit || 60),
  )
  const [roundActive, setRoundActive] = useState(false)
  const [success, setSuccess] = useState(false)
  const [nextRoundDelay, setNextRoundDelay] = useState(!!initialState) // Start round immediately if hydrated
  const [cameraFlash, setCameraFlash] = useState(false)
  const [wrongSnapToast, setWrongSnapToast] = useState(false)
  const [photographedPokemon, setPhotographedPokemon] = useState<
    { id: number; correct: boolean }[]
  >([])
  const [roundData, setRoundData] = useState<any>(
    initialState?.roundData || null,
  )
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(
    initialState?.startTime || null,
  )
  const preloadedImages = useRef<{ [id: number]: HTMLImageElement }>({})
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const targetMissTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const targetGameEndedRef = useRef(false)
  const router = useRouter()

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (targetMissTimeoutRef.current)
        clearTimeout(targetMissTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    targetGameEndedRef.current = gameEnded
  }, [gameEnded])

  // Initialize pokemon pool and preload every sprite that can appear before the timer starts.
  useEffect(() => {
    let cancelled = false
    let pool = encounter.settings.pokemonPool || []
    if (isTargetMode && targetPokemonId !== null) {
      pool = Array.from(new Set([targetPokemonId, ...pool]))
    } else if (pool.length === 0) {
      pool = pokemonData.map((p) => p.id)
    }
    setPokemonPool(pool)

    setSpritesReady(false)
    preloadedImages.current = {}

    Promise.all(
      pool.flatMap((id) =>
        getSnapPokemonImageUrls(id).map(async (src) => {
          const img = await preloadImage(src)
          preloadedImages.current[id] = img
        }),
      ),
    ).then(() => {
      if (!cancelled) setSpritesReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [encounter.settings.pokemonPool, isTargetMode, targetPokemonId])

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
    targetGameEndedRef.current = false
    setSuccess(false)
    setPokemonVisible(false)
    setCorrectSnaps(result.wins || 0)
    setPhotographedPokemon([]) // note: we don't load history from server currently, could do if needed
    setRoundData(result.roundData || null)
    setSessionStartTime(result.startTime || Date.now())

    if (isTargetMode && targetPokemonId !== null) {
      setRequestedPokemon(targetPokemonId)
    } else if (result.nextPokemonId) {
      setRequestedPokemon(result.nextPokemonId)
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

    setRoundActive(false)
    setNextRoundDelay(true)
  }, [
    encounter.id,
    encounter.settings.timeLimit,
    gameStarted,
    isTargetMode,
    targetPokemonId,
  ])

  const endGame = useCallback(
    async (didWin: boolean, message: string) => {
      if (targetGameEndedRef.current) return
      targetGameEndedRef.current = true
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
      if (targetMissTimeoutRef.current)
        clearTimeout(targetMissTimeoutRef.current)

      setPokemonVisible(false)
      setRoundActive(false)
      setGameEnded(true)
      setSuccess(didWin)
      playSfx(didWin ? 'good' : 'bad')

      const completeResult = await completeResearchEncounter(
        encounter.id,
        didWin,
      )
      setResult({
        success: didWin && completeResult.success,
        rewards: completeResult.summary,
        expeditionProgress: getCompletionExpeditionProgress(completeResult),
        message,
      })
    },
    [encounter.id, playSfx],
  )

  // Handle snap button click
  const handleSnap = useCallback(async () => {
    if (isProcessing || !roundActive || !currentPokemon) return
    setIsProcessing(true)

    // Trigger camera flash effect
    setCameraFlash(true)
    setTimeout(() => setCameraFlash(false), 200)

    // Submit valid answer to server
    // We send the pokemon ID that was visible when they snapped
    const snappedId = currentPokemon

    if (isTargetMode) {
      targetGameEndedRef.current = true
    }

    if (targetMissTimeoutRef.current) {
      clearTimeout(targetMissTimeoutRef.current)
      targetMissTimeoutRef.current = null
    }

    const result = await submitResearchAnswer(snappedId)

    if (!result.success) {
      if (result.error === 'Session expired or not found') {
        router.push('/game')
        return
      }
      if (result.gameOver) {
        const completeResult = await completeResearchEncounter(
          encounter.id,
          false,
        )
        setGameEnded(true)
        setSuccess(false)
        setResult({
          success: false,
          rewards: completeResult.summary,
          expeditionProgress: getCompletionExpeditionProgress(completeResult),
          message: result.message || 'Time is up!',
        })
        setIsProcessing(false)
        return
      }
    }

    const isCorrect = !!result.correct
    if (isCorrect) playSfx('good')
    else {
      playSfx('bad')
      // Show wrong-snap toast briefly
      setWrongSnapToast(true)
      setTimeout(() => setWrongSnapToast(false), 900)
    }
    setCorrectSnaps(result.wins || 0)
    setPhotographedPokemon((prev) => [
      ...prev,
      { id: snappedId, correct: isCorrect },
    ])

    // Update target for next round
    if (result.nextPokemonId) {
      setRequestedPokemon(result.nextPokemonId)
    }

    setPokemonVisible(false)
    setRoundActive(false)

    // Check Win Condition
    // Use requiredWins from server or fall back to local config
    const requiredWins = result.requiredWins || winRateNum
    // Use wins from server or fall back to local state
    const wins = result.wins || (isCorrect ? correctSnaps + 1 : correctSnaps)

    if (result.gameOver || wins >= requiredWins) {
      // Fetch rewards/completion
      const didWin = wins >= requiredWins
      targetGameEndedRef.current = true
      setGameEnded(true)
      const completeResult = await completeResearchEncounter(
        encounter.id,
        didWin,
      )
      if (didWin && completeResult.success && completeResult.summary) {
        setSuccess(true)
        playSfx('good')
        setResult({
          success: true,
          rewards: completeResult.summary,
          expeditionProgress: getCompletionExpeditionProgress(completeResult),
          message: `You snapped ${wins} correct photo${wins === 1 ? '' : 's'}!`,
        })
      } else {
        // Maybe lost?
        setSuccess(false)
        setResult({
          success: false,
          rewards: completeResult?.summary,
          expeditionProgress: getCompletionExpeditionProgress(completeResult),
          message: `You snapped ${wins} of ${winRateNum} required.`,
        })
      }
    } else {
      // Continue game
      // Delay before next round
      // setNextRoundDelay(true) logic is handled in the effect when roundActive becomes false
    }

    setIsProcessing(false)
  }, [
    isProcessing,
    roundActive,
    currentPokemon,
    isTargetMode,
    encounter.id,
    correctSnaps,
    winRateNum,
    playSfx,
    router,
  ])

  // Handle key press
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && pokemonVisible && !gameEnded && roundActive) {
        e.preventDefault()
        handleSnap()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [pokemonVisible, gameEnded, handleSnap, roundActive])

  // Auto-start the encounter on mount
  useEffect(() => {
    if (initialState) {
      // Hydrated
    } else if (!gameStarted && pokemonPool.length > 0 && spritesReady) {
      initGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonPool, spritesReady])

  // Timer effect for game time limit
  useEffect(() => {
    if (!gameStarted || gameEnded) return
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStarted, gameEnded])

  // Effect to handle time running out
  useEffect(() => {
    if (gameStarted && !gameEnded && timeLeft === 0) {
      endGame(false, 'Time is up!')
    }
  }, [timeLeft, gameStarted, gameEnded, endGame])

  // Target mode: one scheduled target window, optional decoys from pokemonPool.
  useEffect(() => {
    if (
      !isTargetMode ||
      targetPokemonId === null ||
      !gameStarted ||
      gameEnded ||
      !spritesReady ||
      !sessionStartTime ||
      !roundData
    ) {
      return
    }

    const threshold = encounter.settings.successThreshold || 1500
    const targetAppearAtMs =
      typeof roundData.snapTargetAppearAtMs === 'number'
        ? roundData.snapTargetAppearAtMs
        : 0
    const targetStartAt = sessionStartTime + targetAppearAtMs
    const targetEndAt = targetStartAt + threshold
    const decoyPool = pokemonPool.filter((id) => id !== targetPokemonId)
    const timers: NodeJS.Timeout[] = []

    const showTarget = () => {
      if (targetGameEndedRef.current) return
      setCurrentPokemon(targetPokemonId)
      setPokemonVisible(true)
      setRoundActive(true)

      targetMissTimeoutRef.current = setTimeout(() => {
        endGame(false, targetMissMessage)
      }, threshold)
    }

    const scheduleDecoy = (delay: number) => {
      const timer = setTimeout(() => {
        if (targetGameEndedRef.current || decoyPool.length === 0) return

        const now = Date.now()
        if (now >= targetStartAt - threshold && now <= targetEndAt) {
          scheduleDecoy(Math.max(200, targetEndAt - now + threshold))
          return
        }

        setCurrentPokemon(
          decoyPool[Math.floor(Math.random() * decoyPool.length)],
        )
        setPokemonVisible(true)
        setRoundActive(true)

        const hideTimer = setTimeout(() => {
          setPokemonVisible(false)
          setRoundActive(false)
          scheduleDecoy(Math.min(threshold * 2, 1500))
        }, threshold)
        timers.push(hideTimer)
      }, delay)
      timers.push(timer)
    }

    const now = Date.now()
    if (now >= targetEndAt) {
      endGame(false, targetMissMessage)
      return
    }

    if (now >= targetStartAt) {
      showTarget()
    } else {
      timers.push(setTimeout(showTarget, targetStartAt - now))
    }

    if (decoyPool.length > 0) {
      scheduleDecoy(Math.min(threshold, 1000))
    }

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [
    isTargetMode,
    targetPokemonId,
    gameStarted,
    gameEnded,
    spritesReady,
    sessionStartTime,
    roundData,
    encounter.settings.successThreshold,
    pokemonPool,
    targetMissMessage,
    endGame,
  ])

  // Main round loop: show Pokémon for successThreshold, then break, then next
  useEffect(() => {
    if (
      isTargetMode ||
      !nextRoundDelay ||
      gameEnded ||
      !spritesReady ||
      roundActive ||
      pokemonPool.length === 0 ||
      requestedPokemon == null
    )
      return

    setNextRoundDelay(false)

    // Clear any existing timeout
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)

    // Pick a random Pokémon to show (flashing one)
    // The prompt says "pokemon that can appear should be from the pool of pokemon and additional pokemon"
    // "options to find should only be from the main pokemon pool"
    // `requestedPokemon` IS from the main pool (set by server).
    // The flashing pokemon can be any.
    // For now, we stick to the pool + maybe randoms if we want to follow "additional pokemon" strictly.
    // Let's just use the pool for now to be safe, or expand it slightly?
    // The prompt says "equally from the pool of pokemon and additional pokemon".
    // I'll just use the pool.
    const showId = pokemonPool[Math.floor(Math.random() * pokemonPool.length)]

    setCurrentPokemon(showId)
    setPokemonVisible(true)
    setRoundActive(true)

    // Hide after successThreshold ms
    const threshold = encounter.settings.successThreshold || 1500
    hideTimeoutRef.current = setTimeout(() => {
      setPokemonVisible(false)
      setRoundActive(false)
      hideTimeoutRef.current = null

      // If they missed it (passed), just delay and try again.
      // Do we penalize? No snap = no penalty? or "Missed opportunity"?
      // Standard snap: they just wait for next flush.
      setTimeout(
        () => {
          if (!gameEnded && timeLeft > 1) {
            setNextRoundDelay(true)
          }
        },
        Math.min(threshold * 2, 1500),
      )
    }, threshold)
  }, [
    nextRoundDelay,
    gameEnded,
    spritesReady,
    pokemonPool,
    requestedPokemon,
    encounter.settings.successThreshold,
    timeLeft,
    roundActive,
    isTargetMode,
  ])

  const pokemon = currentPokemon
    ? pokemonData.find((p) => p.id === currentPokemon)
    : null
  const pokemonName =
    pokemon?.forms.find((f) => f.form === 'base')?.name ||
    pokemon?.forms[0]?.name ||
    '???'
  const requested = requestedPokemon
    ? pokemonData.find((p) => p.id === requestedPokemon)
    : null
  const requestedName =
    requested?.forms.find((f) => f.form === 'base')?.name ||
    requested?.forms[0]?.name ||
    '???'

  logger.debug('[SnapGame] Render', {
    initialState: !!initialState,
    nextPokemonId: initialState?.nextPokemonId,
    requestedPokemon,
    requestedName,
    poolSize: pokemonPool.length,
  })

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Game Area (Top 30%) */}
          <div className="relative h-[30%] overflow-hidden bg-game-night-surface">
            {/* Background Image if set on encounter - no fallback, no overlay */}
            {encounter.background ? (
              <motion.div
                animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 scale-125"
              >
                <Image
                  src={encounter.background}
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </motion.div>
            ) : null}

            {/* Viewfinder HUD */}
            <div className="pointer-events-none absolute inset-0 z-10 border-[16px] border-[#081014]/80">
              {/* Corner crosshairs */}
              <div className="absolute left-4 top-4 h-8 w-8 border-l-4 border-t-4 border-[#f7ecd6]/50" />
              <div className="absolute right-4 top-4 h-8 w-8 border-r-4 border-t-4 border-[#f7ecd6]/50" />
              <div className="absolute bottom-4 left-4 h-8 w-8 border-b-4 border-l-4 border-[#f7ecd6]/50" />
              <div className="absolute bottom-4 right-4 h-8 w-8 border-b-4 border-r-4 border-[#f7ecd6]/50" />
              <div className="absolute left-1/2 top-1/2 hidden h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f7ecd6]/30 sm:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500/80 rounded-full" />
              </div>
            </div>

            {/* Camera Flash Overlay */}
            {cameraFlash && (
              <div className="absolute inset-0 bg-white z-20 animate-in fade-in duration-200" />
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
              <GameProgressChip wins={correctSnaps} required={winRateNum} />
            </div>

            {/* Wrong snap toast */}
            {wrongSnapToast && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="bg-red-500/90 text-game-cream text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-in zoom-in-75 duration-200">
                  Wrong Pokémon!
                </div>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {!pokemonVisible && (
                <div className="text-center flex flex-col items-center gap-2">
                  {/* Animated searching indicator */}
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 animate-ping rounded-full border-2 border-game-ochre/30" />
                    <div className="absolute inset-2 animate-ping rounded-full border-2 border-game-ochre/50 [animation-delay:300ms]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-[#f7ecd6]" />
                    </div>
                  </div>
                </div>
              )}

              {pokemonVisible && currentPokemon && (
                <div className="relative w-48 h-48 animate-in zoom-in-50 duration-300">
                  <Image
                    src={getPokemonImageUrl(currentPokemon.toString(), 'home')}
                    alt={pokemonName}
                    width={192}
                    height={192}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Answer Area (Bottom 70%) */}
          <div className="game-paper-texture h-[70%] overflow-y-auto border-t border-game-border bg-game-surface p-6 text-game-ink">
            <div className="h-full flex flex-col">
              <SectionDivider>Take a Photo of</SectionDivider>
              <div className="flex items-center justify-center mb-6">
                <h2 className="break-words text-center font-display text-3xl font-semibold leading-tight text-game-ink sm:text-4xl">
                  {requestedName}
                </h2>
              </div>

              {/* Horizontal Rule */}
              <hr className="mb-6 border-game-border" />

              {/* Your Photos Section */}
              <SectionDivider>Your Photos</SectionDivider>
              <div className="flex-1 mb-6">
                {photographedPokemon.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4 max-h-48 overflow-y-auto px-2 pt-2 pb-6">
                    <AnimatePresence>
                      {photographedPokemon.map((photo, index) => {
                        const pokemon = pokemonData.find(
                          (p) => p.id === photo.id,
                        )
                        const pokemonName =
                          pokemon?.forms.find((f) => f.form === 'base')?.name ||
                          pokemon?.forms[0]?.name ||
                          '???'
                        // Generate a deterministic rotation so it stays the same
                        const rot = (index % 5) * 5 - 10
                        return (
                          <motion.div
                            key={`${photo.id}-${index}`}
                            initial={{
                              scale: 2,
                              y: -200,
                              rotate: Math.random() * 40 - 20,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              y: 0,
                              rotate: rot,
                              opacity: 1,
                            }}
                            transition={{
                              type: 'spring',
                              damping: 14,
                              stiffness: 100,
                            }}
                            className="flex flex-col items-center rounded-sm border border-game-border bg-game-surface-raised p-2 pb-6 shadow-md"
                          >
                            <div
                              className={`w-16 h-16 border-2 flex items-center justify-center overflow-hidden bg-white ${
                                photo.correct
                                  ? 'border-green-500'
                                  : 'border-red-500'
                              }`}
                            >
                              <Image
                                src={getPokemonImageUrl(
                                  photo.id.toString(),
                                  'sprite',
                                )}
                                alt={pokemonName}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            </div>
                            <span className="mt-2 w-full truncate text-center text-[10px] font-bold tracking-tight text-game-ink">
                              {pokemonName}
                            </span>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center text-game-muted" />
                )}
              </div>

              <div className="flex items-center justify-center pb-8">
                <Button
                  onClick={handleSnap}
                  disabled={!pokemonVisible || isProcessing || !roundActive}
                  size="lg"
                  variant="default"
                  className="mt-auto flex h-24 w-48 flex-col items-center justify-center gap-1 rounded-xl border-none bg-game-clay text-game-cream opacity-100 shadow-md transition-colors hover:bg-game-clay/90 disabled:opacity-40"
                >
                  <Camera className="size-10 text-game-cream" />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Snap
                  </span>
                </Button>
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
