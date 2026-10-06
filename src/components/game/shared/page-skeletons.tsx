import type { ReactNode } from 'react'
import {
  ChevronDown,
  Heart,
  Map as MapIcon,
  MapPin,
  Search,
  SlidersHorizontal,
  Swords,
  Timer,
  Trash2,
} from 'lucide-react'
import { DelayedSkeletonBlocks } from '@/components/game/shared/DelayedSkeletonBlocks'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { DexFilterBar } from '@/components/game/dex'
import { SectionDivider } from '@/components/ui/section-divider'
import { cn } from '@/lib/utils'

function Block({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-game-border/45 motion-reduce:animate-none',
        className,
      )}
    />
  )
}

function QuietBlock({ className }: { className?: string }) {
  return <div className={cn('rounded-md bg-game-border/45', className)} />
}

function RoutePage({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string
  subtitle?: ReactNode
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="game-paper-first game-paper-background flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-game-canvas text-game-ink">
      <span role="status" className="sr-only">
        Loading {title}…
      </span>
      <PremiumHeader title={title} subtitle={subtitle} icon={icon} />
      {children}
    </div>
  )
}

function DelayedContent({
  className,
  children,
}: {
  className: string
  children: ReactNode
}) {
  return (
    <DelayedSkeletonBlocks className={className}>{children}</DelayedSkeletonBlocks>
  )
}

function HeaderIconSkeleton() {
  return <QuietBlock className="h-10 w-10 rounded-full" />
}

function SearchSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex h-11 min-w-0 items-center gap-2 rounded-md border border-game-border bg-game-surface px-3',
        className,
      )}
    >
      <Search className="size-4 shrink-0 text-game-muted" aria-hidden="true" />
      <Block className="h-3 w-32 max-w-full" />
    </div>
  )
}

function FilterFieldSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('min-w-0 space-y-2', className)}>
      <Block className="h-3 w-16" />
      <QuietBlock className="h-11 w-full rounded-md border border-game-border bg-game-surface" />
    </div>
  )
}

function NavigationChipSkeleton({
  selected = false,
  width = 'min-w-[9.75rem]',
}: {
  selected?: boolean
  width?: string
}) {
  const muted = selected ? 'bg-game-canvas/55' : 'bg-game-border/55'
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex h-11 max-w-[12rem] shrink-0 snap-start items-center gap-2 rounded-xl border px-2',
        width,
        selected
          ? 'border-game-charcoal bg-game-charcoal'
          : 'border-game-border bg-game-surface',
      )}
    >
      <QuietBlock className={cn('h-8 w-8 shrink-0 rounded-md border border-game-border/80 bg-game-canvas/90')} />
      <span className="min-w-0 flex-1 space-y-1.5">
        <QuietBlock className={cn('h-2.5 w-16 max-w-full', muted)} />
        <QuietBlock className={cn('h-2 w-12 max-w-full', muted)} />
      </span>
    </div>
  )
}

function NavigationRow({
  count,
  selectedIndex = 0,
}: {
  count: number
  selectedIndex?: number
}) {
  return (
    <div className="flex w-full min-w-0 max-w-full snap-x snap-proximity gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain py-1 touch-pan-x [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-game-border-strong [&::-webkit-scrollbar-track]:bg-transparent">
      {Array.from({ length: count }, (_, index) => (
        <NavigationChipSkeleton key={index} selected={index === selectedIndex} />
      ))}
    </div>
  )
}

function CategoryNavigationSkeleton() {
  return (
    <SecondaryControlBar className="order-last py-2 lg:order-none lg:border-b lg:border-t-0 lg:bg-game-surface/60 lg:shadow-none lg:backdrop-blur-none">
      <div className="flex min-w-0 flex-col">
        <NavigationRow count={6} />
        <div className="mt-1">
          <NavigationRow count={6} selectedIndex={0} />
        </div>
      </div>
    </SecondaryControlBar>
  )
}

