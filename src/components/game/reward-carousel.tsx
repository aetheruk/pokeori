'use client'

import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { Check } from 'lucide-react'

export interface RewardItem {
  icon: React.ReactNode
  label: string | React.ReactNode
  subLabel?: string
  progress?: {
    current: number
    max: number
  }
  completed?: boolean
}

interface RewardCarouselProps {
  rewards: RewardItem[]
  autoScroll?: boolean
  autoScrollMaxItems?: number
}

export function RewardCarousel({
  rewards,
  autoScroll = false,
  autoScrollMaxItems = 5,
}: RewardCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const shouldAutoScroll = autoScroll && rewards.length > 1 && rewards.length <= autoScrollMaxItems

  React.useEffect(() => {
    if (
      !api ||
      !shouldAutoScroll ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 1800)

    return () => clearInterval(intervalId)
  }, [api, shouldAutoScroll])

  if (rewards.length === 0) return null

  const getProgressValue = (reward: RewardItem) => {
    if (!reward.progress) return null

    const max = Math.max(1, reward.progress.max)
    const current = Math.min(Math.max(0, reward.progress.current), max)
    return {
      current,
      max,
      percent: (current / max) * 100,
    }
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: rewards.length > 1,
      }}
      setApi={setApi}
      className="w-full max-w-full"
    >
      <CarouselContent>
        {rewards.map((reward, index) => (
          <CarouselItem key={index} className="basis-full min-w-0">
            {(() => {
              const progress = getProgressValue(reward)
              const showProgressCircle = !!progress && progress.max > 1 && !reward.completed
              const showCompletedCheck = reward.completed

              return (
            <div className="relative overflow-hidden rounded-lg border border-game-border bg-game-surface-raised p-4">

              <div className="flex items-center gap-4 relative z-10">
                <div className="shrink-0">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-lg border border-game-border bg-game-surface">
                    <div className="scale-125">{reward.icon}</div>
                  </div>
                </div>

                {/* Reward Details */}
                <div className="flex flex-1 flex-col min-w-0 w-full">
                    <span className="mb-1 whitespace-normal break-words text-base font-semibold leading-tight text-game-ink md:text-lg">
                    {reward.label}
                  </span>
                  {reward.subLabel && (
                    <div className="flex items-start gap-1.5">
                      <div className="mt-2 h-px w-3 shrink-0 bg-game-border-strong" />
                      <span className="whitespace-normal break-words text-[10px] font-bold uppercase leading-snug text-game-muted">
                        {reward.subLabel}
                      </span>
                    </div>
                  )}
                </div>

                {(showProgressCircle || showCompletedCheck) && (
                  <div className="shrink-0">
                    {showCompletedCheck ? (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-game-moss/40 bg-game-moss/10"
                        role="img"
                        title="Complete"
                        aria-label="Complete"
                      >
                        <Check className="h-5 w-5 text-game-moss-strong" strokeWidth={4} />
                      </div>
                    ) : progress ? (
                      <div
                        className="w-11 h-11 rounded-full p-0.5"
                        style={{
                          background: `conic-gradient(var(--game-ochre) ${progress.percent}%, var(--game-border) ${progress.percent}% 100%)`,
                        }}
                        title={`${progress.current} of ${progress.max} complete`}
                        role="img"
                        aria-label={`${progress.current} of ${progress.max} complete`}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full border border-game-border bg-game-surface">
                          <span className="font-mono text-[10px] font-black text-game-ochre">
                            {progress.current}/{progress.max}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

            </div>
              )
            })()}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
