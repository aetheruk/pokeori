import { ChevronDown, Map as MapIcon, MapPin, Timer } from 'lucide-react'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'

interface FilterBarProps {
  activeCategory: string
  activeSubCategory?: string
  onOpenRegionModal: () => void
  onOpenAreaModal: () => void
  onOpenDailies: () => void
  onReturnFromDailies: () => void
}

export function FilterBar({
  activeCategory,
  activeSubCategory,
  onOpenRegionModal,
  onOpenAreaModal,
  onOpenDailies,
  onReturnFromDailies,
}: FilterBarProps) {
  if (!activeCategory) return null
  const isDailies = activeCategory === 'Dailies'

  return (
    <SecondaryControlBar desktopInline>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
        <button
          type="button"
          onClick={onOpenRegionModal}
          className="game-focus-ring flex h-12 min-w-0 items-center gap-2 rounded-lg border border-game-border bg-game-surface px-3 text-left text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40"
        >
          <MapIcon className="h-4 w-4 shrink-0 text-game-moss-strong" />
          <span className="min-w-0 flex-1 truncate">
            {isDailies ? 'Choose region' : activeCategory}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-game-muted" />
        </button>
        <button
          type="button"
          onClick={onOpenAreaModal}
          className="game-focus-ring flex h-12 min-w-0 items-center gap-2 rounded-lg border border-game-border bg-game-surface px-3 text-left text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40 disabled:opacity-50"
          disabled={isDailies}
        >
          <MapPin className="h-4 w-4 shrink-0 text-game-moss-strong" />
          <span className="min-w-0 flex-1 truncate">
            {activeSubCategory || 'Choose area'}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-game-muted" />
        </button>
        <button
          type="button"
          onClick={isDailies ? onReturnFromDailies : onOpenDailies}
          aria-label={isDailies ? 'Return to Area' : 'Open Active Dailies'}
          className="game-focus-ring h-12 w-12 rounded-lg border border-game-border bg-game-surface text-game-moss-strong transition-colors hover:border-game-moss/40"
          title={isDailies ? 'Return to Area' : 'Active Dailies'}
        >
          {isDailies ? (
            <MapPin className="mx-auto h-5 w-5" />
          ) : (
            <Timer className="mx-auto h-5 w-5" />
          )}
        </button>
      </div>
    </SecondaryControlBar>
  )
}