function SectionLabelSkeleton({ className }: { className?: string }) {
  return (
    <SectionDivider className={className}>
      <Block className="h-3 w-24" />
    </SectionDivider>
  )
}

function ExploreCardSkeleton() {
  return (
    <div className="relative flex min-h-[6.5rem] items-center gap-4 overflow-hidden rounded-md border border-game-card-border bg-game-surface p-4">
      <QuietBlock className="game-icon-orb game-icon-orb-art relative z-10 h-14 w-14 shrink-0 rounded-full border border-game-border" />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col items-end gap-2 pt-1">
        <Block className="h-4 w-3/4" />
        <Block className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Block className="h-6 w-16 rounded-md" />
          <Block className="h-6 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}

function ExploreHeaderSkeleton() {
  return (
    <div className="w-full shrink-0 px-0 md:px-6 md:pt-5">
      <div className="relative h-44 w-full overflow-hidden border-b border-game-border bg-game-surface md:h-56 md:rounded-md md:border">
        <div className="game-contour-motif absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172733]/92 via-[#172733]/26 to-[#172733]/12" />
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center p-4 text-center md:p-5">
          <div className="flex w-64 max-w-full flex-col items-center gap-2">
            <Block className="h-7 w-44 max-w-full bg-game-cream/35 md:h-8" />
            <div className="flex items-center justify-center gap-3">
              <Block className="h-4 w-20 bg-game-cream/30" />
              <QuietBlock className="h-4 w-px bg-game-cream/60" />
              <Block className="h-4 w-14 bg-game-cream/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExploreFilterBarSkeleton() {
  return (
    <SecondaryControlBar desktopInline>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-3" aria-hidden="true">
        <div className="flex h-12 min-w-0 items-center gap-2 rounded-md border border-game-border bg-game-surface px-3">
          <MapIcon className="h-4 w-4 shrink-0 text-game-moss-strong" />
          <Block className="h-3 w-3/4" />
          <ChevronDown className="h-4 w-4 shrink-0 text-game-muted" />
        </div>
        <div className="flex h-12 min-w-0 items-center gap-2 rounded-md border border-game-border bg-game-surface px-3">
          <MapPin className="h-4 w-4 shrink-0 text-game-moss-strong" />
          <Block className="h-3 w-3/4" />
          <ChevronDown className="h-4 w-4 shrink-0 text-game-muted" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-md border border-game-border bg-game-surface text-game-moss-strong">
          <Timer className="h-5 w-5" />
        </div>
      </div>
    </SecondaryControlBar>
  )
}

function InventoryCardSkeleton() {
  return (
    <div className="flex min-h-[5.25rem] items-center gap-3 rounded-md border border-game-border bg-game-surface p-3">
      <div className="game-icon-orb relative h-12 w-12 shrink-0">
        <Block className="absolute inset-1.5 rounded-full" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-1">
        <Block className="mb-1 h-2.5 w-20 max-w-full" />
        <Block className="h-4 w-28 max-w-full" />
        <Block className="mt-2 h-5 w-14 rounded-md" />
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <QuietBlock className="h-7 w-12 rounded-md border border-game-border bg-game-surface-raised" />
      </div>
    </div>
  )
}

function RecipeCardSkeleton() {
  return (
    <div className="flex min-h-[5.5rem] items-center gap-4 overflow-hidden rounded-md border border-game-card-border bg-game-surface p-4">
      <QuietBlock className="game-icon-orb relative h-14 w-14 shrink-0 rounded-full border border-game-border" />
      <div className="min-w-0 flex-1 space-y-2">
        <Block className="h-2.5 w-4/5" />
        <Block className="h-4 w-2/3" />
        <Block className="h-2.5 w-1/2" />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <QuietBlock className="h-10 w-10 rounded-md border border-game-border bg-game-surface-raised" />
        <QuietBlock className="hidden h-10 w-10 rounded-md border border-game-border bg-game-surface-raised sm:block" />
      </div>
    </div>
  )
}

function DexRowSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border border-game-border bg-game-surface/70 px-3 sm:px-4',
        compact ? 'min-h-20 py-2.5' : 'min-h-24 py-3',
      )}
    >
      <QuietBlock className="game-icon-orb h-12 w-12 shrink-0 rounded-full border border-game-border" />
      <div className="min-w-0 flex-1 space-y-2">
        <Block className="h-3 w-2/5" />
        <Block className="h-3 w-4/5" />
      </div>
      <Block className="hidden h-7 w-16 shrink-0 sm:block" />
    </div>
  )
}

function CollectionPanelSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-game-border bg-game-surface p-4">
      <div className="flex items-start gap-3">
        <QuietBlock className="game-icon-orb h-12 w-12 shrink-0 rounded-full border border-game-border" />
        <div className="min-w-0 flex-1 space-y-2">
          <Block className="h-4 w-2/3" />
          <Block className="h-3 w-1/2" />
        </div>
        <Block className="h-8 w-12 shrink-0" />
      </div>
      <Block className="mt-4 h-1.5 w-full rounded-full" />
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-game-border pt-3">
        <Block className="h-8" />
        <Block className="h-8" />
      </div>
    </div>
  )
}

function PokedexSpecimens() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-[repeat(auto-fill,minmax(104px,1fr))]">
      {Array.from({ length: 24 }, (_, index) => (
        <div
          key={index}
          className="flex aspect-square items-center justify-center overflow-hidden rounded-md border border-game-border bg-game-surface/65 p-2"
        >
          <Block className="h-3/4 w-3/4 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function TrainerSkeleton() {
  return (
    <div className="game-paper-first game-paper-background flex h-full min-h-0 flex-col overflow-hidden bg-game-canvas text-game-ink">
      <span role="status" className="sr-only">Loading Trainer…</span>
      <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden min-h-0 overflow-y-auto border-r border-game-border bg-game-surface/60 p-3 shadow-[10px_0_24px_rgb(75_62_39_/_0.05)] lg:block">
          <nav className="space-y-2" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex min-h-20 items-center gap-3 rounded-xl border border-game-border bg-game-surface p-3">
                <QuietBlock className="h-10 w-10 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Block className="h-3 w-3/4" />
                  <Block className="h-2.5 w-1/2" />
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <div className="h-full min-h-0 min-w-0 overflow-hidden">
          <div className="game-paper-background relative flex h-full min-h-0 flex-col overflow-hidden bg-game-canvas text-game-ink">
            <div className="relative z-10 w-full shrink-0">
              <div className="relative aspect-[8/5] w-full overflow-hidden rounded-none border-b border-game-border bg-game-surface md:h-36 md:aspect-auto xl:h-44">
                <div className="absolute inset-0 bg-gradient-to-t from-game-ink/90 via-game-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 p-4 md:p-5">
                  <QuietBlock className="h-16 w-16 shrink-0 rounded-full border border-game-cream/35 bg-game-cream/20" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Block className="h-6 w-48 max-w-full bg-game-cream/35" />
                    <Block className="h-3 w-32 max-w-full bg-game-cream/25" />
                  </div>
                </div>
              </div>
            </div>
            <DelayedContent className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col space-y-6 overflow-y-auto px-4 pb-20 pt-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-game-border md:px-6">
              <section className="space-y-4">
                <SectionLabelSkeleton />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="flex min-h-16 items-center gap-3 rounded-md border border-game-border bg-game-surface p-3">
                      <Block className="h-12 w-12 shrink-0 rounded-full" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Block className="h-3 w-2/3" />
                        <Block className="h-2.5 w-4/5" />
                        <Block className="h-1.5 w-full rounded-full" />
                      </div>
                      <Block className="h-7 w-8 shrink-0" />
                    </div>
                  ))}
                </div>
              </section>
              <section className="space-y-4">
                <SectionLabelSkeleton />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="flex min-h-16 items-center gap-3 rounded-md border border-game-border bg-game-surface p-3">
                      <QuietBlock className="h-12 w-12 shrink-0 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Block className="h-3 w-2/3" />
                        <Block className="h-2.5 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </DelayedContent>
          </div>
        </div>
      </div>
      <SecondaryControlBar className="lg:hidden">
        <div className="flex min-h-20 items-center gap-3 rounded-xl border border-game-border bg-game-surface p-3" aria-hidden="true">
          <QuietBlock className="h-12 w-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Block className="h-3 w-2/3" />
            <Block className="h-2.5 w-1/2" />
          </div>
          <ChevronDown className="h-4 w-4 text-game-muted" />
        </div>
      </SecondaryControlBar>
    </div>
  )
}

