import { cn } from '@/lib/utils'

export type GamePageSkeletonVariant =
  | 'trainer'
  | 'explore'
  | 'pokemon'
  | 'artisan'
  | 'collection'
  | 'inventory'
  | 'dex'
  | 'carddex'
  | 'trainer-panel'

const VARIANT_LABELS: Record<GamePageSkeletonVariant, string> = {
  trainer: 'Loading trainer journal',
  explore: 'Loading field activities',
  pokemon: 'Loading Pokemon Box',
  artisan: 'Loading workshop ledger',
  collection: 'Loading collection journal',
  inventory: 'Loading inventory',
  dex: 'Loading specimen index',
  carddex: 'Loading Carddex',
  'trainer-panel': 'Loading trainer records',
}

function Block({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('rounded-md bg-game-border/55', className)}
    />
  )
}

function Header() {
  return (
    <div className="shrink-0 border-b border-game-border bg-game-surface/70 px-4 py-4 md:px-6">
      <Block className="h-3 w-24" />
      <Block className="mt-2 h-7 w-44" />
    </div>
  )
}

function Grid({ cards = 12, square = false }: { cards?: number; square?: boolean }) {
  return (
    <div
      className={cn(
        'grid gap-2',
        square
          ? 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10'
          : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
      )}
    >
      {Array.from({ length: cards }, (_, index) => (
        <Block
          key={index}
          className={cn(square ? 'aspect-square' : 'h-28', 'border border-game-border/60 bg-game-surface')}
        />
      ))}
    </div>
  )
}

export function GamePageSkeleton({
  variant,
  className,
}: {
  variant: GamePageSkeletonVariant
  className?: string
}) {
  const isDex = variant === 'dex' || variant === 'carddex'
  const isPokemon = variant === 'pokemon'
  const isExplore = variant === 'explore'

  if (variant === 'trainer-panel') {
    return (
      <section
        aria-busy="true"
        aria-label={VARIANT_LABELS[variant]}
        className={cn('h-full overflow-hidden p-4 md:p-6', className)}
      >
        <div className="mx-auto max-w-5xl space-y-4">
          <Block className="h-28 w-full" />
          <div className="grid gap-3 md:grid-cols-2">
            <Block className="h-44" />
            <Block className="h-44" />
          </div>
          <Block className="h-28" />
        </div>
      </section>
    )
  }

  return (
    <section
      aria-busy="true"
      aria-label={VARIANT_LABELS[variant]}
      className={cn(
        'game-paper-first game-paper-background flex h-full min-h-0 flex-col overflow-hidden bg-game-canvas text-game-ink',
        className,
      )}
    >
      <Header />
      {isExplore && <Block className="mx-4 mt-4 h-24 md:mx-6" />}
      {!isExplore && variant !== 'trainer' && (
        <div className="hidden border-b border-game-border px-6 py-3 xl:flex">
          <Block className="h-10 w-64" />
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden px-4 py-4 md:px-6">
        {variant === 'trainer' ? (
          <div className="mx-auto grid h-full max-w-5xl gap-4 xl:grid-cols-[16rem_minmax(0,1fr)]">
            <Block className="hidden h-full xl:block" />
            <div className="space-y-4">
              <Block className="h-40" />
              <div className="grid gap-3 md:grid-cols-2">
                <Block className="h-36" />
                <Block className="h-36" />
              </div>
              <Block className="h-28" />
            </div>
          </div>
        ) : isExplore ? (
          <Grid cards={6} />
        ) : isPokemon ? (
          <div className="grid h-full gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <Grid cards={18} square />
            <Block className="hidden h-full xl:block" />
          </div>
        ) : variant === 'collection' ? (
          <div className="space-y-4">
            <Block className="h-44" />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => <Block key={index} className="h-24" />)}
            </div>
            <Block className="h-36" />
          </div>
        ) : isDex ? (
          <Grid cards={isDex ? 24 : 12} square={variant !== 'carddex'} />
        ) : (
          <Grid cards={variant === 'inventory' ? 10 : 8} />
        )}
      </div>
    </section>
  )
}
