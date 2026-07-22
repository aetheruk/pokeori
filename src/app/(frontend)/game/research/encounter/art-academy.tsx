'use client'

import { BrushCleaning, Eraser, Eye, EyeOff, Send } from 'lucide-react'
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
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import type { ArtAcademyGameConfig } from '@/data/games/art-academy'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import {
  ART_ACADEMY_SCORE_GRID_SIZE,
  scoreArtAcademyDrawing,
} from '@/utilities/research/art-academy'
import { completeResearchEncounter, startResearchEncounter } from '../actions'

interface ArtAcademyGameProps {
  encounter: ArtAcademyGameConfig & { isEligibleForReplay?: boolean }
  initialState?: any
}

interface ArtAcademyRound {
  spriteUrl: string
  palette: string[]
  scoreGridSize: number
  guideGridSize: number
}

interface Point {
  x: number
  y: number
}

interface Stroke {
  color: string
  brushSize: number
  points: Point[]
}

const brushes = [
  { id: 'small', label: 'Small', size: 0.018 },
  { id: 'medium', label: 'Medium', size: 0.036 },
  { id: 'large', label: 'Large', size: 0.064 },
] as const

function GuideGrid({ count }: { count: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {Array.from({ length: count - 1 }, (_, index) => {
        const position = `${((index + 1) / count) * 100}%`
        return (
          <div key={`vertical-${position}`}>
            <span
              className="absolute inset-y-0 w-px bg-game-ochre/60"
              style={{ left: position }}
            />
            <span
              className="absolute inset-x-0 h-px bg-game-ochre/60"
              style={{ top: position }}
            />
          </div>
        )
      })}
    </div>
  )
}

function nearestPaletteIndex(
  red: number,
  green: number,
  blue: number,
  palette: string[],
) {
  let selected = 0
  let selectedDistance = Number.POSITIVE_INFINITY

  palette.forEach((hex, index) => {
    const value = Number.parseInt(hex.slice(1), 16)
    const paletteRed = (value >> 16) & 255
    const paletteGreen = (value >> 8) & 255
    const paletteBlue = value & 255
    const distance =
      (red - paletteRed) ** 2 +
      (green - paletteGreen) ** 2 +
      (blue - paletteBlue) ** 2
    if (distance < selectedDistance) {
      selected = index
      selectedDistance = distance
    }
  })

  return selected
}

function encodeCells(cells: Uint8Array) {
  let binary = ''
  const chunkSize = 1024
  for (let index = 0; index < cells.length; index += chunkSize) {
    binary += String.fromCharCode(...cells.subarray(index, index + chunkSize))
  }
  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
}