export function ExploreSkeleton() {
  return (
    <div className="game-paper-first game-paper-background flex h-full min-h-0 flex-col overflow-hidden bg-game-canvas text-game-ink">
      <span role="status" className="sr-only">Loading Explore…</span>
      <ExploreHeaderSkeleton />
      <DelayedContent className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 md:px-6">
        <div className="space-y-8">
          {Array.from({ length: 2 }, (_, sectionIndex) => (
            <section key={sectionIndex}>
              <SectionLabelSkeleton />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, cardIndex) => (
                  <ExploreCardSkeleton key={cardIndex} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </DelayedContent>
      <ExploreFilterBarSkeleton />
    </div>
  )
}

export function PokemonSkeleton() {
  return (
    <RoutePage
      title="POKEMON BOX"
      subtitle={<QuietBlock className="h-3 w-14" />}
      icon={
        <TaskIconDisplay
          icon={{ type: 'item', id: 'poke-ball' }}
          className="h-10 w-10"
          normalizeVisibleBounds
          outlineVisiblePixels
        />
      }
    >
      <div className="mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-7xl items-center justify-between gap-3 border-b border-game-border pb-3">
        <Block className="h-3 w-48 max-w-[70%]" />
        <div className="flex h-9 shrink-0 items-center gap-2 rounded-md border border-game-border bg-game-surface-raised px-3">
          <Trash2 className="h-3.5 w-3.5 text-game-danger" />
          <QuietBlock className="h-3 w-12" />
        </div>
      </div>
      <div className="contents xl:grid xl:min-h-0 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-h-0 flex-1 w-full max-w-7xl flex-col gap-6 overflow-y-auto px-4 py-4 custom-scrollbar mx-auto xl:min-w-0 xl:max-w-none">
          <div className="w-full flex-1">
            <div className="min-h-[40vh] p-4">
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-[repeat(auto-fill,minmax(104px,1fr))]">
                {Array.from({ length: 24 }, (_, index) => (
                  <div key={index} className="relative aspect-square w-full rounded-xl border border-game-border bg-game-surface p-1">
                    <Block className="h-full w-full rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="z-30 flex w-full shrink-0 flex-col border-t border-game-border bg-game-surface/96 shadow-[0_-10px_30px_rgba(75,62,39,0.14)] backdrop-blur-xl xl:h-full xl:min-w-0 xl:border-l xl:border-t-0 xl:shadow-none">
          <div className="flex h-10 w-full items-center justify-center border-b border-game-border xl:hidden">
            <Block className="h-3 w-24" />
          </div>
          <div className="invisible grid overflow-hidden border-b border-game-border grid-rows-[0fr] opacity-0 xl:grid-rows-[1fr] xl:opacity-100 xl:visible">
            <div className="min-h-0 overflow-hidden">
              <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-3">
                <div className="flex flex-col gap-4 items-stretch">
                  <div className="h-full rounded-md border border-game-border bg-game-surface p-2">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Swords className="h-3 w-3 text-game-moss-strong" />
                      <QuietBlock className="h-3 w-20" />
                    </div>
                    <div className="grid w-full grid-cols-3 gap-2">
                      {Array.from({ length: 6 }, (_, index) => (
                        <Block key={index} className="aspect-square w-full rounded-md" />
                      ))}
                    </div>
                  </div>
                  <div className="w-full shrink-0 rounded-md border border-game-border bg-game-surface p-2">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Heart className="h-3 w-3 text-game-moss-strong" />
                      <QuietBlock className="h-3 w-14" />
                    </div>
                    <Block className="mx-auto h-24 w-24 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full shrink-0 bg-game-surface-raised px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <QuietBlock className="h-10 min-w-0 flex-1 rounded-md border border-game-border bg-game-surface" />
              <QuietBlock className="h-10 w-10 shrink-0 rounded-md border border-game-border bg-game-surface" />
            </div>
          </div>
        </div>
      </div>
    </RoutePage>
  )
}

export function ArtisanSkeleton() {
  return (
    <RoutePage
      title="Artisan"
      subtitle="Craft Items"
      icon={
        <TaskIconDisplay
          icon={{ type: 'local', id: '/fallback/skills/artisan-v2.png' }}
          className="h-10 w-10"
          normalizeVisibleBounds
          outlineVisiblePixels
        />
      }
    >
      <CategoryNavigationSkeleton />
      <DelayedContent className="min-h-0 flex-1 touch-pan-y overflow-y-auto px-4 pt-4 pb-6 md:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {Array.from({ length: 8 }, (_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      </DelayedContent>
    </RoutePage>
  )
}

export function DexSkeleton() {
  return (
    <RoutePage
      title="Personal Progress"
      subtitle="Collections"
      icon={<HeaderIconSkeleton />}
    >
      <DelayedContent className="min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
        <section>
          <div className="relative overflow-hidden rounded-xl border border-game-border bg-game-surface p-4 md:p-5">
            <div className="absolute inset-y-5 left-0 w-1 bg-game-ochre" aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-2">
                <Block className="h-3 w-36 max-w-full" />
                <Block className="h-9 w-24" />
                <Block className="h-2.5 w-36 max-w-full" />
              </div>
              <QuietBlock className="h-16 w-16 shrink-0 rounded-full border border-game-border bg-game-canvas" />
            </div>
            <Block className="mt-5 h-2 w-full rounded-full" />
            <div className="mt-4 grid grid-cols-2 gap-y-4 border-t border-game-border pt-4 sm:grid-cols-4 sm:divide-x sm:divide-game-border">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="space-y-2 sm:px-3">
                  <Block className="h-2.5 w-14" />
                  <Block className="h-4 w-10" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <SectionLabelSkeleton className="my-4" />
        <section className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <CollectionPanelSkeleton key={index} />
          ))}
        </section>
        <SectionLabelSkeleton className="my-4" />
        <section className="min-w-0 overflow-hidden rounded-xl border border-game-border bg-game-surface p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-game-border pb-3">
            <Block className="h-3 w-36" />
            <QuietBlock className="h-4 w-4 rounded-full" />
          </div>
          <div className="mt-3 grid min-w-0 gap-x-5 md:grid-cols-2 md:divide-x md:divide-game-border">
            {[0, 1].map((column) => (
              <div key={column} className={cn('min-w-0 divide-y divide-game-border', column === 1 && 'border-t border-game-border md:border-t-0 md:pl-5')}>
                {Array.from({ length: column === 0 ? 4 : 3 }, (_, index) => (
                  <div key={index} className="flex min-h-11 items-center justify-between gap-3 py-2">
                    <Block className="h-3 w-2/3" />
                    <Block className="h-3 w-10 shrink-0" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </DelayedContent>
    </RoutePage>
  )
}

export function MoveDexSkeleton() {
  return (
    <RoutePage
      title="MoveDex"
      subtitle={<QuietBlock className="h-3 w-40" />}
    >
      <DelayedContent className="game-desktop-workspace flex min-h-0 min-w-0 w-full flex-1 flex-col px-4 pb-3 pt-4 md:px-6">
        <div className="grid h-auto min-h-11 grid-cols-3 gap-1 rounded-md border border-game-border bg-game-surface p-1">
          {Array.from({ length: 3 }, (_, index) => (
            <QuietBlock key={index} className={cn('h-9 rounded-md', index === 0 && 'bg-game-border/65')} />
          ))}
        </div>
        <section className="mt-3 rounded-xl border border-game-border bg-game-surface/80 p-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 md:grid-cols-2 xl:grid-cols-[minmax(14rem,1.5fr)_repeat(5,minmax(8rem,1fr))]">
            <div className="space-y-2">
              <Block className="h-3 w-12" />
              <SearchSkeleton />
            </div>
            <div className="mt-[1.625rem] flex h-11 items-center justify-center gap-2 rounded-md border border-game-border bg-game-surface px-3 md:hidden">
              <SlidersHorizontal className="size-4 text-game-muted" />
              <QuietBlock className="h-3 w-12" />
            </div>
            <div className="col-span-2 hidden grid-cols-2 gap-2 md:contents">
              {Array.from({ length: 5 }, (_, index) => (
                <FilterFieldSkeleton key={index} />
              ))}
            </div>
          </div>
          <div className="mt-2 flex min-h-8 items-center gap-2 border-t border-game-border pt-2">
            <SlidersHorizontal className="size-3.5 text-game-muted" />
            <Block className="h-3 w-28" />
          </div>
        </section>
        <div className="mt-1 flex justify-end">
          <QuietBlock className="h-10 w-32 rounded-md" />
        </div>
        <section className="mt-3 min-h-0 flex-1 space-y-2" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => (
            <DexRowSkeleton key={index} />
          ))}
        </section>
      </DelayedContent>
    </RoutePage>
  )
}

export function AbilityDexSkeleton() {
  return (
    <RoutePage
      title="AbilityDex"
      subtitle={<QuietBlock className="h-3 w-36" />}
    >
      <DelayedContent className="game-desktop-workspace flex min-h-0 min-w-0 w-full flex-1 flex-col px-4 pb-3 pt-4 md:px-6">
        <div className="grid h-auto min-h-11 grid-cols-2 gap-1 rounded-md border border-game-border bg-game-surface p-1">
          {Array.from({ length: 2 }, (_, index) => (
            <QuietBlock key={index} className={cn('h-9 rounded-md', index === 0 && 'bg-game-border/65')} />
          ))}
        </div>
        <section className="mt-3 rounded-xl border border-game-border bg-game-surface/80 p-3">
          <Block className="h-3 w-44" />
          <SearchSkeleton className="mt-2" />
          <div className="mt-2 flex min-h-8 items-center gap-2 border-t border-game-border pt-2">
            <Search className="size-3.5 text-game-muted" />
            <Block className="h-3 w-24" />
          </div>
        </section>
        <section className="mt-3 min-h-0 flex-1 space-y-2" aria-label="Ability record placeholders">
          {Array.from({ length: 8 }, (_, index) => (
            <DexRowSkeleton key={index} compact />
          ))}
        </section>
      </DelayedContent>
    </RoutePage>
  )
}

export function PokedexSkeleton() {
  return (
    <RoutePage title="Pokédex" subtitle="Specimen index">
      <div className="hidden items-end gap-3 border-b border-game-border bg-game-surface/70 px-6 py-3 lg:flex">
        <div className="min-w-0 flex-1 space-y-2">
          <Block className="h-3 w-56" />
          <SearchSkeleton />
        </div>
        <FilterFieldSkeleton className="w-48 shrink-0" />
        <FilterFieldSkeleton className="w-48 shrink-0" />
      </div>
      <DelayedContent className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pt-4 md:px-6">
        <div className="mb-4">
          <SectionDivider className="mb-0 flex-1">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <QuietBlock className="h-4 w-4 rounded-full" />
                <Block className="h-3 w-10" />
                <Block className="h-3 w-7" />
              </div>
              <div className="flex items-center gap-2">
                <QuietBlock className="h-4 w-4 rounded-full" />
                <Block className="h-3 w-12" />
                <Block className="h-3 w-7" />
              </div>
              <Block className="ml-auto h-3 w-16" />
            </div>
          </SectionDivider>
        </div>
        <div className="min-h-0 flex-1 pb-2">
          <PokedexSpecimens />
        </div>
      </DelayedContent>
      <SecondaryControlBar className="lg:hidden">
        <div className="grid gap-2">
          <SearchSkeleton />
          <div className="grid grid-cols-2 gap-2">
            <QuietBlock className="h-11 rounded-md border border-game-border bg-game-surface" />
            <QuietBlock className="h-11 rounded-md border border-game-border bg-game-surface" />
          </div>
        </div>
      </SecondaryControlBar>
    </RoutePage>
  )
}

export function CardDexSkeleton() {
  return (
    <RoutePage title="Carddex" subtitle="Binder archive">
      <DexFilterBar
        label="Carddex filters"
        className="hidden rounded-none border-x-0 border-t-0 px-6 py-3 lg:block"
      >
        <div className="grid grid-cols-[minmax(14rem,1.5fr)_minmax(10rem,0.8fr)_minmax(12rem,1fr)_auto] items-end gap-2">
          <div className="space-y-2">
            <Block className="h-3 w-12" />
            <SearchSkeleton />
          </div>
          <FilterFieldSkeleton />
          <FilterFieldSkeleton />
          <QuietBlock className="h-11 w-32 rounded-md border border-game-border" />
        </div>
        <div className="mt-2 flex min-h-8 items-center gap-2 border-t border-game-border pt-2">
          <SlidersHorizontal className="size-3.5 text-game-muted" />
          <Block className="h-3 w-28" />
        </div>
      </DexFilterBar>
      <DelayedContent className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 md:px-6">
        <div className="mb-4 mt-5">
          <SectionLabelSkeleton className="mb-0" />
          <div className="mt-2 flex items-center gap-3">
            <Block className="h-1.5 min-w-24 flex-1 rounded-full" />
            <Block className="h-3 w-24 shrink-0" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 pb-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
          {Array.from({ length: 24 }, (_, index) => (
            <div key={index} className="aspect-[240/330] w-full overflow-hidden rounded-sm border border-game-border bg-game-surface p-0.5">
              <Block className="h-full w-full rounded-[2px]" />
            </div>
          ))}
        </div>
      </DelayedContent>
      <SecondaryControlBar className="lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <SearchSkeleton />
          <QuietBlock className="h-11 w-24 rounded-md border border-game-border bg-game-surface" />
        </div>
      </SecondaryControlBar>
    </RoutePage>
  )
}

export function InventorySkeleton() {
  return (
    <RoutePage
      title="INVENTORY"
      subtitle="Storage"
      icon={
        <TaskIconDisplay
          icon={{ type: 'local', id: '/fallback/skills/inventory-v2.png' }}
          className="h-10 w-10"
          normalizeVisibleBounds
          outlineVisiblePixels
        />
      }
    >
      <SecondaryControlBar className="order-last py-2 lg:order-none lg:border-b lg:border-t-0 lg:bg-game-surface/60 lg:shadow-none lg:backdrop-blur-none">
        <div className="flex min-w-0 flex-col">
          <NavigationRow count={6} />
          <div className="mt-1">
            <NavigationRow count={6} />
          </div>
        </div>
      </SecondaryControlBar>
      <DelayedContent className="min-h-0 flex-1 touch-pan-y overflow-y-auto px-4 pt-4 pb-4 md:px-6">
        <div className="mb-5">
          <SearchSkeleton />
        </div>
        <SectionLabelSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }, (_, index) => (
            <InventoryCardSkeleton key={index} />
          ))}
        </div>
      </DelayedContent>
    </RoutePage>
  )
}
