import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'

interface FilterBarProps {
  activeCategory: string
  activeSubCategory?: string
  onOpenRegionModal: () => void
  onOpenAreaModal: () => void
}

export function FilterBar({
  activeCategory,
  activeSubCategory,
  onOpenRegionModal,
  onOpenAreaModal,
}: FilterBarProps) {
  if (!activeCategory) return null
  const isDailies = activeCategory === 'Dailies'

  return (
    <SecondaryControlBar desktopInline>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          data-haptic="selection"
          onClick={onOpenRegionModal}
          className="game-focus-ring flex h-12 min-w-0 items-center rounded-lg border border-game-border bg-game-surface px-3 text-left text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40"
        >
          <span className="min-w-0 flex-1 truncate">
            {isDailies ? 'Choose region' : activeCategory}
          </span>
        </button>
        <button
          type="button"
          data-haptic="selection"
          onClick={onOpenAreaModal}
          className="game-focus-ring flex h-12 min-w-0 items-center rounded-lg border border-game-border bg-game-surface px-3 text-left text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40 disabled:opacity-50"
          disabled={isDailies}
        >
          <span className="min-w-0 flex-1 truncate">
            {activeSubCategory || 'Choose area'}
          </span>
        </button>
      </div>
    </SecondaryControlBar>
  )
}
