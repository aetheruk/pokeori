'use client'

import { ArrowRight, ArrowUp, Coins, DoorOpen, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import { toast } from 'sonner'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { getCurrency } from '@/data/currencies'
import type {
  UfoCatcherGameConfig,
  UfoCatcherPlacedPrize,
  UfoCatcherPublicAttempt,
} from '@/data/games/ufo-catcher'
import type { TaskIcon } from '@/data/tasks/types'
import { useGameMusic } from '@/hooks/useGameMusic'
import { cn } from '@/lib/utils'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  exitUfoCatcher,
  settleUfoCatcherAttempt,
  startUfoCatcherAttempt,
  type UfoCatcherAttemptResult,
} from '../games/ufo-catcher'

interface UfoCatcherGameProps {
  encounter: UfoCatcherGameConfig
  initialState?: any
  state?: any
}

type ControlPhase = 'idle' | 'x' | 'y' | 'resolving'
type Axis = 'x' | 'y'
type MotionPhase =
  | 'positioning'
  | 'descending'
  | 'gripping'
  | 'lifting'
  | 'returning'
  | 'delivering'
  | 'slipping'

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function PrizeSprite({
  icon,
  label,
  className,
}: {
  icon: TaskIcon
  label: string
  className?: string
}) {
  if (icon.type !== 'pokemon') {
    return <TaskIconDisplay icon={icon} className={className} />
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={getPokemonImageUrl(icon.id, 'sprite')}
        alt={label}
        fill
        sizes="120px"
        className="object-contain drop-shadow-[0_4px_3px_rgba(7,15,20,0.48)]"
      />
    </div>
  )
}

