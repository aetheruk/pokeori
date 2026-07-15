'use client'

import { Check, X } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'
import {
  RewardCarousel,
  type RewardItem,
} from '@/components/game/reward-carousel'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import { cn } from '@/lib/utils'

export interface TaskProgressData {
  current: number
  max: number
  label: string
}

interface GameInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string | ReactNode
  description?: string | ReactNode
  category?: string | ReactNode
  icon: ReactNode
  properties?: Array<{
    icon: ReactNode
    label: string
    value: string | number
    title?: string
  }>
  rewards?: RewardItem[]
  criteria?: RewardItem[]
  taskProgress?: TaskProgressData
  children?: ReactNode
  actionButton?: ReactNode
  className?: string
  isCaught?: boolean
  stats?: Array<{
    label: string
    value: string | number
    icon?: ReactNode
  }>
  background?: string
  autoScrollRewards?: boolean
  presentation?: 'dialog' | 'drawer'
}

export function GameInfoModal({
  open,
  onOpenChange,
  title,
  description,
  category,
  icon,
  properties,
  rewards,
  criteria,
  taskProgress,
  children,
  actionButton,
  className,
  isCaught,
  stats,
  background,
  autoScrollRewards = false,
  presentation = 'dialog',
}: GameInfoModalProps) {
  const isDrawer = presentation === 'drawer'
  const Header = ({
    className,
    children,
  }: {
    className?: string
    children: ReactNode
  }) =>
    isDrawer ? (
      <div className={className}>{children}</div>
    ) : (
      <DialogHeader className={className}>{children}</DialogHeader>
    )
  const Title = ({
    className,
    children,
  }: {
    className?: string
    children: ReactNode
  }) =>
    isDrawer ? (
      <h2 className={className}>{children}</h2>
    ) : (
      <DialogTitle className={className}>{children}</DialogTitle>
    )
  const Close = ({
    className,
    children,
  }: {
    className?: string
    children: ReactNode
  }) =>
    isDrawer ? (
      <button
        type="button"
        aria-label="Close"
        title="Close"
        onClick={() => onOpenChange(false)}
        className={className}
      >
        {children}
      </button>
    ) : (
      <DialogClose aria-label="Close" title="Close" className={className}>
        {children}
      </DialogClose>
    )
  const content = (
    <>
      <Header className="p-0 space-y-0 shrink-0">
        <div className="relative h-32 w-full overflow-hidden border-b border-game-border bg-game-surface md:h-40">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={background || '/backgrounds/forest.avif'}
              alt="Background"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-65 brightness-[0.62]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-game-night-surface/18 via-game-night-surface/44 to-game-surface" />
          </div>

          {category && (
            <div className="absolute left-4 top-4 z-50">
              <span className="inline-block rounded-md border border-game-night-border/60 bg-game-night-surface/85 px-2.5 py-1 text-[11px] font-medium text-game-ochre backdrop-blur-md">
                {category}
              </span>
            </div>
          )}

          {isDrawer && (
            <div className="absolute left-1/2 top-3 z-50 h-1.5 w-20 -translate-x-1/2 rounded-full bg-game-cream/30" />
          )}

          {/* Close Button */}
          <Close className="game-focus-ring absolute right-3 top-3 z-50 flex size-10 items-center justify-center rounded-md border border-game-night-border/60 bg-game-night-surface/84 text-game-cream transition-colors hover:bg-game-night-surface hover:text-game-night-ink">
            <X className="h-4 w-4" aria-hidden="true" />
          </Close>

          {/* Header Content */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-5 pt-8">
            <div className="relative">
              <div
                className={cn(
                  'group relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-game-border bg-game-surface-raised',
                  isCaught && 'border-game-moss/60',
                )}
              >
                <div className="absolute inset-0 bg-game-moss/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="scale-125">{icon}</div>
              </div>
              {isCaught && (
                <div className="absolute -bottom-2 -right-2 flex items-center gap-0.5 rounded-full border-2 border-game-surface bg-game-moss px-2 py-0.5 text-[10px] font-black text-game-cream">
                  <span>CAUGHT</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Header>

      <div className="custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto bg-game-canvas p-5 md:p-6">
        <div className="mx-auto max-w-3xl space-y-7 pb-8">
          <div className="border-b border-game-border pb-4 text-center">
            <Title className="font-display text-2xl font-semibold text-game-ink md:text-3xl">
              {title}
            </Title>
          </div>
          {description && (
            <div className="relative">
              <SectionDivider>OVERVIEW</SectionDivider>
              <div className="mt-3 rounded-lg border border-game-border bg-game-surface-raised p-4 md:p-5">
                <p className="text-sm font-medium leading-relaxed text-game-ink md:text-base">
                  {description}
                </p>
              </div>
            </div>
          )}

          {taskProgress ? (
            <div className="space-y-4">
              <SectionDivider>TASK PROGRESS</SectionDivider>
              <div className="rounded-lg border border-game-border bg-game-surface-raised p-4">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-game-ink">
                    {taskProgress.label}
                  </span>
                  <span className="rounded-full border border-game-ochre/30 bg-game-ochre/10 px-2 py-0.5 font-mono text-xs font-black text-game-ochre">
                    {Math.min(taskProgress.current, taskProgress.max)} /{' '}
                    {taskProgress.max}
                  </span>
                </div>
                <div className="relative pt-1">
                  <Progress
                    value={
                      (Math.min(taskProgress.current, taskProgress.max) /
                        taskProgress.max) *
                      100
                    }
                    className="h-3 overflow-hidden rounded-full border border-game-border bg-game-canvas"
                    indicatorClassName="bg-game-ochre"
                  />
                </div>
                {taskProgress.current >= taskProgress.max && (
                  <div className="mt-3 flex justify-center animate-in fade-in slide-in-from-bottom-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-game-moss/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-game-moss-strong">
                      <Check className="w-3 h-3" /> Ready to Claim
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            criteria &&
            criteria.length > 0 && (
              <div className="space-y-4">
                <SectionDivider>REQUIREMENTS</SectionDivider>
                <div className="rounded-lg border border-game-border bg-game-surface p-2">
                  <RewardCarousel
                    rewards={criteria}
                    autoScroll={autoScrollRewards}
                  />
                </div>
              </div>
            )
          )}

          {children && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          )}

          {(properties || stats) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties && properties.length > 0 && (
                <div className="space-y-4">
                  <SectionDivider>RULES</SectionDivider>
                  <div className="grid grid-cols-2 gap-3">
                    {properties.map((prop, idx) => (
                      <div
                        key={idx}
                        className="group flex flex-col items-center justify-center rounded-xl border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/45"
                        title={prop.title || prop.label}
                      >
                        <div className="mb-1 text-game-moss-strong transition-opacity group-hover:opacity-100">
                          {prop.icon}
                        </div>
                        <span className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-game-muted">
                          {prop.label}
                        </span>
                        <span className="font-mono font-bold text-game-ink">
                          {prop.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {stats && stats.length > 0 && (
                <div className="space-y-4">
                  <SectionDivider>STATS</SectionDivider>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center gap-3 rounded-xl border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/45"
                        title={stat.label}
                      >
                        <div className="text-game-moss-strong">{stat.icon}</div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-game-muted">
                            {stat.label}
                          </span>
                          <span className="font-mono text-sm font-black text-game-ink">
                            {stat.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(actionButton || (rewards && rewards.length > 0)) && (
        <div className="shrink-0 border-t border-game-border bg-game-surface/95 p-6 pb-8 md:backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            {rewards && rewards.length > 0 && (
              <div className="mb-6">
                <SectionDivider className="mb-4 font-black tracking-widest text-[10px]">
                  REWARDS
                </SectionDivider>
                <div className="rounded-lg border border-game-border bg-game-surface-raised p-2">
                  <RewardCarousel
                    rewards={rewards}
                    autoScroll={autoScrollRewards}
                  />
                </div>
              </div>
            )}
            {actionButton && (
              <div className="flex justify-center max-w-md mx-auto">
                <div className="w-full relative group">
                  <div className="pointer-events-none absolute -inset-1 rounded-xl bg-game-clay/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 w-full [&>button]:min-h-11">
                    {actionButton}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )

  if (isDrawer) {
    return (
      <ResponsivePanel
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        showHeader={false}
        showHandle={false}
        showCloseButton={false}
        desktopWidth="min(42vw, 620px)"
        mobileMaxHeight="calc(100dvh - 6rem)"
        className={cn(
          'flex h-[calc(100dvh-6rem)] w-screen max-w-none flex-col gap-0 overflow-hidden rounded-t-[1rem] border-x-0 border-b-0 border-t border-game-border bg-game-surface p-0 md:max-w-none lg:h-dvh lg:rounded-l-xl lg:rounded-t-none lg:border-y-0 lg:border-r-0',
          className,
        )}
      >
        {content}
      </ResponsivePanel>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          '!inset-0 !h-[100dvh] !max-h-none !w-screen !max-w-none !translate-x-0 !translate-y-0 m-0 flex flex-col gap-0 overflow-hidden rounded-none border-0 bg-game-surface p-0',
          className,
        )}
      >
        {content}
      </DialogContent>
    </Dialog>
  )
}
