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

interface GameInfoMetricCardProps {
  icon?: ReactNode
  label: string
  value: string | number
  title?: string
}

function GameInfoMetricCard({
  icon,
  label,
  value,
  title,
}: GameInfoMetricCardProps) {
  return (
    <div
      className="group flex h-[4.5rem] items-center gap-3 rounded-lg border border-game-border bg-game-surface p-3 transition-colors hover:border-game-moss/45"
      title={title || label}
    >
      <div className="flex size-9 shrink-0 items-center justify-center text-game-charcoal-strong [&>svg]:size-4">
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="truncate text-[10px] font-bold uppercase tracking-wider text-game-muted">
          {label}
        </span>
        <span className="truncate font-mono text-sm font-black text-game-ink">
          {value}
        </span>
      </div>
    </div>
  )
}

function GameInfoMetricRow({
  icon,
  label,
  value,
  title,
}: GameInfoMetricCardProps) {
  return (
    <div
      className="group flex min-h-14 items-center gap-3 py-3 transition-colors"
      title={title || label}
    >
      <div className="flex size-8 shrink-0 items-center justify-center text-game-charcoal-strong [&>svg]:size-3.5">
        {icon}
      </div>
      <span className="min-w-0 flex-1 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-game-muted">
        {label}
      </span>
      <span className="max-w-[58%] break-words text-right font-mono text-sm font-black text-game-ink">
        {value}
      </span>
    </div>
  )
}

interface GameInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string | ReactNode
  description?: string | ReactNode
  sourceHint?: string
  bonusLabel?: string
  category?: string | ReactNode
  icon: ReactNode
  iconClassName?: string
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
  /** Render the description in the full-screen hero instead of an Overview section. */
  descriptionInHero?: boolean
  autoScrollRewards?: boolean
  presentation?: 'dialog' | 'drawer'
  resultLayout?: boolean
  modal?: boolean
  desktopBreakpoint?: 'lg' | 'xl'
}