function hexToColor(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

export function ArtAcademyGame({
  encounter,
  initialState,
}: ArtAcademyGameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const activeStrokeRef = useRef<Stroke | null>(null)
  const finishingRef = useRef(false)
  const [round, setRound] = useState<ArtAcademyRound | null>(
    initialState?.roundData?.artAcademy || null,
  )
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [selectedColor, setSelectedColor] = useState<string | null>(
    initialState?.roundData?.artAcademy?.palette?.[0] || null,
  )
  const [selectedBrush, setSelectedBrush] =
    useState<(typeof brushes)[number]['id']>('medium')
  const [expiresAt, setExpiresAt] = useState<number | null>(
    initialState?.expiry || null,
  )
  const [timeLeft, setTimeLeft] = useState(
    initialState?.timeLeft || encounter.settings.timeLimit,
  )
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [showReference, setShowReference] = useState(false)
  const [previewReferenceCells, setPreviewReferenceCells] =
    useState<Uint8Array | null>(null)
  const [resizeTick, setResizeTick] = useState(0)
  const [result, setResult] = useState<any | null>(null)

  const selectedBrushSize =
    brushes.find((brush) => brush.id === selectedBrush)?.size || brushes[1].size

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
    return { canvas, context, rect }
  }, [])

  const drawStroke = useCallback(
    (context: CanvasRenderingContext2D, rect: DOMRect, stroke: Stroke) => {
      const [firstPoint, ...rest] = stroke.points
      if (!firstPoint) return
      const brushWidth = Math.max(2, rect.width * stroke.brushSize)
      context.strokeStyle = stroke.color
      context.fillStyle = stroke.color
      context.lineWidth = brushWidth
      context.beginPath()
      context.moveTo(firstPoint.x * rect.width, firstPoint.y * rect.height)
      rest.forEach((point) =>
        context.lineTo(point.x * rect.width, point.y * rect.height),
      )
      context.stroke()
      if (stroke.points.length === 1) {
        context.beginPath()
        context.arc(
          firstPoint.x * rect.width,
          firstPoint.y * rect.height,
          brushWidth / 2,
          0,
          Math.PI * 2,
        )
        context.fill()
      }
    },
    [],
  )

  const redraw = useCallback(() => {
    const prepared = prepareCanvas()
    if (!prepared) return
    const { canvas, context, rect } = prepared
    const ratio = window.devicePixelRatio || 1
    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio)
    strokes.forEach((stroke) => drawStroke(context, rect, stroke))
    if (activeStrokeRef.current)
      drawStroke(context, rect, activeStrokeRef.current)
  }, [drawStroke, prepareCanvas, strokes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new ResizeObserver(() => setResizeTick((tick) => tick + 1))
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!round) return
    let cancelled = false
    setPreviewReferenceCells(null)

    const image = new window.Image()
    image.onload = () => {
      if (cancelled) return
      const scoreCanvas = document.createElement('canvas')
      scoreCanvas.width = round.scoreGridSize
      scoreCanvas.height = round.scoreGridSize
      const context = scoreCanvas.getContext('2d')
      if (!context) return
      const scale = Math.min(
        round.scoreGridSize / image.naturalWidth,
        round.scoreGridSize / image.naturalHeight,
      )
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      context.drawImage(
        image,
        (round.scoreGridSize - width) / 2,
        (round.scoreGridSize - height) / 2,
        width,
        height,
      )

      const imageData = context.getImageData(
        0,
        0,
        round.scoreGridSize,
        round.scoreGridSize,
      ).data
      const cells = new Uint8Array(round.scoreGridSize ** 2)
      for (let cell = 0; cell < cells.length; cell += 1) {
        const index = cell * 4
        if (imageData[index + 3] < 32) continue
        cells[cell] =
          nearestPaletteIndex(
            imageData[index],
            imageData[index + 1],
            imageData[index + 2],
            round.palette,
          ) + 1
      }
      setPreviewReferenceCells(cells)
    }
    image.src = round.spriteUrl

    return () => {
      cancelled = true
    }
  }, [round])

  useEffect(() => {
    redraw()
  }, [redraw, resizeTick])

  const buildDrawingCells = useCallback(() => {
    if (!round) return null
    const scoreGridSize = round.scoreGridSize || ART_ACADEMY_SCORE_GRID_SIZE
    const scoreCanvas = document.createElement('canvas')
    scoreCanvas.width = scoreGridSize
    scoreCanvas.height = scoreGridSize
    const context = scoreCanvas.getContext('2d')
    if (!context) return null
    context.lineCap = 'round'
    context.lineJoin = 'round'

    strokes.forEach((stroke) => {
      const [firstPoint, ...rest] = stroke.points
      if (!firstPoint) return
      const brushWidth = Math.max(1, scoreGridSize * stroke.brushSize)
      context.strokeStyle = stroke.color
      context.fillStyle = stroke.color
      context.lineWidth = brushWidth
      context.beginPath()
      context.moveTo(firstPoint.x * scoreGridSize, firstPoint.y * scoreGridSize)
      rest.forEach((point) =>
        context.lineTo(point.x * scoreGridSize, point.y * scoreGridSize),
      )
      context.stroke()
      if (stroke.points.length === 1) {
        context.beginPath()
        context.arc(
          firstPoint.x * scoreGridSize,
          firstPoint.y * scoreGridSize,
          brushWidth / 2,
          0,
          Math.PI * 2,
        )
        context.fill()
      }
    })

    const imageData = context.getImageData(
      0,
      0,
      scoreGridSize,
      scoreGridSize,
    ).data
    const cells = new Uint8Array(scoreGridSize ** 2)
    for (let cell = 0; cell < cells.length; cell += 1) {
      const index = cell * 4
      if (imageData[index + 3] < 32) continue
      cells[cell] =
        nearestPaletteIndex(
          imageData[index],
          imageData[index + 1],
          imageData[index + 2],
          round.palette,
        ) + 1
    }
    return cells
  }, [round, strokes])

  const buildDrawingPayload = useCallback(() => {
    const cells = buildDrawingCells()
    return cells ? encodeCells(cells) : null
  }, [buildDrawingCells])

  const liveScore = useMemo(() => {
    if (!round || !previewReferenceCells) return null
    const drawingCells = buildDrawingCells()
    if (!drawingCells || previewReferenceCells.length !== drawingCells.length) {
      return null
    }
    return scoreArtAcademyDrawing(
      previewReferenceCells,
      drawingCells,
      round.palette.map(hexToColor),
    )
  }, [buildDrawingCells, previewReferenceCells, round])

  const finishGame = useCallback(async () => {
    if (finishingRef.current || !round) return
    finishingRef.current = true
    setGameEnded(true)
    const drawing = buildDrawingPayload()
    if (!drawing) {
      setResult({
        success: false,
        message: 'The drawing board could not be read.',
      })
      return
    }

    const completion = await completeResearchEncounter(
      encounter.id,
      false,
      undefined,
      undefined,
      undefined,
      undefined,
      drawing,
    )
    const score = completion.finalScore
    const passed =
      completion.success &&
      typeof score === 'number' &&
      score >= encounter.settings.successThreshold
    setResult({
      success: passed,
      message:
        completion.error ||
        (typeof score === 'number'
          ? `Similarity score: ${score}%`
          : 'Artwork submitted.'),
      rewards: completion.summary,
    })
    playSfx(passed ? 'good' : 'bad')
  }, [
    buildDrawingPayload,
    encounter.id,
    encounter.settings.successThreshold,
    playSfx,
    round,
  ])

  const beginGame = useCallback(async () => {
    const start = await startResearchEncounter(encounter.id)
    if (!start.success) {
      setResult({
        success: false,
        message: start.error || 'Could not prepare the study plate.',
      })
      return
    }
    const nextRound =
      start.roundData?.artAcademy || initialState?.roundData?.artAcademy
    if (!nextRound) {
      setResult({
        success: false,
        message: 'The study plate could not be prepared.',
      })
      return
    }
    setRound(nextRound)
    setSelectedColor((current) => current || nextRound.palette[0] || null)
    setExpiresAt(start.expiry || initialState?.expiry || null)
    setTimeLeft(
      start.expiry
        ? Math.max(0, Math.ceil((start.expiry - Date.now()) / 1000))
        : encounter.settings.timeLimit,
    )
    setGameStarted(true)
  }, [
    encounter.id,
    encounter.settings.timeLimit,
    initialState?.expiry,
    initialState?.roundData?.artAcademy,
  ])

  useEffect(() => {
    if (!gameStarted) void beginGame()
  }, [beginGame, gameStarted])

  useEffect(() => {
    if (!gameStarted || gameEnded || !expiresAt) return
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining === 0) void finishGame()
    }, 250)
    return () => window.clearInterval(timer)
  }, [expiresAt, finishGame, gameEnded, gameStarted])

  const getPoint = (event: PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!selectedColor || gameEnded || showReference) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const point = getPoint(event)
    activeStrokeRef.current = {
      color: selectedColor,
      brushSize: selectedBrushSize,
      points: [point],
    }
    redraw()
  }

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const activeStroke = activeStrokeRef.current
    if (!activeStroke || gameEnded || showReference) return
    const point = getPoint(event)
    activeStroke.points.push(point)
    redraw()
  }

  const finishStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const activeStroke = activeStrokeRef.current
    activeStrokeRef.current = null
    if (!activeStroke) return
    setStrokes((current) => [...current, activeStroke])
  }

  const clearDrawing = () => {
    activeStrokeRef.current = null
    setStrokes([])
  }

  const guideCount = round?.guideGridSize || 3

  return (
    <div className="min-h-dvh bg-game-night-canvas px-3 py-3 text-game-night-ink sm:px-5 lg:px-8">
      <main className="game-desktop-activity-stage mx-auto flex w-full max-w-xl flex-col gap-2">
        <div className="flex items-center justify-end gap-2 px-1">
          <span
            className="rounded-full border border-game-ochre/30 bg-game-ochre/10 px-3 py-1 font-mono text-xs font-semibold text-game-ochre"
            role="status"
            aria-label={
              timeLeft <= 30
                ? 'Current similarity hidden for the final 30 seconds'
                : `Current similarity ${liveScore ?? 0}%`
            }
          >
            {timeLeft <= 30 ? '???' : `${liveScore ?? 0}%`}
          </span>
          <GameTimer
            timeLeft={timeLeft}
            totalTime={encounter.settings.timeLimit}
            size="md"
          />
        </div>

        <div className="flex items-center justify-center gap-3 rounded-xl border border-game-border bg-game-surface-raised p-2 shadow-sm">
          <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-md border border-game-border bg-game-canvas sm:w-28">
            {round && (
              <Image
                src={round.spriteUrl}
                alt="Pokemon reference artwork"
                fill
                unoptimized
                className="object-contain"
              />
            )}
            <GuideGrid count={guideCount} />
          </div>
          <div className="text-sm text-game-muted">
            <p>Copy the sprite using the guide lines.</p>
            <span className="rounded-full bg-game-ochre/15 px-3 py-1 font-mono text-xs font-semibold text-game-ochre">
              {encounter.settings.successThreshold}% to pass
            </span>
          </div>
        </div>

        <section className="rounded-xl border border-game-border bg-game-surface-raised p-3 shadow-sm">
          <div className="mb-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowReference((visible) => !visible)}
              disabled={!round}
              aria-label={
                showReference ? 'Show your drawing' : 'Show reference artwork'
              }
              aria-pressed={showReference}
              title={
                showReference ? 'Show your drawing' : 'Show reference artwork'
              }
            >
              {showReference ? <EyeOff /> : <Eye />}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearDrawing}
              disabled={!gameStarted || gameEnded || strokes.length === 0}
            >
              <Eraser className="mr-1.5 h-4 w-4" /> Clear
            </Button>
          </div>

          <div
            className="mb-2 flex flex-wrap gap-2"
            role="group"
            aria-label="Available artwork colours"
          >
            {round?.palette.map((color, index) => (
              <button
                key={color}
                type="button"
                disabled={!gameStarted || gameEnded}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'game-focus-ring flex h-11 min-w-11 items-center justify-center rounded-lg border-2 bg-game-canvas p-1 transition-colors disabled:opacity-60',
                  selectedColor === color
                    ? 'border-game-moss'
                    : 'border-transparent hover:border-game-border-strong',
                )}
                aria-label={`Use colour ${index + 1}`}
                aria-pressed={selectedColor === color}
              >
                <span
                  className="h-full w-full rounded-md border border-black/10"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>

          <div
            className="mb-2 flex flex-wrap gap-2"
            role="group"
            aria-label="Brush size"
          >
            {brushes.map((brush) => (
              <Button
                key={brush.id}
                type="button"
                variant="outline"
                size="sm"
                disabled={!gameStarted || gameEnded}
                onClick={() => setSelectedBrush(brush.id)}
                className={cn(
                  'h-10 border-game-border text-game-ink hover:bg-game-canvas',
                  selectedBrush === brush.id &&
                    'border-game-moss bg-game-moss text-game-cream hover:bg-game-moss-strong',
                )}
                aria-pressed={selectedBrush === brush.id}
              >
                <BrushCleaning
                  className="mr-1.5"
                  style={{
                    width: Math.max(12, brush.size * 260),
                    height: Math.max(12, brush.size * 260),
                  }}
                />
                {brush.label}
              </Button>
            ))}
          </div>

          <div
            className="relative mx-auto aspect-square max-w-[520px] overflow-hidden rounded-lg border border-game-border bg-game-canvas"
            style={{ width: 'min(100%, calc(100dvh - 27rem))' }}
          >
            <GuideGrid count={guideCount} />
            <canvas
              ref={canvasRef}
              className={cn(
                'absolute inset-0 z-20 h-full w-full touch-none cursor-crosshair',
                showReference && 'pointer-events-none cursor-default',
              )}
              aria-label="Drawing canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishStroke}
              onPointerCancel={finishStroke}
            />
            {showReference && round && (
              <div className="absolute inset-0 z-30 bg-game-canvas">
                <Image
                  src={round.spriteUrl}
                  alt="Pokemon reference artwork"
                  fill
                  unoptimized
                  className="object-contain"
                />
                <GuideGrid count={guideCount} />
              </div>
            )}
          </div>

          <Button
            type="button"
            size="lg"
            className="mt-3 w-full"
            disabled={!gameStarted || gameEnded}
            onClick={() => void finishGame()}
          >
            <Send className="mr-2 h-4 w-4" /> Submit artwork
          </Button>
        </section>
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
          title={result.success ? 'Study passed' : 'Study complete'}
          message={result.message}
          secondaryAction={
            initialState?.encounter?.isEligibleForReplay ||
            encounter.isEligibleForReplay ? (
              <Button
                size="lg"
                className="w-full"
                onClick={async () => {
                  const replay = await startResearchEncounter(
                    encounter.id,
                    true,
                  )
                  if (replay.success) window.location.reload()
                }}
              >
                Try again
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  )
}