function MachineScrew({ className }: { className: string }) {
  return (
    <span
      className={cn(
        'absolute z-40 size-2 rounded-full border border-[#6f3d34] bg-[#d39a78] shadow-inner',
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 h-px w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#6f3d34]" />
    </span>
  )
}

export function UfoCatcherGame({ encounter }: UfoCatcherGameProps) {
  useGameMusic(encounter)
  const router = useRouter()
  const { user, refreshUser } = useUser()
  const { playSfx } = useAudio()
  const settings = encounter.settings
  const cost = settings.cost
  const currency = getCurrency(cost.currencyType)

  const [phase, setPhase] = useState<ControlPhase>('idle')
  const [motion, setMotion] = useState<MotionPhase>('positioning')
  const [attempt, setAttempt] = useState<UfoCatcherPublicAttempt | null>(null)
  const [shutterOpen, setShutterOpen] = useState(false)
  const [xProgress, setXProgress] = useState(0)
  const [yProgress, setYProgress] = useState(0)
  const [resolution, setResolution] = useState<UfoCatcherAttemptResult | null>(
    null,
  )
  const [displayBalance, setDisplayBalance] = useState<number | null>(null)
  const [exitPromptOpen, setExitPromptOpen] = useState(false)
  const [exitResult, setExitResult] = useState<any>(null)
  const [isExiting, setIsExiting] = useState(false)

  const holdRef = useRef<{
    axis: Axis
    startedAt: number
    frame: number
    pointerId?: number
  } | null>(null)
  const xHoldMsRef = useRef(0)
  const yHoldMsRef = useRef(0)

  const userBalance = Number((user?.currency as any)?.[cost.currencyType] || 0)
  const balance = displayBalance ?? userBalance
  const canAfford = balance >= cost.amount

  const clawCoordinates = useMemo(() => {
    const { clawBounds } = settings.board
    return {
      x: clawBounds.minX + xProgress * (clawBounds.maxX - clawBounds.minX),
      y: clawBounds.maxY - yProgress * (clawBounds.maxY - clawBounds.minY),
    }
  }, [settings.board, xProgress, yProgress])

  const chuteCoordinates = {
    x: settings.board.width * 0.88,
    y: settings.board.clawBounds.maxY,
  }
  const visualClawCoordinates =
    motion === 'returning' || motion === 'delivering'
      ? chuteCoordinates
      : clawCoordinates

  const toStageCoordinates = (x: number, y: number) => ({
    left: (x / settings.board.width) * 100,
    top: 27 + (y / settings.board.depth) * 49,
  })
  const toStagePosition = (x: number, y: number) => {
    const position = toStageCoordinates(x, y)
    return {
      left: `${position.left}%`,
      top: `${position.top}%`,
    }
  }

  useEffect(() => {
    return () => {
      if (holdRef.current) cancelAnimationFrame(holdRef.current.frame)
    }
  }, [])

  const finishAxis = (axis: Axis, forcedDuration?: number) => {
    const hold = holdRef.current
    if (!hold || hold.axis !== axis) return

    cancelAnimationFrame(hold.frame)
    const travelMs = axis === 'x' ? settings.xTravelMs : settings.yTravelMs
    const duration = Math.min(
      travelMs,
      Math.max(0, forcedDuration ?? performance.now() - hold.startedAt),
    )
    holdRef.current = null

    if (axis === 'x') {
      xHoldMsRef.current = Math.round(duration)
      setXProgress(duration / settings.xTravelMs)
      setPhase('y')
      return
    }

    yHoldMsRef.current = Math.round(duration)
    setYProgress(duration / settings.yTravelMs)
    setPhase('resolving')
    setMotion('descending')
    if (attempt) {
      void resolveAttempt(attempt, {
        xHoldMs: xHoldMsRef.current,
        yHoldMs: yHoldMsRef.current,
      })
    }
  }

  const beginAxis = (axis: Axis, pointerId?: number) => {
    if ((axis === 'x' && phase !== 'x') || (axis === 'y' && phase !== 'y')) {
      return
    }
    if (holdRef.current) return

    const travelMs = axis === 'x' ? settings.xTravelMs : settings.yTravelMs
    const startedAt = performance.now()
    const tick = () => {
      const elapsed = performance.now() - startedAt
      const progress = Math.min(1, elapsed / travelMs)
      if (axis === 'x') setXProgress(progress)
      else setYProgress(progress)

      if (progress >= 1) {
        finishAxis(axis, travelMs)
        return
      }
      if (holdRef.current) {
        holdRef.current.frame = requestAnimationFrame(tick)
      }
    }

    holdRef.current = {
      axis,
      startedAt,
      frame: requestAnimationFrame(tick),
      pointerId,
    }
  }

  const finishActiveHold = () => {
    const axis = holdRef.current?.axis
    if (axis) finishAxis(axis)
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!event.isPrimary || event.button !== 0) return

    const axis = phase === 'x' ? 'x' : phase === 'y' ? 'y' : null
    if (!axis) return
    event.currentTarget.setPointerCapture(event.pointerId)
    beginAxis(axis, event.pointerId)
  }

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (holdRef.current?.pointerId !== event.pointerId) return
    event.preventDefault()
    finishActiveHold()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key !== ' ' && event.key !== 'Enter') || event.repeat) return
    const axis = phase === 'x' ? 'x' : phase === 'y' ? 'y' : null
    if (!axis) return
    event.preventDefault()
    beginAxis(axis)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      finishActiveHold()
    }
  }

  const startAttempt = async () => {
    if (phase !== 'idle' || !canAfford) return
    setResolution(null)
    setMotion('positioning')
    setPhase('resolving')

    const result = await startUfoCatcherAttempt(encounter.id)
    if (!result.success || !result.attempt) {
      toast.error(result.error || 'Unable to start the claw')
      setPhase('idle')
      return
    }

    setAttempt(result.attempt)
    setDisplayBalance(result.balance ?? null)
    setXProgress(0)
    setYProgress(0)
    xHoldMsRef.current = 0
    yHoldMsRef.current = 0
    setShutterOpen(true)
    await sleep(720)
    setPhase('x')
    await refreshUser(false)
  }

  const resolveAttempt = async (
    activeAttempt: UfoCatcherPublicAttempt,
    input: { xHoldMs: number; yHoldMs: number },
  ) => {
    const requestStarted = performance.now()
    const result = await settleUfoCatcherAttempt({
      encounterId: encounter.id,
      attemptId: activeAttempt.attemptId,
      input,
    })
    const remainingDescent = 700 - (performance.now() - requestStarted)
    if (remainingDescent > 0) await sleep(remainingDescent)

    if (!result.success || !result.outcome) {
      toast.error(result.error || 'The claw failed to resolve')
      setMotion('positioning')
      setPhase('idle')
      return
    }

    setResolution(result)
    setMotion('gripping')
    await sleep(420)

    if (result.outcome === 'caught') {
      setMotion('lifting')
      await sleep(540)
      setMotion('returning')
      await sleep(720)
      setMotion('delivering')
      await sleep(520)
      playSfx('good')
      toast.success('Prize caught!', {
        description: result.prize?.label,
      })
      await sleep(500)
    } else if (result.outcome === 'slip') {
      setMotion('lifting')
      await sleep(540)
      setMotion('slipping')
      await sleep(560)
      playSfx('bad')
      toast.info('So close!', { description: 'The prize slipped free.' })
      await sleep(350)
    } else {
      setMotion('lifting')
      await sleep(540)
      playSfx('bad')
      toast.info('Miss', { description: 'No prize was inside the claw.' })
      await sleep(350)
    }

    setDisplayBalance(result.balance ?? null)
    setShutterOpen(false)
    await sleep(720)
    setAttempt(null)
    setMotion('positioning')
    setPhase('idle')
    await refreshUser(false)
  }

  const performExit = async () => {
    if (isExiting || phase === 'resolving') return
    setIsExiting(true)
    const result = await exitUfoCatcher(encounter.id)
    setIsExiting(false)
    if (!result.success) {
      toast.error(result.error || 'Unable to leave the UFO Catcher')
      return
    }
    setExitResult({
      success: true,
      message: 'Session ended',
      rewards: result.summary,
    })
    await refreshUser(false)
  }

  const handleExitRequest = () => {
    if (attempt) setExitPromptOpen(true)
    else void performExit()
  }

  const activePrizeId = resolution?.prize?.instanceId
  const heldPrize =
    resolution?.outcome !== 'miss' &&
    ['gripping', 'lifting', 'returning', 'delivering', 'slipping'].includes(
      motion,
    )
      ? resolution?.prize
      : undefined
  const armsClosed = [
    'gripping',
    'lifting',
    'returning',
    'delivering',
    'slipping',
  ].includes(motion)
  const showGuides = Boolean(attempt) && phase !== 'resolving'
  const stagePoint = toStagePosition(clawCoordinates.x, clawCoordinates.y)
  const visualClawPoint = toStageCoordinates(
    visualClawCoordinates.x,
    visualClawCoordinates.y,
  )
  const clawHeadTop =
    motion === 'descending' || motion === 'gripping'
      ? visualClawPoint.top
      : motion === 'delivering'
        ? visualClawPoint.top + 2
        : visualClawPoint.top - 12
  const cableTop = 10
  const cableHeight = Math.max(4, clawHeadTop - cableTop)
  const craneTravelClass =
    motion === 'returning'
      ? 'duration-700 ease-in-out'
      : motion === 'descending' ||
          motion === 'lifting' ||
          motion === 'delivering'
        ? 'duration-500 ease-in-out'
        : 'duration-75 ease-linear'
  const mainControlLabel =
    phase === 'x'
      ? 'Hold to move right'
      : phase === 'y'
        ? 'Hold to move toward the back'
        : phase === 'resolving'
          ? motion === 'descending'
            ? 'Lowering claw'
            : motion === 'gripping'
              ? 'Closing claw'
              : motion === 'lifting'
                ? 'Lifting claw'
                : motion === 'returning'
                  ? 'Returning with prize'
                  : motion === 'delivering'
                    ? 'Delivering prize'
                    : motion === 'slipping'
                      ? 'Prize slipped'
                      : 'Claw in motion'
          : canAfford
            ? `Play for ${cost.amount} ${currency?.name || 'tokens'}`
            : 'Not enough Fun Tokens'

  return (
    <div className="game-activity-chrome relative grid min-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-game-canvas text-game-ink">
      <div className="absolute inset-0">
        <Image
          src={settings.background || encounter.background || ''}
          alt=""
          fill
          priority
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-game-canvas/70" />
      </div>

      <header className="relative z-30 flex items-center justify-end gap-2 px-3 pb-1 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5">
        <div className="flex items-center gap-2">
          <div className="flex min-h-10 items-center gap-2 rounded-full border border-game-border bg-game-surface-raised/95 px-3 font-mono text-xs font-bold text-game-ink shadow-sm backdrop-blur-sm">
            {currency ? (
              <CurrencySprite
                currencyId={currency.id}
                alt={currency.name}
                width={18}
                height={18}
                className="size-[18px] object-contain pixelated"
              />
            ) : (
              <Coins className="size-4" />
            )}
            {balance.toLocaleString()}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleExitRequest}
            disabled={phase === 'resolving' || isExiting || Boolean(exitResult)}
            className="rounded-full border-game-border bg-game-surface-raised/95 text-game-ink shadow-sm hover:border-game-clay hover:text-game-clay"
            aria-label="Leave UFO Catcher"
          >
            {isExiting ? (
              <Loader2 className="animate-spin motion-reduce:animate-none" />
            ) : (
              <DoorOpen />
            )}
          </Button>
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 items-center justify-center px-2">
        <section
          aria-label="UFO Catcher cabinet"
          className="relative"
          style={{
            width: 'min(96vw, 620px, calc((100dvh - 135px) * 1.3333333333))',
            aspectRatio: '4 / 3',
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-xl border-[5px] border-[#8a4739] bg-game-clay shadow-[0_18px_44px_rgba(90,48,39,0.34)]">
            <MachineScrew className="left-1.5 top-1.5" />
            <MachineScrew className="right-1.5 top-1.5" />
            <MachineScrew className="bottom-1.5 left-1.5" />
            <MachineScrew className="bottom-1.5 right-1.5" />

            <div className="absolute inset-x-2 top-2 flex h-[13%] items-center justify-center rounded-t-md border border-[#d19a7b] bg-[#8a4739] shadow-inner">
              <div className="relative aspect-square h-[90%]">
                <Image
                  src={getPokemonImageUrl('479', 'sprite')}
                  alt="Rotom"
                  fill
                  sizes="72px"
                  className="object-contain drop-shadow-[0_3px_2px_rgba(62,28,24,0.45)] [image-rendering:pixelated]"
                />
              </div>
            </div>

            <div className="absolute inset-x-2 bottom-[9%] top-[16%] overflow-hidden rounded-sm border border-[#c98267] bg-[#eadfc9] shadow-inner">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,248,232,0.58),transparent_30%,transparent_72%,rgba(184,97,72,0.08))]" />
              <div className="absolute inset-x-[4%] bottom-[4%] top-[8%] [clip-path:polygon(11%_0,89%_0,100%_100%,0_100%)] border border-[#b98567] bg-[#d3b995]" />
              <div className="absolute inset-x-[13%] top-[16%] h-px bg-[#b98567]" />
              <div className="absolute inset-x-[5%] bottom-[13%] h-px bg-[#c99f78]" />

              <div className="absolute left-[6%] right-[6%] top-[7%] z-30 h-2 rounded-sm border border-[#7d4438] bg-[#b86148] shadow-md">
                <div
                  className="h-full rounded-sm bg-game-ochre transition-[width] duration-75 ease-linear motion-reduce:duration-0"
                  style={{ width: `${xProgress * 100}%` }}
                />
              </div>

              {showGuides && (
                <>
                  <div
                    className="absolute top-[9%] z-20 w-px border-l border-dashed border-game-ochre/60"
                    style={{
                      left: stagePoint.left,
                      height: `calc(${stagePoint.top} - 9%)`,
                    }}
                  />
                  <div
                    className="absolute left-[5%] z-20 h-px border-t border-dashed border-game-ochre/45"
                    style={{
                      top: stagePoint.top,
                      width: `calc(${stagePoint.left} - 5%)`,
                    }}
                  />
                  <div
                    className="absolute z-20 size-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-game-ochre shadow-[0_0_0_3px_rgba(181,138,67,0.18)]"
                    style={stagePoint}
                    aria-hidden="true"
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 bg-game-ochre/80" />
                    <span className="absolute left-1/2 top-1/2 h-[140%] w-px -translate-x-1/2 -translate-y-1/2 bg-game-ochre/80" />
                  </div>
                </>
              )}

              <div
                className="absolute bottom-[2.5%] right-[2%] z-[360] h-[22%] w-[20%]"
                role="img"
                aria-label="Prize collection chute"
              >
                <div className="absolute inset-x-[13%] bottom-[38%] top-[3%] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)] border-x-2 border-t-2 border-[#d19a7b] bg-[#9a503f] shadow-inner" />

                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-[48%] overflow-hidden rounded-[4px_4px_8px_8px] border-[3px] border-[#d19a7b] bg-[#4f2f29] shadow-[inset_0_5px_10px_rgba(69,34,28,0.65),0_3px_0_#7d4438] transition-colors duration-300',
                    motion === 'delivering' && 'border-game-ochre',
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-x-[8%] top-[10%] h-[38%] origin-top rounded-b-sm border-b border-[#d19a7b] bg-game-clay transition-transform duration-300 motion-reduce:duration-0',
                      motion === 'delivering' ? 'scale-y-50' : 'scale-y-100',
                    )}
                  />
                  <div className="absolute inset-x-[9%] bottom-[14%] h-[8%] rounded-full bg-[#7d4438] shadow-inner" />
                </div>

                <span className="absolute bottom-[-3%] left-1/2 h-[7%] w-[112%] -translate-x-1/2 rounded-full bg-[#6f3d34]/40 blur-[2px]" />
              </div>

              {attempt?.prizes.map((prize) => {
                const position = toStagePosition(prize.x, prize.y)
                const depthScale =
                  0.72 + (prize.y / settings.board.depth) * 0.34
                const isActive = activePrizeId === prize.instanceId
                const isHeld = isActive && Boolean(heldPrize)
                return (
                  <div
                    key={prize.instanceId}
                    className={cn(
                      'absolute z-10 size-[17%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 motion-reduce:transition-none',
                      isHeld && 'opacity-0',
                    )}
                    style={{
                      ...position,
                      scale: String(depthScale),
                      zIndex: 10 + Math.round(prize.y),
                    }}
                  >
                    <span className="absolute bottom-[4%] left-[18%] right-[18%] h-[13%] rounded-full bg-game-ink/25 blur-[2px]" />
                    <PrizeSprite
                      icon={prize.icon}
                      label={prize.label}
                      className="absolute inset-0"
                    />
                  </div>
                )
              })}

              {attempt && (
                <div
                  className={cn(
                    'absolute inset-y-0 z-[500] w-[12%] -translate-x-1/2 transition-[left] motion-reduce:duration-0',
                    craneTravelClass,
                  )}
                  style={{ left: `${visualClawPoint.left}%` }}
                  aria-hidden="true"
                >
                  <div className="absolute left-1/2 top-[5.8%] h-[5.5%] w-[130%] -translate-x-1/2 rounded-[3px] border-2 border-[#6f3d34] bg-[#9a503f] shadow-md">
                    <span className="absolute left-[13%] top-1/2 size-[16%] -translate-y-1/2 rounded-full border border-[#6f3d34] bg-[#d39a78]" />
                    <span className="absolute right-[13%] top-1/2 size-[16%] -translate-y-1/2 rounded-full border border-[#6f3d34] bg-[#d39a78]" />
                  </div>

                  <div
                    className={cn(
                      'absolute left-1/2 top-[10%] w-1 -translate-x-1/2 origin-top bg-[#7d4438] shadow-[1px_0_0_rgba(255,248,232,0.25)] transition-[height] motion-reduce:duration-0',
                      craneTravelClass,
                    )}
                    style={{ height: `${cableHeight}%` }}
                  />

                  <div
                    className={cn(
                      'absolute inset-x-0 aspect-square -translate-y-1/2 transition-[top] motion-reduce:duration-0',
                      craneTravelClass,
                    )}
                    style={{ top: `${clawHeadTop}%` }}
                  >
                    <div className="absolute inset-x-[11%] top-0 z-30 h-[34%] rounded-[4px] border-2 border-[#6f3d34] bg-game-ochre shadow-md">
                      <span className="absolute inset-x-[20%] top-[28%] h-[18%] rounded-full bg-game-cream/50" />
                    </div>
                    <div
                      className="absolute left-[12%] top-[29%] z-20 h-[64%] w-[5px] origin-top rounded-full bg-[#8a4739] transition-transform duration-300 ease-out motion-reduce:duration-0"
                      style={{
                        transform: `rotate(${armsClosed ? 13 : 34}deg)`,
                      }}
                    />
                    <div
                      className="absolute right-[12%] top-[29%] z-20 h-[64%] w-[5px] origin-top rounded-full bg-[#8a4739] transition-transform duration-300 ease-out motion-reduce:duration-0"
                      style={{
                        transform: `rotate(${armsClosed ? -13 : -34}deg)`,
                      }}
                    />
                    <span
                      className={cn(
                        'absolute left-[5%] top-[79%] z-20 h-[9%] w-[24%] rounded-full bg-[#c98267] transition-transform duration-300 ease-out',
                        armsClosed ? 'rotate-[34deg]' : 'rotate-[58deg]',
                      )}
                    />
                    <span
                      className={cn(
                        'absolute right-[5%] top-[79%] z-20 h-[9%] w-[24%] rounded-full bg-[#c98267] transition-transform duration-300 ease-out',
                        armsClosed ? '-rotate-[34deg]' : '-rotate-[58deg]',
                      )}
                    />
                    {heldPrize && (
                      <div
                        className={cn(
                          'absolute left-1/2 top-1/2 z-10 size-[120%] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-500 motion-reduce:duration-0',
                          motion === 'gripping' && 'scale-95',
                          motion === 'slipping' &&
                            'translate-y-[110%] rotate-6 opacity-0',
                          motion === 'delivering' &&
                            'translate-y-[80%] scale-75 opacity-0',
                        )}
                      >
                        <PrizeSprite
                          icon={heldPrize.icon}
                          label={heldPrize.label}
                          className="size-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div
                className={cn(
                  'pointer-events-none absolute inset-0 z-[600] overflow-hidden border-b-4 border-[#7d4438] bg-game-clay shadow-[0_8px_14px_rgba(90,48,39,0.28)] transition-transform duration-700 ease-in-out motion-reduce:duration-0',
                  shutterOpen ? '-translate-y-[105%]' : 'translate-y-0',
                )}
                aria-hidden="true"
              >
                {[16, 32, 48, 64, 80].map((top) => (
                  <span
                    key={top}
                    className="absolute inset-x-0 h-px bg-[#d39173]/70 shadow-[0_1px_0_rgba(125,68,56,0.45)]"
                    style={{ top: `${top}%` }}
                  />
                ))}
                <span className="absolute inset-x-[38%] bottom-[5%] h-1.5 rounded-sm border border-[#6f3d34] bg-[#9a503f] shadow-inner" />
              </div>
            </div>

            <div className="absolute inset-x-2 bottom-2 flex h-[6%] items-center justify-center rounded-b-md border border-[#7d4438] bg-[#9a503f]">
              <div className="h-1 w-[36%] rounded-full bg-[#6f3d34] shadow-inner" />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-30 mx-auto w-full max-w-[620px] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        <Button
          type="button"
          size="lg"
          disabled={
            phase === 'resolving' ||
            (phase === 'idle' && (!canAfford || Boolean(exitResult)))
          }
          onClick={
            phase === 'idle' ? startAttempt : (event) => event.preventDefault()
          }
          onPointerDown={
            phase === 'x' || phase === 'y' ? handlePointerDown : undefined
          }
          onPointerUp={
            phase === 'x' || phase === 'y' ? handlePointerEnd : undefined
          }
          onPointerCancel={
            phase === 'x' || phase === 'y' ? handlePointerEnd : undefined
          }
          onContextMenu={(event) => event.preventDefault()}
          onKeyDown={phase === 'x' || phase === 'y' ? handleKeyDown : undefined}
          onKeyUp={phase === 'x' || phase === 'y' ? handleKeyUp : undefined}
          className="min-h-14 w-full touch-none select-none text-base [-webkit-touch-callout:none]"
          aria-label={mainControlLabel}
        >
          {phase === 'resolving' ? (
            <Loader2 className="animate-spin motion-reduce:animate-none" />
          ) : phase === 'x' ? (
            <ArrowRight />
          ) : phase === 'y' ? (
            <ArrowUp />
          ) : null}
          {mainControlLabel}
        </Button>
      </footer>

      <AlertDialog open={exitPromptOpen} onOpenChange={setExitPromptOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Forfeit this paid attempt?</AlertDialogTitle>
            <AlertDialogDescription>
              Leaving now records a miss and does not refund the {cost.amount}
              -token stake. You can stay and finish the drop instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep playing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void performExit()}
              className="bg-game-danger hover:bg-game-danger"
            >
              Forfeit and leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {exitResult && (
        <RewardResultOverlay
          result={exitResult}
          onClose={() => router.push('/game/explore')}
          icon={encounter.icon}
          iconAlt={encounter.name}
          title="UFO Catcher"
          message="The cabinet closes with your session prizes safely claimed."
        />
      )}
    </div>
  )
}
