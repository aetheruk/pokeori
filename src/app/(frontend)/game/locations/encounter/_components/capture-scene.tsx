import { motion } from 'framer-motion'
import type React from 'react'
import {
  MdChevronLeft as ChevronLeft,
  MdChevronRight as ChevronRight,
  MdKeyboardArrowUp as ChevronUp,
} from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
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
  targetRef,
  inventory,
  handleCapture,
  nextBall,
  prevBall,
  handleRunAway,
}: CaptureSceneProps) {
  if (showCaptureAnimation || isCapturing) return null

  return (
    <motion.div
      key="capture-phase"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.28 }}
      className="h-full flex flex-col items-center justify-end gap-4 max-w-md mx-auto w-full pb-2"
    >
      <div className="text-center space-y-2 w-full px-8">
        <SectionDivider
          className="mb-4 min-h-8 [&>div:first-child]:text-base [&>div:first-child]:font-bold [&>div:first-child]:leading-tight [&>div:first-child]:tracking-[0.04em]"
          textColor="text-game-cream"
        >
          Choose a Poké Ball
        </SectionDivider>
      </div>

      {balls.length > 0 ? (
        <div className="relative flex flex-col items-center justify-end gap-6 w-full max-w-sm h-full max-h-[60vh] pb-6">
          <div className="relative flex w-full items-center justify-between rounded-lg border border-game-border bg-game-surface/95 px-2 py-5 text-game-ink shadow-sm backdrop-blur-xl">
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

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-20 h-20">
                <DraggablePokeball
                  onThrow={handleCapture}
                  ringScale={ringScale}
                  targetRef={targetRef}
                  disabled={isCapturing}
                >
                  <div
                    className={cn(
                      'w-full h-full',
                      isCapturing && 'animate-ping opacity-75',
                    )}
                  >
                    <ItemSprite
                      itemId={balls[selectedBallIndex].id}
                      alt={balls[selectedBallIndex].name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain pixelated drop-shadow-2xl animate-pulse cursor-grab active:cursor-grabbing"
                    />
                  </div>
                </DraggablePokeball>
              </div>
              <div className="text-center pointer-events-none select-none mt-2">
                <div className="text-lg font-semibold text-game-ink">
                  {balls[selectedBallIndex].name}
                </div>
                <div className="mt-1 inline-flex min-w-[3rem] items-center justify-center rounded-full border border-game-border bg-game-canvas px-2.5 py-1">
                  <span className="translate-y-[0.5px] text-xs font-bold uppercase tracking-widest text-game-muted">
                    x
                    {inventory.find(
                      (i) => i.itemId === balls[selectedBallIndex].id,
                    )?.quantity || 0}
                  </span>
                </div>
              </div>

              <div className="pointer-events-none mt-4 flex select-none flex-col items-center gap-1 text-game-moss-strong">
                <ChevronUp className="h-6 w-6" />
                <span className="text-xs font-black uppercase tracking-[0.08em]">
                  Swipe up
                </span>
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
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-game-border bg-game-surface">
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
