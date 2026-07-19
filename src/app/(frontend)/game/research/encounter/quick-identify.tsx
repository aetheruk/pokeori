'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { GameProgressChip } from '@/components/game/shared/game-progress-chip'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { ResearchConfig } from '@/data/games'
import { items } from '@/data/items'
import pokemonData from '@/data/pokemon-data'
import { useGameMusic } from '@/hooks/useGameMusic'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

interface QuickIdentifyGameProps {
  encounter: ResearchConfig
  initialState?: any
}

function formatItemName(id: string) {
  return id
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

export function QuickIdentifyGame({
  encounter,
  initialState,
}: QuickIdentifyGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const winRateNum =
    typeof encounter.settings.winRate === 'number'
      ? encounter.settings.winRate
      : 5
  const [currentId, setCurrentId] = useState<number | string | null>(
    initialState?.nextItemId ||
      initialState?.nextPokemonId ||
      initialState?.currentPokemonId ||
      initialState?.currentItemId ||
      null,
  )
  const [options, setOptions] = useState<(number | string)[]>(
    initialState?.roundData?.options || [],
  )
  const [correctCount, setCorrectCount] = useState(initialState?.wins || 0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft ?? (encounter.settings.timeLimit || 60),
  )
  const [gameStarted, setGameStarted] = useState(!!initialState)
  const [gameEnded, setGameEnded] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  // Visual feedback states
  const [topSpriteVisible, setTopSpriteVisible] = useState(false)
  const [pulseActive, setPulseActive] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const isItemGame =
    (encounter.settings.itemPool && encounter.settings.itemPool.length > 0) ||
    false

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
    setSuccess(false)

    if (result.roundData?.options) {
      setOptions(result.roundData.options)
      if (result.nextItemId) setCurrentId(result.nextItemId)
      else if (result.nextPokemonId) setCurrentId(result.nextPokemonId)
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

    setTopSpriteVisible(false)
    setPulseActive(false)
  }, [encounter.id, encounter.settings.timeLimit, gameStarted])

  // Timer effect
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
  }, [gameStarted, gameEnded, encounter.settings.timeLimit, encounter.id])

  // Auto-start since user already confirmed when creating the encounter
  useEffect(() => {
    if (initialState) {
      // Hydrated
    } else if (!gameStarted) {
      initGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Make choice
  const makeChoice = useCallback(
    async (chosenId: number | string) => {
      if (isProcessing) return
      if (!currentId) return
      setIsProcessing(true)

      const result = await submitResearchAnswer(chosenId)

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

      if (isCorrect) {
        playSfx('good')
        setCorrectCount(result.wins || 0)

        // show and pulse the current target at the top then hide it briefly
        setTopSpriteVisible(true)
        setPulseActive(true)

        // Check win condition
        if (result.gameOver) {
          // animate pulse, then hide the top sprite before finishing
          await new Promise((resolve) => setTimeout(resolve, 350))
          setTopSpriteVisible(false)
          setPulseActive(false)
          // allow the hide transition to complete
          await new Promise((resolve) => setTimeout(resolve, 80))

          const completeResult = await completeResearchEncounter(
            encounter.id,
            (result.wins || 0) >= (result.requiredWins || 5),
          )
          if (completeResult?.success && completeResult.summary) {
            setSuccess(true)
            setResult({
              success: true,
              rewards: completeResult.summary,
              message: `You correctly identified ${result.wins} targets!`,
            })
            setGameEnded(true)
          } else {
            setSuccess(false)
            setResult({
              success: false,
              rewards: completeResult?.summary,
              message: `You identified ${result.wins || 0} of ${winRateNum} required.`,
            })
            setGameEnded(true)
          }
          setIsProcessing(false)
          return
        }

        // Fast-paced: display pulse animation then hide before picking next
        await new Promise((resolve) => setTimeout(resolve, 300))
        setPulseActive(false)
        // brief pause so the hide transition is visible
        await new Promise((resolve) => setTimeout(resolve, 80))
        setTopSpriteVisible(false)
        await new Promise((resolve) => setTimeout(resolve, 80))

        // Next Round
        if (result.roundData?.options) {
          setOptions(result.roundData.options)
          if (result.nextItemId) setCurrentId(result.nextItemId)
          else if (result.nextPokemonId) setCurrentId(result.nextPokemonId)
        }
        setIsProcessing(false)
      } else {
        // wrong answer
        playSfx('bad')
        // Check if game is over even if wrong
        if (result.gameOver) {
          const completeResult = await completeResearchEncounter(
            encounter.id,
            (result.wins || 0) >= (result.requiredWins || 5),
          )
          if (completeResult?.success && completeResult.summary) {
            setResult({
              success: false,
              rewards: completeResult.summary,
              message: `You identified ${result.wins || 0} of ${winRateNum} required.`,
            })
          }
          setGameEnded(true)
          setIsProcessing(false)
          return
        }

        // Immediately pick next pokemon for fast-paced play
        if (result.roundData?.options) {
          setOptions(result.roundData.options)
          if (result.nextItemId) setCurrentId(result.nextItemId)
          else if (result.nextPokemonId) setCurrentId(result.nextPokemonId)
        }
        setIsProcessing(false)
      }
    },
    [currentId, encounter.id, isProcessing],
  )

  let name = '???'
  let pokemon: any = null

  if (isItemGame && currentId && typeof currentId === 'string') {
    const item = items.find((i) => i.id === currentId)
    name = item?.name || formatItemName(currentId)
  } else if (currentId && typeof currentId === 'number') {
    pokemon = pokemonData.find((p) => p.id === currentId)
    name =
      pokemon?.forms.find((f: any) => f.form === 'base')?.name ||
      pokemon?.forms[0]?.name ||
      '???'
  }

  return (
    <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink">
      <main className="h-dvh w-full">
        <div className="h-full flex flex-col">
          {/* Game Area (Top 30%) */}
          <div className="relative h-[30%] overflow-hidden bg-game-night-surface">
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

            {/* Top center sprite (appears over the background while a question is active) */}
            {currentId && topSpriteVisible && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div
                  className={`relative w-36 h-36 transition-transform duration-300 ease-out transition-opacity ${
                    pulseActive ? 'scale-110' : 'scale-100'
                  } ${topSpriteVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {isItemGame ? (
                    <div className="w-32 h-32 relative">
                      <ItemSprite
                        itemId={currentId as string}
                        alt={name}
                        width={128}
                        height={128}
                      />
                    </div>
                  ) : (
                    pokemon && (
                      <Image
                        src={getPokemonImageUrl(pokemon.id.toString(), 'home')}
                        alt={name}
                        fill
                        className="object-contain"
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Answer Area (Bottom 70%) */}
          <div className="game-paper-background h-[70%] items-center overflow-y-auto border-t border-game-border bg-game-surface px-4 py-5 text-game-ink">
            <div className="mx-auto flex h-full max-w-md flex-col lg:max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                {name && (
                  <div className="text-center flex-1">
                    <p className="mb-1 text-xs font-medium text-game-muted">
                      Find the
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-game-ink">
                      {name}
                    </h3>
                    <hr className="mt-4"></hr>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="grid w-full grid-cols-2 place-items-center gap-3">
                  {options.map((optionId) => {
                    if (isItemGame) {
                      const item = items.find((i) => i.id === optionId)
                      const itemName =
                        item?.name || formatItemName(optionId as string)

                      return (
                        <Button
                          key={optionId}
                          type="button"
                          variant="outline"
                          className="aspect-square h-auto w-full p-3"
                          onClick={() => makeChoice(optionId as string)}
                          disabled={isProcessing}
                          aria-busy={isProcessing}
                        >
                          <div className="w-24 h-24 relative flex items-center justify-center">
                            <ItemSprite
                              itemId={optionId as string}
                              alt={itemName}
                              width={64}
                              height={64}
                            />
                          </div>
                        </Button>
                      )
                    } else {
                      const optionSpecies = pokemonData.find(
                        (p) => p.id === optionId,
                      )
                      const optionName =
                        optionSpecies?.forms.find((f) => f.form === 'base')
                          ?.name ||
                        optionSpecies?.forms[0]?.name ||
                        '???'
                      return (
                        <Button
                          key={optionId}
                          type="button"
                          variant="outline"
                          className="aspect-square h-auto w-full p-3"
                          onClick={() => makeChoice(optionId as number)}
                          disabled={isProcessing}
                          aria-busy={isProcessing}
                        >
                          <div className="w-24 h-24 relative">
                            <Image
                              src={getPokemonImageUrl(
                                optionId.toString(),
                                'sprite',
                              )}
                              alt={optionName}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </Button>
                      )
                    }
                  })}
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
