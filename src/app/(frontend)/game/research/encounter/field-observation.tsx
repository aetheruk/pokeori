'use client'

import {
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileQuestion,
  Minus,
  RotateCcw,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { GameTimer } from '@/components/game/shared/game-timer'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { useAudio } from '@/context/AudioContext'
import { cn } from '@/lib/utils'
import { useUser } from '@/context/UserContext'
import type { ResearchConfig } from '@/data/games'
import { useGameMusic } from '@/hooks/useGameMusic'
import { getFieldObservationPokemonSpriteSources } from '@/utilities/pokemon/local-sprites'
import type {
  FieldObservationAvailablePokemon,
  FieldObservationPublicCollectibleDrop,
  FieldObservationPublicRoundData,
  FieldObservationSpawn,
  FieldObservationSurveyFocus,
} from '@/utilities/research/field-observation'
import {
  collectFieldObservationDrop,
  completeResearchEncounter,
  startResearchEncounter,
  submitResearchAnswer,
} from '../actions'

const PROFESSOR_OAK_SPRITE = '/sprites/trainers/special/oak.avif'

interface FieldObservationGameProps {
  encounter: ResearchConfig
  initialState?: any
}

export function FieldObservationGame({
  encounter,
  initialState,
}: FieldObservationGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const roundData = initialState?.roundData as
    | FieldObservationPublicRoundData
    | undefined
  const startTime = initialState?.startTime || Date.now()
  const [now, setNow] = useState(Date.now())
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [countReport, setCountReport] = useState<Record<string, number>>({})
  const [collectedDropIds, setCollectedDropIds] = useState<Set<string>>(
    () => new Set(roundData?.collectedDropIds || []),
  )

  const isCountSurvey = roundData?.surveyFocus === 'count-survey'
  const observationEnd = startTime + (roundData?.observationDurationMs || 0)
  const sessionEnd = observationEnd + (roundData?.answerDurationMs || 0)
  const phase = now < observationEnd ? 'observing' : 'answering'
  const timeLeft = Math.max(
    0,
    Math.ceil(
      ((phase === 'observing' ? observationEnd : sessionEnd) - now) / 1000,
    ),
  )
  const totalTime = Math.max(
    1,
    Math.ceil(
      ((phase === 'observing'
        ? roundData?.observationDurationMs
        : roundData?.answerDurationMs) || 1000) / 1000,
    ),
  )

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 100)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    setCountReport({})
  }, [startTime])

  const finishGame = useCallback(
    async (didWin: boolean, message: string) => {
      if (result) return
      playSfx(didWin ? 'good' : 'bad')
      const completeResult = await completeResearchEncounter(
        encounter.id,
        didWin,
      )
      const accepted = didWin && completeResult.success
      setResult({
        success: accepted,
        rewards: completeResult.summary,
        expeditionProgress: completeResult.expeditionProgress,
        message: accepted
          ? message
          : completeResult.message ||
            completeResult.error ||
            (didWin ? 'Field report could not be accepted.' : message),
      })
    },
    [encounter.id, playSfx, result],
  )

  useEffect(() => {
    if (!roundData || result || isSubmitting) return
    if (now > sessionEnd) {
      finishGame(false, 'The survey notes timed out.')
    }
  }, [finishGame, isSubmitting, now, result, roundData, sessionEnd])

  const activeSpawns = useMemo(() => {
    if (!roundData) return []
    const elapsed = now - startTime
    return roundData.spawns.filter(
      (spawn) =>
        elapsed >= spawn.startMs && elapsed <= spawn.startMs + spawn.durationMs,
    )
  }, [now, roundData, startTime])

  const activeDrops = useMemo(() => {
    if (!roundData || phase !== 'observing') return []
    const elapsed = now - startTime
    return (roundData.collectibleDrops || []).filter(
      (drop) =>
        !collectedDropIds.has(drop.id) &&
        elapsed >= drop.startMs &&
        elapsed <= drop.startMs + drop.durationMs,
    )
  }, [collectedDropIds, now, phase, roundData, startTime])

  const handleCollectDrop = async (
    drop: FieldObservationPublicCollectibleDrop,
  ) => {
    if (collectedDropIds.has(drop.id) || phase !== 'observing') return
    playSfx('good')
    setCollectedDropIds((previous) => new Set(previous).add(drop.id))
    const result = await collectFieldObservationDrop(drop.id)
    if (!result.success) {
      const elapsed = Date.now() - startTime
      if (
        elapsed >= drop.startMs &&
        elapsed <= drop.startMs + drop.durationMs
      ) {
        setCollectedDropIds((previous) => {
          const next = new Set(previous)
          next.delete(drop.id)
          return next
        })
      }
    }
  }

  const handleAnswer = async (optionId: string) => {
    if (isSubmitting || result) return
    setSelectedOption(optionId)
    setIsSubmitting(true)

    const submitResult = await submitResearchAnswer(optionId)
    if (!submitResult.success && submitResult.error) {
      setIsSubmitting(false)
      return
    }

    const correct = !!submitResult.correct
    await finishGame(
      correct,
      correct ? 'Field report accepted.' : 'Field report rejected.',
    )
    setIsSubmitting(false)
  }

  const handleCountSubmit = async () => {
    if (isSubmitting || result) return
    setSelectedOption('count-survey')
    setIsSubmitting(true)

    const submitResult = await submitResearchAnswer({
      type: 'count-survey',
      counts: countReport,
    })
    if (!submitResult.success && submitResult.error) {
      setIsSubmitting(false)
      return
    }

    const correct = !!submitResult.correct
    await finishGame(
      correct,
      correct ? 'Field count accepted.' : 'Field count rejected.',
    )
    setIsSubmitting(false)
  }

  const updateCountReport = (key: string, delta: number) => {
    setCountReport((previous) => {
      const nextValue = Math.max(0, (previous[key] || 0) + delta)
      return {
        ...previous,
        [key]: nextValue,
      }
    })
  }

  if (!roundData) {
    return (
      <div className="min-h-dvh game-night bg-game-night-canvas text-game-night-ink flex items-center justify-center p-6">
        <div className="game-folio-section space-y-4 p-6 text-center">
          <Eye className="mx-auto h-10 w-10 text-game-moss-strong" />
          <p className="text-game-muted">No field survey is active.</p>
          <Button onClick={() => router.push('/game/explore')}>
            Return to Explore
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden game-night bg-game-night-canvas text-game-night-ink">
      <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
          <span className="rounded-full border border-game-night-border/60 bg-game-night-surface/85 px-3 py-1 text-game-cream">
            {getSurveyFocusLabel(roundData.surveyFocus)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-game-ochre/45 bg-game-night-surface/85 px-2.5 py-1 text-game-cream">
            <Image
              src="/sprites/items/materials/material.avif"
              alt=""
              width={18}
              height={18}
              className="object-contain"
            />
            <span>{collectedDropIds.size}</span>
          </span>
        </div>
        <div className="pointer-events-auto">
          <GameTimer timeLeft={timeLeft} totalTime={totalTime} size="md" />
        </div>
      </div>

      <div className="h-full min-h-0 w-full flex flex-col">
        <div className="h-[55dvh] shrink-0 overflow-hidden">
          <div
            className="relative h-full overflow-hidden bg-[#0d1820]"
            style={{
              backgroundImage: encounter.background
                ? `url(${encounter.background})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {phase === 'observing' ? (
              <>
                <div className="absolute inset-0 pointer-events-none">
                  {activeSpawns.map((spawn) => (
                    <ObservedPokemon
                      key={spawn.id}
                      spawn={spawn}
                      elapsedMs={now - startTime}
                    />
                  ))}
                </div>
                <div className="absolute inset-0">
                  {activeDrops.map((drop) => (
                    <FieldDropButton
                      key={drop.id}
                      drop={drop}
                      onCollect={() => handleCollectDrop(drop)}
                    />
                  ))}
                </div>
                {activeSpawns.some((spawn) => spawn.event) && (
                  <div className="pointer-events-none absolute inset-0 animate-pulse bg-game-ochre/10" />
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-4 pt-16 sm:p-6 sm:pt-16">
                <div className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-game-border bg-game-surface text-game-ink shadow-lg">
                  <div className="relative shrink-0 overflow-hidden border-b border-game-border bg-game-surface-raised px-4 py-3">
                    <div className="relative flex min-w-0 items-center gap-3">
                      <Image
                        src={PROFESSOR_OAK_SPRITE}
                        alt="Professor Oak"
                        width={72}
                        height={72}
                        className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
                        draggable={false}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-game-moss-strong">
                          <ClipboardCheck className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">Professor Oak</span>
                        </div>
                        <div className="mt-1 flex min-w-0 items-center gap-2">
                          <FileQuestion className="h-4 w-4 shrink-0 text-game-ochre" />
                          <span className="truncate text-sm font-semibold text-game-ink">
                            {isCountSurvey
                              ? 'Count report'
                              : 'Observation question'}
                          </span>
                        </div>
                      </div>
                      <CheckCircle2 className="hidden h-5 w-5 shrink-0 text-game-moss-strong sm:block" />
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
                    <h2 className="mb-4 text-pretty font-display text-lg font-semibold leading-snug text-game-ink sm:text-xl">
                      {roundData.question.prompt}
                    </h2>
                    {isCountSurvey ? (
                      <Button
                        type="button"
                        disabled={isSubmitting || !!result}
                        aria-busy={isSubmitting}
                        onClick={handleCountSubmit}
                        className="min-h-12 w-full bg-game-clay text-game-cream hover:bg-game-clay-strong"
                      >
                        Submit count
                      </Button>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {roundData.question.options.map(
                          (option, optionIndex) => (
                            <Button
                              key={option.id}
                              type="button"
                              disabled={isSubmitting || !!result}
                              aria-pressed={selectedOption === option.id}
                              aria-busy={selectedOption === option.id && isSubmitting}
                              onClick={() => handleAnswer(option.id)}
                              className={cn(
                                'min-h-12 justify-start gap-3 whitespace-normal border border-game-border bg-game-surface-raised px-3 py-2 text-left text-game-ink shadow-sm hover:border-game-moss/40 hover:bg-game-moss/5 disabled:text-game-muted',
                                selectedOption === option.id &&
                                  'border-game-moss bg-game-moss/10 opacity-100 ring-1 ring-game-moss/35',
                              )}
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-game-moss font-mono text-xs font-bold text-game-cream">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                              <span className="min-w-0 flex-1 leading-snug">
                                {option.label}
                              </span>
                            </Button>
                          ),
                        )}
                      </div>
                    )}
                    {selectedOption && (
                      <p className="mt-3 text-xs font-semibold text-game-moss-strong">
                        Report submitted.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isCountSurvey ? (
          <FieldCountPanel
            availablePokemon={roundData.availablePokemon || []}
            counts={countReport}
            disabled={isSubmitting || !!result}
            onIncrement={(key) => updateCountReport(key, 1)}
            onDecrement={(key) => updateCountReport(key, -1)}
            onReset={() => setCountReport({})}
          />
        ) : (
          <FieldNotesCanvas resetKey={`${encounter.id}:${startTime}`} />
        )}
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
          title={result.success ? 'Survey complete' : 'Survey incomplete'}
          secondaryAction={
            encounter?.isEligibleForReplay ? (
              <Button
                size="lg"
                onClick={async () => {
                  const replay = await startResearchEncounter(
                    encounter.id,
                    true,
                  )
                  if (replay?.success) window.location.reload()
                  else router.push('/game/explore')
                }}
                className="w-full border border-game-border-strong bg-game-surface-raised font-bold text-game-ink hover:bg-game-canvas"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play again
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  )
}

function FieldCountPanel({
  availablePokemon,
  counts,
  disabled,
  onIncrement,
  onDecrement,
  onReset,
}: {
  availablePokemon: FieldObservationAvailablePokemon[]
  counts: Record<string, number>
  disabled: boolean
  onIncrement: (key: string) => void
  onDecrement: (key: string) => void
  onReset: () => void
}) {
  const countPokemon = useMemo(() => {
    const seen = new Set<string>()
    return availablePokemon.filter((pokemon) => {
      const key = getFieldObservationCountKey(pokemon)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [availablePokemon])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-game-surface-raised">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 31px, rgba(103, 88, 62, 0.16) 32px), linear-gradient(to right, rgba(181, 138, 67, 0.14) 1px, transparent 1px)',
          backgroundSize: '100% 32px, 36px 100%',
        }}
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 p-2">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <div className="text-xs font-bold uppercase tracking-wide text-game-muted">
            Count report
          </div>
          <Button
            type="button"
            size="sm"
            disabled={disabled}
            onClick={onReset}
            className="h-8 border border-game-border bg-game-surface px-2 text-game-ink hover:bg-game-canvas"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4 md:grid-cols-6">
          {countPokemon.map((pokemon) => {
            const key = getFieldObservationCountKey(pokemon)
            return (
              <PokemonCountButton
                key={key}
                pokemon={pokemon}
                count={counts[key] || 0}
                disabled={disabled}
                onIncrement={() => onIncrement(key)}
                onDecrement={() => onDecrement(key)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PokemonCountButton({
  pokemon,
  count,
  disabled,
  onIncrement,
  onDecrement,
}: {
  pokemon: FieldObservationAvailablePokemon
  count: number
  disabled: boolean
  onIncrement: () => void
  onDecrement: () => void
}) {
  const spriteSources = useMemo(
    () => getFieldObservationPokemonSpriteSources(pokemon.formId),
    [pokemon.formId],
  )
  const [sourceIndex, setSourceIndex] = useState(0)
  const currentSpriteSource = spriteSources[sourceIndex] ?? spriteSources[0]

  useEffect(() => {
    setSourceIndex(0)
  }, [pokemon.formId])

  return (
    <div className="relative min-h-20 min-w-0 rounded-md border border-game-border bg-game-surface text-game-ink shadow-sm">
      <button
        type="button"
        disabled={disabled}
        aria-label={`${pokemon.name} count ${count}`}
        title={pokemon.name}
        onClick={onIncrement}
        className="game-focus-ring flex h-full min-h-20 w-full items-center justify-center rounded-md transition-colors hover:bg-game-moss/5 disabled:opacity-70"
      >
        <span className="absolute left-1 top-1 z-10 flex h-6 min-w-6 items-center justify-center rounded-full bg-game-moss px-1.5 font-mono text-xs font-bold leading-none text-game-cream">
          {count}
        </span>
        <Image
          src={currentSpriteSource}
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
          draggable={false}
          onError={() => {
            setSourceIndex((previous) => {
              if (previous >= spriteSources.length - 1) return previous
              return previous + 1
            })
          }}
        />
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-label={`Decrease ${pokemon.name} count`}
        onClick={onDecrement}
        className="game-focus-ring absolute bottom-1 right-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-game-border bg-game-surface-raised text-game-muted shadow-sm transition-colors hover:bg-game-canvas hover:text-game-ink disabled:opacity-70"
      >
        <Minus className="h-4 w-4" />
      </button>
    </div>
  )
}

function getFieldObservationCountKey(
  pokemon: FieldObservationAvailablePokemon,
) {
  return `${pokemon.speciesId}:${pokemon.formId}`
}

function FieldNotesCanvas({ resetKey }: { resetKey: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const activeStrokeRef = useRef<NoteStroke | null>(null)
  const lastPointRef = useRef<NotePoint | null>(null)
  const [strokes, setStrokes] = useState<NoteStroke[]>([])
  const [resizeTick, setResizeTick] = useState(0)

  const prepareCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const ratio = window.devicePixelRatio || 1
    const width = Math.max(1, Math.floor(rect.width * ratio))
    const height = Math.max(1, Math.floor(rect.height * ratio))

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    const context = canvas.getContext('2d')
    if (!context) return null
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 3
    context.strokeStyle = '#1f2937'
    return { canvas, context, rect }
  }, [])

  const drawStroke = useCallback(
    (context: CanvasRenderingContext2D, stroke: NoteStroke) => {
      const [firstPoint, ...rest] = stroke.points
      if (!firstPoint) return

      context.beginPath()
      context.moveTo(firstPoint.x, firstPoint.y)
      for (const point of rest) {
        context.lineTo(point.x, point.y)
      }
      context.stroke()

      if (stroke.points.length === 1) {
        context.beginPath()
        context.arc(firstPoint.x, firstPoint.y, 1.5, 0, Math.PI * 2)
        context.fillStyle = '#1f2937'
        context.fill()
      }
    },
    [],
  )

  const redraw = useCallback(() => {
    const prepared = prepareCanvas()
    if (!prepared) return
    const { canvas, context } = prepared
    const ratio = window.devicePixelRatio || 1
    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio)
    for (const stroke of strokes) {
      drawStroke(context, stroke)
    }
    if (activeStrokeRef.current) {
      drawStroke(context, activeStrokeRef.current)
    }
  }, [drawStroke, prepareCanvas, strokes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new ResizeObserver(() => {
      setResizeTick((value) => value + 1)
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    activeStrokeRef.current = null
    lastPointRef.current = null
    setStrokes([])
  }, [resetKey])

  useEffect(() => {
    redraw()
  }, [redraw, resizeTick])

  const getPoint = (event: PointerEvent<HTMLCanvasElement>): NotePoint => {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const drawSegment = (from: NotePoint, to: NotePoint) => {
    const prepared = prepareCanvas()
    if (!prepared) return
    const { context } = prepared
    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
    context.stroke()
  }

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const point = getPoint(event)
    activeStrokeRef.current = { points: [point] }
    lastPointRef.current = point
    const prepared = prepareCanvas()
    if (prepared) drawStroke(prepared.context, activeStrokeRef.current)
  }

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const activeStroke = activeStrokeRef.current
    const lastPoint = lastPointRef.current
    if (!activeStroke || !lastPoint) return

    const point = getPoint(event)
    activeStroke.points.push(point)
    drawSegment(lastPoint, point)
    lastPointRef.current = point
  }

  const finishStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const activeStroke = activeStrokeRef.current
    activeStrokeRef.current = null
    lastPointRef.current = null
    if (!activeStroke) return
    setStrokes((previous) => [...previous, activeStroke])
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-game-surface-raised">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 31px, rgba(103, 88, 62, 0.16) 32px), linear-gradient(to right, rgba(181, 138, 67, 0.14) 1px, transparent 1px)',
          backgroundSize: '100% 32px, 36px 100%',
        }}
      />
      <div className="relative min-h-0 flex-1">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
        />
      </div>
    </div>
  )
}

function FieldDropButton({
  drop,
  onCollect,
}: {
  drop: FieldObservationPublicCollectibleDrop
  onCollect: () => void
}) {
  return (
    <button
      type="button"
      aria-label={`Collect ${drop.label}`}
      title={drop.label}
      onClick={onCollect}
      className="game-focus-ring absolute z-[220] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-game-ochre/70 bg-game-ochre/20 shadow-[0_0_18px_rgba(181,138,67,0.55)] transition-colors hover:bg-game-ochre/30"
      style={{
        left: `${drop.x}%`,
        top: `${drop.y}%`,
      }}
    >
      <span className="absolute inset-1 rounded-full border border-amber-200/35 animate-ping" />
      <ItemSprite
        itemId={drop.itemId}
        alt={drop.label}
        width={40}
        height={40}
        className="relative z-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]"
        priority
      />
    </button>
  )
}

function getSurveyFocusLabel(focus: FieldObservationSurveyFocus | undefined) {
  switch (focus) {
    case 'count-survey':
      return 'Count'
    case 'material-survey':
      return 'Material'
    case 'berry-survey':
      return 'Berry'
    case 'salvage-survey':
      return 'Salvage'
    case 'swarm-survey':
      return 'Swarm'
    case 'rare-trace':
      return 'Rare'
    default:
      return 'Standard'
  }
}

type NotePoint = {
  x: number
  y: number
}

type NoteStroke = {
  points: NotePoint[]
}

function ObservedPokemon({
  spawn,
  elapsedMs,
}: {
  spawn: FieldObservationSpawn
  elapsedMs: number
}) {
  const progress = Math.max(
    0,
    Math.min(1, (elapsedMs - spawn.startMs) / spawn.durationMs),
  )
  const position = getSpawnPosition(spawn, progress)
  const size = Math.round(82 * spawn.scale)
  const spriteSources = useMemo(
    () =>
      getFieldObservationPokemonSpriteSources(
        spawn.formId,
        spawn.shiny,
        spawn.gender === 'female',
      ),
    [spawn.formId, spawn.gender, spawn.shiny],
  )
  const [sourceIndex, setSourceIndex] = useState(0)
  const currentSpriteSource = spriteSources[sourceIndex] ?? spriteSources[0]

  useEffect(() => {
    setSourceIndex(0)
  }, [spawn.formId, spawn.gender, spawn.shiny])

  const handleSpriteError = () => {
    setSourceIndex((prev) => {
      if (prev >= spriteSources.length - 1) return prev
      return prev + 1
    })
  }

  return (
    <div
      className="absolute transition-opacity duration-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: spawn.hidden ? 0.55 : 1,
        filter: spawn.hidden ? 'brightness(0.75) blur(0.5px)' : undefined,
        zIndex: Math.round(spawn.scale * 100),
      }}
    >
      {spawn.event && (
        <div className="absolute -inset-2 animate-ping rounded-full border border-game-ochre/35" />
      )}
      <Image
        src={currentSpriteSource}
        alt={spawn.name}
        width={size}
        height={size}
        className="object-contain"
        onError={handleSpriteError}
        priority
      />
    </div>
  )
}

function getSpawnPosition(spawn: FieldObservationSpawn, progress: number) {
  const travel = 16
  if (spawn.movement === 'left-to-right') {
    return { x: spawn.x - travel / 2 + travel * progress, y: spawn.y }
  }
  if (spawn.movement === 'right-to-left') {
    return { x: spawn.x + travel / 2 - travel * progress, y: spawn.y }
  }
  if (spawn.movement === 'up') {
    return { x: spawn.x, y: spawn.y + travel / 2 - travel * progress }
  }
  if (spawn.movement === 'down') {
    return { x: spawn.x, y: spawn.y - travel / 2 + travel * progress }
  }
  return { x: spawn.x, y: spawn.y }
}
