import type { ReactNode } from 'react'
import { PremiumHeader } from './PremiumHeader'
import { cn } from '@/lib/utils'

// Static paper placeholders: no spinner, shimmer, fake counts or controls.
function Block({ className }: { className?: string }) {
  return <div className={cn('rounded-md bg-game-border/35', className)} />
}

function Frame({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div className="game-paper-background flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-game-canvas">
      <span role="status" className="sr-only">
        Loading {title}…
      </span>
      <PremiumHeader title={title} subtitle={subtitle} />
      <div
        aria-hidden="true"
        className="game-desktop-workspace min-h-0 w-full min-w-0 flex-1 overflow-hidden p-4 md:p-6"
      >
        {children}
      </div>
    </div>
  )
}

function Filters({ tabs = false }: { tabs?: boolean }) {
  return (
    <div className="mb-4 space-y-3">
      {tabs && (
        <div className="grid grid-cols-3 gap-2">
          <Block className="h-11" />
          <Block className="h-11" />
          <Block className="h-11" />
        </div>
      )}
      <div className="flex gap-2">
        <Block className="h-11 min-w-0 flex-1" />
        <Block className="h-11 w-24" />
        <Block className="hidden h-11 w-32 md:block" />
      </div>
    </div>
  )
}

function Rows({ count = 6 }: { count?: number }) {
  return (
    <div className="divide-y divide-game-border rounded-lg border border-game-border bg-game-surface/50">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex min-h-24 items-center gap-3 p-3">
          <Block className="size-12 shrink-0" />
          <div className="min-w-0 flex-1 space-y-3">
            <Block className="h-4 w-2/5" />
            <Block className="h-3 w-4/5" />
            <Block className="h-3 w-3/5" />
          </div>
          <Block className="hidden h-7 w-16 sm:block" />
        </div>
      ))}
    </div>
  )
}

function Specimens() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-[repeat(auto-fill,minmax(104px,1fr))]">
      {Array.from({ length: 24 }, (_, i) => (
        <div
          key={i}
          className="space-y-2 rounded-lg border border-game-border bg-game-surface/50 p-2"
        >
          <Block className="aspect-square w-full" />
          <Block className="h-3 w-4/5" />
          <Block className="h-2 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function TrainerSkeleton() {
  return (
    <Frame title="Trainer" subtitle="Trainer journal">
      <div className="grid h-full gap-5 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="hidden space-y-3 border-r border-game-border pr-4 lg:block">
          {Array.from({ length: 8 }, (_, i) => (
            <Block key={i} className="h-11 w-full" />
          ))}
        </div>
        <div className="space-y-5">
          <div className="rounded-xl border border-game-border bg-game-surface/50 p-5">
            <div className="flex items-center gap-4">
              <Block className="size-20 shrink-0 rounded-full" />
              <div className="flex-1 space-y-3">
                <Block className="h-6 w-2/3" />
                <Block className="h-3 w-1/2" />
              </div>
            </div>
            <Block className="mt-5 h-2 w-full" />
            <div className="mt-5 grid grid-cols-3 gap-3">
              <Block className="h-14" />
              <Block className="h-14" />
              <Block className="h-14" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <Block key={i} className="h-28" />
            ))}
          </div>
          <Rows count={3} />
        </div>
      </div>
    </Frame>
  )
}

export function ExploreSkeleton() {
  return (
    <Frame title="Explore" subtitle="Field journal">
      <div className="mb-4 rounded-xl border border-game-border bg-game-surface/50 p-4">
        <Block className="h-5 w-1/2" />
        <Block className="mt-3 h-3 w-1/3" />
        <Block className="mt-4 h-28 w-full" />
      </div>
      <Filters tabs />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-lg border border-game-border p-4"
          >
            <Block className="h-24" />
            <Block className="h-4 w-2/3" />
            <Block className="h-3 w-full" />
            <Block className="h-9 w-full" />
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function PokemonSkeleton() {
  return (
    <Frame title="Pokémon" subtitle="Your companions">
      <Filters tabs />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Specimens />
        <div className="hidden space-y-4 rounded-xl border border-game-border p-4 xl:block">
          <Block className="h-5 w-1/2" />
          {Array.from({ length: 6 }, (_, i) => (
            <Block key={i} className="h-16" />
          ))}
        </div>
      </div>
    </Frame>
  )
}

export function ArtisanSkeleton() {
  return (
    <Frame title="Artisan" subtitle="Workshop ledger">
      <Filters tabs />
      <div className="grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="space-y-4 rounded-xl border border-game-border bg-game-surface/50 p-4"
          >
            <div className="flex gap-3">
              <Block className="size-14" />
              <div className="flex-1 space-y-3">
                <Block className="h-4 w-3/4" />
                <Block className="h-3 w-1/2" />
              </div>
            </div>
            <Block className="h-3" />
            <div className="grid grid-cols-3 gap-2">
              <Block className="h-12" />
              <Block className="h-12" />
              <Block className="h-12" />
            </div>
            <Block className="h-11" />
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function DexSkeleton() {
  return (
    <Frame title="Dex" subtitle="Collection journal">
      <div className="mb-5 space-y-4 rounded-xl border border-game-border p-5">
        <Block className="h-4 w-28" />
        <Block className="h-9 w-40" />
        <Block className="h-2 w-full" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Block key={i} className="h-12" />
          ))}
        </div>
      </div>
      <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="space-y-4 rounded-lg border border-game-border p-4"
          >
            <Block className="size-12" />
            <Block className="h-6 w-1/2" />
            <Block className="h-3 w-4/5" />
            <Block className="h-2" />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Rows count={3} />
      </div>
    </Frame>
  )
}

export function MoveDexSkeleton() {
  return (
    <Frame title="MoveDex" subtitle="Move records">
      <Filters tabs />
      <Rows />
    </Frame>
  )
}

export function AbilityDexSkeleton() {
  return (
    <Frame title="AbilityDex" subtitle="Ability records">
      <Filters />
      <Rows />
    </Frame>
  )
}

export function PokedexSkeleton() {
  return (
    <Frame title="Pokédex" subtitle="Specimen index">
      <Filters tabs />
      <Specimens />
    </Frame>
  )
}

export function CardDexSkeleton() {
  return (
    <Frame title="Carddex" subtitle="Binder archive">
      <Filters />
      <p className="game-field-label mb-3">Binder shelf</p>
      <div className="mb-5 flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <Block key={i} className="h-16 w-44 shrink-0" />
        ))}
      </div>
      <Block className="mb-3 h-4 w-36" />
      <Block className="mb-5 h-2 w-full" />
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
        {Array.from({ length: 30 }, (_, i) => (
          <Block key={i} className="aspect-[5/7] w-full" />
        ))}
      </div>
    </Frame>
  )
}

export function InventorySkeleton() {
  return (
    <Frame title="Inventory" subtitle="Expedition supplies">
      <Filters tabs />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-game-border p-3"
          >
            <Block className="size-12 shrink-0" />
            <div className="flex-1 space-y-2">
              <Block className="h-3 w-full" />
              <Block className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}