export function GameInfoModal({
  open,
  onOpenChange,
  title,
  description,
  sourceHint,
  bonusLabel,
  category,
  icon,
  iconClassName,
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
  descriptionInHero = false,
  autoScrollRewards = false,
  presentation = 'dialog',
  resultLayout = false,
  modal = true,
  desktopBreakpoint = 'xl',
}: GameInfoModalProps) {
  const isDrawer = presentation === 'drawer'
  const isResultLayout = resultLayout && !isDrawer
  const hasProperties = Boolean(properties && properties.length > 0)
  const hasStats = Boolean(stats && stats.length > 0)
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
      {!isDrawer && (
        <Header className="p-0 space-y-0 shrink-0">
          <div
            className={cn(
              'relative w-full overflow-hidden border-b border-game-border bg-game-surface',
              isResultLayout ? 'h-[42dvh] md:h-[46dvh]' : 'h-40 md:h-52',
            )}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={background || '/backgrounds/forest.avif'}
                alt="Background"
                fill
                priority
                sizes="100vw"
                className={cn(
                  'object-cover',
                  !isResultLayout && 'opacity-80 brightness-90',
                )}
              />
              <div
                className={cn(
                  'absolute inset-0',
                  isResultLayout
                    ? 'bg-[linear-gradient(to_bottom,rgba(23,39,51,0.08),rgba(23,39,51,0.24)_42%,rgba(23,39,51,0.92)_100%)]'
                    : 'bg-gradient-to-b from-game-night-surface/5 via-game-night-surface/25 to-game-surface',
                )}
              />
            </div>

            {category && (
              <div className="absolute left-7 top-7 z-50">
                <span className="inline-block rounded-md border border-game-ochre/45 bg-game-surface-raised/95 px-2.5 py-1 text-[11px] font-medium text-game-clay-strong backdrop-blur-md">
                  {category}
                </span>
              </div>
            )}

            {/* Close Button */}
            <Close
              className={cn(
                'game-focus-ring absolute right-7 top-[max(1.75rem,env(safe-area-inset-top))] z-50 flex size-10 items-center justify-center rounded-md border transition-colors',
                isResultLayout
                  ? 'border-white/55 bg-game-night-canvas/55 text-white hover:bg-game-night-canvas/75'
                  : 'border-game-border/60 bg-game-surface-raised/90 text-game-ink hover:bg-game-surface hover:text-game-clay-strong',
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Close>

            {/* Header Content */}
            <div
              className={cn(
                'absolute inset-0 z-10 flex items-center justify-center p-5',
                isResultLayout && 'flex-col gap-3 text-center',
              )}
            >
              <div className="relative">
                <div
                  className={cn(
                    'game-icon-orb group relative shrink-0 overflow-hidden',
                    isResultLayout
                      ? 'h-24 w-24 border-white/55 !bg-white/10 shadow-xl md:h-28 md:w-28'
                      : 'h-14 w-14 border-game-border',
                    isCaught && 'border-game-charcoal/60',
                  )}
                >
                  <div className="absolute inset-0 bg-game-charcoal/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className={cn(!isResultLayout && 'scale-125')}>
                    {icon}
                  </div>
                </div>
                {isCaught && (
                  <div className="absolute -bottom-2 -right-2 flex items-center gap-0.5 rounded-full border-2 border-game-surface bg-game-moss px-2 py-0.5 text-[10px] font-black text-game-cream">
                    <span>CAUGHT</span>
                  </div>
                )}
              </div>
              {isResultLayout && (
                <Title className="max-w-2xl font-display text-3xl font-semibold leading-tight !text-white md:text-4xl">
                  {title}
                </Title>
              )}
            </div>
          </div>
        </Header>
      )}

      <div className="custom-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-game-canvas p-5 md:p-6">
        <div className="mx-auto max-w-3xl space-y-7 pb-8">
          {!isResultLayout && !isDrawer && (
            <div className="text-center">
              <Title className="font-display text-2xl font-semibold text-game-ink md:text-3xl">
                {title}
              </Title>
            </div>
          )}
          {description &&
            !descriptionInHero &&
            (isResultLayout ? (
              <div className="mx-auto max-w-2xl px-2 py-5 text-center text-base font-medium leading-relaxed text-game-ink md:text-lg">
                {description}
              </div>
            ) : (
              <div className="relative">
                <SectionDivider>OVERVIEW</SectionDivider>
                <div
                  className={cn(
                    'mt-3',
                    isDrawer
                      ? 'text-left'
                      : 'rounded-lg border border-game-border bg-game-surface-raised p-4 md:p-5',
                  )}
                >
                  <p className="text-sm font-medium leading-relaxed text-game-ink md:text-base">
                    {description}
                  </p>
                  {bonusLabel && (
                    <div className="mt-3 inline-flex rounded-full border border-game-ochre/35 bg-game-ochre/10 px-2.5 py-1 text-xs font-bold text-game-ochre">
                      {bonusLabel}
                    </div>
                  )}
                  {sourceHint && (
                    <div className="mt-3 flex items-start gap-2 border-t border-game-border pt-3 text-sm">
                      <span className="shrink-0 font-bold uppercase tracking-wide text-game-moss-strong">
                        Available at
                      </span>
                      <span className="text-game-muted">
                        {sourceHint.replace(/^Available (at|from)\s+/i, '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {taskProgress ? (
            <div className="space-y-4">
              <SectionDivider>TASK PROGRESS</SectionDivider>
              <div
                className={cn(
                  isDrawer
                    ? 'border-y border-game-border/75 py-4'
                    : 'rounded-lg border border-game-border bg-game-surface-raised p-4',
                )}
              >
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
                    className={cn(
                      'overflow-hidden rounded-full bg-game-canvas',
                      isDrawer
                        ? 'h-2 border-0'
                        : 'h-3 border border-game-border',
                    )}
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
                <RewardCarousel
                  rewards={criteria}
                  autoScroll={autoScrollRewards}
                  variant={isDrawer ? 'journal' : 'default'}
                />
              </div>
            )
          )}

          {children && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          )}

          {(hasProperties || hasStats) && (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-8">
              {hasProperties && (
                <div className="space-y-4">
                  <SectionDivider>RULES</SectionDivider>
                  <div
                    className={cn(
                      isDrawer
                        ? 'divide-y divide-game-border/75'
                        : 'grid grid-cols-2 gap-3',
                    )}
                  >
                    {properties?.map((prop, idx) =>
                      isDrawer ? (
                        <GameInfoMetricRow
                          key={idx}
                          icon={prop.icon}
                          label={prop.label}
                          value={prop.value}
                          title={prop.title || prop.label}
                        />
                      ) : (
                        <GameInfoMetricCard
                          key={idx}
                          icon={prop.icon}
                          label={prop.label}
                          value={prop.value}
                          title={prop.title || prop.label}
                        />
                      ),
                    )}
                  </div>
                </div>
              )}

              {hasStats && (
                <div className="space-y-4">
                  <SectionDivider>STATS</SectionDivider>
                  <div
                    className={cn(
                      isDrawer
                        ? 'divide-y divide-game-border/75'
                        : 'grid grid-cols-2 gap-3',
                    )}
                  >
                    {stats?.map((stat, idx) =>
                      isDrawer ? (
                        <GameInfoMetricRow
                          key={idx}
                          icon={stat.icon}
                          label={stat.label}
                          value={stat.value}
                          title={stat.label}
                        />
                      ) : (
                        <GameInfoMetricCard
                          key={idx}
                          icon={stat.icon}
                          label={stat.label}
                          value={stat.value}
                          title={stat.label}
                        />
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(actionButton || (rewards && rewards.length > 0)) && (
        <div className="shrink-0 border-t border-game-border bg-game-surface/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6 md:pb-[max(1.5rem,env(safe-area-inset-bottom))] md:backdrop-blur-xl">
          <div className="max-w-3xl mx-auto">
            {rewards && rewards.length > 0 && (
              <div className="mb-6">
                <SectionDivider className="mb-4 font-black tracking-widest text-[10px]">
                  REWARDS
                </SectionDivider>
                <RewardCarousel
                  rewards={rewards}
                  autoScroll={autoScrollRewards}
                  variant={isDrawer ? 'journal' : 'default'}
                />
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
        desktopBreakpoint={desktopBreakpoint}
        title={title}
        description={descriptionInHero ? description : undefined}
        background={background || '/backgrounds/forest.avif'}
        icon={icon}
        iconClassName={iconClassName}
        heroLabel={category}
        heroBadge={
          isCaught ? (
            <span className="flex items-center gap-0.5 rounded-full border-2 border-game-surface bg-game-moss px-2 py-0.5 text-[10px] font-black text-game-cream">
              CAUGHT
            </span>
          ) : undefined
        }
        desktopWidth="min(42vw, 620px)"
        className={cn(
          'flex w-screen max-w-none flex-col gap-0 overflow-hidden border-0 bg-game-surface p-0 md:max-w-none',
          className,
        )}
      >
        {content}
      </ResponsivePanel>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={modal}>
      <DialogContent
        showCloseButton={false}
        showOverlay={modal}
        onPointerDownCapture={(event) => {
          if (!modal) event.stopPropagation()
        }}
        onInteractOutside={(event) => {
          if (!modal) event.preventDefault()
        }}
        className={cn(
          '!inset-0 !h-[100dvh] !max-h-none !w-screen !max-w-none !translate-x-0 !translate-y-0 m-0 flex flex-col gap-0 overflow-hidden rounded-none border-0 bg-game-surface p-0 sm:p-0',
          className,
        )}
      >
        {content}
      </DialogContent>
    </Dialog>
  )
}
