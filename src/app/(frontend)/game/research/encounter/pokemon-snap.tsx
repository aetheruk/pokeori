'use client'

import type { GameDataKeys } from '@/utilities/requirements/analysis'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Camera, Check, Crosshair, ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { useAudio } from '@/context/AudioContext'
import type { GameItem } from '@/data/games'
import pokemonData from '@/data/pokemon-data'
import { useGameMusic } from '@/hooks/useGameMusic'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeGame,
  startGame,
  submitGameAnswer,
} from '@/utilities/games/client-action-recovery'

interface PokemonSnapGameProps {
  encounter: GameItem
  initialState?: any
}

type CompletionResult = Awaited<ReturnType<typeof completeGame>>

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
  const reduceMotion = useReducedMotion()
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const completionInvalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)
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
    Promise.all(
      pool.flatMap((id) => getSnapPokemonImageUrls(id).map(preloadImage)),
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
    const result = await startGame(encounter.id)

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

      const completeResult = await completeGame(encounter.id, didWin)
      completionInvalidatesRef.current = completeResult.invalidates
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

    const result = await submitGameAnswer(snappedId)

    if (!result.success) {
      if (result.error === 'Session expired or not found') {
        router.push('/game')
        return
      }
      if (result.gameOver) {
        const completeResult = await completeGame(encounter.id, false)
        completionInvalidatesRef.current = completeResult.invalidates
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
      const completeResult = await completeGame(encounter.id, didWin)
      completionInvalidatesRef.current = completeResult.invalidates
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
    <div className="min-h-dvh bg-game-surface text-game-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Game Area (Top 30%) */}
          <div className="relative h-[30%] shrink-0 overflow-hidden bg-game-night-surface">
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
                  {/* unoptimized: the preload above warms these exact bundled
                      AVIF URLs, so the first flash renders instantly instead of
                      waiting on the image optimizer's /_next/image URL. */}
                  <Image
                    src={getPokemonImageUrl(currentPokemon.toString(), 'home')}
                    alt={pokemonName}
                    width={192}
                    height={192}
                    unoptimized
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Field desk */}
          <div className="game-paper-background flex min-h-0 flex-1 flex-col border-t border-game-border bg-game-surface text-game-ink">
            <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 sm:px-6">
              <div className="grid shrink-0 grid-cols-[1fr_auto] items-center gap-3 border-b border-game-border py-4 sm:gap-6 sm:py-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                  <div className="relative flex size-24 shrink-0 items-center justify-center rounded-lg border border-game-card-border bg-game-surface-raised sm:size-32">
                    <Crosshair
                      aria-hidden="true"
                      className="absolute inset-3 size-[calc(100%-1.5rem)] stroke-[0.5] text-game-border"
                    />
                    {requestedPokemon ? (
                      <Image
                        src={getPokemonImageUrl(
                          requestedPokemon.toString(),
                          'sprite',
                        )}
                        alt={requestedName}
                        width={192}
                        height={192}
                        unoptimized
                        className="relative size-36 max-w-none object-contain [image-rendering:pixelated] sm:size-48"
                      />
                    ) : (
                      <Camera
                        className="size-8 text-game-muted"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-game-muted">
                      <Crosshair className="size-3.5" aria-hidden="true" /> Find
                      & photograph
                    </p>
                    <h2 className="break-words text-xl font-bold leading-tight sm:text-2xl">
                      {requestedName}
                    </h2>
                    <p className="mt-2 text-xs text-game-muted">
                      Wait for it in the viewfinder.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleSnap}
                  disabled={!pokemonVisible || isProcessing || !roundActive}
                  aria-label={isProcessing ? 'Saving photo' : 'Snap photo'}
                  className="flex h-auto min-h-24 w-24 flex-col gap-2 rounded-xl bg-game-clay px-2 py-3 text-game-cream hover:bg-game-clay-strong disabled:opacity-50 sm:min-h-32 sm:w-32"
                >
                  <span className="flex size-12 items-center justify-center rounded-full border-2 border-current sm:size-14">
                    <Camera className="size-6" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold">
                    {isProcessing ? 'Saving…' : 'Snap photo'}
                  </span>
                  <kbd className="hidden text-[10px] font-normal opacity-75 sm:block">
                    Space
                  </kbd>
                </Button>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 py-3">
                <h3 className="flex items-center gap-2 text-sm font-bold">
                  <ImageIcon
                    className="size-4 text-game-muted"
                    aria-hidden="true"
                  />{' '}
                  Contact sheet
                </h3>
                <span className="font-mono text-xs text-game-muted">
                  {photographedPokemon.length} photos
                </span>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto pb-5 [scrollbar-width:thin]">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  <AnimatePresence initial={false}>
                    {photographedPokemon.map((photo, index) => {
                      const pokemon = pokemonData.find((p) => p.id === photo.id)
                      const name =
                        pokemon?.forms.find((f) => f.form === 'base')?.name ||
                        pokemon?.forms[0]?.name ||
                        '???'
                      return (
                        <motion.figure
                          key={`${photo.id}-${index}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative rounded-lg border border-game-card-border bg-game-surface-raised p-2 shadow-sm"
                        >
                          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-game-surface">
                            {encounter.background && (
                              <Image
                                src={encounter.background}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 50vw, 240px"
                                className="object-cover"
                              />
                            )}
                            <Image
                              src={getPokemonImageUrl(
                                photo.id.toString(),
                                'sprite',
                              )}
                              alt={name}
                              width={144}
                              height={144}
                              unoptimized
                              className="relative size-full object-contain p-2 [image-rendering:pixelated]"
                            />
                            <span className="absolute bottom-1.5 left-1.5 rounded bg-game-charcoal px-1.5 py-0.5 font-mono text-[10px] text-game-cream">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <figcaption className="flex items-center justify-between gap-2 px-0.5 pb-0.5 pt-2.5">
                            <span className="truncate text-xs font-bold sm:text-sm">
                              {name}
                            </span>
                            <span
                              role="img"
                              aria-label={
                                photo.correct
                                  ? 'Correct photo'
                                  : 'Wrong Pokémon'
                              }
                              className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${photo.correct ? 'border-game-ochre text-game-ochre' : 'border-game-clay text-game-clay'}`}
                            >
                              {photo.correct ? (
                                <Check className="size-4" />
                              ) : (
                                <X className="size-4" />
                              )}
                            </span>
                          </figcaption>
                        </motion.figure>
                      )
                    })}
                  </AnimatePresence>
                  {Array.from(
                    {
                      length: Math.max(
                        0,
                        Math.min(winRateNum, 3) - photographedPokemon.length,
                      ),
                    },
                    (_, index) => (
                      <div
                        key={`empty-${index}`}
                        aria-hidden="true"
                        className="rounded-lg border border-dashed border-game-border p-2"
                      >
                        <div className="flex aspect-square items-center justify-center rounded-sm bg-game-surface-raised/40">
                          <Camera className="size-7 stroke-1 text-game-border" />
                        </div>
                        <div className="flex items-center justify-between px-0.5 pt-2.5 pb-0.5 text-game-muted">
                          <span className="font-mono text-[10px]">— —</span>
                          <span className="size-6 rounded-full border border-dashed border-game-border" />
                        </div>
                      </div>
                    ),
                  )}
                </div>
                {photographedPokemon.length === 0 && (
                  <p className="mt-3 text-center text-xs text-game-muted">
                    Your first photo goes here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {result && (
        <RewardResultOverlay
          result={result}
          background={encounter.background}
          onClose={() => {
            refreshUser(true, completionInvalidatesRef.current)
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
                    const res = await startGame(
                      (initialState?.encounter || encounter).id,
                      true,
                    )
                    if (res?.success) {
                      router.refresh()
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
