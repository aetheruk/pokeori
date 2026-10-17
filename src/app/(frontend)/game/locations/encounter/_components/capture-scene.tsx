import { motion, useReducedMotion } from 'framer-motion'
import type React from 'react'
import {
  MdChevronLeft as ChevronLeft,
  MdChevronRight as ChevronRight,
  MdKeyboardArrowUp as ChevronUp,
} from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import type { Item } from '@/data/items'
import { cn } from '@/lib/utils'
import type { CaptureThrowPayload } from './draggable-pokeball'
import { DraggablePokeball } from './draggable-pokeball'

interface CaptureSceneProps {
  balls: Item[]
  selectedBallIndex: number
  isCapturing: boolean
  showCaptureAnimation: boolean
  ringScale: number
  aimReady: boolean
  targetRef: React.RefObject<HTMLElement | null>
  inventory: { itemId: string; quantity: number }[]
  handleCapture: (input: CaptureThrowPayload) => void
  nextBall: () => void
  prevBall: () => void
  handleRunAway: () => void
}

export function CaptureScene({
  balls,
  selectedBallIndex,
  isCapturing,
  showCaptureAnimation,
  ringScale,
  aimReady,
  targetRef,
  inventory,
  handleCapture,
  nextBall,
  prevBall,
  handleRunAway,
}: CaptureSceneProps) {
  const prefersReducedMotion = useReducedMotion()

  if (showCaptureAnimation || isCapturing) return null

  return (
    <motion.div
      key="capture-phase"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.28 }}
      className="relative flex h-full w-full flex-col items-center justify-end gap-4 pb-2"
    >
      <h2 className="absolute -right-4 -top-4 z-10 max-w-full rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.12em] text-white xl:-right-5 xl:-top-5">
        Choose a Poké Ball
      </h2>

      {balls.length > 0 ? (
        <div className="relative flex flex-col items-center justify-end gap-6 w-full max-w-sm h-full max-h-[60vh] pb-6">
          <div className="relative flex w-full items-center justify-between px-2 py-5 text-game-ink">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="z-10 h-11 w-11 hover:bg-game-canvas"
              onClick={prevBall}
              disabled={balls.length <= 1}
              aria-label="Previous Poke Ball"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div className="flex flex-col items-center gap-3">
              <div
                aria-hidden="true"
                className="pointer-events-none -mb-3 flex h-8 select-none flex-col items-center justify-center text-game-charcoal-strong"
              >
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: [0.25, 1, 0.25], y: [2, 0, 2] }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 1.2,
                      delay: prefersReducedMotion ? 0 : index * 0.16,
                      repeat: prefersReducedMotion ? 0 : Infinity,
                      ease: 'easeInOut',
                    }}
                    className="-my-2 block h-5"
                  >
                    <ChevronUp className="h-6 w-6" />
                  </motion.span>
                ))}
              </div>
              <div className="relative h-24 w-24">
                <DraggablePokeball
                  onThrow={handleCapture}
                  ringScale={ringScale}
                  targetRef={targetRef}
                  disabled={isCapturing || !aimReady}
                >
                  <div
                    className={cn(
                      'h-full w-full',
                      isCapturing && 'animate-ping opacity-75',
                    )}
                  >
                    <ItemSprite
                      itemId={balls[selectedBallIndex].id}
                      alt={balls[selectedBallIndex].name}
                      width={96}
                      height={96}
                      className="h-full w-full cursor-grab object-contain drop-shadow-xl active:cursor-grabbing"
                    />
                  </div>
                </DraggablePokeball>
              </div>
              <div className="pointer-events-none mt-2 select-none text-center">
                <div className="text-lg font-bold text-game-ink">
                  {balls[selectedBallIndex].name}
                </div>
                <div className="mt-2 inline-flex min-w-[3.25rem] items-center justify-center rounded-full border border-game-charcoal px-3 py-1">
                  <span className="tabular-nums text-xs font-bold uppercase tracking-wider text-[#1d2522]">
                    x
                    {inventory.find(
                      (i) => i.itemId === balls[selectedBallIndex].id,
                    )?.quantity || 0}
                  </span>
                </div>
              </div>

            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="z-10 h-11 w-11 hover:bg-game-canvas"
              onClick={nextBall}
              disabled={balls.length <= 1}
              aria-label="Next Poke Ball"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-game-border bg-game-surface-raised">
            <span className="text-4xl">🚫</span>
          </div>
          <div>
            <h3 className="mb-2 font-display text-xl font-semibold text-game-ink">
              No Poké Balls left
            </h3>
            <p className="text-game-muted">
              Return after adding Poké Balls to your field pack.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleRunAway}
          >
            Leave encounter
          </Button>
        </div>
      )}
    </motion.div>
  )
}
